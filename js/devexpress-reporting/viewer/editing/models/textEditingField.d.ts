﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\textEditingField.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IEditingFieldViewModel, EditingField, IBounds } from '../editingField';
import * as ko from 'knockout';
import 'jquery-ui/ui/focusable';
export declare class TextEditingFieldViewModelBase {
    keypressAction(data: any, event: any): void;
    hideEditor: (shouldCommit: boolean) => void;
}
export declare class TextEditingFieldViewModel extends TextEditingFieldViewModelBase implements IEditingFieldViewModel {
    constructor(field: EditingField, pageWidth: number, pageHeight: number, zoom: ko.Observable<number> | ko.Computed<number>, bounds: IBounds);
    dispose?: () => void;
    template: string;
    editorTemplate: string;
    field: EditingField;
    data: any;
    textStyle: () => {};
    containerStyle: () => {};
    breakOffsetStyle: () => {};
    borderStyle: () => {};
    zoom: ko.Observable<number> | ko.Computed<number>;
    htmlValue: () => string;
    wordWrap: boolean;
    active: ko.Observable<boolean>;
    activateEditor(viewModel: any, e: any): void;
}
