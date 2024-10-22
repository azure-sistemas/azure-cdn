﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_createObjectFromInfo.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createObjectFromInfo(control, serializationsInfo) {
    var newObj = undefined;
    var newObjInfo = [];
    serializationsInfo.forEach(function (info) {
        if (control[info.propertyName]) {
            if (newObj === undefined)
                newObj = {};
            newObj[info.propertyName] = control[info.propertyName];
            newObjInfo.push(info);
        }
    });
    if (!!newObj) {
        newObj['getInfo'] = function () { return newObjInfo; };
    }
    return newObj;
}
exports.createObjectFromInfo = createObjectFromInfo;
function findFirstParentWithPropertyName(control, propertyName) {
    var parent = control.parentModel && control.parentModel();
    if (parent)
        return parent[propertyName] ? parent : findFirstParentWithPropertyName(parent, propertyName);
    else
        return control.root;
}
exports.findFirstParentWithPropertyName = findFirstParentWithPropertyName;
