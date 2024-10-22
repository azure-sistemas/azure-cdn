﻿/**
* DevExpress HTML/JS Reporting (designer\bands\multiColumn.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, Disposable, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ISurfaceContext, SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { Margins } from '@devexpress/analytics-core/analytics-elements';
export declare class MultiColumn extends SerializableModel {
    static unitProperties: string[];
    constructor(model: any, pageWidth: ko.Observable<number> | ko.Computed<number>, margins: Margins, serializer?: IModelSerializer);
    mode: ko.Observable<string> | ko.Computed<string>;
    realColumnWidth: ko.Observable<number> | ko.Computed<number>;
    grayAreaWidth: ko.Observable<number>;
    columnWidth: ko.Observable<number> | ko.Computed<number>;
    columnCount: ko.Observable<number> | ko.Computed<number>;
    columnSpacing: any;
}
export declare var multiColumnSerializationsInfo: ISerializationInfoArray;
export declare class MultiColumnSurface extends Disposable {
    constructor(multiColumn: MultiColumn, context: ISurfaceContext);
    grayAreaWidth: ko.Computed<number>;
    columnWidth: ko.Computed<number>;
    columnSpacing: ko.Computed<number>;
    columnSpacingLeft: ko.Computed<number>;
    grayAreaLeft: ko.Computed<number>;
    haveColumns: ko.Computed<boolean>;
}
