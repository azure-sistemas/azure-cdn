﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_tableComponentSurface.js)
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
var xrTextControl_1 = require("../xrTextControl");
var TableActionDirection;
(function (TableActionDirection) {
    TableActionDirection[TableActionDirection["vertical"] = 0] = "vertical";
    TableActionDirection[TableActionDirection["horizontal"] = 1] = "horizontal";
})(TableActionDirection = exports.TableActionDirection || (exports.TableActionDirection = {}));
var TableComponentSurface = (function (_super) {
    __extends(TableComponentSurface, _super);
    function TableComponentSurface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableComponentSurface.prototype._getNeededProperties = function (rect) {
        if (this.direction === TableActionDirection.vertical) {
            return {
                positionProperty: rect.top === undefined ? this.rect().top : rect.top,
                secondaryPositionProperty: rect.bottom,
                sizeProperty: rect.height
            };
        }
        else {
            return {
                positionProperty: rect.left === undefined ? this.rect().left : rect.left,
                secondaryPositionProperty: rect.right,
                sizeProperty: rect.width
            };
        }
    };
    TableComponentSurface.prototype._generateRect = function (rect, result) {
        if (this.direction === TableActionDirection.vertical) {
            rect.top = result.positionProperty === undefined ? rect.top : result.positionProperty;
            rect.bottom = result.secondaryPositionProperty === undefined ? rect.bottom : result.secondaryPositionProperty;
            rect.height = result.sizeProperty === undefined ? rect.height : result.sizeProperty;
        }
        else {
            rect.left = result.positionProperty === undefined ? rect.left : result.positionProperty;
            rect.right = result.secondaryPositionProperty === undefined ? rect.right : result.secondaryPositionProperty;
            rect.width = result.sizeProperty === undefined ? rect.width : result.sizeProperty;
            delete rect.height;
        }
        return rect;
    };
    TableComponentSurface.prototype.beforeRectUpdated = function (rect) {
        var incomingRect = this._getNeededProperties(rect);
        var currentRect = this._getNeededProperties(this.rect());
        var model = this.getControlModel();
        var parentModel = this.parent.getControlModel();
        if (incomingRect.secondaryPositionProperty !== undefined) {
            incomingRect.positionProperty = currentRect.positionProperty;
            incomingRect.sizeProperty = incomingRect.secondaryPositionProperty < incomingRect.positionProperty ? 0
                : incomingRect.secondaryPositionProperty - incomingRect.positionProperty;
        }
        if (incomingRect.positionProperty > currentRect.secondaryPositionProperty) {
            incomingRect.positionProperty = currentRect.secondaryPositionProperty;
            return this._generateRect(rect, incomingRect);
        }
        if (incomingRect.sizeProperty === undefined) {
            incomingRect.sizeProperty = currentRect.sizeProperty + currentRect.positionProperty - incomingRect.positionProperty;
        }
        var childCollectionName = this.parent._getChildrenHolderName();
        var positionRedused = parseInt(currentRect.positionProperty) > incomingRect.positionProperty;
        var sizeIncreased = parseInt(currentRect.sizeProperty) < incomingRect.sizeProperty && !positionRedused;
        var position = parentModel[childCollectionName]().indexOf(model);
        if (position !== 0 && positionRedused) {
            var prevElementRect = this._getNeededProperties(parentModel[childCollectionName]()[position - 1].surface.rect());
            if (prevElementRect.positionProperty > incomingRect.positionProperty) {
                incomingRect.sizeProperty -= (prevElementRect.positionProperty - incomingRect.positionProperty);
                incomingRect.positionProperty = prevElementRect.positionProperty;
            }
        }
        if (sizeIncreased && position !== parentModel[childCollectionName]().length - 1) {
            var nextElementRect = this._getNeededProperties(parentModel[childCollectionName]()[position + 1].surface.rect());
            if (nextElementRect.secondaryPositionProperty < incomingRect.positionProperty + incomingRect.sizeProperty) {
                incomingRect.sizeProperty = nextElementRect.secondaryPositionProperty - incomingRect.positionProperty;
            }
        }
        return this._generateRect(rect, incomingRect);
    };
    return TableComponentSurface;
}(xrTextControl_1.XRTextControlSurfaceBase));
exports.TableComponentSurface = TableComponentSurface;
