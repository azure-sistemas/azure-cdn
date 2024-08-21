var oLoadPanel = null;
var oBtnEtapasProcessamentoVoltar = null;
var oLblAcoesAdicionaisProcessamento = null;
var oLblTituloResumoProcessamento = null;
var oLglNFProcessamento = null;
var oTxtJustificativa = null;
var oTxtJustificativaContainer = null;
var oChkCienciaForaPrazo = null;
var oChkCienciaBoletoRelacionado = null;
var oChkCienciaEntregaRelacionada = null;
var oChkCancelarFaturamento = null;
var oChkCancelarPedido = null;
var oNbxHorasFiltro = null;
var oTgxPedidosFiltro = null;
var oLkpProdutoFiltro = null;
var oGridNotasFiscaisCancelamento = null;
var oGridNotasFiscaisCancelamentoContainer = null;
var oGridNotasFiscaisCancelamentoLegenda = null;
var oGridBoletosRelacionados = null;
var oGridEntregasRelacionadas = null;
var oGridEtapasProcessamento = null;
var oTxtSenhaCertificado = null;
var oTxtSenhaCertificadoContainer = null;
var oTxtSenhaCertificadoConfirmacao = null;
var oTxtSenhaCertificadoConfirmacaoContainer = null;
var oFileUploader = null;
var oUploadProgress = null;
var oFileManager = null;
var arrayLookup = [];
var customSelection = false;
var dsNotasFiscaisCancelamentoLegenda = [
    {
        DS_LEGENDA_1: "",
        DS_TITULO_LEGENDA_1: "Emitida",
        DS_COR_LEGENDA_1: "#47A447",

        DS_LEGENDA_2: "",
        DS_TITULO_LEGENDA_2: "Rejeitada",
        DS_COR_LEGENDA_2: "#0088CC",

        DS_LEGENDA_3: "",
        DS_TITULO_LEGENDA_3: "Denegada",
        DS_COR_LEGENDA_3: "#ED9C28",

        DS_LEGENDA_4: "",
        DS_TITULO_LEGENDA_4: "Outras",
        DS_COR_LEGENDA_4: "#736f72",

        DS_LEGENDA_5: "",
        DS_TITULO_LEGENDA_5: "Cancelada",
        DS_COR_LEGENDA_5: "#D2322D",
    },
];
var dsEtapasProcessamento = [];
var vTxtJustificativaValidationRules = { validationRules: [{ type: "stringLength", min: 15, message: "A justificativa deve ter no mínimo 15 caracteres", }], validationGroup: "Justificativa" };
var vTxtSenhaCertificadoValidationRules = { validationRules: [{ type: "required", message: "Senha Obrigatória", }], validationGroup: "SenhaCertificado" };
var vTxtSenhaCertificadoConfirmacaoValidationRules = { validationRules: [{ type: "required", message: "Confirmação da Senha Obrigatória", }], validationGroup: "SenhaCertificado" };
var vEmptyValidationRules = { validationRules: [{ type: "stringLength", min: 0, message: "", }] };
var vUltimosPedidosFiltro;
var vNFProcessamento = {
    CD_FILIAL: null,
    NR_CONTROLE: null,
    NR_NOTA_FISCAL: null,
    CD_ORIGEM_CONFECCAO: null,
    CD_NATUREZA_OPERACAO: null,
    CD_SITUACAO_NF: null,
    LG_FORA_PRAZO_CANCELAMENTO: null,
    LG_POSSUI_BOLETO: null,
    LG_POSSUI_PROGRAMACAO_ENTREGA: null,
    LG_MOVIMENTO_POSSUI_OUTRAS_NOTAS: null,
    LG_POSSUI_FATURAMENTO_ATIVO: null,
    LG_NATUREZA_OPERACAO_MOVIMENTA_ESTOQUE: null,
    LG_NATUREZA_OPERACAO_GERA_FINANCEIRO: null
};
var vDadosFilial = {
    CD_FILIAL: null,
    DS_RAZAO_SOCIAL: null,
    CD_CNPJ: null,
    LG_POSSUI_CERTIFICADO: null,
    LG_POSSUI_SENHA_CERTIFICADO: null,
    DT_VENCIMENTO_CERTIFICADO: null,
    QT_DIAS_VENCIMENTO_CERTIFICADO: null
};
var vQtEtapasProcessamento = 0;
var vNrEtapaProcessamento = null;
var vErroEtapaProcessamento = false;
var oPermissoesUsuario = null;
var oLkpUsuarioConfiguracoes = null;
var oChkDownloadArquivoXMLCancelamento = null;
var oChkCancelaNotaFiscal = null;

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

    oBtnEtapasProcessamentoVoltar = document.getElementById("btnEtapasProcessamentoVoltar")

    oLblAcoesAdicionaisProcessamento = document.getElementById("lblAcoesAdicionaisProcessamento");

    oLblTituloResumoProcessamento = document.getElementById("lblTituloResumoProcessamento");

    oLglNFProcessamento = document.getElementById("lglNFProcessamento");

    oTxtJustificativaContainer = $("#txtJustificativa");

    oTxtJustificativa = oTxtJustificativaContainer.dxTextArea({
        labelMode: "floating",
        label: "Informe a Justificativa *",
        height: 150,
        maxLength: 5000,
    }).dxTextArea("instance");

    oChkCienciaForaPrazo = $("#chkCienciaForaPrazo").dxCheckBox({
        value: false,
        text: "Tenho ciência de que estou sujeito às penalidade previstas na legislação vigente para cancelamento de notas fiscais emitidas a mais de 24 horas",
        elementAttr: {
            class: "class-checkbox-bold"
        },
        onValueChanged: function (e) {
            if (e.value == true) {
                exibirEsconderPaineis("btnAceitarCancelamentoForaPrazo", "block");
            } else {
                exibirEsconderPaineis("btnAceitarCancelamentoForaPrazo", "none");
            };
        },
    }).dxCheckBox("instance");

    oChkCienciaBoletoRelacionado = $("#chkCienciaBoletoRelacionado").dxCheckBox({
        value: false,
        text: "Confirmo o cancelamento da Nota Fiscal mesmo existindo boletos de cobrança relacionados",
        elementAttr: {
            class: "class-checkbox-bold"
        },
        onValueChanged: function (e) {
            if (e.value == true) {
                exibirEsconderPaineis("btnAceitarCancelamentoBoletoRelacionado", "block");
            } else {
                exibirEsconderPaineis("btnAceitarCancelamentoBoletoRelacionado", "none");
            };
        },
    }).dxCheckBox("instance");

    oChkCienciaEntregaRelacionada = $("#chkCienciaEntregaRelacionada").dxCheckBox({
        value: false,
        text: "Confirmo o cancelamento da Nota Fiscal mesmo existindo entregas pendentes",
        elementAttr: {
            class: "class-checkbox-bold"
        },
        onValueChanged: function (e) {
            if (e.value == true) {
                exibirEsconderPaineis("btnAceitarCancelamentoEntregaRelacionada", "block");
            } else {
                exibirEsconderPaineis("btnAceitarCancelamentoEntregaRelacionada", "none");
            };
        },
    }).dxCheckBox("instance");

    oChkCancelarFaturamento = $("#chkCancelarFaturamento").dxCheckBox({
        value: false,
        readOnly: false,
        text: "Cancelar Faturamento e títulos no Contas a Receber",
        onValueChanged: function (e) {
            if (e.value == true) {
                oChkCancelarPedido.option("readOnly", false);
            } else {
                oChkCancelarPedido.option("value", false);
                oChkCancelarPedido.option("readOnly", true);
            };
        },
    }).dxCheckBox("instance");

    oChkCancelarPedido = $("#chkCancelarPedido").dxCheckBox({
        value: false,
        readOnly: true,
        text: "Cancelar Pedido de Venda",
    }).dxCheckBox("instance");

    oNbxHorasFiltro = $("#nbxHorasFiltro").dxNumberBox({
        value: 24,
        format: "###,### horas",
        showClearButton: true,
        showSpinButtons: true,
        readOnly: false,
        step: 24,
        min: 24,
        max: 1440,
        labelMode: "floating",
        label: "Emitidas nas últimas",
        buttons: [{
            name: "OK",
            location: "after",
            options: {
                text: "Aplicar",
                stylingMode: "text",
                width: 60,
                elementAttr: {
                    class: "botao-aplicar-number-box",
                },
                onClick(e) {
                    carregaNotasFiscais();
                },
            },
        }, "clear", "spins"],
    }).dxNumberBox("instance");

    oTgxPedidosFiltro = $("#tgxPedidosFiltro").dxTagBox({
        acceptCustomValue: true,
        displayExpr: "Number",
        valueExpr: "Id",
        labelMode: "floating",
        label: "Digite o pedido e tecle <Enter>",
        placeholder: "Digite o pedido e tecle <Enter>",
        showClearButton: true,
        openOnFieldClick: false,
        onFocusIn: function (e) {
            vUltimosPedidosFiltro = oTgxPedidosFiltro.option("value").toString();
        },
        onFocusOut: function (e) {
            if (vUltimosPedidosFiltro != oTgxPedidosFiltro.option("value").toString()) {
                vUltimosPedidosFiltro = "";

                carregaNotasFiscais();
            }
        },
        onCustomItemCreating(args) {
            if (!args.text) {
                args.customItem = null;
                return;
            }

            args.text = args.text.replace(",", "");
            args.text = args.text.replace(".", "");

            if (isNaN(parseFloat(args.text))) {
                args.customItem = null;
                return;
            }

            let number = parseFloat(args.text);

            if (number < 0) {
                args.customItem = null;
                return;
            }

            const { component } = args;

            const currentItems = component.option("items");

            const newValue = { Id: number, Number: number };
            currentItems.unshift(newValue);

            component.option("items", currentItems);
            args.customItem = newValue;
        },
        onValueChanged: function (e) {
            if (e.value.toString() == "") {
                vUltimosPedidosFiltro = "";

                carregaNotasFiscais();
            }
        }
    }).dxTagBox("instance");

    oGridNotasFiscaisCancelamentoLegenda = $("#gridNotasFiscaisCancelamentoLegenda").dxDataGrid({
        dataSource: dsNotasFiscaisCancelamentoLegenda,
        showBorders: false,
        cellHintEnabled: false,
        wordWrapEnabled: false,
        showColumnHeaders: false,
        showRowLines: false,
        showColumnLines: false,
        rowAlternationEnabled: false,
        allowColumnResizing: false,
        allowColumnReordering: false,
        groupPanel: { visible: false },
        searchPanel: { visible: false },
        pager: {
            visible: false,
            showPageSizeSelector: false,
            showNavigationButtons: false
        },
        columns: [
            {
                dataField: "DS_LEGENDA_1",
                caption: "",
                width: 25,
                allowEditing: false,
                allowSorting: false,
                allowHeaderFiltering: false,
            },
            {
                dataField: "DS_TITULO_LEGENDA_1",
                caption: "",
                width: 68,
                allowEditing: false,
                allowSorting: false,
                allowHeaderFiltering: false,
            },
            {
                dataField: "DS_LEGENDA_2",
                caption: "",
                width: 25,
                allowEditing: false,
                allowSorting: false,
                allowHeaderFiltering: false,
            },
            {
                dataField: "DS_TITULO_LEGENDA_2",
                caption: "",
                width: 68,
                allowEditing: false,
                allowSorting: false,
                allowHeaderFiltering: false,
            },
            {
                dataField: "DS_LEGENDA_3",
                caption: "",
                width: 25,
                allowEditing: false,
                allowSorting: false,
                allowHeaderFiltering: false,
            },
            {
                dataField: "DS_TITULO_LEGENDA_3",
                caption: "",
                width: 68,
                allowEditing: false,
                allowSorting: false,
                allowHeaderFiltering: false,
            },
            {
                dataField: "DS_LEGENDA_4",
                caption: "",
                width: 25,
                allowEditing: false,
                allowSorting: false,
                allowHeaderFiltering: false,
            },
            {
                dataField: "DS_TITULO_LEGENDA_4",
                caption: "",
                width: 68,
                allowEditing: false,
                allowSorting: false,
                allowHeaderFiltering: false,
            },
            {
                dataField: "DS_LEGENDA_5",
                caption: "",
                width: 25,
                allowEditing: false,
                allowSorting: false,
                allowHeaderFiltering: false,
            },
            {
                dataField: "DS_TITULO_LEGENDA_5",
                caption: "",
                //width: 68,
                allowEditing: false,
                allowSorting: false,
                allowHeaderFiltering: false,
            },
        ],
        onCellPrepared: function (e) {
            if (e.rowType === "data") {
                switch (e.column.dataField.toUpperCase())
                {
                    case "DS_LEGENDA_1":
                        e.cellElement.css("background-color", e.data.DS_COR_LEGENDA_1);
                        break;
                    case "DS_LEGENDA_2":
                        e.cellElement.css("background-color", e.data.DS_COR_LEGENDA_2);
                        break;
                    case "DS_LEGENDA_3":
                        e.cellElement.css("background-color", e.data.DS_COR_LEGENDA_3);
                        break;
                    case "DS_LEGENDA_4":
                        e.cellElement.css("background-color", e.data.DS_COR_LEGENDA_4);
                        break;
                    case "DS_LEGENDA_5":
                        e.cellElement.css("background-color", e.data.DS_COR_LEGENDA_5);
                        break;
                };
            }
        },
    }).dxDataGrid("instance");

    oGridNotasFiscaisCancelamentoContainer = $("#gridNotasFiscaisCancelamento");

    oGridNotasFiscaisCancelamento = oGridNotasFiscaisCancelamentoContainer.dxDataGrid({
        keyExpr: ["Cd_Filial", "Nr_Controle", "NFNumero.Nr_Nota_Fiscal", "Cd_Origem_Confeccao", "Cd_Natureza_Operacao", "Cd_Situacao_NF"],
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        allowColumnResizing: true,
        columnsAutoWidth: true,
        cellHintEnabled: true,
        allowColumnReordering: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        sorting: {
            mode: "multiple",
        },
        selection: {
            mode: "multiple",
            allowSelectAll: false,
            showCheckBoxesMode: "always",
            deferred: false,
        },
        groupPanel: {
            visible: true,
            emptyPanelText: "Agrupar",
        },
        pager: {
            visible: true,
            allowedPageSizes: [10, 20, 50],
            showPageSizeSelector: true,
            showNavigationButtons: true
        },
        paging: {
            pageSize: 10,
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet("NF-e");

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Notas_Para_Cancelamento.xlsx");
                });
            });
            e.cancel = true;
        },
        searchPanel: {
            visible: true,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
        },
        filterRow: {
            visible: true,
            applyFilter: "auto",
        },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        filterPanel: {
            visible: true,
        },
        columnChooser: {
            enabled: true,
            allowSearch: true,
            width: 300,
            height: 500,
        },
        columns: [
            {
                type: "selection",
                dataField: "Cd_Selecao",
                width: 30,
                value: false,
                allowHiding: false,
            },
            {
                dataField: "NFNumero.Nr_Nota_Fiscal",
                caption: "NF-e",
                width: 75,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                allowHiding: false,
            },
            {
                dataField: "Ds_Coluna_Cor_Situacao",
                caption: "",
                width: 7,
                allowEditing: false,
                allowSorting: false,
                alignment: "center",
                allowHeaderFiltering: false,
                allowFiltering: false,
                hidingPriority: 210,
            },
            {
                dataField: "Cd_Situacao_NF",
                caption: "Código Situação",
                width: 79,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 100,
            },
            {
                dataField: "Ds_Situacao_NF",
                caption: "Situação",
                width: 91,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 197,
            },
            {
                dataField: "Cd_Filial",
                caption: "Filial",
                width: 71,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 196,

            },
            {
                dataField: "NFNumero.Dt_Impressao",
                caption: "Emissão",
                width: 105,
                dataType: "date",
                format: "dd/MM/yyyy HH:mm",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 195,
            },
            {
                dataField: "Vl_Total_NF",
                caption: "Valor Nota",
                format: "###,###,###,##0.00",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                alignment: "right",
                cssClass: "column-data-grid",
                hidingPriority: 194,
            },
            {
                dataField: "Cd_CPF_CNPJ_Cli",
                caption: "CPF/CNPJ",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 193,
            },
            {
                dataField: "Ds_Razao_Social_Cli",
                caption: "Cliente",
                //width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "left",
                cssClass: "column-data-grid",
                hidingPriority: 192,

            },
            {
                dataField: "Ds_Fora_Prazo_Cancelamento",
                caption: "Prazo Expirado",
                width: 90,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 202,

            },
            {
                dataField: "Ds_Possui_Boleto",
                caption: "Possui Boleto",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 201,
            },
            {
                dataField: "Ds_Possui_Programacao_Entrega",
                caption: "Possui Entrega",
                width: 85,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 200,
            },
            {
                dataField: "Ds_Imagem_Detalhe_NF",
                caption: "Detalhe NF-e",
                width: 47,
                allowEditing: false,
                allowSorting: false,
                allowHeaderFiltering: false,
                allowFiltering: false,
                alignment: "center",
                cellTemplate: $("#gridImagemNota"),
                hidingPriority: 189,
            },
            {
                dataField: "NFNumero.Ds_Ultima_Mensagem_Emissao_NFe",
                caption: "Última Mensagem Emissão",
                //width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: "left",
                cssClass: "column-data-grid",
                hidingPriority: 99,
            },
            {
                dataField: "NFNumero.Ds_Ultima_Mensagem_Canc_Inut_NFe",
                caption: "Última Mensagem Cancelamento Inutilização",
                //width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: "left",
                cssClass: "column-data-grid",
                hidingPriority: 97,
            },
            {
                dataField: "Cd_Login_Cancelamento_Inutilizacao",
                caption: "Login Cancelamento",
                width: 95,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 96,
            },
            {
                dataField: "Dt_Cancelamento_Inutilizacao",
                caption: "Dt. Cancelamento",
                //width: 95,
                dataType: "date",
                format: "dd/MM/yyyy",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 95,
            },
            {
                dataField: "Ds_Justificativa_Cancelamento",
                caption: "Motivo do Cancelamento",
                //width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                cssClass: "column-data-grid",
                hidingPriority: 94,
            },

        ],
        summary: {
            totalItems: [{
                column: "NFNumero.Nr_Nota_Fiscal",
                summaryType: "count",
                displayFormat: "{0} Notas",
            },],
        },
        onSelectionChanged: function (e) {
            if (customSelection) return;

            customSelection = true;
            e.component.selectRows(e.currentSelectedRowKeys[0], false);
            customSelection = false;
        },
        onCellPrepared: function (e) {
            if (e.rowType === "data") {
                var vCellDataField = e.column.dataField == null || e.column.dataField == undefined ? "" : e.column.dataField.toUpperCase();
                var vCellValue = e.value == null || e.value == undefined ? "" : e.value.toString().toUpperCase();

                switch (vCellDataField) {
                    case "DS_COLUNA_COR_SITUACAO":
                        e.cellElement.css("background-color", e.data.Ds_Cor_Situacao);
                        break;
                    case "DS_POSSUI_BOLETO":
                    case "DS_FORA_PRAZO_CANCELAMENTO":
                    case "DS_POSSUI_PROGRAMACAO_ENTREGA":
                        if (vCellValue == "SIM") {
                            e.cellElement.css("color", "#b23a48");
                            e.cellElement.css("background-color", "#fae0e4");
                        }

                        break;
                }
            };
            if (e.rowType === "group") {
                e.cellElement.css("color", "#f05b41");
                e.cellElement.css("background-color", "white");
            };
        },
        onCellClick: function (e) {
            if ((e.column.caption == null ? "" : e.column.caption).toUpperCase() == "DETALHE NF-E") {
                abrirDetalheNF(e.data.Cd_Filial, e.data.Nr_Controle);
            }
        },
        toolbar: {
            items: [
                {
                    location: "after",
                    widget: "dxButton",
                    locateInMenu: "auto",
                    options: {
                        icon: "clearsquare",
                        text: "Cancelar ou Inutilizar",
                        hint: "Cancelar notas fiscais emitidas ou inutilizar numeração de notas rejeitadas",
                        type: "danger",
                        onClick(e) {
                            var dRows = oGridNotasFiscaisCancelamento.getSelectedRowKeys();

                            if (dRows.length > 0) {
                                vNFProcessamento.CD_FILIAL = dRows[0].Cd_Filial;
                                vNFProcessamento.NR_CONTROLE = dRows[0].Nr_Controle;
                                vNFProcessamento.NR_NOTA_FISCAL = dRows[0].NFNumero.Nr_Nota_Fiscal;
                                vNFProcessamento.CD_ORIGEM_CONFECCAO = dRows[0].Cd_Origem_Confeccao;
                                vNFProcessamento.CD_NATUREZA_OPERACAO = dRows[0].Cd_Natureza_Operacao;
                                vNFProcessamento.CD_SITUACAO_NF = dRows[0].Cd_Situacao_NF;

                                validaCertificadoFilial();
                            }
                        },
                    },
                },
                {
                    name: "groupPanel",
                    locateInMenu: "auto",
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
                                    oGridNotasFiscaisCancelamento.state({});
                                    oGridNotasFiscaisCancelamento.refresh();

                                    oGridNotasFiscaisCancelamentoContainer.dxDataGrid("instance").updateDimensions();
                                }
                            });
                        }
                    }
                },
                "exportButton",
                "columnChooserButton",
                "searchPanel",
            ],
        },
        stateStoring: AutoLoad("gridNotasFiscaisCancelamento", false),
        onInitialized(e) {
            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        e.component.updateDimensions();
                    }
                });
            }).observe(e.element[0]);
        },
    }).dxDataGrid("instance");

    oGridBoletosRelacionados = $("#gridBoletosRelacionados").dxDataGrid({
        keyExpr: "NR_BOLETO",
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        allowColumnResizing: true,
        columnsAutoWidth: true,
        cellHintEnabled: true,
        allowColumnReordering: true,
        sorting: {
            mode: "multiple",
        },
        selection: {
            mode: "single",
            allowSelectAll: false,
            showCheckBoxesMode: "always",
            deferred: false,
        },
        groupPanel: {
            visible: true,
            emptyPanelText: "Agrupar",
        },
        pager: {
            visible: false,
            allowedPageSizes: [10, 15, 20, 50, 100],
            showPageSizeSelector: true,
            showNavigationButtons: true
        },
        paging: {
            pageSize: 10,
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet("Boletos");

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Boletos_Relacionados_NF_" + vNFProcessamento.NR_NOTA_FISCAL + ".xlsx");
                });
            });
            e.cancel = true;
        },
        searchPanel: {
            visible: true,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
        },
        filterRow: {
            visible: true,
            applyFilter: "auto",
        },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        filterPanel: {
            visible: true,
        },
        columnChooser: {
            enabled: true,
            allowSearch: true,
            width: 300,
            height: 500,
        },
        columns: [
            {
                dataField: "NR_BOLETO",
                caption: "Boleto",
                //width: 75,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                allowHiding: false,
            },
            {
                dataField: "DT_VENCIMENTO",
                caption: "Vencimento",
                //width: 92,
                dataType: "date",
                format: "dd/MM/yyyy",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 199,
            },
            {
                dataField: "VL_BOLETO",
                caption: "Valor",
                format: "###,###,###,##0.00",
                //width: 90,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                alignment: "right",
                cssClass: "column-data-grid",
                hidingPriority: 198,
            },
            {
                dataField: "DS_BANCO",
                caption: "Banco",
                //width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 197,
            },
            {
                dataField: "DS_AGENCIA_CONTA",
                caption: "Agência / Conta",
                //width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 196,
            },
            {
                dataField: "LG_ARQUIVO_REMESSA_GERADO",
                caption: "Gerado CNAB",
                width: 90,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 200,
                customizeText: function (e) {
                    if (e.value == 0) {
                        return "Não";
                    }
                    else {
                        return "Sim";
                    }
                }
            },

        ],
        summary: {
            totalItems: [{
                column: "NR_BOLETO",
                summaryType: "count",
                displayFormat: "{0} Boletos",
            },],
        },
        onCellPrepared: function (e) {
            if (e.rowType === "data") {
                if (e.column.dataField === "LG_ARQUIVO_REMESSA_GERADO" && e.value === 1) {
                    e.cellElement.css("color", "#b23a48");
                    e.cellElement.css("background-color", "#fae0e4");
                }
            };
            if (e.rowType === "group") {
                e.cellElement.css("color", "#f05b41");
                e.cellElement.css("background-color", "white");
            };
        },
        onInitialized(e) {
            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        e.component.updateDimensions();
                    }
                });
            }).observe(e.element[0]);
        },
    }).dxDataGrid("instance");

    oGridEntregasRelacionadas = $("#gridEntregasRelacionadas").dxDataGrid({
        keyExpr: "NR_ROMANEIO",
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        allowColumnResizing: true,
        columnsAutoWidth: true,
        cellHintEnabled: true,
        allowColumnReordering: true,
        sorting: {
            mode: "multiple",
        },
        selection: {
            mode: "single",
            allowSelectAll: false,
            showCheckBoxesMode: "always",
            deferred: false,
        },
        groupPanel: {
            visible: true,
            emptyPanelText: "Agrupar",
        },
        pager: {
            visible: false,
            allowedPageSizes: [10, 15, 20, 50, 100],
            showPageSizeSelector: true,
            showNavigationButtons: true
        },
        paging: {
            pageSize: 10,
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet("Entregas");

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Entregas_Relacionados_NF_" + vNFProcessamento.NR_NOTA_FISCAL + ".xlsx");
                });
            });
            e.cancel = true;
        },
        searchPanel: {
            visible: true,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
        },
        filterRow: {
            visible: true,
            applyFilter: "auto",
        },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        filterPanel: {
            visible: true,
        },
        columnChooser: {
            enabled: true,
            allowSearch: true,
            width: 300,
            height: 500,
        },
        columns: [
            {
                dataField: "NR_ROMANEIO",
                caption: "Romaneio",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                allowHiding: false,
            },
            {
                dataField: "DT_ENTREGA",
                caption: "Entrega",
                width: 100,
                dataType: "date",
                format: "dd/MM/yyyy",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 199,
            },
            {
                dataField: "DS_SITUACAO_ENTREGA",
                caption: "Situação Entrega",
                //width: 150,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 198,
            },
            {
                dataField: "NR_PEDIDO",
                caption: "Pedido",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 200,
            },
            {
                dataField: "DT_EMISSAO",
                caption: "Emissão",
                width: 100,
                dataType: "date",
                format: "dd/MM/yyyy",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 197,
            },
            {
                dataField: "VL_PEDIDO",
                caption: "Valor",
                format: "###,###,###,##0.00",
                width: 90,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                alignment: "right",
                cssClass: "column-data-grid",
                hidingPriority: 196,
            },
            {
                dataField: "DS_SITUACAO_PEDIDO",
                caption: "Situação Pedido",
                //width: 150,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 195,
            },
            {
                dataField: "CD_LOGIN_VENDEDOR",
                caption: "Vendedor",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 194,
            },

        ],
        summary: {
            totalItems: [{
                column: "NR_ROMANEIO",
                summaryType: "count",
                displayFormat: "{0} Entregas",
            },],
        },
        onCellPrepared: function (e) {
            if (e.rowType === "group") {
                e.cellElement.css("color", "#f05b41");
                e.cellElement.css("background-color", "white");
            };
        },
        onInitialized(e) {
            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        e.component.updateDimensions();
                    }
                });
            }).observe(e.element[0]);
        },
    }).dxDataGrid("instance");

    oGridEtapasProcessamento = $("#gridEtapasProcessamento").dxDataGrid({
        keyExpr: "Nr_Ordem",
        wordWrapEnabled: true,
        showRowLines: true,
        showBorders: true,
        rowAlternationEnabled: true,
        allowColumnResizing: true,
        //columnResizingMode: "nextColumn",
        allowColumnReordering: false,
        width: "100%",
        columnsAutoWidth: false,
        cellHintEnabled: true,
        sorting: { mode: "multiple" },
        groupPanel: { visible: false },
        pager: {
            visible: false,
            allowedPageSizes: [10, 25, 50, 100],
            showPageSizeSelector: true,
            showNavigationButtons: true
        },
        paging: { pageSize: 100 },
        export: {
            enabled: false,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet("Etapas");

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Etapas_Processamento_Canc_Inut_NF_" + vNFProcessamento.NR_NOTA_FISCAL + ".xlsx");
                });
            });
            e.cancel = true;
        },
        searchPanel: {
            visible: false,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
        },
        filterRow: { visible: false, applyFilter: "auto" },
        columns: [
            {
                dataField: "Ds_Imagem",
                caption: "",
                width: 60,
                alignment: "center",
                allowSorting: false,
                cellTemplate(container, options) {
                    $("<div>")
                        .append($("<img>", { src: options.value, style: "width: 16px; height: 16px" }))
                        .appendTo(container);
                },
                allowHiding: false,
            },
            {
                dataField: "Ds_Etapa",
                caption: "Etapa",
                width: 150,
                cssClass: "column-data-grid",
                allowSorting: false,
                alignment: "left",
                allowHiding: false,
            },
            {
                dataField: "Ds_Tarefa",
                caption: "Tarefa",
                cssClass: "column-data-grid",
                allowSorting: false,
                alignment: "left",
                hidingPriority: 199,
            },
            {
                dataField: "Ds_Resultado",
                caption: "Status",
                width: 180,
                cssClass: "column-data-grid",
                allowSorting: false,
                alignment: "center",
                hidingPriority: 200,
                cellTemplate: function (e, x) {
                    var status = x.data.Ds_Resultado;

                    if (status.toUpperCase() == "EM PROCESSAMENTO") {
                        e.append(`<div><i class="fa fa-refresh fa-spin mr-2" style="font-size: 12px"></i>${status}</div>`);
                    } else {
                        e.append(`<div>${status}</div>`);
                    };
                },
            }
        ],
        onInitialized(e) {
            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        e.component.updateDimensions();
                    }
                });
            }).observe(e.element[0]);
        },
    }).dxDataGrid("instance");

    Load_Azr_Lookup_Produto("lkpProdutoFiltro", arrayLookup).then(function () {
        oLkpProdutoFiltro = arrayLookup["lkpProdutoFiltro"].Component;
        oLkpProdutoFiltro.option("placeholder", "Pesquisar notas que contenham um produto específico");
        oLkpProdutoFiltro.option("label", "Pesquisar notas que contenham um produto específico");

        var lkpProdutoFiltroValueChangedHandler = function (e) {
            carregaNotasFiscais()
        };
        oLkpProdutoFiltro.on("valueChanged", lkpProdutoFiltroValueChangedHandler)

        oLoadPanel.hide();
    });

    oTxtSenhaCertificadoContainer = $("#txtSenhaCertificado");

    oTxtSenhaCertificado = $("#txtSenhaCertificado").dxTextBox({
        placeholder: "Informe a Senha do Certificado",
        maxLength: 100,
        mode: "password",
        inputAttr: { "aria-label": "Password" },
        stylingMode: "filled",
        buttons: [{
            name: "password",
            location: "after",
            options: {
                icon: "/img/visualizar-senha.png",
                type: "default",
                onClick() {
                    oTxtSenhaCertificado.option("mode", oTxtSenhaCertificado.option("mode") === "text" ? "password" : "text");
                },
            },
        }],
    }).dxTextBox("instance");

    oTxtSenhaCertificadoConfirmacaoContainer = $("#txtSenhaCertificadoConfirmacao");

    oTxtSenhaCertificadoConfirmacao = $("#txtSenhaCertificadoConfirmacao").dxTextBox({
        placeholder: "Confirme a Senha do Certificado",
        maxLength: 100,
        mode: "password",
        inputAttr: { "aria-label": "Password" },
        stylingMode: "filled",
        buttons: [{
            name: "password",
            location: "after",
            options: {
                icon: "/img/visualizar-senha.png",
                type: "default",
                onClick() {
                    oTxtSenhaCertificadoConfirmacao.option("mode", oTxtSenhaCertificadoConfirmacao.option("mode") === "text" ? "password" : "text");
                },
            },
        }],
    }).dxTextBox("instance");

    oUploadProgress = $("#uploadProgress").dxProgressBar({
        min: 0,
        max: 100,
        width: "50%",
        showStatus: false,
        visible: false,
    }).dxProgressBar("instance");

    oFileUploader = $("#fileUploader").dxFileUploader({
        dialogTrigger: "#dropzoneExternal",
        dropZone: "#dropzoneExternal",
        multiple: false,
        visible: false,
        allowedFileExtensions: [".pfx"],
        uploadMode: "instantly",
        uploadUrl: "/NotaFiscal/UploadCertificado",
        onBeforeSend: function (e) {
            var vParametrosDadosFilial = JSON.stringify({
                Cd_Filial: vDadosFilial.CD_FILIAL,
                Cd_CNPJ: vDadosFilial.CD_CNPJ
            });

            e.request.setRequestHeader("pNFDadosFilial", vParametrosDadosFilial);
        },
        onDropZoneEnter(e) {
            if (e.dropZoneElement.id === "dropzoneExternal") { toggleDropZoneActive(e.dropZoneElement, true); }
        },
        onDropZoneLeave(e) {
            if (e.dropZoneElement.id === "dropzoneExternal") { toggleDropZoneActive(e.dropZoneElement, false); }
        },
        onUploadStarted() {
            oUploadProgress.option("visible", true);
        },
        onProgress(e) {
            oUploadProgress.option("value", (e.bytesLoaded / e.bytesTotal) * 100);
        },
        onUploaded(e) {
            var responseData = JSON.parse(e.request.responseText);

            if (responseData.result == "error") {
                exibeMensagem("error", "Erro ao fazer o upload o certificado", responseData.msg);
            }
            else {
                oUploadProgress.option({
                    visible: false,
                    value: 0,
                });
                oFileUploader.reset();

                uploadCertificadoSenha();
            }
        }
    }).dxFileUploader("instance");

    oChkCancelaNotaFiscal = $('#chkCancelaNotaFiscal').dxCheckBox({
        value: false,
        text: "Permitir que o usuário cancele notas fiscais e inutilize numerações de notas rejeitadas",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {
                    salvarPermissoesUsuario();
                });
            });
        },
    }).dxCheckBox('instance');

    oChkDownloadArquivoXMLCancelamento = $('#chkDownloadArquivoXMLCancelamento').dxCheckBox({
        value: false,
        text: "Permitir que o usuário efetue o download dos arquivos XML das notas fiscais canceladas",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {
                    salvarPermissoesUsuario();
                });
            });
        },
    }).dxCheckBox('instance');

    carregaPermissoesUsuarioLogado();
});

