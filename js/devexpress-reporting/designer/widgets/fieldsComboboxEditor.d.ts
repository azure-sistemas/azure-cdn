﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\fieldsComboboxEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDisplayNameProvider } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { FieldListEditor } from '@devexpress/analytics-core/analytics-widgets';
export declare class FieldsComboboxEditor extends FieldListEditor {
    private _createItem;
    private _updateValues;
    wrapValues(displayNameProvider: ko.Observable<IDisplayNameProvider>): any;
    wrappedValues: any;
}
