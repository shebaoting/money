<?php

namespace Shebaoting\Money\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;

class MoneyLogSerializer extends AbstractSerializer
{
    protected $type = 'money-logs';

    protected function getDefaultAttributes($log)
    {
        return [
            'amount' => $log->amount,
            'type' => $log->type,
            'balance' => $log->balance,
            'description' => $log->description,
            'createdAt' => $this->formatDate($log->created_at),
        ];
    }
}
