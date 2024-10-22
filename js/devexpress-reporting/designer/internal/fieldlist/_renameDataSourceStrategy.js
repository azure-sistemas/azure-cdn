﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_renameDataSourceStrategy.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RenameDataSourceStrategy = (function () {
    function RenameDataSourceStrategy(dsHelper, _afterRenameCallBack) {
        var _this = this;
        this.dsHelper = dsHelper;
        this._afterRenameCallBack = _afterRenameCallBack;
        this._rename = function (dataSourceInfo, name) {
            dataSourceInfo.name = name;
            if (dataSourceInfo.data.name) {
                dataSourceInfo.data.name(name);
            }
            _this._afterRenameCallBack && _this._afterRenameCallBack();
        };
    }
    RenameDataSourceStrategy.prototype.validateName = function (nameCandidate) {
        return nameCandidate && !nameCandidate.match(/(?!\_)[\W]+/);
    };
    RenameDataSourceStrategy.prototype.validateUnique = function (nameCandidate, currentName) {
        return nameCandidate && (nameCandidate === currentName || this.dsHelper().usedDataSources().map(function (dataSource) { return dataSource.name; }).indexOf(nameCandidate) === -1);
    };
    RenameDataSourceStrategy.prototype.tryRename = function (nameCandidate, currentItemData) {
        var currentDs = this.dsHelper && this.dsHelper().findDataSourceInfo(currentItemData);
        if (!currentDs)
            return false;
        this._rename(currentDs, nameCandidate);
        return true;
    };
    return RenameDataSourceStrategy;
}());
exports.RenameDataSourceStrategy = RenameDataSourceStrategy;
