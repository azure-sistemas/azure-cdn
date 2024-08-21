﻿/**
* DevExpress HTML/JS Reporting (scopes\reporting-designer-internal.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("../designer/actions/_alignmentHandler");
require("../designer/actions/_dataSourceActions");
require("../designer/actions/_jsonDataSourceEditor");
require("../designer/actions/_objectDataSourceEditor");
require("../designer/actions/_spaceCommandHandler");
require("../designer/actions/_sqlDataSourceEditor");
require("../designer/controls/utils/_bindings");
require("../designer/controls/utils/_charactercombHelper");
require("../designer/controls/utils/_chartDataFilterModelReport");
require("../designer/controls/utils/_chartFieldListExtender");
require("../designer/controls/utils/_chartUtils");
require("../designer/controls/utils/_initUtils");
require("../designer/controls/utils/_localizationUtils");
require("../designer/controls/utils/_metaUtils");
require("../designer/controls/utils/_subreportUtils");
require("../designer/controls/utils/_tableCalculationProvider");
require("../designer/controls/utils/_tableComponentSurface");
require("../designer/controls/utils/_tocUtils");
require("../designer/controls/_xrTodoControl");
require("../designer/dataObjects/expressions/_expressionWrapper");
require("../designer/dataObjects/expressions/_wrappedExpressionOptions");
require("../designer/helpers/_dataSourceHelper");
require("../designer/helpers/_designControlsHelper");
require("../designer/helpers/_reportDesignerControlsHelper");
require("../designer/helpers/_styleHelper");
require("../designer/helpers/_textElementSizeHelper");
require("../designer/internal/_bandLevelEditor");
require("../designer/internal/_controlScrollingTool");
require("../designer/internal/_createIDataMemberInfoByName");
require("../designer/internal/errorPanel/_types");
require("../designer/internal/errorPanel/_designerErrorProvider");
require("../designer/internal/errorPanel/_runtimeErrorProvider");
require("../designer/internal/errorPanel/_errorPanelViewModel");
require("../designer/internal/dragdrop/_fieldListDragDropHandler");
require("../designer/internal/dragdrop/_fieldListDragDropHelper");
require("../designer/internal/dragdrop/_reportControlsDragDropHelper");
require("../designer/internal/dragdrop/_reportExplorerDragDropHandler");
require("../designer/internal/dragdrop/_reportSnapLinesCollector");
require("../designer/internal/dragdrop/_reportToolboxDragDropHandler");
require("../designer/internal/dragdrop/_selectionDragDropHandler");
require("../designer/internal/dragdrop/_utils");
require("../designer/internal/fieldlist/_calculatedFieldsSource");
require("../designer/internal/fieldlist/_dataSourceItemsExtender");
require("../designer/internal/fieldlist/_fieldListController");
require("../designer/internal/fieldlist/_fieldListDataSourcesHelper");
require("../designer/internal/fieldlist/_parametersViewModel");
require("../designer/internal/fieldlist/_renameDataSourceStrategy");
require("../designer/internal/reportExplorer/_reportExplorer");
require("../designer/internal/reportExplorer/_reportItemsProvider");
require("../designer/internal/scripting/_eventArgsTypes");
require("../designer/internal/scripting/_eventdropdowneditor");
require("../designer/internal/scripting/_languageHelper");
require("../designer/internal/scripting/_reportCompleter");
require("../designer/internal/scripting/_reportDummyCreator");
require("../designer/internal/scripting/_scriptsEditor");
require("../designer/internal/serialization/_serializer");
require("../designer/internal/_autoScrolling");
require("../designer/internal/_coordinateGrid");
require("../designer/internal/_copyPasteStrategy");
require("../designer/internal/_customMergingEngine");
require("../designer/internal/_dataUtils");
require("../designer/internal/_getDataSourceDataMember");
require("../designer/internal/_dataBindingMode");
require("../designer/internal/_defaultCrossTabControl");
require("../designer/internal/_displayNameBindings");
require("../designer/internal/_displayNameProvider");
require("../designer/internal/_expressionableFontModel");
require("../designer/internal/_initializer");
require("../designer/internal/_localizationStringId");
require("../designer/internal/_reportConverter");
require("../designer/internal/_baseConverter");
require("../designer/internal/_crossTabConverter");
require("../designer/internal/_ruler");
require("../designer/internal/_settings");
require("../designer/internal/_translateHelper");
require("../designer/internal/_utils");
require("../designer/internal/_designerEditorAddOn");
require("../designer/internal/_createObjectFromInfo");
require("../designer/internal/_addVariablesToExpressionEditor");
require("../designer/internal/_watermarkBinding");
require("../designer/internal/_wizardRunner");
require("../designer/localization/_localization");
require("../designer/localization/_localizationEditor");
require("../designer/localization/_localiziblePropertiesAccessibilityProvider");
require("../designer/services/_controlConverterService");
require("../designer/services/_formatStringService");
require("../designer/services/_reportDataSourceService");
require("../designer/services/_reportPreviewService");
require("../designer/services/_reportRenderingService");
require("../designer/services/_reportScriptService");
require("../designer/services/_reportWizardService");
require("../designer/tools/generator/_inititalizer");
require("../designer/tools/generator/_reportMenuSettings");
require("../designer/tools/generator/_qBRequestWrapper");
require("../designer/tools/generator/_settings");
require("../designer/utils/_registerControls");
require("../designer/wizard/internal/_commonRequestModel");
require("../designer/wizard/internal/_labelWizardUtils");
require("../designer/wizard/internal/_legacyReportRequestModel");
require("../designer/wizard/internal/_masterDetailRequestModel");
require("../designer/wizard/internal/_crossTabRequestModel");
require("../designer/wizard/internal/_crossTabDragUtils");
require("../designer/wizard/internal/_masterDetailWizardUtils");
require("../designer/wizard/internal/_pageSetupUtils");
require("../designer/wizard/internal/_reportWizardStateHelper");
require("../designer/wizard/internal/_summaryOptionsPageUtils");
require("../designer/wizard/internal/_utils");
require("../designer/wizard/pages/dataSourceWizard/_dataSourceWizardHelper");
require("../designer/wizard/pages/_selectLabelTypePage");
require("../designer/wizard/_utils");
require("../designer/wizard/_reportWizardCreating");
require("../dx-designer-templates");
__export(require("../designer/actions/_alignmentHandler"));
__export(require("../designer/actions/_dataSourceActions"));
__export(require("../designer/actions/_jsonDataSourceEditor"));
__export(require("../designer/actions/_objectDataSourceEditor"));
__export(require("../designer/actions/_spaceCommandHandler"));
__export(require("../designer/actions/_sqlDataSourceEditor"));
__export(require("../designer/controls/utils/_charactercombHelper"));
__export(require("../designer/controls/utils/_chartDataFilterModelReport"));
__export(require("../designer/controls/utils/_chartFieldListExtender"));
__export(require("../designer/controls/utils/_chartUtils"));
__export(require("../designer/controls/utils/_initUtils"));
__export(require("../designer/controls/utils/_localizationUtils"));
__export(require("../designer/controls/utils/_metaUtils"));
__export(require("../designer/controls/utils/_subreportUtils"));
__export(require("../designer/controls/utils/_tableCalculationProvider"));
__export(require("../designer/controls/utils/_tableComponentSurface"));
__export(require("../designer/controls/utils/_tocUtils"));
__export(require("../designer/controls/_xrTodoControl"));
__export(require("../designer/dataObjects/expressions/_expressionWrapper"));
__export(require("../designer/dataObjects/expressions/_wrappedExpressionOptions"));
__export(require("../designer/helpers/_dataSourceHelper"));
__export(require("../designer/helpers/_designControlsHelper"));
__export(require("../designer/helpers/_reportDesignerControlsHelper"));
__export(require("../designer/helpers/_styleHelper"));
__export(require("../designer/helpers/_textElementSizeHelper"));
__export(require("../designer/internal/_bandLevelEditor"));
__export(require("../designer/internal/_controlScrollingTool"));
__export(require("../designer/internal/_createIDataMemberInfoByName"));
__export(require("../designer/internal/errorPanel/_types"));
__export(require("../designer/internal/errorPanel/_designerErrorProvider"));
__export(require("../designer/internal/errorPanel/_runtimeErrorProvider"));
__export(require("../designer/internal/errorPanel/_errorPanelViewModel"));
__export(require("../designer/internal/dragdrop/_fieldListDragDropHandler"));
__export(require("../designer/internal/dragdrop/_fieldListDragDropHelper"));
__export(require("../designer/internal/dragdrop/_reportControlsDragDropHelper"));
__export(require("../designer/internal/dragdrop/_reportExplorerDragDropHandler"));
__export(require("../designer/internal/dragdrop/_reportSnapLinesCollector"));
__export(require("../designer/internal/dragdrop/_reportToolboxDragDropHandler"));
__export(require("../designer/internal/dragdrop/_selectionDragDropHandler"));
__export(require("../designer/internal/dragdrop/_utils"));
__export(require("../designer/internal/fieldlist/_calculatedFieldsSource"));
__export(require("../designer/internal/fieldlist/_dataSourceItemsExtender"));
__export(require("../designer/internal/fieldlist/_fieldListController"));
__export(require("../designer/internal/fieldlist/_fieldListDataSourcesHelper"));
__export(require("../designer/internal/fieldlist/_parametersViewModel"));
__export(require("../designer/internal/fieldlist/_renameDataSourceStrategy"));
__export(require("../designer/internal/reportExplorer/_reportExplorer"));
__export(require("../designer/internal/reportExplorer/_reportItemsProvider"));
__export(require("../designer/internal/scripting/_eventArgsTypes"));
__export(require("../designer/internal/scripting/_eventdropdowneditor"));
__export(require("../designer/internal/scripting/_languageHelper"));
__export(require("../designer/internal/scripting/_reportDummyCreator"));
__export(require("../designer/internal/scripting/_reportCompleter"));
__export(require("../designer/internal/scripting/_scriptsEditor"));
__export(require("../designer/internal/serialization/_serializer"));
__export(require("../designer/internal/_coordinateGrid"));
__export(require("../designer/internal/_copyPasteStrategy"));
__export(require("../designer/internal/_customMergingEngine"));
__export(require("../designer/internal/_dataUtils"));
__export(require("../designer/internal/_getDataSourceDataMember"));
__export(require("../designer/internal/_dataBindingMode"));
__export(require("../designer/internal/_defaultCrossTabControl"));
__export(require("../designer/internal/_displayNameProvider"));
__export(require("../designer/internal/_expressionableFontModel"));
__export(require("../designer/internal/_initializer"));
__export(require("../designer/internal/_localizationStringId"));
__export(require("../designer/internal/_reportConverter"));
__export(require("../designer/internal/_baseConverter"));
__export(require("../designer/internal/_crossTabConverter"));
__export(require("../designer/internal/_ruler"));
__export(require("../designer/internal/_settings"));
__export(require("../designer/internal/_translateHelper"));
__export(require("../designer/internal/_utils"));
__export(require("../designer/internal/_designerEditorAddOn"));
__export(require("../designer/internal/_createObjectFromInfo"));
__export(require("../designer/internal/_addVariablesToExpressionEditor"));
__export(require("../designer/internal/_wizardRunner"));
__export(require("../designer/localization/_localization"));
__export(require("../designer/localization/_localizationEditor"));
__export(require("../designer/localization/_localiziblePropertiesAccessibilityProvider"));
__export(require("../designer/services/_controlConverterService"));
__export(require("../designer/services/_formatStringService"));
__export(require("../designer/services/_reportDataSourceService"));
__export(require("../designer/services/_reportPreviewService"));
__export(require("../designer/services/_reportRenderingService"));
__export(require("../designer/services/_reportScriptService"));
__export(require("../designer/services/_reportWizardService"));
__export(require("../designer/tools/generator/_inititalizer"));
__export(require("../designer/tools/generator/_reportMenuSettings"));
__export(require("../designer/tools/generator/_qBRequestWrapper"));
__export(require("../designer/tools/generator/_settings"));
__export(require("../designer/utils/_registerControls"));
__export(require("../designer/wizard/internal/_commonRequestModel"));
__export(require("../designer/wizard/internal/_labelWizardUtils"));
__export(require("../designer/wizard/internal/_legacyReportRequestModel"));
__export(require("../designer/wizard/internal/_masterDetailRequestModel"));
__export(require("../designer/wizard/internal/_crossTabRequestModel"));
__export(require("../designer/wizard/internal/_crossTabDragUtils"));
__export(require("../designer/wizard/internal/_masterDetailWizardUtils"));
__export(require("../designer/wizard/internal/_pageSetupUtils"));
__export(require("../designer/wizard/internal/_reportWizardStateHelper"));
__export(require("../designer/wizard/internal/_summaryOptionsPageUtils"));
__export(require("../designer/wizard/internal/_utils"));
__export(require("../designer/wizard/pages/dataSourceWizard/_dataSourceWizardHelper"));
__export(require("../designer/wizard/pages/_selectLabelTypePage"));
__export(require("../designer/wizard/_utils"));
__export(require("../designer/wizard/_reportWizardCreating"));
