<?php

namespace Shebaoting\Money\Event;

use Flarum\User\User;

class MoneyUpdated
{
    public $user;
    /**
     * @var float
     */
    public $amount;
    /**
     * @var string
     */
    public $description;
    /**
     * @var string
     */
    public $type;

    /**
     * 创建一个新的事件实例
     *
     * @param User $user
     * @param float $amount
     * @param string $type
     * @param string $description
     */
    public function __construct(User $user, float $amount, string $type, string $description)
    {
        $this->user = $user;
        $this->amount = $amount;
        $this->type = $type;
        $this->description = $description;
    }
}
