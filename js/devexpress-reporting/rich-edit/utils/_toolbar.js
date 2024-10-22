﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_toolbar.js)
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
var customizeToolbarActions_1 = require("../customizeToolbarActions");
var _locker_1 = require("../../common/utils/_locker");
var _pictureEditorToolbarItem_1 = require("../../viewer/widgets/pictureEditor/_pictureEditorToolbarItem");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var ko = require("knockout");
var $ = require("jquery");
var instance_1 = require("../instance");
var ComponentCommon = (function (_super) {
    __extends(ComponentCommon, _super);
    function ComponentCommon(options, info) {
        var _this = _super.call(this) || this;
        _this.itemKey = 'value';
        _this.locker = new _locker_1.Locker();
        _this.options = options;
        _this.value = ko.observable();
        if (info.template)
            _this.template = info.template;
        _this.init(info);
        return _this;
    }
    ComponentCommon.prototype._updateStateInternal = function (commandIdMap) {
        var _this = this;
        if (!commandIdMap || this.needUpdateState(commandIdMap))
            this.locker.lock(function () { return _this.updateState(); });
    };
    ComponentCommon.prototype._executeCommand = function (value, command) {
        if (this.locker.isUpdate)
            return;
        if (this.action)
            this.action(this.options.richEditPublic, value);
        else
            this.options.executeCommand(command, this.hasCustomValue() ? this.getConverter().toModel(value) : undefined, true);
        this._updateStateInternal();
    };
    ComponentCommon.prototype.executeCommand = function (value, command) {
        this._executeCommand(value, command);
    };
    ComponentCommon.prototype.unwrapItem = function (item) {
        return $.extend({}, item, { command: item.command });
    };
    ComponentCommon.prototype.getConverter = function () {
        return {
            toModel: function (newValue) { return newValue; },
            fromModel: function (newValue) { return newValue; },
        };
    };
    ComponentCommon.prototype.init = function (info) {
        if (info) {
            this.id = info.id;
            this.text = info.text;
            this.visible = info.visible === false ? false : true;
            if (info.action)
                this.action = info.action;
        }
    };
    ComponentCommon.prototype.hasCustomValue = function () {
        return false;
    };
    return ComponentCommon;
}(analytics_utils_1.Disposable));
var CustomComponent = (function (_super) {
    __extends(CustomComponent, _super);
    function CustomComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomComponent.prototype.updateState = function () { };
    CustomComponent.prototype.needUpdateState = function (_commandIdMap) {
        return true;
    };
    return CustomComponent;
}(ComponentCommon));
exports.CustomComponent = CustomComponent;
var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.prototype.needUpdateState = function (commandIdMap) {
        return !!commandIdMap[this._command];
    };
    Component.prototype.init = function (info) {
        var _this = this;
        _super.prototype.init.call(this, info);
        this.item = this.unwrapItem(info);
        this._command = this.item.command;
        if (this._command && !this.options.richEditPublic.isDisposed) {
            var state = this.options.richEditPublic.getCommandState(this._command);
            if (state.enabled) {
                this.value(this.getConverter().fromModel(state.value));
                this.locker.lock(function () { return _this._updateStateInternal(); });
            }
        }
        this._disposables.push(this.value.subscribe(function (value) { return _this._executeCommand(value, _this.item.command); }));
    };
    Component.prototype.updateState = function () {
        if (this._command && this.hasCustomValue()) {
            var state = this.options.richEditPublic.getCommandState(this._command);
            if (state.enabled)
                this.value(this.getConverter().fromModel(state.value));
        }
    };
    return Component;
}(ComponentCommon));
exports.Component = Component;
var ComponentButtonGroup = (function (_super) {
    __extends(ComponentButtonGroup, _super);
    function ComponentButtonGroup(options, info) {
        var _this = _super.call(this, options, info) || this;
        _this.itemKey = 'command';
        _this.template = _this.template || 'dxrd-rich-edit-toolbar-button-group';
        return _this;
    }
    ComponentButtonGroup.prototype.needUpdateState = function (commandIdMap) {
        var _this = this;
        return this.items.some(function (item) { return !!commandIdMap[_this.getCommand(item)]; });
    };
    ComponentButtonGroup.prototype.init = function (info) {
        var _this = this;
        _super.prototype.init.call(this, info);
        this.selectionMode = info.selectionMode || 'single';
        this.selectedItems = ko.observableArray([]);
        this.items = info.items.map(function (item) { return _this.unwrapItem(item); });
        this._disposables.push(this.selectedItems.subscribe(function (changes) {
            _this.onSelectItems(changes);
        }, null, 'arrayChange'));
    };
    ComponentButtonGroup.prototype.onSelectItems = function (changes) {
        var _this = this;
        changes.forEach(function (change) {
            if (_this.selectionMode === 'multiple' && change.status === 'deleted' || change.status === 'added') {
                _this._executeCommand(change.value.value, change.value.command);
            }
        });
    };
    ComponentButtonGroup.prototype.getCommand = function (item) {
        return item.command;
    };
    ComponentButtonGroup.prototype.updateState = function () {
        var _this = this;
        var selected = [];
        this.items.forEach(function (item) {
            var command = _this.getCommand(item);
            if (item.command === command) {
                var commandState = _this.options.richEditPublic.getCommandState(command);
                if (commandState.enabled) {
                    var value = commandState.value;
                    if (!!value)
                        selected.push(item);
                }
            }
        });
        this.selectedItems(selected);
    };
    return ComponentButtonGroup;
}(ComponentCommon));
exports.ComponentButtonGroup = ComponentButtonGroup;
var ComponentButton = (function (_super) {
    __extends(ComponentButton, _super);
    function ComponentButton(options, info) {
        var _this = _super.call(this, options, info) || this;
        _this.icon = info.icon;
        _this.hint = info.hint;
        _this.template = _this.template || 'dxrd-button-with-template';
        return _this;
    }
    ComponentButton.prototype.clickAction = function () {
        this._executeCommand(undefined, this.item.command);
    };
    return ComponentButton;
}(Component));
exports.ComponentButton = ComponentButton;
var ComponentComboBox = (function (_super) {
    __extends(ComponentComboBox, _super);
    function ComponentComboBox(options, info) {
        var _this = _super.call(this, options, info) || this;
        _this.validationRules = [];
        _this.supportCustomValue = false;
        _this.items = info.items;
        _this.template = _this.template || 'dxrd-rich-toolbar-combobox';
        return _this;
    }
    ComponentComboBox.prototype.hasCustomValue = function () { return true; };
    return ComponentComboBox;
}(Component));
exports.ComponentComboBox = ComponentComboBox;
var ComponentFontSizeComboBox = (function (_super) {
    __extends(ComponentFontSizeComboBox, _super);
    function ComponentFontSizeComboBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.validationRules = [{ type: 'numeric' }];
        _this.supportCustomValue = true;
        return _this;
    }
    return ComponentFontSizeComboBox;
}(ComponentComboBox));
exports.ComponentFontSizeComboBox = ComponentFontSizeComboBox;
var ComponentColorPicker = (function (_super) {
    __extends(ComponentColorPicker, _super);
    function ComponentColorPicker(options, info) {
        var _this = _super.call(this, options, info) || this;
        _this.template = _this.template || 'dxrd-richEdit-toolbar-colorpicker';
        return _this;
    }
    ComponentColorPicker.prototype.getConverter = function () {
        var _this = this;
        return {
            fromModel: function (newValue) {
                switch (newValue) {
                    case 'Auto':
                    case 'NoColor':
                    case undefined:
                        return _this.item.defaultValue;
                    default: {
                        var color = newValue;
                        return "rgb(" + [
                            parseInt(color.substr(1, 2), 16),
                            parseInt(color.substr(3, 2), 16),
                            parseInt(color.substr(5, 2), 16)
                        ].join(', ') + ")";
                    }
                }
            },
            toModel: function (newValue) { return newValue; }
        };
    };
    ComponentColorPicker.prototype.hasCustomValue = function () { return true; };
    return ComponentColorPicker;
}(Component));
exports.ComponentColorPicker = ComponentColorPicker;
var ComponentCollection = (function () {
    function ComponentCollection(id, title, visible, template) {
        if (title === void 0) { title = ''; }
        if (visible === void 0) { visible = true; }
        if (template === void 0) { template = 'dxrd-rich-edit-toolbar-component-collection'; }
        var _this = this;
        this.id = id;
        this.title = title;
        this.visible = visible;
        this.template = template;
        this.showTitle = function () { return _this.title; };
    }
    return ComponentCollection;
}());
exports.ComponentCollection = ComponentCollection;
var ToolbarSurface = (function (_super) {
    __extends(ToolbarSurface, _super);
    function ToolbarSurface(options) {
        var _this = _super.call(this) || this;
        _this._popover = new _pictureEditorToolbarItem_1.PopupComponentBase();
        _this._getDefaultItems = function (fonts) {
            return [
                {
                    id: customizeToolbarActions_1.ToolbarGroupId.AlignmentAndFormatting,
                    items: [
                        {
                            id: customizeToolbarActions_1.ToolbarActionId.ParagraphAlignmentButtonGroup,
                            actionType: 'ButtonGroup',
                            selectionMode: 'single',
                            _customComponent: 'alignmentButtonGroup',
                            items: [
                                { actionType: 'Button', command: instance_1.getRichEditInstance().HomeTabCommandId.ToggleParagraphAlignmentLeft, icon: ' dxre-icon-AlignLeft', hint: analytics_utils_1.getLocalization('Align Text Left', 'XtraRichEditStringId.MenuCmd_ParagraphAlignmentLeft') },
                                { actionType: 'Button', command: instance_1.getRichEditInstance().HomeTabCommandId.ToggleParagraphAlignmentCenter, icon: ' dxre-icon-AlignCenter', hint: analytics_utils_1.getLocalization('Center', 'XtraRichEditStringId.MenuCmd_ParagraphAlignmentCenter') },
                                { actionType: 'Button', command: instance_1.getRichEditInstance().HomeTabCommandId.ToggleParagraphAlignmentRight, icon: ' dxre-icon-AlignRight', hint: analytics_utils_1.getLocalization('Align Text Right', 'XtraRichEditStringId.MenuCmd_ParagraphAlignmentRight') }
                            ]
                        },
                        {
                            id: customizeToolbarActions_1.ToolbarActionId.HyperlinkButton, actionType: 'Button', command: instance_1.getRichEditInstance().InsertTabCommandId.ShowHyperlinkDialog, icon: ' dxre-icon-Hyperlink', hint: analytics_utils_1.getLocalization('Hyperlink...', 'XtraRichEditStringId.MenuCmd_Hyperlink'),
                        },
                        {
                            id: customizeToolbarActions_1.ToolbarActionId.ClearFormattingButton, actionType: 'Button', command: instance_1.getRichEditInstance().HomeTabCommandId.ClearFormatting, icon: ' dxre-icon-ClearFormatting', hint: analytics_utils_1.getLocalization('Clear Formatting', 'XtraRichEditStringId.MenuCmd_ClearFormatting')
                        }
                    ],
                },
                {
                    id: customizeToolbarActions_1.ToolbarGroupId.FontStyleAndCase,
                    items: [
                        {
                            id: customizeToolbarActions_1.ToolbarActionId.FontStyleButtonGroup,
                            actionType: 'ButtonGroup',
                            selectionMode: 'multiple',
                            items: [
                                { actionType: 'Button', command: instance_1.getRichEditInstance().HomeTabCommandId.ToggleFontBold, icon: ' dxre-icon-Bold', hint: analytics_utils_1.getLocalization('Bold', 'System.Drawing.Font.Bold') },
                                { actionType: 'Button', command: instance_1.getRichEditInstance().HomeTabCommandId.ToggleFontItalic, icon: ' dxre-icon-Italic', hint: analytics_utils_1.getLocalization('Italic', 'System.Drawing.Font.Italic') },
                                { actionType: 'Button', command: instance_1.getRichEditInstance().HomeTabCommandId.ToggleFontUnderline, icon: ' dxre-icon-Underline', hint: analytics_utils_1.getLocalization('Underline', 'System.Drawing.Font.Underline') },
                                { actionType: 'Button', command: instance_1.getRichEditInstance().HomeTabCommandId.ToggleFontStrikeout, icon: ' dxre-icon-Strikeout', hint: analytics_utils_1.getLocalization('Strikeout', 'System.Drawing.Font.Strikeout') }
                            ]
                        },
                        { id: customizeToolbarActions_1.ToolbarActionId.ToggleCaseButton, actionType: 'Button', command: instance_1.getRichEditInstance().HomeTabCommandId.CapitalizationToggleCase, icon: ' dxre-icon-ChangeTextCase', hint: analytics_utils_1.getLocalization('tOGGLE cASE', 'XtraRichEditStringId.MenuCmd_ToggleTextCase') }
                    ]
                },
                {
                    id: customizeToolbarActions_1.ToolbarGroupId.FontSize,
                    title: analytics_utils_1.getLocalization('Font Size', 'XtraRichEditStringId.MenuCmd_ChangeFontSize'),
                    items: [{ id: customizeToolbarActions_1.ToolbarActionId.FontSizeComboBox, actionType: 'ComboBox', command: instance_1.getRichEditInstance().HomeTabCommandId.ChangeFontSize, items: [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 26, 28, 36, 48, 72] }],
                },
                {
                    id: customizeToolbarActions_1.ToolbarGroupId.Font,
                    title: analytics_utils_1.getLocalization('Font', 'XtraRichEditStringId.MenuCmd_ChangeFontName'),
                    items: [{ id: customizeToolbarActions_1.ToolbarActionId.FontComboBox, actionType: 'ComboBox', command: instance_1.getRichEditInstance().HomeTabCommandId.ChangeFontName, items: fonts }],
                },
                {
                    id: customizeToolbarActions_1.ToolbarGroupId.FontColor,
                    title: analytics_utils_1.getLocalization('Font Color', 'XtraRichEditStringId.MenuCmd_ChangeFontColor'),
                    items: [{ id: customizeToolbarActions_1.ToolbarActionId.FontColorBox, actionType: 'ColorBox', command: instance_1.getRichEditInstance().HomeTabCommandId.ChangeFontForeColor, defaultValue: 'rgb(0, 0, 0)' }],
                },
                {
                    id: customizeToolbarActions_1.ToolbarGroupId.BackgroundColor,
                    title: analytics_utils_1.getLocalization('Background Color', 'DevExpress.XtraReports.UI.XRRichTextBoxBase.BackColor'),
                    items: [{ id: customizeToolbarActions_1.ToolbarActionId.BackgroundColorBox, actionType: 'ColorBox', command: instance_1.getRichEditInstance().HomeTabCommandId.ChangeFontHighlightColor, defaultValue: 'rgb(255, 255, 255)' }]
                }
            ];
        };
        _this.onContentReady = _this._popover.onContentReady;
        _this.getPositionTarget = function (element) {
            return $(element).closest('.' + _this.parentClass).closest('.dxrd-control')[0];
        };
        _this.closeOnOutsideClick = function (e) {
            if (_this._popover.closeOnOutsideClick(e)) {
                _this.visible(false);
                return false;
            }
            return true;
        };
        _this.template = 'dxrd-richedit-toolbar';
        _this.parentClass = 'dxrd-rich-surface';
        _this.getPopupContainer = analytics_internal_1.getParentContainer;
        _this.componentCollection = [];
        _this.visible = options.visible;
        var toolbarItems = analytics_internal_1.extend(true, [], _this._getDefaultItems(options.fonts));
        var getById = function (itemId) {
            var matchedItem;
            var group = toolbarItems.filter(function (item) {
                if (matchedItem)
                    return false;
                if (item.id === itemId)
                    return true;
                matchedItem = item.items.filter(function (x) { return x.id === itemId; })[0];
            })[0];
            return matchedItem || group;
        };
        customizeToolbarActions_1.events().call('customizeToolbarActions', { actions: toolbarItems, getById: getById });
        _this.componentCollection = _this._initComponentCollection(toolbarItems, options);
        if ((_this.componentCollection || []).every(function (component) { return !component.visible; }))
            _this.visible = ko.observable(false);
        return _this;
    }
    ToolbarSurface.prototype._initComponentCollection = function (items, options) {
        var _this = this;
        return items.map(function (item) {
            var component = new ComponentCollection(item.id, item.title, item.visible, item.template);
            component.items = _this._initComponents(item.items, options);
            return _this._extendTemplateOptions(item, component);
        });
    };
    ToolbarSurface.prototype._initComponents = function (items, options) {
        var _this = this;
        return items.map(function (item) {
            var component;
            switch (item.actionType) {
                case 'ButtonGroup':
                    component = new ComponentButtonGroup(options, item);
                    break;
                case 'Button':
                    component = new ComponentButton(options, item);
                    break;
                case 'ComboBox':
                    component = item.id === customizeToolbarActions_1.ToolbarActionId.FontSizeComboBox ? new ComponentFontSizeComboBox(options, item) : new ComponentComboBox(options, item);
                    break;
                case 'ColorBox':
                    component = new ComponentColorPicker(options, item);
                    break;
                default:
                    component = new CustomComponent(options, item);
            }
            return _this._extendTemplateOptions(item, component);
        });
    };
    ToolbarSurface.prototype._extendTemplateOptions = function (item, el) {
        if (item.template)
            return analytics_internal_1.extend(true, {}, el, item);
        return el;
    };
    ToolbarSurface.prototype.onCommandStateChanged = function (sender, args) {
        if (args.commands) {
            var commandIdMap = {};
            args.commands.forEach(function (commandId) { return commandIdMap[commandId] = true; });
            for (var _i = 0, _a = this.componentCollection; _i < _a.length; _i++) {
                var group = _a[_i];
                if (group.items) {
                    for (var _b = 0, _c = group.items; _b < _c.length; _b++) {
                        var item = _c[_b];
                        if (item._updateStateInternal) {
                            item._updateStateInternal(commandIdMap);
                        }
                    }
                }
            }
        }
        else
            this.componentCollection.forEach(function (group) { return (group.items || []).forEach(function (item) { return item._updateStateInternal && item._updateStateInternal(); }); });
    };
    return ToolbarSurface;
}(analytics_utils_1.Disposable));
exports.ToolbarSurface = ToolbarSurface;
