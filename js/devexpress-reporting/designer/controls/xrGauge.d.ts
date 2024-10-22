﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrGauge.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel } from './xrControl';
import { ISerializationInfoArray, ModelSerializer, IDisplayedValue } from '@devexpress/analytics-core/analytics-utils';
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
export declare var circularValues: Array<IDisplayedValue>;
export declare var linearValues: Array<IDisplayedValue>;
export declare class XRGaugeViewModel extends XRControlViewModel {
    static bindings: string[];
    constructor(model: any, parent: ElementViewModel, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    viewType: ko.Observable<string> | ko.Computed<string>;
    viewStyle: ko.Observable<string> | ko.Computed<string>;
}
