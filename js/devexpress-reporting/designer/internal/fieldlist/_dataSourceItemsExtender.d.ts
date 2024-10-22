﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_dataSourceItemsExtender.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataMemberInfo, IPathRequest } from '@devexpress/analytics-core/analytics-utils';
import { IDataSourceInfo, IItemsExtender } from '@devexpress/analytics-core/analytics-internal';
export declare class DataSourceItemsExtender implements IItemsExtender {
    private _dataSources;
    constructor(dataSources: ko.ObservableArray<IDataSourceInfo>);
    beforeItemsFilled(request: IPathRequest, items: IDataMemberInfo[]): boolean;
    afterItemsFilled(request: IPathRequest, items: IDataMemberInfo[]): void;
}
