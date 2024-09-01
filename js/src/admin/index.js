import app from 'flarum/admin/app';

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
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('shebaoting-money.admin.settings.moneyforpost')}</label>
          <input type="number" className="FormControl" step="any" bidi={this.setting('shebaoting-money.moneyforpost')} />
        </div>
      );
    })
    .registerSetting({
      setting: 'shebaoting-money.postminimumlength',
      label: app.translator.trans('shebaoting-money.admin.settings.postminimumlength'),
      type: 'number',
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('shebaoting-money.admin.settings.moneyfordiscussion')}</label>
          <input type="number" className="FormControl" step="any" bidi={this.setting('shebaoting-money.moneyfordiscussion')} />
        </div>
      );
    })
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>{app.translator.trans('shebaoting-money.admin.settings.moneyforlike')}</label>
          <div class="helpText">{app.translator.trans('shebaoting-money.admin.settings.helpextensionlikes')}</div>
          <input type="number" className="FormControl" step="any" bidi={this.setting('shebaoting-money.moneyforlike')} />
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
