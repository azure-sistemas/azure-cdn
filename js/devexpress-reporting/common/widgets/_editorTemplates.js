﻿/**
* DevExpress HTML/JS Reporting (common\widgets\_editorTemplates.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var _utils_1 = require("../utils/_utils");
exports.editorTemplates = {
    csvSeparator: { header: 'dx-text',
        extendedOptions: { placeholder: ko.pureComputed(function () { return (_utils_1.cultureInfo['csvTextSeparator'] || '') + ' ' + analytics_utils_1.getLocalization('(Using System Separator)', 'PreviewStringId.ExportOption_CsvSeparator_UsingSystem'); }) }
    }
};