$(window).bind("load", function () {
    oLoadPanel.hide();

    $("#cardCabecalho").show("fast");
    $("#cardMenu").show("fast");
});

function exibeMensagem(pTipo, pTitulo, pTexto) {
    var configuration = { title: pTitulo, text: pTexto, type: pTipo }

    if (pTipo == "error") {
        configuration.addclass = "stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
        //configuration.hide = false;
    }
    else if (pTipo == "info") {
        configuration.addclass = "notification-warning stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
    }

    new PNotify(configuration);
};

function exibirEsconderPaineis(el, paramDisplay) {
    var display;

    if (paramDisplay === "block" || paramDisplay === "none") {
        display = paramDisplay;
    } else {
        if (document.getElementById(el).style.display === "none") {
            display = "block";
        } else {
            display = "none";
        };
    };

    document.getElementById(el).style.display = display;
};

function desabilitaTodosPanels() {
    exibirEsconderPaineis("cardAlertaContabilidade", "none");
    exibirEsconderPaineis("cardConfiguracoesUsuario", "none")

    exibirEsconderPaineis("cardCabecalho", "none");
    exibirEsconderPaineis("cardConsultaGeralFiltro", "none");
    exibirEsconderPaineis("cardConsultaGeralGrid", "none");
    exibirEsconderPaineis("cardConfirmacaoForaPrazo", "none");
    exibirEsconderPaineis("cardConfirmacaoBoletoRelacionado", "none");
    exibirEsconderPaineis("cardConfirmacaoEntregaRelacionada", "none");
    exibirEsconderPaineis("cardJustificativa", "none");
    exibirEsconderPaineis("cardParametrosProcessamento", "none");
    exibirEsconderPaineis("cardEtapasProcessamento", "none");
    exibirEsconderPaineis("cardResumoProcessamento", "none");
    exibirEsconderPaineis("cardResumoProcessamentoBotoes2", "none");
    exibirEsconderPaineis("cardResumoNotaFiscalForaPrazo", "none");
    exibirEsconderPaineis("cardResumoBoletosRelacionados", "none");
    exibirEsconderPaineis("cardResumoEntregasRelacionadas", "none");

    exibirEsconderPaineis("cardCertificadoFilial", "none");
    exibirEsconderPaineis("cardSemCertificado", "none");
    exibirEsconderPaineis("cardCertificadoVencido", "none");
    exibirEsconderPaineis("cardCertificado30Dias", "none");
    exibirEsconderPaineis("cardUploadCertificado", "none");
    exibirEsconderPaineis("cardUploadCertificadoSenha", "none");
    exibirEsconderPaineis("cardUploadCertificadoConcluido", "none");

    exibirEsconderPaineis("cardDonwloadXML", "none");
    exibirEsconderPaineis("cardMenu", "none");

    rolarTopo();
};

