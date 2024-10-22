﻿/**
* DevExpress HTML/JS Reporting (common\imageSource.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class ImageSource {
    sourceType: string;
    data: string;
    constructor(sourceType: string, data: string);
    getDataUrl(): string;
    static parse(val: string): ImageSource;
    static toString(val: ImageSource): string;
}
