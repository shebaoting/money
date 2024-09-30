/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/index.ts":
/*!*****************************!*\
  !*** ./src/common/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_0__);

flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('shebaoting/money', function () {
  console.log('[shebaoting/money] Hello, forum and admin!');
});

/***/ }),

/***/ "./src/forum/components/UserMoneyLogPage.js":
/*!**************************************************!*\
  !*** ./src/forum/components/UserMoneyLogPage.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserMoneyLogPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/components/UserPage */ "flarum/forum/components/UserPage");
/* harmony import */ var flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Placeholder */ "flarum/common/components/Placeholder");
/* harmony import */ var flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_4__);





var UserMoneyLogPage = /*#__PURE__*/function (_UserPage) {
  function UserMoneyLogPage() {
    return _UserPage.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UserMoneyLogPage, _UserPage);
  var _proto = UserMoneyLogPage.prototype;
  _proto.oninit = function oninit(vnode) {
    _UserPage.prototype.oninit.call(this, vnode);
    this.loading = true;
    this.logs = [];
    this.page = 0;
    this.moreResults = true;

    // 确保用户已登录
    if (!(flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().session).user) {
      flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().alerts.show({
        type: 'error'
      }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('core.forum.error.not_authenticated'));
      m.route.set(flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().route('index'));
      return;
    }

    // 将当前用户设置为 this.user
    this.user = (flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().session).user;

    // 手动调用 onuserloaded
    this.onuserloaded();
  };
  _proto.onuserloaded = function onuserloaded() {
    this.loadLogs();
  }

  // 加载积分变动记录
  ;
  _proto.loadLogs = function loadLogs() {
    var _this = this;
    if (!this.moreResults) return;
    this.loading = true;
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().store.find('money-log', {
      page: {
        offset: this.page * 20
      }
    }).then(function (logs) {
      console.log('logs', logs);
      _this.logs = _this.logs.concat(logs);
      _this.loading = false;
      _this.page++;
      if (logs.length < 20) {
        _this.moreResults = false;
      }
      m.redraw();
    })["catch"](function (err) {
      console.error('Error loading logs:', err);
      _this.loading = false;
      m.redraw();
    });
  };
  _proto.content = function content() {
    var _this2 = this;
    return m("div", {
      className: "UserMoneyLogPage"
    }, this.loading && this.logs.length === 0 ? m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2___default()), null) : this.logs.length === 0 ? m((flarum_common_components_Placeholder__WEBPACK_IMPORTED_MODULE_3___default()), {
      text: flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('shebaoting-money.forum.point_log.empty_text')
    }) : m("div", {
      className: "UserMoneyLogPage-content"
    }, m("table", {
      className: "NotificationGrid"
    }, m("thead", null, m("tr", null, m("th", null, m("i", {
      "aria-hidden": "true",
      className: "icon fas fa-clock"
    }), flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('shebaoting-money.forum.point_log.table.headers.date')), m("th", null, m("i", {
      "aria-hidden": "true",
      className: "icon fas fa-list"
    }), flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('shebaoting-money.forum.point_log.table.headers.amount')), m("th", null, m("i", {
      "aria-hidden": "true",
      className: "icon fas fa-coins"
    }), flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('shebaoting-money.forum.point_log.table.headers.balance')), m("th", null, m("i", {
      "aria-hidden": "true",
      className: "icon fas fa-info-circle"
    }), flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('shebaoting-money.forum.point_log.table.headers.reason')))), m("tbody", null, this.logs.map(function (log) {
      console.log(log);
      var action = log.action();
      var description = '';
      var balance = log.balance();
      var createdAt = new Date(log.createdAt()).toLocaleString();
      var amount = log.amount();
      // 构建原因描述
      if (action === 'post') {
        // 创建主题
        var discussion = log.discussion();
        var title = discussion ? discussion.title : '';
        var url = discussion ? flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().route('discussion', {
          id: discussion.id,
          slug: discussion.slug
        }) : '#';
        description = flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('shebaoting-money.forum.logs_description.created_discussion', {
          title: title,
          url: url
        });
      } else if (action === 'reply') {
        // 创建回复
        var _discussion = log.discussion();
        var _title = _discussion ? _discussion.title : '';
        var _url = _discussion ? flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().route('discussion', {
          id: _discussion.id,
          slug: _discussion.slug
        }) : '#';
        description = flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('shebaoting-money.forum.logs_description.created_reply', {
          title: _title,
          url: _url
        });
      } else if (action === 'reply_received') {
        // 收到回复
        var targetUser = log.targetUser();
        var username = targetUser ? targetUser.username : '';
        var _discussion2 = log.discussion();
        var _title2 = _discussion2 ? _discussion2.title : '';
        var _url2 = _discussion2 ? flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().route('discussion', {
          id: _discussion2.id,
          slug: _discussion2.slug
        }) : '#';
        description = flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('shebaoting-money.forum.logs_description.reply_received', {
          username: username,
          title: _title2,
          url: _url2
        });
      } else if (action === 'like') {
        // 点赞帖子
        var _discussion3 = log.discussion();
        var _title3 = _discussion3 ? _discussion3.title : '';
        var _url3 = _discussion3 ? flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().route('discussion', {
          id: _discussion3.id,
          slug: _discussion3.slug
        }) : '#';
        description = flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('shebaoting-money.forum.logs_description.liked_post', {
          title: _title3,
          url: _url3
        });
      } else if (action === 'liked_by') {
        // 被点赞
        var _targetUser = log.targetUser();
        var _username = _targetUser ? _targetUser.username : '';
        var _discussion4 = log.discussion();
        var _title4 = _discussion4 ? _discussion4.title : '';
        var _url4 = _discussion4 ? flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().route('discussion', {
          id: _discussion4.id,
          slug: _discussion4.slug
        }) : '#';
        description = flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('shebaoting-money.forum.logs_description.liked_by', {
          username: _username,
          title: _title4,
          url: _url4
        });
      } else if (action === 'unlike') {
        // 取消点赞帖子
        var _discussion5 = log.discussion();
        var _title5 = _discussion5 ? _discussion5.title : '';
        var _url5 = _discussion5 ? flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().route('discussion', {
          id: _discussion5.id,
          slug: _discussion5.slug
        }) : '#';
        description = flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('shebaoting-money.forum.logs_description.unliked_post', {
          title: _title5,
          url: _url5
        });
      } else if (action === 'unliked_by') {
        // 被取消点赞
        var _targetUser2 = log.targetUser();
        var _username2 = _targetUser2 ? _targetUser2.username : '';
        var _discussion6 = log.discussion();
        var _title6 = _discussion6 ? _discussion6.title : '';
        var _url6 = _discussion6 ? flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().route('discussion', {
          id: _discussion6.id,
          slug: _discussion6.slug
        }) : '#';
        description = flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('shebaoting-money.forum.logs_description.unliked_by', {
          username: _username2,
          title: _title6,
          url: _url6
        });
      } else {
        description = log.reason();
      }
      console.log('discussion', log.discussion());
      console.log('description', description, typeof description);
      // const descriptionString = description.join('');
      return m("tr", {
        key: log.id()
      }, m("td", null, createdAt), m("td", null, amount), m("td", null, balance), m("td", null, m.trust(description)), " ");
    }))), this.moreResults && m("div", {
      className: "UserMoneyLogPage-loadMore"
    }, m("button", {
      className: "Button Button--primary",
      onclick: function onclick() {
        return _this2.loadLogs();
      }
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_4___default().translator.trans('shebaoting-money.forum.point_log.load_more')))));
  };
  return UserMoneyLogPage;
}((flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/components/UserMoneyModal.js":
/*!************************************************!*\
  !*** ./src/forum/components/UserMoneyModal.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserMoneyModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/Stream */ "flarum/utils/Stream");
/* harmony import */ var flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_3__);




