﻿/**
* DevExpress HTML/JS Reporting (designer\internal\scripting\_eventdropdowneditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import 'devextreme/ui/select_box';
import { _dxtInherit } from '@devexpress/analytics-core/analytics-internal';
export declare class dxEventDropDownEditor extends _dxtInherit {
    getComponentName(): string;
    ctor(): void;
    _getDefaultOptions(): any;
    _init(): void;
    _initSecondAction(): void;
    _render(): void;
    _renderDropDownButton(): void;
    _createEllipsisButton(): any;
    _attachEllipsisButtonClickHandler(): void;
    _optionChanged(args: any): void;
}
