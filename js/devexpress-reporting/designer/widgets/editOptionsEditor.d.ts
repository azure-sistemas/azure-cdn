﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\editOptionsEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, IItemsProvider } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
export declare class EditOptionsEditorNameEditorModel extends Editor {
    constructor(modelPropertyInfo: ISerializationInfo, level: any, parentDisabled?: ko.Observable<boolean>, textToSearch?: any);
    itemsProvider: IItemsProvider;
    displayValue: ko.Observable<string>;
}
