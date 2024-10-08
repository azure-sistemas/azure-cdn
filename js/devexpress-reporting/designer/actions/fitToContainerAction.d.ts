﻿/**
* DevExpress HTML/JS Reporting (designer\actions\fitToContainerAction.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SurfaceElementBase, ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
export declare class FitToContainerAction {
    private _control;
    private _container;
    constructor(_control: ko.Observable<SurfaceElementBase<ElementViewModel>>);
    doAction(): void;
    allowed(): boolean;
    visible(): boolean;
}
