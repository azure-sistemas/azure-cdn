﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\htmlMetaData.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./metadata");
exports.htmlExportOptionsSerializationInfoBase = [
    metadata_1.pageBorderColor,
    metadata_1.pageBorderWidth,
    metadata_1.pageRange,
    metadata_1.rasterizationResolution,
    metadata_1.expotOptionsTitle,
    metadata_1.htmlTableLayout,
    metadata_1.useHRefHyperlinks,
    metadata_1.allowURLsWithJSContent,
    metadata_1.removeSecondarySymbols,
    metadata_1.exportWatermarks,
    metadata_1.characterSet
];
exports.htmlExportOptionsSerializationInfo = [metadata_1.htmlExportMode, metadata_1.embedImagesInHTML, metadata_1.inlineCss].concat(exports.htmlExportOptionsSerializationInfoBase);
