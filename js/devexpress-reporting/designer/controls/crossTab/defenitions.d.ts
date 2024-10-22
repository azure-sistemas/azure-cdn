﻿/**
* DevExpress HTML/JS Reporting (designer\controls\crossTab\defenitions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { Disposable, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { XRCrossTabViewModel } from '../xrCrossTab';
import { XRCrossTabCellViewModel } from '../xrCrossTabCell';
import { ICrossTabCell } from './cellCreator';
export declare function findcells(cells: XRCrossTabCellViewModel[], columnIndex?: number, rowIndex?: number): XRCrossTabCellViewModel[];
export declare class CrossTabDefinitionsModel extends SerializableModel {
    constructor(model: any, parent?: XRCrossTabViewModel, serializer?: IModelSerializer);
    visible: ko.Observable<boolean>;
}
export declare class CrossTabRowDefinitionsModel extends CrossTabDefinitionsModel {
    getInfo(): ({
        propertyName: string;
        modelName: string;
        defaultVal: boolean;
        from: typeof import("@devexpress/analytics-core/analytics-utils").parseBool;
    } | {
        propertyName: string;
        modelName: string;
        displayName: string;
        localizationId: string;
        defaultVal: number;
        from: typeof import("@devexpress/analytics-core/analytics-utils").floatFromModel;
    } | {
        propertyName: string;
        modelName: string;
        defaultVal: string;
        valuesArray: import("@devexpress/analytics-core/analytics-utils").IDisplayedValue[];
    })[];
    height: ko.Observable<number> | ko.Computed<number>;
    autoHeightMode: ko.Observable<string>;
}
export declare class CrossTabColumnDefinitionsModel extends CrossTabDefinitionsModel {
    getInfo(): ({
        propertyName: string;
        modelName: string;
        localizationId: string;
        defaultVal: number;
        from: typeof import("@devexpress/analytics-core/analytics-utils").floatFromModel;
    } | {
        propertyName: string;
        modelName: string;
        defaultVal: string;
        valuesArray: import("@devexpress/analytics-core/analytics-utils").IDisplayedValue[];
    } | {
        propertyName: string;
        modelName: string;
        defaultVal: boolean;
        from: typeof import("@devexpress/analytics-core/analytics-utils").parseBool;
    })[];
    width: ko.Observable<number> | ko.Computed<number>;
    autoWidthMode: ko.Observable<string>;
}
export declare class CellMatrixHelper {
    constructor(cells: XRCrossTabCellViewModel[]);
    findRowCell(i: any, j: any, span?: number): any;
    findColumnCell(i: any, j: any, span?: number): any;
    matrix: ICrossTabCell[][];
    columnCount: number;
    rowCount: number;
}
interface IDefenitionFinder {
    cell: ICrossTabCell;
    defenition: CrossTabDefinitionsModel;
}
export declare class DefenitionUpdater extends Disposable {
    private _columnDefinitions;
    private _rowDefinitions;
    private _serializer;
    constructor(crossTab: XRCrossTabViewModel);
    findDefinition(array: IDefenitionFinder[], cell: any): IDefenitionFinder;
    update(cells: XRCrossTabCellViewModel[], width: number, height: number): {
        columnDefs: CrossTabColumnDefinitionsModel[];
        rowDefs: CrossTabRowDefinitionsModel[];
    };
}
export {};
