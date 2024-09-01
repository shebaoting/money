<?php

namespace Shebaoting\Money\Model;

use Illuminate\Database\Eloquent\Model;

class MoneyLog extends Model
{
    protected $table = 'money_logs';

    protected $fillable = ['user_id', 'amount', 'type', 'balance', 'description'];

    public function user()
    {
        return $this->belongsTo('Flarum\User\User');
    }
}
