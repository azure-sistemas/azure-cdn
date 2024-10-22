﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_chartDataFilterModelReport.js)
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
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var _dataFilter_1 = require("../../../chart/components/models/_dataFilter");
var editorTemplates_1 = require("../../widgets/editorTemplates");
var dataFilterReportPropertiesSerializationsInfo = [{ propertyName: 'dataMember', modelName: '@DataMember' }, { propertyName: 'dataSource', modelName: '@DataSource', link: true }], valueDataBinding = { propertyName: 'value', displayName: 'Value Data Members', editor: editorTemplates_1.designerEditorTemplates.getEditor('chartValueBinding'), localizationId: 'DevExpress.XtraCharts.SeriesBase.ValueDataMembers' };
var dataFilterReportSerializationFakeInfo = [
    { propertyName: 'misc', displayName: 'Misc', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: _dataFilter_1.dataFilterSerializationsInfo, localizationId: 'ChartStringId.PropertyGridCategory_Misc' },
    { propertyName: 'report', displayName: 'Report Data', localizationId: 'ReportStringId.CatReportData', editor: analytics_widgets_1.editorTemplates.getEditor('objecteditor'), info: [valueDataBinding] }
];
var DataFilterModelReport = (function (_super) {
    __extends(DataFilterModelReport, _super);
    function DataFilterModelReport(model, serializer) {
        var _this = _super.call(this, model, serializer) || this;
        _this.misc = _this._mapObject(_dataFilter_1.dataFilterSerializationsInfo);
        _this.misc.isPropertyDisabled = function (propertyName) {
            return propertyName === 'value' && _this.dataMember() != null;
        };
        _this.report = _this._createReportDataProperty();
        return _this;
    }
    DataFilterModelReport.prototype.getInfo = function () {
        return [].concat([].concat(_dataFilter_1.dataFilterSerializationsInfo, dataFilterReportPropertiesSerializationsInfo)
            .map(function (x) { return { propertyName: x.propertyName, modelName: x.modelName, link: x.link }; }), dataFilterReportSerializationFakeInfo);
    };
    DataFilterModelReport.prototype._createReportDataProperty = function () {
        var _this = this;
        return {
            updateValue: function (pathRequest, parameters) {
                if (!!pathRequest.fullPath) {
                    if (pathRequest.fullPath.indexOf('Parameters') === 0) {
                        var parameterName = pathRequest.fullPath.split('.').pop();
                        _this.dataSource(parameters.filter(function (x) { return x.name === parameterName; })[0]);
                        _this.dataMember('Value');
                    }
                    else {
                        _this.dataMember(pathRequest.path);
                        _this.dataSource(null);
                    }
                }
                else {
                    _this.dataMember(null);
                    _this.dataSource(null);
                }
            },
            displayValue: function (reportDataSource) {
                if (_this.dataSource()) {
                    return ['Parameters', _this.dataSource().name].join(' - ');
                }
                else {
                    if (_this.dataMember()) {
                        return [reportDataSource.name, _this.dataMember()].join(' - ');
                    }
                    return '';
                }
            },
            calculatePath: function (reportDataSource) {
                if (_this.dataSource()) {
                    return ['Parameters', _this.dataSource().name].join('.');
                }
                else {
                    if (_this.dataMember()) {
                        return [reportDataSource.ref || reportDataSource.id, _this.dataMember()].join('.');
                    }
                    return '';
                }
            },
            getInfo: function () { return [valueDataBinding]; },
            value: this._mapObject(dataFilterReportPropertiesSerializationsInfo)
        };
    };
    DataFilterModelReport.prototype._mapObject = function (info) {
        var _this = this;
        var obj = { getInfo: function () { return info; } };
        for (var i = 0; i < info.length; i++) {
            var propertyName = info[i].propertyName;
            obj[propertyName] = this[propertyName];
        }
        obj['getPath'] = function (propertyName) {
            return _this['getPath'](propertyName);
        };
        return obj;
    };
    return DataFilterModelReport;
}(_dataFilter_1.DataFilterModel));
exports.DataFilterModelReport = DataFilterModelReport;
_dataFilter_1.DefaultDataFilterModel(DataFilterModelReport);
