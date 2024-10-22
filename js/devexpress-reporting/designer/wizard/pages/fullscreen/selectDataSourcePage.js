﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\selectDataSourcePage.js)
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
var chooseAvailableDataSourcePage_1 = require("../chooseAvailableDataSourcePage");
var pageId_1 = require("../../pageId");
var chooseReportTypePage_1 = require("../chooseReportTypePage");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var SelectDataSourcePage = (function (_super) {
    __extends(SelectDataSourcePage, _super);
    function SelectDataSourcePage(reportWizardOptions) {
        var _this = _super.call(this) || this;
        _this.reportWizardOptions = reportWizardOptions;
        return _this;
    }
    SelectDataSourcePage.prototype.registerSections = function () {
        if (this.reportWizardOptions.dataSources().length > 0) {
            chooseAvailableDataSourcePage_1._registerChooseAvailableDataSourcePage(this._factory, this.reportWizardOptions);
            this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.ChooseAvailableDataSourcePage);
        }
        if (this.reportWizardOptions.canCreateDataSource) {
            chooseReportTypePage_1._registerChooseDataSourceTypePage(this._factory, this.reportWizardOptions);
            this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.ChooseDataSourceTypePage);
            var meta = this._factory.getMetadata(pageId_1.FullscreenReportWizardSectionId.ChooseDataSourceTypePage);
            meta['disabledText'] = analytics_utils_1.getLocalization("To specify a data source, select \"No, I'd like to create a new data source\".", 'AnalyticsCoreStringId.Wizard_SelectDataSourceType_Placeholder');
        }
        if (this.reportWizardOptions.dataSources().length > 0 && this.reportWizardOptions.canCreateDataSource) {
            this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.ChooseAvailableDataSourcePage, analytics_wizard_1.WizardSectionPosition.Top);
            this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.ChooseDataSourceTypePage, analytics_wizard_1.WizardSectionPosition.Bottom);
        }
    };
    SelectDataSourcePage.prototype.getNextSectionId = function (sectionId) {
        if (!sectionId && this.reportWizardOptions.dataSources().length > 0)
            return pageId_1.FullscreenReportWizardSectionId.ChooseAvailableDataSourcePage;
        else if (!sectionId)
            return pageId_1.FullscreenReportWizardSectionId.ChooseDataSourceTypePage;
        else if (sectionId === pageId_1.FullscreenReportWizardSectionId.ChooseAvailableDataSourcePage && !this._stateManager.getCurrentState().dataSource)
            return pageId_1.FullscreenReportWizardSectionId.ChooseDataSourceTypePage;
    };
    return SelectDataSourcePage;
}(analytics_wizard_1.FullscreenWizardPage));
exports.SelectDataSourcePage = SelectDataSourcePage;
function _registerSelectDataSourcePage(factory, reportWizardOptions) {
    factory.registerMetadata(pageId_1.FullscreenReportWizardPageId.SelectDataSourcePage, {
        setState: function (data, state) {
            state.dataSourceType = data.dataSourceType;
            state.dataSource = data.dataSource;
        },
        getState: function (state) {
            return state;
        },
        resetState: function (state, defaultState) {
            state.dataSource = defaultState.dataSource;
            state.dataSourceType = defaultState.dataSourceType;
        },
        create: function () {
            return new SelectDataSourcePage(reportWizardOptions);
        },
        navigationPanelText: analytics_utils_1.getLocalization('Select Data Source', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectDataSource'),
        template: 'dx-wizard-fullscreen-page'
    });
}
exports._registerSelectDataSourcePage = _registerSelectDataSourcePage;
