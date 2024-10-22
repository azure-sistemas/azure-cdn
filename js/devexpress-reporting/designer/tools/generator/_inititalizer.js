﻿/**
* DevExpress HTML/JS Reporting (designer\tools\generator\_inititalizer.js)
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var navigateByReports_1 = require("../navigation/navigateByReports");
var _jsonDataSourceEditor_1 = require("../../actions/_jsonDataSourceEditor");
var _parametersViewModel_1 = require("../../internal/fieldlist/_parametersViewModel");
var _customMergingEngine_1 = require("../../internal/_customMergingEngine");
var xrReport_1 = require("../../controls/xrReport");
var _utils_1 = require("../../internal/_utils");
var _scriptsEditor_1 = require("../../internal/scripting/_scriptsEditor");
var settings_1 = require("../../utils/settings");
var calculatedField_1 = require("../../dataObjects/metadata/calculatedField");
var _dataSourceHelper_1 = require("../../helpers/_dataSourceHelper");
var _fieldListDataSourcesHelper_1 = require("../../internal/fieldlist/_fieldListDataSourcesHelper");
var _reportDataSourceService_1 = require("../../services/_reportDataSourceService");
var _settings_1 = require("./_settings");
var _utils_2 = require("../../../common/utils/_utils");
var _initializer_1 = require("../../../viewer/internal/_initializer");
var types_1 = require("../../../common/types");
var _reportSnapLinesCollector_1 = require("../../internal/dragdrop/_reportSnapLinesCollector");
var _selectionDragDropHandler_1 = require("../../internal/dragdrop/_selectionDragDropHandler");
var _reportToolboxDragDropHandler_1 = require("../../internal/dragdrop/_reportToolboxDragDropHandler");
var _fieldListDragDropHandler_1 = require("../../internal/dragdrop/_fieldListDragDropHandler");
var _reportMenuSettings_1 = require("./_reportMenuSettings");
var _reportDesignerControlsHelper_1 = require("../../helpers/_reportDesignerControlsHelper");
var _dataUtils_1 = require("../../internal/_dataUtils");
var _dataBindingMode_1 = require("../../internal/_dataBindingMode");
var _reportExplorer_1 = require("../../internal/reportExplorer/_reportExplorer");
var _reportExplorerDragDropHandler_1 = require("../../internal/dragdrop/_reportExplorerDragDropHandler");
var _fieldListController_1 = require("../../internal/fieldlist/_fieldListController");
var reportStorageWeb_1 = require("../../services/reportStorageWeb");
var actionId_1 = require("../../actions/actionId");
var _localizationStringId_1 = require("../../internal/_localizationStringId");
var fullscreenReportWizard_1 = require("../../wizard/fullscreenReportWizard");
var _reportWizardService_1 = require("../../services/_reportWizardService");
var _localizationEditor_1 = require("../../localization/_localizationEditor");
var metadata_1 = require("../../../common/metadata");
var chooseAvailableDataSourcePage_1 = require("../../wizard/pages/chooseAvailableDataSourcePage");
var _settings_2 = require("../../internal/_settings");
var xrSubreport_1 = require("../../controls/xrSubreport");
var _reportPreviewService_1 = require("../../services/_reportPreviewService");
var reportElementActions_1 = require("../../actions/reportElementActions");
var elementsGroupActions_1 = require("../../actions/elementsGroupActions");
var reportActions_1 = require("../../actions/reportActions");
var tableRowActions_1 = require("../../actions/tableRowActions");
var tableCellActions_1 = require("../../actions/tableCellActions");
var textElementAction_1 = require("../../actions/textElementAction");
var tableCellGroupActions_1 = require("../../actions/tableCellGroupActions");
var pivotGridActions_1 = require("../../actions/pivotGridActions");
var _copyPasteStrategy_1 = require("../../internal/_copyPasteStrategy");
var _chartUtils_1 = require("../../controls/utils/_chartUtils");
var xrChart_1 = require("../../controls/xrChart");
var xrPivotgrid_1 = require("../../controls/xrPivotgrid");
var reportDesignerElements_1 = require("../../utils/reportDesignerElements");
var _reportConverter_1 = require("../../internal/_reportConverter");
var richEdit_1 = require("../../controls/richEdit");
var _handlerUri_1 = require("../../../chart/_handlerUri");
var _registerControls_1 = require("../../utils/_registerControls");
var xrBand_1 = require("../../bands/xrBand");
var _wizardRunner_1 = require("../../internal/_wizardRunner");
var _localiziblePropertiesAccessibilityProvider_1 = require("../../localization/_localiziblePropertiesAccessibilityProvider");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
var analytics_tools_1 = require("@devexpress/analytics-core/analytics-tools");
var scroll_view_1 = require("devextreme/ui/scroll_view");
var config_1 = require("devextreme/core/config");
var reportWizardStateCreating_1 = require("../../wizard/reportWizardStateCreating");
var pivotgridfield_1 = require("../../controls/pivotgrid/pivotgridfield");
var sortBySummary_1 = require("../../controls/pivotgrid/sortBySummary");
var lookUpValue_1 = require("../../dataObjects/parameters/lookUpValue");
var formattingrules_1 = require("../../controls/metadata/properties/formattingrules");
var styleseditor_1 = require("../../widgets/styleseditor");
var xrTableOfContentsLevel_1 = require("../../controls/xrTableOfContentsLevel");
var customizeLabelPage_1 = require("../../wizard/pages/customizeLabelPage");
var _utils_3 = require("../../../viewer/search/_utils");
var objectItemCreation_1 = require("../../dataObjects/objectItemCreation");
var dataFederation_1 = require("../../dataObjects/dataFederation");
var _designerEditorAddOn_1 = require("../../internal/_designerEditorAddOn");
var _errorPanelViewModel_1 = require("../../internal/errorPanel/_errorPanelViewModel");
var _controlScrollingTool_1 = require("../../internal/_controlScrollingTool");
var _sizeUtils_1 = require("../../../viewer/internal/_sizeUtils");
var crossTabActions_1 = require("../../actions/crossTabActions");
var _crossTabConverter_1 = require("../../internal/_crossTabConverter");
var pdfContentActions_1 = require("../../actions/pdfContentActions");
var expressionSmartTag_1 = require("../smartTags/expressionSmartTag");
var smartTagContainer_1 = require("../smartTags/smartTagContainer");
var ReportDesignerInitializer = (function (_super) {
    __extends(ReportDesignerInitializer, _super);
    function ReportDesignerInitializer(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this._onAfterRenderCallbacks = [];
        _this._converters = [];
        _this._customMergeEngine = new _customMergingEngine_1.CustomMergingEngine();
        _this._updateCallback = null;
        _this._selection = options.selection || new analytics_internal_1.SurfaceSelection;
        var serializer = new analytics_utils_1.ModelSerializer();
        _this.configurateRtl(options.rtl)
            .configureReportStorageRegistration(options.reportStorageWebIsRegister, options.allowMDI)
            .addCallbacks(options.callbacks)
            .addElement('state', function () { return options.state; })
            .addElement('availableDataSources', function () {
            return (options.availableDataSources || []).map(function (object) {
                return $.extend({}, object, { data: objectItemCreation_1.createNewObjectItem(object.data, undefined, serializer) });
            });
        });
        var navigation = new navigateByReports_1.NavigateByReports({
            allowMDI: _this._allowMDI,
            callbacks: _this._designerCallbacks,
            knownEnums: options.knownEnums,
            reportUrl: options.reportUrl,
            initOptions: {
                availableDataSources: options.availableDataSources,
                state: options.state
            },
            selection: _this._selection
        });
        var undoEngine = ko.computed(function () { return navigation.currentTab() && navigation.currentTab().undoEngine; });
        _this._addDisposable(undoEngine);
        _this._reportcontext = ko.computed({
            read: function () {
                return navigation.currentTab() && navigation.currentTab().context();
            },
            write: function (newVal) {
                navigation.currentTab() && navigation.currentTab().context(newVal);
            }
        });
        var model = ko.computed({
            read: function () {
                return _this._reportcontext() && _this._reportcontext().report;
            },
            write: function (newVal) {
                if (!_this.isDisposing)
                    navigation.changeContext(newVal);
            }
        });
        var surface = ko.computed(function () { return _this._reportcontext() && _this._reportcontext().surface; });
        var canAddItems = ko.computed(function () { return model() && model().language() === metadata_1.defaultCulture; });
        _this._addDisposable(_this._reportcontext);
        _this._addDisposable(model);
        _this._addDisposable(surface);
        _this._addDisposable(canAddItems);
        _this._addDisposable(canAddItems.subscribe(function (newVal) {
            _this.buildingModel.toolboxItems && _this.buildingModel.toolboxItems.forEach(function (x) { return x.disabled(!newVal); });
        }));
        _this.initializeContext({ model: model, surface: surface, undoEngine: undoEngine });
        _this.mapOnContext();
        _this.addElement('canAddItems', function () { return canAddItems; });
        _this.addElement('navigateByReports', function () { return navigation; });
        _this.addElement('getTabs', function () { return function () { return navigation.tabs(); }; });
        _this.addElement('closeTab', function () { return function (tab, force) {
            if (force === void 0) { force = false; }
            return navigation.removeTab(tab, force);
        }; });
        _this._addDisposable(_this._reportcontext.subscribe(function (newVal) {
            if (_this.buildingModel.propertyGrid) {
                _this.buildingModel.propertyGrid.cleanEditors();
                _this.buildingModel.propertyGrid.editorsRendered(!_this.buildingModel.propertyGrid.isSortingByGroups());
            }
            _this.buildingModel.popularProperties && _this.buildingModel.popularProperties.cleanEditors();
        }));
        _this._selection.focused(surface());
        _this._addDisposable(surface.subscribe(function (newValue) {
            if (!newValue)
                _this._selection.reset();
            else
                _this._selection.focused(newValue);
        }));
        var isDefaultLanguage = ko.computed(function () {
            return _this.buildingModel.model && _this.buildingModel.model() ? _this.buildingModel.model().language() == metadata_1.defaultCulture : false;
        });
        _this._addDisposable(isDefaultLanguage);
        _this._accessibilityProvider = new _localiziblePropertiesAccessibilityProvider_1.LocaliziblePropertiesAccessibilityProvider(isDefaultLanguage);
        return _this;
    }
    Object.defineProperty(ReportDesignerInitializer.prototype, "reportContext", {
        get: function () {
            return this._reportcontext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportDesignerInitializer.prototype, "buildingModel", {
        get: function () {
            return _super.prototype.getModel.call(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReportDesignerInitializer.prototype, "_designerCallbacks", {
        get: function () {
            return this._callbacks && this._callbacks.designer;
        },
        enumerable: true,
        configurable: true
    });
    ReportDesignerInitializer.prototype.subscribeIncomeReport = function (report, reportUrl, dataSourceRefs) {
        var _this = this;
        this._addDisposable(report.subscribe(function (newValue) {
            var newModel = new xrReport_1.ReportViewModel(newValue);
            _utils_1.updateDataSourceRefs(newModel, dataSourceRefs);
            if (_this.buildingModel.navigateByReports.tabs().length === 0) {
                _this.buildingModel.navigateByReports.addTab(newModel, reportUrl, function () { return newModel.dispose(); });
            }
            else {
                _this.buildingModel.model(newModel);
            }
        }));
        return this;
    };
    ReportDesignerInitializer.prototype._addDisposable = function (object) {
        this._disposables.push(object);
    };
    ReportDesignerInitializer.prototype._tryAddScriptEditor = function (isScriptsDisabled) {
        var _this = this;
        isScriptsDisabled = isScriptsDisabled || !analytics_widgets_internal_1.aceAvailable;
        if (!isScriptsDisabled) {
            var scriptsEditor = new _scriptsEditor_1.ScriptsEditor(this.buildingModel.model, this.buildingModel.controlsHelper.allControls);
            this._addDisposable(scriptsEditor.editorVisible.subscribe(function (newValue) {
                if (newValue) {
                    var focusedControl = _this.buildingModel.selection.focused();
                    if (focusedControl && focusedControl.getControlModel) {
                        var controlModel = focusedControl.getControlModel();
                        scriptsEditor.selectedControl(!!controlModel.scripts ? controlModel : controlModel.parentModel());
                    }
                    var resizeFunction = function () { return setTimeout(function () {
                        scriptsEditor.editorContainer().resize();
                    }, 1); };
                    if (!scriptsEditor.editorContainer())
                        var innerSubscription = scriptsEditor.editorContainer.subscribe(function (newVal) {
                            innerSubscription.dispose();
                            resizeFunction();
                        });
                    else
                        resizeFunction();
                }
                _this.buildingModel.designMode(!newValue);
            }));
            this.addElement('scriptsEditor', function () { return scriptsEditor; });
            this.addElement('events', function () { return ko.pureComputed(function () { return _this.buildingModel.scriptsEditor.allFunctionNames; }); });
            this.addElement('gotoEvent', function () { return function (functionName, eventName, model) {
                scriptsEditor.editorVisible(true);
                scriptsEditor.ensureEvent(eventName.substring(2), functionName, model);
            }; });
            return true;
        }
        else {
            var controlTypes = Object.keys(settings_1.controlsFactory().controlsMap);
            for (var index = 0; index < controlTypes.length; index++) {
                ['scripts', 'scriptReferencesString', 'scriptLanguage'].forEach(function (propertyDisplayName) {
                    var propertyInfo = settings_1.controlsFactory().getPropertyInfo(controlTypes[index], propertyDisplayName);
                    propertyInfo && (propertyInfo.visible = false);
                });
            }
            calculatedField_1.calculatedFieldScripts.visible = false;
        }
        return false;
    };
    ReportDesignerInitializer.prototype._getControls = function (controls, filter, isNoneItemAdded) {
        if (isNoneItemAdded === void 0) { isNoneItemAdded = true; }
        return ko.pureComputed(function () {
            var result = controls();
            if (filter) {
                result = result.filter(filter);
            }
            var allControls = result.map(function (item) {
                return { displayName: ko.unwrap(item.name), value: item };
            });
            if (isNoneItemAdded)
                allControls.splice(0, 0, { displayName: analytics_internal_1.localizeNoneString('(none)'), value: null });
            return allControls;
        }).extend({ throttle: 1 });
    };
    ReportDesignerInitializer.prototype._createEmptyReportItemsProvider = function () {
        var reportModel = new xrReport_1.ReportViewModel({});
        var parameters = new _parametersViewModel_1.ParametersViewModel(reportModel);
        var dataSourceHelper = new _dataSourceHelper_1.DataSourceHelper(reportModel.objectStorage, reportModel.dataSourceRefs, undefined);
        reportModel.dataSourceHelper(dataSourceHelper);
        var fieldListDataSourceHelper = new _fieldListDataSourcesHelper_1.FieldListDataSourcesHelper();
        fieldListDataSourceHelper.updateDataSources(dataSourceHelper, reportModel, parameters.parameters);
        var wrappedCallback = fieldListDataSourceHelper.wrapFieldsCallback(_reportDataSourceService_1.ReportDataSourceService.fieldListCallback, function () { return undefined; });
        return new analytics_internal_1.FieldListProvider(wrappedCallback, fieldListDataSourceHelper.fieldListDataSources, [parameters]);
    };
    ReportDesignerInitializer.prototype.addReportDialogs = function (func) {
        var _this = this;
        var settings = new _settings_1.ReportDialogSettings(this._designerCallbacks);
        func(settings);
        settings.saveReportDialog && this.addElement('saveReportDialog', function () { return settings.saveReportDialog; });
        if (settings.saveReportDialogLight) {
            this.addElement('saveReportDialogLight', function () { return settings.saveReportDialogLight; });
            this.buildingModel.navigateByReports.save = function (tab) {
                _this.buildingModel.saveReportDialogLight.show(tab);
            };
        }
        settings.openReportDialog && this.addElement('openReportDialog', function () { return settings.openReportDialog; });
        return this;
    };
    ReportDesignerInitializer.prototype.addErrorPanelViewModel = function (element) {
        var _this = this;
        this.addElement('errorPanelViewModel', function () {
            var rightPosition = ko.computed(function () {
                if (_this.buildingModel.designMode()) {
                    return _this.buildingModel.tabPanel.headerWidth();
                }
                else {
                    return _this.buildingModel.reportPreviewModel && _this.buildingModel.reportPreviewModel.tabPanel.headerWidth();
                }
            });
            var leftPosition = ko.computed(function () {
                return _this.buildingModel.designMode() ? 96 : 0;
            });
            var errorPanel = new _errorPanelViewModel_1.ErrorPanelViewModel({
                controlScrollingTool: _this.buildingModel.controlScrollingTool,
                controlsHelper: _this.buildingModel.controlsHelper,
                editableObject: _this.buildingModel.editableObject,
                selection: _this.buildingModel.selection,
                undoEngine: function () { return _this.buildingModel.undoEngine(); },
                onClick: function () {
                    if (!_this.buildingModel.designMode()) {
                        _this.buildingModel.reportPreviewModel.reportPreview.previewVisible(false);
                        _this.buildingModel.reportPreviewModel.reportPreview.deactivate();
                    }
                },
                position: {
                    left: leftPosition,
                    right: rightPosition
                }
            });
            errorPanel._disposables.push(rightPosition, leftPosition);
            _this._addDisposable(_this._reportcontext.subscribe(function (newVal) {
                errorPanel.clear();
                if (newVal != null) {
                    errorPanel.subscribeProvider(newVal.reportErrorProvider);
                    errorPanel.subscribeProvider(newVal.runtimeErrorProvider);
                }
            }));
            var $root = $(element);
            var $window = $(window);
            var $progress = $root.find('.dxrd-error-panel');
            var updateProgressBarPosition = _sizeUtils_1.getDockedElementCallback($progress, $root, $window, '.dxrd-error-panel', { bottom: true });
            _this._addDisposable(errorPanel.collapsed.subscribe(function () {
                updateProgressBarPosition(element);
            }));
            var wrapped = function () { return updateProgressBarPosition(element); };
            _this._onAfterRenderCallbacks.push(function () { return updateProgressBarPosition(element); });
            window.addEventListener('scroll', wrapped);
            _this._addDisposable({
                dispose: function () {
                    window.removeEventListener('scroll', wrapped);
                }
            });
            return errorPanel;
        });
        return this;
    };
    ReportDesignerInitializer.prototype.addNavigateToControl = function (element) {
        this.addElement('controlScrollingTool', function () {
            return new _controlScrollingTool_1.ControlScrollingTool(element);
        });
        return this;
    };
    ReportDesignerInitializer.prototype.addFlagsAndInitProperties = function (element) {
        var _this = this;
        this.addElement('validationMode', function () { return ko.computed({
            read: function () {
                return _this.buildingModel.surface() && _this.buildingModel.surface().validationMode();
            }, write: function (newVal) {
                _this.buildingModel.surface().validationMode(newVal);
            }
        }); });
        this.addElement('isDirty', function () { return ko.computed({
            read: function () {
                return _this.buildingModel.navigateByReports.currentTab() && _this.buildingModel.navigateByReports.currentTab().isDirty();
            },
            write: function (newVal) {
                _this.buildingModel.navigateByReports.currentTab() && _this.buildingModel.navigateByReports.currentTab().isDirty(newVal);
            }
        }); });
        this.addElement('designMode', function () { return ko.observable(true); });
        this.addIsLoading(function () {
            var isLoading = ko.observable(true);
            _this.buildingModel.navigateByReports.init(isLoading);
            return isLoading;
        });
        this.addElement('rootStyle', function () { return 'dxrd-designer dxd-back-primary-invariant'; });
        this.addElement('selectedPath', function () { return ko.observable(null); });
        this.addElement('actionsGroupTitle', function () { return function () { return analytics_internal_1.getControlTypeName(_this.getModel().editableObject()) + ' ' + analytics_utils_1.getLocalization('Tasks', 'AnalyticsCoreStringId.Tasks'); }; });
        this.addElement('updateFont', function () { return function (values) {
            analytics_widgets_internal_1.availableFonts(__assign({}, analytics_widgets_internal_1.availableFonts(), values));
        }; });
        this.addElement('afterRender', function () { return function () {
            _this._onAfterRenderCallbacks.forEach(function (x) { return x(); });
            _this._onAfterRenderCallbacks.splice(0);
            delete _this.buildingModel.afterRender;
        }; });
        this.addElement('sortFont', function () { return function () {
            var sortedObj = {};
            var fonts = analytics_widgets_internal_1.availableFonts.peek();
            Object.keys(fonts).sort(function (a, b) { return a.localeCompare(b); }).forEach(function (key) { return sortedObj[key] = fonts[key]; });
            analytics_widgets_internal_1.availableFonts(sortedObj);
        }; });
        this.addElement('zoomStep', function () { return ko.observable(0.05); });
        this.addElement('surfaceSize', function () { return ko.observable(0); });
        if (!element)
            return this;
        this.addElement('fullScreen', function () { return _utils_2.createFullscreenComputed(element, _this); });
        this.addElement('drawCrossbandContent', function () { return ko.observable(true); });
        return this;
    };
    ReportDesignerInitializer.prototype.addPreview = function (options) {
        var _this = this;
        var errorsAction = function (response) {
            if (!!response.errors)
                _this.reportContext() && _this.reportContext().runtimeErrorProvider.errors(response.errors);
        };
        _initializer_1.createPreview({
            model: {
                parametersInfo: options.parametersInfo,
                handlerUri: options.handlerUri,
                previewVisible: false,
                rtl: options.rtl,
                accessibilityCompliant: false,
                exportSettings: options.exportSettings
            },
            element: options.element,
            callbacks: __assign({}, options.callbacks, { _onGetBuildStatus: errorsAction, _onGetDocumentDetails: errorsAction })
        })
            .done(function (reportPreviewModel) {
            _this.addElement('reportPreviewModel', function () {
                _this._addDisposable(reportPreviewModel.reportPreview.previewVisible.subscribe(function (newValue) {
                    _this.buildingModel.designMode(!newValue);
                    if (!newValue && _this._updateCallback)
                        _this._updateCallback();
                }));
                return reportPreviewModel;
            });
            _this._addDisposable(reportPreviewModel);
        });
        return this;
    };
    ReportDesignerInitializer.prototype.addReportUrls = function (subreports) {
        this.addElement('reportUrls', function () {
            return ko.observableArray(types_1.convertMapToKeyValuePair(subreports));
        });
        return this;
    };
    ReportDesignerInitializer.prototype._wrapActionProvider = function (actionsProvider) {
        return {
            getActions: function (context) {
                return actionsProvider() && actionsProvider().getActions(context) || [];
            }
        };
    };
    ReportDesignerInitializer.prototype.initializeFieldListActionProviders = function (func) {
        var _this = this;
        if (func === void 0) { func = function () {
            var providers = [];
            if (_this._calculatedFieldsSource)
                providers.push(_this._wrapActionProvider(_this._calculatedFieldsSource));
            if (_this._parameters)
                providers.push(_this._wrapActionProvider(_this._parameters));
            if (_this._dataSourceActionProvider)
                providers.push(_this._dataSourceActionProvider);
            if (_this._jsonDataSourceEditor)
                providers.push(_this._jsonDataSourceEditor);
            if (_this._sqlDataSourceEditor)
                providers.push(_this._sqlDataSourceEditor);
            if (_this._objectDataSourceEditor)
                providers.push(_this._objectDataSourceEditor);
            return providers;
        }; }
        this.addElement('fieldListActionProviders', func);
        return this;
    };
    ReportDesignerInitializer.prototype.initializeCalculatedFieldsSource = function () {
        var _this = this;
        var calculatedFieldsSource = ko.computed(function () { return _this._reportcontext() && _this._reportcontext().calcFieldsSource; });
        this.addElement('calculatedFieldsSource', function () { return calculatedFieldsSource; });
        this._calculatedFieldsSource = calculatedFieldsSource;
        return this;
    };
    ReportDesignerInitializer.prototype.initializeFieldListItemsExtenders = function () {
        var _this = this;
        var fieldListItemsExtenders = ko.computed(function () { return _this._reportcontext() && _this._reportcontext().fieldListItemsExtenders; });
        this.addElement('fieldListItemsExtenders', function () { return fieldListItemsExtenders; });
        return this;
    };
    ReportDesignerInitializer.prototype.initializeParameters = function () {
        var _this = this;
        var parameters = ko.computed(function () { return _this._reportcontext() && _this._reportcontext().parameters; });
        this.addElement('parameters', function () { return parameters; });
        this._parameters = parameters;
        return this;
    };
    ReportDesignerInitializer.prototype.initializeFieldListProvider = function () {
        var _this = this;
        var fieldListProvider = ko.computed(function () { return _this._reportcontext() && _this._reportcontext().fieldListProvider; });
        this.addElement('fieldListProvider', function () { return fieldListProvider; });
        return this;
    };
    ReportDesignerInitializer.prototype.initializeReportItemsProvider = function () {
        var _this = this;
        var reportItemsProvider = ko.computed(function () { return _this._reportcontext() && _this._reportcontext().reportItemsProvider; });
        this.addElement('reportItemsProvider', function () { return reportItemsProvider; });
        return this;
    };
    ReportDesignerInitializer.prototype.initializeDataBindingsProvider = function () {
        var _this = this;
        var dataBindingsProvider = ko.computed(function () { return _this._reportcontext() && _this._reportcontext().dataBindingsProvider; });
        this.addElement('dataBindingsProvider', function () { return dataBindingsProvider; });
        return this;
    };
    ReportDesignerInitializer.prototype.initializeDisplayNameProvider = function () {
        var _this = this;
        var displayNameProvider = ko.computed(function () { return _this._reportcontext() && _this._reportcontext().displayNameProvider; });
        this.addElement('displayNameProvider', function () { return displayNameProvider; });
        this.addElement('getDisplayNameByPath', function () { return function (path, value) { return displayNameProvider().getDisplayNameByPath(path, value); }; });
        return this;
    };
    ReportDesignerInitializer.prototype.initializeExpressionDisplayNameProvider = function () {
        var _this = this;
        var expressionDisplayNameProvider = ko.computed(function () { return _this._reportcontext() && _this._reportcontext().expressionDisplayNameProvider; });
        this.addElement('expressionDisplayNameProvider', function () { return expressionDisplayNameProvider; });
        return this;
    };
    ReportDesignerInitializer.prototype.initializeDataSourceHelper = function () {
        var _this = this;
        var dataSourceHelper = ko.computed(function () { return _this._reportcontext() && _this._reportcontext().dataSourceHelper; });
        this.addElement('dataSourceHelper', function () { return dataSourceHelper; });
        var fieldListDataSourceHelper = ko.computed(function () { return _this._reportcontext() && _this._reportcontext().fieldListDataSourceHelper; });
        this.addElement('fieldListDataSources', function () { return ko.computed(function () { return fieldListDataSourceHelper() && fieldListDataSourceHelper().fieldListDataSources(); }); });
        this._addDisposable(fieldListDataSourceHelper);
        return this;
    };
    ReportDesignerInitializer.prototype.addSelection = function (func) {
        var _this = this;
        if (func === void 0) { func = function (settings) {
            settings.selection = _this._selection;
            var rtl = ko.computed(function () { return _this.buildingModel.surface() && _this.buildingModel.surface().rtl(); });
            var snapLinesCollector = new _reportSnapLinesCollector_1.ReportSnapLinesCollector(rtl);
            _this._addDisposable(rtl);
            settings.snapHelper = new analytics_internal_1.SnapLinesHelper(_this.buildingModel.surface, analytics_internal_1.SnapLinesHelper.snapTolerance, snapLinesCollector);
            settings.editableObject = analytics_internal_1.CombinedObject.getEditableObject(settings.selection, _this.buildingModel.undoEngine, function (propertyName, controls, undoEngune) { return _this._customMergeEngine.customMerge(propertyName, controls, undoEngune); }).extend({ throttle: 1 });
            settings.addDragDrop(function (dragDropSettings) {
                dragDropSettings.dragHelperContent = new analytics_internal_1.DragHelperContent(settings.selection);
                dragDropSettings.dragDropStarted = analytics_internal_1.DragDropHandler.started;
                dragDropSettings.addDragDropHandler('dragHandler', new _selectionDragDropHandler_1.SelectionDragDropHandler(_this.buildingModel.canAddItems, _this.buildingModel.surface, settings.selection, _this.buildingModel.undoEngine, settings.snapHelper, dragDropSettings.dragHelperContent));
                dragDropSettings.addDragDropHandler('toolboxDragHandler', new _reportToolboxDragDropHandler_1.ReportToolboxDragDropHandler(_this.buildingModel.surface, _this._selection, _this.buildingModel.undoEngine, settings.snapHelper, dragDropSettings.dragHelperContent, settings_1.controlsFactory(), _this._designerCallbacks.componentAdded));
                dragDropSettings.addDragDropHandler('fieldDragHandler', new _fieldListDragDropHandler_1.FieldListDragDropHandler(_this.buildingModel.canAddItems, _this.buildingModel.surface, _this._selection, _this.buildingModel.undoEngine, settings.snapHelper, dragDropSettings.dragHelperContent, _this.buildingModel.fieldListDataSources, _this._designerCallbacks.componentAdded));
            });
            settings.addResize(function (resizeSettings) {
                resizeSettings.handler = {
                    starting: function () {
                        _this.buildingModel.inlineTextEdit.visible() &&
                            _this.buildingModel.inlineTextEdit['_showInline'](false);
                        _this.buildingModel['richInlineControl'] &&
                            _this.buildingModel['richInlineControl'].visible() &&
                            _this.buildingModel['richInlineControl']['_showInline'](false);
                        _this._selection.expectClick = true;
                        _this.buildingModel.undoEngine().start();
                    },
                    stopped: function () {
                        _this.buildingModel.undoEngine().end();
                        setTimeout(function () { _this._selection.expectClick = false; }, 100);
                    },
                    disabled: analytics_internal_1.DragDropHandler.started,
                    snapHelper: settings.snapHelper
                };
            });
        }; }
        _super.prototype.addSelection.call(this, func);
        return this;
    };
    ReportDesignerInitializer.prototype.addToolboxItems = function (items) {
        _super.prototype.addToolboxItems.call(this, items);
        return this;
    };
    ReportDesignerInitializer.prototype.addGroupedToolboxItems = function () {
        _super.prototype.addGroupedToolboxItems.call(this);
        return this;
    };
    ReportDesignerInitializer.prototype.addControlProperties = function (editors, groups, accessibilityProvider) {
        _super.prototype.addControlProperties.call(this, editors, groups, undefined, this._accessibilityProvider);
        return this;
    };
    ReportDesignerInitializer.prototype.createControlProperties = function (editors, groups, accessibilityProvider) {
        var properties = _super.prototype.createControlProperties.call(this, editors, groups, accessibilityProvider);
        properties.createEditorAddOn = function (editor) {
            var editorAddOn = new _designerEditorAddOn_1.ValueEditorAddOn(editor, properties.popupService);
            var editorExression = new _designerEditorAddOn_1.ExpressionEditorAddOn(editor, properties.popupService, 'dxrd-svg-properties-propertyexpression');
            editor._disposables.push(editorAddOn, editorExression);
            return {
                templateName: 'dx-editor-addons',
                data: [editorAddOn, editorExression]
            };
        };
        return properties;
    };
    ReportDesignerInitializer.prototype.addMenu = function (func) {
        if (func === void 0) { func = function (settings) { return void 0; }; }
        var settings = new _reportMenuSettings_1.ReportMenuSettings();
        func(settings);
        this._disposables.push(settings);
        analytics_internal_1.extend(this.getModel(), settings.generate());
        return this;
    };
    ReportDesignerInitializer.prototype.addControlsHelper = function (func) {
        var _this = this;
        if (func === void 0) { func = function (settings) {
            var helper = ko.computed(function () { return _this._reportcontext() && _this._reportcontext().controlsHelper; });
            _this._addDisposable(helper);
            var controlHelper = new _reportDesignerControlsHelper_1.ReportDesignerControlsHelper(helper);
            settings
                .addControlsHelper(controlHelper)
                .addControlsStore();
        }; }
        _super.prototype.addControlsHelper.call(this, func);
        return this;
    };
    ReportDesignerInitializer.prototype.addSmartTagModel = function () {
        var smartTagFactory = settings_1.smartTagFactory();
        !smartTagFactory['default'] && analytics_internal_1.extend(smartTagFactory, {
            'default': function (reportElement) {
                var result = [];
                if (settings_1.DataBindingMode() !== _dataBindingMode_1.DataBindingMode.Bindings)
                    result.push(new expressionSmartTag_1.ExpressionSmartTag(reportElement));
                return result;
            }
        });
        var smartTagHelper = new smartTagContainer_1.SmartTagModel(this._selection, this.buildingModel.surface, this.buildingModel['verticalScrollOffset']);
        this.addElement('smartTagModel', function () { return smartTagHelper; });
        return this;
    };
    ReportDesignerInitializer.prototype.setControlsHelperFilter = function (filter) {
        this.buildingModel.controlsStore.setFilter(filter);
        return this;
    };
    ReportDesignerInitializer.prototype._createPropertiesTab = function () {
        var _this = this;
        return new analytics_utils_1.TabInfo({
            text: 'Properties',
            template: 'dxrd-propertiestab',
            model: this.buildingModel.propertyGrid,
            localizationId: 'AnalyticsCoreStringId.Cmd_Properties',
            visible: ko.pureComputed(function () { return !!_this.buildingModel.model(); }),
            disabled: ko.pureComputed(function () { return _this.buildingModel.propertyGrid.focusedItem() instanceof Array; })
        });
    };
    ReportDesignerInitializer.prototype._createExpressionsTab = function (context) {
        var _this = this;
        var expressionGridModel = ko.computed(function () {
            var editableObject = _this.buildingModel.editableObject();
            return editableObject && editableObject.expressionObj;
        });
        var expressionGrid = null;
        this._addDisposable(context.subscribe(function (newVal) {
            expressionGrid.cleanEditors();
        }));
        expressionGrid = new analytics_widgets_1.ObjectProperties(expressionGridModel);
        this._addDisposable(expressionGrid);
        this._addDisposable(expressionGridModel);
        var expressionTab = new analytics_utils_1.TabInfo({
            text: 'Expressions',
            template: 'dxrd-expressions-tab',
            model: expressionGrid,
            localizationId: 'DevExpress.XtraReports.UI.XRControl.Expressions',
            imageClassName: 'expressions',
            imageTemplateName: 'dxrd-svg-tabs-expressions',
            visible: ko.pureComputed(function () { return _this.buildingModel.model() && _this.buildingModel.model()._dataBindingMode() !== _dataBindingMode_1.DataBindingMode.Bindings; }),
            disabled: ko.pureComputed(function () {
                return !expressionGridModel();
            })
        });
        this._addDisposable(expressionTab.active.subscribe(function (newVal) {
            if (newVal && expressionTab.visible()) {
                _this.buildingModel.controlsStore.setFilter(_utils_1.isControl);
            }
            else {
                _this.buildingModel.controlsStore.setFilter(_utils_1.isNotParameter);
            }
        }));
        return expressionTab;
    };
    ReportDesignerInitializer.prototype._createReportExplorerTab = function () {
        var _this = this;
        var reportExplorer = new _reportExplorer_1.ReportExplorerModel(this.buildingModel.model, this.buildingModel.editableObject, function () {
            _this.buildingModel.tabPanel.selectTab({ model: _this.buildingModel.tabPanel.tabs[0] });
        }, new _reportExplorerDragDropHandler_1.ReportExplorerDragDropHandler(this.buildingModel.canAddItems, this.buildingModel.surface, this.buildingModel.selection, this.buildingModel.undoEngine, this.buildingModel.dragHelperContent), this.buildingModel.selection);
        this._addDisposable(reportExplorer);
        return new analytics_utils_1.TabInfo({
            text: 'Report Explorer',
            template: 'dxrd-reportexplorerwrapper',
            model: reportExplorer,
            localizationId: 'ReportStringId.UD_Title_ReportExplorer',
            imageClassName: 'reportexplorer',
            imageTemplateName: 'dxrd-svg-tabs-reportexplorer',
            visible: ko.pureComputed(function () { return !!_this.buildingModel.model(); })
        });
    };
    ReportDesignerInitializer.prototype._createFieldListTab = function (designerCallbacks) {
        var _this = this;
        var treeListOptions = {
            itemsProvider: this.buildingModel.fieldListProvider,
            selectedPath: this.buildingModel.selectedPath,
            treeListController: new _fieldListController_1.FieldListController(this.buildingModel.fieldListActionProviders, analytics_internal_1.createActionWrappingFunction('WrapForFieldList', function (model, handler) {
                _this.buildingModel.undoEngine().start();
                var result = handler(model);
                _this.buildingModel.undoEngine().end();
                if (result && result.name) {
                    _this.buildingModel.selectedPath(model.path + '.' + ko.unwrap(result.name));
                }
            }), this.buildingModel.fieldDragHandler, designerCallbacks.customizeFieldListActions)
        }, popoverVisible = ko.observable(false), fieldListModel = {
            treeListOptions: treeListOptions,
            popoverVisible: popoverVisible,
            addDataSourceBtnVisible: ko.pureComputed(function () {
                var dsHelper = ko.unwrap(_this.buildingModel.dataSourceHelper);
                return dsHelper && dsHelper.availableDataSources && dsHelper.availableDataSources.length > 0;
            }),
            showPopover: function () {
                popoverVisible(true);
            },
            dataSourceListItems: function () {
                var dsHelper = ko.unwrap(_this.buildingModel.dataSourceHelper);
                return dsHelper && dsHelper.availableDataSources;
            },
            itemClickAction: function (e) {
                popoverVisible(false);
                var data = e.itemData;
                data.id = analytics_internal_1.guid().replace(/-/g, '');
                _dataUtils_1.addDataSourceToReport(ko.unwrap(_this.buildingModel.dataSourceHelper), _this.buildingModel.model(), _this.buildingModel.undoEngine(), _this.buildingModel.fieldListProvider(), data, true);
            }
        };
        return new analytics_utils_1.TabInfo({
            text: 'Fields',
            template: 'dxrd-fieldlistwrapper',
            model: fieldListModel,
            localizationId: 'ReportStringId.UD_Title_FieldList',
            imageClassName: 'fieldlist',
            imageTemplateName: 'dxrd-svg-tabs-fieldlist',
            visible: ko.pureComputed(function () { return !!_this.buildingModel.model(); })
        });
    };
    ReportDesignerInitializer.prototype.addTabPanel = function (panel, addTabInfo) {
        var _this = this;
        if (addTabInfo === void 0) { addTabInfo = function () {
            return [
                _this._createPropertiesTab(),
                _this._createExpressionsTab(_this._reportcontext),
                _this._createFieldListTab(_this._designerCallbacks),
                _this._createReportExplorerTab()
            ];
        }; }
        _super.prototype.addTabPanel.call(this, panel, addTabInfo);
        var contextSubscription = this._reportcontext.subscribe(function (newVal) {
            if (!!newVal) {
                contextSubscription.dispose();
                _this.buildingModel.tabPanel.collapsed(false);
            }
        });
        this._addDisposable(contextSubscription);
        return this;
    };
    ReportDesignerInitializer.prototype._createActionsStorage = function (actions) {
        var object = {};
        for (var i = actions.length - 1; i > -1; i--) {
            object[actions[i].id] = actions[i].clickAction;
        }
        return object;
    };
    ReportDesignerInitializer.prototype.addOpenReportMethod = function () {
        var _this = this;
        this.addElement('openReport', function () { return function (url) {
            _this.buildingModel.navigateByReports.addTab(null, ko.observable(url));
        }; });
        return this;
    };
    ReportDesignerInitializer.prototype.addShowPreviewMethod = function () {
        var _this = this;
        this.addElement('showPreview', function () { return function () {
            var reportPreview = _this.buildingModel.reportPreviewModel.reportPreview;
            reportPreview.previewVisible(true);
            if (!_this.buildingModel.model()) {
                var subscription = _this.buildingModel.model.subscribe(function (newVal) {
                    subscription.dispose();
                    reportPreview.initialize(_reportPreviewService_1.ReportPreviewService.initializePreview(_this.buildingModel.model()));
                });
            }
            else {
                reportPreview.initialize(_reportPreviewService_1.ReportPreviewService.initializePreview(_this.buildingModel.model()));
            }
        }; });
        return this;
    };
    ReportDesignerInitializer.prototype.initializeUIEffects = function (applyBindings, element) {
        var _this = this;
        this._addDisposable(this.buildingModel.editableObject.subscribe(function () {
            var $scrollView = $('.dxrd-designer .dxrd-properties-wrapper').find('.dx-scrollview');
            if ($scrollView.length) {
                var scrollViewInstance = scroll_view_1.default['getInstance']($scrollView.get(0));
                scrollViewInstance && scrollViewInstance['scrollTo'] && scrollViewInstance['scrollTo'](0);
            }
        }));
        var updateSurfaceContentSize__ = analytics_internal_1.updateSurfaceContentSize(this.buildingModel.surfaceSize, element, this.rtl);
        var updateSurfaceContentSizeLocalizationMode__ = _utils_1.updateSurfaceContentSizeLocalizationMode(this.buildingModel.surfaceSize, element, this.rtl);
        var updateSurfaceContentSize_ = function () {
            if (!_this.buildingModel)
                return;
            if (_this.buildingModel.localizationMode()) {
                updateSurfaceContentSizeLocalizationMode__();
            }
            else {
                updateSurfaceContentSize__();
            }
            var $root = $(element).find('.dxrd-designer').eq(0);
            var $contentPanel = $root.find('.dxrd-surface-wrapper .dxrd-content-panel-wrapper').eq(0);
            areaHeight($contentPanel.height());
            areaWidth($contentPanel.width());
        };
        var updateContentSizeTimeout = null;
        var updateSurfaceContentSize_async = function () {
            updateContentSizeTimeout && clearTimeout(updateContentSizeTimeout);
            updateContentSizeTimeout = setTimeout(function () {
                updateSurfaceContentSize_();
            }, 1);
        };
        var reportHeight = ko.computed(function () {
            if (_this.buildingModel.surface()) {
                updateSurfaceContentSize_async();
                return _this.buildingModel.surface().effectiveHeight();
            }
        });
        var reportWidth = ko.computed(function () {
            if (_this.buildingModel.surface()) {
                updateSurfaceContentSize_async();
                return _this.buildingModel.surface().pageWidth();
            }
        });
        var areaHeight = ko.observable(reportHeight());
        var areaWidth = ko.observable(reportWidth());
        var verticalScrollOffset = ko.observable(0);
        var horizontalScrollOffset = ko.observable(0);
        this._addDisposable(ko.computed(function () {
            var horizontalOffset = 0;
            var verticalOffset = 0;
            [0, 0].forEach(function () {
                verticalOffset = (areaHeight() - horizontalOffset) < reportHeight() ? 20 : 0;
                horizontalOffset = (areaWidth() - verticalOffset) < reportWidth() ? 20 : 0;
            });
            horizontalScrollOffset(horizontalOffset);
            verticalScrollOffset(verticalOffset);
        }));
        this._updateCallback = function () {
            if (!_this.buildingModel.reportPreviewModel.reportPreview.previewVisible())
                updateSurfaceContentSize_();
        };
        window.addEventListener('resize', this._updateCallback);
        this.buildingModel.onViewPortScroll = function (viewPort) {
            var $viewPort = $(viewPort), $surface = $viewPort.closest('.dxrd-surface');
            $surface.find('.dxrd-bands-panel-wrapper').scrollTop($viewPort.scrollTop());
            $surface.find('.dxrd-hruler-wrapper').scrollLeft($viewPort.scrollLeft());
        };
        this.addElement('verticalScrollOffset', function () { return verticalScrollOffset; });
        this.addElement('horizontalScrollOffset', function () { return horizontalScrollOffset; });
        this._addDisposable(reportHeight);
        this._addDisposable(reportWidth);
        this._addDisposable(this.buildingModel.tabPanel.width.subscribe(function () {
            updateSurfaceContentSize_async();
        }));
        this._addDisposable(this.buildingModel.localizationEditor.width.subscribe(function () {
            updateSurfaceContentSize_async();
        }));
        this._addDisposable(this.buildingModel.localizationMode.subscribe(function (newVal) {
            updateSurfaceContentSize_async();
        }));
        this.buildingModel.updateSurfaceSize = function () {
            updateSurfaceContentSize_();
        };
        this._addDisposable(this.buildingModel.navigateByReports.height.subscribe(function () {
            updateSurfaceContentSize_async();
        }));
        if (applyBindings) {
            this.buildingModel.updateSurfaceSize();
        }
        return this;
    };
    ReportDesignerInitializer.prototype._createNewViaWizardAction = function (reportWizard, designerModel, state) {
        var _this = this;
        var menuAction = {
            id: actionId_1.ActionId.NewReportViaWizard,
            container: 'menu',
            text: 'New via Wizard',
            displayText: function () { return analytics_utils_1.getLocalization('New via Wizard', _localizationStringId_1.StringId.NewViaWizard); },
            imageClassName: 'dxrd-image-new-via-wizard',
            imageTemplateName: 'dxrd-svg-menu-new_via_wizard',
            disabled: ko.observable(false),
            selected: ko.observable(false),
            visible: true,
            hotKey: { ctrlKey: true, keyCode: 'W'.charCodeAt(0) },
            clickAction: function () { return designerModel._wizardRunner.run('NewViaReportWizard'); }
        };
        designerModel._wizardRunner.registerCommand('NewViaReportWizard', function () {
            if (reportWizard instanceof fullscreenReportWizard_1.FullscreenReportWizard) {
                menuAction.selected(true);
                designerModel.appMenuVisible(true);
                designerModel.isMenuCollapsed(true);
                reportWizard._onClose && reportWizard._onClose(function () {
                    menuAction.selected(false);
                    designerModel.isMenuCollapsed(false);
                });
            }
            reportWizard.itemsProvider(_this._createEmptyReportItemsProvider());
            reportWizard.initialize();
            reportWizard.start(function (reportWizardState) {
                designerModel.isLoading(true);
                var deferred = $.Deferred();
                var createReport = function (wizardState) {
                    _reportWizardService_1.ReportWizardService.generateReportFromWizardState(wizardState, reportWizard._requestModelType, state(), function (wizardModel) {
                        reportWizard.events.call('beforeFinish', { state: wizardState, wizardModel: wizardModel });
                    })
                        .done(function (result) {
                        var newReport = new xrReport_1.ReportViewModel(JSON.parse(result.reportModel));
                        newReport.dataSourceRefs = result.dataSourceRefs;
                        designerModel.navigateByReports.addTab(newReport, ko.observable(''));
                        designerModel.isDirty(true);
                        designerModel.isLoading(false);
                        deferred.resolve(newReport);
                    })
                        .fail(function () { deferred.reject(); });
                };
                if (reportWizardState.jsonDataSourceWizard.jsonSource && reportWizardState.newDataSource) {
                    _reportWizardService_1.ReportWizardService.createNewJsonDataSource(reportWizardState.jsonDataSourceWizard, _jsonDataSourceEditor_1.JsonDataSourceEditor.createJsonDataSourceInfo)
                        .done(function (dataSource) {
                        reportWizardState.dataSource = dataSource;
                        delete reportWizardState.newDataSource;
                        if (designerModel.connections.json().every(function (x) { return x.name !== reportWizardState.jsonDataSourceWizard.newConnectionName; })) {
                            designerModel.connections.json.push({
                                description: reportWizardState.jsonDataSourceWizard.newConnectionName,
                                name: reportWizardState.jsonDataSourceWizard.newConnectionName
                            });
                        }
                        createReport(reportWizardState);
                    }).fail(function () { return deferred.reject(); });
                }
                else {
                    createReport(reportWizardState);
                }
                return deferred.promise();
            });
        }, function () {
            designerModel.appMenuVisible(false);
            reportWizard.isVisible(false);
        });
        return menuAction;
    };
    ReportDesignerInitializer.prototype._createLocalizationModeAction = function (localizationEditor, report, designerModel) {
        var menuAction = {
            id: actionId_1.ActionId.Localization,
            container: 'menu',
            text: 'Localization...',
            displayText: function () { return analytics_utils_1.getLocalization('Localization...', 'ASPxReportsStringId.ReportDesigner_MenuItem_Localization'); },
            imageClassName: 'dxrd-image-menu-localization',
            imageTemplateName: 'dxrd-svg-menu-localization',
            disabled: ko.pureComputed(function () { return !report(); }),
            visible: true,
            selected: ko.observable(false),
            clickAction: function () {
                designerModel._wizardRunner.run('LocalizationCommand');
            }
        };
        var start = function () {
            designerModel.appMenuVisible(true);
            designerModel.isMenuCollapsed(true);
            menuAction.selected(true);
            designerModel.localizationMode(true);
            localizationEditor.start();
            $('.dx-designer .dxrd-surface-wrapper').addClass('dxrd-surface-localization-mode');
            localizationEditor.translateHelper.move('dxrd-toolbar-wrapper');
            localizationEditor.translateHelper.move('dxrd-tab-panel-wrapper', '+', 'translateX');
            localizationEditor.translateHelper.move('dxrd-navigation-panel-wrapper', '+');
            localizationEditor.translateHelper.move('dxrd-error-panel', '+');
        };
        var end = function () {
            menuAction.selected(false);
            designerModel.isMenuCollapsed(false);
            designerModel.appMenuVisible(false);
            designerModel.localizationMode(false);
            localizationEditor.finish();
            $('.dx-designer .dxrd-surface-wrapper').removeClass('dxrd-surface-localization-mode');
            localizationEditor.translateHelper.reset('dxrd-toolbar-wrapper');
            localizationEditor.translateHelper.reset('dxrd-tab-panel-wrapper');
            localizationEditor.translateHelper.reset('dxrd-navigation-panel-wrapper');
            localizationEditor.translateHelper.reset('dxrd-error-panel');
        };
        designerModel._wizardRunner.registerCommand('LocalizationCommand', start, end);
        return menuAction;
    };
    ReportDesignerInitializer.prototype._createDesignInReportWizardAction = function (reportWizard, designerModel, state) {
        var _this = this;
        var menuAction = {
            id: actionId_1.ActionId.ReportWizard,
            container: 'menu',
            text: 'Design in Report Wizard...',
            displayText: function () { return analytics_utils_1.getLocalization('Design in Report Wizard...', 'ReportStringId.Verb_ReportWizard'); },
            imageClassName: 'dxrd-image-run-wizard',
            imageTemplateName: 'dxrd-svg-menu-run_wizard',
            disabled: ko.pureComputed(function () { return !designerModel.model() || designerModel.model().language() !== metadata_1.defaultCulture; }),
            visible: true,
            selected: ko.observable(false),
            clickAction: function () {
                designerModel._wizardRunner.run('DesignInReportWizard');
            }
        };
        var start = function () {
            if (reportWizard instanceof fullscreenReportWizard_1.FullscreenReportWizard) {
                designerModel.appMenuVisible(true);
                designerModel.isMenuCollapsed(true);
                menuAction.selected(true);
                reportWizard._onClose && reportWizard._onClose(function () {
                    menuAction.selected(false);
                    designerModel.isMenuCollapsed(false);
                });
            }
            reportWizard.itemsProvider(designerModel.dataBindingsProvider());
            reportWizard.initialize(reportWizardStateCreating_1.createReportWizardState(designerModel.model()));
            reportWizard.start(function (reportWizardState) {
                var deferred = $.Deferred();
                if (reportWizardState.newDataSource) {
                    var ds = chooseAvailableDataSourcePage_1._restoreDataSourceFromState(reportWizardState.newDataSource);
                    ds.name = designerModel.model().dataSourceHelper().getUniqueDataSourceName(ds.name);
                    reportWizardState.newDataSource = chooseAvailableDataSourcePage_1._convertToStateDataSource(ds);
                }
                var createReport = function (wizardState) {
                    designerModel.isLoading(true);
                    var _patchedInfo = _this._patchReportBeforeRedesign(designerModel.model(), wizardState);
                    _reportWizardService_1.ReportWizardService.generateReportFromWizardState(wizardState, reportWizard._requestModelType, state(), function (wizardModel) {
                        reportWizard.events.call('beforeFinish', { state: wizardState, wizardModel: wizardModel });
                    }, _patchedInfo.json)
                        .done(function (result) {
                        designerModel.navigateByReports.currentTab().undoEngine.start();
                        designerModel.isDirty(true);
                        var newReport = _utils_1.createReportViewModel(result, designerModel.model());
                        designerModel.model(newReport);
                        designerModel.navigateByReports.currentTab().undoEngine.end();
                        designerModel.isLoading(false);
                        deferred.resolve(newReport);
                    })
                        .fail(function () {
                        _this._restoreAfterFail(designerModel.model(), _patchedInfo.removedDataSourceInfos);
                        designerModel.isLoading(false);
                        deferred.reject();
                    });
                };
                if (reportWizardState.jsonDataSourceWizard.jsonSource && reportWizardState.newDataSource) {
                    _reportWizardService_1.ReportWizardService.createNewJsonDataSource(reportWizardState.jsonDataSourceWizard, _jsonDataSourceEditor_1.JsonDataSourceEditor.createJsonDataSourceInfo)
                        .done(function (dataSource) {
                        reportWizardState.dataSource = dataSource;
                        delete reportWizardState.newDataSource;
                        createReport(reportWizardState);
                    }).fail(function () { return deferred.reject(); });
                }
                else {
                    createReport(reportWizardState);
                }
                return deferred.promise();
            });
        };
        var end = function () {
            designerModel.appMenuVisible(false);
            reportWizard.isVisible(false);
        };
        designerModel._wizardRunner.registerCommand('DesignInReportWizard', start, end);
        designerModel._wizardRunner.registerCommand('ReportWizard', start, end);
        return menuAction;
    };
    ReportDesignerInitializer.prototype._createMultiQueryDataSourceWizardAction = function (multiQueryDataSourceWizard, designerModel) {
        var menuAction = {
            id: actionId_1.ActionId.AddMultiQuerySqlDataSource,
            container: 'menu',
            text: 'Add Data Source...',
            displayText: function () { return analytics_utils_1.getLocalization('Add Data Source...', 'ASPxReportsStringId.ReportDesigner_Wizard_AddDataSource'); },
            imageClassName: 'dxrd-image-add-datasource',
            imageTemplateName: 'dxrd-svg-menu-add_datasource',
            disabled: ko.pureComputed(function () { return !designerModel.model(); }),
            visible: multiQueryDataSourceWizard.canRunWizard(),
            selected: ko.observable(false),
            clickAction: function () { return designerModel._wizardRunner.run('DataSourceWizard'); }
        };
        designerModel._wizardRunner.registerCommand('DataSourceWizard', function () {
            if (multiQueryDataSourceWizard instanceof analytics_wizard_1.FullscreenDataSourceWizard) {
                designerModel.appMenuVisible(true);
                designerModel.isMenuCollapsed(true);
                menuAction.selected(true);
                multiQueryDataSourceWizard._onClose && multiQueryDataSourceWizard._onClose(function () {
                    menuAction.selected(false);
                    designerModel.isMenuCollapsed(false);
                });
            }
            multiQueryDataSourceWizard.initialize(analytics_wizard_1._createDefaultDataSourceWizardState());
            multiQueryDataSourceWizard.start();
        }, function () {
            designerModel.appMenuVisible(false);
            multiQueryDataSourceWizard.isVisible(false);
        });
        return menuAction;
    };
    ReportDesignerInitializer.prototype._customizeDesignerActions = function (designerModel, nextCustomizer, exitDesigner, state, callbacks) {
        var _this = this;
        var report = designerModel.model, reportPreview = designerModel.reportPreviewModel.reportPreview, reportWizard = designerModel.wizard, dataSourceWizard = designerModel.dataSourceWizard, localizationEditor = designerModel.localizationEditor, multiQueryDataSourceWizard = designerModel.multiQueryDataSourceWizard, scriptsEditor = designerModel.scriptsEditor;
        return (function (actions) {
            $.extend(analytics_internal_1.findFirstItemMatchesCondition(actions, function (item) { return item.id === analytics_tools_1.ActionId.Copy; }), { textId: _localizationStringId_1.StringId.Copy });
            if (_settings_2.reportStorageWebIsRegister()) {
                actions.push({
                    id: actionId_1.ActionId.NewReport,
                    container: 'menu',
                    text: 'New',
                    displayText: function () { return analytics_utils_1.getLocalization('New', 'ReportStringId.UD_Capt_NewReport'); },
                    imageClassName: 'dxrd-image-newreport',
                    imageTemplateName: 'dxrd-svg-menu-newreport',
                    disabled: ko.observable(false),
                    visible: true,
                    hotKey: { ctrlKey: true, keyCode: 'N'.charCodeAt(0) },
                    clickAction: function () {
                        designerModel.navigateByReports.addTab(new xrReport_1.ReportViewModel(xrSubreport_1.SubreportViewModel.defaultReport), ko.observable(''));
                        designerModel.isDirty(true);
                    }
                });
                actions.push(_this._createNewViaWizardAction(reportWizard, designerModel, state));
                actions.push({
                    id: actionId_1.ActionId.OpenReport,
                    container: 'menu',
                    text: 'Open',
                    displayText: function () { return analytics_utils_1.getLocalization('Open', _localizationStringId_1.StringId.Open); },
                    imageClassName: 'dxrd-image-open',
                    imageTemplateName: 'dxrd-svg-menu-open',
                    disabled: ko.observable(false),
                    visible: true,
                    hotKey: { ctrlKey: true, keyCode: 'O'.charCodeAt(0) },
                    clickAction: function () {
                        designerModel.openReportDialog.show(designerModel.navigateByReports.currentTab());
                    }
                });
            }
            if (reportWizard) {
                actions.push(_this._createDesignInReportWizardAction(reportWizard, designerModel, state));
            }
            actions.push({
                id: actionId_1.ActionId.ValidateBindings,
                text: 'Validate Bindings',
                displayText: function () { return analytics_utils_1.getLocalization('Validate Bindings', 'ASPxReportsStringId.ReportDesigner_ToolBarItemText_ValidateBindings'); },
                imageClassName: 'dxrd-image-validateBindingMode',
                imageTemplateName: 'dxrd-svg-toolbar-validateBindingMode',
                disabled: ko.pureComputed(function () { return !report(); }),
                selected: designerModel.validationMode,
                visible: true,
                hasSeparator: true,
                clickAction: function () {
                    designerModel.validationMode(!designerModel.validationMode());
                },
            });
            actions.push({
                id: actionId_1.ActionId.FullScreen,
                text: 'Full Screen',
                displayText: function () { return analytics_utils_1.getLocalization('Full Screen', 'ASPxReportsStringId.ToolBarItemText_FullScreen'); },
                imageClassName: 'dxrd-image-fullscreen',
                imageTemplateName: function () { return designerModel.fullScreen() ? 'dxrd-svg-toolbar-fullscreen-exit' : 'dxrd-svg-toolbar-fullscreen'; },
                disabled: ko.observable(false),
                selected: designerModel.fullScreen,
                visible: true,
                clickAction: function () {
                    designerModel.fullScreen(!designerModel.fullScreen());
                },
            });
            _this._disposables.push(designerModel.fullScreen);
            if (scriptsEditor) {
                actions.push({
                    id: actionId_1.ActionId.Scripts,
                    text: 'Scripts',
                    displayText: function () { return analytics_utils_1.getLocalization('Scripts', 'ReportStringId.RepTabCtl_Scripts'); },
                    imageClassName: 'dxrd-image-scripts',
                    imageTemplateName: 'dxrd-svg-toolbar-scripts',
                    disabled: ko.pureComputed(function () { return !report(); }),
                    visible: ko.pureComputed(function () { return !scriptsEditor.editorVisible(); }),
                    hotKey: { ctrlKey: true, keyCode: 'R'.charCodeAt(0) },
                    clickAction: function () {
                        scriptsEditor.initialize();
                        scriptsEditor.editorVisible(true);
                    },
                    hasSeparator: true
                });
            }
            if (reportPreview) {
                var previewAction = {
                    id: actionId_1.ActionId.Preview,
                    text: 'Preview',
                    displayText: function () { return analytics_utils_1.getLocalization('Preview', 'ASPxReportsStringId.ToolBarItemText_Preview'); },
                    imageClassName: 'dxrd-image-preview',
                    imageTemplateName: 'dxrd-svg-preview-print_preview',
                    templateName: reportPreview.canSwitchToDesigner ? 'dxrd-toolbar-two-way-switch' : undefined,
                    disabled: ko.pureComputed(function () { return !report(); }),
                    visible: ko.pureComputed(function () { return !reportPreview.previewVisible(); }),
                    hotKey: { ctrlKey: true, keyCode: 'P'.charCodeAt(0) },
                    clickAction: function () {
                        reportPreview.previewVisible(true);
                        reportPreview.initialize(_reportPreviewService_1.ReportPreviewService.initializePreview(report()));
                    },
                    hasSeparator: true
                };
                previewAction.contentData = {
                    items: [
                        { getDisplayText: function () { return analytics_utils_1.getLocalization('Design', 'ASPxReportsStringId.ToolBarItemText_Design'); }, active: true },
                        { itemData: previewAction, active: false }
                    ]
                };
                actions.push(previewAction);
            }
            if (dataSourceWizard) {
                actions.push({
                    id: actionId_1.ActionId.AddSqlDataSource,
                    container: 'menu',
                    text: 'Add Data Source...',
                    displayText: function () { return analytics_utils_1.getLocalization('Add Data Source...', 'ASPxReportsStringId.ReportDesigner_Wizard_AddDataSource'); },
                    imageClassName: 'dxrd-image-add-datasource',
                    imageTemplateName: 'dxrd-svg-menu-add_datasource',
                    disabled: ko.pureComputed(function () { return !report(); }),
                    visible: false,
                    clickAction: function () {
                        dataSourceWizard.initialize(analytics_wizard_1._createDefaultDataSourceWizardState());
                        dataSourceWizard.start();
                        dataSourceWizard.isVisible(true);
                    }
                });
            }
            if (multiQueryDataSourceWizard) {
                actions.push(_this._createMultiQueryDataSourceWizardAction(multiQueryDataSourceWizard, designerModel));
            }
            if (localizationEditor)
                actions.push(_this._createLocalizationModeAction(localizationEditor, report, designerModel));
            var tab = designerModel.navigateByReports.currentTab;
            actions.push({
                id: actionId_1.ActionId.Save,
                container: 'menu',
                text: 'Save',
                displayText: function () { return analytics_utils_1.getLocalization('Save', _localizationStringId_1.StringId.Save); },
                imageClassName: 'dxrd-image-save',
                imageTemplateName: 'dxrd-svg-menu-save',
                disabled: ko.pureComputed(function () { return !report() || (tab() && !tab().isDirty()); }),
                visible: true,
                hotKey: { ctrlKey: true, keyCode: 'S'.charCodeAt(0) },
                clickAction: function () {
                    if (_settings_2.reportStorageWebIsRegister()) {
                        var currentTab = designerModel.navigateByReports.currentTab();
                        if (!currentTab.isDirty()) {
                            return;
                        }
                        if (!currentTab.context().url()) {
                            designerModel.saveReportDialog.show(currentTab);
                        }
                        else {
                            var args = { report: currentTab.context().report, url: currentTab.context().url(), cancel: false };
                            callbacks.reportSaving && callbacks.reportSaving(args);
                            if (args.cancel)
                                return;
                            reportStorageWeb_1.ReportStorageWeb.setData(currentTab.context().report.serialize(), currentTab.context().url())
                                .done(function (result) {
                                currentTab.isDirty(false);
                                callbacks.reportSaved && callbacks.reportSaved({ report: currentTab.context().report, url: currentTab.context().url() });
                                analytics_internal_1.ShowMessage(analytics_utils_1.getLocalization('The report has been successfully saved.', 'ASPxReportsStringId.ReportDesigner_SaveReport_Message_OK'), analytics_internal_1.NotifyType.success);
                            }).fail(function () {
                                callbacks.onServerError && callbacks.onServerError({ state: 'save', model: { report: currentTab.context().report, url: currentTab.context().url() } });
                            });
                        }
                    }
                    else {
                        report().save();
                    }
                }
            });
            if (_settings_2.reportStorageWebIsRegister()) {
                actions.push({
                    id: actionId_1.ActionId.SaveAs,
                    container: 'menu',
                    text: 'Save As',
                    displayText: function () { return analytics_utils_1.getLocalization('Save As', _localizationStringId_1.StringId.SaveAs); },
                    imageClassName: 'dxrd-image-saveas',
                    imageTemplateName: 'dxrd-svg-menu-saveas',
                    disabled: ko.pureComputed(function () { return !report(); }),
                    visible: true,
                    clickAction: function () {
                        designerModel.saveReportDialog.show(designerModel.navigateByReports.currentTab());
                    }
                });
            }
            actions.push({
                id: actionId_1.ActionId.Exit,
                container: 'menu',
                text: 'Exit',
                displayText: function () { return analytics_utils_1.getLocalization('Exit', 'ReportStringId.UD_Capt_Exit'); },
                imageClassName: 'dxrd-image-exit',
                imageTemplateName: 'dxrd-svg-menu-exit',
                disabled: ko.observable(false),
                visible: true,
                clickAction: function () {
                    designerModel.navigateByReports.closeAll().done(function () {
                        exitDesigner && exitDesigner();
                    });
                }
            });
            nextCustomizer && nextCustomizer(actions);
        });
    };
    ReportDesignerInitializer.prototype._patchReportBeforeRedesign = function (reportViewModel, state) {
        var removedDataSourceInfos = [];
        if (!state.newDataSource && reportViewModel.dataSource() && state.dataSource) {
            var stateDsInfo = chooseAvailableDataSourcePage_1._restoreDataSourceFromState(state.dataSource);
            var dataSourceInfo = reportViewModel.dataSourceHelper().findDataSourceInfoByName(stateDsInfo.name);
            removedDataSourceInfos.push(dataSourceInfo);
            reportViewModel.dataSourceHelper().removeDataSource(dataSourceInfo);
            reportViewModel.dataSourceHelper().allDataSources().forEach(function (dataSource) {
                if (dataSource.data instanceof dataFederation_1.DataFederationDataSource) {
                    var federationDataSourceInfo = reportViewModel.dataSourceHelper().findDataSourceInfoByName(dataSource.name);
                    if (federationDataSourceInfo) {
                        removedDataSourceInfos.push(federationDataSourceInfo);
                        reportViewModel.dataSourceHelper().removeDataSource(federationDataSourceInfo);
                    }
                }
            });
        }
        return {
            json: JSON.stringify({ 'XtraReportsLayoutSerializer': reportViewModel.serialize() }),
            removedDataSourceInfos: removedDataSourceInfos,
        };
    };
    ReportDesignerInitializer.prototype._restoreAfterFail = function (reportViewModel, removedDataSourceInfos) {
        removedDataSourceInfos.forEach(function (info) {
            reportViewModel.dataSourceHelper().restoreDataSource(info);
        });
    };
    ReportDesignerInitializer.prototype.addContextActions = function (func) {
        var _this = this;
        if (func === void 0) { func = function (settings) {
            var isDisabled = function () { return _this.buildingModel.model() && _this.buildingModel.model().language() !== metadata_1.defaultCulture; };
            settings.actionProviders = [new reportElementActions_1.ReportElementActions(_this.buildingModel.surface, _this.buildingModel.selection),
                new elementsGroupActions_1.ElementsGroupActions(_this.buildingModel.surface, _this.buildingModel.selection),
                new reportActions_1.ReportActions(_this._designerCallbacks.componentAdded),
                new tableRowActions_1.TableRowActions(_this.buildingModel.selection, _this._designerCallbacks.componentAdded, isDisabled),
                new tableCellActions_1.TableCellActions(_this.buildingModel.selection, _this._designerCallbacks.componentAdded, isDisabled),
                new textElementAction_1.TextElementAction(_this.buildingModel.selection),
                new tableCellGroupActions_1.TableCellGroupActions(_this.buildingModel.selection),
                new pdfContentActions_1.PdfContentActions(_this.buildingModel.selection, isDisabled),
                new crossTabActions_1.CrossTabActions(_this._converters, isDisabled),
                new pivotGridActions_1.PivotGridActions(_this._converters, isDisabled)];
            settings.createDefaultGroupAction(_this.buildingModel.editableObject, _this.buildingModel.undoEngine);
        }; }
        _super.prototype.addContextActions.call(this, func);
        return this;
    };
    ReportDesignerInitializer.prototype.addActionList = function (actionListFunc) {
        var _this = this;
        if (actionListFunc === void 0) { actionListFunc = function () {
            var designerShortcutsEnabled = ko.computed(function () {
                var isDesignMode = _this.buildingModel.designMode();
                var isWizardVisible = _this.buildingModel.wizard && _this.buildingModel.wizard.isVisible();
                var isDataSourceWizardVisible = _this.buildingModel.dataSourceWizard && _this.buildingModel.dataSourceWizard.isVisible();
                var isMultiQueryDataSourceWizardVisible = _this.buildingModel.multiQueryDataSourceWizard && _this.buildingModel.multiQueryDataSourceWizard.isVisible();
                var isLocalizationModeVisible = _this.buildingModel.localizationMode && _this.buildingModel.localizationMode();
                return isDesignMode && !isWizardVisible && !isDataSourceWizardVisible && !isMultiQueryDataSourceWizardVisible && !isLocalizationModeVisible;
            });
            _this._addDisposable(designerShortcutsEnabled);
            var actions = new analytics_internal_1.ActionLists(_this.buildingModel.surface, _this.buildingModel.selection, _this.buildingModel.undoEngine, _this._customizeDesignerActions(_this.buildingModel, _this._designerCallbacks.customizeActions, _this._designerCallbacks.exitDesigner, function () { return _this._reportcontext() && _this._reportcontext().state() || _this.buildingModel.state; }, _this._designerCallbacks), designerShortcutsEnabled, _copyPasteStrategy_1.reportCopyPasteStrategy(_this._designerCallbacks.componentAdded), _this.buildingModel.zoomStep, function (_) { return !_this.buildingModel.canAddItems(); });
            _this.addElement('actionStorage', function () { return $.extend({}, _this._createActionsStorage(actions.menuItems), _this._createActionsStorage(actions.toolbarItems)); });
            return actions;
        }; }
        _super.prototype.addActionList.call(this, actionListFunc);
        return this;
    };
    ReportDesignerInitializer.prototype._createChartDesignerPart = function (context) {
        var _this = this;
        var chartValueBindingProvider = ko.computed(function () { return context() && context().chartValueBindingProvider; });
        this._addDisposable(chartValueBindingProvider);
        var chartDesignerOptions = _chartUtils_1.createChartDesignerOptions(this.buildingModel, this.buildingModel.dataSourceHelper, this.buildingModel.model, this.buildingModel.parameters, chartValueBindingProvider);
        this.addElement('runChartDesigner', function () { return function (chart) {
            chartDesignerOptions.run(chart);
        }; });
        this.addElement('chartDataSources', function () { return ko.computed(function () {
            var pivotGrids = _this.buildingModel.controlsHelper.allControls().filter(function (item) { return item instanceof xrPivotgrid_1.XRPivotGridViewModel; }).map(function (item) { return { displayName: item.name, value: item }; });
            var usedDataSources = _this.buildingModel.dataSourceHelper() && _this.buildingModel.dataSourceHelper().usedDataSources() && _this.buildingModel.dataSourceHelper().usedDataSources().map(function (item) { return { displayName: item.name, value: item.data }; }), result = [].concat(pivotGrids, usedDataSources);
            return result;
        }); });
        this._addDisposable(this.buildingModel.controlsHelper.allControls.subscribe(function (newArr) {
            newArr.filter(function (item) { return item instanceof xrChart_1.XRChartViewModel; }).forEach(function (chart) {
                if (chart.isPivotGridDataSource() && newArr.indexOf(chart.dataSource()) === -1)
                    chart.dataSource(null);
            });
        }));
        this._addDisposable(chartDesignerOptions);
        return { id: null, templateName: reportDesignerElements_1.ReportDesignerElements.ChartDialog, model: chartDesignerOptions };
    };
    ReportDesignerInitializer.prototype._createWizardPart = function (wizardName, model) {
        if (model instanceof analytics_wizard_1.FullscreenWizard) {
            return { id: reportDesignerElements_1.ReportDesignerAddOns[wizardName + 'Fullscreen'], templateName: reportDesignerElements_1.ReportDesignerAddOns[wizardName + 'Fullscreen'].split('#')[0], model: model };
        }
        return { id: reportDesignerElements_1.ReportDesignerAddOns[wizardName], templateName: reportDesignerElements_1.ReportDesignerAddOns[wizardName].split('#')[0], model: model };
    };
    ReportDesignerInitializer.prototype.addParts = function (func) {
        var _this = this;
        if (func === void 0) { func = function (parts) {
            var reportConverter = new _reportConverter_1.ReportConverter(_this.buildingModel.controlsHelper, _this.buildingModel.undoEngine, _this._dataBiningMode);
            if (_this._defaultCrossTabControl === 'XRCrossTab') {
                _this._converters.push(new _crossTabConverter_1.CrossTabConverter(_this.buildingModel.selection, _this._reportcontext), new _crossTabConverter_1.PivotGridConverter(_this.buildingModel.selection));
            }
            _this._converters.push(reportConverter);
            _this._addDisposable(_this._reportcontext.subscribe(function (newVal) {
                if (newVal)
                    reportConverter.convert(newVal.report, _this._convertBindingsToExpressions);
            }));
            [analytics_internal_1.DesignerBaseElements.MenuButton, analytics_internal_1.DesignerBaseElements.Toolbox].forEach(function (item) {
                var oldItem = parts.filter(function (part) { return part.id === item; })[0];
                var index = parts.indexOf(oldItem);
                parts.splice(index, 1);
            });
            parts.push.apply(parts, [{ id: analytics_internal_1.DesignerBaseElements.GroupedToolbox, templateName: analytics_internal_1.DesignerBaseElements.GroupedToolbox, model: _this.buildingModel },
                { id: reportDesignerElements_1.ReportDesignerElements.NavigationPanel, templateName: reportDesignerElements_1.ReportDesignerElements.NavigationPanel, model: _this.buildingModel.navigateByReports },
                { id: null, templateName: reportDesignerElements_1.ReportDesignerElements.ReportDialog, model: _this.buildingModel.saveReportDialog },
                { id: null, templateName: reportDesignerElements_1.ReportDesignerElements.ReportDialog, model: _this.buildingModel.saveReportDialogLight },
                { id: null, templateName: reportDesignerElements_1.ReportDesignerElements.ReportDialog, model: _this.buildingModel.openReportDialog },
                { id: reportDesignerElements_1.ReportDesignerElements.MenuButton, templateName: reportDesignerElements_1.ReportDesignerElements.MenuButton, model: _this.buildingModel },
                _this._createChartDesignerPart(_this._reportcontext),
                { id: null, templateName: reportDesignerElements_1.ReportDesignerElements.Parameters, model: _this.buildingModel.parameters }].concat(_this._converters.map(function (model) { return { id: null, templateName: reportDesignerElements_1.ReportDesignerElements.ReportConverterDialog, model: model }; })));
            return parts;
        }; }
        _super.prototype.addParts.call(this, func);
        this._designerCallbacks.customizeParts && this._designerCallbacks.customizeParts(this.buildingModel.parts);
        return this;
    };
    ReportDesignerInitializer.prototype.addDefaultAddons = function (addons) {
        if (addons === void 0) { addons = [
            { id: reportDesignerElements_1.ReportDesignerAddOns.Preview, templateName: reportDesignerElements_1.ReportDesignerAddOns.Preview, model: this.buildingModel.reportPreviewModel },
            this._createWizardPart('ReportWizard', this.buildingModel.wizard),
            { id: reportDesignerElements_1.ReportDesignerAddOns.DataSourceWizard, templateName: reportDesignerElements_1.ReportDesignerAddOns.DataSourceWizard.split('#')[0], model: this.buildingModel.dataSourceWizard },
            this._createWizardPart('MultiQueryDataSourceWizard', this.buildingModel.multiQueryDataSourceWizard),
            { id: reportDesignerElements_1.ReportDesignerAddOns.LocalizationEditor, templateName: reportDesignerElements_1.ReportDesignerAddOns.LocalizationEditor.split('#')[0], model: this.buildingModel.localizationEditor },
            { id: reportDesignerElements_1.ReportDesignerAddOns.ErrorPanel, templateName: reportDesignerElements_1.ReportDesignerAddOns.ErrorPanel, model: this.buildingModel.errorPanelViewModel }
        ]; }
        this.addElement('addOns', function () { return ko.observableArray(addons); });
        return this;
    };
    ReportDesignerInitializer.prototype.tryAddSqlDataSourceEditorAddon = function (relationsEditor) {
        if (relationsEditor === void 0) { relationsEditor = this._sqlDataSourceEditor.relationsEditor; }
        if (relationsEditor)
            this.buildingModel.addOns.push({ id: reportDesignerElements_1.ReportDesignerAddOns.MasterDetailEditor, templateName: reportDesignerElements_1.ReportDesignerAddOns.MasterDetailEditor, model: relationsEditor });
        return this;
    };
    ReportDesignerInitializer.prototype.tryAddScriptEditorAddon = function (isScriptsDisabled) {
        if (this._tryAddScriptEditor(isScriptsDisabled))
            this.buildingModel.addOns.push({ id: reportDesignerElements_1.ReportDesignerAddOns.ScriptEditor, templateName: reportDesignerElements_1.ReportDesignerAddOns.ScriptEditor, model: this.buildingModel.scriptsEditor });
        return this;
    };
    ReportDesignerInitializer.prototype.tryAddInlineRichTextEdit = function () {
        var inlineRichEdit = richEdit_1.registerRichEditInline()(this._selection);
        if (inlineRichEdit) {
            this.addElement('richInlineControl', function () { return inlineRichEdit; });
        }
        return this;
    };
    ReportDesignerInitializer.prototype.onContextChanged = function (subreports, func) {
        var _this = this;
        if (func === void 0) { func = function (context) {
            if (context) {
                _this.buildingModel.selectedPath(null);
                if (_this.buildingModel.toolboxItems) {
                    _this.buildingModel.toolboxItems.forEach(function (item) { item.disabled(!_this.buildingModel.canAddItems()); });
                }
            }
            else {
                if (_this.buildingModel.selection) {
                    _this.buildingModel.selection.clear();
                    _this.buildingModel.selection.focused(_this.buildingModel.surface());
                }
                _this.buildingModel.editableObject && _this.buildingModel.editableObject(null);
                _this.buildingModel.toolboxItems && _this.buildingModel.toolboxItems.forEach(function (item) { item.disabled(true); });
                _this.buildingModel.popularProperties && _this.buildingModel.popularProperties.cleanEditors();
            }
        }; }
        func(this._reportcontext());
        this._addDisposable(this._reportcontext.subscribe(function (newVal) { return func(newVal); }));
        return this;
    };
    ReportDesignerInitializer.prototype.configurateRtl = function (rtl) {
        this.rtl = !!rtl;
        config_1.default({ rtlEnabled: !!this.rtl });
        return this;
    };
    ReportDesignerInitializer.prototype.configureReportStorageRegistration = function (reportStorageIsRegister, allowMDI) {
        _settings_2.reportStorageWebIsRegister(reportStorageIsRegister === undefined ? _settings_2.reportStorageWebIsRegister() : reportStorageIsRegister);
        this._allowMDI = _settings_2.reportStorageWebIsRegister() ? allowMDI : false;
        return this;
    };
    ReportDesignerInitializer.prototype.applyUri = function (uriSettings) {
        settings_1.HandlerUri(uriSettings.reportDesignerUri || settings_1.HandlerUri());
        _handlerUri_1.HandlerUri(uriSettings.reportDesignerUri);
        this._previewUri = uriSettings.previewUri;
        return this;
    };
    ReportDesignerInitializer.prototype.initBindingMode = function (dataBiningMode, convertBindingsToExpressions) {
        this._dataBiningMode = dataBiningMode;
        this._convertBindingsToExpressions = convertBindingsToExpressions;
        return this;
    };
    ReportDesignerInitializer.prototype.initDefaultCrossTabControl = function (defaultCrossTabControl) {
        this._defaultCrossTabControl = defaultCrossTabControl;
        settings_1.DefaultCrossTabControl(defaultCrossTabControl || 'XRCrossTab');
        return this;
    };
    ReportDesignerInitializer.prototype.registerControls = function (dataBindingMode, reportItemsProvider) {
        settings_1.DataBindingMode(dataBindingMode || 'Expressions');
        _registerControls_1.registerControls(reportItemsProvider);
        return this;
    };
    ReportDesignerInitializer.prototype.addCallbacks = function (callbacks) {
        this._callbacks = callbacks;
        if (!this._callbacks.designer)
            this._callbacks.designer = {};
        if (!this._callbacks.preview)
            this._callbacks.preview = {};
        this._callbacks.designer.fieldLists = this._callbacks.designer.fieldLists || _reportDataSourceService_1.ReportDataSourceService.fieldListCallback;
        return this;
    };
    ReportDesignerInitializer.prototype.addProcessErrorCallback = function (processError) {
        if (processError === void 0) { processError = this._designerCallbacks && this._designerCallbacks.onServerError; }
        this._disposables.push(analytics_internal_1.processErrorEvent(processError));
        return this;
    };
    ReportDesignerInitializer.prototype.runCustomizeToolboxEvent = function (customizeToolbox) {
        if (customizeToolbox === void 0) { customizeToolbox = this._designerCallbacks && this._designerCallbacks.customizeToolbox; }
        customizeToolbox && customizeToolbox(settings_1.controlsFactory());
        return this;
    };
    ReportDesignerInitializer.prototype.initCultureInfo = function (cultureInfoList) {
        $.extend(true, _utils_2.cultureInfo, cultureInfoList);
        return this;
    };
    ReportDesignerInitializer.prototype.updateFont = function (fontSet) {
        if (fontSet) {
            var fonts = {};
            if (fontSet instanceof Array)
                fontSet.forEach(function (fontName) { return fonts[fontName] = fontName; });
            else
                fonts = fontSet;
            this.buildingModel.updateFont(fonts);
            this.buildingModel.sortFont();
        }
        return this;
    };
    ReportDesignerInitializer.prototype.initFormatStringPatterns = function (formatStringData) {
        if (formatStringData) {
            formatStringData.standardPatterns && Object.keys(formatStringData.standardPatterns).forEach(function (propName) {
                if (!analytics_widgets_internal_1.formatStringStandardPatterns[propName])
                    analytics_widgets_internal_1.formatStringStandardPatterns[propName] = formatStringData.standardPatterns[propName];
                else
                    analytics_widgets_internal_1.formatStringStandardPatterns[propName].patterns = formatStringData.standardPatterns[propName].patterns;
            });
            formatStringData.customPatterns && Object.keys(formatStringData.customPatterns).forEach(function (propName) {
                settings_1.formatStringEditorCustomSet[propName] = formatStringData.customPatterns[propName];
            });
        }
        return this;
    };
    ReportDesignerInitializer.prototype.addPopularProperties = function (controlsFactory, accessibilityProvider) {
        var _this = this;
        _super.prototype.addPopularProperties.call(this, controlsFactory, this._accessibilityProvider);
        this.addElement('popularVisible', function () { return ko.pureComputed(function () {
            return _this.buildingModel.popularProperties._editors().some(function (x) { return x.visible(); }) ||
                _this.buildingModel.contextActions && _this.buildingModel.contextActions().length > 0;
        }); });
        return this;
    };
    ReportDesignerInitializer.prototype.addInlineTextEdit = function (func) {
        var _this = this;
        this.addElement('inlineTextEdit', func ? func : function () { return new analytics_internal_1.InlineTextEdit(_this._selection); });
        return this;
    };
    ReportDesignerInitializer.prototype.addStylesProjection = function (styles) {
        var _this = this;
        if (styles === void 0) { styles = ko.pureComputed(function () { return _this.buildingModel.model() && _this.buildingModel.model().styles; }); }
        this.addElement('styles', function () { return styles; });
        return this;
    };
    ReportDesignerInitializer.prototype.addFormattingRulesProjection = function (rules) {
        var _this = this;
        if (rules === void 0) { rules = ko.pureComputed(function () { return _this.buildingModel.model() && _this.buildingModel.model().formattingRuleSheet; }); }
        this.addElement('formattingRuleSheet', function () { return rules; });
        return this;
    };
    ReportDesignerInitializer.prototype.addReportExplorerProvider = function (reportExplorerProvider) {
        if (reportExplorerProvider === void 0) { reportExplorerProvider = new analytics_internal_1.ObjectExplorerProvider([{ model: this.buildingModel.model, name: 'Report', className: 'master_report' }], ['bands', 'controls', 'rows', 'cells'], ko.observable(null)); }
        this.addElement('reportExplorerProvider', function () { return reportExplorerProvider; });
        return this;
    };
    ReportDesignerInitializer.prototype.addControlsProjection = function (controlsHelper) {
        var _this = this;
        if (controlsHelper === void 0) { controlsHelper = this.buildingModel.controlsHelper; }
        this.addElement('getControls', function () { return function (target) {
            return ko.pureComputed(function () {
                return _this._getControls(controlsHelper.getControls(ko.unwrap(target)), function (item) {
                    return !(item instanceof xrBand_1.BandViewModel || item instanceof xrReport_1.ReportViewModel);
                });
            });
        }; });
        this.addElement('controls', function () { return _this._getControls(controlsHelper.allControls, function (item) { return !(item instanceof xrBand_1.BandViewModel || item instanceof xrReport_1.ReportViewModel); }); });
        return this;
    };
    ReportDesignerInitializer.prototype.addBandsProjection = function (controlsHelper) {
        var _this = this;
        if (controlsHelper === void 0) { controlsHelper = this.buildingModel.controlsHelper; }
        this.addElement('bands', function () { return function (filter, IsNoneNeaded) {
            return _this._getControls(controlsHelper.allControls, function (item) {
                return item instanceof xrBand_1.BandViewModel && (filter ? filter(item) : true);
            }, IsNoneNeaded);
        }; });
        return this;
    };
    ReportDesignerInitializer.prototype.addWizardRunner = function () {
        var _this = this;
        this.addElement('_wizardRunner', function () { return new _wizardRunner_1.WizardRunner({
            visible: _this.getModel().appMenuVisible,
            collapsed: _this.getModel().isMenuCollapsed
        }); });
        return this;
    };
    ReportDesignerInitializer.prototype.addWizards = function (connectionStrings, wizardSettings, cusomizeSettingsFunc) {
        var initializerSettings = new _settings_1.WizardsInitializerSettings(connectionStrings, wizardSettings, this._designerCallbacks, this.rtl);
        this.addElement('connections', function () { return connectionStrings; });
        cusomizeSettingsFunc(initializerSettings);
        if (initializerSettings.reportWizard) {
            this.addElement('registerReportWizardPages', function () { return initializerSettings.registerReportWizardPages; });
            this.addElement('wizard', function () { return initializerSettings.reportWizard; });
        }
        if (initializerSettings.dataSourceWizard) {
            this.addElement('dataSourceWizard', function () { return initializerSettings.dataSourceWizard; });
        }
        if (initializerSettings.multiQueryDataSourceWizard) {
            this.addElement('registerMultiQueryDataSourceWizardPages', function () { return initializerSettings.registerMultiQueryDataSourceWizardPages; });
            this.addElement('multiQueryDataSourceWizard', function () { return initializerSettings.multiQueryDataSourceWizard; });
        }
        this._sqlDataSourceEditor = initializerSettings.sqlDataSourceEditor;
        this._jsonDataSourceEditor = initializerSettings.jsonDataSourceEditor;
        this._objectDataSourceEditor = initializerSettings.objectDataSourceEditor;
        this._dataSourceActionProvider = initializerSettings.dataSourceActionProvider;
        return this;
    };
    ReportDesignerInitializer.prototype.addLocalizationEditor = function () {
        var _this = this;
        this.addElement('localizationEditor', function () { return new _localizationEditor_1.LocalizationEditor({
            controlScrollingTool: _this.buildingModel.controlScrollingTool,
            report: function () { return _this.buildingModel.model(); },
            selection: _this.buildingModel.selection
        }); });
        this.addElement('localizationMode', function () { return ko.observable(false); });
        this.addElement('isLocalized', function () { return function (item) { return _this.buildingModel.model() && _this.buildingModel.model()._localization.hasCulture(item); }; });
        return this;
    };
    ReportDesignerInitializer.prototype.addStaticContext = function () {
        analytics_internal_1.appendStaticContextToRootViewModel(this.buildingModel, {
            config: config_1.default,
            _static: __assign({}, analytics_internal_1.staticContext._static, { PivotGridFieldViewModel: pivotgridfield_1.PivotGridFieldViewModel, SortBySummaryInfoCondition: sortBySummary_1.SortBySummaryInfoCondition, LookUpValue: lookUpValue_1.LookUpValue, DragDropHandler: analytics_internal_1.DragDropHandler, getControlFullName: analytics_internal_1.getControlFullName, editorTemplates: analytics_widgets_1.editorTemplates, formattingRuleSerializationsInfo: formattingrules_1.formattingRuleSerializationsInfo, StylesEditorHeaderModel: styleseditor_1.StylesEditorHeaderModel, TreeListController: analytics_widgets_internal_1.TreeListController, TableOfContentsLevel: xrTableOfContentsLevel_1.TableOfContentsLevel, propertiesGridEditorsPaddingLeft: analytics_widgets_internal_1.propertiesGridEditorsPaddingLeft, CustomizeLabelPage: customizeLabelPage_1.CustomizeLabelPage, formatSearchResult: _utils_3.formatSearchResult })
        });
        return this;
    };
    ReportDesignerInitializer.prototype.tryApplyBindings = function (applyBindings, element) {
        var _this = this;
        if (applyBindings) {
            this._designerCallbacks.beforeRender && this._designerCallbacks.beforeRender(this);
            $(element).children().remove();
            ko.applyBindings(this.buildingModel, element);
            this.buildingModel.afterRender();
            var dispose = function () {
                _this.buildingModel.dispose();
            };
            analytics_internal_1.addDisposeCallback(element, dispose);
        }
        return this;
    };
    ReportDesignerInitializer.prototype.dispose = function () {
        window.removeEventListener('resize', this._updateCallback);
        window.removeEventListener('resize', this.buildingModel.reportPreviewModel.resizeCallback);
        _super.prototype.dispose.call(this);
        settings_1.controlsFactory().dispose();
        this.removeProperties();
    };
    return ReportDesignerInitializer;
}(analytics_internal_1.CommonDesignerGenerator));
exports.ReportDesignerInitializer = ReportDesignerInitializer;