function reiniciaTela() {
    //window.open("CancelamentoNotaFiscal", "_parent");
    inicio();
};

function inicio() {
    desabilitaTodosPanels();

    exibirEsconderPaineis("cienciaForaPrazo", "none");
    exibirEsconderPaineis("cienciaBoletoRelacionado", "none");
    exibirEsconderPaineis("cienciaEntregaRelacionada", "none");

    oBtnEtapasProcessamentoVoltar.disabled = true;

    vNFProcessamento = {
        CD_FILIAL: null,
        NR_CONTROLE: null,
        NR_NOTA_FISCAL: null,
        CD_ORIGEM_CONFECCAO: null,
        CD_NATUREZA_OPERACAO: null,
        CD_SITUACAO_NF: null,
        LG_FORA_PRAZO_CANCELAMENTO: null,
        LG_POSSUI_BOLETO: null,
        LG_POSSUI_PROGRAMACAO_ENTREGA: null,
        LG_MOVIMENTO_POSSUI_OUTRAS_NOTAS: null,
        LG_POSSUI_FATURAMENTO_ATIVO: null,
        LG_NATUREZA_OPERACAO_MOVIMENTA_ESTOQUE: null,
        LG_NATUREZA_OPERACAO_GERA_FINANCEIRO: null
    };
    vDadosFilial = {
        CD_FILIAL: null,
        DS_RAZAO_SOCIAL: null,
        CD_CNPJ: null,
        LG_POSSUI_CERTIFICADO: null,
        LG_POSSUI_SENHA_CERTIFICADO: null,
        DT_VENCIMENTO_CERTIFICADO: null,
        QT_DIAS_VENCIMENTO_CERTIFICADO: null
    };
    vQtEtapasProcessamento = 0;
    vNrEtapaProcessamento = null;
    dsEtapasProcessamento = [];
    vErroEtapaProcessamento = false;
    oChkCienciaForaPrazo.reset();
    oChkCienciaBoletoRelacionado.reset();
    oChkCienciaEntregaRelacionada.reset();
    oTxtJustificativa.reset();
    oChkCancelarFaturamento.reset();
    oChkCancelarPedido.reset();
    oGridNotasFiscaisCancelamento.deselectAll();
    oTxtSenhaCertificado.reset();
    oTxtSenhaCertificadoConfirmacao.reset();

    document.getElementById("cardResumoNotaFiscalForaPrazo").style.opacity = "100";
    document.getElementById("cardResumoBoletosRelacionados").style.opacity = "100";
    document.getElementById("cardResumoEntregasRelacionadas").style.opacity = "100";

    exibirEsconderPaineis("cardCabecalho", "block");
    exibirEsconderPaineis("cardConsultaGeralFiltro", "block");
    exibirEsconderPaineis("cardConsultaGeralGrid", "block");
    exibirEsconderPaineis("cardAlertaContabilidade", "block");

    carregaNotasFiscais();

    oGridNotasFiscaisCancelamento.deselectAll();
};

function rolarPara(elemento) {
    $("html, body").animate({ scrollTop: $(elemento).offset().top }, 600);
};

function rolarTopo() {
    window.scrollTo(0, 0);
};

function abrirModal(e) {
    $(e).modal("toggle");
};

function removerComAnimacao(objRemover) {
    const elemento = document.getElementById(objRemover);

    // Define a animação usando CSS transitions
    elemento.style.transition = "opacity 1s ease-in-out";
    elemento.style.opacity = "0";

    // Define um atraso para aguardar a animação completar
    setTimeout(() => {
        elemento.style.display = "none";
    }, 750); // Tempo da animação em milissegundos (1 segundo no exemplo)
};

function getComponentValue(component, type) {

    var value = component.option("value");

    if (value != null) {
        if (type == "dxDropDownBox" && value?.length > 0) {
            var value = value[0];
            if (value.includes("_")) {
                value = value.substring(value.lastIndexOf("_") + 1);
            }
        }
        else if (type == "dxTagBox") {
            value = value.toString();

            if (value.length == 0) {
                value = null;
            }
        }
    }

    return value;
};

function carregaNotasFiscais() {
    oGridNotasFiscaisCancelamentoContainer.fadeOut("fast");

    var vHorasFiltro = getComponentValue(oNbxHorasFiltro, "dxNumberBox");
    var vProdutoFiltro = getComponentValue(oLkpProdutoFiltro, "dxLookup");
    var vPedidosFiltro = getComponentValue(oTgxPedidosFiltro, "dxTagBox");

    var vParametrosConsulta = JSON.stringify({
        QT_HORAS_FILTRO: vHorasFiltro,
        CD_PRODUTO: vProdutoFiltro,
        NR_PEDIDOS: vPedidosFiltro
    });

    oLoadPanel.show();

    $.ajax({
        type: "POST",
        url: "/NotaFiscal/CarregaNotasFiscaisCancelamento",
        data: { pParameters: vParametrosConsulta },
        success: function (responseData) {
            oLoadPanel.hide();

            if (typeof responseData == "string") {
                exibeMensagem("error", "Erro ao executar a consulta das notas fiscais", responseData);
            } else {
                oGridNotasFiscaisCancelamento.option("dataSource", responseData);

                oGridNotasFiscaisCancelamentoContainer.css("font", "11px verdana");

                oGridNotasFiscaisCancelamentoContainer.fadeIn("1500");
            }
        },
        fail: function (responseData) {
            oLoadPanel.hide();

            exibeMensagem("error", "Erro ao executar a consulta das notas fiscais", responseData);
        }
    });
};

