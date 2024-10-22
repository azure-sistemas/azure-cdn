﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrReport.js)
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
var ko = require("knockout");
var $ = require("jquery");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ReportViewModel = (function (_super) {
    __extends(ReportViewModel, _super);
    function ReportViewModel(report, serializer) {
        var _this = this;
        serializer = serializer || new _serializer_1.ReportModelSerializer();
        report = report.XtraReportsLayoutSerializer || report;
        _this = _super.call(this, report, null, serializer) || this;
        if (_this.pageWidth() === xrReport_1.pageWidth.defaultVal) {
            _this.pageWidth(ReportViewModel.defaultPageSize.width);
        }
        if (_this.pageHeight() === xrReport_1.pageHeight.defaultVal) {
            _this.pageHeight(ReportViewModel.defaultPageSize.height);
        }
        _this._dataBindingMode = ko.observable('');
        _this._update = ko.observable(false);
        _this._disposables.push(_this.isModelReady = ko.pureComputed(function () { return !_this._update(); }));
        _this._disposables.push(_this.key = ko.pureComputed(function () { return _this.name(); }));
        _this._disposables.push(_this['displayName'] = ko.pureComputed({
            read: function () { return _this.displayNameObject(); },
            write: function (newValue) { _this.displayNameObject(newValue); }
        }));
        _this.dataSourceRefs = [];
        _this.dataSourceHelper = ko.observable();
        _this.stylesHelper = ko.observable();
        _this.dataBindingsProvider = ko.observable();
        _this.parameterHelper = new reportParameterHelper_1.ReportParameterHelper();
        _this._disposables.push(_this.measureUnit.subscribe(function (unitType) {
            _this._update(true);
            _this._recalculateUnits(unitType);
            _this._update(false);
        }));
        _this._disposables.push(_this.landscape.subscribe(function (newVal) {
            var width = _this.pageWidth();
            _this.pageWidth(_this.pageHeight());
            _this.pageHeight(width);
        }));
        _this._disposables.push(_this.dataSource.subscribe(function (newVal) {
            if (!newVal) {
                _this.dataMember(null);
            }
        }));
        _this.styles = analytics_utils_1.deserializeArray(report.StyleSheet, function (item) { return new style_1.StyleModel(item, serializer); });
        _this._objectStorage = analytics_utils_1.deserializeArray(report.ObjectStorage, function (item) { return objectItemCreation_1.createNewObjectItem(item, _this.dsHelperProvider, serializer); });
        _this._componentStorage = analytics_utils_1.deserializeArray(report.ComponentStorage, function (item) { return objectItemCreation_1.createNewObjectItem(item, _this.dsHelperProvider, serializer); });
        _this.objectStorage = ReportViewModel.createObjectStorage(_this._componentStorage, _this._objectStorage, function (subscription) { return _this._disposables.push(subscription); });
        _this.objectsStorageHelper = new objectStorage_1.ObjectsStorage(_this.objectStorage, _this.dsHelperProvider);
        _this._disposables.push(_this.objectsStorageHelper);
        _this.parameters = analytics_utils_1.deserializeArray(report.Parameters, function (item) { return new parameter_1.Parameter(item, _this, serializer); });
        _this.parameterPanelLayoutItems = analytics_utils_1.deserializeArray(report.ParameterPanelLayoutItems, function (item) { return new layoutItems_1.ParameterPanelLayoutItem(item, serializer); });
        _this.objectStorage().forEach(function (objectStorage) {
            if (objectStorage instanceof universalDataSource_1.UniversalDataSource) {
                objectStorage['tableInfoCollection']().forEach(function (tableInfoCollection) {
                    tableInfoCollection.filterString().helper.parameters = _this.parameters;
                });
            }
        });
        _this.bands = analytics_internal_1.deserializeChildArray(report.Bands, _this, function (item) { return _this.createControl(item, serializer); });
        _bandUtils_1.initLevels(_this.bands());
        _this.bands().sort(_bandUtils_1.sortBands);
        _this.extensions = analytics_utils_1.deserializeArray(report.Extensions, function (item) { return new extension_1.ExtensionModel(item, serializer); });
        _this.crossBandControls = analytics_utils_1.deserializeArray(report.CrossBandControls, function (item) { return _this.createControl(item, serializer); });
        _this.calculatedFields = analytics_utils_1.deserializeArray(report.CalculatedFields, function (item) { return new calculatedField_1.CalculatedField(item, serializer); });
        _this._initializeBands();
        _this.formattingRuleSheet = analytics_utils_1.deserializeArray(report.FormattingRuleSheet, function (item) { return new formattingrules_1.FormattingRule(item, _this, serializer); });
        _this.components = ko.observableArray([]);
        _this._disposables.push(_this.formattingRuleSheet.subscribe(function (args) {
            args.forEach(function (rule) {
                if (!rule.value.name()) {
                    rule.value.name(analytics_internal_1.getUniqueNameForNamedObjectsArray(_this.formattingRuleSheet(), 'formattingRule'));
                }
                if (!rule.value.parent) {
                    rule.value.parent = _this;
                }
            });
        }, null, 'arrayChange'));
        _this._disposables.push(_this.margins.left.subscribe(function (newVal) {
            if (_this.isModelReady() && newVal > _this.pageWidth() - _this.margins.right()) {
                _this.margins.right(_this.pageWidth() - _this.margins.left());
            }
        }));
        _this._disposables.push(_this.margins.right.subscribe(function (newVal) {
            if (_this.isModelReady() && newVal > _this.pageWidth() - _this.margins.left()) {
                _this.margins.left(_this.pageWidth() - _this.margins.right());
            }
        }));
        _this._disposables.push(_this.paperKind.subscribe(function (newVal) {
            if (newVal !== 'Custom') {
                var size = analytics_internal_1.papperKindMapper[newVal];
                _this.pageHeight(analytics_internal_1.roundingXDecimals((_this.landscape() ? size.width : size.height) * (_this._innerDpi.peek() / 100)));
                _this.pageWidth(analytics_internal_1.roundingXDecimals((_this.landscape() ? size.height : size.width) * (_this._innerDpi.peek() / 100)));
            }
        }));
        var dataMember = ko.pureComputed(function () {
            return analytics_internal_1.getFullPath(_this.getPath('dataMember'), _this.dataMember());
        });
        var dataSource = _this.dataSource;
        var disabled = ko.pureComputed(function () { return !dataSource(); });
        var filterString = new analytics_widgets_1.FilterStringOptions(_this['_filterString'], dataMember, disabled);
        _this._disposables.push(dataMember);
        _this._disposables.push(disabled);
        filterString.helper.parameters = ko.computed(function () {
            return _parameterUtils_1.collectAvailableParameters(_this.parameters());
        });
        _this._disposables.push(filterString.helper.parameters);
        _this['filterString'] = filterString;
        _this.watermark = new watermark_1.WatermarkModel(report['Watermark'], serializer);
        _this._scriptReferencesString = ko.observable(_this.scriptReferencesString());
        _this._disposables.push(_this.scriptReferencesString = ko.pureComputed({
            read: function () { return _this._scriptReferencesString(); },
            write: function (newVal) { _this._scriptReferencesString(_utils_1.transformNewLineCharacters(newVal)); }
        }));
        _this._localizationItems = analytics_utils_1.deserializeArray(report.LocalizationItems, function (item) { return new _localization_1.LocalizationItem(item, serializer); });
        _this._disposables.push(_this._localization = new _localization_1.ReportLocalizationEngine(_this));
        _this._localizationItems.removeAll();
        var currentLanguage = metadata_1.defaultCulture;
        _this.language = ko.observable(currentLanguage);
        _this._localization.apply(currentLanguage);
        _this._disposables.push(_this.language.subscribe(function (newVal) {
            _this._localization.save(currentLanguage);
            _this._localization.apply(newVal);
            currentLanguage = newVal;
        }));
        return _this;
    }
    ReportViewModel.createObjectStorage = function (_componentStorage, _objectStorage, collectSubscription) {
        if (collectSubscription === void 0) { collectSubscription = function (subscription) { return void 0; }; }
        var objectStorage = ko.observableArray(_objectStorage().concat(_componentStorage()));
        collectSubscription(objectStorage.subscribe(function (changeSet) {
            changeSet.forEach(function (change) {
                if (change.status === 'added') {
                    if (change.value.objectType && ReportViewModel.availableDataSourceTypes.some(function (x) { return change.value.objectType().indexOf(x) !== -1; })) {
                        _componentStorage.push(change.value);
                    }
                    else {
                        _objectStorage.push(change.value);
                    }
                }
                else if (change.status === 'deleted') {
                    if (change.value.objectType && ReportViewModel.availableDataSourceTypes.some(function (x) { return change.value.objectType().indexOf(x) !== -1; })) {
                        _componentStorage.remove(change.value);
                    }
                    else {
                        _objectStorage.remove(change.value);
                    }
                }
            });
        }, null, 'arrayChange'));
        return objectStorage;
    };
    ReportViewModel.prototype._getDpi = function (unitType) {
        switch (unitType) {
            case 'HundredthsOfAnInch': return 100;
            case 'TenthsOfAMillimeter': return 254;
            case 'Pixels': return 96;
        }
    };
    ReportViewModel.prototype._recalculateUnits = function (unitType) {
        var newDpi = this._getDpi(unitType), oldDpi = this._innerDpi(), coef = newDpi / oldDpi;
        var unitProperties = _initUtils_1.getUnitProperties(this);
        unitProperties && unitProperties.reCalculateObject(coef);
        this.enumerateComponents(function (target) {
            target().forEach(function (item) {
                var unitProperties = _initUtils_1.getUnitProperties(item);
                unitProperties && unitProperties.reCalculateObject(coef);
            });
        });
        this._localization.recalculateUnits(coef);
        this._innerDpi(newDpi);
    };
    ReportViewModel.prototype.enumerateComponents = function (process) {
        if (process === void 0) { process = function () { return void 0; }; }
        var controls = [];
        analytics_internal_1.collectionsVisitor(this, process, ['controls', 'bands', 'subBands', 'crossBandControls', 'rows', 'cells', 'parameters', 'fields', 'levels'], controls);
        return [].concat.apply([], controls);
    };
    ReportViewModel.prototype.createLocalizationProvider = function () {
        return new _localizationUtils_1.ReportLocalizationProvider(this);
    };
    ReportViewModel.prototype.findStyle = function (styleName) {
        var result = null;
        for (var i = 0; i < this.styles().length; i++) {
            if (this.styles()[i].name() === styleName) {
                return this.styles()[i];
            }
        }
        return result;
    };
    ReportViewModel.prototype._getBandForToc = function (bands) {
        var _this = this;
        var currentBand = null;
        bands.some(function (band) {
            if (!_tocUtils_1.getExistTableOfContents(band)) {
                currentBand = band;
            }
            else if (band.bands().length > 0) {
                currentBand = _this._getBandForToc(band.bands());
            }
            return !!currentBand;
        });
        return currentBand;
    };
    ReportViewModel.prototype.getOrCreateBandForToC = function (createNew) {
        if (createNew === void 0) { createNew = true; }
        var availableTypes = ['ReportHeaderBand', 'ReportFooterBand'];
        var bands = this.bands().filter(function (element) {
            var typesIndex = availableTypes.indexOf(element.controlType);
            if (typesIndex !== -1) {
                availableTypes.splice(typesIndex, 1);
                return true;
            }
            return false;
        });
        var currentBand = this._getBandForToc(bands);
        var canCreate = availableTypes.length > 0;
        if (createNew && !currentBand && canCreate) {
            currentBand = this.createChild({ '@ControlType': availableTypes[0] });
        }
        return { band: currentBand, canAdd: canCreate || currentBand };
    };
    ReportViewModel.prototype.canAddToC = function () {
        return this.getOrCreateBandForToC(false).canAdd;
    };
    ReportViewModel.prototype._initializeBands = function () {
        var traverse = function (xs) { return xs.reduce(function (res, x) { res.push.apply(res, [x].concat(traverse(ko.unwrap(x['bands']) || []))); return res; }, []); };
        var bandNames = traverse(this.bands()).map(function (x) { return x.name(); });
        if (this.bands().length === 0) {
            this.createChild({ '@ControlType': 'DetailBand', '@Name': 'Detail1' });
        }
        else if (analytics_internal_1.getFirstItemByPropertyValue(this.bands(), 'controlType', 'DetailBand') === null && analytics_internal_1.getFirstItemByPropertyValue(this.bands(), 'controlType', 'VerticalDetailBand') === null) {
            this.createChild({ '@ControlType': 'DetailBand', '@Name': analytics_internal_1.getUniqueName(bandNames, 'Detail') });
        }
        if (analytics_internal_1.getFirstItemByPropertyValue(this.bands(), 'controlType', 'TopMarginBand') === null) {
            this.createChild({ '@ControlType': 'TopMarginBand', '@Name': analytics_internal_1.getUniqueName(bandNames, 'TopMargin') });
        }
        if (analytics_internal_1.getFirstItemByPropertyValue(this.bands(), 'controlType', 'BottomMarginBand') === null) {
            this.createChild({ '@ControlType': 'BottomMarginBand', '@Name': analytics_internal_1.getUniqueName(bandNames, 'BottomMargin') });
        }
    };
    ReportViewModel.prototype.isPropertyDisabled = function (name) {
        if (name === 'pageWidth' || name === 'pageHeight') {
            return this.paperKind() !== 'Custom';
        }
        else if (name === 'dataMember') {
            return this.dataSource() === null;
        }
        return _super.prototype.isPropertyDisabled.call(this, name);
    };
    ReportViewModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.parameters);
        this.disposeObservableArray(this.calculatedFields);
        this.disposeObservableArray(this.crossBandControls);
        this.disposeObservableArray(this.formattingRuleSheet);
        this.disposeObservableArray(this.bands);
        this.disposeObservableArray(this.objectStorage);
        this.disposeObservableArray(this.styles);
        this.resetObservableArray(this.extensions);
        this.resetObservableArray(this.objectStorage);
        this.resetObservableArray(this.parameters);
        this.resetObservableArray(this.parameterPanelLayoutItems);
        this.resetObservableArray(this.calculatedFields);
        this.resetObservableArray(this.crossBandControls);
        this.resetObservableArray(this.formattingRuleSheet);
        this.resetObservableArray(this.bands);
        this.resetObservableArray(this.styles);
        this.resetObservableArray(this.components);
    };
    ReportViewModel.prototype.preInitProperties = function () {
        this.controlType = 'DevExpress.XtraReports.UI.XtraReport';
    };
    ReportViewModel.prototype.isLocalized = function () {
        return this._localization.isLocalized();
    };
    ReportViewModel.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        this.size.height = this.pageHeight;
        this.size.width = this.pageWidth;
    };
    ReportViewModel.prototype.getNearestParent = function (target) {
        return this;
    };
    ReportViewModel.prototype.addChild = function (control) {
        if (control instanceof xrCrossband_1.XRCrossBandControlViewModel) {
            control.parentModel(this);
            control.startBand(this.bands()[0]);
            control.endBand(this.bands()[0]);
            this.crossBandControls.push(control);
        }
        else if (control instanceof xrBand_1.BandViewModel) {
            _bandContainerUtils_1.addBandToContainer(this, control);
        }
        else {
            analytics_internal_1.NotifyAboutWarning('Attempt to add wrong child control.');
        }
    };
    ReportViewModel.prototype.removeChild = function (control) {
        if (control instanceof xrCrossband_1.XRCrossBandControlViewModel) {
            this.crossBandControls.splice(this.crossBandControls().indexOf(control), 1);
        }
        else if (control instanceof xrBand_1.BandViewModel) {
            if (this.bands().length > 1) {
                this.bands.splice(this.bands().indexOf(control), 1);
            }
        }
        else {
            analytics_internal_1.NotifyAboutWarning('Attempt to remove wrong child control.');
        }
    };
    ReportViewModel.prototype.clearLocalization = function (culture) {
        if (culture === void 0) { culture = this.language(); }
        this._localization.items.clear(culture);
        this._localization.apply(culture);
    };
    ReportViewModel.prototype.serialize = function () {
        this._localization.save();
        if (this.isLocalized()) {
            this._localizationItems(this._localization.serialize());
        }
        else {
            this._localization.apply(metadata_1.defaultCulture);
            this._localization.items.clear();
        }
        return new _serializer_1.ReportModelSerializer(this).serialize();
    };
    ReportViewModel.prototype.save = function () {
        var data = this.serialize();
        if (this.onSave) {
            this.onSave(data);
        }
        return data;
    };
    ReportViewModel.prototype.getPath = function (propertyName) {
        var helper = ko.unwrap(this.dataSourceHelper);
        if (!helper)
            return;
        var path = helper.getDataSourcePath(this.dataSource());
        if (propertyName === 'expression' && this.dataMember())
            path += '.' + this.dataMember();
        return path;
    };
    ReportViewModel.prototype.clone = function () {
        var _this = this;
        var dataSourceRefs = [];
        var collectStorages = function (storage, isComponentStorage) {
            if (isComponentStorage === void 0) { isComponentStorage = false; }
            storage.reduce(function (result, storageItem, index) {
                var dataSourceRef = _this.dataSourceRefs.filter(function (x) { return x.ref === storageItem['_model']['@Ref']; })[0];
                if (dataSourceRef) {
                    result.push({
                        index: index,
                        isComponentStorage: isComponentStorage,
                        dataSourceRef: analytics_internal_1.extend(true, {}, dataSourceRef)
                    });
                }
                return result;
            }, dataSourceRefs);
        };
        collectStorages(this._objectStorage());
        collectStorages(this._componentStorage(), true);
        var report = new ReportViewModel(this.save());
        report.dataSourceRefs = [];
        dataSourceRefs.forEach(function (item) {
            var storage = item.isComponentStorage ? report._componentStorage() : report._objectStorage();
            item.dataSourceRef.ref = storage[item.index]['_model']['@Ref'];
            report.dataSourceRefs.push(item.dataSourceRef);
        });
        return report;
    };
    ReportViewModel.prototype.isStyleProperty = function (propertyName) { return false; };
    Object.defineProperty(ReportViewModel.prototype, "dataBindingMode", {
        get: function () {
            return ko.unwrap(this._dataBindingMode);
        },
        enumerable: true,
        configurable: true
    });
    ReportViewModel.availableDataSourceTypes = ['DataSource', 'ObjectSource'];
    ReportViewModel.bandsTypeOrdering = ['TopMarginBand', 'ReportHeaderBand', 'PageHeaderBand', 'GroupHeaderBand', 'DetailBand', 'DetailReportBand', 'GroupFooterBand', 'ReportFooterBand', 'PageFooterBand', 'BottomMarginBand'];
    ReportViewModel.unitProperties = ['snapGridSize', 'margins', 'size'];
    ReportViewModel.defaultPageSize = {
        width: 850,
        height: 1100
    };
    return ReportViewModel;
}(xrReportelement_1.XRReportElementViewModel));
exports.ReportViewModel = ReportViewModel;
var ReportSurface = (function (_super) {
    __extends(ReportSurface, _super);
    function ReportSurface(report, zoom) {
        if (zoom === void 0) { zoom = ko.observable(1); }
        var _this = _super.call(this, report, {
            measureUnit: report.measureUnit, zoom: zoom
        }, ReportSurface._unitProperties) || this;
        _this.allowMultiselect = false;
        _this.locked = false;
        _this.focused = ko.observable(false);
        _this.selected = ko.observable(false);
        _this.templateName = ko.observable('dxrd-report');
        _this.underCursor = ko.observable(new analytics_internal_1.HoverInfo());
        _this.crossBandControls = ko.observableArray();
        _this.minHeight = ko.observable();
        _this.maxMarkerWidth = ko.observable();
        _this.validationMode = ko.observable(false);
        _this.parent = null;
        _this.zoom = zoom;
        _this.dpi = report.dpi;
        _this._disposables.push(_this.rtl = ko.pureComputed(function () { return report.rtl() && report.rtlLayout() === 'Yes'; }));
        _this.measureUnit = report.measureUnit;
        _this._context = _this;
        _this._watermarkImageNaturalSize = ko.observable({ width: 0, height: 0 });
        _this.drawWatermark = report.drawWatermark;
        _this.watermark = report.watermark;
        _this._disposables.push(report.watermark.imageSource.subscribe(function (newValue) {
            _this._updateWatermarkImageNaturalSize(newValue);
        }));
        _this._updateWatermarkImageNaturalSize(report.watermark.imageSource.peek());
        _this._disposables.push(_this._watermarkTextRenderingResult = ko.pureComputed(function () {
            var canvas = document.createElement('canvas');
            var originalWidthPx = analytics_internal_1.unitsToPixel(report.pageWidth(), _this.measureUnit());
            var originalHeightPx = analytics_internal_1.unitsToPixel(report.pageHeight(), _this.measureUnit());
            canvas.width = originalWidthPx;
            canvas.height = originalHeightPx;
            var context = canvas.getContext('2d');
            context.translate(originalWidthPx / 2, originalHeightPx / 2);
            switch (report.watermark.textDirection()) {
                case 'Vertical':
                    context.rotate(-Math.PI / 2);
                    break;
                case 'ForwardDiagonal':
                    context.rotate(-50 * Math.PI / 180);
                    break;
                case 'BackwardDiagonal':
                    context.rotate(50 * Math.PI / 180);
            }
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            var font = new analytics_internal_1.CssCalculator(report.watermark, ko.observable(false)).fontCss();
            context.font = [font.fontStyle.toLowerCase(), font.fontWeight.toLowerCase(), font.fontSize, font.fontFamily].filter(function (x) { return x; }).join(' ');
            context.fillStyle = report.watermark.foreColor();
            context.fillText(report.watermark.text(), 0, 0);
            return canvas.toDataURL('image/png');
        }));
        _this._disposables.push(_this._width = ko.pureComputed({
            read: function () {
                return _this['pageWidth']();
            }
        }));
        _this._disposables.push(_this._height = ko.pureComputed({
            read: function () {
                return _this['pageHeight']();
            }
        }));
        _this.margins = {
            bottom: _this['_bottom'],
            left: _this._createMargin('_left', '_right'),
            right: _this._createMargin('_right', '_left'),
            top: _this['_top']
        };
        _this._disposables.push(_this.pageWidthWithoutMargins = ko.computed(function () {
            return _this.pageWidth() - _this.margins.left() - _this.margins.right();
        }));
        _this._disposables.push(_this.margins.left);
        _this._disposables.push(_this.margins.right);
        _this._disposables.push(_this.bandsHolder = new _bandHolder_1.BandsHolder(_this));
        _this.bandsHolder.initialize(report.bands);
        _this._disposables.push(ko.computed(function () {
            var levelCount = _bandUtils_1.getLevelCount(_this.bandsHolder);
            _bandUtils_1.setMarkerWidth(_this.bandsHolder, levelCount, 0);
            _this.maxMarkerWidth(bandSurfaceCollapsedHeight_1.bandSurfaceCollapsedHeight * levelCount + 22);
        }));
        _this._disposables.push(_this.effectiveHeight = ko.pureComputed(function () {
            var minHeight = _this.bandsHolder.getHeight();
            _this.minHeight(minHeight);
            return minHeight;
        }));
        _this._disposables.push(analytics_internal_1.createObservableArrayMapCollection(report.crossBandControls, _this.crossBandControls, _this._createSurface));
        _this._disposables.push(_this.ghostContainerOffset = ko.pureComputed(function () {
            return _this.rtl() ? 0 : _this.margins.left();
        }));
        var marginOptions = new SurfaceMarginResizeOptions(_this.margins, _this.rtl, _this.pageWidth);
        _this._disposables.push(marginOptions);
        _this.rightMarginOffset = marginOptions.rightMarginOffset;
        _this.leftMarginOffset = marginOptions.leftMarginOffset;
        _this.rightMarginResizableOffset = marginOptions.rightMarginResizableOffset;
        _this.leftMarginResizableOffset = marginOptions.leftMarginResizableOffset;
        _this.leftMarginResizeOptions = marginOptions.leftMarginOptions;
        _this.rightMarginResizeOptions = marginOptions.rightMarginOptions;
        return _this;
    }
    ReportSurface.prototype._createMargin = function (side, oppositeSide) {
        var _this = this;
        return ko.pureComputed({
            read: function () { return _this.rtl() ? _this[oppositeSide]() : _this[side](); },
            write: function (value) {
                _this.rtl() ? _this[oppositeSide](value) : _this[side](value);
            }
        });
    };
    ReportSurface.prototype._updateWatermarkImageNaturalSize = function (val) {
        var _this = this;
        if (!val)
            return;
        var image = new Image();
        image.src = val.getDataUrl();
        image.onload = function (e) {
            _this._watermarkImageNaturalSize({ width: image.naturalWidth, height: image.naturalHeight });
            image.onload = null;
        };
    };
    Object.defineProperty(ReportSurface.prototype, "_unitAbsoluteRect", {
        get: function () {
            return {
                top: 0, left: 0,
                right: this._control.size.width(), bottom: this._control.size.height(),
                width: this._control.size.width(), height: this._control.size.height(),
            };
        },
        enumerable: true,
        configurable: true
    });
    ReportSurface.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.crossBandControls);
        this.resetObservableArray(this.crossBandControls);
    };
    ReportSurface.prototype.getChildrenCollection = function () {
        return this.bandsHolder.bands;
    };
    ReportSurface.prototype.isFit = function (dropTarget) {
        return dropTarget.underCursor().y >= -0.1
            && dropTarget.underCursor().x >= 0
            && ((this === dropTarget) ? this.effectiveHeight() : dropTarget.rect().height) > dropTarget.underCursor().y
            && (this.pageWidth() - this.margins.left()) > dropTarget.underCursor().x;
    };
    ReportSurface.prototype.canDrop = function () { return true; };
    ReportSurface.prototype.wrapRtlProperty = function (data, undoEngine, element) {
        var _this = this;
        var wrapper = ko.computed({
            read: data.value,
            write: function (newValue) {
                undoEngine.peek().start();
                var prevValue = _this.rtl.peek();
                data.value(newValue);
                if (prevValue !== _this.rtl.peek()) {
                    var report = _this.getControlModel();
                    var left = report.margins.left();
                    report.margins.left(report.margins.right());
                    report.margins.right(left);
                }
                undoEngine.peek().end();
            }
        });
        analytics_internal_1.addDisposeCallback(element, function () { wrapper.dispose(); });
        return analytics_internal_1.extend({}, data, { value: wrapper });
    };
    ReportSurface.prototype.checkParent = function (surfaceParent) { return false; };
    ReportSurface._unitProperties = {
        _width: function (o) { return o.size.width; },
        _height: function (o) { return o.size.height; },
        pageWidth: function (o) { return o.size.width; },
        pageHeight: function (o) { return o.size.height; },
        snapGridSize: function (o) {
            return o.snapGridSize;
        },
        _bottom: function (o) { return o.margins.bottom; },
        _left: function (o) { return o.margins.left; },
        _right: function (o) { return o.margins.right; },
        _top: function (o) { return o.margins.top; }
    };
    return ReportSurface;
}(analytics_elements_1.SurfaceElementArea));
exports.ReportSurface = ReportSurface;
var SurfaceMarginResizeOptions = (function (_super) {
    __extends(SurfaceMarginResizeOptions, _super);
    function SurfaceMarginResizeOptions(margins, rtl, pageWidth) {
        var _this = _super.call(this) || this;
        _this.rtl = rtl;
        _this.handle = 'w';
        _this.oppositeHandle = 'e';
        var elements = [];
        _this._disposables.push(rtl.subscribe(function (value) {
            $(elements).find('.ui-resizable-e, .ui-resizable-w')
                .removeClass('ui-resizable-' + (value ? _this.handle : _this.oppositeHandle))
                .addClass('ui-resizable-' + (value ? _this.oppositeHandle : _this.handle));
        }));
        var rightOptions = null;
        var leftOptions = null;
        _this._disposables.push(_this.rightMarginOffset = ko.pureComputed(function () {
            return rtl() ? 0 : pageWidth() - margins.left() - margins.right();
        }));
        _this._disposables.push(_this.leftMarginOffset = ko.pureComputed(function () {
            return rtl() ? pageWidth() - margins.left() : 0;
        }));
        _this._disposables.push(_this.rightMarginResizableOffset = ko.pureComputed(function () {
            return rtl() ? margins.right() : _this.rightMarginOffset();
        }));
        _this._disposables.push(_this.leftMarginResizableOffset = ko.pureComputed(function () {
            return rtl() ? margins.right() : 0;
        }));
        _this.rightMarginOptions = function (undoEngine, element) {
            if (!rightOptions) {
                var margin = margins.right();
                var maxRightMargin = pageWidth() - margins.left() - 1;
                rightOptions = _this._createOptions(undoEngine, function (ui) {
                    margin = margins.right();
                    maxRightMargin = pageWidth() - margins.left() - 1;
                    $(ui.element).resizable('option', 'minWidth', 0);
                    $(ui.element).resizable('option', 'maxWidth', maxRightMargin);
                }, function (ui) {
                    margins.right(Math.min(Math.max(0, ui.size.width - ui.originalSize.width + margin), maxRightMargin));
                    if (!ui.element.hasClass('dxrd-ruler-shadow')) {
                        $(ui.element).css({ left: _this.rightMarginResizableOffset(), width: 0 });
                    }
                    else {
                        $(ui.element).css({ left: _this.rightMarginOffset() });
                    }
                });
                _this._disposables.push(rightOptions);
            }
            elements.push(element);
            return rightOptions;
        };
        _this.leftMarginOptions = function (undoEngine, element) {
            if (!leftOptions) {
                leftOptions = _this._createOptions(undoEngine, function (ui) {
                    $(ui.element).resizable('option', 'minWidth', 0);
                    $(ui.element).resizable('option', 'maxWidth', pageWidth() - margins.right() - 1);
                }, function (ui) {
                    margins.left(pageWidth() - Math.max(0, ui.size.width) - margins.right());
                    $(ui.element).css({ left: _this.leftMarginResizableOffset(), width: (pageWidth() - margins.left() - margins.right()) });
                });
                _this._disposables.push(leftOptions);
            }
            elements.push(element);
            return leftOptions;
        };
        return _this;
    }
    SurfaceMarginResizeOptions.prototype._createOptions = function (undoEngine, startDelegate, resizeDelegate) {
        var _this = this;
        return ko.computed(function () {
            return {
                handles: _this.rtl() ? _this.oppositeHandle : _this.handle,
                start: function (e, ui) {
                    startDelegate(ui);
                    undoEngine().start();
                },
                resize: function (e, ui) {
                    resizeDelegate(ui);
                },
                stop: function (e, ui) {
                    undoEngine().end();
                },
                disabled: analytics_internal_1.DragDropHandler.started
            };
        });
    };
    return SurfaceMarginResizeOptions;
}(analytics_utils_1.Disposable));
var _localizationUtils_1 = require("./utils/_localizationUtils");
var _serializer_1 = require("../internal/serialization/_serializer");
var reportParameterHelper_1 = require("../helpers/reportParameterHelper");
var style_1 = require("./properties/style");
var objectStorage_1 = require("../dataObjects/objectStorage");
var parameter_1 = require("../dataObjects/parameters/parameter");
var universalDataSource_1 = require("../dataObjects/universalDataSource");
var extension_1 = require("./properties/extension");
var calculatedField_1 = require("../dataObjects/calculatedField");
var metadata_1 = require("../../common/metadata");
var xrBand_1 = require("../bands/xrBand");
var xrReport_1 = require("./metadata/xrReport");
var xrCrossband_1 = require("./xrCrossband");
var _bandHolder_1 = require("../bands/_bandHolder");
var watermark_1 = require("./properties/watermark");
var formattingrules_1 = require("./properties/formattingrules");
var _localization_1 = require("../localization/_localization");
var _bandUtils_1 = require("../bands/_bandUtils");
var bandSurfaceCollapsedHeight_1 = require("../bands/bandSurfaceCollapsedHeight");
var _tocUtils_1 = require("./utils/_tocUtils");
var objectItemCreation_1 = require("../dataObjects/objectItemCreation");
var _parameterUtils_1 = require("../dataObjects/metadata/_parameterUtils");
var _initUtils_1 = require("./utils/_initUtils");
var _bandContainerUtils_1 = require("../bands/_bandContainerUtils");
var _utils_1 = require("../../common/utils/_utils");
var layoutItems_1 = require("../dataObjects/parameters/layoutItems");
