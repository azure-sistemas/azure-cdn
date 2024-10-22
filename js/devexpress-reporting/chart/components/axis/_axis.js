﻿/**
* DevExpress HTML/JS Reporting (chart\components\axis\_axis.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
function initCollectionItem(item, parent) {
    return function () {
        item.parent = parent;
        item.innerActions = [
            {
                text: analytics_utils_1.getLocalization('Remove', 'ReportStringId.UD_Capt_SpacingRemove'),
                imageClassName: 'dxrd-image-recycle-bin',
                imageTemplateName: 'dxrd-svg-operations-recycle_bin',
                disabled: ko.observable(false),
                visible: true,
                clickAction: function () { parent.remove(item); },
            }
        ];
    };
}
exports.initCollectionItem = initCollectionItem;
