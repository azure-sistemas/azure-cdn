﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_displayNameProvider.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectStorageItem } from '../dataObjects/objectStorageItem';
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
import { IDisplayNameProvider, IItemsProvider } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class DisplayNameProvider implements IDisplayNameProvider {
    private _fieldsProvider;
    private _dataSourceHelper;
    private _rootDS;
    private _requests;
    private _getRequest;
    private _ignoreDisplayNameRequest;
    private _getDisplayNameRequest;
    private _createRequestInfo;
    private _getFieldDisplayName;
    private _getDisplayName;
    private _getRealName;
    private _getRealNameRequest;
    constructor(_fieldsProvider: IItemsProvider, _dataSourceHelper: DataSourceHelper, _rootDS: ko.Observable<ObjectStorageItem>);
    getDisplayName(dataSource: ObjectStorageItem, dataMember: string, dataMemberOffset?: string, includeDataSourceName?: boolean): JQuery.Promise<string, any, any>;
    getDisplayNameByPath(path: string, dataMember: string): JQueryPromise<string>;
    getRealName(path: string, dataMember: string): JQueryPromise<string>;
    private _getByPath;
    dispose(): void;
}
