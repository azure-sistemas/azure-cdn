﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\undoEditors.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
export declare class ComboboxUndoEditor extends Editor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    generateValue(undoEngine: ko.Observable<UndoEngine>): ko.Observable<any> | ko.Computed<any>;
    undoValue: ko.Observable | ko.Computed;
}