var UserMoneyModal = /*#__PURE__*/function (_Modal) {
  function UserMoneyModal() {
    return _Modal.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UserMoneyModal, _Modal);
  var _proto = UserMoneyModal.prototype;
  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);
    this.money = flarum_utils_Stream__WEBPACK_IMPORTED_MODULE_3___default()(this.attrs.user.data.attributes['money'] || 0.0);
  };
  _proto.className = function className() {
    return 'UserMoneyModal Modal--small';
  };
  _proto.title = function title() {
    return app.translator.trans('shebaoting-money.forum.modal.title', {
      user: this.attrs.user
    });
  };
  _proto.content = function content() {
    var moneyName = app.forum.attribute('shebaoting-money.moneyname') || '[money]';
    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form"
    }, m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('shebaoting-money.forum.modal.current'), " ", moneyName.replace('[money]', this.attrs.user.data.attributes['money'])), m("input", {
      required: true,
      className: "FormControl",
      type: "number",
      step: "any",
      bidi: this.money
    })), m("div", {
      className: "Form-group"
    }, flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
      className: 'Button Button--primary',
      type: 'submit',
      loading: this.loading
    }, app.translator.trans('shebaoting-money.forum.modal.submit_button')))));
  };
  _proto.onsubmit = function onsubmit(e) {
    var _this = this;
    e.preventDefault();
    this.loading = true;
    this.attrs.user.save({
      money: this.money()
    }, {
      errorHandler: this.onerror.bind(this)
    }).then(this.hide.bind(this))["catch"](function () {
      _this.loading = false;
      m.redraw();
    });
  };
  return UserMoneyModal;
}((flarum_components_Modal__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_UserCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/UserCard */ "flarum/components/UserCard");
/* harmony import */ var flarum_components_UserCard__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_UserCard__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/utils/UserControls */ "flarum/utils/UserControls");
/* harmony import */ var flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/LinkButton */ "flarum/components/LinkButton");
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_UserMoneyModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/UserMoneyModal */ "./src/forum/components/UserMoneyModal.js");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/models/User */ "flarum/models/User");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_models_User__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_utils_PostControls__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/utils/PostControls */ "flarum/utils/PostControls");
/* harmony import */ var flarum_utils_PostControls__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_PostControls__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_UserMoneyLogPage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/UserMoneyLogPage */ "./src/forum/components/UserMoneyLogPage.js");
/* harmony import */ var _models_PointLog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./models/PointLog */ "./src/forum/models/PointLog.js");
/* harmony import */ var flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! flarum/forum/components/UserPage */ "flarum/forum/components/UserPage");
/* harmony import */ var flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_12__);













flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('shebaoting-money', function () {
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().store).models['money-logs'] = _models_PointLog__WEBPACK_IMPORTED_MODULE_11__["default"];
  (flarum_models_User__WEBPACK_IMPORTED_MODULE_8___default().prototype).canEditMoney = flarum_Model__WEBPACK_IMPORTED_MODULE_7___default().attribute('canEditMoney');
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().routes)['user.money-log'] = {
    path: '/u/:username/money-log',
    component: _components_UserMoneyLogPage__WEBPACK_IMPORTED_MODULE_10__["default"]
  };
  (0,flarum_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_components_UserCard__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'infoItems', function (items) {
    var money = this.attrs.user.data.attributes['money'] || 0;
    var moneyName = flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('shebaoting-money.moneyname') || '[money]';

    // 获取后台设置的货币等级名称和进制
    var levelNames = (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('shebaoting-money.level_names') || '').split(',');
    var scale = parseInt(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('shebaoting-money.money_scale') || '100');

    // 判断是否有设置货币等级名称
    if (levelNames.length > 1 && levelNames[0] !== '') {
      var remainingMoney = money;
      var levelValues = [];
      for (var i = 0; i < levelNames.length; i++) {
        var levelValue = Math.floor(remainingMoney / Math.pow(scale, levelNames.length - 1 - i));
        remainingMoney = remainingMoney % Math.pow(scale, levelNames.length - 1 - i);

        // 给每个等级名称和数值之间增加一些间距
        levelValues.push(m('span', {
          style: {
            marginRight: '15px'
          }
        }, levelNames[i] + " " + levelValue));
      }
      items.add('money', m('div', levelValues)); // 使用 div 容器包裹
    } else {
      // 如果没有设置货币等级名称，则使用默认的货币名称
      items.add('money', m('span', moneyName.replace('[money]', money)));
    }
  });

  // 扩展 UserPage 的 navItems，添加“积分记录”链接
  (0,flarum_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_12___default().prototype), 'navItems', function (items) {
    var user = this.user;

    // 只有在查看自己的个人资料时才显示链接
    if ((flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session).user && flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session.user.id() === user.id()) {
      items.add('moneyLogs', flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_5___default().component({
        href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().route('user.money-log', {
          username: user.username()
        }),
        name: 'moneyLogs',
        icon: 'fas fa-coins'
      }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.forum.point_log.link')), 10);
    }
  });
  (0,flarum_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_utils_UserControls__WEBPACK_IMPORTED_MODULE_3___default()), 'moderationControls', function (items, user) {
    if (user.canEditMoney()) {
      items.add('money', flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default().component({
        icon: 'fas fa-money-bill',
        onclick: function onclick() {
          return flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().modal.show(_components_UserMoneyModal__WEBPACK_IMPORTED_MODULE_6__["default"], {
            user: user
          });
        }
      }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.forum.user_controls.money_button')));
    }
  });
  (0,flarum_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_utils_PostControls__WEBPACK_IMPORTED_MODULE_9___default()), 'likeAction', function (items, post) {
    var user = (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session).user;
    var moneyForLike = parseFloat(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().forum.attribute('shebaoting-money.moneyforlike') || 0);
    if (moneyForLike < 0 && user.money < Math.abs(moneyForLike)) {
      items.add('like', flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default().component({
        icon: 'fas fa-thumbs-up',
        className: 'Button Button--link',
        onclick: function onclick() {
          alert(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.forum.errors.not_enough_money'));
        }
      }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('core.forum.post.like_link')), 20);
    } else {
      // Call the original like functionality here
      items.add('like', flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default().component({
        icon: 'fas fa-thumbs-up',
        className: 'Button Button--link',
        onclick: function onclick() {
          post.save({
            isLiked: !post.isLiked()
          });
        }
      }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('core.forum.post.like_link')), 20);
    }
  });
});

