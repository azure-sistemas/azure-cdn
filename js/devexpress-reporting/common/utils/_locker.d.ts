/**
* DevExpress HTML/JS Reporting (common\utils\_locker.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class Locker {
    constructor();
    lock: (action: () => void) => void;
    isUpdate: boolean;
}
