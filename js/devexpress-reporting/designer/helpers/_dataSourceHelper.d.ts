﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_dataSourceHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectItem, ObjectStorageItem } from '../dataObjects/objectStorageItem';
import { IDataSourceRefInfo } from '../utils/inititalizer';
import { Disposable, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
export declare class DataSourceHelper extends Disposable {
    private _objects;
    availableDataSources: IDataSourceInfo[];
    static defaultReportExtensionKey: string;
    dispose(): void;
    constructor(objects: ko.ObservableArray<ObjectStorageItem>, dataSourceRefs: IDataSourceRefInfo[], availableDataSources: IDataSourceInfo[]);
    getDataSourcePath(dataSource: any): string;
    _findDataSourceInfo(name: string, collection: ko.ObservableArray<IDataSourceInfo>): IDataSourceInfo;
    _getDataSourceInfo(name: string): IDataSourceInfo;
    _getDataSourceName(dataSource: ObjectStorageItem): string;
    _addUsedDataSource(result: IDataSourceInfo): void;
    _addDataSource(dataSource: IDataSourceInfo, data: ObjectItem, uniqueName?: string): IDataSourceInfo;
    private _cloneObjectItem;
    getUniqueDataSourceName(name: string): string;
    addDataSource(dataSourceInfo: IDataSourceInfo): ObjectItem;
    removeDataSource(dataSourceInfo: IDataSourceInfo): void;
    restoreDataSource(dataSourceInfo: IDataSourceInfo): void;
    dataSourceValue(value: ko.Observable<ObjectStorageItem>, undoEngine?: ko.Observable<UndoEngine>): ko.PureComputed<string>;
    dataSourceDisplayExpr(dataSource: IDataSourceInfo): any;
    usedDataSources: ko.ObservableArray<IDataSourceInfo>;
    allDataSources: ko.ObservableArray<IDataSourceInfo>;
    mergedDataSources(): IDataSourceInfo[];
    findDataSourceInfo(dataSource: ObjectItem): IDataSourceInfo;
    findDataSourceInfoByID(id: string): IDataSourceInfo;
    findDataSourceInfoByRef(ref: string): IDataSourceInfo;
    findDataSourceInfoByName(name: string): IDataSourceInfo;
    static _assignValueInTimeout: boolean;
}
