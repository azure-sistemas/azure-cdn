﻿/**
* DevExpress HTML/JS Reporting (designer\controls\richEdit.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xrRichText_1 = require("./xrRichText");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
exports.getRichEditSurface = analytics_internal_1.createGlobalModuleVariableFunc(function () { return xrRichText_1.XRRichSurface; });
exports.registerRichEditInline = analytics_internal_1.createGlobalModuleVariableFunc(function (selection) { return void 0; });
