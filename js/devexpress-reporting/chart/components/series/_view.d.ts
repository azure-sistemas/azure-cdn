﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_view.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FillStyle } from './_fillStyle';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class SeriesViewViewModel extends SerializableModel {
    static from(model: any, serializer?: IModelSerializer): ko.Observable<SeriesViewViewModel>;
    dispose(): void;
    static toJson(value: any, serializer: any, refs: any): any;
    _getInfo(typeName: string): import("@devexpress/analytics-core/analytics-utils").ISerializationInfo[];
    private _createPropertyDisabledDependence;
    private _createMarkerDependences;
    private _createLinkOptionsDependences;
    preInitProperties(model: any): void;
    constructor(model: any, serializer?: IModelSerializer);
    axisXName: ko.Observable<string> | ko.Computed<string>;
    axisYName: ko.Observable<string> | ko.Computed<string>;
    paneName: ko.Observable<string> | ko.Computed<string>;
    fillStyle: FillStyle;
    indicators: ko.ObservableArray<Indicator>;
    barWidth: ko.Observable<number> | ko.Computed<number>;
    typeName: string;
}
import { Indicator } from './_indicator';
