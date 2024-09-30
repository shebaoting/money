(()=>{var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var a in n)e.o(n,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:n[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};(()=>{"use strict";const t=flarum.core.compat["common/app"];e.n(t)().initializers.add("shebaoting/money",(function(){console.log("[shebaoting/money] Hello, forum and admin!")}));const n=flarum.core.compat["admin/app"];var a=e.n(n);const o=flarum.core.compat["common/components/Select"];var s=e.n(o);flarum.core.compat["admin/utils/saveSettings"],flarum.core.compat["common/components/Button"],a().initializers.add("shebaoting-money",(function(){a().extensionData.for("shebaoting-money").registerSetting({setting:"shebaoting-money.moneyname",label:a().translator.trans("shebaoting-money.admin.settings.moneyname"),type:"text"}).registerSetting({setting:"shebaoting-money.initialmoney",label:a().translator.trans("shebaoting-money.admin.settings.initialmoney"),type:"number",min:0,help:a().translator.trans("shebaoting-money.admin.settings.initialmoney_help")}).registerSetting({setting:"shebaoting-money.level_names",label:a().translator.trans("shebaoting-money.admin.settings.level_names"),type:"text",help:a().translator.trans("shebaoting-money.admin.settings.level_names_help"),placeholder:"金豆,银豆,铜豆"}).registerSetting({setting:"shebaoting-money.money_scale",label:a().translator.trans("shebaoting-money.admin.settings.money_scale"),type:"number",min:1,help:a().translator.trans("shebaoting-money.admin.settings.money_scale_help")}).registerSetting((function(){var e=this;return m("div",{className:"Form-group"},m("label",null,a().translator.trans("shebaoting-money.admin.settings.moneyforpost_label")),m("div",{className:"MoneySettingRow",style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"}},m("input",{className:"FormControl",type:"number",min:"0",step:"any",bidi:this.setting("shebaoting-money.moneyforpost"),placeholder:"0",style:{flex:"1 1 auto"}}),m(s(),{className:"FormControl",value:this.setting("shebaoting-money.moneyforpost_type")(),options:{reward:a().translator.trans("shebaoting-money.admin.settings.reward"),deduct:a().translator.trans("shebaoting-money.admin.settings.deduct")},onchange:function(t){return e.setting("shebaoting-money.moneyforpost_type")(t)},style:{flex:"0 0 auto"}})),m("div",{className:"helpText"},a().translator.trans("shebaoting-money.admin.settings.moneyforpost_help")))})).registerSetting((function(){var e=this;return m("div",{className:"Form-group"},m("label",null,a().translator.trans("shebaoting-money.admin.settings.moneyforreply_label")),m("div",{className:"MoneySettingRow",style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"}},m("input",{className:"FormControl",type:"number",min:"0",step:"any",bidi:this.setting("shebaoting-money.moneyforreply"),placeholder:"0",style:{flex:"1 1 auto"}}),m(s(),{className:"FormControl",value:this.setting("shebaoting-money.moneyforreply_type")(),options:{reward:a().translator.trans("shebaoting-money.admin.settings.reward"),deduct:a().translator.trans("shebaoting-money.admin.settings.deduct")},onchange:function(t){return e.setting("shebaoting-money.moneyforreply_type")(t)},style:{flex:"0 0 auto"}}),m(s(),{className:"FormControl",value:this.setting("shebaoting-money.moneyforreply_feedback")(),options:{feedback:a().translator.trans("shebaoting-money.admin.settings.feedback"),no_feedback:a().translator.trans("shebaoting-money.admin.settings.no_feedback")},onchange:function(t){return e.setting("shebaoting-money.moneyforreply_feedback")(t)},style:{flex:"0 0 auto"}})),m("div",{className:"helpText"},a().translator.trans("shebaoting-money.admin.settings.moneyforreply_help")))})).registerSetting((function(){var e=this;return m("div",{className:"Form-group"},m("label",null,a().translator.trans("shebaoting-money.admin.settings.moneyforlike_label")),m("div",{className:"MoneySettingRow",style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"}},m("input",{className:"FormControl",type:"number",min:"0",step:"any",bidi:this.setting("shebaoting-money.moneyforlike"),placeholder:"0",style:{flex:"1 1 auto"}}),m(s(),{className:"FormControl",value:this.setting("shebaoting-money.moneyforlike_type")(),options:{reward:a().translator.trans("shebaoting-money.admin.settings.reward"),deduct:a().translator.trans("shebaoting-money.admin.settings.deduct")},onchange:function(t){return e.setting("shebaoting-money.moneyforlike_type")(t)},style:{flex:"0 0 auto"}}),m(s(),{className:"FormControl",value:this.setting("shebaoting-money.moneyforlike_feedback")(),options:{feedback:a().translator.trans("shebaoting-money.admin.settings.feedback"),no_feedback:a().translator.trans("shebaoting-money.admin.settings.no_feedback")},onchange:function(t){return e.setting("shebaoting-money.moneyforlike_feedback")(t)},style:{flex:"0 0 auto"}})),m("div",{className:"helpText"},a().translator.trans("shebaoting-money.admin.settings.moneyforlike_help")))})).registerSetting({setting:"shebaoting-money.autoremove",label:a().translator.trans("shebaoting-money.admin.settings.autoremove"),type:"select",options:{0:a().translator.trans("shebaoting-money.admin.autoremove.0"),1:a().translator.trans("shebaoting-money.admin.autoremove.1"),2:a().translator.trans("shebaoting-money.admin.autoremove.2")},default:"1"}).registerSetting({setting:"shebaoting-money.noshowzero",label:a().translator.trans("shebaoting-money.admin.settings.noshowzero"),type:"checkbox"}).registerPermission({icon:"fas fa-money-bill",label:a().translator.trans("shebaoting-money.admin.permissions.edit_money_label"),permission:"user.edit_money"},"moderate")}))})(),module.exports={}})();
//# sourceMappingURL=admin.js.map