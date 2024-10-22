﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\chooseReportTypePage.js)
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
var reportWizardState_1 = require("../reportWizardState");
var pageId_1 = require("../pageId");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var $ = require("jquery");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var SelectReportTypePage = (function (_super) {
    __extends(SelectReportTypePage, _super);
    function SelectReportTypePage(_options) {
        var _this = _super.call(this, {}) || this;
        _this._options = _options;
        _this._extendCssClass = function (rightPath) { return 'dxrd-report-' + rightPath; };
        _this.typeItems = [
            new analytics_wizard_1.TypeItem('Empty Report', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectReportType_EmptyReport', 'emptyReport', 'dxrd-svg-wizard-EmptyReport', reportWizardState_1.ReportType.Empty),
            new analytics_wizard_1.TypeItem('Label Report', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectReportType_LabelReport', 'labelReport', 'dxrd-svg-wizard-LabelReport', reportWizardState_1.ReportType.Label),
            new analytics_wizard_1.TypeItem('Cross-Tab Report', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectReportType_CrossTabReport', 'CrossTabReport', 'dxrd-svg-wizard-CrossTabReport', reportWizardState_1.ReportType.CrossTab)
        ];
        if (_this._options.canCreateDatabound) {
            _this._addDataboundReportType();
        }
        return _this;
    }
    SelectReportTypePage.prototype._addDataboundReportType = function () {
        this.typeItems.splice(1, 0, new analytics_wizard_1.TypeItem('Table Report', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectReportType_TableReport', 'databoundReport', 'dxrd-svg-wizard-StandardReport', reportWizardState_1.ReportType.Databound));
        if (this._options.showVertical) {
            this.typeItems.splice(2, 0, new analytics_wizard_1.TypeItem('Vertical Report', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectReportType_VerticalReport', 'verticalReport', 'dxrd-svg-wizard-VerticalReport', reportWizardState_1.ReportType.Vertical));
        }
    };
    SelectReportTypePage.prototype.canNext = function () {
        return this.selectedItem() !== null && this.selectedItem().type !== reportWizardState_1.ReportType.Empty;
    };
    SelectReportTypePage.prototype.canFinish = function () {
        return this.selectedItem() !== null && this.selectedItem().type === reportWizardState_1.ReportType.Empty;
    };
    SelectReportTypePage.prototype.commit = function () {
        return $.Deferred().resolve({ reportType: this.selectedItem().type }).promise();
    };
    SelectReportTypePage.prototype.initialize = function (state) {
        var type = state.reportType || reportWizardState_1.ReportType.Databound;
        var item = analytics_internal_1.findFirstItemMatchesCondition(this.typeItems, function (item) { return item.type === type; });
        this.selectedItem(item || this.typeItems[0]);
        return $.Deferred().resolve().promise();
    };
    return SelectReportTypePage;
}(analytics_wizard_1.ChooseDataSourceTypePage));
exports.SelectReportTypePage = SelectReportTypePage;
var ChooseDataSourceTypePage = (function (_super) {
    __extends(ChooseDataSourceTypePage, _super);
    function ChooseDataSourceTypePage(dataSourceWizardOptions) {
        var _this = _super.call(this, dataSourceWizardOptions) || this;
        _this.typeItems.push(new analytics_wizard_1.TypeItem('No Data', 'DataAccessUIStringId.DSTypeNoData', 'nodata', 'dxrd-svg-wizard-NoDataSource', analytics_wizard_1.DataSourceType.NoData));
        return _this;
    }
    return ChooseDataSourceTypePage;
}(analytics_wizard_1.ChooseDataSourceTypePage));
exports.ChooseDataSourceTypePage = ChooseDataSourceTypePage;
function _registerSelectReportTypePage(factory, options) {
    factory.registerMetadata(pageId_1.FullscreenReportWizardPageId.SelectReportTypePage, {
        setState: function (data, state) {
            state.reportType = data.reportType;
        },
        getState: function (state) {
            return state;
        },
        resetState: function (state, defaultState) {
            state.reportType = defaultState.reportType;
        },
        create: function () {
            var canCreateDatabound = 'function' === typeof (options.canCreateDatabound) ? options.canCreateDatabound() : options.canCreateDatabound;
            return new SelectReportTypePage({
                canCreateDatabound: canCreateDatabound,
                showVertical: options.showVertical
            });
        },
        description: analytics_utils_1.getLocalization('Select the report type you wish to create.', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectReportType_Message'),
        template: 'dxrd-page-choose-datasource-type',
        navigationPanelText: analytics_utils_1.getLocalization('Select Report Type', 'ASPxReportsStringId.ReportDesigner_Wizard_SelectReportType')
    });
}
exports._registerSelectReportTypePage = _registerSelectReportTypePage;
function _registerChooseDataSourceTypePage(factory, dataSourceWizardOptions) {
    factory.registerMetadata(analytics_wizard_1.DataSourceWizardPageId.ChooseDataSourceTypePage, {
        setState: function (data, state) {
            state.dataSourceType = data.dataSourceType;
        },
        getState: function (state) {
            return state;
        },
        resetState: function (state, defaultState) {
            state.dataSourceType = defaultState.dataSourceType;
        },
        create: function () {
            return new ChooseDataSourceTypePage(dataSourceWizardOptions);
        },
        description: analytics_utils_1.getLocalization('Select the data source type.', 'DataAccessUIStringId.WizardPageChooseDSType'),
        template: 'dxrd-page-choose-datasource-type'
    });
}
exports._registerChooseDataSourceTypePage = _registerChooseDataSourceTypePage;
