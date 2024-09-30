/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_admin_utils_saveSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/admin/utils/saveSettings */ "flarum/admin/utils/saveSettings");
/* harmony import */ var flarum_admin_utils_saveSettings__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_utils_saveSettings__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);




flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('shebaoting-money', function () {
  flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().extensionData["for"]('shebaoting-money').registerSetting({
    setting: 'shebaoting-money.moneyname',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.moneyname'),
    type: 'text'
  }).registerSetting({
    setting: 'shebaoting-money.initialmoney',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.initialmoney'),
    type: 'number',
    min: 0,
    help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.initialmoney_help')
  }).registerSetting({
    setting: 'shebaoting-money.level_names',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.level_names'),
    type: 'text',
    help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.level_names_help'),
    placeholder: '金豆,银豆,铜豆'
  }).registerSetting({
    setting: 'shebaoting-money.money_scale',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.money_scale'),
    type: 'number',
    min: 1,
    help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.money_scale_help')
  })
  // 注册新帖变动金额设置
  .registerSetting(function () {
    var _this = this;
    return m("div", {
      className: "Form-group"
    }, m("label", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.moneyforpost_label')), m("div", {
      className: "MoneySettingRow",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap'
      }
    }, m("input", {
      className: "FormControl",
      type: "number",
      min: "0",
      step: "any",
      bidi: this.setting('shebaoting-money.moneyforpost'),
      placeholder: "0",
      style: {
        flex: '1 1 auto'
      }
    }), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_1___default()), {
      className: "FormControl",
      value: this.setting('shebaoting-money.moneyforpost_type')(),
      options: {
        reward: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.reward'),
        deduct: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.deduct')
      },
      onchange: function onchange(value) {
        return _this.setting('shebaoting-money.moneyforpost_type')(value);
      },
      style: {
        flex: '0 0 auto'
      }
    })), m("div", {
      className: "helpText"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.moneyforpost_help')));
  })
  // 注册回复变动金额设置
  .registerSetting(function () {
    var _this2 = this;
    return m("div", {
      className: "Form-group"
    }, m("label", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.moneyforreply_label')), m("div", {
      className: "MoneySettingRow",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap'
      }
    }, m("input", {
      className: "FormControl",
      type: "number",
      min: "0",
      step: "any",
      bidi: this.setting('shebaoting-money.moneyforreply'),
      placeholder: "0",
      style: {
        flex: '1 1 auto'
      }
    }), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_1___default()), {
      className: "FormControl",
      value: this.setting('shebaoting-money.moneyforreply_type')(),
      options: {
        reward: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.reward'),
        deduct: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.deduct')
      },
      onchange: function onchange(value) {
        return _this2.setting('shebaoting-money.moneyforreply_type')(value);
      },
      style: {
        flex: '0 0 auto'
      }
    }), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_1___default()), {
      className: "FormControl",
      value: this.setting('shebaoting-money.moneyforreply_feedback')(),
      options: {
        feedback: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.feedback'),
        no_feedback: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.no_feedback')
      },
      onchange: function onchange(value) {
        return _this2.setting('shebaoting-money.moneyforreply_feedback')(value);
      },
      style: {
        flex: '0 0 auto'
      }
    })), m("div", {
      className: "helpText"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.moneyforreply_help')));
  })
  // 注册点赞帖子变动金额设置
  .registerSetting(function () {
    var _this3 = this;
    return m("div", {
      className: "Form-group"
    }, m("label", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.moneyforlike_label')), m("div", {
      className: "MoneySettingRow",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap'
      }
    }, m("input", {
      className: "FormControl",
      type: "number",
      min: "0",
      step: "any",
      bidi: this.setting('shebaoting-money.moneyforlike'),
      placeholder: "0",
      style: {
        flex: '1 1 auto'
      }
    }), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_1___default()), {
      className: "FormControl",
      value: this.setting('shebaoting-money.moneyforlike_type')(),
      options: {
        reward: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.reward'),
        deduct: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.deduct')
      },
      onchange: function onchange(value) {
        return _this3.setting('shebaoting-money.moneyforlike_type')(value);
      },
      style: {
        flex: '0 0 auto'
      }
    }), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_1___default()), {
      className: "FormControl",
      value: this.setting('shebaoting-money.moneyforlike_feedback')(),
      options: {
        feedback: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.feedback'),
        no_feedback: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.no_feedback')
      },
      onchange: function onchange(value) {
        return _this3.setting('shebaoting-money.moneyforlike_feedback')(value);
      },
      style: {
        flex: '0 0 auto'
      }
    })), m("div", {
      className: "helpText"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.moneyforlike_help')));
  }).registerSetting({
    setting: 'shebaoting-money.autoremove',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.autoremove'),
    type: 'select',
    options: {
      0: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.autoremove.0'),
      1: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.autoremove.1'),
      2: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.autoremove.2')
    },
    "default": '1'
  }).registerSetting({
    setting: 'shebaoting-money.noshowzero',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.settings.noshowzero'),
    type: 'checkbox'
  }).registerPermission({
    icon: 'fas fa-money-bill',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('shebaoting-money.admin.permissions.edit_money_label'),
    permission: 'user.edit_money'
  }, 'moderate');
});

/***/ }),

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

/***/ "flarum/admin/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['admin/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/app'];

/***/ }),

/***/ "flarum/admin/utils/saveSettings":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['admin/utils/saveSettings']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/utils/saveSettings'];

/***/ }),

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/app'];

/***/ }),

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/Select":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Select']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Select'];

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
  !*** ./admin.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.ts");
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map