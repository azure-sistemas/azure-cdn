﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\customizeLabelPage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { GraphicsUnit } from '../reportWizardState';
import { ILabelDetails, ILabelProduct, IPaperKind } from '../internal/labelWizardUtils';
import * as ko from 'knockout';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
export declare class CustomizeLabelPage extends WizardPageBase {
    static _CONVERSION_COEEFICIENT: number;
    private _id;
    private _labelWidth;
    private _labelHeight;
    private _horizontalPitch;
    private _verticalPitch;
    private _topMargin;
    private _leftMargin;
    private _rightMargin;
    private _bottomMargin;
    private _getFormattedValueInUnits;
    private _getLabelsCount;
    private _rowsCount;
    private _columnsCount;
    private _pageHeight;
    private _pageWidth;
    constructor();
    canNext(): boolean;
    canFinish(): boolean;
    initialize(labelDetails: ILabelDetails): JQueryPromise<{
        labelProducts: ILabelProduct[];
        paperKinds: IPaperKind[];
        labelDetails: ILabelDetails[];
    }>;
    commit(): JQuery.Promise<ILabelDetails, any, any>;
    _labelData: {
        labelProducts: ILabelProduct[];
        paperKinds: IPaperKind[];
        labelDetails: ILabelDetails[];
    };
    paperKinds: () => IPaperKind[];
    _selectedPaperSize: ko.Observable<IPaperKind>;
    unit: ko.Observable<GraphicsUnit>;
    _stepUnit: ko.PureComputed<0.1 | 0.01>;
    labelWidth: ko.Computed<number>;
    labelHeight: ko.Computed<number>;
    horizontalPitch: ko.Computed<number>;
    verticalPitch: ko.Computed<number>;
    topMargin: ko.Computed<number>;
    leftMargin: ko.Computed<number>;
    rightMargin: ko.Computed<number>;
    bottomMargin: ko.Computed<number>;
    _labelsCountText: ko.PureComputed<string>;
    _pageSizeText: ko.PureComputed<string>;
    static _getPageSizeText(width: number, height: number, unit: GraphicsUnit): string;
    _units: {
        text: any;
        value: GraphicsUnit;
    }[];
}
export declare function _registerCustomizeLabelPage(factory: PageFactory): void;
