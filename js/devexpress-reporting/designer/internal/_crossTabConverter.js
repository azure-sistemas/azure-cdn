﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_crossTabConverter.js)
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
var xrCrossTab_1 = require("../controls/xrCrossTab");
var xrPivotgrid_1 = require("../controls/xrPivotgrid");
var settings_1 = require("../utils/settings");
var _baseConverter_1 = require("./_baseConverter");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var enums_1 = require("../controls/crossTab/enums");
var xrChart_1 = require("../controls/xrChart");
var xrCrossTabCell_1 = require("../controls/xrCrossTabCell");
var _styleHelper_1 = require("../helpers/_styleHelper");
var pivotgridfield_1 = require("../controls/metadata/pivotgrid/pivotgridfield");
var style_1 = require("../controls/properties/style");
var _controlConverterService_1 = require("../services/_controlConverterService");
var CrossTabConverter = (function (_super) {
    __extends(CrossTabConverter, _super);
    function CrossTabConverter(_selectionProvider, _context) {
        var _this = _super.call(this) || this;
        _this._selectionProvider = _selectionProvider;
        _this._context = _context;
        _this._detailLink = 'https://docs.devexpress.com/XtraReports/DevExpress.XtraReports.UI.XRPivotGrid#convert-to-the-cross-tab-control';
        _this.popupOptions.height = 316;
        _this.popupOptions.confirmMessage = analytics_utils_1.getLocalization('The Cross Tab control does not support specific Pivot Grid functionality. Do you want to continue?', 'ASPxReportsStringId.ReportDesigner_ConvertPivotGridToCrossTab_Message_Confirmation');
        _this.popupOptions.infoMessage = analytics_utils_1.getLocalization("You can use the 'Revert to Original Pivot Grid' action in the Cross Tab properties window to restore the Pivot Grid control.", 'ASPxReportsStringId.ReportDesigner_ConvertPivotGridToCrossTab_Message_Info');
        _this.popupOptions.linkText = analytics_utils_1.getLocalization('[More infomation about Cross Tab conversion]', 'ASPxReportsStringId.ReportDesigner_ConvertPivotGridToCrossTab_Message_LinkText');
        _this.popupOptions.linkUrl = _this._detailLink;
        return _this;
    }
    CrossTabConverter.prototype._applyChanges = function () {
        this._warnings = [];
        var pivotGrid = this._model;
        this._undoEngine = analytics_utils_1.UndoEngine.tryGetUndoEngine(pivotGrid);
        this._undoEngine && this._undoEngine.start();
        var crossTab = settings_1.controlsFactory().createControl(settings_1.controlsFactory().controlsMap['XRCrossTab'].defaultVal, pivotGrid.parentModel());
        pivotGrid.getInfo().forEach(function (item) {
            if (crossTab[item.propertyName] && ko.isObservable(pivotGrid[item.propertyName]))
                crossTab[item.propertyName](pivotGrid[item.propertyName]());
        });
        crossTab.location.x(pivotGrid.location.x());
        crossTab.location.y(pivotGrid.location.y());
        crossTab.name('CrossTab_' + pivotGrid.name());
        this._convertOptions(pivotGrid, crossTab);
        var convertedFields = this._convertFields(pivotGrid, crossTab);
        this._convertStyles(pivotGrid, crossTab, convertedFields);
        this._applyVisibility(pivotGrid, crossTab);
        this._applyText(pivotGrid, crossTab);
        this._validateChartLinked(pivotGrid);
        if (ko.isObservable(crossTab.size.width))
            crossTab.size.width.valueHasMutated();
        this._saveOriginalLayout(pivotGrid, crossTab);
    };
    CrossTabConverter.prototype._convertStyles = function (pivotGrid, crossTab, convertedFields) {
        var _this = this;
        var root = crossTab.root;
        var resultStyleGroups = [];
        crossTab.cells().forEach(function (cell) {
            var deafultStyle = root.findStyle(cell.styleName());
            var cellStyle = _styleHelper_1.StylesHelper.generateStyle(deafultStyle);
            _this._applyStyles(pivotGrid, cell, cellStyle);
            pivotGrid.fields().forEach(function (field) { return cell.field() == convertedFields[field.name()] && _this._applyStyles(field, cell, cellStyle); });
            cellStyle = _styleHelper_1.StylesHelper.styleEqualityComparer(deafultStyle, cellStyle) ? deafultStyle : cellStyle;
            var styleAdded = false;
            for (var _i = 0, resultStyleGroups_1 = resultStyleGroups; _i < resultStyleGroups_1.length; _i++) {
                var group = resultStyleGroups_1[_i];
                if (group.style == cellStyle) {
                    group.cells.push(cell);
                    styleAdded = true;
                    break;
                }
            }
            !styleAdded && resultStyleGroups.push({ style: cellStyle, cells: [cell] });
        });
        crossTab.onDelete();
        if (resultStyleGroups.length === 1) {
            this._prepareGeneralStyle(resultStyleGroups, crossTab, root);
            return;
        }
        if (resultStyleGroups.length === 3)
            if (this._prepareStandardStyles(resultStyleGroups, crossTab, root))
                return;
        this._prepareNoStyles(resultStyleGroups, crossTab);
    };
    CrossTabConverter.prototype._prepareNoStyles = function (resultStyleGroups, crossTab) {
        resultStyleGroups.forEach(function (group) { return group.cells.forEach(function (x) { return _styleHelper_1.stylesProperties.forEach(function (element) {
            var value = group.style[element] && group.style.isPropertyModified(element) && group.style[element]();
            if (value) {
                x[element](group.style[element]());
            }
        }); }); });
        crossTab['generalStyleName']('');
        crossTab['headerAreaStyleName']('');
        crossTab['dataAreaStyleName']('');
        crossTab['totalAreaStyleName']('');
    };
    CrossTabConverter.prototype._prepareGeneralStyle = function (resultStyleGroups, crossTab, root) {
        var generalStyle = resultStyleGroups[0].style;
        generalStyle.name(crossTab['generalStyleName']());
        root.styles.push(generalStyle);
        crossTab['headerAreaStyleName']('');
        crossTab['dataAreaStyleName']('');
        crossTab['totalAreaStyleName']('');
    };
    CrossTabConverter.prototype._prepareStandardStyles = function (resultStyleGroups, crossTab, root) {
        var headerStyle = analytics_internal_1.findFirstItemMatchesCondition(resultStyleGroups, function (item) {
            return item.cells.every(function (x) { return xrCrossTabCell_1.XRCrossTabCellViewModel.cellKinds.Header.indexOf(x.kind()) !== -1; });
        }).style;
        headerStyle.name(crossTab['headerAreaStyleName']());
        if (!headerStyle)
            return false;
        var dataStyle = analytics_internal_1.findFirstItemMatchesCondition(resultStyleGroups, function (item) {
            return item.cells.every(function (x) { return xrCrossTabCell_1.XRCrossTabCellViewModel.cellKinds.Data.indexOf(x.kind()) !== -1; });
        }).style;
        dataStyle.name(crossTab['dataAreaStyleName']());
        if (!dataStyle)
            return false;
        var totalStyle = analytics_internal_1.findFirstItemMatchesCondition(resultStyleGroups, function (item) {
            return item.cells.every(function (x) { return xrCrossTabCell_1.XRCrossTabCellViewModel.cellKinds.Total.indexOf(x.kind()) !== -1; });
        }).style;
        if (!totalStyle)
            return false;
        totalStyle.name(crossTab['totalAreaStyleName']());
        crossTab['generalStyleName']('');
        root.styles.push(headerStyle, dataStyle, totalStyle);
        return true;
    };
    CrossTabConverter.prototype._applyStyles = function (source, cell, cellStyle) {
        xrCrossTabCell_1.XRCrossTabCellViewModel.cellKinds.Header.indexOf(cell.kind()) == -1 && this._applyStyle(source.appearances.cellAppearance, cell);
        if (cell.kind() == enums_1.CellKind.Corner || cell.kind() == enums_1.CellKind.DataHeader) {
            this._applyStyle(source.appearances.fieldHeaderAppearance, cellStyle);
        }
        if (cell.kind() === enums_1.CellKind.Data) {
            this._applyStyle(source.appearances.cellAppearance, cellStyle);
        }
        else if (cell.isBindable()) {
            this._applyStyle(source.appearances.fieldValueAppearance, cellStyle);
        }
        if (cell.kind() == enums_1.CellKind.RowTotalHeader || cell.kind() == enums_1.CellKind.ColumnTotalHeader) {
            this._applyStyle(source.appearances.fieldValueTotalAppearance, cellStyle);
            if (cell.rowLevel === undefined && cell.columnLevel == undefined) {
                this._applyStyle(source.appearances.fieldValueGrandTotalAppearance, cellStyle);
            }
        }
        if (cell.kind() == enums_1.CellKind.GrandTotal && (cell.rowLevel === undefined || cell.columnLevel == undefined) ||
            cell.kind() == enums_1.CellKind.RowTotal && cell.rowLevel == undefined || cell.kind() == enums_1.CellKind.ColumnTotal && cell.columnLevel == undefined) {
            this._applyStyle(source.appearances.grandTotalCellAppearance, cellStyle);
        }
        else if (cell.kind() == enums_1.CellKind.RowTotal || cell.kind() == enums_1.CellKind.ColumnTotal) {
            this._applyStyle(source.appearances.totalCellAppearance, cellStyle);
        }
    };
    CrossTabConverter.prototype._applyStyle = function (style, target) {
        pivotgridfield_1.appearanceInfo.forEach(function (element) {
            var propertyName = element.propertyName;
            if (propertyName == 'textOptions') {
                var result = '';
                var vertical = style.textOptions.textVerticalAlignment();
                if (vertical == 'Center')
                    result += 'Middle';
                else if (vertical != 'Default')
                    result += vertical;
                var horizontal = style.textOptions.textHorizontalAlignment();
                if (horizontal == 'Near')
                    result += 'Left';
                if (horizontal == 'Far')
                    result += 'Right';
                if (horizontal == 'Center')
                    result = 'Center';
                result && target['textAlignment'](result);
            }
            else {
                var value = style[propertyName] && style[propertyName]() && style[propertyName]();
                if (value && value != style_1.StyleModel.defaults[propertyName]) {
                    target[propertyName](value);
                }
            }
        });
    };
    CrossTabConverter.prototype._convertOptions = function (pivotGrid, crossTab) {
        crossTab.layoutOptions.columnTotalsPosition(pivotGrid['optionsView'].columnTotalsLocation() === 'Far' ?
            enums_1.TotalsPosition[enums_1.TotalsPosition.AfterData] : enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]);
        crossTab.layoutOptions.rowTotalsPosition(pivotGrid['optionsView'].rowTotalsLocation() === 'Far' ?
            enums_1.TotalsPosition[enums_1.TotalsPosition.AfterData] : enums_1.TotalsPosition[enums_1.TotalsPosition.BeforeData]);
        crossTab['printOptions'].printTotalsForSingleValues(pivotGrid['optionsView'].showTotalsForSingleValues());
        crossTab['printOptions'].repeatColumnHeaders(pivotGrid['optionsPrint'].printColumnAreaOnEveryPage());
        crossTab['printOptions'].repeatRowHeaders(pivotGrid['optionsPrint'].printRowAreaOnEveryPage());
        crossTab.layoutOptions.dataFieldLayout(pivotGrid['optionsDataField'].area() === 'RowArea'
            ? enums_1.DataFieldLayout[enums_1.DataFieldLayout.InColumn] : enums_1.DataFieldLayout[enums_1.DataFieldLayout.InRow]);
    };
    CrossTabConverter.prototype._convertFields = function (pivotGrid, crossTab) {
        var _this = this;
        var convertedFields = {};
        var addField = function (type, pivotField) {
            var field = crossTab.getInfo().filter(function (info) { return info.propertyName === type; })[0].addHandler();
            _this._copyPropertiesToField(field, pivotField);
            crossTab[type].push(field);
            var dependentCell = crossTab.cells().filter(function (cell) { return cell.field() == field; })[0];
            dependentCell.size.width(pivotField['width']());
            convertedFields[pivotField.name()] = field;
        };
        pivotGrid.fields().forEach(function (x) {
            if (x['unboundExpression']()) {
                _this._warnings.push(analytics_internal_1.formatUnicorn('Cannot convert Field {0} - unbound expression is not supported', x.name()));
            }
            else {
                if (x.area() == 'ColumnArea')
                    addField('columnFields', x);
                else if (x.area() == 'RowArea')
                    addField('rowFields', x);
                else if (x.area() == 'DataArea')
                    addField('dataFields', x);
                else
                    _this._warnings.push(analytics_internal_1.formatUnicorn('Cannot convert Field {0} - area is not supported', x.name()));
            }
        });
        return convertedFields;
    };
    CrossTabConverter.prototype._copyPropertiesToField = function (crossTabField, pivotField) {
        crossTabField.fieldName(pivotField.fieldName());
        if (crossTabField instanceof xrCrossTab_1.CrossTabDataFieldModel) {
            if (pivotField.summaryType() != 'Custom') {
                crossTabField['summaryType'](pivotField.summaryType());
                crossTabField['summaryDisplayType'](pivotField.summaryDisplayType());
            }
            else
                this._warnings.push(analytics_internal_1.formatUnicorn('Pivot Field {0} with a Custom Summary Type is not supported.', pivotField.fieldName()));
        }
        else {
            if (pivotField.groupInterval() != 'Custom') {
                crossTabField.crossTabGroupInterval(pivotField.groupInterval());
                crossTabField.crossTabGroupIntervalNumericRange(pivotField.groupIntervalNumericRange());
            }
            else {
                this._warnings.push(analytics_internal_1.formatUnicorn('Pivot Field {0} with a Custom Group Interval is not supported.', pivotField.fieldName()));
            }
            crossTabField.sortOrder(pivotField.sortOrder() === 'Ascending' ? 'Ascending' : 'Descending');
            if (pivotField.sortBySummaryInfo.summaryType() != 'Custom') {
                crossTabField.crossTabSortBySummaryInfo.fieldName(pivotField.sortBySummaryInfo.fieldName());
                crossTabField.crossTabSortBySummaryInfo.summaryType(pivotField.sortBySummaryInfo.summaryType());
            }
            else {
                this._warnings.push(analytics_internal_1.formatUnicorn('Pivot Field {0} with a Custom Summary Type is not supported.', pivotField.fieldName()));
            }
        }
    };
    CrossTabConverter.prototype._saveOriginalLayout = function (pivotGrid, crossTab) {
        var _this = this;
        var originalDataSource = pivotGrid.dataSource();
        var originalDataMember = pivotGrid.dataMember();
        pivotGrid.dataSource(null);
        pivotGrid.dataMember(null);
        var layout = new analytics_utils_1.ModelSerializer().serialize(pivotGrid);
        _controlConverterService_1.ControlConverterService.getXmlStringFromJson(layout, function (result) {
            var parentControls = pivotGrid.parentModel()['controls'];
            crossTab.originalPivotGridLayout(result);
            parentControls.splice(parentControls.indexOf(pivotGrid), 1, crossTab);
            _this._selectionProvider.focused(crossTab.surface);
            _this.popupOptions.visible(false);
            _this._warnings.forEach(function (x) { return console.warn(x); });
            pivotGrid.dataSource(originalDataSource);
            pivotGrid.dataMember(originalDataMember);
            _this._undoEngine && _this._undoEngine.end();
        }, function (error) {
            _this._undoEngine && _this._undoEngine.end();
            _this._undoEngine && _this._undoEngine.undo();
        });
    };
    CrossTabConverter.prototype._applyVisibility = function (pivotGrid, crossTab) {
        crossTab.cells().forEach(function (cell) {
            if ((!pivotGrid['optionsView'].showColumnTotals() && cell.kind() == enums_1.CellKind.ColumnTotalHeader && cell.columnLevel !== undefined)
                || (!pivotGrid['optionsView'].showColumnGrandTotals() && cell.kind() == enums_1.CellKind.ColumnTotalHeader && cell.columnLevel === undefined)) {
                cell.columnVisible(false);
            }
            if ((!pivotGrid['optionsView'].showRowTotals() && cell.rowLevel !== undefined && cell.kind() == enums_1.CellKind.RowTotalHeader)
                || (!pivotGrid['optionsView'].showRowGrandTotals() && cell.rowLevel === undefined && cell.kind() == enums_1.CellKind.RowTotalHeader)) {
                cell.rowVisible(false);
            }
        });
    };
    CrossTabConverter.prototype._applyText = function (pivotGrid, crossTab) {
        var _this = this;
        crossTab.cells().forEach(function (cell) {
            var cellKind = cell.kind();
            var formatInfo;
            var pivotGridFieldItem = _this._findRelatedPivotGridItem(pivotGrid, cell.dataLevel, cell.columnLevel, cell.rowLevel);
            if (cellKind == enums_1.CellKind.ColumnHeader || cellKind == enums_1.CellKind.RowHeader) {
                formatInfo = pivotGridFieldItem.valueFormat;
            }
            else if ((cellKind === enums_1.CellKind.ColumnTotalHeader && cell.columnLevel !== undefined)
                || (cellKind === enums_1.CellKind.RowTotalHeader && cell.rowLevel !== undefined)) {
                formatInfo = !!pivotGridFieldItem.totalValueFormat.formatString() ? pivotGridFieldItem.totalValueFormat : {
                    formatType: ko.observable('Numeric'),
                    formatString: ko.observable('{0} Total')
                };
            }
            else {
                if (pivotGridFieldItem) {
                    var isTotal = cellKind === enums_1.CellKind.RowTotal || cellKind === enums_1.CellKind.ColumnTotal;
                    var isGrandTotal = cellKind === enums_1.CellKind.GrandTotal;
                    var cellFormat = !pivotGridFieldItem.cellFormat.formatString() ? null : pivotGridFieldItem.cellFormat;
                    var totalCellFormat = !pivotGridFieldItem.totalCellFormat.formatString() ? cellFormat : pivotGridFieldItem.totalCellFormat;
                    if (isGrandTotal)
                        cellFormat = !pivotGridFieldItem.grandTotalCellFormat.formatString() ? totalCellFormat : pivotGridFieldItem.grandTotalCellFormat;
                    if (isTotal)
                        cellFormat = totalCellFormat || cellFormat;
                    if (cellFormat == null || !cellFormat.formatString()) {
                        if (pivotGridFieldItem.summaryDisplayType().indexOf('Percent') === 0) {
                            cellFormat = {
                                formatType: ko.observable('Numeric'),
                                formatString: ko.observable('{0:p}')
                            };
                        }
                        else {
                            if (pivotGridFieldItem.summaryDisplayType().indexOf('Index') === 0)
                                cellFormat = {
                                    formatType: ko.observable('Numeric'),
                                    formatString: ko.observable('{0:f2}')
                                };
                            else if (pivotGridFieldItem.summaryType() !== 'Count' && pivotGridFieldItem.summaryType() !== 'CountDistinct' && pivotGridFieldItem.summaryDisplayType().indexOf('RankIn') === -1) {
                                var fieldType = pivotGridFieldItem.getFieldType();
                                if (['Float', 'Double', 'Decimal'].some(function (x) { return x === fieldType; }) && ((pivotGridFieldItem.groupInterval() !== 'Default' || !!pivotGridFieldItem.unboundExpression()) || pivotGridFieldItem.unboundType() === 'Decimal'))
                                    cellFormat = {
                                        formatType: ko.observable('Numeric'),
                                        formatString: ko.observable('{0:c}')
                                    };
                            }
                        }
                    }
                    formatInfo = cellFormat;
                }
            }
            if (formatInfo && formatInfo.formatType() !== 'None' && formatInfo.formatString()) {
                cell.textFormatString(formatInfo.formatString());
            }
            if (cellKind == enums_1.CellKind.Corner || cellKind == enums_1.CellKind.DataHeader) {
                if (pivotGridFieldItem.caption && pivotGridFieldItem.caption())
                    cell.text(pivotGridFieldItem.caption());
            }
        });
    };
    CrossTabConverter.prototype._findRelatedPivotGridItem = function (pivotGrid, dataLevel, columnLevel, rowLevel) {
        if (dataLevel > -1) {
            return pivotGrid.fields().filter(function (x) { return x.area() === 'DataArea'; })[dataLevel];
        }
        else if (columnLevel > -1) {
            return pivotGrid.fields().filter(function (x) { return x.area() === 'ColumnArea'; })[columnLevel];
        }
        else if (rowLevel > -1) {
            return pivotGrid.fields().filter(function (x) { return x.area() === 'RowArea'; })[rowLevel];
        }
    };
    CrossTabConverter.prototype._validateChartLinked = function (pivotGrid) {
        var _this = this;
        var controlsHelper = this._context() && this._context().controlsHelper;
        controlsHelper && controlsHelper.allControls().forEach(function (control) {
            if (control instanceof xrChart_1.XRChartViewModel) {
                if (control.dataSource() == pivotGrid) {
                    _this._warnings.push(analytics_internal_1.formatUnicorn('Chart {0} uses PivotGrid as a DataSource, but the CrossTab can not be linked with Chart.', control.name()));
                }
            }
        });
    };
    return CrossTabConverter;
}(_baseConverter_1.BaseConverter));
exports.CrossTabConverter = CrossTabConverter;
var PivotGridConverter = (function (_super) {
    __extends(PivotGridConverter, _super);
    function PivotGridConverter(_selectionProvider) {
        var _this = _super.call(this) || this;
        _this._selectionProvider = _selectionProvider;
        _this.popupOptions.confirmMessage = analytics_utils_1.getLocalization('All changes made to the Cross Tab will be lost. ' +
            'Do you want to continue?', 'ReportStringId.UD_Msg_RevertCrossTabToPivotGrid');
        _this.popupOptions.height = 240;
        return _this;
    }
    PivotGridConverter.prototype._applyChanges = function () {
        var _this = this;
        var model = this._model;
        if (!model.originalPivotGridLayout())
            return;
        _controlConverterService_1.ControlConverterService.getControlModelFromXmlString(model.originalPivotGridLayout(), function (result) {
            var parentControls = model.parentModel()['controls'];
            var pivotGrid = new xrPivotgrid_1.XRPivotGridViewModel(result, model.parentModel());
            pivotGrid.location.x(model.location.x());
            pivotGrid.location.y(model.location.y());
            pivotGrid.dataSource(model.dataSource());
            pivotGrid.dataMember(model['dataMember']());
            parentControls.splice(parentControls.indexOf(model), 1, pivotGrid);
            model.onDelete();
            _this._selectionProvider.focused(pivotGrid.surface);
            _this.popupOptions.visible(false);
        }, function (error) { });
    };
    return PivotGridConverter;
}(_baseConverter_1.BaseConverter));
exports.PivotGridConverter = PivotGridConverter;
