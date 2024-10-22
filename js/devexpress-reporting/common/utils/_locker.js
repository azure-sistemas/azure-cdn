﻿/**
* DevExpress HTML/JS Reporting (common\utils\_locker.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Locker = (function () {
    function Locker() {
        var _this = this;
        this.lock = function (action) {
            if (!_this.isUpdate) {
                _this.isUpdate = true;
                action();
                _this.isUpdate = false;
            }
        };
        this.isUpdate = false;
    }
    return Locker;
}());
exports.Locker = Locker;
