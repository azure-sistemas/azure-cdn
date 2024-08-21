///////////////////////////////////////////////////////////////////////////////////////////////////
//INÍCIO VARIÁVEIS E CONSTANTES
///////////////////////////////////////////////////////////////////////////////////////////////////

class PedidoCompra {
    numero = null;
    codigoFornecedor;
    codigoEtapa;
    codigoSituacao;
    possuiItemNaoRecebido;
    possuiItemRecebidoParcial;
    possuiItemRecebidoTotal;
    valorTotal;
}

class UsuarioParametroCompra {
    CD_EMPRESA;
    CD_LOGIN;
    DS_NOME;
    CD_STATUS;
    NR_NIVEL_ACESSO;
    LG_CONSULTA_PEDIDO;
    LG_INCLUI_PEDIDO;
    LG_CONCLUI_PEDIDO;
    LG_PERMITE_LIBERACAO_PEDIDO;
    LG_CANCELA_PEDIDO;
    LG_ENVIA_PEDIDO;
    LG_PERMITE_CRIAR_TRANSFERENCIA;
    LG_PERMITE_CRIAR_COTACAO;
    LG_PERMITE_ENVIAR_COTACAO;
    LG_EXIBIR_GRAFICO_VALOR_VENDA;
    LG_EXIBIR_GRAFICO_VALOR_COMPRA;
    LG_EXIBIR_GRAFICO_QTDE_VENDA;
    LG_EXIBIR_GRAFICO_QTDE_COMPRA;
    LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA;
    LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA;
    LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA;
    LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA;
    LG_POSSUI_ACESSO_PEDIDO_COMPRA;
    LG_EMITE_ALERTA_PEDIDOS_PROPRIOS_NAO_ENVIADOS;
    LG_EMITE_ALERTA_TODOS_PEDIDOS_NAO_ENVIADOS;
}

//VARIÁVEIS
let objPedido = new PedidoCompra();
let objUsuarioParametroCompra = new UsuarioParametroCompra();
let objUsuarioParametroCompraConfiguracao = new UsuarioParametroCompra();

let vCDEmpresa = null;
let nomeEmpresa = null;
let segmentoEmpresa = null;
let vEmpresaParticipaRadarPreco = false;
let treeView;
let casasDecimaisCompra = null;
let casasDecimaisVenda = null;
let actionIndex = 0;
let vPedidoComplementar = false;
let vLoading = true;
let vCDComprador = null;
let vVlLimitePedidoCompra = null;
let ProcessPanel = null;
let vProcessing = false;
let vIncluirProdutosAutomaticamente = false;
let vIncluirSomentePontoReposicao = false;

//INDIVIDUAL
let vLkp_Fornecedor_Substituicao = null;
let vLkp_Fornecedores_Individual = null;
let vTag_Almoxarifados_Individual = null;
let vLkp_Filial_Individual = null;

//FILTRO INDIVIDUAL
let vLkp_Fornecedores_Filtro_Individual = null;
let vTag_Marcas_Filtro_Individual = null;
let vTag_Curva_Produtos_Filtro_Individual = null;
let vCkb_Fornecedor_Padrao_Filtro_Individual = null;
let vCkb_Abater_Saldo_Receber_Filtro_Individual = null;
let vCkb_Produtos_Ponto_Reposicao_Filtro_Individual = null;
let vChk_Incluir_Produtos_Automaticamente_Filtro_Individual = null;
let vChk_Incluir_Somente_Ponto_Reposicao_Filtro_Individual = null;

//PEDIDO
let vGridBoxProdutos = null;
let vGridBoxProdutosDataGrid = null;
let vGridConsultaGeralPedidos = null;
let vGridItensPedido = null;
let vGridPedidosComplementares = null;
let vGridItensPedidoLegenda = null;
let vGridPedidosConsultaLegenda = null;
let vGridPedidosComplementaresLegenda = null;
let wizard = null;

//DADOS GERAIS
let vLkp_Filial_Pedido = null;
let vDt_Previsao_Entrega = null;
let vTxt_Nome_Contato = null;
let vTxt_Telefone_Contato = null;
let vTxt_Obs_Pedido = null;
let vTxt_Obs_Fornecedor = null;
let vGridFormaPagamento = null;
let vLkp_Formas_Pagamento = null;
let vLkp_Periodicidade_Parcelas_Fixas = null;
/*let nbx_Qt_Parcelas_Fixas = null;*/
let popupConfirmacaoExclusaoParcelas = null;

let vTxt_Justificativa_Cancelamento = null;
let vTxt_Justificativa_Cancelamento_Visualizar_Modal = null;
let vTxt_Justificativa_Cancelamento_Diversos = null;
let vToolbarItensPedido = null;
let vToolbarPedidosConsulta = null;
let vToolbarPedidosRelacionados = null;
let vChartCicloOperacional = null;
let vChartCicloOperacionalFiltro = null;


//ENVIO DE EMAIL
let vTxt_Remetente_Email = null;
let vTxt_Destinatario_Email = null;
let vTxt_Assunto_Email = null;
let vTxt_Corpo_Email = null;
let vCkb_Anexar_Pedido_Email = null;
let vCkb_Enviar_Email_Multiplos_Pedidos = null;

//CONFIGURAÇÃO SMTP
let vTxt_Configuracao_SMTP_Email = null;
let vTxt_Configuracao_SMTP_Servidor = null;
let vTxt_Configuracao_SMTP_Porta = null;
let vTxt_Configuracao_SMTP_Senha = null;
let vCkb_Configuracao_SMTP_Usa_TLS = null;
let vBtnConfigurarSMPT = null;
let vBtnConfigurarCorpoEmail = null;

//CONFIGURAÇÃO CORPO EMAIL
let vTxt_Configuracao_Assunto_Email = null;
let vTxt_Configuracao_Corpo_Email = null;
let vBtnConferirTagsEmail = null;

//WHATSAPP
let vTxt_Telefone_WhatsApp = null;
let vTxt_Mensagem_WhatsApp = null;
let vCkb_Enviar_Link_Pedido_WhatsApp = null;
let vBtnConfigurarCorpoWhatsApp = null;

//CONFIGURAÇÃO CORPO WHATSAPP
let vTxt_Configuracao_Corpo_WhatsApp = null;
let vBtnConferirTagsWhatsApp = null;

//CONSULTA
let vLkp_Produtos_Filtro_Consulta_Geral = null;
let vTag_Almoxarifados_Filtro_Consulta_Geral = null;
let vNbx_Dias_Filtro_Consulta_Geral = null;

//CONFIGURAÇÕES GERAIS
let listWorkflow = null;
let vChk_Confirma_Envio_Email_Pedido_Compra = null;
let vRdb_Tipo_Custo_Impressao_Pedido = null;
let vRdb_Tipo_Transferencia = null;
let vTxt_Formula_Media_Venda_Diaria = null;

//CONFIGURAÇÕES USUÁRIO
let vNbx_Vl_Limite_Pedido_Compra = null;
let vChk_Usuario_Consulta_Pedido = null;
let vChk_Usuario_Inclui_Pedido = null;
let vChk_Usuario_Conclui_Pedido = null;
let vChk_Usuario_Permite_Liberacao_Pedido = null;
let vChk_Usuario_Cancela_Pedido = null;
let vChk_Usuario_Envia_Pedido = null;
let vChk_Usuario_Permite_Criar_Transferencia = null;
let vChk_Usuario_Permite_Criar_Cotacao = null;
let vChk_Usuario_Permite_Enviar_Cotacao = null;
let vChk_Emite_Alerta_Pedidos_Proprios_Nao_Enviados = null;
let vChk_Emite_Alerta_Todos_Pedidos_Nao_Enviados = null;
let vLkp_Usuario_Configuracoes = null;

//SOLICITAÇÃO COMPRA
let vNbx_Dias_Filtro_Solicitacao_Compra = null;
let vGridSolicitacaoCompra = null;
let vGridSolicitacaoCompraPedido = null;

//TRANSFERÊNCIA
let vGridTransferenciaPedido = null;

//COTAÇÃO COMPRA
let vGridCotacaoCompraPedido = null;

//HISTÓCIO PEDIDO
let vGridHistoricoPedido = null;

//SUGESTÃO TRASNFERÊNCIA
let vGridNecessidadeTransferencia = null;
let vGridTransferencia = null;
let vRdbAcaoPosTransferencia = null;

//PESQUISA ELETRÔNICA (RADAR DE PREÇOS)
let vBtn_Aderir_Pesquisa_Eletronica = null;
let vChk_Confirmacao_Leitura_Pesquisa_Eletronica = null;

//ARRAYS
let dataSourceFornecedores = [];
let dataSourceFiliais = [];
let dataSourceFamilias = [];
let dataSourceFornecedorSimilar = [];
let dataSourceProdutos = [];
let dataSourceGrafico = [];
let dataSourceGraficoCorporativo = [];
let arrayComponentes = [];
let arrayAlmoxarifadosPedido = [];
let dataSave = [];
let dataInsert = [];
let dataUpdate = [];
let dataDelete = [];
let columnsQtPedidaAlmoxarifado = [];
let transferenciasGeradas = [];

//CONSTANTES
const dataSourceItensPedidoLegenda = [
    {
        DS_COLOR_FL: "#f26419",
        DS_FL: "FL",
        DS_FORA_LINHA: "Produtos Fora de Linha",
        DS_COLOR_TM: "#33658a",
        DS_TM: "TM",
        DS_TRANSFERENCIA: "Sugestão de Transferência ao invés de compra",
        DS_COLOR_EDITAVEL: "#EDF3F8",
        DS_ED: "",
        DS_EDITAVEL: "Células editáveis",
        DS_COLUNA_VAZIA: "",
    }];

const dataSourcePedidosLegenda = [
    {
        COR_1: "#0088CC",
        TEXTO_1: "",
        LEGENDA_1: "Pedido em Elaboração",

        COR_2: "#ED9C28",
        TEXTO_2: "",
        LEGENDA_2: "Pedido em Liberação",

        COR_3: "#D2322D",
        TEXTO_3: "",
        LEGENDA_3: "Pedido Cancelado",
    }, {
        COR_1: "#47A447",
        TEXTO_1: "",
        LEGENDA_1: "Pedido Aprovado",

        COR_2: "#800000",
        TEXTO_2: "",
        LEGENDA_2: "Pedido Reprovado",

        COR_3: "#736f72",
        TEXTO_3: "FM",
        LEGENDA_3: "Pedido não atingiu o faturamento mínimo do Fornecedor",
    },
];

const dataSourceCurvaProdutos = [
    { "CD_CURVA": "A", "DS_CURVA": "Curva A", },
    { "CD_CURVA": "B", "DS_CURVA": "Curva B", },
    { "CD_CURVA": "C", "DS_CURVA": "Curva C", },
    { "CD_CURVA": "D", "DS_CURVA": "Curva D", }];

const dataSourceSituacaoPedido = [
    { CD_SITUACAO: 1, DS_SITUACAO: "EM ELABORAÇÃO" },
    { CD_SITUACAO: 2, DS_SITUACAO: "AGUARDANDO LIBERAÇÃO" },
    { CD_SITUACAO: 3, DS_SITUACAO: "REPROVADO" },
    { CD_SITUACAO: 4, DS_SITUACAO: "APROVADO" },
    { CD_SITUACAO: 5, DS_SITUACAO: "CANCELADO" }
]

///////////////////////////////////////////////////////////////////////////////////////////////////
//TÉRMINO VARIÁVEIS E CONSTANTES
///////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //INÍCIO COMPONENTES
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    (async () => {
        OpenProcessPanel("Carregando...");

        await GetUsuarioParametroCompra();

        //INDIVIDUAL
        Load_Azr_Lookup_FornecedorV2("lkp_Fornecedores_Individual", arrayComponentes, 1, "Fornecedor não identificado", "Fornecedor *").then(function (e) {
            vLkp_Fornecedores_Individual = $("#lkp_Fornecedores_Individual").dxLookup({
                onValueChanged: function (e) {
                    vLkp_Fornecedores_Filtro_Individual.option("value", e.value);
                    vLkp_Fornecedor_Substituicao.option("value", e.value);
                },
            }).dxLookup("instance");
        });

        Load_Azr_TagBox_Almoxarifado(arrayComponentes, "tag_Almoxarifados_Individual", 'A', "Almoxarifado não identificado", "Almoxarifados *").then(function (e) {
            vTag_Almoxarifados_Individual = $("#tag_Almoxarifados_Individual").dxTagBox("instance");
        });

        Load_Azr_Lookup_Filial2(arrayComponentes, "lkp_Filial_Individual", 1, 1, "Filial não identificada", "Filial para geração do Pedido de Compra *").then(function (e) {
            vLkp_Filial_Individual = $("#lkp_Filial_Individual").dxLookup("instance");
        });

        Load_Azr_Lookup_FornecedorV2("lkp_Fornecedor_Substituicao", arrayComponentes, 1, "Fornecedor não identificado", "Fornecedor").then(function (e) {
            vLkp_Fornecedor_Substituicao = DevExpress.ui.dxLookup.getInstance('#lkp_Fornecedor_Substituicao');
        });

        //FILTRO INDIVIDUAL
        Load_Azr_Lookup_FornecedorV2("lkp_Fornecedores_Filtro_Individual", arrayComponentes, 1, "Fornecedor não identificado", "Fornecedor").then(function (e) {
            vLkp_Fornecedores_Filtro_Individual = $("#lkp_Fornecedores_Filtro_Individual").dxLookup("instance");
        });

        Load_Azr_TagBox_Marca(arrayComponentes, "tag_Marcas_Filtro_Individual", "Marca não identificada", "Marca").then(function (e) {
            vTag_Marcas_Filtro_Individual = $("#tag_Marcas_Filtro_Individual").dxTagBox("instance");
        });

        Load_Azr_DropDownBox_FamiliaProduto(arrayComponentes, "treeView_Familias_Filtro_Individual", "Família", 1).then(function (e) {
            vDbx_treeView_Familias_Filtro_Individual = $("#treeView_Familias_Filtro_Individual").dxDropDownBox("instance");
        });

        vTag_Curva_Produtos_Filtro_Individual = $("#tag_Curva_Produtos_Filtro_Individual").dxTagBox({
            dataSource: dataSourceCurvaProdutos,
            searchEnabled: true,
            searchExpr: ["DS_CURVA"],
            cleanSearchOnOpening: true,
            displayExpr: "DS_CURVA",
            valueExpr: "CD_CURVA",
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: "Curva de Produtos",
            },
            labelMode: "floating",
            label: "Curva de Produtos",
            placeholder: "",
            showClearButton: true,
            showSelectionControls: true,
        }).dxTagBox("instance");

        vCkb_Fornecedor_Padrao_Filtro_Individual = $("#ckb_Fornecedor_Padrao_Filtro_Individual").dxCheckBox({
            value: false,
            text: "Somente fornecedor padrão",
        }).dxCheckBox("instance");

        vCkb_Abater_Saldo_Receber_Filtro_Individual = $("#ckb_Abater_Saldo_Receber_Filtro_Individual").dxCheckBox({
            value: false,
            text: "Abater das sugestões de compras os saldos de pedidos a receber",
        }).dxCheckBox("instance");

        vCkb_Produtos_Ponto_Reposicao_Filtro_Individual = $("#ckb_Produtos_Ponto_Reposicao_Filtro_Individual").dxCheckBox({
            value: false,
            text: "Somente produtos com estoque em ponto de reposição",
        }).dxCheckBox("instance");

        vChk_Incluir_Produtos_Automaticamente_Filtro_Individual = $("#chk_Incluir_Produtos_Automaticamente_Filtro_Individual").dxCheckBox({
            value: true,
            text: "Incluir automaticamente os dados filtrados no pedido de compra",
            onValueChanged(e) {
                if (e.value == false) {
                    vChk_Incluir_Somente_Ponto_Reposicao_Filtro_Individual.option("disabled", true)
                } else {
                    vChk_Incluir_Somente_Ponto_Reposicao_Filtro_Individual.option("disabled", false)
                }
            },
        }).dxCheckBox("instance");

        vChk_Incluir_Somente_Ponto_Reposicao_Filtro_Individual = $("#chk_Incluir_Somente_Ponto_Reposicao_Filtro_Individual").dxCheckBox({
            value: false,
            text: "Incluir somente os produtos em ponto de reposição",
        }).dxCheckBox("instance");

        //AUTOMATICO
        //Load_Azr_TagBox_Almoxarifado(arrayComponentes, "tag_Almoxarifados_Automatico", 'A', "Almoxarifado não identificado", "Almoxarifados *");

        //FILTRO AUTOMATICO
        //Load_Azr_Lookup_Filial2(arrayComponentes, "lkp_Filiais_Filtro_Automatico", 1, 1, "Filial não identificada", "Filial");
        //Load_Azr_Lookup_FornecedorV2("lkp_Fornecedores_Filtro_Automatico", arrayComponentes, 1, "Fornecedor não identificado", "Fornecedor");
        //Load_Azr_DropDownBox_FamiliaProduto(arrayComponentes, "treeView_Familias_Filtro_Automatico", "Família", 1);

        //PEDIDO
        vGridBoxProdutos = $("#gridBoxProdutos").dxDropDownBox({
            valueExpr: "CD_PRODUTO",
            deferRendering: false,
            labelMode: "floating",
            label: "+ Selecione produtos para incluir no pedido",
            placeholder: "+ Selecione produtos para incluir no pedido",
            searchExpr: ["DS_PRODUTO"],
            displayExpr(item) {
                return item && `${item.CD_PRODUTO} <${item.DS_PRODUTO}>`;
            },
            showClearButton: true,
            disabled: false,
            dataSource: [],
            dropDownOptions: {
                animation: {
                    show: {
                        type: "slide",
                        from: { opacity: 0 },
                        to: { opacity: 1 }
                    },
                    hide: {
                        type: "slide",
                        from: { opacity: 1 },
                        to: { opacity: 0 }
                    }
                },
                onShowing: async function (e) {
                    await this.fnPromise;
                    e.component.repaint();
                },
                onOptionChanged: function (e) {
                    if (e.name != "visible") return;
                    if (!e.value) return;
                    $("#informacaoPedido").hide();
                    $("#informacaoFornecedor").hide();
                    this.fnPromise = $('#pedidoCompra').animate({ top: 0 }, {
                        complete: () => {
                            e.component.refreshPosition();
                            vGridBoxProdutosDataGrid.refresh();
                        },
                    }).promise();
                },
                onHiding: function (e) {
                    $("#informacaoPedido").show();
                    $("#informacaoFornecedor").show();
                },
            },
            //onOpened: function (e) {
            //    e.component.getDataSource().reload();
            //},
            contentTemplate(e) {
                const dataGrid = $("<div>").dxDataGrid({
                    dataSource: e.component.getDataSource(),

                    searchExpr: ["DS_PRODUTO"],
                    displayExpr: "DS_PRODUTO",
                    valueExpr: "CD_PRODUTO",

                    wordWrapEnabled: true,
                    showRowLines: true,
                    showBorders: true,
                    rowAlternationEnabled: true,
                    searchPanel: {
                        visible: true,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    allowColumnResizing: true,
                    columnResizingMode: "widget",
                    allowColumnReordering: true,
                    groupPanel: { visible: true },
                    editing: {
                        mode: "batch",
                        allowUpdating: true,
                        startEditAction: "dblClick",
                        allowAdding: false,
                        allowDeleting: false,
                    },
                    loadPanel: { enabled: true, },
                    keyboardNavigation: {
                        enterKeyAction: "moveFocus",
                        enterKeyDirection: "column",
                        editOnKeyPress: true,
                    },
                    hoverStateEnabled: true,
                    scrolling: {
                        prerenderedRowCount: 40,
                        mode: "infinite",
                        rowRenderingMode: 'virtual',
                    },
                    renderAsync: true,
                    repaintChangesOnly: true,
                    selection: {
                        mode: "multiple",
                        showCheckBoxesMode: "always"
                    },
                    height: "100%",
                    paging: { pageSize: 20 },
                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: true },
                    columnChooser: { enabled: true, allowSearch: true, width: 300, height: 500 },
                    //columnsAutoWidth: true,
                    cellHintEnabled: true,

                    toolbar: {
                        items: [
                            {
                                location: "after",
                                widget: "dxButton",
                                options: {
                                    text: "Adicionar Produtos",
                                    hint: "Adicionar produtos selecionados",
                                    width: 150,
                                    icon: "save",
                                    onClick(e) {
                                        vGridBoxProdutosDataGrid.saveEditData();
                                    },
                                },
                            },
                            "groupPanel",
                            "revertButton",
                            "columnChooserButton",
                            "searchPanel",
                        ],
                    },

                    columns: [],

                    onCellPrepared: function (e) {
                        if (e.rowType === "data" && typeof (e.column.dataField) !== "undefined") {
                            if (e.column.dataField === "VL_UNITARIO_PRODUTO") {
                                e.cellElement.css("background-color", "#edf3f8");
                            }
                            else if (e.column.dataField.startsWith("QT_PEDIDA_ALMOXARIFADO_")) {
                                var almox = e.column.dataField.replace("QT_PEDIDA_ALMOXARIFADO_", "")

                                if (e.data["LG_PRODUTO_ATIVO_ALMOXARIFADO_" + almox] == true) {
                                    e.cellElement.css("background-color", "#edf3f8");
                                }
                            }
                            else if (e.column.dataField === "LG_FORA_LINHA") {
                                e.cellElement.css("background-color", e.data.LG_FORA_LINHA == true ? "#f26419" : null);
                            }
                            else if (e.column.dataField === "DS_ESTOQUE_VENDA_TOTAL" ||
                                e.column.dataField === "DS_ESTOQUE_COMPRA_TOTAL") {
                                if (e.data.CD_UNIDADE_MEDIDA_VENDA != e.data.CD_UNIDADE_MEDIDA_COMPRA) {
                                    e.cellElement.css("font-weight", "bold");
                                    e.cellElement.css("color", "black");
                                }
                            }
                        }
                    },

                    onEditorPreparing: function (e) {
                        if (e.parentType == "dataRow" && typeof (e.dataField) != "undefined") {
                            if (e.dataField.startsWith("QT_PEDIDA_ALMOXARIFADO_")) {
                                var onValueChanged = e.editorOptions.onValueChanged;
                                e.editorOptions.onValueChanged = function (args) {
                                    //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                    onValueChanged.apply(this, arguments);

                                    //TRATA O VALOR ALTERADO (NULO E MENOR QUE ZERO)
                                    args.value = args.value == null ? args.previousValue : args.value;
                                    args.value = args.value < 0 ? args.previousValue : args.value;

                                    //ARREDONDA CONFORME AS CASAS DECIMAIS DA UNIDADE DE MEDIDA DE COMPRA
                                    args.value = round(args.value, e.row.data.NR_CASAS_UNIDADE_MEDIDA)

                                    //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                    onValueChanged.apply(this, arguments);

                                    SumarizaQuantidadeGrid(e.component, e.row.rowIndex);

                                    //SELECIONA A LINHA ATUAL
                                    e.component.selectRows(e.row.key, true);
                                }
                            }
                            else if (e.dataField == "VL_UNITARIO_PRODUTO") {
                                var onValueChanged = e.editorOptions.onValueChanged;
                                e.editorOptions.onValueChanged = function (args) {
                                    //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                    onValueChanged.apply(this, arguments);

                                    //TRATA O VALOR ALTERADO (NULO E MENOR QUE ZERO)
                                    args.value = args.value == null ? args.previousValue : args.value;
                                    args.value = args.value < 0 ? args.previousValue : args.value;

                                    //ARREDONDA CONFORME AS CASAS DECIMAIS DE COMPRA
                                    args.value = round(args.value, casasDecimaisCompra)

                                    //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                    onValueChanged.apply(this, arguments);

                                    var qtPedidaTotal = e.component.cellValue(e.row.rowIndex, "QT_PEDIDA_TOTAL");
                                    var vlUnitario = args.value;

                                    e.component.cellValue(e.row.rowIndex, "VL_TOTAL_PRODUTO", round(qtPedidaTotal * vlUnitario, 2));

                                    //SELECIONA A LINHA ATUAL
                                    e.component.selectRows(e.row.key, true);
                                }
                            }
                        }
                    },

                    onEditingStart: function (e) {
                        if (e.column.dataField.startsWith("QT_PEDIDA_ALMOXARIFADO_")) {
                            var almox = e.column.dataField.replace("QT_PEDIDA_ALMOXARIFADO_", "")
                            e.cancel = !e.data["LG_PRODUTO_ATIVO_ALMOXARIFADO_" + almox];
                        }
                    },

                    onSaved: function (e) {
                        let list = [];
                        vGridBoxProdutosDataGrid.getSelectedRowsData().forEach((row) => {
                            arrayAlmoxarifadosPedido.forEach((almoxarifado) => {
                                if (row["QT_PEDIDA_ALMOXARIFADO_" + almoxarifado] > 0) {
                                    list.push({
                                        CD_EMPRESA: row.CD_EMPRESA,
                                        NR_PEDIDO: objPedido.numero,
                                        CD_PRODUTO: row.CD_PRODUTO,
                                        CD_ALMOXARIFADO: almoxarifado,
                                        QT_PEDIDA: row["QT_PEDIDA_ALMOXARIFADO_" + almoxarifado],
                                        CD_UNIDADE_MEDIDA: row.CD_UNIDADE_MEDIDA_COMPRA,
                                        VL_ITEM: row.VL_UNITARIO_PRODUTO,
                                        VL_TOTAL_ITEM: round(row["QT_PEDIDA_ALMOXARIFADO_" + almoxarifado] * row.VL_UNITARIO_PRODUTO, 2),
                                    });
                                }
                            });
                        });

                        if (list.length == 0) {
                            ExibeMensagem("info", "Nenhum produto foi adicionado ao pedido!", "Verifique se os produtos selecionados possuem quantidade maior que zero para pelo menos um almoxarifado");
                        }
                        else {
                            OpenProcessPanel("Processando...");
                            //SALVA OS PRODUTOS
                            $.ajax({
                                type: "POST",
                                url: "/PedidoCompra/IncluirPedidoCompraItem",
                                data: { data: JSON.stringify(list) },
                                success: function (response) {
                                    if (response.result == "Erro") {
                                        ExibeMensagem("error", "Ocorreu um erro ao incluir os produtos no pedido", response.msg);
                                    }
                                    else {
                                        //REMOVE AS LINHAS SELECIONADAS
                                        vGridBoxProdutosDataGrid.getSelectedRowKeys().forEach((key) => {
                                            vGridBoxProdutosDataGrid.getDataSource().store().remove(key);
                                        });
                                        vGridBoxProdutosDataGrid.refresh();

                                        ExibeMensagem("success", "Operação realizada", "Produtos adicionados com sucesso");

                                        $("#gridBoxProdutos").dxDropDownBox("instance").close();
                                        $("#gridBoxProdutos").dxDropDownBox("instance").option("value", null);

                                        CarregaPedidoCompra();
                                    }
                                },
                                failure: function (response) {
                                    ExibeMensagem("error", "Ocorreu um erro ao incluir os produtos no pedido", JSON.parse(response.responseText));
                                },
                                always: function () {
                                    CloseProcessPanel();
                                }
                            });
                        }
                    },

                    onFocusedCellChanging: function (e) {
                        e.isHighlighted = true;
                    },

                    onToolbarPreparing: AutoResetState([]),
                });

                vGridBoxProdutosDataGrid = dataGrid.dxDataGrid("instance");

                return dataGrid;
            },
        }).dxDropDownBox("instance");

        wizard = $("#etapaPedido").bootstrapWizard({
            tabClass: "wizard-steps",
            nextSelector: "ul.pager li.next",
            previousSelector: "ul.pager li.previous",
            firstSelector: null,
            lastSelector: null,
            onTabShow: function (tab, navigation, index) {
                var $total = navigation.find("li").length - 1;
                var $current = index;
                var $percent = Math.floor(($current / $total) * 100);

                //VERIFICA SE A ETAPA É 3 OU 5
                if (["3", "5"].includes(objPedido.codigoEtapa)) {
                    $("#w3").css("opacity", "0.2");
                    $("#w3").find(".progress-indicator").css({ "width": "0%" });

                    //TABS ANTERIORES
                    tab.prevAll()
                        .removeClass(["completed", "active", "disabled"])
                        .children("a[data-toggle='tab']")
                        .css({ "color": "grey" });

                    //TAB SELECIONADA
                    tab
                        .removeClass(["completed", "active", "disabled"])
                        .children("a[data-toggle='tab']")
                        .css({ "color": "grey" });

                    //TABS POSTERIORES
                    tab.nextAll()
                        .removeClass(["completed", "active", "disabled"])
                        .children("a[data-toggle='tab']")
                        .css({ "color": "grey" });
                }
                else {
                    $("#w3").css("opacity", "1");
                    $("#w3").find(".progress-indicator").css({ "width": $percent + "%" });

                    //TABS ANTERIORES
                    tab.prevAll()
                        .removeClass(["completed", "active", "disabled"])
                        .addClass("completed")
                        .children("a[data-toggle='tab']")
                        .css({ "color": "lightgrey" });

                    //TAB SELECIONADA
                    tab
                        .removeClass(["completed", "active", "disabled"])
                        .addClass("active")
                        .children("a[data-toggle='tab']")
                        .css({ "color": "lightgrey" });

                    //TABS POSTERIORES
                    tab.nextAll()
                        .removeClass(["completed", "active", "disabled"])
                        .children("a[data-toggle='tab']")
                        .css({ "color": "grey" });
                }
            },
        }).data("bootstrapWizard");

        wizard.selectEtapa = function (etapa) {
            // CD_ETAPA_PEDIDO
            //  1 = "Em Elaboração"
            //  2 = "Aguardando Liberação"
            //  3 = "Reprovado"
            //  4 = "Aprovado"
            //  5 = "Cancelado"
            // 10 = "Enviado"
            // 11 = "Recebido Parcial"
            // 12 = "Recebido Total"

            if (["3", "5"].includes(etapa)) {
                etapa = "1";
            }
            else if (etapa == "12") {
                etapa = "11";
            }

            let children = $("#etapaPedido ul")[0].children
            let nodes = Array.from(children);
            let li = $("#etapaPedido ul li[etapa='" + etapa + "']")[0];
            let index = nodes.indexOf(li);
            wizard.show(-1);
            wizard.show(index);
        };

        Load_Azr_Lookup_Filial2(arrayComponentes, "lkp_Filial_Pedido", 1, 1, "Filial não identificada", "Filial para custo e impressão do pedido").then(function (e) {
            vLkp_Filial_Pedido = $("#lkp_Filial_Pedido").dxLookup({
                onValueChanged: function (e) {
                    SalvarDadosGerais();
                },
            }).dxLookup("instance");
        });

        vGridPedidosComplementares = $("#gridPedidosComplementares").dxDataGrid({
            dataSource: [],
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
            sorting: { mode: "multiple" },
            selection: {
                mode: "multiple",
                showCheckBoxesMode: "always",
            },
            allowColumnResizing: true,
            columnResizingMode: "widget",
            repaintChangesOnly: true,
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Arraste as colunas do grid para esta área para agrupar" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
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
                var worksheet = workbook.addWorksheet("Complementares");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "CompraConsultaGeral.xlsx");
                    });
                });
                e.cancel = true;
            },
            filterRow: { visible: true, applyFilter: "auto" },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: { visible: true },
            columnChooser: { enabled: true, allowSearch: true, width: 300, height: 500 },
            columnsAutoWidth: true,
            keyExpr: "NR_PEDIDO",
            columns: [
                {
                    type: "selection",
                    width: 30,
                }, {
                    dataField: "DS_COLUMN_STATUS",
                    caption: "",
                    width: 7,
                    allowEditing: false,
                    allowSorting: false,
                    alignment: "center",
                    allowHeaderFiltering: false,
                    allowFiltering: false,
                }, {
                    dataField: "NR_PEDIDO",
                    caption: "Pedido",
                    width: 60,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_SITUACAO",
                    caption: "Status",
                    width: 70,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_RECEBIDO",
                    caption: "Recebido",
                    width: 70,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_FORNECEDOR",
                    caption: "Cód. Fornecedor",
                    width: 90,
                    allowEditing: false,
                    allowSorting: true,
                    visible: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_RAZAO_SOCIAL_FORNECEDOR",
                    caption: "Fornecedor",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_CONTATO",
                    caption: "Contato",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_TELEFONE",
                    caption: "Telefone",
                    width: 200,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DT_INCLUSAO",
                    caption: "Data",
                    width: 75,
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_FATURAMENTO_MINIMO",
                    caption: "Vl. Fatur. Mínimo",
                    width: 65,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "FATURAMENTO_MINIMO_FM",
                    caption: "",
                    width: 26,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    allowFiltering: false,
                }, {
                    dataField: "VL_TOTAL",
                    caption: "Valor Pedido",
                    width: 70,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    summaryType: "sum",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "LG_PEDIDO_ENVIADO",
                    caption: "Enviado",
                    width: 50,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "ACOES",
                    caption: "Ações",
                    cssClass: "column-data-grid",
                    alignment: "center",
                    visible: true,
                    columns: [
                        {
                            dataField: "DS_IMAGEM_EMAIL",
                            caption: "e-mail",
                            width: 40,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            allowFiltering: false,
                            alignment: "center",
                            cellTemplate(container, options) {
                                $("<div>")
                                    .append($("<img>", { src: options.value }))
                                    .appendTo(container);
                            },
                        },
                        {
                            dataField: "DS_IMAGEM_WHATSAPP",
                            caption: "whats",
                            width: 40,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            allowFiltering: false,
                            alignment: "center",
                            cellTemplate(container, options) {
                                $("<div>")
                                    .append($("<img>", { src: options.value }))
                                    .appendTo(container);
                            },
                        },
                        {
                            dataField: "DS_IMAGEM_IMPRIMIR",
                            caption: "print",
                            width: 40,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            allowFiltering: false,
                            alignment: "center",
                            cellTemplate(container, options) {
                                $("<div>")
                                    .append($("<img>", { src: options.value }))
                                    .appendTo(container);
                            },
                        },
                    ]
                }],

            summary: {
                totalItems: [{
                    column: "NR_PEDIDO",
                    summaryType: "count",
                    displayFormat: "{0} pedidos",
                }, {
                    column: "VL_TOTAL",
                    summaryType: "sum",
                    valueFormat: "###,###,###,##0.00",
                    displayFormat: "{0}",
                }],
            },

            showBorders: true,

            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    if (e.column.dataField === "FATURAMENTO_MINIMO_FM" && e.data.FATURAMENTO_MINIMO_FM.toString().length > 0) {
                        e.cellElement.css("background-color", "#736f72");
                        e.cellElement.css("color", "white");
                    }
                    if (e.column.dataField === "DS_COLUMN_STATUS") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS);
                    }

                    e.cellElement.css({ "cursor": "pointer" });
                }

            },

            onCellClick: function (e) {
                if (e.rowType === "data") {
                    if (e.column.caption == "e-mail") {
                        OpenModalEnvioEmail(e.data.NR_PEDIDO, e.data.CD_SITUACAO);
                    }
                    else if (e.column.caption == "whats") {
                        OpenModalEnvioWhatsApp(e.data.NR_PEDIDO, e.data.CD_SITUACAO);
                    }
                    else if (e.column.caption == "print") {
                        ImprimirPedido(e.data.NR_PEDIDO);
                    }
                }
            },

            onCellDblClick: function (e) {
                if ((e.rowType === "data") &&
                    (e.column.type !== "selection") &&
                    (e.column.dataField !== "LG_PEDIDO_ENVIADO")) {

                    objPedido.numero = e.data.NR_PEDIDO;
                    CarregaPedidoCompra();

                    if (document.getElementById("pedidoCompra").style.display === "none") {
                        closePedidosComplementaresPanel();
                    }
                }
            },

            stateStoring: AutoLoad("gridPedidosComplementares", false),
            onToolbarPreparing: AutoResetState([]),

        }).dxDataGrid("instance");

        vGridItensPedidoLegenda = $("#gridItensPedidoLegenda").dxDataGrid({
            dataSource: dataSourceItensPedidoLegenda,
            wordWrapEnabled: false,
            showColumnHeaders: false,
            showRowLines: false,
            showColumnLines: false,
            rowAlternationEnabled: false,
            searchPanel: {
                visible: false,
            },
            allowColumnResizing: false,
            allowColumnReordering: false,
            groupPanel: { visible: false },
            pager: {
                visible: false,
                showPageSizeSelector: false,
                showNavigationButtons: false
            },
            cellHintEnabled: true,
            keyExpr: "DS_FL",
            columns: [
                {
                    dataField: "DS_FL",
                    caption: "",
                    width: 30,
                    allowEditing: false,
                    allowSorting: false,
                    alignment: "center",
                    allowHeaderFiltering: false,
                }, {
                    dataField: "DS_FORA_LINHA",
                    caption: "",
                    width: 130,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                }, {
                    dataField: "DS_TM",
                    caption: "",
                    width: 30,
                    allowEditing: false,
                    allowSorting: false,
                    allowHeaderFiltering: false,
                    alignment: "center",
                }, {
                    dataField: "DS_TRANSFERENCIA",
                    caption: "",
                    width: 250,
                    allowEditing: false,
                    allowSorting: false,
                    allowHeaderFiltering: false,
                }, {
                    dataField: "DS_ED",
                    caption: "",
                    width: 30,
                    allowEditing: false,
                    allowSorting: false,
                    allowHeaderFiltering: false,
                    alignment: "center",
                }, {
                    dataField: "DS_EDITAVEL",
                    caption: "",
                    width: 100,
                    allowEditing: false,
                    allowSorting: false,
                    allowHeaderFiltering: false,
                }, {
                    dataField: "DS_COLUNA_VAZIA",
                    caption: "",
                }],
            showBorders: false,

            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_FL") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_FL);
                        e.cellElement.css("color", "white");
                    }
                    if (e.column.dataField === "DS_TM") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_TM);
                        e.cellElement.css("color", "white");
                    }
                    if (e.column.dataField === "DS_ED") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_EDITAVEL);
                        e.cellElement.css("color", "white");
                    }
                    if (e.column.dataField === "DS_FORA_LINHA" ||
                        e.column.dataField === "DS_TRANSFERENCIA" ||
                        e.column.dataField === "DS_EDITAVEL" ||
                        e.column.dataField === "DS_COLUNA_VAZIA") {
                        e.cellElement.css("background-color", "transparent");
                    }

                }
            },
        }).dxDataGrid("instance");

        vGridPedidosConsultaLegenda = $("#gridPedidosConsultaLegenda").dxDataGrid({
            dataSource: dataSourcePedidosLegenda,
            wordWrapEnabled: false,
            showColumnHeaders: false,
            showRowLines: false,
            showColumnLines: false,
            rowAlternationEnabled: false,
            searchPanel: {
                visible: false,
            },
            allowColumnResizing: false,
            allowColumnReordering: false,
            groupPanel: { visible: false },
            pager: {
                visible: false,
                showPageSizeSelector: false,
                showNavigationButtons: false
            },
            cellHintEnabled: true,
            columnsAutoWidth: false,
            columns: [
                {
                    dataField: "TEXTO_1",
                    caption: "",
                    width: 25,
                    allowEditing: false,
                    allowSorting: false,
                    alignment: "center",
                    allowHeaderFiltering: false,
                }, {
                    dataField: "LEGENDA_1",
                    caption: "",
                    width: 130,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                }, {
                    dataField: "TEXTO_2",
                    caption: "",
                    width: 25,
                    allowEditing: false,
                    allowSorting: false,
                    alignment: "center",
                    allowHeaderFiltering: false,
                }, {
                    dataField: "LEGENDA_2",
                    caption: "",
                    width: 130,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                }, {
                    dataField: "TEXTO_3",
                    caption: "",
                    width: 25,
                    allowEditing: false,
                    allowSorting: false,
                    alignment: "center",
                    allowHeaderFiltering: false,
                }, {
                    dataField: "LEGENDA_3",
                    caption: "",
                    width: 300,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                }],
            showBorders: false,

            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    if (e.column.dataField === "TEXTO_1") {
                        e.cellElement.css("background-color", e.data.COR_1),
                            e.cellElement.css("color", "white")
                    }
                    else if (e.column.dataField === "TEXTO_2") {
                        e.cellElement.css("background-color", e.data.COR_2),
                            e.cellElement.css("color", "white")
                    }
                    else if (e.column.dataField === "TEXTO_3") {
                        e.cellElement.css("background-color", e.data.COR_3),
                            e.cellElement.css("color", "white")
                    }
                }
            },
        }).dxDataGrid("instance");

        vGridPedidosComplementaresLegenda = $("#gridPedidosComplementaresLegenda").dxDataGrid({
            dataSource: dataSourcePedidosLegenda,
            wordWrapEnabled: false,
            showColumnHeaders: false,
            showRowLines: false,
            showColumnLines: false,
            rowAlternationEnabled: false,
            searchPanel: {
                visible: false,
            },
            allowColumnResizing: false,
            allowColumnReordering: false,
            groupPanel: { visible: false },
            pager: {
                visible: false,
                showPageSizeSelector: false,
                showNavigationButtons: false
            },
            cellHintEnabled: true,
            columnsAutoWidth: false,
            columns: [
                {
                    dataField: "TEXTO_1",
                    caption: "",
                    width: 25,
                    allowEditing: false,
                    allowSorting: false,
                    alignment: "center",
                    allowHeaderFiltering: false,
                }, {
                    dataField: "LEGENDA_1",
                    caption: "",
                    width: 130,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                }, {
                    dataField: "TEXTO_2",
                    caption: "",
                    width: 25,
                    allowEditing: false,
                    allowSorting: false,
                    alignment: "center",
                    allowHeaderFiltering: false,
                }, {
                    dataField: "LEGENDA_2",
                    caption: "",
                    width: 130,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                }, {
                    dataField: "TEXTO_3",
                    caption: "",
                    width: 25,
                    allowEditing: false,
                    allowSorting: false,
                    alignment: "center",
                    allowHeaderFiltering: false,
                }, {
                    dataField: "LEGENDA_3",
                    caption: "",
                    width: 300,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                }],
            showBorders: false,

            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    if (e.column.dataField === "TEXTO_1") {
                        e.cellElement.css("background-color", e.data.COR_1),
                            e.cellElement.css("color", "white")
                    }
                    else if (e.column.dataField === "TEXTO_2") {
                        e.cellElement.css("background-color", e.data.COR_2),
                            e.cellElement.css("color", "white")
                    }
                    else if (e.column.dataField === "TEXTO_3") {
                        e.cellElement.css("background-color", e.data.COR_3),
                            e.cellElement.css("color", "white")
                    }
                }
            },
        }).dxDataGrid("instance");

        vDt_Previsao_Entrega = $("#dt_Previsao_Entrega").dxDateBox({
            labelMode: "floating",
            label: "Data Previsão Entrega",
            placeholder: "",
            showClearButton: false,
            useMaskBehavior: true,
            displayFormat: "dd/MM/yyyy",
            type: "date",
            onValueChanged: function (e) {
                SalvarDadosGerais();
            },
        }).dxDateBox("instance");

        vTxt_Nome_Contato = $("#txt_Nome_Contato").dxTextBox({
            labelMode: "floating",
            label: "Nome do Contato no Fornecedor",
            showClearButton: true,
            onValueChanged: function (e) {
                SalvarDadosGerais();
            },
        }).dxTextBox("instance");

        vTxt_Telefone_Contato = $("#txt_Telefone_Contato").dxTextBox({
            labelMode: "floating",
            label: "Telefone do Contato",
            showClearButton: true,
            onValueChanged: function (e) {
                SalvarDadosGerais();
            },
        }).dxTextBox("instance");

        vTxt_Obs_Pedido = $("#txt_Obs_Pedido").dxTextArea({
            labelMode: "floating",
            label: "Observação do Pedido",
            height: 90,
            maxLength: 4000,
            onValueChanged: function (e) {
                SalvarDadosGerais();
            },
        }).dxTextArea("instance");

        vTxt_Obs_Fornecedor = $("#txt_Obs_Fornecedor").dxTextArea({
            labelMode: "floating",
            label: "Observação do Fornecedor",
            height: 90,
            maxLength: 4000,
            readOnly: true,
        }).dxTextArea("instance");


        vLkp_Periodicidade_Parcelas_Fixas = new DevExpress.ui.dxSelectBox('#lkp_Periodicidade_Parcelas_Fixas', {
            dataSource: {
                store: new DevExpress.data.ArrayStore({
                    key: 'id',
                    data: [
                        { id: 30, text: "Gerar Parcelas Mensais" },
                        { id: 7, text: "Gerar Parcelas Semanais" },
                        { id: 14, text: "Gerar Parcelas Quinzenais" },
                        { id: 10, text: "Gerar Parcelas a cada 10 dias" },
                        { id: 20, text: "Gerar Parcelas a cada 20 dias" },
                    ],
                })
            },
            searchExpr: 'text',
            displayExpr: 'text',
            valueExpr: 'id',
            value: 30,
            labelMode: 'floating',
            label: 'Periodicidade para Geração das Parcelas',
            readOnly: false,
        });

        vGridFormaPagamento = $("#gridFormaPagamento").dxDataGrid({
            dataSource: {
                store: new DevExpress.data.ArrayStore({
                    key: 'id',
                    data: [],
                })
            },
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            editing: {
                mode: 'cell',
                allowUpdating: true,
                startEditAction: 'click',
                allowAdding: true,
                allowDeleting: true,
                useIcons: true,
            },
            keyboardNavigation: {
                enterKeyAction: 'moveFocus',
                enterKeyDirection: 'column',
                editOnKeyPress: true,
            },
            searchPanel: {
                visible: false,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: {
                mode: "multiple"
            },
            allowColumnResizing: false,
            columnResizingMode: "widget",
            repaintChangesOnly: true,
            allowColumnReordering: false,
            groupPanel: {
                visible: false,
                emptyPanelText: "Agrupar"
            },
            paging: {
                pageSize: 1000
            },
            pager: {
                visible: false,
                //allowedPageSizes: [15, 20, 50, 100],
                //showPageSizeSelector: true,
                showNavigationButtons: false
            },
            export: {
                enabled: false,
                allowExportSelectedData: false
            },
            filterRow: {
                visible: false,
                applyFilter: "auto"
            },
            headerFilter: {
                visible: false,
                allowSearch: true
            },
            filterPanel: {
                visible: false
            },
            columnChooser: {
                enabled: false,
                allowSearch: true,
            },
            columnsAutoWidth: true,
            showBorders: true,
            toolbar: {
                items: [
                    {
                        location: 'before',
                        template: () => {
                            let $div = $('<div>');
                            let $h6 = $('<h6 class="mb-1 mt-0 ml-2 informer">').text('PARCELAMENTO');
                            $div.append($h6);
                            return $div;
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            elementAttr: {
                                id: "btnExcluirTodasParcelas",
                            },
                            icon: 'trash',
                            text: 'Excluir parcelas',
                            hint: "Excluir todas as parcelas",
                            onClick: async () => {
                                if (vGridFormaPagamento.totalCount() == 0) {
                                    ExibeMensagem("info", "Não foi possível excluir as parcelas!", "Não existe nenhuma parcela para ser excluída");
                                    return;
                                }

                                var acao = null;
                                await new Promise(function (resolve, reject) {
                                    new modalMessage('ModalMensagem').showQuestionModal(
                                        "<h4>Deseja realmente excluir as parcelas?</h4>",
                                        "Exclusão de Parcelas",
                                        () => { resolve("OK"); },
                                        () => { resolve("ABORTAR"); });
                                }).then(function (response) {
                                    acao = response;
                                });

                                if (acao == "ABORTAR") return;

                                vGridFormaPagamento.loadData();

                                SalvarPedidoCompraCondicao().then((response) => {
                                        ExibeMensagem("success", "Exclusão de parcelas", "Parcelas excluídas com sucesso");
                                    }, (reject) => {
                                        ExibeMensagem("error", "Ocorreu um erro ao excluir as parcelas", reject);
                                    });
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            elementAttr: {
                                id: "btnAdicionarParcela",
                            },
                            icon: 'plus',
                            hint: "Adicionar parcela",
                            onClick: () => {
                                const datagrid = $("#gridFormaPagamento").dxDataGrid("instance");
                                const count = datagrid.totalCount();
                                const parcelas = gerarParcelas(
                                    objPedido.valorTotal,
                                    count + 1,
                                    false,
                                    vLkp_Periodicidade_Parcelas_Fixas.option('value') ?? 30,
                                    true
                                );

                                datagrid.loadData(parcelas);

                                verificaDiferencaParcelas(datagrid, objPedido.valorTotal);

                                SalvarPedidoCompraCondicao().then(null, (reject) => {
                                    ExibeMensagem("error", "Ocorreu um erro ao salvar a parcela adcionada", response);
                                });

                            },
                        },
                    }
                ],
            },
            columns: [
                {
                    dataField: "NR_DIAS",
                    caption: "DIAS",
                    width: 70,
                    allowEditing: true,
                    allowSorting: true,
                    sortOrder: 'asc',
                    allowHeaderFiltering: false,
                    dataType: "number",
                    format: "###,###,###,##0",
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    validationRules: [{
                        type: 'required',
                        message: 'Quantidade de dias para vencimento obrigatório',
                    }],
                    setCellValue: (newData, value, currentRowData) => {
                        newData.NR_DIAS = value ?? 0;
                        return;
                    },
                },
                {
                    dataField: "PC_PARCELA",
                    caption: "% PARCELA",
                    //width: 80,
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    dataType: "number",
                    format: "###,###,###,##0.##",
                    customizeText: (text) => `${text.valueText}%`,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    validationRules: [{
                        type: 'required',
                        message: 'Percentual da parcela obrigatório',
                    }],
                    editorOptions: {
                        min: 0,
                    },
                    setCellValue: (newData, value, currentRowData) => {
                        const total = objPedido.valorTotal;
                        newData.PC_PARCELA = value ?? 0;
                        newData.VL_PARCELA = parseFloat(((newData.PC_PARCELA / 100) * total).toFixed(2));
                    },
                },
                {
                    dataField: "VL_PARCELA",
                    caption: "VALOR PARCELA",
                    //width: 80,
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    alignment: 'right',
                    cssClass: "column-data-grid",
                    validationRules: [{ type: 'required', message: 'Valor da parcela obrigatória', }],
                    editorOptions: {
                        min: 0,
                    },
                    setCellValue: (newData, value, currentRowData) => {
                        const total = objPedido.valorTotal;
                        newData.VL_PARCELA = value ?? 0;
                        newData.PC_PARCELA = parseFloat(((newData.VL_PARCELA / total) * 100).toFixed(2));
                    },
                },
                {
                    type: "buttons",
                    width: 30,
                }
            ],
            summary: {
                totalItems: [
                    {
                        column: 'NR_DIAS',
                        summaryType: 'count',
                        displayFormat: "{0} Parcelas",
                    },
                    {
                        column: 'PC_PARCELA',
                        summaryType: 'sum',
                        valueFormat: "###,###,###,##0.#",
                        displayFormat: "{0}%",
                    },
                    {
                        column: 'VL_PARCELA',
                        summaryType: 'sum',
                        valueFormat: "###,###,###,##0.00",
                        displayFormat: "{0}",
                    }
                ],
            },
            onExporting: (e) => {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('Parcelas');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], {
                            type: 'application/octet-stream'
                        }), 'ParcelasPedidoCompras.xlsx');
                    });
                });
                e.cancel = true;
            },
            onRowPrepared(e) {
                verificaDiferencaParcelas(e.component, objPedido.valorTotal);
            },
            onEditorPreparing: function (e) {
                if (e.parentType == "dataRow" && typeof (e.dataField) != "undefined") {
                    if (e.dataField == "NR_DIAS") {
                        var onValueChanged = e.editorOptions.onValueChanged;
                        e.editorOptions.onValueChanged = function (args) {
                            //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                            onValueChanged.apply(this, arguments);

                            //TRATA O VALOR ALTERADO (NULO E MENOR QUE ZERO)
                            args.value = args.value == null ? args.previousValue : args.value;
                            args.value = args.value < 0 ? args.previousValue : args.value;

                            //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                            onValueChanged.apply(this, arguments);

                            let formaPagamentoRowData = [];

                            //BUSCA OS REGISTROS DO GRID
                            vGridFormaPagamento.getDataSource().store().load().done((allData) => {
                                formaPagamentoRowData = allData;
                            });

                            //FAZ UM LOOP NOS REGISTROS PARA VERIFICAR SE JÁ EXISTE ESTE NÚMERO DE DIAS INFORMADO
                            formaPagamentoRowData.forEach((row) => {
                                if (row.NR_DIAS == args.value && row.id != e.row.data.id) {
                                    ExibeMensagem("info", "Operação inválida", `O número de dias informado (${args.value}) já está definido em outra parcela`);

                                    args.value = args.previousValue;

                                    //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                    onValueChanged.apply(this, arguments);
                                }
                            });
                        }
                    }
                }
            },
            onRowRemoved: async (e) => {

                const parcelas = gerarParcelas(
                    objPedido.valorTotal,
                    e.component.totalCount(),
                    true,
                    vLkp_Periodicidade_Parcelas_Fixas.option('value') ?? 30,
                    true
                );

                vGridFormaPagamento.loadData(parcelas);

                SalvarPedidoCompraCondicao().then(null, (reject) => {
                    ExibeMensagem("error", "Ocorreu um erro ao exclui a parcela", response);
                });
            },
            onRowUpdated: async (e) => {
                SalvarPedidoCompraCondicao().then(null, (reject) => {
                    ExibeMensagem("error", "Ocorreu um erro ao salvar a alteração", response);
                });
            },
            onInitialized: (e) => {
                e.component.loadData = (data) => {
                    data = !data ? [] : Array.isArray(data) ? data : [data];
                    const atual = e.component.option('dataSource');
                    atual.store._array = data;
                    e.component.option('dataSource', atual);
                }
                e.component.refreshIds = () => {
                    e.component.getDataSource().load().then(array => {
                        const newArray = array.map((a, b) => {
                            a.id = b + 1;
                            return a;
                        });
                        e.component.loadData(newArray);
                    });
                };

            //    const toolbar = e.component.option('toolbar');
            //    const addRow = {
            //        location: 'after',
            //        widget: 'dxButton',
            //        options: {
            //            icon: 'plus',
            //            hint: "Adicionar parcela",
            //            onClick: () => {
            //                const count = e.component.totalCount();
            //                const parcelas = gerarParcelas(
            //                    objPedido.valorTotal,
            //                    count + 1,
            //                    false,
            //                    vLkp_Periodicidade_Parcelas_Fixas.option('value') ?? 30,
            //                    true
            //                );

            //                e.component.loadData(parcelas);

            //                verificaDiferencaParcelas(e.component, objPedido.valorTotal);

            //                SalvarPedidoCompraCondicao().then(null, (reject) => {
            //                    ExibeMensagem("error", "Ocorreu um erro ao salvar a parcela adcionada", response);
            //                });

            //            },
            //        },
            //    }

            //    toolbar.items.push(addRow);
            //    e.component.option('toolbar', toolbar);
            },
        }).dxDataGrid("instance");


        //Lookup com formas de pagamento que são aceitas no Contas a Pagar
        GetAzureDataSource(17, '{ CD_STATUS: "A", LG_CONTAS_PAGAR: true }').then((result) => {

            if (result.success) {

                vLkp_Formas_Pagamento = $('#lkp_Formas_Pagamento').dxLookup({
                    dataSource: result.data,
                    searchExpr: ['DS_FORMA_PAGAMENTO'],
                    displayExpr: 'DS_FORMA_PAGAMENTO',
                    valueExpr: 'CD_FORMA_PAGAMENTO',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Forma Pagamento',
                    },
                    labelMode: "floating",
                    label: "Forma de Pagamento",
                    placeholder: 'Clique para selecionar uma Forma de Pagamento',
                    showClearButton: true,
                    onValueChanged: function (e) {
                        SalvarDadosGerais();
                    },
                }).dxLookup("instance");

            }
            else {
                DevExpress.ui.notify({
                    message: `${result.name}: ${result.error}`,
                    type: 'error',
                    displayTime: 5000,
                });
                console.error(`${result.name}: ${result.error}`);
            }
        });

        vTxt_Justificativa_Cancelamento = $("#txt_Justificativa_Cancelamento").dxTextArea({
            labelMode: "floating",
            label: "Justificativa de Cancelamento *",
            height: 150,
            maxLength: 2000,
        }).dxTextArea("instance");

        vTxt_Justificativa_Cancelamento_Visualizar_Modal = $("#txt_Justificativa_Cancelamento_Visualizar_Modal").dxTextArea({
            labelMode: "floating",
            label: "Justificativa de Cancelamento",
            height: 150,
            maxLength: 2000,
            readOnly: true,
        }).dxTextArea("instance");

        vTxt_Justificativa_Cancelamento_Diversos = $("#txt_Justificativa_Cancelamento_Diversos").dxTextArea({
            labelMode: "floating",
            label: "Justificativa de Cancelamento *",
            height: 150,
            maxLength: 2000,
        }).dxTextArea("instance");

        vToolbarItensPedido = $("#toolbarItensPedido").dxToolbar({
            options: { icon: "trash" },
            items: [
                {
                    locateInMenu: "always",
                    widget: "dxButton",
                    options: {
                        text: "Excluir produtos selecionados",
                        icon: "trash",
                        onClick() {
                            vGridItensPedido.cancelEditData();
                            dataDelete = [];

                            vGridItensPedido.getSelectedRowsData().forEach((row) => {
                                dataDelete.push({
                                    CD_EMPRESA: row.CD_EMPRESA,
                                    NR_PEDIDO: objPedido.numero,
                                    CD_PRODUTO: row.CD_PRODUTO
                                });
                            });

                            if (dataDelete.length == 0) return;

                            OpenProcessPanel("Processando...")

                            $.ajax({
                                type: "POST",
                                url: "/PedidoCompra/SalvarPedidoCompraItem",
                                data: {
                                    dataSave: null,
                                    dataDelete: dataDelete.length == 0 ? null : JSON.stringify(dataDelete),
                                },
                                success: function (response) {
                                    if (response.result == "Erro") {
                                        ExibeMensagem("error", "Ocorreu um erro ao excluir os produtos selecionados", response.msg);
                                    }
                                    else {
                                        ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                                        CarregaPedidoCompra();
                                    }
                                },
                                failure: function (response) {
                                    ExibeMensagem("error", "Ocorreu um erro ao excluir os produtos selecionados", JSON.parse(response.responseText));
                                },
                                always: function () {
                                    CloseProcessPanel();
                                }
                            });
                        },
                    },
                },
                {
                    locateInMenu: "always",
                    widget: "dxButton",
                    options: {
                        text: "Excluir produtos com valor unitário zerado",
                        icon: "trash",
                        onClick() {
                            vGridItensPedido.cancelEditData();
                            dataDelete = [];

                            var allRows = null;
                            vGridItensPedido.getDataSource().store().load().done((allData) => {
                                allRows = allData;
                            });

                            allRows.forEach((row) => {
                                if (row.VL_UNITARIO_PRODUTO == 0) {
                                    dataDelete.push({
                                        CD_EMPRESA: row.CD_EMPRESA,
                                        NR_PEDIDO: objPedido.numero,
                                        CD_PRODUTO: row.CD_PRODUTO
                                    });
                                }
                            });

                            if (dataDelete.length == 0) return;

                            OpenProcessPanel("Processando...")

                            $.ajax({
                                type: "POST",
                                url: "/PedidoCompra/SalvarPedidoCompraItem",
                                data: {
                                    dataSave: null,
                                    dataDelete: dataDelete.length == 0 ? null : JSON.stringify(dataDelete),
                                },
                                success: function (response) {
                                    if (response.result == "Erro") {
                                        ExibeMensagem("error", "Ocorreu um erro ao excluir os produtos com valor unitário zerado", response.msg);
                                    }
                                    else {
                                        ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                                        CarregaPedidoCompra();
                                    }
                                },
                                failure: function (response) {
                                    ExibeMensagem("error", "Ocorreu um erro ao excluir os produtos com valor unitário zerado", JSON.parse(response.responseText));
                                },
                                always: function () {
                                    CloseProcessPanel();
                                }
                            });
                        },
                    },
                },
                {
                    locateInMenu: "always",
                    widget: "dxButton",
                    options: {
                        text: "Excluir produtos com quantidade zero",
                        icon: "trash",
                        onClick() {
                            vGridItensPedido.cancelEditData();
                            dataDelete = [];

                            var allRows = null;
                            vGridItensPedido.getDataSource().store().load().done((allData) => {
                                allRows = allData;
                            });

                            allRows.forEach((row) => {
                                if (row.QT_PEDIDA_TOTAL == 0) {
                                    dataDelete.push({
                                        CD_EMPRESA: row.CD_EMPRESA,
                                        NR_PEDIDO: objPedido.numero,
                                        CD_PRODUTO: row.CD_PRODUTO
                                    });
                                }
                            });

                            if (dataDelete.length == 0) return;

                            OpenProcessPanel("Processando...")

                            $.ajax({
                                type: "POST",
                                url: "/PedidoCompra/SalvarPedidoCompraItem",
                                data: {
                                    dataSave: null,
                                    dataDelete: dataDelete.length == 0 ? null : JSON.stringify(dataDelete),
                                },
                                success: function (response) {
                                    if (response.result == "Erro") {
                                        ExibeMensagem("error", "Ocorreu um erro ao excluir os produtos com valor unitário zerado", response.msg);
                                    }
                                    else {
                                        ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                                        CarregaPedidoCompra();
                                    }
                                },
                                failure: function (response) {
                                    ExibeMensagem("error", "Ocorreu um erro ao excluir os produtos com valor unitário zerado", JSON.parse(response.responseText));
                                },
                                always: function () {
                                    CloseProcessPanel();
                                }
                            });
                        },
                    },
                },
                {
                    locateInMenu: "always",
                    widget: "dxButton",
                    options: {
                        text: "Zerar quantidades de produtos selecionados",
                        icon: "clearformat",
                        onClick: async function () {
                            var selectedRows = vGridItensPedido.getSelectedRowsData();

                            if (selectedRows.length == 0) {
                                ExibeMensagem("info", "Operação inválida", "Não foi selecionado nenhum produto")
                                return;
                            }

                            OpenProcessPanel("Processando...")

                            for (const produto of selectedRows) {
                                for (const almox of arrayAlmoxarifadosPedido) {
                                    //PEGA O ÍNDICE PRODUTO NO GRID DE ITENS
                                    var rowIndexProduto = vGridItensPedido.getRowIndexByKey(produto.CD_PRODUTO);

                                    //ZERA A QUANTIDADE DO PRODUTO NO ALMOXARIFADO
                                    vGridItensPedido.cellValue(rowIndexProduto, "QT_PEDIDA_ALMOXARIFADO_" + almox, 0);
                                    SumarizaQuantidadeGrid(vGridItensPedido, rowIndexProduto);
                                }
                            }

                            await vGridItensPedido.saveEditData();

                            CloseProcessPanel();
                        },
                    },
                },
            ],
        }).dxToolbar("instance");

        vToolbarPedidosConsulta = $("#toolbarPedidosConsulta").dxToolbar({
            items: [
                {
                    locateInMenu: "always",
                    widget: "dxButton",
                    options: {
                        text: "Concluir pedidos selecionados",
                        icon: "check",
                        onClick() {
                            ConcluirPedidosSelecionados(vGridConsultaGeralPedidos);
                        },
                    },
                },
                {
                    locateInMenu: "always",
                    widget: "dxButton",
                    options: {
                        text: "Cancelar pedidos selecionados",
                        icon: "trash",
                        onClick() {
                            CancelarPedidosSelecionados(vGridConsultaGeralPedidos);
                        },
                    },
                },
            ],
        }).dxToolbar("instance");

        vToolbarPedidosRelacionados = $("#toolbarPedidosRelacionados").dxToolbar({
            items: [
                {
                    locateInMenu: "always",
                    widget: "dxButton",
                    options: {
                        text: "Concluir pedidos selecionados",
                        icon: "check",
                        onClick() {
                            ConcluirPedidosSelecionados(vGridPedidosComplementares);
                        },
                    },
                },
                {
                    locateInMenu: "always",
                    widget: "dxButton",
                    options: {
                        text: "Concluir pedidos selecionados",
                        icon: "trash",
                        onClick() {
                            CancelarPedidosSelecionados(vGridPedidosComplementares);
                        },
                    },
                },
            ],
        }).dxToolbar("instance");

        //CONSULTA GERAL
        vNbx_Dias_Filtro_Consulta_Geral = $("#nbx_Dias_Filtro_Consulta_Geral").dxNumberBox({
            value: 30,
            format: "0,###.## dias",
            showSpinButtons: true,
            readOnly: false,
            step: 10,
            min: 0,
            labelMode: "floating",
            label: "Registros dos últimos",
            buttons: [{
                name: "OK",
                location: "after",
                options: {
                    text: "Aplicar",
                    stylingMode: "text",
                    width: 60,
                    elementAttr: {
                        id: "btnAplicarDiasFiltroConsultaGeral",
                        class: "botao-aplicar-number-box",
                    },
                    onClick(e) {
                        CarregaGridConsultaPedidos();
                    },
                },
            }, "clear", "spins"],
            onKeyPress: function (e) {
                if (e.event.key == "Enter") {
                    CarregaGridConsultaPedidos();
                }
            },
        }).dxNumberBox("instance");

        await Load_Azr_Lookup_Produto("lkp_Produtos_Filtro_Consulta_Geral", arrayComponentes)
        vLkp_Produtos_Filtro_Consulta_Geral = $("#lkp_Produtos_Filtro_Consulta_Geral").dxLookup({
            label: "Pesquisar pedidos de compra que contenham um produto específico",
            placeholder: "Pesquisar pedidos de compra que contenham um produto específico",
            onValueChanged: function (e) {
                CarregaGridConsultaPedidos();
            },
        }).dxLookup("instance");

        Load_Azr_TagBox_Almoxarifado(arrayComponentes, "tag_Almoxarifados_Filtro_Consulta_Geral", '', "Almoxarifado não identificado", "Almoxarifados");
        vTag_Almoxarifados_Filtro_Consulta_Geral = $("#tag_Almoxarifados_Filtro_Consulta_Geral").dxTagBox({
            onValueChanged: function (e) {
                CarregaGridConsultaPedidos();
            },
        }).dxTagBox("instance");

        vGridConsultaGeralPedidos = $("#gridConsultaGeralPedidos").dxDataGrid({
            dataSource: [],
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
            sorting: { mode: "multiple" },
            selection: {
                mode: "multiple",
                showCheckBoxesMode: "always",
            },
            allowColumnResizing: true,
            repaintChangesOnly: true,
            columnResizingMode: "widget",
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Arraste as colunas do grid para esta área para agrupar" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
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
                var worksheet = workbook.addWorksheet("Consulta Geral");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "CompraConsultaGeral.xlsx");
                    });
                });
                e.cancel = true;
            },
            filterRow: { visible: true, applyFilter: "auto" },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: { visible: true },
            columnChooser: { enabled: true, allowSearch: true, width: 300, height: 500 },
            columnsAutoWidth: true,
            keyExpr: "NR_PEDIDO",
            columns: [
                {
                    type: "selection",
                    width: 30,
                }, {
                    dataField: "DS_COLUMN_STATUS",
                    caption: "",
                    width: 7,
                    allowEditing: false,
                    allowSorting: false,
                    alignment: "center",
                    allowHeaderFiltering: false,
                    allowFiltering: false,
                }, {
                    dataField: "NR_PEDIDO",
                    caption: "Pedido",
                    width: 60,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_SITUACAO",
                    caption: "Status",
                    width: 70,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_RECEBIDO",
                    caption: "Recebido",
                    width: 70,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_FORNECEDOR",
                    caption: "Cód. Fornecedor",
                    width: 90,
                    allowEditing: false,
                    allowSorting: true,
                    visible: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_RAZAO_SOCIAL_FORNECEDOR",
                    caption: "Fornecedor",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_CONTATO",
                    caption: "Contato",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_TELEFONE",
                    caption: "Telefone",
                    width: 200,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DT_INCLUSAO",
                    caption: "Data",
                    width: 75,
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DT_PREVISAO_ENTREGA",
                    caption: "Previsão Entrega",
                    width: 75,
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_FATURAMENTO_MINIMO",
                    caption: "Vl. Fatur. Mínimo",
                    width: 65,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "FATURAMENTO_MINIMO_FM",
                    caption: "",
                    width: 26,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    allowFiltering: false,
                }, {
                    dataField: "VL_TOTAL",
                    caption: "Valor Pedido",
                    width: 70,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    summaryType: "sum",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "LG_PEDIDO_ENVIADO",
                    caption: "Enviado",
                    width: 50,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "NR_COTACAO",
                    caption: "Cotação",
                    width: 60,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    visible: false,
                }, {
                    dataField: "ACOES",
                    caption: "Ações",
                    cssClass: "column-data-grid",
                    alignment: "center",
                    visible: true,
                    columns: [
                        {
                            dataField: "DS_IMAGEM_EMAIL",
                            caption: "e-mail",
                            width: 40,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            allowFiltering: false,
                            alignment: "center",
                            cellTemplate(container, options) {
                                $("<div>")
                                    .append($("<img>", { src: options.value }))
                                    .appendTo(container);
                            },
                        },
                        {
                            dataField: "DS_IMAGEM_WHATSAPP",
                            caption: "whats",
                            width: 40,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            allowFiltering: false,
                            alignment: "center",
                            cellTemplate(container, options) {
                                $("<div>")
                                    .append($("<img>", { src: options.value }))
                                    .appendTo(container);
                            },
                        },
                        {
                            dataField: "DS_IMAGEM_IMPRIMIR",
                            caption: "print",
                            width: 40,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            allowFiltering: false,
                            alignment: "center",
                            cellTemplate(container, options) {
                                $("<div>")
                                    .append($("<img>", { src: options.value }))
                                    .appendTo(container);
                            },
                        },
                    ]
                }],

            summary: {
                totalItems: [{
                    column: "NR_PEDIDO",
                    summaryType: "count",
                    displayFormat: "{0} pedidos",
                }, {
                    column: "VL_TOTAL",
                    summaryType: "sum",
                    valueFormat: "###,###,###,##0.00",
                    displayFormat: "{0}",
                }],
            },

            showBorders: true,

            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    if (e.column.dataField === "FATURAMENTO_MINIMO_FM" && e.data.FATURAMENTO_MINIMO_FM.toString().length > 0) {
                        e.cellElement.css("background-color", "#736f72");
                        e.cellElement.css("color", "white");
                    }
                    if (e.column.dataField === "DS_COLUMN_STATUS") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS);
                    }

                    if (e.column.dataField) {
                        e.cellElement.css({ "cursor": "pointer" });
                    }
                }
            },

            onCellClick: function (e) {
                if (e.rowType === "data") {
                    if (e.column.caption == "e-mail") {
                        OpenModalEnvioEmail(e.data.NR_PEDIDO, e.data.CD_SITUACAO);
                    }
                    else if (e.column.caption == "whats") {
                        OpenModalEnvioWhatsApp(e.data.NR_PEDIDO, e.data.CD_SITUACAO);
                    }
                    else if (e.column.caption == "print") {
                        ImprimirPedido(e.data.NR_PEDIDO);
                    }
                }
            },

            onCellDblClick: function (e) {
                if ((e.rowType === "data") &&
                    (e.column.type !== "selection") &&
                    (e.column.dataField !== "LG_PEDIDO_ENVIADO")) {

                    objPedido.numero = e.data.NR_PEDIDO;
                    CarregaPedidoCompra();

                    //Verifica se a consulta está expandida eu se está reduzida na lateral.
                    //Caso esteja na lateral, o pedido será carregado sem fechar a tela de consulta
                    if (document.getElementById("pedidoCompra").style.display === "none") {
                        closeConsultaPedidosPanel();
                    }
                }
            },

            stateStoring: AutoLoad("gridConsultaGeralPedidos", false),

            onToolbarPreparing: AutoResetState([]),

        }).dxDataGrid("instance");

        var vItemWorkflowIndex = null;
        //CONFIGURAÇÕES GERAIS
        listWorkflow = $("#listWorkflow").dxList({
            keyExpr: 'CD_ETAPA_COMPRA',
            displayExpr: 'DS_ETAPA_COMPRA',
            showSelectionControls: true,
            selectionMode: "multiple",
            selectByClick: true,
            dataSource: new DevExpress.data.CustomStore({
                key: 'CD_ETAPA_COMPRA',
                loadMode: 'raw',
                load: async () => {
                    var dataSourceWorkflow = [];

                    await $.ajax({
                        type: "POST",
                        url: "/PedidoCompra/GetWorkFlowCompras",
                        success: function (response) {
                            if (response.result == "Erro") {
                                ExibeMensagem("error", "Ocorreu um erro ao buscar o workflow de compras", response.msg);
                                return;
                            }
                            else {
                                dataSourceWorkflow = response;
                            }
                        },
                        failure: function (response) {
                            ExibeMensagem("error", "Ocorreu um erro ao buscar o workflow de compras", JSON.parse(response.responseText));
                        }
                    });

                    return dataSourceWorkflow;
                },
            }),
            onContentReady: function (e) {
                const data = e.component.getDataSource().store().__rawData;
                if (!data) return;
                e.component.option("selectedItemKeys", data.filter(a => a.LG_ETAPA_OBRIGATORIA == true).map(a => a.CD_ETAPA_COMPRA));
            },
            onItemRendered: function (e) {
                var index = e.itemIndex;

                if (index == 1) { //APROVAÇÃO DE SOLICITAÇÃO
                    if (listWorkflow.option("items")[0].LG_ETAPA_OBRIGATORIA == false) { //SOLICITAÇÃO DE COMPRA
                        listWorkflow.option("items")[1].LG_ETAPA_OBRIGATORIA = false; //APROVAÇÃO DE SOLICITAÇÃO
                        listWorkflow.option("items")[1].disabled = true; //APROVAÇÃO DE SOLICITAÇÃO
                    } else {
                        listWorkflow.option("items")[1].disabled = false; //APROVAÇÃO DE SOLICITAÇÃO
                    }
                }
                else if (index == 3) { //APROVAÇÃO DE COTAÇÃO
                    if (listWorkflow.option("items")[2].LG_ETAPA_OBRIGATORIA == false) { //COTAÇÃO DE COMPRA
                        listWorkflow.option("items")[3].LG_ETAPA_OBRIGATORIA = false; //APROVAÇÃO DE COTAÇÃO
                        listWorkflow.option("items")[3].disabled = true; //APROVAÇÃO DE COTAÇÃO
                    } else {
                        listWorkflow.option("items")[3].disabled = false; //APROVAÇÃO DE COTAÇÃO
                    }
                }
                else if (index == 5 || index == 6) { //APROVAÇÃO DE PEDIDO OU RECEBIMENTO COM PEDIDO
                    if (listWorkflow.option("items")[4].LG_ETAPA_OBRIGATORIA == false) { //PEDIDO DE COMPRA
                        listWorkflow.option("items")[5].LG_ETAPA_OBRIGATORIA = false; //APROVAÇÃO DE PEDIDO
                        listWorkflow.option("items")[5].disabled = true; //APROVAÇÃO DE PEDIDO
                        listWorkflow.option("items")[6].LG_ETAPA_OBRIGATORIA = false; //RECEBIMENTO COM PEDIDO
                        listWorkflow.option("items")[6].disabled = true; //RECEBIMENTO COM PEDIDO
                    } else {
                        listWorkflow.option("items")[5].disabled = false; //APROVAÇÃO DE PEDIDO
                        listWorkflow.option("items")[6].disabled = false; //RECEBIMENTO COM PEDIDO
                    }
                }
            },
            onSelectionChanged: async (e) => {
                const itemsMap = [
                    ...e.addedItems.map(a => Object({
                        CD_ETAPA_COMPRA: a.CD_ETAPA_COMPRA,
                        LG_ETAPA_OBRIGATORIA: true,
                    })),
                    ...e.removedItems.map(a => Object({
                        CD_ETAPA_COMPRA: a.CD_ETAPA_COMPRA,
                        LG_ETAPA_OBRIGATORIA: false,
                    })),
                ];

                for (var i = 0; i < itemsMap.length; i++) {
                    const item = listWorkflow.option().items.find(a => a.CD_ETAPA_COMPRA == itemsMap[i].CD_ETAPA_COMPRA);
                    var index = listWorkflow.option().items.indexOf(item);

                    item.LG_ETAPA_OBRIGATORIA = itemsMap[i].LG_ETAPA_OBRIGATORIA;

                    if (index == 0) { //SOLICITAÇÃO DE COMPRA
                        if (item.LG_ETAPA_OBRIGATORIA == false) {
                            listWorkflow.option("items")[1].LG_ETAPA_OBRIGATORIA = false; //APROVAÇÃO DE SOLICITAÇÃO
                            listWorkflow.option("items")[1].disabled = true; //APROVAÇÃO DE SOLICITAÇÃO
                        } else {
                            listWorkflow.option("items")[1].disabled = false; //APROVAÇÃO DE SOLICITAÇÃO
                        }
                    }
                    else if (index == 2) { //COTAÇÃO DE COMPRA
                        if (item.LG_ETAPA_OBRIGATORIA == false) {
                            listWorkflow.option("items")[3].LG_ETAPA_OBRIGATORIA = false; //APROVAÇÃO DE COTAÇÃO
                            listWorkflow.option("items")[3].disabled = true; //APROVAÇÃO DE COTAÇÃO
                        } else {
                            listWorkflow.option("items")[3].disabled = false; //APROVAÇÃO DE COTAÇÃO
                        }
                    }
                    else if (index == 4) { //PEDIDO DE COMPRA
                        if (item.LG_ETAPA_OBRIGATORIA == false) {
                            listWorkflow.option("items")[5].LG_ETAPA_OBRIGATORIA = false; //APROVAÇÃO DE PEDIDO
                            listWorkflow.option("items")[5].disabled = true; //APROVAÇÃO DE PEDIDO
                            listWorkflow.option("items")[6].LG_ETAPA_OBRIGATORIA = false; //RECEBIMENTO COM PEDIDO
                            listWorkflow.option("items")[6].disabled = true; //RECEBIMENTO COM PEDIDO
                        } else {
                            listWorkflow.option("items")[5].disabled = false; //APROVAÇÃO DE PEDIDO
                            listWorkflow.option("items")[6].disabled = false; //RECEBIMENTO COM PEDIDO
                        }
                    }

                    if (vLoading == false) {
                        //SALVA A ALTERAÇÃO NO BANCO DE DADOS
                        $.ajax({
                            type: "POST",
                            url: "/PedidoCompra/SalvarWorkflowCompras",
                            data: {
                                parameters: JSON.stringify([
                                    { id: "CD_EMPRESA", value: vCDEmpresa, isKey: true },
                                    { id: "CD_ETAPA_COMPRA", value: itemsMap[i].CD_ETAPA_COMPRA, isKey: true },
                                    { id: "LG_ETAPA_OBRIGATORIA", value: itemsMap[i].LG_ETAPA_OBRIGATORIA, isKey: false }
                                ])
                            },
                            success: function (response) {
                                if (response.result == "Erro") {
                                    ExibeMensagem("error", "Ocorreu um erro ao salvar o workflow de compras", response.msg);
                                    return;
                                }
                                else {
                                    ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                                }
                            },
                            failure: function (response) {
                                ExibeMensagem("error", "Ocorreu um erro ao salvar o workflow de compras", JSON.parse(response.responseText));
                            }
                        });
                    }
                }

                listWorkflow.repaint();
            },
        }).dxList("instance");

        vChk_Confirma_Envio_Email_Pedido_Compra = $("#chk_Confirma_Envio_Email_Pedido_Compra").dxCheckBox({
            text: "Enviar e-mail automaticamente ao fornecedor assim o pedido for concluído",
            onValueChanged(e) {
                SalvaParametros();
            },
        }).dxCheckBox("instance");

        vRdb_Tipo_Custo_Impressao_Pedido = $("#radioTipoCustoImpressaoPedido").dxRadioGroup({
            items: [
                { id: false, text: "Bruto" },
                { id: true, text: "Total" },
            ],
            valueExpr: "id",
            displayExpr: "text",
            onValueChanged(e) {
                SalvaParametros();
            },
        }).dxRadioGroup("instance");

        vRdb_Tipo_Transferencia = $("#radioTipoTransferencia").dxRadioGroup({
            items: [
                { id: "E", text: "Geração de transferência expressa" },
                { id: "C", text: "Geração de transferência controlada" },
            ],
            valueExpr: "id",
            displayExpr: "text",
            onValueChanged(e) {
                SalvaParametros();
            },
        }).dxRadioGroup("instance");

        vTxt_Formula_Media_Venda_Diaria = $("#txt_Formula_Media_Venda_Diaria").dxTextBox({
            labelMode: "floating",
            label: "Fórmula para cálculo de média de vendas",
            showClearButton: true,
            onValueChanged(e) {
                SalvaParametros();
            },
        }).dxTextBox("instance");

        //CONFIGURAÇÕES USUÁRIO
        vLkp_Usuario_Configuracoes = $('#lkp_Usuario_Configuracoes').dxLookup({
            dataSource: LoadLookupUsuarioConfiguracao(),
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
            onSelectionChanged: async (data) => {
                let foto = '/img/fotos-usuarios/sem-foto-pesquisa.jpg' + '?' + new Date().getTime();
                if (data.selectedItem === null) {
                    ExibirEsconderPaineis('accParametrosUsuario', 'none');
                    ExibirEsconderPaineis('accParametrosCargo', 'none');
                } else {
                    OpenProcessPanel("Carregando...");
                    foto = data.selectedItem.DS_URL_FOTO + '?' + new Date().getTime();
                    vLoading = true;
                    await GetUsuarioCargoComprador(data.selectedItem.CD_LOGIN);
                    await GetUsuarioParametroCompraConfiguracao(data.selectedItem.CD_LOGIN);
                    vLoading = false;
                    CloseProcessPanel();
                }

                $("#fotoUsuarioConfiguracoes")
                    .attr("src", foto)
                    .attr("onerror", "this.onerror=null;this.src='/img/fotos-usuarios/sem-foto-pesquisa.jpg' + '?' + new Date().getTime();");
            }
        }).dxLookup("instance");

        vNbx_Vl_Limite_Pedido_Compra = $('#nbx_Vl_Limite_Pedido_Compra').dxNumberBox({
            value: null,
            format: 'R$ ###,###,###,##0.00',
            min: 0,
            showClearButton: true,
            showSpinButtons: true,
            step: 1000,
            onValueChanged(e) {
                AlterarUsuarioCargoComprador();
            },
        }).dxNumberBox('instance');

        vChk_Usuario_Consulta_Pedido = $("#chk_Usuario_Consulta_Pedido").dxCheckBox({
            text: "Permite consultar pedidos",
            onValueChanged(e) {
                if (e.value == false) {
                    const componentes = [
                        vChk_Usuario_Inclui_Pedido,
                        vChk_Usuario_Conclui_Pedido,
                        vChk_Usuario_Cancela_Pedido,
                        vChk_Usuario_Envia_Pedido,
                        vChk_Usuario_Permite_Criar_Transferencia,
                        vChk_Usuario_Permite_Criar_Cotacao,
                        vChk_Usuario_Permite_Enviar_Cotacao,
                    ];

                    //GUARDA O VALOR DA VARIÁVEL VLOADING
                    var originalLoading = vLoading;

                    vLoading = true;
                    componentes.forEach(componente => {
                        componente.option('value', false);
                    });

                    //RETORNA O VALOR DA VARIÁVEL VLOADING
                    vLoading = originalLoading;
                }

                objUsuarioParametroCompraConfiguracao.LG_CONSULTA_PEDIDO = e.value;
                AlterarUsuarioParametroCompraConfiguracao();
            },
        }).dxCheckBox("instance");

        vChk_Usuario_Inclui_Pedido = $("#chk_Usuario_Inclui_Pedido").dxCheckBox({
            text: "Permite incluir pedido",
            onValueChanged(e) {
                objUsuarioParametroCompraConfiguracao.LG_INCLUI_PEDIDO = e.value;
                AlterarUsuarioParametroCompraConfiguracao();

                if (e.value == true && objUsuarioParametroCompraConfiguracao.LG_CONSULTA_PEDIDO == false) {
                    vChk_Usuario_Consulta_Pedido.option('value', true);
                }
            },
        }).dxCheckBox("instance");

        vChk_Usuario_Conclui_Pedido = $("#chk_Usuario_Conclui_Pedido").dxCheckBox({
            text: "Permite concluir pedido",
            onValueChanged(e) {
                objUsuarioParametroCompraConfiguracao.LG_CONCLUI_PEDIDO = e.value;
                AlterarUsuarioParametroCompraConfiguracao();

                if (e.value == true && objUsuarioParametroCompraConfiguracao.LG_CONSULTA_PEDIDO == false) {
                    vChk_Usuario_Consulta_Pedido.option('value', true);
                }
            },
        }).dxCheckBox("instance");

        vChk_Usuario_Permite_Liberacao_Pedido = $("#chk_Usuario_Permite_Liberacao_Pedido").dxCheckBox({
            text: "Permite concluir pedidos aguardando liberação (libera pedidos bloqueados)",
            onValueChanged(e) {
                objUsuarioParametroCompraConfiguracao.LG_PERMITE_LIBERACAO_PEDIDO = e.value;
                AlterarUsuarioParametroCompraConfiguracao();

                if (e.value == true && objUsuarioParametroCompraConfiguracao.LG_CONSULTA_PEDIDO == false) {
                    vChk_Usuario_Consulta_Pedido.option('value', true);
                }
            },
        }).dxCheckBox("instance");

        vChk_Usuario_Cancela_Pedido = $("#chk_Usuario_Cancela_Pedido").dxCheckBox({
            text: "Permite cancelar pedido",
            onValueChanged(e) {
                objUsuarioParametroCompraConfiguracao.LG_CANCELA_PEDIDO = e.value;
                AlterarUsuarioParametroCompraConfiguracao();

                if (e.value == true && objUsuarioParametroCompraConfiguracao.LG_CONSULTA_PEDIDO == false) {
                    vChk_Usuario_Consulta_Pedido.option('value', true);
                }
            },
        }).dxCheckBox("instance");

        vChk_Usuario_Envia_Pedido = $("#chk_Usuario_Envia_Pedido").dxCheckBox({
            text: "Permite enviar o pedido (e-mail/whatsapp)",
            onValueChanged(e) {
                objUsuarioParametroCompraConfiguracao.LG_ENVIA_PEDIDO = e.value;
                AlterarUsuarioParametroCompraConfiguracao();

                if (e.value == true && objUsuarioParametroCompraConfiguracao.LG_CONSULTA_PEDIDO == false) {
                    vChk_Usuario_Consulta_Pedido.option('value', true);
                }
            },
        }).dxCheckBox("instance");

        vChk_Usuario_Permite_Criar_Transferencia = $("#chk_Usuario_Permite_Criar_Transferencia").dxCheckBox({
            text: "Permite criar transferência (expressa/controlada)",
            onValueChanged(e) {
                objUsuarioParametroCompraConfiguracao.LG_PERMITE_CRIAR_TRANSFERENCIA = e.value;
                AlterarUsuarioParametroCompraConfiguracao();

                if (e.value == true && objUsuarioParametroCompraConfiguracao.LG_CONSULTA_PEDIDO == false) {
                    vChk_Usuario_Consulta_Pedido.option('value', true);
                }
            },
        }).dxCheckBox("instance");

        vChk_Usuario_Permite_Criar_Cotacao = $("#chk_Usuario_Permite_Criar_Cotacao").dxCheckBox({
            text: "Permite criar cotação",
            onValueChanged(e) {
                objUsuarioParametroCompraConfiguracao.LG_PERMITE_CRIAR_COTACAO = e.value;
                AlterarUsuarioParametroCompraConfiguracao();

                if (e.value == true && objUsuarioParametroCompraConfiguracao.LG_CONSULTA_PEDIDO == false) {
                    vChk_Usuario_Consulta_Pedido.option('value', true);
                }
            },
        }).dxCheckBox("instance");

        vChk_Usuario_Permite_Enviar_Cotacao = $("#chk_Usuario_Permite_Enviar_Cotacao").dxCheckBox({
            text: "Permite enviar cotação",
            onValueChanged(e) {
                objUsuarioParametroCompraConfiguracao.LG_PERMITE_ENVIAR_COTACAO = e.value;
                AlterarUsuarioParametroCompraConfiguracao();

                if (e.value == true && objUsuarioParametroCompraConfiguracao.LG_CONSULTA_PEDIDO == false) {
                    vChk_Usuario_Consulta_Pedido.option('value', true);
                }
            },
        }).dxCheckBox("instance");

        vChk_Emite_Alerta_Pedidos_Proprios_Nao_Enviados = $("#chk_Emite_Alerta_Pedidos_Proprios_Nao_Enviados").dxCheckBox({
            text: "Emite alerta de pedidos aprovados e não enviados ao fornecedor (apenas para os pedidos criados pelo usuário)",
            onValueChanged(e) {
                objUsuarioParametroCompraConfiguracao.LG_EMITE_ALERTA_PEDIDOS_PROPRIOS_NAO_ENVIADOS = e.value;
                AlterarUsuarioParametroCompraConfiguracao();
            },
        }).dxCheckBox("instance");

        vChk_Emite_Alerta_Todos_Pedidos_Nao_Enviados = $("#chk_Emite_Alerta_Todos_Pedidos_Nao_Enviados").dxCheckBox({
            text: "Emite alerta de pedidos aprovados e não enviados ao fornecedor (todos os pedidos de compras nesta situação)",
            onValueChanged(e) {
                objUsuarioParametroCompraConfiguracao.LG_EMITE_ALERTA_TODOS_PEDIDOS_NAO_ENVIADOS = e.value;
                AlterarUsuarioParametroCompraConfiguracao();
            },
        }).dxCheckBox("instance");

        //SOLICITAÇÕES DE COMPRA
        vNbx_Dias_Filtro_Solicitacao_Compra = $("#nbx_Dias_Filtro_Solicitacao_Compra").dxNumberBox({
            value: 30,
            format: "0,###.## dias",
            showSpinButtons: true,
            readOnly: false,
            step: 10,
            min: 0,
            labelMode: "floating",
            label: "Registros dos últimos",
            buttons: [{
                name: "OK",
                location: "after",
                options: {
                    text: "Aplicar",
                    stylingMode: "text",
                    width: 60,
                    elementAttr: {
                        id: "btnAplicarDiasFiltroSolicitacaoCompra",
                        class: "botao-aplicar-number-box",
                    },
                    onClick(e) {
                        CarregaGridSolicitacaoCompra();
                    },
                },
            }, "clear", "spins"],
            onKeyPress: function (e) {
                if (e.event.key == "Enter") {
                    CarregaGridSolicitacaoCompra();
                }
            },
        }).dxNumberBox("instance");

        vGridSolicitacaoCompra = $("#gridSolicitacaoCompra").dxDataGrid({
            dataSource: [],
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
            sorting: { mode: "multiple" },
            selection: {
                mode: "multiple",
                showCheckBoxesMode: "always",
            },
            allowColumnResizing: true,
            columnResizingMode: "widget",
            repaintChangesOnly: true,
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Arraste as colunas do grid para esta área para agrupar" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
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
                var worksheet = workbook.addWorksheet("Solicitaçao de Compra");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "SolicitacaoCompra.xlsx");
                    });
                });
                e.cancel = true;
            },
            filterRow: { visible: true, applyFilter: "auto" },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: { visible: true },
            columnChooser: { enabled: true, allowSearch: true, width: 300, height: 500 },
            columnsAutoWidth: true,
            keyExpr: ["NR_SOLICITACAO", "CD_ALMOXARIFADO", "CD_PRODUTO"],
            columns: [
                {
                    type: "selection",
                    width: 30,
                }, {
                    dataField: "NR_SOLICITACAO",
                    caption: "Solicitação",
                    allowEditing: false,
                    allowSorting: true,
                    width: 70,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DT_SOLICITACAO",
                    caption: "Emissão",
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    width: 75,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_ALMOXARIFADO",
                    caption: "Almox.",
                    width: 45,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_FORNECEDOR_PADRAO",
                    caption: "Cód. Fornecedor Padrão",
                    width: 70,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_RAZAO_SOCIAL_FORNECEDOR_PADRAO",
                    caption: "Fornecedor Padrão",
                    minWidth: 100,
                    allowEditing: false,
                    allowSorting: true,
                    groupIndex: 0,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_PRODUTO",
                    caption: "Código Interno",
                    width: 70,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_PRODUTO",
                    caption: "Descrição Produto",
                    minWidth: 100,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_FABRICANTE",
                    caption: "Código Fabricante",
                    width: 80,
                    visible: true,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_ORIGINAL",
                    caption: "Código Original",
                    width: 80,
                    visible: true,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_MARCA",
                    caption: "Marca",
                    width: 100,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "QT_SOLICITADA",
                    caption: "Qt. Solicitada",
                    width: 70,
                    dataType: "number",
                    format: "###,###,###,##0.#####",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_CUSTO_BRUTO_COTADO",
                    caption: "Vl. Cotado Previamente",
                    width: 70,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_FORNECEDOR",
                    caption: "Cód. Fornecedor Cotado",
                    width: 70,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_RAZAO_SOCIAL",
                    caption: "Fornecedor Cotado Previamente",
                    minWidth: 100,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "NR_PEDIDO",
                    caption: "Nº Pedido",
                    width: 80,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "right",
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_LOGIN_VENDEDOR",
                    caption: "Vendedor",
                    minWidth: 100,
                    allowEditing: false,
                    allowSorting: true,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DT_EMISSAO_PEDIDO",
                    caption: "Emissão Pedido",
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    width: 75,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DT_PREVISAO_ENTREGA",
                    caption: "Previsão Entrega",
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    width: 75,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    visible: false,
                    cssClass: "column-data-grid",
                }],
            showBorders: true,

            toolbar: {
                items: [
                    {
                        location: "after",
                        widget: "dxButton",
                        options: {
                            text: "Adicionar Solicitações",
                            hint: "Adicionar solicitações selecionadas",
                            width: 160,
                            icon: "save",
                            onClick(e) {
                                vGridSolicitacaoCompra.saveEditData();
                            },
                        },
                    },
                    "groupPanel",
                    "columnChooserButton",
                    "searchPanel",
                ],
            },

            onCellPrepared: function (e) {
                if (e.rowType === "data" && e.column.type == "selection") {
                    if (e.data.LG_REGISTRO_SELECIONADO == true) {
                        e.component.selectRows(e.key, true)
                    }
                }
            },

            onSaving: function (e) {
                (async () => {
                    var vSolicitacoes = "";
                    for (const solicitacao of e.component.getSelectedRowsData()) {
                        vSolicitacoes = (vSolicitacoes.length > 0 ? vSolicitacoes + "," : "") + solicitacao.NR_SOLICITACAO + "§" + solicitacao.CD_ALMOXARIFADO + "§" + solicitacao.CD_PRODUTO;
                    }

                    await $.ajax({
                        type: "POST",
                        url: "/PedidoCompra/IncluirSolicitacaoPedido",
                        data: {
                            parameters: JSON.stringify([
                                { id: "NR_PEDIDO", value: objPedido.numero },
                                { id: "DS_SOLICITACOES", value: vSolicitacoes }
                            ])
                        },
                        success: function (response) {
                            if (response.result == "Erro") {
                                ExibeMensagem("error", "Ocorreu um erro ao salvar as solicitações no pedido de compra", response.msg);
                                return;
                            }
                            else {
                                ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                            }
                        },
                        failure: function (response) {
                            ExibeMensagem("error", "Ocorreu um erro ao salvar as solicitações no pedido de compra", JSON.parse(response.responseText));
                        }
                    });

                    await CarregaPedidoCompra();
                    FecharModal("ModalSolicitacaoCompra");
                })();
            },
            stateStoring: AutoLoad("gridSolicitacaoCompra", false),
            onToolbarPreparing: AutoResetState([]),

        }).dxDataGrid("instance");

        vGridSolicitacaoCompraPedido = $("#gridSolicitacaoCompraPedido").dxDataGrid({
            dataSource: null,
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
            sorting: { mode: "multiple" },
            allowColumnResizing: true,
            columnResizingMode: "widget",
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Arraste as colunas do grid para esta área para agrupar" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
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
                var worksheet = workbook.addWorksheet("Solicitacao de Compra");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "SolicitacaoCompra.xlsx");
                    });
                });
                e.cancel = true;
            },
            filterRow: { visible: true, applyFilter: "auto" },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: { visible: true },
            columnChooser: { enabled: true, allowSearch: true, width: 300, height: 500 },
            columnsAutoWidth: true,
            repaintChangesOnly: true,
            keyExpr: ["NR_SOLICITACAO", "CD_ALMOXARIFADO", "CD_PRODUTO"],
            columns: [
                {
                    dataField: "NR_SOLICITACAO",
                    caption: "Solicitação",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DT_SOLICITACAO",
                    caption: "Data",
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_ALMOXARIFADO",
                    caption: "Almox.",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_PRODUTO",
                    caption: "Código Interno",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_PRODUTO",
                    caption: "Descrição Produto",
                    minWidth: 200,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_FABRICANTE",
                    caption: "Código Fabricante",
                    visible: false,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_ORIGINAL",
                    caption: "Código Original",
                    visible: false,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_MARCA",
                    caption: "Marca",
                    visible: false,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DT_PREVISAO_ENTREGA",
                    caption: "Previsão Entrega",
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "QT_SOLICITADA",
                    caption: "Qt. Solicitada",
                    dataType: "number",
                    format: "###,###,###,##0.#####",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_CUSTO_BRUTO_COTADO",
                    caption: "Vl. Cotado",
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_FORNECEDOR",
                    caption: "Cód. Fornecedor",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_RAZAO_SOCIAL",
                    caption: "Fornecedor",
                    minWidth: 200,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }],
            showBorders: true,
            onContentReady: function (e) {
                $("#TituloQuantidadeSolicitacao").text("0");
                if (e.component.option("dataSource") != null) {
                    $("#TituloQuantidadeSolicitacao").text(e.component.totalCount());
                }
            },
            stateStoring: AutoLoad("gridSolicitacaoCompraPedido", false),
            onToolbarPreparing: AutoResetState([]),
        }).dxDataGrid("instance");


        //COTAÇÕES
        vGridCotacaoCompraPedido = $("#gridCotacaoCompraPedido").dxDataGrid({
            dataSource: null,
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
            sorting: { mode: "multiple" },
            allowColumnResizing: true,
            columnResizingMode: "widget",
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Arraste as colunas do grid para esta área para agrupar" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
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
                var worksheet = workbook.addWorksheet("Cotação de Compra");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "CotacaoCompra.xlsx");
                    });
                });
                e.cancel = true;
            },
            filterRow: { visible: true, applyFilter: "auto" },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: { visible: true },
            columnChooser: { enabled: true, allowSearch: true, width: 300, height: 500 },
            columnsAutoWidth: true,
            repaintChangesOnly: true,
            keyExpr: ["NR_COTACAO", "CD_ALMOXARIFADO", "CD_PRODUTO"],
            columns: [
                {
                    dataField: "NR_COTACAO",
                    caption: "Cotação",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DT_ABERTURA",
                    caption: "Data Abertura",
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_ALMOXARIFADO",
                    caption: "Almox.",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_PRODUTO",
                    caption: "Código Interno",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_PRODUTO",
                    caption: "Descrição Produto",
                    minWidth: 200,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_FABRICANTE",
                    caption: "Código Fabricante",
                    visible: true,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_ORIGINAL",
                    caption: "Código Original",
                    visible: true,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_MARCA",
                    caption: "Marca",
                    visible: true,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "QT_COTADA",
                    caption: "Qt. Cotada",
                    dataType: "number",
                    format: "###,###,###,##0.#####",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_SITUACAO_COTACAO",
                    caption: "Situação",
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }],
            showBorders: true,
            onContentReady: function (e) {
                $("#TituloQuantidadeCotacao").text("0");
                if (e.component.option("dataSource") != null) {
                    $("#TituloQuantidadeCotacao").text(e.component.totalCount());
                }
            },
            stateStoring: AutoLoad("gridCotacaoCompraPedido", false),
            onToolbarPreparing: AutoResetState([]),

            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    e.cellElement.css({ "cursor": "pointer" });
                }
            },

            onCellClick: function (e) {
                if (e.rowType === "data") {
                    window.open(urlLegado + "Compras/CotacaoAutomatizadaProdutos.aspx?Cotacao=" + e.data.NR_COTACAO, "_blank");
                }
            },

        }).dxDataGrid("instance");


        //HSITÓRICO PEDIDO
        vGridHistoricoPedido = $("#gridHistoricoPedido").dxDataGrid({
            dataSource: null,
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
            sorting: { mode: "multiple" },
            allowColumnResizing: true,
            columnResizingMode: "widget",
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Arraste as colunas do grid para esta área para agrupar" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
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
                var worksheet = workbook.addWorksheet("Histórico");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Historico.xlsx");
                    });
                });
                e.cancel = true;
            },
            filterRow: { visible: true, applyFilter: "auto" },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: { visible: true },
            columnChooser: { enabled: true, allowSearch: true, width: 300, height: 500 },
            columnsAutoWidth: true,
            repaintChangesOnly: true,
            keyExpr: "NR_SEQUENCIA",
            columns: [
                {
                    dataField: "NR_SEQUENCIA",
                    caption: "Sequencia",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DT_EVENTO",
                    caption: "Data",
                    dataType: "date",
                    format: "dd/MM/yyyy HH:mm:ss",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_HISTORICO",
                    caption: "Descrição",
                    minWidth: 500,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_LOGIN",
                    caption: "Usuário",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "left",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_SITUACAO",
                    caption: "Situação Pedido",
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }],
            showBorders: true,
            stateStoring: AutoLoad("gridHistoricoPedido", false),
            onToolbarPreparing: AutoResetState([]),
        }).dxDataGrid("instance");


        //TRANSFERÊNCIAS
        vGridTransferenciaPedido = $("#gridTransferenciaPedido").dxDataGrid({
            dataSource: null,
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
            sorting: { mode: "multiple" },
            allowColumnResizing: true,
            columnResizingMode: "widget",
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Arraste as colunas do grid para esta área para agrupar" },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
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
                var worksheet = workbook.addWorksheet("Transferencias");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Transferencia.xlsx");
                    });
                });
                e.cancel = true;
            },
            filterRow: { visible: true, applyFilter: "auto" },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: { visible: true },
            columnChooser: { enabled: true, allowSearch: true, width: 300, height: 500 },
            columnsAutoWidth: true,
            repaintChangesOnly: true,
            keyExpr: ["CD_TIPO_TRANSFERENCIA", "NR_PROCESSO"],
            columns: [
                {
                    dataField: "CD_TIPO_TRANSFERENCIA",
                    caption: "Tipo",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    visible: true,
                }, {
                    dataField: "NR_PROCESSO",
                    caption: "Processo",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DT_EMISSAO",
                    caption: "Data Emissão",
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_ALMOXARIFADO_ORIGEM",
                    caption: "Almox. Origem",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_ALMOXARIFADO_DESTINO",
                    caption: "Almox. Destino",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_PRODUTO",
                    caption: "Código Interno",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_PRODUTO",
                    caption: "Descrição Produto",
                    minWidth: 200,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "NR_LOTE",
                    caption: "Lote",
                    alignment: "right",
                    visible: true,
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "QT_TRANSFERENCIA",
                    caption: "Qt. Transferência",
                    dataType: "number",
                    format: "###,###,###,##0.#####",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_SITUACAO_TRANSFERENCIA",
                    caption: "Situação",
                    allowEditing: false,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }],
            showBorders: true,
            onContentReady: function (e) {
                $("#TituloQuantidadeTransferencia").text("0");
                if (e.component.option("dataSource") != null) {
                    $("#TituloQuantidadeTransferencia").text(e.component.totalCount());
                }
            },
            stateStoring: AutoLoad("gridTransferenciaPedido", false),
            onToolbarPreparing: AutoResetState([]),
            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    e.cellElement.css({ "cursor": "pointer" });
                }
            },

            onCellClick: function (e) {
                if (e.rowType === "data") {
                    if (e.data.CD_TIPO_TRANSFERENCIA == "CONTROLADA") { //CONTROLADA
                        window.open('../Estoque/TransferenciaDeMercadorias', '_blank');
                    }
                    else { //EXPRESSA
                        window.open('../Estoque/AjusteEstoque', '_blank');
                    }
                }
            },

        }).dxDataGrid("instance");

        vRdbAcaoPosTransferencia = $("#radioAcaoPosTransferencia").dxRadioGroup({
            items: [
                { id: "ABATER", text: "Abater a quantidade transferida da quantidade a ser comprada", obs: "Os produtos carregados por solicitação de compra não terão suas quantidades alteradas!" },
                { id: "MANTER", text: "Manter o produto e a quantidade de compra no Pedido", obs: "" },
                { id: "EXCLUIR", text: "Excluir o produto do Pedido de Compra", obs: "" },
            ],
            itemTemplate: function (itemData, itemIndex, itemElement) {
                var item = $("<div class='mt-2 mb-1'>")

                item.append($("<div class='row mt-0 mb-0'>").append($("<div class='col-lg-12 mt-0 mb-0 text-left' style='color: grey; font-size: 11px; font-weight: bold;'>").text(itemData.text)));

                if (itemData.obs.length > 0) {
                    item.append($("<div class='row mt-0 mb-0'>").append($("<div class='col-lg-12 mt-0 mb-0 text-left' style='color: #f05b41; font-size: 11px; font-weight: normal;'>").text(itemData.obs)));
                }

                itemElement.append(item);
            },
            valueExpr: "id",
            displayExpr: "text",
            value: "ABATER",
        }).dxRadioGroup("instance");

        //MODAL CONFIRMACAO CONCLUSAO MULTIPLOS PEDIDOS
        vCkb_Enviar_Email_Multiplos_Pedidos = $("#ckb_Enviar_Email_Multiplos_Pedidos").dxCheckBox({
            text: "Enviar e-mails dos pedidos aos fornecedores",
            onValueChanged(e) {
                if (e.value == true) {
                    if (objUsuarioParametroCompra.LG_ENVIA_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
                        vCkb_Enviar_Email_Multiplos_Pedidos.option("value", false);
                        popupAcessoNegado.show();
                    }
                }
            }
        }).dxCheckBox("instance");

        //MODAL DE ENVIO DO PEDIDO POR E-MAIL
        vTxt_Remetente_Email = $("#txt_Remetente_Email").dxTextBox({
            labelMode: "floating",
            label: "Máscara do remetente",
            showClearButton: true,
        }).dxTextBox("instance");

        vTxt_Destinatario_Email = $("#txt_Destinatario_Email").dxTextBox({
            labelMode: "floating",
            label: "E-mail do destinatário. Se houver mais de um, devem ser separados por ponto e vírgula (;)",
            showClearButton: true,
        }).dxTextBox("instance");

        vTxt_Assunto_Email = $("#txt_Assunto_Email").dxTextBox({
            labelMode: "floating",
            label: "Assunto",
            showClearButton: true,
        }).dxTextBox("instance");

        vTxt_Corpo_Email = $("#txt_Corpo_Email").dxTextArea({
            labelMode: "floating",
            label: "Texto do e-mail",
            height: 150,
            maxLength: 4000,
        }).dxTextArea("instance");

        vCkb_Anexar_Pedido_Email = $("#ckb_Anexar_Pedido_Email").dxCheckBox({
            value: true,
            text: "Anexar o pedido de compra no e-mail",
        }).dxCheckBox("instance");

        //MODAL DE CONFIGURAÇÃO SMTP
        vTxt_Configuracao_SMTP_Email = $("#txt_Configuracao_SMTP_Email").dxTextBox({
            labelMode: "floating",
            label: "E-Mail",
            showClearButton: true,
            inputAttr: { 'aria-label': 'Email' },
            hoverStateEnabled: false,
        }).dxTextBox("instance");

        vTxt_Configuracao_SMTP_Servidor = $("#txt_Configuracao_SMTP_Servidor").dxTextBox({
            labelMode: "floating",
            label: "Servidor",
            showClearButton: true,
        }).dxTextBox("instance");

        vTxt_Configuracao_SMTP_Porta = $("#txt_Configuracao_SMTP_Porta").dxTextBox({
            labelMode: "floating",
            label: "Porta",
            showClearButton: true,
        }).dxTextBox("instance");

        vTxt_Configuracao_SMTP_Senha = $("#txt_Configuracao_SMTP_Senha").dxTextBox({
            labelMode: "floating",
            label: "Senha",
            showClearButton: true,
            mode: 'password',
            inputAttr: { 'aria-label': 'Password' },
        }).dxTextBox("instance");

        vCkb_Configuracao_SMTP_Usa_TLS = $("#ckb_Configuracao_SMTP_Usa_TLS").dxCheckBox({
            value: false,
            text: "Usa TLS",
        }).dxCheckBox("instance");

        vBtnConfigurarSMPT = $("#btnConfigurarSMPT").dxButton({
            icon: "fa fa-send m-1",
            hint: "Configurar SMTP para envio dos e-mails",
            stylingMode: "outlined",
            onClick: function () {
                FecharModal("ModalEnvioEmail");
                AbrirModal("ModalConfiguracaoSMTP");
            }
        }).dxButton("instance");

        vBtnConfigurarCorpoEmail = $("#btnConfigurarCorpoEmail").dxButton({
            icon: "fa fa-commenting m-1",
            hint: "Configurar texto padrão para assunto e corpo do e-mail",
            stylingMode: "outlined",
            onClick: function () {
                FecharModal("ModalEnvioEmail");
                AbrirModal("ModalConfiguracaoCorpoEmail");
            }
        }).dxButton("instance");

        //MODAL CONFIGURACAO CORPO E-MAIL
        vTxt_Configuracao_Assunto_Email = $("#txt_Configuracao_Assunto_Email").dxTextBox({
            labelMode: "floating",
            label: "Assunto",
            maxLength: 200,
            showClearButton: true,
        }).dxTextBox("instance");

        vTxt_Configuracao_Corpo_Email = $("#txt_Configuracao_Corpo_Email").dxTextArea({
            labelMode: "floating",
            label: "Texto do e-mail",
            height: 150,
            maxLength: 4000,
            showClearButton: true,
        }).dxTextArea("instance");

        vBtnConferirTagsEmail = $("#btnConferirTagsEmail").dxButton({
            icon: "fa fa-question-circle m-1",
            text: "Como utilizar tags",
            hint: "Clique para conferir as tags de automação que você pode utilizar para formatar o assunto e corpo do e-mail",
            stylingMode: "text",
            onClick: function () {
                FecharModal("ModalConfiguracaoCorpoEmail");
                AbrirModal("ModalTagsMensagem");

                $("#btnFecharModalTags").prop("onclick", null).off("click");
                $("#btnFecharModalTags").on("click", function () { AbrirModal("ModalConfiguracaoCorpoEmail"); });
            }
        }).dxButton("instance");


        //MODAL DE ENVIO DO PEDIDO POR WHATSAPP
        vTxt_Telefone_WhatsApp = $("#txt_Telefone_WhatsApp").dxTextBox({
            labelMode: "floating",
            label: "Número WhatsApp do Fornecedor",
            mask: "+00 (00) 00000-0000",
            showClearButton: true,
        }).dxTextBox("instance");

        vTxt_Mensagem_WhatsApp = $("#txt_Mensagem_WhatsApp").dxTextArea({
            labelMode: "floating",
            label: "Mensagem Inicial",
            height: 150,
            maxLength: 4000,
        }).dxTextArea("instance");

        vCkb_Enviar_Link_Pedido_WhatsApp = $("#ckb_Enviar_Link_Pedido_WhatsApp").dxCheckBox({
            value: true,
            text: "Enviar link na mensagem para o Fornecedor baixar o pedido",
            onValueChanged(e) {
                if (e.value == false) {
                    linkPedido = $("#linkPedidoWhatsApp").attr("data-link-pedido");
                    mensagem = getComponentValue(vTxt_Mensagem_WhatsApp, "dxTextBox");
                    mensagem = mensagem.replaceAll("\n" + linkPedido, "");
                    mensagem = mensagem.replaceAll(linkPedido, "");

                    vTxt_Mensagem_WhatsApp.option("value", mensagem);
                }
                else {
                    mensagem = getComponentValue(vTxt_Mensagem_WhatsApp, "dxTextBox");
                    mensagem = mensagem.replaceAll("\n" + linkPedido, "");
                    mensagem = mensagem.replaceAll(linkPedido, "") + "\n" + linkPedido;
                    vTxt_Mensagem_WhatsApp.option("value", mensagem);
                }
            }
        }).dxCheckBox("instance");

        vBtnConfigurarCorpoWhatsApp = $("#btnConfigurarCorpoWhatsApp").dxButton({
            icon: "fa fa-commenting m-1",
            hint: "Configurar texto padrão para o corpo da mensagem",
            stylingMode: "outlined",
            onClick: function () {
                FecharModal("ModalEnvioWhatsApp");
                AbrirModal("ModalConfiguracaoCorpoWhatsApp");
            }
        }).dxButton("instance");

        //MODAL CONFIGURACAO CORPO WHATSAPP
        vTxt_Configuracao_Corpo_WhatsApp = $("#txt_Configuracao_Corpo_WhatsApp").dxTextArea({
            labelMode: "floating",
            label: "Texto da mensagem",
            height: 150,
            maxLength: 4000,
            showClearButton: true,
        }).dxTextArea("instance");

        vBtnConferirTagsWhatsApp = $("#btnConferirTagsWhatsApp").dxButton({
            icon: "fa fa-question-circle m-1",
            text: "Como utilizar tags",
            hint: "Clique para conferir as tags de automação que você pode utilizar para formatar o corpo da mensagem",
            stylingMode: "text",
            onClick: function () {
                FecharModal("ModalConfiguracaoCorpoWhatsApp");
                AbrirModal("ModalTagsMensagem");

                $("#btnFecharModalTags").prop("onclick", null).off("click");
                $("#btnFecharModalTags").on("click", function () { AbrirModal("ModalConfiguracaoCorpoWhatsApp"); });
            }
        }).dxButton("instance");

        //PEQUISA ELETRÔNICA (RADAR DE PREÇO)
        vChk_Confirmacao_Leitura_Pesquisa_Eletronica = $("#chk_Confirmacao_Leitura_Pesquisa_Eletronica").dxCheckBox({
            text: "Li os termos acima descritos",
        }).dxCheckBox("instance");

        GetDadosProcessamentoSugestaoCompra()
        await GetParametros();

        vLoading = false;
        CloseProcessPanel();

        $("#cardCabecalho").show("fast");
        $("#menuPrincipalSub").show("fast");

        if (acaoEntradaTela == "liberacao") {
            ExibeConsultaLiberacao();
        }

        ///////////////////////////////////////
        ////REMOVER
        ///////////////////////////////////////

        //if (location.hostname == "localhost") {
        //    objPedido.numero = 1744;
        //    $("#cardCabecalho").hide();
        //    ExibirEsconderMenuPedido("pedidoCompra");
        //    CarregaPedidoCompra();

        //    //AbrirModal("ModalAderirPesquisaEletronicaRadarPreco");
        //    //AbrirModal("ModalAvisoSelecaoClientes");
        //}

        //objPedido.numero = 1601;
        //$("#cardCabecalho").hide();
        //ExibirEsconderMenuPedido("pedidoCompra");
        //CarregaGridConsultaPedidos();
        //CarregaPedidoCompra();

        ///////////////////////////////////////
        ////FIM REMOVER
        ///////////////////////////////////////
    })();
});

///////////////////////////////////////////////////////////////////////////////////////////////////
//INÍCIO FUNÇÕES
///////////////////////////////////////////////////////////////////////////////////////////////////


function ValidaDadosAvancarIndividual() {
    //if (objPedido.numero != null) {
    //    ExibirEsconderFiltros("filtroPedidoIndividual");
    //    return;
    //}

    var CD_ALMOXARIFADO = getComponentValue(vTag_Almoxarifados_Individual, "dxTagBox");
    var CD_FORNECEDOR = getComponentValue(vLkp_Fornecedores_Individual, "dxLookup");
    var CD_FILIAL = getComponentValue(vLkp_Filial_Individual, "dxLookup");

    if (CD_FORNECEDOR == null) {
        ExibeMensagem("info", "Campo de preenchimento obrigatório", "Selecione o fornecedor");
        return;
    }
    else if (CD_ALMOXARIFADO.length == 0) {
        ExibeMensagem("info", "Campo de preenchimento obrigatório", "Selecione ao menos um almoxarifado");
        return;
    }
    else if (CD_FILIAL == null) {
        ExibeMensagem("info", "Campo de preenchimento obrigatório", "Selecione a filial");
        return;
    }

    //PREENCHE O ARRAY COM OS ALMOXARIFADOS DO PEDIDO
    arrayAlmoxarifadosPedido = [];
    let almoxarifadosPedido = [];

    CD_ALMOXARIFADO.split(",").forEach(function (almox) {
        arrayAlmoxarifadosPedido.push(almox)
        almoxarifadosPedido.push({ CD_ALMOXARIFADO: almox })
    });

    MontaColunasDinamicas(arrayAlmoxarifadosPedido)

    //INCLUI UM NOVO PEDIDO
    $.ajax({
        type: "POST",
        url: "/PedidoCompra/IncluirPedidoCompra",
        data: { pCDFornecedor: CD_FORNECEDOR, pAlmoxarifados: JSON.stringify(almoxarifadosPedido), pCDFilial: CD_FILIAL },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao incluir o pedido de compra", response.msg);
            }
            else {
                //SELECIONA A ABA DE ITENS
                $("#anchorItem").click();
                vChk_Incluir_Produtos_Automaticamente_Filtro_Individual.option('value', true)
                vChk_Incluir_Somente_Ponto_Reposicao_Filtro_Individual.option('value', true)
                ExibirEsconderFiltros("filtroPedidoIndividual");
                objPedido.numero = response.NR_PEDIDO;
                objPedido.codigoSituacao = 1;
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao incluir o pedido de compra", JSON.parse(response.responseText));
        }
    });
}

function AlterarFiltros() {
    if (objPedido.codigoSituacao != "1" || (objUsuarioParametroCompra.LG_INCLUI_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == 0)) {
        popupAcessoNegado.show();
        return;
    }

    ExibirEsconderMenuPedido('menuPrincipalSub');
    ExibirEsconderFiltros('filtroPedidoIndividual');
    vChk_Incluir_Produtos_Automaticamente_Filtro_Individual.option('value', false)
    vChk_Incluir_Somente_Ponto_Reposicao_Filtro_Individual.option('value', false)
}

async function AvancarFiltroIndividual() {

    //SE NENHUM FILTRO DE PRODUTO FOI SELECIONADO, EXIBE UMA MENSAGEM
    if (getComponentValue(vDbx_treeView_Familias_Filtro_Individual, "dxDropDownBox") == null &&
        getComponentValue(vTag_Marcas_Filtro_Individual, "dxTagBox") == null &&
        getComponentValue(vTag_Curva_Produtos_Filtro_Individual, "dxTagBox") == null &&
        getComponentValue(vLkp_Fornecedores_Filtro_Individual, "dxLookup") == null) {

        var acao = null;
        await new Promise(function (resolve, reject) {
            new modalMessage('ModalMensagem').showQuestionModal(
                "<h4>Você não selecionou nenhum filtro de produto.</h4><h4>Tem certeza que deseja prosseguir?</h4>",
                "Confirmação",
                () => { resolve("OK"); },
                () => { resolve("ABORTAR"); });
        }).then(function (response) {
            acao = response;
        });

        if (acao == "ABORTAR") return;
    }

    OpenProcessPanel("Carregando...");

    let dataUpdate = [];
    dataUpdate.push(
        { id: "CD_EMPRESA", value: null, isKey: true },
        { id: "NR_PEDIDO", value: objPedido.numero, isKey: true },
        { id: "CD_FAMILIA_PRODUTO", value: getComponentValue(vDbx_treeView_Familias_Filtro_Individual, "dxDropDownBox"), isKey: false },
        { id: "DS_MARCA", value: getComponentValue(vTag_Marcas_Filtro_Individual, "dxTagBox"), isKey: false },
        { id: "DS_CURVA_PRODUTO", value: getComponentValue(vTag_Curva_Produtos_Filtro_Individual, "dxTagBox"), isKey: false },
        { id: "CD_FORNECEDOR_FILTRO", value: getComponentValue(vLkp_Fornecedores_Filtro_Individual, "dxLookup"), isKey: false },
        { id: "LG_SOMENTE_FORNECEDOR_PADRAO", value: getComponentValue(vCkb_Fornecedor_Padrao_Filtro_Individual, "dxCheckBox"), isKey: false },
        { id: "LG_RETORNA_PRODUTOS_PONTO_REPOSICAO", value: getComponentValue(vCkb_Produtos_Ponto_Reposicao_Filtro_Individual, "dxCheckBox"), isKey: false },
        { id: "LG_ABATER_SALDO_RECEBER", value: getComponentValue(vCkb_Abater_Saldo_Receber_Filtro_Individual, "dxCheckBox"), isKey: false },
    );

    $.ajax({
        url: '/PedidoCompra/AlterarPedidoCompra',
        method: 'POST',
        data: { dataUpdate: JSON.stringify(dataUpdate) },
    }).done(async function (response) {
        vIncluirProdutosAutomaticamente = getComponentValue(vChk_Incluir_Produtos_Automaticamente_Filtro_Individual, "dxCheckBox");
        vIncluirSomentePontoReposicao = getComponentValue(vChk_Incluir_Somente_Ponto_Reposicao_Filtro_Individual, "dxCheckBox");

        if (vIncluirProdutosAutomaticamente) {
            //CARREGA O GRIDBOX ANTES DE CARREGAR O PEDIDO POIS COMO O USUÁRIO SOLICITOU INCLUIR AUTOMATICAMENTE
            //OS PRODUTOS, O PEDIDO SERÁ MODIFICADO
            await CarregaGridBoxProdutos()
            vIncluirProdutosAutomaticamente = false;
            vIncluirSomentePontoReposicao = false;
        }

        CarregaPedidoCompra();

        ExibirEsconderMenuPedido("pedidoCompra");
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao salvar os filtros do pedido de compra", response);
    });
}

function AjustaQuantidadeTransferenciaLote(pAlmoxarifadosDestino, pAlmoxarifadoRowData) {

    let vGridLote = $("#GridLote" + pAlmoxarifadoRowData.CD_ALMOXARIFADO).dxDataGrid("instance");
    let vCasasDecimais = pAlmoxarifadoRowData.NR_CASAS_DECIMAIS;
    let loteRowData = [];
    let vQtSaldoAlmoxarifado = 0;
    let vQtSaldoLote = 0;
    let vQtTransferenciaLote = 0;
    let vPermiteTransferencia = false;

    //BUSCA OS REGISTROS DO GRID DE LOTES
    vGridLote.getDataSource().store().load().done((allData) => {
        loteRowData = allData;
    });

    //CORRIGE DADOS INICIAIS
    loteRowData.forEach((row) => {
        row.QT_SALDO_LOTE = row.QT_ESTOQUE;
        row.CD_ALMOXARIFADO = pAlmoxarifadoRowData.CD_ALMOXARIFADO;
        pAlmoxarifadosDestino.forEach((almoxarifado) => {
            row["QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_" + almoxarifado.toString()] = 0;
        });
    });

    //FAZ UM LOOP NOS ALMOXARIFADOS DE DESTINO
    pAlmoxarifadosDestino.forEach((almoxarifadoDestino) => {
        vPermiteTransferencia = pAlmoxarifadoRowData["LG_PERMITE_TRANSFERENCIA_ALMOXARIFADO_" + almoxarifadoDestino];
        vQtSaldoAlmoxarifado = pAlmoxarifadoRowData["QT_TRANSFERENCIA_ALMOXARIFADO_" + almoxarifadoDestino];
        vQtSaldoLote = 0;

        //FAZ UM LOOP NOS LOTES
        for (var i in loteRowData) {
            vQtSaldoLote = loteRowData[i].QT_SALDO_LOTE;

            if (vQtSaldoAlmoxarifado == 0 || vQtSaldoLote == 0 || vPermiteTransferencia == 0)
                vQtTransferenciaLote = 0
            else if (vQtSaldoAlmoxarifado >= vQtSaldoLote)
                vQtTransferenciaLote = vQtSaldoLote
            else if (vQtSaldoAlmoxarifado < vQtSaldoLote)
                vQtTransferenciaLote = vQtSaldoAlmoxarifado

            vQtSaldoAlmoxarifado -= vQtTransferenciaLote

            //AJUSTA AS QUANTIDADES
            loteRowData[i]["QT_SALDO_LOTE"] -= round(vQtTransferenciaLote, vCasasDecimais);
            loteRowData[i]["QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_" + almoxarifadoDestino] = round(vQtTransferenciaLote, vCasasDecimais)
        }

        //ATUALIZA O DATASOURCE
        vGridLote.option("dataSource", loteRowData)
    });
}

function CarregaDadosFornecedor() {
    $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetFornecedor",
        data: { pCDFornecedor: objPedido.codigoFornecedor },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do fornecedor", response.msg);
            }
            else {
                var FORNECEDOR = response[0];
                $("#fornecedorPedido").text(`${objPedido.codigoFornecedor} - ${FORNECEDOR.DS_FANTASIA}`);
                $("#faturamentoMinimo").text(`R$ ${formataNumero(FORNECEDOR.VL_FATURAMENTO_MINIMO, 2, 2)}`);
                vTxt_Obs_Fornecedor.option("value", FORNECEDOR.DS_OBS)
                //vTxt_Nome_Contato.option("value", FORNECEDOR.DS_CONTATO)
                //vTxt_Telefone_Contato.option("value", FORNECEDOR.DS_TELEFONE_CONTATO)
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do fornecedor", JSON.parse(response.responseText));
        }
    });
}

function CarregaGridConsultaPedidos() {
    var deferred = new $.Deferred;

    var parameters = [
        { id: "NR_DIAS_CONSULTA", value: getComponentValue(vNbx_Dias_Filtro_Consulta_Geral, "dxNumberBox") },
        { id: "CD_PRODUTO", value: getComponentValue(vLkp_Produtos_Filtro_Consulta_Geral, "dxLookup") },
        { id: "DS_ALMOXARIFADOS", value: getComponentValue(vTag_Almoxarifados_Filtro_Consulta_Geral, "dxTagBox") }
    ];

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetPedidos",
        data: { parameters: JSON.stringify(parameters) },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao carregar a consulta de pedidos", response.msg);
                deferred.reject();
            }
            else {
                vGridConsultaGeralPedidos.option("dataSource", response);
                vGridConsultaGeralPedidos.deselectAll();
                deferred.resolve();
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao carregar a consulta de pedidos", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function CarregaGridPedidosComplementares() {
    var deferred = new $.Deferred;

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetPedidosComplementares",
        data: { pNRPedido: objPedido.numero },
        success: function (response) {
            if (response.result == "Erro") {
                deferred.reject();
                ExibeMensagem("error", "Ocorreu um erro ao carregar a consulta de pedidos complementares", response.msg);
            }
            else {
                vGridPedidosComplementares.option("dataSource", response)
                deferred.resolve();
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao carregar a consulta de pedidos complementares", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function CarregaAlmoxarifadosPedido() {
    var deferred = new $.Deferred;

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetAlmoxarifadosPedido",
        data: { pNRPedido: objPedido.numero },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao carregar os almoxarifados do pedido", response.msg);
                deferred.reject();
            }
            else {
                arrayAlmoxarifadosPedido = [];

                //PREENCHE O ARRAY COM OS ALMOXARIFADOS DO PEDIDO
                response.forEach(function (data) {
                    arrayAlmoxarifadosPedido.push(data.CD_ALMOXARIFADO)
                });

                MontaColunasDinamicas(arrayAlmoxarifadosPedido)
            }

            deferred.resolve();
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao carregar os almoxarifados do pedido", JSON.parse(response.responseText));
            deferred.reject();
        }
    });
    return deferred.promise();
}

function CarregaPedidoCompra() {
    if (objPedido.numero == null) return;

    var deferred = new $.Deferred;

    OpenProcessPanel("Carregando...");
    vLoading = true;

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetPedidoCompra",
        data: { pNRPedido: objPedido.numero },
        success: async function (response) {
            try {
                if (response.result == "Erro") {
                    ExibeMensagem("error", "Ocorreu um erro ao consultar o pedido de compra", response.msg);
                    deferred.reject();
                }
                else {
                    window.scrollTo(0, 0);

                    //SELECIONA A ABA DE ITENS
                    $("#anchorItem").click();

                    //PREENCHE OS DADOS DO PEDIDO
                    let PEDIDO = response[0];

                    objPedido = new PedidoCompra();
                    objPedido.numero = PEDIDO.NR_PEDIDO;
                    objPedido.codigoFornecedor = PEDIDO.CD_FORNECEDOR;
                    objPedido.codigoEtapa = PEDIDO.CD_ETAPA_PEDIDO
                    objPedido.codigoSituacao = PEDIDO.CD_SITUACAO
                    objPedido.possuiItemNaoRecebido = PEDIDO.LG_POSSUI_ITEM_NAO_RECEBIDO;
                    objPedido.possuiItemRecebidoParcial = PEDIDO.LG_POSSUI_ITEM_RECEBIDO_PARCIAL;
                    objPedido.possuiItemRecebidoTotal = PEDIDO.LG_POSSUI_ITEM_RECEBIDO_TOTAL;
                    objPedido.valorTotal = PEDIDO.VL_TOTAL_PAGAR;

                    $("#numeroPedido").text("# " + PEDIDO.NR_PEDIDO);
                    $("#valorTotalPedido").html("<b>R$ " + formataNumero(PEDIDO.VL_TOTAL_PAGAR, 2, 2) + "</b>");
                    $("#dataInclusao").text(new Date(PEDIDO.DT_INCLUSAO).toLocaleString("pt-BR"));

                    if (PEDIDO.NR_COTACAO != null) {
                        $("#labelCotacaoEletronica").text("Nº Cotação");
                        $("#cotacaoEletronica").text(PEDIDO.NR_COTACAO);
                    } else {
                        $("#labelCotacaoEletronica").text("");
                        $("#cotacaoEletronica").text("");
                    }

                    vLkp_Fornecedores_Individual.option("value", PEDIDO.CD_FORNECEDOR)
                    vLkp_Filial_Pedido.option("value", PEDIDO.CD_FILIAL);
                    vTxt_Nome_Contato.option("value", PEDIDO.DS_CONTATO);
                    vTxt_Telefone_Contato.option("value", PEDIDO.NR_TELEFONE_CONTATO);
                    vDt_Previsao_Entrega.option("value", PEDIDO.DT_PREVISAO_ENTREGA == null ? null : new Date(PEDIDO.DT_PREVISAO_ENTREGA));
                    vTxt_Obs_Pedido.option("value", PEDIDO.DS_OBS);
                    vTxt_Justificativa_Cancelamento_Visualizar_Modal.option("value", PEDIDO.DS_OBS_CANCELAMENTO_PEDIDO_APROVADO);
                    vLkp_Formas_Pagamento.option("value", PEDIDO.CD_FORMA_PAGAMENTO == null ? null : parseInt(PEDIDO.CD_FORMA_PAGAMENTO));

                    //LIMPA CAMPOS
                    vTxt_Justificativa_Cancelamento.option("value", "");
                    vLkp_Periodicidade_Parcelas_Fixas.option("value", 30);

                    //SELECIONA NO WIZARD A ETAPA DO PEDIDO
                    wizard.selectEtapa(objPedido.codigoEtapa);

                    $("#infoPedidoElaboracao").hide();
                    $("#infoPedidoLiberacao").hide();
                    $("#infoPedidoReprovado").hide();
                    $("#infoPedidoAprovado").hide();
                    $("#infoPedidoCancelado").hide();
                    $("#infoPedidoEnviado").hide();
                    $("#infoPedidoRecebidoParcial").hide();
                    $("#infoPedidoRecebido").hide();
                    $("#btnVisualizarJustificativaCancelamento").hide();

                    switch (PEDIDO.CD_ETAPA_PEDIDO) {
                        case "1":
                            $("#infoPedidoElaboracao").show(); break;
                        case "2":
                            $("#infoPedidoLiberacao").show(); break;
                        case "3":
                            $("#infoPedidoReprovado").show(); break;
                        case "4":
                            $("#infoPedidoAprovado").show(); break;
                        case "5":
                            $("#infoPedidoCancelado").show();
                            $("#btnVisualizarJustificativaCancelamento").show();
                            break;
                        case "10":
                            $("#infoPedidoEnviado").show(); break;
                        case "11":
                            $("#infoPedidoRecebidoParcial").show(); break;
                        case "12":
                            $("#infoPedidoRecebido").show(); break;
                    }

                    //FILTROS GRAVADOS NO PEDIDO
                    vDbx_treeView_Familias_Filtro_Individual.option("value", PEDIDO.CD_FAMILIA_PRODUTO);
                    vTag_Marcas_Filtro_Individual.option("value", PEDIDO.DS_MARCA == null ? null : PEDIDO.DS_MARCA.split(","));
                    vLkp_Fornecedores_Filtro_Individual.option("value", PEDIDO.CD_FORNECEDOR_FILTRO);
                    vTag_Curva_Produtos_Filtro_Individual.option("value", PEDIDO.DS_CURVA_PRODUTO == null ? null : PEDIDO.DS_CURVA_PRODUTO.split(","));
                    vCkb_Produtos_Ponto_Reposicao_Filtro_Individual.option("value", PEDIDO.LG_RETORNA_PRODUTOS_PONTO_REPOSICAO == null ? false : PEDIDO.LG_RETORNA_PRODUTOS_PONTO_REPOSICAO);
                    vCkb_Fornecedor_Padrao_Filtro_Individual.option("value", PEDIDO.LG_SOMENTE_FORNECEDOR_PADRAO == null ? false : PEDIDO.LG_SOMENTE_FORNECEDOR_PADRAO);
                    vCkb_Abater_Saldo_Receber_Filtro_Individual.option("value", PEDIDO.LG_ABATER_SALDO_RECEBER == null ? false : PEDIDO.LG_ABATER_SALDO_RECEBER);

                    await CarregaAlmoxarifadosPedido();
                    await CarregaProdutosPedido();
                    await CarregaGridBoxProdutos();
                    await CarregaCondicaoPedido();
                    CarregaDadosFornecedor();
                    GetDadosComprador(PEDIDO.CD_LOGIN);
                    CarregaGridSolicitacaoCompraPedido();
                    CarregaGridCotacaoCompraPedido();
                    CarregaGridHistoricoPedido();
                    CarregaGridTransferenciaPedido();
                    CarregaGridPedidosComplementares();

                    HabilitaDesabilitaComponentes()

                    deferred.resolve();
                }
            }
            catch (ex) {
                ExibeMensagem("error", "Ocorreu um erro ao consultar o pedido de compra", ex);
                deferred.reject();
            }
            finally {
                CloseProcessPanel();
                vLoading = false;
            }
        },
        failure: function (response) {
            CloseProcessPanel();
            vLoading = false;
            ExibeMensagem("error", "Ocorreu um erro ao consultar o pedido de compra", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function HabilitaDesabilitaComponentes() {
    let vDisabled = (objPedido.codigoSituacao == "1" && (objUsuarioParametroCompra.LG_INCLUI_PEDIDO == true || objUsuarioParametroCompra.NR_NIVEL_ACESSO == 1) ? false : true);

    vToolbarItensPedido.option("disabled", vDisabled);
    vLkp_Filial_Pedido.option("readOnly", vDisabled);
    vTxt_Nome_Contato.option("readOnly", vDisabled);
    vTxt_Telefone_Contato.option("readOnly", vDisabled);
    vDt_Previsao_Entrega.option("readOnly", vDisabled);
    vTxt_Obs_Pedido.option("readOnly", vDisabled);
    vLkp_Formas_Pagamento.option("readOnly", vDisabled);
    vLkp_Periodicidade_Parcelas_Fixas.option("readOnly", vDisabled);
    $("#btnSubstituirFornecedor").prop("disabled", vDisabled);

    if (objPedido.codigoSituacao == "1") {
        $(".tab-content button[id*='btnGridItens']").prop("disabled", false);
        $(".tab-content button[id*='btnAlterarFiltros']").show();
        $(".tab-content button[id='btnSalvarDadosGerais']").show();
    } else {
        $(".tab-content button[id*='btnGridItens']").prop("disabled", true);
        $(".tab-content button[id*='btnAlterarFiltros']").hide();
        $(".tab-content button[id='btnSalvarDadosGerais']").hide();
    }

    //CONFIGURA O BOTÃO CONCLUIR PEDIDO
    if (!["1", "2"].includes(objPedido.codigoSituacao)) {
        $(".tab-content button[id*='btnConcluirPedido']").hide();
    }
    else if (objPedido.codigoSituacao == "1") {
        $(".tab-content button[id*='btnConcluirPedido']").show();
        $(".tab-content button[id*='btnConcluirPedido']").html("<i class='fa fa-check mr-2'></i>Concluir Pedido");
        $(".tab-content button[id*='btnConcluirPedido']").attr("data-original-title", "Concluir o Pedido de Compra");
    }
    else if (objPedido.codigoSituacao == "2") {
        $(".tab-content button[id*='btnConcluirPedido']").show();
        $(".tab-content button[id*='btnConcluirPedido']").html("<i class='fa fa-check mr-2'></i>Aprovar Pedido");
        $(".tab-content button[id*='btnConcluirPedido']").attr("data-original-title", "Aprovar o Pedido de Compra");
    }

    //CONFIGURA O BOTÃO CANCELAR PEDIDO
    if (!["1", "2", "4"].includes(objPedido.codigoSituacao)) {
        $(".tab-content button[id*='btnCancelarPedido']").hide();
    }
    else if (objPedido.codigoSituacao == "2") {
        $(".tab-content button[id*='btnCancelarPedido']").show();
        $(".tab-content button[id*='btnCancelarPedido']").html("<i class='fa fa-close mr-2'></i>Reprovar Pedido");
        $(".tab-content button[id*='btnCancelarPedido']").attr("data-original-title", "Reprovar o Pedido de Compra");
    }
    else {
        $(".tab-content button[id*='btnCancelarPedido']").show();
        $(".tab-content button[id*='btnCancelarPedido']").html("<i class='fa fa-close mr-2'></i>Cancelar Pedido");
        $(".tab-content button[id*='btnCancelarPedido']").attr("data-original-title", "Cancelar o Pedido de Compra");
    }
}

function CarregaProdutosPedido() {
    var deferred = new $.Deferred;

    if (vGridItensPedido) {
        //MATA A INSTANCIA DO DATAGRID
        $("#gridItensPedido").dxDataGrid("dispose");
        vGridItensPedido = null;
    }

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetProdutosPedido",
        data: { pNRPedido: objPedido.numero },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao carregar os itens do pedido", response.msg);
                deferred.reject();
            }
            else {
                vGridItensPedido = $("#gridItensPedido").dxDataGrid({
                    dataSource: response,
                    wordWrapEnabled: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    searchPanel: {
                        visible: true,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    sorting: { mode: "multiple" },
                    selection: {
                        mode: "multiple",
                        showCheckBoxesMode: "always",
                    },
                    hoverStateEnabled: false,
                    allowColumnResizing: true,
                    columnResizingMode: "widget",
                    repaintChangesOnly: true,
                    allowColumnReordering: true,
                    groupPanel: { visible: true },
                    editing: {
                        mode: "batch",
                        allowUpdating: true,
                        startEditAction: "dblClick",
                        allowAdding: false,
                        allowDeleting: true,
                        useIcons: true,
                    },
                    keyboardNavigation: {
                        enterKeyAction: "moveFocus",
                        enterKeyDirection: "column",
                        editOnKeyPress: true,
                    },
                    paging: { pageSize: 20 },
                    pager: {
                        visible: true,
                        allowedPageSizes: [10, 20, 50, 100, 200, 300],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: true,
                        allowExportSelectedData: false
                    },
                    filterRow: { visible: true, applyFilter: "auto" },
                    headerFilter: {
                        visible: true,
                        allowSearch: true
                    },
                    filterPanel: { visible: true },
                    columnChooser: { enabled: true, allowSearch: true, width: 300, height: 500 },
                    columnsAutoWidth: true,
                    cellHintEnabled: true,
                    showBorders: true,
                    keyExpr: "CD_PRODUTO",

                    columns: [
                        {
                            type: "selection",
                            width: 30,
                        }, {
                            dataField: "DS_FORA_LINHA",
                            caption: "",
                            width: 30,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            alignment: "center",
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "LG_FORA_LINHA",
                            caption: "",
                            width: 25,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            cssClass: "column-data-grid",
                            allowFiltering: false,
                            showInColumnChooser: false,
                            visible: false,
                        }, {
                            dataField: "DS_SUGESTAO_TRANSFERENCIA",
                            caption: "",
                            width: 30,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            alignment: "center",
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "LG_SUGESTAO_TRANSFERENCIA",
                            caption: "",
                            width: 25,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: "center",
                            allowHeaderFiltering: true,
                            cssClass: "column-data-grid",
                            allowFiltering: false,
                            showInColumnChooser: false,
                            visible: false,
                        }, {
                            dataField: "CD_PRODUTO",
                            caption: "Código Interno",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: "center",
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "CD_FABRICANTE",
                            caption: "Código Fabricante",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "CD_ORIGINAL",
                            caption: "Código Original",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "CD_OPCIONAL",
                            caption: "Código Opcional",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "CD_EAN_PRODUTO",
                            caption: "Código de Barras",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_PRODUTO",
                            caption: "Descrição Produto",
                            width: 250,
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "CD_FORNECEDOR_PADRAO",
                            caption: "Cód. Fornecedor Padrão",
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_RAZAO_SOCIAL_FORNECEDOR_PADRAO",
                            caption: "Razão Social Fornecedor Padrão",
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_NOME_FANTASIA_FORNECEDOR_PADRAO",
                            caption: "Nome Fantasia Fornecedor Padrão",
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "CD_CURVA_PRODUTO",
                            caption: "ABC",
                            width: 54,
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            alignment: "center",
                            allowHeaderFiltering: true,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_MARCA",
                            caption: "Marca",
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_FAMILIA",
                            caption: "Família",
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_TEXTO_EXPLICATIVO",
                            caption: "Aplicação",
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            caption: "Estoque Atual",
                            alignment: "center",
                            cssClass: "column-data-grid",
                            columns: [{
                                dataField: "DS_ESTOQUE_VENDA_TOTAL",
                                caption: "UN Venda",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                alignment: "right",
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "QT_ESTOQUE_VENDA_TOTAL",
                                caption: "Qt. Estoque UN Venda",
                                dataType: "number",
                                format: "###,###,###,##0.#####",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: false,
                                showInColumnChooser: false,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_ESTOQUE_COMPRA_TOTAL",
                                caption: "UN Compra",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                alignment: "right",
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "QT_ESTOQUE_COMPRA_TOTAL",
                                caption: "Qt. Estoque UN Compra",
                                dataType: "number",
                                format: "###,###,###,##0.#####",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: false,
                                showInColumnChooser: false,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_UNIDADE_MEDIDA_VENDA",
                                caption: "UN Venda",
                                allowEditing: false,
                                allowSorting: true,
                                visible: false,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_UNIDADE_MEDIDA_COMPRA",
                                caption: "UN Compra",
                                allowEditing: false,
                                allowSorting: true,
                                visible: false,
                                cssClass: "column-data-grid",
                            },
                            ],
                        }, {
                            dataField: "DS_CONVERSAO",
                            caption: "Conversão",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_NAO_ENTREGUE_TOTAL",
                            caption: "Receb. Pendente",
                            width: 60,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: "right",
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "QT_NAO_ENTREGUE_TOTAL",
                            caption: "Receb. Pendente",
                            dataType: "number",
                            format: "###,###,###,##0.#####",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: "center",
                            allowHeaderFiltering: false,
                            visible: false,
                            showInColumnChooser: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "QT_MEDIA_VENDA_TOTAL",
                            caption: "Qt. Média Venda Mensal",
                            dataType: "number",
                            format: "###,###,###,##0.##",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: "center",
                            allowHeaderFiltering: false,
                            visible: false,
                            showInColumnChooser: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_MEDIA_VENDA_TOTAL",
                            caption: "Venda Mensal",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: "right",
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "QT_ESTOQUE_MINIMO_TOTAL",
                            caption: "Qt. Estoque Mínimo Total",
                            dataType: "number",
                            format: "###,###,###,##0.##",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: "center",
                            allowHeaderFiltering: false,
                            visible: false,
                            showInColumnChooser: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_ESTOQUE_MINIMO_TOTAL",
                            caption: "Estoque Mínimo Total",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: "right",
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "QT_ESTOQUE_IDEAL_TOTAL",
                            caption: "Qt. Estoque Ideal Total",
                            dataType: "number",
                            format: "###,###,###,##0.##",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: "center",
                            allowHeaderFiltering: false,
                            visible: false,
                            showInColumnChooser: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_ESTOQUE_IDEAL_TOTAL",
                            caption: "Estoque Ideal Total",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: "right",
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "QT_SUGERIDA_TOTAL",
                            caption: "Qt. Sugerida",
                            dataType: "number",
                            format: "###,###,###,##0.#####",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: "right",
                            allowHeaderFiltering: false,
                            visible: true,
                            showInColumnChooser: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_SUGERIDA_TOTAL",
                            caption: "Sugest. Compra",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: "right",
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "QT_EMBALAGEM",
                            caption: "Qt. Emb",
                            dataType: "number",
                            format: "###,###,###,##0.#####",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: "right",
                            cssClass: "column-data-grid",
                        }, {
                            caption: "Informe as quantidades para cada Almoxarifado",
                            alignment: "center",
                            columns: columnsQtPedidaAlmoxarifado,
                        }, {
                            dataField: "DS_CUSTO_SUGERIDO",
                            caption: "Custo Sugerido",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: "left",
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "VL_UNITARIO_PRODUTO",
                            caption: "Vl. Unitário",
                            width: 60,
                            dataType: "number",
                            format: "###,###,###,##0.00###",
                            allowEditing: true,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "VL_TOTAL_PRODUTO",
                            caption: "Vl. Total",
                            width: 80,
                            dataType: "number",
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            summaryType: "sum",
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "PC_IPI",
                            caption: "% IPI",
                            dataType: "number",
                            format: "###,###,###,##0.####",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            summaryType: "sum",
                            cssClass: "column-data-grid",
                            visible: false,
                        }, {
                            dataField: "DS_FRETE_COMPRA",
                            caption: "Frete",
                            calculateCellValue(data) {
                                if (data.CD_TIPO_CALCULO_FRETE == 1) {
                                    return formataNumero(data.PC_FRETE_COMPRA, 0, 4) + " %";
                                } else {
                                    return "R$ " + formataNumero(data.VL_FRETE_COMPRA, 0, 4);
                                }
                            },
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            summaryType: "sum",
                            cssClass: "column-data-grid",
                            visible: false,
                        }, {
                            dataField: "PC_IVA",
                            caption: "% Substituição",
                            dataType: "number",
                            format: "###,###,###,##0.####",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            summaryType: "sum",
                            cssClass: "column-data-grid",
                            visible: false,
                        }, {
                            type: "buttons",
                            width: 30,
                        }],

                    summary: {
                        recalculateWhileEditing: true,
                        totalItems: [{
                            column: "CD_PRODUTO",
                            summaryType: "count",
                            displayFormat: "{0} registros",
                        }, {
                            column: "VL_TOTAL_PRODUTO",
                            summaryType: "sum",
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                        }],
                    },

                    masterDetail: {
                        enabled: true,
                        template: masterDetailTemplate,
                    },

                    onRowExpanding: function (e) {
                        var parameters = [
                            { id: "CD_EMPRESA", value: null },
                            { id: "CD_PRODUTO", value: e.key },
                            { id: "NR_PEDIDO", value: objPedido.numero }
                        ];

                        $.ajax({
                            type: "POST",
                            url: "/PedidoCompra/GetFornecedoresSimilares",
                            data: { parameters: JSON.stringify(parameters) },
                            success: function (response) {
                                if (response.result == "Erro") {
                                    ExibeMensagem("error", "Ocorreu um erro ao buscar os fornecedores dos produtos similares", response.msg);
                                    deferred.reject();
                                }
                                else {
                                    dataSourceFornecedorSimilar = response;
                                }
                            },
                            failure: function (response) {
                                ExibeMensagem("error", "Ocorreu um erro ao buscar os fornecedores dos produtos similares", JSON.parse(response.responseText));
                                deferred.reject();
                            }
                        });
                    },

                    onExporting: function (e) {
                        var workbook = new ExcelJS.Workbook();
                        var worksheet = workbook.addWorksheet("Itens Pedido de Compra");

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet: worksheet,
                            autoFilterEnabled: true
                        }).then(function () {
                            workbook.xlsx.writeBuffer().then(function (buffer) {
                                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "PedidoCompraItens.xlsx");
                            });
                        });
                        e.cancel = true;
                    },

                    onFocusedCellChanging(e) {
                        e.isHighlighted = true;
                    },

                    onCellPrepared: function (e) {
                        if (e.rowType === "data" && typeof (e.column.dataField) !== "undefined") {
                            if (e.column.dataField === "VL_UNITARIO_PRODUTO") {
                                if (objPedido.codigoSituacao == "1" && (objUsuarioParametroCompra.LG_INCLUI_PEDIDO == true || objUsuarioParametroCompra.NR_NIVEL_ACESSO == 1)) {
                                    e.cellElement.css("background-color", "#edf3f8");
                                }
                            }
                            else if (e.column.dataField.startsWith("QT_PEDIDA_ALMOXARIFADO_")) {
                                if (objPedido.codigoSituacao == "1" && (objUsuarioParametroCompra.LG_INCLUI_PEDIDO == true || objUsuarioParametroCompra.NR_NIVEL_ACESSO == 1)) {
                                    var almox = e.column.dataField.replace("QT_PEDIDA_ALMOXARIFADO_", "")
                                    var produtoAtivo = Boolean(e.data["LG_PRODUTO_ATIVO_ALMOXARIFADO_" + almox]);
                                    var solicitacaoCompra = e.data["NR_SOLICITACAO_COMPRA_ALMOXARIFADO_" + almox];

                                    if (produtoAtivo == true && solicitacaoCompra == null) {
                                        e.cellElement.css("background-color", "#edf3f8");
                                    }
                                }
                            }
                            else if (e.column.dataField === "DS_FORA_LINHA") {
                                e.cellElement.css("background-color", e.data.LG_FORA_LINHA == true ? "#f26419" : null);
                                e.cellElement.css("color", "white");
                            }
                            else if (e.column.dataField === "DS_SUGESTAO_TRANSFERENCIA") {
                                if (e.data.LG_SUGESTAO_TRANSFERENCIA == true) {
                                    if (objPedido.codigoSituacao == "1" && (objUsuarioParametroCompra.LG_INCLUI_PEDIDO == true || objUsuarioParametroCompra.NR_NIVEL_ACESSO == 1)) {
                                        e.cellElement.css({ "background-color": "#33658a", "color": "white", "cursor": "pointer" });
                                    }
                                    else {
                                        e.cellElement.css({ "background-color": "#33658a", "color": "white" });
                                    }
                                }
                            }
                            else if (e.column.dataField === "DS_ESTOQUE_VENDA_TOTAL" ||
                                e.column.dataField === "DS_ESTOQUE_COMPRA_TOTAL") {
                                if (e.data.CD_UNIDADE_MEDIDA_VENDA != e.data.CD_UNIDADE_MEDIDA_COMPRA) {
                                    e.cellElement.css("font-weight", "bold");
                                    e.cellElement.css("color", "black");
                                }
                            }
                        }
                    },

                    onCellClick: function (e) {
                        if (e.rowType == "data" && typeof (e.column.dataField) !== "undefined") {
                            if (e.column.dataField === "DS_SUGESTAO_TRANSFERENCIA" && e.data.LG_SUGESTAO_TRANSFERENCIA == true) {
                                if (objPedido.codigoSituacao == "1") {
                                    CarregaModalSugestaoTransferencia(e.data.CD_PRODUTO).then(() => {
                                        AbrirModal("ModalSugestaoTransferencia");
                                    });
                                }
                            }
                        }
                    },

                    onEditorPreparing: function (e) {
                        if (e.parentType == "dataRow" && typeof (e.dataField) != "undefined") {
                            if (e.dataField.startsWith("QT_PEDIDA_ALMOXARIFADO_")) {
                                var onValueChanged = e.editorOptions.onValueChanged;
                                e.editorOptions.onValueChanged = function (args) {
                                    //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                    onValueChanged.apply(this, arguments);

                                    //TRATA O VALOR ALTERADO (NULO E MENOR QUE ZERO)
                                    args.value = args.value == null ? args.previousValue : args.value;
                                    args.value = args.value < 0 ? args.previousValue : args.value;

                                    //ARREDONDA CONFORME AS CASAS DECIMAIS DA UNIDADE DE MEDIDA DE COMPRA
                                    args.value = round(args.value, e.row.data.NR_CASAS_UNIDADE_MEDIDA)

                                    //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                    onValueChanged.apply(this, arguments);

                                    SumarizaQuantidadeGrid(e.component, e.row.rowIndex);
                                }
                            }
                            else if (e.dataField == "VL_UNITARIO_PRODUTO") {
                                var onValueChanged = e.editorOptions.onValueChanged;
                                e.editorOptions.onValueChanged = function (args) {
                                    //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                    onValueChanged.apply(this, arguments);

                                    //TRATA O VALOR ALTERADO (NULO E MENOR QUE ZERO)
                                    args.value = args.value == null ? args.previousValue : args.value;
                                    args.value = args.value < 0 ? args.previousValue : args.value;

                                    //ARREDONDA CONFORME AS CASAS DECIMAIS DE COMPRA
                                    args.value = round(args.value, casasDecimaisCompra)

                                    //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                    onValueChanged.apply(this, arguments);

                                    var qtPedidaTotal = e.component.cellValue(e.row.rowIndex, "QT_PEDIDA_TOTAL");
                                    var vlUnitario = args.value;

                                    e.component.cellValue(e.row.rowIndex, "VL_TOTAL_PRODUTO", round(qtPedidaTotal * vlUnitario, 2));
                                }
                            }
                        }
                    },
                    onEditingStart: function (e) {
                        if (objPedido.codigoSituacao != "1" || (objUsuarioParametroCompra.LG_INCLUI_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == 0)) {
                            e.cancel = true;
                            return;
                        }

                        if (e.column.dataField.startsWith("QT_PEDIDA_ALMOXARIFADO_")) {
                            var almox = e.column.dataField.replace("QT_PEDIDA_ALMOXARIFADO_", "")
                            var produtoAtivo = Boolean(e.data["LG_PRODUTO_ATIVO_ALMOXARIFADO_" + almox]);
                            var solicitacaoCompra = e.data["NR_SOLICITACAO_COMPRA_ALMOXARIFADO_" + almox];

                            if (produtoAtivo == false) {
                                ExibeMensagem("info", "Edição desabilitada", `O produto não pode ser editado pois está inativo no almoxarifado ${almox}!`);
                                e.cancel = true;
                            }
                            else if (solicitacaoCompra != null) {
                                ExibeMensagem("info", "Edição desabilitada", `O produto não pode ser editado pois possui solicitação de compra Nº ${solicitacaoCompra}!`);
                                e.cancel = true;
                            }
                        }
                    },

                    onSaving: function (e) {
                        OpenProcessPanel("Processando...");
                        dataSave = [];
                        dataDelete = [];
                    },

                    onRowUpdating: function (e) {
                        //CRIA UM OBJETO COM OS DADOS ANTIGOS
                        var dadosAtualizados = JSON.parse(JSON.stringify(e.oldData));
                        //ATUALIZA O OBJETO COM OS DADOS ATUAIS
                        Object.keys(e.newData).forEach(key => {
                            dadosAtualizados[key] = e.newData[key];
                        });

                        arrayAlmoxarifadosPedido.forEach((almoxarifado) => {
                            let qtPedida = parseFloat(dadosAtualizados["QT_PEDIDA_ALMOXARIFADO_" + almoxarifado]);

                            dataSave.push({
                                CD_EMPRESA: dadosAtualizados.CD_EMPRESA,
                                NR_PEDIDO: objPedido.numero,
                                CD_PRODUTO: dadosAtualizados.CD_PRODUTO,
                                CD_ALMOXARIFADO: almoxarifado,
                                QT_PEDIDA: qtPedida,
                                CD_UNIDADE_MEDIDA: dadosAtualizados.CD_UNIDADE_MEDIDA_COMPRA,
                                VL_ITEM: dadosAtualizados.VL_UNITARIO_PRODUTO,
                                VL_TOTAL_ITEM: parseFloat(round(qtPedida * dadosAtualizados.VL_UNITARIO_PRODUTO, 2)),
                            });
                        });
                    },

                    onRowRemoved: function (e) {
                        dataDelete.push({
                            CD_EMPRESA: e.data.CD_EMPRESA,
                            NR_PEDIDO: objPedido.numero,
                            CD_PRODUTO: e.data.CD_PRODUTO
                        });
                    },

                    onSaved: function (e) {
                        $.ajax({
                            type: "POST",
                            url: "/PedidoCompra/SalvarPedidoCompraItem",
                            data: {
                                dataSave: dataSave.length == 0 ? null : JSON.stringify(dataSave),
                                dataDelete: dataDelete.length == 0 ? null : JSON.stringify(dataDelete),
                            },
                            success: function (response) {
                                if (response.result == "Erro") {
                                    ExibeMensagem("error", "Ocorreu um erro ao salvar os produtos", response.msg);
                                }
                                else {
                                    ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                                    CarregaPedidoCompra();
                                    CarregaGridSolicitacaoCompraPedido();
                                }
                                CloseProcessPanel();
                            },
                            failure: function (response) {
                                CloseProcessPanel();
                                ExibeMensagem("error", "Ocorreu um erro ao salvar os produtos", JSON.parse(response.responseText));
                            }
                        });
                    },

                    stateStoring: AutoLoad("gridItensPedido", false, true, "QT_PEDIDA_ALMOXARIFADO_%[R],QT_PEDIDA_TOTAL,DS_PEDIDA_TOTAL"),

                    onToolbarPreparing: AutoResetState([]),

                    onContentReady: function (e) {
                        if (objPedido.codigoSituacao != "1" || (objUsuarioParametroCompra.LG_INCLUI_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == 0)) {
                            e.component.option("masterDetail.enabled", false);
                            e.component.option("editing.allowUpdating", false);
                            e.component.option("editing.allowDeleting", false);
                            $("button[id*='btnGridItens']").prop("disabled", true);
                        }
                    },

                }).dxDataGrid("instance");

                deferred.resolve();
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao carregar os itens do pedido", JSON.parse(response.responseText));
            deferred.reject();
        }
    });
    return deferred.promise();
}

function CarregaGridBoxProdutos() {
    var deferred = new $.Deferred;

    var parameters = {
        NR_PEDIDO: objPedido.numero,
        CD_FORNECEDOR: getComponentValue(vLkp_Fornecedores_Filtro_Individual, "dxLookup"),
        DS_MARCAS: getComponentValue(vTag_Marcas_Filtro_Individual, "dxTagBox"),
        CD_FAMILIA: getComponentValue(vDbx_treeView_Familias_Filtro_Individual, "dxDropDownBox"),
        DS_CURVAS: getComponentValue(vTag_Curva_Produtos_Filtro_Individual, "dxTagBox"),
        LG_FORNECEDOR_PADRAO: getComponentValue(vCkb_Fornecedor_Padrao_Filtro_Individual, "dxCheckBox"),
        LG_ABATER_SALDO_RECEBER: getComponentValue(vCkb_Abater_Saldo_Receber_Filtro_Individual, "dxCheckBox"),
        LG_PONTO_REPOSICAO: getComponentValue(vCkb_Produtos_Ponto_Reposicao_Filtro_Individual, "dxCheckBox"),
        LG_INCLUIR_PRODUTOS_AUTOMATICAMENTE: vIncluirProdutosAutomaticamente,
        LG_INCLUIR_SOMENTE_PONTO_REPOSICAO: vIncluirSomentePontoReposicao
    }

    if (objPedido.codigoSituacao != "1" || (objUsuarioParametroCompra.LG_INCLUI_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == 0)) {
        vGridBoxProdutos.option("disabled", true);
        deferred.resolve();
    }
    else {
        vGridBoxProdutos.option("disabled", false);
        $.ajax({
            type: "POST",
            url: "/PedidoCompra/CarregaProdutosFiltroIndividual",
            data: { parameters: JSON.stringify(parameters) },
            success: function (response) {
                if (response.result == "Erro") {
                    ExibeMensagem("error", "Ocorreu um erro ao buscar os produtos do filtro", response.msg);
                    deferred.reject();
                }
                else {
                    let columns = [
                        {
                            type: "selection",
                            width: 30,
                        }, {
                            dataField: "DS_FORA_LINHA",
                            caption: "Fora Linha",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: "center",
                            allowHeaderFiltering: false,
                            width: 40,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "CD_PRODUTO",
                            caption: "Código Interno",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: "center",
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "CD_FABRICANTE",
                            caption: "Código Fabricante",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: false,
                        }, {
                            dataField: "CD_ORIGINAL",
                            caption: "Código Original",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: false,
                        }, {
                            dataField: "CD_OPCIONAL",
                            caption: "Código Opcional",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "CD_EAN_PRODUTO",
                            caption: "Código de Barras",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_MARCA",
                            caption: "Marca",
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_TEXTO_EXPLICATIVO",
                            caption: "Aplicação",
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_PRODUTO",
                            caption: "Descrição Produto",
                            width: "20%",
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "CD_FORNECEDOR_PADRAO",
                            caption: "Cód. Fornecedor Padrão",
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_RAZAO_SOCIAL_FORNECEDOR_PADRAO",
                            caption: "Razão Social Fornecedor Padrão",
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_NOME_FANTASIA_FORNECEDOR_PADRAO",
                            caption: "Nome Fantasia Fornecedor Padrão",
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "CD_CURVA_PRODUTO",
                            caption: "ABC",
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            alignment: "center",
                            width: 40,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_FAMILIA",
                            caption: "Família",
                            allowEditing: false,
                            allowHeaderFiltering: true,
                            allowSorting: true,
                            visible: false,
                        }, {
                            caption: "Estoque Atual",
                            alignment: "center",
                            columns: [{
                                dataField: "DS_ESTOQUE_VENDA_TOTAL",
                                caption: "UN Venda",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                alignment: "right",
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "QT_ESTOQUE_VENDA_TOTAL",
                                caption: "Qt. Estoque UN Venda",
                                dataType: "number",
                                format: "###,###,###,##0.#####",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: false,
                                showInColumnChooser: false,
                            }, {
                                dataField: "DS_ESTOQUE_COMPRA_TOTAL",
                                caption: "UN Compra",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                alignment: "right",
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "QT_ESTOQUE_COMPRA_TOTAL",
                                caption: "Qt. Estoque UN Compra",
                                dataType: "number",
                                format: "###,###,###,##0.#####",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: false,
                                showInColumnChooser: false,
                            }, {
                                dataField: "CD_UNIDADE_MEDIDA_VENDA",
                                caption: "UN Venda",
                                allowEditing: false,
                                allowSorting: true,
                                visible: false,
                                showInColumnChooser: false,
                            }, {
                                dataField: "CD_UNIDADE_MEDIDA_COMPRA",
                                caption: "UN Compra",
                                allowEditing: false,
                                allowSorting: true,
                                visible: false,
                                showInColumnChooser: false,
                            }],
                        }, {
                            dataField: "DS_CONVERSAO",
                            caption: "Conversão",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            visible: false,
                            showInColumnChooser: false,
                        }, {
                            dataField: "DS_NAO_ENTREGUE_TOTAL",
                            caption: "Receb. Pendente",
                            width: 60,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: "right",
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "QT_NAO_ENTREGUE_TOTAL",
                            caption: "Receb. Pendente",
                            dataType: "number",
                            format: "###,###,###,##0.#####",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: "center",
                            allowHeaderFiltering: false,
                            visible: false,
                            showInColumnChooser: false,
                        }, {
                            dataField: "QT_MEDIA_VENDA_TOTAL",
                            caption: "Qt. Média Venda Mensal",
                            dataType: "number",
                            format: "###,###,###,##0.##",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: "center",
                            allowHeaderFiltering: false,
                            visible: false,
                            showInColumnChooser: false,
                        }, {
                            dataField: "DS_MEDIA_VENDA_TOTAL",
                            caption: "Venda Mensal",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: "right",
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "QT_ESTOQUE_MINIMO_TOTAL",
                            caption: "Qt. Estoque Mínimo Total",
                            dataType: "number",
                            format: "###,###,###,##0.##",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: "center",
                            allowHeaderFiltering: false,
                            visible: false,
                            showInColumnChooser: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_ESTOQUE_MINIMO_TOTAL",
                            caption: "Estoque Mínimo Total",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: "right",
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "QT_ESTOQUE_IDEAL_TOTAL",
                            caption: "Qt. Estoque Ideal Total",
                            dataType: "number",
                            format: "###,###,###,##0.##",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: "center",
                            allowHeaderFiltering: false,
                            visible: false,
                            showInColumnChooser: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "DS_ESTOQUE_IDEAL_TOTAL",
                            caption: "Estoque Ideal Total",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: "right",
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "QT_SUGERIDA_TOTAL",
                            caption: "Qt. Sugerida",
                            dataType: "number",
                            format: "###,###,###,##0.#####",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: "center",
                            allowHeaderFiltering: false,
                            visible: false,
                            showInColumnChooser: false,
                        }, {
                            dataField: "DS_SUGERIDA_TOTAL",
                            caption: "Sugest. Compra",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: "right",
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "QT_EMBALAGEM",
                            caption: "Qt. Emb",
                            dataType: "number",
                            format: "###,###,###,##0.#####",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: "right",
                        }, {
                            dataField: "VL_CUSTO_UNITARIO",
                            caption: "Vl. Unitário Atual",
                            dataType: "number",
                            format: "###,###,###,##0.00###",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            visible: false,
                            showInColumnChooser: false,
                        }, {
                            caption: "Informe as quantidades para cada Almoxarifado",
                            alignment: "center",
                            columns: columnsQtPedidaAlmoxarifado,
                        }, {
                            dataField: "DS_CUSTO_SUGERIDO",
                            caption: "Custo Sugerido",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: "left",
                            visible: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "VL_UNITARIO_PRODUTO",
                            caption: "Vl. Unitário",
                            dataType: "number",
                            format: "###,###,###,##0.00###",
                            allowEditing: true,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "VL_TOTAL_PRODUTO",
                            caption: "Vl. Total",
                            dataType: "number",
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            summaryType: "sum",
                            cssClass: "column-data-grid",
                        }, {
                            dataField: "PC_IPI",
                            caption: "% IPI",
                            dataType: "number",
                            format: "###,###,###,##0.####",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            summaryType: "sum",
                            cssClass: "column-data-grid",
                            visible: false,
                        }, {
                            dataField: "DS_FRETE_COMPRA",
                            caption: "Frete",
                            calculateCellValue(data) {
                                if (data.CD_TIPO_CALCULO_FRETE == 1) {
                                    return formataNumero(data.PC_FRETE_COMPRA, 0, 4) + " %";
                                } else {
                                    return "R$ " + formataNumero(data.VL_FRETE_COMPRA, 0, 4);
                                }
                            },
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            summaryType: "sum",
                            cssClass: "column-data-grid",
                            visible: false,
                        }, {
                            dataField: "PC_IVA",
                            caption: "% Substituição",
                            dataType: "number",
                            format: "###,###,###,##0.####",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            summaryType: "sum",
                            cssClass: "column-data-grid",
                            visible: false,
                        }]
                    vGridBoxProdutosDataGrid.clearFilter();
                    vGridBoxProdutos.option("dataSource", response);
                    vGridBoxProdutosDataGrid.option("columns", columns);
                    vGridBoxProdutosDataGrid.option("dataSource", response);

                    vGridBoxProdutosDataGrid.option("stateStoring", AutoLoad("gridBoxProdutos", false, true, "QT_PEDIDA_ALMOXARIFADO_%[R],QT_PEDIDA_TOTAL,DS_PEDIDA_TOTAL"));
                    if (vIncluirProdutosAutomaticamente) {
                        CarregaProdutosPedido();
                    }
                    deferred.resolve();
                }
            },
            failure: function (response) {
                ExibeMensagem("error", "Ocorreu um erro ao buscar os produtos do filtro", JSON.parse(response.responseText));
                deferred.reject();
            }
        });
    }

    return deferred.promise();
}

function CarregaGridSolicitacaoCompra() {
    var deferred = new $.Deferred;

    var parameters = [
        { id: "NR_PEDIDO", value: objPedido.numero },
        { id: "NR_DIAS_CONSULTA", value: getComponentValue(vNbx_Dias_Filtro_Solicitacao_Compra, "dxNumberBox") }
    ];

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetSolicitacaoCompra",
        data: { parameters: JSON.stringify(parameters) },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao carregar as solicitações de compra", response.msg);
                deferred.reject();
            }
            else {
                vGridSolicitacaoCompra.option("dataSource", response);
                deferred.resolve();
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao carregar as solicitações de compra", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function CarregaGridSolicitacaoCompraPedido() {
    var deferred = new $.Deferred;

    var parameters = [
        { id: "NR_PEDIDO", value: objPedido.numero }
    ];

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetSolicitacaoCompraPedido",
        data: { parameters: JSON.stringify(parameters) },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao carregar as solicitações de compra ligadas ao pedido", response.msg);
                deferred.reject();
            }
            else {
                vGridSolicitacaoCompraPedido.option("dataSource", response);
                deferred.resolve();
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao carregar as solicitações de compra ligadas ao pedido", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function CarregaGridCotacaoCompraPedido() {
    var deferred = new $.Deferred;

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetCotacaoCompraPedido",
        data: { pNRPedido: objPedido.numero },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao carregar as cotações de compra ligadas ao pedido", response.msg);
                deferred.reject();
            }
            else {
                vGridCotacaoCompraPedido.option("dataSource", response);
                deferred.resolve();
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao carregar as cotações de compra ligadas ao pedido", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function CarregaGridHistoricoPedido() {
    var deferred = new $.Deferred;

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetHistoricoPedido",
        data: { pNRPedido: objPedido.numero },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao carregar o histórico de alterações do pedido", response.msg);
                deferred.reject();
            }
            else {
                vGridHistoricoPedido.option("dataSource", response);
                deferred.resolve();
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao carregar o histórico de alterações do pedido", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function CarregaGridTransferenciaPedido() {
    var deferred = new $.Deferred;

    var parameters = [
        { id: "NR_PEDIDO", value: objPedido.numero }
    ];

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetTransferenciaPedido",
        data: { parameters: JSON.stringify(parameters) },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao carregar as transferências de mercadorias ligadas ao pedido", response.msg);
                deferred.reject();
            }
            else {
                vGridTransferenciaPedido.option("dataSource", response);
                deferred.resolve();
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao carregar as transferências de mercadorias ligadas ao pedido", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function CarregaModalSugestaoTransferencia(pProduto) {
    var deferred = new $.Deferred;

    if (objUsuarioParametroCompra.LG_PERMITE_CRIAR_TRANSFERENCIA == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        popupAcessoNegado.show();
        deferred.reject();
        return deferred.promise();
    }

    //AJUSTA OS COMPONENTES
    $("#btnGerarTransferencia").text("Gerar Transferências")
    $("#ControlaLote").hide();

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetSugestaoTransferencia",
        data: { pNRPedido: objPedido.numero, pCDProduto: pProduto },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao carregar o modal de sugestão de transferência", response.msg);
                deferred.reject(response.msg);
            }
            else {
                let columnsQtTransferenciaAlmoxarifado = [];
                let columnsQtTransferenciaAlmoxarifadoLote = [];
                let summaryQtTransferirAlmoxarifado = [];
                let arrayAlmoxarifadosTransferencia = [];
                let produtoTransferencia = response[0][0].CD_PRODUTO;
                let vControlaLote = response[0][0].LG_ESTOQUE_LOTE;

                $("#Produto").text(response[0][0].CD_PRODUTO + " - " + response[0][0].DS_PRODUTO);
                $("#UnidadeMedida").text(response[0][0].CD_UNIDADE_MEDIDA_COMPRA);
                if (response[0][0].LG_ESTOQUE_LOTE == true) {
                    $("#ControlaLote").show();
                }

                //CRIA AS COLUNAS DE ALMOXARIFADOS PARA O GRID DE TRANSFERÊNCIA
                response[1].forEach(function (data) {
                    //INCLUI O ALMOXARIFADO NO ARRAY
                    arrayAlmoxarifadosTransferencia.push(data.CD_ALMOXARIFADO);

                    //MONTA A COLUNA PARA RECEBER A QUANTIDADE A TRANSFERIR PARA O ALMOXARIFADO (GRID TRANSFERÊNCIA)
                    columnsQtTransferenciaAlmoxarifado.push({
                        dataField: "QT_TRANSFERENCIA_ALMOXARIFADO_" + data.CD_ALMOXARIFADO.toString(),
                        caption: "Qt. a Transferir para Almox " + data.CD_ALMOXARIFADO.toString(),
                        dataType: "number",
                        format: "###,###,###,##0.#####",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                    });

                    //MONTA A COLUNA PARA RECEBER A QUANTIDADE A TRANSFERIR PARA O ALMOXARIFADO (GRID TRANSFERÊNCIA - MASTER DETAIL LOTE)
                    columnsQtTransferenciaAlmoxarifadoLote.push({
                        dataField: "QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_" + data.CD_ALMOXARIFADO.toString(),
                        caption: "Qt. a Transferir para Almox " + data.CD_ALMOXARIFADO.toString(),
                        dataType: "number",
                        format: "###,###,###,##0.#####",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                    });

                    //MONTA A SUMARIZAÇÃO DAS COLUNAS DINÂMICAS (GRID TRANSFERÊNCIA)
                    summaryQtTransferirAlmoxarifado.push({
                        column: "QT_TRANSFERENCIA_ALMOXARIFADO_" + data.CD_ALMOXARIFADO.toString(),
                        summaryType: "sum",
                        valueFormat: "###,###,###,##0.#####",
                        displayFormat: "{0}",
                    });
                });

                //CRIA O GRID DE NECESSIDADE DE TRANSFERÊNCIA
                vGridNecessidadeTransferencia = $("#gridNecessidadeTransferencia").dxDataGrid({
                    dataSource: response[1],
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    sorting: { mode: "multiple" },
                    allowColumnResizing: true,
                    columnResizingMode: "widget",
                    repaintChangesOnly: true,
                    allowColumnReordering: true,
                    editing: {
                        mode: "batch",
                    },
                    keyboardNavigation: {
                        enterKeyAction: "moveFocus",
                        enterKeyDirection: "column",
                        editOnKeyPress: true,
                    },
                    columnsAutoWidth: true,
                    keyExpr: "CD_ALMOXARIFADO",
                    columns: [
                        {
                            dataField: "NECESSIDADES",
                            caption: "NECESSIDADES DE TRANSFERÊNCIA",
                            cssClass: "column-data-grid",
                            alignment: "center",
                            visible: true,
                            columns: [
                                {
                                    dataField: "CD_ALMOXARIFADO",
                                    caption: "Almox. Destino",
                                    width: 80,
                                    allowEditing: false,
                                    alignment: "center",
                                    cssClass: "column-data-grid",
                                }, {
                                    dataField: "QT_ESTOQUE",
                                    caption: "Qt. Estoque Atual",
                                    dataType: "number",
                                    format: "###,###,###,##0.#####",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                }, {
                                    dataField: "QT_ESTOQUE_IDEAL",
                                    caption: "Qt. Estoque Ideal",
                                    dataType: "number",
                                    format: "###,###,###,##0.#####",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                }, {
                                    dataField: "QT_NECESSIDADE_TRANSFERENCIA",
                                    caption: "Qt. Necessidade de Compra",
                                    dataType: "number",
                                    format: "###,###,###,##0.#####",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                }, {
                                    dataField: "QT_A_TRANSFERIR",
                                    caption: "Qt. a Transferir",
                                    dataType: "number",
                                    format: "###,###,###,##0.#####",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                }, {
                                    dataField: "QT_SALDO_NECESSIDADE_TRANSFERENCIA",
                                    caption: "Qt. Necessidade de Compra após Transferência",
                                    dataType: "number",
                                    format: "###,###,###,##0.#####",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                }
                            ]
                        }
                    ],

                    summary: {
                        recalculateWhileEditing: true,
                        totalItems: [{
                            column: "QT_NECESSIDADE_TRANSFERENCIA",
                            summaryType: "sum",
                            valueFormat: "###,###,###,##0.#####",
                            displayFormat: "{0}",
                        }, {
                            column: "QT_SALDO_NECESSIDADE_TRANSFERENCIA",
                            summaryType: "sum",
                            valueFormat: "###,###,###,##0.#####",
                            displayFormat: "{0}",
                        }],
                    },

                    showBorders: true,

                    onCellPrepared: function (e) {
                        //DEFINE A COLOR PARA AS COLUNAS TIPO HEADER
                        if (e.rowType === "header" && jQuery.inArray(e.column.dataField, ["NECESSIDADES"]) !== -1) {
                            e.cellElement.css({ "color": "#f05b41", "font-weight": "bold" });
                        }
                    },

                    onToolbarPreparing(e) {
                        e.toolbarOptions.visible = false;
                    },

                }).dxDataGrid("instance");

                //CRIA O GRID DE TRANSFERÊNCIA
                vGridTransferencia = $("#gridTransferencia").dxDataGrid({
                    dataSource: response[2],
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    sorting: { mode: "multiple" },
                    allowColumnResizing: true,
                    columnResizingMode: "widget",
                    allowColumnReordering: true,
                    editing: {
                        mode: "batch",
                        allowUpdating: true,
                        startEditAction: "dblClick",
                        allowAdding: false,
                        useIcons: true,
                    },
                    keyboardNavigation: {
                        enterKeyAction: "moveFocus",
                        enterKeyDirection: "column",
                        editOnKeyPress: true,
                    },
                    columnsAutoWidth: true,
                    repaintChangesOnly: true,
                    keyExpr: "CD_ALMOXARIFADO",
                    toolbar: {
                        items: [
                            "groupPanel",
                            "revertButton",
                            "columnChooserButton",
                            "searchPanel",
                        ],
                    },
                    showBorders: true,
                    columns: [
                        {
                            dataField: "ORIGEM",
                            caption: "ALMOXARIFADO ORIGEM",
                            cssClass: "column-data-grid",
                            alignment: "center",
                            visible: true,
                            columns: [
                                {
                                    dataField: "CD_ALMOXARIFADO",
                                    caption: "Almoxarifado",
                                    width: 80,
                                    allowEditing: false,
                                    alignment: "center",
                                    cssClass: "column-data-grid",
                                }, {
                                    dataField: "QT_ESTOQUE",
                                    caption: "Qt. Estoque Atual",
                                    dataType: "number",
                                    format: "###,###,###,##0.#####",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                }, {
                                    dataField: "QT_ESTOQUE_IDEAL",
                                    caption: "Qt. Estoque Ideal",
                                    dataType: "number",
                                    format: "###,###,###,##0.#####",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                }, {
                                    dataField: "QT_DISPONIVEL_TRANSFERENCIA",
                                    caption: "Qt. Disponível para Transferência",
                                    dataType: "number",
                                    format: "###,###,###,##0.#####",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                }, {
                                    dataField: "QT_SALDO_DISPONIVEL_APOS_TRANSFERENCIA",
                                    caption: "Qt. Saldo Disponível após Transferência",
                                    dataType: "number",
                                    format: "###,###,###,##0.#####",
                                    allowEditing: false,
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                }
                            ]
                        }, {
                            dataField: "DESTINO",
                            caption: "ALMOXARIFADO DESTINO",
                            cssClass: "column-data-grid",
                            alignment: "center",
                            columns: columnsQtTransferenciaAlmoxarifado.concat({
                                dataField: "QT_TRANSFERENCIA_TOTAL",
                                caption: "Qt. Transferência Total",
                                dataType: "number",
                                format: "###,###,###,##0.#####",
                                allowEditing: false,
                                allowHeaderFiltering: false,
                                visible: false,
                                cssClass: "column-data-grid",
                            }),
                        }
                    ],

                    summary: {
                        recalculateWhileEditing: true,
                        totalItems: [{
                            column: "QT_DISPONIVEL_TRANSFERENCIA",
                            summaryType: "sum",
                            valueFormat: "###,###,###,##0.#####",
                            displayFormat: "{0}",
                        }, {
                            column: "QT_SALDO_DISPONIVEL_APOS_TRANSFERENCIA",
                            summaryType: "sum",
                            valueFormat: "###,###,###,##0.#####",
                            displayFormat: "{0}",
                        }].concat(summaryQtTransferirAlmoxarifado),
                    },

                    masterDetail: {
                        enabled: true,
                        autoExpandAll: true,
                        template(container, masterDetailOptions) {
                            $("<div>").addClass("bg-white").dxTabPanel({
                                animationEnabled: true,
                                showNavButtons: true,
                                repaintChangesOnly: true,
                                items: [
                                    {
                                        title: " Detalhe por Lote ",
                                        template() {
                                            return $("<div id='GridLote" + masterDetailOptions.key + "'>").dxDataGrid({
                                                dataSource: new DevExpress.data.CustomStore({
                                                    loadMode: "array",
                                                    key: "NR_LOTE",
                                                    load: async () => {
                                                        $.ajax({
                                                            type: "POST",
                                                            url: "/PedidoCompra/GetSugestaoTransferenciaLote",
                                                            data: { pNRPedido: objPedido.numero, pCDProduto: pProduto, pCDAlmoxarifado: masterDetailOptions.data.CD_ALMOXARIFADO },
                                                            success: function (response) {
                                                                if (response.result == "Erro") {
                                                                    ExibeMensagem("error", "Ocorreu um erro ao buscar os lotes dos produtos", response.msg);
                                                                }
                                                                else {
                                                                    $("#GridLote" + masterDetailOptions.key).dxDataGrid("instance").option("dataSource", response);

                                                                    let almoxarifadoRowData = masterDetailOptions.data;
                                                                    //CHAMA A FUNÇÃO PARA AJUSTAR A QUANTIDADE A SER RETIRADA DOS LOTES DISPONÍVEIS
                                                                    AjustaQuantidadeTransferenciaLote(arrayAlmoxarifadosTransferencia, almoxarifadoRowData)

                                                                    if (vGridTransferencia.isRowExpanded(masterDetailOptions.key)) {
                                                                        vGridTransferencia.collapseRow(masterDetailOptions.key);
                                                                    }
                                                                }
                                                            },
                                                            failure: function (response) {
                                                                ExibeMensagem("error", "Ocorreu um erro ao buscar os lotes dos produtos", JSON.parse(response.responseText));
                                                            }
                                                        });
                                                    },
                                                }),
                                                columnAutoWidth: true,
                                                wordWrapEnabled: true,
                                                showRowLines: true,
                                                rowAlternationEnabled: true,
                                                showBorders: false,
                                                allowColumnResizing: true,
                                                columnResizingMode: "widget",
                                                allowColumnReordering: false,
                                                showBorders: true,
                                                repaintChangesOnly: true,
                                                editing: {
                                                    mode: "batch",
                                                    allowUpdating: true,
                                                    startEditAction: "dblClick",
                                                    allowAdding: false,
                                                    allowDeleting: false,
                                                    useIcons: true,
                                                },
                                                keyboardNavigation: {
                                                    enterKeyAction: "moveFocus",
                                                    enterKeyDirection: "column",
                                                    editOnKeyPress: true,
                                                },
                                                keyExpr: "NR_LOTE",
                                                columns: [
                                                    {
                                                        dataField: "CD_ALMOXARIFADO",
                                                        caption: "Almoxarifado de Origem",
                                                        allowEditing: false,
                                                        allowSorting: true,
                                                        alignment: "center",
                                                        visible: true,
                                                        cssClass: "column-data-grid",
                                                    }, {
                                                        dataField: "NR_LOTE",
                                                        caption: "Lote",
                                                        allowEditing: false,
                                                        allowSorting: true,
                                                        alignment: "right",
                                                        visible: true,
                                                        cssClass: "column-data-grid",
                                                    }, {
                                                        dataField: "QT_ESTOQUE",
                                                        caption: "Qt. Estoque Atual",
                                                        dataType: "number",
                                                        format: "###,###,###,##0.#####",
                                                        allowEditing: false,
                                                        allowSorting: true,
                                                        alignment: "center",
                                                        allowHeaderFiltering: false,
                                                        visible: true,
                                                        cssClass: "column-data-grid",
                                                    }].concat(columnsQtTransferenciaAlmoxarifadoLote),

                                                onToolbarPreparing(e) {
                                                    e.toolbarOptions.visible = false;
                                                },

                                                onFocusedCellChanging(e) {
                                                    e.isHighlighted = true;
                                                },

                                                onCellPrepared: function (e) {
                                                    if (e.rowType === "data" && typeof (e.column.dataField) !== "undefined") {
                                                        if (e.column.dataField.startsWith("QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_")) {
                                                            var almox = e.column.dataField.replace("QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_", "")

                                                            if (masterDetailOptions.data["LG_PERMITE_TRANSFERENCIA_ALMOXARIFADO_" + almox] == true) {
                                                                e.cellElement.css("background-color", "#edf3f8");
                                                            }
                                                        }
                                                    }
                                                },

                                                onEditorPreparing: function (e) {
                                                    if (e.parentType == "dataRow" && typeof (e.dataField) != "undefined") {
                                                        if (e.dataField.startsWith("QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_")) {
                                                            var onValueChanged = e.editorOptions.onValueChanged;

                                                            e.editorOptions.onValueChanged = function (args) {
                                                                //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                                                onValueChanged.apply(this, arguments);

                                                                //TRATA O VALOR ALTERADO (NULO E MENOR QUE ZERO)
                                                                args.value = args.value == null ? args.previousValue : args.value;
                                                                args.value = args.value < 0 ? args.previousValue : args.value;

                                                                //ARREDONDA CONFORME AS CASAS DECIMAIS DA UNIDADE DE MEDIDA DE COMPRA
                                                                args.value = round(args.value, masterDetailOptions.data.NR_CASAS_DECIMAIS)

                                                                //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                                                onValueChanged.apply(this, arguments);

                                                                e.component.getDataSource().store().load().then(originalData => {
                                                                    let qtTransferenciaTotal = 0;
                                                                    let qtTotalAlmoxarifadoDestino = 0;
                                                                    let qtAlmoxarifado = 0;
                                                                    let qtDemaisAlmoxarifados = 0;
                                                                    let almoxarifadoAtual = parseInt(e.dataField.toString().replace("QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_", ""));

                                                                    //PEGA AS ALTERAÇÕES FEITAS NO GRID
                                                                    const changes = e.component.option("editing.changes");
                                                                    //GERA UM CONJUNTO DE DADOS APLICANDO AS ALTERAÇÕES NOS DADOS ORIGINAIS
                                                                    let newData = DevExpress.data.applyChanges(originalData, changes, { keyExpr: e.component.option("keyExpr") });

                                                                    //FAZ UM LOOP NO CONJUNTO DE DADOS GERADO
                                                                    for (var indice in newData) {
                                                                        //FAZ UM LOOP PARA SOMAR AS COLUNAS DE QUANTIDADE DE CADA ALMOXARIFADO DE DESTINO
                                                                        arrayAlmoxarifadosTransferencia.forEach((almoxarifado) => {
                                                                            qtTransferenciaTotal += parseFloat(newData[indice]["QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_" + almoxarifado]);

                                                                            if (parseInt(newData[indice]["NR_LOTE"]) == parseInt(e.row.data.NR_LOTE)) {
                                                                                if (almoxarifado == almoxarifadoAtual) {
                                                                                    qtAlmoxarifado = parseFloat(newData[indice]["QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_" + almoxarifado]);
                                                                                }
                                                                                else {
                                                                                    qtDemaisAlmoxarifados += parseFloat(newData[indice]["QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_" + almoxarifado]);
                                                                                }
                                                                            }

                                                                            if (almoxarifado == almoxarifadoAtual) {
                                                                                qtTotalAlmoxarifadoDestino += parseFloat(newData[indice]["QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_" + almoxarifado]);
                                                                            }
                                                                        });
                                                                    }

                                                                    //VALIDAÇÃO DA QUANTIDADE DISPONÍVEL EM ESTOQUE (LOTE)
                                                                    if ((qtAlmoxarifado + qtDemaisAlmoxarifados) > e.row.data.QT_ESTOQUE) {
                                                                        args.value = args.previousValue
                                                                        //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                                                        onValueChanged.apply(this, arguments);
                                                                        ExibeMensagem("info", "Quantidade inválida!", "A soma das quantidades informadas (" + (qtAlmoxarifado + qtDemaisAlmoxarifados) + ") é maior que o saldo disponível (" + e.row.data.QT_ESTOQUE + ") no lote.\nAlteração desfeita.");
                                                                    }
                                                                    //VALIDAÇÃO DA QUANTIDADE DISPONÍVEL NO ALMOXARIFADO PARA TRANSFERÊNCIA
                                                                    else if (qtTransferenciaTotal > masterDetailOptions.data.QT_DISPONIVEL_TRANSFERENCIA) {
                                                                        args.value = args.previousValue
                                                                        //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                                                        onValueChanged.apply(this, arguments);
                                                                        ExibeMensagem("info", "Quantidade inválida!", "A soma total das quantidades (" + qtTransferenciaTotal + ") é maior que o saldo disponível para transferência (" + masterDetailOptions.data.QT_DISPONIVEL_TRANSFERENCIA + ") no almoxarifado.\nAlteração desfeita.");
                                                                    }
                                                                    else {
                                                                        let qtDisponivel = masterDetailOptions.data.QT_DISPONIVEL_TRANSFERENCIA;

                                                                        //CORRIGE DADOS NO GRID DE TRANSFERÊNCIA
                                                                        vGridTransferencia.cellValue(masterDetailOptions.rowIndex, "QT_TRANSFERENCIA_ALMOXARIFADO_" + almoxarifadoAtual, qtTotalAlmoxarifadoDestino);
                                                                        vGridTransferencia.cellValue(masterDetailOptions.rowIndex, "QT_SALDO_DISPONIVEL_APOS_TRANSFERENCIA", qtDisponivel - (qtAlmoxarifado + qtDemaisAlmoxarifados));

                                                                        //SE HOUVE ALTERAÇÃO NO VALOR, MUDA O TEXTO DO BOTÃO
                                                                        if (args.value != args.previousValue) {
                                                                            $("#btnGerarTransferencia").text("Salvar e Gerar Transferências")
                                                                        }

                                                                        //PEGA O ÍNDICE DO ALMOXARIFADO NO GRID DE NECESSIDADES DE TRANSFERÊNCIA
                                                                        var rowIndexAlmox = vGridNecessidadeTransferencia.getRowIndexByKey(almoxarifadoAtual)

                                                                        qtNecessidadeTransferencia = vGridNecessidadeTransferencia.cellValue(rowIndexAlmox, "QT_NECESSIDADE_TRANSFERENCIA");

                                                                        //CORRIGE O SALDO DA NECESSIDADE DE TRANSFERÊNCIA
                                                                        vGridNecessidadeTransferencia.cellValue(rowIndexAlmox, "QT_SALDO_NECESSIDADE_TRANSFERENCIA", qtNecessidadeTransferencia - qtTotalAlmoxarifadoDestino);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    }
                                                },

                                                onEditingStart: function (e) {
                                                    if (e.column.dataField.startsWith("QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_")) {
                                                        var almox = e.column.dataField.replace("QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_", "")
                                                        e.cancel = !masterDetailOptions.data["LG_PERMITE_TRANSFERENCIA_ALMOXARIFADO_" + almox];
                                                    }
                                                },
                                            });
                                        }
                                    },
                                ],

                            }).appendTo(container);
                        },
                    },

                    onCellPrepared: function (e) {
                        if (e.rowType === "header" && jQuery.inArray(e.column.dataField, ["ORIGEM", "DESTINO"]) !== -1) {
                            e.cellElement.css({ "color": "#f05b41", "font-weight": "bold" });
                        }
                        else if (e.rowType === "data" && typeof (e.column.dataField) !== "undefined") {
                            if (e.column.dataField.startsWith("QT_TRANSFERENCIA_ALMOXARIFADO_")) {
                                var almox = e.column.dataField.replace("QT_TRANSFERENCIA_ALMOXARIFADO_", "")

                                if (e.data["LG_PERMITE_TRANSFERENCIA_ALMOXARIFADO_" + almox] == true) {
                                    e.cellElement.css("background-color", "#edf3f8");
                                }
                            }
                        }
                        else if (e.rowType === "data" && e.column.command === "expand") {
                            if (vControlaLote == false) {
                                e.cellElement.removeClass("dx-datagrid-expand");
                                e.cellElement.empty();
                            }
                        }
                    },

                    onEditorPreparing: function (e) {
                        if (e.parentType == "dataRow" && typeof (e.dataField) != "undefined") {
                            if (e.dataField.startsWith("QT_TRANSFERENCIA_ALMOXARIFADO_")) {
                                var almoxarifadoAtual = parseInt(e.dataField.toString().replace("QT_TRANSFERENCIA_ALMOXARIFADO_", ""));

                                var onValueChanged = e.editorOptions.onValueChanged;
                                e.editorOptions.onValueChanged = function (args) {
                                    let qtTransferenciaOrigemTotal = 0;
                                    let qtTransferenciaDestinoTotal = 0;
                                    let qtAlmoxarifado = 0;
                                    let qtDemaisAlmoxarifados = 0;
                                    let qtNecessidadeTransferencia = 0;
                                    let qtDisponivel = e.component.cellValue(e.row.rowIndex, "QT_DISPONIVEL_TRANSFERENCIA");

                                    //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                    onValueChanged.apply(this, arguments);

                                    //TRATA O VALOR ALTERADO (NULO E MENOR QUE ZERO)
                                    args.value = args.value == null ? args.previousValue : args.value;
                                    args.value = args.value < 0 ? args.previousValue : args.value;

                                    //ARREDONDA CONFORME AS CASAS DECIMAIS DA UNIDADE DE MEDIDA DE COMPRA
                                    args.value = round(args.value, e.row.data.NR_CASAS_DECIMAIS)

                                    //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                    onValueChanged.apply(this, arguments);

                                    //FAZ UM LOOP PARA SOMAR AS COLUNAS DE QUANTIDADE DE CADA ALMOXARIFADO DE DESTINO
                                    arrayAlmoxarifadosTransferencia.forEach((almoxarifado) => {
                                        if (almoxarifado == almoxarifadoAtual) {
                                            qtAlmoxarifado = e.component.cellValue(e.row.rowIndex, "QT_TRANSFERENCIA_ALMOXARIFADO_" + almoxarifado);
                                            qtTransferenciaOrigemTotal += e.component.cellValue(e.row.rowIndex, "QT_TRANSFERENCIA_ALMOXARIFADO_" + almoxarifado);
                                        }
                                        else {
                                            qtDemaisAlmoxarifados += e.component.cellValue(e.row.rowIndex, "QT_TRANSFERENCIA_ALMOXARIFADO_" + almoxarifado);
                                            qtTransferenciaOrigemTotal += e.component.cellValue(e.row.rowIndex, "QT_TRANSFERENCIA_ALMOXARIFADO_" + almoxarifado);
                                        }
                                    });

                                    ////////////////////////////////////////////////////////////
                                    //VALIDAÇÃO DA QUANTIDADE DISPONÍVEL
                                    ////////////////////////////////////////////////////////////
                                    if ((qtAlmoxarifado + qtDemaisAlmoxarifados) > qtDisponivel) {
                                        args.value = round(args.previousValue, e.row.data.NR_CASAS_DECIMAIS)
                                        //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                                        onValueChanged.apply(this, arguments);
                                        ExibeMensagem("info", "Quantidade inválida!", "A soma das quantidades para os almoxarifados de destino (" + (qtAlmoxarifado + qtDemaisAlmoxarifados) + ") é maior que o saldo disponível (" + qtDisponivel + ") no almoxarifado de origem.\nAlteração desfeita.");
                                        qtAlmoxarifado = args.previousValue;
                                    }

                                    //CORRIGE O SALDO APÓS A TRANSFERÊNCIA
                                    e.component.cellValue(e.row.rowIndex, "QT_SALDO_DISPONIVEL_APOS_TRANSFERENCIA", round(qtDisponivel - (qtAlmoxarifado + qtDemaisAlmoxarifados), e.row.data.NR_CASAS_DECIMAIS));

                                    //SE HOUVE ALTERAÇÃO NO VALOR, MUDA O TEXTO DO BOTÃO
                                    if (args.value != args.previousValue) {
                                        $("#btnGerarTransferencia").text("Salvar e Gerar Transferências")
                                    }

                                    let newData = null;
                                    let newDataAlmoxarifado = null;
                                    e.component.getDataSource().store().load().then(originalData => {
                                        //PEGA AS ALTERAÇÕES FEITAS NO GRID
                                        const changes = e.component.option("editing.changes");
                                        //GERA UM NOVO CONJUNTO DE DADOS APLICANDO AS ALTERAÇÕES NOS DADOS ORIGINAIS
                                        newData = DevExpress.data.applyChanges(originalData, changes, { keyExpr: e.component.option("keyExpr") });

                                        //FAZ UM LOOP PARA SOMAR A QUANTIDADE TOTAL DE TRANSFERÊNCIA PARA O ALMOXARIFADO ATUAL
                                        for (var indice in newData) {
                                            var qtTransferenciaDestino = parseFloat(newData[indice]["QT_TRANSFERENCIA_ALMOXARIFADO_" + almoxarifadoAtual]);
                                            qtTransferenciaDestinoTotal += qtTransferenciaDestino;

                                            if (newData[indice].CD_ALMOXARIFADO == e.row.data.CD_ALMOXARIFADO) {
                                                newDataAlmoxarifado = newData[indice];
                                            }
                                        }

                                        //PEGA O ÍNDICE DO ALMOXARIFADO NO GRID DE NECESSIDADES DE TRANSFERÊNCIA
                                        var rowIndexAlmox = vGridNecessidadeTransferencia.getRowIndexByKey(almoxarifadoAtual)

                                        qtNecessidadeTransferencia = vGridNecessidadeTransferencia.cellValue(rowIndexAlmox, "QT_NECESSIDADE_TRANSFERENCIA");

                                        //CORRIGE O SALDO DA NECESSIDADE DE TRANSFERÊNCIA
                                        vGridNecessidadeTransferencia.cellValue(rowIndexAlmox, "QT_SALDO_NECESSIDADE_TRANSFERENCIA", round(qtNecessidadeTransferencia - qtTransferenciaDestinoTotal, e.row.data.NR_CASAS_DECIMAIS));
                                        vGridNecessidadeTransferencia.cellValue(rowIndexAlmox, "QT_A_TRANSFERIR", round(qtTransferenciaDestinoTotal, e.row.data.NR_CASAS_DECIMAIS));

                                        AjustaQuantidadeTransferenciaLote(arrayAlmoxarifadosTransferencia, newDataAlmoxarifado);
                                    });
                                }
                            }
                        }
                    },

                    onEditingStart: function (e) {
                        if (e.column.dataField.startsWith("QT_TRANSFERENCIA_ALMOXARIFADO_")) {
                            var almox = e.column.dataField.replace("QT_TRANSFERENCIA_ALMOXARIFADO_", "")
                            e.cancel = !e.data["LG_PERMITE_TRANSFERENCIA_ALMOXARIFADO_" + almox];
                        }
                    },

                    onEditCanceled(e) {
                        vGridNecessidadeTransferencia.cancelEditData();

                        vGridTransferencia.getVisibleRows().forEach((row) => {
                            if (row.rowType === "detail") {
                                var vGridLote = $("#GridLote" + row.data.CD_ALMOXARIFADO).dxDataGrid("instance");
                                vGridLote.cancelEditData();

                                AjustaQuantidadeTransferenciaLote(arrayAlmoxarifadosTransferencia, row.data);
                            }
                        });

                        $("#btnGerarTransferencia").text("Gerar Transferências")
                    },

                    onSaving: function (e) {
                        transferenciasGeradas = [];
                        (async () => {
                            OpenProcessPanel("Processando...")
                            try {
                                for (const rowAlmoxarifadoOrigem of vGridTransferencia.getVisibleRows()) {
                                    if (rowAlmoxarifadoOrigem.rowType == "data") {
                                        var vGridLote = $("#GridLote" + rowAlmoxarifadoOrigem.data.CD_ALMOXARIFADO).dxDataGrid("instance");

                                        for (const rowLote of vGridLote.getVisibleRows()) {
                                            if (rowLote.rowType == "data") {
                                                for (const almoxarifadoDestino of arrayAlmoxarifadosTransferencia) {
                                                    if (parseFloat(rowLote.data["QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_" + almoxarifadoDestino]) > 0) {
                                                        var vNRProcesso = 0;

                                                        //AGUARDA SALVAR O CABEÇALHO
                                                        await SalvaSugestaoTransferenciaCabecalho(parseInt(rowAlmoxarifadoOrigem.data.CD_ALMOXARIFADO), almoxarifadoDestino).then(
                                                            (resolve) => {
                                                                vNRProcesso = resolve;
                                                            },
                                                            (reject) => {
                                                                ExibeMensagem("error", "Ocorreu um erro ao salvar o cabeçalho da transferência", reject);
                                                                return;
                                                            });

                                                        //AGUARDA SALVAR O PRODUTO
                                                        await SalvaSugestaoTransferenciaProduto(vNRProcesso, produtoTransferencia, rowLote.data.NR_LOTE, parseFloat(rowLote.data["QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_" + almoxarifadoDestino])).then(
                                                            (resolve) => {
                                                                transferenciasGeradas.push({
                                                                    CD_PRODUTO: produtoTransferencia,
                                                                    CD_ALMOXARIFADO_ORIGEM: parseInt(rowAlmoxarifadoOrigem.data.CD_ALMOXARIFADO),
                                                                    CD_ALMOXARIFADO_DESTINO: parseInt(almoxarifadoDestino),
                                                                    NR_LOTE: rowLote.data.NR_LOTE,
                                                                    QT_TRANSFERENCIA: parseFloat(rowLote.data["QT_TRANSFERENCIA_LOTE_ALMOXARIFADO_" + almoxarifadoDestino]),
                                                                });
                                                            },
                                                            (reject) => {
                                                                ExibeMensagem("error", "Ocorreu um erro ao salvar o produto " + produtoTransferencia + " da transferência " + vNRProcesso, reject);
                                                                return;
                                                            });
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            finally {
                                CloseProcessPanel();
                            }

                            OpenModalAcaoPosTransferencia("INDIVIDUAL");
                        })();
                    },
                    stateStoring: AutoLoad("gridTransferencia", false),
                    onToolbarPreparing: AutoResetState([]),
                }).dxDataGrid("instance");

                deferred.resolve();
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao carregar o modal de sugestão de transferência", JSON.parse(response.responseText));
            deferred.reject();
        }
    });
    return deferred.promise();
}

function SalvarDadosGerais() {
    if (vLoading || objPedido.codigoSituacao != "1" || (objUsuarioParametroCompra.LG_INCLUI_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == 0)) return;

    let dataUpdate = [
        { id: "CD_EMPRESA", value: null, isKey: true },
        { id: "NR_PEDIDO", value: objPedido.numero, isKey: true },
        { id: "CD_FILIAL", value: getComponentValue(vLkp_Filial_Pedido, "dxLookup"), isKey: false },
        { id: "DS_CONTATO", value: getComponentValue(vTxt_Nome_Contato, "dxTextBox"), isKey: false },
        { id: "NR_TELEFONE_CONTATO", value: getComponentValue(vTxt_Telefone_Contato, "dxTextBox"), isKey: false },
        { id: "DT_PREVISAO_ENTREGA", value: getComponentValue(vDt_Previsao_Entrega, "dxDateBox") == null ? null : new Date(getComponentValue(vDt_Previsao_Entrega, "dxDateBox")).yyyyMMdd() + "T00:00:00Z", isKey: false },
        { id: "DS_OBS", value: getComponentValue(vTxt_Obs_Pedido, "dxTextArea"), isKey: false },
        { id: "CD_FORMA_PAGAMENTO", value: getComponentValue(vLkp_Formas_Pagamento, "dxLookup"), isKey: false }
    ];

    $.ajax({
        url: '/PedidoCompra/AlterarPedidoCompra',
        method: 'POST',
        data: { dataUpdate: JSON.stringify(dataUpdate) },
    }).done(function (response) {
        ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao salvar os dados gerais do pedido de compra", response);
    });
}

function GetDadosProcessamentoSugestaoCompra() {
    var deferred = new $.Deferred;

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetDadosProcessamentoSugestaoCompra",
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao buscar os dados de processamento de sugestão de compras", response.msg);
                deferred.reject(response.msg);
            }
            else {
                $("#dataUltimoProcessamentoSugestaoCompra").text(response[0].DT_PROCESSAMENTO == null ? "" : new Date(response[0].DT_PROCESSAMENTO).ddMMyyyyHHmm());
                deferred.resolve();
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao buscar os dados de processamento de sugestão de compras", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function ProcessarSugestaoCompra() {
    OpenProcessPanel("Processando...")

    var deferred = new $.Deferred;

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/ProcessarSugestaoCompra",
        success: async function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao processar sugestão de compras", response.msg);
                deferred.reject(response.msg);
            }
            else {
                await GetDadosProcessamentoSugestaoCompra();
                deferred.resolve();
            }
            CloseProcessPanel();
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao processar sugestão de compras", JSON.parse(response.responseText));
            CloseProcessPanel();
            deferred.reject();
        }
    });

    return deferred.promise();
}

function GetParametros() {
    var deferred = new $.Deferred;

    //BUSCA OS PARAMETROS
    $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetParametros",
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao buscar os parâmetros iniciais", response.msg);
                deferred.reject(response.msg);
            }
            else {
                vCDEmpresa = response[0].CD_EMPRESA;
                nomeEmpresa = response[0].DS_NOME_EMPRESA;
                segmentoEmpresa = response[0].CD_SEGMENTO;
                casasDecimaisCompra = response[0].QT_DECIMAIS_COMPRA;
                casasDecimaisVenda = response[0].QT_DECIMAIS_VENDA;
                vEmpresaParticipaRadarPreco = !(response[0].LG_DESCADASTRADO_PESQUISA_PRECO == null ? false : response[0].LG_DESCADASTRADO_PESQUISA_PRECO);
                vChk_Confirma_Envio_Email_Pedido_Compra.option("value", (response[0].LG_CONFIRMA_ENVIO_EMAIL_PEDIDO_COMPRA == null ? false : response[0].LG_CONFIRMA_ENVIO_EMAIL_PEDIDO_COMPRA));
                vRdb_Tipo_Custo_Impressao_Pedido.option("value", (response[0].LG_EXIBIR_CUSTO_TOTAL_PEDIDO_COMPRA == null ? false : response[0].LG_EXIBIR_CUSTO_TOTAL_PEDIDO_COMPRA));
                vRdb_Tipo_Transferencia.option("value", (response[0].CD_TIPO_TRANSFERENCIA_PEDIDO_COMPRA == null ? "C" : response[0].CD_TIPO_TRANSFERENCIA_PEDIDO_COMPRA));
                vTxt_Formula_Media_Venda_Diaria.option("value", response[0].DS_FORMULA_MEDIA_VENDA_DIARIA);

                //CONFIGURAÇÃO SMTP
                vTxt_Configuracao_SMTP_Email.option("value", response[0].DS_ENDERECO_EMAIL_ENVIO_WEB);
                vTxt_Configuracao_SMTP_Servidor.option("value", response[0].DS_SERVIDOR_SMTP_EMAIL_ENVIO_WEB);
                vTxt_Configuracao_SMTP_Porta.option("value", response[0].DS_PORTA_SMTP_EMAIL_ENVIO_WEB);
                vTxt_Configuracao_SMTP_Senha.option("value", response[0].DS_SENHA_EMAIL_ENVIO_WEB);
                vCkb_Configuracao_SMTP_Usa_TLS.option("value", response[0].LG_USA_TLS_EMAIL_COMPRA);

                //CONFIGURAÇÃO ASSUNTO E CORPO EMAIL (PEDIDO COMPRA)
                vTxt_Configuracao_Assunto_Email.option("value", response[0].DS_ASSUNTO_EMAIL_PEDIDO_COMPRA);
                vTxt_Configuracao_Corpo_Email.option("value", response[0].DS_MENSAGEM_EMAIL_PEDIDO_COMPRA);

                //CONFIGURAÇÃO CORPO WHATSAPP (PEDIDO COMPRA)
                vTxt_Configuracao_Corpo_WhatsApp.option("value", response[0].DS_MENSAGEM_WHATSAPP_PEDIDO_COMPRA);

                //BUSCA OS PARAMETROS DO CARGO DE COMPRADOR PARA O USUÁRIO LOGADO
                $.ajax({
                    type: "POST",
                    url: "/PedidoCompra/GetUsuarioCargoComprador",
                    data: { pCDLogin: objUsuarioParametroCompra.CD_LOGIN },
                    success: function (response) {
                        if (response.result == "Erro") {
                            ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do cargo de comprador", response.msg);
                        }
                        else {
                            vVlLimitePedidoCompra = null;
                            if (response.length > 0) {
                                vVlLimitePedidoCompra = response[0].VL_LIMITE;
                            }
                        }

                        deferred.resolve();
                    },
                    failure: function (response) {
                        ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do cargo de comprador", JSON.parse(response.responseText));
                    }
                });
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao buscar os parâmetros iniciais", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function SalvaParametros() {
    if (vLoading == true) { return };

    OpenProcessPanel("Processando...");
    var deferred = new $.Deferred;

    let parameters = [
        { id: "CD_EMPRESA", value: null, isKey: true },
        { id: "LG_CONFIRMA_ENVIO_EMAIL_PEDIDO_COMPRA", value: getComponentValue(vChk_Confirma_Envio_Email_Pedido_Compra, "dxCheckBox"), isKey: false },
        { id: "LG_EXIBIR_CUSTO_TOTAL_PEDIDO_COMPRA", value: getComponentValue(vRdb_Tipo_Custo_Impressao_Pedido, "dxRadioGroup"), isKey: false },
        { id: "CD_TIPO_TRANSFERENCIA_PEDIDO_COMPRA", value: getComponentValue(vRdb_Tipo_Transferencia, "dxRadioGroup"), isKey: false },
        { id: "DS_FORMULA_MEDIA_VENDA_DIARIA", value: getComponentValue(vTxt_Formula_Media_Venda_Diaria, "dxTextBox"), isKey: false },
    ];

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/SalvaParametros",
        data: { parameters: JSON.stringify(parameters) },
        success: function (response) {
            CloseProcessPanel();
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao salvar as configurações", response.msg);
                deferred.reject();
            }
            else {
                ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                deferred.resolve();
            }
        },
        failure: function (response) {
            CloseProcessPanel();
            ExibeMensagem("error", "Ocorreu um erro ao salvar as configurações", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function AlterarUsuarioCargoComprador() {
    if (vLoading == true) return;

    var deferred = new $.Deferred;

    let parameters = [
        { id: "CD_EMPRESA", value: vCDEmpresa, isKey: true },
        { id: "CD_LOGIN", value: getComponentValue(vLkp_Usuario_Configuracoes, "dxLookup"), isKey: true },
        { id: "CD_CARGO", value: 2, isKey: true },
        { id: "VL_LIMITE", value: getComponentValue(vNbx_Vl_Limite_Pedido_Compra, "dxNumberBox"), isKey: false }
    ];

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/AlterarUsuarioCargoComprador",
        data: { data: JSON.stringify(parameters) },
        success: function (response) {
            CloseProcessPanel();
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao salvar os dados do comprador", response.msg);
                deferred.reject();
            }
            else {
                ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                //SE ESTIVER ALTERANDO O USUÁRIO LOGADO, ALTERA A VARIÁVEL VVLLIMITEPEDIDOCOMPRA
                if (getComponentValue(vLkp_Usuario_Configuracoes, "dxLookup") == objUsuarioParametroCompra.CD_LOGIN) {
                    vVlLimitePedidoCompra = getComponentValue(vNbx_Vl_Limite_Pedido_Compra, "dxNumberBox");
                }
                deferred.resolve();
            }
        },
        failure: function (response) {
            CloseProcessPanel();
            ExibeMensagem("error", "Ocorreu um erro ao salvar os dados do comprador", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function GetUsuarioParametroCompra() {
    var deferred = new $.Deferred;

    //BUSCA OS PARAMETROS
    $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetUsuarioParametroCompra",
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao buscar os parâmetros do usuário", response.msg);
                deferred.reject(response.msg);
            }
            else {
                objUsuarioParametroCompra = new UsuarioParametroCompra();
                objUsuarioParametroCompra.CD_EMPRESA = response.CD_EMPRESA;
                objUsuarioParametroCompra.CD_LOGIN = response.CD_LOGIN;
                objUsuarioParametroCompra.DS_NOME = response.DS_NOME;
                objUsuarioParametroCompra.CD_STATUS = response.CD_STATUS;
                objUsuarioParametroCompra.NR_NIVEL_ACESSO = response.NR_NIVEL_ACESSO;
                objUsuarioParametroCompra.LG_CONSULTA_PEDIDO = response.LG_CONSULTA_PEDIDO;
                objUsuarioParametroCompra.LG_INCLUI_PEDIDO = response.LG_INCLUI_PEDIDO;
                objUsuarioParametroCompra.LG_CONCLUI_PEDIDO = response.LG_CONCLUI_PEDIDO;
                objUsuarioParametroCompra.LG_PERMITE_LIBERACAO_PEDIDO = response.LG_PERMITE_LIBERACAO_PEDIDO;
                objUsuarioParametroCompra.LG_CANCELA_PEDIDO = response.LG_CANCELA_PEDIDO;
                objUsuarioParametroCompra.LG_ENVIA_PEDIDO = response.LG_ENVIA_PEDIDO;
                objUsuarioParametroCompra.LG_PERMITE_CRIAR_TRANSFERENCIA = response.LG_PERMITE_CRIAR_TRANSFERENCIA;
                objUsuarioParametroCompra.LG_PERMITE_CRIAR_COTACAO = response.LG_PERMITE_CRIAR_COTACAO;
                objUsuarioParametroCompra.LG_PERMITE_ENVIAR_COTACAO = response.LG_PERMITE_ENVIAR_COTACAO;
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_VENDA = response.LG_EXIBIR_GRAFICO_VALOR_VENDA;
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_COMPRA = response.LG_EXIBIR_GRAFICO_VALOR_COMPRA;
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_VENDA = response.LG_EXIBIR_GRAFICO_QTDE_VENDA;
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_COMPRA = response.LG_EXIBIR_GRAFICO_QTDE_COMPRA;
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA = response.LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA;
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA = response.LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA;
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA = response.LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA;
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA = response.LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA;
                objUsuarioParametroCompra.LG_POSSUI_ACESSO_PEDIDO_COMPRA = response.LG_POSSUI_ACESSO_PEDIDO_COMPRA;
                objUsuarioParametroCompra.LG_EMITE_ALERTA_PEDIDOS_PROPRIOS_NAO_ENVIADOS = response.LG_EMITE_ALERTA_PEDIDOS_PROPRIOS_NAO_ENVIADOS;
                objUsuarioParametroCompra.LG_EMITE_ALERTA_TODOS_PEDIDOS_NAO_ENVIADOS = response.LG_EMITE_ALERTA_TODOS_PEDIDOS_NAO_ENVIADOS;

                if (objUsuarioParametroCompra.NR_NIVEL_ACESSO == "1") {
                    $("#btnConfiguracoesGerais").show();
                    $("#btnConfiguracoesUsuario").show();
                } else {
                    $("#btnConfiguracoesGerais").hide();
                    $("#btnConfiguracoesUsuario").hide();
                }

                //if (objUsuarioParametroCompra.LG_INCLUI_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
                //    $("#btnIncluirNovoPedido").hide();
                //} else {
                //    $("#btnIncluirNovoPedido").show();
                //}

                //if (objUsuarioParametroCompra.LG_CONSULTA_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
                //    $("#btnConsultaElaboracao").hide();
                //    $("#btnConsultaGeral").hide();
                //} else {
                //    $("#btnConsultaElaboracao").show();
                //    $("#btnConsultaGeral").show();
                //}

                deferred.resolve();
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao buscar os parâmetros do usuário", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function AlterarUsuarioParametroCompra() {
    if (vLoading == true) { return };

    var deferred = new $.Deferred;

    let parameters = [
        { id: "CD_EMPRESA", value: objUsuarioParametroCompra.CD_EMPRESA, isKey: true },
        { id: "CD_LOGIN", value: objUsuarioParametroCompra.CD_LOGIN, isKey: true },
        { id: "LG_CONSULTA_PEDIDO", value: objUsuarioParametroCompra.LG_CONSULTA_PEDIDO, isKey: false },
        { id: "LG_INCLUI_PEDIDO", value: objUsuarioParametroCompra.LG_INCLUI_PEDIDO, isKey: false },
        { id: "LG_CONCLUI_PEDIDO", value: objUsuarioParametroCompra.LG_CONCLUI_PEDIDO, isKey: false },
        { id: "LG_PERMITE_LIBERACAO_PEDIDO", value: objUsuarioParametroCompra.LG_PERMITE_LIBERACAO_PEDIDO, isKey: false },
        { id: "LG_CANCELA_PEDIDO", value: objUsuarioParametroCompra.LG_CANCELA_PEDIDO, isKey: false },
        { id: "LG_ENVIA_PEDIDO", value: objUsuarioParametroCompra.LG_ENVIA_PEDIDO, isKey: false },
        { id: "LG_PERMITE_CRIAR_TRANSFERENCIA", value: objUsuarioParametroCompra.LG_PERMITE_CRIAR_TRANSFERENCIA, isKey: false },
        { id: "LG_PERMITE_CRIAR_COTACAO", value: objUsuarioParametroCompra.LG_PERMITE_CRIAR_COTACAO, isKey: false },
        { id: "LG_PERMITE_ENVIAR_COTACAO", value: objUsuarioParametroCompra.LG_PERMITE_ENVIAR_COTACAO, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_VALOR_VENDA", value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_VENDA, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_VALOR_COMPRA", value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_COMPRA, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_QTDE_VENDA", value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_VENDA, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_QTDE_COMPRA", value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_COMPRA, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA", value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA", value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA", value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA", value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA, isKey: false },
        { id: "LG_EMITE_ALERTA_PEDIDOS_PROPRIOS_NAO_ENVIADOS", value: objUsuarioParametroCompra.LG_EMITE_ALERTA_PEDIDOS_PROPRIOS_NAO_ENVIADOS, isKey: false },
        { id: "LG_EMITE_ALERTA_TODOS_PEDIDOS_NAO_ENVIADOS", value: objUsuarioParametroCompra.LG_EMITE_ALERTA_TODOS_PEDIDOS_NAO_ENVIADOS, isKey: false },
    ];

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/AlterarUsuarioParametroCompra",
        data: { dataUpdate: JSON.stringify(parameters) },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao salvar os parâmetros do usuário", response.msg);
                deferred.reject();
            }
            else {
                ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                deferred.resolve();
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao salvar os parâmetros do usuário", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function LoadLookupUsuarioConfiguracao() {
    return new DevExpress.data.DataSource({
        loadMode: 'raw',
        key: 'CD_LOGIN',
        load: async () => {
            var dataSource = [];
            await GetAzureDataSource(34).then((result) => {
                dataSource = result;
            });
            return dataSource.data;
        }
    })
}

function OpenConfiguracaoGerais() {
    if (objUsuarioParametroCompra.NR_NIVEL_ACESSO == 1) {
        ExibirEsconderFiltros('configuracoesGerais');
    } else {
        popupAcessoNegado.show();
    }
}

function OpenConfiguracaoUsuarioParametroCompra() {
    if (objUsuarioParametroCompra.NR_NIVEL_ACESSO == 1) {
        ExibirEsconderFiltros('configuracoesUsuario');
    } else {
        popupAcessoNegado.show();
    }
}

async function GetUsuarioParametroCompraConfiguracao(pCDLogin) {
    try {
        //BUSCA OS PARAMETROS DE COMPRA PARA O USUÁRIO
        await $.ajax({
            type: "POST",
            url: "/PedidoCompra/GetUsuarioParametroCompra",
            data: { pCDLogin: pCDLogin },
            success: function (response) {
                if (response.result == "Erro") {
                    ExibeMensagem("error", "Ocorreu um erro ao buscar as configurações do usuário para o módulo", response.msg);
                }
                else {
                    objUsuarioParametroCompraConfiguracao = new UsuarioParametroCompra();
                    objUsuarioParametroCompraConfiguracao.CD_EMPRESA = response.CD_EMPRESA;
                    objUsuarioParametroCompraConfiguracao.CD_LOGIN = response.CD_LOGIN;
                    objUsuarioParametroCompraConfiguracao.DS_NOME = response.DS_NOME;
                    objUsuarioParametroCompraConfiguracao.CD_STATUS = response.CD_STATUS;
                    objUsuarioParametroCompraConfiguracao.NR_NIVEL_ACESSO = response.NR_NIVEL_ACESSO;
                    objUsuarioParametroCompraConfiguracao.LG_CONSULTA_PEDIDO = response.LG_CONSULTA_PEDIDO;
                    objUsuarioParametroCompraConfiguracao.LG_INCLUI_PEDIDO = response.LG_INCLUI_PEDIDO;
                    objUsuarioParametroCompraConfiguracao.LG_CONCLUI_PEDIDO = response.LG_CONCLUI_PEDIDO;
                    objUsuarioParametroCompraConfiguracao.LG_PERMITE_LIBERACAO_PEDIDO = response.LG_PERMITE_LIBERACAO_PEDIDO;
                    objUsuarioParametroCompraConfiguracao.LG_CANCELA_PEDIDO = response.LG_CANCELA_PEDIDO;
                    objUsuarioParametroCompraConfiguracao.LG_ENVIA_PEDIDO = response.LG_ENVIA_PEDIDO;
                    objUsuarioParametroCompraConfiguracao.LG_PERMITE_CRIAR_TRANSFERENCIA = response.LG_PERMITE_CRIAR_TRANSFERENCIA;
                    objUsuarioParametroCompraConfiguracao.LG_PERMITE_CRIAR_COTACAO = response.LG_PERMITE_CRIAR_COTACAO;
                    objUsuarioParametroCompraConfiguracao.LG_PERMITE_ENVIAR_COTACAO = response.LG_PERMITE_ENVIAR_COTACAO;
                    objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_VALOR_VENDA = response.LG_EXIBIR_GRAFICO_VALOR_VENDA;
                    objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_VALOR_COMPRA = response.LG_EXIBIR_GRAFICO_VALOR_COMPRA;
                    objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_QTDE_VENDA = response.LG_EXIBIR_GRAFICO_QTDE_VENDA;
                    objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_QTDE_COMPRA = response.LG_EXIBIR_GRAFICO_QTDE_COMPRA;
                    objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA = response.LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA;
                    objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA = response.LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA;
                    objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA = response.LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA;
                    objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA = response.LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA;
                    objUsuarioParametroCompraConfiguracao.LG_POSSUI_ACESSO_PEDIDO_COMPRA = response.LG_POSSUI_ACESSO_PEDIDO_COMPRA;
                    objUsuarioParametroCompraConfiguracao.LG_EMITE_ALERTA_PEDIDOS_PROPRIOS_NAO_ENVIADOS = response.LG_EMITE_ALERTA_PEDIDOS_PROPRIOS_NAO_ENVIADOS;
                    objUsuarioParametroCompraConfiguracao.LG_EMITE_ALERTA_TODOS_PEDIDOS_NAO_ENVIADOS = response.LG_EMITE_ALERTA_TODOS_PEDIDOS_NAO_ENVIADOS;

                    vChk_Usuario_Consulta_Pedido.option("value", objUsuarioParametroCompraConfiguracao.LG_CONSULTA_PEDIDO);
                    vChk_Usuario_Inclui_Pedido.option("value", objUsuarioParametroCompraConfiguracao.LG_INCLUI_PEDIDO);
                    vChk_Usuario_Conclui_Pedido.option("value", objUsuarioParametroCompraConfiguracao.LG_CONCLUI_PEDIDO);
                    vChk_Usuario_Permite_Liberacao_Pedido.option("value", objUsuarioParametroCompraConfiguracao.LG_PERMITE_LIBERACAO_PEDIDO);
                    vChk_Usuario_Cancela_Pedido.option("value", objUsuarioParametroCompraConfiguracao.LG_CANCELA_PEDIDO);
                    vChk_Usuario_Envia_Pedido.option("value", objUsuarioParametroCompraConfiguracao.LG_ENVIA_PEDIDO);
                    vChk_Usuario_Permite_Criar_Transferencia.option("value", objUsuarioParametroCompraConfiguracao.LG_PERMITE_CRIAR_TRANSFERENCIA);
                    vChk_Usuario_Permite_Criar_Cotacao.option("value", objUsuarioParametroCompraConfiguracao.LG_PERMITE_CRIAR_COTACAO);
                    vChk_Usuario_Permite_Enviar_Cotacao.option("value", objUsuarioParametroCompraConfiguracao.LG_PERMITE_ENVIAR_COTACAO);
                    vChk_Emite_Alerta_Pedidos_Proprios_Nao_Enviados.option("value", objUsuarioParametroCompraConfiguracao.LG_EMITE_ALERTA_PEDIDOS_PROPRIOS_NAO_ENVIADOS);
                    vChk_Emite_Alerta_Todos_Pedidos_Nao_Enviados.option("value", objUsuarioParametroCompraConfiguracao.LG_EMITE_ALERTA_TODOS_PEDIDOS_NAO_ENVIADOS);

                    ExibirEsconderPaineis('accParametrosUsuario', 'block');
                    if (objUsuarioParametroCompraConfiguracao.NR_NIVEL_ACESSO == 1) {
                        ExibirEsconderPaineis("mensagemUsuarioAdministrador", "block");
                        ExibirEsconderPaineis("parametrosCompras", "none");
                        ExibirEsconderPaineis("mensagemUsuarioSemAcessoPedidoCompra", "none");
                    }
                    else if (objUsuarioParametroCompraConfiguracao.LG_POSSUI_ACESSO_PEDIDO_COMPRA == 0) {
                        ExibirEsconderPaineis("mensagemUsuarioSemAcessoPedidoCompra", "block");
                        ExibirEsconderPaineis("mensagemUsuarioAdministrador", "none");
                        ExibirEsconderPaineis("parametrosCompras", "none");
                    }
                    else {
                        ExibirEsconderPaineis("parametrosCompras", "block");
                        ExibirEsconderPaineis("mensagemUsuarioSemAcessoPedidoCompra", "none");
                        ExibirEsconderPaineis("mensagemUsuarioAdministrador", "none");
                    }
                }
            },
            failure: function (response) {
                ExibeMensagem("error", "Ocorreu um erro ao buscar as configurações do usuário para o módulo", JSON.parse(response.responseText));
            }
        });
    }
    catch {
        ExibeMensagem("error", "Ocorreu um erro ao buscar as configurações do usuário para o módulo", JSON.parse(response.responseText));
    }
}

async function GetUsuarioCargoComprador(pCDLogin) {
    //BUSCA OS PARAMETROS DE COMPRA PARA O USUÁRIO
    await $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetUsuarioCargoComprador",
        data: { pCDLogin: pCDLogin },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do cargo de comprador", response.msg);
            }
            else {
                ExibirEsconderPaineis("accParametrosCargo", "block");
                if (response.length > 0) {
                    vNbx_Vl_Limite_Pedido_Compra.option({ value: response[0].VL_LIMITE, disabled: false });
                    ExibirEsconderPaineis("parametrosCargo", "block");
                    ExibirEsconderPaineis("mensagemUsuarioSemCargoComprador", "none");
                } else {
                    vNbx_Vl_Limite_Pedido_Compra.option({ value: null, disabled: true });
                    ExibirEsconderPaineis("mensagemUsuarioSemCargoComprador", "block");
                    ExibirEsconderPaineis("parametrosCargo", "none");
                }
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do cargo de comprador", JSON.parse(response.responseText));
        }
    });
}

function AlterarUsuarioParametroCompraConfiguracao() {
    if (vLoading == true) { return };

    var deferred = new $.Deferred;

    let parameters = [
        { id: "CD_EMPRESA", value: objUsuarioParametroCompraConfiguracao.CD_EMPRESA, isKey: true },
        { id: "CD_LOGIN", value: objUsuarioParametroCompraConfiguracao.CD_LOGIN, isKey: true },
        { id: "LG_CONSULTA_PEDIDO", value: objUsuarioParametroCompraConfiguracao.LG_CONSULTA_PEDIDO, isKey: false },
        { id: "LG_INCLUI_PEDIDO", value: objUsuarioParametroCompraConfiguracao.LG_INCLUI_PEDIDO, isKey: false },
        { id: "LG_CONCLUI_PEDIDO", value: objUsuarioParametroCompraConfiguracao.LG_CONCLUI_PEDIDO, isKey: false },
        { id: "LG_PERMITE_LIBERACAO_PEDIDO", value: objUsuarioParametroCompraConfiguracao.LG_PERMITE_LIBERACAO_PEDIDO, isKey: false },
        { id: "LG_CANCELA_PEDIDO", value: objUsuarioParametroCompraConfiguracao.LG_CANCELA_PEDIDO, isKey: false },
        { id: "LG_ENVIA_PEDIDO", value: objUsuarioParametroCompraConfiguracao.LG_ENVIA_PEDIDO, isKey: false },
        { id: "LG_PERMITE_CRIAR_TRANSFERENCIA", value: objUsuarioParametroCompraConfiguracao.LG_PERMITE_CRIAR_TRANSFERENCIA, isKey: false },
        { id: "LG_PERMITE_CRIAR_COTACAO", value: objUsuarioParametroCompraConfiguracao.LG_PERMITE_CRIAR_COTACAO, isKey: false },
        { id: "LG_PERMITE_ENVIAR_COTACAO", value: objUsuarioParametroCompraConfiguracao.LG_PERMITE_ENVIAR_COTACAO, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_VALOR_VENDA", value: objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_VALOR_VENDA, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_VALOR_COMPRA", value: objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_VALOR_COMPRA, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_QTDE_VENDA", value: objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_QTDE_VENDA, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_QTDE_COMPRA", value: objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_QTDE_COMPRA, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA", value: objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA", value: objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA", value: objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA, isKey: false },
        { id: "LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA", value: objUsuarioParametroCompraConfiguracao.LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA, isKey: false },
        { id: "LG_EMITE_ALERTA_PEDIDOS_PROPRIOS_NAO_ENVIADOS", value: objUsuarioParametroCompraConfiguracao.LG_EMITE_ALERTA_PEDIDOS_PROPRIOS_NAO_ENVIADOS, isKey: false },
        { id: "LG_EMITE_ALERTA_TODOS_PEDIDOS_NAO_ENVIADOS", value: objUsuarioParametroCompraConfiguracao.LG_EMITE_ALERTA_TODOS_PEDIDOS_NAO_ENVIADOS, isKey: false },
    ];

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/AlterarUsuarioParametroCompra",
        data: { dataUpdate: JSON.stringify(parameters) },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao salvar as configurações do usuário para o módulo", response.msg);
                deferred.reject();
            }
            else {
                ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                deferred.resolve();
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao salvar as configurações do usuário para o módulo", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function SalvaConfiguracaoSMTP() {
    OpenProcessPanel("Processando...");
    var deferred = new $.Deferred;

    let parameters = [
        { id: "CD_EMPRESA", value: null, isKey: true },
        { id: "DS_ENDERECO_EMAIL_ENVIO_WEB", value: getComponentValue(vTxt_Configuracao_SMTP_Email, "dxTextBox"), isKey: false },
        { id: "DS_SERVIDOR_SMTP_EMAIL_ENVIO_WEB", value: getComponentValue(vTxt_Configuracao_SMTP_Servidor, "dxTextBox"), isKey: false },
        { id: "DS_PORTA_SMTP_EMAIL_ENVIO_WEB", value: getComponentValue(vTxt_Configuracao_SMTP_Porta, "dxTextBox"), isKey: false },
        { id: "DS_SENHA_EMAIL_ENVIO_WEB", value: getComponentValue(vTxt_Configuracao_SMTP_Senha, "dxTextBox"), isKey: false },
        { id: "LG_USA_TLS_EMAIL_COMPRA", value: getComponentValue(vCkb_Configuracao_SMTP_Usa_TLS, "dxCheckBox"), isKey: false },
    ];

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/SalvaParametros",
        data: { parameters: JSON.stringify(parameters) },
        success: function (response) {
            CloseProcessPanel();
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao salvar as configurações", response.msg);
                deferred.reject();
            }
            else {
                FecharModal("ModalConfiguracaoSMTP");
                AbrirModal("ModalEnvioEmail");
                ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                deferred.resolve();
            }
        },
        failure: function (response) {
            CloseProcessPanel();
            ExibeMensagem("error", "Ocorreu um erro ao salvar as configurações", JSON.parse(response.responseText));
            deferred.reject();
        }
    });
}

function SalvaConfiguracaoCorpoEmail() {
    OpenProcessPanel("Processando...");
    var deferred = new $.Deferred;

    let parameters = [
        { id: "CD_EMPRESA", value: null, isKey: true },
        { id: "DS_ASSUNTO_EMAIL_PEDIDO_COMPRA", value: getComponentValue(vTxt_Configuracao_Assunto_Email, "dxTextBox"), isKey: false },
        { id: "DS_MENSAGEM_EMAIL_PEDIDO_COMPRA", value: getComponentValue(vTxt_Configuracao_Corpo_Email, "dxTextBox"), isKey: false }
    ];

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/SalvaParametros",
        data: { parameters: JSON.stringify(parameters) },
        success: function (response) {
            CloseProcessPanel();
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao salvar as configurações", response.msg);
                deferred.reject();
            }
            else {
                FecharModal("ModalConfiguracaoCorpoEmail");
                AbrirModal("ModalEnvioEmail");

                ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                deferred.resolve();
            }
        },
        failure: function (response) {
            CloseProcessPanel();
            ExibeMensagem("error", "Ocorreu um erro ao salvar as configurações", JSON.parse(response.responseText));
            deferred.reject();
        }
    });
}

function SalvaConfiguracaoCorpoWhatsApp() {
    OpenProcessPanel("Processando...");
    var deferred = new $.Deferred;

    let parameters = [
        { id: "CD_EMPRESA", value: null, isKey: true },
        { id: "DS_MENSAGEM_WHATSAPP_PEDIDO_COMPRA", value: getComponentValue(vTxt_Configuracao_Corpo_WhatsApp, "dxTextBox"), isKey: false }
    ];

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/SalvaParametros",
        data: { parameters: JSON.stringify(parameters) },
        success: function (response) {
            CloseProcessPanel();
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao salvar as configurações", response.msg);
                deferred.reject();
            }
            else {
                FecharModal("ModalConfiguracaoCorpoWhatsApp");
                AbrirModal("ModalEnvioWhatsApp");

                ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                deferred.resolve();
            }
        },
        failure: function (response) {
            CloseProcessPanel();
            ExibeMensagem("error", "Ocorreu um erro ao salvar as configurações", JSON.parse(response.responseText));
            deferred.reject();
        }
    });
}

function GetDadosComprador(pCDLogin) {
    var deferred = new $.Deferred;

    if (pCDLogin == null) {
        $("#FotoComprador").attr("src", "/img/fotos-usuarios/sem-foto-pesquisa.jpg");
        $("#NomeComprador").text("");
        deferred.resolve();
    }
    else {
        $.ajax({
            type: "POST",
            url: "/PedidoCompra/GetDadosComprador",
            data: { pCDLogin: pCDLogin },
            success: function (response) {
                if (response.result == "Erro") {
                    ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do comprador", response.msg);
                    deferred.reject(response.msg);
                }
                else {
                    vCDComprador = response.CD_LOGIN;
                    $("#FotoComprador").attr("src", response.DS_CAMINHO_FOTO);
                    $("#NomeComprador").text(response.DS_NOME);
                    deferred.resolve();
                }
            },
            failure: function (response) {
                ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do comprador", JSON.parse(response.responseText));
                deferred.reject();
            }
        });
    }

    return deferred.promise();
}

function ValidaGeraraoTransferenciasProdutosSelecionados() {
    if (objUsuarioParametroCompra.LG_PERMITE_CRIAR_TRANSFERENCIA == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        popupAcessoNegado.show();
        return;
    }

    var vSelecionadoNaoSugerido = false;
    var vSelecionadoSugerido = false;
    for (const produto of vGridItensPedido.getSelectedRowsData()) {
        if (Boolean(produto.LG_SUGESTAO_TRANSFERENCIA) == false) {
            vSelecionadoNaoSugerido = true;
        }
        else {
            vSelecionadoSugerido = true;
        }
    }

    if (vSelecionadoSugerido == true) {
        if (vSelecionadoNaoSugerido == true) {
            AbrirModal("ModalProdutoSemSugestaoTransferencia");
        }
        else {
            GerarTransferenciasProdutosSelecionados();
        }
    }
    else {
        ExibeMensagem("info", "Geração de transferência inválida", "Não foi selecionado nenhum produto com sugestão de transferência")
    }
}

async function GerarTransferenciasProdutosSelecionados() {
    OpenProcessPanel("Processando...");
    var vProdutosSelecionados = "";
    for (const produto of vGridItensPedido.getSelectedRowsData()) {
        if (Boolean(produto.LG_SUGESTAO_TRANSFERENCIA) == true) {
            vProdutosSelecionados = (vProdutosSelecionados.length > 0 ? vProdutosSelecionados + "§" : "") + produto.CD_PRODUTO;
        }
    }

    await $.ajax({
        type: "POST",
        url: "/PedidoCompra/GerarTransferenciasProdutos",
        data: {
            parameters: JSON.stringify([
                { id: "NR_PEDIDO", value: objPedido.numero },
                { id: "CD_TIPO_TRANSFERENCIA_PEDIDO_COMPRA", value: getComponentValue(vRdb_Tipo_Transferencia, "dxRadioGroup") },
                { id: "PRODUTOS_GERACAO_TRANSFERENCIA", value: vProdutosSelecionados },
                { id: "CD_COMPRADOR", value: vCDComprador },
            ])
        },
        success: function (response) {
            CloseProcessPanel();
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao gerar as transferências de mercadorias", response.msg);
                return;
            }
            else {
                transferenciasGeradas = [];

                //PREENCHE O ARRAY COM AS TRANSFERÊNCIAS GERADAS
                response.forEach(function (data) {
                    transferenciasGeradas.push({
                        CD_PRODUTO: data.CD_PRODUTO,
                        CD_ALMOXARIFADO_ORIGEM: parseInt(data.CD_ALMOXARIFADO_ORIGEM),
                        CD_ALMOXARIFADO_DESTINO: parseInt(data.CD_ALMOXARIFADO_DESTINO),
                        NR_LOTE: data.NR_LOTE,
                        QT_TRANSFERENCIA: parseFloat(data.QT_TRANSFERENCIA_LOTE),
                    });
                });

                OpenModalAcaoPosTransferencia("SELECIONADOS");
            }
        },
        failure: function (response) {
            CloseProcessPanel();
            ExibeMensagem("error", "Ocorreu um erro ao gerar as transferências de mercadorias", JSON.parse(response.responseText));
        }
    });

    await CarregaGridTransferenciaPedido();
}

function GerarTransferenciaProduto() {
    vGridTransferencia.saveEditData();
    vGridNecessidadeTransferencia.saveEditData();
}

function SalvaSugestaoTransferenciaCabecalho(pAlmoxarifadoOrigem, pAlmoxarifadoDestino) {
    var deferred = new $.Deferred;
    var vUrl, vData;

    if (getComponentValue(vRdb_Tipo_Transferencia, "dxRadioGroup") == "E") { //TRANSFERÊNCIA EXPRESSA
        vUrl = "/PedidoCompra/SalvaSugestaoTransferenciaExpressa";
        vData = {
            CD_TIPO_LANCAMENTO: 3,
            CD_TIPO_OPERACAO: "AS",
            CD_ALMOXARIFADO_ORIGEM: parseInt(pAlmoxarifadoOrigem),
            CD_ALMOXARIFADO_DESTINO: parseInt(pAlmoxarifadoDestino),
            DS_HISTORICO: "Transferência Expressa via Pedido de Compra",
            CD_SITUACAO_PROCESSO: 1,
            NR_PEDIDO_COMPRA: objPedido.numero
        };
    } else { //TRANSFERÊNCIA CONTROLADA
        vUrl = "/PedidoCompra/SalvaSugestaoTransferenciaControlada/";
        vData = {
            CD_ALMOXARIFADO_ORIGEM: parseInt(pAlmoxarifadoOrigem),
            CD_ALMOXARIFADO_DESTINO: parseInt(pAlmoxarifadoDestino),
            CD_LOGIN_REMETENTE: vCDComprador,
            CD_SITUACAO_TRANSFERENCIA: 1,
            DS_OBSERVACAO: "Transferência Controlada via Pedido de Compra",
            NR_PEDIDO_COMPRA: objPedido.numero
        };
    }

    $.ajax({
        type: "POST",
        url: vUrl,
        data: { data: JSON.stringify(vData) },
        success: function (response) {
            if (response.result == "Erro") {
                deferred.reject(response.msg);
            } else {
                deferred.resolve(response);
            }
        },
        failure: function (response) {
            deferred.reject(JSON.parse(response.responseText));
        }
    });

    return deferred.promise();
}

function SalvaSugestaoTransferenciaProduto(pProcesso, pProduto, pLote, pQuantidade) {
    var deferred = new $.Deferred;
    var vUrl, vData;

    if (getComponentValue(vRdb_Tipo_Transferencia, "dxRadioGroup") == "E") { //TRANSFERÊNCIA EXPRESSA
        vUrl = "/PedidoCompra/SalvaSugestaoTransferenciaExpressaProduto";
        vData = {
            pNRProcesso: pProcesso,
            pProdutos: JSON.stringify([{ CD_PRODUTO: pProduto, NR_LOTE: pLote, QT_INFORMADA_USUARIO: pQuantidade }])
        }
    } else { //TRANSFERÊNCIA CONTROLADA
        vUrl = "/PedidoCompra/SalvaSugestaoTransferenciaControladaProduto";
        vData = {
            pNRProcesso: pProcesso,
            pProdutos: JSON.stringify([{ CD_PRODUTO: pProduto, NR_LOTE: pLote, QT_PRODUTO: pQuantidade }])
        }
    }

    $.ajax({
        type: "POST",
        url: vUrl,
        data: vData,
        success: function (response) {
            if (response.result == "Erro") {
                deferred.reject(response.msg);
            } else {
                deferred.resolve(response);
            }
        },
        failure: function (response) {
            deferred.reject(JSON.parse(response.responseText));
        }
    });

    return deferred.promise();
}

function OpenModalAcaoPosTransferencia(pOrigemTransferencia) {
    if (pOrigemTransferencia == "INDIVIDUAL") {
        CarregaGridTransferenciaPedido();
        FecharModal("ModalSugestaoTransferencia");
    }

    vRdbAcaoPosTransferencia.option("value", "ABATER");
    var vModulo = getComponentValue(vRdb_Tipo_Transferencia, "dxRadioGroup") == "E" ? "Ajuste de Estoque" : "Transferência de Mercadorias";

    switch (transferenciasGeradas.length) {
        case 0:
            return;
        case 1:
            $("#MensagemTransferenciaCriada").text(`O processo de transferência foi criado e está Em Elaboração.\nSerá necessário a conclusão do processo no módulo de ${vModulo} para que a movimentação de estoque de transferência seja efetivada.`);
            $("#PerguntaTransferenciaCriada").text("Agora, o que você deseja fazer no Pedido de Compra com este item que será transferido?");
            AbrirModal("ModalAcaoPosTransferencia");
            break;
        default:
            $("#MensagemTransferenciaCriada").text(`Os processos de transferências foram criados e estão Em Elaboração.\nSerá necessário a conclusão dos processos no módulo de ${vModulo} para que as movimentações de estoque de transferência sejam efetivadas.`);
            $("#PerguntaTransferenciaCriada").text("Agora, o que você deseja fazer no Pedido de Compra com estes itens que serão transferidos?");
            AbrirModal("ModalAcaoPosTransferencia");
    }
}

function ExecutaAcaoPosTransferencia() {
    (async () => {
        OpenProcessPanel("Processando...");
        try {
            await CarregaGridTransferenciaPedido();
            var acao = getComponentValue(vRdbAcaoPosTransferencia, "dxRadioGroup");
            if (acao == "ABATER") {
                for (const transferencia of transferenciasGeradas) {
                    await vGridItensPedido.getDataSource().store().load().then(originalData => {
                        //PEGA AS ALTERAÇÕES FEITAS NO GRID
                        const changes = vGridItensPedido.option("editing.changes");
                        //GERA UM NOVO CONJUNTO DE DADOS APLICANDO AS ALTERAÇÕES NOS DADOS ORIGINAIS
                        itensPedido = DevExpress.data.applyChanges(originalData, changes, { keyExpr: vGridItensPedido.option("keyExpr") });

                        //FAZ UM LOOP NOS ITENS DO PEDIDO PARA ALTERAR A QUANTIDADE DO PRODUTO/ALMOXARIFADO CORRENTE
                        for (var indice in itensPedido) {
                            var produto = itensPedido[indice];

                            if (produto.CD_PRODUTO == transferencia.CD_PRODUTO) {
                                var solicitacaoCompra = produto["NR_SOLICITACAO_COMPRA_ALMOXARIFADO_" + transferencia.CD_ALMOXARIFADO_DESTINO];

                                if (solicitacaoCompra == null) {
                                    var qtPedida = parseFloat(produto["QT_PEDIDA_ALMOXARIFADO_" + transferencia.CD_ALMOXARIFADO_DESTINO]);

                                    if (qtPedida - transferencia.QT_TRANSFERENCIA >= 0) {
                                        qtPedida = qtPedida - transferencia.QT_TRANSFERENCIA;
                                    }
                                    else {
                                        qtPedida = 0;
                                    }

                                    //PEGA O ÍNDICE PRODUTO NO GRID DE ITENS
                                    var rowIndexProduto = vGridItensPedido.getRowIndexByKey(produto.CD_PRODUTO);

                                    //ATUALIZA A QUANTIDADE DO PRODUTO NO ALMOXARIFADO DE DESTINO
                                    vGridItensPedido.cellValue(rowIndexProduto, "QT_PEDIDA_ALMOXARIFADO_" + transferencia.CD_ALMOXARIFADO_DESTINO, qtPedida);
                                    SumarizaQuantidadeGrid(vGridItensPedido, rowIndexProduto);
                                }
                            }
                        }
                    });
                };

                await vGridItensPedido.saveEditData();
            }
            else if (acao == "EXCLUIR") {
                const getUniqArrBy = (props = [], arrInp = []) => {
                    return Object.values(arrInp.reduce((res, item) => {
                        const keyComb = props.reduce((res, prop) => `${res}${item[prop]}`, "")
                        return { ...res, [keyComb]: item }
                    }, []))
                }

                const distinctTransferencias = getUniqArrBy(["CD_PRODUTO"], transferenciasGeradas)

                for (const transferencia of distinctTransferencias) {
                    vGridItensPedido.deleteRow(vGridItensPedido.getRowIndexByKey(transferencia.CD_PRODUTO));
                };

                await vGridItensPedido.saveEditData();
            }
        }
        finally {
            CloseProcessPanel();
        }
        FecharModal("ModalAcaoPosTransferencia");
    })();
}

async function ClonarPedido() {
    if (objUsuarioParametroCompra.LG_INCLUI_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        popupAcessoNegado.show();
        return;
    }

    var acao = null;
    await new Promise(function (resolve, reject) {
        new modalMessage('ModalMensagem').showQuestionModal(
            "<h4>Deseja realmente clonar o pedido?</h4>",
            "Clonagem de Pedido de Compra",
            () => { resolve("OK"); },
            () => { resolve("ABORTAR"); });
    }).then(function (response) {
        acao = response;
    });

    if (acao == "ABORTAR") return;

    OpenProcessPanel("Processando...");

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/ClonarPedidoCompra",
        data: { pNRPedido: objPedido.numero },
        success: function (response) {
            (async () => {
                if (response.result == "Erro") {
                    CloseProcessPanel();
                    ExibeMensagem("error", "Ocorreu um erro ao clonar o pedido de compra", response.msg);
                }
                else {
                    objPedido.numero = response[0].NR_PEDIDO;
                    await CarregaPedidoCompra();
                    CloseProcessPanel();
                }
            })();
        },
        failure: function (response) {
            CloseProcessPanel();
            ExibeMensagem("error", "Ocorreu um erro ao clonar o pedido de compra", JSON.parse(response.responseText));
        }
    });
}

function ConfirmarSubstituicaoFornecedor() {
    OpenProcessPanel("Processando...");
    var deferred = new $.Deferred;

    var fornecedorAtual = vLkp_Fornecedores_Individual.option("value");
    var fornecedorSubstituicao = vLkp_Fornecedor_Substituicao.option("value");

    if (!fornecedorSubstituicao || fornecedorAtual == fornecedorSubstituicao) {
        FecharModal("ModalSubstituicaoFornecedor");
        CloseProcessPanel();
        deferred.resolve();
        return;
    }

    let dataUpdate = [];
    dataUpdate.push(
        { id: "CD_EMPRESA", value: null, isKey: true },
        { id: "NR_PEDIDO", value: objPedido.numero, isKey: true },
        { id: "CD_FORNECEDOR", value: fornecedorSubstituicao, isKey: false },
    );

    $.ajax({
        url: '/PedidoCompra/AlterarPedidoCompra',
        method: 'POST',
        data: { dataUpdate: JSON.stringify(dataUpdate) },
    }).done(async function (response) {
        objPedido.codigoFornecedor = fornecedorSubstituicao;
        vLkp_Fornecedores_Individual.option("value", fornecedorSubstituicao);
        await CarregaDadosFornecedor();
        FecharModal("ModalSubstituicaoFornecedor");
        ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
        deferred.resolve();
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao salvar a substituição do fornecedor", response);
        deferred.reject();
    }).always(function () { CloseProcessPanel(); });
}

async function GerarCotacaoProdutosSelecionados() {
    if (objUsuarioParametroCompra.LG_PERMITE_CRIAR_COTACAO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        popupAcessoNegado.show();
        return;
    }

    var produto = [];
    var selectedRows = vGridItensPedido.getSelectedRowsData();

    if (selectedRows.length == 0) {
        ExibeMensagem("info", "Geração de cotação inválida", "Não foi selecionado nenhum produto")
        return;
    }

    for (const row of selectedRows) {
        for (const almox of arrayAlmoxarifadosPedido) {
            if (row["QT_PEDIDA_ALMOXARIFADO_" + almox] > 0) {
                produto.push({
                    CD_EMPRESA: row.CD_EMPRESA,
                    CD_PRODUTO: row.CD_PRODUTO,
                    CD_ALMOXARIFADO: almox,
                    QT_COTADA: row["QT_PEDIDA_ALMOXARIFADO_" + almox],
                });
            }
        }
    }

    if (produto.length == 0) {
        ExibeMensagem("info", "Geração de cotação inválida", "Não foi selecionado nenhum produto com quantidade maior que zero")
        return;
    }

    OpenProcessPanel("Processando...");

    await $.ajax({
        type: "POST",
        url: "/PedidoCompra/GerarCotacaoProdutos",
        data: {
            pNRPedido: objPedido.numero,
            pListProdutos: JSON.stringify(produto),
        },
        success: function (response) {
            if (response.result == "Erro") {
                CloseProcessPanel();
                ExibeMensagem("error", "Ocorreu um erro ao gerar a cotação eletrônica", response.msg);
            }
            else {
                //REMOVE OS REGISTROS SELECIONADOS DO PEDIDO
                vGridItensPedido.cancelEditData();
                dataDelete = [];

                vGridItensPedido.getSelectedRowsData().forEach((row) => {
                    dataDelete.push({
                        CD_EMPRESA: row.CD_EMPRESA,
                        NR_PEDIDO: objPedido.numero,
                        CD_PRODUTO: row.CD_PRODUTO
                    });
                });

                $.ajax({
                    type: "POST",
                    url: "/PedidoCompra/SalvarPedidoCompraItem",
                    data: {
                        dataSave: null,
                        dataDelete: dataDelete.length == 0 ? null : JSON.stringify(dataDelete),
                    },
                    success: async function (response) {
                        if (response.result == "Erro") {
                            CloseProcessPanel();
                            ExibeMensagem("error", "Ocorreu um erro ao excluir do pedido os produtos selecionados", response.msg);
                        }
                        else {
                            await CarregaPedidoCompra();
                            new modalMessage("ModalMensagem", {
                                titleIconClass: "fa fa-gavel mr-2",
                                titleText: "Cotação Eletrônica",
                                messageIconClass: "fa fa-info-circle mr-2",
                                message: "<h4 class='mb-4 mt-0 ml-0'>O processo de cotação eletrônica foi criado e está Em Elaboração.\nSerá necessário a conclusão do processo no módulo de Cotação Eletrônica</h4>",
                                okButton: {
                                    index: 1,
                                    visible: true,
                                },
                            }).showModal();
                        }
                    },
                    failure: function (response) {
                        CloseProcessPanel();
                        ExibeMensagem("error", "Ocorreu um erro ao excluir do pedido os produtos selecionados", JSON.parse(response.responseText));
                    },
                });
            }
        },
        failure: function (response) {
            CloseProcessPanel();
            ExibeMensagem("error", "Ocorreu um erro ao gerar a cotação eletrônica", JSON.parse(response.responseText));
        }
    });

    await CarregaGridCotacaoCompraPedido();
}

async function ConcluirPedido() {
    if (objPedido.codigoSituacao == "1" &&
        objUsuarioParametroCompra.LG_CONCLUI_PEDIDO == false &&
        objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        popupAcessoNegado.show();
        return;
    }
    else if (objPedido.codigoSituacao == "2" &&
        objUsuarioParametroCompra.LG_PERMITE_LIBERACAO_PEDIDO == false &&
        objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        popupAcessoNegado.show();
        return;
    }

    var vDataPrevisao = getComponentValue(vDt_Previsao_Entrega, "dxDateBox");

    if (vGridItensPedido.totalCount() == 0) {
        //SELECIONA A ABA DE ITENS
        $("#anchorItem").click();
        ExibeMensagem("info", "Pedido sem produtos", "É necessário ao menos um produto para concluir o pedido");
        return;
    }
    else if (objPedido.valorTotal == 0) {
        //SELECIONA A ABA DE ITENS
        $("#anchorItem").click();
        ExibeMensagem("info", "Operação não realizada", "Não é permitido pedido com valor zerado");
        return;
    }
    else if (vDataPrevisao == null) {
        //SELECIONA A ABA DE DADOS GERAIS
        $("#anchorPedido").click();
        ExibeMensagem("info", "Campo de preenchimento obrigatório", "Preencha a data da previsão de entrega");
        return;
    }

    var acao = null;
    //VERIFICA SE O PEDIDO NÃO EXCEDEU O LIMITE PARAMETRIZADO
    if (vVlLimitePedidoCompra != null &&
        parseFloat(objPedido.valorTotal) > vVlLimitePedidoCompra &&
        objUsuarioParametroCompra.LG_PERMITE_LIBERACAO_PEDIDO == false &&
        objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        await new Promise(function (resolve, reject) {
            new modalMessage('ModalMensagem').showQuestionModal(
                `<h4>O valor do pedido (R$ ${formataNumero(objPedido.valorTotal, 2, 2)}) é maior que o valor limite parametrizado para seu usuário (R$ ${formataNumero(vVlLimitePedidoCompra, 2, 2)}) para confecção de pedidos de compra.<br/>Deseja enviar o pedido para Liberação?</h4>`,
                "Conclusão de Pedido de Compra",
                () => { resolve("OK"); },
                () => { resolve("ABORTAR"); });
        }).then(function (response) {
            acao = response;
        });
    } else {
        await new Promise(function (resolve, reject) {
            new modalMessage('ModalMensagem').showQuestionModal(
                "<h4>Deseja realmente concluir o pedido?</h4>",
                "Conclusão de Pedido de Compra",
                () => { resolve("OK"); },
                () => { resolve("ABORTAR"); });
        }).then(function (response) {
            acao = response;
        });
    }
    if (acao == "ABORTAR") return;

    OpenProcessPanel("Processando...");

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/ConcluirPedidoCompra",
        data: { pNRPedido: objPedido.numero },
        success: function (response) {
            (async () => {
                if (response.result == "Erro") {
                    CloseProcessPanel();
                    ExibeMensagem("error", "Ocorreu um erro ao concluir o pedido de compra", response.msg);
                }
                else {
                    await CarregaPedidoCompra();
                    CarregaGridConsultaPedidos();
                    CloseProcessPanel();
                    if (objPedido.codigoSituacao == 4) {
                        AbrirModal("ModalPedidoConcluido");
                    }
                }
            })();
        },
        failure: function (response) {
            CloseProcessPanel();
            ExibeMensagem("error", "Ocorreu um erro ao concluir o pedido de compra", JSON.parse(response.responseText));
        }
    });
}

async function ConcluirPedidosSelecionados(grid) {
    if (objUsuarioParametroCompra.LG_CONCLUI_PEDIDO == false &&
        objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        popupAcessoNegado.show();
        return;
    }

    var pedidos = [];

    if (grid.getSelectedRowKeys().length == 0) {
        ExibeMensagem("info", "Operação não realizada", "É necessário selecionar ao menos um pedido");
        return;
    }

    //VALIDA OS DADOS DOS PEDIDOS SELECIONADOS
    for (const row of grid.getSelectedRowsData()) {
        if (row.CD_SITUACAO != "1") {
            ExibeMensagem("info", "Operação não realizada", "Somente é permitido a conclusão para pedidos com situação \"Em Elaboração\"");
            return;
        }
        else if (row.DT_PREVISAO_ENTREGA == null) {
            ExibeMensagem("info", "Operação não realizada", `Pedido ${row.NR_PEDIDO} sem data de previsão de entrega.\nPreencha a data de previsão de entrega dos pedidos antes de concluir`);
            return;
        }
        else if (row.VL_TOTAL == 0) {
            ExibeMensagem("info", "Operação não realizada", `Pedido ${row.NR_PEDIDO} com valor zerado`);
            return;
        }
    }

    if (objUsuarioParametroCompra.LG_ENVIA_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        vCkb_Enviar_Email_Multiplos_Pedidos.option("value", false);
    } else {
        vCkb_Enviar_Email_Multiplos_Pedidos.option("value", true);
    }

    AbrirModal("ModalConfirmacaoConclusaoMultiplosPedidos");

    var acao = null;
    await new Promise(function (resolve, reject) {
        $("#btnConcluirCancelamentoMultiplosPedidos").prop("onclick", null).off("click");
        $('#btnConcluirCancelamentoMultiplosPedidos').click(function () {
            resolve("OK");
        });

        $("#btnAbortarCancelamentoMultiplosPedidos").prop("onclick", null).off("click");
        $('#btnAbortarCancelamentoMultiplosPedidos').click(function () {
            resolve("ABORTAR");
        });
    }).then(function (response) {
        acao = response;
    });

    if (acao == "ABORTAR") return;

    var enviarEmail = getComponentValue(vCkb_Enviar_Email_Multiplos_Pedidos, "dxCheckBox");

    OpenProcessPanel("Processando...");

    for (const row of grid.getSelectedRowsData()) {
        pedidos.push({
            CD_EMPRESA: row.CD_EMPRESA,
            NR_PEDIDO: row.NR_PEDIDO,
            CD_FILIAL: row.CD_FILIAL,
            CD_FORNECEDOR: row.CD_FORNECEDOR,
            CD_LOGIN: row.CD_LOGIN,
            VL_TOTAL_PAGAR: row.VL_TOTAL
        });
    }

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/ConcluirMultiplosPedidos",
        data: { pListPedidos: JSON.stringify(pedidos), pEnviarEmail: enviarEmail },
        success: async function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao concluir os pedidos selecionados", response.msg);
            }
            else {
                await CarregaPedidoCompra();
                CarregaGridConsultaPedidos();
                CarregaGridPedidosComplementares();

                if (response.qtPedidosAguardandoAprovacao == 0) {
                    ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                }
                else if (response.qtPedidosAguardandoAprovacao == 1) {
                    new modalMessage("ModalMensagem", {
                        titleText: "Pedido Aguardando Liberação (Bloqueado)",
                        messageIconClass: "fa fa-info-circle mr-2",
                        message: `<h4 class='mb-1'>O pedido ${response.dsPedidosAguardandoAprovacao} foi enviado para liberação</h4>
                                  <h5>O motivo do bloqueio pode ser visto no histórico do pedido</h5>`,
                        okButton: { index: 1, visible: true, },
                    }).showModal();
                }
                else if (response.qtPedidosAguardandoAprovacao > 1) {
                    new modalMessage("ModalMensagem", {
                        titleText: "Pedidos Aguardando Liberação (Bloqueados)",
                        messageIconClass: "fa fa-info-circle mr-2",
                        message: `<h4 class='mb-1'>Os pedidos ${response.dsPedidosAguardandoAprovacao} foram enviados para liberação</h4>
                                  <h5>O motivo do bloqueio pode ser visto no histórico dos pedidos</h5>`,
                        okButton: { index: 1, visible: true, },
                    }).showModal();
                }
            }
            CloseProcessPanel();
        },
        failure: function (response) {
            CloseProcessPanel();
            ExibeMensagem("error", "Ocorreu um erro ao concluir os pedidos selecionados", JSON.parse(response.responseText));
        }
    });

}

async function ValidaCancelamentoPedido() {
    if (objUsuarioParametroCompra.LG_CANCELA_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        popupAcessoNegado.show();
        return;
    }

    if (objPedido.codigoSituacao == "4") {
        if (objPedido.possuiItemRecebidoParcial || objPedido.possuiItemRecebidoTotal) {
            ExibeMensagem("info", "Cancelamento não permitido", "Não é permitido o cancelamento do pedido pois já possui itens recebidos");
            return;
        }

        var acao = null;
        await new Promise(function (resolve, reject) {
            new modalMessage('ModalMensagem').showQuestionModal(
                "<h4>Deseja realmente cancelar o pedido?</h4>",
                "Cancelamento de Pedido de Compra",
                () => { resolve("OK"); },
                () => { resolve("ABORTAR"); });
        }).then(function (response) {
            acao = response;
        });

        if (acao == "OK") AbrirModal("ModalRegistrarJustificativaCancelamento");
    }
    else {
        var acao = null;
        await new Promise(function (resolve, reject) {
            new modalMessage('ModalMensagem').showQuestionModal(
                `<h4>Deseja realmente ${objPedido.codigoSituacao == "2" ? "reprovar" : "cancelar"} o pedido?</h4>`,
                `${objPedido.codigoSituacao == "2" ? "Reprovação" : "Cancelamento"} de Pedido de Compra`,
                () => { resolve("OK"); },
                () => { resolve("ABORTAR"); });
        }).then(function (response) {
            acao = response;
        });

        if (acao == "OK") CancelarPedido();
    }
}

function CancelarPedido() {
    var vJUSTIFICATIVA = null;

    if (objPedido.codigoSituacao == "4") {
        vJUSTIFICATIVA = getComponentValue(vTxt_Justificativa_Cancelamento, "dxTextArea");

        if (vJUSTIFICATIVA.length == 0) {
            ExibeMensagem("info", "Campo de preenchimento obrigatório", "Preencha a justificativa de cancelamento/reprovação");
            return;
        }

        FecharModal("ModalRegistrarJustificativaCancelamento");
    }

    OpenProcessPanel("Processando...");

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/CancelarPedidoCompra",
        data: {
            pNRPedido: objPedido.numero, pJustificativaCancelamento: vJUSTIFICATIVA
        },
        success: function (response) {
            (async () => {
                if (response.result == "Erro") {
                    ExibeMensagem("error", "Ocorreu um erro ao cancelar o pedido de compra", response.msg);
                }
                else {
                    await CarregaPedidoCompra();
                    ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                    CarregaGridConsultaPedidos();
                }
                CloseProcessPanel();
            })();
        },
        failure: function (response) {
            CloseProcessPanel();
            ExibeMensagem("error", "Ocorreu um erro ao cancelar o pedido de compra", JSON.parse(response.responseText));
        }
    });
}

async function CancelarPedidosSelecionados(grid) {
    if (objUsuarioParametroCompra.LG_CANCELA_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        popupAcessoNegado.show();
        return;
    }

    var pedidos = [];
    var vJustificativaCancelamento = '';
    var exit = false;

    if (grid.getSelectedRowKeys().length == 0) {
        ExibeMensagem("info", "Operação não realizada", "É necessário selecionar ao menos um pedido");
        return;
    }

    //VALIDA OS DADOS PARA CANCELAMENTO
    for (const row of grid.getSelectedRowsData()) {
        if (!(row.CD_SITUACAO == "1" || row.CD_SITUACAO == "4" && row.LG_POSSUI_ITEM_RECEBIDO_PARCIAL == false && row.LG_POSSUI_ITEM_RECEBIDO_TOTAL == false)) {
            ExibeMensagem("info", "Operação não realizada", "Somente é permitido o cancelamento para pedidos com situação \"Em Elaboração\" ou \"Aprovado\" que não tenham sido recebidos");
            return;
        }
    }

    var acao = null;
    await new Promise(function (resolve, reject) {
        new modalMessage('ModalMensagem').showQuestionModal(
            "<h4>Deseja realmente cancelar os pedidos selecionados?</h4>",
            "Cancelamento de Pedido de Compra",
            () => { resolve("OK"); },
            () => { resolve("ABORTAR"); });
    }).then(function (response) {
        acao = response;
    });

    if (acao == "ABORTAR") return;

    for (const row of grid.getSelectedRowsData()) {
        //SOLICITA JUSTIFICATIVA PARA PEDIDO APROVADO
        if (row.CD_SITUACAO == "4" && vJustificativaCancelamento.length == 0) {
            AbrirModal("ModalRegistrarJustificativaCancelamentoDiversos");

            while (exit == false) {
                await new Promise(function (resolve, reject) {
                    $("#btnCancelarPedidosDiversos").prop("onclick", null).off("click");
                    $('#btnCancelarPedidosDiversos').click(function () {
                        resolve("PROSSEGUIR");
                    });
                    $("#btnAbortarCancelamentoPedidosDiversos").prop("onclick", null).off("click");
                    $('#btnAbortarCancelamentoPedidosDiversos').click(function () {
                        resolve("ABORTAR");
                    });
                }).then(function (response) {
                    if (response == "PROSSEGUIR") {
                        vJustificativaCancelamento = getComponentValue(vTxt_Justificativa_Cancelamento_Diversos, "dxTextArea");

                        if (vJustificativaCancelamento.length == 0) {
                            ExibeMensagem("info", "Campo de preenchimento obrigatório", "Preencha a justificativa de cancelamento");
                        }
                        else {
                            exit = true;
                            FecharModal("ModalRegistrarJustificativaCancelamentoDiversos");
                        }
                    }
                    else {
                        exit = true;
                    }
                });
            }

            if (vJustificativaCancelamento.length == 0) {
                return;
            }
        }

        pedidos.push({
            CD_EMPRESA: row.CD_EMPRESA,
            NR_PEDIDO: row.NR_PEDIDO,
            DS_OBS_CANCELAMENTO_PEDIDO_APROVADO: (row.CD_SITUACAO == "4" ? vJustificativaCancelamento : null)
        });
    }

    OpenProcessPanel("Processando...");

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/CancelarMultiplosPedidos",
        data: { pListPedidos: JSON.stringify(pedidos) },
        success: function (response) {
            (async () => {
                if (response.result == "Erro") {
                    ExibeMensagem("error", "Ocorreu um erro ao cancelar os pedidos selecionados", response.msg);
                }
                else {
                    await CarregaPedidoCompra();
                    ExibeMensagem("success", "Operação realizada", "Salvo com sucesso");
                    CarregaGridConsultaPedidos();
                    CarregaGridPedidosComplementares();
                }
                CloseProcessPanel();
            })();
        },
        failure: function (response) {
            CloseProcessPanel();
            ExibeMensagem("error", "Ocorreu um erro ao cancelar os pedidos selecionados", JSON.parse(response.responseText));
        }
    });

}

function SumarizaQuantidadeGrid(grid, rowIndex) {
    var qtPedidaTotal = 0;
    var qtAlmoxarifado = 0;
    var unidadeMedida = grid.cellValue(rowIndex, "CD_UNIDADE_MEDIDA_COMPRA");

    //FAZ UM LOOP PARA SOMAR AS COLUNAS DE QUANTIDADE DE CADA ALMOXARIFADO
    arrayAlmoxarifadosPedido.forEach((almoxarifado) => {
        qtAlmoxarifado = grid.cellValue(rowIndex, "QT_PEDIDA_ALMOXARIFADO_" + almoxarifado);
        if (qtAlmoxarifado != null) {
            qtPedidaTotal += qtAlmoxarifado
        }
    });

    //ATUALIZA AS COLUNAS TOTALIZADORAS DO PEDIDO
    grid.cellValue(rowIndex, "QT_PEDIDA_TOTAL", qtPedidaTotal);
    grid.cellValue(rowIndex, "DS_PEDIDA_TOTAL", formataNumero(qtPedidaTotal, 0, 5) + " " + unidadeMedida);
}

function MontaColunasDinamicas(almoxarifados) {
    columnsQtPedidaAlmoxarifado = [];

    almoxarifados.forEach(function (almox) {
        //MONTA A COLUNA PARA RECEBER A QUANTIDADE PEDIDA PARA O ALMOXARIFADO
        columnsQtPedidaAlmoxarifado.push({
            dataField: "QT_PEDIDA_ALMOXARIFADO_" + almox.toString(),
            caption: almox,
            dataType: "number",
            format: "###,###,###,##0.#####",
            allowEditing: true,
            allowSorting: true,
            allowHeaderFiltering: false,
            cssClass: "column-data-grid",
        });
    });

    //MONTA A COLUNA TOTALIZADORA DA QUANTIDADE PARA O PEDIDO
    columnsQtPedidaAlmoxarifado.push({
        dataField: "QT_PEDIDA_TOTAL",
        caption: "Total",
        dataType: "number",
        format: "###,###,###,##0.#####",
        allowEditing: false,
        allowSorting: true,
        alignment: "right",
        allowHeaderFiltering: false,
        visible: false,
        showInColumnChooser: false,
        cssClass: "column-data-grid",
        setCellValue: function (newData, value, currentRowData) {
            newData.QT_PEDIDA_TOTAL = value;

            var qtPedidaTotal = value;
            var vlUnitario = currentRowData.VL_UNITARIO_PRODUTO;

            newData.VL_TOTAL_PRODUTO = round(qtPedidaTotal * vlUnitario, 2);
        }
    });

    //MONTA A COLUNA TOTALIZADORA (TEXTO) DA QUANTIDADE PARA O PEDIDO
    columnsQtPedidaAlmoxarifado.push({
        dataField: "DS_PEDIDA_TOTAL",
        caption: "Total",
        allowEditing: false,
        allowSorting: true,
        alignment: "right",
        allowHeaderFiltering: false,
        cssClass: "column-data-grid",
    });
}

function ExibirTelaInicial() {
    //LIMPA OS DADOS DO PEDIDO
    objPedido.numero = null;
    vLkp_Fornecedores_Individual.option("value", null);
    vTag_Almoxarifados_Individual.option("value", null);
    vLkp_Filial_Individual.option("value", null);

    //LIMPA OS FILTROS
    vDbx_treeView_Familias_Filtro_Individual.option("value", null);
    vTag_Marcas_Filtro_Individual.option("value", null);
    vTag_Curva_Produtos_Filtro_Individual.option("value", null);
    vLkp_Fornecedores_Filtro_Individual.option("value", null);
    vCkb_Fornecedor_Padrao_Filtro_Individual.option("value", false);
    vCkb_Produtos_Ponto_Reposicao_Filtro_Individual.option("value", false);
    vCkb_Abater_Saldo_Receber_Filtro_Individual.option("value", false);

    ExibirEsconderMenuPedido("menuPrincipalSub");
    ExibirEsconderFiltros();
}

function trataErroHTTP(pMensagemOperacao, pResponse) {
    var vMsgErroHTTP = "Erro desconhecido";

    if (pResponse) {
        if (pResponse.responseJSON) {
            vMsgErroHTTP = pResponse.status + ": " + pResponse.responseJSON.detail;
        } else if (pResponse.responseText) {
            vMsgErroHTTP = pResponse.status + ": " + pResponse.responseText;
        } else {
            vMsgErroHTTP = pResponse.status + ": " + pResponse.statusText;
        }
    }

    ExibeMensagem("error", pMensagemOperacao, vMsgErroHTTP);
}

function ExibeMensagem(pTipo, pTitulo, pTexto) {

    var configuration = { title: pTitulo, text: pTexto, type: pTipo }

    if (pTipo == "error") {
        configuration.addclass = "stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
        configuration.hide = false;
    }
    else if (pTipo == "info") {
        configuration.addclass = "notification-warning stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
    }

    new PNotify(configuration)
}

function ValidaInclusaoNovoPedido() {
    if (objUsuarioParametroCompra.LG_INCLUI_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        popupAcessoNegado.show();
        return;
    }

    ExibirEsconderFiltros('filtroAlmoxarifadosPedidoIndividual');
}

function ExibeConsultaGeral() {
    if (objUsuarioParametroCompra.LG_CONSULTA_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        popupAcessoNegado.show();
        return;
    }

    //AJUSTA OS FILTROS
    vNbx_Dias_Filtro_Consulta_Geral.option("value", 30);
    vGridConsultaGeralPedidos.columnOption("DS_SITUACAO", "filterValue", null);
    vLkp_Produtos_Filtro_Consulta_Geral.option("value", null);

    //CARREGA A CONSULTA DE PEDIDOS LATERAL
    CarregaGridConsultaPedidos();
    ExibirEsconderFiltros();
    ExibirEsconderMenuPedido();
    expandirConsultaPedidosPanel();
}

function ExibeConsultaElaboracao() {
    if (objUsuarioParametroCompra.LG_CONSULTA_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        popupAcessoNegado.show();
        return;
    }

    //AJUSTA OS FILTROS
    vNbx_Dias_Filtro_Consulta_Geral.option("value", 30);
    vGridConsultaGeralPedidos.columnOption("DS_SITUACAO", "filterValue", "ELABORAÇÃO");
    vLkp_Produtos_Filtro_Consulta_Geral.option("value", null);

    //CARREGA A CONSULTA DE PEDIDOS LATERAL
    CarregaGridConsultaPedidos();
    ExibirEsconderFiltros();
    ExibirEsconderMenuPedido();
    expandirConsultaPedidosPanel();
}

function ExibeConsultaLiberacao() {
    if (objUsuarioParametroCompra.LG_CONSULTA_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        popupAcessoNegado.show();
        return;
    }

    //AJUSTA OS FILTROS
    vNbx_Dias_Filtro_Consulta_Geral.option("value", 30);
    vGridConsultaGeralPedidos.columnOption("DS_SITUACAO", "filterValue", "LIBERAÇÃO");
    vLkp_Produtos_Filtro_Consulta_Geral.option("value", null);

    //CARREGA A CONSULTA DE PEDIDOS LATERAL
    CarregaGridConsultaPedidos();
    ExibirEsconderFiltros();
    ExibirEsconderMenuPedido();
    expandirConsultaPedidosPanel();
}

function ExibirEsconderFiltros(el) {
    document.getElementById("filtroAlmoxarifadosPedidoIndividual").style.display = "none";
    document.getElementById("filtroAlmoxarifadosPedidoAutomatico").style.display = "none";
    document.getElementById("filtroAlmoxarifadosPedidoSolicitacao").style.display = "none";

    document.getElementById("filtroPedidoIndividual").style.display = "none";
    document.getElementById("filtroPedidoAutomatico").style.display = "none";
    document.getElementById("filtroPedidoSolicitacao").style.display = "none";
    document.getElementById("configuracoesGerais").style.display = "none";
    document.getElementById("configuracoesUsuario").style.display = "none";

    if (el != null) {
        document.getElementById(el).style.display = "block";
    }
}

function ExibirEsconderMenuPedido(el) {
    document.getElementById("pedidoCompra").style.display = "none";
    document.getElementById("menuPrincipalSub").style.display = "none";
    if (el == "pedidoCompra") {
        document.getElementById("cardCabecalho").style.display = "none";
    }
    else {
        document.getElementById("cardCabecalho").style.display = "block";
    }

    if (el != null) {
        document.getElementById(el).style.display = "block";
    }
}

function ExibirEsconderPaineis(el, paramDisplay) {
    var display;

    if (paramDisplay === 'block' || paramDisplay === 'none') {
        display = paramDisplay;
    } else {
        if (document.getElementById(el).style.display === "none") {
            display = 'block';
        } else {
            display = 'none';
        };
    };

    document.getElementById(el).style.display = display;
}

function masterDetailTemplate(_, masterDetailOptions) {
    var tabItems = [];
    tabItems.push({ title: " Vendas x Compras ", template: createHistoricoVendasComprasTabTemplateForm(masterDetailOptions) });
    tabItems.push({ title: " Vendas x Compras (Corporativo) ", template: createHistoricoVendasComprasCorporativoTabTemplateForm(masterDetailOptions) });
    if (segmentoEmpresa == "1") {
        tabItems.push({ title: " Radar de Preços ", template: createRadarPrecoTabTemplateForm(masterDetailOptions) });
    }
    tabItems.push({ title: " Detalhe por Almoxarifado ", template: createAlmoxarifadoTabTemplateForm(masterDetailOptions) });
    tabItems.push({ title: " Produtos Similares ", template: createSimilaresTabTemplateForm(masterDetailOptions) });
    tabItems.push({ title: " Histórico de Compras ", template: createHistoricoCompraTabTemplateForm(masterDetailOptions) });
    tabItems.push({ title: " Histórico de Recebimento ", template: createHistoricoRecebimentoTabTemplateForm(masterDetailOptions) });
    tabItems.push({ title: " Aplicação ", template: createAplicacaoTabTemplateForm(masterDetailOptions) });

    return $("<div id='tabPanelDetalheItens" + masterDetailOptions.key + "'>").addClass("bg-white").dxTabPanel({
        animationEnabled: true,
        showNavButtons: true,
        repaintChangesOnly: true,
        onSelectionChanged(e) {
            var itemIndex = e.component.option('selectedIndex');
            var itemTitle = e.addedItems[0].title;

            if (itemTitle == " Vendas x Compras ") {
                $("#chkVlVendaAlmoxarifado" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_VENDA);
                $("#chkVlCompraAlmoxarifado" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_COMPRA);
                $("#chkQtVendaAlmoxarifado" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_VENDA);
                $("#chkQtCompraAlmoxarifado" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_COMPRA);
                $("#chkLabelVlVendaAlmoxarifado" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA);
                $("#chkLabelVlCompraAlmoxarifado" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA);
                $("#chkLabelQtVendaAlmoxarifado" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA);
                $("#chkLabelQtCompraAlmoxarifado" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA);
            }
            else if (itemTitle == " Vendas x Compras (Corporativo) ") {
                $("#chkVlVendaCorporativo" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_VENDA);
                $("#chkVlCompraCorporativo" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_COMPRA);
                $("#chkQtVendaCorporativo" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_VENDA);
                $("#chkQtCompraCorporativo" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_COMPRA);
                $("#chkLabelVlVendaCorporativo" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA);
                $("#chkLabelVlCompraCorporativo" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA);
                $("#chkLabelQtVendaCorporativo" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA);
                $("#chkLabelQtCompraCorporativo" + masterDetailOptions.key).dxCheckBox("instance").option("value", objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA);
            }
            else if (itemTitle == " Radar de Preços ") {
                (async () => {
                    var radarCarregado = $("#tituloRadarPreco" + masterDetailOptions.key).attr("data-radar-carregado");

                    if (radarCarregado == "S") return;

                    OpenProcessPanel("Carregando...");

                    try {
                        $("#tituloRadarPreco" + masterDetailOptions.key).hide();
                        $("#corpoRadarPreco" + masterDetailOptions.key).hide();
                        $("#SemInformacaoRadarPreco" + masterDetailOptions.key).hide();
                        $("#AderirPesquisaEletronica" + masterDetailOptions.key).hide();

                        //VERIFICA SE O RADAR SERÁ DESABILITADO (EMPRESA DESCADASTRADA)
                        if (vEmpresaParticipaRadarPreco == false) {
                            vBtn_Aderir_Pesquisa_Eletronica = $("#btn_Aderir_Pesquisa_Eletronica" + masterDetailOptions.key).dxButton({
                                text: "Aderir Pesquisa Eletrônica",
                                width: '180px',
                                elementAttr: {
                                    class: "btn btn-xs btn-primary"
                                },
                                onClick: async function () {
                                    let exit = false;

                                    AbrirModal('ModalAderirPesquisaEletronicaRadarPreco');

                                    var acao = null;

                                    while (exit == false) {
                                        await new Promise(function (resolve, reject) {
                                            $("#btnOKPesquisaEletronica").prop("onclick", null).off("click");
                                            $('#btnOKPesquisaEletronica').click(function () {
                                                resolve("OK");
                                            });

                                            $("#btnAbortarPesquisaEletronica").prop("onclick", null).off("click");
                                            $('#btnAbortarPesquisaEletronica').click(function () {
                                                resolve("ABORTAR");
                                            });
                                        }).then(function (response) {
                                            acao = response;
                                        });

                                        if (acao == "ABORTAR") {
                                            exit = true;
                                        } else { //CLICADO EM OK
                                            if (vChk_Confirmacao_Leitura_Pesquisa_Eletronica.option("value") == false) {
                                                ExibeMensagem("info", "Confirmação de leitura obrigatória", "É necessário marcar o checkbox confirmando a leitura dos termos");
                                            } else { //LEITURA CONFIRMADA
                                                await $.ajax({
                                                    type: "POST",
                                                    url: "/PedidoCompra/HabilitaPesquisaEletronicaRadarPreco",
                                                    data: { pCDProduto: masterDetailOptions.key },
                                                    success: async function (response) {
                                                        if (response.result == "Erro") {
                                                            ExibeMensagem("error", "Ocorreu um erro ao habilitar a pesquisa eletrônica", response.msg);
                                                        }
                                                        else {
                                                            ExibeMensagem("success", "Operação realizada", "Pesquisa eletrônica habilitada com sucesso");
                                                        }
                                                    },
                                                    failure: function (response) {
                                                        ExibeMensagem("error", "Ocorreu um erro ao habilitar a pesquisa eletrônica", JSON.parse(response.responseText));
                                                    }
                                                });

                                                await GetParametros();
                                                var tabIndex = $("#tabPanelDetalheItens" + masterDetailOptions.key).dxTabPanel("instance").option('selectedIndex');
                                                var focusedRowIndex = vGridItensPedido.option('focusedRowIndex');
                                                await vGridItensPedido.refresh();
                                                vGridItensPedido.option('focusedRowIndex', focusedRowIndex);
                                                $("#tabPanelDetalheItens" + masterDetailOptions.key).dxTabPanel("instance").option('selectedIndex', tabIndex);

                                                exit = true;
                                                FecharModal("ModalAderirPesquisaEletronicaRadarPreco");
                                            }
                                        }
                                    }
                                }
                            }).dxButton("instance");

                            $("#AderirPesquisaEletronica" + masterDetailOptions.key).show();
                        }
                        //VERIFICA SE O PRODUTO POSSUI EAN PARA BUSCAR OS DADOS NO CATÁLOGO CONTRUHUB
                        else if (!masterDetailOptions.data.CD_EAN_PRODUTO) {
                            $("#mensagemRadarPreco" + masterDetailOptions.key).text("Não foi possível realizar a pesquisa no Radar de Preços");
                            $("#complementoMensagemRadarPreco" + masterDetailOptions.key).text("O produto não possui código de barras");
                            $("#SemInformacaoRadarPreco" + masterDetailOptions.key).show();
                        } else {
                            let options = null;

                            var param = {
                                CD_EMPRESA: vCDEmpresa,
                                CD_EAN: masterDetailOptions.data.CD_EAN_PRODUTO,
                                CD_LOGIN: objUsuarioParametroCompra.CD_LOGIN,
                            }

                            //CATÁLOGO DE PRODUTOS CONSTRUHUB
                            GetAzureDataSource(77, JSON.stringify(param)).then((result) => {
                                if (result.success) {

                                    if (result.data.length == 0) {
                                        $("#mensagemRadarPreco" + masterDetailOptions.key).text("Não encontramos informações suficientes para tabular a pesquisa");
                                        $("#complementoMensagemRadarPreco" + masterDetailOptions.key).text("São necessárias, no mínimo, dez empresas participantes que tenham o código de barras cadastrado para este produto");
                                        $("#SemInformacaoRadarPreco" + masterDetailOptions.key).show();
                                        return;
                                    }

                                    var catalogo = result.data[0];

                                    options = {
                                        series: [{
                                            name: 'Preço de Venda',
                                            data: [
                                                round(catalogo.VL_PRECO_VENDA_MAIOR, casasDecimaisVenda),
                                                round(catalogo.VL_PRECO_VENDA_MENOR, casasDecimaisVenda),
                                                round(catalogo.VL_PRECO_VENDA_MEDIO, casasDecimaisVenda),
                                                round(isNull(catalogo.VL_PRECO_VENDA_LOJA, 0), casasDecimaisVenda)
                                            ],
                                        }],
                                        chart: {
                                            height: 140,
                                            top: 0,
                                            type: 'bar',
                                            dropShadow: {
                                                enabled: true,
                                                color: '#000',
                                                top: 18,
                                                left: 7,
                                                blur: 7,
                                                opacity: 0.2
                                            },
                                            toolbar: {
                                                show: false,
                                                tools: {
                                                    download: false
                                                },
                                            },
                                            events: {
                                                rendered: function (chartContext, config) {
                                                    adjustDataLabelsOffsetX();
                                                }
                                            }
                                        },
                                        colors: [
                                            function ({ value, seriesIndex, dataPointIndex, w }) {
                                                if (dataPointIndex == 0) {
                                                    return "#223843";
                                                }
                                                else if (dataPointIndex == 1) {
                                                    return "#364A54";
                                                }
                                                else if (dataPointIndex == 2) {
                                                    return "#4A5C65";
                                                }
                                                else if (dataPointIndex == 3) {
                                                    var valorBase = w.config.series[0].data[2];

                                                    if (value < valorBase) {
                                                        return "#6A111B";
                                                    } else {
                                                        return "#125842";
                                                    }
                                                }
                                            }
                                        ],
                                        plotOptions: {
                                            bar: {
                                                horizontal: true,
                                                barHeight: '80%',
                                                dataLabels: {
                                                    position: 'top', // top, center, bottom
                                                },
                                            }
                                        },
                                        dataLabels: {
                                            enabled: true,
                                            style: {
                                                colors: ['#fff']
                                            },
                                            formatter: function (val, opt) {
                                                return formataNumero(val, 2, casasDecimaisVenda);
                                            },
                                            offsetX: -5,
                                            dropShadow: {
                                                enabled: true
                                            }
                                        },
                                        xaxis: {
                                            categories: ["Maior Preço", "Menor Preço", "Preço Médio", "Seu Preço"],
                                            position: 'bottom',
                                            offsetY: -6,
                                            axisBorder: {
                                                show: false
                                            },
                                            axisTicks: {
                                                show: false
                                            },
                                            labels: {
                                                show: false
                                            },
                                            crosshairs: {
                                                fill: {
                                                    type: 'gradient',
                                                    gradient: {
                                                        colorFrom: '#D8E3F0',
                                                        colorTo: '#BED1E6',
                                                        stops: [0, 100],
                                                        opacityFrom: 0.4,
                                                        opacityTo: 0.5,
                                                    }
                                                }
                                            },
                                            tooltip: {
                                                enabled: true,
                                            }
                                        },
                                        yaxis: {
                                            axisBorder: {
                                                show: true
                                            },
                                            axisTicks: {
                                                show: false,
                                            },
                                            labels: {
                                                show: true,
                                                formatter: function (val) {
                                                    return val;
                                                }
                                            }
                                        },
                                        title: {
                                            text: 'PREÇO DE VENDA',
                                            floating: true,
                                            offsetY: 0,
                                            align: 'center',
                                            style: {
                                                color: '#6c757d',
                                                fontSize: '11px',
                                                bold: "true"
                                            }
                                        },
                                        tooltip: {
                                            y: {
                                                formatter: function (val, series) {
                                                    return formataNumero(val, 2, casasDecimaisVenda);
                                                }
                                            }
                                        }
                                    };

                                    var chartPrecoVenda = new ApexCharts(document.querySelector("#chartPrecoVenda" + masterDetailOptions.key), options);
                                    chartPrecoVenda.render();
                                    chartPrecoVenda.update();

                                    options = {
                                        series: [{
                                            name: 'Preço de Custo Sem Impostos',
                                            data: [
                                                round(catalogo.VL_PRECO_CUSTO_SEM_IMPOSTOS_MAIOR, casasDecimaisCompra),
                                                round(catalogo.VL_PRECO_CUSTO_SEM_IMPOSTOS_MENOR, casasDecimaisCompra),
                                                round(catalogo.VL_PRECO_CUSTO_SEM_IMPOSTOS_MEDIO, casasDecimaisCompra),
                                                round(isNull(catalogo.VL_PRECO_CUSTO_SEM_IMPOSTOS_LOJA, 0), casasDecimaisCompra)
                                            ],
                                        }],
                                        chart: {
                                            height: 140,
                                            type: 'bar',
                                            dropShadow: {
                                                enabled: true,
                                                color: '#000',
                                                top: 18,
                                                left: 7,
                                                blur: 7,
                                                opacity: 0.2
                                            },
                                            toolbar: {
                                                show: false,
                                                tools: {
                                                    download: false
                                                },
                                            },
                                        },
                                        colors: [
                                            function ({ value, seriesIndex, dataPointIndex, w }) {
                                                if (dataPointIndex == 0) {
                                                    return "#223843";
                                                }
                                                else if (dataPointIndex == 1) {
                                                    return "#364A54";
                                                }
                                                else if (dataPointIndex == 2) {
                                                    return "#4A5C65";
                                                }
                                                else if (dataPointIndex == 3) {
                                                    var valorBase = w.config.series[0].data[2];

                                                    if (value > valorBase) {
                                                        return "#6A111B";
                                                    } else {
                                                        return "#125842";
                                                    }
                                                }
                                            }
                                        ],
                                        plotOptions: {
                                            bar: {
                                                horizontal: true,
                                                barHeight: '80%',
                                                dataLabels: {
                                                    position: 'top', // top, center, bottom
                                                },
                                            }
                                        },
                                        dataLabels: {
                                            enabled: true,
                                            style: {
                                                colors: ['#fff']
                                            },
                                            formatter: function (val, opt) {
                                                return formataNumero(val, 2, casasDecimaisCompra);
                                            },
                                            offsetX: -5,
                                            dropShadow: {
                                                enabled: true
                                            }
                                        },
                                        xaxis: {
                                            categories: ["Maior Custo", "Menor Custo", "Custo Médio", "Seu Custo"],
                                            position: 'bottom',
                                            offsetY: -6,
                                            axisBorder: {
                                                show: false
                                            },
                                            axisTicks: {
                                                show: false
                                            },
                                            labels: {
                                                show: false
                                            },
                                            crosshairs: {
                                                fill: {
                                                    type: 'gradient',
                                                    gradient: {
                                                        colorFrom: '#D8E3F0',
                                                        colorTo: '#BED1E6',
                                                        stops: [0, 100],
                                                        opacityFrom: 0.4,
                                                        opacityTo: 0.5,
                                                    }
                                                }
                                            },
                                            tooltip: {
                                                enabled: true,
                                            }
                                        },
                                        yaxis: {
                                            axisBorder: {
                                                show: true
                                            },
                                            axisTicks: {
                                                show: false,
                                            },
                                            labels: {
                                                show: true,
                                                formatter: function (val) {
                                                    return val;
                                                }
                                            }
                                        },
                                        title: {
                                            text: 'CUSTO SEM IMPOSTOS',
                                            floating: true,
                                            offsetY: 0,
                                            align: 'center',
                                            style: {
                                                color: '#6c757d',
                                                fontSize: '11px',
                                                bold: "true"
                                            }
                                        },
                                        tooltip: {
                                            y: {
                                                formatter: function (val) {
                                                    return formataNumero(val, 2, casasDecimaisCompra);
                                                }
                                            }
                                        }
                                    };

                                    var chartCustoSemImpostos = new ApexCharts(document.querySelector("#chartCustoSemImpostos" + masterDetailOptions.key), options);
                                    chartCustoSemImpostos.render();
                                    chartCustoSemImpostos.update();

                                    options = {
                                        series: [{
                                            name: 'Preço de Custo Com Impostos',
                                            data: [
                                                round(catalogo.VL_PRECO_CUSTO_COM_IMPOSTOS_MAIOR, casasDecimaisCompra),
                                                round(catalogo.VL_PRECO_CUSTO_COM_IMPOSTOS_MENOR, casasDecimaisCompra),
                                                round(catalogo.VL_PRECO_CUSTO_COM_IMPOSTOS_MEDIO, casasDecimaisCompra),
                                                round(isNull(catalogo.VL_PRECO_CUSTO_COM_IMPOSTOS_LOJA, 0), casasDecimaisCompra)
                                            ],
                                        }],
                                        chart: {
                                            height: 140,
                                            type: 'bar',
                                            dropShadow: {
                                                enabled: true,
                                                color: '#000',
                                                top: 18,
                                                left: 7,
                                                blur: 7,
                                                opacity: 0.2
                                            },
                                            toolbar: {
                                                show: false,
                                                tools: {
                                                    download: false
                                                },
                                            },
                                        },
                                        colors: [
                                            function ({ value, seriesIndex, dataPointIndex, w }) {
                                                if (dataPointIndex == 0) {
                                                    return "#223843";
                                                }
                                                else if (dataPointIndex == 1) {
                                                    return "#364A54";
                                                }
                                                else if (dataPointIndex == 2) {
                                                    return "#4A5C65";
                                                }
                                                else if (dataPointIndex == 3) {
                                                    var valorBase = w.config.series[0].data[2];

                                                    if (value > valorBase) {
                                                        return "#6A111B";
                                                    } else {
                                                        return "#125842";
                                                    }
                                                }
                                            }
                                        ],
                                        plotOptions: {
                                            bar: {
                                                horizontal: true,
                                                barHeight: '80%',
                                                dataLabels: {
                                                    position: 'top', // top, center, bottom
                                                },
                                            }
                                        },
                                        dataLabels: {
                                            enabled: true,
                                            style: {
                                                colors: ['#fff']
                                            },
                                            formatter: function (val, opt) {
                                                return formataNumero(val, 2, casasDecimaisCompra);
                                            },
                                            offsetX: -5,
                                            dropShadow: {
                                                enabled: true
                                            }
                                        },
                                        xaxis: {
                                            categories: ["Maior Custo", "Menor Custo", "Custo Médio", "Seu Custo"],
                                            position: 'bottom',
                                            offsetY: -6,
                                            axisBorder: {
                                                show: false
                                            },
                                            axisTicks: {
                                                show: false
                                            },
                                            labels: {
                                                show: false
                                            },
                                            crosshairs: {
                                                fill: {
                                                    type: 'gradient',
                                                    gradient: {
                                                        colorFrom: '#D8E3F0',
                                                        colorTo: '#BED1E6',
                                                        stops: [0, 100],
                                                        opacityFrom: 0.4,
                                                        opacityTo: 0.5,
                                                    }
                                                }
                                            },
                                            tooltip: {
                                                enabled: true,
                                            }
                                        },
                                        yaxis: {
                                            axisBorder: {
                                                show: true
                                            },
                                            axisTicks: {
                                                show: false,
                                            },
                                            labels: {
                                                show: true,
                                                formatter: function (val) {
                                                    return val;
                                                }
                                            }
                                        },
                                        title: {
                                            text: 'CUSTO COM IMPOSTOS',
                                            floating: true,
                                            offsetY: 0,
                                            align: 'center',
                                            style: {
                                                color: '#6c757d',
                                                fontSize: '11px',
                                                bold: "true"
                                            }
                                        },
                                        tooltip: {
                                            y: {
                                                formatter: function (val) {
                                                    return formataNumero(val, 2, casasDecimaisCompra);
                                                }
                                            }
                                        },
                                    };

                                    var chartCustoComImpostos = new ApexCharts(document.querySelector("#chartCustoComImpostos" + masterDetailOptions.key), options);
                                    chartCustoComImpostos.render();
                                    chartCustoComImpostos.update();

                                    options = {
                                        series: [{
                                            name: 'Margem de Lucro',
                                            data: [
                                                round(catalogo.PC_LUCRO_MAIOR, 4),
                                                round(catalogo.PC_LUCRO_MENOR, 4),
                                                round(catalogo.PC_LUCRO_MEDIO, 4),
                                                round(isNull(catalogo.PC_LUCRO_LOJA, 0), 4)
                                            ],
                                        }],
                                        chart: {
                                            height: 140,
                                            type: 'bar',
                                            dropShadow: {
                                                enabled: true,
                                                color: '#000',
                                                top: 18,
                                                left: 7,
                                                blur: 7,
                                                opacity: 0.2
                                            },
                                            toolbar: {
                                                show: false,
                                                tools: {
                                                    download: false
                                                },
                                            },
                                        },
                                        colors: [
                                            function ({ value, seriesIndex, dataPointIndex, w }) {
                                                if (dataPointIndex == 0) {
                                                    return "#223843";
                                                }
                                                else if (dataPointIndex == 1) {
                                                    return "#364A54";
                                                }
                                                else if (dataPointIndex == 2) {
                                                    return "#4A5C65";
                                                }
                                                else if (dataPointIndex == 3) {
                                                    var valorBase = w.config.series[0].data[2];

                                                    if (value < valorBase) {
                                                        return "#6A111B";
                                                    } else {
                                                        return "#125842";
                                                    }
                                                }
                                            }
                                        ],
                                        plotOptions: {
                                            bar: {
                                                horizontal: true,
                                                barHeight: '80%',
                                                dataLabels: {
                                                    position: 'top', // top, center, bottom
                                                },
                                            }
                                        },
                                        dataLabels: {
                                            enabled: true,
                                            style: {
                                                colors: ['#fff']
                                            },
                                            formatter: function (val, opt) {
                                                return formataNumero(val, 0, 4) + " %";
                                            },
                                            offsetX: -5,
                                            dropShadow: {
                                                enabled: true
                                            }
                                        },
                                        xaxis: {
                                            categories: ["Maior Lucro", "Menor Lucro", "Lucro Médio", "Seu Lucro"],
                                            position: 'bottom',
                                            offsetY: -6,
                                            axisBorder: {
                                                show: false
                                            },
                                            axisTicks: {
                                                show: false
                                            },
                                            labels: {
                                                show: false
                                            },
                                            crosshairs: {
                                                fill: {
                                                    type: 'gradient',
                                                    gradient: {
                                                        colorFrom: '#D8E3F0',
                                                        colorTo: '#BED1E6',
                                                        stops: [0, 100],
                                                        opacityFrom: 0.4,
                                                        opacityTo: 0.5,
                                                    }
                                                }
                                            },
                                            tooltip: {
                                                enabled: true,
                                            }
                                        },
                                        yaxis: {
                                            axisBorder: {
                                                show: true
                                            },
                                            axisTicks: {
                                                show: false,
                                            },
                                            labels: {
                                                show: true,
                                                formatter: function (val) {
                                                    return val;
                                                }
                                            }
                                        },
                                        title: {
                                            text: 'MARGEM DE LUCRO',
                                            floating: true,
                                            offsetY: 0,
                                            align: 'center',
                                            style: {
                                                color: '#6c757d',
                                                fontSize: '11px',
                                                bold: "true"
                                            }
                                        },
                                        tooltip: {
                                            y: {
                                                formatter: function (val, series) {
                                                    return formataNumero(val, 0, 4) + ' %';
                                                }
                                            }
                                        }
                                    };

                                    var chartMargemLucro = new ApexCharts(document.querySelector("#chartMargemLucro" + masterDetailOptions.key), options);
                                    chartMargemLucro.render();
                                    chartMargemLucro.update();
                                    //DISPARA O EVENTO RESIZE PARA EXIBIR OS GRÁFICOS DO APEX CHARTS. EXISTE UM PROBLEMA NO APEX CHARTS QUE NÃO 
                                    //EXIBE OS GRÁFICOS ATÉ QUE A TELA SEJA REDIMENSIONADA.
                                    window.dispatchEvent(new Event('resize'));

                                    $("#tituloRadarPreco" + masterDetailOptions.key).show();
                                    $("#corpoRadarPreco" + masterDetailOptions.key).show();
                                }
                                else {
                                    exibeMensagem("error", "Ocorreu um erro ao carregar o catálogo de produtos Construhub", `${result.name}: ${result.error}`);
                                }
                            });
                        }

                        $("#tituloRadarPreco" + masterDetailOptions.key).attr("data-radar-carregado", "S");
                    }
                    finally {
                        CloseProcessPanel();
                    }
                })();

            //    (async () => {
            //        var radarCarregado = $("#tituloRadarPreco" + masterDetailOptions.key).attr("data-radar-carregado");

            //        if (radarCarregado == "S") return;

            //        OpenProcessPanel("Carregando...");

            //        try {
            //            let options = null;
            //            let radarVenda = null;
            //            let radarCustoSemImposto = null;
            //            let radarCustoComImposto = null;
            //            let radarLucro = null;
            //            let vQtdeRegistros = 0;
            //            let vCasasDecVenda = null;
            //            let vCasasDecCompra = null;
            //            let vProdutoPossuiEAN = false;
            //            let vUsuarioAdministrador = false;

            //            //BUSCA OS VALORES DO RADAR DE PREÇOS
            //            await $.ajax({
            //                type: "POST",
            //                url: "/PedidoCompra/GetRadarPreco",
            //                data: { pCDProduto: masterDetailOptions.key },
            //                success: function (response) {
            //                    if (response.result == "Erro") {
            //                        ExibeMensagem("error", "Ocorreu um erro ao consultar os dados do radar de preços", response.msg);
            //                    }
            //                    else {
            //                        radarParametros = response[0][0];
            //                        console.log("radarParametros", radarParametros);
            //                        console.log("vCasasDecVenda", vCasasDecVenda);

            //                        vQtdeRegistros = radarParametros.QT_REGISTROS;
            //                        vCasasDecVenda = radarParametros.QT_CASAS_DECIMAS_VENDA;
            //                        vCasasDecCompra = radarParametros.QT_CASAS_DECIMAS_COMPRA;
            //                        vProdutoPossuiEAN = (radarParametros.CD_EAN_PRODUTO != null ? true : false);
            //                        vUsuarioAdministrador = radarParametros.LG_USUARIO_ADMINISTRADOR;

            //                        console.log("vCasasDecVenda 2", vCasasDecVenda);

            //                        radarVenda = response[1][0];
            //                        radarCustoSemImposto = response[2][0];
            //                        radarCustoComImposto = response[3][0];
            //                        radarLucro = response[4][0];
            //                    }
            //                },
            //                failure: function (response) {
            //                    ExibeMensagem("error", "Ocorreu um erro ao consultar os dados do radar de preços", JSON.parse(response.responseText));
            //                    vError = true;
            //                }
            //            });

            //            $("#tituloRadarPreco" + masterDetailOptions.key).hide();
            //            $("#corpoRadarPreco" + masterDetailOptions.key).hide();
            //            $("#SemInformacaoRadarPreco" + masterDetailOptions.key).hide();
            //            $("#AderirPesquisaEletronica" + masterDetailOptions.key).hide();

            //            vBtn_Aderir_Pesquisa_Eletronica = $("#btn_Aderir_Pesquisa_Eletronica" + masterDetailOptions.key).dxButton({
            //                text: "Aderir Pesquisa Eletrônica",
            //                width: '180px',
            //                elementAttr: {
            //                    class: "btn btn-xs btn-primary"
            //                },
            //                onClick: async function () {
            //                    let exit = false;

            //                    AbrirModal('ModalAderirPesquisaEletronicaRadarPreco');

            //                    var acao = null;

            //                    while (exit == false) {
            //                        await new Promise(function (resolve, reject) {
            //                            $("#btnOKPesquisaEletronica").prop("onclick", null).off("click");
            //                            $('#btnOKPesquisaEletronica').click(function () {
            //                                resolve("OK");
            //                            });

            //                            $("#btnAbortarPesquisaEletronica").prop("onclick", null).off("click");
            //                            $('#btnAbortarPesquisaEletronica').click(function () {
            //                                resolve("ABORTAR");
            //                            });
            //                        }).then(function (response) {
            //                            acao = response;
            //                        });

            //                        if (acao == "ABORTAR") {
            //                            exit = true;
            //                        } else { //CLICADO EM OK
            //                            if (vChk_Confirmacao_Leitura_Pesquisa_Eletronica.option("value") == false) {
            //                                ExibeMensagem("info", "Confirmação de leitura obrigatória", "É necessário marcar o checkbox confirmando a leitura dos termos");
            //                            } else { //LEITURA CONFIRMADA
            //                                await $.ajax({
            //                                    type: "POST",
            //                                    url: "/PedidoCompra/HabilitaPesquisaEletronicaRadarPreco",
            //                                    data: { pCDProduto: masterDetailOptions.key },
            //                                    success: async function (response) {
            //                                        if (response.result == "Erro") {
            //                                            ExibeMensagem("error", "Ocorreu um erro ao habilitar a pesquisa eletrônica", response.msg);
            //                                        }
            //                                        else {
            //                                            ExibeMensagem("success", "Operação realizada", "Pesquisa eletrônica habilitada com sucesso");
            //                                        }
            //                                    },
            //                                    failure: function (response) {
            //                                        ExibeMensagem("error", "Ocorreu um erro ao habilitar a pesquisa eletrônica", JSON.parse(response.responseText));
            //                                    }
            //                                });

            //                                await GetParametros();
            //                                var tabIndex = $("#tabPanelDetalheItens" + masterDetailOptions.key).dxTabPanel("instance").option('selectedIndex');
            //                                var focusedRowIndex = vGridItensPedido.option('focusedRowIndex');
            //                                await vGridItensPedido.refresh();
            //                                vGridItensPedido.option('focusedRowIndex', focusedRowIndex);
            //                                $("#tabPanelDetalheItens" + masterDetailOptions.key).dxTabPanel("instance").option('selectedIndex', tabIndex);

            //                                exit = true;
            //                                FecharModal("ModalAderirPesquisaEletronicaRadarPreco");
            //                            }
            //                        }
            //                    }
            //                }
            //            }).dxButton("instance");

            //            if (vEmpresaParticipaRadarPreco == true) {
            //                if (vProdutoPossuiEAN == true) {
            //                    if (vQtdeRegistros > 9) {
            //                        options = {
            //                            series: [{
            //                                name: 'Preço de Venda',
            //                                data: [
            //                                    round(radarVenda.PRECO_VENDA_MAXIMO, vCasasDecVenda),
            //                                    round(radarVenda.PRECO_VENDA_MINIMO, vCasasDecVenda),
            //                                    round(radarVenda.PRECO_VENDA_MEDIO, vCasasDecVenda),
            //                                    round(radarVenda.PRECO_LOJISTA, vCasasDecVenda)
            //                                ],
            //                            }],
            //                            chart: {
            //                                height: 140,
            //                                top: 0,
            //                                type: 'bar',
            //                                dropShadow: {
            //                                    enabled: true,
            //                                    color: '#000',
            //                                    top: 18,
            //                                    left: 7,
            //                                    blur: 7,
            //                                    opacity: 0.2
            //                                },
            //                                toolbar: {
            //                                    show: false,
            //                                    tools: {
            //                                        download: false
            //                                    },
            //                                },
            //                            },
            //                            colors: [
            //                                function ({ value, seriesIndex, dataPointIndex, w }) {
            //                                    if (dataPointIndex == 0) {
            //                                        return "#223843";
            //                                    }
            //                                    else if (dataPointIndex == 1) {
            //                                        return "#364A54";
            //                                    }
            //                                    else if (dataPointIndex == 2) {
            //                                        return "#4A5C65";
            //                                    }
            //                                    else if (dataPointIndex == 3) {
            //                                        var valorBase = w.config.series[0].data[2];

            //                                        if (value < valorBase) {
            //                                            return "#6A111B";
            //                                        } else {
            //                                            return "#125842";
            //                                        }
            //                                    }
            //                                }
            //                            ],
            //                            plotOptions: {
            //                                bar: {
            //                                    horizontal: true,
            //                                    barHeight: '80%',
            //                                    dataLabels: {
            //                                        position: 'top', // top, center, bottom
            //                                    },
            //                                }
            //                            },
            //                            dataLabels: {
            //                                enabled: true,
            //                                style: {
            //                                    colors: ['#fff']
            //                                },
            //                                formatter: function (val, opt) {
            //                                    return formataNumero(val, 2, vCasasDecVenda);
            //                                },
            //                                offsetX: -10,
            //                                dropShadow: {
            //                                    enabled: true
            //                                }
            //                            },
            //                            xaxis: {
            //                                categories: ["Maior Preço", "Menor Preço", "Preço Médio", "Seu Preço"],
            //                                position: 'bottom',
            //                                offsetY: -6,
            //                                axisBorder: {
            //                                    show: false
            //                                },
            //                                axisTicks: {
            //                                    show: false
            //                                },
            //                                labels: {
            //                                    show: false
            //                                },
            //                                crosshairs: {
            //                                    fill: {
            //                                        type: 'gradient',
            //                                        gradient: {
            //                                            colorFrom: '#D8E3F0',
            //                                            colorTo: '#BED1E6',
            //                                            stops: [0, 100],
            //                                            opacityFrom: 0.4,
            //                                            opacityTo: 0.5,
            //                                        }
            //                                    }
            //                                },
            //                                tooltip: {
            //                                    enabled: true,
            //                                }
            //                            },
            //                            yaxis: {
            //                                axisBorder: {
            //                                    show: true
            //                                },
            //                                axisTicks: {
            //                                    show: false,
            //                                },
            //                                labels: {
            //                                    show: true,
            //                                    formatter: function (val) {
            //                                        return val + "";
            //                                    }
            //                                }
            //                            },
            //                            title: {
            //                                text: 'PREÇO DE VENDA',
            //                                floating: true,
            //                                offsetY: 0,
            //                                align: 'center',
            //                                style: {
            //                                    color: '#6c757d',
            //                                    fontSize: '11px',
            //                                    bold: "true"
            //                                }
            //                            },
            //                            tooltip: {
            //                                y: {
            //                                    formatter: function (val, series) {
            //                                        return formataNumero(val, 2, vCasasDecVenda);
            //                                    }
            //                                }
            //                            }
            //                        };

            //                        var chartPrecoVenda = new ApexCharts(document.querySelector("#chartPrecoVenda" + masterDetailOptions.key), options);
            //                        chartPrecoVenda.render();
            //                        chartPrecoVenda.update();

            //                        options = {
            //                            series: [{
            //                                name: 'Preço de Custo Sem Impostos',
            //                                data: [
            //                                    round(radarCustoSemImposto.CUSTO_MAXIMO_SEM_IMPOSTOS, vCasasDecCompra),
            //                                    round(radarCustoSemImposto.CUSTO_MINIMO_SEM_IMPOSTOS, vCasasDecCompra),
            //                                    round(radarCustoSemImposto.CUSTO_MEDIO_SEM_IMPOSTOS, vCasasDecCompra),
            //                                    round(radarCustoSemImposto.CUSTO_LOJISTA_SEM_IMPOSTOS, vCasasDecCompra)
            //                                ],
            //                            }],
            //                            chart: {
            //                                height: 140,
            //                                type: 'bar',
            //                                dropShadow: {
            //                                    enabled: true,
            //                                    color: '#000',
            //                                    top: 18,
            //                                    left: 7,
            //                                    blur: 7,
            //                                    opacity: 0.2
            //                                },
            //                                toolbar: {
            //                                    show: false,
            //                                    tools: {
            //                                        download: false
            //                                    },
            //                                },
            //                            },
            //                            colors: [
            //                                function ({ value, seriesIndex, dataPointIndex, w }) {
            //                                    if (dataPointIndex == 0) {
            //                                        return "#223843";
            //                                    }
            //                                    else if (dataPointIndex == 1) {
            //                                        return "#364A54";
            //                                    }
            //                                    else if (dataPointIndex == 2) {
            //                                        return "#4A5C65";
            //                                    }
            //                                    else if (dataPointIndex == 3) {
            //                                        var valorBase = w.config.series[0].data[2];

            //                                        if (value > valorBase) {
            //                                            return "#6A111B";
            //                                        } else {
            //                                            return "#125842";
            //                                        }
            //                                    }
            //                                }
            //                            ],
            //                            plotOptions: {
            //                                bar: {
            //                                    horizontal: true,
            //                                    barHeight: '80%',
            //                                    dataLabels: {
            //                                        position: 'top', // top, center, bottom
            //                                    },
            //                                }
            //                            },
            //                            dataLabels: {
            //                                enabled: true,
            //                                style: {
            //                                    colors: ['#fff']
            //                                },
            //                                formatter: function (val, opt) {
            //                                    return formataNumero(val, 2, vCasasDecCompra);
            //                                },
            //                                offsetX: -10,
            //                                dropShadow: {
            //                                    enabled: true
            //                                }
            //                            },
            //                            xaxis: {
            //                                categories: ["Maior Custo", "Menor Custo", "Custo Médio", "Seu Custo"],
            //                                position: 'bottom',
            //                                offsetY: -6,
            //                                axisBorder: {
            //                                    show: false
            //                                },
            //                                axisTicks: {
            //                                    show: false
            //                                },
            //                                labels: {
            //                                    show: false
            //                                },
            //                                crosshairs: {
            //                                    fill: {
            //                                        type: 'gradient',
            //                                        gradient: {
            //                                            colorFrom: '#D8E3F0',
            //                                            colorTo: '#BED1E6',
            //                                            stops: [0, 100],
            //                                            opacityFrom: 0.4,
            //                                            opacityTo: 0.5,
            //                                        }
            //                                    }
            //                                },
            //                                tooltip: {
            //                                    enabled: true,
            //                                }
            //                            },
            //                            yaxis: {
            //                                axisBorder: {
            //                                    show: true
            //                                },
            //                                axisTicks: {
            //                                    show: false,
            //                                },
            //                                labels: {
            //                                    show: true,
            //                                    formatter: function (val) {
            //                                        return val + "";
            //                                    }
            //                                }
            //                            },
            //                            title: {
            //                                text: 'CUSTO SEM IMPOSTOS',
            //                                floating: true,
            //                                offsetY: 0,
            //                                align: 'center',
            //                                style: {
            //                                    color: '#6c757d',
            //                                    fontSize: '11px',
            //                                    bold: "true"
            //                                }
            //                            },
            //                            tooltip: {
            //                                y: {
            //                                    formatter: function (val, series) {
            //                                        return formataNumero(val, 2, vCasasDecCompra);
            //                                    }
            //                                }
            //                            }
            //                        };

            //                        var chartCustoSemImpostos = new ApexCharts(document.querySelector("#chartCustoSemImpostos" + masterDetailOptions.key), options);
            //                        chartCustoSemImpostos.render();
            //                        chartCustoSemImpostos.update();

            //                        options = {
            //                            series: [{
            //                                name: 'Preço de Custo Com Impostos',
            //                                data: [
            //                                    round(radarCustoComImposto.CUSTO_MAXIMO_COM_IMPOSTOS, vCasasDecCompra),
            //                                    round(radarCustoComImposto.CUSTO_MINIMO_COM_IMPOSTOS, vCasasDecCompra),
            //                                    round(radarCustoComImposto.CUSTO_MEDIO_COM_IMPOSTOS, vCasasDecCompra),
            //                                    round(radarCustoComImposto.CUSTO_LOJISTA_COM_IMPOSTOS, vCasasDecCompra)
            //                                ],
            //                            }],
            //                            chart: {
            //                                height: 140,
            //                                type: 'bar',
            //                                dropShadow: {
            //                                    enabled: true,
            //                                    color: '#000',
            //                                    top: 18,
            //                                    left: 7,
            //                                    blur: 7,
            //                                    opacity: 0.2
            //                                },
            //                                toolbar: {
            //                                    show: false,
            //                                    tools: {
            //                                        download: false
            //                                    },
            //                                },
            //                            },
            //                            colors: [
            //                                function ({ value, seriesIndex, dataPointIndex, w }) {
            //                                    if (dataPointIndex == 0) {
            //                                        return "#223843";
            //                                    }
            //                                    else if (dataPointIndex == 1) {
            //                                        return "#364A54";
            //                                    }
            //                                    else if (dataPointIndex == 2) {
            //                                        return "#4A5C65";
            //                                    }
            //                                    else if (dataPointIndex == 3) {
            //                                        var valorBase = w.config.series[0].data[2];

            //                                        if (value > valorBase) {
            //                                            return "#6A111B";
            //                                        } else {
            //                                            return "#125842";
            //                                        }
            //                                    }
            //                                }
            //                            ],
            //                            plotOptions: {
            //                                bar: {
            //                                    horizontal: true,
            //                                    barHeight: '80%',
            //                                    dataLabels: {
            //                                        position: 'top', // top, center, bottom
            //                                    },
            //                                }
            //                            },
            //                            dataLabels: {
            //                                enabled: true,
            //                                style: {
            //                                    colors: ['#fff']
            //                                },
            //                                formatter: function (val, opt) {
            //                                    return formataNumero(val, 2, vCasasDecCompra);
            //                                },
            //                                offsetX: -10,
            //                                dropShadow: {
            //                                    enabled: true
            //                                }
            //                            },
            //                            xaxis: {
            //                                categories: ["Maior Custo", "Menor Custo", "Custo Médio", "Seu Custo"],
            //                                position: 'bottom',
            //                                offsetY: -6,
            //                                axisBorder: {
            //                                    show: false
            //                                },
            //                                axisTicks: {
            //                                    show: false
            //                                },
            //                                labels: {
            //                                    show: false
            //                                },
            //                                crosshairs: {
            //                                    fill: {
            //                                        type: 'gradient',
            //                                        gradient: {
            //                                            colorFrom: '#D8E3F0',
            //                                            colorTo: '#BED1E6',
            //                                            stops: [0, 100],
            //                                            opacityFrom: 0.4,
            //                                            opacityTo: 0.5,
            //                                        }
            //                                    }
            //                                },
            //                                tooltip: {
            //                                    enabled: true,
            //                                }
            //                            },
            //                            yaxis: {
            //                                axisBorder: {
            //                                    show: true
            //                                },
            //                                axisTicks: {
            //                                    show: false,
            //                                },
            //                                labels: {
            //                                    show: true,
            //                                    formatter: function (val) {
            //                                        return val + "";
            //                                    }
            //                                }
            //                            },
            //                            title: {
            //                                text: 'CUSTO COM IMPOSTOS',
            //                                floating: true,
            //                                offsetY: 0,
            //                                align: 'center',
            //                                style: {
            //                                    color: '#6c757d',
            //                                    fontSize: '11px',
            //                                    bold: "true"
            //                                }
            //                            },
            //                            tooltip: {
            //                                y: {
            //                                    formatter: function (val, series) {
            //                                        return formataNumero(val, 2, vCasasDecCompra);
            //                                    }
            //                                }
            //                            }
            //                        };

            //                        var chartCustoComImpostos = new ApexCharts(document.querySelector("#chartCustoComImpostos" + masterDetailOptions.key), options);
            //                        chartCustoComImpostos.render();
            //                        chartCustoComImpostos.update();

            //                        options = {
            //                            series: [{
            //                                name: 'Margem de Lucro',
            //                                data: [
            //                                    round(radarLucro.LUCRO_MAXIMO, 4),
            //                                    round(radarLucro.LUCRO_MINIMO, 4),
            //                                    round(radarLucro.LUCRO_MEDIO, 4),
            //                                    round(radarLucro.LUCRO_LOJISTA, 4)
            //                                ],
            //                            }],
            //                            chart: {
            //                                height: 140,
            //                                type: 'bar',
            //                                dropShadow: {
            //                                    enabled: true,
            //                                    color: '#000',
            //                                    top: 18,
            //                                    left: 7,
            //                                    blur: 7,
            //                                    opacity: 0.2
            //                                },
            //                                toolbar: {
            //                                    show: false,
            //                                    tools: {
            //                                        download: false
            //                                    },
            //                                },
            //                            },
            //                            colors: [
            //                                function ({ value, seriesIndex, dataPointIndex, w }) {
            //                                    if (dataPointIndex == 0) {
            //                                        return "#223843";
            //                                    }
            //                                    else if (dataPointIndex == 1) {
            //                                        return "#364A54";
            //                                    }
            //                                    else if (dataPointIndex == 2) {
            //                                        return "#4A5C65";
            //                                    }
            //                                    else if (dataPointIndex == 3) {
            //                                        var valorBase = w.config.series[0].data[2];

            //                                        if (value < valorBase) {
            //                                            return "#6A111B";
            //                                        } else {
            //                                            return "#125842";
            //                                        }
            //                                    }
            //                                }
            //                            ],
            //                            plotOptions: {
            //                                bar: {
            //                                    horizontal: true,
            //                                    barHeight: '80%',
            //                                    dataLabels: {
            //                                        position: 'top', // top, center, bottom
            //                                    },
            //                                }
            //                            },
            //                            dataLabels: {
            //                                enabled: true,
            //                                style: {
            //                                    colors: ['#fff']
            //                                },
            //                                formatter: function (val, opt) {
            //                                    return formataNumero(val, 0, 4) + ' %';
            //                                },
            //                                offsetX: -10,
            //                                dropShadow: {
            //                                    enabled: true
            //                                }
            //                            },
            //                            xaxis: {
            //                                categories: ["Maior Lucro", "Menor Lucro", "Lucro Médio", "Seu Lucro"],
            //                                position: 'bottom',
            //                                offsetY: -6,
            //                                axisBorder: {
            //                                    show: false
            //                                },
            //                                axisTicks: {
            //                                    show: false
            //                                },
            //                                labels: {
            //                                    show: false
            //                                },
            //                                crosshairs: {
            //                                    fill: {
            //                                        type: 'gradient',
            //                                        gradient: {
            //                                            colorFrom: '#D8E3F0',
            //                                            colorTo: '#BED1E6',
            //                                            stops: [0, 100],
            //                                            opacityFrom: 0.4,
            //                                            opacityTo: 0.5,
            //                                        }
            //                                    }
            //                                },
            //                                tooltip: {
            //                                    enabled: true,
            //                                }
            //                            },
            //                            yaxis: {
            //                                axisBorder: {
            //                                    show: true
            //                                },
            //                                axisTicks: {
            //                                    show: false,
            //                                },
            //                                labels: {
            //                                    show: true,
            //                                    formatter: function (val) {
            //                                        return val + "";
            //                                    }
            //                                }
            //                            },
            //                            title: {
            //                                text: 'MARGEM DE LUCRO',
            //                                floating: true,
            //                                offsetY: 0,
            //                                align: 'center',
            //                                style: {
            //                                    color: '#6c757d',
            //                                    fontSize: '11px',
            //                                    bold: "true"
            //                                }
            //                            },
            //                            tooltip: {
            //                                y: {
            //                                    formatter: function (val, series) {
            //                                        return formataNumero(val, 0, 4) + ' %';
            //                                    }
            //                                }
            //                            }
            //                        };

            //                        var chartMargemLucro = new ApexCharts(document.querySelector("#chartMargemLucro" + masterDetailOptions.key), options);
            //                        chartMargemLucro.render();
            //                        chartMargemLucro.update();

            //                        $("#tituloRadarPreco" + masterDetailOptions.key).show();
            //                        $("#corpoRadarPreco" + masterDetailOptions.key).show();
            //                    }
            //                    else { //Quantidade de registros menor que 10
            //                        $("#mensagemRadarPreco" + masterDetailOptions.key).text("Não encontramos informações suficientes para tabular a pesquisa");
            //                        $("#complementoMensagemRadarPreco" + masterDetailOptions.key).text("São necessárias, no mínimo, dez empresas participantes que tenham o código de barras cadastrado para este produto");
            //                        $("#SemInformacaoRadarPreco" + masterDetailOptions.key).show();
            //                    }
            //                }
            //                else { //Produto sem EAN
            //                    $("#mensagemRadarPreco" + masterDetailOptions.key).text("Não foi possível realizar a pesquisa no Radar de Preços");
            //                    $("#complementoMensagemRadarPreco" + masterDetailOptions.key).text("O produto não possui código de barras cadastrado");
            //                    $("#SemInformacaoRadarPreco" + masterDetailOptions.key).show();
            //                }
            //            }
            //            else { //Empresa não participa do radar de preços
            //                $("#AderirPesquisaEletronica" + masterDetailOptions.key).show();
            //            }

            //            $("#tituloRadarPreco" + masterDetailOptions.key).attr("data-radar-carregado", "S");
            //        }
            //        finally {
            //            CloseProcessPanel();
            //        }
            //    })();
            }
        },
        items: tabItems,
        //    items: [
        //        {
        //            title: " Vendas x Compras ",
        //            template: createHistoricoVendasComprasTabTemplateForm(masterDetailOptions),
        //        },
        //        {
        //            title: " Vendas x Compras (Corporativo) ",
        //            template: createHistoricoVendasComprasCorporativoTabTemplateForm(masterDetailOptions),
        //        },
        //        {
        //            title: " Radar de Preços ",
        //            template: createRadarPrecoTabTemplateForm(masterDetailOptions),
        //        },
        //        {
        //            title: " Detalhe por Almoxarifado ",
        //            template: createAlmoxarifadoTabTemplateForm(masterDetailOptions),
        //        },
        //        {
        //            title: " Produtos Similares ",
        //            template: createSimilaresTabTemplateForm(masterDetailOptions),
        //        },
        //        {
        //            title: " Histórico de Compras ",
        //            template: createHistoricoCompraTabTemplateForm(masterDetailOptions),
        //        },
        //        {
        //            title: " Histórico de Recebimento ",
        //            template: createHistoricoRecebimentoTabTemplateForm(masterDetailOptions),
        //        },
        //        {
        //            title: " Aplicação ",
        //            template: createAplicacaoTabTemplateForm(masterDetailOptions),
        //        }
        //    ],
    });
}

function createHistoricoVendasComprasTabTemplateForm(masterDetailOptions) {
    return function () {
        let queryParam = {
            NR_MESES: 13,
            CD_PRODUTO: masterDetailOptions.data.CD_PRODUTO,
            CD_ALMOXARIFADOS: arrayAlmoxarifadosPedido.toString(),
        };

        dataSourceGrafico = GetAzureDataSource(50, JSON.stringify(queryParam), 120);

        return $('<div>').addClass('ml-3 mt-3 mb-3 mr-3 bg-white').dxForm({
            labelLocation: 'top',
            items: [{
                //label: { text: 'Detalhamento por Almoxarifado' },
                template: createHistoricoVendasComprasTabTemplate(masterDetailOptions),
            }],
        });
    }
}

function createHistoricoVendasComprasTabTemplate(masterDetailOptions) {
    return function () {
        var div = $('<div class="row ml-2 mr-2">');

        var grafico;
        var divSemInformacao = $('<div id="SemInformacaoAlmoxarifados' + masterDetailOptions.key + '" class="col-lg-12 text-center p-3 panel-light-gray" style="display: none;">')
            .append('<img src="/img/dados-nao-encontrados.png" class="mt-0 mb-0" style="height: 130px">')
            .append($('<h3 class="mt-1" style="color: #6c757d">')
                .text("Não encontrados dados de venda ou compra para este produto nos últimos 13 meses"))

        if (arrayAlmoxarifadosPedido.length > 1) {
            divSemInformacao
                .append($('<h5 class="mt-1" style="color: #6c757d">')
                    .text("Considerando apenas movimentações dos almoxarifados " + arrayAlmoxarifadosPedido.toString().replace(/,([^,]*)$/, ' e $1')));
        }
        else {
            divSemInformacao
                .append($('<h5 class="mt-1" style="color: #6c757d">')
                    .text("Considerando apenas movimentações do almoxarifado " + arrayAlmoxarifadosPedido));
        }

        var divGrafico = $('<div id="graficoAlmoxarifados' + masterDetailOptions.key + '" class="col-lg-10 p-3 panel-light-gray">').dxChart({
            dataSource: new DevExpress.data.DataSource({
                load: async function () {
                    let result = await dataSourceGrafico;

                    if (result.data.length == 0) {
                        $("#graficoAlmoxarifados" + masterDetailOptions.key).hide();
                        $("#divChecksAlmoxarifados" + masterDetailOptions.key).removeClass("d-flex").hide();
                        $("#SemInformacaoAlmoxarifados" + masterDetailOptions.key).show();
                    }
                    return result;
                },
            }),
            palette: 'Soft Pastel',
            //palette: 'Office',
            //height: 400,
            commonSeriesSettings: {
                argumentField: 'DS_ANO_MES',
                type: 'line',
                hoverMode: 'allArgumentPoints',
                selectionMode: 'allArgumentPoints',
                label: {
                    visible: true,
                    font: {
                        size: 11,
                    },
                    format: {
                        type: 'fixedPoint',
                        precision: 0,
                    },
                },
            },
            tooltip: {
                enabled: true,
                // format: {
                //     type: 'fixedPoint',
                //     precision: 0,
                // },
                shared: true,
                customizeTooltip(info) {
                    let dataSource = grafico.getDataSource().items();
                    let atual = dataSource.find(a => a.DS_ANO_MES == info.argument)

                    const content = ["<div><div class='tooltip-header'></div>",
                        "<div class='tooltip-body mt-2'><div class='series-name'>",

                        "<span class='top-series-name mt-2'></span>",
                        ": </div><div class='value-text'>",
                        "<span class='top-series-value'></span>",

                        "</div><div class='series-name'>",
                        "<span class='bottom-series-name'></span>",
                        ": </div><div class='value-text'>",
                        "<span class='bottom-series-value'></span>",

                        "</div><div class='series-name mt-2'>",
                        "<span class='top-series-name-qtde'></span>",
                        ": </div><div class='value-text'>",
                        "<span class='top-series-value-qtde'></span>",

                        "</div><div class='series-name'>",
                        "<span class='bottom-series-name-qtde'></span>",
                        ": </div><div class='value-text' style='word-wrap: false'>",
                        "<span class='bottom-series-value-qtde'></span>",

                        '</div></div></div>'].join('');

                    const htmlContent = $(content);

                    //var vlVenda = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0, }).format(info.points[2].valueText);
                    var vlVenda = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0, }).format(atual.VL_VENDA);
                    var vlCompra = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0, }).format(atual.VL_COMPRA);

                    var qtdeVenda = Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 3, }).format(atual.QT_VENDA) + ' ' + masterDetailOptions.data.CD_UNIDADE_MEDIDA_VENDA;
                    var qtdeCompra = Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 3, }).format(atual.QT_COMPRA) + ' ' + masterDetailOptions.data.CD_UNIDADE_MEDIDA_VENDA;

                    htmlContent.find('.tooltip-header').text(info.argumentText);

                    htmlContent.find('.top-series-name').text('Valor Vendas');
                    htmlContent.find('.top-series-value').text(vlVenda);
                    htmlContent.find('.bottom-series-name').text('Valor Compras');
                    htmlContent.find('.bottom-series-value').text(vlCompra);

                    htmlContent.find('.top-series-name-qtde').text('Qtde. Venda');
                    htmlContent.find('.top-series-value-qtde').css('text-wrap', 'nowrap').text(qtdeVenda);
                    htmlContent.find('.bottom-series-name-qtde').text('Qtde. Compra');
                    htmlContent.find('.bottom-series-value-qtde').css('text-wrap', 'nowrap').text(qtdeCompra);

                    return {
                        html: $('<div>').append(htmlContent).html(),
                    };
                },
            },
            argumentAxis: {
                // valueMarginsEnabled: false,
                // discreteAxisDivisionMode: 'crossLabels',
                label: {
                    overlappingBehavior: 'stagger',
                },
                grid: {
                    visible: true,
                },
            },
            valueAxis: [{
                name: 'valor',
                position: 'left',
                label: {
                    customizeText(info) {
                        return `R$ ${info.valueText}`;
                    },
                },
                //tickInterval: 300,
            }, {
                name: 'qtde',
                position: 'right',
                showZero: true,
                label: {
                    customizeText(info) {
                        return `${info.valueText + " " + masterDetailOptions.data.CD_UNIDADE_MEDIDA_VENDA}`;
                    },
                },
                //tickInterval: 20,
                valueMarginsEnabled: false,
            }],
            series: [
                { valueField: 'QT_VENDA', name: 'Qtde. Vendida', axis: 'qtde', type: 'bar', label: { visible: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA }, visible: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_VENDA, },
                { valueField: 'QT_COMPRA', name: 'Qtde. Comprada', axis: 'qtde', type: 'bar', label: { visible: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA }, visible: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_COMPRA, },
                { valueField: 'VL_VENDA', name: 'Valor Vendas', axis: 'valor', palette: 'Harmony Light', label: { visible: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA }, visible: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_VENDA, },
                { valueField: 'VL_COMPRA', name: 'Valor Compras', axis: 'valor', palette: 'Harmony Light', label: { visible: true }, visible: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA, },
            ],
            title: {
                text: masterDetailOptions.data.CD_PRODUTO + ' - ' + masterDetailOptions.data.DS_PRODUTO,
                font: {
                    size: 22,
                },
                subtitle: {
                    text: 'Valores e Quantidades de Vendas x Compras (considerando apenas movimentações dos almoxarifados ' + arrayAlmoxarifadosPedido.toString().replace(/,([^,]*)$/, ' e $1') + ')',
                },
            },
            legend: {
                verticalAlignment: 'bottom',
                horizontalAlignment: 'center',
            },
            export: {
                enabled: true,
            },
            onPointClick(e) {
                e.target.select();
            },
            onInitialized: (e) => {
                grafico = e.component;
                new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) e.component.refresh();
                    });
                }).observe(e.element[0]);
            },
            loadingIndicator: {
                text: "Carregando",
                show: true,
            },
        });

        var divChecks = $('<div id="divChecksAlmoxarifados' + masterDetailOptions.key + '" class="col-lg-2 d-flex flex-column justify-content-center p-3 panel-light-gray">');

        var rowPersonalizacoes = $('<div class="row ml-1 mr-1 mb-1"><h5><b>PERSONALIZAÇÕES</b></h5></div>')

        var rowMensagem = $('<div class="row ml-1 mr-1 mb-1 mt-1"><h6>* As personalizações ficam gravadas para seu usuário.</h6></div>')

        var rowBranco = $('<div class="row mb-2"><h5></h5></div>')

        var rowDivisaoDados = $('<div class="row ml-1 mr-1 mt-2 checks-header">Dados do Gráfico</div>')

        var rowDivisaoLabels = $('<div class="row ml-1 mr-1 mt-3 checks-header">Legendas do Gráfico</div>')

        var rowCheckVlVenda = $('<div id="chkVlVendaAlmoxarifado' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_VENDA,
            text: "Valor de Venda",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_VENDA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'VL_VENDA') {
                        a.visible = e.value;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        var rowCheckVlCompra = $('<div id="chkVlCompraAlmoxarifado' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_COMPRA,
            text: "Valor de Compra",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_COMPRA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'VL_COMPRA') {
                        a.visible = e.value;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        var rowCheckQtVenda = $('<div id="chkQtVendaAlmoxarifado' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_VENDA,
            text: "Qtde de Venda",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_VENDA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'QT_VENDA') {
                        a.visible = e.value;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        var rowCheckQtCompra = $('<div id="chkQtCompraAlmoxarifado' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_COMPRA,
            text: "Qtde de Compra",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_COMPRA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'QT_COMPRA') {
                        a.visible = e.value;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        var rowCheckLabelVlVenda = $('<div id="chkLabelVlVendaAlmoxarifado' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA,
            text: "Valor de Venda",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'VL_VENDA') {
                        a.label.visible = e.value;;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        var rowCheckLabelVlCompra = $('<div id="chkLabelVlCompraAlmoxarifado' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA,
            text: "Valor de Compra",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'VL_COMPRA') {
                        a.label.visible = e.value;;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        var rowCheckLabelQtVenda = $('<div id="chkLabelQtVendaAlmoxarifado' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA,
            text: "Qtde de Venda",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'QT_VENDA') {
                        a.label.visible = e.value;;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        var rowCheckLabelQtCompra = $('<div id="chkLabelQtCompraAlmoxarifado' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA,
            text: "Qtde de Compra",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'QT_COMPRA') {
                        a.label.visible = e.value;;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        divChecks.append(rowPersonalizacoes, rowDivisaoDados, rowCheckVlVenda, rowCheckVlCompra, rowCheckQtVenda, rowCheckQtCompra, rowDivisaoLabels, rowCheckLabelVlVenda, rowCheckLabelVlCompra, rowCheckLabelQtVenda, rowCheckLabelQtCompra, rowMensagem);

        div.append(divGrafico);
        div.append(divSemInformacao);
        div.append(divChecks);

        return div;
    }
}

function createHistoricoVendasComprasCorporativoTabTemplateForm(masterDetailOptions) {
    return function () {
        let queryParam = {
            NR_MESES: 13,
            CD_PRODUTO: masterDetailOptions.data.CD_PRODUTO
        };

        dataSourceGraficoCorporativo = GetAzureDataSource(50, JSON.stringify(queryParam), 120);

        return $('<div>').addClass('ml-3 mt-3 mb-3 mr-3 bg-white').dxForm({
            labelLocation: 'top',
            items: [{
                template: createHistoricoVendasComprasCorporativoTabTemplate(masterDetailOptions),
            }],
        });
    }
}

function createHistoricoVendasComprasCorporativoTabTemplate(masterDetailOptions) {
    return function () {
        var div = $('<div class="row ml-2 mr-2">');

        var grafico;
        var divSemInformacao = $('<div id="SemInformacaoCorporativo' + masterDetailOptions.key + '" class="col-lg-12 text-center p-3 panel-light-gray" style="display: none;">')
            .append('<img src="/img/dados-nao-encontrados.png" class="mt-0 mb-0" style="height: 130px">')
            .append($('<h3 class="mt-1" style="color: #6c757d">')
                .text("Não encontrados dados de venda ou compra para este produto nos últimos 13 meses"))
            .append($('<h5 class="mt-1" style="color: #6c757d">')
                .text("Considerando a movimentação de todos os almoxarifados"));

        var divGrafico = $('<div id="graficoCorporativo' + masterDetailOptions.key + '" class="col-lg-10 p-3 panel-light-gray">').dxChart({
            dataSource: new DevExpress.data.DataSource({
                load: async function () {
                    let result = await dataSourceGraficoCorporativo;

                    if (result.data.length == 0) {
                        $("#graficoCorporativo" + masterDetailOptions.key).hide();
                        $("#divChecksCorporativo" + masterDetailOptions.key).removeClass("d-flex").hide();
                        $("#SemInformacaoCorporativo" + masterDetailOptions.key).show();
                    }

                    return result;
                },
            }),
            //palette: 'Soft Pastel',
            palette: 'Office',
            //height: 400,
            commonSeriesSettings: {
                argumentField: 'DS_ANO_MES',
                type: 'line',
                hoverMode: 'allArgumentPoints',
                selectionMode: 'allArgumentPoints',
                label: {
                    visible: true,
                    font: {
                        size: 11,
                    },
                    format: {
                        type: 'fixedPoint',
                        precision: 0,
                    },
                },
            },
            tooltip: {
                enabled: true,
                // format: {
                //     type: 'fixedPoint',
                //     precision: 0,
                // },
                shared: true,
                customizeTooltip(info) {
                    let dataSource = grafico.getDataSource().items();
                    let atual = dataSource.find(a => a.DS_ANO_MES == info.argument)

                    const content = ["<div><div class='tooltip-header'></div>",
                        "<div class='tooltip-body mt-2'><div class='series-name'>",

                        "<span class='top-series-name mt-2'></span>",
                        ": </div><div class='value-text'>",
                        "<span class='top-series-value'></span>",

                        "</div><div class='series-name'>",
                        "<span class='bottom-series-name'></span>",
                        ": </div><div class='value-text'>",
                        "<span class='bottom-series-value'></span>",

                        "</div><div class='series-name mt-2'>",
                        "<span class='top-series-name-qtde'></span>",
                        ": </div><div class='value-text'>",
                        "<span class='top-series-value-qtde'></span>",

                        "</div><div class='series-name'>",
                        "<span class='bottom-series-name-qtde'></span>",
                        ": </div><div class='value-text' style='word-wrap: false'>",
                        "<span class='bottom-series-value-qtde'></span>",

                        '</div></div></div>'].join('');

                    const htmlContent = $(content);

                    //var vlVenda = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0, }).format(info.points[2].valueText);
                    var vlVenda = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0, }).format(atual.VL_VENDA);
                    var vlCompra = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0, }).format(atual.VL_COMPRA);

                    var qtdeVenda = Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 3, }).format(atual.QT_VENDA) + ' ' + masterDetailOptions.data.CD_UNIDADE_MEDIDA_VENDA;
                    var qtdeCompra = Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 3, }).format(atual.QT_COMPRA) + ' ' + masterDetailOptions.data.CD_UNIDADE_MEDIDA_VENDA;

                    htmlContent.find('.tooltip-header').text(info.argumentText);

                    htmlContent.find('.top-series-name').text('Valor Vendas');
                    htmlContent.find('.top-series-value').text(vlVenda);
                    htmlContent.find('.bottom-series-name').text('Valor Compras');
                    htmlContent.find('.bottom-series-value').text(vlCompra);

                    htmlContent.find('.top-series-name-qtde').text('Qtde. Venda');
                    htmlContent.find('.top-series-value-qtde').css('text-wrap', 'nowrap').text(qtdeVenda);
                    htmlContent.find('.bottom-series-name-qtde').text('Qtde. Compra');
                    htmlContent.find('.bottom-series-value-qtde').css('text-wrap', 'nowrap').text(qtdeCompra);

                    return {
                        html: $('<div>').append(htmlContent).html(),
                    };
                },
            },
            argumentAxis: {
                // valueMarginsEnabled: false,
                // discreteAxisDivisionMode: 'crossLabels',
                label: {
                    overlappingBehavior: 'stagger',
                },
                grid: {
                    visible: true,
                },
            },
            valueAxis: [{
                name: 'valor',
                position: 'left',
                label: {
                    customizeText(info) {
                        return `R$ ${info.valueText}`;
                    },
                },
                //tickInterval: 300,
            }, {
                name: 'qtde',
                position: 'right',
                showZero: true,
                label: {
                    customizeText(info) {
                        return `${info.valueText + " " + masterDetailOptions.data.CD_UNIDADE_MEDIDA_VENDA}`;
                    },
                },
                //tickInterval: 20,
                valueMarginsEnabled: false,
            }],
            series: [
                { valueField: 'QT_VENDA', name: 'Qtde. Vendida', axis: 'qtde', type: 'bar', label: { visible: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA }, visible: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_VENDA, },
                { valueField: 'QT_COMPRA', name: 'Qtde. Comprada', axis: 'qtde', type: 'bar', label: { visible: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA }, visible: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_COMPRA, },
                { valueField: 'VL_VENDA', name: 'Valor Vendas', axis: 'valor', palette: 'Harmony Light', label: { visible: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA }, visible: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_VENDA, },
                { valueField: 'VL_COMPRA', name: 'Valor Compras', axis: 'valor', palette: 'Harmony Light', label: { visible: true }, visible: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA, },
            ],
            title: {
                text: masterDetailOptions.data.CD_PRODUTO + ' - ' + masterDetailOptions.data.DS_PRODUTO,
                font: {
                    size: 22,
                },
                subtitle: {
                    text: 'Valores e Quantidades de Vendas x Compras (considerando a movimentação de todos os almoxarifados)',
                },
            },
            legend: {
                verticalAlignment: 'bottom',
                horizontalAlignment: 'center',
            },
            export: {
                enabled: true,
            },
            onPointClick(e) {
                e.target.select();
            },
            onInitialized: (e) => {
                grafico = e.component;
                new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) e.component.refresh();
                    });
                }).observe(e.element[0]);
            },
            loadingIndicator: {
                text: "Carregando",
                show: true,
            },
        });

        var divChecks = $('<div id="divChecksCorporativo' + masterDetailOptions.key + '" class="col-lg-2 d-flex flex-column justify-content-center p-3 panel-light-gray">');

        var rowPersonalizacoes = $('<div class="row ml-1 mr-1 mb-1"><h5><b>PERSONALIZAÇÕES</b></h5></div>')

        var rowMensagem = $('<div class="row ml-1 mr-1 mb-1 mt-1"><h6>* As personalizações ficam gravadas para seu usuário.</h6></div>')

        var rowBranco = $('<div class="row mb-2"><h5></h5></div>')

        var rowDivisaoDados = $('<div class="row ml-1 mr-1 mt-2 checks-header">Dados do Gráfico</div>')

        var rowDivisaoLabels = $('<div class="row ml-1 mr-1 mt-3 checks-header">Legendas do Gráfico</div>')

        var rowCheckVlVenda = $('<div id="chkVlVendaCorporativo' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_VENDA,
            text: "Valor de Venda",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_VENDA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'VL_VENDA') {
                        a.visible = e.value;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        var rowCheckVlCompra = $('<div id="chkVlCompraCorporativo' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_COMPRA,
            text: "Valor de Compra",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_VALOR_COMPRA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'VL_COMPRA') {
                        a.visible = e.value;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        var rowCheckQtVenda = $('<div id="chkQtVendaCorporativo' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_VENDA,
            text: "Qtde de Venda",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_VENDA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'QT_VENDA') {
                        a.visible = e.value;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        var rowCheckQtCompra = $('<div id="chkQtCompraCorporativo' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_COMPRA,
            text: "Qtde de Compra",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_QTDE_COMPRA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'QT_COMPRA') {
                        a.visible = e.value;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        var rowCheckLabelVlVenda = $('<div id="chkLabelVlVendaCorporativo' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA,
            text: "Valor de Venda",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_VENDA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'VL_VENDA') {
                        a.label.visible = e.value;;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        var rowCheckLabelVlCompra = $('<div id="chkLabelVlCompraCorporativo' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA,
            text: "Valor de Compra",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_VALOR_COMPRA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'VL_COMPRA') {
                        a.label.visible = e.value;;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        var rowCheckLabelQtVenda = $('<div id="chkLabelQtVendaCorporativo' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA,
            text: "Qtde de Venda",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_VENDA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'QT_VENDA') {
                        a.label.visible = e.value;;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        var rowCheckLabelQtCompra = $('<div id="chkLabelQtCompraCorporativo' + masterDetailOptions.key + '" class="row ml-1 mr-1">').dxCheckBox({
            value: objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA,
            text: "Qtde de Compra",
            onValueChanged: function (e) {
                objUsuarioParametroCompra.LG_EXIBIR_GRAFICO_LABEL_QTDE_COMPRA = e.value;
                AlterarUsuarioParametroCompra();

                let arraySeries = grafico.option('series');

                arraySeries = arraySeries.map(a => {
                    if (a.valueField == 'QT_COMPRA') {
                        a.label.visible = e.value;;
                    }

                    return a;
                })

                grafico.option('series', arraySeries);
            },
        });

        divChecks.append(rowPersonalizacoes, rowDivisaoDados, rowCheckVlVenda, rowCheckVlCompra, rowCheckQtVenda, rowCheckQtCompra, rowDivisaoLabels, rowCheckLabelVlVenda, rowCheckLabelVlCompra, rowCheckLabelQtVenda, rowCheckLabelQtCompra, rowMensagem);

        div.append(divGrafico);
        div.append(divSemInformacao);
        div.append(divChecks);

        return div;
    }
}

function createRadarPrecoTabTemplateForm(masterDetailOptions) {
    return function () {
        return $("<div>").addClass("ml-3 mt-3 mb-3 mr-3 bg-white").dxForm({
            labelLocation: "top",
            items: [{
                template: createRadarPrecoTabTemplate(masterDetailOptions),
            }],
        });
    }
}

function createRadarPrecoTabTemplate(masterDetailOptions) {
    return function () {
        var div = $(`<div id="tituloRadarPreco${masterDetailOptions.key}" data-radar-carregado="N" class="col-lg-12 pt-0 pb-0 alert-default" style="display: none">
                        <div class="row mb-0 mt-0">
                            <div class="col-md-1 mt-0 pt-0 text-right">
                            </div>
                            <div class="col-lg-10 pt-0 pb-0 text-center">
                                <h6 class="mt-1 mb-0"><i class="fa fa-feed mr-2"></i><b>RADAR DE PREÇOS</b></h6>
                                <h6 class="mt-0 mb-1">Seus custos e preço de venda comparados ao mercado através de uma pesquisa diária automática</h6>
                            </div>
                        </div>
                    </div>

                    <div id="corpoRadarPreco${masterDetailOptions.key}" class="col-md-12 mb-0 mt-2 pt-0 pb-0" style="display: none">
                        <div class="row mb-0 mt-0 pb-0">
                            <div class="col-md-12 mb-0 mt-0 pt-0 pb-0">
                                <div class="row mt-0 pt-0">
                                    <div class="col-md-3 mt-0 pt-0 pb-0">
                                        <div id="chartPrecoVenda${masterDetailOptions.key}" class="mb-0 mt-0 pt-0"></div>
                                    </div>
                                    <div class="col-md-3 mt-0 pt-0 pb-0">
                                        <div id="chartCustoSemImpostos${masterDetailOptions.key}" class="mb-0 mt-0 pt-0"></div>
                                    </div>
                                    <div class="col-md-3 mt-0 pt-0 pb-0">
                                        <div id="chartCustoComImpostos${masterDetailOptions.key}" class="mb-0 mt-0 pt-0"></div>
                                    </div>
                                    <div class="col-md-3 mt-0 pt-0 pb-0">
                                        <div id="chartMargemLucro${masterDetailOptions.key}" class="mb-0 mt-0 pt-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="SemInformacaoRadarPreco${masterDetailOptions.key}" class="col-lg-12 text-center p-3 panel-light-gray" style="display: none;">
                        <img src="/img/dados-nao-encontrados.png" class="mt-0 mb-0" style="height: 130px">
                        <h3 id="mensagemRadarPreco${masterDetailOptions.key}" class="mt-1" style="color: #6c757d"></h3>
                        <h5 id="complementoMensagemRadarPreco${masterDetailOptions.key}" class="mt-1" style="color: #6c757d"></h5>
                    </div>

                    <div id="AderirPesquisaEletronica${masterDetailOptions.key}" class="col-lg-12 text-center p-3 panel-light-gray" style = "display: none;" >
                        <img src="/img/dados-nao-encontrados.png" class="mt-0 mb-0" style="height: 130px">
                        <h3 class="mt-1" style="color: #6c757d">Não foi possível realizar a pesquisa no Radar de Preços</h3>
                        <h5 class="mt-1" style="color: #6c757d">Sua empresa ainda não aderiu a pesquisa eletrônica${objUsuarioParametroCompra.NR_NIVEL_ACESSO == 0 ? ". Entre em contato com o Administrador do sistema para aderir a pesquisa." : ""}</h5>

                        <div class="row mt-0 mb-1" style="display: ${objUsuarioParametroCompra.NR_NIVEL_ACESSO == 0 ? "none" : "block"};">
                            <div class="col-lg-12 mb-1 mt-0 text-center">
                                <div id="btn_Aderir_Pesquisa_Eletronica${masterDetailOptions.key}" class="mb-0 mt-0"></div>
                            </div>
                        </div>
                    </div>`)

        return div;
    }
}

function createAlmoxarifadoTabTemplateForm(masterDetailOptions) {
    return function () {
        return $("<div>").addClass("ml-3 mt-3 mb-3 mr-3 bg-white").dxForm({
            labelLocation: "top",
            repaintChangesOnly: true,
            items: [{
                //label: { text: "Detalhamento por Almoxarifado" },
                template: createAlmoxarifadoTabTemplate(masterDetailOptions),
            }],
        });
    }
}

function createAlmoxarifadoTabTemplate(masterDetailOptions) {
    let dataSourceItensPedidoAlmoxarifado = [];

    //FAZ UM LOOP NOS ALMOXARIFADOS DO PEDIDO
    arrayAlmoxarifadosPedido.forEach((almoxarifado) => {
        var newData = {};

        Object.keys(masterDetailOptions.data).forEach(key => {
            newData["CD_ALMOXARIFADO"] = almoxarifado;

            if (key.indexOf("_ALMOXARIFADO_") > 0) {
                //PEGA SOMENTE AS COLUNAS REFERENTE AO ALMOXARIFADO CORRENTE
                if (key.endsWith("_ALMOXARIFADO_" + almoxarifado)) {
                    var newKey = key.replace("_ALMOXARIFADO_" + almoxarifado, "")
                    newData[newKey] = masterDetailOptions.data[key];
                }
            }
            else if (key == "VL_TOTAL_PRODUTO") {
                newData["VL_TOTAL_PRODUTO"] = round(masterDetailOptions.data["VL_UNITARIO_PRODUTO"] * masterDetailOptions.data["QT_PEDIDA_ALMOXARIFADO_" + almoxarifado], 2);
            }
            else {
                newData[key] = masterDetailOptions.data[key];
            }
        });

        dataSourceItensPedidoAlmoxarifado.push(newData);
    });

    actionIndex = 0;

    return function () {
        return $("<div>").dxDataGrid({
            columnAutoWidth: true,
            showBorders: true,
            wordWrapEnabled: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            groupPanel: {
                visible: true
            },
            allowColumnResizing: true,
            columnResizingMode: "widget",
            repaintChangesOnly: true,
            allowColumnReordering: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            editing: {
                mode: "batch",
                allowUpdating: true,
                startEditAction: "dblClick",
                allowAdding: false,
                allowDeleting: false,
                useIcons: true,
            },
            keyboardNavigation: {
                enterKeyAction: "moveFocus",
                enterKeyDirection: "column",
                editOnKeyPress: true,
            },
            onFocusedCellChanging(e) {
                e.isHighlighted = true;
            },
            paging: {
                pageSize: 50
            },
            pager: {
                visible: true,
                allowedPageSizes: [10, 25, 50],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet("Itens Pedido de Compra");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], {
                            type: "application/octet-stream"
                        }), "PedidoCompraItensPorAlmoxarifado.xlsx");
                    });
                });
                e.cancel = true;
            },
            columnChooser: {
                enabled: true
            },
            keyExpr: "CD_ALMOXARIFADO",
            columns: [{
                dataField: "CD_ALMOXARIFADO",
                caption: "Almoxarifado",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                alignment: "center",
                visible: true,
                cssClass: "column-data-grid",
            }, {
                caption: "Estoque Atual",
                alignment: "center",
                columns: [{
                    dataField: "DS_ESTOQUE_VENDA",
                    caption: "UN Venda",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "right",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "QT_ESTOQUE_VENDA",
                    caption: "Qt. Estoque UN Venda",
                    dataType: "number",
                    format: "###,###,###,##0.#####",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_ESTOQUE_COMPRA",
                    caption: "UN Compra",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "right",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "QT_ESTOQUE_COMPRA",
                    caption: "Qt. Estoque UN Compra",
                    dataType: "number",
                    format: "###,###,###,##0.#####",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_UNIDADE_MEDIDA_VENDA",
                    caption: "UN Venda",
                    allowEditing: false,
                    allowSorting: true,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_UNIDADE_MEDIDA_COMPRA",
                    caption: "UN Compra",
                    allowEditing: false,
                    allowSorting: true,
                    visible: false,
                    cssClass: "column-data-grid",
                },],
            }, {
                dataField: "DS_CONVERSAO",
                caption: "Conversão",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: false,
                cssClass: "column-data-grid",
            }, {
                dataField: "DS_NAO_ENTREGUE",
                caption: "Receb. Pendente",
                width: 60,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: "right",
                cssClass: "column-data-grid",
            }, {
                dataField: "QT_NAO_ENTREGUE",
                caption: "Receb. Pendente",
                dataType: "number",
                format: "###,###,###,##0.#####",
                allowEditing: false,
                allowSorting: true,
                alignment: "center",
                allowHeaderFiltering: false,
                visible: false,
                cssClass: "column-data-grid",
            }, {
                dataField: "QT_MINIMA",
                caption: "Qt. Mínima",
                dataType: "number",
                format: "###,###,###,##0.#####",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: "center",
                cssClass: "column-data-grid",
            }, {
                dataField: "QT_IDEAL",
                caption: "Qt. Ideal",
                dataType: "number",
                format: "###,###,###,##0.#####",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: "center",
                cssClass: "column-data-grid",
            }, {
                dataField: "QT_MEDIA_VENDA",
                caption: "Qt. Média Venda Mensal",
                dataType: "number",
                format: "###,###,###,##0.##",
                allowEditing: false,
                allowSorting: true,
                alignment: "center",
                allowHeaderFiltering: false,
                visible: false,
                cssClass: "column-data-grid",
            }, {
                dataField: "DS_MEDIA_VENDA",
                caption: "Venda Mensal",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: "right",
                cssClass: "column-data-grid",
            }, {
                dataField: "QT_SUGESTAO",
                caption: "Qt. Sugerida",
                dataType: "number",
                format: "###,###,###,##0.#####",
                allowEditing: false,
                allowSorting: true,
                alignment: "right",
                allowHeaderFiltering: false,
                visible: true,
                cssClass: "column-data-grid",
            }, {
                dataField: "DS_SUGESTAO",
                caption: "Sugest. Compra",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: "right",
                visible: false,
                cssClass: "column-data-grid",
            }, {
                dataField: "QT_EMBALAGEM",
                caption: "Qt. Emb",
                dataType: "number",
                format: "###,###,###,##0.#####",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: "center",
                cssClass: "column-data-grid",
            }, {
                dataField: "QT_PEDIDA",
                caption: "Qt. Pedida",
                dataType: "number",
                format: "###,###,###,##0.#####",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
            }, {
                dataField: "VL_UNITARIO_PRODUTO",
                caption: "Vl. Unitário",
                dataType: "number",
                format: "###,###,###,##0.00###",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
            }, {
                dataField: "VL_TOTAL_PRODUTO",
                caption: "Vl. Total",
                width: 80,
                dataType: "number",
                format: "###,###,###,##0.00",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                summaryType: "sum",
                cssClass: "column-data-grid",
            }],

            dataSource: dataSourceItensPedidoAlmoxarifado,

            onCellPrepared: function (e) {
                if (e.rowType === "data" && typeof (e.column.dataField) !== "undefined") {
                    if (e.column.dataField === "VL_UNITARIO_PRODUTO") {
                        e.cellElement.css("background-color", "#edf3f8");
                    }
                    else if (e.column.dataField === "QT_PEDIDA") {
                        var produtoAtivo = Boolean(e.data.LG_PRODUTO_ATIVO);
                        var solicitacaoCompra = e.data.NR_SOLICITACAO_COMPRA;

                        if (produtoAtivo == true && solicitacaoCompra == null) {
                            e.cellElement.css("background-color", "#edf3f8");
                        }
                    }
                    else if (e.column.dataField === "LG_FORA_LINHA") {
                        e.cellElement.css("background-color", e.data.LG_FORA_LINHA == true ? "#f26419" : null);
                    }
                    else if (e.column.dataField === "DS_ESTOQUE_VENDA_TOTAL" ||
                        e.column.dataField === "DS_ESTOQUE_COMPRA_TOTAL") {
                        if (e.data.CD_UNIDADE_MEDIDA_VENDA != e.data.CD_UNIDADE_MEDIDA_COMPRA) {
                            e.cellElement.css("font-weight", "bold");
                            e.cellElement.css("color", "black");
                        }
                    }
                }
            },

            onEditorPreparing: function (e) {
                if (e.parentType == "dataRow" && typeof (e.dataField) != "undefined") {
                    if (e.dataField == "QT_PEDIDA") {
                        var onValueChanged = e.editorOptions.onValueChanged;
                        e.editorOptions.onValueChanged = function (args) {
                            //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                            onValueChanged.apply(this, arguments);

                            //TRATA O VALOR ALTERADO (NULO E MENOR QUE ZERO)
                            args.value = args.value == null ? args.previousValue : args.value;
                            args.value = args.value < 0 ? args.previousValue : args.value;

                            //ARREDONDA CONFORME AS CASAS DECIMAIS DA UNIDADE DE MEDIDA DE COMPRA
                            args.value = round(args.value, e.row.data.NR_CASAS_UNIDADE_MEDIDA)

                            //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                            onValueChanged.apply(this, arguments);

                            var qtPedida = args.value;
                            var vlUnitario = e.component.cellValue(e.row.rowIndex, "VL_UNITARIO_PRODUTO");

                            e.component.cellValue(e.row.rowIndex, "VL_TOTAL_PRODUTO", round(qtPedida * vlUnitario, 2));
                        }
                    }
                    else if (e.dataField == "VL_UNITARIO_PRODUTO") {
                        var onValueChanged = e.editorOptions.onValueChanged;
                        e.editorOptions.onValueChanged = function (args) {
                            //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                            onValueChanged.apply(this, arguments);

                            //TRATA O VALOR ALTERADO (NULO E MENOR QUE ZERO)
                            args.value = args.value == null ? args.previousValue : args.value;
                            args.value = args.value < 0 ? args.previousValue : args.value;

                            //ARREDONDA CONFORME AS CASAS DECIMAIS DE COMPRA
                            args.value = round(args.value, casasDecimaisCompra)

                            //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                            onValueChanged.apply(this, arguments);


                            //PROCEDIMENTO NECESSÁRIO PARA ATUALIZAÇÃO DO VALOR UNITÁRIO DE TODOS OS REGISTROS DO GRID DE DETALHE
                            //NO GRID PODE ESTAR APLICADO ALGUM FILTRO E TEMOS QUE ALTERAR TAMBÉM ESSAS LINHAS OCULTAS
                            let changes = e.component.option("editing.changes");

                            actionIndex++;

                            (async () => {
                                await e.component.getDataSource().store().load().done((allData) => {
                                    for (var data in allData) {
                                        var qtPedida = allData[data]["QT_PEDIDA"];
                                        var vlUnitario = parseFloat(args.value);

                                        var obj = changes.find((obj) => obj.key == allData[data]["CD_ALMOXARIFADO"]);

                                        if (typeof obj === "undefined") {

                                            var change = { "data": {}, "key": allData[data]["CD_ALMOXARIFADO"], "type": "update", "origin": [] };

                                            change.origin.push({ from: e.row.key, oldValue: allData[data]["VL_UNITARIO_PRODUTO"], action: actionIndex, field: "VL_UNITARIO_PRODUTO" });
                                            change.origin.push({ from: e.row.key, oldValue: allData[data]["VL_TOTAL_PRODUTO"], action: actionIndex, field: "VL_TOTAL_PRODUTO" });

                                            change.data["VL_UNITARIO_PRODUTO"] = args.value;
                                            change.data["VL_TOTAL_PRODUTO"] = round(qtPedida * vlUnitario, 2);

                                            changes.push(change);
                                        }
                                        else {

                                            if (typeof obj.origin === "undefined") {
                                                obj.origin = [];
                                            }

                                            obj.origin.push({ from: e.row.key, oldValue: allData[data]["VL_UNITARIO_PRODUTO"], action: actionIndex, field: "VL_UNITARIO_PRODUTO" });
                                            obj.origin.push({ from: e.row.key, oldValue: allData[data]["VL_TOTAL_PRODUTO"], action: actionIndex, field: "VL_TOTAL_PRODUTO" });

                                            obj.data["VL_UNITARIO_PRODUTO"] = args.value;
                                            obj.data["VL_TOTAL_PRODUTO"] = round(qtPedida * vlUnitario, 2);
                                        }
                                    }
                                });
                            })();

                            e.component.option("editing.changes", changes);
                        }
                    }
                }
            },

            onEditingStart: function (e) {
                if (e.column.dataField === "QT_PEDIDA") {
                    var produtoAtivo = Boolean(e.data.LG_PRODUTO_ATIVO);
                    var solicitacaoCompra = e.data.NR_SOLICITACAO_COMPRA;

                    if (produtoAtivo == false) {
                        ExibeMensagem("info", "Edição desabilitada", `O produto não pode ser editado pois está inativo no almoxarifado ${e.data.CD_ALMOXARIFADO}!`);
                        e.cancel = true;
                    }
                    else if (solicitacaoCompra != null) {
                        ExibeMensagem("info", "Edição desabilitada", `O produto não pode ser editado pois possui solicitação de compra Nº ${e.data.NR_SOLICITACAO_COMPRA}!`);
                        e.cancel = true;
                    }
                }
            },

            onSaved: function (e) {
                let vlUnitario = 0;

                //FAZ UM LOOP PARA ATUALIZAR OS DADOS NO GRID PRINCIPAL
                e.component.getDataSource().store().load().done((allData) => {
                    for (var data in allData) {
                        var qtPedida = allData[data]["QT_PEDIDA"];
                        vlUnitario = allData[data]["VL_UNITARIO_PRODUTO"];

                        vGridItensPedido.cellValue(masterDetailOptions.rowIndex, "QT_PEDIDA_ALMOXARIFADO_" + allData[data]["CD_ALMOXARIFADO"], qtPedida);
                    }

                    vGridItensPedido.cellValue(masterDetailOptions.rowIndex, "VL_UNITARIO_PRODUTO", vlUnitario);
                    SumarizaQuantidadeGrid(vGridItensPedido, masterDetailOptions.rowIndex);
                    vGridItensPedido.saveEditData();
                });
            },
        });
    }
}

function createSimilaresTabTemplateForm(masterDetailOptions) {
    return function () {
        return $("<div>").addClass("ml-3 mt-3 mb-3 mr-3 bg-white").dxForm({
            labelLocation: "top",
            items: [{
                template: createSimilaresTabTemplate(masterDetailOptions),
            }],
        });
    }
}

function createSimilaresTabTemplate(masterDetailOptions) {
    return function () {
        //CLONA O DATASOURCE POIS O DATASOURCEFORNECEDORSIMILAR É ATUALIZADO A CADA LINHA CLICADA
        var clonedDataSource = JSON.parse(JSON.stringify(dataSourceFornecedorSimilar))

        return $("<div>").dxDataGrid({
            columnAutoWidth: true,
            wordWrapEnabled: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            showBorders: false,
            repaintChangesOnly: true,
            groupPanel: { visible: true },
            allowColumnResizing: true,
            columnResizingMode: "widget",
            allowColumnReordering: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            editing: {
                mode: "batch",
                allowUpdating: true,
                startEditAction: "dblClick",
                allowAdding: false,
                allowDeleting: false,
                useIcons: true,
            },
            keyboardNavigation: {
                enterKeyAction: "moveFocus",
                enterKeyDirection: "column",
                editOnKeyPress: true,
            },
            paging: { pageSize: 50 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 25, 50],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            columnChooser: { enabled: true },
            selection: {
                mode: "multiple",
                showCheckBoxesMode: "always"
            },
            columns: [
                {
                    type: "selection",
                    width: 30,
                }, {
                    dataField: "CD_PRODUTO_SIMILAR",
                    caption: "Código",
                    width: 80,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_FABRICANTE",
                    caption: "Fabricante",
                    width: 80,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_ORIGINAL",
                    caption: "Original",
                    width: 80,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_OPCIONAL",
                    caption: "Opcional",
                    width: 80,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_PRODUTO",
                    caption: "Produto Similar",
                    width: 250,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "left",
                    visible: true,
                    groupIndex: 0,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_TEXTO_EXPLICATIVO",
                    caption: "Aplicação",
                    width: 500,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "left",
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "NR_PEDIDO",
                    caption: "Nº Pedido",
                    width: 80,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "right",
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_FORNECEDOR",
                    caption: "Fornecedor (duplo clique para editar)",
                    width: 200,
                    allowEditing: true,
                    allowSorting: true,
                    alignment: "left",
                    visible: true,
                    lookup: {
                        dataSource(options) {
                            return {
                                store: clonedDataSource,
                                key: ["CD_FORNECEDOR"],
                                filter: options.data ? ["CD_PRODUTO", "=", options.data.CD_PRODUTO_SIMILAR] : null,
                                postProcess: function (data) {
                                    data.unshift({
                                        CD_FORNECEDOR: "Código do Fornecedor",
                                        DS_RAZAO_SOCIAL: "Razão Social",
                                        DS_FANTASIA: "Nome Fantasia",
                                        DT_ULTIMA_COMPRA: "Dt. Última Compra",
                                        VL_ULTIMA_COMPRA: "Vl. Última Compra",
                                        DT_TABELA_FILIAL: "Dt. Vig. Cadastro",
                                        VL_TABELA_FILIAL: "Vl. Custo Cadastro",
                                        DT_TABELA_FORNECEDOR: "Dt. Tabela Fornecedor",
                                        VL_TABELA_FORNECEDOR: "Vl. Tabela Fornecedor",
                                        disabled: true
                                    });
                                    return data;
                                }
                            };
                        },
                        searchExpr: ["CD_FORNECEDOR", "DS_RAZAO_SOCIAL", "DS_FANTASIA"],
                        valueExpr: "CD_FORNECEDOR",
                        displayExpr: "DS_RAZAO_SOCIAL",
                        popupWidth: 1000,
                        dropDownOptions: {
                            closeOnOutsideClick: true,
                            title: "Fornecedor",
                        },
                    },
                    cssClass: "column-data-grid",
                }, {
                    caption: "Estoque Atual",
                    alignment: "center",
                    columns: [{
                        dataField: "DS_ESTOQUE_VENDA_TOTAL",
                        caption: "UN Venda",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: "right",
                        cssClass: "column-data-grid",
                    }, {
                        dataField: "QT_ESTOQUE_VENDA_TOTAL",
                        caption: "Qt. Estoque UN Venda",
                        dataType: "number",
                        format: "###,###,###,##0.#####",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: false,
                        cssClass: "column-data-grid",
                    }, {
                        dataField: "DS_ESTOQUE_COMPRA_TOTAL",
                        caption: "UN Compra",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: "right",
                        cssClass: "column-data-grid",
                    }, {
                        dataField: "QT_ESTOQUE_COMPRA_TOTAL",
                        caption: "Qt. Estoque UN Compra",
                        dataType: "number",
                        format: "###,###,###,##0.#####",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: false,
                        cssClass: "column-data-grid",
                    }, {
                        dataField: "CD_UNIDADE_MEDIDA_VENDA",
                        caption: "UN Venda",
                        allowEditing: false,
                        allowSorting: true,
                        visible: false,
                        cssClass: "column-data-grid",
                    }, {
                        dataField: "CD_UNIDADE_MEDIDA_COMPRA",
                        caption: "UN Compra",
                        allowEditing: false,
                        allowSorting: true,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    ],
                }, {
                    dataField: "DS_CONVERSAO",
                    caption: "Conversão",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_NAO_ENTREGUE_TOTAL",
                    caption: "Recebimento Pendente",
                    width: 60,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "right",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "QT_NAO_ENTREGUE_TOTAL",
                    caption: "Recebimento Pendente",
                    dataType: "number",
                    format: "###,###,###,##0.#####",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "QT_MEDIA_VENDA_TOTAL",
                    caption: "Qt. Média Venda Mensal",
                    dataType: "number",
                    format: "###,###,###,##0.##",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_MEDIA_VENDA_TOTAL",
                    caption: "Venda Mensal",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "right",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "QT_SUGERIDA_TOTAL",
                    caption: "Qt. Sugerida",
                    dataType: "number",
                    format: "###,###,###,##0.#####",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "right",
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_SUGERIDA_TOTAL",
                    caption: "Sugest. Compra",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "right",
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "QT_EMBALAGEM",
                    caption: "Qt. Emb",
                    dataType: "number",
                    format: "###,###,###,##0.#####",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    caption: "Informe as quantidades para cada Almoxarifado",
                    alignment: "center",
                    columns: columnsQtPedidaAlmoxarifado,
                }, {
                    dataField: "VL_CUSTO_UNITARIO",
                    caption: "Vl. Unitário Atual",
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_UNITARIO_PRODUTO",
                    caption: "Vl. Unitário",
                    dataType: "number",
                    format: "###,###,###,##0.00###",
                    allowEditing: true,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_TOTAL_PRODUTO",
                    caption: "Vl. Total",
                    width: 80,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    summaryType: "sum",
                    cssClass: "column-data-grid",
                }],

            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet("Similares");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "PedidoCompraItensSimilares.xlsx");
                    });
                });
                e.cancel = true;
            },

            onFocusedCellChanging(e) {
                e.isHighlighted = true;
            },

            onCellPrepared: function (e) {
                if (e.rowType === "data" && typeof (e.column.dataField) !== "undefined") {
                    if (e.column.dataField === "VL_UNITARIO_PRODUTO") {
                        e.cellElement.css("background-color", "#edf3f8");
                    }
                    else if (e.column.dataField === "CD_FORNECEDOR") {
                        if (e.data.NR_PEDIDO == null) {
                            e.cellElement.css("background-color", "#edf3f8");
                        }
                    }
                    else if (e.column.dataField.startsWith("QT_PEDIDA_ALMOXARIFADO_")) {
                        var almox = e.column.dataField.replace("QT_PEDIDA_ALMOXARIFADO_", "")

                        if (e.data["LG_PRODUTO_ATIVO_ALMOXARIFADO_" + almox] == true) {
                            e.cellElement.css("background-color", "#edf3f8");
                        }
                    }
                    else if (e.column.dataField === "DS_ESTOQUE_VENDA_TOTAL" ||
                        e.column.dataField === "DS_ESTOQUE_COMPRA_TOTAL") {
                        if (e.data.CD_UNIDADE_MEDIDA_VENDA != e.data.CD_UNIDADE_MEDIDA_COMPRA) {
                            e.cellElement.css("font-weight", "bold");
                            e.cellElement.css("color", "black");
                        }
                    }
                }
            },

            onEditorPreparing: function (e) {
                if (e.parentType == "dataRow" && typeof (e.dataField) != "undefined") {
                    if (e.dataField.startsWith("QT_PEDIDA_ALMOXARIFADO_")) {
                        var onValueChanged = e.editorOptions.onValueChanged;
                        e.editorOptions.onValueChanged = function (args) {
                            //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                            onValueChanged.apply(this, arguments);

                            //TRATA O VALOR ALTERADO (NULO E MENOR QUE ZERO)
                            args.value = args.value == null ? args.previousValue : args.value;
                            args.value = args.value < 0 ? args.previousValue : args.value;

                            //ARREDONDA CONFORME AS CASAS DECIMAIS DA UNIDADE DE MEDIDA DE COMPRA
                            args.value = round(args.value, e.row.data.NR_CASAS_UNIDADE_MEDIDA)

                            //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                            onValueChanged.apply(this, arguments);

                            SumarizaQuantidadeGrid(e.component, e.row.rowIndex);

                            //SELECIONA A LINHA ATUAL
                            e.component.selectRows(e.row.key, true);
                        }
                    }
                    else if (e.dataField == "VL_UNITARIO_PRODUTO") {
                        var onValueChanged = e.editorOptions.onValueChanged;
                        e.editorOptions.onValueChanged = function (args) {
                            //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                            onValueChanged.apply(this, arguments);

                            //TRATA O VALOR ALTERADO (NULO E MENOR QUE ZERO)
                            args.value = args.value == null ? args.previousValue : args.value;
                            args.value = args.value < 0 ? args.previousValue : args.value;

                            //ARREDONDA CONFORME AS CASAS DECIMAIS DE COMPRA
                            args.value = round(args.value, casasDecimaisCompra)

                            //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                            onValueChanged.apply(this, arguments);

                            var qtPedidaTotal = e.component.cellValue(e.row.rowIndex, "QT_PEDIDA_TOTAL");
                            var vlUnitario = args.value;

                            e.component.cellValue(e.row.rowIndex, "VL_TOTAL_PRODUTO", round(qtPedidaTotal * vlUnitario, 2));

                            //SELECIONA A LINHA ATUAL
                            e.component.selectRows(e.row.key, true);
                        }
                    }
                    else if (e.dataField == "CD_FORNECEDOR") {
                        e.editorOptions.dropDownOptions = { width: 800 };

                        e.editorOptions.itemTemplate = function (itemData, itemIndex, itemElement) {

                            var cssRow = { "padding": "0", "marging": "0", "vertical-align": "top", "width": "auto", "display": "block", "padding-top": "0,5rem" };
                            var row = $("<div>").css(cssRow);

                            var cssColumn, column, cssSpan, spanValue, value;
                            if (itemIndex == 0) {
                                cssColumn = { "padding": "0", "marging": "0", "display": "inline-block", "font-weight": "bold", "vertical-align": "top" };
                                cssSpan = { "padding": "0", "marging": "0", "word-break": "break-word", "white-space": "normal", "font": "9px verdana" };

                                column = $("<div>").width(60).css(cssColumn);
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(itemData["CD_FORNECEDOR"]);
                                row.append(column.append(spanValue))

                                column = $("<div>").width(200).css(cssColumn);
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(itemData["DS_RAZAO_SOCIAL"]);
                                row.append(column.append(spanValue))

                                column = $("<div>").width(110).css(cssColumn);
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(itemData["DT_ULTIMA_COMPRA"]);
                                row.append(column.append(spanValue))

                                column = $("<div>").width(70).css(cssColumn);
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(itemData["VL_ULTIMA_COMPRA"]);
                                row.append(column.append(spanValue))

                                column = $("<div>").width(110).css(cssColumn);
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(itemData["DT_TABELA_FILIAL"]);
                                row.append(column.append(spanValue))

                                column = $("<div>").width(70).css(cssColumn);
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(itemData["VL_TABELA_FILIAL"]);
                                row.append(column.append(spanValue))

                                column = $("<div>").width(100).css(cssColumn);
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(itemData["DT_TABELA_FORNECEDOR"]);
                                row.append(column.append(spanValue))

                                column = $("<div>").width(70).css(cssColumn);
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(itemData["VL_TABELA_FORNECEDOR"]);
                                row.append(column.append(spanValue))
                            } else {
                                cssColumn = { "display": "inline-block", "vertical-align": "top" };
                                cssSpan = { "padding": "0", "marging": "0", "word-break": "break-all", "white-space": "normal", "font": "9px verdana" };

                                column = $("<div>").width(60).css(cssColumn).css("text-align", "left");
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(itemData["CD_FORNECEDOR"]);
                                row.append(column.append(spanValue))

                                column = $("<div>").width(200).css(cssColumn).css("text-align", "left");
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(itemData["DS_RAZAO_SOCIAL"]);
                                row.append(column.append(spanValue))

                                column = $("<div>").width(110).css(cssColumn).css("text-align", "center");
                                value = itemData["DT_ULTIMA_COMPRA"] == null ? null : new Date(itemData["DT_ULTIMA_COMPRA"]).ddMMyyyy();
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(value);
                                row.append(column.append(spanValue))

                                column = $("<div>").width(70).css(cssColumn).css("text-align", "right");
                                value = itemData["VL_ULTIMA_COMPRA"] == null ? null : formataNumero(itemData["VL_ULTIMA_COMPRA"], 2, 5);
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(value);
                                row.append(column.append(spanValue))

                                column = $("<div>").width(110).css(cssColumn).css("text-align", "center");
                                value = itemData["DT_TABELA_FILIAL"] == null ? null : new Date(itemData["DT_TABELA_FILIAL"]).ddMMyyyy();
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(value);
                                row.append(column.append(spanValue))

                                column = $("<div>").width(70).css(cssColumn).css("text-align", "right");
                                value = itemData["VL_TABELA_FILIAL"] == null ? null : formataNumero(itemData["VL_TABELA_FILIAL"], 2, 5);
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(value);
                                row.append(column.append(spanValue))

                                column = $("<div>").width(110).css(cssColumn).css("text-align", "center");
                                value = itemData["DT_TABELA_FORNECEDOR"] == null ? null : new Date(itemData["DT_TABELA_FORNECEDOR"]).ddMMyyyy();
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(value);
                                row.append(column.append(spanValue))

                                column = $("<div>").width(70).css(cssColumn).css("text-align", "right");
                                value = itemData["VL_TABELA_FORNECEDOR"] == null ? null : formataNumero(itemData["VL_TABELA_FORNECEDOR"], 2, 5);
                                spanValue = $("<span>").css(cssSpan).width(column.width()).text(value);
                            }

                            itemElement.append(row);
                        }

                        var onValueChanged = e.editorOptions.onValueChanged;
                        e.editorOptions.onValueChanged = function (args) {
                            //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                            onValueChanged.apply(this, arguments);

                            //TRATA O VALOR ALTERADO (NULO)
                            args.value = args.value == null ? args.previousValue : args.value;

                            //DEVEMOS INVOCAR O MANIPULADOR DE EVENTOS INICIAL NO PERSONALIZADO PARA APLICAR A ALTERAÇÃO
                            onValueChanged.apply(this, arguments);

                            //SELECIONA A LINHA ATUAL
                            e.component.selectRows(e.row.key, true);
                        }
                    }
                }
            },

            onEditingStart: function (e) {
                if (e.column.dataField.startsWith("QT_PEDIDA_ALMOXARIFADO_")) {
                    var almox = e.column.dataField.replace("QT_PEDIDA_ALMOXARIFADO_", "")
                    e.cancel = !e.data["LG_PRODUTO_ATIVO_ALMOXARIFADO_" + almox];
                }
                else if (e.column.dataField === "CD_FORNECEDOR") {
                    e.cancel = (e.data.NR_PEDIDO == null ? false : true)
                }
            },

            onSaving: function (e) {
                OpenProcessPanel("Processando...");
                dataInsert = [];
                dataUpdate = [];
                dataDelete = [];
                vPedidoComplementar = false;
            },

            onRowUpdating: function (e) {
                //CRIA UM OBJETO COM OS DADOS ANTIGOS
                var dadosAtualizados = JSON.parse(JSON.stringify(e.oldData));
                //ATUALIZA O OBJETO COM OS DADOS ATUAIS
                Object.keys(e.newData).forEach(key => {
                    dadosAtualizados[key] = e.newData[key];
                });

                arrayAlmoxarifadosPedido.forEach((almoxarifado) => {
                    let qtPedidaAnterior = parseFloat(e.oldData["QT_PEDIDA_ALMOXARIFADO_" + almoxarifado]);
                    let qtPedida = parseFloat(dadosAtualizados["QT_PEDIDA_ALMOXARIFADO_" + almoxarifado]);

                    if (dadosAtualizados["CD_FORNECEDOR"] != objPedido.codigoFornecedor) {
                        vPedidoComplementar = true;
                    }

                    if (qtPedidaAnterior == 0 && qtPedida > 0) {
                        let almoxarifadosPedido = [];
                        arrayAlmoxarifadosPedido.forEach((almoxarifado) => {
                            almoxarifadosPedido.push({ CD_ALMOXARIFADO: almoxarifado })
                        })

                        dataInsert.push({
                            CD_EMPRESA: dadosAtualizados.CD_EMPRESA,
                            NR_PEDIDO: objPedido.numero,
                            CD_FORNECEDOR_PEDIDO: objPedido.codigoFornecedor,
                            ALMOXARIFADOS_PEDIDO: almoxarifadosPedido,
                            CD_FORNECEDOR_SIMILAR: dadosAtualizados.CD_FORNECEDOR,
                            CD_PRODUTO: dadosAtualizados.CD_PRODUTO_SIMILAR,
                            CD_ALMOXARIFADO: almoxarifado,
                            QT_PEDIDA: dadosAtualizados["QT_PEDIDA_ALMOXARIFADO_" + almoxarifado],
                            CD_UNIDADE_MEDIDA: dadosAtualizados.CD_UNIDADE_MEDIDA_COMPRA,
                            VL_ITEM: dadosAtualizados.VL_UNITARIO_PRODUTO,
                            VL_TOTAL_ITEM: round(dadosAtualizados["QT_PEDIDA_ALMOXARIFADO_" + almoxarifado] * dadosAtualizados.VL_UNITARIO_PRODUTO, 2),
                        });
                    }
                    else if (qtPedidaAnterior > 0 && qtPedida == 0) {
                        dataDelete.push({
                            CD_EMPRESA: dadosAtualizados.CD_EMPRESA,
                            NR_PEDIDO: dadosAtualizados.NR_PEDIDO,
                            CD_PRODUTO: dadosAtualizados.CD_PRODUTO_SIMILAR,
                            CD_ALMOXARIFADO: almoxarifado
                        });
                    }
                    else if (qtPedidaAnterior > 0 && qtPedida > 0) {
                        dataUpdate.push([
                            { id: "CD_EMPRESA", value: dadosAtualizados.CD_EMPRESA, isKey: true },
                            { id: "NR_PEDIDO", value: dadosAtualizados.NR_PEDIDO, isKey: true },
                            { id: "CD_PRODUTO", value: dadosAtualizados.CD_PRODUTO_SIMILAR, isKey: true },
                            { id: "CD_ALMOXARIFADO", value: almoxarifado, isKey: true },
                            { id: "QT_PEDIDA", value: qtPedida, isKey: false },
                            { id: "VL_ITEM", value: dadosAtualizados.VL_UNITARIO_PRODUTO, isKey: false },
                            { id: "VL_TOTAL_ITEM", value: parseFloat(round(qtPedida * dadosAtualizados.VL_UNITARIO_PRODUTO, 2)), isKey: false }
                        ]);
                    }
                });
            },

            onSaved: function (e) {
                $.ajax({
                    type: "POST",
                    url: "/PedidoCompra/SalvarSimilares",
                    data: {
                        dataInsert: dataInsert.length == 0 ? null : JSON.stringify(dataInsert),
                        dataDelete: dataDelete.length == 0 ? null : JSON.stringify(dataDelete),
                        dataUpdate: dataUpdate.length == 0 ? null : JSON.stringify(dataUpdate)
                    },
                    success: function (response) {
                        CloseProcessPanel();
                        if (response.result == "Erro") {
                            ExibeMensagem("error", "Ocorreu um erro ao incluir os produtos similares", response.msg);
                            CarregaPedidoCompra();
                        }
                        else {
                            if (vPedidoComplementar == false) {
                                ExibeMensagem("success", "Operação realizada", "Produtos similares incluídos no pedido com sucesso");
                            }
                            else {
                                ExibeMensagem("success", "Pedidos Complementares", "Pedidos complementares foram criados/alterados para os fornecedores selecionados");

                                const pageWidth = document.documentElement.scrollWidth;

                                //SÓ EXPANDE O PAINEL DE PEDIDOS COMPLEMENTARES SE HOUVER ESPAÇO NO MONITOR
                                if (pageWidth > 1734) {
                                    openPedidosComplementaresPanel();
                                }
                            }
                            CarregaPedidoCompra();
                        }
                    },
                    failure: function (response) {
                        CloseProcessPanel();
                        ExibeMensagem("error", "Ocorreu um erro ao incluir os produtos similares", JSON.parse(response.responseText));
                    }
                });
            },

            onContentReady: function (e) {
                //CARREGA O DATASOURCE DO GRID DE PRODUTOS SIMILARES
                if (e.component.option("dataSource") == null) {
                    e.component.beginCustomLoading();
                    var parameters = [
                        { id: "CD_EMPRESA", value: null },
                        { id: "NR_PEDIDO", value: objPedido.numero },
                        { id: "CD_PRODUTO", value: masterDetailOptions.data.CD_PRODUTO }
                    ];

                    $.ajax({
                        type: "POST",
                        url: "/PedidoCompra/GetProdutosSimilares",
                        data: { parameters: JSON.stringify(parameters) },
                        success: function (response) {
                            if (response.result == "Erro") {
                                ExibeMensagem("error", "Ocorreu um erro ao buscar os produtos similares", response.msg);
                            }
                            else {
                                e.component.option("dataSource", response)
                            }
                            e.component.endCustomLoading();
                        },
                        failure: function (response) {
                            ExibeMensagem("error", "Ocorreu um erro ao buscar os produtos similares", JSON.parse(response.responseText));
                            e.component.endCustomLoading();
                        }
                    });
                }
            },
        });
    }
}

function createHistoricoCompraTabTemplateForm(masterDetailOptions) {
    return function () {
        return $("<div>").addClass("ml-3 mt-3 mb-3 mr-3 bg-white").dxForm({
            labelLocation: "top",
            items: [{
                //label: { text: "Detalhamento por Almoxarifado" },
                template: createHistoricoCompraTabTemplate(masterDetailOptions),
            }],
        });
    }
}

function createHistoricoCompraTabTemplate(masterDetailOptions) {
    return function () {
        return $("<div>").dxDataGrid({
            columnAutoWidth: true,
            showBorders: false,
            wordWrapEnabled: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            groupPanel: { visible: true },
            allowColumnResizing: true,
            repaintChangesOnly: true,
            columnResizingMode: "widget",
            allowColumnReordering: true,
            filterRow: { visible: true, applyFilter: "auto" },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: { visible: true },
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 25, 50],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet("Historico");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "PedidoCompraHistoricoPreços.xlsx");
                    });
                });
                e.cancel = true;
            },
            columnChooser: { enabled: true },
            keyExpr: "NR_PEDIDO",

            columns: [
                {
                    dataField: "NR_PEDIDO",
                    caption: "Pedido Compra",
                    width: 100,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DT_PEDIDO",
                    caption: "Data Pedido",
                    width: 80,
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    allowEditing: false,
                    allowSorting: true,
                    allowFiltering: true,
                    allowHeaderFiltering: true,
                    alignment: "center",
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_FORNECEDOR",
                    caption: "Código Fornecedor",
                    width: 120,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_RAZAO_SOCIAL",
                    caption: "Fornecedor",
                    width: 350,
                    allowEditing: false,
                    allowSorting: true,
                    allowFiltering: true,
                    alignment: "left",
                    allowHeaderFiltering: true,
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "QT_PEDIDA",
                    caption: "Qt. Comprada",
                    dataType: "number",
                    format: "###,###,###,##0.#####",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_PEDIDA",
                    caption: "Qt. Comprada",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "right",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_ITEM",
                    caption: "Valor Unitário",
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_TOTAL_ITEM",
                    caption: "Valor Total",
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                }],

            onContentReady: function (e) {
                //CARREGA O DATASOURCE DO GRID DE HISTÓRICO DOS PRODUTOS
                if (e.component.option("dataSource") == null) {
                    e.component.beginCustomLoading();
                    var parameters = [
                        { id: "CD_PRODUTO", value: masterDetailOptions.data.CD_PRODUTO }
                    ];

                    $.ajax({
                        type: "POST",
                        url: "/PedidoCompra/GetHistoricoCompraProduto",
                        data: { parameters: JSON.stringify(parameters) },
                        success: function (response) {
                            if (response.result == "Erro") {
                                ExibeMensagem("error", "Ocorreu um erro ao carregar o histórico de compra do produto", response.msg);
                            }
                            else {
                                e.component.option("dataSource", response)
                            }
                            e.component.endCustomLoading();
                        },
                        failure: function (response) {
                            ExibeMensagem("error", "Ocorreu um erro ao carregar o histórico de compra do produto", JSON.parse(response.responseText));
                            e.component.endCustomLoading();
                        }
                    });
                }
            },

        });
    }
}

function createHistoricoRecebimentoTabTemplateForm(masterDetailOptions) {
    return function () {
        return $("<div>").addClass("ml-3 mt-3 mb-3 mr-3 bg-white").dxForm({
            labelLocation: "top",
            items: [{
                template: createHistoricoRecebimentoTabTemplate(masterDetailOptions),
            }],
        });
    }
}

function createHistoricoRecebimentoTabTemplate(masterDetailOptions) {
    return function () {
        return $("<div>").dxDataGrid({
            columnAutoWidth: true,
            showBorders: false,
            wordWrapEnabled: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            groupPanel: { visible: true },
            allowColumnResizing: true,
            repaintChangesOnly: true,
            columnResizingMode: "widget",
            allowColumnReordering: true,
            filterRow: { visible: true, applyFilter: "auto" },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: { visible: true },
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            paging: { pageSize: 10 },
            pager: {
                visible: true,
                allowedPageSizes: [10, 25, 50],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet("Historico Recebimento");

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "PedidoCompraHistoricoRecebimento.xlsx");
                    });
                });
                e.cancel = true;
            },
            columnChooser: { enabled: true },
            keyExpr: ["CD_EMPRESA", "CD_FILIAL", "NR_CONTROLE", "NR_SEQUENCIA"],

            columns: [
                {
                    dataField: "CD_FILIAL",
                    caption: "Filial",
                    allowEditing: false,
                    allowSorting: true,
                    allowFiltering: true,
                    allowHeaderFiltering: true,
                    alignment: "center",
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "NR_CONTROLE",
                    caption: "Nº Controle",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "NR_DOCUMENTO",
                    caption: "Nº Documento",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DT_EMISSAO_DOCUMENTO",
                    caption: "Data Emissão",
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    allowEditing: false,
                    allowSorting: true,
                    allowFiltering: true,
                    allowHeaderFiltering: true,
                    alignment: "center",
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DT_ENTRADA",
                    caption: "Data Entrada",
                    width: 80,
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    allowEditing: false,
                    allowSorting: true,
                    allowFiltering: true,
                    allowHeaderFiltering: true,
                    alignment: "center",
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_FORNECEDOR",
                    caption: "Código Fornecedor",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: "center",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_RAZAO_SOCIAL",
                    caption: "Fornecedor",
                    allowEditing: false,
                    allowSorting: true,
                    allowFiltering: true,
                    alignment: "left",
                    allowHeaderFiltering: true,
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_CUSTO_BRUTO",
                    caption: "Vl. Custo Bruto",
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_DESCONTO",
                    caption: "Vl. Desconto",
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_CUSTO_LIQUIDO",
                    caption: "Vl. Custo Líquido",
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_IPI",
                    caption: "Vl. IPI",
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_FRETE_COMPRA",
                    caption: "Vl. Frete",
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_DESPESAS_DIVERSAS",
                    caption: "Vl. Despesas",
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_SUBSTITUICAO",
                    caption: "Vl. Substituição",
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_CUSTO_TOTAL",
                    caption: "Vl. Custo Total",
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "QT_RECEBIDA",
                    caption: "Qt. Recebida",
                    dataType: "number",
                    format: "###,###,###,##0.#####",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_RECEBIDA",
                    caption: "Qt. Recebida",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: "right",
                    cssClass: "column-data-grid",
                }, {
                    dataField: "VL_TOTAL_PRODUTO",
                    caption: "Vl. Total Produto",
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                }],

            onContentReady: function (e) {
                //CARREGA O DATASOURCE DO GRID DE HISTÓRICO DOS PRODUTOS
                if (e.component.option("dataSource") == null) {
                    e.component.beginCustomLoading();
                    var parameters = [
                        { id: "CD_PRODUTO", value: masterDetailOptions.data.CD_PRODUTO }
                    ];

                    $.ajax({
                        type: "POST",
                        url: "/PedidoCompra/GetHistoricoRecebimentoProduto",
                        data: { parameters: JSON.stringify(parameters) },
                        success: function (response) {
                            if (response.result == "Erro") {
                                ExibeMensagem("error", "Ocorreu um erro ao carregar o histórico de recebimnento do produto", response.msg);
                            }
                            else {
                                e.component.option("dataSource", response)
                            }
                            e.component.endCustomLoading();
                        },
                        failure: function (response) {
                            ExibeMensagem("error", "Ocorreu um erro ao carregar o histórico de recebimnento do produto", JSON.parse(response.responseText));
                            e.component.endCustomLoading();
                        },
                    });
                }
            },

        });
    }
}

function createAplicacaoTabTemplateForm(masterDetailOptions) {
    return function () {
        return $("<div>").addClass("ml-3 mt-3 mb-3 mr-3 bg-white").dxForm({
            labelLocation: "top",
            items: [{
                //label: { text: "Detalhamento por Almoxarifado" },
                template: createAplicacaoTabTemplate(masterDetailOptions),
            }],
        });
    }
}

function createAplicacaoTabTemplate(masterDetailOptions) {
    return function () {
        return $("<div>").dxTextArea({
            labelMode: "floating",
            value: masterDetailOptions.data.DS_TEXTO_EXPLICATIVO,
            label: "Aplicação",
            height: 90,
            maxLength: 4000,
            readOnly: true,
        });
    }
}

function AbrirModal(idModal) {
    $("#" + idModal).modal("toggle");
}

function FecharModal(idModal) {
    $("#" + idModal).modal("toggle");
}

function OpenModalSolicitacaoCompra() {
    CarregaGridSolicitacaoCompra().then(() => {
        AbrirModal("ModalSolicitacaoCompra")
    });
}

function openPedidosComplementaresPanel() {
    const pageWidth = document.documentElement.scrollWidth;

    if (pageWidth > 1734) {
        $("#pedidoCompra").removeClass("col-lg-12").addClass("col-lg-9");
        $("#pedidosComplementares").removeClass("col-lg-12").addClass("col-lg-3");
        $("#pedidosComplementares").removeClass("panelPedidosLateral").addClass("panelPedidosLateral");

        $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("DS_STATUS", "visible", false);
        $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("CD_FORNECEDOR", "visible", false);
        $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("DS_CONTATO", "visible", false);
        $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("DS_TELEFONE", "visible", false);
        $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("DT_INCLUSAO", "visible", false);
        $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("ACOES", "visible", false);
        $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("LG_PEDIDO_ENVIADO", "visible", false);
        $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("DS_RECEBIDO", "visible", false);

        $("#gridPedidosComplementares").dxDataGrid("instance").option("groupPanel", { visible: true, emptyPanelText: "Agrupamento" });

        document.getElementById("btnAbrirConsultaPedidosPanel").style.display = "none";
        document.getElementById("btnAbrirPedidosComplementaresPanel").style.display = "none";
        document.getElementById("btnImprimirPedido").style.display = "none";
        document.getElementById("btnEnvioPedidoWhatsApp").style.display = "none";
        document.getElementById("btnEnvioPedidoEmail").style.display = "none";
        document.getElementById("btnVoltarInicio").style.display = "none";

        document.getElementById("divBtnExpandirFecharComplementares").style.display = "block";
        document.getElementById("divBtnFecharComplementares").style.display = "none";

        document.getElementById("pedidosComplementares").style.display = "block";
    }
    else {
        expandirPedidosComplementaresPanel();
    }

}

function expandirPedidosComplementaresPanel() {
    vGridPedidosComplementaresLegenda.refresh();

    $("#pedidosComplementares").removeClass("col-lg-3").addClass("col-lg-12");
    $("#pedidosComplementares").removeClass("panelPedidosLateral");

    $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("DS_STATUS", "visible", true);
    $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("CD_FORNECEDOR", "visible", true);
    $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("DS_CONTATO", "visible", true);
    $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("DS_TELEFONE", "visible", true);
    $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("DT_INCLUSAO", "visible", true);
    $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("ACOES", "visible", true);
    $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("LG_PEDIDO_ENVIADO", "visible", true);
    $("#gridPedidosComplementares").dxDataGrid("instance").columnOption("DS_RECEBIDO", "visible", true);

    $("#gridPedidosComplementares").dxDataGrid("instance").option("groupPanel", { visible: true, emptyPanelText: "Arraste as colunas do grid para esta área para agrupar" });

    document.getElementById("pedidoCompra").style.display = "none";
    document.getElementById("btnAbrirConsultaPedidosPanel").style.display = "none";
    document.getElementById("btnAbrirPedidosComplementaresPanel").style.display = "none";
    document.getElementById("btnImprimirPedido").style.display = "none";
    document.getElementById("btnEnvioPedidoWhatsApp").style.display = "none";
    document.getElementById("btnEnvioPedidoEmail").style.display = "none";
    document.getElementById("btnVoltarInicio").style.display = "none";

    document.getElementById("divBtnExpandirFecharComplementares").style.display = "none";
    document.getElementById("divBtnFecharComplementares").style.display = "block";

    document.getElementById("cardCabecalho").style.display = "block";
    document.getElementById("pedidosComplementares").style.display = "block";
}

function openConsultaPedidosPanel() {
    //AJUSTA OS FILTROS
    vNbx_Dias_Filtro_Consulta_Geral.option("value", 30);
    //vLkp_Situacao_Pedido_Consulta_Geral.option("value", null);
    vGridConsultaGeralPedidos.columnOption("DS_SITUACAO", "filterValue", null);
    vLkp_Produtos_Filtro_Consulta_Geral.option("value", null);

    //CARREGA A CONSULTA DE PEDIDOS LATERAL
    CarregaGridConsultaPedidos();

    const pageWidth = document.documentElement.scrollWidth;

    if (pageWidth > 1734) {
        $("#pedidoCompra").removeClass("col-lg-12").addClass("col-lg-9");
        $("#consultaPedidos").removeClass("col-lg-12").addClass("col-lg-3");
        $("#consultaPedidos").removeClass("panelPedidosLateral").addClass("panelPedidosLateral");

        $("#divFiltroPeriodo").removeClass("col-lg-3").addClass("col-lg-12");
        $("#divFiltroProduto").removeClass("col-lg-6").addClass("col-lg-12");
        $("#divFiltroAlmoxarifado").removeClass("col-lg-3").addClass("col-lg-12");

        vGridConsultaGeralPedidos.columnOption("DS_STATUS", "visible", false);
        vGridConsultaGeralPedidos.columnOption("CD_FORNECEDOR", "visible", false);
        vGridConsultaGeralPedidos.columnOption("DS_CONTATO", "visible", false);
        vGridConsultaGeralPedidos.columnOption("DS_TELEFONE", "visible", false);
        vGridConsultaGeralPedidos.columnOption("VL_FATURAMENTO_MINIMO", "visible", false);
        vGridConsultaGeralPedidos.columnOption("ACOES", "visible", false);
        vGridConsultaGeralPedidos.columnOption("LG_PEDIDO_ENVIADO", "visible", false);
        vGridConsultaGeralPedidos.columnOption("DS_RECEBIDO", "visible", false);

        vGridConsultaGeralPedidos.option("groupPanel", { visible: true, emptyPanelText: "Agrupamento" });

        document.getElementById("btnAbrirConsultaPedidosPanel").style.display = "none";
        document.getElementById("btnAbrirPedidosComplementaresPanel").style.display = "none";
        document.getElementById("btnImprimirPedido").style.display = "none";
        document.getElementById("btnEnvioPedidoWhatsApp").style.display = "none";
        document.getElementById("btnEnvioPedidoEmail").style.display = "none";
        document.getElementById("btnVoltarInicio").style.display = "none";

        document.getElementById("divBtnExpandirFecharConsulta").style.display = "block";
        document.getElementById("divBtnFecharConsulta").style.display = "none";

        document.getElementById("consultaPedidos").style.display = "block";
    }
    else {
        expandirConsultaPedidosPanel();
    }

}

function closeConsultaPedidosPanel() {
    document.getElementById("btnAbrirConsultaPedidosPanel").style.display = "block";
    document.getElementById("btnAbrirPedidosComplementaresPanel").style.display = "block";
    document.getElementById("btnImprimirPedido").style.display = "block";
    document.getElementById("btnEnvioPedidoWhatsApp").style.display = "block";
    document.getElementById("btnEnvioPedidoEmail").style.display = "block";
    document.getElementById("btnVoltarInicio").style.display = "block";

    document.getElementById("consultaPedidos").style.display = "none";

    if (objPedido.numero == null) {
        ExibirEsconderFiltros();
        ExibirEsconderMenuPedido("menuPrincipalSub");
    }
    else {
        ExibirEsconderMenuPedido("pedidoCompra");
        $("#pedidoCompra").removeClass("col-lg-9").addClass("col-lg-12");
    }
}

async function OpenModalEnvioEmail(pNRPedido = objPedido.numero, pCDSituacao = objPedido.codigoSituacao) {
    if (objUsuarioParametroCompra.LG_ENVIA_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        popupAcessoNegado.show();
        return;
    }

    if (pCDSituacao != 4) {
        ExibeMensagem("info", "Operação não realizada", "O envio de e-mail só está disponível para pedidos aprovados");
        return;
    }

    OpenProcessPanel("Carregando...");
    var filialPedido = null;
    var razaoSocialFilial = null;
    var nomeFantasiaFilial = null;
    var fornecedorPedido = null;
    var razaoSocialFornecedor = null;
    var nomeFantasiaFornecedor = null;
    var contato = null;
    var comprador = null;
    var nomeComprador = null;
    var emailComprador = null;
    var nomeArquivoPDF = null;
    var linkPedido = null;
    var vError = false;
    $("#numeroPedidoEmail").text("");
    $("#linkPedidoEmail").prop("onclick", null).off("click");
    $("#fornecedorContatoEmail").text("");
    vTxt_Remetente_Email.option("value", "");
    vTxt_Destinatario_Email.option("value", "");
    vTxt_Assunto_Email.option("value", "");
    vTxt_Corpo_Email.option("value", "");

    //BUSCA OS DADOS DO PEDIDO
    await $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetPedidoCompra",
        data: { pNRPedido: pNRPedido },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao consultar o pedido de compra para envio do e-mail", response.msg);
                vError = true;
            }
            else {
                let PEDIDO = response[0];

                $("#numeroPedidoEmail").text("Pedido #" + PEDIDO.NR_PEDIDO);
                filialPedido = PEDIDO.CD_FILIAL;
                fornecedorPedido = PEDIDO.CD_FORNECEDOR;
                contato = PEDIDO.DS_CONTATO;
                comprador = PEDIDO.CD_LOGIN;
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao consultar o pedido de compra para envio do e-mail", JSON.parse(response.responseText));
            vError = true;
        }
    });

    if (vError == true) {
        CloseProcessPanel();
        return;
    }

    if (filialPedido != null) {
        //BUSCA OS DADOS DA FILIAL
        await $.ajax({
            type: "POST",
            url: "/PedidoCompra/GetFilial",
            data: { pCDFilial: filialPedido },
            success: function (response) {
                if (response.result == "Erro") {
                    ExibeMensagem("error", "Ocorreu um erro ao buscar os dados da filial para envio do e-mail", response.msg);
                    vError = true;
                }
                else {
                    var FILIAL = response[0];
                    razaoSocialFilial = FILIAL.DS_RAZAO_SOCIAL;
                    nomeFantasiaFilial = FILIAL.DS_NOME_FANTASIA;
                    vTxt_Remetente_Email.option("value", `${FILIAL.DS_NOME_FANTASIA} - Filial ${filialPedido}`);
                }
            },
            failure: function (response) {
                ExibeMensagem("error", "Ocorreu um erro ao buscar os dados da filial para envio do e-mail", JSON.parse(response.responseText));
                vError = true;
            }
        });
    }

    if (comprador != null) {
        //BUSCA OS DADOS COMPRADOR
        await $.ajax({
            type: "POST",
            url: "/PedidoCompra/GetDadosComprador",
            data: { pCDLogin: comprador },
            success: function (response) {
                if (response.result == "Erro") {
                    ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do comprador para envio do e-mail", response.msg);
                    vError = true;
                }
                else {
                    nomeComprador = response.DS_NOME;
                    emailComprador = response.DS_EMAIL;
                }
            },
            failure: function (response) {
                ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do comprador para envio do e-mail", JSON.parse(response.responseText));
                vError = true;
            }
        });
    }

    //GERA O PDF DO PEDIDO
    await $.ajax({
        type: "POST",
        url: "/PedidoCompra/GeraPDFPedidoCompra",
        data: { pNRPedido: pNRPedido, pTipoRetorno: "jsoncontent" },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao gerar o pdf do pedido de compra", response.msg);
                vError = true;
            }
            else {
                nomeArquivoPDF = response.fileName;
                var pathBase = window.location.protocol + '//' + window.location.host;
                linkPedido = `${pathBase}/arquivos/compras/pedido/${nomeArquivoPDF}.pdf?cb=${new Date().getTime()}`

                $("#linkPedidoEmail").click(function () {
                    window.open(linkPedido, '_blank');
                });
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao gerar o pdf do pedido de compra", JSON.parse(response.responseText));
            vError = true;
        }
    });

    //BUSCA OS DADOS DO FORNECEDOR
    await $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetFornecedor",
        data: { pCDFornecedor: fornecedorPedido },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do fornecedor para envio do e-mail", response.msg);
                vError = true;
            }
            else {
                var FORNECEDOR = response[0];
                razaoSocialFornecedor = FORNECEDOR.DS_RAZAO_SOCIAL;
                nomeFantasiaFornecedor = FORNECEDOR.DS_FANTASIA;
                $("#fornecedorContatoEmail").text(`Fornecedor: ${FORNECEDOR.DS_RAZAO_SOCIAL + (contato == null ? "" : " | Contato: " + contato)}`);
                vTxt_Destinatario_Email.option("value", FORNECEDOR.DS_EMAIL);
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do fornecedor para envio do e-mail", JSON.parse(response.responseText));
            vError = true;
        }
    });

    CloseProcessPanel();
    if (vError == true) return;

    //CONFIGURA O ASSUNTO DO E-MAIL
    if (getComponentValue(vTxt_Configuracao_Assunto_Email, "dxTextBox") == null) {
        vTxt_Assunto_Email.option("value", `Pedido de Compra - #${pNRPedido}`);
    }
    else {
        var assunto = getComponentValue(vTxt_Configuracao_Assunto_Email, "dxTextBox");
        assunto = assunto.replaceAll("[Empresa]", nomeEmpresa);
        assunto = assunto.replaceAll("[Pedido]", pNRPedido);
        assunto = assunto.replaceAll("[FilialR]", (razaoSocialFilial == null ? "" : razaoSocialFilial));
        assunto = assunto.replaceAll("[FilialF]", (nomeFantasiaFilial == null ? "" : nomeFantasiaFilial));
        assunto = assunto.replaceAll("[Comprador]", (nomeComprador == null ? "" : nomeComprador));
        assunto = assunto.replaceAll("[FornecedorR]", razaoSocialFornecedor);
        assunto = assunto.replaceAll("[FornecedorF]", nomeFantasiaFornecedor);
        assunto = assunto.replaceAll("[LinkPedido]", linkPedido);
        vTxt_Assunto_Email.option("value", assunto);
    }

    //CONFIGURA O CORPO DO E-MAIL
    if (getComponentValue(vTxt_Configuracao_Corpo_Email, "dxTextBox") == null) {
        vTxt_Corpo_Email.option("value", `Segue pedido de compra - #${pNRPedido}`);
    }
    else {
        var corpo = getComponentValue(vTxt_Configuracao_Corpo_Email, "dxTextBox");
        corpo = corpo.replaceAll("[Empresa]", nomeEmpresa);
        corpo = corpo.replaceAll("[Pedido]", pNRPedido);
        corpo = corpo.replaceAll("[FilialR]", (razaoSocialFilial == null ? "" : razaoSocialFilial));
        corpo = corpo.replaceAll("[FilialF]", (nomeFantasiaFilial == null ? "" : nomeFantasiaFilial));
        corpo = corpo.replaceAll("[Comprador]", (nomeComprador == null ? "" : nomeComprador));
        corpo = corpo.replaceAll("[FornecedorR]", razaoSocialFornecedor);
        corpo = corpo.replaceAll("[FornecedorF]", nomeFantasiaFornecedor);
        corpo = corpo.replaceAll("[LinkPedido]", linkPedido);
        vTxt_Corpo_Email.option("value", corpo);
    }

    $("#btnEnviarEmail").prop("onclick", null).off("click");
    $("#btnEnviarEmail").on("click", function () { EnviaEmailPedidoCompra(pNRPedido, razaoSocialFornecedor, contato, nomeComprador, emailComprador, nomeArquivoPDF); });

    AbrirModal("ModalEnvioEmail");
}

function EnviaEmailPedidoCompra(pNRPedido, pRazaoSocialFornecedor, pContato, pNomeComprador, pEmailComprador, nomeArquivoPDF) {
    OpenProcessPanel("Enviando e-mail...")
    $.ajax({
        type: "POST",
        url: "/PedidoCompra/EnviaEmailPedidoCompra",
        data: {
            parameters: JSON.stringify([
                { id: "pNRPedido", value: pNRPedido },
                { id: "pFromName", value: getComponentValue(vTxt_Remetente_Email, "dxTextBox") },
                { id: "pToEmail", value: getComponentValue(vTxt_Destinatario_Email, "dxTextBox") },
                { id: "pSubject", value: getComponentValue(vTxt_Assunto_Email, "dxTextBox") },
                { id: "pMessage", value: getComponentValue(vTxt_Corpo_Email, "dxTextArea") },
                { id: "pAttachFile", value: getComponentValue(vCkb_Anexar_Pedido_Email, "dxCheckBox") },
                { id: "pNomeArquivoPDF", value: nomeArquivoPDF },
                { id: "pRazaoSocialFornecedor", value: pRazaoSocialFornecedor },
                { id: "pContato", value: pContato },
                { id: "pNomeComprador", value: pNomeComprador },
                { id: "pEmailComprador", value: pEmailComprador }
            ]),
            pTipoRetorno: "jsoncontent"
        },
        success: function (response) {
            (async () => {
                if (response.result == "Erro") {
                    CloseProcessPanel();
                    ExibeMensagem("error", "Ocorreu um erro ao enviar o e-mail", response.msg);
                }
                else {
                    await CarregaPedidoCompra();
                    FecharModal("ModalEnvioEmail");
                    CloseProcessPanel();
                    ExibeMensagem("success", "Operação realizada", "E-mail enviado com sucesso");
                }
            })();
        },
        failure: function (response) {
            CloseProcessPanel();
            ExibeMensagem("error", "Ocorreu um erro ao enviar o e-mail", JSON.parse(response.responseText));
        }
    });
}

function expandirConsultaPedidosPanel() {
    vGridPedidosConsultaLegenda.refresh();

    $("#consultaPedidos").removeClass("col-lg-3").addClass("col-lg-12");
    $("#consultaPedidos").removeClass("panelPedidosLateral");

    $("#divFiltroPeriodo").removeClass("col-lg-12").addClass("col-lg-3");
    $("#divFiltroProduto").removeClass("col-lg-12").addClass("col-lg-6");
    $("#divFiltroAlmoxarifado").removeClass("col-lg-12").addClass("col-lg-3");

    vGridConsultaGeralPedidos.columnOption("DS_STATUS", "visible", true);
    vGridConsultaGeralPedidos.columnOption("CD_FORNECEDOR", "visible", true);
    vGridConsultaGeralPedidos.columnOption("DS_CONTATO", "visible", true);
    vGridConsultaGeralPedidos.columnOption("DS_TELEFONE", "visible", true);
    vGridConsultaGeralPedidos.columnOption("VL_FATURAMENTO_MINIMO", "visible", true);
    vGridConsultaGeralPedidos.columnOption("ACOES", "visible", true);
    vGridConsultaGeralPedidos.columnOption("LG_PEDIDO_ENVIADO", "visible", true);
    vGridConsultaGeralPedidos.columnOption("DS_RECEBIDO", "visible", true);

    vGridConsultaGeralPedidos.option("groupPanel", { visible: true, emptyPanelText: "Arraste as colunas do grid para esta área para agrupar" });

    document.getElementById("pedidoCompra").style.display = "none";
    document.getElementById("btnAbrirConsultaPedidosPanel").style.display = "none";
    document.getElementById("btnAbrirPedidosComplementaresPanel").style.display = "none";
    document.getElementById("btnImprimirPedido").style.display = "none";
    document.getElementById("btnEnvioPedidoWhatsApp").style.display = "none";
    document.getElementById("btnEnvioPedidoEmail").style.display = "none";
    document.getElementById("btnVoltarInicio").style.display = "none";

    document.getElementById("divBtnExpandirFecharConsulta").style.display = "none";
    document.getElementById("divBtnFecharConsulta").style.display = "block";

    document.getElementById("cardCabecalho").style.display = "block";
    document.getElementById("consultaPedidos").style.display = "block";
}

function closePedidosComplementaresPanel() {
    document.getElementById("btnAbrirConsultaPedidosPanel").style.display = "block";
    document.getElementById("btnAbrirPedidosComplementaresPanel").style.display = "block";
    document.getElementById("btnImprimirPedido").style.display = "block";
    document.getElementById("btnEnvioPedidoWhatsApp").style.display = "block";
    document.getElementById("btnEnvioPedidoEmail").style.display = "block";
    document.getElementById("btnVoltarInicio").style.display = "block";

    document.getElementById("pedidosComplementares").style.display = "none";

    if (objPedido.numero == null) {
        ExibirEsconderFiltros();
        ExibirEsconderMenuPedido("menuPrincipalSub");
    }
    else {
        ExibirEsconderMenuPedido("pedidoCompra");
        $("#pedidoCompra").removeClass("col-lg-9").addClass("col-lg-12");
    }
}

async function ImprimirPedido(pNRPedido = objPedido.numero) {
    //$.ajax({
    //    type: "POST",
    //    url: "../RelPedidoCompra/GuardaNumeroPedidoImpressao",
    //    beforeSend: function (xhr) {
    //        xhr.setRequestHeader("NR_PEDIDO", pNRPedido);
    //    },
    //    success: function (response) {
    //        window.open("../RelPedidoCompra/Impressao", "_blank");
    //    },
    //    failure: function (response) {
    //        ExibeMensagem("error", "Ocorreu um erro ao guardar o número do pedido para impressão", JSON.parse(response.responseText));
    //    }
    //});

    window.open('../RelPedidoCompra/Impressao?param=' + encodeURI(window.btoa(pNRPedido)), '_blank');

//    //GERA O PDF DO PEDIDO
//    await $.ajax({
//        type: "POST",
//        url: "/PedidoCompra/GeraPDFPedidoCompra",
//        data: { pNRPedido: pNRPedido, pTipoRetorno: "jsoncontent" },
//        success: function (response) {
//            if (response.result == "Erro") {
//                ExibeMensagem("error", "Ocorreu um erro ao gerar o pdf do pedido de compra", response.msg);
//            }
//            else {
//                nomeArquivoPDF = response.fileName;
//                var pathBase = window.location.protocol + '//' + window.location.host;
//                linkPedido = `${pathBase}/arquivos/compras/pedido/${nomeArquivoPDF}.pdf?cb=${new Date().getTime()}`
//                window.open(linkPedido, '_blank');
//            }
//        },
//        failure: function (response) {
//            ExibeMensagem("error", "Ocorreu um erro ao gerar o pdf do pedido de compra", JSON.parse(response.responseText));
//        }
//    });
}

async function OpenModalEnvioWhatsApp(pNRPedido = objPedido.numero, pCDSituacao = objPedido.codigoSituacao) {
    if (objUsuarioParametroCompra.LG_ENVIA_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == "0") {
        popupAcessoNegado.show();
        return;
    }

    if (pCDSituacao != 4) {
        ExibeMensagem("info", "Operação não realizada", "O envio via WhatsApp só está disponível para pedidos aprovados");
        return;
    }

    OpenProcessPanel("Carregando...");
    var filialPedido = null;
    var razaoSocialFilial = null;
    var nomeFantasiaFilial = null;
    var fornecedorPedido = null;
    var razaoSocialFornecedor = null;
    var nomeFantasiaFornecedor = null;
    var contato = null;
    var comprador = null;
    var nomeComprador = null;
    var emailComprador = null;
    var nomeArquivoPDF = null;
    var whatsAppFornecedor = null;
    var linkPedido = null;
    var vError = false;
    $("#numeroPedidoWhatsApp").text("");
    $("#linkPedidoWhatsApp").prop("onclick", null).off("click");
    $("#linkPedidoWhatsApp").attr("data-link-pedido", "");
    $("#fornecedorContatoWhatsApp").text("");
    vTxt_Telefone_WhatsApp.option("value", "");
    vTxt_Mensagem_WhatsApp.option("value", "");

    //BUSCA OS DADOS DO PEDIDO
    await $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetPedidoCompra",
        data: { pNRPedido: pNRPedido },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao consultar o pedido de compra para envio do whatsapp", response.msg);
                vError = true;
            }
            else {
                let PEDIDO = response[0];

                $("#numeroPedidoWhatsApp").text("Pedido #" + PEDIDO.NR_PEDIDO);
                filialPedido = PEDIDO.CD_FILIAL;
                fornecedorPedido = PEDIDO.CD_FORNECEDOR;
                contato = PEDIDO.DS_CONTATO;
                comprador = PEDIDO.CD_LOGIN;
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao consultar o pedido de compra para envio do whatsapp", JSON.parse(response.responseText));
            vError = true;
        }
    });

    if (vError == true) {
        CloseProcessPanel();
        return;
    }

    if (filialPedido != null) {
        //BUSCA OS DADOS DA FILIAL
        await $.ajax({
            type: "POST",
            url: "/PedidoCompra/GetFilial",
            data: { pCDFilial: filialPedido },
            success: function (response) {
                if (response.result == "Erro") {
                    ExibeMensagem("error", "Ocorreu um erro ao buscar os dados da filial para envio do whatsapp", response.msg);
                    vError = true;
                }
                else {
                    var FILIAL = response[0];
                    razaoSocialFilial = FILIAL.DS_RAZAO_SOCIAL;
                    nomeFantasiaFilial = FILIAL.DS_NOME_FANTASIA;
                }
            },
            failure: function (response) {
                ExibeMensagem("error", "Ocorreu um erro ao buscar os dados da filial para envio do whatsapp", JSON.parse(response.responseText));
                vError = true;
            }
        });
    }

    if (comprador != null) {
        //BUSCA OS DADOS COMPRADOR
        await $.ajax({
            type: "POST",
            url: "/PedidoCompra/GetDadosComprador",
            data: { pCDLogin: comprador },
            success: function (response) {
                if (response.result == "Erro") {
                    ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do comprador para envio do whatsapp", response.msg);
                    vError = true;
                }
                else {
                    nomeComprador = response.DS_NOME;
                    emailComprador = response.DS_EMAIL;
                }
            },
            failure: function (response) {
                ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do comprador para envio do whatsapp", JSON.parse(response.responseText));
                vError = true;
            }
        });
    }

    //GERA O PDF DO PEDIDO
    await $.ajax({
        type: "POST",
        url: "/PedidoCompra/GeraPDFPedidoCompra",
        data: { pNRPedido: pNRPedido, pTipoRetorno: "jsoncontent" },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao gerar o pdf do pedido de compra", response.msg);
                vError = true;
            }
            else {
                nomeArquivoPDF = response.fileName;
                var pathBase = window.location.protocol + '//' + window.location.host;
                linkPedido = `${pathBase}/arquivos/compras/pedido/${nomeArquivoPDF}.pdf?cb=${new Date().getTime()}`

                $("#linkPedidoWhatsApp").attr("data-link-pedido", linkPedido);
                $("#linkPedidoWhatsApp").click(function () {
                    window.open(linkPedido, '_blank');
                });
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao gerar o pdf do pedido de compra", JSON.parse(response.responseText));
            vError = true;
        }
    });

    //BUSCA OS DADOS DO FORNECEDOR
    await $.ajax({
        type: "POST",
        url: "/PedidoCompra/GetFornecedor",
        data: { pCDFornecedor: fornecedorPedido },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do fornecedor para envio do whatsapp", response.msg);
                vError = true;
            }
            else {
                var FORNECEDOR = response[0];
                razaoSocialFornecedor = FORNECEDOR.DS_RAZAO_SOCIAL;
                nomeFantasiaFornecedor = FORNECEDOR.DS_FANTASIA;
                whatsAppFornecedor = (FORNECEDOR.CD_DDI_WHATSAPP == null ? "" : FORNECEDOR.CD_DDI_WHATSAPP).toString() +
                    (FORNECEDOR.CD_DDD_WHATSAPP == null ? "" : FORNECEDOR.CD_DDD_WHATSAPP).toString() +
                    (FORNECEDOR.NR_WHATSAPP == null ? "" : FORNECEDOR.NR_WHATSAPP).toString();
                $("#fornecedorContatoWhatsApp").text(`Fornecedor: ${FORNECEDOR.DS_RAZAO_SOCIAL + (contato == null ? "" : " | Contato: " + contato)}`);
            }
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao buscar os dados do fornecedor para envio do whatsapp", JSON.parse(response.responseText));
            vError = true;
        }
    });

    CloseProcessPanel();
    if (vError == true) return;

    //CONFIGURA O NÚMERO DO WHATSAPP
    if (whatsAppFornecedor != null) {
        vTxt_Telefone_WhatsApp.option("value", whatsAppFornecedor);
    }

    //CONFIGURA O CORPO DO WHATSAPP
    if (getComponentValue(vTxt_Configuracao_Corpo_WhatsApp, "dxTextBox") == null) {
        vTxt_Mensagem_WhatsApp.option("value", `Segue link para o pedido de compra - #${pNRPedido}\n${linkPedido}`);
    }
    else {
        var corpo = getComponentValue(vTxt_Configuracao_Corpo_WhatsApp, "dxTextBox");
        corpo = corpo.replaceAll("[Empresa]", nomeEmpresa);
        corpo = corpo.replaceAll("[Pedido]", pNRPedido);
        corpo = corpo.replaceAll("[FilialR]", razaoSocialFilial);
        corpo = corpo.replaceAll("[FilialF]", nomeFantasiaFilial);
        corpo = corpo.replaceAll("[Comprador]", nomeComprador);
        corpo = corpo.replaceAll("[FornecedorR]", razaoSocialFornecedor);
        corpo = corpo.replaceAll("[FornecedorF]", nomeFantasiaFornecedor);
        corpo = corpo.replaceAll("[LinkPedido]", linkPedido);
        vTxt_Mensagem_WhatsApp.option("value", corpo);
    }

    $("#btnEnviarWhatsApp").prop("onclick", null).off("click");
    $("#btnEnviarWhatsApp").on("click", function () { IniciaConversaWhatsApp(pNRPedido); });

    AbrirModal("ModalEnvioWhatsApp");
}

function IniciaConversaWhatsApp(pNRPedido) {

    var celular = getComponentValue(vTxt_Telefone_WhatsApp, "dxTextBox");
    var texto = getComponentValue(vTxt_Mensagem_WhatsApp, "dxTextBox");

    texto = window.encodeURIComponent(texto);

    window.open("https://api.whatsapp.com/send?phone=" + celular + "&text=" + texto, "_blank");

    FecharModal("ModalEnvioWhatsApp");

    //ALTERA O PEDIDO INDICANDO QUE O WHATSAPP FOI ENVIADO
    let dataUpdate = [
        { id: "CD_EMPRESA", value: null, isKey: true },
        { id: "NR_PEDIDO", value: pNRPedido, isKey: true },
        { id: "LG_WHATSAPP_PEDIDO_ENVIADO", value: true, isKey: false },
        { id: "DS_WHATSAPP_FORNECEDOR", value: getComponentValue(vTxt_Telefone_WhatsApp, "dxTextBox"), isKey: false },
        { id: "CD_LOGIN_ENVIO_ULTIMO_WHATSAPP", value: null, isKey: false },
        { id: "DT_ENVIO_ULTIMO_WHATSAPP", value: null, isKey: false },
    ];

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/AlterarPedidoCompraEnvioWhatsApp",
        data: { dataUpdate: JSON.stringify(dataUpdate) },
        success: function (response) {
            if (response.result == "Erro") {
                ExibeMensagem("error", "Ocorreu um erro ao marcar o pedido de compra como whatsapp enviado", response.msg);
            }
            else {
                ExibeMensagem("success", "Operação realizada", "Enviado com sucesso");
            }
            CarregaPedidoCompra();
        },
        failure: function (response) {
            ExibeMensagem("error", "Ocorreu um erro ao marcar o pedido de compra como whatsapp enviado", JSON.parse(response.responseText));
        }
    });
}

function SalvarPedidoCompraCondicao() {
    if (vLoading == true) { return };

    var deferred = new $.Deferred;

    let condicao = [];

    //BUSCA OS REGISTROS DO GRID
    vGridFormaPagamento.getDataSource().store().load().done((allData) => {
        condicao = allData;
    });

    $.ajax({
        type: "POST",
        url: "/PedidoCompra/SalvarPedidoCompraCondicao",
        data: { pNRPedido: objPedido.numero, data: JSON.stringify(condicao) },
        success: function (response) {
            if (response.result == "Erro") {
                deferred.reject(response.msg);
            }
            else {
                deferred.resolve(response.msg);
            }
        },
        failure: function (response) {
            deferred.reject(JSON.parse(response.responseText));
        }
    });

    return deferred.promise();
}

function getComponentValue(component, type) {

    var value = component.option("value");

    if (value != null) {
        if (type == "dxTagBox") {
            if (value?.length > 0) {
                value = value.join(",")
            }
            else {
                value = null;
            }
        }
    }

    return value;
}

function isNull(pObj, pObjRetorno) {
    return pObj == null ? pObjRetorno : pObj;
}

function OpenProcessPanel(pProcesso) {
    if (vProcessing == true) return;

    vProcessing = true;

    ProcessPanel = $("#ProcessPanel").dxLoadPanel({
        shadingColor: "rgba(0,0,0,0.4)",
        message: pProcesso,
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        hideOnOutsideClick: false,
    }).dxLoadPanel("instance");

    ProcessPanel.show();
}

function CloseProcessPanel() {
    ProcessPanel.hide();
    vProcessing = false;
}

function round(pNumber, pDecimals) {
    return parseFloat(Math.round(pNumber * Math.pow(10, pDecimals)) / Math.pow(10, pDecimals)).toFixed(pDecimals);
}

function formataNumero(pValor, pMinCasasDecimais, pMaxCasasDecimais) {
    const options = { style: "decimal", minimumFractionDigits: pMinCasasDecimais, maximumFractionDigits: pMaxCasasDecimais }
    return new Intl.NumberFormat("pt-BR", options).format(pValor);
}

Date.prototype.yyyyMMdd = function () {
    var m = this.getMonth() + 1; // getMonth() is zero-based
    var d = this.getDate();

    return [this.getFullYear(), "-" + (m > 9 ? "" : "0") + m, "-" + (d > 9 ? "" : "0") + d].join("");
};

Date.prototype.ddMMyyyy = function () {
    var m = this.getMonth() + 1; // getMonth() is zero-based
    var d = this.getDate();

    return [(d > 9 ? "" : "0") + d, "/" + (m > 9 ? "" : "0") + m, "/" + this.getFullYear()].join("");
};

Date.prototype.ddMMyyyyHHmm = function () {
    const options = { hour: "numeric", minute: "numeric", hour12: false, timeZone: 'America/Sao_Paulo', day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("pt-BR", options).format(this).replace(",", "");
};

function gerarParcelas(valorTitulo,
    qtParcelas,
    //primeiroVencimento,
    isDiferencaUltimaParcela = true,
    periodo = 30,
    isDiaFixo = false) {

    const qtParcelasComValor = qtParcelas / 100 >= valorTitulo ? valorTitulo * 100 : qtParcelas;

    const parcelaGeral = valorTitulo / qtParcelasComValor;
    const parcelaGeralFormatada = Math.floor((parcelaGeral < 0.01 ? 0.01 : parcelaGeral) * 100) / 100;
    const diferencaTotal = parseFloat((valorTitulo - (parcelaGeralFormatada * qtParcelasComValor)).toFixed(2));
    const parcelaDiferenca = parseFloat((parcelaGeralFormatada + diferencaTotal).toFixed(2));
    const indexParcelaDiferenca = isDiferencaUltimaParcela ? qtParcelasComValor - 1 : 0;

    const porcentagemGeral = Math.floor(((parcelaGeralFormatada / valorTitulo) * 100) * 1000) / 1000;
    const porcentagemDiferenca = parseFloat((100 - (porcentagemGeral * qtParcelasComValor)).toFixed(3));
    const porcentagemParcelaDiferenca = parseFloat((porcentagemGeral + porcentagemDiferenca).toFixed(3));
    const diaFixoAtivo = periodo == 30 && isDiaFixo;
    const diaOuMes = diaFixoAtivo ? 'month' : 'day';

    const parcelas = new Array(qtParcelas).fill().map((a, index) => {
        const id = index + 1;
        index = index + 1;

        //const dataVencimento = moment(primeiroVencimento).add(diaFixoAtivo ? index : index * periodo, diaOuMes).toDate();
        a = {
            id: id,
            CD_EMPRESA: vCDEmpresa,
            NR_PEDIDO: objPedido.numero,
            NR_DIAS: index * periodo,
            VL_PARCELA: parcelaGeralFormatada,
            PC_PARCELA: porcentagemGeral,
        };

        return a;
    })

    if (qtParcelasComValor >= 1) {
        Object.assign(parcelas[indexParcelaDiferenca], {
            VL_PARCELA: parcelaDiferenca,
            PC_RATEIO: porcentagemParcelaDiferenca,
        })
        if (qtParcelas - qtParcelasComValor > 0) {
            const qtRemocao = -(qtParcelas - qtParcelasComValor);
            const parcelasZeradas = parcelas.slice(qtRemocao).map(a => {
                a.VL_PARCELA = 0;
                a.PC_RATEIO = 0;
                return a;
            });
            parcelas.splice(qtRemocao, parcelas.length);
            parcelas.push(...parcelasZeradas)
        }
    }

    return parcelas;
}

function verificaDiferencaParcelas(comp, valorPedido) {

    var valorParcelado = 0;
    var diferenca = 0;

    valorParcelado = comp.getTotalSummaryValue('VL_PARCELA');

    diferenca = valorParcelado - valorPedido;
    diferenca = parseFloat(diferenca.toFixed(2));

    if (diferenca !== 0 && valorParcelado > 0) {

        if (diferenca < 0) {
            $('#menTextoDiferencaParcelas').hide().text('DIFERENÇA (-)').fadeIn(200);
            $('#alertDiferencaParcelas').removeClass('alert-warning').addClass('alert-danger');
        } else {
            $('#menTextoDiferencaParcelas').hide().text('DIFERENÇA (+)').fadeIn(200);
            $('#alertDiferencaParcelas').removeClass('alert-danger').addClass('alert-warning');
        }
        $('#menValorDiferencaParcelas').hide().text(diferenca.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })).fadeIn(200);

        document.getElementById("alertDiferencaParcelas").style.display = 'block';

        return true;
    } else {
        document.getElementById("alertDiferencaParcelas").style.display = 'none';

        return false;
    };
}

function CarregaCondicaoPedido() {
    var deferred = new $.Deferred;

    var allowEdit = !(objPedido.codigoSituacao != "1" || (objUsuarioParametroCompra.LG_INCLUI_PEDIDO == false && objUsuarioParametroCompra.NR_NIVEL_ACESSO == 0))
    vGridFormaPagamento.option("editing.allowAdding", allowEdit);
    vGridFormaPagamento.option("editing.allowUpdating", allowEdit);
    vGridFormaPagamento.option("editing.allowDeleting", allowEdit);

    if (allowEdit) {
        $("#btnAdicionarParcela").show()
        $("#btnExcluirTodasParcelas").show()
    } else {
        $("#btnAdicionarParcela").hide()
        $("#btnExcluirTodasParcelas").hide()
    }

    GetAzureDataSource(63, '{ NR_PEDIDO: ' + objPedido.numero + ' }').then((result) => {
        if (result.success) {
            vGridFormaPagamento.loadData(result.data);
            vGridFormaPagamento.refreshIds();
            verificaDiferencaParcelas(vGridFormaPagamento, objPedido.valorTotal);
            deferred.resolve();
        }
        else {
            ExibeMensagem("error", "Ocorreu um erro ao carregar o parcelamento do pedido de compra", `${result.name}: ${result.error}`);
            console.error(`${result.name}: ${result.error}`);
            deferred.reject();
        }
    });

    return deferred.promise();
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//TÉRMINO FUNÇÕES
///////////////////////////////////////////////////////////////////////////////////////////////////

//OBSERVAÇÃO:
//AO DISPARAR O EVENTO ONCHANGE DO DXDATAGRID (QUANDO O USUÁRIO CLICA NA MESMA LINHA MAS EM OUTRA CÉLULA)
//OCORRE O SEGUINTE ERRO:
//Uncaught TypeError: Cannot read properties of undefined (reading 'value')
//at HTMLTableCellElement.handler(jquery.js: 5467: 21)
//at HTMLTableCellElement.dispatch(jquery.js: 5237: 27)
//at elemData.handle(jquery.js: 5044: 28)
//at Object.trigger(jquery.js: 8471: 12)
//at HTMLTableCellElement.<anonymous>(jquery.js: 8549: 17)
//at Function.each(jquery.js: 367: 19)
//at jQuery.fn.init.each(jquery.js: 202: 17)
//at jQuery.fn.init.trigger(jquery.js: 8548: 15)
//at Object.trigger(dx.all.js: 9: 407808)
//at Object.<anonymous>(dx.all.js: 9: 47661)

//O PROBLEMA OCORRE NO JQUERY 3.5.1 E JÁ FOI CORRIGIDO NO 3.6.0 SEGUNDO O LINK ABAIXO
//https://supportcenter.devexpress.com/ticket/details/t1097968/datagrid-setting-cellvalue-through-tab-save-in-batch-mode-causes-typeerror

//PARA CORRIGIR SEM ATUALIZAR O JQUERY, MARCAR COMO "TRUE" A PROPRIEDADE REPAINTCHANGESONLY
//EX: repaintChangesOnly: true