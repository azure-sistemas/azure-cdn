var oLoadPanel = null;
var oGridParametros = null;
var oGridParametrosContainer = null;
var oChkDestacaPedidosObsNF = null;
var oTxtQtPedidosDestacadosObsNF = null;
var oChkDestacaVendedoresObsNF = null;
var oChkEmailVendaUsaTLS = null;
var oTxtEmailVendaEndereco = null;
var oTxtEmailVendaSenha = null;
var oTxtEmailVendaServidorSMTP = null;
var oTxtEmailVendaPortaSMTP = null;

var oUFNFeDataSource = null;
var oAmbienteNFeDataSource = [{
    "CD_AMBIENTE": "1",
    "DS_AMBIENTE": "1 - Produção",
},
{
    "CD_AMBIENTE": "2",
    "DS_AMBIENTE": "2 - Homologação",
}
];
var oGridParametrosDataSource = null;

var FocusedFilial = null;

$(document).ready(function () {
    oLoadPanel = $("#loadPanel").dxLoadPanel({
        shadingColor: "rgba(0,0,0,0.4)",
        message: "Carregando...",
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        hideOnOutsideClick: false,
    }).dxLoadPanel("instance");

    oLoadPanel.show();

    oGridParametrosContainer = $("#gridParametros");

    carregaParametros();
});

$(window).bind("load", function () {
    oLoadPanel.hide();
});

function exibeMensagem(pTipo, pTitulo, pTexto) {
    var configuration = { title: pTitulo, text: pTexto, type: pTipo }

    if (pTipo == "error") {
        configuration.addclass = "stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
    }
    else if (pTipo == "info") {
        configuration.addclass = "notification-warning stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
    }

    new PNotify(configuration);
};

