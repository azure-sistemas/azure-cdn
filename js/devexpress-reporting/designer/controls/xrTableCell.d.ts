﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTableCell.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel, XRControlSurface } from './xrControl';
import { XRTableRowViewModel } from './xrTableRow';
import { TableComponentSurface, TableActionDirection } from './utils/_tableComponentSurface';
import { ISurfaceContext, IArea } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { IUnitProperties, ISelectionTarget, ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { ContainerEditOptions } from './properties/editOptions';
export declare class XRTableCellViewModel extends XRControlViewModel {
    static unitProperties: string[];
    constructor(model: any, parent: XRTableRowViewModel, serializer?: ModelSerializer);
    weight: ko.Observable<number> | ko.Computed<number>;
    width: ko.Computed<number>;
    height: ko.Computed<number>;
    left: ko.Observable<number> | ko.Computed<number>;
    name: ko.Observable<string> | ko.Computed<string>;
    text: ko.Observable<string> | ko.Computed<string>;
    surface: XRTableCellSurface;
    borders: ko.Observable<string> | ko.Computed<string>;
    parentModel: ko.Observable<XRTableRowViewModel>;
    textEditOptions: ContainerEditOptions;
}
export declare class XRTableCellSurface extends TableComponentSurface<XRTableCellViewModel> {
    private _row;
    private _table;
    private _cellIndex;
    private _rowIndex;
    private _getAdjacentCellByRowIndex;
    private _isShowBorder;
    static _unitProperties: IUnitProperties<XRTableCellViewModel>;
    dispose(): void;
    constructor(control: XRTableCellViewModel, context: ISurfaceContext);
    direction: TableActionDirection;
    controls: ko.ObservableArray<XRControlSurface>;
    x: ko.Observable<number> | ko.Computed<number>;
    rowSpan: ko.Computed<number>;
    heightWithRowSpan: () => number;
    offsetZIndex: () => number;
    selectColumn(selection: ISelectionProvider): void;
    checkParent(surfaceParent: ISelectionTarget): boolean;
    isThereIntersectionWithUsefulArea(): boolean;
    isThereIntersectionWithCrossBandControls(): boolean;
    isThereIntersectionWithNeighborsCollection(): boolean;
    isThereIntersectionWithParentCollection(): boolean;
    beforeRectUpdated(rect: IArea): IArea;
    canDrop(): boolean;
    getAdornTemplate(): string;
}
