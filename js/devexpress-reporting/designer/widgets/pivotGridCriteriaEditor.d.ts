﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\pivotGridCriteriaEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo, IItemsProvider, IDisplayNameProvider } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
export declare class PivotGridCriteriaEditor extends Editor {
    private _createItemsProvider;
    private _getFieldName;
    private _createDisplayNameProvider;
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    wrapModel(fieldListProvider: any): this;
    itemsProvider: IItemsProvider;
    displayNameProvider: IDisplayNameProvider;
}
