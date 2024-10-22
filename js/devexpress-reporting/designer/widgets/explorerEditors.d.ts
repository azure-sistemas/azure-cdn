﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\explorerEditors.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ObjectExplorerProvider, ObjectStructureTreeListController } from '@devexpress/analytics-core/analytics-internal';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
export declare class ExplorerEditor extends Editor {
    constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    private _collectionNames;
    private _isEqualModel;
    private _isVisible;
    treeListController: ObjectStructureTreeListController;
    displayExpr: ko.Observable<string> | ko.Computed<string>;
    itemsProvider: ObjectExplorerProvider;
}
export declare class DrillDownEditor extends ExplorerEditor {
    private _setDisabled;
    private _findFistAvailableBand;
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    path: ko.Observable<any>;
}
