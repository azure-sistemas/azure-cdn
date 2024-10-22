﻿/**
* DevExpress HTML/JS Reporting (rich-edit\registrator.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var surface_1 = require("./surface");
var richEdit_1 = require("../designer/controls/richEdit");
var _inlineControl_1 = require("./utils/_inlineControl");
var xrRichText_1 = require("../designer/controls/xrRichText");
var instance_1 = require("./instance");
richEdit_1.getRichEditSurface(function () {
    var RichEdit = instance_1.getRichEditInstance();
    return !!RichEdit ? surface_1.XRRichModernSurface : xrRichText_1.XRRichSurface;
});
richEdit_1.registerRichEditInline(function (selection) {
    var RichEdit = instance_1.getRichEditInstance();
    return !!RichEdit && new _inlineControl_1.InlineRichEditControl(selection);
});
