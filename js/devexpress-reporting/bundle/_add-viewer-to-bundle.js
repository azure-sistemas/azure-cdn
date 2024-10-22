﻿/**
* DevExpress HTML/JS Reporting (bundle\_add-viewer-to-bundle.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reporting = require("../scopes/reporting");
var Editing = require("../scopes/reporting-editing");
var Export = require("../scopes/reporting-export");
var ExportMetadata = require("../scopes/reporting-export-metadata");
var Internal = require("../scopes/reporting-internal");
var Metadata = require("../scopes/reporting-metadata");
var Viewer = require("../scopes/reporting-viewer");
var ViewerEditing = require("../scopes/reporting-viewer-editing");
var ViewerExport = require("../scopes/reporting-viewer-export");
var ViewerExportMetadata = require("../scopes/reporting-viewer-export-metadata");
var ViewerInternal = require("../scopes/reporting-viewer-internal");
var ViewerMobile = require("../scopes/reporting-viewer-mobile");
var ViewerMobileInternal = require("../scopes/reporting-viewer-mobile-internal");
var ViewerParameters = require("../scopes/reporting-viewer-parameters");
var ViewerSettings = require("../scopes/reporting-viewer-settings");
var ViewerUtils = require("../scopes/reporting-viewer-utils");
var ViewerWidgets = require("../scopes/reporting-viewer-widgets");
var ViewerWidgetsInternal = require("../scopes/reporting-viewer-widgets-internal");
var dx_reporting_version_1 = require("../dx-reporting-version");
function _addViewerToBundle(bundle) {
    bundle.Reporting = Reporting;
    bundle.Reporting.Editing = Editing;
    bundle.Reporting.Export = Export;
    bundle.Reporting.Export.Metadata = ExportMetadata;
    bundle.Reporting.Internal = Internal;
    bundle.Reporting.Metadata = Metadata;
    bundle.Reporting.Viewer = Viewer;
    bundle.Reporting.Viewer.Editing = ViewerEditing;
    bundle.Reporting.Viewer.Export = ViewerExport;
    bundle.Reporting.Viewer.Export.Metadata = ViewerExportMetadata;
    bundle.Reporting.Viewer.Internal = ViewerInternal;
    bundle.Reporting.Viewer.Mobile = ViewerMobile;
    bundle.Reporting.Viewer.Mobile.Internal = ViewerMobileInternal;
    bundle.Reporting.Viewer.Parameters = ViewerParameters;
    bundle.Reporting.Viewer.Settings = ViewerSettings;
    bundle.Reporting.Viewer.Utils = ViewerUtils;
    bundle.Reporting.Viewer.Widgets = ViewerWidgets;
    bundle.Reporting.Viewer.Widgets.Internal = ViewerWidgetsInternal;
    bundle.Reporting.VERSION = dx_reporting_version_1.version;
    return bundle;
}
exports._addViewerToBundle = _addViewerToBundle;
