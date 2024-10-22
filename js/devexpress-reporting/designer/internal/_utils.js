﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_utils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _subreportUtils_1 = require("../controls/utils/_subreportUtils");
var parameter_1 = require("../dataObjects/parameters/parameter");
var style_1 = require("../controls/properties/style");
var formattingrules_1 = require("../controls/properties/formattingrules");
var components_1 = require("../controls/properties/components");
var $ = require("jquery");
function recalculateUnit(value, dpi) {
    return Math.round(value * dpi) / 100;
}
exports.recalculateUnit = recalculateUnit;
exports.PromptBoolean = {
    'False': 'False',
    'True': 'True',
    'Prompt': 'Prompt'
};
function correctModel(model) {
    if (Array.isArray(model)) {
        for (var i = 0; i < model.length; i++) {
            if (model[i]['@Ref'] !== undefined) {
                model = model[i];
                break;
            }
        }
    }
    else {
        Object.keys(model).forEach(function (name) {
            if (model[name] instanceof Object)
                model[name] = correctModel(model[name]);
        });
    }
    return model;
}
exports.correctModel = correctModel;
function createReportViewModel(newReportInfo, oldReport) {
    var reportModel = JSON.parse(newReportInfo.reportModel);
    var report = new xrReport_1.ReportViewModel(reportModel);
    if (oldReport) {
        var nextRef = Math.max.apply(Math, report.objectStorage().map(function (data) { return parseInt(data['_model']['@Ref']); })) + 1;
        oldReport.dsHelperProvider().usedDataSources()
            .filter(function (dsInfo) { return !!dsInfo.data && !newReportInfo.dataSourceRefs.some(function (ref) { return ref.name === dsInfo.name; }); })
            .forEach(function (dsInfo) {
            dsInfo.data['_model']['@Ref'] = nextRef.toString();
            newReportInfo.dataSourceRefs.push({
                name: dsInfo.name,
                ref: nextRef.toString(),
                isSqlDataSource: dsInfo.isSqlDataSource,
                isJsonDataSource: dsInfo.isJsonDataSource,
                isObjectDataSource: dsInfo.isObjectDataSource,
                dataSerializer: dsInfo.dataSerializer,
                hasParams: dsInfo['hasParams']
            });
            report.objectStorage.push(dsInfo.data);
            nextRef++;
        });
    }
    report.dataSourceRefs = newReportInfo.dataSourceRefs;
    return report;
}
exports.createReportViewModel = createReportViewModel;
function updateDataSourceRefs(report, dataSourceRefs) {
    var getDataSourceRefs = function (key) {
        var resultRefs = (dataSourceRefs || []).filter(function (ds) { return ds.Key === key; })[0];
        return resultRefs && resultRefs.Value || [];
    };
    report.dataSourceRefs = getDataSourceRefs(report.key());
    var subreportControls = _subreportUtils_1.subreportControlCollector(report);
    subreportControls.forEach(function (subreport) {
        if (subreport.reportSource) {
            subreport.reportSource.dataSourceRefs = getDataSourceRefs(subreport.key());
        }
    });
}
exports.updateDataSourceRefs = updateDataSourceRefs;
function isNotParameter(control) {
    return !(control instanceof parameter_1.Parameter);
}
exports.isNotParameter = isNotParameter;
function isControl(control) {
    return isNotParameter(control) && !(control instanceof style_1.StyleModel || control instanceof formattingrules_1.FormattingRule || control instanceof components_1.ComponentsModel || control instanceof calculatedField_1.CalculatedField);
}
exports.isControl = isControl;
function updateSurfaceContentSizeLocalizationMode(surfaceSize, root, rtl) {
    return function () {
        var $root = $(root).find('.dxrd-designer').eq(0);
        var leftLocalizationPanel = $(root).find('.dxrd-left-localization-panel:visible').outerWidth() || 0;
        var otherWidth = leftLocalizationPanel + 50;
        var surfaceWidth = $root.width() - (otherWidth);
        $root.find('.dxrd-surface-wrapper').eq(0).css({
            'left': rtl ? '50px' : otherWidth,
            'right': !rtl ? otherWidth : '50px',
            'width': surfaceWidth,
            'bottom': 0
        });
        surfaceSize(surfaceWidth);
    };
}
exports.updateSurfaceContentSizeLocalizationMode = updateSurfaceContentSizeLocalizationMode;
var xrReport_1 = require("../controls/xrReport");
var calculatedField_1 = require("../dataObjects/calculatedField");
