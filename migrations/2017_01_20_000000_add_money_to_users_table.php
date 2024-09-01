<?php

use Flarum\Database\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'money')) {
                $table->integer('money')->default(0); // 根据需要设置默认值
            }
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'money')) {
                $table->dropColumn('money');
            }
        });
    }
];
