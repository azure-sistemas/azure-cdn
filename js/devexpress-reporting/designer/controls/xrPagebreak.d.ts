﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPagebreak.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlSurfaceBase, XRControlViewModel } from './xrControl';
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { IUnitProperties } from '@devexpress/analytics-core/analytics-internal';
export declare class XRPageBreakSurface extends XRControlSurfaceBase<XRControlViewModel> {
    static _unitProperties: IUnitProperties<XRControlViewModel>;
    preInitProperties(control: any, context: any): void;
    constructor(control: XRControlViewModel, context: ISurfaceContext);
    readonly isIntersectionDeny: boolean;
    linePosition: any;
    lineHeight: ko.Computed<number>;
}
