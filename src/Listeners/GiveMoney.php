<?php

namespace Shebaoting\Money\Listeners;

use Illuminate\Support\Arr;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\User\User;
use Flarum\Post\Event\Posted;
use Flarum\Post\Event\Restored as PostRestored;
use Flarum\Post\Event\Hidden as PostHidden;
use Flarum\Post\Event\Deleted as PostDeleted;
use Flarum\Discussion\Event\Started;
use Flarum\Discussion\Event\Restored as DiscussionRestored;
use Flarum\Discussion\Event\Hidden as DiscussionHidden;
use Flarum\Discussion\Event\Deleted as DiscussionDeleted;
use Flarum\Likes\Event\PostWasLiked;
use Flarum\Likes\Event\PostWasUnliked;
use Shebaoting\Money\Event\MoneyUpdated;
use Shebaoting\Money\Model\MoneyLog;
use Flarum\Post\Event\Saving;
use Flarum\User\Event\Saving as SavingUser;
use Flarum\Discussion\Event\Saving as SavingDiscussion;
use Flarum\Foundation\ValidationException;
use Flarum\User\Event\Registered;

abstract class AutoRemoveEnum
{
    public const NEVER = 0;
    public const HIDDEN = 1;
    public const DELETED = 2;
}

class GiveMoney
{
    protected $settings;
    protected $events;
    protected $autoremove;

    public function __construct(SettingsRepositoryInterface $settings, Dispatcher $events)
    {
        $this->settings = $settings;
        $this->events = $events;
        $this->autoremove = (int)$this->settings->get('shebaoting-money.autoremove', 1);
    }

    /**
     * 给用户添加或扣除金额
     */
    public function giveMoney(?User $user, $money, $typeKey, $description = null)
    {
        if (!is_null($user)) {
            $money = (float)$money;

            // 获取类型翻译
            $type = app()->translator->trans("shebaoting-money.forum.logs_type.{$typeKey}");

            // 更新用户的余额
            $user->money += $money;
            $user->save();

            // 记录积分变动
            MoneyLog::create([
                'user_id' => $user->id,
                'type' => $type,
                'amount' => $money,
                'balance' => $user->money,
                'description' => $description,
            ]);

            // 触发金额更新事件
            $this->events->dispatch(new MoneyUpdated($user, $money, $type, $description));
        }
    }

    /**
     * 帖子将要被保存时执行，检查用户余额是否足够
     */
    public function postWillBeSaved(Saving $event)
    {
        $money = (float)$this->settings->get('shebaoting-money.moneyforpost', 0);

        if ($money < 0) {
            $user = $event->actor;

            if ($user->money < abs($money)) {
                throw new ValidationException([
                    'money' => app()->translator->trans('shebaoting-money.forum.errors.not_enough_money')
                ]);
            }
        }
    }

    /**
     * 讨论将要被保存时执行，检查用户余额是否足够
     */
    public function discussionWillBeSaved(SavingDiscussion $event)
    {
        $money = (float)$this->settings->get('shebaoting-money.moneyfordiscussion', 0);

        if ($money < 0 && $event->actor->money < abs($money)) {
            throw new ValidationException([
                'money' => app()->translator->trans('shebaoting-money.forum.errors.not_enough_money')
            ]);
        }
    }

