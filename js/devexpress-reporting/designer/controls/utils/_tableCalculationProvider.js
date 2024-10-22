﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_tableCalculationProvider.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var TableCalculationProvider = (function () {
    function TableCalculationProvider(_table) {
        this._table = _table;
        this._tableOffset = {
            width: null,
            left: null
        };
        this._calculationStarted = false;
        this._calculationTimeout = null;
        this._calculationNodes = [];
    }
    TableCalculationProvider.prototype._resetState = function () {
        this._calculationNodes = [];
        this._tableOffset.width = null;
        this._tableOffset.left = null;
        this._calculationStarted = false;
    };
    TableCalculationProvider.prototype._startCalculation = function (calculationNodes) {
        if (calculationNodes === void 0) { calculationNodes = this._calculationNodes; }
        this._calculationStarted = true;
        var rows = this._table.rows().map(function (row, rowIndex) {
            return row.cells().map(function (cell, cellIndex) {
                var modifiedCell = calculationNodes.filter(function (x) { return x.column === cellIndex && x.row === rowIndex; })[0];
                var weight = cell.weight();
                return modifiedCell ? modifiedCell.calc : function () { return cell.weight(weight); };
            });
        });
        this._tableOffset.left && this._table.location.x(this._table.location.x() + this._tableOffset.left);
        this._tableOffset.width && this._table.size.width(this._table.size.width() + this._tableOffset.width);
        rows.forEach(function (r) { return r.forEach(function (c) { return c(); }); });
        this._calculationStarted = false;
    };
    TableCalculationProvider.prototype.addTableOffset = function (width, left) {
        this._tableOffset.width = width;
        this._tableOffset.left = left;
    };
    TableCalculationProvider.prototype.addCalculationNode = function (node) {
        var _this = this;
        if (this._calculationStarted)
            return;
        this._calculationNodes.push(node);
        this._calculationTimeout && clearTimeout(this._calculationTimeout);
        this._calculationTimeout = setTimeout(function () {
            var undo = analytics_utils_1.UndoEngine.tryGetUndoEngine(_this._table);
            undo && undo.start();
            _this._startCalculation();
            _this._resetState();
            undo && undo.end();
        }, 1);
    };
    TableCalculationProvider.prototype.hasCalculationNode = function (rowIndex, cellIndex) {
        return this._calculationNodes.some(function (x) { return x.column === cellIndex && x.row === rowIndex; });
    };
    return TableCalculationProvider;
}());
exports.TableCalculationProvider = TableCalculationProvider;
