﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\_summaryEditor.js)
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
var metadata_1 = require("../controls/metadata/properties/metadata");
var editorTemplates_1 = require("./editorTemplates");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var analytics_criteria_1 = require("@devexpress/analytics-core/analytics-criteria");
var _wrappedExpressionOptions_1 = require("../dataObjects/expressions/_wrappedExpressionOptions");
var SummaryEditorPopup = (function () {
    function SummaryEditorPopup() {
        var _this = this;
        this.model = ko.observable(null);
        this.grid = new analytics_widgets_1.ObjectProperties(this.model);
        this.visible = ko.observable(false);
        this.isValid = ko.computed(function () { return _this.model() && (!_this.model().calculate.isValid() || !_this.model().weight.isValid()); });
        this.container = function (element) { return analytics_internal_1.getParentContainer(element); };
        this.buttons = [
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: analytics_utils_1.getLocalization('Apply', ''), onClick: function () {
                        _this.model().applyChanges();
                        _this.visible(false);
                    },
                    disabled: this.isValid
                }
            },
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: analytics_utils_1.getLocalization('Cancel', 'AnalyticsCoreStringId.SearchDialog_Cancel'), onClick: function () {
                        _this.visible(false);
                    }
                }
            }
        ];
    }
    SummaryEditorPopup.prototype.dispose = function () {
        this.buttons = [];
        this.grid.dispose();
        this.model(null);
        this.isValid.dispose();
    };
    return SummaryEditorPopup;
}());
exports.SummaryEditorPopup = SummaryEditorPopup;
var SummaryEditorModel = (function (_super) {
    __extends(SummaryEditorModel, _super);
    function SummaryEditorModel(_control) {
        var _this = _super.call(this) || this;
        _this._control = _control;
        _this._order = ['Running', 'Func', 'calculate', 'weight', 'ignoreNullValues', 'treatStringsAsNumerics'];
        _this._summaryFunctionValues = metadata_1.getSummaryFunctionValues().map(function (x) {
            return {
                value: 'sum' + x.value,
                displayValue: x.displayValue,
                localizationId: x.localizationId
            };
        }).concat([{ value: 'sumWAvg', displayValue: 'Weighted average', localizationId: 'ReportStringId.WAvgDisplayName' }]);
        _this._info = metadata_1.createSummarySerializationInfo(_this._summaryFunctionValues).concat([
            { propertyName: 'calculate', editor: editorTemplates_1.designerEditorTemplates.getEditor('reportexpression'), displayName: 'Argument Expression', localizationId: 'ASPxReportsStringId.ReportDesigner_SummaryEditor_ArgumentExpression' },
            { propertyName: 'weight', editor: editorTemplates_1.designerEditorTemplates.getEditor('reportexpression'), displayName: 'Weight', localizationId: 'ASPxReportsStringId.ReportDesigner_SummaryEditor_Weight' }
        ]).sort(function (a, b) { return _this._order.indexOf(a.propertyName) - _this._order.indexOf(b.propertyName); });
        _this.Func = ko.observable('sumSum');
        _this._disposables.push(_this.calculate = new _wrappedExpressionOptions_1.WrappedExpressionOptions({ value: ko.observable('') }));
        _this._disposables.push(_this.weight = new _wrappedExpressionOptions_1.WrappedExpressionOptions({ value: ko.observable('') }));
        _this._summary = _this._control['Summary'];
        var ignoreNullValues = _this._info.filter(function (info) { return info.propertyName === 'ignoreNullValues'; })[0];
        _this.patchSerializationInfo(ignoreNullValues);
        ignoreNullValues.editorOptions.elementAttr = { class: 'dxrd-first-checkbox' };
        _this.patchSerializationInfo(_this._info.filter(function (info) { return info.propertyName === 'treatStringsAsNumerics'; })[0]);
        _this._initExpressionValues();
        _this.ignoreNullValues = ko.observable(_this._summary.ignoreNullValues());
        _this.treatStringsAsNumerics = ko.observable(_this._summary.treatStringsAsNumerics());
        _this.Running = ko.observable(_this._summary.Running());
        _this._disposables.push(_this.calculate.path = ko.computed(function () { return _this._control.getPath('expression'); }));
        _this._disposables.push(_this.weight.path = ko.computed(function () { return _this._control.getPath('expression'); }));
        return _this;
    }
    SummaryEditorModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._control = null;
        this._summary = null;
    };
    SummaryEditorModel.prototype._initExpressionValues = function () {
        var textBinding = this._control.getExpressionBinding('Text');
        if (!textBinding)
            return;
        var leftPart = textBinding;
        try {
            var expression = analytics_criteria_1.CriteriaOperator.parse(textBinding);
            if (expression instanceof analytics_criteria_1.FunctionOperator && this._summaryFunctionValues.some(function (x) { return x.value === expression.displayType; })) {
                var serializer = new analytics_widgets_internal_1.FilterEditorSerializer();
                this.Func(expression.displayType);
                leftPart = expression.leftPart && serializer.serialize(expression.leftPart);
                this.weight.value(this.Func() === 'sumWAvg' ? expression.rightPart[0] && serializer.serialize(expression.rightPart[0]) : '');
            }
        }
        catch (e) {
            analytics_internal_1.NotifyAboutWarning(e.message);
        }
        this.calculate.value(leftPart);
    };
    SummaryEditorModel.prototype.getInfo = function () {
        return this._info;
    };
    SummaryEditorModel.prototype.patchSerializationInfo = function (info) {
        var displayName = info.displayName;
        var localizationId = info.localizationId;
        info.editorOptions = {
            text: analytics_utils_1.getLocalization(displayName, localizationId)
        };
        info.displayName = undefined;
        info.localizationId = undefined;
    };
    SummaryEditorModel.prototype.applyChanges = function () {
        var undoEngine = analytics_utils_1.UndoEngine.tryGetUndoEngine(this._control);
        undoEngine && undoEngine.start();
        var result = '';
        this._summary.Running(this.Running());
        if (this.isDisabled()) {
            result = this.calculate.value();
        }
        else {
            this._summary.ignoreNullValues(this.ignoreNullValues());
            this._summary.treatStringsAsNumerics(this.treatStringsAsNumerics());
            result = this.Func() + '(' + this.calculate.value() + (this.weight.value() ? ', ' + this.weight.value() : '') + ')';
        }
        this._control.getDefaultBinding().value(result);
        undoEngine && undoEngine.end();
    };
    SummaryEditorModel.prototype.isPropertyDisabled = function (propertyName) {
        if (this.isDisabled()) {
            return propertyName !== 'Running';
        }
        return propertyName === 'weight' && this.Func() !== 'sumWAvg';
    };
    SummaryEditorModel.prototype.isDisabled = function () { return this.Running() === 'None'; };
    return SummaryEditorModel;
}(analytics_utils_1.Disposable));
exports.SummaryEditorModel = SummaryEditorModel;
