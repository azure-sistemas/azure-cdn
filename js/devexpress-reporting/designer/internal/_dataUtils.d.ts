﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_dataUtils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
import { ObjectItem } from '../dataObjects/objectStorageItem';
import { IDataMemberInfo, UndoEngine, IItemsProvider } from '@devexpress/analytics-core/analytics-utils';
import { IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { ReportViewModel } from '../controls/xrReport';
export declare function addDataSourceToReport(dataSourceHelper: DataSourceHelper, report: ReportViewModel, undoEngine: UndoEngine, itemsProvider: IItemsProvider, dataSource: IDataSourceInfo, forceAssigning?: boolean): void;
export declare function includeNonListItem(dataMembers: IDataMemberInfo[]): boolean;
export declare function removeDataSourceFromReport(dataSourceHelper: DataSourceHelper, reportDataSource: ko.Observable<ObjectItem> | ko.Computed<ObjectItem>, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, dataSource: IDataSourceInfo): void;
