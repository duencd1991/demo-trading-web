webpackJsonp([26],{1264:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r,a,s,l,u,c,d;Object.defineProperty(t,"__esModule",{value:!0}),r=function(){function e(e,t){var n,i;for(n=0;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),n(118),a=n(80),s=n(1265),l=i(s),u=n(4),c=i(u),d=function(){function e(t){o(this,e),this._bridge=t,this._trading=(0,a.tradingService)(),this.onBrokerChange(this._trading.activeBroker()),this._trading.onBrokerChange.subscribe(this,this.onBrokerChange)}return r(e,[{key:"activate",value:function(){this._accountManager&&this._accountManager.drawAttention&&this._accountManager.drawAttention()}},{key:"onBrokerChange",value:function(e){var t=this;this._accountManager&&this._accountManager.remove(),e?n.e(40).then(function(i){var o=n(1165);t._accountManager=new o(e,t._bridge)}.bind(null,n)).catch(n.oe):this._accountManager=new l.default(this._bridge,this._trading)}}],[{key:"onTabShow",value:function(e){var t=e.$button;t.find(".title").html('\n\t\t\t<span class="js-indicator">'+n(1267)+'</span>\n\t\t\t<span class="js-broker">'+(c.default.enabled("trading_terminal")?$.t("Account Manager"):$.t("Trading Panel"))+"</span>\n\t\t"),t.attr("title",$.t("Open Account Manager")),t.find(".js-indicator").addClass("js-hidden")}}]),e}(),t.default=d,e.exports=t.default},1265:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r,a,s,l,u,c;Object.defineProperty(t,"__esModule",{value:!0}),r=function(){function e(e,t){var n,i;for(n=0;n<t.length;n++)i=t[n],i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=n(1266),s=n(384),l=n(15),u=i(l),c=function(){function e(t,n){o(this,e),this._UILocked=!1,this._brokerButtons={},this._bridge=t,this._trading=n,this._brokers=this._trading.availableBrokers(),this._filter=new u.default(TVSettings.getBool(s.settingsKeys.FILTER_BROKER,!0)),this._filter.subscribe(this._onFilterChanged.bind(this)),this._createLayout(),0===this._brokers.length?this._header.text($.t("No brokers available")):(this._setPanelMsg(),this._setFilter(),window.loginStateChange.subscribe(this,this._setPanelMsg)),this._trading.onBrokerLoading.subscribe(this,this._onStaffLoading),this._trading.onNeedSelectBroker.subscribe(this,this._onDrawAttention)}return r(e,[{key:"_setPanelMsg",value:function(){window.is_authenticated?this._header.text($.t("Select your broker to connect the broker account:")):this._header.text($.t("Please log into your TradingView account first."))}},{key:"_setFilter",value:function(){var e=this,t=0,n="trading-broker-select-screen--filtered";this._$element.removeClass(n),
Object.values(this._brokers).forEach(function(n){!n.locales||n.locales&&n.locales.length&&-1!==n.locales.indexOf(window.locale)?e._brokerButtons[n.id].removeClass("i-hidden"):(e._brokerButtons[n.id].addClass("i-hidden"),t++)}),t&&(this._$element.addClass(n),this._filter.value()?(this._$filterBox.text($.t("Brokers are filtered for your region. Hidden {0} broker(s).").format(t)+" "),$("<span>").text($.t("Show all.")).on("click",function(){return e._filter.setValue(!1)}).appendTo(this._$filterBox)):(Object.values(this._brokerButtons).forEach(function(e){return e.removeClass("i-hidden")}),this._$filterBox.text(""),$("<span>").text($.t("Filter brokers for your region.")).on("click",function(){return e._filter.setValue(!0)}).appendTo(this._$filterBox)))}},{key:"_onFilterChanged",value:function(){TVSettings.setValue(s.settingsKeys.FILTER_BROKER,this._filter.value(),{forceFlush:!0}),this._setFilter()}},{key:"_onStaffLoading",value:function(e){var t=this,n=e.brokerId,i=e.promise;this._lockUI(n),this._header.text("Loading..."),i.then(function(){t._unlockUI()}).catch(function(){t._header.text("An error occured"),t._unlockUI()})}},{key:"_onDrawAttention",value:function(){this._drawAttention()}},{key:"_drawAttention",value:function(){(0,a.runForTimes)(a.flick,3,this._header,"color","black")}},{key:"_createLayout",value:function(){if(!this._$element){this._$element=$("<div>").addClass("trading-broker-select-screen"),this._header=$("<h2>"),this._header.appendTo(this._$element),this._buttonsWrapper=$("<div>").addClass("trading-broker-buttons-wrapper"),this._buttonsWrapper.appendTo(this._$element);for(var e=0;e<this._brokers.length;e++)this._$element.append(this._createBrokerButton(this._brokers[e]));this._$element.appendTo(this._bridge.$body),this._$filterBox=$("<div>").addClass("trading-broker-filter"),this._$filterBox.appendTo(this._$element)}}},{key:"_createBrokerButton",value:function(e){var t=this,n=e.id,i=$("<span>").addClass("trading-broker-button").addClass("broker-"+n).attr("tabIndex",-1).on("click",function(){t._trading.selectBrokerUI(n)});i.append(e.icon),i.appendTo(this._buttonsWrapper),this._brokerButtons[n]=i}},{key:"_lockUI",value:function(e){this._UILocked=!0,this._$element.find(".trading-broker-button").addClass("disabled"),$(this._brokerButtons[e]).removeClass("disabled").addClass("selected")}},{key:"_unlockUI",value:function(){this._UILocked=!1,this._$element&&(this._$element.find(".trading-broker-button.disabled").removeClass("disabled"),this._$element.find(".trading-broker-button.selected").removeClass("selected"))}},{key:"remove",value:function(){this._$element&&this._$element.remove(),this._trading.onBrokerLoading.unsubscribe(this,this._onStaffLoading),this._$element=null}}]),e}(),t.default=c,e.exports=t.default},1266:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.flick=function(e,t,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:300;return new Promise(function(o){e.css(t,n),setTimeout(function(){e.css(t,""),setTimeout(function(){o()},i)},i)})},
t.runForTimes=function(e,t){var n,i,o,r;for(n=arguments.length,i=Array(n>2?n-2:0),o=2;o<n;o++)i[o-2]=arguments[o];(r=function e(n,o){o>t||n.apply(null,i).then(function(){e(n,++o)})})(e,1)}},1267:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 14"><circle cx="5" cy="7" r="3"/></svg>'},824:function(e,t,n){"use strict";function i(){var e={paper_trading:{ctor:a.a,onTabShow:a.a.onTabShow}};return Object(s.merge)(Object(s.clone)(o),e)}var o,r,a,s;Object.defineProperty(t,"__esModule",{value:!0}),n(9),o={paper_trading:{title:window.t("Trading Panel"),buttonOpenTooltip:window.t("Open Trading Panel"),buttonCloseTooltip:window.t("Close Trading Panel"),ctor:null,_gaEvent:"Trading Panel"},scripteditor:{title:window.t("Pine Editor"),buttonOpenTooltip:window.t("Open Pine Script Editor"),buttonCloseTooltip:window.t("Close Pine Script Editor"),ctor:null,_gaEvent:"Pine Editor"},backtesting:{title:window.t("Strategy Tester"),buttonOpenTooltip:window.t("Open Strategy Tester"),buttonCloseTooltip:window.t("Close Strategy Tester"),ctor:null,_gaEvent:"Strategy Tester"},screener:{title:window.t("Screener"),buttonOpenTooltip:window.t("Open Screener"),buttonCloseTooltip:window.t("Close Screener"),ctor:null,_gaEvent:"Screener"},text_notes:{title:window.t("Text Notes"),buttonOpenTooltip:window.t("Open Text Notes Panel"),buttonCloseTooltip:window.t("Close Text Notes Panel"),ctor:null,_gaEvent:"Text Notes"}},r=n(1264),a=n.n(r),s=n(12),t.getTerminalConfigSet=i}});