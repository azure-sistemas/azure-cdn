﻿/**
* DevExpress HTML/JS Reporting (rich-edit\utils\_bindings.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { XRRichEditControlModel } from './_model';
interface IRichEditVirtualScrollItem {
    element: HTMLElement;
    model: XRRichEditControlModel;
}
export declare class RichEditVirtualScroll extends Disposable {
    private _viewPort;
    dispose(): void;
    items: IRichEditVirtualScrollItem[];
    registerViewPort(viewPort: HTMLElement): void;
    registerRichEditControl(element: HTMLElement, model: XRRichEditControlModel): void;
    unregisterRichEditControl(element: HTMLElement): void;
    updateRich(item: IRichEditVirtualScrollItem, viewPortRect: ClientRect): void;
    updateRichPosition(): void;
}
export {};
