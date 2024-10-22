﻿/**
* DevExpress HTML/JS Reporting (common\binding\eventGenerator.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = require("../metadata");
var exportOptionsEventArgs_1 = require("./exportOptionsEventArgs");
var analytics_localization_1 = require("@devexpress/analytics-core/analytics-localization");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var localization = require("devextreme/localization");
var EventGenerator = (function () {
    function EventGenerator() {
    }
    EventGenerator.generateCustomizeLocalizationCallback = function (fireEvent) {
        return function (localizationCallbacks) {
            fireEvent('CustomizeLocalization', {
                LoadMessages: function (messages) {
                    if (!messages)
                        return;
                    if (typeof messages.then === 'function') {
                        localizationCallbacks.push(messages);
                    }
                    else {
                        analytics_localization_1.loadMessages(messages);
                    }
                },
                SetAvailableCultures: function (customCultures) {
                    var newCultures = {};
                    newCultures[metadata_1.defaultCulture] = metadata_1.availableCultures()[metadata_1.defaultCulture];
                    analytics_internal_1.extend(newCultures, customCultures);
                    metadata_1.availableCultures(newCultures);
                },
                WidgetLocalization: localization
            });
        };
    };
    EventGenerator.generateDesignerEvents = function (fireEvent) {
        var self = this;
        function customizeActions(actions) {
            fireEvent('CustomizeMenuActions', {
                Actions: actions,
                GetById: function (actionId) {
                    return actionId ? actions.filter(function (item) { return actionId === item.id; })[0] : null;
                }
            });
        }
        function beforeRender(designerModel) {
            fireEvent('BeforeRender', designerModel);
        }
        function customizeParameterEditors(parameter, info) {
            fireEvent('CustomizeParameterEditors', {
                parameter: parameter,
                info: info
            });
        }
        function customizeParameterLookUpSource(parameter, items) {
            var arg = {
                parameter: parameter,
                items: items,
                dataSource: null
            };
            fireEvent('CustomizeParameterLookUpSource', arg);
            return arg.dataSource;
        }
        function exitDesigner() {
            fireEvent('ExitDesigner');
        }
        function reportSaving(args) {
            var arg = {
                Url: args.url,
                Report: args.report,
                Cancel: args.cancel
            };
            fireEvent('ReportSaving', arg);
            args.cancel = arg.Cancel;
        }
        function reportSaved(args) {
            var arg = {
                Url: args.url,
                Report: args.report
            };
            fireEvent('ReportSaved', arg);
        }
        function reportOpened(args) {
            var arg = {
                Url: args.url,
                Report: args.report
            };
            fireEvent('ReportOpened', arg);
        }
        function reportOpening(args) {
            var arg = {
                Url: args.url,
                Report: args.report,
                Cancel: args.cancel
            };
            fireEvent('ReportOpening', arg);
            args.cancel = arg.Cancel;
        }
        function tabChanged(tab) {
            fireEvent('TabChanged', {
                Tab: tab
            });
        }
        function onServerError(args) {
            fireEvent('OnServerError', { Error: args });
        }
        function componentAdded(args) {
            fireEvent('ComponentAdded', { Model: args.model, Parent: args.parent });
        }
        function customizeParts(parts) {
            fireEvent('CustomizeElements', {
                Elements: parts,
                GetById: function (id) {
                    return id
                        ? parts.filter(function (item) { return id === item.id; })[0]
                        : null;
                }
            });
        }
        function customizeSaveDialog(popup) {
            fireEvent('CustomizeSaveDialog', {
                Popup: popup,
                Customize: function (template, model) {
                    popup.customize(template, model);
                }
            });
        }
        function customizeSaveAsDialog(popup) {
            fireEvent('CustomizeSaveAsDialog', {
                Popup: popup,
                Customize: function (template, model) {
                    popup.customize(template, model);
                }
            });
        }
        function customizeOpenDialog(popup) {
            fireEvent('CustomizeOpenDialog', {
                Popup: popup,
                Customize: function (template, model) {
                    popup.customize(template, model);
                }
            });
        }
        function customizeToolbox(controlsFactory) {
            fireEvent('CustomizeToolbox', {
                ControlsFactory: controlsFactory
            });
        }
        function customizeFieldListActions(item, actions) {
            fireEvent('CustomizeFieldListActions', {
                Item: item,
                Actions: actions
            });
        }
        function customizeWizard(type, wizard) {
            fireEvent('CustomizeWizard', {
                Type: type,
                Wizard: wizard
            });
        }
        function reportTabClosing(tab, deffered) {
            var args = {
                Tab: tab,
                ReadyToClose: deffered,
                Handled: false
            };
            fireEvent('ReportTabClosing', args);
            return args.Handled;
        }
        function reportTabClosed(tab) {
            fireEvent('ReportTabClosed', {
                Tab: tab
            });
        }
        return {
            customizeActions: customizeActions,
            reportTabClosing: reportTabClosing,
            reportTabClosed: reportTabClosed,
            customizeParameterEditors: customizeParameterEditors,
            customizeParameterLookUpSource: customizeParameterLookUpSource,
            exitDesigner: exitDesigner,
            reportSaving: reportSaving,
            reportSaved: reportSaved,
            reportOpening: reportOpening,
            reportOpened: reportOpened,
            tabChanged: tabChanged,
            onServerError: onServerError,
            customizeParts: customizeParts,
            componentAdded: componentAdded,
            customizeSaveDialog: customizeSaveDialog,
            customizeSaveAsDialog: customizeSaveAsDialog,
            customizeOpenDialog: customizeOpenDialog,
            customizeToolbox: customizeToolbox,
            customizeLocalization: EventGenerator.generateCustomizeLocalizationCallback(fireEvent),
            customizeFieldListActions: customizeFieldListActions,
            beforeRender: beforeRender,
            customizeWizard: customizeWizard
        };
    };
    EventGenerator.generatePreviewEvents = function (fireEvent, prefix) {
        function customizeParameterEditors(parameter, info) {
            fireEvent('CustomizeParameterEditors', { parameter: parameter, info: info });
        }
        function customizeParts(parts) {
            fireEvent([prefix, 'CustomizeElements'].join(''), {
                Elements: parts,
                GetById: function (templateId) {
                    return templateId ? parts.filter(function (item) { return templateId === item.templateName; })[0] : null;
                }
            });
        }
        function beforeRender(designerModel) {
            fireEvent('BeforeRender', designerModel);
        }
        function customizeActions(actions) {
            fireEvent([prefix, 'CustomizeMenuActions'].join(''), {
                Actions: actions,
                GetById: function (actionId) {
                    return actionId ? actions.filter(function (item) { return actionId === item.id; })[0] : null;
                }
            });
        }
        function customizeParameterLookUpSource(parameter, items) {
            var arg = {
                parameter: parameter,
                items: items,
                dataSource: null
            };
            fireEvent('CustomizeParameterLookUpSource', arg);
            return arg.dataSource;
        }
        function previewClick(pageIndex, brick, defaultHandler) {
            var arg = {
                PageIndex: pageIndex,
                Brick: brick,
                DefaultHandler: defaultHandler,
                GetBrickText: function () { return brick && brick.text(); },
                GetBrickValue: function (key) {
                    if (key === void 0) { key = 'value'; }
                    var contentValue = brick && brick.content && brick.content.filter(function (x) { return x.Key === key; })[0];
                    return contentValue && contentValue.Value;
                },
                Handled: false
            };
            fireEvent('PreviewClick', arg);
            return arg.Handled;
        }
        function parametersReset(model, parameters) {
            fireEvent([prefix, 'ParametersReset'].join(''), {
                ParametersViewModel: model,
                Parameters: parameters
            });
        }
        function parametersSubmitted(model, parameters) {
            fireEvent([prefix, 'ParametersSubmitted'].join(''), {
                ParametersViewModel: model,
                Parameters: parameters
            });
        }
        function parametersInitialized(model, info, submit, shouldRequestParameters) {
            fireEvent([prefix, 'ParametersInitialized'].join(''), {
                ParametersModel: model,
                ActualParametersInfo: info,
                Submit: submit,
                ShouldRequestParameters: shouldRequestParameters
            });
        }
        function editingFieldChanged(field, oldValue, newValue) {
            var arg = {
                Field: field,
                OldValue: oldValue,
                NewValue: newValue
            };
            fireEvent([prefix, 'EditingFieldChanged'].join(''), arg);
            return arg.NewValue;
        }
        function documentReady(documentId, reportId, pageCount) {
            fireEvent([prefix, 'DocumentReady'].join(''), {
                ReportId: reportId,
                DocumentId: documentId,
                PageCount: pageCount
            });
        }
        function onServerError(args) {
            fireEvent('OnServerError', { Error: args });
        }
        function onExport(args) {
            fireEvent([prefix, 'OnExport'].join(''), args);
        }
        function customizeExportOptions(options) {
            var arg = new exportOptionsEventArgs_1.CustomizeExportOptionsEventArgs(options);
            fireEvent([prefix, 'CustomizeExportOptions'].join(''), arg);
        }
        var result = {
            previewClick: previewClick,
            documentReady: documentReady,
            editingFieldChanged: editingFieldChanged,
            parametersSubmitted: parametersSubmitted,
            parametersInitialized: parametersInitialized,
            parametersReset: parametersReset,
            customizeParameterLookUpSource: customizeParameterLookUpSource,
            customizeParameterEditors: customizeParameterEditors,
            customizeActions: customizeActions,
            customizeParts: customizeParts,
            customizeExportOptions: customizeExportOptions,
            onServerError: onServerError,
            onExport: onExport
        };
        if (!prefix) {
            result['beforeRender'] = beforeRender;
            result['customizeLocalization'] = EventGenerator.generateCustomizeLocalizationCallback(fireEvent);
        }
        return result;
    };
    return EventGenerator;
}());
exports.EventGenerator = EventGenerator;
