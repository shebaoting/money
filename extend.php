<?php

/*
 * This file is part of shebaoting/money.
 *
 * Copyright (c) 2024 Shebaoting.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

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
use Flarum\Post\Event\Saving as SavingPost;
use Flarum\Likes\Event\PostWasLiked;
use Flarum\Likes\Event\PostWasUnliked;
use Flarum\Discussion\Event\Saving as SavingDiscussion;
use Flarum\User\Event\Registered;
use Shebaoting\Money\Controller\UserMoneyLogsController;

$extend = [
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
        ->serializeToForum('shebaoting-money.noshowzero', 'shebaoting-money.noshowzero'),

    (new Extend\Event())
        ->listen(SavingPost::class, [Listeners\GiveMoney::class, 'postWillBeSaved'])
        ->listen(SavingDiscussion::class, [Listeners\GiveMoney::class, 'discussionWillBeSaved'])
        ->listen(Posted::class, [Listeners\GiveMoney::class, 'postWasPosted'])
        ->listen(PostRestored::class, [Listeners\GiveMoney::class, 'postWasRestored'])
        ->listen(PostHidden::class, [Listeners\GiveMoney::class, 'postWasHidden'])
        ->listen(PostDeleted::class, [Listeners\GiveMoney::class, 'postWasDeleted'])
        ->listen(Started::class, [Listeners\GiveMoney::class, 'discussionWasStarted'])
        ->listen(DiscussionRestored::class, [Listeners\GiveMoney::class, 'discussionWasRestored'])
        ->listen(DiscussionHidden::class, [Listeners\GiveMoney::class, 'discussionWasHidden'])
        ->listen(DiscussionDeleted::class, [Listeners\GiveMoney::class, 'discussionWasDeleted'])
        ->listen(Saving::class, [Listeners\GiveMoney::class, 'userWillBeSaved'])
        ->listen(Registered::class, [Listeners\GiveMoney::class, 'userWasRegistered']),

    (new Extend\Routes('api'))
        ->get('/money-log', 'money.logs', UserMoneyLogsController::class)
];

if (class_exists('Flarum\Likes\Event\PostWasLiked')) {
    $extend[] =
        (new Extend\Event())
        ->listen(PostWasLiked::class, [Listeners\GiveMoney::class, 'postWasLiked'])
        ->listen(PostWasUnliked::class, [Listeners\GiveMoney::class, 'postWasUnliked']);
}
return $extend;
