﻿/**
* DevExpress HTML/JS Reporting (designer\internal\errorPanel\_runtimeErrorProvider.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ko = require("knockout");
var RuntimeErrorProvider = (function () {
    function RuntimeErrorProvider() {
        this.errors = ko.observableArray();
    }
    RuntimeErrorProvider.prototype.collectErrors = function () { };
    return RuntimeErrorProvider;
}());
exports.RuntimeErrorProvider = RuntimeErrorProvider;
