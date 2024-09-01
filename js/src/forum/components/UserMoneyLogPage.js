import UserPage from 'flarum/components/UserPage';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import Placeholder from 'flarum/components/Placeholder';

export default class UserMoneyLogPage extends UserPage {
  oninit(vnode) {
    super.oninit(vnode);

    this.loading = true;
    this.logs = [];
    this.moreResults = true; // 用于判断是否还有更多数据
    this.pageUrl = app.forum.attribute('apiUrl') + '/money-log';

    this.loadUser(m.route.param('username')); // 加载用户信息

    this.loadLogs();
  }

  // 加载用户的积分变动记录
  loadLogs() {
    if (!this.moreResults) return;

    this.loading = true;

    return app
      .request({
        method: 'GET',
        url: this.pageUrl,
      })
      .then((result) => {
        this.logs = this.logs.concat(result.data);
        this.loading = false;

        // 如果存在下一页链接，更新 `this.pageUrl`，否则设置 `this.moreResults` 为 false
        this.pageUrl = result.links && result.links.next ? result.links.next : null;
        this.moreResults = !!this.pageUrl;

        m.redraw();
      });
  }

  content() {
    if (this.loading && this.logs.length === 0) {
      return LoadingIndicator.component();
    }

    if (this.logs.length === 0) {
      return Placeholder.component({
        text: app.translator.trans('shebaoting-money.forum.no_money_logs'),
      });
    }

    return (
      <div className="UserMoneyLogPage">
        <table className="NotificationGrid">
          <thead>
            <tr>
              <th className="NotificationGrid-groupToggle">
                <i aria-hidden="true" className="icon fas fa-clock"></i> {app.translator.trans('shebaoting-money.forum.log_time')}
              </th>
              <th className="NotificationGrid-groupToggle">
                <i aria-hidden="true" className="icon fas fa-list"></i> {app.translator.trans('shebaoting-money.forum.log_type')}
              </th>
              <th className="NotificationGrid-groupToggle">
                <i aria-hidden="true" className="icon fas fa-coins"></i> {app.translator.trans('shebaoting-money.forum.log_amount')}
              </th>
              <th className="NotificationGrid-groupToggle">
                <i aria-hidden="true" className="icon fas fa-wallet"></i> {app.translator.trans('shebaoting-money.forum.log_balance')}
              </th>
              <th className="NotificationGrid-groupToggle">
                <i aria-hidden="true" className="icon fas fa-info-circle"></i> {app.translator.trans('shebaoting-money.forum.log_description')}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.logs.map((log) => (
              <tr key={log.id}>
                <td className="NotificationGrid-checkbox">
                  <span>{new Date(log.attributes.createdAt).toLocaleString()}</span>
                </td>
                <td className="NotificationGrid-checkbox">
                  <span>{log.attributes.type}</span>
                </td>
                <td className="NotificationGrid-checkbox">
                  <span>{log.attributes.amount}</span>
                </td>
                <td className="NotificationGrid-checkbox">
                  <span>{log.attributes.balance}</span>
                </td>
                <td className="NotificationGrid-checkbox">
                  <span>{log.attributes.description}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.moreResults && (
          <div className="UserMoneyLogPage-loadMore">
            <button className="Button Button--primary" onclick={() => this.loadLogs()}>
              {app.translator.trans('shebaoting-money.forum.load_more')}
            </button>
          </div>
        )}
      </div>
    );
  }
}
