﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_model.js)
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
var _loaddispatcher_1 = require("./_loaddispatcher");
var _toolbar_1 = require("./_toolbar");
var _utils_1 = require("./_utils");
var xrRichText_1 = require("../../designer/controls/xrRichText");
var _utils_2 = require("../../designer/internal/_utils");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var ko = require("knockout");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var instance_1 = require("../instance");
var XRRichEditControlModel = (function (_super) {
    __extends(XRRichEditControlModel, _super);
    function XRRichEditControlModel(element, inlineControl, selected) {
        var _this = _super.call(this) || this;
        _this.disableCommands = [
            instance_1.getRichEditInstance().HomeTabCommandId.Find,
            instance_1.getRichEditInstance().HomeTabCommandId.Replace,
        ];
        _this._verticalScrollOffset = 0;
        _this._richHeight = null;
        _this._disposables.push(_this.visible = ko.pureComputed({
            read: function () { return inlineControl.visible() && selected(); },
            write: function (value) { inlineControl.visible(value); }
        }));
        _this._disposables.push(_this.className = ko.computed(function () {
            return ['dxrd-rich-surface', _this.visible() ? '' : 'dxrd-richedit-readonly'].join(' ');
        }));
        _this._element = element;
        _this._element.id = 'rich' + analytics_internal_1.guid().replace(/-/g, '');
        _this._richEdit = instance_1.getRichEditInstance().create(element, _this.createOptions());
        for (var _i = 0, _a = _this.disableCommands; _i < _a.length; _i++) {
            var commandId = _a[_i];
            _this._richEdit.setCommandEnabled(commandId, false);
        }
        _this._dispatcher = new _loaddispatcher_1.RichEditLoadDispatcher(_this);
        _this.createToolbar();
        return _this;
    }
    XRRichEditControlModel.prototype.setRichHeight = function (value) {
        this._richHeight = value;
    };
    XRRichEditControlModel.prototype._elementExists = function () {
        return !!document.getElementById(this._element.id);
    };
    XRRichEditControlModel.prototype.getToolbar = function () { return this._toolbar; };
    XRRichEditControlModel.prototype.getRealControl = function () {
        return this._richEdit;
    };
    XRRichEditControlModel.prototype.getRealControlNative = function () {
        return this._richEdit['_native'];
    };
    XRRichEditControlModel.prototype.updateCanvasScroll = function () {
        this.getRealControlNative().core.viewManager.canvasListener.onCanvasScroll();
    };
    XRRichEditControlModel.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._toolbar.dispose();
        this._dispatcher.dispose();
        this._richEdit.dispose();
    };
    XRRichEditControlModel.prototype.executeCommand = function (commandId, parameter, setFocus) {
        if (setFocus === void 0) { setFocus = false; }
        if (!this._richEdit.isDisposed) {
            this._richEdit.executeCommand(commandId, parameter);
            if (setFocus)
                this._richEdit.focus();
        }
    };
    XRRichEditControlModel.prototype.insertHtml = function (html) {
        if (!this._richEdit.isDisposed)
            this.getRealControlNative().core.commandManager.getCommand(376).execute(false, html);
    };
    XRRichEditControlModel.prototype.createOptions = function () {
        var _this = this;
        var options = instance_1.getRichEditInstance().createOptions();
        options.ribbon.visible = false;
        options.view.viewType = instance_1.getRichEditInstance().ViewType.Simple;
        options.autoCorrect.correctTwoInitialCapitals = true;
        options.confirmOnLosingChanges.enabled = false;
        options.width = '100%';
        options.height = '100%';
        options.contextMenu.enabled = false;
        options.view.simpleViewSettings.paddings = { left: 1.92, right: 1.92, top: 0.01, bottom: 0.01 };
        options.events.commandStateChanged = function (s, e) { return _this._toolbar && _this._toolbar.onCommandStateChanged(s, e); };
        options.fonts = this.getRichEditFonts();
        var _self = this;
        options['internalApi'] = {
            getVerticalScrollOffset: function () {
                return _this._verticalScrollOffset;
            },
            get getVisibleAreaHeight() {
                return _self._richHeight === null ? 0 : function () { return _self._richHeight; };
            }
        };
        return options;
    };
    XRRichEditControlModel.prototype.getFonts = function () {
        return Object.keys(ko.unwrap(analytics_widgets_internal_1.availableFonts)).sort(function (a, b) { return a < b ? -1 : 1; });
    };
    XRRichEditControlModel.prototype.getRichEditFonts = function () {
        var rdFonts = this.getFonts();
        var resultFonts = [];
        for (var _i = 0, rdFonts_1 = rdFonts; _i < rdFonts_1.length; _i++) {
            var fontName = rdFonts_1[_i];
            resultFonts.push({ name: fontName, fontFamily: fontName });
        }
        return {
            fonts: resultFonts,
            mappings: {
                defaultFontName: rdFonts[0],
            },
        };
    };
    XRRichEditControlModel.prototype.createToolbar = function () {
        this._toolbar = new _toolbar_1.ToolbarSurface({
            executeCommand: this.executeCommand.bind(this),
            commandManager: this.getRealControlNative().core.commandManager,
            richEditPublic: this._richEdit,
            visible: this.visible,
            fonts: this.getFonts(),
        });
    };
    XRRichEditControlModel.prototype.saveDocumentNative = function (documentFormat, onResultReady) {
        if (this._richEdit.hasUnsavedChanges) {
            if (onResultReady) {
                var handler = function (sender, arg2) {
                    onResultReady(arg2.base64);
                    sender.events.saving.removeHandler(handler, sender);
                };
                this._richEdit.events.saving.addHandler(handler, this._richEdit);
            }
            this._richEdit.saveDocument(documentFormat);
        }
        else {
            this._richEdit.exportToBase64(function (base64) {
                if (onResultReady) {
                    onResultReady(base64);
                }
            }, documentFormat);
        }
    };
    XRRichEditControlModel.prototype.newDocumentNative = function (onResultReady) {
        if (onResultReady) {
            var handler = function (sender, arg2) {
                onResultReady();
                sender.events.documentLoaded.removeHandler(handler, sender);
            };
            this._richEdit.events.documentLoaded.addHandler(handler, this._richEdit);
        }
        this.executeCommand(instance_1.getRichEditInstance().FileTabCommandId.CreateDocument);
    };
    XRRichEditControlModel.prototype.openDocumentNative = function (base64, documentFormat, onResultReady, onError) {
        var _this = this;
        var handler = function (sender, arg2) {
            onResultReady();
            sender.events.documentLoaded.removeHandler(handler, sender);
        };
        if (onResultReady) {
            this._richEdit.events.documentLoaded.addHandler(handler, this._richEdit);
        }
        this._richEdit.openDocument(base64, '', documentFormat, function (result) {
            if (!result && onError) {
                _this._richEdit.events.documentLoaded.removeHandler(handler, _this._richEdit);
                onError();
            }
        });
    };
    XRRichEditControlModel.prototype.saveDocument = function (documentFormat, onResultReady) {
        this._dispatcher.process({ documentConverted: onResultReady, queueAction: _utils_1.RichAction.SaveDocument, documentFormat: documentFormat, base64: undefined, ready: undefined, errorCallBack: undefined });
    };
    XRRichEditControlModel.prototype.newDocument = function (onResultReady) {
        this._dispatcher.process({ documentConverted: undefined, queueAction: _utils_1.RichAction.NewDocument, documentFormat: undefined, base64: undefined, ready: onResultReady, errorCallBack: undefined });
    };
    XRRichEditControlModel.prototype.openDocument = function (base64, documentFormat, onResultReady, onError) {
        this._dispatcher.process({ documentConverted: undefined, queueAction: _utils_1.RichAction.OpenDocument, documentFormat: documentFormat, base64: base64, ready: onResultReady, errorCallBack: onError });
    };
    XRRichEditControlModel.prototype.changeSize = function () {
        this._richEdit.adjust();
    };
    XRRichEditControlModel.prototype.focusChanged = function (inFocus) {
        if (!inFocus) {
            this._richEdit.selection.setSelection(0);
        }
        this.changeSize();
    };
    XRRichEditControlModel.prototype.getText = function (interval) {
        return this._richEdit.document.getText(interval);
    };
    XRRichEditControlModel.prototype.documentIsEmpty = function () {
        return this._richEdit.document.length == 1;
    };
    return XRRichEditControlModel;
}(analytics_utils_1.Disposable));
exports.XRRichEditControlModel = XRRichEditControlModel;
var RichLoader = (function (_super) {
    __extends(RichLoader, _super);
    function RichLoader(richEdit) {
        var _this = _super.call(this) || this;
        _this.richEdit = richEdit;
        return _this;
    }
    Object.defineProperty(RichLoader.prototype, "textConverted", {
        set: function (textConverted) {
            this._textConverted = textConverted;
        },
        enumerable: true,
        configurable: true
    });
    RichLoader.prototype.load = function (loadData) {
        var _this = this;
        if (!loadData.data || loadData.dataFormat === xrRichText_1.XRRichTextStreamType.HtmlText) {
            this.richEdit.newDocument(function () {
                _this.richEdit.insertHtml(loadData.data || '');
                _this.richEdit.saveDocument(2, function (result) {
                    _this._textConverted(result);
                });
            });
            return;
        }
        var formatKey;
        if (loadData.dataFormat === xrRichText_1.XRRichTextStreamType.PlainText) {
            formatKey = instance_1.getRichEditInstance().DocumentFormat.PlainText;
        }
        else if (loadData.dataFormat === xrRichText_1.XRRichTextStreamType.RtfText) {
            formatKey = 2;
        }
        else if (loadData.dataFormat === xrRichText_1.XRRichTextStreamType.XmlText) {
            formatKey = instance_1.getRichEditInstance().DocumentFormat.OpenXml;
        }
        this.richEdit.openDocument(loadData.data, formatKey, function () {
            _this.richEdit.saveDocument(2, function (result) {
                _this._textConverted(result);
            });
        }, function () {
            _this.richEdit.openDocument(loadData.oldText, 2, function () {
                _this.richEdit.saveDocument(2, function (result) {
                    _this._textConverted(result);
                    analytics_internal_1.NotifyAboutWarning('The document is corrupted and cannot be opened', true);
                });
            });
        });
    };
    return RichLoader;
}(analytics_utils_1.Disposable));
exports.RichLoader = RichLoader;
var RichEditPaddingModelWrapper = (function (_super) {
    __extends(RichEditPaddingModelWrapper, _super);
    function RichEditPaddingModelWrapper(padding, _richEdit) {
        var _this = _super.call(this) || this;
        _this._richEdit = _richEdit;
        _this._paddingModel = new analytics_elements_1.PaddingModel();
        _this._disposables.push(padding.subscribe(function (newVal) {
            _this._paddingModel.applyFromString(newVal);
            _this._setPaddings();
        }));
        _this._disposables.push(_this._paddingModel);
        return _this;
    }
    RichEditPaddingModelWrapper.prototype._setPaddings = function () {
        var _this = this;
        var rich = this._richEdit.getRealControl();
        var paddings = rich.simpleViewSettings.paddings;
        ['left', 'right', 'top', 'bottom'].forEach(function (side) { return paddings[side] = _utils_2.recalculateUnit(_this._paddingModel[side]() || 0.01, _this._paddingModel.dpi()); });
        rich.simpleViewSettings.paddings = paddings;
    };
    return RichEditPaddingModelWrapper;
}(analytics_utils_1.Disposable));
exports.RichEditPaddingModelWrapper = RichEditPaddingModelWrapper;
var RichEditFontModel = (function (_super) {
    __extends(RichEditFontModel, _super);
    function RichEditFontModel(value, richEdit, foreColor, controller) {
        var _this = _super.call(this, value) || this;
        _this.richEdit = richEdit;
        _this.controller = controller;
        for (var _i = 0, _a = [
            [_this.family, function (fontName) { return _this.applyCommand(instance_1.getRichEditInstance().HomeTabCommandId.ChangeFontName, fontName); }],
            [_this.size, function (size) { return _this.applyCommand(instance_1.getRichEditInstance().HomeTabCommandId.ChangeFontSize, size); }],
            [foreColor, function (foreColor) { return _this.applyCommand(instance_1.getRichEditInstance().HomeTabCommandId.ChangeFontForeColor, foreColor); }],
            [_this.modificators.bold, function (bold) { return _this.applyCommand(instance_1.getRichEditInstance().HomeTabCommandId.ToggleFontBold, bold); }],
            [_this.modificators.italic, function (italic) { return _this.applyCommand(instance_1.getRichEditInstance().HomeTabCommandId.ToggleFontItalic, italic); }],
            [_this.modificators.strikeout, function (strikeout) { return _this.applyCommand(instance_1.getRichEditInstance().HomeTabCommandId.ToggleFontStrikeout, strikeout); }],
            [_this.modificators.underline, function (underline) { return _this.applyCommand(instance_1.getRichEditInstance().HomeTabCommandId.ToggleFontUnderline, underline); }],
        ]; _i < _a.length; _i++) {
            var data = _a[_i];
            _this._disposables.push(data[0].subscribe(data[1]));
        }
        return _this;
    }
    RichEditFontModel.prototype.applyCommand = function (commandId, parameter) {
        var _this = this;
        this.richEdit.getRealControl().executeCommand(commandId, parameter);
        if (!this.richEdit.visible())
            this.richEdit.saveDocument(2, function (newRtf) { return _this.controller.setRtfString(newRtf); });
    };
    return RichEditFontModel;
}(analytics_widgets_internal_1.FontModel));
exports.RichEditFontModel = RichEditFontModel;
