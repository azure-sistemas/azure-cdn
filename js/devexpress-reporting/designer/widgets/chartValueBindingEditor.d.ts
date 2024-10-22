﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\chartValueBindingEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Parameter } from '../dataObjects/parameters/parameter';
import { ISerializationInfo, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { TreeListController } from '@devexpress/analytics-core/analytics-widgets-internal';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
export declare class ChartValueBindingEditor extends Editor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    generateDisplayValue(reportDataSource: ko.Observable<IDataSourceInfo>): string;
    generateValue(undoEngine: UndoEngine, reportParameters: ko.ObservableArray<Parameter>, reportDataSource: ko.Observable<IDataSourceInfo>): ko.Observable<string> | ko.Computed<string>;
    treeListController: TreeListController;
    binding: ko.Observable<string> | ko.Computed<string>;
    displayBinding: ko.Observable<string> | ko.Computed<string>;
}
