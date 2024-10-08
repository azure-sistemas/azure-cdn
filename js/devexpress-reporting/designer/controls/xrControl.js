﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrControl.js)
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
var xrReportelement_1 = require("./xrReportelement");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var xrBand_1 = require("../bands/xrBand");
var _dataBindingMode_1 = require("../internal/_dataBindingMode");
var style_1 = require("./metadata/properties/style");
var _createObjectFromInfo_1 = require("../internal/_createObjectFromInfo");
var xrVerticalBand_1 = require("../bands/xrVerticalBand");
var anchoring_1 = require("./properties/anchoring");
var sortingOptions_1 = require("./properties/sortingOptions");
var xrReport_1 = require("./xrReport");
var getNearestBand_1 = require("./getNearestBand");
var XRControlViewModel = (function (_super) {
    __extends(XRControlViewModel, _super);
    function XRControlViewModel(control, parent, serializer) {
        var _a;
        var _this = _super.call(this, control, parent, serializer) || this;
        if (_this.text) {
            _this.textArea = _this.text;
        }
        _this.controls = analytics_internal_1.deserializeChildArray(control.Controls, _this, function (childControl) { return _this.createControl(childControl, serializer); });
        if (_this.anchorVertical || _this.anchorHorizontal) {
            _this.anchoring(parent);
            _this._disposables.push(_this.parentModel.subscribe(function (newParent) {
                if (_this.vertAnchoring && _this.horAnchoring && newParent) {
                    _this.vertAnchoring.start(newParent.size.height, _this);
                    _this.horAnchoring.start(newParent.size.width, _this);
                }
                else {
                    _this.anchoring(newParent);
                }
            }));
        }
        if (_this.interactiveSorting) {
            _this.interactiveSorting = new sortingOptions_1.SortingOptions(control['InteractiveSorting'], _this.root, serializer);
            _this._disposables.push(_this.interactiveSorting);
        }
        _this._disposables.push(_this.hasBindings = ko.pureComputed(function () {
            var bindings = _this.dataBindings && _this.dataBindings();
            return !!bindings && bindings.filter(function (dataBinding) { return !dataBinding.isEmpty(); }).length > 0 || _this.hasExpressionBindings();
        }));
        var stylesObject = _createObjectFromInfo_1.createObjectFromInfo(_this, style_1.stylesInfo);
        if (stylesObject) {
            _this[style_1.stylesObj.propertyName] = stylesObject;
        }
        if (_this['Summary'])
            _this['Summary'].isPropertyVisible = function (propertyName) {
                return propertyName === 'Func' ? _this.isPropertyVisible('dataBindings') : true;
            };
        if (_this.textFormatString) {
            var binding = _this['dataBindings'] && _this['dataBindings']().filter(function (binding) { return binding.propertyName() === 'Text'; })[0];
            var summaryFormatString = null;
            var bindingFormatString = null;
            _this['_textFormatString'] = ko.observable(_this.textFormatString.peek());
            _a = [_this['Summary'], binding].map(function (obj) {
                if (obj && obj['formatString']) {
                    obj['_formatString'] = ko.observable(obj['formatString'].peek());
                    _this._disposables.push(obj['formatString'] = ko.computed({
                        read: function () {
                            return _this['_textFormatString']() ||
                                obj['_formatString']();
                        },
                        write: function (x) { _this.textFormatString(x); }
                    }));
                    return obj['_formatString'];
                }
            }), summaryFormatString = _a[0], bindingFormatString = _a[1];
            _this._disposables.push(_this.textFormatString = ko.computed({
                read: function () {
                    return _this['_textFormatString']() ||
                        summaryFormatString && summaryFormatString() ||
                        bindingFormatString && bindingFormatString();
                },
                write: function (x) {
                    _this['_textFormatString'](x);
                    summaryFormatString && summaryFormatString(null);
                    bindingFormatString && bindingFormatString(null);
                }
            }));
        }
        _this.dataBindingsAreValid = ko.observable(true);
        _this._disposables.push(ko.computed(function () {
            var _a;
            var bindings = _this.dataBindings && _this.dataBindings();
            if (bindings) {
                if (bindings.length === 0)
                    _this.dataBindingsAreValid(true);
                else {
                    var report = _this.root;
                    if (!report || !(report instanceof xrReport_1.ReportViewModel))
                        return;
                    var dsHelper = report.dsHelperProvider();
                    var parameters = report.parameters();
                    var fieldListProvider = report.getControlFactory().fieldListProvider();
                    if (!dsHelper || !parameters || !fieldListProvider)
                        return;
                    var defaultDataSourceInfo = dsHelper.findDataSourceInfo(ko.unwrap(_createObjectFromInfo_1.findFirstParentWithPropertyName(_this, 'dataSource').dataSource));
                    var reqFinished = 0;
                    var reqCount = bindings.length;
                    var reqResult = true;
                    var deferred = $.Deferred();
                    for (var i = 0; i < bindings.length; i++) {
                        var binding = bindings[i], parameter = binding.parameter(), dataMember = binding.dataMember(), dataSource = binding.dataSource();
                        if (parameter) {
                            if (dataSource)
                                reqResult = false;
                            else
                                reqResult = reqResult && parameters.some(function (x) { return x.name === parameter.name; });
                            reqFinished++;
                        }
                        else if (dataMember) {
                            var dsInfo = null;
                            if (dataSource) {
                                dsInfo = dataSource['dataSourceInfo'];
                                if (dsHelper.usedDataSources().indexOf(dsInfo) < 0) {
                                    reqResult = false;
                                    reqFinished++;
                                }
                            }
                            else {
                                dsInfo = defaultDataSourceInfo;
                            }
                            if (dsInfo) {
                                var lastPart = dataMember.slice(dataMember.lastIndexOf('.') + 1);
                                fieldListProvider.getItems(new analytics_utils_1.PathRequest((_a = [dsInfo.id || dsInfo.ref]).concat.apply(_a, dataMember.split('.').slice(0, -1)).join('.')))
                                    .done(function (result) { if (result.every(function (x) { return x.isList || x.name !== lastPart; }))
                                    reqResult = false; })
                                    .fail(function () { reqResult = false; })
                                    .always(function () { if (++reqFinished === reqCount)
                                    deferred.resolve(reqResult); });
                            }
                            else {
                                reqResult = false;
                                reqFinished++;
                            }
                        }
                        else if (dataSource) {
                            reqResult = false;
                            reqFinished++;
                        }
                        else
                            reqFinished++;
                        if (!reqResult) {
                            reqFinished += reqCount - 1 - i;
                            break;
                        }
                    }
                    if (reqFinished === reqCount)
                        deferred.resolve(reqResult);
                    deferred.done(function (result) { _this.dataBindingsAreValid(result); });
                }
            }
        }));
        return _this;
    }
    XRControlViewModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.controls);
        this.resetObservableArray(this.controls);
    };
    XRControlViewModel.prototype.anchoring = function (parent) {
        if (parent) {
            this.vertAnchoring = new anchoring_1.VerticalAcnhoring(parent.size.height, this, this.anchorVertical);
            this.horAnchoring = new anchoring_1.HorizontalAnchoring(parent.size.width, this, this.anchorHorizontal);
            this._disposables.push(this.vertAnchoring);
            this._disposables.push(this.horAnchoring);
        }
    };
    XRControlViewModel.prototype.getNearestParent = function (target) {
        if (['XRPageBreak', 'XRPivotGrid', 'XRSubreport', 'XRTableOfContents', 'XRPdfContent'].indexOf(this.controlType) !== -1) {
            return getNearestBand_1.getNearestBand(target);
        }
        else {
            return _super.prototype.getNearestParent.call(this, target);
        }
    };
    XRControlViewModel.prototype.isPropertyDisabled = function (name) {
        if (name === 'textFitMode') {
            return this['canGrow']() || this['canShrink']() || (this.controlType === 'XRLabel' && this['autoWidth']());
        }
        else if (name === 'processNullValues') {
            return this['Summary'] && ko.unwrap(this['Summary']['Running']) !== 'None';
        }
        else if (name === 'allowMarkupText') {
            return this['textEditOptions'] && ko.unwrap(this['textEditOptions']['enabled']);
        }
        else if (name === 'textEditOptions' || name === 'angle') {
            return this['allowMarkupText'] && ko.unwrap(this['allowMarkupText']);
        }
        return _super.prototype.isPropertyDisabled.call(this, name);
    };
    XRControlViewModel.prototype.isPropertyVisible = function (name) {
        if (this.multiline && this.multiline()) {
            if (name === 'text')
                return false;
        }
        else {
            if (name === 'textArea')
                return false;
        }
        return _super.prototype.isPropertyVisible.call(this, name);
    };
    XRControlViewModel.prototype.hasExpressionBindings = function () {
        return !!(this.expressionBindings && this.expressionBindings().filter(function (binding) { return !!binding.expression(); })[0]);
    };
    XRControlViewModel.prototype.hasDataBindingByName = function (property) {
        if (property === void 0) { property = 'Text'; }
        var bindings = this.dataBindings && this.dataBindings() && this.dataBindings().filter(function (dataBinding) { return !dataBinding.isEmpty(); });
        if (!!bindings && bindings.length > 0) {
            var binding = this.dataBindings()['findBinding'](property);
            return !!binding && !binding.isEmpty();
        }
        return !!(this.expressionBindings && this.expressionBindings().filter(function (binding) { return binding.propertyName() === property; }).length > 0);
    };
    Object.defineProperty(XRControlViewModel.prototype, "hasDefaultBindingProperty", {
        get: function () {
            return !!this.getControlInfo().defaultBindingName;
        },
        enumerable: true,
        configurable: true
    });
    XRControlViewModel.prototype.getExpressionBinding = function (property, event) {
        if (property === void 0) { property = 'Text'; }
        if (event === void 0) { event = 'BeforePrint'; }
        if (!this.expressionBindings)
            return null;
        var binding = this.expressionBindings().filter(function (binding) { return binding.propertyName() === property && binding.eventName() === event; })[0];
        return binding && binding.expression();
    };
    XRControlViewModel.prototype.setExpressionBinding = function (value, property, event) {
        if (property === void 0) { property = 'Text'; }
        if (event === void 0) { event = 'BeforePrint'; }
        if (!this.expressionBindings)
            return;
        var binding = this.expressionBindings().filter(function (binding) { return binding.propertyName() === property && binding.eventName() === event; })[0];
        binding && binding.expression(value);
    };
    XRControlViewModel.prototype.getControlInfo = function () {
        return _super.prototype.getControlInfo.call(this);
    };
    XRControlViewModel.prototype.getDefaultBinding = function () {
        var bindingName = this.getControlInfo().defaultBindingName;
        if (this.dataBindingMode !== _dataBindingMode_1.DataBindingMode.Bindings) {
            return this.expressionObj.getExpression(bindingName, 'BeforePrint');
        }
        else {
            return this.dataBindings().filter(function (x) { return x.propertyName() === bindingName; })[0];
        }
    };
    return XRControlViewModel;
}(xrReportelement_1.XRReportElementViewModel));
exports.XRControlViewModel = XRControlViewModel;
var XRControlSurfaceBase = (function (_super) {
    __extends(XRControlSurfaceBase, _super);
    function XRControlSurfaceBase(control, context, unitProperties) {
        var _this = _super.call(this, control, context, unitProperties) || this;
        _this.delta = 0.5;
        _this.template = 'dxrd-control';
        _this.selectiontemplate = 'dxrd-control-selection';
        _this.contenttemplate = 'dxrd-control-content';
        _this.displayNameParameters = ko.pureComputed(function () {
            var control = _this.getControlModel();
            var parameters = {
                text: null,
                isExpression: true,
                dataSource: null,
                dataMember: null,
                dataMemberOffset: null,
                allowMarkupText: false,
                wordWrap: false,
                fontSize: 0,
                fontUnit: null
            };
            if (control['controls'] && control['controls']().length !== 0) {
                parameters.text = '';
                return parameters;
            }
            parameters.text = control['getExpressionBinding'] && control['getExpressionBinding']();
            parameters.isExpression = !!parameters.text;
            parameters.allowMarkupText = control['allowMarkupText'] && control['allowMarkupText']();
            parameters.wordWrap = control['wordWrap'] && control['wordWrap']();
            if (control['font']) {
                var _font = new analytics_widgets_internal_1.FontModel(control['font']);
                parameters.fontSize = _font.size();
                parameters.fontUnit = _font.unit();
                _font.dispose();
            }
            if (parameters.isExpression) {
                parameters.dataMember = control['getPath'] && control['getPath']('expression') || '';
                return parameters;
            }
            if (control['dataBindings'] && _this.hasBindings) {
                var textBinding = analytics_internal_1.getFirstItemByPropertyValue(control['dataBindings'](), 'propertyName', 'Text');
                if (textBinding && textBinding.dataMember()) {
                    var dataMember = textBinding.dataMember();
                    var dataSource = textBinding.dataSource();
                    var parentWithDS = _createObjectFromInfo_1.findFirstParentWithPropertyName(control, 'dataSource');
                    var rootDataMember = parentWithDS['dataMember'] && parentWithDS['dataMember']() || '';
                    var rootDataSource = parentWithDS['dataSource'] && parentWithDS['dataSource']() || null;
                    if ((!dataSource || dataSource === rootDataSource) && dataMember.indexOf(rootDataMember) === 0 && dataMember.charAt(rootDataMember.length) === '.') {
                        parameters.dataMemberOffset = rootDataMember;
                        parameters.dataMember = dataMember.substr(rootDataMember.length + 1);
                    }
                    else {
                        parameters.dataMemberOffset = '';
                        parameters.dataMember = textBinding.dataMember();
                    }
                    parameters.dataSource = dataSource || rootDataSource;
                    return parameters;
                }
            }
            parameters.text = _this.displayText();
            return parameters;
        });
        _this.displayName = ko.pureComputed(function () {
            var parameters = _this.displayNameParameters();
            return parameters.dataMember ? ('[' + parameters.dataMember + ']') : (parameters.text || '');
        });
        _this._disposables.push(_this.contentSizes = ko.pureComputed(function () { return _this.cssCalculator.contentSizeCss(_this.rect().width, _this.rect().height, _this._context.zoom()); }));
        _this._disposables.push(_this.contentHeightWithoutZoom = ko.pureComputed(function () { return _this.contentSizes().height / _this._context.zoom(); }));
        _this._disposables.push(_this.contentWidthWithoutZoom = ko.pureComputed(function () { return _this.contentSizes().width / _this._context.zoom(); }));
        _this._disposables.push(_this.borderCss = ko.pureComputed(function () {
            return (!control['borders'] || control['borders']() === 'None') ? { 'border': 'solid 1px Silver' } : _this.cssCalculator.borderCss(_this._context.zoom());
        }));
        _this._disposables.push(_this.isIntersect = ko.pureComputed(function () {
            return _this.isThereIntersectionWithUsefulArea() ||
                _this.isThereIntersectionWithCrossBandControls() ||
                _this.isThereIntersectionWithControls();
        }).extend({ deferred: true }));
        _this._disposables.push(_this.adorntemplate = ko.computed(function () { return _this.getAdornTemplate(); }));
        _this._disposables.push(_this.displayNameParameters);
        _this._disposables.push(_this.displayName);
        return _this;
    }
    XRControlSurfaceBase.prototype._isThereIntersectionWithUsefulArea = function (useFullWidth) {
        var right = ko.unwrap(this.getRoot().rtl) && this.container() ? (this.container().rect().width - this.rect().left) : this.rect().right;
        return right > useFullWidth && Math.abs(right - useFullWidth) > this.delta;
    };
    XRControlSurfaceBase._appendValue = function (accumulator, value, needToAppend) {
        if (needToAppend === void 0) { needToAppend = true; }
        if (needToAppend) {
            accumulator += accumulator ? (' ' + value) : value;
        }
        return accumulator;
    };
    Object.defineProperty(XRControlSurfaceBase.prototype, "_unitAbsoluteRect", {
        get: function () {
            var parentAbsoluteRect = this.parent && this.parent['_unitAbsoluteRect'];
            if (parentAbsoluteRect) {
                return {
                    top: parentAbsoluteRect.top + this._unitRect.top,
                    left: parentAbsoluteRect.left + this._unitRect.left,
                    right: parentAbsoluteRect.left + this._unitRect.left + this._unitRect.width,
                    bottom: parentAbsoluteRect.top + this._unitRect.top + this._unitRect.height,
                    width: this._unitRect.width,
                    height: this._unitRect.height
                };
            }
            else {
                return this._unitRect;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XRControlSurfaceBase.prototype, "_unitRect", {
        get: function () {
            var location = this._control['location'] || new analytics_elements_1.Point(0, 0), size = this._control['size'] || new analytics_elements_1.Size(0, 0);
            return {
                top: location.y(),
                left: location.x(),
                right: location.x() + size.width(),
                bottom: location.y() + size.height(),
                width: size.width(),
                height: size.height()
            };
        },
        enumerable: true,
        configurable: true
    });
    XRControlSurfaceBase.prototype.checkParent = function (surfaceParent) {
        var thisParent = this.parent instanceof xrBand_1.BandSurface || this.parent instanceof xrReport_1.ReportSurface ? null : this.parent;
        var anotherParent = surfaceParent instanceof xrBand_1.BandSurface || this.parent instanceof xrReport_1.ReportSurface ? null : surfaceParent;
        return thisParent === anotherParent;
    };
    XRControlSurfaceBase.prototype.isThereIntersection = function (rect1, rect2) {
        var rect1Right = rect1.right || rect1.left + rect1.width, rect2Right = rect2.right || rect2.left + rect2.width, rect1Bottom = rect1.bottom || rect1.top + rect1.height, rect2Bottom = rect2.bottom || rect2.top + rect2.height;
        return rect1Right > rect2.left && Math.abs(rect1Right - rect2.left) >= 0.0001 &&
            rect2Right > rect1.left && Math.abs(rect2Right - rect1.left) >= 0.0001 &&
            rect1Bottom > rect2.top && Math.abs(rect1Bottom - rect2.top) >= 0.0001 &&
            rect2Bottom > rect1.top && Math.abs(rect2Bottom - rect1.top) >= 0.0001;
    };
    XRControlSurfaceBase.prototype.isThereIntersectionWithParent = function (parentRect, childRect) {
        var rectWidhtElement = childRect.right || childRect.left + childRect.width, rectHeightElement = childRect.bottom || childRect.top + childRect.height;
        return rectWidhtElement > parentRect.width && Math.abs(rectWidhtElement - parentRect.width) > this.delta ||
            rectHeightElement > parentRect.height && Math.abs(rectHeightElement - parentRect.height) > this.delta;
    };
    XRControlSurfaceBase.prototype.isThereIntersectionWithUsefulArea = function () {
        var _container = this.container();
        if (_container instanceof xrBand_1.BandSurface && _container['getUsefulRect'] && _container['getUsefulRect']()) {
            return this._isThereIntersectionWithUsefulArea(this.container()['getUsefulRect']().width);
        }
        else if (_container instanceof xrVerticalBand_1.VerticalBandSurface) {
            return false;
        }
        else {
            var root = this.getRoot(), usefulPageWidth = root.pageWidth() - root.margins.left() - root.margins.right();
            return this._isThereIntersectionWithUsefulArea(usefulPageWidth);
        }
    };
    XRControlSurfaceBase.prototype.isThereIntersectionWithCrossBandControls = function (currentRect) {
        if (currentRect === void 0) { currentRect = this._unitAbsoluteRect; }
        if (!currentRect)
            return false;
        var isThereIntersection = false, crossBandControls = this.getRoot()['crossBandControls']();
        if (this.isThereIntersectionWithNeighborsCollection(currentRect, crossBandControls.filter(function (control) { return control.visible() && control.getControlModel().controlType === 'XRCrossBandLine'; }), '_unitAbsoluteRect')) {
            return true;
        }
        var crossBandBoxControls = crossBandControls.filter(function (control) { return control.visible() && control.getControlModel().controlType === 'XRCrossBandBox'; });
        for (var crossbandIndex = 0; crossbandIndex < crossBandBoxControls.length; crossbandIndex++) {
            var rects = crossBandBoxControls[crossbandIndex]._getCrossBandBoxSides();
            for (var rectIndex = 0; rectIndex < rects.length; rectIndex++) {
                if (this !== crossBandBoxControls[crossbandIndex] && this.isThereIntersection(currentRect, rects[rectIndex])) {
                    isThereIntersection = true;
                    break;
                }
            }
            if (isThereIntersection)
                break;
        }
        return isThereIntersection;
    };
    XRControlSurfaceBase.prototype.isThereIntersectionWithControls = function () {
        var collectionControls = this.parent && this.parent.getChildrenCollection() && this.parent.getChildrenCollection()().filter(function (control) { return !control.isIntersectionDeny; }) || [];
        return this.isThereIntersectionWithParentCollection(this._unitRect)
            || this.isThereIntersectionWithChildCollection()
            || this.isThereIntersectionWithNeighborsCollection(this._unitRect, collectionControls);
    };
    XRControlSurfaceBase.prototype.isThereIntersectionWithParentCollection = function (currentRect, controlRectProperty) {
        if (controlRectProperty === void 0) { controlRectProperty = '_unitRect'; }
        return this.parent && this.parent instanceof XRControlSurfaceBase &&
            this.parent[controlRectProperty] && this.isThereIntersectionWithParent(this.parent[controlRectProperty], currentRect);
    };
    XRControlSurfaceBase.prototype.isThereIntersectionWithChildCollection = function (controlRectProperty) {
        if (controlRectProperty === void 0) { controlRectProperty = '_unitRect'; }
        return this['controls'] && this['controls']().length > 0 &&
            this.isThereIntersectionWithChildControls(this['controls'](), controlRectProperty);
    };
    XRControlSurfaceBase.prototype.isThereIntersectionWithNeighborsCollection = function (currentRect, collectionControls, controlRectProperty) {
        if (controlRectProperty === void 0) { controlRectProperty = '_unitRect'; }
        for (var i = 0; i < collectionControls.length; i++) {
            if (this !== collectionControls[i] && this.isThereIntersection(currentRect, collectionControls[i][controlRectProperty])) {
                return true;
            }
        }
        return false;
    };
    XRControlSurfaceBase.prototype.isThereIntersectionWithChildControls = function (collectionControls, controlRectProperty) {
        if (controlRectProperty === void 0) { controlRectProperty = '_unitRect'; }
        var currentRect = this[controlRectProperty];
        for (var i = 0; i < collectionControls.length; i++) {
            if (this !== collectionControls[i] && this.isThereIntersectionWithParent(currentRect, collectionControls[i][controlRectProperty])) {
                return true;
            }
        }
        return false;
    };
    XRControlSurfaceBase.prototype.getAdornTemplate = function () {
        var result = XRControlSurface._appendValue('', 'dxrd-intersect', this.isIntersect());
        result = XRControlSurface._appendValue(result, 'dxrd-control-rtl', this._control.rtl());
        result = XRControlSurface._appendValue(result, 'dxrd-uiselected', this.selected());
        if (this.hasBindings) {
            if (this._context['validationMode'] && this._context['validationMode']()) {
                if (!this.bindingsIsValid) {
                    result = XRControlSurface._appendValue(result, 'dxrd-image-surface-bounded-notvalid', true);
                }
                else if (this.bindingsHasWarning) {
                    result = XRControlSurface._appendValue(result, 'dxrd-image-surface-bounded-warning', true);
                }
                else
                    result = XRControlSurface._appendValue(result, 'dxrd-image-surface-bounded', true);
            }
            else
                result = XRControlSurface._appendValue(result, 'dxrd-image-surface-bounded', true);
        }
        if (this._control['visible']) {
            result = XRControlSurface._appendValue(result, 'dxrd-surface-hidden', !this._control['visible']());
        }
        return result;
    };
    XRControlSurfaceBase.prototype.hasDataBindingByName = function (propertyName) {
        return !!(this._control['hasDataBindingByName'] && this._control['hasDataBindingByName'](propertyName));
    };
    Object.defineProperty(XRControlSurfaceBase.prototype, "hasBindings", {
        get: function () { return !!(this._control['hasBindings'] && this._control['hasBindings']()); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XRControlSurfaceBase.prototype, "bindingsIsValid", {
        get: function () {
            if (this._control['dataBindingMode'] !== 'Bindings') {
                if (!!this._control['expressionBindings']) {
                    return this._control['expressionObj'].validateExpression();
                }
                return true;
            }
            else {
                return this._control['dataBindingsAreValid']();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XRControlSurfaceBase.prototype, "bindingsHasWarning", {
        get: function () {
            if (this._control['dataBindingMode'] !== 'Bindings') {
                if (!!this._control['expressionBindings']) {
                    return this._control['expressionObj'].hasWarning();
                }
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    XRControlSurfaceBase.prototype.displayText = function () {
        if (this._control.controlType == 'XRPanel')
            return analytics_utils_1.getLocalization('Place controls here to keep them together', 'ReportStringId.PanelDesignMsg');
        var text = this._control['text'] && this._control['text']() ? this._control['text']() : '';
        if (this._control['multiline'] && !this._control['multiline']()) {
            text = text.replace(/\r/g, '').replace(/\n/g, '');
        }
        return text;
    };
    return XRControlSurfaceBase;
}(analytics_elements_1.SurfaceElementBase));
exports.XRControlSurfaceBase = XRControlSurfaceBase;
var XRControlSurface = (function (_super) {
    __extends(XRControlSurface, _super);
    function XRControlSurface(control, context) {
        var _this = _super.call(this, control, context, XRControlSurface._unitProperties) || this;
        _this['multiline'] = control['multiline'] || false;
        _this.getUsefulRect = function () {
            var borderWidth = ko.unwrap(control['borderWidth']), borderFlags = control['borders']();
            var rect = { top: 0, left: 0, width: _this.rect().width, height: _this.rect().height };
            if (borderWidth) {
                if (borderFlags === 'All') {
                    rect.height -= 2 * borderWidth;
                    rect.width -= 2 * borderWidth;
                }
                else {
                    if (borderFlags.indexOf('Top') >= 0)
                        rect.height -= borderWidth;
                    if (borderFlags.indexOf('Right') >= 0)
                        rect.width -= borderWidth;
                    if (borderFlags.indexOf('Bottom') >= 0)
                        rect.height -= borderWidth;
                    if (borderFlags.indexOf('Left') >= 0)
                        rect.width -= borderWidth;
                }
            }
            return rect;
        };
        return _this;
    }
    XRControlSurface.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.controls);
        this.resetObservableArray(this.controls);
    };
    XRControlSurface._unitProperties = {
        _height: function (o) {
            return o.size.height;
        },
        _width: function (o) {
            return o.size.width;
        },
        _x: function (o) {
            return o.location.x;
        },
        _y: function (o) {
            return o.location.y;
        }
    };
    return XRControlSurface;
}(XRControlSurfaceBase));
exports.XRControlSurface = XRControlSurface;
