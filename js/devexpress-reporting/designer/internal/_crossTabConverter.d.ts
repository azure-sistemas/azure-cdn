﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_crossTabConverter.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
import { BaseConverter } from './_baseConverter';
export declare class CrossTabConverter extends BaseConverter {
    private _selectionProvider;
    private _context;
    private _detailLink;
    private _warnings;
    private _undoEngine;
    constructor(_selectionProvider: ISelectionProvider, _context: any);
    protected _applyChanges(): void;
    private _convertStyles;
    private _prepareNoStyles;
    private _prepareGeneralStyle;
    private _prepareStandardStyles;
    private _applyStyles;
    private _applyStyle;
    private _convertOptions;
    private _convertFields;
    private _copyPropertiesToField;
    private _saveOriginalLayout;
    private _applyVisibility;
    private _applyText;
    private _findRelatedPivotGridItem;
    private _validateChartLinked;
}
export declare class PivotGridConverter extends BaseConverter {
    private _selectionProvider;
    constructor(_selectionProvider: ISelectionProvider);
    protected _applyChanges(): void;
}
