﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\formatStringEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
export declare class FormatStringEditor extends Editor {
    readonly actions: import("@devexpress/analytics-core/analytics-widgets").IFormatStringEditorActions;
    readonly customPatterns: (newVal?: {
        [key: string]: string[];
    }) => {
        [key: string]: string[];
    };
}
