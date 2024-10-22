﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_textElementSizeHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class TextElementSizeHelper {
    private _spaceSymbol;
    private _$createElement;
    $createTextElement(text: string, options: Object): JQuery<HTMLElement>;
    $createSpaceElement(options: Object): JQuery<HTMLElement>;
    getTextContainerSize(text: any, options: any, increaseHeight?: number): {
        width: number;
        height: number;
    };
}