function carregaParametros() {
    oLoadPanel.show();

    $.ajax({
        type: "POST",
        url: "/CadastrosGerais/CarregaEstados",
        success: function (responseData) {
            if (typeof responseData == "string") {
                exibeMensagem("error", "Erro ao consultar os estados cadastrados no sistema", responseData);
            } else {
                oUFNFeDataSource = responseData;

                $.ajax({
                    type: "POST",
                    url: "/NotaFiscal/CarregaParametrosNotaFiscal",
                    success: function (responseData) {
                        oLoadPanel.hide();

                        if (typeof responseData == "string") {
                            exibeMensagem("error", "Erro ao consultar os parâmetros de nota fiscal", responseData);
                        } else {
                            oGridParametrosDataSource = responseData;

                            oGridParametros = oGridParametrosContainer.dxDataGrid({
                                keyExpr: "CD_FILIAL",
                                dataSource: oGridParametrosDataSource,
                                hoverStateEnabled: true,
                                showBorders: true,
                                showRowLines: true,
                                focusedRowEnabled: true,
                                focusedRowKey: FocusedFilial,
                                allowColumnReordering: true,
                                allowColumnResizing: true,
                                wordWrapEnabled: true,
                                rowAlternationEnabled: true,
                                columnAutoWidth: true,
                                columnChooser: {
                                    enabled: true
                                },
                                headerFilter: {
                                    visible: true,
                                    allowSearch: true
                                },
                                filterPanel: {
                                    visible: true
                                },
                                filterRow: {
                                    visible: true,
                                    applyFilter: "auto"
                                },
                                searchPanel: {
                                    visible: true,
                                    placeholder: "Procurar...",
                                    highlightCaseSensitive: false,
                                    highlightSearchText: true
                                },
                                groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                                columnHidingEnabled: true,
                                grouping: {
                                    contextMenuEnabled: true
                                },
                                pager: {
                                    allowedPageSizes: [10, 25, 50, 100],
                                    showPageSizeSelector: true,
                                    showNavigationButtons: true
                                },
                                paging: {
                                    pageSize: 10
                                },
                                sorting: {
                                    mode: "multiple"
                                },
                                selection: {
                                    mode: "single"
                                },
                                export: {
                                    enabled: true,
                                },
                                onExporting: function (e) {
                                    var workbook = new ExcelJS.Workbook();
                                    var worksheet = workbook.addWorksheet("Parâmetros");

                                    DevExpress.excelExporter.exportDataGrid({
                                        component: e.component,
                                        worksheet: worksheet,
                                        autoFilterEnabled: true
                                    }).then(function () {
                                        workbook.xlsx.writeBuffer().then(function (buffer) {
                                            saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Parametros_Nota_Fiscal.xlsx");
                                        });
                                    });
                                    e.cancel = true;
                                },
                                columns: [
                                    {
                                        caption: "Filial",
                                        dataField: "CD_FILIAL",
                                        width: 80,
                                        hidingPriority: 90,
                                        alignment: "center",
                                        allowEditing: false,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: true,
                                        allowHiding: false
                                    },
                                    {
                                        caption: "Versão NF-e",
                                        dataField: "DS_CONFIG_VERSAO",
                                        alignment: "center",
                                        hidingPriority: 20,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: true,
                                        allowHiding: true
                                    },
                                    {
                                        caption: "Ambiente NF-e",
                                        dataField: "DS_CONFIG_AMBIENTE",
                                        alignment: "left",
                                        hidingPriority: 19,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: true,
                                        allowHiding: true,
                                        lookup: {
                                            dataSource: oAmbienteNFeDataSource,
                                            valueExpr: "CD_AMBIENTE",
                                            displayExpr: "DS_AMBIENTE"
                                        }
                                    },
                                    {
                                        caption: "UF NF-e",
                                        dataField: "DS_CONFIG_UF",
                                        alignment: "center",
                                        hidingPriority: 18,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: true,
                                        allowHiding: true,
                                        lookup: {
                                            dataSource: oUFNFeDataSource,
                                            valueExpr: "Cd_UF_IBGE",
                                            displayExpr: "Cd_UF"
                                        }
                                    },
                                    {
                                        caption: "Caminho aplicativo gerador DANFE",
                                        dataField: "DS_CAMINHO_APLICATIVO_GERACAO_DANFE",
                                        alignment: "left",
                                        hidingPriority: 17,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: true,
                                        allowHiding: true
                                    },
                                    {
                                        caption: "Caminho arquivo XML geração DANFE",
                                        dataField: "DS_CAMINHO_ARQUIVO_XML_GERACAO_DANFE",
                                        alignment: "left",
                                        hidingPriority: 16,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: true,
                                        allowHiding: true
                                    },
                                    {
                                        caption: "Utiliza texto explicativo para produto",
                                        dataField: "DS_UTILIZA_TEXTO_EXPLICATIVO_PRODUTO",
                                        alignment: "center",
                                        hidingPriority: 15,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: false,
                                        allowHiding: true,
                                    },
                                    {
                                        dataField: "LG_UTILIZA_TEXTO_EXPLICATIVO_PRODUTO",
                                        visible: false,
                                        showInColumnChooser: false,
                                    },
                                    {
                                        caption: "Utiliza observação do produto no pedido",
                                        dataField: "DS_UTILIZA_OBS_PRODUTO_PEDIDO",
                                        alignment: "center",
                                        hidingPriority: 14,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: false,
                                        allowHiding: true,
                                    },
                                    {
                                        dataField: "LG_UTILIZA_OBS_PRODUTO_PEDIDO",
                                        visible: false,
                                        showInColumnChooser: false,
                                    },
                                    {
                                        caption: "Destaca nos dados complementares do item o lote do produto informado no pedido de venda",
                                        dataField: "DS_UTILIZA_LOTE_PRODUTO_PEDIDO",
                                        alignment: "center",
                                        hidingPriority: 13,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: false,
                                        allowHiding: true,
                                    },
                                    {
                                        dataField: "LG_UTILIZA_LOTE_PRODUTO_PEDIDO",
                                        visible: false,
                                        showInColumnChooser: false,
                                    },
                                    {
                                        caption: "Imprimir PDF automaticamente",
                                        dataField: "DS_IMPRIMIR_PDF_AUTOMATICAMENTE",
                                        alignment: "center",
                                        hidingPriority: 12,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: false,
                                        allowHiding: true,
                                    },
                                    {
                                        dataField: "LG_IMPRIMIR_PDF_AUTOMATICAMENTE",
                                        visible: false,
                                        showInColumnChooser: false,
                                    },
                                    {
                                        caption: "Emitir NFe somente pelo servidor do integrador",
                                        dataField: "DS_FORCA_PROCESSAMENTO_NFE_ASSINCRONO",
                                        alignment: "center",
                                        hidingPriority: 11,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: false,
                                        allowHiding: true,
                                    },
                                    {
                                        dataField: "LG_FORCA_PROCESSAMENTO_NFE_ASSINCRONO",
                                        visible: false,
                                        showInColumnChooser: false,
                                    },
                                    {
                                        caption: "Inibir o endereço de entrega nos dados adicionais da nota fiscal",
                                        dataField: "DS_INIBE_LOCAL_ENTREGA_NFE",
                                        alignment: "center",
                                        hidingPriority: 10,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: false,
                                        allowHiding: true,
                                    },
                                    {
                                        dataField: "LG_INIBE_LOCAL_ENTREGA_NFE",
                                        visible: false,
                                        showInColumnChooser: false,
                                    },
                                    {
                                        caption: "Destacar na observação da nota os pedidos relacionados",
                                        dataField: "DS_DESTACA_PEDIDOS_OBS_NF",
                                        alignment: "center",
                                        hidingPriority: 9,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: false,
                                        allowHiding: true,
                                    },
                                    {
                                        dataField: "LG_DESTACA_PEDIDOS_OBS_NF",
                                        visible: false,
                                        showInColumnChooser: false,
                                    },
                                    {
                                        caption: "Quantidade Máxima de Pedidos",
                                        dataField: "QT_PEDIDOS_DESTACADOS_OBS_NF",
                                        alignment: "center",
                                        hidingPriority: 8,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: false,
                                        allowHiding: true
                                    },
                                    {
                                        caption: "Destacar na observação da nota os vendedores dos pedidos relacionados",
                                        dataField: "DS_DESTACA_VENDEDORES_OBS_NF",
                                        alignment: "center",
                                        hidingPriority: 7,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: false,
                                        allowHiding: true,
                                    },
                                    {
                                        dataField: "LG_DESTACA_VENDEDORES_OBS_NF",
                                        visible: false,
                                        showInColumnChooser: false,
                                    },
                                    {
                                        caption: "Forçar envio do código CEST do produto para todas as situações tributárias",
                                        dataField: "DS_FORCAR_ENVIO_CEST_PRODUTO",
                                        alignment: "center",
                                        hidingPriority: 6,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: false,
                                        allowHiding: true,
                                    },
                                    {
                                        dataField: "LG_FORCAR_ENVIO_CEST_PRODUTO",
                                        visible: false,
                                        showInColumnChooser: false,
                                    },
                                    {
                                        caption: "Servidor SMTP",
                                        dataField: "DS_EMAIL_VENDA_SERVIDOR_SMTP",
                                        alignment: "left",
                                        hidingPriority: 5,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: false,
                                        allowHiding: true
                                    },
                                    {
                                        caption: "Porta",
                                        dataField: "DS_EMAIL_VENDA_PORTA_SMTP",
                                        alignment: "left",
                                        hidingPriority: 4,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: false,
                                        allowHiding: true
                                    },
                                    {
                                        caption: "SSL/TLS",
                                        dataField: "DS_EMAIL_VENDA_USA_TLS",
                                        alignment: "center",
                                        hidingPriority: 3,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: false,
                                        allowHiding: true,
                                    },
                                    {
                                        dataField: "LG_EMAIL_VENDA_USA_TLS",
                                        visible: false,
                                        showInColumnChooser: false,
                                    },
                                    {
                                        caption: "Endereço",
                                        dataField: "DS_EMAIL_VENDA_ENDERECO",
                                        alignment: "left",
                                        hidingPriority: 2,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: false,
                                        allowHiding: true
                                    },
                                    {
                                        caption: "Senha",
                                        dataField: "DS_EMAIL_VENDA_SENHA",
                                        alignment: "left",
                                        hidingPriority: 1,
                                        allowEditing: true,
                                        allowSorting: true,
                                        allowHeaderFiltering: true,
                                        allowFiltering: true,
                                        cssClass: "column-data-grid",
                                        visible: false,
                                        allowHiding: true
                                    },
                                ],
                                editing: {
                                    mode: "popup",
                                    allowAdding: false,
                                    allowUpdating: true,
                                    allowDeleting: false,
                                    selectTextOnEditStart: true,
                                    useIcons: true,
                                    popup: {
                                        showTitle: true,
                                        maxWidth: 600,
                                        height: 690,
                                    },
                                    form: {
                                        labelMode: "floating",
                                        items: [
                                            {
                                                itemType: "group",
                                                colCount: 2,
                                                colSpan: 2,
                                                items: [
                                                    {
                                                        itemType: "group",
                                                        colCount: 3,
                                                        items: [
                                                            {
                                                                dataField: "CD_FILIAL",
                                                                colSpan: 2,
                                                                editorOptions: {
                                                                    disabled: true,
                                                                },
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        dataField: "DS_CONFIG_VERSAO",
                                                        editorOptions: { maxLength: 20 },
                                                        validationRules: [{
                                                            type: "required",
                                                            message: "Campo obrigatório",
                                                        }],
                                                    },
                                                    {
                                                        dataField: "DS_CONFIG_AMBIENTE",
                                                        validationRules: [{
                                                            type: "required",
                                                            message: "Campo obrigatório",
                                                        }],
                                                    },
                                                    {
                                                        dataField: "DS_CONFIG_UF",
                                                        validationRules: [{
                                                            type: "required",
                                                            message: "Campo obrigatório",
                                                        }],
                                                    },
                                                    {
                                                        dataField: "LG_UTILIZA_TEXTO_EXPLICATIVO_PRODUTO",
                                                        colSpan: 1,
                                                        label: {
                                                            visible: false,
                                                        },
                                                        editorOptions: {
                                                            text: "Utiliza texto explicativo para produto",
                                                        },
                                                    },
                                                    {
                                                        dataField: "LG_UTILIZA_OBS_PRODUTO_PEDIDO",
                                                        colSpan: 1,
                                                        label: {
                                                            visible: false,
                                                        },
                                                        editorOptions: {
                                                            text: "Utiliza observação do produto no pedido",
                                                        },
                                                    },
                                                    {
                                                        dataField: "LG_UTILIZA_LOTE_PRODUTO_PEDIDO",
                                                        colSpan: 2,
                                                        label: {
                                                            visible: false,
                                                        },
                                                        editorOptions: {
                                                            text: "Destaca nos dados complementares do item o lote do produto informado no pedido de venda",
                                                        },
                                                    },
                                                    {
                                                        dataField: "LG_IMPRIMIR_PDF_AUTOMATICAMENTE",
                                                        colSpan: 1,
                                                        label: {
                                                            visible: false,
                                                        },
                                                        editorOptions: {
                                                            text: "Imprimir PDF automaticamente",
                                                        },
                                                    },
                                                    {
                                                        dataField: "LG_FORCA_PROCESSAMENTO_NFE_ASSINCRONO",
                                                        colSpan: 1,
                                                        label: {
                                                            visible: false,
                                                        },
                                                        editorOptions: {
                                                            text: "Emitir NFe somente pelo servidor do integrador",
                                                        },
                                                    },
                                                    {
                                                        dataField: "LG_INIBE_LOCAL_ENTREGA_NFE",
                                                        colSpan: 2,
                                                        label: {
                                                            visible: false,
                                                        },
                                                        editorOptions: {
                                                            text: "Inibir o endereço de entrega nos dados adicionais da nota fiscal",
                                                        },
                                                    },
                                                    {
                                                        dataField: "LG_FORCAR_ENVIO_CEST_PRODUTO",
                                                        colSpan: 2,
                                                        label: {
                                                            visible: false,
                                                        },
                                                        editorOptions: {
                                                            text: "Forçar envio do código CEST do produto para todas as situações tributárias",
                                                        },
                                                    },
                                                    {
                                                        dataField: "LG_DESTACA_PEDIDOS_OBS_NF",
                                                        colSpan: 2,
                                                        label: {
                                                            visible: false,
                                                        },
                                                        editorOptions: {
                                                            text: "Destacar na observação da nota os pedidos relacionados",
                                                            onContentReady(e) {
                                                                oChkDestacaPedidosObsNF = e.component;
                                                            },
                                                        },
                                                    },
                                                    {
                                                        itemType: "group",
                                                        colCount: 10,
                                                        colSpan: 2,
                                                        items: [
                                                            {
                                                                dataField: "QT_PEDIDOS_DESTACADOS_OBS_NF",
                                                                colSpan: 5,
                                                                editorOptions: {
                                                                    maxLength: 4,
                                                                    min: 1,
                                                                    max: 9999,
                                                                    maskRules: /[0-9]/,
                                                                    format: "####",
                                                                    elementAttr: { class: "tabbedItem" },
                                                                    onContentReady(e) {
                                                                        oTxtQtPedidosDestacadosObsNF = e.component;
                                                                    },
                                                                },
                                                                validationRules: [
                                                                    {
                                                                        type: "required",
                                                                        message: "Campo obrigatório",
                                                                    },
                                                                    {
                                                                        type: "numeric",
                                                                        message: "Este campo aceita apenas números",
                                                                    }
                                                                ],
                                                            },
                                                        ]
                                                    },
                                                    {
                                                        dataField: "LG_DESTACA_VENDEDORES_OBS_NF",
                                                        colSpan: 2,
                                                        label: {
                                                            visible: false,
                                                        },
                                                        editorOptions: {
                                                            text: "Destacar na observação da nota os vendedores dos pedidos relacionados",
                                                            elementAttr: { class: "tabbedItem" },
                                                            onContentReady(e) {
                                                                oChkDestacaVendedoresObsNF = e.component;
                                                            },
                                                        },
                                                    },
                                                    {
                                                        dataField: "DS_CAMINHO_APLICATIVO_GERACAO_DANFE",
                                                        colSpan: 2,
                                                        editorOptions: { maxLength: 200 },
                                                        validationRules: [{
                                                            type: "required",
                                                            message: "Campo obrigatório",
                                                        }],
                                                    },
                                                    {
                                                        dataField: "DS_CAMINHO_ARQUIVO_XML_GERACAO_DANFE",
                                                        colSpan: 2,
                                                        editorOptions: { maxLength: 200 },
                                                        validationRules: [{
                                                            type: "required",
                                                            message: "Campo obrigatório",
                                                        }],
                                                    },
                                                ]
                                            },
                                            {
                                                itemType: "empty",
                                                colSpan: 2,
                                            },
                                            {
                                                
                                                itemType: "group",
                                                colSpan: 2,
                                                template: function (data, itemElement) {
                                                    $("<div class='mt-0 mb-0 pl-1 pr-1' style='background: #f8f9fa; border: 1px solid rgba(227, 227, 227);'><div class='mt-0 mb-0 pl-0 pr-2 pt-2 pb-2'><h5 class='font-weight-semibold mb-0 mt-1 ml-1'>CONFIGURAÇÃO DE E-MAIL</h5><h6 class='mb-0 mt-0 ml-1'>Este e-mail será usado para envio de notas fiscal, pedidos de venda e boletos emitidos na filial</h6></div></div>").appendTo(itemElement);
                                                }
                                            },
                                            {
                                                itemType: "group",
                                                colCount: 4,
                                                colSpan: 2,
                                                items: [
                                                    {
                                                        dataField: "DS_EMAIL_VENDA_SERVIDOR_SMTP",
                                                        colSpan: 2,
                                                        editorOptions: {
                                                            maxLength: 400,
                                                            onContentReady(e) {
                                                                oTxtEmailVendaServidorSMTP = e.component;
                                                            },
                                                        },
                                                    },
                                                    {
                                                        dataField: "DS_EMAIL_VENDA_PORTA_SMTP",
                                                        editorOptions: {
                                                            maxLength: 400,
                                                            onContentReady(e) {
                                                                oTxtEmailVendaPortaSMTP = e.component;
                                                            },
                                                        },
                                                    },
                                                    {
                                                        dataField: "LG_EMAIL_VENDA_USA_TLS",
                                                        label: {
                                                            visible: false,
                                                        },
                                                        editorOptions: {
                                                            text: "SSL/TLS",
                                                            onContentReady(e) {
                                                                oChkEmailVendaUsaTLS = e.component;
                                                            },
                                                        },
                                                    },
                                                    {
                                                        dataField: "DS_EMAIL_VENDA_ENDERECO",
                                                        colSpan: 2,
                                                        editorOptions: {
                                                            maxLength: 400,
                                                            onContentReady(e) {
                                                                oTxtEmailVendaEndereco = e.component;
                                                            },
                                                        },
                                                    },
                                                    {
                                                        dataField: "DS_EMAIL_VENDA_SENHA",
                                                        colSpan: 2,
                                                        editorOptions: {
                                                            maxLength: 400,
                                                            mode: 'password',
                                                            buttons: [{
                                                                name: 'password',
                                                                location: 'after',
                                                                options: {
                                                                    icon: '/img/visualizar-senha.png',
                                                                    type: 'default',
                                                                    onClick() {
                                                                        oTxtEmailVendaSenha.option('mode', oTxtEmailVendaSenha.option('mode') === 'text' ? 'password' : 'text');
                                                                    },
                                                                },
                                                            }],
                                                            onContentReady(e) {
                                                                oTxtEmailVendaSenha = e.component;
                                                            },
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                itemType: "group",
                                                colCount: 6,
                                                colSpan: 2,
                                                items: [
                                                    {
                                                        itemType: "button",
                                                        colSpan: 6,
                                                        buttonOptions: {
                                                            text: "Testar Configurações",
                                                            type: "success",
                                                            onClick: function () {
                                                                var result = validaCamposEmail(true);

                                                                if (result == true) {
                                                                    oLoadPanel.show();

                                                                    var vParametrosEnvioEmailTeste = JSON.stringify({
                                                                        DS_EMAIL_VENDA_SERVIDOR_SMTP: oTxtEmailVendaServidorSMTP.option("value"),
                                                                        DS_EMAIL_VENDA_PORTA_SMTP: oTxtEmailVendaPortaSMTP.option("value"),
                                                                        LG_EMAIL_VENDA_USA_TLS: oChkEmailVendaUsaTLS.option("value"),
                                                                        DS_EMAIL_VENDA_ENDERECO: oTxtEmailVendaEndereco.option("value"),
                                                                        DS_EMAIL_VENDA_SENHA: oTxtEmailVendaSenha.option("value")
                                                                    });

                                                                    $.ajax({
                                                                        type: "POST",
                                                                        url: "/NotaFiscal/TestaConfiguracaoEmail",
                                                                        data: { pParametrosEnvioEmail: vParametrosEnvioEmailTeste },
                                                                        success: function (responseData) {
                                                                            oLoadPanel.hide();

                                                                            if (responseData.result == "error") {
                                                                                exibeMensagem("error", "Erro ao enviar o e-mail de teste", responseData.msg);
                                                                            } else {
                                                                                exibeMensagem("success", "Teste enviado com sucesso!", "Verifique a caixa de entrada do seu e-mail.");
                                                                            }
                                                                        },
                                                                        fail: function (responseData) {
                                                                            oLoadPanel.hide();

                                                                            exibeMensagem("error", "Erro ao enviar o e-mail de teste", responseData.msg);
                                                                        }
                                                                    });
                                                                } else {
                                                                    DevExpress.ui.notify({
                                                                        message: "Por favor, verifique o preenchimento dos campos obrigatórios.",
                                                                        type: "error",
                                                                        displayTime: 5000
                                                                    });
                                                                };
                                                            }
                                                        }
                                                    },
                                                ]
                                            },
                                        ],
                                    },
                                },
                                onOptionChanged: function (e) {
                                    if (e && e.name === "editing" && e.fullName === "editing.changes") {
                                        if (e.value[0] && e.value[0].data.LG_DESTACA_PEDIDOS_OBS_NF != undefined) {
                                            oTxtQtPedidosDestacadosObsNF.option("disabled", !e.value[0].data.LG_DESTACA_PEDIDOS_OBS_NF);
                                            oChkDestacaVendedoresObsNF.option("disabled", !e.value[0].data.LG_DESTACA_PEDIDOS_OBS_NF);

                                            if (e.value[0].data.LG_DESTACA_PEDIDOS_OBS_NF == false) {
                                                oTxtQtPedidosDestacadosObsNF.option("value", "");
                                                oChkDestacaVendedoresObsNF.option("value", false);
                                            }
                                        }
                                    }
                                },
                                onToolbarPreparing: function (e) {
                                    var dataGrid = e.component;

                                    e.toolbarOptions.items.unshift(
                                        {
                                            location: "after",
                                            widget: "dxButton",
                                            locateInMenu: "auto",
                                            showText: "inMenu",
                                            options: {
                                                hint: "Diminuir tamanho da fonte",
                                                icon: "/img/FontSizeDiminuir.svg",
                                                text: "Diminuir tamanho da fonte",
                                                onClick: function () {
                                                    var size = oGridParametrosContainer.css("font-size").split("px")[0];
                                                    oGridParametrosContainer.css("font-size", --size + "px")
                                                }
                                            }
                                        },
                                        {
                                            location: "after",
                                            widget: "dxButton",
                                            locateInMenu: "auto",
                                            showText: "inMenu",
                                            options: {
                                                hint: "Aumentar tamanho da fonte",
                                                icon: "/img/FontSizeAumentar.svg",
                                                text: "Aumentar tamanho da fonte",
                                                onClick: function () {
                                                    var size = oGridParametrosContainer.css("font-size").split("px")[0];
                                                    oGridParametrosContainer.css("font-size", ++size + "px")
                                                }
                                            }
                                        },
                                        {
                                            location: "after",
                                            widget: "dxButton",
                                            locateInMenu: "auto",
                                            options: {
                                                hint: "Restaurar layout original do grid",
                                                icon: "deletetable",
                                                onClick: function () {
                                                    var result = DevExpress.ui.dialog.confirm("Deseja restaurar layout original do grid?", "Restaurar");
                                                    result.done(function (dialogResult) {
                                                        if (dialogResult) {
                                                            oGridParametros.state({});
                                                            oGridParametros.refresh();

                                                            oGridParametrosContainer.dxDataGrid("instance").updateDimensions();
                                                        }
                                                    });
                                                }
                                            }
                                        },
                                    );
                                },
                                onFocusedRowChanged: function (e) {
                                    if (e.row != "") {
                                        FocusedFilial = e.component.option("focusedRowKey")
                                    } else {
                                        FocusedFilial = null;
                                    }
                                },
                                onEditorPreparing: function (e) {
                                    if (e.parentType === "dataRow" && e.dataField === "QT_PEDIDOS_DESTACADOS_OBS_NF") {
                                        e.editorOptions.disabled = !e.row.data.LG_DESTACA_PEDIDOS_OBS_NF;
                                    }
                                    else if (e.parentType === "dataRow" && e.dataField === "LG_DESTACA_VENDEDORES_OBS_NF") {
                                        e.editorOptions.disabled = !e.row.data.LG_DESTACA_PEDIDOS_OBS_NF;
                                    }
                                },
                                onSaving: function (e) {
                                    if (e.changes.length > 0) {
                                        var result = validaCamposEmail(false);

                                        if (result == true) {
                                            oLoadPanel.show();

                                            var entries = null;
                                            var vParametrosEnvioEmailGravacao = {};
                                            var vParametrosNotaFiscalGravacao = e.changes[0].data;
                                            var vFilialGravacao = e.changes[0].key;

                                            //VERIFICA SE HOUVE ALTERAÇÃO NO SERVIDOR SMTP DO E-MAIL
                                            if (e.changes[0].data.DS_EMAIL_VENDA_SERVIDOR_SMTP != undefined) {
                                                vParametrosEnvioEmailGravacao.DS_EMAIL_VENDA_SERVIDOR_SMTP = e.changes[0].data.DS_EMAIL_VENDA_SERVIDOR_SMTP;
                                            }

                                            //VERIFICA SE HOUVE ALTERAÇÃO NA PORTA SMTP DO E-MAIL
                                            if (e.changes[0].data.DS_EMAIL_VENDA_PORTA_SMTP != undefined) {
                                                vParametrosEnvioEmailGravacao.DS_EMAIL_VENDA_PORTA_SMTP = e.changes[0].data.DS_EMAIL_VENDA_PORTA_SMTP;
                                            }

                                            //VERIFICA SE HOUVE ALTERAÇÃO NO FLAG TLS DO E-MAIL
                                            if (e.changes[0].data.LG_EMAIL_VENDA_USA_TLS != undefined) {
                                                vParametrosEnvioEmailGravacao.LG_EMAIL_VENDA_USA_TLS = e.changes[0].data.LG_EMAIL_VENDA_USA_TLS;
                                            }

                                            //VERIFICA SE HOUVE ALTERAÇÃO NO ENDEREÇO DO E-MAIL
                                            if (e.changes[0].data.DS_EMAIL_VENDA_ENDERECO != undefined) {
                                                vParametrosEnvioEmailGravacao.DS_EMAIL_VENDA_ENDERECO = e.changes[0].data.DS_EMAIL_VENDA_ENDERECO;
                                            }

                                            //VERIFICA SE HOUVE ALTERAÇÃO NA SENHA DO E-MAIL
                                            if (e.changes[0].data.DS_EMAIL_VENDA_SENHA != undefined) {
                                                vParametrosEnvioEmailGravacao.DS_EMAIL_VENDA_SENHA = e.changes[0].data.DS_EMAIL_VENDA_SENHA;
                                            }

                                            //PEGA AS ENTRADAS DA ARRAY COM OS DADOS ALTERADOS
                                            entries = Object.entries(vParametrosNotaFiscalGravacao)
                                            //MONTA UMA NOVA ARRAY COM A ESTRUTURA PARA ENVIO DOS DADOS ALTERADOS PARA GRAVAÇÃO DOS PARÂMETROS DE NOTA FISCAL
                                            vParametrosNotaFiscalGravacao = entries.map(([key, val] = entry) => {
                                                return { id: key, value: val, isKey: false };
                                            });
                                            //FILTRA A ARRAY PARA NÃO ENVIAR O ITEM CHAMADO "ParametroNotaFiscalEmailVenda" POIS ESTE SERÁ ENVIADO EM OUTRA ARRAY
                                            vParametrosNotaFiscalGravacao = vParametrosNotaFiscalGravacao.filter(function (item) {
                                                switch (item.id) {
                                                    case "DS_EMAIL_VENDA_SERVIDOR_SMTP":
                                                    case "DS_EMAIL_VENDA_PORTA_SMTP":
                                                    case "LG_EMAIL_VENDA_USA_TLS":
                                                    case "DS_EMAIL_VENDA_ENDERECO":
                                                    case "DS_EMAIL_VENDA_SENHA":
                                                        {
                                                            return false;    
                                                            break;
                                                        }
                                                        default:
                                                        {
                                                            return true;    
                                                            break;
                                                        }
                                                }

                                                //return item.id != "ParametroNotaFiscalEmailVenda";
                                            });
                                            //VERIFICA SE APÓS REMOVER O ITEM CHAMADO "PARAMETRONOTAFISCALEMAILVENDA" RESTOU ALGUM OUTRO ITEM NA ARRAY
                                            if (vParametrosNotaFiscalGravacao.length > 0) {
                                                //TRANSFORMA A ARRAY EM TEXTO JSON PARA ENVIO DOS DADOS A SEREM ALTERADOS
                                                vParametrosNotaFiscalGravacao = JSON.stringify(vParametrosNotaFiscalGravacao);
                                            }
                                            else {
                                                vParametrosNotaFiscalGravacao = null;
                                            }

                                            if (vParametrosEnvioEmailGravacao) {
                                                //PEGA AS ENTRADAS DA ARRAY COM OS DADOS ALTERADOS
                                                entries = Object.entries(vParametrosEnvioEmailGravacao)
                                                //MONTA UMA NOVA ARRAY COM A ESTRUTURA PARA ENVIO DOS DADOS ALTERADOS PARA GRAVAÇÃO DOS PARÂMETROS DE ENVIO DE EMAIL
                                                vParametrosEnvioEmailGravacao = entries.map(([key, val] = entry) => {
                                                    return { id: key, value: val, isKey: false };
                                                });
                                                //TRANSFORMA A ARRAY EM TEXTO JSON PARA ENVIO DOS DADOS A SEREM ALTERADOS
                                                vParametrosEnvioEmailGravacao = JSON.stringify(vParametrosEnvioEmailGravacao);
                                            }

                                            $.ajax({
                                                type: "POST",
                                                url: "/NotaFiscal/SalvaParametrosNotaFiscal",
                                                data: { pParametrosNotaFiscal: vParametrosNotaFiscalGravacao, pParametrosEnvioEmail: vParametrosEnvioEmailGravacao, pFilial: vFilialGravacao },
                                                success: function (responseData) {
                                                    oLoadPanel.hide();

                                                    if (responseData.result == "error") {
                                                        exibeMensagem("error", "Erro ao salvar os parâmetros de nota fiscal", responseData.msg);

                                                        e.cancel = true;
                                                    } else {
                                                        oGridParametrosDataSource = responseData.dataSource;

                                                        oGridParametros.option("dataSource", oGridParametrosDataSource);

                                                        exibeMensagem("success", "Operação realizada!", "Registro salvo com sucesso");
                                                    }
                                                },
                                                error: function (responseData) {
                                                    oLoadPanel.hide();

                                                    exibeMensagem("error", "Erro ao salvar os parâmetros de nota fiscal", "Ocorreu um erro na solicitação de gravação dos parâmetros da nota fiscal");

                                                    e.cancel = true;
                                                },
                                                failure: function (responseData) {
                                                    oLoadPanel.hide();

                                                    exibeMensagem("error", "Erro ao salvar os parâmetros de nota fiscal", responseData.msg);

                                                    e.cancel = true;
                                                }
                                            });
                                        }
                                        else {
                                            e.cancel = true;
                                        }
                                    }
                                },
                                stateStoring: AutoLoad("gridParametros"),
                            }).dxDataGrid("instance");

                            oGridParametrosContainer.css("font", "11px verdana");
                        }
                    },
                    fail: function (responseData) {
                        oLoadPanel.hide();

                        exibeMensagem("error", "Erro ao consultar os parâmetros de nota fiscal", responseData);
                    }
                });
            }
        },
        fail: function (responseData) {
            oLoadPanel.hide();

            exibeMensagem("error", "Erro ao consultar os estados cadastrados no sistema", responseData);
        }
    });
};

//function dataTreatment(pData) {
//    pData.newData.DS_UTILIZA_TEXTO_EXPLICATIVO_PRODUTO = pData.oldData.LG_UTILIZA_TEXTO_EXPLICATIVO_PRODUTO == true ? "Sim" : null;
//    pData.newData.DS_UTILIZA_OBS_PRODUTO_PEDIDO = pData.oldData.LG_UTILIZA_OBS_PRODUTO_PEDIDO == true ? "Sim" : null;
//    pData.newData.DS_INIBE_LOCAL_ENTREGA_NFE = pData.oldData.LG_INIBE_LOCAL_ENTREGA_NFE == true ? "Sim" : null;
//    pData.newData.DS_FORCA_PROCESSAMENTO_NFE_ASSINCRONO = pData.oldData.LG_FORCA_PROCESSAMENTO_NFE_ASSINCRONO == true ? "Sim" : null;
//    pData.newData.DS_IMPRIMIR_PDF_AUTOMATICAMENTE = pData.oldData.LG_IMPRIMIR_PDF_AUTOMATICAMENTE == true ? "Sim" : null;
//    pData.newData.DS_UTILIZA_LOTE_PRODUTO_PEDIDO = pData.oldData.LG_UTILIZA_LOTE_PRODUTO_PEDIDO == true ? "Sim" : null;
//    pData.newData.DS_DESTACA_PEDIDOS_OBS_NF = pData.oldData.LG_DESTACA_PEDIDOS_OBS_NF == true ? "Sim" : null;
//    pData.newData.DS_DESTACA_VENDEDORES_OBS_NF = pData.oldData.LG_DESTACA_VENDEDORES_OBS_NF == true ? "Sim" : null;
//    pData.newData.DS_FORCAR_ENVIO_CEST_PRODUTO = pData.oldData.LG_FORCAR_ENVIO_CEST_PRODUTO == true ? "Sim" : null;

//    return pData;
//}

function validaCamposEmail(pForcaValidacaoCompleta) {
    var result = true;

    oTxtEmailVendaServidorSMTP.option({ validationStatus: "valid", validationErrors: [{ message: "" }] });
    oTxtEmailVendaPortaSMTP.option({ validationStatus: "valid", validationErrors: [{ message: "" }] });
    oTxtEmailVendaEndereco.option({ validationStatus: "valid", validationErrors: [{ message: "" }] });
    oTxtEmailVendaSenha.option({ validationStatus: "valid", validationErrors: [{ message: "" }] });

    if (pForcaValidacaoCompleta == false &&
        oTxtEmailVendaServidorSMTP.option("value").length == 0 &&
        oTxtEmailVendaPortaSMTP.option("value").length == 0 &&
        oTxtEmailVendaEndereco.option("value").length == 0 && 
        oTxtEmailVendaSenha.option("value").length == 0) {
        return true;
    }

    if (oTxtEmailVendaServidorSMTP.option("value").toString().length == 0) {
        oTxtEmailVendaServidorSMTP.option({ validationStatus: "invalid", validationErrors: [{ message: "Campo obrigatório" }] });

        result = false;
    }

    if (oTxtEmailVendaPortaSMTP.option("value").toString().length == 0) {
        oTxtEmailVendaPortaSMTP.option({ validationStatus: "invalid", validationErrors: [{ message: "Campo obrigatório" }] });

        result = false;
    }

    if (oTxtEmailVendaEndereco.option("value").toString().length == 0) {
        oTxtEmailVendaEndereco.option({ validationStatus: "invalid", validationErrors: [{ message: "Campo obrigatório" }] });

        result = false;
    }

    if (oTxtEmailVendaSenha.option("value").toString().length == 0) {
        oTxtEmailVendaSenha.option({ validationStatus: "invalid", validationErrors: [{ message: "Campo obrigatório" }] });

        result = false;
    }

    return result;
}