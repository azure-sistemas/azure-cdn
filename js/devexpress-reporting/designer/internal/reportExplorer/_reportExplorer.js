﻿/**
* DevExpress HTML/JS Reporting (designer\internal\reportExplorer\_reportExplorer.js)
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
var xrBand_1 = require("../../bands/xrBand");
var xrReportelement_1 = require("../../controls/xrReportelement");
var xrReport_1 = require("../../controls/xrReport");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ReportExplorerModel = (function (_super) {
    __extends(ReportExplorerModel, _super);
    function ReportExplorerModel(reportModel, editableObject, clickHandler, dragDropHandler, selection) {
        var _this = _super.call(this) || this;
        _this._disposables.push(_this.itemsProvider = new analytics_internal_1.ObjectExplorerProvider([{ model: reportModel, name: 'Report', displayName: analytics_utils_1.getLocalization('Report', 'ASPxReportsStringId.DocumentViewer_RibbonReportGroupText'), className: 'master_report', data: reportModel },
            { model: ko.pureComputed(function () { return reportModel() && reportModel().styles(); }), name: 'Styles', displayName: analytics_utils_1.getLocalization('Styles', 'DevExpress.XtraReports.UI.XRPivotGrid.Styles'), className: 'styles' },
            { model: ko.pureComputed(function () { return reportModel() && reportModel().formattingRuleSheet(); }), name: 'Formatting Rules', displayName: analytics_utils_1.getLocalization('Formatting Rules', 'DevExpress.XtraReports.UI.XRControl.FormattingRules'), className: 'formattingrules' },
            { model: ko.pureComputed(function () { return reportModel() && reportModel().crossBandControls(); }), name: 'Crossband Controls', displayName: analytics_utils_1.getLocalization('Cross-Band Controls', 'ASPxReportsStringId.ReportDesigner_CrossBandControls'), className: 'xrcrossbandbox' },
            { model: ko.pureComputed(function () { return reportModel() && reportModel().components(); }), name: 'Components', displayName: analytics_utils_1.getLocalization('Data Sources', 'ASPxReportsStringId.ReportDesigner_DataSources'), className: 'components' }
        ], ['bands', 'controls', 'rows', 'cells'], editableObject, function (model) {
            var path = ReportExplorerModel.getPathByMember(model);
            if (!path) {
                if (model === (reportModel() && reportModel().styles())) {
                    path = 'Styles';
                }
                else if (model === (reportModel() && reportModel().formattingRuleSheet())) {
                    path = 'Formatting Rules';
                }
                else if (model === (reportModel() && reportModel().components())) {
                    path = 'Components';
                }
                else if (model instanceof style_1.StyleModel) {
                    path = _this._getPathNonControl(model, 'Styles', 'styles', editableObject, reportModel);
                }
                else if (model instanceof formattingrules_1.FormattingRule) {
                    path = _this._getPathNonControl(model, 'Formatting Rules', 'formattingRuleSheet', editableObject, reportModel);
                }
                else if (model instanceof components_1.ComponentsModel) {
                    path = _this._getPathNonControl(model, 'Components', 'components', editableObject, reportModel);
                }
                else if (model === (reportModel() && reportModel().crossBandControls())) {
                    path = 'Crossband Controls';
                }
            }
            return path;
        }));
        var exprPropertyNames = ['bands', 'controls', 'rows', 'cells', 'Report', 'Styles', 'Crossband Controls', 'Components'];
        var bindingPropertyNames = [].concat(exprPropertyNames, 'Formatting Rules');
        _this._disposables.push(_this.treeListController = new analytics_internal_1.ObjectStructureTreeListController(exprPropertyNames));
        _this.treeListController.itemsFilter = function (item) {
            var realPropertyName = item.name.split('.')[0];
            var propertyNames = reportModel() && reportModel()._dataBindingMode() !== _dataBindingMode_1.DataBindingMode.Bindings ? exprPropertyNames : bindingPropertyNames;
            return propertyNames ? propertyNames.indexOf(realPropertyName) !== -1 || $.isNumeric(realPropertyName) : true;
        };
        _this.treeListController.getActions = function (item) {
            if (item.data && item.data.name !== 'Crossband Controls' && item.data.name !== 'Components') {
                if (item.data.name !== 'Styles' && item.data.name !== 'Formatting Rules') {
                    return _this._createActionsForOneElement(clickHandler, selection, editableObject, reportModel, item);
                }
                else {
                    return _this._createActionsForArray(item, reportModel);
                }
            }
        };
        _this.treeListController.dragDropHandler = dragDropHandler;
        return _this;
    }
    ReportExplorerModel.getPathByMember = function (model) {
        if (model.parentModel && model.parentModel()) {
            if (model instanceof xrBand_1.BandViewModel) {
                return ReportExplorerModel.getPathByMember(model.parentModel()) + '.bands.' + model.parentModel().bands().indexOf(model);
            }
            else if (model instanceof xrCrossband_1.XRCrossBandControlViewModel) {
                return 'Crossband Controls.Crossband Controls.' + model.parentModel().crossBandControls().indexOf(model);
            }
            else if (model instanceof xrTableCell_1.XRTableCellViewModel) {
                return ReportExplorerModel.getPathByMember(model.parentModel()) + '.cells.' + model.parentModel().cells().indexOf(model);
            }
            else if (model instanceof xrTableRow_1.XRTableRowViewModel) {
                return ReportExplorerModel.getPathByMember(model.parentModel()) + '.rows.' + model.parentModel().rows().indexOf(model);
            }
            else if (model instanceof xrReportelement_1.XRReportElementViewModel) {
                return ReportExplorerModel.getPathByMember(model.parentModel()) + '.controls.' + model.parentModel().controls().indexOf(model);
            }
        }
        else if (model instanceof xrReport_1.ReportViewModel) {
            return 'Report';
        }
        return null;
    };
    ReportExplorerModel.prototype._createActionsForOneElement = function (clickHandler, selection, editableObject, reportModel, item) {
        var actions = [{
                text: 'Properties',
                displayText: function () { return analytics_utils_1.getLocalization('Properties', 'AnalyticsCoreStringId.Cmd_Properties'); },
                imageClassName: 'dx-image-edit',
                imageTemplateName: 'dxrd-svg-operations-edit',
                clickAction: function () {
                    clickHandler();
                }
            }];
        var element = item.data && item.data.data;
        var isDeleteDeny = element && ((element.getMetaData && element.getMetaData().isDeleteDeny) || false);
        var isLocked = element && ((element.lockedInUserDesigner && element.lockedInUserDesigner()) || false);
        if (!isDeleteDeny && !isLocked) {
            actions.push({
                text: 'Delete',
                displayText: function () { return analytics_utils_1.getLocalization('Delete', 'AnalyticsCoreStringId.Cmd_Delete'); },
                imageClassName: 'dxrd-image-recycle-bin',
                imageTemplateName: 'dxrd-svg-operations-recycle_bin',
                clickAction: function () {
                    var selectedObject = ko.unwrap(editableObject);
                    if (selectedObject instanceof style_1.StyleModel) {
                        reportModel().styles.remove(selectedObject);
                    }
                    else if (selectedObject instanceof formattingrules_1.FormattingRule) {
                        reportModel().formattingRuleSheet.remove(selectedObject);
                    }
                    else if (selectedObject instanceof components_1.ComponentsModel) {
                        var dsHelper = reportModel().dsHelperProvider();
                        var removedDs = dsHelper.findDataSourceInfo(selectedObject.data);
                        removedDs && dsHelper.removeDataSource(removedDs);
                    }
                    else {
                        analytics_internal_1.deleteSelection(selection);
                    }
                }
            });
        }
        return actions;
    };
    ReportExplorerModel.prototype._createActionsForArray = function (item, reportModel) {
        if (item.data.name === 'Styles' || item.data.name === 'Formatting Rules') {
            return [{
                    text: 'Add New ' + (item.data.name === 'Styles' ? 'Style' : 'Formatting Rule'),
                    imageClassName: 'dx-image-add',
                    imageTemplateName: 'dxrd-svg-operations-add',
                    clickAction: function () {
                        if (item.data.name === 'Styles') {
                            var newStyleName = analytics_internal_1.getUniqueNameForNamedObjectsArray(reportModel().styles(), 'xrControlStyle');
                            reportModel().styles.push(new style_1.StyleModel({ '@Name': newStyleName }));
                        }
                        else {
                            reportModel().formattingRuleSheet.push(formattingrules_1.FormattingRule.createNew(reportModel()));
                        }
                    }
                }];
        }
        return [];
    };
    ReportExplorerModel.prototype._getPathNonControl = function (model, rootName, arrayName, editableObject, reportModel) {
        var array = reportModel() && reportModel()[arrayName]();
        var index = array && array.indexOf(model) || 0;
        if (index < 0) {
            editableObject(array[0] || reportModel());
            return array.length > 0 ? [rootName, rootName, 0].join('.') : 'Report';
        }
        return [rootName, rootName, index].join('.');
    };
    return ReportExplorerModel;
}(analytics_utils_1.Disposable));
exports.ReportExplorerModel = ReportExplorerModel;
var xrCrossband_1 = require("../../controls/xrCrossband");
var xrTableCell_1 = require("../../controls/xrTableCell");
var xrTableRow_1 = require("../../controls/xrTableRow");
var style_1 = require("../../controls/properties/style");
var formattingrules_1 = require("../../controls/properties/formattingrules");
var components_1 = require("../../controls/properties/components");
var _dataBindingMode_1 = require("../_dataBindingMode");
