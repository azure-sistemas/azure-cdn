﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_reportConverter.js)
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
var _dataBindingMode_1 = require("./_dataBindingMode");
var _utils_1 = require("./_utils");
var _expressionWrapper_1 = require("../dataObjects/expressions/_expressionWrapper");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var analytics_criteria_1 = require("@devexpress/analytics-core/analytics-criteria");
var analytics_criteria_utils_1 = require("@devexpress/analytics-core/analytics-criteria-utils");
var _baseConverter_1 = require("./_baseConverter");
var ReportConverter = (function (_super) {
    __extends(ReportConverter, _super);
    function ReportConverter(_controlsHelper, _undoEngine, _dataBindingMode) {
        if (_dataBindingMode === void 0) { _dataBindingMode = _dataBindingMode_1.DataBindingMode.Expressions; }
        var _this = _super.call(this) || this;
        _this._controlsHelper = _controlsHelper;
        _this._undoEngine = _undoEngine;
        _this._dataBindingMode = _dataBindingMode;
        _this.convertChoiceEnum = {
            'Convert': 'Convert',
            'Cancel': 'Cancel'
        };
        _this._formattingMapper = {
            '@BackColor': '@BackColor',
            '@Sides': '@Borders',
            '@BorderColor': '@BorderColor',
            '@BorderDashStyle': '@BorderDashStyle',
            '@BorderWidthSerializable': '@BorderWidth',
            '@ForeColor': '@ForeColor',
            '@Font': '@Font',
            '@Padding': '@Padding',
            '@TextAlignment': '@TextAlignment',
            '@Visible': '@Visible'
        };
        _this._expressionsToControlMap = {};
        _this._lastChoice = null;
        _this._defaultFormatting = {};
        _this._notShowAgain = ko.observable(false);
        _this._detailLink = 'https://devexpress.github.io/dotnet-eud/interface-elements-for-web/articles/report-designer/bind-to-data/data-binding-modes.html';
        _this._model = null;
        _this._mapFontObj(_this._defaultFormatting, new analytics_widgets_internal_1.FontModel(ko.observable('')));
        _this._mapPaddingObj(_this._defaultFormatting, analytics_elements_1.PaddingModel.from('0,0,0,0'));
        _this.popupOptions.linkUrl = _this._detailLink;
        _this.popupOptions.confirmMessage = analytics_internal_1.formatUnicorn(analytics_utils_1.getLocalization('The {0} contains bindings. Do you want to convert them to expressions?', 'ReportStringId.UD_Msg_ConvertBindings'), analytics_utils_1.getLocalization('Report', 'DevExpress.XtraReports.UI.XtraReport'));
        _this.popupOptions.linkText = analytics_utils_1.getLocalization('Learn more about the expressions...', 'ReportStringId.UD_Msg_ConvertBindings_LinkText');
        _this.popupOptions.buttons.push({ toolbar: 'bottom', location: 'before', widget: 'dxCheckBox', options: { value: _this._notShowAgain, text: analytics_utils_1.getLocalization("Remember my choice and don't ask me again.", 'ReportStringId.UD_Msg_ConvertBindings_RememberMyChoice') } });
        return _this;
    }
    ReportConverter.prototype._mapRulesProperties = function (formatting) {
        var _this = this;
        var newFormatting = {};
        Object.keys(formatting).forEach(function (name) {
            if (_this._formattingMapper[name]) {
                newFormatting[_this._formattingMapper[name]] = formatting[name];
            }
        });
        return newFormatting;
    };
    ReportConverter.prototype._hasBindings = function () {
        var allcontrols = this._controlsHelper.allControls();
        return allcontrols.map(function (x) { return ko.unwrap(x['dataBindings']); }).filter(function (x) { return !!x; }).some(function (x) { return x.some(function (db) { return !!db.dataMember() || !!db.parameter(); }); });
    };
    ReportConverter.prototype._hasFormattingRules = function () {
        return this._model.formattingRuleSheet().length > 0;
    };
    ReportConverter.prototype.convert = function (model, convertBindingsToExpressions) {
        if (convertBindingsToExpressions === void 0) { convertBindingsToExpressions = _utils_1.PromptBoolean.Prompt; }
        if (!model.dataBindingMode) {
            this._model = model;
            model._dataBindingMode(this._dataBindingMode);
            if (this._dataBindingMode !== _dataBindingMode_1.DataBindingMode.Bindings && this._controlsHelper) {
                var needConvert = this._hasBindings() || this._hasFormattingRules();
                if (convertBindingsToExpressions === _utils_1.PromptBoolean.False)
                    return this._cancel(needConvert ? _dataBindingMode_1.DataBindingMode.Bindings : this._dataBindingMode);
                var canConvert = needConvert ? this._canConvertReport() : true;
                if (!canConvert)
                    return this._cancel();
                if (convertBindingsToExpressions === _utils_1.PromptBoolean.True || this._notShowAgain()) {
                    if (needConvert && this._lastChoice !== this.convertChoiceEnum.Cancel)
                        this._applyChanges();
                }
                else {
                    if (!needConvert) {
                        this._model = null;
                        this._expressionsToControlMap = {};
                    }
                    this.popupOptions.visible(needConvert);
                }
            }
        }
    };
    ReportConverter.prototype._generateStyleName = function (ruleName) {
        return ruleName;
    };
    ReportConverter.prototype._createBindingExpression = function (dataBinding, sumformat, condition) {
        if (dataBinding.propertyName() === 'Text' && sumformat) {
            condition = analytics_internal_1.formatUnicorn(sumformat, condition);
        }
        if (dataBinding.propertyName() !== 'Text' && dataBinding.formatString()) {
            condition = analytics_internal_1.formatUnicorn("FormatString('{0}', {1})", dataBinding.formatString(), condition);
        }
        return _expressionWrapper_1.ExpressionWrapper.createExpression(dataBinding.propertyName(), 'BeforePrint', condition);
    };
    ReportConverter.prototype._tryToGenerateBindingExpressions = function (control, expressions, controlDataInfo) {
        var _this = this;
        var dataBindings = ko.unwrap(control['dataBindings']), canConvertDataBindings = true;
        var sumformat = null;
        if (control['Summary'] && ko.unwrap(control['Summary']['Running']) !== 'None') {
            var summaryFunc = ko.unwrap(control['Summary']['Func']);
            if (summaryFunc === 'Custom')
                return false;
            sumformat = 'sum' + summaryFunc + '({0})';
        }
        if (!!dataBindings) {
            canConvertDataBindings = dataBindings.every(function (dataBinding) {
                var condition = '';
                if (dataBinding.dataSource() && controlDataInfo.dataSource !== dataBinding.dataSource()) {
                    return false;
                }
                else if (dataBinding.parameter()) {
                    condition = '[Parameters.' + dataBinding.parameter().name + ']';
                }
                else if (dataBinding.dataMember()) {
                    var condition = dataBinding.dataMember();
                    if (controlDataInfo.dataMember) {
                        var prefix = controlDataInfo.dataMember + '.';
                        if (dataBinding.dataMember().indexOf(prefix) === 0) {
                            condition = dataBinding.dataMember().substring(prefix.length);
                        }
                    }
                    condition = '[' + condition + ']';
                }
                if (condition) {
                    expressions.push(_this._createBindingExpression(dataBinding, sumformat, condition));
                }
                return true;
            });
        }
        return canConvertDataBindings;
    };
    ReportConverter.prototype._resetDataBindings = function (control) {
        var dataBindings = ko.unwrap(control['dataBindings']);
        if (!!dataBindings) {
            dataBindings.forEach(function (dataBinding) {
                var formatString = null;
                if (dataBinding.propertyName() === 'Text') {
                    formatString = control['textFormatString'] && control['textFormatString']();
                }
                dataBinding.resetValue();
                formatString && control['textFormatString'](formatString);
            });
        }
    };
    ReportConverter.prototype._mapPaddingObj = function (obj, padding) {
        obj['@Padding.Left'] = padding.left();
        obj['@Padding.Right'] = padding.right();
        obj['@Padding.Top'] = padding.top();
        obj['@Padding.Bottom'] = padding.bottom();
    };
    ReportConverter.prototype._mapFontObj = function (obj, font) {
        obj['@Font.Name'] = font.family();
        obj['@Font.Size'] = font.size();
        obj['@Font.Italic'] = font.modificators.italic();
        obj['@Font.Strikeout'] = font.modificators.strikeout();
        obj['@Font.Bold'] = font.modificators.bold();
        obj['@Font.Underline'] = font.modificators.underline();
    };
    ReportConverter.prototype._splitFontPropertyValue = function (formatting) {
        if (formatting['@Font']) {
            var font = new analytics_widgets_internal_1.FontModel(ko.observable(formatting['@Font']));
            this._mapFontObj(formatting, font);
            delete formatting['@Font'];
        }
    };
    ReportConverter.prototype._splitPaddingPropertyValue = function (formatting) {
        if (formatting['@Padding']) {
            var padding = analytics_elements_1.PaddingModel.from(formatting['@Padding']);
            this._mapPaddingObj(formatting, padding);
            delete formatting['@Padding'];
        }
    };
    ReportConverter.prototype._patchRuleCondition = function (condition, dataMember, controlDataMember) {
        if (!condition)
            return condition;
        var expression = analytics_criteria_1.CriteriaOperator.parse(condition);
        var processNames = [];
        analytics_criteria_utils_1.criteriaForEach(expression, function (operator, path) {
            if (operator instanceof analytics_criteria_1.OperandProperty && path === dataMember) {
                processNames.push(function () {
                    var propertyName = [dataMember, operator.propertyName].join('.');
                    if (propertyName.indexOf(controlDataMember) === 0 && (propertyName.length === controlDataMember.length || propertyName[controlDataMember.length] === '.')) {
                        propertyName = propertyName.substr(controlDataMember.length + 1, propertyName.length);
                    }
                    operator.propertyName = propertyName;
                });
            }
        }, dataMember);
        processNames.forEach(function (x) { return x(); });
        return new analytics_widgets_internal_1.FilterEditorSerializer().serialize(expression);
    };
    ReportConverter.prototype._tryToGenerateFormattingRulesExpressions = function (control, expressions, rules, controlDataInfo) {
        var _this = this;
        if (!control.formattingRuleLinks)
            return true;
        var conditions = {};
        var currentRules = $.extend(true, [], control.formattingRuleLinks().map(function (x) { return rules[x.value().name()]; }));
        var changedPropertiesWithDot = [];
        var canConvertFormattingRules = currentRules.every(function (rule) {
            if (controlDataInfo.dataSource !== rule.dataSource) {
                return false;
            }
            Object.keys(rule.formatting).forEach(function (name) {
                if (name.indexOf('.') !== -1 && _this._defaultFormatting[name] !== rule.formatting[name]) {
                    changedPropertiesWithDot.push(name);
                }
            });
            return true;
        });
        if (!canConvertFormattingRules) {
            return false;
        }
        currentRules.forEach(function (rule) {
            if (rule.dataMember !== controlDataInfo.dataMember) {
                rule.condition = _this._patchRuleCondition(rule.condition, rule.dataMember, controlDataInfo.dataMember);
            }
            Object.keys(rule.formatting).forEach(function (propertyName) {
                var hasPoint = propertyName.indexOf('.') !== -1;
                if (!hasPoint || (hasPoint && changedPropertiesWithDot.indexOf(propertyName) !== -1)) {
                    if (!conditions[propertyName]) {
                        conditions[propertyName] = [];
                    }
                    conditions[propertyName].unshift(rule.condition, "'" + rule.formatting[propertyName] + "'");
                }
            });
            return true;
        });
        Object.keys(conditions).forEach(function (propertyName) {
            expressions.push(_this._createRuleExpression(conditions[propertyName], '?', propertyName.substring(1)));
        });
        return true;
    };
    ReportConverter.prototype._getControlDataSourceDataMember = function (control) {
        var dataSource = null, dataMember = null;
        while (!dataSource && control) {
            dataSource = dataSource || control['dataSource'] && control['dataSource']();
            dataMember = dataMember || control['dataMember'] && control['dataMember']();
            control = control.parentModel();
        }
        return { dataSource: dataSource, dataMember: dataMember };
    };
    ReportConverter.prototype._generateFormattingRulesDictionary = function () {
        var _this = this;
        var rules = {};
        this._model.formattingRuleSheet().forEach(function (rule) {
            var newRule = {
                condition: rule.condition(),
                formatting: _this._mapRulesProperties(new analytics_utils_1.ModelSerializer().serialize(rule['formatting'])),
                dataSource: rule.dataSource() || _this._model.dataSource(),
                dataMember: rule.dataMember() || _this._model.dataMember()
            };
            _this._splitFontPropertyValue(newRule.formatting);
            _this._splitPaddingPropertyValue(newRule.formatting);
            rules[rule.name()] = newRule;
        });
        return rules;
    };
    ReportConverter.prototype._createRuleExpression = function (collection, defaultVal, propertyName) {
        collection.push(defaultVal);
        return _expressionWrapper_1.ExpressionWrapper.createExpression(propertyName, 'BeforePrint', 'iif(' + collection.join(',') + ')');
    };
    ReportConverter.prototype._canConvertReport = function () {
        var _this = this;
        var controls = this._controlsHelper.allControls()
            .filter(_utils_1.isControl);
        var rules = this._generateFormattingRulesDictionary();
        this._expressionsToControlMap = {};
        return controls.every(function (control) {
            var controlName = ko.unwrap(control.name);
            _this._expressionsToControlMap[controlName] = [];
            var controlDataInfo = _this._getControlDataSourceDataMember(control.parentModel && control.parentModel() || control);
            return _this._tryToGenerateBindingExpressions(control, _this._expressionsToControlMap[controlName], controlDataInfo) &&
                _this._tryToGenerateFormattingRulesExpressions(control, _this._expressionsToControlMap[controlName], rules, controlDataInfo);
        });
    };
    ReportConverter.prototype._applyChanges = function () {
        var _this = this;
        this._lastChoice = this.convertChoiceEnum.Convert;
        var controls = this._controlsHelper.allControls()
            .filter(_utils_1.isControl);
        this._model.formattingRuleSheet.removeAll();
        controls.forEach(function (control) {
            control.formattingRuleLinks && control.formattingRuleLinks.removeAll();
            var controlName = ko.unwrap(control.name);
            _this._resetDataBindings(control);
            var expressions = _this._expressionsToControlMap[controlName];
            if (expressions.length > 0) {
                control.expressionBindings(expressions);
            }
        });
        this.popupOptions.visible(false);
        this._undoEngine().clearHistory();
        this._undoEngine().isDirty(true);
        this._expressionsToControlMap = null;
        this._model = null;
    };
    ReportConverter.prototype._cancel = function (mode) {
        if (mode === void 0) { mode = _dataBindingMode_1.DataBindingMode.Bindings; }
        this._lastChoice = this.convertChoiceEnum.Cancel;
        this._model._dataBindingMode(mode);
        this._model = null;
        this._expressionsToControlMap = {};
        this.popupOptions.visible(false);
    };
    return ReportConverter;
}(_baseConverter_1.BaseConverter));
exports.ReportConverter = ReportConverter;
