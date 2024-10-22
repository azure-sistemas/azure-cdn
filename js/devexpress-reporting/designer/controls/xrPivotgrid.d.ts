﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPivotgrid.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PivotGridFieldViewModel, PivotGridFieldSurface } from './pivotgrid/pivotgridfield';
import { XRControlViewModel, XRControlSurface } from './xrControl';
import { ObjectStorageItem } from '../dataObjects/objectStorageItem';
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { FilterStringOptions } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export declare class XRPivotGridViewModel extends XRControlViewModel {
    dispose(): void;
    private _initCriteriaString;
    constructor(model: any, parent: ElementViewModel, serializer?: ModelSerializer);
    removeChild(selectedField: PivotGridFieldViewModel): void;
    getFieldsFromArea(area: string): PivotGridFieldViewModel[];
    getPath(propertyName: any): string;
    fields: ko.ObservableArray<PivotGridFieldViewModel>;
    dataSource: ko.Observable<ObjectStorageItem>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    addFieldToArea: any;
    prefilter: {
        parent: XRPivotGridViewModel;
        _criteriaString: ko.Observable<string> | ko.Computed<string>;
        criteriaString: FilterStringOptions;
    };
}
export declare class XRPivotGridSurface extends XRControlSurface {
    constructor(control: XRPivotGridViewModel, context: ISurfaceContext);
    _getChildrenHolderName(): string;
    getAreaFields(area: string): PivotGridFieldSurface[];
    getTotalsAreaFieldWidth(area: string, zoom: number): number;
    getAdornTemplate(): "" | "dxrd-intersect";
    isThereIntersectionWithChildCollection(): boolean;
    filterFields: ko.Computed<PivotGridFieldSurface[]>;
    dataFields: ko.Computed<PivotGridFieldSurface[]>;
    columnFields: ko.Computed<PivotGridFieldSurface[]>;
    rowFields: ko.Computed<PivotGridFieldSurface[]>;
    totalsHeight: ko.Computed<number>;
    rowHeaderHeight: ko.Computed<number>;
    totalsDataFieldWidth: ko.Computed<number>;
    totalsRowFieldWidth: ko.Computed<number>;
    fields: ko.ObservableArray<PivotGridFieldSurface>;
}
