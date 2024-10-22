﻿/**
* DevExpress HTML/JS Reporting (chart\components\axis\_axisXYViewModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ConstantLineViewModel } from '../models/_constantLine';
import { ScaleBreakViewModel } from '../models/_scaleBreak';
import { StripViewModel } from '../models/_strip';
import { ISerializationInfoArray, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
export declare class AxisXYViewModel extends SerializableModel {
    static from(info?: ISerializationInfoArray): (model: any, serializer: any) => AxisXYViewModel;
    static toJson(value: any, serializer: any, refs: any): any;
    constructor(model: any, serializer?: IModelSerializer, info?: ISerializationInfoArray);
    constantLines: ko.ObservableArray<ConstantLineViewModel>;
    scaleBreaks: ko.ObservableArray<ScaleBreakViewModel>;
    strips: ko.ObservableArray<StripViewModel>;
}
