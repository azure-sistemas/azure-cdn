﻿/**
* DevExpress HTML/JS Reporting (designer\controls\metadata\properties\metadataGroups.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("./metadata");
var expressionBinding_1 = require("./expressionBinding");
var formattingrules_1 = require("./formattingrules");
var style_1 = require("./style");
var sortingOptions_1 = require("./sortingOptions");
exports.sizeLocation = [metadata_1.size, metadata_1.location];
exports.bordersProperties = [metadata_1.borders, metadata_1.borderWidth, metadata_1.borderDashStyle, metadata_1.borderColor];
exports.baseControlProperties = [metadata_1.name, metadata_1.visible, metadata_1.dpi, metadata_1.lockedInUserDesigner, metadata_1.tag, expressionBinding_1.expressionBindings];
exports.commonBandProperties = [metadata_1.backColor, formattingrules_1.formattingRuleLinks].concat(exports.baseControlProperties, exports.bordersProperties, metadata_1.paddingGroup);
exports.commonControlProperties = [style_1.styleName, style_1.evenStyleName, metadata_1.accessibleDescription, style_1.oddStyleName, style_1.stylesObj, style_1.stylePriority, metadata_1.canPublish].concat(exports.commonBandProperties);
exports.fontGroup = [metadata_1.expressionableFont, metadata_1.foreColor];
exports.bookmarkGroup = [metadata_1.bookmark, metadata_1.bookmarkParent];
exports.navigationGroup = [metadata_1.navigateUrl, metadata_1.target].concat(exports.bookmarkGroup);
exports.datasourcePrintOptionsGroup = [metadata_1.dataSource, metadata_1.dataMember, metadata_1.dataAdapter, metadata_1.filterString, metadata_1.filterStringEditable, metadata_1.reportPrintOptions];
exports.processGroup = [metadata_1.processDuplicatesMode, metadata_1.processDuplicatesTarget, metadata_1.processNullValues];
exports.canGrowShrinkGroup = [metadata_1.canGrow, metadata_1.canShrink];
exports.labelGroup = [metadata_1.textAlignment, metadata_1.text, metadata_1.textArea, metadata_1.textFormatString, metadata_1.textFitMode, metadata_1.nullValueText,
    metadata_1.keepTogetherDefaultValueFalse, metadata_1.summary, metadata_1.multiline, metadata_1.angle, metadata_1.wordWrap, metadata_1.xlsxFormatString, metadata_1.rtl, sortingOptions_1.interactiveSorting
].concat(exports.commonControlProperties, exports.fontGroup, exports.navigationGroup, exports.canGrowShrinkGroup, exports.processGroup);
exports.unknownSerializationsInfo = [].concat(exports.baseControlProperties, exports.sizeLocation);
