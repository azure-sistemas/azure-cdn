﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_reportWizardStateHelper.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reportWizardState_1 = require("../reportWizardState");
var chooseAvailableDataSourcePage_1 = require("../pages/chooseAvailableDataSourcePage");
var ReportWizardStateHelper = (function () {
    function ReportWizardStateHelper() {
    }
    ReportWizardStateHelper.applyDataBindings = function (state, model) {
        var modelDS = model.dataSource();
        var dataSourceInfo = modelDS && modelDS['dataSourceInfo'];
        state.dataSource = dataSourceInfo && chooseAvailableDataSourcePage_1._convertToStateDataSource(dataSourceInfo);
        state.dataMember = model.dataMember() || '';
    };
    ReportWizardStateHelper.applyPageSetup = function (state, model) {
        var unit;
        var _pageSetupProps = [
            model.pageWidth(),
            model.pageHeight(),
            model.margins.left(),
            model.margins.right(),
            model.margins.top(),
            model.margins.bottom()
        ];
        switch (model.measureUnit()) {
            case 'HundredthsOfAnInch':
                _pageSetupProps = _pageSetupProps.map(function (x) { return x / 100; });
                unit = reportWizardState_1.GraphicsUnit.Inch;
                break;
            case 'TenthsOfAMillimeter':
                _pageSetupProps = _pageSetupProps.map(function (x) { return x / 10; });
                unit = reportWizardState_1.GraphicsUnit.Millimeter;
                break;
            case 'Pixels':
                unit = reportWizardState_1.GraphicsUnit.Pixel;
                break;
        }
        state.pageSetup = {
            paperKind: model.paperKind(),
            unit: unit,
            width: _pageSetupProps[0],
            height: _pageSetupProps[1],
            marginLeft: _pageSetupProps[2],
            marginRight: _pageSetupProps[3],
            marginTop: _pageSetupProps[4],
            marginBottom: _pageSetupProps[5],
            landscape: model.landscape()
        };
    };
    return ReportWizardStateHelper;
}());
exports.ReportWizardStateHelper = ReportWizardStateHelper;
