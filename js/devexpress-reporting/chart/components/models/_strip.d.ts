﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_strip.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ChartElementCollectionItemBase } from '../../internal/_elementCollection';
import { StripLimitViewModel } from './_stripLimit';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare class StripViewModel extends ChartElementCollectionItemBase {
    static initialModel: {
        'MinLimit': {
            '@AxisValueSerializable': string;
        };
        'MaxLimit': {
            '@AxisValueSerializable': string;
        };
    };
    static from(model: any, serializer?: IModelSerializer): StripViewModel;
    constructor(model: any, parent: ko.ObservableArray<StripViewModel>, serializer?: IModelSerializer);
    static prefix: string;
    minLimit: StripLimitViewModel;
    maxLimit: StripLimitViewModel;
}
