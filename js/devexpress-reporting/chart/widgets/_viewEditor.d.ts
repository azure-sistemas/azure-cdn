﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_viewEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import { ISerializationInfo, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class ViewEditor extends Editor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    generateHeaderValue(undoEngine: ko.Observable<UndoEngine>): ko.Computed<string>;
    generateViewItems(): any[];
    generateViewClassName(value: any, isTemplate?: boolean): any;
    viewItems: any[];
    headerValue: ko.Computed<string>;
    contentValue: ko.Computed<any>;
}
