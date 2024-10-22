﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_chartUtils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRChartSurface } from '../xrChart';
import { IChartDesignerOptions } from '../../../chart/_initializer';
import * as ko from 'knockout';
export declare var createChartDesignerOptions: (designerModel: any, dataSourceHelper: any, model: any, parameters: any, chartValueBindingProvider: any) => {
    dispose: () => void;
    options: IChartDesignerOptions;
    visible: ko.Observable<boolean>;
    buttons: {
        toolbar: string;
        location: string;
        widget: string;
        options: {
            text: any;
            onClick: () => void;
        };
    }[];
    run: (chartSurface: XRChartSurface) => void;
    container: (element: HTMLElement) => JQuery<HTMLElement>;
};
