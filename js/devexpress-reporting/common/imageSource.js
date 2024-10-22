﻿/**
* DevExpress HTML/JS Reporting (common\imageSource.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ImageSource = (function () {
    function ImageSource(sourceType, data) {
        this.sourceType = sourceType;
        this.data = data;
    }
    ImageSource.prototype.getDataUrl = function () {
        switch (this.sourceType) {
            case 'svg':
                return 'data:image/svg+xml;charset=UTF-8;base64,' + encodeURI(this.data);
            case 'img':
                return 'data:image/x;base64,' + this.data;
        }
        if (this.sourceType === 'png' || this.sourceType === 'jpg' || this.sourceType === 'jpeg')
            return 'data:image/' + this.sourceType + ';base64,' + this.data;
    };
    ImageSource.parse = function (val) {
        var _a;
        var sourceType, data;
        _a = (val || '').split(','), sourceType = _a[0], data = _a[1];
        return sourceType && new ImageSource(sourceType, data);
    };
    ImageSource.toString = function (val) {
        return analytics_internal_1.formatUnicorn('{0},{1}', val.sourceType, val.data);
    };
    return ImageSource;
}());
exports.ImageSource = ImageSource;
