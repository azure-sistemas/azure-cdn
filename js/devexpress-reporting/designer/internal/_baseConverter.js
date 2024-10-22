﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_baseConverter.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var BaseConverter = (function () {
    function BaseConverter() {
        var _this = this;
        this._model = null;
        this.popupOptions = {
            height: 250,
            visible: ko.observable(false),
            title: analytics_utils_1.getLocalization('Convert', 'ReportStringId.UD_Msg_ConvertBindingsCaption'),
            confirmMessage: '',
            infoMessage: '',
            linkText: '',
            linkUrl: '',
            container: function (element) { return analytics_internal_1.getParentContainer(element); },
            buttons: [
                {
                    toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                        text: analytics_utils_1.getLocalization('Yes', 'AnalyticsCoreStringId.ParametersPanel_True'), onClick: function () {
                            _this._applyChanges();
                        }
                    }
                },
                {
                    toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                        text: analytics_utils_1.getLocalization('No', 'ASPxReportsStringId.ParametersPanel_No'), onClick: function () {
                            _this._cancel();
                        }
                    }
                }
            ]
        };
    }
    BaseConverter.prototype.convert = function (model) {
        if (!model)
            return;
        this._model = model;
        this.popupOptions.visible(true);
    };
    BaseConverter.prototype._applyChanges = function () {
        this.popupOptions.visible(false);
    };
    BaseConverter.prototype._cancel = function () {
        this.popupOptions.visible(false);
    };
    return BaseConverter;
}());
exports.BaseConverter = BaseConverter;
