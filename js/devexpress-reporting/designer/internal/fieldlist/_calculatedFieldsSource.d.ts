﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_calculatedFieldsSource.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CalculatedField } from '../../dataObjects/calculatedField';
import { DataSourceHelper } from '../../helpers/_dataSourceHelper';
import { ObjectStorageItem } from '../../dataObjects/objectStorageItem';
import { Disposable, IPathRequest, IDataMemberInfo, IAction } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IActionsProvider, IItemsExtender } from '@devexpress/analytics-core/analytics-internal';
export declare class CalculatedFieldsSource extends Disposable implements IActionsProvider, IItemsExtender {
    dispose(): void;
    private _calculatedFieldsInfo;
    private _ordinaryFieldsInfo;
    private _calculatedFields;
    private _dataSourceHelper;
    private _reportDataSource;
    private _fieldsDataMembersInfo;
    private _fieldsCallback;
    private _getDataMembersInfoByPath;
    private _subscribeFieldProperties;
    private _getFieldPathRequest;
    private _updateFieldPathRequest;
    private _initializeCalculatedField;
    private _generateNewFieldName;
    constructor(calculatedFields: ko.ObservableArray<CalculatedField>, reportDataSource: ko.Observable<ObjectStorageItem>, dataSourceHelper: DataSourceHelper);
    createCalculatedField(dataMember: string): CalculatedField;
    addAction: IAction;
    removeAction: IAction;
    getActions(context: any): IAction[];
    beforeItemsFilled(request: IPathRequest, items: IDataMemberInfo[]): boolean;
    afterItemsFilled(request: IPathRequest, items: IDataMemberInfo[]): void;
    addCalculatedField: (fullPath: string) => CalculatedField;
    removeCalculatedField: (fullPath: string) => void;
}
