﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\parametersDialogs.js)
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
var parameter_1 = require("../../dataObjects/metadata/parameters/parameter");
var parameter_2 = require("../../dataObjects/parameters/parameter");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var ko = require("knockout");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var parameterExpressionAddon_1 = require("../../dataObjects/parameters/parameterExpressionAddon");
var SettingsAreaModel = (function () {
    function SettingsAreaModel(_parameter) {
        this._parameter = _parameter;
        this.valueSourceSettingsType = this._parameter.valueSourceSettingsType;
        this.valueSourceSettings = this._parameter.valueSourceSettings;
    }
    SettingsAreaModel.prototype.getInfo = function () {
        return this._parameter.getInfo().reduce(function (currentInfo, x) {
            if (x.propertyName === 'valueSourceSettingsType') {
                var info = analytics_internal_1.extend(true, {}, x);
                info.editor = analytics_widgets_1.editorTemplates.getEditor('combobox');
                currentInfo.push(info);
            }
            else if (x.propertyName === parameter_1.valueSourceSettingsSerializationInfo.propertyName) {
                var info = analytics_internal_1.extend(true, {}, x);
                info.editor = analytics_widgets_1.editorTemplates.getEditor('inplaceObjectEditor');
                currentInfo.push(info);
            }
            return currentInfo;
        }, []);
    };
    SettingsAreaModel.prototype.isPropertyVisible = function (propertyName) {
        if (propertyName === 'valueSourceSettings')
            return this.valueSourceSettingsType() !== 'None';
        return true;
    };
    return SettingsAreaModel;
}());
var ParametersDialogBase = (function (_super) {
    __extends(ParametersDialogBase, _super);
    function ParametersDialogBase(_currentReport) {
        var _this = _super.call(this) || this;
        _this._currentReport = _currentReport;
        _this._undoEngine = null;
        _this._isSubmited = false;
        _this.buttons = [
            _this._createButton(analytics_utils_1.getLocalization('OK', analytics_internal_1.StringId.DataAccessBtnOK), function () { return _this.submit(); }),
            _this._createButton(analytics_utils_1.getLocalization('Cancel', analytics_internal_1.StringId.DataAccessBtnCancel), function () { return _this.visible(false); })
        ];
        _this._selectedParameter = ko.observable(null);
        _this._selectedSettings = ko.computed(function () {
            return _this._selectedParameter() && new SettingsAreaModel(_this._selectedParameter());
        });
        _this.visible = ko.observable(false);
        _this.container = function (element) { return analytics_internal_1.getParentContainer(element); };
        _this._disposables.push(_this._selectedSettings, _this._propertiesGrid = new analytics_widgets_1.ObjectProperties(_this._selectedParameter), _this._settingsGrid = new analytics_widgets_1.ObjectProperties(_this._selectedSettings), _this.visible.subscribe(function (newVal) { return !newVal && _this.close(); }));
        _this._propertiesGrid.createEditorAddOn = function (editor) {
            if (_this._selectedParameter() && _this._selectedParameter().propertyExpressionMapper.getExpressionProperty(editor.name) &&
                editor.name.toLocaleLowerCase().indexOf('value') === -1) {
                var addon = new parameterExpressionAddon_1.ParameterExpressionAddOn(editor, _this._selectedParameter);
                return {
                    data: addon,
                    templateName: 'dx-wizard-menu-box-editorswitch'
                };
            }
        };
        return _this;
    }
    ParametersDialogBase.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._currentReport = null;
        this.selectParameter(null);
        this._undoEngine = null;
    };
    ParametersDialogBase.prototype.onSubmit = function () { };
    Object.defineProperty(ParametersDialogBase.prototype, "undoEngine", {
        get: function () {
            if (!this._undoEngine) {
                this._undoEngine = analytics_utils_1.UndoEngine.tryGetUndoEngine(this._currentReport);
            }
            return this._undoEngine;
        },
        enumerable: true,
        configurable: true
    });
    ParametersDialogBase.prototype._createButton = function (text, action) {
        return {
            toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                text: text, onClick: action
            }
        };
    };
    ParametersDialogBase.prototype.selectParameter = function (parameter) {
        var previousParameter = this._selectedParameter();
        parameter && parameter._isEditing(true);
        this._selectedParameter(parameter);
        previousParameter && previousParameter._isEditing(false);
    };
    ParametersDialogBase.prototype.show = function (parameter) {
        this.undoEngine.start();
        this._isSubmited = false;
        this._onStart(parameter);
        this.visible(true);
    };
    ParametersDialogBase.prototype._onStart = function (parameter) {
        this.selectParameter(parameter);
    };
    ParametersDialogBase.prototype.close = function () {
        var cancel = !this._isSubmited && this.undoEngine._hasSessionChanges();
        this.undoEngine.end();
        if (cancel)
            this.undoEngine.undo(true);
        this.selectParameter(null);
    };
    ParametersDialogBase.prototype.submit = function () {
        this._isSubmited = true;
        this.onSubmit();
        this.visible(false);
    };
    return ParametersDialogBase;
}(analytics_utils_1.Disposable));
exports.ParametersDialogBase = ParametersDialogBase;
var AddParameterDialog = (function (_super) {
    __extends(AddParameterDialog, _super);
    function AddParameterDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.popupCss = 'dxrd-parameters-add-dialog';
        _this.title = analytics_utils_1.getLocalization('Add Parameter', 'ASPxReportsStringId.ReportDesigner_ParametersDialog_AddParameter');
        _this.width = 900;
        _this.height = 632;
        _this.contentTemplate = 'dxrd-parameter-edit';
        return _this;
    }
    AddParameterDialog.prototype._createParameter = function (parameters) {
        if (parameters === void 0) { parameters = this._currentReport.parameters(); }
        var newName = analytics_internal_1.getUniqueNameForNamedObjectsArray(parameters, 'parameter'), newParameter = new parameter_2.Parameter({ '@Name': newName, '@Description': 'P' + newName.slice(1) }, this._currentReport);
        return newParameter;
    };
    AddParameterDialog.prototype.onSubmit = function () {
        this._selectedParameter()._isEditing(false);
        this._currentReport.parameters.push(this._selectedParameter());
    };
    AddParameterDialog.prototype._onStart = function (parameter) {
        if (parameter === void 0) { parameter = this._createParameter(); }
        _super.prototype._onStart.call(this, parameter);
    };
    return AddParameterDialog;
}(ParametersDialogBase));
exports.AddParameterDialog = AddParameterDialog;
var EditParametersDialog = (function (_super) {
    __extends(EditParametersDialog, _super);
    function EditParametersDialog(report) {
        var _this = _super.call(this, report) || this;
        _this.width = 'auto';
        _this.height = 684;
        _this.popupCss = 'dxrd-parameters-edit-dialog';
        _this.title = analytics_utils_1.getLocalization('Edit Parameters', 'ASPxReportsStringId.ReportDesigner_ParametersDialog_EditParameters');
        _this.contentEmptyAreaPlaceHolder = analytics_utils_1.getLocalization('Click the Add button to create a parameter.', 'ReportStringId.ParameterEditor_ParameterSettingsPlaceholder');
        _this.contentTemplate = 'dxrd-parameters-content';
        _this._parametersListOptions = {
            addHandler: function () { return _this._createParameter(); },
            collapsed: false,
            showScroll: true,
            alwaysShow: true,
            displayName: 'Parameters',
            template: 'dxrd-parameter-editing-collection-item',
            selectedItem: _this._selectedParameter,
            values: ko.observable(_this._currentReport.parameters),
            textEmptyArray: { text: 'No parameters to display.', localizationId: 'ReportStringId.ParameterEditor_ParameterListPlaceholder' }
        };
        var previousParameter = _this._selectedParameter();
        _this._disposables.push(_this._selectedParameter.subscribe(function (parameter) {
            if (parameter == previousParameter)
                return;
            parameter && parameter._isEditing(true);
            previousParameter && previousParameter._isEditing(false);
            previousParameter = parameter;
        }));
        _this._disposables.push(_this.contentVisible = ko.computed(function () {
            return _this._currentReport.parameters().length > 0;
        }));
        return _this;
    }
    EditParametersDialog.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._parametersListOptions = null;
    };
    EditParametersDialog.prototype.onSubmit = function () { };
    return EditParametersDialog;
}(AddParameterDialog));
exports.EditParametersDialog = EditParametersDialog;
