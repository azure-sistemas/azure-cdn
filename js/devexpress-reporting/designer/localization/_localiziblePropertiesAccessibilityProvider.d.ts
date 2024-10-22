﻿/**
* DevExpress HTML/JS Reporting (designer\localization\_localiziblePropertiesAccessibilityProvider.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PropertiesAccessibilityProvider } from '@devexpress/analytics-core/analytics-internal';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
export declare class LocaliziblePropertiesAccessibilityProvider extends PropertiesAccessibilityProvider {
    private isDefaultLanguage;
    constructor(isDefaultLanguage: ko.Computed<boolean>);
    isPropertyVisible(editor: Editor): any;
    _hasLocalizedParent(parent: Editor): any;
}
