<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('money_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('user_id');  // 用户ID
            $table->float('amount');             // 积分变动数量
            $table->float('balance');            // 变动后的积分余额
            $table->string('action');            // 动作类型
            $table->text('reason')->nullable();  // 积分变动原因
            $table->unsignedInteger('target_user_id')->nullable();    // 目标用户ID
            $table->unsignedInteger('post_id')->nullable();           // 帖子ID
            $table->unsignedInteger('discussion_id')->nullable();     // 讨论ID
            $table->timestamps();
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('money_logs');
    }
];
