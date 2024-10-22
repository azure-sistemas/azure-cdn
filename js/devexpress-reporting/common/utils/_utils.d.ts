﻿/**
* DevExpress HTML/JS Reporting (common\utils\_utils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IDisposable } from '@devexpress/analytics-core/analytics-utils';
export declare var cultureInfo: {};
export declare var generateGuid: () => string;
export declare function createFullscreenComputed(element: Element, parent: IDisposable): ko.Computed<boolean>;
export declare function processZoomFactor(accessibilityCompliant: any): void;
export declare function transformNewLineCharacters(value: string): string;
