﻿/**
* DevExpress HTML/JS Reporting (designer\localization\localizationService.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
interface ITranslationResult {
    name: string;
    texts: string[];
}
declare class TranslationFactory {
    private _services;
    getFirstRegistered(): string;
    getTranslations(texts: string[], destinationLanguage: string): JQuery.Deferred<ITranslationResult[], any, any>;
    translate(name: string, texts: string[], destinationLanguage: string): JQuery.Promise<ITranslationResult, any, any>;
    register(name: string, service: ITranslationService): void;
    unregister(name: string): void;
}
export declare var _translationFactory: TranslationFactory;
export interface ITranslationService {
    onRequest: (texts: string[], destinationLanguage: string) => JQueryAjaxSettings;
    onResponse: (result: any) => string[];
}
export declare function registerTranslationService(name: string, service: ITranslationService): void;
export declare function unregisterTranslationService(name: string): void;
export {};
