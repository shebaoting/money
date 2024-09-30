import app from 'flarum/admin/app';
import Select from 'flarum/common/components/Select';
import saveSettings from 'flarum/admin/utils/saveSettings';
import Button from 'flarum/common/components/Button';

app.initializers.add('shebaoting-money', () => {
  app.extensionData
    .for('shebaoting-money')
    .registerSetting({
      setting: 'shebaoting-money.moneyname',
      label: app.translator.trans('shebaoting-money.admin.settings.moneyname'),
      type: 'text',
    })
    .registerSetting({
      setting: 'shebaoting-money.initialmoney',
      label: app.translator.trans('shebaoting-money.admin.settings.initialmoney'),
      type: 'number',
      min: 0,
      help: app.translator.trans('shebaoting-money.admin.settings.initialmoney_help'),
    })
    .registerSetting({
      setting: 'shebaoting-money.level_names',
      label: app.translator.trans('shebaoting-money.admin.settings.level_names'),
      type: 'text',
      help: app.translator.trans('shebaoting-money.admin.settings.level_names_help'),
      placeholder: '金豆,银豆,铜豆',
    })
    .registerSetting({
      setting: 'shebaoting-money.money_scale',
      label: app.translator.trans('shebaoting-money.admin.settings.money_scale'),
      type: 'number',
      min: 1,
      help: app.translator.trans('shebaoting-money.admin.settings.money_scale_help'),
    })
    // 注册新帖变动金额设置
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('shebaoting-money.admin.settings.moneyforpost_label')}</label>
          <div className="MoneySettingRow" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <input
              className="FormControl"
              type="number"
              min="0"
              step="any"
              bidi={this.setting('shebaoting-money.moneyforpost')}
              placeholder="0"
              style={{ flex: '1 1 auto' }}
            />
            <Select
              className="FormControl"
              value={this.setting('shebaoting-money.moneyforpost_type')()}
              options={{
                reward: app.translator.trans('shebaoting-money.admin.settings.reward'),
                deduct: app.translator.trans('shebaoting-money.admin.settings.deduct'),
              }}
              onchange={(value) => this.setting('shebaoting-money.moneyforpost_type')(value)}
              style={{ flex: '0 0 auto' }}
            />
          </div>
          <div className="helpText">{app.translator.trans('shebaoting-money.admin.settings.moneyforpost_help')}</div>
        </div>
      );
    })
    // 注册回复变动金额设置
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('shebaoting-money.admin.settings.moneyforreply_label')}</label>
          <div className="MoneySettingRow" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <input
              className="FormControl"
              type="number"
              min="0"
              step="any"
              bidi={this.setting('shebaoting-money.moneyforreply')}
              placeholder="0"
              style={{ flex: '1 1 auto' }}
            />
            <Select
              className="FormControl"
              value={this.setting('shebaoting-money.moneyforreply_type')()}
              options={{
                reward: app.translator.trans('shebaoting-money.admin.settings.reward'),
                deduct: app.translator.trans('shebaoting-money.admin.settings.deduct'),
              }}
              onchange={(value) => this.setting('shebaoting-money.moneyforreply_type')(value)}
              style={{ flex: '0 0 auto' }}
            />
            <Select
              className="FormControl"
              value={this.setting('shebaoting-money.moneyforreply_feedback')()}
              options={{
                feedback: app.translator.trans('shebaoting-money.admin.settings.feedback'),
                no_feedback: app.translator.trans('shebaoting-money.admin.settings.no_feedback'),
              }}
              onchange={(value) => this.setting('shebaoting-money.moneyforreply_feedback')(value)}
              style={{ flex: '0 0 auto' }}
            />
          </div>
          <div className="helpText">{app.translator.trans('shebaoting-money.admin.settings.moneyforreply_help')}</div>
        </div>
      );
    })
    // 注册点赞帖子变动金额设置
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('shebaoting-money.admin.settings.moneyforlike_label')}</label>
          <div className="MoneySettingRow" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <input
              className="FormControl"
              type="number"
              min="0"
              step="any"
              bidi={this.setting('shebaoting-money.moneyforlike')}
              placeholder="0"
              style={{ flex: '1 1 auto' }}
            />
            <Select
              className="FormControl"
              value={this.setting('shebaoting-money.moneyforlike_type')()}
              options={{
                reward: app.translator.trans('shebaoting-money.admin.settings.reward'),
                deduct: app.translator.trans('shebaoting-money.admin.settings.deduct'),
              }}
              onchange={(value) => this.setting('shebaoting-money.moneyforlike_type')(value)}
              style={{ flex: '0 0 auto' }}
            />
            <Select
              className="FormControl"
              value={this.setting('shebaoting-money.moneyforlike_feedback')()}
              options={{
                feedback: app.translator.trans('shebaoting-money.admin.settings.feedback'),
                no_feedback: app.translator.trans('shebaoting-money.admin.settings.no_feedback'),
              }}
              onchange={(value) => this.setting('shebaoting-money.moneyforlike_feedback')(value)}
              style={{ flex: '0 0 auto' }}
            />
          </div>
          <div className="helpText">{app.translator.trans('shebaoting-money.admin.settings.moneyforlike_help')}</div>
        </div>
      );
    })
    .registerSetting({
      setting: 'shebaoting-money.autoremove',
      label: app.translator.trans('shebaoting-money.admin.settings.autoremove'),
      type: 'select',
      options: {
        0: app.translator.trans('shebaoting-money.admin.autoremove.0'),
        1: app.translator.trans('shebaoting-money.admin.autoremove.1'),
        2: app.translator.trans('shebaoting-money.admin.autoremove.2'),
      },
      default: '1',
    })
    .registerSetting({
      setting: 'shebaoting-money.noshowzero',
      label: app.translator.trans('shebaoting-money.admin.settings.noshowzero'),
      type: 'checkbox',
    })
    .registerPermission(
      {
        icon: 'fas fa-money-bill',
        label: app.translator.trans('shebaoting-money.admin.permissions.edit_money_label'),
        permission: 'user.edit_money',
      },
      'moderate'
    );
});
