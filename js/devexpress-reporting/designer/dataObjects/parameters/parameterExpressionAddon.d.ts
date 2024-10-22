﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameterExpressionAddon.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import { Parameter } from './parameter';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
export declare class ParameterExpressionAddOn extends Disposable {
    private _editor;
    private _parameter;
    constructor(_editor: Editor, _parameter: ko.Observable<Parameter>);
    switchEditors(): void;
    isExpression: ko.Computed<boolean>;
    imageTemplateName: string;
}
