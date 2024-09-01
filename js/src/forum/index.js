import app from 'flarum/forum/app';
import { extend } from 'flarum/extend';
import UserCard from 'flarum/components/UserCard';
import UserControls from 'flarum/utils/UserControls';
import Button from 'flarum/components/Button';
import LinkButton from 'flarum/components/LinkButton';
import UserMoneyModal from './components/UserMoneyModal';
import Model from 'flarum/Model';
import User from 'flarum/models/User';
import PostControls from 'flarum/utils/PostControls';
import UserMoneyLogPage from './components/UserMoneyLogPage';

app.initializers.add('shebaoting-money', () => {
  User.prototype.canEditMoney = Model.attribute('canEditMoney');
  app.routes['user.money-log'] = {
    path: '/u/:username/money-log',
    component: UserMoneyLogPage,
  };
  extend(UserCard.prototype, 'infoItems', function (items) {
    const moneyName = app.forum.attribute('shebaoting-money.moneyname') || '[money]';
    const money = this.attrs.user.data.attributes['money'];

    items.add(
      'money',
      LinkButton.component(
        {
          href: app.route('user.money-log', {
            username: this.attrs.user.username(),
          }),
          className: 'UserMoneyLogLink',
        },
        moneyName.replace('[money]', money)
      )
    );
  });

  extend(UserControls, 'moderationControls', (items, user) => {
    if (user.canEditMoney()) {
      items.add(
        'money',
        Button.component(
          {
            icon: 'fas fa-money-bill',
            onclick: () => app.modal.show(UserMoneyModal, { user }),
          },
          app.translator.trans('shebaoting-money.forum.user_controls.money_button')
        )
      );
    }
  });

  extend(PostControls, 'likeAction', function (items, post) {
    const user = app.session.user;
    const moneyForLike = parseFloat(app.forum.attribute('shebaoting-money.moneyforlike') || 0);

    if (moneyForLike < 0 && user.money < Math.abs(moneyForLike)) {
      items.add(
        'like',
        Button.component(
          {
            icon: 'fas fa-thumbs-up',
            className: 'Button Button--link',
            onclick: () => {
              alert(app.translator.trans('shebaoting-money.forum.errors.not_enough_money'));
            },
          },
          app.translator.trans('core.forum.post.like_link')
        ),
        20
      );
    } else {
      // Call the original like functionality here
      items.add(
        'like',
        Button.component(
          {
            icon: 'fas fa-thumbs-up',
            className: 'Button Button--link',
            onclick: () => {
              post.save({ isLiked: !post.isLiked() });
            },
          },
          app.translator.trans('core.forum.post.like_link')
        ),
        20
      );
    }
  });
});