    /**
     * 当帖子发布时，给发帖人或讨论作者奖励或扣除金额
     */
    public function postWasPosted(Posted $event)
    {
        if ($event->post['number'] > 1) {
            $minimumLength = (int)$this->settings->get('shebaoting-money.postminimumlength', 0);
            $money = (float)$this->settings->get('shebaoting-money.moneyforpost', 0);

            if (strlen($event->post->content) >= $minimumLength) {
                $user = $event->actor;
                $discussionAuthor = $event->post->discussion->user;
                $discussionTitle = $event->post->discussion->title;

                $description = app()->translator->trans('shebaoting-money.forum.logs_description.posted_reply', [
                    'title' => $discussionTitle
                ]);

                if ($money < 0) {
                    $this->giveMoney($user, $money, 'withdrawal', $description);
                    if ($user->id !== $discussionAuthor->id) {
                        $description = app()->translator->trans('shebaoting-money.forum.logs_description.posted_in_discussion', [
                            'title' => $discussionTitle
                        ]);
                        $this->giveMoney($discussionAuthor, 'discussion_replied', -$money, $description);
                    }
                } else {
                    $this->giveMoney($user, $money, 'post_created', $description);
                }
            }
        }
    }

    /**
     * 当帖子被恢复时，如果之前因为隐藏被扣除金额，则恢复金额
     */
    public function postWasRestored(PostRestored $event)
    {
        if ($this->autoremove == AutoRemoveEnum::HIDDEN) {
            $minimumLength = (int)$this->settings->get('shebaoting-money.postminimumlength', 0);

            if (strlen($event->post->content) >= $minimumLength) {
                $money = (float)$this->settings->get('shebaoting-money.moneyforpost', 0);
                $description = app()->translator->trans('shebaoting-money.forum.logs_description.post_restored', [
                    'title' => $event->post->discussion->title
                ]);
                $this->giveMoney($event->post->user, $money, 'post_restored', $description);
            }
        }
    }

    /**
     * 当帖子被隐藏时，扣除用户相应的金额
     */
    public function postWasHidden(PostHidden $event)
    {
        if ($this->autoremove == AutoRemoveEnum::HIDDEN) {
            $minimumLength = (int)$this->settings->get('shebaoting-money.postminimumlength', 0);

            if (strlen($event->post->content) >= $minimumLength) {
                $money = (float)$this->settings->get('shebaoting-money.moneyforpost', 0);
                $description = app()->translator->trans('shebaoting-money.forum.logs_description.post_hidden', [
                    'title' => $event->post->discussion->title
                ]);
                $this->giveMoney($event->post->user, -$money, 'post_hidden', $description);
            }
        }
    }

    /**
     * 当帖子被删除时，扣除用户相应的金额
     */
    public function postWasDeleted(PostDeleted $event)
    {
        if ($this->autoremove == AutoRemoveEnum::DELETED && $event->post->type == 'comment') {
            $minimumLength = (int)$this->settings->get('shebaoting-money.postminimumlength', 0);

            if (strlen($event->post->content) >= $minimumLength) {
                $money = (float)$this->settings->get('shebaoting-money.moneyforpost', 0);
                $description = app()->translator->trans('shebaoting-money.forum.logs_description.post_deleted', [
                    'title' => $event->post->discussion->title
                ]);
                $this->giveMoney($event->post->user, -$money, 'post_deleted', $description);
            }
        }
    }

    /**
     * 当讨论被发起时，奖励或扣除发起人的金额
     */
    public function discussionWasStarted(Started $event)
    {
        $money = (float)$this->settings->get('shebaoting-money.moneyfordiscussion', 0);

        $description = app()->translator->trans('shebaoting-money.forum.logs_description.discussion_started', [
            'title' => $event->discussion->title
        ]);

        $this->giveMoney($event->actor, $money, 'discussion_started', $description);
    }

    /**
     * 当讨论被恢复时，如果之前因为隐藏被扣除金额，则恢复金额
     */
    public function discussionWasRestored(DiscussionRestored $event)
    {
        if ($this->autoremove == AutoRemoveEnum::HIDDEN) {
            $money = (float)$this->settings->get('shebaoting-money.moneyfordiscussion', 0);
            $description = app()->translator->trans('shebaoting-money.forum.logs_description.discussion_restored', [
                'title' => $event->discussion->title
            ]);
            $this->giveMoney($event->discussion->user, $money, 'discussion_restored', $description);
        }
    }

