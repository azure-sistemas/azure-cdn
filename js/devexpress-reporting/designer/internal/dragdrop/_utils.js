﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_utils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parameter_1 = require("../../dataObjects/parameters/parameter");
var settings_1 = require("../../utils/settings");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var analytics_elements_1 = require("@devexpress/analytics-core/analytics-elements");
var analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var $ = require("jquery");
function selectTreeListItem(item, event) {
    if (item instanceof analytics_widgets_internal_1.TreeListItemViewModel && !item.isMultiSelected() && !item.isSelected())
        item.toggleSelected(item, event);
}
exports.selectTreeListItem = selectTreeListItem;
function getExpressionPath(container, pathRequest) {
    var fullPath = pathRequest instanceof analytics_utils_1.PathRequest ? pathRequest.fullPath : pathRequest;
    if (fullPath.indexOf(parameter_1.Parameter.ParametersRefString + '.') === 0) {
        var pathParts = fullPath.split('.');
        return '?' + pathParts[pathParts.length - 1];
    }
    var path = pathRequest instanceof analytics_utils_1.PathRequest ? pathRequest.path : pathRequest;
    var dataSourceInfo = _getDataSourceDataMember_1.getDataSourceDataMember(container);
    var prefix = dataSourceInfo.dataMember && (dataSourceInfo.dataMember + '.');
    path = (prefix && path.indexOf(prefix) === 0) ? path.slice(prefix.length) : path;
    return '[' + path + ']';
}
exports.getExpressionPath = getExpressionPath;
function getFirstSurfaceParentByType(target, checkBandsType) {
    return checkBandsType(target) ? target : getFirstSurfaceParentByType(target.parent, checkBandsType);
}
exports.getFirstSurfaceParentByType = getFirstSurfaceParentByType;
function getUsefulReportWidth(surface) {
    var report = surface && surface.getControlModel();
    return surface ?
        analytics_elements_1.Size.fromString(((report.pageWidth() - report.margins.left() - report.margins.right()) / (surface.dpi() / 100)).toString() + ', 23') :
        analytics_elements_1.Size.fromString('200, 23');
}
exports.getUsefulReportWidth = getUsefulReportWidth;
function createPictureBox(container, bindingPath, dataBindingMode) {
    var newControl = container.createChild($.extend({ '@ControlType': 'XRPictureBox' }, settings_1.controlsFactory().controlsMap['XRPictureBox'].defaultVal));
    if (dataBindingMode === _dataBindingMode_1.DataBindingMode.Bindings) {
        var binding = newControl['dataBindings']().findBinding('ImageSource');
        binding.dataMember(bindingPath);
    }
    else {
        var binding = newControl['expressionObj'].getExpression('ImageSource', 'BeforePrint');
        binding.value(getExpressionPath(container, bindingPath));
    }
    return newControl;
}
exports.createPictureBox = createPictureBox;
exports._checkBandsType = function (target) { return target instanceof xrBand_1.BandSurface || target instanceof xrVerticalBand_1.VerticalBandSurface; };
function createSimpleControl(controlType, dropTargetControl) {
    return dropTargetControl.createChild($.extend({ '@ControlType': controlType }, settings_1.controlsFactory().controlsMap[controlType].defaultVal));
}
exports.createSimpleControl = createSimpleControl;
function assignBinding(control, container, bindingName, item, dataBindingMode) {
    if (dataBindingMode === _dataBindingMode_1.DataBindingMode.Bindings) {
        var binding = control.dataBindings().findBinding(bindingName);
        if (item.path.indexOf('Parameters.') === -1) {
            binding.dataMember(new analytics_utils_1.PathRequest(item.path).path);
        }
        else {
            binding.dataMember(item.data.name);
            binding.parameter(item.data);
        }
    }
    else {
        var binding = control.expressionObj.getExpression(bindingName, 'BeforePrint');
        binding.value(getExpressionPath(container, new analytics_utils_1.PathRequest(item.path)));
    }
    return control;
}
exports.assignBinding = assignBinding;
function isList(data) {
    return data.isList === true || data.specifics === 'List' || data.specifics === 'ListSource';
}
exports.isList = isList;
function _disableCanGrowProperty(model) {
    if (model.controlType === 'XRTable') {
        model.rows().forEach(function (row) { return row.cells().forEach(function (cell) { return _disableCanGrowProperty(cell); }); });
    }
    if (model['canGrow'] && model['canGrow']()) {
        model['canGrow'](false);
    }
}
function dragDropComponentAdded(model, parent) {
    if (!(parent instanceof xrVerticalBand_1.VerticalBandViewModel))
        return;
    _disableCanGrowProperty(model);
}
exports.dragDropComponentAdded = dragDropComponentAdded;
var xrBand_1 = require("../../bands/xrBand");
var xrVerticalBand_1 = require("../../bands/xrVerticalBand");
var _getDataSourceDataMember_1 = require("../_getDataSourceDataMember");
var _dataBindingMode_1 = require("../_dataBindingMode");
