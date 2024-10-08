﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_dataSourceActions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
import { ReportViewModel } from '../controls/xrReport';
import { IActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { UndoEngine, IAction } from '@devexpress/analytics-core/analytics-utils';
export declare class DataSourceActions implements IActionsProvider {
    private _dsHelper;
    private _reportViewModel;
    private _undoEngine;
    private _findDataSource;
    constructor(dsHelper: ko.Observable<DataSourceHelper> | ko.Computed<DataSourceHelper>, reportViewModel: ko.Observable<ReportViewModel> | ko.Computed<ReportViewModel>, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>);
    removeDataSource(dataSourceID: string): void;
    removeDataSourceAction: {
        clickAction: (item: any) => void;
        position: number;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    getActions(context: any): IAction[];
}
