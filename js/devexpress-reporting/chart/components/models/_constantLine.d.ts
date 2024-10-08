﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_constantLine.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ChartElementCollectionItemBase } from '../../internal/_elementCollection';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class ConstantLineViewModel extends ChartElementCollectionItemBase {
    static from(model: any, serializer?: IModelSerializer): ConstantLineViewModel;
    constructor(model: any, parent: ko.ObservableArray<ConstantLineViewModel>, serializer?: IModelSerializer);
    static prefix: string;
    axisValue: ko.Observable<string>;
    _axisValue: ko.Observable<string>;
}
