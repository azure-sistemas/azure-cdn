﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_indicator.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ChartElementCollectionItemBase } from '../../internal/_elementCollection';
export declare class Indicator extends ChartElementCollectionItemBase {
    static prefix: string;
    constructor(model: any, parent: ko.ObservableArray<Indicator>, serializer?: any);
}
export declare function assignIndicatorActions(indicators: ko.ObservableArray<Indicator>): void;
