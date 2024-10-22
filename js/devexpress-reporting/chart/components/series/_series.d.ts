﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_series.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SeriesTemplateViewModel } from './_template';
import { ICollectionItem } from '../axis/_axis';
import { IModelSerializer, IAction } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class SeriesViewModel extends SeriesTemplateViewModel implements ICollectionItem {
    static prefix: string;
    updateByView(view: SeriesViewViewModel): void;
    constructor(model: any, parent: ko.ObservableArray<SeriesViewModel>, serializer?: IModelSerializer);
    isIncompatible: ko.Observable<boolean>;
    parent: ko.ObservableArray<SeriesViewModel>;
    points: ko.ObservableArray<SeriesPointModel>;
    innerActions: IAction[];
}
import { SeriesViewViewModel } from './_view';
import { SeriesPointModel } from './_point';
