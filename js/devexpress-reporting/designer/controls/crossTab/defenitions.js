﻿/**
* DevExpress HTML/JS Reporting (designer\controls\crossTab\defenitions.js)
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
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var defenitions_1 = require("../metadata/crosstab/defenitions");
var enums_1 = require("./enums");
function findcells(cells, columnIndex, rowIndex) {
    return cells.filter(function (item) {
        if (columnIndex == null) {
            return item._rowIndex() === rowIndex;
        }
        if (rowIndex == null) {
            return item._columnIndex() === columnIndex;
        }
        return item._rowIndex() === rowIndex && item._columnIndex() === columnIndex;
    });
}
exports.findcells = findcells;
var CrossTabDefinitionsModel = (function (_super) {
    __extends(CrossTabDefinitionsModel, _super);
    function CrossTabDefinitionsModel(model, parent, serializer) {
        return _super.call(this, model, serializer) || this;
    }
    return CrossTabDefinitionsModel;
}(analytics_elements_1.SerializableModel));
exports.CrossTabDefinitionsModel = CrossTabDefinitionsModel;
var CrossTabRowDefinitionsModel = (function (_super) {
    __extends(CrossTabRowDefinitionsModel, _super);
    function CrossTabRowDefinitionsModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrossTabRowDefinitionsModel.prototype.getInfo = function () { return defenitions_1.crossTabRowDefinitionInfo; };
    return CrossTabRowDefinitionsModel;
}(CrossTabDefinitionsModel));
exports.CrossTabRowDefinitionsModel = CrossTabRowDefinitionsModel;
var CrossTabColumnDefinitionsModel = (function (_super) {
    __extends(CrossTabColumnDefinitionsModel, _super);
    function CrossTabColumnDefinitionsModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrossTabColumnDefinitionsModel.prototype.getInfo = function () { return defenitions_1.crossTabColumnDefinitionInfo; };
    return CrossTabColumnDefinitionsModel;
}(CrossTabDefinitionsModel));
exports.CrossTabColumnDefinitionsModel = CrossTabColumnDefinitionsModel;
var CellMatrixHelper = (function () {
    function CellMatrixHelper(cells) {
        var _this = this;
        this.columnCount = 0;
        this.rowCount = 0;
        cells.forEach(function (cell) {
            if (cell._rowIndex() === 0)
                _this.columnCount += cell._columnSpan();
            if (cell._columnIndex() === 0)
                _this.rowCount += cell._rowSpan();
        });
        this.matrix = [];
        for (var i = 0; i < this.columnCount; i++) {
            this.matrix[i] = [];
            for (var j = 0; j < this.rowCount; j++) {
                var cell = findcells(cells, i, j)[0] || this.findRowCell(i, j - 1) || this.findColumnCell(i - 1, j);
                this.matrix[i][j] = cell;
            }
        }
    }
    CellMatrixHelper.prototype.findRowCell = function (i, j, span) {
        if (span === void 0) { span = 2; }
        if (j < 0)
            return null;
        var newCell = this.matrix[i][j];
        if (newCell && newCell._rowSpan() >= span)
            return newCell;
        return this.findRowCell(i, j - 1, span + 1);
    };
    CellMatrixHelper.prototype.findColumnCell = function (i, j, span) {
        if (span === void 0) { span = 1; }
        if (i < 0)
            return null;
        var newCell = this.matrix[i][j];
        if (newCell && newCell._rowSpan() >= span)
            return newCell;
        return this.findColumnCell(i - 1, j, span + 1);
    };
    return CellMatrixHelper;
}());
exports.CellMatrixHelper = CellMatrixHelper;
var DefenitionUpdater = (function (_super) {
    __extends(DefenitionUpdater, _super);
    function DefenitionUpdater(crossTab) {
        var _this = _super.call(this) || this;
        _this._columnDefinitions = [];
        _this._rowDefinitions = [];
        _this._serializer = new analytics_utils_1.ModelSerializer();
        var matrixHelper = new CellMatrixHelper(crossTab.cells());
        for (var i = 0; i < matrixHelper.columnCount; i++) {
            for (var j = 0; j < matrixHelper.rowCount; j++) {
                var cell = matrixHelper.matrix[i][j];
                if (cell.kind() == enums_1.CellKind.DataHeader || cell.kind() == enums_1.CellKind.Corner)
                    continue;
                if (cell._columnSpan() === 1 && !_this.findDefinition(_this._columnDefinitions, cell)) {
                    _this._columnDefinitions.push({ cell: cell, defenition: crossTab._columnDefinitions()[i] });
                }
                if (cell._rowSpan() === 1 && !_this.findDefinition(_this._rowDefinitions, cell)) {
                    _this._rowDefinitions.push({ cell: cell, defenition: crossTab._rowDefinitions()[j] });
                }
            }
        }
        return _this;
    }
    DefenitionUpdater.prototype.findDefinition = function (array, cell) {
        return analytics_internal_1.findFirstItemMatchesCondition(array, function (item) { return item.cell === cell; });
    };
    DefenitionUpdater.prototype.update = function (cells, width, height) {
        var matrixHelper = new CellMatrixHelper(cells);
        var columnDefs = [];
        var rowDefs = [];
        for (var i = 0; i < matrixHelper.columnCount; i++) {
            for (var j = 0; j < matrixHelper.rowCount; j++) {
                var cell = matrixHelper.matrix[i][j];
                if (columnDefs[i] == null && cell._columnSpan() === 1) {
                    var element = this.findDefinition(this._columnDefinitions, cell);
                    if (element && element.defenition)
                        columnDefs[i] = new CrossTabColumnDefinitionsModel(this._serializer.serialize(element.defenition));
                }
                if (rowDefs[j] == null && cell._rowSpan() === 1) {
                    var element = this.findDefinition(this._rowDefinitions, cell);
                    if (element && element.defenition)
                        rowDefs[j] = new CrossTabRowDefinitionsModel(this._serializer.serialize(element.defenition));
                }
            }
        }
        for (var i = 0; i < matrixHelper.columnCount; i++) {
            if (columnDefs[i] == null)
                columnDefs[i] = new CrossTabColumnDefinitionsModel({ '@Width': i > 0 ? columnDefs[i - 1].width() : width });
        }
        for (var i = 0; i < matrixHelper.rowCount; i++) {
            if (rowDefs[i] == null)
                rowDefs[i] = new CrossTabRowDefinitionsModel({ '@Height': i > 0 ? rowDefs[i - 1].height() : height });
        }
        return { columnDefs: columnDefs, rowDefs: rowDefs };
    };
    return DefenitionUpdater;
}(analytics_utils_1.Disposable));
exports.DefenitionUpdater = DefenitionUpdater;
