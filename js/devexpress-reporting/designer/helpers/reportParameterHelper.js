﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\reportParameterHelper.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var parameterHelper_1 = require("../../viewer/parameters/parameterHelper");
var ReportParameterHelper = (function (_super) {
    __extends(ReportParameterHelper, _super);
    function ReportParameterHelper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReportParameterHelper;
}(parameterHelper_1.ParameterHelper));
exports.ReportParameterHelper = ReportParameterHelper;
