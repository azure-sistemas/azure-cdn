﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\dataBinding.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
import { ObjectStorageItem } from './objectStorageItem';
import { Disposable, PathRequest, ModelSerializer, IModelSerializer, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
export declare class DataBindingBase extends Disposable {
    getInfo(): import("@devexpress/analytics-core/analytics-utils").ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    private _findDataSourceFromPath;
    updateParameter(pathRequest: PathRequest, dataSources: IDataSourceInfo[]): void;
    updateBinding(path: string, dataSources: any): void;
    getValuePath(dataSourceHelper: any): string;
    generateValue(undoEngine: UndoEngine, dataSourceHelper: DataSourceHelper, dataSources: any): ko.Computed<string>;
    resetValue(): void;
    isEmpty(): boolean;
    value: ko.Observable<string> | ko.Computed<string>;
    generatedValue: ko.Computed<string>;
    parameter: ko.Observable<Parameter> | ko.Computed<Parameter>;
    dataSource: ko.Observable<ObjectStorageItem> | ko.Computed<ObjectStorageItem>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    displayExpr: ko.Computed<string>;
}
export declare class DataBinding extends DataBindingBase {
    static initialize(model: any, serializer?: ModelSerializer): ko.ObservableArray<DataBinding>;
    getInfo(): import("@devexpress/analytics-core/analytics-utils").ISerializationInfoArray;
    updateParameter(pathRequest: PathRequest, dataSources: any): void;
    constructor(model: any, serializer?: IModelSerializer);
    resetValue(): void;
    visible: ko.Observable<boolean>;
    disabled: ko.PureComputed<boolean>;
    propertyName: ko.Observable<string> | ko.Computed<string>;
    formatString: ko.Observable<string> | ko.Computed<string>;
}
import { Parameter } from './parameters/parameter';
