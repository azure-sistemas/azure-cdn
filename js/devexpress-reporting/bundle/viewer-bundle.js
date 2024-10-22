﻿/**
* DevExpress HTML/JS Reporting (bundle\viewer-bundle.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var _validator_1 = require("./_validator");
var _add_viewer_to_bundle_1 = require("./_add-viewer-to-bundle");
var DevExpress = window.DevExpress || {};
_add_viewer_to_bundle_1._addViewerToBundle(DevExpress);
_validator_1.checkVersions();
module.exports = DevExpress['Reporting'];
