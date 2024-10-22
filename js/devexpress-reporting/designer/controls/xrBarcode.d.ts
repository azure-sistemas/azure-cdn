﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrBarcode.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel, XRControlSurface } from './xrControl';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
export declare class XRBarCodeViewModel extends XRControlViewModel {
    static unitProperties: any[];
    createBarcode(model: any, serializer?: any): {
        'name': ko.Observable<any>;
        'getInfo': () => import("@devexpress/analytics-core/analytics-utils").ISerializationInfoArray;
    };
    constructor(model: any, parent: ElementViewModel, serializer?: ModelSerializer);
    symbology: any;
    barcodeFake: any;
}
export declare class XRBarcodeSurface extends XRControlSurface {
    constructor(control: XRControlViewModel, context: ISurfaceContext);
}
