﻿/**
* DevExpress HTML/JS Reporting (designer\controls\_xrTodoControl.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel, XRControlSurface } from './xrControl';
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare class UnknownViewModel extends XRControlViewModel {
    constructor(model: any, parent: ElementViewModel, serializer?: ModelSerializer);
    _model: any;
}
export declare class TodoControlSurface extends XRControlSurface {
    constructor(control: XRControlViewModel, context: ISurfaceContext);
}
