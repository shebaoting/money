import Model from 'flarum/common/Model';

export default class PointLog extends Model {
  createdAt = Model.attribute('createdAt', Model.transformDate);
  balance = Model.attribute('balance');
  amount = Model.attribute('amount');
  reason = Model.attribute('reason');
  action = Model.attribute('action');
  targetUser = Model.attribute('targetUser');
  post = Model.attribute('post');
  discussion = Model.attribute('discussion');
}
