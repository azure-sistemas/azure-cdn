﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_reportDesignerControlsHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DesignControlsHelper } from './_designControlsHelper';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IDesignControlsHelper, IDisplayedObject } from '@devexpress/analytics-core/analytics-internal';
export declare class ReportDesignerControlsHelper extends Disposable implements IDesignControlsHelper {
    constructor(helper: ko.Computed<DesignControlsHelper>);
    getControls: (target: any) => ko.ObservableArray<IDisplayedObject>;
    allControls: any;
    getControlByName: (name: string) => IDisplayedObject;
}
