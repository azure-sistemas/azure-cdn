﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_fieldListDataSourcesHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceHelper } from '../../helpers/_dataSourceHelper';
import { IPathRequest, IDataMemberInfo, IDisposable } from '@devexpress/analytics-core/analytics-utils';
import { IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
export declare var maxNestingLevelUpdate: (newVal?: number) => number;
export declare function patchRequest(request: IPathRequest, dataSources: IDataSourceInfo[], state: any): void;
export declare class FieldListDataSourcesHelper implements IDisposable {
    private _fieldListCache;
    private _dataSourceSubscriptions;
    private _innerCache;
    private _usedDataSourceSubscription;
    private _renameDataSourceStrategy;
    private _cacheIsClearNotificicator;
    dataSourceHelper: ko.Observable<DataSourceHelper>;
    fieldListDataSources: ko.ObservableArray<IDataSourceInfo>;
    dispose(): void;
    private _clearDataSourceCache;
    private _subscribeDataSource;
    private _updateFieldListDataSources;
    constructor();
    private _wrapRequest;
    private _findItems;
    private _createRelativePath;
    private _updateInnerCache;
    private _getPathPartsFromRequest;
    private _getItemsFromCache;
    wrapFieldsCallback(fieldsCallback: (request: IPathRequest) => JQueryPromise<IDataMemberInfo[]>, state: () => {}): (request: IPathRequest) => JQueryPromise<IDataMemberInfo[]>;
    _subscribeDataSources(usedDataSources: ko.ObservableArray<IDataSourceInfo>, model: any): void;
    updateDataSources(dsHelper: DataSourceHelper, model: any, parameters?: any): void;
}
