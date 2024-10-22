﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrSubreport.js)
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
var xrReport_1 = require("./xrReport");
var xrControl_1 = require("./xrControl");
var _locker_1 = require("../../common/utils/_locker");
var reportStorageWeb_1 = require("../services/reportStorageWeb");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var dataBinding_1 = require("../dataObjects/dataBinding");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var SubreportViewModel = (function (_super) {
    __extends(SubreportViewModel, _super);
    function SubreportViewModel(model, serializer) {
        var _this = _super.call(this, model, serializer) || this;
        _this.isAllSufficient = false;
        delete _this._model['ObjectStorage'];
        delete _this._model['ComponentStorage'];
        return _this;
    }
    SubreportViewModel.prototype._initializeBands = function () {
        if (this.bands().length === 0) {
            this.createChild({ '@ControlType': 'DetailBand', '@Name': 'Detail1' });
        }
    };
    SubreportViewModel.from = function (model, serializer) {
        return model ? new SubreportViewModel(model, serializer) : null;
    };
    SubreportViewModel.toJson = function (value, serializer, refs) {
        return serializer.serialize(value, xrReport_2.reportSerializationInfo, refs);
    };
    SubreportViewModel.prototype.getInfo = function () {
        if (!this.isAllSufficient) {
            var newSerializationInfo = $.extend(true, [], _super.prototype.getInfo.call(this));
            newSerializationInfo.reduce(function (indexes, currentInfo, index) {
                if (currentInfo.propertyName === '_objectStorage' || currentInfo.propertyName === '_componentStorage')
                    return [index].concat(indexes);
                return indexes;
            }, []).forEach(function (index) { return newSerializationInfo.splice(index, 1); });
            return newSerializationInfo;
        }
        return _super.prototype.getInfo.call(this);
    };
    SubreportViewModel.prototype.serialize = function () {
        this.isAllSufficient = true;
        var result = _super.prototype.serialize.call(this);
        this.isAllSufficient = false;
        return result;
    };
    SubreportViewModel.defaultReport = {
        '@ControlType': 'DevExpress.XtraReports.UI.XtraReport',
        '@PageWidth': '850',
        '@PageHeight': '1100',
        '@Version': '21.2',
        '@Font': 'Arial,9pt',
        '@Dpi': '100',
        'Bands': {
            'Item1': {
                '@ControlType': 'TopMarginBand',
                '@HeightF': '100'
            },
            'Item2': {
                '@ControlType': 'DetailBand',
                '@HeightF': '100'
            },
            'Item3': {
                '@ControlType': 'BottomMarginBand',
                '@HeightF': '100'
            }
        }
    };
    return SubreportViewModel;
}(xrReport_1.ReportViewModel));
exports.SubreportViewModel = SubreportViewModel;
var ParameterBinding = (function (_super) {
    __extends(ParameterBinding, _super);
    function ParameterBinding(model, parent, serializer) {
        var _this = _super.call(this, model, serializer) || this;
        _this.visible = ko.observable(true);
        _this.subreportControl = ko.observable();
        var _self = _this;
        _this.fakeBinding = _this;
        _this._disposables.push(_this._reportDataSource = ko.computed(function () {
            var control = _this.subreportControl();
            return control && control.root['dataSource'] && control.root['dataSource']() || null;
        }));
        var _dataSource = ko.observable(_this.dataSource());
        _this._disposables.push(_this.dataSource = ko.pureComputed({
            read: function () {
                return _dataSource() || _this._reportDataSource();
            },
            write: function (newValue) {
                _dataSource(newValue);
            }
        }));
        _this._disposables.push(_this.dataSource.subscribe(function (newValue) {
            if (!newValue) {
                _this.dataMember(null);
            }
        }));
        var subscribe = _this.subreportControl.subscribe(function (newValue) {
            if (newValue) {
                subscribe.dispose();
                _self._disposables.push(newValue.root['parameters'].subscribe(function (newParameters) {
                    if (!_parameterUtils_1.collectAvailableParameters(newParameters).some(function (parameter) { return parameter === _self.parameter(); })) {
                        _self.parameter(null);
                    }
                }));
            }
        });
        _this._disposables.push(subscribe);
        _this.subreportControl(parent);
        return _this;
    }
    ParameterBinding.createNew = function () {
        return new ParameterBinding({}, null);
    };
    ParameterBinding.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.subreportControl(null);
    };
    ParameterBinding.prototype.getInfo = function () {
        if (this.subreportControl && this.subreportControl() && this.subreportControl().subreportParameters().length > 0) {
            var serializationInfo = $.extend(true, [], xrSubreport_1.parameterBindingSerializationInfo);
            var parameterNameInfo = serializationInfo.filter(function (info) { return info.propertyName === 'parameterName'; })[0];
            parameterNameInfo.valuesArray = this.subreportControl().subreportParameters().map(function (parameter) { return { value: parameter, displayValue: parameter }; });
            var dataSourceInfo = serializationInfo.filter(function (info) { return info.propertyName === 'dataSource'; })[0];
            dataSourceInfo.defaultVal = this._reportDataSource();
            return serializationInfo;
        }
        return xrSubreport_1.parameterBindingSerializationInfo;
    };
    ParameterBinding.prototype.updateParameter = function (pathRequest, dataSources) {
        _super.prototype.updateParameter.call(this, pathRequest, dataSources);
        this.dataMember(null);
    };
    ParameterBinding.prototype.refresh = function () {
        var _this = this;
        if (!this.subreportControl().subreportParameters().some(function (parameter) { return parameter === _this.parameterName(); })) {
            this.parameterName('');
        }
    };
    return ParameterBinding;
}(dataBinding_1.DataBindingBase));
exports.ParameterBinding = ParameterBinding;
var XRSubreportViewModel = (function (_super) {
    __extends(XRSubreportViewModel, _super);
    function XRSubreportViewModel(model, parent, serializer) {
        var _this = _super.call(this, XRSubreportViewModel._patchModel(model), parent, serializer) || this;
        _this.needProcessLocation = false;
        _this.subreportParameters = ko.observableArray();
        var _self = _this;
        var _width = ko.observable(_this.size.width());
        _this.size['_width'] = _width;
        _this._disposables.push(_this.key = ko.pureComputed(function () {
            var key = _this.parentModel() && _this.parentModel().root && _this.parentModel().root['key'];
            return (key ? (key() + '.') : '') + _this.name();
        }));
        _this._generateOwnPages = ko.observable(_this.generateOwnPages());
        var oldgenerateOwnPagesIsActive = _this._generateOwnPages();
        _this._disposables.push(_this.generateOwnPages = ko.pureComputed({
            read: function () {
                return _this._generateOwnPages();
            },
            write: function (newVal) {
                if (_this.isPropertyDisabled('generateOwnPages'))
                    return;
                var undo = analytics_utils_1.UndoEngine.tryGetUndoEngine(_this.parentModel());
                undo && undo.start();
                _this._generateOwnPages(newVal);
                undo && undo.end();
                oldgenerateOwnPagesIsActive = _this._getCurrentGenerateOwnPagesIsActive();
            }
        }), _this.generateOwnPagesIsActive = ko.computed(function () {
            return _this._getCurrentGenerateOwnPagesIsActive();
        }), _this.generateOwnPagesIsActive.subscribe(function (newVal) {
            _this._calculateSubreportPosition(newVal);
        }), _this.size.width = ko.computed({
            read: function () {
                if (_this.generateOwnPagesIsActive())
                    return _this.parentModel()['size'].width();
                return _width();
            },
            write: function (newVal) {
                _width(newVal);
            }
        }));
        _this._disposables.push(_this.parentModel.subscribe(function (newVal) {
            _this.needProcessLocation = oldgenerateOwnPagesIsActive !== _this._getCurrentGenerateOwnPagesIsActive() || (oldgenerateOwnPagesIsActive && _this._getCurrentGenerateOwnPagesIsActive());
            oldgenerateOwnPagesIsActive = _this._getCurrentGenerateOwnPagesIsActive();
        }));
        _this.size.isPropertyDisabled = function (propertyName) {
            if (propertyName === 'width')
                return _this.generateOwnPagesIsActive();
            return false;
        };
        var storageSubscription = null;
        if (_this.reportSource) {
            _this.reportSource.key = _this.key;
            if (parent) {
                parent.root['objectStorage'](parent.root['objectStorage']().concat(_this.reportSource.objectStorage()));
                _this.reportSource.objectStorage(parent.root['objectStorage']().slice());
                storageSubscription = _this._subscribeStorages(_this.reportSource.objectStorage, parent.root['objectStorage']);
                _this._disposables.push(storageSubscription);
            }
            else {
                var subscribe = _this.parentModel.subscribe(function (newValue) {
                    if (newValue) {
                        subscribe.dispose();
                        _this.reportSource.objectStorage(newValue.root['objectStorage']().slice());
                        storageSubscription = _this._subscribeStorages(_this.reportSource.objectStorage, newValue.root['objectStorage']);
                        _this._disposables.push(storageSubscription);
                    }
                });
                _this._disposables.push(subscribe);
            }
        }
        _this.parameterBindings = analytics_utils_1.deserializeArray(model.ParameterBindings, function (item) { return new ParameterBinding(item, _this, serializer); });
        _this.updateParameters();
        _this._disposables.push(_this.parameterBindings.subscribe(function (changes) {
            for (var index = 0; index < changes.length; index++) {
                if (changes[index].status === 'added') {
                    changes[index].value.subreportControl(_self);
                }
            }
        }, null, 'arrayChange'));
        _this._disposables.push(_this.reportSourceUrl.subscribe(function (newVal) {
            storageSubscription && storageSubscription.dispose();
            _this.reportSource && _this.reportSource.dispose();
            if (!newVal)
                _this.reportSource = new SubreportViewModel(SubreportViewModel.defaultReport, serializer);
            _this.updateParameters();
        }));
        return _this;
    }
    XRSubreportViewModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.disposeObservableArray(this.parameterBindings);
        this.reportSource && this.reportSource.dispose();
        this.resetObservableArray(this.parameterBindings);
    };
    XRSubreportViewModel.prototype.getInfo = function () {
        var serializationInfo = $.extend(true, [], _super.prototype.getInfo.call(this));
        if (this.reportSourceUrl && this.reportSourceUrl()) {
            var property = serializationInfo.filter(function (item) { return item.propertyName === 'reportSource'; })[0];
            serializationInfo.splice(serializationInfo.indexOf(property), 1);
        }
        return serializationInfo;
    };
    XRSubreportViewModel._patchModel = function (model) {
        if (model['@ReportSourceUrl']) {
            delete model['ReportSource'];
        }
        return model;
    };
    XRSubreportViewModel.prototype._getCurrentGenerateOwnPagesIsActive = function () {
        return this.generateOwnPages() && !this.isPropertyDisabled('generateOwnPages');
    };
    XRSubreportViewModel.prototype._clearReportModel = function (reportModel) {
        var ignoreProperties = ['Parameters', 'ObjectStorage', 'ComponentStorage'];
        Object.keys(reportModel).forEach(function (x) {
            if (ignoreProperties.indexOf(x) === -1)
                delete reportModel[x];
        });
    };
    XRSubreportViewModel.prototype._assignParameters = function (parameters) {
        this.subreportParameters(_parameterUtils_1.collectAvailableParameters(parameters).map(function (x) { return x.name; }));
        this.refreshParameterBindings();
    };
    XRSubreportViewModel.prototype._calculateSubreportPosition = function (generateOwnPagesIsActive) {
        var offset = generateOwnPagesIsActive ? 0 : analytics_internal_1.pixelToUnits(5, this.root.measureUnit(), 1);
        this.size.width(this.parentModel()['size'].width() - offset * 2);
        this.location.x(offset);
    };
    XRSubreportViewModel.prototype._subscribeStorages = function (objectStorage1, objectStorage2) {
        var locker = new _locker_1.Locker();
        var subscriptions = [
            objectStorage1.subscribe(function (newVal) { return locker.lock(function () { return objectStorage2(newVal); }); }),
            objectStorage2.subscribe(function (newVal) { return locker.lock(function () { return objectStorage1(newVal); }); })
        ];
        return { dispose: function () { return subscriptions.forEach(function (x) { return x.dispose(); }); } };
    };
    XRSubreportViewModel.prototype.refreshParameterBindings = function () {
        this.parameterBindings().forEach(function (x) { return x.refresh(); });
    };
    XRSubreportViewModel.prototype.isPropertyDisabled = function (propertyName) {
        if (propertyName === 'generateOwnPages')
            return this.parentModel()
                && ['ReportHeaderBand', 'ReportFooterBand', 'GroupHeaderBand', 'GroupFooterBand', 'DetailBand'].indexOf(this.parentModel().controlType) === -1;
        return _super.prototype.isPropertyDisabled.call(this, propertyName);
    };
    XRSubreportViewModel.prototype.updateParameters = function () {
        var _this = this;
        if (this.reportSourceUrl()) {
            reportStorageWeb_1.ReportStorageWeb.getData(this.reportSourceUrl()).done(function (result) {
                var reportJSONModel = JSON.parse(result.reportLayout);
                _this._clearReportModel(reportJSONModel.XtraReportsLayoutSerializer);
                var report = new xrReport_1.ReportViewModel(reportJSONModel);
                _this._assignParameters(report.parameters());
            });
        }
        else if (this.reportSource) {
            this._assignParameters(this.reportSource.parameters());
        }
    };
    XRSubreportViewModel.prototype.cloneReportSource = function () {
        return this.reportSource && this.reportSource.clone();
    };
    return XRSubreportViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRSubreportViewModel = XRSubreportViewModel;
var XRSubreportSurface = (function (_super) {
    __extends(XRSubreportSurface, _super);
    function XRSubreportSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this.template = 'dxrd-subreport';
        _this.selectiontemplate = 'dxrd-subreport-selection';
        _this.displayText = function () { return control.name(); };
        return _this;
    }
    XRSubreportSurface.prototype.getAdornTemplate = function () {
        var result = '';
        result = xrControl_1.XRControlSurface._appendValue(result, 'dxrd-surface-hidden', !this._control['visible']());
        result = xrControl_1.XRControlSurface._appendValue(result, 'dxrd-intersect', this.isIntersect());
        return result;
    };
    XRSubreportSurface.prototype.getResizableOptions = function (resizeHandler) {
        return $.extend(true, {}, resizeHandler, {
            handles: this._control.generateOwnPagesIsActive() ? 's,n' : 'all'
        });
    };
    XRSubreportSurface.prototype.processLocation = function (location) {
        if (this._control.needProcessLocation) {
            this._control.needProcessLocation = false;
            return { top: location.top };
        }
        return location;
    };
    return XRSubreportSurface;
}(xrControl_1.XRControlSurface));
exports.XRSubreportSurface = XRSubreportSurface;
var xrReport_2 = require("./metadata/xrReport");
var xrSubreport_1 = require("./metadata/xrSubreport");
var _parameterUtils_1 = require("../dataObjects/metadata/_parameterUtils");
