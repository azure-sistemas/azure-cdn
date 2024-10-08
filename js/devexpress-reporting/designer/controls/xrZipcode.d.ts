﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrZipcode.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlSurface, XRControlViewModel } from './xrControl';
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
export declare class XRZipCodeSurface extends XRControlSurface {
    constructor(control: XRControlViewModel, context: ISurfaceContext);
    fontSize: ko.Computed<number>;
    letterSpacing: ko.Computed<number>;
}
