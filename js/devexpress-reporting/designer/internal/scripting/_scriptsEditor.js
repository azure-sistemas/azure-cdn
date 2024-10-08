﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_scriptsEditor.js)
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
var _reportScriptService_1 = require("../../services/_reportScriptService");
var _eventArgsTypes_1 = require("./_eventArgsTypes");
var _languageHelper_1 = require("./_languageHelper");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var $ = require("jquery");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var _reportDummyCreator_1 = require("./_reportDummyCreator");
var ScriptsEditor = (function (_super) {
    __extends(ScriptsEditor, _super);
    function ScriptsEditor(report, allControls) {
        var _this = _super.call(this) || this;
        _this._selectionNotEmpty = ko.observable(false);
        _this._canUndo = ko.observable(false);
        _this._canRedo = ko.observable(false);
        _this._cursorPosition = ko.observable().extend({ throttle: 100 });
        _this.guid = ko.observable(null);
        _this.editorContainer = ko.observable();
        _this.editorVisible = ko.observable(false);
        _this.toolbarItems = [];
        _this.controls = ko.observableArray([]);
        _this.selectedControl = ko.observable();
        _this.events = ko.observable([]);
        _this.selectedEvent = ko.observable();
        _this.validateDisabled = ko.observable(false);
        _this.aceOptions = {
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            showPrintMargin: false
        };
        var self = _this;
        var cursorPositionChanging = false;
        _this.languageHelper = new _languageHelper_1.LanguageHelper(report);
        _this._updateEditorState = function () {
            if (_this.editorContainer() && _this.editorContainer().getSession()) {
                _this._canUndo(_this.editorContainer().getSession().getUndoManager().hasUndo());
                _this._canRedo(_this.editorContainer().getSession().getUndoManager().hasRedo());
            }
        };
        _this.selectionChanged = function (editor) {
            _this._selectionNotEmpty(!editor.getSelection().isEmpty());
            _this._updateEditorState();
            editor.focus();
        };
        _this.report = report;
        _this.scriptsText = ko.pureComputed({
            read: function () { return _this.report() && _this.report().scriptsSource(); },
            write: function (newText) { _this.report() && _this.report().scriptsSource(newText); }
        });
        _this._initializeToolbar();
        _this.editorContainer.subscribe(function (editor) {
            if (editor.getSession()) {
                editor.getSession().getSelection().on('changeSelection', function () {
                    _this.selectionChanged(editor);
                });
                editor.getSession().getSelection().on('changeCursor', function () {
                    self._cursorPosition(editor.getCursorPosition());
                });
            }
        });
        _this._cursorPosition.subscribe(function (currentCursorPosition) {
            var currentFunctionName = _this._getFunctionName(currentCursorPosition.row), control, event;
            _this.controls().some(function (ctrl) {
                control = ctrl;
                event = _this._getEventByFunction(ctrl, currentFunctionName);
                return !!event;
            });
            if (control && event) {
                try {
                    cursorPositionChanging = true;
                    _this.selectedControl(control);
                    _this.selectedEvent(event);
                }
                finally {
                    cursorPositionChanging = false;
                }
            }
        });
        _this._disposables.push(ko.computed(function () {
            _this.controls(allControls().filter(function (control) { return !!control.scripts && !control.lockedInUserDesigner(); }));
        }));
        _this.selectedControl.subscribe(function (newSelectedControl) {
            var eventsList = [];
            if (newSelectedControl) {
                var info = newSelectedControl.getInfo();
                var scripts = info.filter(function (x) { return x.propertyName === 'scripts'; })[0];
                eventsList = scripts && scripts.info.filter(function (x) { return ko.unwrap(x.visible) !== false && !ko.unwrap(x.disabled); }).map(function (item) {
                    return item.propertyName.indexOf('on') === 0 ? item.propertyName.substring(2) : item.propertyName;
                });
            }
            _this.selectedEvent('');
            _this.events(eventsList);
        });
        _this._ensureFunction = function (functionName, eventArgsType) {
            var editorContainer = _this.editorContainer();
            if (editorContainer) {
                var editorContent = editorContainer.getValue();
                if (editorContent.indexOf(functionName) === -1) {
                    var newEventHandler = _this.languageHelper.createNewHandler(functionName, eventArgsType);
                    var resultScripts = editorContent.concat(newEventHandler);
                    _this.report().scriptsSource(resultScripts);
                    editorContainer.setValue(resultScripts);
                }
            }
        };
        _this.ensureEvent = function (eventName, functionName, model) {
            var selectedControl = model;
            if (!selectedControl) {
                selectedControl = _this.selectedControl();
            }
            functionName = ScriptsEditor.generateFunctionName(selectedControl, eventName, functionName, _this.allFunctionNames);
            var eventArgsType = ScriptsEditor.getEventArgsType(eventName);
            _this._ensureFunction(functionName, eventArgsType);
            _this._changeSelection(functionName);
            selectedControl.scripts['on' + eventName](functionName);
            _this.selectedControl(selectedControl);
            if (_this.controls.indexOf(selectedControl) === -1) {
                _this.controls.push($.extend({ displayExpr: selectedControl.name }, selectedControl));
            }
            _this.selectedEvent(eventName);
        };
        _this.selectedEvent.subscribe(function (newEvent) {
            if (!cursorPositionChanging && newEvent) {
                var selectedControl = _this.selectedControl();
                var selectedControlNewEvent = selectedControl && selectedControl.scripts['on' + newEvent];
                var newEventFunction = selectedControlNewEvent && selectedControlNewEvent();
                if (!newEventFunction || _this.allFunctionNames.indexOf(newEventFunction) === -1) {
                    _this.ensureEvent(newEvent);
                }
                else {
                    _this._changeSelection(newEventFunction);
                }
            }
        });
        return _this;
    }
    ScriptsEditor.prototype._changeSelection = function (textToSelect) {
        var editorContainer = this.editorContainer();
        if (editorContainer) {
            editorContainer.find(textToSelect, {
                backwards: false,
                wrap: false,
                caseSensitive: false,
                wholeWord: true,
                regExp: false
            }, true);
            editorContainer.findNext();
            editorContainer.findPrevious();
        }
    };
    ScriptsEditor.prototype._initializeToolbar = function () {
        var _this = this;
        var self = this, copyText = ko.observable('');
        this.toolbarItems.push({
            text: 'Cut',
            displayText: function () { return analytics_utils_1.getLocalization('Cut', 'AnalyticsCoreStringId.EditCut'); },
            imageClassName: 'dxrd-image-cut',
            imageTemplateName: 'dxrd-svg-toolbar-cut',
            disabled: ko.pureComputed(function () { return !self.report() || !self._selectionNotEmpty(); }),
            visible: true,
            clickAction: function () {
                copyText(self.editorContainer().getCopyText());
                self.editorContainer().execCommand('cut');
            },
            hotKey: { ctrlKey: true, keyCode: 'X'.charCodeAt(0) }
        });
        this.toolbarItems.push({
            text: 'Copy',
            displayText: function () { return analytics_utils_1.getLocalization('Copy', 'AnalyticsCoreStringId.Cmd_Copy'); },
            imageClassName: 'dxrd-image-copy',
            imageTemplateName: 'dxrd-svg-toolbar-copy',
            disabled: ko.pureComputed(function () { return !self.report() || !self._selectionNotEmpty(); }),
            visible: true,
            clickAction: function () {
                copyText(self.editorContainer().getCopyText());
            },
            hotKey: { ctrlKey: true, keyCode: 'C'.charCodeAt(0) }
        });
        this.toolbarItems.push({
            text: 'Paste',
            displayText: function () { return analytics_utils_1.getLocalization('Paste', 'AnalyticsCoreStringId.Cmd_Paste'); },
            imageClassName: 'dxrd-image-paste',
            imageTemplateName: 'dxrd-svg-toolbar-paste',
            disabled: ko.pureComputed(function () { return !self.report() || !copyText(); }),
            visible: true,
            clickAction: function () {
                self.editorContainer().onPaste(copyText());
            },
            hotKey: { ctrlKey: true, keyCode: 'V'.charCodeAt(0) }
        });
        this.toolbarItems.push({
            text: 'Delete',
            displayText: function () { return analytics_utils_1.getLocalization('Delete', 'AnalyticsCoreStringId.Cmd_Delete'); },
            imageClassName: 'dxrd-image-delete',
            imageTemplateName: 'dxrd-svg-toolbar-delete',
            disabled: ko.pureComputed(function () { return !self.report() || !self._selectionNotEmpty(); }),
            visible: true,
            clickAction: function () {
                self.editorContainer().execCommand('del');
            }
        });
        this.toolbarItems.push({
            text: 'Undo',
            displayText: function () { return analytics_utils_1.getLocalization('Undo', 'AnalyticsCoreStringId.Undo'); },
            imageClassName: 'dxrd-image-undo',
            imageTemplateName: 'dxrd-svg-toolbar-undo',
            disabled: ko.pureComputed(function () { return !self.report() || !self._canUndo(); }),
            visible: true,
            clickAction: function () {
                self.editorContainer().undo(false);
                self._updateEditorState();
            },
            hotKey: { ctrlKey: true, keyCode: 'Z'.charCodeAt(0) },
            hasSeparator: true
        });
        this.toolbarItems.push({
            text: 'Redo',
            displayText: function () { return analytics_utils_1.getLocalization('Redo', 'AnalyticsCoreStringId.Redo'); },
            imageClassName: 'dxrd-image-redo',
            imageTemplateName: 'dxrd-svg-toolbar-redo',
            disabled: ko.pureComputed(function () { return !self.report() || !self._canRedo(); }),
            visible: true,
            clickAction: function () {
                self.editorContainer().redo(false);
                self._updateEditorState();
            },
            hotKey: { ctrlKey: true, keyCode: 'Y'.charCodeAt(0) },
        });
        this.toolbarItems.push({
            text: 'Controls',
            disabled: ko.pureComputed(function () { return !_this.report(); }),
            visible: this.editorVisible,
            clickAction: $.noop,
            control: self.selectedControl,
            controls: self.controls,
            displayExpr: function (value) { return analytics_internal_1.getControlFullName(value); },
            templateName: 'dxrd-scripting-controlchooser',
            hasSeparator: true
        });
        this.toolbarItems.push({
            text: 'Events',
            disabled: ko.pureComputed(function () { return !_this.report(); }),
            visible: this.editorVisible,
            clickAction: $.noop,
            events: self.events,
            event: self.selectedEvent,
            templateName: 'dxrd-scripting-eventchooser'
        });
        this.toolbarItems.push({
            text: 'Validate',
            displayText: function () { return analytics_utils_1.getLocalization('Validate', 'ReportStringId.ScriptEditor_Validate'); },
            imageClassName: 'dxrd-image-validate',
            imageTemplateName: 'dxrd-svg-toolbar-validate',
            disabled: ko.pureComputed(function () {
                return !self.report() || self.validateDisabled() || !self.editorContainer();
            }),
            visible: this.editorVisible,
            hotKey: { ctrlKey: true, keyCode: 'L'.charCodeAt(0) },
            clickAction: function () {
                self.validateDisabled(true);
                self._setScriptsText();
                _reportScriptService_1.ReportScriptService.validateScripts(self.report()).done(function (result) {
                    if (!self.editorContainer())
                        return;
                    var errors = [];
                    result.forEach(function (error) {
                        var linesCount = self.editorContainer().getSession().getLength();
                        errors.push({
                            row: self._getValidIndex(error.Line, linesCount),
                            column: self._getValidIndex(error.Column, linesCount),
                            text: error.ErrorNumber + ' - ' + error.ErrorText,
                            type: error.IsWarning ? 'warning' : 'error'
                        });
                    });
                    self.editorContainer().getSession().setAnnotations(errors);
                    self.validateDisabled(false);
                    if (errors.length > 0) {
                        analytics_internal_1.ShowMessage(analytics_utils_1.getLocalization('The script contains error(s).', 'ASPxReportsStringId.ReportDesigner_ScriptValidation_Message_ContainsErrors'));
                    }
                    else {
                        analytics_internal_1.ShowMessage(analytics_utils_1.getLocalization('The script is valid.', 'ASPxReportsStringId.ReportDesigner_ScriptValidation_Message_ValidScript'), 'success');
                    }
                })
                    .fail(function (result) {
                    analytics_internal_1.ShowMessage(analytics_utils_1.getLocalization('Impossible to validate the script.', 'ASPxReportsStringId.ReportDesigner_ScriptValidation_Error'));
                    self.validateDisabled(false);
                });
            },
            hasSeparator: true
        });
        this.toolbarItems.push({
            text: 'Design',
            displayText: function () { return analytics_utils_1.getLocalization('Design', 'ReportStringId.RepTabCtl_Designer'); },
            imageClassName: 'dxrd-image-design',
            imageTemplateName: 'dxrd-svg-preview-report_designer',
            disabled: ko.pureComputed(function () { return !_this.report(); }),
            visible: this.editorVisible,
            hotKey: { ctrlKey: true, keyCode: 'P'.charCodeAt(0) },
            clickAction: function () {
                self._setScriptsText();
                self.editorVisible(false);
            },
            hasSeparator: true
        });
    };
    ScriptsEditor.prototype._getValidIndex = function (errorPosition, linesCount) {
        var position = errorPosition <= linesCount ? Math.max(1, errorPosition) : 1;
        return Math.max(0, position - 1);
    };
    ScriptsEditor.prototype._setScriptsText = function () {
        var editorContainer = this.editorContainer();
        if (editorContainer) {
            this.scriptsText(editorContainer.getValue());
        }
    };
    ScriptsEditor.prototype._getFunctionName = function (row) {
        var name = '', allLines = this.editorContainer().getSession().getDocument().getAllLines();
        for (var rowIndex = row; rowIndex >= 0; rowIndex--) {
            if (name) {
                break;
            }
            for (var index = 0; index < this.allFunctionNames.length; index++) {
                if (allLines[rowIndex].indexOf(this.allFunctionNames[index]) !== -1) {
                    name = this.allFunctionNames[index];
                    break;
                }
            }
        }
        return name;
    };
    ScriptsEditor.prototype._getEventByFunction = function (control, currentFunctionName) {
        var result = '';
        Object.keys(control.scripts).some(function (propertyName) {
            if (result) {
                return true;
            }
            var eventName = propertyName;
            if (ko.unwrap(control.scripts[eventName]) === currentFunctionName && eventName.indexOf('on') === 0) {
                result = eventName.substring(2);
            }
            return false;
        });
        return result;
    };
    ScriptsEditor.generateFunctionName = function (control, eventName, functionName, allFunctionNames) {
        if (allFunctionNames === void 0) { allFunctionNames = []; }
        if (functionName || ko.unwrap(control.name)) {
            return analytics_internal_1.replaceInvalidSymbols(functionName || (ko.unwrap(control.name) + '_' + eventName));
        }
        else {
            return analytics_internal_1.getUniqueName(allFunctionNames, eventName);
        }
    };
    ScriptsEditor.getEventArgsType = function (eventName) {
        return _eventArgsTypes_1.eventArgsTypes[eventName] || 'System.EventArgs';
    };
    ScriptsEditor.prototype.initialize = function () {
        var _this = this;
        var self = this;
        _reportScriptService_1.ReportScriptService.setCodeDom('', JSON.stringify({
            'XtraReportsLayoutSerializer': _reportDummyCreator_1.ReportDummyCreator._createDummy(this.report().serialize())
        })).done(function (result) {
            _this.guid(result.Guid);
        });
    };
    Object.defineProperty(ScriptsEditor.prototype, "allFunctionNames", {
        get: function () {
            return this.scriptsText() ? this.languageHelper.getFunctionNamesFromScript(this.scriptsText()) : [];
        },
        enumerable: true,
        configurable: true
    });
    return ScriptsEditor;
}(analytics_utils_1.Disposable));
exports.ScriptsEditor = ScriptsEditor;
