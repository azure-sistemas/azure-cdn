﻿/**
* DevExpress HTML/JS Reporting (common\utils\editingFieldExtensions.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _pictureEditorTypes_1 = require("../../viewer/widgets/pictureEditor/_pictureEditorTypes");
var pictureEditMode_1 = require("../../viewer/widgets/pictureEditor/pictureEditMode");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var $ = require("jquery");
exports.Categories = {
    Image: function () { return 'Image'; },
    Numeric: function () { return 'Numeric'; },
    DateTime: function () { return 'Date-Time'; },
    Letters: function () { return 'Letters'; }
};
var EditingFieldExtensions = (function () {
    function EditingFieldExtensions() {
        this._editors = {};
    }
    EditingFieldExtensions.instance = function () {
        if (!EditingFieldExtensions._instance) {
            EditingFieldExtensions._instance = new EditingFieldExtensions();
            EditingFieldExtensions._instance._registerStandartEditors();
        }
        return EditingFieldExtensions._instance;
    };
    EditingFieldExtensions.prototype._registerStandartEditors = function () {
        var getLocalizedString = analytics_utils_1.getLocalization;
        EditingFieldExtensions.registerRegExpEditor('Integer', getLocalizedString('Integer', 'PreviewStringId.EditingFieldEditors_Integer'), exports.Categories.Numeric(), /^-?\d*$/, /^-?\d+$/, '0');
        EditingFieldExtensions.registerRegExpEditor('IntegerPositive', getLocalizedString('Integer Positive', 'PreviewStringId.EditingFieldEditors_IntegerPositive'), exports.Categories.Numeric(), /^\d+$/, /^\d+$/, '0');
        EditingFieldExtensions.registerRegExpEditor('FixedPoint', getLocalizedString('Fixed-Point', 'PreviewStringId.EditingFieldEditors_FixedPoint'), exports.Categories.Numeric(), /^-?(\d+([\.,]?\d*)?)?$/, /^-?\d+([\.,]?\d*)?$/, '0');
        EditingFieldExtensions.registerRegExpEditor('FixedPointPositive', getLocalizedString('Fixed-Point Positive', 'PreviewStringId.EditingFieldEditors_FixedPointPositive'), exports.Categories.Numeric(), /^\d+([\.,]?\d*)?$/, /^\d+([\.,]?\d*)?$/, '0');
        var dateEditorOptions = {
            onPreRender: function (data) {
                if (!(data.options.value() instanceof Date)) {
                    data.options.value(analytics_internal_1.parseDate(data.options.value(), false) || new Date(Date.now()));
                }
            },
            onHideEditor: function (field) {
                field.editValue(analytics_internal_1.formatDate(field._editorValue()));
            }
        };
        EditingFieldExtensions.registerEditor('Date', getLocalizedString('Date', 'PreviewStringId.EditingFieldEditors_Date'), exports.Categories.DateTime(), dateEditorOptions, 'dxrp-editing-field-datetime');
        EditingFieldExtensions.registerImageEditor({
            name: 'Image',
            displayName: getLocalizedString('Image', 'PreviewStringId.EditingFieldEditors_Image'),
            drawingEnabled: false,
            imageLoadEnabled: true
        });
        EditingFieldExtensions.registerImageEditor({
            name: 'Signature',
            displayName: getLocalizedString('Signature', 'PreviewStringId.EditingFieldEditors_Signature'),
            drawingEnabled: true,
            imageLoadEnabled: false
        });
        EditingFieldExtensions.registerImageEditor({
            name: 'ImageAndSignature',
            displayName: getLocalizedString('Image And Signature', 'PreviewStringId.EditingFieldEditors_ImageAndSignature'),
            drawingEnabled: true,
            imageLoadEnabled: true
        });
        EditingFieldExtensions.registerRegExpEditor('OnlyLatinLetters', getLocalizedString('Only Latin Letters', 'PreviewStringId.EditingFieldEditors_OnlyLatinLetters'), exports.Categories.Letters(), /^[a-zA-Z]*$/, /^[a-zA-Z]*$/, '');
    };
    EditingFieldExtensions.registerImageEditor = function (imageRegistrationOptions) {
        imageRegistrationOptions.imageLoadEnabled = imageRegistrationOptions.imageLoadEnabled === undefined ? !imageRegistrationOptions.images : imageRegistrationOptions.imageLoadEnabled;
        imageRegistrationOptions.drawingEnabled = imageRegistrationOptions.drawingEnabled === undefined ? false : imageRegistrationOptions.drawingEnabled;
        var editMode = pictureEditMode_1.PictureEditMode.ImageAndSignature;
        if (!imageRegistrationOptions.imageLoadEnabled)
            editMode = pictureEditMode_1.PictureEditMode.Signature;
        if (!imageRegistrationOptions.drawingEnabled)
            editMode = pictureEditMode_1.PictureEditMode.Image;
        var options = {
            editMode: editMode,
            registrationOptions: imageRegistrationOptions
        };
        options['callbacks'] = {
            customizeActions: function (s, actions) {
                if (imageRegistrationOptions.images) {
                    var imagePickerAction = s.actionsProvider.createImagePickerAction(imageRegistrationOptions.images, imageRegistrationOptions.searchEnabled, function (base64) {
                        s.painter.image(base64);
                        s.painter.refresh();
                    });
                    actions.splice(0, 0, imagePickerAction);
                    if (!imageRegistrationOptions.sizeOptionsEnabled) {
                        var alignmentAction = actions.filter(function (x) { return x.id === _pictureEditorTypes_1.PictureEditorActionId.Alignment; })[0];
                        alignmentAction && actions.splice(actions.indexOf(alignmentAction), 1);
                    }
                }
                if (!imageRegistrationOptions.imageLoadEnabled) {
                    var openFile = actions.filter((function (x) { return x.id === _pictureEditorTypes_1.PictureEditorActionId.OpenFile; }))[0];
                    openFile && actions.splice(actions.indexOf(openFile), 1);
                }
                if (imageRegistrationOptions.sizeOptionsEnabled !== undefined && !imageRegistrationOptions.sizeOptionsEnabled) {
                    var alignmentAction = actions.filter(function (x) { return x.id === _pictureEditorTypes_1.PictureEditorActionId.Alignment; })[0];
                    alignmentAction && actions.splice(actions.indexOf(alignmentAction), 1);
                }
                if (imageRegistrationOptions.clearEnabled !== undefined && !imageRegistrationOptions.clearEnabled) {
                    var clearAction = actions.filter(function (x) { return x.id === _pictureEditorTypes_1.PictureEditorActionId.Clear; })[0];
                    clearAction && actions.splice(actions.indexOf(clearAction), 1);
                }
                if (imageRegistrationOptions.customizeActions) {
                    imageRegistrationOptions.customizeActions(s, actions);
                    return;
                }
            }
        };
        EditingFieldExtensions.registerEditor(imageRegistrationOptions.name, imageRegistrationOptions.displayName, exports.Categories.Image(), options, 'dxrp-editing-field-image');
    };
    EditingFieldExtensions.registerEditor = function (name, displayName, category, options, template, validate, defaultVal) {
        if (defaultVal === void 0) { defaultVal = ''; }
        var initValue;
        var extendOptions = {
            onInitialized: function (e) {
                if (validate) {
                    analytics_widgets_internal_1.ValueEditorHelper.validateWidgetValue(e, validate, defaultVal);
                }
                initValue = e.component.option('value');
            },
            onKeyUp: function (e) {
                var editor = e.component;
                analytics_internal_1.processTextEditorHotKeys(e.event, {
                    esc: function () {
                        editor.blur();
                        editor.option('value', initValue);
                    },
                    ctrlEnter: function () {
                        editor.blur();
                    }
                });
            }
        };
        EditingFieldExtensions.instance()._editors[name] = {
            name: name,
            displayName: displayName,
            category: category,
            options: $.extend({}, options, extendOptions),
            template: template
        };
    };
    EditingFieldExtensions.registerMaskEditor = function (editorID, displayName, category, mask) {
        EditingFieldExtensions.registerEditor(editorID, displayName, category, { mask: mask });
    };
    EditingFieldExtensions.registerRegExpEditor = function (editorID, displayName, category, regExpEditing, regExpFinal, defaultVal) {
        var validate = function (val) { return regExpFinal.test(val); };
        EditingFieldExtensions.registerEditor(editorID, displayName, category, analytics_widgets_internal_1.ValueEditorHelper.getValueEditorOptions(regExpEditing, validate, defaultVal), null, validate, defaultVal);
    };
    EditingFieldExtensions.unregisterEditor = function (editorID) {
        delete EditingFieldExtensions.instance()._editors[editorID];
    };
    EditingFieldExtensions.prototype.categories = function (excludeCategories) {
        var _this = this;
        if (excludeCategories === void 0) { excludeCategories = []; }
        var categories = [];
        Object.keys(this._editors).forEach(function (p) {
            var category = _this._editors[p].category;
            if (excludeCategories.indexOf(category) === -1 && categories.indexOf(category) === -1) {
                categories.push(category);
            }
        });
        return categories;
    };
    EditingFieldExtensions.prototype.editors = function () {
        var _this = this;
        return Object.keys(this._editors).map(function (key) { return _this._editors[key]; });
    };
    EditingFieldExtensions.prototype.editorsByCategories = function (categories) {
        var _this = this;
        if (categories === void 0) { categories = []; }
        var editors = [];
        Object.keys(this._editors).forEach(function (p) {
            if (categories.indexOf(_this._editors[p].category) != -1) {
                editors.push(_this._editors[p]);
            }
        });
        return editors;
    };
    EditingFieldExtensions.prototype.editor = function (editorID) {
        return this._editors[editorID];
    };
    return EditingFieldExtensions;
}());
exports.EditingFieldExtensions = EditingFieldExtensions;
