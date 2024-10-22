﻿/**
* DevExpress HTML/JS Reporting (designer\actions\elementActions.js)
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
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var _alignmentHandler_1 = require("./_alignmentHandler");
var ko = require("knockout");
var ElementActions = (function (_super) {
    __extends(ElementActions, _super);
    function ElementActions(surfaceContext, selectionProvider) {
        var _this = _super.call(this) || this;
        _this._selectionProvider = selectionProvider;
        _this._isMultiSelect = ko.observable(false);
        var alignHandler = new _alignmentHandler_1.AlignmentHandler(selectionProvider, surfaceContext);
        var fitToContainerAction = new fitToContainerAction_1.FitToContainerAction(selectionProvider.focused);
        _super.prototype.initActions.call(_this, [
            {
                text: 'Align to Grid',
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                displayText: function () { return analytics_utils_1.getLocalization('Align to Grid', 'ReportStringId.Cmd_AlignToGrid'); },
                imageClassName: 'dxrd-image-actions-align_to_grid',
                imageTemplateName: 'dxrd-svg-actions-align_to_grid',
                clickAction: function () { alignHandler.alignToGrid(); },
                disabled: ko.pureComputed(function () { return _this._generalDisabled; }),
            }, {
                text: 'Size to Grid',
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                displayText: function () { return analytics_utils_1.getLocalization('Size to Grid', 'ReportStringId.UD_Capt_MakeSameSizeSizeToGrid'); },
                imageClassName: 'dxrd-image-actions-size_to_grid',
                imageTemplateName: 'dxrd-svg-actions-size_to_grid',
                clickAction: function () { alignHandler.sizeToGrid(); },
                disabled: ko.pureComputed(function () { return _this._generalDisabled; }),
            }, {
                text: 'Center Horizontally',
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                displayText: function () { return analytics_utils_1.getLocalization('Center Horizontally', 'ReportStringId.RibbonXRDesign_CenterHorizontally_STipTitle'); },
                imageClassName: 'dxrd-image-actions-center_horizontally',
                imageTemplateName: 'dxrd-svg-actions-center_horizontally',
                clickAction: function () { alignHandler.centerHorizontally(); },
                disabled: ko.pureComputed(function () {
                    return _this._generalDisabled ||
                        selectionProvider.focused() instanceof xrCrossband_1.XRCrossBandSurface ||
                        (function () {
                            var someParentIsNotBand = false;
                            var someParentNotFocused = false;
                            return selectionProvider.selectedItems.some(function (x) {
                                if (!x.parent)
                                    return true;
                                if (!someParentIsNotBand)
                                    someParentIsNotBand = !(x.parent.getControlModel() instanceof xrBand_1.BandViewModel);
                                if (!someParentNotFocused)
                                    someParentNotFocused = x.parent !== selectionProvider.selectedItems[0].parent;
                                return someParentNotFocused && someParentIsNotBand;
                            });
                        })();
                })
            }, {
                text: 'Center Vertically',
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                displayText: function () { return analytics_utils_1.getLocalization('Center Vertically', 'ReportStringId.RibbonXRDesign_CenterVertically_STipTitle'); },
                imageClassName: 'dxrd-image-actions-center_vertically',
                imageTemplateName: 'dxrd-svg-actions-center_vertically',
                clickAction: function () { alignHandler.centerVertically(); },
                disabled: ko.pureComputed(function () {
                    return _this._generalDisabled ||
                        selectionProvider.focused() instanceof xrCrossband_1.XRCrossBandSurface ||
                        selectionProvider.selectedItems.some(function (x) { return x.parent !== selectionProvider.selectedItems[0].parent; });
                })
            }, {
                text: 'Bring to Front',
                group: function () { return analytics_utils_1.getLocalization('Arranging', 'ReportStringId.RibbonXRDesign_PageGroup_Arranging'); },
                displayText: function () { return analytics_utils_1.getLocalization('Bring to Front', 'ReportStringId.Cmd_BringToFront'); },
                imageClassName: 'dxrd-image-actions-bring_to_front',
                imageTemplateName: 'dxrd-svg-actions-bring_to_front',
                clickAction: function () { alignHandler.bringToFront(); },
                disabled: ko.pureComputed(function () { return _this._generalDisabled || !alignHandler.canChangeZOrder(); }),
            }, {
                text: 'Send to Back',
                group: function () { return analytics_utils_1.getLocalization('Arranging', 'ReportStringId.RibbonXRDesign_PageGroup_Arranging'); },
                displayText: function () { return analytics_utils_1.getLocalization('Send to Back', 'ReportStringId.Cmd_SendToBack'); },
                imageClassName: 'dxrd-image-actions-send_to_back',
                imageTemplateName: 'dxrd-svg-actions-send_to_back',
                clickAction: function () { alignHandler.sendToBack(); },
                disabled: ko.pureComputed(function () { return _this._generalDisabled || !alignHandler.canChangeZOrder(); }),
            }, {
                text: 'Fit Bounds To Container',
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                displayText: function () { return analytics_utils_1.getLocalization('Fit Bounds To Container', 'ReportStringId.Cmd_FitBoundsToContainer'); },
                imageClassName: 'dxrd-image-actions-fit_to_container',
                imageTemplateName: 'dxrd-svg-actions-fit_to_container',
                clickAction: function () { fitToContainerAction.doAction(); },
                disabled: ko.pureComputed(function () { return _this._generalDisabled || !fitToContainerAction.allowed(); }),
                visible: ko.pureComputed(function () {
                    return !_this._isMultiSelect() && fitToContainerAction.visible();
                })
            }
        ]);
        _this.setDisabled = function (context) {
            _this._generalDisabled = _this._selectionProvider.selectedItems.some(function (item) { return item.locked; });
        };
        return _this;
    }
    ElementActions.prototype.condition = function (context) {
        this._isMultiSelect(context.controlType === 'multiselect');
        if (this._isMultiSelect())
            return !this._selectionProvider.selectedItems.some(function (item) { return item instanceof xrCrossTabCell_1.XRCellsurface; });
        return !(context instanceof xrTableCell_1.XRTableCellViewModel || context instanceof xrTableRow_1.XRTableRowViewModel || context instanceof xrCrossTabCell_1.XRCrossTabCellViewModel);
    };
    return ElementActions;
}(analytics_internal_1.BaseActionsProvider));
exports.ElementActions = ElementActions;
var xrCrossband_1 = require("../controls/xrCrossband");
var xrTableCell_1 = require("../controls/xrTableCell");
var xrTableRow_1 = require("../controls/xrTableRow");
var fitToContainerAction_1 = require("./fitToContainerAction");
var xrBand_1 = require("../bands/xrBand");
var xrCrossTabCell_1 = require("../controls/xrCrossTabCell");
