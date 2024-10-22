﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrPageinfo.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlSurface, XRControlViewModel } from './xrControl';
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare class XRPageInfoSurface extends XRControlSurface {
    constructor(control: XRPageInfoViewModel, context: ISurfaceContext);
}
export declare class XRPageInfoViewModel extends XRControlViewModel {
    constructor(model: any, parent: ElementViewModel, serializer?: ModelSerializer);
}
export declare var pageInfoValuesMap: {
    value: string;
    displayValue: string;
    localizationId: string;
}[];