function abrirDetalheNF(pCodFilial, pNrControle) {
    var vParametrosConsulta = JSON.stringify({
        CD_FILIAL: pCodFilial,
        NR_CONTROLE: pNrControle
    });

    oLoadPanel.show();

    //CONSULTA DE DADOS GERAIS E ITENS DA NOTA FISCAL
    GetAzureDataSource(13, vParametrosConsulta).then((result) => {
        if (result.success == false) {
            oLoadPanel.hide();
            exibeMensagem("error", "Erro ao consultar os dados da nota fiscal", result.error);
            return;
        }

        const stylingMode = "filled";

        DevExpress.config({
            editorStylingMode: stylingMode,
        });

        //DADOS GERAIS
        $("#txt_Detalhe_Nr_Nota").dxTextBox({
            value: result.data[0].NR_NOTA_FISCAL,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Nota Fiscal",
        });

        $("#txt_Detalhe_ds_situacao").dxTextBox({
            value: result.data[0].DS_SITUACAO.toUpperCase(),
            height: 35,
            labelMode: "static",
            label: "Situação da Nota",
            readOnly: true,
        });

        $("#txt_Detalhe_Dt_Emissao").dxDateBox({
            value: result.data[0].DT_IMPRESSAO,
            height: 35,
            labelMode: "static",
            label: "Date de Emissão",
            readOnly: true,
            useMaskBehavior: true,
            displayFormat: "dd/MM/yyyy",
            type: "date",
        });

        $("#txt_Detalhe_Ds_Natureza_Operacao").dxTextBox({
            value: result.data[0].DS_NATUREZA_OPERACAO.toUpperCase(),
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Natureza da Operação",
        });

        $("#txt_Detalhe_Dt_Saida").dxDateBox({
            value: result.data[0].DT_SAIDA,
            height: 35,
            labelMode: "static",
            label: "Data da Saída",
            readOnly: true,
            useMaskBehavior: true,
            displayFormat: "dd/MM/yyyy",
            type: "date",
        });

        $("#nbx_Detalhe_Vl_IPI").dxNumberBox({
            value: result.data[0].VL_TOTAL_IPI,
            height: 35,
            labelMode: "static",
            label: "Valor IPI",
            readOnly: true,
            format: "###,###,###,###,##0.00",
        });

        $("#nbx_Detalhe_Vl_Frete").dxNumberBox({
            value: result.data[0].VL_FRETE,
            height: 35,
            labelMode: "static",
            label: "Valor Frete",
            readOnly: true,
            format: "###,###,###,###,##0.00",
        });

        $("#txt_Detalhe_cd_filial").dxTextBox({
            value: result.data[0].CD_FILIAL,
            height: 35,
            labelMode: "static",
            label: "Filial",
            readOnly: true,
        });

        $("#txt_Detalhe_vl_seguro").dxNumberBox({
            value: result.data[0].VL_SEGURO,
            height: 35,
            labelMode: "floating",
            label: "Valor Seguro",
            readOnly: true,
            format: "###,###,###,###,##0.00",
        });

        $("#txt_Detalhe_vl_outras_despesas").dxNumberBox({
            value: result.data[0].VL_OUTRAS_DESPESAS,
            height: 35,
            labelMode: "static",
            label: "Outras Despesas",
            readOnly: true,
            format: "###,###,###,###,##0.00",
        });

        $("#txt_Detalhe_vl_base_calculo_icms").dxNumberBox({
            value: result.data[0].VL_BASE_CALCULO_ICMS,
            height: 35,
            labelMode: "static",
            label: "Base de Cálculo ICMS",
            readOnly: true,
            format: "###,###,###,###,##0.00",
        });

        $("#txt_Detalhe_vl_icms").dxNumberBox({
            value: result.data[0].VL_ICMS,
            height: 35,
            labelMode: "static",
            label: "Valor ICMS",
            readOnly: true,
            format: "###,###,###,###,##0.00",
        });

        $("#txt_Detalhe_vl_base_calculo_icms_subst").dxNumberBox({
            value: result.data[0].VL_BASE_CALCULO_ICMS_SUBST,
            height: 35,
            labelMode: "static",
            label: "Base de Cálculo Substituição",
            readOnly: true,
            format: "###,###,###,###,##0.00",
        });

        $("#txt_Detalhe_vl_icms_substituicao").dxNumberBox({
            value: result.data[0].VL_ICMS_SUBSTITUICAO,
            height: 35,
            labelMode: "static",
            label: "Valor Substituição",
            readOnly: true,
            format: "###,###,###,###,##0.00",
        });

        $("#txt_Detalhe_vl_total_produtos").dxNumberBox({
            value: result.data[0].VL_TOTAL_PRODUTOS,
            height: 35,
            labelMode: "static",
            label: "Valor Total dos Produtos",
            readOnly: true,
            format: "###,###,###,###,##0.00",
        });

        $("#txt_Detalhe_vl_total_nf").dxNumberBox({
            value: result.data[0].VL_TOTAL_PRODUTOS,
            height: 35,
            labelMode: "static",
            label: "Valor Total da Nota",
            readOnly: true,
            format: "###,###,###,###,##0.00",
        });

        //TRANSPORTADOR
        $("#txt_detalhe_ds_razao_social_trans").dxTextBox({
            value: result.data[0].DS_RAZAO_SOCIAL_TRANS,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Razão Social",
        });

        $("#txt_detalhe_cd_cpf_cnpj_trans").dxTextBox({
            value: result.data[0].CD_CPF_CNPJ_TRANS,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "CNPJ",
        });

        $("#txt_detalhe_cd_inscricao_estadual_trans").dxTextBox({
            value: result.data[0].CD_INSCRICAO_ESTADUAL_TRANS,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Instrição Estadual",
        });

        $("#txt_detalhe_ds_endereco_trans").dxTextBox({
            value: result.data[0].DS_ENDERECO_TRANS,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Endereço",
        });

        $("#txt_detalhe_nr_endereco_trans").dxTextBox({
            value: result.data[0].NR_ENDERECO_TRANS,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Número",
        });

        $("#txt_detalhe_ds_bairro_trans").dxTextBox({
            value: result.data[0].DS_BAIRRO_TRANS,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Bairro",
        });

        $("#txt_detalhe_ds_cidade_trans").dxTextBox({
            value: result.data[0].DS_CIDADE_TRANS,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Cidade",
        });

        $("#txt_detalhe_cd_uf_trans").dxTextBox({
            value: result.data[0].CD_UF_TRANS,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "UF",
        });

        $("#txt_detalhe_cd_cep_trans").dxTextBox({
            value: result.data[0].CD_CEP_TRANS,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "CEP",
        });

        $("#txt_detalhe_ds_frete_conta").dxTextBox({
            value: result.data[0].DS_FRETE_CONTA,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Frete Conta",
        });

        $("#txt_detalhe_qt_total_itens").dxTextBox({
            value: result.data[0].QT_TOTAL_ITENS,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Quantidade",
        });

        $("#txt_detalhe_ds_especie").dxTextBox({
            value: result.data[0].DS_ESPECIE,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Espécie",
        });

        $("#txt_detalhe_ds_marca").dxTextBox({
            value: result.data[0].DS_MARCA,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Marca",
        });

        $("#txt_detalhe_ds_numero_dados_gerais").dxTextBox({
            value: result.data[0].DS_NUMERO_DADOS_GERAIS,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Nº Dados Gerais",
        });

        $("#txt_detalhe_ps_total_bruto").dxNumberBox({
            value: result.data[0].PS_TOTAL_BRUTO,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Peso Bruno",
            format: "###,###,###,###,##0.00",
        });

        $("#txt_detalhe_ps_total_liquido").dxNumberBox({
            value: result.data[0].PS_TOTAL_LIQUIDO,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Peso Líquido",
            format: "###,###,###,###,##0.00",
        });

        //DESTINATÁRIO
        $("#txt_detalhe_ds_razao_social_cli").dxTextBox({
            value: result.data[0].DS_RAZAO_SOCIAL_CLI,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Razão Social",
        });

        $("#txt_detalhe_cd_cpf_cnpj_cli").dxTextBox({
            value: result.data[0].CD_CPF_CNPJ_CLI,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "CPF/CNPJ",
        });

        $("#txt_detalhe_cd_ie_cliente").dxTextBox({
            value: result.data[0].CD_IE_CLIENTE,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "IE/RG",
        });

        $("#txt_detalhe_ds_endereco").dxTextBox({
            value: result.data[0].DS_ENDERECO,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Endereço",
        });

        $("#txt_detalhe_nr_endereco").dxTextBox({
            value: result.data[0].NR_ENDERECO,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Número",
        });

        $("#txt_detalhe_ds_bairro").dxTextBox({
            value: result.data[0].DS_BAIRRO,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Bairro",
        });

        $("#txt_detalhe_ds_cidade").dxTextBox({
            value: result.data[0].DS_CIDADE,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Cidade",
        });

        $("#txt_detalhe_cd_uf").dxTextBox({
            value: result.data[0].CD_UF,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "UF",
        });

        $("#txt_detalhe_cd_cep").dxTextBox({
            value: result.data[0].CD_CEP,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "CEP",
        });

        //ENDEREÇO DE ENTREGA
        $("#txt_detalhe_ds_endereco_entrega").dxTextBox({
            value: result.data[0].DS_ENDERECO_ENTREGA,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Endereço",
        });

        $("#txt_detalhe_nr_endereco_entrega").dxTextBox({
            value: result.data[0].NR_ENDERECO_ENTREGA,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Número",
        });

        $("#txt_detalhe_ds_bairro_entrega").dxTextBox({
            value: result.data[0].DS_BAIRRO_ENTREGA,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Bairro",
        });

        $("#txt_detalhe_ds_cidade_entrega").dxTextBox({
            value: result.data[0].DS_CIDADE_ENTREGA,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Cidade",
        });

        $("#txt_detalhe_cd_uf_entrega").dxTextBox({
            value: result.data[0].CD_UF_ENTREGA,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "UF",
        });

        $("#txt_detalhe_cd_cep_entrega").dxTextBox({
            value: result.data[0].CD_CEP_ENTREGA,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "CEP",
        });

        //OBSERVAÇÃO
        $("#txt_detalhe_ds_mensagem").dxTextArea({
            value: result.data[0].DS_MENSAGEM,
            height: 90,
            labelMode: "static",
            readOnly: true,
            //label: "Obsercação",
        });

        //CHAVE DE ACESSO E MENSAGENS
        $("#txt_detalhe_cd_chave_acesso_nfe").dxTextBox({
            value: result.data[0].CD_CHAVE_ACESSO_NFE,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Chave Acessso",
        });

        $("#txt_detalhe_nr_protocolo_emissao_nfe").dxTextBox({
            value: result.data[0].NR_PROTOCOLO_EMISSAO_NFE,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Protocolo",
        });

        $("#txt_detalhe_ds_ultima_mensagem_emissao_nfe").dxTextBox({
            value: result.data[0].DS_ULTIMA_MENSAGEM_EMISSAO_NFE,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Última Mensagem Emissão",
        });

        $("#txt_detalhe_nr_protocolo_cancelamento_nfe").dxTextBox({
            value: result.data[0].NR_PROTOCOLO_CANCELAMENTO_NFE,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Protocolo Cancelamento",
        });

        $("#txt_detalhe_nr_protocolo_inutilizacao_nfe").dxTextBox({
            value: result.data[0].NR_PROTOCOLO_INUTILIZACAO_NFE,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Protocolo Inutilização",
        });

        $("#txt_detalhe_ds_ultima_mensagem_canc_inut_nfe").dxTextBox({
            value: result.data[0].DS_ULTIMA_MENSAGEM_CANC_INUT_NFE,
            height: 35,
            labelMode: "static",
            readOnly: true,
            label: "Última Mensagem Cancelamento ou Inutilização",
        });

        $("#txt_detalhe_ds_justificativa_cancelamento").dxTextArea({
            value: result.data[0].DS_JUSTIFICATIVA_CANCELAMENTO,
            height: 90,
            labelMode: "static",
            readOnly: true,
            label: "Justificativa do Cancelamento",
        });

        //ITENS DA NOTA FISCAL
        $("#gridNotaFiscalItens").dxDataGrid({
            dataSource: result.data,
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: {
                mode: "multiple",
            },
            selection: {
                mode: "single",
                allowSelectAll: false,
                showCheckBoxesMode: "always",
                deferred: false,
            },
            allowColumnResizing: true,
            columnsAutoWidth: true,
            cellHintEnabled: true,
            allowColumnReordering: true,
            groupPanel: {
                visible: true,
                emptyPanelText: "Agrupar",
            },
            paging: {
                pageSize: 10,
            },
            pager: {
                visible: false,
                allowedPageSizes: [10, 15, 20, 50, 100],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet("Itens");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Nota_Fiscal_Itens.xlsx");
                    });
                });
                e.cancel = true;
            },
            filterRow: {
                visible: true,
                applyFilter: "auto",
            },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: {
                visible: true,
            },
            columnChooser: {
                enabled: true,
                allowSearch: true,
                width: 300,
                height: 500,
            },
            keyExpr: "NR_SEQUENCIA_PRODUTO",
            columns: [
                {
                    dataField: "CD_PRODUTO",
                    caption: "Código",
                    width: 90,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    allowHiding: false,
                },
                {
                    dataField: "DS_PRODUTO",
                    caption: "Produto",
                    //width: 200,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: "left",
                    cssClass: "column-data-grid",
                    hidingPriority: 200,
                },
                {
                    dataField: "CD_SITUACAO_TRIBUTARIA_NFE",
                    caption: "ST",
                    width: 50,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    hidingPriority: 199,
                },
                {
                    dataField: "QT_VENDIDA",
                    caption: "Qtde",
                    format: "###,###,###,###.####",
                    width: 65,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    hidingPriority: 198,
                },
                {
                    dataField: "CD_UNIDADE_MEDIDA",
                    caption: "UN",
                    width: 65,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    hidingPriority: 197,
                },
                {
                    dataField: "VL_UNITARIO_VENDIDO",
                    caption: "Vl. Unitário",
                    format: "###,###,###,##0.00",
                    width: 80,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    alignment: "right",
                    cssClass: "column-data-grid",
                    hidingPriority: 196,
                },
                {
                    dataField: "VL_TOTAL_VENDIDO",
                    caption: "Vl. Total",
                    format: "###,###,###,##0.00",
                    width: 80,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    alignment: "right",
                    cssClass: "column-data-grid",
                    hidingPriority: 195,
                },
                {
                    dataField: "PC_ALIQUOTA_ICMS",
                    caption: "% ICMS",
                    format: "###,###,###,###.00",
                    width: 50,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    alignment: "right",
                    cssClass: "column-data-grid",
                    hidingPriority: 194,
                },
                {
                    dataField: "VL_ICMS",
                    caption: "Vl. ICMS",
                    format: "###,###,###,##0.00",
                    width: 60,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    alignment: "right",
                    cssClass: "column-data-grid",
                    hidingPriority: 193,
                },

            ],

            summary: {
                totalItems: [{
                    column: "CD_PRODUTO",
                    summaryType: "count",
                    displayFormat: "{0} Itens",
                },],
            },

            onCellPrepared: function (e) {
                if (e.rowType === "group") {
                    e.cellElement.css("color", "#f05b41");
                    e.cellElement.css("background-color", "white");
                };
            },

            onInitialized(e) {
                new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            e.component.updateDimensions();
                        }
                    });
                }).observe(e.element[0]);
            },


        });

        //CONSULTA PEDIDOS RELACIONADOS COM A NOTA FISCAL
        GetAzureDataSource(26, vParametrosConsulta).then((result) => {
            if (result.success == false) {
                oLoadPanel.hide();
                exibeMensagem("error", "Erro ao consultar os pedidos relacionados com a nota fiscal", result.error);
                return;
            }

            //PEDIDOS DA NOTA FISCAL
            $("#gridNotaFiscalPedidos").dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                wordWrapEnabled: true,
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                sorting: {
                    mode: "multiple",
                },
                selection: {
                    mode: "single",
                    allowSelectAll: false,
                    showCheckBoxesMode: "always",
                    deferred: false,
                },
                allowColumnResizing: true,
                columnsAutoWidth: true,
                cellHintEnabled: true,
                allowColumnReordering: true,
                groupPanel: {
                    visible: true,
                    emptyPanelText: "Agrupar",
                },
                paging: {
                    pageSize: 10,
                },
                pager: {
                    visible: false,
                    allowedPageSizes: [10, 15, 20, 50, 100],
                    showPageSizeSelector: true,
                    showNavigationButtons: true
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet("Pedidos");

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Nota_Fiscal_Pedidos.xlsx");
                        });
                    });
                    e.cancel = true;
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto",
                },
                headerFilter: {
                    visible: true,
                    allowSearch: true
                },
                filterPanel: {
                    visible: true,
                },
                columnChooser: {
                    enabled: true,
                    allowSearch: true,
                    width: 300,
                    height: 500,
                },
                keyExpr: "NR_PEDIDO",
                columns: [
                    {
                        dataField: "NR_PEDIDO",
                        caption: "Pedido",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        allowHiding: false,
                    },
                    {
                        dataField: "CD_FILIAL_PEDIDO",
                        caption: "Filial",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        hidingPriority: 210,
                    },
                    {
                        dataField: "DT_EMISSAO_PEDIDO",
                        caption: "Emissão",
                        //width: 92,
                        dataType: "date",
                        format: "dd/MM/yyyy",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        hidingPriority: 201,
                    },
                    {
                        dataField: "CD_LOGIN_VENDEDOR",
                        caption: "Vendedor",
                        //width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        hidingPriority: 200,
                    },
                    {
                        dataField: "DS_SITUACAO_PEDIDO",
                        caption: "Situação",
                        //width: 50,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: "center",
                        cssClass: "column-data-grid",
                        hidingPriority: 199,
                    },
                    {
                        dataField: "VL_TOTAL_PEDIDO",
                        caption: "Vl. Pedido",
                        format: "###,###,###,##0.00",
                        width: 120,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: "right",
                        cssClass: "column-data-grid",
                        hidingPriority: 198,
                    },

                ],
                summary: {
                    totalItems: [{
                        column: "NR_PEDIDO",
                        summaryType: "count",
                        displayFormat: "{0} Pedidos",
                    },],
                },
                onCellPrepared: function (e) {
                    if (e.rowType === "group") {
                        e.cellElement.css("color", "#f05b41");
                        e.cellElement.css("background-color", "white");
                    };
                },
                onInitialized(e) {
                    new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                e.component.updateDimensions();
                            }
                        });
                    }).observe(e.element[0]);
                },
            });

            //CONSULTA BOLETOS RELACIONADOS COM A NOTA FISCAL
            GetAzureDataSource(31, vParametrosConsulta).then((result) => {
                if (result.success == false) {
                    oLoadPanel.hide();
                    exibeMensagem("error", "Erro ao consultar os boletos relacionados com a nota fiscal", result.error);
                    return;
                }

                //BOLETOS RELACIONADOS COM A NOTA FISCAL
                $("#gridNotaFiscalBoletos").dxDataGrid({
                    dataSource: result.data,
                    keyExpr: "NR_BOLETO",
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    allowColumnResizing: true,
                    columnsAutoWidth: true,
                    cellHintEnabled: true,
                    allowColumnReordering: true,
                    sorting: {
                        mode: "multiple",
                    },
                    selection: {
                        mode: "single",
                        allowSelectAll: false,
                        showCheckBoxesMode: "always",
                        deferred: false,
                    },
                    groupPanel: {
                        visible: true,
                        emptyPanelText: "Agrupar",
                    },
                    pager: {
                        visible: false,
                        allowedPageSizes: [10, 15, 20, 50, 100],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    paging: {
                        pageSize: 10,
                    },
                    export: {
                        enabled: true,
                        allowExportSelectedData: false
                    },
                    onExporting: function (e) {
                        var workbook = new ExcelJS.Workbook();
                        var worksheet = workbook.addWorksheet("Boletos");

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet: worksheet,
                            autoFilterEnabled: true
                        }).then(function () {
                            workbook.xlsx.writeBuffer().then(function (buffer) {
                                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Nota_Fiscal_Boletos.xlsx");
                            });
                        });
                        e.cancel = true;
                    },
                    searchPanel: {
                        visible: true,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    filterRow: {
                        visible: true,
                        applyFilter: "auto",
                    },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: {
                        visible: true,
                    },
                    columnChooser: {
                        enabled: true,
                        allowSearch: true,
                        width: 300,
                        height: 500,
                    },
                    columns: [
                        {
                            dataField: "NR_BOLETO",
                            caption: "Boleto",
                            //width: 75,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: "center",
                            cssClass: "column-data-grid",
                            allowHiding: false,
                        },
                        {
                            dataField: "DT_VENCIMENTO",
                            caption: "Vencimento",
                            //width: 92,
                            dataType: "date",
                            format: "dd/MM/yyyy",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: true,
                            alignment: "center",
                            cssClass: "column-data-grid",
                            hidingPriority: 199,
                        },
                        {
                            dataField: "VL_BOLETO",
                            caption: "Valor",
                            format: "###,###,###,##0.00",
                            //width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: true,
                            alignment: "right",
                            cssClass: "column-data-grid",
                            hidingPriority: 198,
                        },
                        {
                            dataField: "DS_BANCO",
                            caption: "Banco",
                            //width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: true,
                            alignment: "center",
                            cssClass: "column-data-grid",
                            hidingPriority: 197,
                        },
                        {
                            dataField: "DS_AGENCIA_CONTA",
                            caption: "Agência / Conta",
                            //width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: true,
                            alignment: "center",
                            cssClass: "column-data-grid",
                            hidingPriority: 196,
                        },
                        {
                            dataField: "LG_ARQUIVO_REMESSA_GERADO",
                            caption: "Gerado CNAB",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: true,
                            alignment: "center",
                            cssClass: "column-data-grid",
                            hidingPriority: 200,
                            customizeText: function (e) {
                                if (e.value == 0) {
                                    return "Não";
                                }
                                else {
                                    return "Sim";
                                }
                            }
                        },

                    ],
                    summary: {
                        totalItems: [{
                            column: "NR_BOLETO",
                            summaryType: "count",
                            displayFormat: "{0} Boletos",
                        },],
                    },
                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {
                            if (e.column.dataField === "LG_ARQUIVO_REMESSA_GERADO" && e.value === 1) {
                                e.cellElement.css("color", "#b23a48");
                                e.cellElement.css("background-color", "#fae0e4");
                            }
                        };
                        if (e.rowType === "group") {
                            e.cellElement.css("color", "#f05b41");
                            e.cellElement.css("background-color", "white");
                        };
                    },
                    onInitialized(e) {
                        new IntersectionObserver(entries => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    e.component.updateDimensions();
                                }
                            });
                        }).observe(e.element[0]);
                    },
                });

                //CONSULTA ENTREGAS RELACIONADAS A PEDIDOS DA NOTA FISCAL
                GetAzureDataSource(32, vParametrosConsulta).then((result) => {
                    if (result.success == false) {
                        oLoadPanel.hide();
                        exibeMensagem("error", "Erro ao consultar as entregas relacionadas com a nota fiscal", result.error);
                        return;
                    }

                    //ENTREGAS RELACIONADAS A PEDIDOS DA NOTA FISCAL
                    $("#gridNotaFiscalEntregas").dxDataGrid({
                        dataSource: result.data,
                        keyExpr: "NR_ROMANEIO",
                        hoverStateEnabled: true,
                        showBorders: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        wordWrapEnabled: true,
                        allowColumnResizing: true,
                        columnsAutoWidth: true,
                        cellHintEnabled: true,
                        allowColumnReordering: true,
                        sorting: {
                            mode: "multiple",
                        },
                        selection: {
                            mode: "single",
                            allowSelectAll: false,
                            showCheckBoxesMode: "always",
                            deferred: false,
                        },
                        groupPanel: {
                            visible: true,
                            emptyPanelText: "Agrupar",
                        },
                        pager: {
                            visible: false,
                            allowedPageSizes: [10, 15, 20, 50, 100],
                            showPageSizeSelector: true,
                            showNavigationButtons: true
                        },
                        paging: {
                            pageSize: 10,
                        },
                        export: {
                            enabled: true,
                            allowExportSelectedData: false
                        },
                        onExporting: function (e) {
                            var workbook = new ExcelJS.Workbook();
                            var worksheet = workbook.addWorksheet("Entregas");

                            DevExpress.excelExporter.exportDataGrid({
                                component: e.component,
                                worksheet: worksheet,
                                autoFilterEnabled: true
                            }).then(function () {
                                workbook.xlsx.writeBuffer().then(function (buffer) {
                                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Nota_Fiscal_Entregas.xlsx");
                                });
                            });
                            e.cancel = true;
                        },
                        searchPanel: {
                            visible: true,
                            highlightCaseSensitive: false,
                            highlightSearchText: true,
                            placeholder: "Procurar...",
                        },
                        filterRow: {
                            visible: true,
                            applyFilter: "auto",
                        },
                        headerFilter: {
                            visible: true,
                            allowSearch: true
                        },
                        filterPanel: {
                            visible: true,
                        },
                        columnChooser: {
                            enabled: true,
                            allowSearch: true,
                            width: 300,
                            height: 500,
                        },
                        columns: [
                            {
                                dataField: "NR_ROMANEIO",
                                caption: "Romaneio",
                                width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                alignment: "center",
                                cssClass: "column-data-grid",
                                allowHiding: false,
                            },
                            {
                                dataField: "DT_ENTREGA",
                                caption: "Entrega",
                                width: 100,
                                dataType: "date",
                                format: "dd/MM/yyyy",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: true,
                                alignment: "center",
                                cssClass: "column-data-grid",
                                hidingPriority: 199,
                            },
                            {
                                dataField: "DS_SITUACAO_ENTREGA",
                                caption: "Situação Entrega",
                                //width: 150,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: true,
                                alignment: "center",
                                cssClass: "column-data-grid",
                                hidingPriority: 198,
                            },
                            {
                                dataField: "NR_PEDIDO",
                                caption: "Pedido",
                                width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                alignment: "center",
                                cssClass: "column-data-grid",
                                hidingPriority: 200,
                            },
                            {
                                dataField: "DT_EMISSAO",
                                caption: "Emissão",
                                width: 100,
                                dataType: "date",
                                format: "dd/MM/yyyy",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: true,
                                alignment: "center",
                                cssClass: "column-data-grid",
                                hidingPriority: 197,
                            },
                            {
                                dataField: "VL_PEDIDO",
                                caption: "Valor",
                                format: "###,###,###,##0.00",
                                width: 90,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: "right",
                                cssClass: "column-data-grid",
                                hidingPriority: 196,
                            },
                            {
                                dataField: "DS_SITUACAO_PEDIDO",
                                caption: "Situação Pedido",
                                //width: 150,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: true,
                                alignment: "center",
                                cssClass: "column-data-grid",
                                hidingPriority: 195,
                            },
                            {
                                dataField: "CD_LOGIN_VENDEDOR",
                                caption: "Vendedor",
                                width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: true,
                                alignment: "center",
                                cssClass: "column-data-grid",
                                hidingPriority: 194,
                            },

                        ],
                        summary: {
                            totalItems: [{
                                column: "NR_ROMANEIO",
                                summaryType: "count",
                                displayFormat: "{0} Entregas",
                            },],
                        },
                        onCellPrepared: function (e) {
                            if (e.rowType === "group") {
                                e.cellElement.css("color", "#f05b41");
                                e.cellElement.css("background-color", "white");
                            };
                        },
                        onInitialized(e) {
                            new IntersectionObserver(entries => {
                                entries.forEach(entry => {
                                    if (entry.isIntersecting) {
                                        e.component.updateDimensions();
                                    }
                                });
                            }).observe(e.element[0]);
                        },
                    });

                    oLoadPanel.hide();

                    abrirModal("#ModalDetalheNota");
                });
            });
        });
    });
};

