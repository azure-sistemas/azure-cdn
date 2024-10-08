﻿/**
* DevExpress HTML/JS Reporting (bundle\_add-designer-to-bundle.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChartInternal = require("../scopes/reporting-chart-internal");
var ChartInternalAxis = require("../scopes/reporting-chart-internal-axis");
var ChartInternalDataMembers = require("../scopes/reporting-chart-internal-dataMembers");
var ChartInternalSeriesMetadata = require("../scopes/reporting-chart-internal-series-metadata");
var ChartInternalModels = require("../scopes/reporting-chart-internal-models");
var ChartInternalSeries = require("../scopes/reporting-chart-internal-series");
var ChartInternalWidgets = require("../scopes/reporting-chart-internal-widgets");
var DesignerControls = require("../scopes/reporting-designer-controls");
var DesignerBandsMetadata = require("../scopes/reporting-designer-bands-metadata");
var DesignerControlsMetadata = require("../scopes/reporting-designer-controls-metadata");
var DesignerDataMetadata = require("../scopes/reporting-designer-data-metadata");
var DesignerControlsPivotGridMetadata = require("../scopes/reporting-designer-controls-pivotGrid-metadata");
var DesignerControlsCrossTabMetadata = require("../scopes/reporting-designer-controls-crossTab-metadata");
var Designer = require("../scopes/reporting-designer");
var DesignerActions = require("../scopes/reporting-designer-actions");
var DesignerBandsInternal = require("../scopes/reporting-designer-bands-internal");
var DesignerBands = require("../scopes/reporting-designer-bands");
var DesignerControlsPivotGrid = require("../scopes/reporting-designer-controls-pivotGrid");
var DesignerControlsCrossTab = require("../scopes/reporting-designer-controls-crossTab");
var DesignerData = require("../scopes/reporting-designer-data");
var DesignerInternal = require("../scopes/reporting-designer-internal");
var DesignerInternalHtmlMarkUp = require("../scopes/reporting-designer-internal-htmlMarkUp");
var DesignerLocalization = require("../scopes/reporting-designer-localization");
var DesignerTools = require("../scopes/reporting-designer-tools");
var DesignerUtils = require("../scopes/reporting-designer-utils");
var DesignerWidgets = require("../scopes/reporting-designer-widgets");
var DesignerWidgetsInternal = require("../scopes/reporting-designer-widgets-internal");
var DesignerWizard = require("../scopes/reporting-designer-wizard");
function _addDesignerToBundle(bundle) {
    bundle.Reporting = bundle.Reporting || {};
    bundle.Reporting.Designer = Designer;
    bundle.Reporting.Chart = {};
    bundle.Reporting.Chart.Internal = ChartInternal;
    bundle.Reporting.Chart.Internal.Axis = ChartInternalAxis;
    bundle.Reporting.Chart.Internal.DataMembers = ChartInternalDataMembers;
    bundle.Reporting.Chart.Internal.Models = ChartInternalModels;
    bundle.Reporting.Chart.Internal.Series = ChartInternalSeries;
    bundle.Reporting.Chart.Internal.Series.Metadata = ChartInternalSeriesMetadata;
    bundle.Reporting.Chart.Internal.Widgets = ChartInternalWidgets;
    bundle.Reporting.Designer.Actions = DesignerActions;
    bundle.Reporting.Designer.Bands = DesignerBands;
    bundle.Reporting.Designer.Bands.Internal = DesignerBandsInternal;
    bundle.Reporting.Designer.Bands.Metadata = DesignerBandsMetadata;
    bundle.Reporting.Designer.Controls = DesignerControls;
    bundle.Reporting.Designer.Controls.Metadata = DesignerControlsMetadata;
    bundle.Reporting.Designer.Controls.PivotGrid = DesignerControlsPivotGrid;
    bundle.Reporting.Designer.Controls.PivotGrid.Metadata = DesignerControlsPivotGridMetadata;
    bundle.Reporting.Designer.Controls.CrossTab = DesignerControlsCrossTab;
    bundle.Reporting.Designer.Controls.CrossTabMetaData = DesignerControlsCrossTabMetadata;
    bundle.Reporting.Designer.Data = DesignerData;
    bundle.Reporting.Designer.Data.Metadata = DesignerDataMetadata;
    bundle.Reporting.Designer.Internal = DesignerInternal;
    bundle.Reporting.Designer.Internal.HtmlMarkUp = DesignerInternalHtmlMarkUp;
    bundle.Reporting.Designer.Localization = DesignerLocalization;
    bundle.Reporting.Designer.Tools = DesignerTools;
    bundle.Reporting.Designer.Utils = DesignerUtils;
    bundle.Reporting.Designer.Widgets = DesignerWidgets;
    bundle.Reporting.Designer.Widgets.Internal = DesignerWidgetsInternal;
    bundle.Reporting.Designer.Wizard = DesignerWizard;
    return bundle;
}
exports._addDesignerToBundle = _addDesignerToBundle;
