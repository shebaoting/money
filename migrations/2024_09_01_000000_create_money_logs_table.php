<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('money_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('user_id');  // 修改为 unsignedInteger，确保与 users 表的 id 列兼容
            $table->float('amount');
            $table->string('type');  // 新增 type 字段
            $table->float('balance');  // 新增 balance 字段
            $table->text('description');  // 新增 description 字段
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');
        });
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('money_logs');
    }
];