function verificaPrazoCancelamento() {
    oLoadPanel.show();

    var vParametrosConsulta = JSON.stringify({
        CD_FILIAL: vNFProcessamento.CD_FILIAL,
        NR_CONTROLE: vNFProcessamento.NR_CONTROLE
    });

    //CONSULTA DADOS DA NOTA FISCAL
    $.ajax({
        type: "POST",
        url: "/NotaFiscal/ConsultaNotaFiscalCancelamento",
        data: { pParameters: vParametrosConsulta },
        success: function (responseData) {
            oLoadPanel.hide();

            if (typeof responseData == "string") {
                exibeMensagem("error", "Erro ao consultar os dados da nota fiscal", responseData);
                inicio();
            } else {
                //ATUALIZA OS DADOS DA NOTA QUE ESTÁ SERÁ PROCESSADA
                vNFProcessamento.CD_SITUACAO_NF = responseData.Cd_Situacao_NF;
                vNFProcessamento.LG_FORA_PRAZO_CANCELAMENTO = responseData.Lg_Fora_Prazo_Cancelamento;
                vNFProcessamento.LG_POSSUI_BOLETO = responseData.Lg_Possui_Boleto;
                vNFProcessamento.LG_POSSUI_PROGRAMACAO_ENTREGA = responseData.Lg_Possui_Programacao_Entrega;
                vNFProcessamento.LG_MOVIMENTO_POSSUI_OUTRAS_NOTAS = responseData.Lg_Movimento_Possui_Outras_Notas;
                vNFProcessamento.LG_POSSUI_FATURAMENTO_ATIVO = responseData.Lg_Possui_Faturamento_Ativo;
                vNFProcessamento.LG_NATUREZA_OPERACAO_MOVIMENTA_ESTOQUE = responseData.Lg_Natureza_Operacao_Movimenta_Estoque;
                vNFProcessamento.LG_NATUREZA_OPERACAO_GERA_FINANCEIRO = responseData.Lg_Natureza_Operacao_Gera_Financeiro;

                //VERIFICA A SITUAÇÃO ATUAL DA NOTA FISCAL
                switch (vNFProcessamento.CD_SITUACAO_NF)
                {
                    case 2:
                        if (vNFProcessamento.LG_FORA_PRAZO_CANCELAMENTO == true) {
                            alertaCancelamentoForaPrazo();
                        }
                        else {
                            verificaBoletosRelacionados();
                        }
                        break;
                    case 3:
                        exibeMensagem("error", "Operação inválida", "Esta nota fiscal já está cancelada");
                        inicio();
                        break;
                    case 6:
                        verificaBoletosRelacionados();
                        break;
                    case 7:
                        exibeMensagem("error", "Operação inválida", "Não é possível cancelar uma nota fiscal que está denegada");
                        inicio();
                        break;
                    default:
                        exibeMensagem("error", "Operação inválida", "Não é possível cancelar ou inutilizar esta nota fiscal");
                        inicio();
                        break;
                };

                //VERIFICA SE A NOTA POSSUI BOLETOS RELACIONADOS
                if (vNFProcessamento.LG_POSSUI_BOLETO === true) {
                    GetAzureDataSource(31, vParametrosConsulta).then((result) => {
                        if (result.success == false) {
                            oLoadPanel.hide();
                            exibeMensagem("error", "Erro ao consultar os boletos relacionados com a nota fiscal", result.error);
                            return;
                        }

                        oGridBoletosRelacionados.option("dataSource", result.data);
                    });
                }

                //VERIFICA SE A NOTA POSSUI ENTREGAS RELACIONADAS
                if (vNFProcessamento.LG_POSSUI_PROGRAMACAO_ENTREGA === true) {
                    GetAzureDataSource(32, vParametrosConsulta).then((result) => {
                        if (result.success == false) {
                            oLoadPanel.hide();
                            exibeMensagem("error", "Erro ao consultar as entregas relacionadas com a nota fiscal", result.error);
                            return;
                        }

                        oGridEntregasRelacionadas.option("dataSource", result.data);
                    });
                }
            }
        },
        fail: function (responseData) {
            oLoadPanel.hide();
            exibeMensagem("error", "Erro ao consultar os dados da nota fiscal", responseData);
            inicio();
        }
    });
};

function alertaCancelamentoForaPrazo() {
    desabilitaTodosPanels();

    exibirEsconderPaineis("cardConfirmacaoForaPrazo", "block");
};

function verificaBoletosRelacionados() {
    if (vNFProcessamento.LG_POSSUI_BOLETO === true) {
        alertaBoletoRelacionado();
    }
    else {
        verificaEntregasRelacionadas();
    }
};

function alertaBoletoRelacionado() {
    desabilitaTodosPanels();

    exibirEsconderPaineis("cardConfirmacaoBoletoRelacionado", "block");
};

function verificaEntregasRelacionadas() {
    if (vNFProcessamento.LG_POSSUI_PROGRAMACAO_ENTREGA === true) {
        alertaEntregaRelacionada();
    }
    else {
        exibeJustificativa();
    }
};

function alertaEntregaRelacionada() {
    desabilitaTodosPanels();

    exibirEsconderPaineis("cardConfirmacaoEntregaRelacionada", "block");
};

function exibeJustificativa() {
    desabilitaTodosPanels();

    exibirEsconderPaineis("cardCabecalho", "block");
    exibirEsconderPaineis("cardJustificativa", "block");

    oTxtJustificativa.focus();
};

function exibeParametrosProcessamento() {
    oTxtJustificativaContainer.dxValidator(vTxtJustificativaValidationRules);

    const result = DevExpress.validationEngine.validateGroup("Justificativa");

    if (result.isValid) {
        oTxtJustificativaContainer.dxValidator(vEmptyValidationRules);

        desabilitaTodosPanels();

        exibirEsconderPaineis("cardCabecalho", "block");

        oLoadPanel.show();

        var vParametrosConsulta = JSON.stringify({
            CD_FILIAL: vNFProcessamento.CD_FILIAL,
            NR_CONTROLE: vNFProcessamento.NR_CONTROLE
        });

        //CONSULTA DADOS DA NOTA FISCAL
        $.ajax({
            type: "POST",
            url: "/NotaFiscal/ConsultaNotaFiscalCancelamento",
            data: { pParameters: vParametrosConsulta },
            success: function (responseData) {
                oLoadPanel.hide();

                if (typeof responseData == "string") {
                    exibeMensagem("error", "Erro ao consultar os dados da nota fiscal", responseData);
                    inicio();
                } else {
                    //ATUALIZA OS DADOS DA NOTA QUE ESTÁ SERÁ PROCESSADA
                    vNFProcessamento.CD_SITUACAO_NF = responseData.Cd_Situacao_NF;
                    vNFProcessamento.LG_FORA_PRAZO_CANCELAMENTO = responseData.Lg_Fora_Prazo_Cancelamento;
                    vNFProcessamento.LG_POSSUI_BOLETO = responseData.Lg_Possui_Boleto;
                    vNFProcessamento.LG_POSSUI_PROGRAMACAO_ENTREGA = responseData.Lg_Possui_Programacao_Entrega;
                    vNFProcessamento.LG_MOVIMENTO_POSSUI_OUTRAS_NOTAS = responseData.Lg_Movimento_Possui_Outras_Notas;
                    vNFProcessamento.LG_POSSUI_FATURAMENTO_ATIVO = responseData.Lg_Possui_Faturamento_Ativo;
                    vNFProcessamento.LG_NATUREZA_OPERACAO_MOVIMENTA_ESTOQUE = responseData.Lg_Natureza_Operacao_Movimenta_Estoque;
                    vNFProcessamento.LG_NATUREZA_OPERACAO_GERA_FINANCEIRO = responseData.Lg_Natureza_Operacao_Gera_Financeiro;

                    //VERIFICA A SITUAÇÃO ATUAL DA NOTA FISCAL
                    switch (vNFProcessamento.CD_SITUACAO_NF) {
                        case 2:
                        case 6:
                            if (vNFProcessamento.LG_MOVIMENTO_POSSUI_OUTRAS_NOTAS == true) {
                                oChkCancelarFaturamento.option("readOnly", true);

                                oLblAcoesAdicionaisProcessamento.innerHTML = "<h4 style='display: inline; width: 20px;' class='mb-0 mt-0 ml-0'><i class='fa fa-exclamation-triangle'></i></h4>&nbsp;<div>O faturamento relacionado a esta nota fiscal também está ligado a outras notas fiscais. Não será possível selecionar ações adicionais.<br />Para continuar clique em Avançar</div>";
                                oLblAcoesAdicionaisProcessamento.style.color = "#D2322D";
                            }
                            else if (vNFProcessamento.LG_POSSUI_FATURAMENTO_ATIVO == false) {
                                oChkCancelarFaturamento.option("readOnly", true);

                                oLblAcoesAdicionaisProcessamento.innerHTML = "Esta Nota Fiscal não possui um faturamento relacionado. Não será possível selecionar ações adicionais.<br />Para continuar clique em Avançar";
                                oLblAcoesAdicionaisProcessamento.style.color = "#D2322D";
                            }
                            else {
                                oChkCancelarFaturamento.option("readOnly", false);

                                if (vNFProcessamento.CD_SITUACAO_NF == 2) {
                                    oLblAcoesAdicionaisProcessamento.innerHTML = "Além de Cancelar a Nota Fiscal, você pode selecionar abaixo opções adicionais caso você queira também cancelar o Faturamento ou Pedido de Venda relacionados a esta Nota.";
                                    oLblAcoesAdicionaisProcessamento.style.color = "black";
                                }
                                else {
                                    oLblAcoesAdicionaisProcessamento.innerHTML = "Além de Inutilizar a Nota Fiscal, você pode selecionar abaixo opções adicionais caso você queira também cancelar o Faturamento ou Pedido de Venda relacionados a esta Nota.";
                                    oLblAcoesAdicionaisProcessamento.style.color = "black";
                                }
                            }
                            break;
                        case 3:
                            exibeMensagem("error", "Operação inválida", "Esta nota fiscal já está cancelada");
                            inicio();
                            break;
                        case 7:
                            exibeMensagem("error", "Operação inválida", "Não é possível cancelar uma nota fiscal que está denegada");
                            inicio();
                            break;
                        default:
                            exibeMensagem("error", "Operação inválida", "Não é possível cancelar ou inutilizar esta nota fiscal");
                            inicio();
                            break;
                    }

                    exibirEsconderPaineis("cardParametrosProcessamento", "block");
                }
            },
            fail: function (responseData) {
                oLoadPanel.hide();
                exibeMensagem("error", "Erro ao consultar os dados da nota fiscal", responseData);
                inicio();
            }
        });
    } else {
        DevExpress.ui.notify({
            message: "Por favor, verifique o preenchimento dos campos obrigatórios.",
            type: "error",
            displayTime: 5000
        });
    };
};

