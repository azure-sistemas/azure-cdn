﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_bandUtils.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bandSurfaceCollapsedHeight_1 = require("./bandSurfaceCollapsedHeight");
function sortBands(band1, band2) {
    return getBandWeight(band1) - getBandWeight(band2);
}
exports.sortBands = sortBands;
function setMarkerWidth(bandHolder, levelCount, currentLevel) {
    if (currentLevel === void 0) { currentLevel = 0; }
    if (bandHolder && bandHolder.bands().length !== 0) {
        bandHolder.bands().forEach(function (band) {
            band.markerWidth(bandSurfaceCollapsedHeight_1.bandSurfaceCollapsedHeight * (levelCount - currentLevel));
            setMarkerWidth(band.bandsHolder, levelCount, currentLevel + 1);
        });
        bandHolder.verticalBandsContainer && bandHolder.verticalBandsContainer.markerWidth(bandSurfaceCollapsedHeight_1.bandSurfaceCollapsedHeight * (levelCount - currentLevel));
    }
}
exports.setMarkerWidth = setMarkerWidth;
function getLevelCount(bandHolder) {
    var result = 0, maxLevelCount = 0;
    if (!bandHolder)
        return result;
    if (bandHolder.bands().length !== 0) {
        bandHolder.bands().forEach(function (band) {
            var levelCount = getLevelCount(band.bandsHolder);
            if (levelCount > maxLevelCount) {
                maxLevelCount = levelCount;
            }
        });
        result = maxLevelCount + 1;
    }
    else if (bandHolder.verticalBandsContainer && bandHolder.verticalBandsContainer.visible) {
        result = maxLevelCount + 1;
    }
    return result;
}
exports.getLevelCount = getLevelCount;
function insertBand(bands, newBand) {
    if (newBand.controlType === 'GroupHeaderBand' || newBand.controlType === 'GroupFooterBand' || newBand.controlType === 'DetailReportBand' || newBand.controlType === 'SubBand') {
        var array = generateArray(bands(), newBand.controlType);
        var level = array.length;
        for (var i = 0; i < array.length; i++) {
            if (!array[i]) {
                level = i;
                break;
            }
        }
        newBand._level(level);
    }
    insertBandSorted(bands, newBand);
}
exports.insertBand = insertBand;
function insertBandSorted(bands, newBand) {
    if (newBand) {
        var cloneBands = bands().slice(0);
        var previousBandIndex = bands().indexOf(newBand);
        if (previousBandIndex === -1) {
            cloneBands.push(newBand);
        }
        cloneBands.sort(sortBands);
        var index = cloneBands.indexOf(newBand);
        if (previousBandIndex !== -1) {
            bands.splice(previousBandIndex, 1);
        }
        bands.splice(index, 0, newBand);
    }
}
var bandsWeight = {
    'TopMarginBand': 100,
    'ReportHeaderBand': 200,
    'PageHeaderBand': 300,
    'GroupHeaderBand': 400,
    'DetailBand': 500,
    'VerticalHeaderBand': 500,
    'VerticalDetailBand': 600,
    'VerticalTotalBand': 700,
    'DetailReportBand': 800,
    'GroupFooterBand': 900,
    'ReportFooterBand': 1000,
    'PageFooterBand': 1100,
    'BottomMarginBand': 1200
};
function getBandWeight(band) {
    if (band.controlType === 'GroupHeaderBand') {
        return bandsWeight[band.controlType] - (band['level']() || 0);
    }
    if (band.controlType === 'GroupFooterBand') {
        return bandsWeight[band.controlType] + (band['level']() || 0);
    }
    if (band.controlType === 'DetailReportBand') {
        return bandsWeight[band.controlType] + (band['level']() || -1);
    }
    return bandsWeight[band.controlType];
}
function initGroupIndexes(largeGroupBandCollection, smallGroupBandCollection) {
    var replaces = {};
    var busyIndexes = [];
    var findClosestIndex = function (currentIndex) {
        var index = currentIndex;
        var findClosestAvailableIndex = function (currentIndex, inc) {
            var newIndex = currentIndex + inc;
            if (newIndex === largeGroupBandCollection.length || newIndex === -1) {
                return undefined;
            }
            if (busyIndexes.indexOf(currentIndex + inc) !== -1) {
                return newIndex;
            }
            else {
                return findClosestAvailableIndex(newIndex, inc);
            }
        };
        if (busyIndexes.indexOf(currentIndex) !== -1) {
            index = findClosestAvailableIndex(currentIndex, -1);
            if (index === undefined)
                index = findClosestAvailableIndex(currentIndex, 1);
        }
        return index;
    };
    for (var i = 0; i < largeGroupBandCollection.length; i++) {
        var currentLevel = largeGroupBandCollection[i]._level;
        if (!replaces[currentLevel()])
            replaces[currentLevel()] = [i];
        else {
            replaces[currentLevel()].push(i);
        }
        currentLevel(i);
    }
    for (var i = 0; i < smallGroupBandCollection.length; i++) {
        var index = i;
        var currentLevel = smallGroupBandCollection[i]._level;
        if (replaces[currentLevel()] && replaces[currentLevel()].length > 0) {
            index = replaces[currentLevel()].splice(0, 1)[0];
        }
        else if (currentLevel() < largeGroupBandCollection.length) {
            index = findClosestIndex(currentLevel());
        }
        else {
            index = findClosestIndex(i);
        }
        currentLevel(index);
        busyIndexes.push(index);
    }
}
function initLevels(bands) {
    ['DetailReportBand', 'SubBand'].map(function (type) {
        return bands.filter(function (b) { return b.controlType === type; }).sort(sortBands);
    }).forEach(function (items) {
        for (var i = 0; i < items.length; i++) {
            items[i]._level(i);
        }
    });
    var groupHeaderBands = bands.filter(function (b) { return b.controlType === 'GroupHeaderBand'; }).sort(sortBands).reverse();
    var groupFooterBands = bands.filter(function (b) { return b.controlType === 'GroupFooterBand'; }).sort(sortBands);
    if (groupFooterBands.length > groupHeaderBands.length) {
        initGroupIndexes(groupFooterBands, groupHeaderBands);
    }
    else {
        initGroupIndexes(groupHeaderBands, groupFooterBands);
    }
}
exports.initLevels = initLevels;
function generateArray(allbands, controlType, newLevel) {
    var array = allbands.filter(function (x) { return x.controlType === controlType; });
    newLevel = newLevel || array.length - 1;
    array = controlType === 'GroupHeaderBand' ? array.reverse() : array;
    var length = (array.length > 0 && array[array.length - 1].level() > newLevel ? array[array.length - 1].level() : newLevel) + 1;
    var j = 0;
    var fakeArray = [];
    for (var i = 0; i < length; i++) {
        if (j < array.length && array[j]._level() === i) {
            fakeArray.push(array[j]);
            j++;
        }
        else {
            fakeArray.push(undefined);
        }
    }
    return fakeArray;
}
exports.generateArray = generateArray;
function _getUnitAbsoluteRect(bandSurface, getPositionInParent) {
    var parentAbsoluteRect = bandSurface.parent && bandSurface.parent['_unitAbsoluteRect'];
    if (parentAbsoluteRect) {
        var _unitPosition = getPositionInParent();
        return {
            top: parentAbsoluteRect.top + _unitPosition.y(), left: parentAbsoluteRect.left + _unitPosition.x(),
            right: parentAbsoluteRect.left + _unitPosition.x() + bandSurface._control.size.width(), bottom: parentAbsoluteRect.top + _unitPosition.y() + bandSurface._control.size.height(),
            width: bandSurface._control.size.width(), height: bandSurface._control.size.height()
        };
    }
    else {
        return {
            top: 0, left: 0,
            right: bandSurface._control.size.width(), bottom: bandSurface._control.size.height(),
            width: bandSurface._control.size.width(), height: bandSurface._control.size.height()
        };
    }
}
exports._getUnitAbsoluteRect = _getUnitAbsoluteRect;
