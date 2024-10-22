﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_copyPasteStrategy.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xrControl_1 = require("../controls/xrControl");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var style_1 = require("../controls/properties/style");
var xrCrossTab_1 = require("../controls/xrCrossTab");
exports.reportCopyPasteStrategy = function (componentAdded) { return ({
    createChild: function (pasteTarget, info) {
        var control = null;
        var parent = pasteTarget;
        if (info['restore']) {
            info['restore']();
            return;
        }
        if (info['@ControlType'] === 'XRCrossBandBox' || info['@ControlType'] === 'XRCrossBandLine') {
            parent = pasteTarget.root;
            control = parent.createChild(info);
        }
        else {
            control = analytics_internal_1.copyPasteStrategy.createChild(parent, info);
            if (control instanceof xrControl_1.XRControlViewModel && !info['@Text'] && control.text) {
                control.text('');
            }
        }
        componentAdded && componentAdded({ parent: parent, model: control });
        return control;
    },
    calculateDelta: function (selection, pasteTargetSurface, minPoint) {
        var result = analytics_internal_1.copyPasteStrategy.calculateDelta(selection, pasteTargetSurface, minPoint);
        if (selection.getControlModel().controlType === 'XRCrossBandBox' || selection.getControlModel().controlType === 'XRCrossBandLine') {
            result.y += pasteTargetSurface['absolutePosition'].y();
        }
        return result;
    },
    createSelfRestoringItems: function (model, serializer) {
        if (model instanceof xrCrossTab_1.XRCrossTabViewModel) {
            return model.dependentStyles.map(function (style) {
                var serializedModel = serializer.serialize(style);
                return {
                    restore: function () { return (model.root)['styles'] && model.root['styles'].push(new style_1.StyleModel(serializedModel)); }
                };
            });
        }
        else
            return [];
    },
    canPaste: function (pasteTarget, info) {
        var pasteTargetSurface = pasteTarget.surface;
        var itemInfos = info['objects'].map(function (x) { return pasteTarget.getControlFactory().getControlInfo(pasteTarget.getControlFactory().getControlType(x)); });
        return itemInfos.every(function (x) {
            return (!x.canPaste || x.canPaste(pasteTargetSurface)) &&
                (!x.canDrop || x.canDrop(pasteTargetSurface));
        });
    }
}); };
