﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\propertyGridEditors.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import './editorTemplates';
import { ISerializationInfo, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ObjectProperties, PropertyGridEditor, FieldListEditor } from '@devexpress/analytics-core/analytics-widgets';
export declare class ContentByTypeEditor extends PropertyGridEditor {
    createObjectProperties(): ObjectProperties;
    getViewModel(): ko.Computed<any>;
}
export declare class DataBindingsEditor extends PropertyGridEditor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    createObjectProperties(): ObjectProperties;
}
export declare class DataBindingEditor extends FieldListEditor {
    readonly actions: import("@devexpress/analytics-core/analytics-widgets").IFormatStringEditorActions;
    readonly customPatterns: (newVal?: {
        [key: string]: string[];
    }) => {
        [key: string]: string[];
    };
}
export declare class FontEditorUndo extends PropertyGridEditor {
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    generateValue(undoEngine: ko.Observable<UndoEngine>): any;
    createObjectProperties(): ObjectProperties;
    undoEngine: ko.Observable<UndoEngine>;
}
