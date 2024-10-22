﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\dataFederation.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectStorageItem } from './objectStorageItem';
import { ISerializationInfoArray, ModelSerializer, ISerializableModel } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export interface ISerializableDataFederationDataSourceInfo {
    dataSource: any;
    dataSources: any;
}
export interface ISerializableDataFederationDataSource extends ISerializableModel {
    dataSources: ko.ObservableArray<any>;
    dataSource: DataFederationDataSource;
    serialize: () => ISerializableDataFederationDataSourceInfo;
}
export declare class DataFederationDataSource extends ObjectStorageItem {
    private _dsHelperProvider;
    private _serializer;
    private _serializableModel;
    preInitProperties(model: any): void;
    constructor(model: any, _dsHelperProvider: any, _serializer: any);
    getSerializableModel(): SerializableDataFederationDataSource;
    serializableSourceMap: ko.ObservableArray<any>;
}
export declare class SerializableDataFederationDataSource implements ISerializableDataFederationDataSource {
    getInfo(): ISerializationInfoArray;
    constructor(dataSource: DataFederationDataSource, model?: ISerializableDataFederationDataSourceInfo, dsHelperProvider?: any, serializer?: ModelSerializer);
    serialize(): any;
    serializer: ModelSerializer;
    dataSources: ko.ObservableArray<ObjectStorageItem>;
    dataSource: DataFederationDataSource;
}
