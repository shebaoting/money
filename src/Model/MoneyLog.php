<?php

namespace Shebaoting\Money\Model;

use Illuminate\Database\Eloquent\Model;
use Flarum\User\User;
use Flarum\Post\Post;
use Flarum\Discussion\Discussion;

class MoneyLog extends Model
{
    protected $table = 'money_logs';

    protected $fillable = ['user_id', 'amount', 'action', 'reason', 'balance', 'target_user_id', 'post_id', 'discussion_id'];
    public $timestamps = true; // 确保启用自动时间戳

    public function user()
    {
        return $this->belongsTo('Flarum\User\User');
    }

    public function targetUser()
    {
        return $this->belongsTo(User::class, 'target_user_id');
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function discussion()
    {
        return $this->belongsTo(Discussion::class);
    }
}
