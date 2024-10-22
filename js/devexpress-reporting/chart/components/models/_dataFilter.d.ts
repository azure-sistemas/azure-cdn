﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_dataFilter.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfoArray, ISerializableModel, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare var dataFilterSerializationsInfo: ISerializationInfoArray;
export declare class DataFilterModel implements ISerializableModel {
    static createNew(): DataFilterModel;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    columnName: ko.Observable<string>;
    name: ko.Computed<string>;
}
export declare var DefaultDataFilterModel: (newVal?: typeof DataFilterModel) => typeof DataFilterModel;
