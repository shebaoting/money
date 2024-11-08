<?php

namespace Shebaoting\Money;

use Flarum\Extend;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Post\Event\Posted;
use Flarum\Post\Event\Restored as PostRestored;
use Flarum\Post\Event\Hidden as PostHidden;
use Flarum\Post\Event\Deleted as PostDeleted;
use Flarum\Discussion\Event\Started;
use Flarum\Discussion\Event\Restored as DiscussionRestored;
use Flarum\Discussion\Event\Hidden as DiscussionHidden;
use Flarum\Discussion\Event\Deleted as DiscussionDeleted;
use Flarum\User\Event\Saving;
use Flarum\Post\Event\Saving as SavingPostEvent;
use Flarum\Likes\Event\PostWasLiked;
use Flarum\Likes\Event\PostWasUnliked;
use Flarum\User\Event\Registered;
use Shebaoting\Money\Controller\UserMoneyLogsController;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less')
        ->route('/money-log', 'user.money-log'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->attributes(AddUserMoneyAttributes::class),

    (new Extend\Settings())
        ->serializeToForum('shebaoting-money.moneyname', 'shebaoting-money.moneyname')
        ->serializeToForum('shebaoting-money.level_names', 'shebaoting-money.level_names')
        ->serializeToForum('shebaoting-money.money_scale', 'shebaoting-money.money_scale')
        ->serializeToForum('shebaoting-money.noshowzero', 'shebaoting-money.noshowzero')
        // 新增的设置项
        ->serializeToForum('shebaoting-money.extra_char_threshold', 'shebaoting-money.extra_char_threshold')
        ->serializeToForum('shebaoting-money.extra_char_increment', 'shebaoting-money.extra_char_increment')
        ->serializeToForum('shebaoting-money.extra_char_points', 'shebaoting-money.extra_char_points'),

    (new Extend\Event())
        ->listen(Saving::class, [Listeners\GiveMoney::class, 'postWillBeSaved']) // 修改这里
        ->listen(Posted::class, [Listeners\GiveMoney::class, 'postWasPosted'])
        ->listen(PostRestored::class, [Listeners\GiveMoney::class, 'postWasRestored'])
        ->listen(PostHidden::class, [Listeners\GiveMoney::class, 'postWasHidden'])
        ->listen(PostDeleted::class, [Listeners\GiveMoney::class, 'postWasDeleted'])
        ->listen(Started::class, [Listeners\GiveMoney::class, 'discussionWasStarted'])
        ->listen(DiscussionRestored::class, [Listeners\GiveMoney::class, 'discussionWasRestored'])
        ->listen(DiscussionHidden::class, [Listeners\GiveMoney::class, 'discussionWasHidden'])
        ->listen(DiscussionDeleted::class, [Listeners\GiveMoney::class, 'discussionWasDeleted'])
        ->listen(Registered::class, [Listeners\GiveMoney::class, 'userWasRegistered'])
        ->listen(PostWasLiked::class, [Listeners\GiveMoney::class, 'postWasLiked'])
        ->listen(PostWasUnliked::class, [Listeners\GiveMoney::class, 'postWasUnliked']),

    (new Extend\Routes('api'))
        ->get('/money-log', 'money.logs', UserMoneyLogsController::class)
];
