﻿/**
* DevExpress HTML/JS Reporting (designer\internal\reportExplorer\_reportExplorer.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportViewModel } from '../../controls/xrReport';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ISelectionProvider, ObjectExplorerProvider, ObjectStructureTreeListController } from '@devexpress/analytics-core/analytics-internal';
export declare class ReportExplorerModel extends Disposable {
    static getPathByMember(model: any): any;
    private _createActionsForOneElement;
    private _createActionsForArray;
    private _getPathNonControl;
    constructor(reportModel: ko.Observable<ReportViewModel>, editableObject: any, clickHandler: any, dragDropHandler: ReportExplorerDragDropHandler, selection: ISelectionProvider);
    itemsProvider: ObjectExplorerProvider;
    treeListController: ObjectStructureTreeListController;
}
import { ReportExplorerDragDropHandler } from '../dragdrop/_reportExplorerDragDropHandler';
