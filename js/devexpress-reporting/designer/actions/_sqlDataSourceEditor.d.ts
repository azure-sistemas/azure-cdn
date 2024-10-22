﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_sqlDataSourceEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
import { ReportViewModel } from '../controls/xrReport';
import { IActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import { DataSourceWizard, DataSourceWizardPageIterator, IDataSourceWizardState } from '@devexpress/analytics-core/analytics-wizard';
import { UndoEngine, IAction, IItemsProvider } from '@devexpress/analytics-core/analytics-utils';
import { IDataSourceInfo as analyticIDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import { SqlDataSource } from '@devexpress/analytics-core/analytics-data';
import * as ko from 'knockout';
import { MasterDetailEditor } from '@devexpress/analytics-core/queryBuilder-widgets-internal';
export declare abstract class DataSourceEditorBase implements IActionsProvider {
    _dsHelper: ko.Observable<DataSourceHelper> | ko.Computed<DataSourceHelper>;
    _wizard: DataSourceWizard;
    _reportViewModel: ko.Observable<ReportViewModel> | ko.Computed<ReportViewModel>;
    _undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>;
    _itemsProvider: ko.Observable<IItemsProvider> | ko.Computed<IItemsProvider>;
    abstract getActions(context: any): IAction[];
    constructor(_dsHelper: ko.Observable<DataSourceHelper> | ko.Computed<DataSourceHelper>, _wizard: DataSourceWizard, _reportViewModel: ko.Observable<ReportViewModel> | ko.Computed<ReportViewModel>, _undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, _itemsProvider: ko.Observable<IItemsProvider> | ko.Computed<IItemsProvider>);
    protected _findDataSource(dataSourceID: string): analyticIDataSourceInfo;
    static _onFail(result: any, deferred: JQueryDeferred<any>): void;
}
export interface IDataSourceInfo extends analyticIDataSourceInfo {
    base64: () => string;
}
export declare class CreateQueryIterator extends DataSourceWizardPageIterator {
    getNextPageId(pageId: string): any;
}
export declare class SqlDataSourceEditor extends DataSourceEditorBase {
    private _applyWizardChanges;
    private _createOrEditSqlDataSource;
    private _applyDataSourceChange;
    relationsEditor: ko.Observable<MasterDetailEditor>;
    editSqlQuery(dataSourceID: string, queryName: string): void;
    addSqlQuery(dataSourceID: string): void;
    removeSqlQuery(dataSourceID: string, queryName: string): void;
    editMasterDetailRelations(dataSourceID: string): void;
    applySqlDataSourceWizardChanges(dataSourceWizardModel: IDataSourceWizardState): JQueryPromise<IDataSourceInfo>;
    static createSqlDataSourceInfo(source: SqlDataSource, queryName?: string, relationsEditing?: boolean): JQueryPromise<IDataSourceInfo>;
    addAction: {
        clickAction: (item: any) => void;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    editAction: {
        clickAction: (item: any) => void;
        position: number;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    removeAction: {
        clickAction: (item: any) => void;
        position: number;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    editRelationsAction: {
        clickAction: (item: any) => void;
        position: number;
        imageClassName: string;
        imageTemplateName: string;
        text: any;
    };
    getActions(context: any): IAction[];
}
