﻿/**
* DevExpress HTML/JS Reporting (designer\internal\errorPanel\_errorPanelViewModel.js)
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
var $ = require("jquery");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var _types_1 = require("./_types");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var data_grid_1 = require("devextreme/ui/data_grid");
var data_source_1 = require("devextreme/data/data_source");
var button_group_1 = require("devextreme/ui/button_group");
var xrBand_1 = require("../../bands/xrBand");
var xrCrossband_1 = require("../../controls/xrCrossband");
var ErrorPanelViewModel = (function (_super) {
    __extends(ErrorPanelViewModel, _super);
    function ErrorPanelViewModel(options) {
        var _a;
        var _this = _super.call(this) || this;
        _this._offset = 20;
        _this._height = ko.observable(210);
        _this._errorSource = ko.observable(_types_1.ErrorSource.All);
        _this._choosenTypes = ko.observableArray([]);
        _this._filterValue = ko.observable();
        _this._getUndoEngine = null;
        _this._onClick = function () { return void 0; };
        _this._latestChangeSet = ko.observable(analytics_utils_1._LatestChangeSet.Empty());
        _this.collapsed = ko.observable(true);
        _this.position = ko.observable(null);
        _this._errorList = ko.observableArray([]);
        _this._providers = [];
        _this._subscriptions = [];
        _this._errorMessage = ko.computed(function () { return _this._createMessage(_this._errorList().filter(function (x) { return x.errorType == _types_1.ErrorType.Error; }).length, analytics_internal_1.getLocalization('{0} Error|{0} Errors', 'ReportStringId.ReportDesignAnalyzer_Error')); });
        _this._warningMessage = ko.computed(function () { return _this._createMessage(_this._errorList().filter(function (x) { return x.errorType == _types_1.ErrorType.Warning; }).length, analytics_internal_1.getLocalization('{0} Warning|{0} Warnings', 'ReportStringId.ReportDesignAnalyzer_Warning')); });
        _this._informationMessage = ko.computed(function () { return _this._createMessage(_this._errorList().filter(function (x) { return x.errorType == _types_1.ErrorType.Information; }).length, analytics_internal_1.getLocalization('{0} Message|{0} Messages', 'ReportStringId.ReportDesignAnalyzer_Message')); });
        _this._editableObject = options.editableObject;
        _this._resizableOptions = {
            starting: $.noop,
            handles: 'n',
            stop: function (ev) {
                ev.target.style.top = 'unset';
            },
            resize: function (event, ui) {
                _this._height(ui.size.height);
            },
            disabled: _this.collapsed,
            zoom: 1,
            minimumHeight: 210,
            maxHeight: 420
        };
        _this._getUndoEngine = function () { return options.undoEngine && options.undoEngine(); };
        _this._onClick = options.onClick;
        _this._disposables.push({
            dispose: function () {
                _this._getUndoEngine = null;
                _this._latestChangeSet(analytics_utils_1._LatestChangeSet.Empty());
            }
        });
        data_grid_1.default.length;
        button_group_1.default.length;
        if (options.position) {
            _this._position = {
                left: ko.computed(function () { return _this.collapsed() ? 'auto' : (options.position.left() + _this._offset + 'px'); }),
                right: ko.computed(function () { return options.position.right() + _this._offset + 'px'; }),
                height: ko.computed(function () { return (!_this.collapsed() ? _this._height() : 42) + 'px'; })
            };
            _this._disposables.push(_this._position.height);
            _this._disposables.push(_this._position.left);
            _this._disposables.push(_this._position.right);
        }
        _this._disposables.push(_this._collectErrorButtonDisabled = ko.computed(function () {
            return options.undoEngine && options.undoEngine() && options.undoEngine().getCurrentChangeSet().equal(_this._latestChangeSet());
        }));
        _this._selection = options.selection;
        _this._controlsHelper = options.controlsHelper;
        _this._controlScrollingTool = options.controlScrollingTool;
        _this.createDataGridOptions(options.undoEngine);
        _this._disposables.push(_this._errorMessage, _this._warningMessage, _this._informationMessage);
        (_a = _this._disposables).push.apply(_a, ([_this._errorSource, _this._choosenTypes].map(function (x) {
            return x.subscribe(function () {
                var filter = [];
                if (_this._choosenTypes().length) {
                    filter.push(['errorType', 'anyof', _this._choosenTypes()]);
                }
                if (_this._errorSource() !== _types_1.ErrorSource.All) {
                    filter.push(['errorSource', '=', _this._errorSource()]);
                }
                _this._filterValue(filter.reduce(function (res, val) {
                    if (!res.length)
                        res.push(val);
                    else
                        res.push('and', val);
                    return res;
                }, []));
            }, undefined, undefined);
        })));
        return _this;
    }
    ErrorPanelViewModel.prototype._createMessage = function (count, localizationFormat) {
        var formats = localizationFormat.split('|');
        if (count === 1)
            return analytics_internal_1.formatUnicorn(formats[0], count);
        return analytics_internal_1.formatUnicorn(formats[1], count);
    };
    ErrorPanelViewModel.prototype._expandParentBands = function (root) {
        while (root) {
            var surface = root.surface;
            if (surface instanceof xrBand_1.BandSurface) {
                surface.collapsed(false);
            }
            else if (surface instanceof xrCrossband_1.XRCrossBandSurface) {
                var rect = surface['_unitAbsoluteRect'];
                var expandedBands = [];
                surface.parent.getChildrenCollection()().forEach(function (band) {
                    if (surface.isThereIntersection(rect, band.absoluteRect())) {
                        band.collapsed(false);
                        expandedBands.push(band);
                    }
                });
                var expandChildBands = function (bands) {
                    bands && bands.forEach(function (band) {
                        band.collapsed(false);
                        expandChildBands(band.bandsHolder.bands());
                    });
                };
                expandChildBands(expandedBands);
                return;
            }
            root = root.parentModel();
        }
    };
    ErrorPanelViewModel.prototype.clear = function () {
        this._providers = [];
        this._subscriptions.forEach(function (x) { return x.dispose(); });
        this._subscriptions = [];
        this._errorList([]);
    };
    ErrorPanelViewModel.prototype.navigateToItem = function (name) {
        this._onClick && this._onClick();
        var control = this._controlsHelper.getControlByName(name);
        if (!control)
            return;
        if (control['surface']) {
            this._expandParentBands(control);
            this._selection.focused(control['surface']);
            this._controlScrollingTool.scrollToControl(control['surface']);
        }
        else {
            this._editableObject(control);
        }
    };
    ErrorPanelViewModel.prototype.getNotificationTemplate = function () {
        return this._errorList().length > 0 ? 'dxrd-svg-errorPanel-notification' : 'dxrd-svg-errorPanel-notification_empty';
    };
    ErrorPanelViewModel.prototype.getTitleMessage = function () {
        return [this._errorMessage(), this._warningMessage(), this._informationMessage()].join('\n');
    };
    ErrorPanelViewModel.prototype.assignErrors = function () {
        var errors = this._errorList();
        errors.splice(0);
        for (var i = 0; i < this._providers.length; i++) {
            errors.push.apply(errors, this._providers[i].errors());
        }
        this._errorList.valueHasMutated();
    };
    ErrorPanelViewModel.prototype.subscribeProvider = function (provider) {
        var _this = this;
        this._providers.push(provider);
        this._subscriptions.push(provider.errors.subscribe(function (errors) {
            _this.assignErrors();
        }));
        this.assignErrors();
    };
    ErrorPanelViewModel.prototype.collectErrors = function () {
        var undo = this._getUndoEngine();
        var latestChanges = undo && undo.getCurrentChangeSet();
        if (!undo || !latestChanges.equal(this._latestChangeSet())) {
            this._latestChangeSet(latestChanges);
            for (var i = 0; i < this._providers.length; i++) {
                this._providers[i].collectErrors();
            }
        }
    };
    ErrorPanelViewModel.prototype.toggleCollapsed = function () {
        if (this.collapsed())
            this.collectErrors();
        this.collapsed(!this.collapsed());
    };
    ErrorPanelViewModel.prototype.createDataGridOptions = function (undoEngine) {
        var _this = this;
        var ds = ko.observable(new data_source_1.default(this._errorList()));
        this._disposables.push(this._errorList.subscribe(function (newVal) {
            ds().dispose();
            ds(new data_source_1.default(_this._errorList()));
        }));
        this._dataGridOptions = {
            dataSource: ds,
            showColumnLines: false,
            showRowLines: true,
            showBorders: false,
            filterValue: this._filterValue,
            noDataText: analytics_internal_1.getLocalization('No errors', 'ASPxReportsStringId.ReportDesigner_ErrorPanel_NoErrors'),
            columns: [{
                    caption: ' ',
                    width: '30px',
                    dataField: 'errorType',
                    alignment: 'left',
                    cellTemplate: 'dxrd-errorType-column'
                }, {
                    dataField: 'code',
                    caption: analytics_internal_1.getLocalization('Code', 'ReportStringId.ReportDesignAnalyzer_GridColumn_Code'),
                }, {
                    dataField: 'errorSource',
                    visible: false
                }, {
                    dataField: 'description',
                    visible: false
                },
                {
                    dataField: 'message',
                    caption: analytics_internal_1.getLocalization('Description', 'ReportStringId.ReportDesignAnalyzer_GridColumn_Description'),
                },
                {
                    dataField: 'controlName',
                    caption: analytics_internal_1.getLocalization('Source', 'ReportStringId.ReportDesignAnalyzer_GridColumn_Source'),
                    cellTemplate: 'dxrd-source-column'
                }],
            searchPanel: {
                visible: true
            },
            masterDetail: {
                enabled: true,
                template: 'detail'
            },
            onToolbarPreparing: function (e) {
                var toolbarItems = e.toolbarOptions.items;
                toolbarItems.push({
                    widget: 'dxSelectBox',
                    options: {
                        value: _this._errorSource, valueExpr: 'value', displayExpr: 'displayValue', dataSource: [
                            { value: _types_1.ErrorSource.All, displayValue: analytics_internal_1.getLocalization('All', 'DevExpress.XtraReports.Diagnostics.ErrorSource.All') },
                            { value: _types_1.ErrorSource.ReportCreation, displayValue: analytics_internal_1.getLocalization('Report Creation', 'DevExpress.XtraReports.Diagnostics.ErrorSource.Creation') },
                            { value: _types_1.ErrorSource.ReportLayout, displayValue: analytics_internal_1.getLocalization('Report Layout', 'DevExpress.XtraReports.Diagnostics.ErrorSource.Layout') },
                            { value: _types_1.ErrorSource.ReportScripts, displayValue: analytics_internal_1.getLocalization('Report Scripts', 'DevExpress.XtraReports.Diagnostics.ErrorSource.Scripts') }
                        ]
                    },
                    location: 'before'
                });
                toolbarItems.push({
                    template: 'dxrd-error-type-filter',
                    data: {
                        selectedItemKeys: _this._choosenTypes,
                        items: [
                            { template: 'dxrd-error-type-filter-item', text: function () { return _this._errorMessage(); }, icon: _types_1.ErrorType.Error },
                            { template: 'dxrd-error-type-filter-item', text: function () { return _this._warningMessage(); }, icon: _types_1.ErrorType.Warning },
                            { template: 'dxrd-error-type-filter-item', text: function () { return _this._informationMessage(); }, icon: _types_1.ErrorType.Information }
                        ], keyExpr: 'icon', selectionMode: 'multiple', stylingMode: 'outlined'
                    },
                    location: 'before'
                });
                toolbarItems.push({
                    widget: 'dxButtonWithTemplate',
                    cssClass: 'dxrd-collect-errors-button',
                    options: {
                        icon: 'dxrd-svg-errorPanel-collectErrors',
                        text: analytics_internal_1.getLocalization('Collect Errors', 'ASPxReportsStringId.ReportDesigner_Analyzer_CollectErrors'),
                        onClick: function () { return _this.collectErrors(); },
                        disabled: _this._collectErrorButtonDisabled
                    },
                    location: 'before'
                });
            }
        };
    };
    ErrorPanelViewModel.prototype.getIconTemplateName = function (errorType) {
        return 'dxrd-svg-errorPanel-' + _types_1.ErrorType[errorType].toLocaleLowerCase();
    };
    return ErrorPanelViewModel;
}(analytics_utils_1.Disposable));
exports.ErrorPanelViewModel = ErrorPanelViewModel;
