﻿/**
* DevExpress HTML/JS Reporting (designer\tools\generator\_reportMenuSettings.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { MenuSettings } from '@devexpress/analytics-core/analytics-internal';
import * as ko from 'knockout';
export declare class ReportMenuSettings extends MenuSettings {
    appMenuVisible: ko.Observable<boolean>;
    dispose(): void;
    _$menuElement: JQuery;
    setMenuElement($element: any): void;
    toggleAppMenu: any;
    constructor();
    _toggleAppMenu(): void;
    generate(): {};
    isMenuCollapsed: ko.Observable<boolean>;
}
