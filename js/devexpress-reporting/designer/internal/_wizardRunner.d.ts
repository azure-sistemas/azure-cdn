﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_wizardRunner.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CommandRunType } from '../wizard/wizardTypes';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
export declare class WizardRunner extends Disposable {
    private _menuOptions;
    dispose(): void;
    private _currentWizard;
    private _wizards;
    constructor(_menuOptions: {
        visible: ko.Subscribable<boolean>;
        collapsed: ko.Subscribable<boolean>;
    });
    registerCommand(wizardType: CommandRunType, start: () => void, close: () => void): void;
    run(command: CommandRunType): void;
    closeWizard(): void;
}
