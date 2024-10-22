﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCheckbox.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel } from './xrControl';
import { GlyphOptions } from './properties/glyphOptions';
import { XRTextControlSurfaceBase } from './xrTextControl';
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class XRCheckBoxViewModel extends XRControlViewModel {
    static unitProperties: any[];
    static _patchModel(model: any): any;
    constructor(control: any, parent: ElementViewModel, serializer?: ModelSerializer);
    checked: ko.Observable<boolean> | ko.Computed<boolean>;
    checkBoxState: ko.Observable<string> | ko.Computed<string>;
    glyphAlignment: ko.Observable<string> | ko.Computed<string>;
    glyphOptions: GlyphOptions;
}
export declare class XRCheckBoxSurface extends XRTextControlSurfaceBase<XRCheckBoxViewModel> {
    constructor(control: XRCheckBoxViewModel, context: ISurfaceContext);
    borderCss: any;
    checkStateClass: ko.Computed<string>;
    checkStateStyleIcon: ko.Computed<string>;
    customGlyphStyleCss: ko.Computed<any>;
    checkStateWidth: ko.Observable<number> | ko.Computed<number>;
    checkStateHeight: ko.Observable<number> | ko.Computed<number>;
    textWidth: ko.Computed<number>;
    leftPadding: any;
    checkStateWidthContainer: ko.Observable<string> | ko.Computed<string>;
    visibleText: ko.Observable<boolean> | ko.Computed<boolean>;
    isGlyphAlignmentNear: ko.Computed<boolean>;
}
