﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_tableComponentSurface.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRTextControlSurfaceBase } from '../xrTextControl';
import { ElementViewModel, IArea } from '@devexpress/analytics-core/analytics-elements';
export declare enum TableActionDirection {
    vertical = 0,
    horizontal = 1
}
export declare class TableComponentSurface<T extends ElementViewModel> extends XRTextControlSurfaceBase<T> {
    private _getNeededProperties;
    private _generateRect;
    beforeRectUpdated(rect: IArea): IArea;
    direction: TableActionDirection;
}
