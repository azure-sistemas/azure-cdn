var oLoadPanel = null;
var oTxtJustificativa = null;
var oTxtJustificativaContainer = null;
var oTgxPedidosFiltro = null;
var arrayLookup = [];
var oLkpFormaPagamentoFiltro = null;
var oGridRecebimentosCancelamento = null;
var oGridRecebimentosCancelamentoContainer = null;
var customSelection = false;
var vUltimosPedidosFiltro;
var vRecebimento = {
    CD_FORMA_PAGAMENTO_PIX: null,
    CD_ID_PIX: null
};

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

    oTxtJustificativaContainer = $("#txtJustificativa");

    oTxtJustificativa = oTxtJustificativaContainer.dxTextArea({
        labelMode: "floating",
        label: "Informe a Justificativa *",
        height: 150,
        maxLength: 5000,
    }).dxValidator({ validationRules: [{ type: "stringLength", min: 15, message: "A justificativa deve ter no mínimo 15 caracteres", }], validationGroup: "Justificativa" }).dxTextArea("instance");

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

                carregaRecebimentos();
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

                carregaRecebimentos();
            }
        }
    }).dxTagBox("instance");

    oGridRecebimentosCancelamentoContainer = $("#gridRecebimentosCancelamento");

    oGridRecebimentosCancelamento = oGridRecebimentosCancelamentoContainer.dxDataGrid({
        keyExpr: ["CD_FORMA_PAGAMENTO_PIX", "CD_ID_PIX"],
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
            var worksheet = workbook.addWorksheet("Recebimentos Pix");

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Recebimentos_Pix.xlsx");
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
                dataField: "CD_FILIAL",
                caption: "Filial",
                width: 70,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 197,

            },
            {
                dataField: "CD_CAIXA",
                caption: "Caixa",
                width: 75,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 196,

            },
            {
                dataField: "DS_FORMA_PAGAMENTO",
                caption: "Forma Pagamento",
                width: 140,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "left",
                cssClass: "column-data-grid",
                hidingPriority: 195,

            },
            {
                dataField: "DT_TRANSACAO",
                caption: "Data",
                width: 105,
                dataType: "date",
                format: "dd/MM/yyyy HH:mm",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 194,
            },
            {
                dataField: "VL_RECEBIDO",
                caption: "Valor",
                format: "###,###,###,##0.00",
                width: 70,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                alignment: "right",
                cssClass: "column-data-grid",
                hidingPriority: 193,
            },
            {
                dataField: "CD_CPF_CNPJ_CLIENTE",
                caption: "CPF/CNPJ",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 192,
            },
            {
                dataField: "DS_RAZAO_SOCIAL_CLIENTE",
                width: 250,
                caption: "Cliente",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "left",
                cssClass: "column-data-grid",
                hidingPriority: 191,

            },
            {
                dataField: "DS_PEDIDOS",
                //width: 150,
                caption: "Pedidos",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: "left",
                cssClass: "column-data-grid",
                hidingPriority: 190,

            },
        ],
        summary: {
            totalItems: [{
                column: "CD_ID_PIX",
                summaryType: "count",
                displayFormat: "{0} Transações",
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
            };
            if (e.rowType === "group") {
                e.cellElement.css("color", "#f05b41");
                e.cellElement.css("background-color", "white");
            };
        },
        onCellClick: function (e) {
        },
        toolbar: {
            items: [
                {
                    location: "after",
                    widget: "dxButton",
                    locateInMenu: "auto",
                    options: {
                        icon: "clearsquare",
                        text: "Cancelar",
                        hint: "Cancelar recebimento",
                        type: "danger",
                        onClick(e) {
                            var dRows = oGridRecebimentosCancelamento.getSelectedRowKeys();

                            if (dRows.length > 0) {
                                vRecebimento.CD_FORMA_PAGAMENTO_PIX = dRows[0].CD_FORMA_PAGAMENTO_PIX;
                                vRecebimento.CD_ID_PIX = dRows[0].CD_ID_PIX;

                                exibeJustificativa();
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
                                    oGridRecebimentosCancelamento.state({});
                                    oGridRecebimentosCancelamento.refresh();

                                    oGridRecebimentosCancelamentoContainer.dxDataGrid("instance").updateDimensions();
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
        stateStoring: AutoLoad("gridRecebimentosCancelamento", false),
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

    oLkpFormaPagamentoFiltro = $("#lkpFormaPagamentoFiltro").dxLookup({
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: "Pesquisar recebimentos de uma forma de pagamento específica",
        },
        dataSource: [],
        displayExpr: function (item) {
            return item && `${item.CD_FORMA_PAGAMENTO} - ${item.DS_FORMA_PAGAMENTO}`;
        },
        searchEnabled: true,
        searchExpr: ['DS_FORMA_PAGAMENTO'],
        cleanSearchOnOpening: true,
        valueExpr: 'CD_FORMA_PAGAMENTO',
        placeholder: "Pesquisar recebimentos de uma forma de pagamento específica",
        labelMode: 'floating',
        label: "Pesquisar recebimentos de uma forma de pagamento específica",
        showClearButton: true,
        showPopupTitle: true,
        onValueChanged: function (e) { 
            carregaRecebimentos();
        }
    }).dxLookup("instance");

    carregaFormasPagamento();

    carregaRecebimentos();
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
    exibirEsconderPaineis("cardCabecalho", "none");
    exibirEsconderPaineis("cardConsultaGeralFiltro", "none");
    exibirEsconderPaineis("cardConsultaGeralGrid", "none");
    exibirEsconderPaineis("cardJustificativa", "none");

    rolarTopo();
};

function inicio() {
    desabilitaTodosPanels();

    vRecebimento = {
        CD_FORMA_PAGAMENTO_PIX: null,
        CD_ID_PIX: null
    };
    oTxtJustificativa.option("value", "");
    oTxtJustificativa.option("isValid", true);

    exibirEsconderPaineis("cardCabecalho", "block");
    exibirEsconderPaineis("cardConsultaGeralFiltro", "block");
    exibirEsconderPaineis("cardConsultaGeralGrid", "block");

    carregaRecebimentos();

    oGridRecebimentosCancelamento.deselectAll();
};

function rolarPara(elemento) {
    $("html, body").animate({ scrollTop: $(elemento).offset().top }, 600);
};

function rolarTopo() {
    window.scrollTo(0, 0);
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

function carregaFormasPagamento() {
    oLoadPanel.show();

    $.ajax({
        type: "POST",
        url: "/Financeiro/CarregaFormasPagamentoPix",
        success: function (responseData) {
            oLoadPanel.hide();

            if (typeof responseData == "string") {
                exibeMensagem("error", "Erro ao executar a consulta as formas de pagamento", responseData);
            } else {
                oLkpFormaPagamentoFiltro.option("dataSource", responseData);
            }
        },
        fail: function (responseData) {
            oLoadPanel.hide();

            exibeMensagem("error", "Erro ao executar a consulta as formas de pagamento", responseData);
        }
    });
};

function carregaRecebimentos() {
    oGridRecebimentosCancelamentoContainer.fadeOut("fast");

    oLoadPanel.show();

    var vPedidos = null;

    if (oTgxPedidosFiltro.option("selectedItems") != null) {
        vPedidos = "";

        oTgxPedidosFiltro.option("selectedItems").forEach(x => { vPedidos += (vPedidos.length > 0 ? "," : "") + x.Id });
    }

    $.ajax({
        type: "POST",
        url: "/Financeiro/CarregaRecebimentosCancelamento",
        data: {
            pCodFormaPagamentoPix: oLkpFormaPagamentoFiltro.option("value"),
            pNrPedidos: vPedidos
        },
        success: function (responseData) {
            oLoadPanel.hide();

            if (typeof responseData == "string") {
                exibeMensagem("error", "Erro ao executar a consulta dos recebimentos pix", responseData);
            } else {
                oGridRecebimentosCancelamento.option("dataSource", responseData);

                oGridRecebimentosCancelamentoContainer.css("font", "11px verdana");

                oGridRecebimentosCancelamentoContainer.fadeIn("1500");
            }
        },
        fail: function (responseData) {
            oLoadPanel.hide();

            exibeMensagem("error", "Erro ao executar a consulta dos recebimentos pix", responseData);
        }
    });
};

function exibeJustificativa() {
    desabilitaTodosPanels();

    exibirEsconderPaineis("cardCabecalho", "block");
    exibirEsconderPaineis("cardJustificativa", "block");

    oTxtJustificativa.focus();
};

function cancelaRecebimentoPIX() {
    const result = DevExpress.validationEngine.validateGroup("Justificativa");

    if (result.isValid) {
        var vParametrosCancelamento = JSON.stringify({
            CD_FORMA_PAGAMENTO_PIX: vRecebimento.CD_FORMA_PAGAMENTO_PIX,
            CD_ID_PIX: vRecebimento.CD_ID_PIX,
            DS_JUSTIFICATIVA_CANCELAMENTO: oTxtJustificativa.option("value")
        });

        //PROCEDIMENTO PARA CANCELAMENTO DO RECEBIMENTO PIX
        $.ajax({
            type: "POST",
            url: "/Financeiro/CancelaRecebimentoPix",
            data: { pTransacaoPix: vParametrosCancelamento },
            success: function (responseData) {
                if (responseData.result == "error") {
                    exibeMensagem("error", "Erro ao cancelar o recebimento pix", responseData.msg);
                } else {
                    exibeMensagem("success", "Recebimento PIX", "Recebimento cancelado com sucesso!");

                    inicio();
                }
            },
            fail: function (responseData) {
                exibeMensagem("error", "Erro ao cancelar o recebimento pix", responseData);
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