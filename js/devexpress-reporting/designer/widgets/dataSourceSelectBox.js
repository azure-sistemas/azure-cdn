﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\dataSourceSelectBox.js)
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
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ko = require("knockout");
var array_store_1 = require("devextreme/data/array_store");
var data_source_1 = require("devextreme/data/data_source");
var DataSourceSelectBox = (function (_super) {
    __extends(DataSourceSelectBox, _super);
    function DataSourceSelectBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataSourceSelectBox.createDataSource = function (values) {
        var store = new array_store_1.default(values);
        var options = { store: store, pageSize: 20, paginate: true };
        return new data_source_1.default(options);
    };
    DataSourceSelectBox.prototype.getValues = function () {
        var _this = this;
        if (!this.dataSource)
            this._disposables.push(this.dataSource = ko.computed(function () { return DataSourceSelectBox.createDataSource(_this.values()); }));
        return this.dataSource;
    };
    return DataSourceSelectBox;
}(analytics_widgets_1.Editor));
exports.DataSourceSelectBox = DataSourceSelectBox;
