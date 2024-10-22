﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_editorTemplates.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
exports.editorTemplates = new analytics_widgets_1.EditorTemplates();
exports.chartDataSource = { propertyName: 'dataSource', displayName: 'Data Source', modelName: '@DataSource', link: true, editor: exports.editorTemplates.getEditor('chartDataSource'), localizationId: 'DevExpress.XtraReports.UI.XRSparkline.DataSource' };
