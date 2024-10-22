﻿/**
* DevExpress HTML/JS Reporting (viewer\search\_utils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
exports.formatSearchResult = function (value) { return value && (analytics_utils_1.getLocalization('page', 'ASPxReportsStringId.WebDocumentViewer_SearchPageNumberText') + ' ' + (value.pageIndex + 1)); };
