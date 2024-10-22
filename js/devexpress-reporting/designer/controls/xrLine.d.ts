﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrLine.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlSurface, XRControlViewModel } from './xrControl';
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
export declare class XRLineSurface extends XRControlSurface {
    constructor(control: XRControlViewModel, context: ISurfaceContext);
    linePosition: any;
}
