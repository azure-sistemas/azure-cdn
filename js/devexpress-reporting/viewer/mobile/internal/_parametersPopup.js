﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_parametersPopup.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ParametersPopupModelBase = (function (_super) {
    __extends(ParametersPopupModelBase, _super);
    function ParametersPopupModelBase(formModel) {
        var _this = _super.call(this) || this;
        _this.formModel = formModel;
        _this._submit = function (params) {
            var result = params.validationGroup && params.validationGroup.validate && params.validationGroup.validate();
            if (!result || result.isValid) {
                _this.formModel.submit && _this.formModel.submit();
                _this.visible(false);
            }
        };
        _this._reset = function () {
            _this.formModel.reset && _this.formModel.reset();
        };
        _this._cancel = function () {
            _this.formModel.cancel && _this.formModel.cancel();
            _this.visible(false);
        };
        _this.showIcons = ko.observable(false);
        _this.className = '';
        _this.visible = formModel.visible;
        _this.cancelDisabled = ko.observable(false);
        _this.actionButtons = [
            { className: 'dxrdp-parameters-reset', text: analytics_utils_1.getLocalization('Reset', 'ASPxReportsStringId.ParametersPanel_Reset'), action: _this._reset, disabled: false, visible: !!formModel.reset, id: 'dxrv-mobile-reset' },
            { className: 'dxrdp-parameters-cancel', text: analytics_utils_1.getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'), action: _this._cancel, disabled: _this.cancelDisabled, visible: true, id: 'dxrv-mobile-cancel' },
            { className: 'dxrdp-parameters-submit', text: analytics_utils_1.getLocalization('Submit', 'ASPxReportsStringId.ParametersPanel_Submit'), action: _this._submit, disabled: false, visible: true, id: 'dxrv-mobile-submit' }
        ];
        _this.actionIcons = [
            { className: 'dxrdp-parameters-reset dxrdp-image-parameters-reset', action: _this._reset, disabled: false, visible: !!formModel.reset },
            { className: 'dxrdp-parameters-cancel dxrdp-image-parameters-cancel', action: _this._cancel, disabled: _this.cancelDisabled, visible: true },
            { className: 'dxrdp-parameters-submit dxrdp-image-parameters-submit', action: _this._submit, disabled: false, visible: true }
        ];
        return _this;
    }
    ParametersPopupModelBase.prototype.cacheElementContent = function (element) {
        this._parametersButtonContaner = element;
        this.initVisibilityIcons();
    };
    ParametersPopupModelBase.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._parametersButtonContaner = null;
    };
    ParametersPopupModelBase.prototype.initVisibilityIcons = function () {
        if (!this._parametersButtonContaner)
            return;
        var result = this.showIcons();
        var nodeTop = this._parametersButtonContaner.offset().top;
        this._parametersButtonContaner.find('.dxrdp-parameter-action').each(function (_, el) {
            result = nodeTop !== el.getBoundingClientRect().top;
        });
        this.showIcons(result);
    };
    return ParametersPopupModelBase;
}(analytics_utils_1.Disposable));
exports.ParametersPopupModelBase = ParametersPopupModelBase;
var ParametersPopupModel = (function (_super) {
    __extends(ParametersPopupModel, _super);
    function ParametersPopupModel(model, _reportPreview) {
        var _this = _super.call(this, { visible: model.popupInfo.visible, submit: model.submit, reset: model.restore }) || this;
        _this.model = model;
        _this._reportPreview = _reportPreview;
        _this._disposables.push(ko.computed(function () {
            _this.cancelDisabled(!_this._reportPreview._currentDocumentId() || _this._reportPreview.pages().length === 0);
        }));
        _this.contentTemplate = 'dxrv-preview-parameters-mobile-content';
        _this.title = analytics_utils_1.getLocalization('Parameters', 'DevExpress.XtraReports.UI.XtraReport.Parameters');
        return _this;
    }
    return ParametersPopupModel;
}(ParametersPopupModelBase));
exports.ParametersPopupModel = ParametersPopupModel;
var DateRangeParemeterPopupModel = (function (_super) {
    __extends(DateRangeParemeterPopupModel, _super);
    function DateRangeParemeterPopupModel(model) {
        var _this = _super.call(this, {
            visible: model._popupVisible, cancel: function () {
                _this.model.startDate(_this._oldStart);
                _this.model.endDate(_this._oldEnd);
                _this.model.applyValue();
            }
        }) || this;
        _this.model = model;
        _this._dateEditorClassName = 'dxrv-daterange-editor-item';
        _this._dateButtonEditorClassName = 'dxrv-daterange-editor-button';
        _this.getStringDate = function (value) {
            return analytics_internal_1.formatDate(value());
        };
        _this.focusButton = function (e) {
            var $element = $(e.element);
            var dateEditor = $element.siblings('.' + _this._dateEditorClassName);
            var parent = $element.closest('.' + _this.className);
            parent.find('.' + _this._dateButtonEditorClassName).removeClass('dx-button-default');
            $element.addClass('dx-button-default');
            parent.find('.' + _this._dateEditorClassName).css('zIndex', 1);
            dateEditor.css('zIndex', 2);
        };
        var submitAction = _this.actionButtons.filter(function (action) { return action.id == 'dxrv-mobile-submit'; })[0];
        if (submitAction)
            submitAction.text = analytics_utils_1.getLocalization('OK', analytics_internal_1.StringId.DataAccessBtnOK);
        _this._disposables.push(_this.textRangeValue = ko.computed({
            read: function () { return _this.model._displayText(); },
            write: function (val) { _this.model.applyDate(val.range(), true); }
        }));
        _this._oldStart = _this.model.startDate();
        _this._oldEnd = _this.model.endDate();
        _this.contentTemplate = 'dxrv-preview-date-range-mobile';
        _this.title = analytics_utils_1.getLocalization('Date Range Parameter', 'AnalyticsCoreStringId.Mobile_DateRange_Title');
        _this.className = 'dxrv-preview-date-range-mobile-popup';
        return _this;
    }
    return DateRangeParemeterPopupModel;
}(ParametersPopupModelBase));
exports.DateRangeParemeterPopupModel = DateRangeParemeterPopupModel;
