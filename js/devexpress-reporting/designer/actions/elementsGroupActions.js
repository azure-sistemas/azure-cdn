﻿/**
* DevExpress HTML/JS Reporting (designer\actions\elementsGroupActions.js)
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
var _alignmentHandler_1 = require("./_alignmentHandler");
var _spaceCommandHandler_1 = require("./_spaceCommandHandler");
var analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var xrCrossTabCell_1 = require("../controls/xrCrossTabCell");
var ElementsGroupActions = (function (_super) {
    __extends(ElementsGroupActions, _super);
    function ElementsGroupActions(surfaceContext, selectionProvider) {
        var _this = _super.call(this) || this;
        _this._selectionProvider = selectionProvider;
        var alignHandler = new _alignmentHandler_1.AlignmentHandler(selectionProvider, surfaceContext), spaceCommandHandler = new _spaceCommandHandler_1.SpaceCommandHandler(selectionProvider, surfaceContext);
        _super.prototype.initActions.call(_this, [
            {
                text: 'Align Lefts',
                group: function () { return analytics_utils_1.getLocalization('Alignment', 'ReportStringId.RibbonXRDesign_PageGroup_Alignment'); },
                displayText: function () { return analytics_utils_1.getLocalization('Align Lefts', 'ReportStringId.UD_TTip_AlignLeft'); },
                imageClassName: 'dxrd-image-actions-align_lefts',
                imageTemplateName: 'dxrd-svg-actions-align_lefts',
                clickAction: function () { alignHandler.alignLeft(); },
            }, {
                text: 'Align Centers',
                group: function () { return analytics_utils_1.getLocalization('Alignment', 'ReportStringId.RibbonXRDesign_PageGroup_Alignment'); },
                displayText: function () { return analytics_utils_1.getLocalization('Align Centers', 'ReportStringId.RibbonXRDesign_AlignVerticalCenters_STipTitle'); },
                imageClassName: 'dxrd-image-actions-align_centers',
                imageTemplateName: 'dxrd-svg-actions-align_centers',
                clickAction: function () { alignHandler.alignVerticalCenters(); },
            }, {
                text: 'Align Rights',
                group: function () { return analytics_utils_1.getLocalization('Alignment', 'ReportStringId.RibbonXRDesign_PageGroup_Alignment'); },
                displayText: function () { return analytics_utils_1.getLocalization('Align Rights', 'ReportStringId.RibbonXRDesign_AlignRight_Caption'); },
                imageClassName: 'dxrd-image-actions-align_rights',
                imageTemplateName: 'dxrd-svg-actions-align_rights',
                clickAction: function () { alignHandler.alignRight(); },
            }, {
                text: 'Align Tops',
                group: function () { return analytics_utils_1.getLocalization('Alignment', 'ReportStringId.RibbonXRDesign_PageGroup_Alignment'); },
                displayText: function () { return analytics_utils_1.getLocalization('Align Tops', 'ReportStringId.RibbonXRDesign_AlignTop_Caption'); },
                imageClassName: 'dxrd-image-actions-align_tops',
                imageTemplateName: 'dxrd-svg-actions-align_tops',
                clickAction: function () { alignHandler.alignTop(); },
            }, {
                text: 'Align Middles',
                group: function () { return analytics_utils_1.getLocalization('Alignment', 'ReportStringId.RibbonXRDesign_PageGroup_Alignment'); },
                displayText: function () { return analytics_utils_1.getLocalization('Align Middles', 'ReportStringId.RibbonXRDesign_AlignHorizontalCenters_Caption'); },
                imageClassName: 'dxrd-image-actions-align_middles',
                imageTemplateName: 'dxrd-svg-actions-align_middles',
                clickAction: function () { alignHandler.alignHorizontalCenters(); },
            }, {
                text: 'Align Bottoms',
                group: function () { return analytics_utils_1.getLocalization('Alignment', 'ReportStringId.RibbonXRDesign_PageGroup_Alignment'); },
                displayText: function () { return analytics_utils_1.getLocalization('Align Bottoms', 'ReportStringId.RibbonXRDesign_AlignBottom_Caption'); },
                imageClassName: 'dxrd-image-actions-align_bottoms',
                imageTemplateName: 'dxrd-svg-actions-align_bottoms',
                clickAction: function () { alignHandler.alignBottom(); },
            }, {
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                text: 'Size to Control Width',
                displayText: function () { return analytics_utils_1.getLocalization('Size to Control Width', 'ASPxReportsStringId.ReportDesigner_ElementsAction_SizeToControlWidth'); },
                imageClassName: 'dxrd-image-actions-make_same_width',
                imageTemplateName: 'dxrd-svg-actions-make_same_width',
                clickAction: function () { alignHandler.sizeToControlWidth(); },
            }, {
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                text: 'Size to Control Height',
                displayText: function () { return analytics_utils_1.getLocalization('Size to Control Height', 'ASPxReportsStringId.ReportDesigner_ElementsAction_SizeToControlHeight'); },
                imageClassName: 'dxrd-image-actions-make_same_height',
                imageTemplateName: 'dxrd-svg-actions-make_same_height',
                clickAction: function () { alignHandler.sizeToControlHeight(); },
            }, {
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                text: 'Size to Control',
                displayText: function () { return analytics_utils_1.getLocalization('Size to Control', 'ASPxReportsStringId.ReportDesigner_ElementsAction_SizeToControl'); },
                imageClassName: 'dxrd-image-actions-make_same_sizes',
                imageTemplateName: 'dxrd-svg-actions-make_same_sizes',
                clickAction: function () { alignHandler.sizeToControl(); },
            }, {
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                text: 'Make Horizontal Spacing Equal',
                displayText: function () { return analytics_utils_1.getLocalization('Make Horizontal Spacing Equal', 'ReportStringId.UD_TTip_HorizSpaceMakeEqual'); },
                imageClassName: 'dxrd-image-actions-make_horizontal_spacing_equal',
                imageTemplateName: 'dxrd-svg-actions-make_horizontal_spacing_equal',
                clickAction: function () { spaceCommandHandler.horizSpaceMakeEqual(); },
            }, {
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                text: 'Increase Horizontal Spacing',
                displayText: function () { return analytics_utils_1.getLocalization('Increase Horizontal Spacing', 'ReportStringId.UD_TTip_HorizSpaceIncrease'); },
                imageClassName: 'dxrd-image-actions-increase_horizontal_spacing',
                imageTemplateName: 'dxrd-svg-actions-increase_horizontal_spacing',
                clickAction: function () { spaceCommandHandler.horizSpaceIncrease(); },
            }, {
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                text: 'Decrease Horizontal Spacing',
                displayText: function () { return analytics_utils_1.getLocalization('Decrease Horizontal Spacing', 'ReportStringId.RibbonXRDesign_HorizSpaceDecrease_Caption'); },
                imageClassName: 'dxrd-image-actions-decrease_horizontal_spacing',
                imageTemplateName: 'dxrd-svg-actions-decrease_horizontal_spacing',
                clickAction: function () { spaceCommandHandler.horizSpaceDecrease(); },
            }, {
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                text: 'Remove Horizontal Spacing',
                displayText: function () { return analytics_utils_1.getLocalization('Remove Horizontal Spacing', 'ReportStringId.RibbonXRDesign_HorizSpaceConcatenate_Caption'); },
                imageClassName: 'dxrd-image-actions-remove_horizontal_spacing',
                imageTemplateName: 'dxrd-svg-actions-remove_horizontal_spacing',
                clickAction: function () { spaceCommandHandler.horizSpaceConcatenate(); },
            }, {
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                text: 'Make Vertical Spacing Equal',
                displayText: function () { return analytics_utils_1.getLocalization('Make Vertical Spacing Equal', 'ReportStringId.RibbonXRDesign_VertSpaceMakeEqual_Caption'); },
                imageClassName: 'dxrd-image-actions-make_vertical_spacing_equal',
                imageTemplateName: 'dxrd-svg-actions-make_vertical_spacing_equal',
                clickAction: function () { spaceCommandHandler.vertSpaceMakeEqual(); },
            }, {
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                text: 'Increase Vertical Spacing',
                displayText: function () { return analytics_utils_1.getLocalization('Increase Vertical Spacing', 'ReportStringId.RibbonXRDesign_VertSpaceIncrease_STipTitle'); },
                imageClassName: 'dxrd-image-actions-increase_vertical_spacing',
                imageTemplateName: 'dxrd-svg-actions-increase_vertical_spacing',
                clickAction: function () { spaceCommandHandler.vertSpaceIncrease(); },
            }, {
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                text: 'Decrease Vertical Spacing',
                displayText: function () { return analytics_utils_1.getLocalization('Decrease Vertical Spacing', 'ReportStringId.UD_TTip_VertSpaceDecrease'); },
                imageClassName: 'dxrd-image-actions-decrease_vertical_spacing',
                imageTemplateName: 'dxrd-svg-actions-decrease_vertical_spacing',
                clickAction: function () { spaceCommandHandler.vertSpaceDecrease(); },
            }, {
                group: function () { return analytics_utils_1.getLocalization('Layout', 'ReportStringId.RibbonXRDesign_PageGroup_Layout'); },
                text: 'Remove Vertical Spacing',
                displayText: function () { return analytics_utils_1.getLocalization('Remove Vertical Spacing', 'ReportStringId.UD_TTip_VertSpaceConcatenate'); },
                imageClassName: 'dxrd-image-actions-remove_vertical_spacing',
                imageTemplateName: 'dxrd-svg-actions-remove_vertical_spacing',
                clickAction: function () { spaceCommandHandler.vertSpaceConcatenate(); },
            }
        ]);
        _this.setDisabled = function (context) {
            var isDisabled = _this._selectionProvider.selectedItems.some(function (item) { return item.locked; });
            _this.actions.forEach(function (action) {
                action.disabled(isDisabled);
            });
        };
        return _this;
    }
    ElementsGroupActions.prototype.condition = function (context) {
        return this._selectionProvider.selectedItems.length > 1 && !this._selectionProvider.selectedItems.some(function (item) { return item instanceof xrCrossTabCell_1.XRCellsurface; });
    };
    return ElementsGroupActions;
}(analytics_internal_1.BaseActionsProvider));
exports.ElementsGroupActions = ElementsGroupActions;
