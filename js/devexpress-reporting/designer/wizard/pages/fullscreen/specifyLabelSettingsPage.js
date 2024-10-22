﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\fullscreen\specifyLabelSettingsPage.js)
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
var selectLabelTypePage_1 = require("../selectLabelTypePage");
var customizeLabelPage_1 = require("../customizeLabelPage");
var pageId_1 = require("../../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var SpecifyLabelSettingsPage = (function (_super) {
    __extends(SpecifyLabelSettingsPage, _super);
    function SpecifyLabelSettingsPage(_reportWizardOptions) {
        var _this = _super.call(this) || this;
        _this._reportWizardOptions = _reportWizardOptions;
        return _this;
    }
    SpecifyLabelSettingsPage.prototype.registerSections = function () {
        selectLabelTypePage_1._registerSelectLabelTypePage(this._factory);
        customizeLabelPage_1._registerCustomizeLabelPage(this._factory);
        this._factory.getMetadata(pageId_1.FullscreenReportWizardSectionId.SelectLabelTypePage)['recreate'] = false;
        this._factory.getMetadata(pageId_1.FullscreenReportWizardSectionId.CustomizeLabelPage)['recreate'] = false;
        this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.SelectLabelTypePage, this._reportWizardOptions.rtl ? analytics_wizard_1.WizardSectionPosition.Right : analytics_wizard_1.WizardSectionPosition.Left);
        this._setSectionPosition(pageId_1.FullscreenReportWizardSectionId.CustomizeLabelPage, this._reportWizardOptions.rtl ? analytics_wizard_1.WizardSectionPosition.Left : analytics_wizard_1.WizardSectionPosition.Right);
    };
    SpecifyLabelSettingsPage.prototype.canNext = function () {
        return false;
    };
    SpecifyLabelSettingsPage.prototype.getNextSectionId = function (sectionId) {
        if (!sectionId) {
            return pageId_1.FullscreenReportWizardSectionId.SelectLabelTypePage;
        }
        else if (sectionId === pageId_1.FullscreenReportWizardSectionId.SelectLabelTypePage)
            return pageId_1.FullscreenReportWizardSectionId.CustomizeLabelPage;
    };
    return SpecifyLabelSettingsPage;
}(analytics_wizard_1.FullscreenWizardPage));
exports.SpecifyLabelSettingsPage = SpecifyLabelSettingsPage;
function _registerSpecifyLabelSettingsPage(factory, reportWizardOptions) {
    factory.registerMetadata(pageId_1.FullscreenReportWizardPageId.SpecifyLabelSettingsPage, {
        setState: function (data, state) {
            if (data && (!state.labelDetails || data.labelDetails.id !== state.labelDetails.id))
                state.labelDetails = data.labelDetails;
            state.labelDetails.width = data.labelDetails.width;
            state.labelDetails.height = data.labelDetails.height;
            state.labelDetails.hPitch = data.labelDetails.hPitch;
            state.labelDetails.vPitch = data.labelDetails.vPitch;
            state.labelDetails.topMargin = data.labelDetails.topMargin;
            state.labelDetails.leftMargin = data.labelDetails.leftMargin;
            state.labelDetails.rightMargin = data.labelDetails.rightMargin;
            state.labelDetails.bottomMargin = data.labelDetails.bottomMargin;
            state.labelDetails.unit = data.labelDetails.unit;
            state.labelDetails.paperKindId = data.labelDetails.paperKindId;
        },
        getState: function (state) { return state; },
        resetState: function (state, defaultState) {
            state.labelDetails = defaultState.labelDetails;
        },
        create: function () {
            return new SpecifyLabelSettingsPage(reportWizardOptions);
        },
        navigationPanelText: analytics_utils_1.getLocalization('Specify Page Settings', 'ASPxReportsStringId.ReportDesigner_Wizard_SpecifyPageSettings'),
        template: 'dx-wizard-fullscreen-page',
        description: analytics_utils_1.getLocalization("Choose the page size and customize the label's parameters.", 'ASPxReportsStringId.ReportDesigner_Wizard_LabelPageSize')
    });
}
exports._registerSpecifyLabelSettingsPage = _registerSpecifyLabelSettingsPage;
