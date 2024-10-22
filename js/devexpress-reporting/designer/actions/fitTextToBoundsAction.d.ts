﻿/**
* DevExpress HTML/JS Reporting (designer\actions\fitTextToBoundsAction.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRTextControlSurfaceBase } from '../controls/xrTextControl';
import { TextElementSizeHelper } from '../helpers/_textElementSizeHelper';
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
export declare class FitTextToBoundsAction {
    _control: XRTextControlSurfaceBase<ElementViewModel>;
    textElementHelper: TextElementSizeHelper;
    private _getTextSide;
    private _calculateFont;
    private _getAvailableFont;
    fit(): void;
    constructor(_control: XRTextControlSurfaceBase<ElementViewModel>, textElementHelper?: TextElementSizeHelper);
}
