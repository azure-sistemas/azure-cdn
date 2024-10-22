﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCrossTabCell.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISelectionProvider, ISelectionTarget } from '@devexpress/analytics-core/analytics-internal';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { XRControlSurface, XRControlViewModel } from './xrControl';
import { Rectangle } from '@devexpress/analytics-core/analytics-elements';
import { ICrossTabCell } from './crossTab/cellCreator';
import { CellKind, DataFieldLayout } from './crossTab/enums';
import { CrossTabFieldModel, XRCrossTabViewModel } from './xrCrossTab';
import { TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
export declare function kindToString(kind: CellKind): "NO" | "CRN" | "RH" | "RTH" | "RT" | "CH" | "CTH" | "CT" | "DAT" | "DH" | "GDT" | "Emtpy" | "EmtpyH";
export declare class XRCrossTabCellViewModel extends XRControlViewModel implements ICrossTabCell {
    private parent;
    readonly namePrefix: string;
    static cellKinds: {
        'Header': CellKind[];
        'Total': CellKind[];
        'Data': CellKind[];
    };
    private readonly _width;
    private readonly _height;
    private readonly _left;
    private readonly _top;
    private _text;
    private _textFormatString;
    private _showCellCode;
    private _oldFieldName;
    private _getDefaultName;
    private _testFieldName;
    constructor(model: any, parent: XRCrossTabViewModel, serializer?: ModelSerializer);
    getPath: (propertyName: any) => string;
    reset(): void;
    canRemove(): boolean;
    canDropDown(): boolean;
    canDropRight(): boolean;
    canDropUp(): boolean;
    canDropLeft(): boolean;
    isPropertyVisible(name: any): boolean;
    isPropertyModified(name: any): any;
    isPropertyDisabled(name: any): any;
    isBindable(): boolean;
    isIndependant(): boolean;
    isEditable(): boolean;
    createAndAssignNewField(fieldName: string, insertBefore: boolean, dataFieldLayout?: DataFieldLayout): void;
    fieldName: ko.Observable<string> | ko.Computed<string>;
    summaryType: any;
    summaryDisplayType: any;
    sortOrder: any;
    crossTabGroupInterval: any;
    crossTabGroupIntervalNumericRange: any;
    crossTabSortBySummaryInfo: any;
    _columnIndex: ko.Observable<number>;
    _rowIndex: ko.Observable<number>;
    _columnSpan: ko.Observable<number>;
    _rowSpan: ko.Observable<number>;
    name: ko.Observable<string> | ko.Computed<string>;
    text: ko.Observable<string> | ko.Computed<string>;
    dataLevel?: number;
    rowLevel?: number;
    columnLevel?: number;
    kind: ko.Observable<CellKind>;
    field: ko.Observable<CrossTabFieldModel>;
    dependentFields: CrossTabFieldModel[];
    textFormatString: ko.Observable<string> | ko.Computed<string>;
    rowVisible: ko.Computed<boolean>;
    columnVisible: ko.Computed<boolean>;
    rowAutoHeightMode: ko.Observable<string>;
    columnAutoWidthMode: ko.Observable<string>;
    fieldNameAreValid: ko.Observable<boolean>;
}
export declare class XRCellsurface extends XRControlSurface {
    constructor(control: XRCrossTabCellViewModel, context: any);
    checkParent(surfaceParent: ISelectionTarget): boolean;
    selectLine(selection: ISelectionProvider, event?: {
        ctrlKey: boolean;
        metaKey: boolean;
    }, isRow?: boolean): void;
    cellClick(): void;
    isEditable(): boolean;
    private _getDropCallback;
    private _canSetFieldName;
    getAdornTemplate(): string;
    dragCallback(item: TreeListItemViewModel): void;
    findNextSelection(): any;
    contenttemplate: string;
    showDropSurface: ko.Computed<boolean>;
    dropRect: Rectangle;
    isDropTarget: ko.Observable<boolean>;
    dragCss: ko.Observable<string>;
    dropCallback: (treeListItem: TreeListItemViewModel) => void;
}
