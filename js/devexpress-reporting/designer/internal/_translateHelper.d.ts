﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_translateHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
export declare class TranslateHelper extends Disposable {
    private _maxInterval;
    private _restoreDictionary;
    private _timeouts;
    private _getElement;
    dispose(): void;
    move(elementClassName: string, sign?: string, transform?: string, transition?: string): void;
    reset(elementClassName: string): void;
}
