﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_elementCollection.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ICollectionItem } from '../components/axis/_axis';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, ISerializationInfoArray, IAction } from '@devexpress/analytics-core/analytics-utils';
export declare class ChartElementCollectionItemBase extends SerializableModel implements ICollectionItem {
    static toJson(value: ChartElementCollectionItemBase, serializer: any, refs: any): any;
    constructor(model: any, parent: ko.ObservableArray<ChartElementCollectionItemBase>, serializer?: IModelSerializer, info?: ISerializationInfoArray);
    parent: ko.ObservableArray<ICollectionItem>;
    name: ko.Observable<string> | ko.Computed<string>;
    defaultItemName: (parentName?: string) => string;
    innerActions: IAction[];
}