function exibeResumoProcessamento() {
    desabilitaTodosPanels();

    switch (vNFProcessamento.CD_SITUACAO_NF) {
        case 2:
        case 6:
            if (vNFProcessamento.LG_FORA_PRAZO_CANCELAMENTO == true) {
                exibirEsconderPaineis("cardResumoNotaFiscalForaPrazo", "block");
            }

            if (vNFProcessamento.LG_POSSUI_BOLETO == true) {
                exibirEsconderPaineis("cardResumoBoletosRelacionados", "block");
            }

            if (vNFProcessamento.LG_POSSUI_PROGRAMACAO_ENTREGA == true) {
                exibirEsconderPaineis("cardResumoEntregasRelacionadas", "block");
            }

            vNrEtapaProcessamento = 0;

            dsEtapasProcessamento = [
                {
                    "Nr_Ordem": vNrEtapaProcessamento,
                    "Ds_Etapa": "Nota Fiscal",
                    "Ds_Resultado": "",
                    "Ds_Imagem": "/img/iconeNaoRealizado.png",
                    "Ds_Tarefa": "Transmitir arquivo de " + (vNFProcessamento.CD_SITUACAO_NF == 2 ? "cancelamento" : "inutilização") + " à SEFAZ",
                },
            ];

            if (vNFProcessamento.LG_POSSUI_FATURAMENTO_ATIVO == true) {
                if (oChkCancelarFaturamento.option("value") == true) {
                    vNrEtapaProcessamento += 1;

                    dsEtapasProcessamento.push(
                        { "Nr_Ordem": vNrEtapaProcessamento, "Ds_Etapa": "Faturamento", "Ds_Resultado": "", "Ds_Imagem": "/img/iconeNaoRealizado.png", "Ds_Tarefa": "Cancelar faturamento dos pedidos relacionados com a nota", },
                    );

                    vNrEtapaProcessamento += 1;

                    dsEtapasProcessamento.push(
                        { "Nr_Ordem": vNrEtapaProcessamento, "Ds_Etapa": "Contas a Receber", "Ds_Resultado": "", "Ds_Imagem": "/img/iconeNaoRealizado.png", "Ds_Tarefa": "Cancelar títulos relacionados com o faturamento", },
                    );

                    if (oChkCancelarPedido.option("value") == true) {
                        vNrEtapaProcessamento += 1;

                        dsEtapasProcessamento.push(
                            { "Nr_Ordem": vNrEtapaProcessamento, "Ds_Etapa": "Pedido de Venda", "Ds_Resultado": "", "Ds_Imagem": "/img/iconeNaoRealizado.png", "Ds_Tarefa": "Cancelar pedidos relacionados com a nota", },
                        );

                        vNrEtapaProcessamento += 1;

                        dsEtapasProcessamento.push(
                            { "Nr_Ordem": vNrEtapaProcessamento, "Ds_Etapa": "Estoque", "Ds_Resultado": "", "Ds_Imagem": "/img/iconeNaoRealizado.png", "Ds_Tarefa": "Estornar estoque dos pedidos", },
                        );
                    }
                    else {
                        vNrEtapaProcessamento += 1;

                        dsEtapasProcessamento.push(
                            { "Nr_Ordem": vNrEtapaProcessamento, "Ds_Etapa": "Pedido de Venda", "Ds_Resultado": "", "Ds_Imagem": "/img/iconeNaoRealizado.png", "Ds_Tarefa": "Retornar pedidos relacionados com a nota para aguardar novo faturamento", },
                        );

                        vNrEtapaProcessamento += 1;

                        dsEtapasProcessamento.push(
                            { "Nr_Ordem": vNrEtapaProcessamento, "Ds_Etapa": "Estoque", "Ds_Resultado": "", "Ds_Imagem": "/img/iconeNaoRealizado.png", "Ds_Tarefa": "Refazer reserva do estoque dos pedidos", },
                        );
                    }
                }
                else {
                    vNrEtapaProcessamento += 1;

                    dsEtapasProcessamento.push(
                        { "Nr_Ordem": vNrEtapaProcessamento, "Ds_Etapa": "Faturamento", "Ds_Resultado": "", "Ds_Imagem": "/img/iconeNaoRealizado.png", "Ds_Tarefa": "Libera produtos para emissão de nova nota", },
                    );
                }
            }
            else {
                switch (vNFProcessamento.CD_ORIGEM_CONFECCAO) {
                    case "P":
                    case "F":
                    case "A":
                        break;
                    default:
                        if (vNFProcessamento.LG_NATUREZA_OPERACAO_GERA_FINANCEIRO == true) {
                            vNrEtapaProcessamento += 1;

                            dsEtapasProcessamento.push(
                                { "Nr_Ordem": vNrEtapaProcessamento, "Ds_Etapa": "Financeiro", "Ds_Resultado": "", "Ds_Imagem": "/img/iconeNaoRealizado.png", "Ds_Tarefa": "Cancelar títulos relacionados com a nota fiscal", },
                            );
                        }

                        if (vNFProcessamento.LG_NATUREZA_OPERACAO_MOVIMENTA_ESTOQUE == true) {
                            vNrEtapaProcessamento += 1;

                            dsEtapasProcessamento.push(
                                { "Nr_Ordem": vNrEtapaProcessamento, "Ds_Etapa": "Estoque", "Ds_Resultado": "", "Ds_Imagem": "/img/iconeNaoRealizado.png", "Ds_Tarefa": "Estornar estoque", },
                            );
                        }

                        break;
                };
            }

            oLblTituloResumoProcessamento.innerText = "RESUMO PARA " + (vNFProcessamento.CD_SITUACAO_NF == 2 ? "CANCELAMENTO" : "INUTILIZAÇÃO") + " DA NOTA FISCAL";
            oLglNFProcessamento.innerText = "Nota Fiscal: " + vNFProcessamento.NR_NOTA_FISCAL;

            oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

            exibirEsconderPaineis("cardEtapasProcessamento", "block");
            exibirEsconderPaineis("cardResumoProcessamento", "block");
            exibirEsconderPaineis("cardResumoProcessamentoBotoes2", "block");

            oBtnEtapasProcessamentoVoltar.disabled = false;

            vQtEtapasProcessamento = vNrEtapaProcessamento;

            break;
        case 3:
            exibeMensagem("error", "Operação inválida", "Esta nota fiscal já está cancelada");
            inicio();
            break;
        case 7:
            exibeMensagem("error", "Operação inválida", "Não é possível cancelar uma nota fiscal que está denegada");
            inicio();
            break;
        default:
            exibeMensagem("error", "Operação inválida", "Não é possível cancelar ou inutilizar esta nota fiscal");
            inicio();
            break;
    };
};

function voltarUltimaEtapa() {
    if (vErroEtapaProcessamento == false) {
        exibeParametrosProcessamento();
    }
    else {
        inicio();
    }
};

function concluirProcessamento() {
    removerComAnimacao("cardResumoNotaFiscalForaPrazo");
    removerComAnimacao("cardResumoBoletosRelacionados");
    removerComAnimacao("cardResumoEntregasRelacionadas");

    exibirEsconderPaineis("cardResumoProcessamentoBotoes2", "none");

    oBtnEtapasProcessamentoVoltar.disabled = true;

    rolarTopo();

    setTimeout(() => {
        cancelaNotaFiscal();
    }, 500);
};

function cancelaNotaFiscal() {
    var vTipoCancelamento;

    if (oChkCancelarFaturamento.option("value") == true && oChkCancelarPedido.option("value") == true) {
        vTipoCancelamento = "FP";
    }
    else if (oChkCancelarFaturamento.option("value") == true) {
        vTipoCancelamento = "FX";
    }
    else {
        vTipoCancelamento = "XX";
    }

    var vParametrosProcessamento = {
        Cd_Filial: vNFProcessamento.CD_FILIAL,
        Nr_Controle: vNFProcessamento.NR_CONTROLE,
        NFNumero: { Nr_Nota_Fiscal: vNFProcessamento.NR_NOTA_FISCAL },
        Cd_Tipo_Cancelamento: vTipoCancelamento,
        Ds_Justificativa_Cancelamento: oTxtJustificativa.option("value")
    };

    var vParametrosDadosFilial = {
        Cd_Filial: vDadosFilial.CD_FILIAL,
        Cd_CNPJ: vDadosFilial.CD_CNPJ
    };

    vNrEtapaProcessamento = 0;

    for (vEtapa in dsEtapasProcessamento) {
        if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
            dsEtapasProcessamento[vEtapa].Ds_Resultado = "Em Processamento"
            dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeExecutando.png"
        }
    }

    oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

    //PROCEDIMENTO PARA CANCELAMENTO DA NOTA FISCAL
    $.ajax({
        type: "POST",
        url: "/NotaFiscal/CancelaNotaFiscal",
        data: { pNotaFiscal: vParametrosProcessamento, pNFDadosFilial: vParametrosDadosFilial },
        success: function (responseData) {
            if (responseData.result == "error") {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Erro"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeAlertaVermelho.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                vErroEtapaProcessamento = true;
                exibeMensagem("error", "Erro ao processar " + (vNFProcessamento.CD_SITUACAO_NF == 2 ? "o cancelamento" : "a inutilização") + " da nota fiscal", responseData.msg);
                processamentoConcluido();
            } else {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Concluído"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeConcluido.png"
                    }
                    else if (dsEtapasProcessamento[vEtapa].Nr_Ordem == (vNrEtapaProcessamento + 1).toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Em Processamento"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeExecutando.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                (async function () {
                    if (vNFProcessamento.LG_POSSUI_FATURAMENTO_ATIVO == true) {
                        //VERIFICA SE FOI SOLICITADO CANCELAMENTO DO FATURAMENTO
                        if (vTipoCancelamento.substring(0, 1) == "F") {
                            if (vErroEtapaProcessamento == false) {
                                await cancelaFaturamentos();
                            }

                            if (vErroEtapaProcessamento == false) {
                                await cancelaFinanceirosFaturamentos();
                            }

                            //VERIFICA SE FOI SOLICITADO CANCELAMENTO DO PEDIDO DE VENDA
                            if (vTipoCancelamento.substring(1, 2) == "P") {
                                if (vErroEtapaProcessamento == false) {
                                    await cancelaPedidos();
                                }

                                if (vErroEtapaProcessamento == false) {
                                    await estornaEstoquePedidos();
                                }
                            }
                            else {
                                if (vErroEtapaProcessamento == false) {
                                    await retornaPedidosParaFaturamento();
                                }

                                if (vErroEtapaProcessamento == false) {
                                    await refazReservaEstoquePedidos();
                                }
                            }
                        }
                        else {
                            if (vErroEtapaProcessamento == false) {
                                await liberaItensFaturamentos();
                            }
                        }
                    }
                    else {
                        switch (vNFProcessamento.CD_ORIGEM_CONFECCAO) {
                            case "P":
                            case "F":
                            case "A":
                                break;
                            default:
                                if (vNFProcessamento.LG_NATUREZA_OPERACAO_GERA_FINANCEIRO == true) {
                                    if (vErroEtapaProcessamento == false) {
                                        await cancelaFinanceiros();
                                    }
                                }

                                if (vNFProcessamento.LG_NATUREZA_OPERACAO_MOVIMENTA_ESTOQUE == true) {
                                    if (vErroEtapaProcessamento == false) {
                                        await estornaEstoque();
                                    }
                                }
                        };
                    }

                    processamentoConcluido();
                })();
            }
        },
        fail: function (responseData) {
            vErroEtapaProcessamento = true;
            exibeMensagem("error", "Erro ao processar " + (vNFProcessamento.CD_SITUACAO_NF == 2 ? "o cancelamento" : "a inutilização") + " da nota fiscal", responseData);
            processamentoConcluido();
        }
    });
};

function cancelaFaturamentos() {
    var deferred = new $.Deferred;

    var vParametrosProcessamento = {
        Cd_Filial: vNFProcessamento.CD_FILIAL,
        Nr_Controle: vNFProcessamento.NR_CONTROLE,
        NFNumero: { Nr_Nota_Fiscal: vNFProcessamento.NR_NOTA_FISCAL }
    };

    vNrEtapaProcessamento += 1;

    //PROCEDIMENTO PARA CANCELAMENTO DOS FATURAMENTOS RELACIONADOS COM A NOTA FISCAL
    $.ajax({
        type: "POST",
        url: "/NotaFiscal/CancelaFaturamentos",
        data: { pNotaFiscal: vParametrosProcessamento },
        success: function (responseData) {
            if (responseData.result == "error") {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Erro"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeAlertaVermelho.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                vErroEtapaProcessamento = true;
                exibeMensagem("error", "Erro ao cancelar os faturamentos relacionados com a nota fiscal", responseData.msg);
                deferred.reject();
            } else {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Concluído"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeConcluido.png"
                    }
                    else if (dsEtapasProcessamento[vEtapa].Nr_Ordem == (vNrEtapaProcessamento + 1).toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Em Processamento"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeExecutando.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                deferred.resolve();
            }
        },
        fail: function (responseData) {
            vErroEtapaProcessamento = true;
            exibeMensagem("error", "Erro ao cancelar os faturamentos relacionados com a nota fiscal", responseData);
            deferred.reject();
        }
    });

    return deferred.promise();
};

function cancelaFinanceirosFaturamentos() {
    var deferred = new $.Deferred;

    var vParametrosProcessamento = {
        Cd_Filial: vNFProcessamento.CD_FILIAL,
        Nr_Controle: vNFProcessamento.NR_CONTROLE,
        NFNumero: { Nr_Nota_Fiscal: vNFProcessamento.NR_NOTA_FISCAL }
    };

    vNrEtapaProcessamento += 1;

    //PROCEDIMENTO PARA CANCELAMENTO DOS LANÇAMENTOS FINANCEIROS DOS FATURAMENTOS RELACIONADOS COM A NOTA FISCAL
    $.ajax({
        type: "POST",
        url: "/NotaFiscal/CancelaFinanceirosFaturamentos",
        data: { pNotaFiscal: vParametrosProcessamento },
        success: function (responseData) {
            if (responseData.result == "error") {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Erro"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeAlertaVermelho.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                vErroEtapaProcessamento = true;
                exibeMensagem("error", "Erro ao cancelar os lançamentos financeiros relacionados com a nota fiscal", responseData.msg);
                deferred.reject();
            } else {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Concluído"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeConcluido.png"
                    }
                    else if (dsEtapasProcessamento[vEtapa].Nr_Ordem == (vNrEtapaProcessamento + 1).toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Em Processamento"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeExecutando.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                deferred.resolve();
            }
        },
        fail: function (responseData) {
            vErroEtapaProcessamento = true;
            exibeMensagem("error", "Erro ao cancelar os lançamentos financeiros relacionados com a nota fiscal", responseData);
            deferred.reject();
        }
    });

    return deferred.promise();
};

function cancelaPedidos() {
    var deferred = new $.Deferred;

    var vParametrosProcessamento = {
        Cd_Filial: vNFProcessamento.CD_FILIAL,
        Nr_Controle: vNFProcessamento.NR_CONTROLE,
        NFNumero: { Nr_Nota_Fiscal: vNFProcessamento.NR_NOTA_FISCAL }
    };

    vNrEtapaProcessamento += 1;

    //PROCEDIMENTO PARA CANCELAR OS PEDIDOS E REGISTRAR HISTÓRICO
    $.ajax({
        type: "POST",
        url: "/NotaFiscal/CancelaPedidos",
        data: { pNotaFiscal: vParametrosProcessamento },
        success: function (responseData) {
            if (responseData.result == "error") {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Erro"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeAlertaVermelho.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                vErroEtapaProcessamento = true;
                exibeMensagem("error", "Erro ao cancelar os pedidos de venda relacionados com a nota fiscal", responseData.msg);
                deferred.reject();
            } else {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Concluído"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeConcluido.png"
                    }
                    else if (dsEtapasProcessamento[vEtapa].Nr_Ordem == (vNrEtapaProcessamento + 1).toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Em Processamento"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeExecutando.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                deferred.resolve();
            }
        },
        fail: function (responseData) {
            vErroEtapaProcessamento = true;
            exibeMensagem("error", "Erro ao cancelar os pedidos de venda relacionados com a nota fiscal", responseData);
            deferred.reject();
        }
    });

    return deferred.promise();
};

