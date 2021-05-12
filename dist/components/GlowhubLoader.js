"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.symbol.description.js");

var _react = _interopRequireWildcard(require("react"));

var _analytics = require("../utils/analytics");

var _config = require("../utils/config");

require("./CookiesBanner.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const GlowhubLoader = _ref => {
  var _accountConfig$cookie, _accountConfig$cookie2, _accountConfig$cookie3, _accountConfig$cookie4, _accountConfig$cookie5, _accountConfig$cookie6, _accountConfig$cookie7, _accountConfig$cookie8, _accountConfig$cookie9, _accountConfig$cookie10, _accountConfig$cookie11, _accountConfig$cookie12, _accountConfig$cookie13, _accountConfig$cookie14, _accountConfig$cookie15, _accountConfig$cookie16;

  let {
    clientID
  } = _ref;
  const [open, setOpen] = (0, _react.useState)(false);
  const [accountConfig, setAccountConfig] = (0, _react.useState)();
  const [analyticsInstance, setAnalyticsInstance] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    (0, _config.getAccountConfig)(clientID).then(data => setAccountConfig(data));
  }, [clientID]);
  (0, _react.useEffect)(() => {
    if (!analyticsInstance && accountConfig !== null && accountConfig !== void 0 && accountConfig.analytics) {
      setAnalyticsInstance(new _analytics.glowAnalytics(clientID));
    }
  }, [clientID, analyticsInstance, accountConfig]);

  const changeOpen = () => setOpen(!open);

  const acceptCookies = () => {
    localStorage.setItem("GlowCookies", '1');
    changeOpen(false);
    analyticsInstance === null || analyticsInstance === void 0 ? void 0 : analyticsInstance.start();
  };

  const rejectCookies = () => {
    localStorage.setItem("GlowCookies", '0');
    changeOpen(false);
  };

  (0, _react.useEffect)(() => {
    const localData = localStorage.getItem("GlowCookies");

    if (localData === '1') {
      setOpen(false);
      analyticsInstance === null || analyticsInstance === void 0 ? void 0 : analyticsInstance.start();
    } else if (localData === '0') {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [analyticsInstance]);
  return accountConfig && open ? /*#__PURE__*/_react.default.createElement("div", {
    id: "glowCookies-banner",
    className: "glowCookies__banner glowCookies__banner__".concat((_accountConfig$cookie = accountConfig.cookies) === null || _accountConfig$cookie === void 0 ? void 0 : _accountConfig$cookie.bannerStyle, " glowCookies__").concat((_accountConfig$cookie2 = accountConfig.cookies) === null || _accountConfig$cookie2 === void 0 ? void 0 : _accountConfig$cookie2.border, " glowCookies__left"),
    style: {
      backgroundColor: (_accountConfig$cookie3 = accountConfig.cookies) === null || _accountConfig$cookie3 === void 0 ? void 0 : _accountConfig$cookie3.background
    }
  }, /*#__PURE__*/_react.default.createElement("h3", {
    style: {
      color: (_accountConfig$cookie4 = accountConfig.cookies) === null || _accountConfig$cookie4 === void 0 ? void 0 : _accountConfig$cookie4.color
    }
  }, (_accountConfig$cookie5 = accountConfig.cookies) === null || _accountConfig$cookie5 === void 0 ? void 0 : _accountConfig$cookie5.heading), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      color: (_accountConfig$cookie6 = accountConfig.cookies) === null || _accountConfig$cookie6 === void 0 ? void 0 : _accountConfig$cookie6.color
    }
  }, (_accountConfig$cookie7 = accountConfig.cookies) === null || _accountConfig$cookie7 === void 0 ? void 0 : _accountConfig$cookie7.description, /*#__PURE__*/_react.default.createElement("a", {
    href: (_accountConfig$cookie8 = accountConfig.cookies) === null || _accountConfig$cookie8 === void 0 ? void 0 : _accountConfig$cookie8.link,
    target: "_blank",
    rel: "noreferrer",
    className: "read__more",
    style: {
      color: (_accountConfig$cookie9 = accountConfig.cookies) === null || _accountConfig$cookie9 === void 0 ? void 0 : _accountConfig$cookie9.color
    }
  }, (_accountConfig$cookie10 = accountConfig.cookies) === null || _accountConfig$cookie10 === void 0 ? void 0 : _accountConfig$cookie10.policyLinkText)), /*#__PURE__*/_react.default.createElement("div", {
    className: "btn__section"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    id: "acceptCookies",
    className: "btn__accept accept__btn__styles",
    onClick: acceptCookies,
    style: {
      color: (_accountConfig$cookie11 = accountConfig.cookies) === null || _accountConfig$cookie11 === void 0 ? void 0 : _accountConfig$cookie11.acceptBtnColor,
      backgroundColor: (_accountConfig$cookie12 = accountConfig.cookies) === null || _accountConfig$cookie12 === void 0 ? void 0 : _accountConfig$cookie12.acceptBtnBackground
    }
  }, (_accountConfig$cookie13 = accountConfig.cookies) === null || _accountConfig$cookie13 === void 0 ? void 0 : _accountConfig$cookie13.acceptBtnText), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    id: "rejectCookies",
    className: "btn__settings settings__btn__styles",
    onClick: rejectCookies,
    style: {
      color: (_accountConfig$cookie14 = accountConfig.cookies) === null || _accountConfig$cookie14 === void 0 ? void 0 : _accountConfig$cookie14.rejectBtnColor,
      backgroundColor: (_accountConfig$cookie15 = accountConfig.cookies) === null || _accountConfig$cookie15 === void 0 ? void 0 : _accountConfig$cookie15.rejectBtnBackground
    }
  }, (_accountConfig$cookie16 = accountConfig.cookies) === null || _accountConfig$cookie16 === void 0 ? void 0 : _accountConfig$cookie16.rejectBtnText))) : null;
};

var _default = GlowhubLoader;
exports.default = _default;