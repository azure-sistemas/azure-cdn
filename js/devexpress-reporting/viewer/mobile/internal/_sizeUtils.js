﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_sizeUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updatePreviewContentSizeMobile(previewWrapperSize, $root) {
    return function () {
        var height = $root.outerHeight();
        var width = $root.outerWidth();
        previewWrapperSize({ width: width, height: height });
    };
}
exports.updatePreviewContentSizeMobile = updatePreviewContentSizeMobile;
