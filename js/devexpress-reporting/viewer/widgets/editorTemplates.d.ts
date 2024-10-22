﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\editorTemplates.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ParametersGroupEditor } from './_groupEditor';
export declare var viewerEditorTemplates: {
    multiValue: {
        header: string;
        extendedOptions: {
            onMultiTagPreparing: (args: any) => void;
        };
    };
    groupEditor: {
        header: string;
        custom: string;
        content: string;
        editorType: typeof ParametersGroupEditor;
    };
    rangeEditor: {
        header: string;
    };
    multiValueEditable: {
        custom: string;
    };
    selectBox: {
        header: string;
    };
};
