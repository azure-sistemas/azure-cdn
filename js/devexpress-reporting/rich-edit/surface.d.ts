﻿/**
* DevExpress HTML/JS Reporting (rich-edit\surface.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { XRRichController } from './utils/_controller';
import { XRRichEditControlModel } from './utils/_model';
import { XRControlSurface } from '../designer/controls/xrControl';
import { XRRichViewModel } from '../designer/controls/xrRichText';
export declare class XRRichModernSurface extends XRControlSurface {
    private _convertReady;
    constructor(control: XRRichViewModel, context: ISurfaceContext);
    createController(richEdit: XRRichEditControlModel): void;
    isValid: ko.Observable<boolean>;
    defaultStyleunit: ko.Computed;
    controller: XRRichController;
    serializedRtf: ko.Observable<string>;
}
