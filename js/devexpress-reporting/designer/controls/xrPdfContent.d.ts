﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPdfContent.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel } from './xrControl';
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { TodoControlSurface } from './_xrTodoControl';
export declare class XRPdfContentViewModel extends XRControlViewModel {
    private _sourceItem;
    constructor(model: any, parent: ElementViewModel, serializer?: IModelSerializer);
    canFit(): boolean;
    fitToContent(): void;
    _getPdfContentData(checkSource: any): void;
    _getExpressionNameByPropertyName(propertyName: string): string;
    source: ko.Observable<string> | ko.Computed<string>;
    sourceUrl: ko.Observable<string> | ko.Computed<string>;
    generateOwnPages: ko.Observable<boolean>;
    pageCount: ko.Observable<number>;
    imageSource: ko.Observable<string>;
    imageWidth: number;
    imageHeight: number;
    textContent: ko.Computed<string>;
    pageRange: ko.Observable<string>;
}
export declare class XRPdfContentSurface extends TodoControlSurface {
    private _handles;
    private _getHandles;
    constructor(control: XRPdfContentViewModel, context: ISurfaceContext);
    getResizableOptions(resizeHandler: any): any;
    generateOwnPages: ko.Observable<boolean>;
}
