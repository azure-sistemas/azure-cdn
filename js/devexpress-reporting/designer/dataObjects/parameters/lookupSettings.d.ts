﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\lookupSettings.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectItem, ObjectStorageItem } from '../objectStorageItem';
import { ReportViewModel } from '../../controls/xrReport';
import { LookUpValue } from './lookUpValue';
import { DataSourceHelper } from '../../helpers/_dataSourceHelper';
import { ISerializationInfoArray, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class LookUpSettings extends ObjectItem {
    getInfo(): ISerializationInfoArray;
    updateFilter(parameter: any, report: ReportViewModel): void;
    constructor(model: any, dsHelperProvider?: any, serializer?: IModelSerializer);
    filterString: any;
    _filterString: any;
}
export declare class StaticListLookUpSettings extends LookUpSettings {
    getInfo(): ISerializationInfoArray;
    preInitProperties(model: any, helper: any, serializer: any): void;
    afterDeserialization(model: any, serializer: any): void;
    updateFilter(parameter: any, report: ReportViewModel): void;
    constructor(model: any, dsHelperProvider?: any, serializer?: IModelSerializer);
    _isEditing: ko.Observable<boolean>;
    lookUpValues: ko.ObservableArray<LookUpValue>;
}
export declare class DynamicListLookUpSettings extends LookUpSettings {
    getInfo(): ISerializationInfoArray;
    constructor(model: any, dsHelperProvider?: any, serializer?: IModelSerializer);
    dsHelperProvider: () => DataSourceHelper;
    dataSource: ko.Observable<ObjectStorageItem>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    getPath(propertyName: any): any;
    isPropertyDisabled(name: string): boolean;
}
