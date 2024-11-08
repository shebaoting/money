import UserPage from 'flarum/forum/components/UserPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import app from 'flarum/forum/app';

export default class UserMoneyLogPage extends UserPage {
  oninit(vnode) {
    super.oninit(vnode);
    this.loading = true;
    this.logs = [];
    this.page = 0;
    this.moreResults = true;

    // 确保用户已登录
    if (!app.session.user) {
      app.alerts.show({ type: 'error' }, app.translator.trans('core.forum.error.not_authenticated'));
      m.route.set(app.route('index'));
      return;
    }

    // 将当前用户设置为 this.user
    this.user = app.session.user;

    // 手动调用 onuserloaded
    this.onuserloaded();
  }

  onuserloaded() {
    this.loadLogs();
  }

  // 加载积分变动记录
  loadLogs() {
    if (!this.moreResults) return;

    this.loading = true;

    app.store
      .find('money-log', {
        page: { offset: this.page * 20 },
      })
      .then((logs) => {
        console.log('logs', logs);
        this.logs = this.logs.concat(logs);
        this.loading = false;
        this.page++;

        if (logs.length < 20) {
          this.moreResults = false;
        }

        m.redraw();
      })
      .catch((err) => {
        console.error('Error loading logs:', err);
        this.loading = false;
        m.redraw();
      });
  }

  content() {
    return (
      <div className="UserMoneyLogPage">
        {this.loading && this.logs.length === 0 ? (
          <LoadingIndicator />
        ) : this.logs.length === 0 ? (
          <Placeholder text={app.translator.trans('shebaoting-money.forum.point_log.empty_text')} />
        ) : (
          <div className="UserMoneyLogPage-content">
            <table className="NotificationGrid">
              <thead>
                <tr>
                  <th>
                    <i aria-hidden="true" className="icon fas fa-clock"></i>
                    {app.translator.trans('shebaoting-money.forum.point_log.table.headers.date')}
                  </th>
                  <th>
                    <i aria-hidden="true" className="icon fas fa-list"></i>
                    {app.translator.trans('shebaoting-money.forum.point_log.table.headers.amount')}
                  </th>
                  <th>
                    <i aria-hidden="true" className="icon fas fa-coins"></i>
                    {app.translator.trans('shebaoting-money.forum.point_log.table.headers.balance')}
                  </th>
                  <th>
                    <i aria-hidden="true" className="icon fas fa-info-circle"></i>
                    {app.translator.trans('shebaoting-money.forum.point_log.table.headers.reason')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.logs.map((log) => {
                  console.log(log);
                  const action = log.action();
                  let description = '';
                  const balance = log.balance();
                  const createdAt = new Date(log.createdAt()).toLocaleString();
                  const amount = log.amount();
                  // 构建原因描述
                  if (action === 'post') {
                    // 创建主题
                    const discussion = log.discussion();
                    const title = discussion ? discussion.title : '';
                    const url = discussion ? app.route('discussion', { id: discussion.id, slug: discussion.slug }) : '#';

                    description = app.translator.trans('shebaoting-money.forum.logs_description.created_discussion', {
                      title,
                      url,
                    });
                  } else if (action === 'reply') {
                    // 创建回复
                    const discussion = log.discussion();
                    const title = discussion ? discussion.title : '';
                    const url = discussion ? app.route('discussion', { id: discussion.id, slug: discussion.slug }) : '#';

                    description = app.translator.trans('shebaoting-money.forum.logs_description.created_reply', {
                      title,
                      url,
                    });
                  } else if (action === 'reply_received') {
                    // 收到回复
                    const targetUser = log.targetUser();
                    const username = targetUser ? targetUser.username : '';
                    const discussion = log.discussion();
                    const title = discussion ? discussion.title : '';
                    const url = discussion ? app.route('discussion', { id: discussion.id, slug: discussion.slug }) : '#';

                    description = app.translator.trans('shebaoting-money.forum.logs_description.reply_received', {
                      username,
                      title,
                      url,
                    });
                  } else if (action === 'like') {
                    // 点赞帖子
                    const discussion = log.discussion();
                    const title = discussion ? discussion.title : '';
                    const url = discussion ? app.route('discussion', { id: discussion.id, slug: discussion.slug }) : '#';

                    description = app.translator.trans('shebaoting-money.forum.logs_description.liked_post', {
                      title,
                      url,
                    });
                  } else if (action === 'liked_by') {
                    // 被点赞
                    const targetUser = log.targetUser();
                    const username = targetUser ? targetUser.username : '';
                    const discussion = log.discussion();
                    const title = discussion ? discussion.title : '';
                    const url = discussion ? app.route('discussion', { id: discussion.id, slug: discussion.slug }) : '#';

                    description = app.translator.trans('shebaoting-money.forum.logs_description.liked_by', {
                      username,
                      title,
                      url,
                    });
                  } else if (action === 'unlike') {
                    // 取消点赞帖子
                    const discussion = log.discussion();
                    const title = discussion ? discussion.title : '';
                    const url = discussion ? app.route('discussion', { id: discussion.id, slug: discussion.slug }) : '#';

                    description = app.translator.trans('shebaoting-money.forum.logs_description.unliked_post', {
                      title,
                      url,
                    });
                  } else if (action === 'unliked_by') {
                    // 被取消点赞
                    const targetUser = log.targetUser();
                    const username = targetUser ? targetUser.username : '';
                    const discussion = log.discussion();
                    const title = discussion ? discussion.title : '';
                    const url = discussion ? app.route('discussion', { id: discussion.id, slug: discussion.slug }) : '#';

                    description = app.translator.trans('shebaoting-money.forum.logs_description.unliked_by', {
                      username,
                      title,
                      url,
                    });
                  } else {
                    description = log.reason();
                  }

                  console.log('discussion', log.discussion());
                  console.log('description', description, typeof description);
                  // const descriptionString = description.join('');
                  return (
                    <tr key={log.id()}>
                      <td>{createdAt}</td>
                      <td>{amount}</td>
                      <td>{balance}</td>
                      <td>{m.trust(description)}</td> {/* 传递单一字符串 */}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {this.moreResults && (
              <div className="UserMoneyLogPage-loadMore">
                <button className="Button Button--primary" onclick={() => this.loadLogs()}>
                  {app.translator.trans('shebaoting-money.forum.point_log.load_more')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
