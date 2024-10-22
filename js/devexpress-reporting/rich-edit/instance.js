﻿/**
* DevExpress HTML/JS Reporting (rich-edit\instance.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var richEditInstance = null;
exports.getRichEditInstance = function () {
    if (!richEditInstance) {
        richEditInstance = require('devexpress-richedit');
    }
    return richEditInstance;
};
