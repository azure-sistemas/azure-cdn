﻿/**
* DevExpress HTML/JS Reporting (designer\controls\pivotgrid\pivotgridfield.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SortBySummaryInfo } from './sortBySummary';
import { XRControlSurfaceBase } from '../xrControl';
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export interface IPivotGridFieldFormatInfo {
    formatString: ko.Observable<string>;
    formatType: ko.Observable<string>;
}
export interface IPivotGridField {
    area: ko.Observable<string> | ko.Computed<string>;
    areaIndex: ko.Observable<number> | ko.Computed<number>;
}
export declare class PivotGridFieldViewModel extends ElementViewModel implements IPivotGridField {
    static fieldHeight: number;
    static createNew(parent: any): () => PivotGridFieldViewModel;
    getFieldType(): string;
    getInfo(): import("@devexpress/analytics-core/analytics-utils").ISerializationInfoArray;
    getControlFactory(): import("../utils/controlsFactory").ControlsFactory;
    constructor(model: any, parent: ElementViewModel, serializer?: ModelSerializer);
    getPath(propertyName: any): string;
    getDisplayName(): any;
    controlType: string;
    area: ko.Observable<string> | ko.Computed<string>;
    areaIndex: ko.Observable<number> | ko.Computed<number>;
    areaIndexEditable: ko.Observable<number> | ko.Computed<number>;
    index: ko.Observable<number> | ko.Computed<number>;
    fieldName: ko.Observable<string> | ko.Computed<string>;
    fieldNameEditable: any;
    caption: ko.Observable<string> | ko.Computed<string>;
    summaryType: ko.Observable<string>;
    summaryDisplayType: ko.Observable<string>;
    unboundType: ko.Observable<string>;
    groupInterval: ko.Observable<string>;
    unboundExpression: ko.Observable<string>;
    sortBySummaryInfo: SortBySummaryInfo;
    valueFormat: IPivotGridFieldFormatInfo;
    totalValueFormat: IPivotGridFieldFormatInfo;
    cellFormat: IPivotGridFieldFormatInfo;
    totalCellFormat: IPivotGridFieldFormatInfo;
    grandTotalCellFormat: IPivotGridFieldFormatInfo;
}
export declare class PivotGridFieldSurface extends XRControlSurfaceBase<PivotGridFieldViewModel> implements IPivotGridField {
    constructor(control: PivotGridFieldViewModel, context: ISurfaceContext);
    minWidth: ko.Computed<number>;
    area: ko.Observable<string> | ko.Computed<string>;
    areaIndex: ko.Observable<number> | ko.Computed<number>;
    positionWidthWithoutZoom: ko.Computed<number>;
}
