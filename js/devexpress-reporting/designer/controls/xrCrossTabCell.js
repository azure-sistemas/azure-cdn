﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCrossTabCell.js)
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
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var xrControl_1 = require("./xrControl");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var enums_1 = require("./crossTab/enums");
var settings_1 = require("../utils/settings");
var fields_1 = require("./metadata/crosstab/fields");
var xrReport_1 = require("./xrReport");
var _styleHelper_1 = require("../helpers/_styleHelper");
function kindToString(kind) {
    switch (kind) {
        case enums_1.CellKind.None:
            return 'NO';
        case enums_1.CellKind.Corner:
            return 'CRN';
        case enums_1.CellKind.RowHeader:
            return 'RH';
        case enums_1.CellKind.RowTotalHeader:
            return 'RTH';
        case enums_1.CellKind.RowTotal:
            return 'RT';
        case enums_1.CellKind.ColumnHeader:
            return 'CH';
        case enums_1.CellKind.ColumnTotalHeader:
            return 'CTH';
        case enums_1.CellKind.ColumnTotal:
            return 'CT';
        case enums_1.CellKind.Data:
            return 'DAT';
        case enums_1.CellKind.DataHeader:
            return 'DH';
        case enums_1.CellKind.GrandTotal:
            return 'GDT';
        case enums_1.CellKind.Empty:
            return 'Emtpy';
        case enums_1.CellKind.EmptyHeader:
            return 'EmtpyH';
    }
}
exports.kindToString = kindToString;
var XRCrossTabCellViewModel = (function (_super) {
    __extends(XRCrossTabCellViewModel, _super);
    function XRCrossTabCellViewModel(model, parent, serializer) {
        if (serializer === void 0) { serializer = new analytics_utils_1.ModelSerializer(); }
        var _this = _super.call(this, model, parent, serializer) || this;
        _this.parent = parent;
        _this._showCellCode = ko.observable(false);
        _this._oldFieldName = null;
        _this.getPath = function (propertyName) {
            if (_this.field && _this.field())
                return _this.field().getPath(propertyName);
            return analytics_internal_1.getFullPath(_this.parent.getPath('dataMember'), _this.parent['dataMember']());
        };
        _this.kind = ko.observable(enums_1.CellKind.None);
        _this.fieldNameAreValid = ko.observable(true);
        _this._disposables.push(ko.computed(function () {
            if (analytics_internal_1.checkModelReady(_this.parent)) {
                _this.size.width(_this._width);
            }
        }));
        _this._disposables.push(ko.computed(function () {
            if (analytics_internal_1.checkModelReady(_this.parent)) {
                _this.size.height(_this._height);
            }
        }));
        _this._disposables.push(ko.computed(function () {
            if (analytics_internal_1.checkModelReady(_this.parent)) {
                _this.location.x(_this._left);
            }
        }));
        _this._disposables.push(ko.computed(function () {
            if (analytics_internal_1.checkModelReady(_this.parent)) {
                _this.location.y(_this._top);
            }
        }));
        _this._disposables.push(_this.location.x.subscribe(function (newVal) {
            if (analytics_internal_1.checkModelReady(_this.parent)) {
                var delta = newVal - _this._left;
                if (_this._columnIndex() != 0) {
                    var targetColumn = parent._columnDefinitions()[_this._columnIndex() - 1];
                    targetColumn.width(targetColumn.width() + delta);
                }
                else {
                    parent.location.x(parent.location.x() + delta);
                }
            }
        }));
        _this._disposables.push(_this.location.y.subscribe(function (newVal) {
            if (analytics_internal_1.checkModelReady(_this.parent)) {
                var delta = newVal - _this._top;
                if (_this._rowIndex() != 0) {
                    var targetRow = parent._rowDefinitions()[_this._rowIndex() - 1];
                    targetRow.height(targetRow.height() + delta);
                }
                else {
                    parent.location.y(parent.location.y() + delta);
                }
            }
        }));
        _this._disposables.push(_this.size.height.subscribe(function (newHeight) {
            if (analytics_internal_1.checkModelReady(_this.parent)) {
                var currentHeight = _this._height;
                var rows = parent._rowDefinitions();
                for (var i = _this._rowIndex(); i < _this._rowIndex() + _this._rowSpan(); i++) {
                    rows[i].height(rows[i].height() + (newHeight - currentHeight) * (rows[i].height() / currentHeight));
                }
            }
        }));
        _this._disposables.push(_this.size.width.subscribe(function (newWidth) {
            if (analytics_internal_1.checkModelReady(_this.parent)) {
                var currentWidth = _this._width;
                var columns = parent._columnDefinitions();
                for (var i = _this._columnIndex(); i < _this._columnIndex() + _this._columnSpan(); i++) {
                    columns[i].width(columns[i].width() + (newWidth - currentWidth) * (columns[i].width() / currentWidth));
                }
            }
        }));
        _this._text = ko.observable(_this.text());
        _this.field = ko.observable(null);
        _this._disposables.push(_this.field.subscribe(function (field) {
            if (field) {
                fields_1.crossTabGroupFieldInfoBase.concat(fields_1.crossTabDataFieldInfoBase).forEach(function (info) {
                    if (field[info.propertyName])
                        _this[info.propertyName] = field[info.propertyName];
                });
            }
        }));
        _this._disposables.push(_this.fieldName = ko.pureComputed({
            read: function () { return _this.field() && _this.field().fieldName() || ''; },
            write: function (newVal) {
                if (_this.field())
                    _this.field().fieldName(newVal);
                else
                    _this.createAndAssignNewField(newVal, true);
            }
        }));
        _this._disposables.push(ko.computed(function () {
            _this._testFieldName(_this.fieldName(), new analytics_utils_1.PathRequest(analytics_internal_1.getFullPath(_this.parent.getPath(''), _this.parent['dataMember']())));
        }));
        _this._disposables.push(_this.kind.subscribe(function (kind) {
            if (_this._textFormatString() === null && _this.field() && (kind == enums_1.CellKind.RowTotalHeader
                || kind == enums_1.CellKind.ColumnTotalHeader))
                _this.textFormatString('Total {0}');
        }));
        _this._disposables.push(ko.computed(function () {
            if (_this._text() === null && _this.isIndependant() && _this.kind() != enums_1.CellKind.Corner) {
                _this.text('Grand Total');
            }
            if ((_this.kind() == enums_1.CellKind.Corner || _this.kind() == enums_1.CellKind.DataHeader) && _this.fieldName() && _this.fieldName() != _this._oldFieldName) {
                (_this._oldFieldName == _this.text() || _this.text() === null) && _this.text(_this.fieldName());
                _this._oldFieldName = _this.fieldName();
            }
        }));
        _this._disposables.push(_this.text = ko.pureComputed({
            read: function () {
                if (_this._showCellCode()) {
                    var kind = kindToString(_this.kind());
                    var rowSpan = _this._rowSpan() != 1 ? '(' + _this._rowSpan() + ')' : '';
                    var columnSpan = _this._columnSpan() != 1 ? '(' + _this._columnSpan() + ')' : '';
                    return kind + ' X' + _this._columnIndex() + columnSpan + ' Y' + _this._rowIndex() + rowSpan;
                }
                if (_this._text())
                    return _this._text();
                var fieldName = _this.fieldName() ? '[' + _this.fieldName() + ']' : '';
                if (_this.kind() == enums_1.CellKind.RowTotalHeader || _this.kind() == enums_1.CellKind.ColumnTotalHeader) {
                    return _this.textFormatString() ? analytics_internal_1.formatUnicorn(_this.textFormatString(), fieldName) : fieldName;
                }
                if (_this.isBindable())
                    return fieldName || _this._getDefaultName(_this.kind());
            },
            write: function (newVal) { return _this._text(newVal); }
        }));
        _this._disposables.push(ko.computed(function () {
            switch (_this.kind()) {
                case enums_1.CellKind.Corner:
                case enums_1.CellKind.ColumnHeader:
                case enums_1.CellKind.ColumnTotalHeader:
                case enums_1.CellKind.DataHeader:
                case enums_1.CellKind.RowHeader:
                case enums_1.CellKind.RowTotalHeader:
                case enums_1.CellKind.EmptyHeader:
                case enums_1.CellKind.Empty:
                    _this.styleName(_this.parent['headerAreaStyleName']());
                    break;
                case enums_1.CellKind.ColumnTotal:
                case enums_1.CellKind.RowTotal:
                case enums_1.CellKind.GrandTotal:
                    _this.styleName(_this.parent['totalAreaStyleName']());
                    break;
                case enums_1.CellKind.Data:
                    _this.styleName(_this.parent['dataAreaStyleName']());
                    break;
                default:
                    _this.styleName(_this.parent['generalStyleName']());
            }
            _styleHelper_1.stylesProperties.forEach(function (property) {
                if (_this['_' + property] && _this['_' + property]())
                    _this[property](_this['_' + property]());
            });
        }));
        _this._disposables.push(_this.rowVisible = ko.pureComputed({
            read: function () {
                var rows = parent._rowDefinitions().slice(_this._rowIndex(), _this._rowIndex() + _this._rowSpan());
                return !rows.every(function (x) { return !x.visible(); });
            },
            write: function (value) { return parent._rowDefinitions()[_this._rowIndex()].visible(value); }
        }));
        _this._disposables.push(_this.columnVisible = ko.pureComputed({
            read: function () {
                var columns = parent._columnDefinitions().slice(_this._columnIndex(), _this._columnIndex() + _this._columnSpan());
                return !columns.every(function (x) { return !x.visible(); });
            },
            write: function (value) { return parent._columnDefinitions()[_this._columnIndex()].visible(value); }
        }));
        _this.rowAutoHeightMode = parent._rowDefinitions()[_this._rowIndex()].autoHeightMode;
        _this.columnAutoWidthMode = parent._columnDefinitions()[_this._columnIndex()].autoWidthMode;
        _this.crossTabSortBySummaryInfo.getPath = function (propertyName) { return _this.getPath(propertyName); };
        return _this;
    }
    Object.defineProperty(XRCrossTabCellViewModel.prototype, "namePrefix", {
        get: function () {
            var cellType = '';
            for (var type in XRCrossTabCellViewModel.cellKinds) {
                if (XRCrossTabCellViewModel.cellKinds[type].indexOf(this.kind()) != -1)
                    cellType = type;
            }
            return 'crossTab' + cellType + 'Cell';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XRCrossTabCellViewModel.prototype, "_width", {
        get: function () {
            var columns = this.parent._columnDefinitions();
            var result = 0;
            for (var i = this._columnIndex(); i < this._columnIndex() + this._columnSpan(); i++) {
                result += columns[i].width();
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XRCrossTabCellViewModel.prototype, "_height", {
        get: function () {
            var rows = this.parent._rowDefinitions();
            var result = 0;
            for (var i = this._rowIndex(); i < this._rowIndex() + this._rowSpan(); i++) {
                result += rows[i].height();
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XRCrossTabCellViewModel.prototype, "_left", {
        get: function () {
            var columns = this.parent._columnDefinitions();
            var result = 0;
            for (var i = 0; i < this._columnIndex(); i++) {
                result += columns[i].width();
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(XRCrossTabCellViewModel.prototype, "_top", {
        get: function () {
            var rows = this.parent._rowDefinitions();
            var result = 0;
            for (var i = 0; i < this._rowIndex(); i++) {
                result += rows[i].height();
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    XRCrossTabCellViewModel.prototype._getDefaultName = function (kind) {
        switch (kind) {
            case enums_1.CellKind.ColumnHeader:
                return analytics_internal_1.getLocalization('Columns', 'ReportStringId.CrossTab_ColumnAreaName');
            case enums_1.CellKind.RowHeader:
                return analytics_internal_1.getLocalization('Rows', 'ReportStringId.CrossTab_RowAreaName');
            case enums_1.CellKind.Data:
                return analytics_internal_1.getLocalization('Data', 'ReportStringId.CrossTab_DataAreaName');
        }
    };
    XRCrossTabCellViewModel.prototype._testFieldName = function (fieldName, path) {
        var _this = this;
        var report = this.root;
        if (!report || !(report instanceof xrReport_1.ReportViewModel))
            return;
        var dataBindingsProvider = report.dataBindingsProvider && report.dataBindingsProvider();
        if (dataBindingsProvider) {
            dataBindingsProvider.getItems(path).done(function (result) {
                _this.fieldNameAreValid(result.some(function (x) { return x.name === fieldName; }));
            });
        }
    };
    XRCrossTabCellViewModel.prototype.reset = function () {
        this.dataLevel = undefined;
        this.columnLevel = undefined;
        this.rowLevel = undefined;
    };
    XRCrossTabCellViewModel.prototype.canRemove = function () {
        return this.kind() === enums_1.CellKind.Data && this.parent.dataFields().length > 0
            || this.kind() === enums_1.CellKind.RowHeader && this.parent.rowFields().length > 0
            || this.kind() === enums_1.CellKind.ColumnHeader && this.parent.columnFields().length > 0;
    };
    XRCrossTabCellViewModel.prototype.canDropDown = function () {
        return this.fieldName() && (this.kind() === enums_1.CellKind.Data && (this.parent.dataFields().length < 2
            || this.parent.layoutOptions.dataFieldLayout() === enums_1.DataFieldLayout[enums_1.DataFieldLayout.InColumn])
            || this.kind() === enums_1.CellKind.ColumnHeader);
    };
    XRCrossTabCellViewModel.prototype.canDropRight = function () {
        return this.fieldName() && (this.kind() === enums_1.CellKind.Data && (this.parent.dataFields().length < 2
            || this.parent.layoutOptions.dataFieldLayout() === enums_1.DataFieldLayout[enums_1.DataFieldLayout.InRow])
            || this.kind() === enums_1.CellKind.RowHeader);
    };
    XRCrossTabCellViewModel.prototype.canDropUp = function () {
        return this.fieldName() && this.kind() === enums_1.CellKind.ColumnHeader;
    };
    XRCrossTabCellViewModel.prototype.canDropLeft = function () {
        return this.fieldName() && this.kind() === enums_1.CellKind.RowHeader;
    };
    XRCrossTabCellViewModel.prototype.isPropertyVisible = function (name) {
        if (name == 'textFormatString')
            return !this.isIndependant();
        if (name == 'visible' || name == 'location' || name == 'canPublish')
            return false;
        if (name == 'fieldName')
            return this.isBindable();
        if (name == 'summaryType' || name == 'summaryDisplayType')
            return this.kind() === enums_1.CellKind.Data;
        if (name == 'sortOrder' ||
            name == 'crossTabGroupInterval' ||
            name == 'crossTabGroupIntervalNumericRange' ||
            name == 'crossTabSortBySummaryInfo')
            return this.kind() === enums_1.CellKind.RowHeader || this.kind() === enums_1.CellKind.ColumnHeader;
        return _super.prototype.isPropertyVisible.call(this, name);
    };
    XRCrossTabCellViewModel.prototype.isPropertyModified = function (name) {
        if (name === 'columnIndex' || name === 'rowIndex')
            return false;
        return _super.prototype.isPropertyModified.call(this, name);
    };
    XRCrossTabCellViewModel.prototype.isPropertyDisabled = function (name) {
        if (name === 'text')
            return !this.isEditable();
        if (name === 'crossTabGroupInterval' ||
            name === 'sortOrder' ||
            name === 'summaryType' ||
            name === 'summaryDisplayType' ||
            name === 'crossTabSortBySummaryInfo')
            return !this.fieldName();
        if (name === 'crossTabGroupIntervalNumericRange')
            return !this.fieldName() || !this.crossTabGroupInterval() || (this.crossTabGroupInterval() != 'Numeric' &&
                this.crossTabGroupInterval() != 'DayAge' &&
                this.crossTabGroupInterval() != 'WeekAge' &&
                this.crossTabGroupInterval() != 'MonthAge' &&
                this.crossTabGroupInterval() != 'YearAge');
        if (name == 'rowVisible')
            return this._rowSpan() > 1;
        if (name == 'columnVisible')
            return this._columnSpan() > 1;
        return _super.prototype.isPropertyDisabled.call(this, name);
    };
    XRCrossTabCellViewModel.prototype.isBindable = function () {
        return this.kind() === enums_1.CellKind.RowHeader || this.kind() === enums_1.CellKind.ColumnHeader || this.kind() === enums_1.CellKind.Data;
    };
    XRCrossTabCellViewModel.prototype.isIndependant = function () {
        return this.kind() == enums_1.CellKind.Corner ||
            this.kind() == enums_1.CellKind.ColumnTotalHeader && this.columnLevel == undefined ||
            this.kind() == enums_1.CellKind.RowTotalHeader && this.rowLevel == undefined;
    };
    XRCrossTabCellViewModel.prototype.isEditable = function () {
        return this.kind() == enums_1.CellKind.Corner || this.kind() == enums_1.CellKind.DataHeader
            || this.kind() == enums_1.CellKind.ColumnTotalHeader || this.kind() == enums_1.CellKind.RowTotalHeader
            || this.kind() == enums_1.CellKind.EmptyHeader || this.kind() == enums_1.CellKind.Empty;
    };
    XRCrossTabCellViewModel.prototype.createAndAssignNewField = function (fieldName, insertBefore, dataFieldLayout) {
        if (dataFieldLayout === void 0) { dataFieldLayout = enums_1.DataFieldLayout.InRow; }
        var increment = insertBefore ? 0 : 1;
        switch (this.kind()) {
            case enums_1.CellKind.ColumnHeader:
                this.parent.insertNewField('columnFields', this.columnLevel + increment, fieldName);
                break;
            case enums_1.CellKind.RowHeader:
                this.parent.insertNewField('rowFields', this.rowLevel + increment, fieldName);
                break;
            case enums_1.CellKind.Data:
                this.parent.insertNewField('dataFields', this.dataLevel + increment, fieldName, dataFieldLayout);
        }
    };
    XRCrossTabCellViewModel.cellKinds = {
        'Header': [enums_1.CellKind.ColumnHeader, enums_1.CellKind.ColumnTotalHeader, enums_1.CellKind.DataHeader, enums_1.CellKind.RowHeader,
            enums_1.CellKind.RowTotalHeader, enums_1.CellKind.Corner],
        'Total': [enums_1.CellKind.RowTotal, enums_1.CellKind.GrandTotal, enums_1.CellKind.ColumnTotal],
        'Data': [enums_1.CellKind.Data]
    };
    return XRCrossTabCellViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRCrossTabCellViewModel = XRCrossTabCellViewModel;
var XRCellsurface = (function (_super) {
    __extends(XRCellsurface, _super);
    function XRCellsurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this.contenttemplate = 'dxrd-crosstab-control-content';
        _this.dropRect = new analytics_elements_1.Rectangle();
        _this.isDropTarget = ko.observable(false);
        _this.dragCss = ko.observable('dxrd-drag-helper-item-allowed');
        _this.selectiontemplate = 'dxrd-crosstab-cell';
        _this._disposables.push(_this.showDropSurface = ko.computed(function () {
            if (!_this.underCursor().isOver) {
                _this.isDropTarget(false);
            }
            return _this.isDropTarget() && _this.underCursor().isOver;
        }));
        return _this;
    }
    XRCellsurface.prototype.checkParent = function (surfaceParent) {
        return this.parent === surfaceParent;
    };
    XRCellsurface.prototype.selectLine = function (selection, event, isRow) {
        if (event === void 0) { event = { ctrlKey: false, metaKey: false }; }
        if (isRow === void 0) { isRow = false; }
        this.parent.selectLine(selection, this.getControlModel(), event.ctrlKey || event.metaKey, isRow);
    };
    XRCellsurface.prototype.cellClick = function () {
        if (settings_1.controlsFactory && settings_1.controlsFactory()) {
            var metadata = settings_1.controlsFactory().controlsMap['XRCrossTabCell'];
            var isBindable = this._control.canRemove();
            if (isBindable) {
                metadata.isDeleteDeny = false;
            }
            else if (!isBindable) {
                metadata.isDeleteDeny = true;
            }
        }
    };
    XRCellsurface.prototype.isEditable = function () {
        var control = this._control;
        return control.isEditable();
    };
    XRCellsurface.prototype._getDropCallback = function (insertBefore, dataFieldLayout) {
        var _this = this;
        if (insertBefore === void 0) { insertBefore = false; }
        if (dataFieldLayout === void 0) { dataFieldLayout = enums_1.DataFieldLayout.InRow; }
        return function (item) {
            var control = _this._control;
            control.createAndAssignNewField(item.path, insertBefore, dataFieldLayout);
        };
    };
    XRCellsurface.prototype._canSetFieldName = function (fullPath) {
        var crossTab = this._control.parentModel();
        var path = analytics_internal_1.getFullPath(crossTab.getPath(''), crossTab['dataMember']());
        var pathLength = path.split('.').length;
        return fullPath.indexOf(path) == 0
            && (pathLength < 2 || fullPath.split('.').length - pathLength == 1);
    };
    XRCellsurface.prototype.getAdornTemplate = function () {
        var result = _super.prototype.getAdornTemplate.call(this);
        if (this._context['validationMode'] && this._context['validationMode']())
            result = xrControl_1.XRControlSurface._appendValue(result, 'dxrd-image-surface-bounded-notvalid', this._control['isBindable']() && this._control['fieldName']() && !this._control['fieldNameAreValid']());
        result = xrControl_1.XRControlSurface._appendValue(result, 'dxrd-image-surface-bounded', this._control['isBindable']() && this._control['fieldName']() && this._control['fieldNameAreValid']);
        result = xrControl_1.XRControlSurface._appendValue(result, 'dxrd-surface-hidden', !this._control['columnVisible']() || !this._control['rowVisible']());
        return result;
    };
    XRCellsurface.prototype.dragCallback = function (item) {
        var _this = this;
        var control = this._control;
        var crossTab = control.parentModel();
        var rect = this.dropRect;
        this.isDropTarget(true);
        rect.left(-1);
        rect.top(-1);
        rect.width(this._width() - 3);
        rect.height(this._height() - 3);
        this.dropCallback = function () { };
        if ((control.kind() == enums_1.CellKind.ColumnHeader || control.kind() == enums_1.CellKind.RowHeader || control.kind() == enums_1.CellKind.Data) && this._canSetFieldName(item.path)) {
            this.dragCss('dxrd-drag-helper-item-allowed');
            var cursor = { x: this.underCursor().x, y: this.underCursor().y };
            if (rect.height() - cursor.y < 7 && control.canDropDown()) {
                rect.top(rect.height() - 3);
                rect.height(7);
                this.dropCallback = this._getDropCallback(false, enums_1.DataFieldLayout.InColumn);
            }
            else if (rect.width() - cursor.x < 7 && control.canDropRight()) {
                rect.left(rect.width() - 3);
                rect.width(7);
                this.dropCallback = this._getDropCallback(false);
            }
            else if (cursor.x < 7 && control.canDropLeft()) {
                if (control._columnIndex() != 0) {
                    rect.height(crossTab.cells().filter(function (x) {
                        return x._columnIndex() == control._columnIndex() - 1 && x.kind() == control.kind();
                    })[0].surface._height() - 3);
                    if (crossTab.layoutOptions.rowTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]) {
                        rect.top(rect.top() - rect.height() + this._height() - 4);
                    }
                }
                else {
                    var grandTotal = crossTab.cells().filter(function (x) {
                        return x.kind() === enums_1.CellKind.RowTotalHeader && x.rowLevel === undefined;
                    })[0];
                    rect.height(grandTotal.surface._y() + grandTotal.surface._height() - this._y() - 3);
                    if (crossTab.layoutOptions.rowTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]) {
                        rect.top(rect.top() - (this._y() - grandTotal.surface._y()));
                        rect.height(this._y() - grandTotal.surface._y() + this._height() - 4);
                    }
                }
                this.dropCallback = this._getDropCallback(true);
                rect.left(-6);
                rect.width(7);
            }
            else if (cursor.y < 7 && control.canDropUp()) {
                if (control._rowIndex() != 0) {
                    rect.width(crossTab.cells().filter(function (x) {
                        return x._rowIndex() == control._rowIndex() - 1 && x.kind() == control.kind();
                    })[0].surface._width() - 3);
                    if (crossTab.layoutOptions.columnTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]) {
                        rect.left(rect.left() - rect.width() + this._width() - 4);
                    }
                }
                else {
                    var grandTotal = crossTab.cells().filter(function (x) {
                        return x.kind() === enums_1.CellKind.ColumnTotalHeader && x.columnLevel === undefined;
                    })[0];
                    rect.width(grandTotal.surface._x() + grandTotal.surface._width() - this._x() - 3);
                    if (crossTab.layoutOptions.columnTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]) {
                        rect.left(rect.left() - (this._x() - grandTotal.surface._x()));
                        rect.width(this._x() - grandTotal.surface._x() + this._width() - 4);
                    }
                }
                this.dropCallback = this._getDropCallback(true);
                rect.top(-6);
                rect.height(7);
            }
            else {
                this.dropCallback = function (item) {
                    if (!control.field()) {
                        _this._getDropCallback(true)(item);
                        return;
                    }
                    control.field()['setFieldName'](item.path);
                };
            }
        }
        else {
            this.dragCss('dxrd-drag-helper-item-forbidden');
        }
    };
    XRCellsurface.prototype.findNextSelection = function () {
        return this.parent;
    };
    return XRCellsurface;
}(xrControl_1.XRControlSurface));
exports.XRCellsurface = XRCellsurface;