function estornaEstoquePedidos() {
    var deferred = new $.Deferred;

    var vParametrosProcessamento = {
        Cd_Filial: vNFProcessamento.CD_FILIAL,
        Nr_Controle: vNFProcessamento.NR_CONTROLE,
        NFNumero: { Nr_Nota_Fiscal: vNFProcessamento.NR_NOTA_FISCAL }
    };

    vNrEtapaProcessamento += 1;

    //PROCEDIMENTO PARA ESTORNAR ESTOQUE DOS PEDIDOS DE VENDA RELACIONADOS COM A NOTA FISCAL
    $.ajax({
        type: "POST",
        url: "/NotaFiscal/EstornaEstoquePedidos",
        data: { pNotaFiscal: vParametrosProcessamento },
        success: function (responseData) {
            if (responseData.result == "error") {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Erro"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeAlertaVermelho.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                vErroEtapaProcessamento = true;
                exibeMensagem("error", "Erro ao cancelar os pedidos de venda relacionados com a nota fiscal", responseData.msg);
                deferred.reject();
            } else {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Concluído"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeConcluido.png"
                    }
                    else if (dsEtapasProcessamento[vEtapa].Nr_Ordem == (vNrEtapaProcessamento + 1).toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Em Processamento"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeExecutando.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                deferred.resolve();
            }
        },
        fail: function (responseData) {
            vErroEtapaProcessamento = true;
            exibeMensagem("error", "Erro ao cancelar os pedidos de venda relacionados com a nota fiscal", responseData);
            deferred.reject();
        }
    });

    return deferred.promise();
};

function retornaPedidosParaFaturamento() {
    var deferred = new $.Deferred;

    var vParametrosProcessamento = {
        Cd_Filial: vNFProcessamento.CD_FILIAL,
        Nr_Controle: vNFProcessamento.NR_CONTROLE,
        NFNumero: { Nr_Nota_Fiscal: vNFProcessamento.NR_NOTA_FISCAL }
    };

    vNrEtapaProcessamento += 1;

    //PROCEDIMENTO PARA RETORNAR OS PEDIDOS PARA AGUARDANDO FATURAMENTO E REGISTRAR HISTÓRICO
    $.ajax({
        type: "POST",
        url: "/NotaFiscal/RetornaPedidosParaFaturamento",
        data: { pNotaFiscal: vParametrosProcessamento },
        success: function (responseData) {
            if (responseData.result == "error") {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Erro"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeAlertaVermelho.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                vErroEtapaProcessamento = true;
                exibeMensagem("error", "Erro ao cancelar os pedidos de venda relacionados com a nota fiscal", responseData.msg);
                deferred.reject();
            } else {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Concluído"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeConcluido.png"
                    }
                    else if (dsEtapasProcessamento[vEtapa].Nr_Ordem == (vNrEtapaProcessamento + 1).toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Em Processamento"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeExecutando.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                deferred.resolve();
            }
        },
        fail: function (responseData) {
            vErroEtapaProcessamento = true;
            exibeMensagem("error", "Erro ao cancelar os pedidos de venda relacionados com a nota fiscal", responseData);
            deferred.reject();
        }
    });

    return deferred.promise();
};

function refazReservaEstoquePedidos() {
    var deferred = new $.Deferred;

    var vParametrosProcessamento = {
        Cd_Filial: vNFProcessamento.CD_FILIAL,
        Nr_Controle: vNFProcessamento.NR_CONTROLE,
        NFNumero: { Nr_Nota_Fiscal: vNFProcessamento.NR_NOTA_FISCAL }
    };

    vNrEtapaProcessamento += 1;

    //PROCEDIMENTO PARA REFAZER A RESERVA DE ESTOQUE DOS PEDIDOS DE VENDA RELACIONADOS COM A NOTA FISCAL
    $.ajax({
        type: "POST",
        url: "/NotaFiscal/RefazReservaEstoquePedidos",
        data: { pNotaFiscal: vParametrosProcessamento },
        success: function (responseData) {
            if (responseData.result == "error") {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Erro"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeAlertaVermelho.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                vErroEtapaProcessamento = true;
                exibeMensagem("error", "Erro ao cancelar os pedidos de venda relacionados com a nota fiscal", responseData.msg);
                deferred.reject();
            } else {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Concluído"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeConcluido.png"
                    }
                    else if (dsEtapasProcessamento[vEtapa].Nr_Ordem == (vNrEtapaProcessamento + 1).toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Em Processamento"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeExecutando.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                deferred.resolve();
            }
        },
        fail: function (responseData) {
            vErroEtapaProcessamento = true;
            exibeMensagem("error", "Erro ao cancelar os pedidos de venda relacionados com a nota fiscal", responseData);
            deferred.reject();
        }
    });

    return deferred.promise();
};

function liberaItensFaturamentos() {
    var deferred = new $.Deferred;

    var vParametrosProcessamento = {
        Cd_Filial: vNFProcessamento.CD_FILIAL,
        Nr_Controle: vNFProcessamento.NR_CONTROLE,
        NFNumero: { Nr_Nota_Fiscal: vNFProcessamento.NR_NOTA_FISCAL }
    };

    vNrEtapaProcessamento += 1;

    //PROCEDIMENTO PARA LIBERAR OS ITENS DOS FATURAMENTOS PARA EMISSÃO DE NOVAS NOTAS
    $.ajax({
        type: "POST",
        url: "/NotaFiscal/LiberaItensFaturamentos",
        data: { pNotaFiscal: vParametrosProcessamento },
        success: function (responseData) {
            if (responseData.result == "error") {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Erro"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeAlertaVermelho.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                vErroEtapaProcessamento = true;
                exibeMensagem("error", "Erro ao cancelar os faturamentos relacionados com a nota fiscal", responseData.msg);
                deferred.reject();
            } else {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Concluído"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeConcluido.png"
                    }
                    else if (dsEtapasProcessamento[vEtapa].Nr_Ordem == (vNrEtapaProcessamento + 1).toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Em Processamento"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeExecutando.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                deferred.resolve();
            }
        },
        fail: function (responseData) {
            vErroEtapaProcessamento = true;
            exibeMensagem("error", "Erro ao cancelar os faturamentos relacionados com a nota fiscal", responseData);
            deferred.reject();
        }
    });

    return deferred.promise();
};

function cancelaFinanceiros() {
    var deferred = new $.Deferred;

    var vParametrosProcessamento = {
        Cd_Filial: vNFProcessamento.CD_FILIAL,
        Nr_Controle: vNFProcessamento.NR_CONTROLE,
        NFNumero: { Nr_Nota_Fiscal: vNFProcessamento.NR_NOTA_FISCAL }
    };

    vNrEtapaProcessamento += 1;

    //PROCEDIMENTO PARA CANCELAR OS LANÇAMENTOS FINANCEIROS RELACIONADOS DIRETAMENTE COM A NOTA
    $.ajax({
        type: "POST",
        url: "/NotaFiscal/CancelaFinanceiros",
        data: { pNotaFiscal: vParametrosProcessamento },
        success: function (responseData) {
            if (responseData.result == "error") {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Erro"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeAlertaVermelho.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                vErroEtapaProcessamento = true;
                exibeMensagem("error", "Erro ao cancelar os faturamentos relacionados com a nota fiscal", responseData.msg);
                deferred.reject();
            } else {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Concluído"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeConcluido.png"
                    }
                    else if (dsEtapasProcessamento[vEtapa].Nr_Ordem == (vNrEtapaProcessamento + 1).toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Em Processamento"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeExecutando.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                deferred.resolve();
            }
        },
        fail: function (responseData) {
            vErroEtapaProcessamento = true;
            exibeMensagem("error", "Erro ao cancelar os faturamentos relacionados com a nota fiscal", responseData);
            deferred.reject();
        }
    });

    return deferred.promise();
};

function estornaEstoque() {
    var deferred = new $.Deferred;

    var vParametrosProcessamento = {
        Cd_Filial: vNFProcessamento.CD_FILIAL,
        Nr_Controle: vNFProcessamento.NR_CONTROLE,
        NFNumero: { Nr_Nota_Fiscal: vNFProcessamento.NR_NOTA_FISCAL }
    };

    vNrEtapaProcessamento += 1;

    //PROCEDIMENTO PARA CANCELAR OS LANÇAMENTOS FINANCEIROS RELACIONADOS DIRETAMENTE COM A NOTA
    $.ajax({
        type: "POST",
        url: "/NotaFiscal/EstornaEstoque",
        data: { pNotaFiscal: vParametrosProcessamento },
        success: function (responseData) {
            if (responseData.result == "error") {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Erro"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeAlertaVermelho.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                vErroEtapaProcessamento = true;
                exibeMensagem("error", "Erro ao cancelar os faturamentos relacionados com a nota fiscal", responseData.msg);
                deferred.reject();
            } else {
                for (vEtapa in dsEtapasProcessamento) {
                    if (dsEtapasProcessamento[vEtapa].Nr_Ordem == vNrEtapaProcessamento.toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Concluído"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeConcluido.png"
                    }
                    else if (dsEtapasProcessamento[vEtapa].Nr_Ordem == (vNrEtapaProcessamento + 1).toString()) {
                        dsEtapasProcessamento[vEtapa].Ds_Resultado = "Em Processamento"
                        dsEtapasProcessamento[vEtapa].Ds_Imagem = "/img/iconeExecutando.png"
                    }
                }

                oGridEtapasProcessamento.option("dataSource", dsEtapasProcessamento);

                deferred.resolve();
            }
        },
        fail: function (responseData) {
            vErroEtapaProcessamento = true;
            exibeMensagem("error", "Erro ao cancelar os faturamentos relacionados com a nota fiscal", responseData);
            deferred.reject();
        }
    });

    return deferred.promise();
};

function processamentoConcluido() {
    setTimeout(() => {
        if (vErroEtapaProcessamento == false) {
            abrirModal("#ModalOperacaoConcluida");
        }
        else {
            oBtnEtapasProcessamentoVoltar.disabled = false;
        }

    }, 500);
};

function validaCertificadoFilial() {
    //VERIFICA A SITUAÇÃO ATUAL DA NOTA FISCAL
    switch (vNFProcessamento.CD_SITUACAO_NF) {
        case 2:
        case 6:
            oLoadPanel.show();

            var vParametrosConsulta = JSON.stringify({
                CD_FILIAL: vNFProcessamento.CD_FILIAL
            });

            //VALIDA CERTIFICADO E RETORNA DADOS DA FILIAL
            $.ajax({
                type: "POST",
                url: "/NotaFiscal/BuscaDadosCertificadoFilial",
                data: { pNFDadosFilial: vParametrosConsulta },
                success: function (responseData) {
                    oLoadPanel.hide();

                    if (typeof responseData == "string") {
                        exibeMensagem("error", "Erro ao buscar informações para validação do certificado", responseData);
                        inicio();
                    } else {
                        //PREENCHE OS DADOS DA FILIAL
                        vDadosFilial.CD_FILIAL = responseData.Cd_Filial;
                        vDadosFilial.DS_RAZAO_SOCIAL = responseData.Ds_Razao_Social;
                        vDadosFilial.CD_CNPJ = responseData.Cd_CNPJ;
                        vDadosFilial.LG_POSSUI_CERTIFICADO = responseData.Lg_Possui_Certificado;
                        vDadosFilial.LG_POSSUI_SENHA_CERTIFICADO = responseData.Lg_Possui_Senha_Certificado;
                        vDadosFilial.DT_VENCIMENTO_CERTIFICADO = responseData.Dt_Vencimento_Certificado;
                        vDadosFilial.QT_DIAS_VENCIMENTO_CERTIFICADO = responseData.Qt_Dias_Vencimento_Certificado;

                        var vCNPJFormatado = formataCPFCNPJ(vDadosFilial.CD_CNPJ);

                        document.getElementById("lblCNPJFilialSemCert").innerText = vCNPJFormatado;
                        document.getElementById("lblCNPJFilialCert30Dias").innerText = vCNPJFormatado;
                        document.getElementById("lblCNPJFilialCertVencido").innerText = vCNPJFormatado;
                        document.getElementById("lblCNPJFilialUpload").innerText = vCNPJFormatado;
                        document.getElementById("lblCNPJFilialSenha").innerText = vCNPJFormatado;
                        document.getElementById("lblRazaoSocialFilialSemCert").innerText = vDadosFilial.DS_RAZAO_SOCIAL;
                        document.getElementById("lblRazaoSocialFilialCert30Dias").innerText = vDadosFilial.DS_RAZAO_SOCIAL;
                        document.getElementById("lblRazaoSocialFilialCertVencido").innerText = vDadosFilial.DS_RAZAO_SOCIAL;
                        document.getElementById("lblRazaoSocialFilialUpload").innerText = vDadosFilial.DS_RAZAO_SOCIAL;
                        document.getElementById("lblRazaoSocialFilialSenha").innerText = vDadosFilial.DS_RAZAO_SOCIAL;
                        document.getElementById("lblNumeroNFUploadConcluido").innerText = "NF-e " + vNFProcessamento.NR_NOTA_FISCAL;
                        document.getElementById("lblMensagemUploadConcluido").innerText = vNFProcessamento.CD_SITUACAO_NF == 2 ? "Agora você pode processuir com o cancelamento da" : "Agora você pode processuir com a inutilização da";

                        document.getElementById("lblMensagemCertificadoVencido").innerText = "O CERTIFICADO DIGITAL DESTA FILIAL VENCEU EM " + (vDadosFilial.DT_VENCIMENTO_CERTIFICADO == null ? "" : vDadosFilial.DT_VENCIMENTO_CERTIFICADO.replace(/(\d*)-(\d*)-(\d*).*/, "$3/$2/$1"));
                        document.getElementById("lblMensagemCertificado30Dias").innerText = "O CERTIFICADO DIGITAL DESTA FILIAL VENCE EM " + (vDadosFilial.QT_DIAS_VENCIMENTO_CERTIFICADO == 1 ? "1 DIA" : vDadosFilial.QT_DIAS_VENCIMENTO_CERTIFICADO.toString() + " DIAS");

                        if (vDadosFilial.LG_POSSUI_CERTIFICADO == false || vDadosFilial.LG_POSSUI_SENHA_CERTIFICADO == false) {
                            desabilitaTodosPanels();

                            exibirEsconderPaineis("cardCertificadoFilial", "block");
                            exibirEsconderPaineis("cardSemCertificado", "block");
                        }
                        else if (vDadosFilial.QT_DIAS_VENCIMENTO_CERTIFICADO < 0) {
                            desabilitaTodosPanels();

                            exibirEsconderPaineis("cardCertificadoFilial", "block");
                            exibirEsconderPaineis("cardCertificadoVencido", "block");
                        }
                        else if (vDadosFilial.QT_DIAS_VENCIMENTO_CERTIFICADO < 30) {
                            desabilitaTodosPanels();

                            exibirEsconderPaineis("cardCertificadoFilial", "block");
                            exibirEsconderPaineis("cardCertificado30Dias", "block");
                        }
                        else {
                            verificaPrazoCancelamento();
                        }
                    }
                },
                fail: function (responseData) {
                    oLoadPanel.hide();
                    exibeMensagem("error", "Erro ao buscar informações para validação do certificado", responseData);
                    inicio();
                }
            });

            break;
        default:
            verificaPrazoCancelamento();

            break;
    };
};

function uploadCertificado() {
    desabilitaTodosPanels();

    oUploadProgress.option("visible", false);
    oUploadProgress.reset();
    oFileUploader.reset();

    exibirEsconderPaineis("cardUploadCertificado", "block");
};

function uploadCertificadoSenha() {
    desabilitaTodosPanels();

    exibirEsconderPaineis("cardUploadCertificadoSenha", "block");
};

