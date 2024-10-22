﻿/**
* DevExpress HTML/JS Reporting (designer\utils\reportDesignerElements.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var $ = require("jquery");
exports.ReportDesignerElements = $.extend({}, analytics_internal_1.DesignerBaseElements, {
    MenuButton: 'dxrd-menubutton-template',
    NavigationPanel: 'dxrd-navigation-panel-template',
    ReportDialog: 'dxrd-report-dialog-template',
    ChartDialog: 'dxrd-chart-designer-popup',
    ReportConverterDialog: 'dxrd-report-dialog-converter-template',
    Parameters: 'dxrd-report-parameters-dialogs'
});
exports.ReportDesignerAddOns = {
    Preview: 'dxrd-report-preview',
    ReportWizard: 'dx-wizard-newlayout#report',
    ReportWizardFullscreen: 'dx-wizard-fullscreen#report',
    LocalizationEditor: 'dxrd-localization-editor',
    ErrorPanel: 'dxrd-error-panel',
    DataSourceWizard: 'dx-wizard-newlayout#data-source',
    MultiQueryDataSourceWizard: 'dx-wizard-newlayout#multiquery-data-source',
    MultiQueryDataSourceWizardFullscreen: 'dx-wizard-fullscreen#multiquery-data-source',
    MasterDetailEditor: 'dxrd-masterDetail-editor',
    ScriptEditor: 'dxrd-scripts'
};
