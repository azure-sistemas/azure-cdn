﻿/**
* DevExpress HTML/JS Reporting (chart\components\axis\_secondaryAxisViewModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AxisXYViewModel } from './_axisXYViewModel';
import { ICollectionItem } from './_axis';
import { IAction, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare class SecondaryAxisViewModel extends AxisXYViewModel implements ICollectionItem {
    static xPrefix: string;
    static yPrefix: string;
    constructor(model: any, parent: ko.ObservableArray<SecondaryAxisViewModel>, serializer?: IModelSerializer);
    readonly axisID: number;
    parent: ko.ObservableArray<SecondaryAxisViewModel>;
    innerActions: Array<IAction>;
}
