﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\linesEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export declare class LinesEditor extends Editor {
    collapsed: ko.Observable<boolean>;
    protected _shouldSkipHighlighting(propertyName: string): boolean;
}
