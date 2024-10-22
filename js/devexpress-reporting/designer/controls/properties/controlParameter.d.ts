﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\controlParameter.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataBindingBase } from '../../dataObjects/dataBinding';
import { IDataMemberInfo, IModelSerializer, ISerializableModel } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { FieldListProvider } from '@devexpress/analytics-core/analytics-internal';
import { DataSourceHelper } from '../../helpers/_dataSourceHelper';
export declare class ControlParameter extends DataBindingBase implements ISerializableModel {
    static createNew(): ControlParameter;
    getInfo(): import("@devexpress/analytics-core/analytics-utils").ISerializationInfo[];
    isEmpty(): boolean;
    constructor(model: any, serializer?: IModelSerializer);
    setDataMemberInfo(dataMemberInfo: IDataMemberInfo): void;
    readonly specifics: string;
    readonly name: string;
    generateValue(undoEngine: any, dataSourceHelper: DataSourceHelper, dataSources: any, dataBindingsProvider?: FieldListProvider): ko.Computed<string>;
    fakeBinding: any;
    visible: ko.Observable<boolean>;
    parameterName: ko.Observable<string>;
    dataMemberInfo: ko.Observable<IDataMemberInfo>;
}
