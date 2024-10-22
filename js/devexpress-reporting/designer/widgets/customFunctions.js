﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\customFunctions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
exports.reportFunctionDisplay = (function (addins) { return analytics_widgets_internal_1.insertInFunctionDisplay(addins); })([{
        display: 'String',
        items: {
            'NewLine': [{ paramCount: 0, text: 'NewLine()', descriptionStringId: 'ExpressionEditorStringId.Function_NewLine' }],
            'FormatString': [{ paramCount: 1, text: "FormatString('')", descriptionStringId: 'ExpressionEditorStringId.Function_FormatString' }]
        },
    }, {
        display: 'Reporting',
        localizationId: 'ReportStringId.ExpressionEditor_ItemInfo_FunctionReporting',
        items: {
            'Rgb': [{ paramCount: 3, text: 'Rgb(, , )', descriptionStringId: 'ReportStringId.ExpressionEditor_Description_Function_Rgb' }],
            'Argb': [{ paramCount: 4, text: 'Argb(, , , )', descriptionStringId: 'ReportStringId.ExpressionEditor_Description_Function_Argb' }],
            'GetDisplayText': [{ paramCount: 1, text: 'GetDisplayText(?parameter)', descriptionStringId: 'ReportStringId.ExpressionEditor_Description_Function_GetDisplayText' }]
        }
    }]);
