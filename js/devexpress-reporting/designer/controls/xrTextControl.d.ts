﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTextControl.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlSurfaceBase } from './xrControl';
import { FitTextToBoundsAction } from '../actions/fitTextToBoundsAction';
import { FitBoundsToTextAction } from '../actions/fitBoundsToTextAction';
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { IUnitProperties } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
import { FontModel } from '@devexpress/analytics-core/analytics-widgets-internal';
export declare class XRTextControlSurfaceBase<M extends ElementViewModel> extends XRControlSurfaceBase<M> {
    private _$element;
    private _font;
    characterHeight: ko.Computed<number>;
    contenttemplate: string;
    getAlignments(): {
        vertical: string;
        horizontal: string;
    };
    getWordWrap(): any;
    getCssContent(content?: Object): Object;
    getContentSize(): any;
    getText(): string;
    getFontModel(): FontModel;
    setFontSize(size: any): void;
    cacheElementContent($element: JQuery): void;
    fitTextToBounds(): void;
    fitWidthToText(): void;
    fitHeightToText(): void;
    fitBoundsToText(): void;
    constructor(control: M, context: ISurfaceContext, units?: IUnitProperties<any>);
    fitTextToBoundsAction: FitTextToBoundsAction;
    fitBoundsToTextAction: FitBoundsToTextAction;
}
