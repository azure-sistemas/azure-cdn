﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_dataContainer.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SeriesViewModel } from '../series/_series';
import { SeriesTemplateViewModel } from '../series/_template';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class DataContainerViewModel extends SerializableModel {
    static from(model: any, serializer?: IModelSerializer): DataContainerViewModel;
    static toJson(value: any, serializer: any, refs: any): any;
    constructor(model: any, serializer?: IModelSerializer);
    seriesTemplate: SeriesTemplateViewModel;
    series: ko.ObservableArray<SeriesViewModel>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    seriesDataMember: ko.Observable<string> | ko.Computed<string>;
    pivotGridDataSourceOptions: {
        autoBindingSettingsEnabled: ko.Observable<boolean> | ko.Computed<boolean>;
    };
}
