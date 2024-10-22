﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\colorSchemaPageUtils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare class ColorScheme {
    _isCustom: boolean;
    constructor(name: string, localizationId: string, baseColor: string);
    name: string;
    localizationId: string;
    baseColor: string;
    color: string | ko.Observable<string> | ko.Computed<string>;
    displayName: string;
    selected: ko.Observable<boolean> | ko.Computed<boolean>;
}
export declare class CustomColorScheme extends ColorScheme {
    applyColor(): void;
    resetColor(): void;
    constructor(name: string, localizationId: string, baseColor: string);
    editorColor: ko.Observable<string> | ko.Computed<string>;
    color: ko.Observable<string> | ko.Computed<string>;
    popoverVisible: ko.Observable<boolean> | ko.Computed<boolean>;
}
