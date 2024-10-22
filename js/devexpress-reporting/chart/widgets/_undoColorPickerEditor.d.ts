﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_undoColorPickerEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ColorPickerEditor } from '@devexpress/analytics-core/analytics-widgets';
import { ISerializationInfo, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class UndoColorPickerEditor extends ColorPickerEditor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>);
    generateValue(undoEngine: ko.Observable<UndoEngine>): ko.Computed<any>;
    generatedValue: ko.Computed<any>;
}
