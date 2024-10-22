﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\pages\colorSchemePage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ColorScheme, CustomColorScheme } from '../internal/colorSchemaPageUtils';
import { IColorSchemeState } from '../reportWizardState';
import * as ko from 'knockout';
import { WizardPageBase, PageFactory } from '@devexpress/analytics-core/analytics-wizard';
export declare class ChooseReportColorSchemePage extends WizardPageBase {
    constructor();
    addColorScheme(name: string, color: string, position?: number): void;
    removeColorScheme(...names: string[]): void;
    removeAllColorSchemes(): void;
    setCustomColor(color: string): void;
    _applyScheme(data: ColorScheme): void;
    canFinish(): boolean;
    _scheme: ko.Observable<ColorScheme>;
    _customColorScheme: CustomColorScheme;
    _lookupData: {
        scheme: ColorScheme[];
    };
    initialize(state: IColorSchemeState): JQuery.Promise<any, any, any>;
    commit(): JQuery.Promise<any, any, any>;
}
export declare function _applyColorSchemeState(data: IColorSchemeState, state: IColorSchemeState): void;
export declare function _registerChooseReportColorSchemePage(factory: PageFactory): void;
