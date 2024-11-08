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
import PointLog from './models/PointLog';
import UserPage from 'flarum/forum/components/UserPage';

app.initializers.add('shebaoting-money', () => {
  app.store.models['money-logs'] = PointLog;

  User.prototype.canEditMoney = Model.attribute('canEditMoney');
  app.routes['user.money-log'] = {
    path: '/u/:username/money-log',
    component: UserMoneyLogPage,
  };
  extend(UserCard.prototype, 'infoItems', function (items) {
    const money = this.attrs.user.data.attributes['money'] || 0;
    const moneyName = app.forum.attribute('shebaoting-money.moneyname') || '[money]';

    // 获取后台设置的货币等级名称和进制
    const levelNames = (app.forum.attribute('shebaoting-money.level_names') || '').split(',');
    const scale = parseInt(app.forum.attribute('shebaoting-money.money_scale') || '100');

    // 判断是否有设置货币等级名称
    if (levelNames.length > 1 && levelNames[0] !== '') {
      let remainingMoney = money;
      let levelValues = [];

      for (let i = 0; i < levelNames.length; i++) {
        const levelValue = Math.floor(remainingMoney / Math.pow(scale, levelNames.length - 1 - i));
        remainingMoney = remainingMoney % Math.pow(scale, levelNames.length - 1 - i);

        // 给每个等级名称和数值之间增加一些间距
        levelValues.push(m('span', { style: { marginRight: '15px' } }, `${levelNames[i]} ${levelValue}`));
      }

      items.add('money', m('div', levelValues)); // 使用 div 容器包裹
    } else {
      // 如果没有设置货币等级名称，则使用默认的货币名称
      items.add('money', m('span', moneyName.replace('[money]', money)));
    }
  });

  // 扩展 UserPage 的 navItems，添加“积分记录”链接
  extend(UserPage.prototype, 'navItems', function (items) {
    const user = this.user;

    // 只有在查看自己的个人资料时才显示链接
    if (app.session.user && app.session.user.id() === user.id()) {
      items.add(
        'moneyLogs',
        LinkButton.component(
          {
            href: app.route('user.money-log', { username: user.username() }),
            name: 'moneyLogs',
            icon: 'fas fa-coins',
          },
          app.translator.trans('shebaoting-money.forum.point_log.link')
        ),
        10
      );
    }
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
