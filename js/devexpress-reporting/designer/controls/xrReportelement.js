﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrReportelement.js)
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
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var XRReportElementViewModel = (function (_super) {
    __extends(XRReportElementViewModel, _super);
    function XRReportElementViewModel(model, parent, serializer) {
        var _this = _super.call(this, model, parent, serializer || new _serializer_1.ReportModelSerializer()) || this;
        _this._expressionActions = {};
        _this.initialize();
        _this.formattingRuleLinks = analytics_utils_1.deserializeArray(model.FormattingRuleLinks, function (item) { return new formattingrules_1.FormattingRuleLink(item, serializer); });
        var _generateProperty = function (propertyName, stylePriorityName) {
            _this['_' + propertyName] = ko.observable(_this[propertyName]());
            _this._disposables.push(_this[propertyName] = ko.computed({
                read: function () { return _this._getStyleProperty(propertyName, stylePriorityName, _this.root); },
                write: function (val) {
                    if (_this._getStyleProperty(propertyName, stylePriorityName, _this.root) !== val) {
                        if (_this.stylePriority && _this.stylePriority[stylePriorityName]) {
                            _this.stylePriority[stylePriorityName](false);
                        }
                        _this['_' + propertyName](val);
                    }
                }
            }));
        };
        _this.dsHelperProvider = function () { return _this.root['dataSourceHelper'] && _this.root['dataSourceHelper'](); };
        _this.initBindings();
        _this.getStyleProperty = function (propertyName, stylePriorityName) { return _this._getStyleProperty(propertyName, stylePriorityName, _this.root); };
        for (var i = 0; i < _styleHelper_1.stylesProperties.length; i++) {
            if (_this[_styleHelper_1.stylesProperties[i]]) {
                var stylePriorityName = _this._getStylePriorityPropertyName(_styleHelper_1.stylesProperties[i]);
                _generateProperty(_styleHelper_1.stylesProperties[i], stylePriorityName);
            }
        }
        if (_this.padding) {
            _this._createPaddingDependencies();
        }
        _this.toggleUseStyle = function (propertyName) {
            var styleName = _this._getStylePriorityPropertyName(propertyName);
            _this.stylePriority[styleName](!_this.stylePriority[styleName]());
        };
        _this.actions.push({ action: _this.toggleUseStyle, title: analytics_utils_1.getLocalization('Style Priority', 'DevExpress.XtraReports.UI.XRControl.StylePriority'), visible: function (name) { return _this.isStyleProperty(name); } });
        _this.actionProviders.push({ getActions: function (name) { return _this._getExpressionActions(name); } });
        _this._disposables.push(_this.lockedInUserDesigner = ko.computed({
            read: function () {
                var parent = _this.parentModel(), parentLocked = (parent && parent['lockedInUserDesigner']) ? parent['lockedInUserDesigner']() : false;
                return _this._lockedInUserDesigner() || parentLocked;
            },
            write: function (newValue) { return _this._lockedInUserDesigner(newValue); }
        }));
        return _this;
    }
    Object.defineProperty(XRReportElementViewModel.prototype, "_localizationProvider", {
        get: function () {
            if (!this.__localizationProvider) {
                this.__localizationProvider = this.createLocalizationProvider();
            }
            return this.__localizationProvider;
        },
        enumerable: true,
        configurable: true
    });
    XRReportElementViewModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.dataBindings);
        this.resetObservableArray(this.formattingRuleLinks);
        this.resetObservableArray(this.dataBindings);
        this.__localizationProvider = null;
    };
    XRReportElementViewModel.prototype.createLocalizationProvider = function () {
        return new _localizationUtils_1.DefaultLocalizationProvider(this);
    };
    XRReportElementViewModel.prototype.getLocalizationProperty = function (propertyName) {
        return this._localizationProvider.getLocalizationProperty(propertyName);
    };
    XRReportElementViewModel.prototype.getLocalizationProperties = function () {
        return this._localizationProvider.getLocalizationProperties();
    };
    XRReportElementViewModel.prototype.applyLocalization = function (propertyName, propertyValue) {
        this._localizationProvider.applyLocalization(propertyName, propertyValue);
    };
    XRReportElementViewModel.prototype._resetProperty = function (propertyName) {
        _super.prototype._resetProperty.call(this, propertyName);
        this._resetExpressions(propertyName);
    };
    XRReportElementViewModel.prototype._getControlPropertyName = function (propertyName) {
        propertyName = propertyName === 'paddingObj' ? 'padding' : propertyName;
        propertyName = propertyName === 'textArea' ? 'text' : propertyName;
        return propertyName;
    };
    XRReportElementViewModel.prototype._getStylePriorityPropertyName = function (propertyName) {
        propertyName = this._getControlPropertyName(propertyName);
        return 'use' + propertyName.charAt(0).toUpperCase() + propertyName.substr(1);
    };
    XRReportElementViewModel.prototype._getStyle = function (root) {
        var styleName = this.styleName && this.styleName(), style = styleName && root && root.findStyle && root.findStyle(styleName);
        return style;
    };
    XRReportElementViewModel.prototype._checkModify = function (target, propertyName) {
        var property = target && (target['_' + propertyName] || target[propertyName]);
        return ko.unwrap(property) && target.isPropertyModified(propertyName);
    };
    XRReportElementViewModel.prototype._getStyleProperty = function (propertyName, stylePriorityName, root) {
        if (this.stylePriority && this.stylePriority[stylePriorityName] && this.stylePriority[stylePriorityName]() || !this._checkModify(this, propertyName)) {
            var style = this._getStyle(root);
            if (this._checkModify(style, propertyName)) {
                return style[propertyName]();
            }
        }
        if (this._checkModify(this, propertyName)) {
            return this['_' + propertyName]();
        }
        var defaultValue = this.getPropertyDefaultValue(propertyName);
        if (defaultValue && !(defaultValue instanceof Object)) {
            return defaultValue;
        }
        var parent = this.parentModel();
        if (parent) {
            return parent.getStyleProperty(propertyName, stylePriorityName);
        }
    };
    XRReportElementViewModel.prototype._zOrderChange = function (bringToFront) {
        var parent = this.parentModel(), controlContainer = parent && parent[this.getControlContainerName()];
        if (controlContainer) {
            var itemIndex = controlContainer().indexOf(this);
            var items = controlContainer();
            items.splice(itemIndex, 1);
            items.splice((bringToFront ? 0 : controlContainer().length), 0, this);
            controlContainer.valueHasMutated();
        }
    };
    XRReportElementViewModel.prototype._createPaddingDependencies = function () {
        var _this = this;
        this.paddingObj = new analytics_elements_1.PaddingModel();
        this.paddingObj['isPropertyHighlighted'] = function (propertyName) {
            return _this.isPropertyHighlighted(propertyName, 'padding');
        };
        this._disposables.push(this.paddingObj);
        this.paddingObj.applyFromString(this['padding']());
        this._disposables.push(this.paddingObj.dpi = ko.computed(function () { return _this.dpi && _this.dpi(); }));
        var lock = new _locker_1.Locker().lock;
        this._disposables.push(this.padding.subscribe(function (newVal) { return lock(function () { return _this.paddingObj.applyFromString(newVal); }); }));
        ['left', 'right', 'top', 'bottom'].forEach(function (name) {
            _this._disposables.push(_this.paddingObj[name].subscribe(function (newVal) {
                if (_this.root['isModelReady'] && _this.root['isModelReady']() || !_this.root['isModelReady'])
                    lock(function () { return _this.padding(_this.paddingObj.toString()); });
            }));
        });
        this._disposables.push(this.paddingObj.dpi.subscribe(function (newVal) { return lock(function () {
            if (_this['_padding']())
                _this['_padding'](_this.paddingObj.toString());
        }); }));
        this.paddingObj['resetValue'] = function () {
            lock(function () {
                ['left', 'right', 'top', 'bottom'].forEach(function (name) { return _this.paddingObj[name](null); });
                _this.padding(_this.paddingObj.toString());
                _this.paddingObj.applyFromString(_this.padding());
            });
        };
    };
    XRReportElementViewModel.prototype._getExpressionActions = function (name) {
        if (!this._expressionActions[name]) {
            this._expressionActions[name] = this._addExpressionActions(name);
        }
        return this._expressionActions[name];
    };
    XRReportElementViewModel.prototype._getExpressionEvents = function () {
        var events = [
            { name: 'BeforePrint', localizationId: 'DevExpress.XtraReports.UI.XRControlEvents.OnBeforePrint', displayName: 'BeforePrint' }
        ];
        if (this.dataBindingMode === _dataBindingMode_1.DataBindingMode.ExpressionsAdvanced) {
            events.push({ name: 'PrintOnPage', localizationId: 'DevExpress.XtraReports.UI.XRControlEvents.OnPrintOnPage', displayName: 'PrintOnPage' });
        }
        return events;
    };
    XRReportElementViewModel.prototype._addExpressionActions = function (propertyName) {
        var _this = this;
        if (this.dataBindingMode === _dataBindingMode_1.DataBindingMode.Bindings) {
            return [];
        }
        var expressionName = this._getExpressionNameByPropertyName(propertyName);
        if (!expressionName)
            return [];
        var events = this._getExpressionEvents();
        var allExpressionsTreeItems = this.expressionObj.getExpressionsTreeItems(expressionName);
        if (!allExpressionsTreeItems || !allExpressionsTreeItems.length)
            return [];
        var expressionForLocalizedString = analytics_utils_1.getLocalization('{0} Expression', 'ReportStringId.UD_PropertyGrid_Menu_ItemExpression');
        var convertToMenuAction = function (item) {
            var hasInnerItems = item.innerItems && !!item.innerItems.length;
            var expressionEditor = hasInnerItems ? null : new reportExpressionEditorWrapper_1.ReportExpressionEditorWrapper(ko.observable(_this), ko.observable(item.expressionObj));
            var currentEventInfo = events.filter(function (x) { return x.name === item.eventName; })[0];
            var eventLocalizedName = currentEventInfo ? analytics_utils_1.getLocalization(currentEventInfo.displayName, currentEventInfo.localizationId) : item.eventName;
            var expressionLocalizedName = !item.displayName && !item.localizationId ? item.expressionName : analytics_utils_1.getLocalization(item.displayName, item.localizationId);
            var menuAction = {
                id: 'dxrd-expression',
                action: hasInnerItems ?
                    function (propertyName) { } :
                    function (propertyName) { expressionEditor.popupVisible(true); },
                title: item.eventName ? eventLocalizedName : analytics_internal_1.formatUnicorn(expressionForLocalizedString, expressionLocalizedName),
                hint: ko.computed(function () {
                    return item.expressionObj && item.expressionObj.value();
                }),
                weight: 50,
                customTemplate: hasInnerItems ? null : {
                    name: 'dxrd-expressioneditor-popup',
                    data: expressionEditor
                },
                visible: function (name) { return true; }
            };
            menuAction.items = (item.innerItems || []).map(convertToMenuAction);
            _this._disposables.push(menuAction.hint);
            return menuAction;
        };
        return allExpressionsTreeItems.map(convertToMenuAction);
    };
    XRReportElementViewModel.prototype.getControlFactory = function () {
        return settings_1.controlsFactory();
    };
    XRReportElementViewModel.prototype.addChild = function (control) {
        if (control.controlType === 'XRTableOfContents' && !_tocUtils_1.isHeaderOrFooterBandType(this)) {
            var band = getNearestBand_1.getNearestBand(this);
            if (band) {
                if (_tocUtils_1.isHeaderOrFooterBandType(band)) {
                    band.addChild(control);
                }
                return;
            }
            else {
                throw new Error('TOC can be added only to ReportHeaderBand or ReportFooterBand!!!');
            }
        }
        _super.prototype.addChild.call(this, control);
    };
    XRReportElementViewModel.prototype.initDataBindingProperties = function () {
        var _this = this;
        var bindingInfos = this.getInfo().filter(function (info) { return 'bindingName' in info; });
        bindingInfos.forEach(function (info) {
            _this[info.propertyName] = _this.dataBindings()['findBinding'](info['bindingName']);
        });
    };
    XRReportElementViewModel.prototype.initExpressionProperties = function () {
        var _this = this;
        if (!this.expressionBindings)
            return;
        var path = ko.pureComputed(function () {
            return _this.getPath('expression');
        });
        this._disposables.push(path);
        this.expressionObj = this.getControlFactory()._createExpressionObject(this.controlType, this.expressionBindings, path, function (name) { return _this['Summary'] && _this['Summary']['Running'] && _this.getControlInfo().defaultBindingName === name && ko.computed(function () {
            return _this['Summary']['Running']() != 'None';
        }); });
        if (!this.expressionObj)
            return;
        this._disposables.push(this.expressionObj);
        var expressionInfos = this.getInfo().filter(function (info) { return 'expressionName' in info; });
        expressionInfos.forEach(function (info) {
            var expression = _this.expressionObj.getExpression(info['expressionName'], 'BeforePrint');
            if (expression)
                _this[info.propertyName] = expression;
        });
    };
    XRReportElementViewModel.prototype._resetExpressions = function (propertyName) {
        var _this = this;
        var modelName = this._getExpressionNameByPropertyName(propertyName);
        if (!modelName)
            return;
        this._getExpressionEvents().forEach(function (event) {
            var expressionPropertyInfo = _this.expressionObj.getExpression(modelName, event.name);
            if (!expressionPropertyInfo)
                return;
            if (expressionPropertyInfo['getInfo']) {
                (expressionPropertyInfo['getInfo']() || []).forEach(function (info) {
                    var value = expressionPropertyInfo[info.propertyName].value;
                    value && value('');
                });
            }
            else {
                expressionPropertyInfo.value && expressionPropertyInfo.value('');
            }
        });
    };
    XRReportElementViewModel.prototype._hasAnyExpressions = function (propertyName, predicateFunc) {
        var _this = this;
        if (predicateFunc === void 0) { predicateFunc = function (value) { return !!ko.unwrap(value); }; }
        var modelName = this._getExpressionNameByPropertyName(propertyName);
        if (!modelName)
            return false;
        var returnValue = false;
        var events = this._getExpressionEvents();
        events.forEach(function (event) {
            var expressionPropertyInfo = _this.expressionObj.getExpression(modelName, event.name);
            if (!expressionPropertyInfo)
                return;
            var getInfoAction = expressionPropertyInfo['getInfo'];
            var expressionExists = false;
            if (getInfoAction) {
                var info = getInfoAction() || [];
                expressionExists = info.filter(function (info) {
                    return predicateFunc(expressionPropertyInfo[info.propertyName].value, info.propertyName);
                }).length > 0;
            }
            else {
                expressionExists = predicateFunc(expressionPropertyInfo.value);
            }
            returnValue = returnValue || expressionExists;
        });
        return returnValue;
    };
    XRReportElementViewModel.prototype._getExpressionNameByPropertyName = function (propertyName, info) {
        if (info === void 0) { info = this.getInfo(); }
        if (this.dataBindingMode === _dataBindingMode_1.DataBindingMode.Bindings) {
            return '';
        }
        propertyName = this._getControlPropertyName(propertyName);
        var propInfo = this.getInfo().filter(function (info) { return info.propertyName === propertyName; })[0];
        if (!propInfo || !propInfo.modelName) {
            return '';
        }
        return propInfo.modelName.substring(propInfo.modelName.lastIndexOf('@') + 1);
    };
    XRReportElementViewModel.prototype.initBindings = function () {
        this.initDataBindingProperties();
        this.initExpressionProperties();
    };
    XRReportElementViewModel.prototype.isStyleProperty = function (propertyName) {
        var _this = this;
        return this.stylePriority && metadata_1.stylePrioritySerializationInfo.some(function (info) { return info.propertyName == _this._getStylePriorityPropertyName(propertyName); });
    };
    XRReportElementViewModel.prototype.isResettableProperty = function (propertyName) {
        return _super.prototype.isResettableProperty.call(this, propertyName) && propertyName !== 'dataBindings';
    };
    XRReportElementViewModel.prototype.getActionClassName = function (propertyName) {
        var result = {};
        result['dxrd-editormenu-usestyle'] = this.isStyleProperty(propertyName) && this.stylePriority[this._getStylePriorityPropertyName(propertyName)]();
        result['dxrd-editormenu-modified'] = this.isPropertyModified(propertyName);
        var hasExpression = this._hasAnyExpressions(propertyName);
        result['dxrd-editormenu-expressions'] = hasExpression;
        result['dxd-icon-accented'] = hasExpression;
        return result;
    };
    XRReportElementViewModel.prototype.getMenuBoxTemplate = function (propertyName) {
        if (this._hasAnyExpressions(propertyName))
            return 'dxrd-svg-tabs-expressions';
        return '';
    };
    XRReportElementViewModel.prototype.className = function () {
        return this.controlType.toLowerCase();
    };
    XRReportElementViewModel.prototype.initialize = function () {
        if (!this.size) {
            this.size = new analytics_elements_1.Size(0, 0);
        }
    };
    XRReportElementViewModel.prototype.getPath = function (propertyName) {
        if (propertyName === 'expression' && this.dsHelperProvider()) {
            var firstParentWithDS = _createObjectFromInfo_1.findFirstParentWithPropertyName(this, 'dataSource');
            var rootDataSourceName = this.dsHelperProvider().getDataSourcePath(ko.unwrap(firstParentWithDS['dataSource']));
            var rootDataMember = ko.unwrap(firstParentWithDS['dataMember']) || '';
            if (!!rootDataSourceName) {
                return !!rootDataMember ? [rootDataSourceName, rootDataMember].join('.') : rootDataSourceName;
            }
            else {
                return '';
            }
        }
        return '';
    };
    XRReportElementViewModel.prototype.isPropertyDisabled = function (name) {
        return this.lockedInUserDesigner();
    };
    XRReportElementViewModel.prototype.isPropertyVisible = function (name) {
        if (this.dataBindingMode !== _dataBindingMode_1.DataBindingMode.Bindings) {
            return name !== 'dataBindings'
                && name !== 'formattingRuleLinks'
                && name !== 'formattingRuleSheet'
                && name.indexOf('popularDataBinding') !== 0;
        }
        else {
            return name.indexOf('popularExpression') !== 0;
        }
    };
    XRReportElementViewModel.prototype.isPropertyHighlighted = function (propertyName, parentPropertyName) {
        if (!parentPropertyName) {
            return this._hasAnyExpressions(propertyName);
        }
        var parentExpressionName = this._getExpressionNameByPropertyName(parentPropertyName);
        var subPropertyName = propertyName[0].toUpperCase() + propertyName.substr(1);
        return parentExpressionName && this._hasAnyExpressions(parentPropertyName, function (value, subExpressionName) {
            var unwrappedValue = !!ko.unwrap(value);
            return subExpressionName === (parentExpressionName + '.' + subPropertyName) && unwrappedValue;
        });
    };
    XRReportElementViewModel.prototype.sendToBack = function () {
        this._zOrderChange(false);
    };
    XRReportElementViewModel.prototype.bringToFront = function () {
        this._zOrderChange(true);
    };
    XRReportElementViewModel.prototype.getControlContainerName = function () { return 'controls'; };
    Object.defineProperty(XRReportElementViewModel.prototype, "dataBindingMode", {
        get: function () {
            return this.root !== this ? this.root.dataBindingMode : _dataBindingMode_1.DataBindingMode.Expressions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XRReportElementViewModel.prototype, "dpi", {
        get: function () {
            return this.root !== this ? this.root.dpi : this._innerDpi;
        },
        set: function (value) {
            this._innerDpi = value;
        },
        enumerable: true,
        configurable: true
    });
    XRReportElementViewModel.prototype.rtl = function () {
        var rtl = ko.unwrap(this['rightToLeft']);
        if (rtl === 'Yes')
            return true;
        if (this.parentModel() && (!rtl || rtl === 'Inherit'))
            return this.parentModel().rtl();
        return false;
    };
    XRReportElementViewModel.unitProperties = ['size', 'location', 'paddingObj'];
    return XRReportElementViewModel;
}(analytics_elements_1.ElementViewModel));
exports.XRReportElementViewModel = XRReportElementViewModel;
var reportExpressionEditorWrapper_1 = require("../widgets/expressioneditor/reportExpressionEditorWrapper");
var metadata_1 = require("./metadata/properties/metadata");
var _locker_1 = require("../../common/utils/_locker");
var settings_1 = require("../utils/settings");
var formattingrules_1 = require("./properties/formattingrules");
var _serializer_1 = require("../internal/serialization/_serializer");
var _dataBindingMode_1 = require("../internal/_dataBindingMode");
var _createObjectFromInfo_1 = require("../internal/_createObjectFromInfo");
var _localizationUtils_1 = require("./utils/_localizationUtils");
var _tocUtils_1 = require("./utils/_tocUtils");
var getNearestBand_1 = require("./getNearestBand");
var _styleHelper_1 = require("../helpers/_styleHelper");
