﻿/**
* DevExpress HTML/JS Reporting (rich-edit\customizeToolbarActions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
exports.ToolbarActionId = {
    ParagraphAlignmentButtonGroup: 'dxxrta-buttongroup-paragraph-alignment',
    HyperlinkButton: 'dxxrta-button-hyperlink',
    ClearFormattingButton: 'dxxrta-button-clear-formatting',
    FontStyleButtonGroup: 'dxxrta-buttongroup-toggle-font',
    ToggleCaseButton: 'dxxrta-button-text-case',
    FontSizeComboBox: 'dxxrta-combobox-text-size',
    FontComboBox: 'dxxrta-combobox-font',
    FontColorBox: 'dxxrta-colorbox-font',
    BackgroundColorBox: 'dxxrta-colorbox-background',
};
exports.ToolbarGroupId = {
    AlignmentAndFormatting: 'dxxrtg-buttons-first',
    FontStyleAndCase: 'dxxrtg-buttons-second',
    FontSize: 'dxxrtg-font-size',
    Font: 'dxxrtg-font-family',
    FontColor: 'dxxrtg-text-color',
    BackgroundColor: 'dxxrtg-back-color',
};
exports.events = analytics_internal_1.createGlobalModuleVariableFunc(new analytics_utils_1.EventManager());
