﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\editorTemplates.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var _groupEditor_1 = require("./_groupEditor");
exports.viewerEditorTemplates = {
    multiValue: {
        header: 'dxrd-multivalue', extendedOptions: {
            onMultiTagPreparing: function (args) {
                var selectedItemsLength = args.selectedItems.length, totalCount = args.model.items.length;
                if (selectedItemsLength === totalCount) {
                    var stringFormat = analytics_utils_1.getLocalization('All selected ({0})', 'ASPxReportsStringId.WebDocumentViewer_MultiValueEditor_AllSelected');
                    args.text = analytics_internal_1.formatUnicorn(stringFormat, selectedItemsLength);
                }
            }
        }
    },
    groupEditor: { header: 'dx-emptyHeader', custom: 'dxrd-parameters-property-editor', content: 'dxrd-parameters-editor-content', editorType: _groupEditor_1.ParametersGroupEditor },
    rangeEditor: { header: 'dxrv-range-parameter' },
    multiValueEditable: { custom: 'dxrd-multivalue-editable' },
    selectBox: { header: 'dx-selectbox' }
};
