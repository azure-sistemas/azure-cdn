﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_sortingProcessor.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _previewRequestWrapper_1 = require("./_previewRequestWrapper");
var SortingProcessor = (function () {
    function SortingProcessor(_getSortingStage) {
        this._getSortingStage = _getSortingStage;
    }
    SortingProcessor.prototype.doSorting = function (sortData, shiftKey, ctrlKey) {
        if (!sortData)
            return;
        if (ctrlKey) {
            if (this._detachSorting(sortData))
                return;
        }
        else if (shiftKey)
            this._appendSorting(sortData);
        else
            this._applySorting(sortData);
        return true;
    };
    SortingProcessor.prototype._applySorting = function (sortData) {
        var sortingStage = this._getSortingStage();
        for (var i = 0; i < sortingStage.length; i++) {
            if (sortingStage[i] && sortingStage[i].Key === sortData.target) {
                var value = sortingStage[i].Value || [];
                for (var index = 0; index < value.length; index++) {
                    if (value[index] && (value[index].fieldName === sortData.field)) {
                        if (index != 0) {
                            var x = value.splice(index, 1)[0];
                            this._changeSortOrder(x);
                            value.unshift(x);
                        }
                        else
                            this._changeSortOrder(value[index]);
                    }
                    else
                        value[index].sortOrder = _previewRequestWrapper_1.ColumnSortOrder.None;
                }
                return;
            }
        }
    };
    SortingProcessor.prototype._appendSorting = function (sortData) {
        var sortingStage = this._getSortingStage();
        for (var i = 0; i < sortingStage.length; i++) {
            if (sortingStage[i] && sortingStage[i].Key === sortData.target) {
                var value = sortingStage[i].Value || [];
                for (var index = 0; index < value.length; index++) {
                    if (value[index] && (value[index].fieldName === sortData.field)) {
                        if (index != value.length - 1) {
                            var x = value.splice(index, 1)[0];
                            this._changeSortOrder(x);
                            value.push(x);
                            return;
                        }
                        this._changeSortOrder(value[index]);
                        return;
                    }
                }
            }
        }
    };
    SortingProcessor.prototype._detachSorting = function (sortData) {
        var skipProcessing = false;
        var sortingStage = this._getSortingStage();
        for (var i = 0; i < sortingStage.length; i++) {
            if (sortingStage[i] && sortingStage[i].Key === sortData.target) {
                (sortingStage[i].Value || []).forEach(function (f) {
                    if (f.sortOrder === _previewRequestWrapper_1.ColumnSortOrder.None)
                        skipProcessing = true;
                    else
                        f.sortOrder = _previewRequestWrapper_1.ColumnSortOrder.None;
                });
                return;
            }
        }
        return skipProcessing;
    };
    SortingProcessor.prototype._changeSortOrder = function (fieldInfo) {
        fieldInfo.sortOrder = fieldInfo.sortOrder === _previewRequestWrapper_1.ColumnSortOrder.Ascending ? _previewRequestWrapper_1.ColumnSortOrder.Descending : _previewRequestWrapper_1.ColumnSortOrder.Ascending;
    };
    return SortingProcessor;
}());
exports.SortingProcessor = SortingProcessor;