    /**
     * 当讨论被隐藏时，扣除用户相应的金额
     */
    public function discussionWasHidden(DiscussionHidden $event)
    {
        if ($this->autoremove == AutoRemoveEnum::HIDDEN) {
            $money = (float)$this->settings->get('shebaoting-money.moneyfordiscussion', 0);
            $description = app()->translator->trans('shebaoting-money.forum.logs_description.discussion_hidden', [
                'title' => $event->discussion->title
            ]);
            $this->giveMoney($event->discussion->user, -$money, 'discussion_hidden', $description);
        }
    }

    /**
     * 当讨论被删除时，扣除用户相应的金额
     */
    public function discussionWasDeleted(DiscussionDeleted $event)
    {
        if ($this->autoremove == AutoRemoveEnum::DELETED) {
            $money = (float)$this->settings->get('shebaoting-money.moneyfordiscussion', 0);
            $description = app()->translator->trans('shebaoting-money.forum.logs_description.discussion_deleted', [
                'title' => $event->discussion->title
            ]);
            $this->giveMoney($event->discussion->user, -$money, 'discussion_deleted', $description);
        }
    }

    /**
     * 当用户信息保存时，检查并处理金钱变动
     */
    public function userWillBeSaved(SavingUser $event)
    {
        $attributes = Arr::get($event->data, 'attributes', []);

        if (array_key_exists('money', $attributes)) {
            $user = $event->user;
            $actor = $event->actor;

            $actor->assertCan('edit_money', $user);
            $oldMoney = $user->money;
            $newMoney = (float)$attributes['money'];
            $user->money = $newMoney;

            $description = app()->translator->trans('shebaoting-money.forum.logs_description.admin_updated', [
                'amount' => $newMoney - $oldMoney
            ]);

            $this->giveMoney($user, $newMoney - $oldMoney, 'admin_updated', $description);
        }
    }

    /**
     * 当帖子被点赞时，奖励或扣除用户相应的金额
     */
    public function postWasLiked(PostWasLiked $event)
    {
        $money = (float)$this->settings->get('shebaoting-money.moneyforlike', 0);
        $user = $event->actor;
        $postAuthor = $event->post->user;
        $discussionTitle = $event->post->discussion->title;

        if ($money < 0) {
            if ($user->money < abs($money)) {
                throw new ValidationException([
                    'money' => app()->translator->trans('shebaoting-money.forum.errors.not_enough_money')
                ]);
            }

            $description = app()->translator->trans('shebaoting-money.forum.logs_description.liked', [
                'title' => $discussionTitle,
                'user' => $postAuthor->username
            ]);
            $this->giveMoney($user, $money, 'liked', $description);

            if ($user->id !== $postAuthor->id) {
                $description = app()->translator->trans('shebaoting-money.forum.logs_description.liked_by_others', [
                    'title' => $discussionTitle,
                    'user' => $user->username
                ]);
                $this->giveMoney($postAuthor, -$money, 'liked_by_others', $description);
            }
        } else {
            $description = app()->translator->trans('shebaoting-money.forum.logs_description.liked_by_others', [
                'title' => $discussionTitle,
                'user' => $user->username
            ]);
            $this->giveMoney($postAuthor, $money, 'liked_by_others', $description);
        }
    }

    /**
     * 当帖子取消点赞时，扣除帖子作者的金额
     */
    public function postWasUnliked(PostWasUnliked $event)
    {
        // 如果需要在取消点赞时处理积分变动，可以在此处实现
    }

    /**
     * 当用户注册后设置初始积分
     */
    public function userWasRegistered(Registered $event)
    {
        $initialMoney = (float)$this->settings->get('shebaoting-money.initialmoney', 0);

        if ($initialMoney > 0) {
            $description = app()->translator->trans('shebaoting-money.forum.logs_description.initial_registration');
            $this->giveMoney($event->user, $initialMoney, 'registration', $description);
        }
    }
}
