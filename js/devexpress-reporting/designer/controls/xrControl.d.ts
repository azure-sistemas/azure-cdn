﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrControl.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRReportElementViewModel } from './xrReportelement';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ElementViewModel, ISurfaceContext, SurfaceElementBase, IArea, IElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { IUnitProperties, ISelectionTarget } from '@devexpress/analytics-core/analytics-internal';
import { IExpressionOptions } from '@devexpress/analytics-core/analytics-widgets';
import { IReportControlMetadata } from './utils/controlsFactory';
import { IExpressionBinding } from './properties/expressionBinding';
import { DataBinding } from '../dataObjects/dataBinding';
import { IAnchoringProperties, VerticalAcnhoring, HorizontalAnchoring } from './properties/anchoring';
import { SortingOptions } from './properties/sortingOptions';
export declare class XRControlViewModel extends XRReportElementViewModel {
    dispose(): void;
    anchoring(parent: IAnchoringProperties): void;
    constructor(control: any, parent: ElementViewModel, serializer?: IModelSerializer);
    getNearestParent(target: IElementViewModel): any;
    isPropertyDisabled(name: any): any;
    isPropertyVisible(name: any): boolean;
    hasExpressionBindings(): boolean;
    hasDataBindingByName(property?: string): boolean;
    readonly hasDefaultBindingProperty: boolean;
    getExpressionBinding(property?: string, event?: string): string;
    setExpressionBinding(value: string, property?: string, event?: string): void;
    getControlInfo(): IReportControlMetadata;
    getDefaultBinding(): IExpressionOptions | DataBinding;
    textArea: ko.Observable<string> | ko.Computed<string>;
    multiline: ko.Observable<boolean> | ko.Computed<boolean>;
    name: ko.Observable<string> | ko.Computed<string>;
    text: ko.Observable<string> | ko.Computed<string>;
    textFormatString: ko.Observable<string> | ko.Computed<string>;
    controls: ko.ObservableArray<XRControlViewModel>;
    popularDataBinding: any;
    anchorVertical: ko.Observable<string> | ko.Computed<string>;
    anchorHorizontal: ko.Observable<string> | ko.Computed<string>;
    vertAnchoring: VerticalAcnhoring;
    horAnchoring: HorizontalAnchoring;
    hasBindings: ko.Computed<boolean>;
    interactiveSorting: SortingOptions;
    expressionBindings: ko.ObservableArray<IExpressionBinding>;
    dataBindingsAreValid: ko.Observable<boolean> | ko.Computed<boolean>;
}
export declare class XRControlSurfaceBase<M extends ElementViewModel> extends SurfaceElementBase<M> {
    private delta;
    private _isThereIntersectionWithUsefulArea;
    static _appendValue(accumulator: string, value: string, needToAppend?: boolean): string;
    protected readonly _unitAbsoluteRect: IArea;
    private readonly _unitRect;
    constructor(control: M, context: ISurfaceContext, unitProperties: IUnitProperties<M>);
    checkParent(surfaceParent: ISelectionTarget): boolean;
    isThereIntersection(rect1: IArea, rect2: IArea): boolean;
    isThereIntersectionWithParent(parentRect: IArea, childRect: IArea): boolean;
    isThereIntersectionWithUsefulArea(): boolean;
    isThereIntersectionWithCrossBandControls(currentRect?: IArea): boolean;
    isThereIntersectionWithControls(): boolean;
    isThereIntersectionWithParentCollection(currentRect: any, controlRectProperty?: string): boolean;
    isThereIntersectionWithChildCollection(controlRectProperty?: string): boolean;
    isThereIntersectionWithNeighborsCollection(currentRect: any, collectionControls: any, controlRectProperty?: string): boolean;
    isThereIntersectionWithChildControls(collectionControls: any, controlRectProperty?: string): boolean;
    getAdornTemplate(): string;
    hasDataBindingByName(propertyName: string): boolean;
    readonly hasBindings: boolean;
    readonly bindingsIsValid: any;
    readonly bindingsHasWarning: any;
    contentSizes: any;
    contentHeightWithoutZoom: any;
    contentWidthWithoutZoom: any;
    borderCss: any;
    template: string;
    selectiontemplate: string;
    contenttemplate: string;
    isIntersect: ko.Computed<boolean>;
    adorntemplate: ko.Computed<string>;
    displayNameParameters: ko.PureComputed<{
        text: any;
        isExpression: boolean;
        dataSource: any;
        dataMember: any;
        dataMemberOffset: any;
        allowMarkupText: boolean;
        wordWrap: boolean;
        fontSize: number;
        fontUnit: any;
    }>;
    displayName: ko.PureComputed<any>;
    displayText(): any;
}
export declare class XRControlSurface extends XRControlSurfaceBase<XRControlViewModel> {
    dispose(): void;
    static _unitProperties: IUnitProperties<XRControlViewModel>;
    constructor(control: XRControlViewModel, context: ISurfaceContext);
    controls: ko.ObservableArray<XRControlSurface>;
}
