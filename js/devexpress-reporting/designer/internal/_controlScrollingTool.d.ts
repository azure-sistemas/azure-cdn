﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_controlScrollingTool.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
export declare class ControlScrollingTool extends Disposable {
    private _rootElement;
    private _viewport;
    constructor(_rootElement: Element);
    scrollToControl(surface: any): void;
    private _getScrollOffset;
    dispose(): void;
}
