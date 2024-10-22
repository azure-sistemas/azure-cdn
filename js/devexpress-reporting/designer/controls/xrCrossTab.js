﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCrossTab.js)
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
var fields_1 = require("./metadata/crosstab/fields");
var defenitions_1 = require("./metadata/crosstab/defenitions");
var cellCreator_1 = require("./crossTab/cellCreator");
var settings_1 = require("../utils/settings");
var xrCrossTabCell_1 = require("./xrCrossTabCell");
var defenitions_2 = require("./crossTab/defenitions");
var analytics_wizard_internal_1 = require("@devexpress/analytics-core/analytics-wizard-internal");
var style_1 = require("./properties/style");
var style_2 = require("./metadata/properties/style");
var layoutOptions_1 = require("./metadata/crosstab/layoutOptions");
var enums_1 = require("./crossTab/enums");
var controlParameter_1 = require("./properties/controlParameter");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var XRCrossTabViewModel = (function (_super) {
    __extends(XRCrossTabViewModel, _super);
    function XRCrossTabViewModel(model, parent, serializer) {
        var _a;
        if (serializer === void 0) { serializer = new analytics_utils_1.ModelSerializer(); }
        var _this = _super.call(this, model, parent, serializer) || this;
        _this.getPath = function (propertyName) { return _this.dsHelperProvider() && _this.dsHelperProvider().getDataSourcePath(_this['dataSource']()); };
        _this.dependentStyles = [];
        _this._cells = ko.observableArray([]);
        _this._disposables.push(_this.isModelReady = ko.computed(function () { return analytics_internal_1.checkModelReady(_this.root) && !_this.update(); }));
        _this.layoutOptions = new CrossTabLayoutOptionsModel(model['LayoutOptions'] || {}, _this, serializer);
        _this.rowFields = _this._getArray(CrossTabFieldModel, model, 'RowFields', serializer);
        _this.columnFields = _this._getArray(CrossTabFieldModel, model, 'ColumnFields', serializer);
        _this.dataFields = _this._getArray(CrossTabDataFieldModel, model, 'DataFields', serializer);
        _this._rowDefinitions = _this._getArray(defenitions_2.CrossTabRowDefinitionsModel, model, 'RowDefinitions', serializer);
        _this._columnDefinitions = _this._getArray(defenitions_2.CrossTabColumnDefinitionsModel, model, 'ColumnDefinitions', serializer);
        _this.cells = _this._getArray(xrCrossTabCell_1.XRCrossTabCellViewModel, model, 'Cells', serializer);
        _this.controlParameters = analytics_utils_1.deserializeArray(model.Parameters, function (item) { return new controlParameter_1.ControlParameter(item, serializer); });
        _this.controlParameters().forEach(function (x) { return !x.parameter() && !x.dataSource() && x.dataSource(_this.root['dataSource'] && _this.root['dataSource']()); });
        _this.cellCreator = cellCreator_1.CellCreator.createInstance(_this);
        var cells = _this.cellCreator.create();
        _this._cells(_this.applyCells(cells, true));
        (_a = _this._disposables).push.apply(_a, analytics_wizard_internal_1.subscribeProperties([_this.rowFields, _this.columnFields, _this.dataFields]
            .concat(Object.keys(_this.layoutOptions).map(function (x) { return _this.layoutOptions[x]; })), function () {
            _this.updateLayout();
        }));
        _this._disposables.push(ko.computed(function () {
            _this.size.width(_this._calcSize(_this._columnDefinitions()));
        }));
        _this._disposables.push(_this.size.width.subscribe(function (newWidth) {
            var columnDefinitions = _this._columnDefinitions.peek();
            var currentWidth = _this._calcSize(columnDefinitions);
            columnDefinitions.forEach(function (element) {
                element.width(element.width() + (newWidth - currentWidth) * (element.width() / currentWidth));
            });
            _this._columnDefinitions.valueHasMutated();
        }));
        _this._disposables.push(ko.computed(function () {
            _this.size.height(_this._calcSize(_this._rowDefinitions()));
        }));
        _this._disposables.push(_this.size.height.subscribe(function (newHeight) {
            var rowDefinitions = _this._rowDefinitions.peek();
            var currentHeight = _this._calcSize(rowDefinitions);
            rowDefinitions.forEach(function (element) {
                element.height(element.height() + (newHeight - currentHeight) * (element.height() / currentHeight));
            });
            _this._rowDefinitions.valueHasMutated();
        }));
        _this._disposables.push(_this.dataSource.subscribe(function (val) { return _this['dataMember'](null); }));
        _this._disposables.push(_this.controlParameters.subscribe(function (args) {
            args.forEach(function (change) {
                if (!change.value.parameterName()) {
                    change.value.parameterName(analytics_internal_1.getUniqueNameForNamedObjectsArray(_this.controlParameters(), 'controlParameter'));
                }
            });
        }, null, 'arrayChange'));
        var dataMember = ko.pureComputed(function () { return analytics_internal_1.getFullPath(_this.getPath('dataMember'), _this['dataMember']()); });
        var parameters = ko.computed(function () { return _this.controlParameters(); });
        var disabled = ko.pureComputed(function () { return !_this.dataSource(); });
        _this.filterString = new analytics_widgets_1.FilterStringOptions(_this._filterString, dataMember, disabled);
        _this.filterString.helper.parameters = parameters;
        _this._disposables.push(dataMember);
        _this._disposables.push(disabled);
        _this._disposables.push(parameters);
        return _this;
    }
    XRCrossTabViewModel.prototype._getCreator = function (type, serializer, name) {
        var _this = this;
        return function (item) { return new type(item || {}, _this, serializer, name); };
    };
    XRCrossTabViewModel.prototype._getArray = function (type, model, name, serializer) {
        return analytics_utils_1.deserializeArray(model[name], this._getCreator(type, serializer, this.getNames()[name[0].toLowerCase() + name.slice(1)]));
    };
    XRCrossTabViewModel.prototype._initStyles = function (root) {
        var _this = this;
        if (root && root.styles) {
            style_2.crossTabStyles.forEach(function (style) {
                var styleName = _this[style.propertyName]();
                if (!styleName) {
                    var newStyle = new style_1.StyleModel(style_2.crossTabStylesDefaults[style.propertyName]);
                    styleName = analytics_internal_1.getUniqueNameForNamedObjectsArray(root.styles(), newStyle.name());
                    newStyle.name(styleName);
                    root.styles.push(newStyle);
                    _this[style.propertyName](styleName);
                }
            });
        }
    };
    XRCrossTabViewModel.prototype._calcSize = function (defenition) {
        var result = 0;
        defenition.forEach(function (element) {
            result += element[(element instanceof defenitions_2.CrossTabColumnDefinitionsModel ? 'width' : 'height')]();
        });
        return result;
    };
    XRCrossTabViewModel.prototype.removeChild = function (cell) {
        if (cell.canRemove()) {
            this.removeField(cell.dataLevel, cell.columnLevel, cell.rowLevel);
        }
    };
    XRCrossTabViewModel.prototype.removeField = function (dataLevel, columnLevel, rowLevel) {
        if (dataLevel > -1) {
            this.dataFields.splice(dataLevel, 1);
        }
        else if (columnLevel > -1) {
            this.columnFields.splice(columnLevel, 1);
        }
        else if (rowLevel > -1) {
            this.rowFields.splice(rowLevel, 1);
        }
    };
    XRCrossTabViewModel.prototype.initialize = function () {
        var _this = this;
        this._disposables.push(this.parentModel.subscribe(function (model) { model && _this._initStyles(_this.root); }));
        this.parentModel() && this._initStyles(this.root);
    };
    XRCrossTabViewModel.prototype.updateLayout = function () {
        if (this.update())
            return;
        var undo = analytics_utils_1.UndoEngine.tryGetUndoEngine(this);
        undo && undo.start();
        this.update(true);
        this.defenitionUpdater = new defenitions_2.DefenitionUpdater(this);
        this.cellCreator = cellCreator_1.CellCreator.createInstance(this);
        var cells = this.cellCreator.create();
        var modelCells = this.applyCells(cells);
        this._cells(modelCells);
        var defs = this.defenitionUpdater.update(modelCells, defenitions_1.crossTabCellWidth.defaultVal, defenitions_1.crossTabCellHeight.defaultVal);
        var sumWidth = defs.columnDefs.reduce(function (acc, value) {
            acc += value.width();
            return acc;
        }, 0);
        var sumHeight = defs.rowDefs.reduce(function (acc, value) {
            acc += value.height();
            return acc;
        }, 0);
        var maxWidth = Math.min(sumWidth, Math.max(this.size.width(), this.parentModel().size.width() - this.location.x()));
        this._columnDefinitions(defs.columnDefs);
        this._rowDefinitions(defs.rowDefs);
        this.size.width(maxWidth);
        if (ko.isObservable(this.size.width))
            this.size.width.valueHasMutated();
        this.size.height(sumHeight);
        this.update(false);
        var undo = analytics_utils_1.UndoEngine.tryGetUndoEngine(this);
        undo && undo.end();
    };
    XRCrossTabViewModel.prototype.getNames = function () {
        return {
            'columnFields': analytics_internal_1.getLocalization('Column Field', 'DevExpress.XtraReports.UI.CrossTab.CrossTabColumnField'),
            'rowFields': analytics_internal_1.getLocalization('Row Field', 'DevExpress.XtraReports.UI.CrossTab.CrossTabRowField'),
            'dataFields': analytics_internal_1.getLocalization('Data Field', 'DevExpress.XtraReports.UI.CrossTab.CrossTabDataField')
        };
    };
    XRCrossTabViewModel.prototype.onDelete = function () {
        var _this = this;
        var root = this.root;
        this.dependentStyles = [];
        style_2.crossTabStyles.forEach(function (style) {
            if (root.stylesHelper()) {
                var targetStyle = root.stylesHelper().removeUnusedStyle(_this[style.propertyName]());
                targetStyle && _this.dependentStyles.push(targetStyle);
            }
            else {
                targetStyle = root.findStyle(_this[style.propertyName]());
                targetStyle && root.styles.remove(targetStyle) && _this.dependentStyles.push(targetStyle);
            }
        });
    };
    XRCrossTabViewModel.prototype.preInitProperties = function () {
        var _this = this;
        var info = this.getInfo();
        this.getInfo = function () {
            info.forEach(function (item) {
                var type;
                if (item.propertyName === 'rowFields' || item.propertyName === 'columnFields')
                    type = CrossTabFieldModel;
                else if (item.propertyName === 'dataFields')
                    type = CrossTabDataFieldModel;
                if (type)
                    item.addHandler = _this._getCreator(type, new analytics_utils_1.ModelSerializer(), _this.getNames()[item.propertyName]);
            });
            return info;
        };
    };
    XRCrossTabViewModel.prototype.isPropertyDisabled = function (propertyName) {
        if (this.dataSource() === null) {
            return propertyName === 'dataMember' || propertyName === 'filterString';
        }
    };
    XRCrossTabViewModel.prototype.applyCells = function (cellsInfo, initOnly) {
        var _this = this;
        if (initOnly === void 0) { initOnly = false; }
        var newCells = [];
        var oldCells = [];
        cellsInfo.forEach(function (cell, index) {
            var currentCell;
            cell.dependentFields = [_this.dataFields()[cell.dataLevel], _this.rowFields()[cell.rowLevel], _this.columnFields()[cell.columnLevel]];
            if (initOnly)
                currentCell = defenitions_2.findcells(_this.cells(), cell._columnIndex(), cell._rowIndex())[0];
            else
                currentCell = _this.cells().filter(function (x) {
                    if (x.kind() != cell.kind())
                        return false;
                    for (var i = 0; i < x.dependentFields.length; i++) {
                        if (x.dependentFields[i] != cell.dependentFields[i])
                            return false;
                    }
                    return true;
                })[0];
            if (!currentCell) {
                currentCell = settings_1.controlsFactory().createControl(settings_1.controlsFactory().controlsMap['XRCrossTabCell'].defaultVal, _this);
                newCells.push(currentCell);
            }
            else {
                currentCell.reset();
                oldCells.push(currentCell);
            }
            _this.applyCell(cell, currentCell);
        });
        for (var i = this.cells().length - 1; i >= 0; i--) {
            if (oldCells.indexOf(this.cells()[i]) == -1) {
                this.cells()[i].dispose();
                this.cells.splice(i, 1);
            }
        }
        newCells.forEach(function (x) { return _this.cells.push(x); });
        return oldCells.concat(newCells);
    };
    XRCrossTabViewModel.prototype.applyCell = function (from, to) {
        var info = from.getInfo();
        info.forEach(function (item) {
            to[item.propertyName](from[item.propertyName]());
        });
        ['dataLevel', 'rowLevel', 'columnLevel'].forEach(function (key) {
            if (from[key] != null)
                to[key] = from[key];
        });
        if (from.field)
            to.field(from.field());
        else if (to.field && to.field())
            to.field(null);
        to.kind(from.kind());
        to.dependentFields = from.dependentFields;
    };
    XRCrossTabViewModel.prototype.insertNewField = function (collectionName, insertPosition, fieldName, dataFieldLayout) {
        var newField = this.getInfo().filter(function (x) { return x.propertyName === collectionName; })[0].addHandler();
        dataFieldLayout && this.layoutOptions.dataFieldLayout(enums_1.DataFieldLayout[dataFieldLayout]);
        this[collectionName].splice(insertPosition, 0, newField);
        newField && newField.setFieldName(fieldName);
    };
    return XRCrossTabViewModel;
}(xrControl_1.XRControlViewModel));
exports.XRCrossTabViewModel = XRCrossTabViewModel;
var CrossTabLayoutOptionsModel = (function (_super) {
    __extends(CrossTabLayoutOptionsModel, _super);
    function CrossTabLayoutOptionsModel(model, parent, serializer) {
        var _this = _super.call(this, model, serializer) || this;
        _this.parent = parent;
        return _this;
    }
    CrossTabLayoutOptionsModel.prototype.isPropertyDisabled = function (name) {
        switch (name) {
            case 'cornerHeaderDisplayMode':
                return this.parent.rowFields().length == 0 && this.parent.columnFields().length == 0;
            case 'dataFieldLayout':
                return this.parent.dataFields().length < 2;
            case 'columnTotalsPosition':
                return this.parent.columnFields().length < 1;
            case 'rowTotalsPosition':
                return this.parent.rowFields().length == 0 || this.hierarchicalRowLayout();
            case 'columnTotalHeaderPosition':
                return this.parent.columnFields().length < 2;
            case 'rowTotalHeaderPosition':
                return this.parent.rowFields().length < 2;
            case 'hierarchicalRowLayout':
                return this.parent.rowFields().length < 2 || this.rowTotalsPosition() === enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData];
        }
    };
    CrossTabLayoutOptionsModel.prototype.getInfo = function () { return layoutOptions_1.crossTabLayoutOptionsInfo; };
    return CrossTabLayoutOptionsModel;
}(analytics_elements_1.SerializableModel));
exports.CrossTabLayoutOptionsModel = CrossTabLayoutOptionsModel;
var CrossTabFieldModel = (function (_super) {
    __extends(CrossTabFieldModel, _super);
    function CrossTabFieldModel(model, parent, serializer, name) {
        var _this = _super.call(this, model, serializer) || this;
        _this.getPath = function (propertyName) { return analytics_internal_1.getFullPath(_this.parent.getPath('dataMember'), _this.parent['dataMember']()); };
        _this.isPropertyDisabled = function (propertyName) { return propertyName == 'fieldName' && _this.parent.dataSource() == null; };
        _this.parent = parent;
        _this._disposables.push(_this.name = ko.pureComputed(function () {
            if (_this.fieldName())
                return name + ' (' + _this.fieldName() + ')';
            return name;
        }));
        if (_this.crossTabSortBySummaryInfo)
            _this.crossTabSortBySummaryInfo.getPath = function (propertyName) { return _this.getPath(propertyName); };
        return _this;
    }
    CrossTabFieldModel.prototype.setFieldName = function (fullPath) {
        var parts = fullPath.split('.');
        var dsHelper = this.parent.dsHelperProvider && this.parent.dsHelperProvider();
        if (dsHelper && parts.length >= 2) {
            var dataSource;
            if (this.parent.getPath('') === parts[0])
                dataSource = this.parent['dataSource']();
            else {
                dataSource = dsHelper && (dsHelper.findDataSourceInfoByID(parts[0])
                    || dsHelper.findDataSourceInfoByRef(parts[0]));
                dataSource && this.parent['dataSource'](dataSource.data);
            }
            dataSource && this.parent['dataMember'](parts.slice(1, -1).join('.'));
        }
        this.fieldName(parts.pop());
    };
    CrossTabFieldModel.prototype.getInfo = function () { return fields_1.crossTabGroupFieldInfo; };
    return CrossTabFieldModel;
}(analytics_elements_1.SerializableModel));
exports.CrossTabFieldModel = CrossTabFieldModel;
var CrossTabDataFieldModel = (function (_super) {
    __extends(CrossTabDataFieldModel, _super);
    function CrossTabDataFieldModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrossTabDataFieldModel.prototype.getInfo = function () { return fields_1.crossTabDataFieldInfo; };
    return CrossTabDataFieldModel;
}(CrossTabFieldModel));
exports.CrossTabDataFieldModel = CrossTabDataFieldModel;
var XRCrossTabSurface = (function (_super) {
    __extends(XRCrossTabSurface, _super);
    function XRCrossTabSurface(control, context) {
        var _this = _super.call(this, control, context) || this;
        _this.controls = ko.observableArray();
        _this._disposables.push(analytics_internal_1.createObservableArrayMapCollection(control.cells, _this.controls, function (item) { return new xrCrossTabCell_1.XRCellsurface(item, context); }));
        _this.selectiontemplate = 'dxrd-crosstab';
        return _this;
    }
    XRCrossTabSurface.prototype.selectLine = function (selection, cell, isMultiSelect, isRow) {
        if (!isMultiSelect)
            selection.initialize(this);
        var model = this.getControlModel();
        var surface = cell.surface;
        var cells;
        if (isRow)
            cells = defenitions_2.findcells(model.cells(), null, cell._rowIndex());
        else
            cells = defenitions_2.findcells(model.cells(), cell._columnIndex());
        cells.forEach(function (cell) {
            if (isMultiSelect) {
                selection.selectionWithCtrl(cell.surface);
                selection.applySelection();
            }
            else
                selection.selecting({ control: cell.surface, cancel: false });
        });
        if (!isMultiSelect)
            selection.swapFocusedItem(surface);
    };
    return XRCrossTabSurface;
}(xrControl_1.XRControlSurface));
exports.XRCrossTabSurface = XRCrossTabSurface;
