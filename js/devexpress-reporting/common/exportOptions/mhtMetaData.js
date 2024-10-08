﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\mhtMetaData.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./metadata");
exports.mhtExportOptionsSerializationInfoBase = [
    metadata_1.pageBorderColor,
    metadata_1.pageBorderWidth,
    metadata_1.pageRange,
    metadata_1.rasterizationResolution,
    metadata_1.expotOptionsTitle,
    metadata_1.characterSet,
    metadata_1.htmlTableLayout,
    metadata_1.useHRefHyperlinks,
    metadata_1.allowURLsWithJSContent,
    metadata_1.removeSecondarySymbols,
    metadata_1.exportWatermarks
];
exports.mhtExportOptionsSerializationInfo = [metadata_1.htmlExportMode, metadata_1.inlineCss].concat(exports.mhtExportOptionsSerializationInfoBase);