function uploadCertificadoConcluido() {
    const result = validarCamposSenhaCertificado();

    if (result == true) {
        var vParametrosGravacao = JSON.stringify({
            Cd_Filial: vDadosFilial.CD_FILIAL,
            Cd_CNPJ: vDadosFilial.CD_CNPJ,
            Cd_PIN_Certificado: oTxtSenhaCertificado.option("value")
        });

        oLoadPanel.show();

        //PROCEDIMENTO PARA REGISTRAR NO BANCO DE DADOS A SENHA DO CERTIFICADO
        $.ajax({
            type: "POST",
            url: "/NotaFiscal/GravaPINCertificado",
            data: { pNFDadosFilial: vParametrosGravacao },
            success: function (responseData) {
                oLoadPanel.hide();

                if (responseData.result == "error") {
                    exibeMensagem("error", "Erro ao registrar a senha do certificado", responseData.msg);
                } else if (responseData.result == "pinError") {
                    exibeMensagem("error", "Senha do certificado inválida", "A senha do certificado está incorreta ou não pode ser validada");
                } else {
                    oTxtSenhaCertificado.reset();
                    oTxtSenhaCertificadoConfirmacao.reset();

                    desabilitaTodosPanels();

                    exibirEsconderPaineis("cardUploadCertificadoConcluido", "block");
                }
            },
            fail: function (responseData) {
                oLoadPanel.hide();

                exibeMensagem("error", "Erro ao registrar a senha do certificado", responseData);
            }
        });
    }
};

function validarCamposSenhaCertificado() {
    var senhaCertificado = oTxtSenhaCertificado.option("value");
    var senhaCertificadoConfirmacao = oTxtSenhaCertificadoConfirmacao.option("value");

    oTxtSenhaCertificadoContainer.dxValidator(vTxtSenhaCertificadoValidationRules);
    oTxtSenhaCertificadoConfirmacaoContainer.dxValidator(vTxtSenhaCertificadoConfirmacaoValidationRules);

    const resultadoValidacaoSenhaCertificado = DevExpress.validationEngine.validateGroup("SenhaCertificado");

    if (resultadoValidacaoSenhaCertificado.isValid == false) {
        DevExpress.ui.notify({
            message: "É necessário informar a senha do certificado e a confirmação.",
            type: "error",
            displayTime: 5000,
        });
        return false;
    } else if (senhaCertificado !== senhaCertificadoConfirmacao) {
        DevExpress.ui.notify({
            message: "A confirmação é diferente da senha informada.",
            type: "error",
            displayTime: 5000,
        });
        return false;
    } else {
        oTxtSenhaCertificadoContainer.dxValidator(vEmptyValidationRules);
        oTxtSenhaCertificadoConfirmacaoContainer.dxValidator(vEmptyValidationRules);

        return true;
    };
};

function formataCPFCNPJ(pCPFCNPJ) {
    var vCPFCNPJFormatado = "";

    if (pCPFCNPJ == undefined || pCPFCNPJ == null) {
        return "";
    }
    else if (pCPFCNPJ.length == 14) {
        vCPFCNPJFormatado += pCPFCNPJ.substring(0, 2);
        vCPFCNPJFormatado += ".";
        vCPFCNPJFormatado += pCPFCNPJ.substring(2, 5);
        vCPFCNPJFormatado += ".";
        vCPFCNPJFormatado += pCPFCNPJ.substring(5, 8);
        vCPFCNPJFormatado += "/";
        vCPFCNPJFormatado += pCPFCNPJ.substring(8, 12);
        vCPFCNPJFormatado += "-";
        vCPFCNPJFormatado += pCPFCNPJ.substring(12);
    }
    else if (pCPFCNPJ.length == 11) {
        vCPFCNPJFormatado += pCPFCNPJ.substring(0, 3);
        vCPFCNPJFormatado += ".";
        vCPFCNPJFormatado += pCPFCNPJ.substring(3, 6);
        vCPFCNPJFormatado += ".";
        vCPFCNPJFormatado += pCPFCNPJ.substring(6, 9);
        vCPFCNPJFormatado += "-";
        vCPFCNPJFormatado += pCPFCNPJ.substring(9);
    }
    else {
        vCPFCNPJFormatado += pCPFCNPJ;
    }

    return vCPFCNPJFormatado;
};

function toggleDropZoneActive(pDropZone, pIsActive) {
    if (pIsActive) {
        pDropZone.classList.add("dx-theme-accent-as-border-color");
        pDropZone.classList.remove("dx-theme-border-color");
        pDropZone.classList.add("dropzone-active");
    } else {
        pDropZone.classList.remove("dx-theme-accent-as-border-color");
        pDropZone.classList.add("dx-theme-border-color");
        pDropZone.classList.remove("dropzone-active");
    }
};

function menuInicial() {
    desabilitaTodosPanels();

    carregaPermissoesUsuarioLogado();

    exibirEsconderPaineis("cardCabecalho", "block");
    exibirEsconderPaineis("cardMenu", "block");
    exibirEsconderPaineis("cardAlertaContabilidade", "block");
    rolarTopo();
}

function cancelamentoNF() {
    if (oPermissoesUsuario.Nr_Nivel_Acesso == 1 || oPermissoesUsuario.Lg_Cancela_Nota_Fiscal == true) {
        desabilitaTodosPanels();

        exibirEsconderPaineis("cardCabecalho", "block");
        exibirEsconderPaineis("cardConsultaGeralFiltro", "block");
        exibirEsconderPaineis("cardConsultaGeralGrid", "block");
        rolarTopo();

        carregaNotasFiscais();
    } else {
        popupAcessoNegado.show();
    }
}

function donwloadXML() {
    if (oPermissoesUsuario.Nr_Nivel_Acesso == 1 || oPermissoesUsuario.Lg_Download_Arquivo_XML_Cancelamento == true) {
        desabilitaTodosPanels();

        oLoadPanel.show();

        exibirEsconderPaineis("cardCabecalho", "block");
        exibirEsconderPaineis("cardDonwloadXML", "block");
        rolarTopo();

        oFileManager = null;

        //PROCEDIMENTO PARA BUSCAS AS PASTAS E ARQUIVOS DISPONÍVEIS PARA DOWNLOAD
        $.ajax({
            type: "POST",
            url: "/NotaFiscal/BuscaArquivosNF",
            data: { },
            success: function (responseData) {
                oLoadPanel.hide();

                if (responseData.result == "error") {
                    exibeMensagem("error", "Erro ao buscar informações sobre os arquivos para download", responseData.msg);
                } else {
                    oFileManager = $("#fileManager").dxFileManager({
                        name: "fileManager",
                        fileSystemProvider: responseData.data,
                        rootFolderName: "Arquivos XML",
                        itemView: {
                            mode: "details",
                            showFolders: false,
                            showParentFolder: false,
                        },
                        height: 400,
                        currentPath: "",
                        permissions: {
                            create: false,
                            copy: false,
                            move: false,
                            delete: false,
                            rename: false,
                            upload: false,
                            download: true,
                        },
                        customizeThumbnail(fileSystemItem) {
                            if (fileSystemItem.isDirectory) { return "images/thumbnails/folder.svg"; }

                            const fileExtension = fileSystemItem.getFileExtension();
                            switch (fileExtension) {
                                case ".docx":
                                    return "/img/icones-extensao-aplicativos/word.png";
                                case ".doc":
                                    return "/img/icones-extensao-aplicativos/word.png";
                                case ".xls":
                                    return "/img/icones-extensao-aplicativos/excel.png";
                                case ".xlsx":
                                    return "/img/icones-extensao-aplicativos/excel.png";
                                case ".pdf":
                                    return "/img/icones-extensao-aplicativos/pdf.png";
                                case ".xml":
                                    return "/img/icones-extensao-aplicativos/xml.png";
                                case ".jpg":
                                    return "/img/icones-extensao-aplicativos/imagens.png";
                                case ".jpeg":
                                    return "/img/icones-extensao-aplicativos/imagens.png";
                                case ".png":
                                    return "/img/icones-extensao-aplicativos/imagens.png";
                                case ".bmp":
                                    return "/img/icones-extensao-aplicativos/imagens.png";
                                case ".gif":
                                    return "/img/icones-extensao-aplicativos/imagens.png";
                                case ".rar":
                                    return "/img/icones-extensao-aplicativos/rar.png";
                                case ".rft":
                                    return "/img/icones-extensao-aplicativos/rft.png";
                                case ".zip":
                                    return "/img/icones-extensao-aplicativos/zip.png";
                                case ".txt":
                                    return "/img/icones-extensao-aplicativos/txt.png";
                                default:
                                    return "/img/icones-extensao-aplicativos/arquivo.png";
                            }
                        },
                        customizeDetailColumns: function (columns) {
                            columns[1].caption = "Nome"
                            columns[2].caption = "Data"
                            columns[3].caption = "Tamanho"

                            return columns;
                        },
                        allowedFileExtensions: [".rar", ".png", ".jpg", ".jpeg", ".bmp", ".gif", ".pdf", ".zip", ".xls", ".xlsx", ".doc", ".docx", ".rtf", ".txt", ".xml"],
                        toolbar: {
                            items: [
                                {
                                    widget: "dxMenu",
                                    location: "after",
                                    options: {
                                        items: [
                                            {
                                                icon: "refresh",
                                            },
                                        ],
                                        onItemClick: function (e) {
                                            donwloadXML();
                                        },
                                    },
                                },
                            ],
                            fileSelectionItems: [
                                {
                                    widget: "dxMenu",
                                    location: "before",
                                    options: {
                                        items: [
                                            {
                                                text: "Download",
                                                icon: "download",
                                            },
                                        ],
                                        onItemClick: function (e) {
                                            processaDownloadNF();
                                        },
                                    },
                                },
                                {
                                    widget: "dxMenu",
                                    location: "after",
                                    options: {
                                        items: [
                                            {
                                                icon: "refresh",
                                            },
                                        ],
                                        onItemClick: function (e) {
                                            donwloadXML();
                                        },
                                    },
                                },
                                {
                                    name: "clearSelection",
                                    text: "Limpar Seleção",
                                },
                            ],
                        },
                        onInitialized(e) {
                            new IntersectionObserver(entries => {
                                entries.forEach(entry => {
                                    if (entry.isIntersecting) {
                                        e.component.repaint();
                                    }
                                });
                            }).observe(e.element[0]);
                        },
                    }).dxFileManager("instance");
                }
            },
            fail: function (responseData) {
                oLoadPanel.hide();

                exibeMensagem("error", "Erro ao buscar informações sobre os arquivos para download", responseData);
            }
        });
    } else {
        popupAcessoNegado.show();
    }
}

function processaDownloadNF() {
    var selectedFiles = [];

    oFileManager.getSelectedItems().forEach(x => { selectedFiles.push(x.dataItem.path); });

    oLoadPanel.show();

    //PROCEDIMENTO PARA COMPACTAR ARQUIVOS E FAZER O DOWNLOAD
    var x = new XMLHttpRequest();
    x.open("GET", "/NotaFiscal/DownloadArquivosNF", true);
    x.responseType = "blob";
    x.setRequestHeader("pSelectedFiles", JSON.stringify(selectedFiles));
    x.onload = function (e) {
        oLoadPanel.hide();

        var contentDispo = e.currentTarget.getResponseHeader('Content-Disposition');
        var fileName = contentDispo.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1];
        download(e.currentTarget.response, fileName, "application/zip");
    };
    x.onerror = function (e) { oLoadPanel.hide(); }
    x.send();
}

function configuracoesUsuario() {
    if (oPermissoesUsuario.Nr_Nivel_Acesso == 1) {
        desabilitaTodosPanels();

        exibirEsconderPaineis('cardCabecalho', 'block');
        exibirEsconderPaineis('cardMenu', 'block');
        exibirEsconderPaineis('cardConfiguracoesUsuario', 'block');

        carregaUsuarios();
    } else {  
        popupAcessoNegado.show();
    }
}

function carregaPermissoesUsuarioLogado() {
    var vParametrosConsulta = JSON.stringify({
        Cd_Login: null
    });

    $.ajax({
        type: 'POST',
        url: "/NotaFiscal/CarregaPermissoesUsuarioNotaFiscalParametros",
        data: { pUsuarioParametroCancelamentoNotaFiscal: vParametrosConsulta },
        success: function (responseData) {
            oPermissoesUsuario = responseData;
        },
        fail: function (responseData) {
            oPermissoesUsuario = null;

            exibeMensagem("error", "Erro ao executar a consulta das configurações do usuário", responseData);
        }
    });
}

function salvarPermissoesUsuario() {
    var vParametrosPermissoes = JSON.stringify({
        Cd_Login: getComponentValue(oLkpUsuarioConfiguracoes, "dxLookup"),
        Lg_Cancela_Nota_Fiscal: oChkCancelaNotaFiscal.option('value'),
        Lg_Download_Arquivo_XML_Cancelamento: oChkDownloadArquivoXMLCancelamento.option('value'),
    });

    oLoadPanel.show();

    $.ajax({
        type: 'POST',
        url: "/NotaFiscal/SalvarPermissoesUsuarioNotaFiscalParametros",
        data: { pUsuarioParametroCancelamentoNotaFiscal: vParametrosPermissoes },
        success: function (responseData) {
            exibeMensagem("success", "Operação realizada!", "Permissão alterada com sucesso");

            oLoadPanel.hide();
        },
        fail: function (responseData) {
            exibeMensagem("error", "Erro ao executar a salvar as configurações para o usuário selecionado", responseData);

            oLoadPanel.hide();
        }
    });
}

function carregaPermissoesUsuarioSelecionado(pLogin, pCaminhoURLFoto) {
    var vParametrosConsulta = JSON.stringify({
        Cd_Login: pLogin
    });

    let vFotoAtual = pCaminhoURLFoto + '?' + new Date().getTime();

    var oImg = document.querySelector("#fotoUsuarioConfiguracoes");
    oImg.setAttribute("src", vFotoAtual);
    oImg.setAttribute("onerror", "this.onerror=null;this.src='/img/fotos-usuarios/sem-foto-pesquisa.jpg' + '?' + new Date().getTime();");

    $.ajax({
        type: 'POST',
        url: "/NotaFiscal/CarregaPermissoesUsuarioNotaFiscalParametros",
        data: { pUsuarioParametroCancelamentoNotaFiscal: vParametrosConsulta },
        success: function (responseData) {
            if (responseData.Nr_Nivel_Acesso == 1) {
                exibirEsconderPaineis('accParametrosUsuario', 'none');
                exibirEsconderPaineis('mensagemUsuarioAdministrador', 'block');
                exibirEsconderPaineis('mensagemUsuarioSemAcessoModuloAjuste', 'none');

            } else if (responseData.Lg_Possui_Acesso_Modulo == false) {
                exibirEsconderPaineis('accParametrosUsuario', 'none');
                exibirEsconderPaineis('mensagemUsuarioAdministrador', 'none');
                exibirEsconderPaineis('mensagemUsuarioSemAcessoModuloAjuste', 'block');
            } else {
                exibirEsconderPaineis('accParametrosUsuario', 'block');
                exibirEsconderPaineis('mensagemUsuarioAdministrador', 'none');
                exibirEsconderPaineis('mensagemUsuarioSemAcessoModuloAjuste', 'none');

                oChkCancelaNotaFiscal.option('value', responseData.Lg_Cancela_Nota_Fiscal);
                oChkDownloadArquivoXMLCancelamento.option('value', responseData.Lg_Download_Arquivo_XML_Cancelamento);
            }
        },
        fail: function (responseData) {
            exibeMensagem("error", "Erro ao executar a consulta das permissões do usuário", responseData);
        }
    });
}

function carregaUsuarios() {
    GetAzureDataSource(34).then((result) => {
        if (result.success) {
            oLkpUsuarioConfiguracoes = $('#lkpUsuarioConfiguracoes').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_LOGIN',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Usuário',
                },
                placeholder: 'Clique para selecionar um usuário',
                showClearButton: true,
                itemTemplate(data) {
                    let fotoAtual = data.DS_URL_FOTO + '?' + new Date().getTime();

                    return `<div class="custom-item">
                        <div id="divImage">
                            <img class="rounded-circle" src="${fotoAtual}" onerror="this.onerror=null;this.src='/img/fotos-usuarios/sem-foto-pesquisa.jpg' + '?' + new Date().getTime();" />
                        </div>
                        <div id="divText">
                            ${data.DS_PESQUISA}
                        </div>
                    </div>`;
                },
                onSelectionChanged(data) {
                    if (data.selectedItem === null) {
                        carregaPermissoesUsuarioSelecionado(null, '/img/fotos-usuarios/sem-foto-pesquisa.jpg');
                    } else {
                        carregaPermissoesUsuarioSelecionado(data.selectedItem.CD_LOGIN, data.selectedItem.DS_URL_FOTO);
                    }
                }
            }).dxLookup('instance');
        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
        }
    });
}
