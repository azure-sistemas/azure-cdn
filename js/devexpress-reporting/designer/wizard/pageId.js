﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pageId.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
exports.LegacyReportWizardPageId = {
    ChooseDataMemberPage: 'chooseDataMemberPage',
    SelectColumnsPage: 'selectColumnsPage',
    AddGroupingLevelPage: 'addGroupingLevelPage',
    ChooseSummaryOptionsPage: 'chooseSummaryOptionsPage',
    ChooseReportLayoutPage: 'chooseReportLayoutPage',
    ChooseReportStylePage: 'chooseReportStylePage'
};
exports.ReportWizardPageId = {
    SelectReportTypePage: 'selectReportTypePage',
    ChooseAvailableDataSourcePage: 'chooseAvailableDataSourcePage',
    SelectLabelTypePage: 'selectLabelTypePage',
    CustomizeLabelPage: 'customizeLabelPage',
    SelectDataMembersPage: 'selectDataMembersPage',
    AddGroupingLevelPage: 'addGroupingLevelPage',
    ChooseSummaryOptionsPage: 'chooseSummaryOptionsPage',
    ConfigureReportPageSettingsPage: 'configureReportPageSettingsPage',
    ChooseReportColorSchemePage: 'chooseReportColorSchemePage',
    SetReportTitlePage: 'setReportTitlePage',
};
exports.FullscreenReportWizardPageId = {
    SelectReportTypePage: exports.ReportWizardPageId.SelectReportTypePage,
    SelectDataSourcePage: 'selectDataSourcePage',
    SpecifySqlDataSourceSettingsPage: analytics_wizard_1.FullscreenDataSourceWizardPageId.SpecifySqlDataSourceSettingsPage,
    SpecifyJsonDataSourceSettingsPage: analytics_wizard_1.FullscreenDataSourceWizardPageId.SpecifyJsonDataSourceSettingsPage,
    DefineReportLayoutPage: 'defineReportLayoutPage',
    DefineCrossTabPage: 'defineCrossTabPage',
    SpecifyPageSettingsPage: 'specifyPageSettingsPage',
    SpecifyLabelSettingsPage: 'specifyLabelSettingsPage',
};
exports.FullscreenReportWizardSectionId = {
    ChooseAvailableDataSourcePage: exports.ReportWizardPageId.ChooseAvailableDataSourcePage,
    SelectLabelTypePage: exports.ReportWizardPageId.SelectLabelTypePage,
    CustomizeLabelPage: exports.ReportWizardPageId.CustomizeLabelPage,
    SelectDataMembersPage_Members: 'selectDataMembersPage_Members',
    SelectDataMembersPage_Fields: 'selectDataMembersPage_Fields',
    SelectSingleDataMemberPage: 'selectSingleDataMembersPage',
    AddGroupFieldsPage: exports.ReportWizardPageId.AddGroupingLevelPage,
    AddSummaryFieldsPage: exports.ReportWizardPageId.ChooseSummaryOptionsPage,
    ConfigurePageSettingsPage: exports.ReportWizardPageId.ConfigureReportPageSettingsPage,
    SpecifyReportTitlePage: exports.ReportWizardPageId.SetReportTitlePage,
    ChooseDataSourceTypePage: analytics_wizard_1.FullscreenDataSourceWizardPageId.ChooseDataSourceTypePage,
    ChooseJsonSchemaPage: analytics_wizard_1.FullscreenDataSourceWizardSectionId.ChooseJsonSchemaPage,
    SpecifyJsonConnectionPage: analytics_wizard_1.FullscreenDataSourceWizardSectionId.SpecifyJsonConnectionPage,
    ConfigureMasterDetailRelationshipsPage: analytics_wizard_1.FullscreenDataSourceWizardSectionId.ConfigureMasterDetailRelationshipsPage,
    ConfigureQueryParametersPage: analytics_wizard_1.FullscreenDataSourceWizardSectionId.ConfigureQueryParametersPage,
    ChooseSqlConnectionPage: analytics_wizard_1.FullscreenDataSourceWizardSectionId.ChooseSqlConnectionPage,
    ConfigureQueryPage: analytics_wizard_1.FullscreenDataSourceWizardSectionId.ConfigureQueryPage,
    ChooseJsonSourcePage: analytics_wizard_1.FullscreenDataSourceWizardSectionId.ChooseJsonSourcePage,
    ConfigureCrossTabColumnsPage: 'configureCrossTabColumnsPage',
    ConfigureCrossTabRowsPage: 'configureCrossTabRowsPage',
    ConfigureCrossTabDataPage: 'configureCrossTabDataPage'
};
