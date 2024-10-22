﻿/**
* DevExpress HTML/JS Reporting (viewer\search\_dxSearchEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import 'devextreme/ui/text_box';
import { _dxtInherit } from '@devexpress/analytics-core/analytics-internal';
export declare class dxSearchEditor extends _dxtInherit {
    _$button: JQuery;
    _$buttonIcon: JQuery;
    _$buttons: any[];
    _searchModel: any;
    _activeStateUnit: any;
    _focusRequestRaised: any;
    _koContext: any;
    getComponentName(): string;
    ctor(element: any, options: any): void;
    findNext(searchUp: boolean): boolean;
    _init(): void;
    _render(): void;
    _renderButton(direction: string): void;
    _attachButtonEvents(direction: string): void;
}
