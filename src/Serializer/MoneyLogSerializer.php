<?php

namespace Shebaoting\Money\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;

class MoneyLogSerializer extends AbstractSerializer
{
    protected $type = 'money-logs';

    protected function getDefaultAttributes($pointLog)
    {
        $attributes = [
            'amount'    => $pointLog->amount,
            'balance'    => $pointLog->balance,
            'reason'    => $pointLog->reason,
            'action'    => $pointLog->action,
            'createdAt' => $this->formatDate($pointLog->created_at),
        ];

        if ($pointLog->targetUser) {
            $attributes['targetUser'] = [
                'id' => $pointLog->targetUser->id,
                'username' => $pointLog->targetUser->username,
            ];
        }

        if ($pointLog->post) {
            $attributes['post'] = [
                'id' => $pointLog->post->id,
                'number' => $pointLog->post->number,
            ];
        }

        if ($pointLog->discussion) {
            $attributes['discussion'] = [
                'id' => $pointLog->discussion->id,
                'title' => $pointLog->discussion->title,
                'slug' => $pointLog->discussion->slug,
            ];
        }

        return $attributes;
    }
}
