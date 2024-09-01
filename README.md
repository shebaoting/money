# Money

![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/shebaoting/money.svg)](https://packagist.org/packages/shebaoting/money) [![Total Downloads](https://img.shields.io/packagist/dt/shebaoting/money.svg)](https://packagist.org/packages/shebaoting/money)

A [Flarum](http://flarum.org) extension. Adds a virtual currency system to the Flarum community, allowing users to earn and spend points.

This extension is modified from [flarum-ext-money by AntoineFr](https://github.com/AntoineFr/flarum-ext-money). It's an excellent extension, and I want to express my gratitude to the original author. I have added some additional features that I needed and have published it here in the hope that you will enjoy it as well.

## Features

1. **All original features**: The extension retains all the functionalities of the original version.

2. **Points Record**: Added a feature to record all points transactions.

3. **Initial Points on Registration**: New users receive a set amount of points upon registration.

4. **Negative Points Deduction**: If points are set to negative, they will be deducted from the user's own account. If the account has insufficient points, the operation cannot be performed.

5. **Points Redistribution**: When points are negative, and the user replies to a discussion, the deducted points will be awarded to the discussion starter.

6. **Like Reward System**: When points are negative, points deducted from liking a post will be awarded to the person who received the like.

## Idea

   The design philosophy behind this system is a metaphor for time.

   Everything you do here consumes your time. If a task is completed without receiving any meaningful response, it’s as if the task was done in vain. If a person continues to engage in meaningless activities, they are essentially wasting their time.

   For a similar concept, I recommend watching the movie _In Time_.

## Contact
You can also contact me if you wish to pay something to develop the flarum extension.
Email: th9th@th9th.com

## Installation

Install with composer:

```sh
composer require shebaoting/money:"*"
```

## Updating

```sh
composer update shebaoting/money:"*"
php flarum migrate
php flarum cache:clear
```

## Links

- [Packagist](https://packagist.org/packages/shebaoting/money)
- [GitHub](https://github.com/shebaoting/money)
- [Discuss](https://discuss.flarum.org/d/PUT_DISCUSS_SLUG_HERE)