/***/ }),

/***/ "./src/forum/models/PointLog.js":
/*!**************************************!*\
  !*** ./src/forum/models/PointLog.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PointLog)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);


var PointLog = /*#__PURE__*/function (_Model) {
  function PointLog() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Model.call.apply(_Model, [this].concat(args)) || this;
    _this.createdAt = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('createdAt', (flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().transformDate));
    _this.balance = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('balance');
    _this.amount = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('amount');
    _this.reason = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('reason');
    _this.action = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('action');
    _this.targetUser = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('targetUser');
    _this.post = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('post');
    _this.discussion = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('discussion');
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(PointLog, _Model);
  return PointLog;
}((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "flarum/Model":
/*!**********************************************!*\
  !*** external "flarum.core.compat['Model']" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['Model'];

/***/ }),

/***/ "flarum/common/Model":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['common/Model']" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Model'];

/***/ }),

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/app'];

/***/ }),

/***/ "flarum/common/components/LoadingIndicator":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/LoadingIndicator']" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LoadingIndicator'];

/***/ }),

/***/ "flarum/common/components/Placeholder":
/*!**********************************************************************!*\
  !*** external "flarum.core.compat['common/components/Placeholder']" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Placeholder'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/LinkButton":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['components/LinkButton']" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/LinkButton'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/UserCard":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/UserCard']" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/UserCard'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/UserPage":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['forum/components/UserPage']" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/UserPage'];

/***/ }),

/***/ "flarum/models/User":
/*!****************************************************!*\
  !*** external "flarum.core.compat['models/User']" ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['models/User'];

/***/ }),

/***/ "flarum/utils/PostControls":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['utils/PostControls']" ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['utils/PostControls'];

/***/ }),

/***/ "flarum/utils/Stream":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['utils/Stream']" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['utils/Stream'];

/***/ }),

/***/ "flarum/utils/UserControls":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['utils/UserControls']" ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['utils/UserControls'];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t, o);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.ts");
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map