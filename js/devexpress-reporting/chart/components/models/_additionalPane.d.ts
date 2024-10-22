﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_additionalPane.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ChartElementCollectionItemBase } from '../../internal/_elementCollection';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare class AdditionalPaneViewModel extends ChartElementCollectionItemBase {
    static from(model: any, serializer?: IModelSerializer): AdditionalPaneViewModel;
    constructor(model: any, parent: ko.ObservableArray<AdditionalPaneViewModel>, serializer?: IModelSerializer);
    static prefix: string;
}
