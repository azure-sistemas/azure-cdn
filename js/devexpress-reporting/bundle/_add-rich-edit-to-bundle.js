﻿/**
* DevExpress HTML/JS Reporting (bundle\_add-rich-edit-to-bundle.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DesignerControlsRichEdit = require("../scopes/reporting-designer-controls-richEdit");
var DesignerControlsRichEditInternal = require("../scopes/reporting-designer-controls-richEdit-internal");
var DesignerControlsRichEditInternalToolbar = require("../scopes/reporting-designer-controls-richEdit-internal-toolbar");
function _addRichToBundle(bundle) {
    bundle.Reporting.Designer.Controls.RichEdit = DesignerControlsRichEdit;
    bundle.Reporting.Designer.Controls.RichEdit.Internal = DesignerControlsRichEditInternal;
    bundle.Reporting.Designer.Controls.RichEdit.Internal.Toolbar = DesignerControlsRichEditInternalToolbar;
    return bundle;
}
exports._addRichToBundle = _addRichToBundle;
