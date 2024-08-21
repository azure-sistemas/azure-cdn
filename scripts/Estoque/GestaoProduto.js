//#region [ VARIÁVEIS ]

class classParametrosEmpresa {
    CD_EMPRESA;
    DS_NOME_EMPRESA;
    CD_SEGMENTO;
    LG_DESCADASTRADO_PESQUISA_PRECO;
    LG_COD_PRODUTO_AUTOMATICO;
    PC_SOBRE_PRECO_VENDEDOR;
    PC_SOBRE_PRECO_GERENTE;
    PC_SOBRE_PRECO_DIRETORIA;
    PC_SOBRE_PRECO_FINANCEIRO;
    QT_DECIMAIS_COMPRA;
    QT_DECIMAIS_VENDA;
}

class classProduto {
    OPERACAO;
    CD_PRODUTO;
    CD_FILIAL_PRECIFICACAO;
    LG_RADAR_PRECO_VALIDADO;
    VL_CUSTO_LIQUIDO_RADAR_PRECO;
    VL_CUSTO_TOTAL_RADAR_PRECO;
    VL_PRECO_VENDA_RADAR_PRECO;
}

class classUsuario {
    CD_EMPRESA;
    CD_LOGIN;
    DS_NOME;
    NR_NIVEL_ACESSO;
    LG_PERMITE_CADASTRO_PRODUTO;
    LG_PERMITE_MANUTENCAO_MANUAL;
    LG_PERMITE_MANUTENCAO_VIA_PLANILHA;
    LG_POSSUI_ACESSO_MODULO;
    LG_EXIBE_BANNER_CURSO_PRECIFICACAO;
}

let objClassParametrosEmpresa = new classParametrosEmpresa();
let objClassProduto = new classProduto();
let objClassUsuario = new classUsuario();
let COMPONENTES = [];
let processPanel;
let callerShowProcessPanel = '';
let vLoading = false;
let componenteBotaoNumberBoxInclusao;
let componenteBotaoNumberBox;
let resultValidacaoCadastro;
let vSuprimeConfiguracaoIndicadoresCadastro = false;
let vSuppressOnChange = false;
let callerSuppressOnChange = '';
let aplicacaoAnterior = "";

//CAMPOS DA ABA DADOS GERAIS
let vCamposDadosGeraisCriados = false;
let vLkp_Filtro_Pesquisa_Produtos;
let vLkp_Fornecedor_Padrao;
let vDbx_Familias;
let vTag_Almoxarifados_Inclusao;
let vGridConsultaProdutos;
let vLkp_Origem_Produto;
let vLkp_Unidade_Medida_Compra;
let vLkp_Unidade_Medida_Venda;
let vLkp_Tipo_Produto_SPED;
let vLkp_Situacao_Tributaria_Inclusao;
let vLkp_Situacao_Tributaria_PIS_Inclusao;
let vLkp_Situacao_Tributaria_COFINS_Inclusao;
let vDbx_Dt_Cadastro;
let vDbx_Dt_Atualizacao;
let vTxt_Cd_Login_Inclusao;
let vChk_Encomenda;
let vLkp_Status_Produto;
let vLkp_Fora_Linha;
let vLkp_Operador_Conversao;
let vLkp_Operador_Conversao_Exportacao;
let vNbx_Fator_Conversao;
let vTxt_Cd_Unidade_Tributacao_Exportacao;
let vTxt_Cd_EAN_Tributacao_Exportacao;
let vNbx_Fator_Conversao_Exportacao;
let vTxt_Cd_Produto;
let vTxt_Cd_EAN_Produto;
let vNbx_Qt_Multiplo_Compra;
let vNbx_Ps_Produto_Compra;
let vNbx_Ps_Produto_Venda;
let vTxt_Cd_Fabricante;
let vTxt_Cd_Original;
let vTxt_Cd_Opcional;
let vNbx_Cd_NCM;
let vNbx_Cd_CEST;
let vTxt_Nr_FCI;
let vTxt_Ds_Aplicacao;
let vTxt_Ds_Marca_Aplicacao;
let vTxt_Ds_Modelo_Aplicacao;
let vNbx_Nr_Ano_Inicial_Aplicacao;
let vNbx_Nr_Ano_Final_Aplicacao;
let vLkp_Separador_Aplicacao;
let vChk_Lg_Kit;
let vChk_Lg_Kit_Movimento_Estoque_Producao;
let vChk_Lg_Kit_Venda_Diversas_Unidades_Medida;
let vChk_Lg_Controla_Lote;
let vChk_Lg_Controla_Validade_Lote;
let vChk_Lg_Reaproveita_Lote;
let vChk_Lg_Informa_Lote_Fabricante;
let vChk_Lg_Imprime_Lote_Etiqueta;
let vChk_Lg_Pneu;
let vChk_Lg_Utiliza_Ordem_Servico_Producao;
let vChk_Lg_Obrigatorio_Detalhes_Producao_Pedido;
let vChk_Lg_Permite_Informar_Quantidade_Conferencia;
let vChk_Lg_Preco_Definido_Na_Venda;
let vChk_Lg_Exibir_Cod_Fabricante_Obs_NF;
let vChk_Lg_Venda_Somente_PF;
let vChk_Lg_Venda_Somente_PJ;
let vNbx_Qt_Maxima_Pedido_Venda_Mes;
let vChk_Lg_Bloquear_Impressao_Etiqueta_Recebimento;
let vChk_Lg_Bloquear_Escrituracao_SPED;
let vNbx_IPI_Venda;
let vNbx_Nr_Dias_Garantia;
let vChk_Lg_Exige_Pedido_Venda_Devolucao;
let vTxt_Cd_Ativo;
let vTxt_Cd_Modelo;
let vTxt_Cd_Serie;
let vTxt_Ds_Pressao_Potencia;
let vTxt_Ds_Vazao;
let vTxt_Ds_Consumo;
let vTxt_Ds_Capacidade;
let vChk_Lg_Combustivel_Solvente;
let vLkp_Grandeza;
let vNbx_Qt_Medida_Grandeza;
let vNbx_Cd_Caracteristica_Fisico_Quimica_ANP;
let vNbx_Cd_Metodo_Afericao_Caracteristica;
let vNbx_Vl_Caracteristica;
let vNbx_Qt_Massa_Especifica;
let vTag_Filiais_Precificacao_Inclusao;
let vDbx_Dt_Vigencia_Inclusao;
let vNbx_Vl_Custo_Bruto_Inclusao;
let vTgx_Descontos_Inclusao;
let vNbx_Pc_Desconto_Total_Inclusao;
let vNbx_Pc_Custo_Frete_Inclusao;
let vNbx_Vl_Custo_Liquido_Inclusao;
let vNbx_Pc_Custo_IPI_Inclusao;
let vNbx_Pc_Custo_ST_Inclusao;
let vNbx_Pc_Custo_Outros_Custos_Inclusao;
let vNbx_Vl_Custo_Total_Inclusao;
let vNbx_Pc_Lucro_Inclusao;
let vNbx_Pc_Rentabilidade_Inclusao;
let vNbx_Vl_Preco_Minimo_Venda_Inclusao;
let vBtn_Salvar;
let vChk_Lg_Replicar_Precos_Entre_Filiais
let vChk_Lg_Replicar_Dados_Fiscais_Entre_Filiais
let vChk_Lg_Replicar_Regras_Comerciais_Entre_Filiais
let vChk_Aplicar_Precos_Todas_Filiais
let vBtn_Aderir_Pesquisa_Eletronica;
let vChk_Confirmacao_Leitura_Pesquisa_Eletronica;
let vListPendenciasCadastro;
let vLkp_Status_Produto_Consulta;

//CAMPOS DA ABA PRECIFICAÇÃO
let vCamposPrecificacaoCriados = false;
let listFiliaisPrecificacao;
let vDbx_Dt_Vigencia;
let vNbx_Vl_Custo_Bruto;
let vTgx_Descontos;
let vNbx_Pc_Desconto_Total;
let vNbx_Pc_Custo_Frete;
let vNbx_Vl_Custo_Liquido;
let vNbx_Pc_Custo_IPI;
let vNbx_Pc_Custo_ST;
let vNbx_Pc_Custo_Outros_Custos;
let vNbx_Vl_Custo_Total;
let vNbx_Pc_Lucro;
let vNbx_Pc_Lucro_Referencia;
let vNbx_Pc_Rentabilidade;
let vNbx_Vl_Preco_Minimo_Venda;
let vNbx_Cd_NCM_Aba_Preco;
let vNbx_Cd_CEST_Aba_Preco;
let vTxt_Nr_FCI_Aba_Preco;
let vNbx_Pc_PIS;
let vNbx_Pc_COFINS;
let vNbx_Pc_PIS_Aba_Preco;
let vNbx_Pc_COFINS_Aba_Preco;
let vTxt_Cd_Beneficio_Fiscal_Aba_Preco;
let vNbx_Pc_Carga_Tributaria_Aba_Preco;
let vNbx_Pc_Desconto_Maximo_Aba_Preco;
let vNbx_Pc_Comissao_Venda_Aba_Preco;
let vNbx_Pc_Comissao_Fretista_Aba_Preco;
let vNbx_Qt_Multiplo_Venda_Aba_Preco;
let vNbx_Qt_Embalagem_Aba_Preco;
let vChk_Lg_Somente_Vendido_Multiplos_Aba_Preco;
let vChk_Lg_Calcular_Volumes_Venda_Expedicao_Aba_Preco;
let vChk_Lg_Aceita_Vendas_Estoque_Negativo_Aba_Preco;
let vChk_Lg_Bloqueia_Atualizacao_Preco_Custo_Venda_Recebimento;
let vGridHistoricoPrecos;
let vGridTabelasPrecos;
let vGridTabelasConsultaAbaPrecos;
let vLkpTabelasPrecosConsultaGeral;
let vTxt_Ds_Tabela_Preco_Aba_Preco;
let vLkp_Tipos_Tabelas_Aba_Preco;
let vNbx_Pc_Padrao;
let vLkp_Aplicacao_Produtos_Tabelas_Aba_Preco;
let vLkp_Status_Tabela_Aba_Preco;
let vLkp_Situacao_Tributaria_Aba_Preco;
let vLkp_Situacao_Tributaria_PIS_Aba_Preco;
let vLkp_Situacao_Tributaria_COFINS_Aba_Preco;

let tabelaPreco;
let tabelaPrecoAplicacao;
let btnHabilitarExclusaoProdutoTabelaAplicacao = true;
let btnHabilitarAlteracaoProdutoTabelaAplicacao = true;
let tabelaPrecoTipo;
let tabelaPrecoClientesCarregados = false;
let tabelaPrecoProdutosECommerceCarregados = false;

//CAMPOS DE PERMISSÕES AVANÇADAS
var vCamposPermissoesCriados = false;
var oLkpUsuarioConfiguracoes = null;
var oChkCadastroProduto = null;
var oChkManutencaoManual = null;
var oChkManutencaoViaPlanilha = null;

//CAMPOS DE CONFIGURAÇÕES GERAIS
var vCamposConfiguracoesCriados = false;
var oNbxQtdeDecimaisVenda = null;
var oNbxQtdeDecimaisCompra = null;
var oTxtFormulaMediaVenda = null;
var oChkAutoNumProduto = null;
var oChkAlteraPrecoCusto = null;
var oChkAlteraPrecoVenda = null;
var oChkAlteraVendaQuandoMaior = null;
var oChkUtilizaLucroReferencia = null;
var oChkVisualizaPrecoEntrada = null;
var oChkControlaVencimentoLote = null;
var oChkInibiProdutoIncluidoCaixaViaSeparacao = null;
var oChkInibiProdutoIncluidoCaixaModuloConferencia = null;
var oLkpFiliaisParametros = null;
var oNbxDiaLimiteManutencaoPreco = null;
var oChkPermiteAlterarFoto = null;
var oChkSomenteGerenteAlteraFoto = null;
var oChkSomenteGerenteExcluiFoto = null;
var oChkExibeFotoProdutoPedido = null;
var oTxtCaminhoFotoArquivo = null;
var oTxtFiltroFoto = null;

let dataSourceProdutoFiltro = [];
let dataSourceFiliaisAcesso = [];
let dataSourceSituacaoTributaria = [];
let dataSourceSituacaoTributariaPIS = [];
let dataSourceSituacaoTributariaCOFINS = [];

let dataSourceStatus = [
    { CD_STATUS: 'A', DS_STATUS: "Ativo" },
    { CD_STATUS: 'I', DS_STATUS: "Inativo" },
];

let dataSourceForaLinha = [
    { LG_FORA_LINHA: false, DS_FORA_LINHA: "Em linha" },
    { LG_FORA_LINHA: true, DS_FORA_LINHA: "Fora de Linha" },
];

let dataSourceOperadorConversao = [
    { CD_OPERADOR: '*', DS_OPERADOR: "Multiplicar" },
    { CD_OPERADOR: '/', DS_OPERADOR: "Dividir" },
    { CD_OPERADOR: '-', DS_OPERADOR: "Subtrair" },
    { CD_OPERADOR: '+', DS_OPERADOR: "Somar" },
];

let dataSourceSeparadorAplicacao = [
    { CD_SEPARADOR: " ", DS_SEPARADOR: "espaço" },
    { CD_SEPARADOR: "/", DS_SEPARADOR: "/" },
    { CD_SEPARADOR: "|", DS_SEPARADOR: "|" },
    { CD_SEPARADOR: "-", DS_SEPARADOR: "-" },
    { CD_SEPARADOR: ":", DS_SEPARADOR: ":" },
    { CD_SEPARADOR: ";", DS_SEPARADOR: ";" },
    { CD_SEPARADOR: "#", DS_SEPARADOR: "#" },
    { CD_SEPARADOR: "*", DS_SEPARADOR: "*" },
];

let dataSourceGrandeza = [
    { CD_GRANDEZA: "1", DS_GRANDEZA: "Massa (KG)" },
    { CD_GRANDEZA: "2", DS_GRANDEZA: "Volume (LT)" },
];

let dataSourceFiltroConsultaDetalhada = [
    { CD_STATUS: 'A', DS_STATUS: "Ativos" },
    { CD_STATUS: 'I', DS_STATUS: "Inativos" },
    { CD_STATUS: null, DS_STATUS: "Todos" },
];

let dataSourceCamposInclusaoProdutosTabelaPreco = [
    { CD_CAMPO: 'VL_PRECO_TABELA', DS_CAMPO: "Preço da Tabela" },
    { CD_CAMPO: 'PC_DIFERENCA_PRECO_PADRAO', DS_CAMPO: "% Desc(-) Acrésc(+)" },
    { CD_CAMPO: 'PC_RENTABILIDADE_TABELA', DS_CAMPO: "% Rentabilidade" },
];

let dataSourceAplicacaoProdutosTabelas = [
    { CD_APLICACAO_PRODUTOS: 'S', DS_APLICACAO_PRODUTOS: "Vou escolher quais produtos serão incluídos nesta tabela" },
    { CD_APLICACAO_PRODUTOS: 'T', DS_APLICACAO_PRODUTOS: "Incluir todos os produtos nesta tabela" },
];

let dataSourceTiposTabelas = [
    { CD_TIPO_TABELA: 'P', DS_TIPO_TABELA: "Percentuais de desconto ou acréscimos diferentes para cada produto" },
    { CD_TIPO_TABELA: 'R', DS_TIPO_TABELA: "Rentabilidade fixa para todos os produtos da tabela" },
    { CD_TIPO_TABELA: 'D', DS_TIPO_TABELA: "Desconto fixo para todos os produtos da tabela" },
    { CD_TIPO_TABELA: 'A', DS_TIPO_TABELA: "Acréscimo fixo para todos os produtos da tabela" },
];

//#endregion [ VARIÁVEIS ]

$(document).ready(async function inicio() {
    showProcessPanel("Carregando...", arguments.callee.name);
    vLoading = true;
    suppressOnChange(true, arguments.callee.name);

    FormatButtons();

    await Promise.all([
        GetParametrosGerais(),
        carregaPermissoesUsuarioLogado(),
    ]);

    await iniciaModuloGestaoProduto();

    //********************************************************
    //********************************************************
    //REMOVER A CHAMADA DA FUNÇÃO ABAIXO DEPOIS DOS TESTES

    await cadastroProdutos()

    //********************************************************
    //********************************************************

    suppressOnChange(false, arguments.callee.name);
    vLoading = false;
    hideProcessPanel(arguments.callee.name);
});

//#region [ FUNÇÕES ]

//******************************************
// DADOS GERAIS
//******************************************
async function criaCamposDadosGerais() {
    await Promise.all([
        Load_Azr_Lookup_FornecedorV2('lkp_Fornecedor_Padrao', COMPONENTES, 1, 'Fornecedor Padrão *', 'Fornecedor Padrão *').then(() => {
            vLkp_Fornecedor_Padrao = DevExpress.ui.dxLookup.getInstance('#lkp_Fornecedor_Padrao');
            $('#lkp_Fornecedor_Padrao').dxValidator({
                validationRules: [{
                    type: 'required', message: 'Fornecedor Padrão obrigatório',
                }], validationGroup: 'DadosGerais'
            });
        }),

        Load_Azr_TagBox_Almoxarifado(COMPONENTES, "tag_Almoxarifados_Inclusao", 'A', "Almoxarifado não identificado", "Almoxarifados em que o Produto está disponível *").then(function (e) {
            vTag_Almoxarifados_Inclusao = DevExpress.ui.dxTagBox.getInstance('#tag_Almoxarifados_Inclusao');
            $('#tag_Almoxarifados_Inclusao').dxValidator({});
        }),

        //Consulta de Produtos Simplificada
        GetAzureDataSource(29).then((result) => {

            if (result.success) {
                dataSourceProdutoFiltro = result.data;

                vLkp_Filtro_Pesquisa_Produtos = $('#lkp_Filtro_Pesquisa_Produtos').dxLookup({
                    dataSource: dataSourceProdutoFiltro,
                    searchExpr: ['DS_PRODUTO_PESQUISA'],
                    displayExpr: 'DS_PRODUTO_PESQUISA',
                    valueExpr: 'CD_PRODUTO',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Filtro de Produtos',
                    },
                    placeholder: 'Selecione um Produto para edição',
                    showClearButton: true,
                    onValueChanged(e) {
                        if (e.value) {
                            CarregaProdutoAlteracao(e.value);
                        }
                    },
                }).dxLookup("instance");
            }
            else {
                exibeMensagem("error", result.name, result.error);
            }
        }),

        //Tipos de Produtos SPED
        GetAzureDataSource(53).then((result) => {

            if (result.success) {

                vLkp_Tipo_Produto_SPED = $('#lkp_Tipo_Produto_SPED').dxLookup({
                    dataSource: result.data,
                    searchExpr: ['DS_TIPO_PRODUTO_SPED'],
                    displayExpr: 'DS_TIPO_PRODUTO_SPED',
                    valueExpr: 'CD_TIPO_PRODUTO_SPED',
                    value: '',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Tipo de Produto',
                    },
                    labelMode: 'floating',
                    label: 'Tipo de Produto',
                    placeholder: 'Tipo de Produto',
                    showClearButton: true,
                }).dxLookup("instance");
            }
            else {
                exibeMensagem("error", result.name, result.error);
            }
        }),

        //Consulta de Produtos Detalhada (Grid de Consulta Geral Detalhada)
        vGridConsultaProdutos = $("#gridConsultaProdutos").dxDataGrid({
            dataSource: null,
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: { mode: "multiple" },
            selection: {
                mode: 'single',
            },
            focusedRowEnabled: true,
            allowColumnResizing: true,
            allowColumnReordering: true,
            groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
            paging: { pageSize: 15 },
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
                var worksheet = workbook.addWorksheet('Produtos');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ConsultaGeralProdutos.xlsx');
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
            columnChooser: {
                enabled: true,
                allowSearch: true,
                height: 500,
                position: {
                    my: 'right top',
                    at: 'right bottom',
                    of: '.dx-datagrid-column-chooser-button',
                },
            },
            columnsAutoWidth: true,
            keyExpr: 'CD_PRODUTO',
            showBorders: true,

            columns: [
                {
                    dataField: "LG_FORA_LINHA",
                    caption: "Fora Linha",
                    width: 40,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: 'center',
                    allowHeaderFiltering: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_PRODUTO",
                    caption: "Código Interno",
                    width: 100,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_PRODUTO",
                    caption: "Descrição Produto",
                    allowEditing: false,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_STATUS",
                    caption: "Status",
                    width: 75,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "VL_PRECO_MINIMO_VENDA",
                    caption: "Vl. Preço Venda",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_FABRICANTE",
                    caption: "Código do Fabricante",
                    width: 100,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "DS_MARCA",
                    caption: "Marca",
                    width: 100,
                    allowEditing: false,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_FORNECEDOR",
                    caption: "Código Fornecedor",
                    //width: 100,
                    allowEditing: false,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    alignment: 'center',
                    visible: false,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_RAZAO_SOCIAL",
                    caption: "Fornecedor Padrão (Razão Social)",
                    width: 220,
                    allowEditing: false,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    visible: true,
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_FANTASIA_FORNECEDOR",
                    caption: "Fornecedor Padrão (Fantasia)",
                    width: 220,
                    allowEditing: false,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    visible: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_CURVA_ABC",
                    caption: "A B C",
                    width: 55,
                    allowEditing: false,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    visible: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                }, {
                    dataField: "DS_FAMILIA",
                    caption: "Família",
                    width: 150,
                    allowEditing: false,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    visible: true,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_ORIGINAL",
                    caption: "Código Original",
                    width: 100,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_OPCIONAL",
                    caption: "Código Opcional",
                    width: 100,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_EAN_PRODUTO",
                    caption: "Código Barras",
                    width: 100,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_INTERNO_PRODUTO_FORNECEDOR",
                    caption: "Código Interno Fornecedor",
                    width: 100,
                    allowEditing: false,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    visible: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_NCM",
                    caption: "NCM",
                    width: 100,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                }, {
                    dataField: "CD_CEST",
                    caption: "CEST",
                    width: 100,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "DT_ULTIMA_COMPRA",
                    caption: "Dt. Última Compra",
                    width: 90,
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "VL_ULTIMA_COMPRA",
                    caption: "Vl. Última Compra",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                },

                {
                    dataField: "VL_CUSTO_BRUTO",
                    caption: "Vl. Custo Bruto",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_DESCONTO_FORNECEDOR_TOTAL",
                    caption: "% Desc. Fornecedor",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "VL_CUSTO_LIQUIDO",
                    caption: "Vl. Custo Líquido",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_IPI_CUSTO",
                    caption: "% Custo IPI",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_IVA",
                    caption: "% Custo ST",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_FRETE_COMPRA",
                    caption: "% Custo Frete",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "VL_FRETE_COMPRA",
                    caption: "Vl. Custo Frete",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_DESPESAS_DIVERSAS",
                    caption: "% Despesas Gerais",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "VL_CUSTO_TOTAL",
                    caption: "Vl. Custo Total",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_LUCRO",
                    caption: "% Lucro",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: true,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_LUCRO_REFERENCIA",
                    caption: "% Lucro Referência",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_MARKUP",
                    caption: "% Rentab.",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_DESCONTO_MAXIMO",
                    caption: "% Desc. Máximo",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.00",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "DT_VIGENCIA",
                    caption: "Vigência Preço",
                    width: 90,
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "QT_EMBALAGEM_VENDA",
                    caption: "Qt. Embalagem",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.###",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "QT_MULTIPLO_VENDA",
                    caption: "Qt. Múltiplo Venda",
                    width: 75,
                    dataType: "number",
                    format: "###,###,###,##0.###",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    visible: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "LG_SOMENTE_MULTIPLO",
                    caption: "Venda Somente em Múltiplo",
                    width: 95,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_SITUACAO_TRIBUTARIA",
                    caption: "CST Código Interno",
                    width: 95,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_SITUACAO_TRIBUTARIA_NFE",
                    caption: "CST",
                    width: 75,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_SITUACAO_TRIBUTARIA_NFE_SIMPLES",
                    caption: "CST Simples",
                    width: 95,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    visible: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
            ],

            onCellPrepared: function (e) {

                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }
                    if (e.column.dataField === "LG_FORA_LINHA") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                        e.cellElement.css("color", "white");
                    }
                }
            },

            onCellDblClick: function (e) {
                if (e.rowType === "data") {
                    //Verifica se a consulta está expandida eu se está reduzida na lateral.
                    //Caso esteja na lateral, os dados serão carregados sem fechar a tela de consulta

                    if (document.getElementById("cardPrincipal").style.display === 'none') {
                        closeConsultaProdutosPanel();
                    }

                    vLkp_Filtro_Pesquisa_Produtos.option("dataSource", dataSourceProdutoFiltro);
                    vLkp_Filtro_Pesquisa_Produtos.option("value", null);
                    vLkp_Filtro_Pesquisa_Produtos.option("value", e.data.CD_PRODUTO);
                }
            },

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxLookup',
                        options: {
                            dataSource: dataSourceFiltroConsultaDetalhada,
                            searchExpr: ['DS_STATUS'],
                            displayExpr: 'DS_STATUS',
                            valueExpr: 'CD_STATUS',
                            value: 'A',
                            hint: 'Filtro de Produtos por Status',
                            width: 80,
                            elementAttr: {
                                id: "lkp_Status_Produto_Consulta",
                                class: 'filtro-consultal-detalhada',
                            },
                            dropDownOptions: {
                                closeOnOutsideClick: true,
                                showTitle: false,
                                title: 'Filtro por Status',
                            },
                            placeholder: 'Filtro',
                            showClearButton: false,
                            onValueChanged(e) {
                                if (e.value == 'I') {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada-inativos' });
                                } else {
                                    e.component.option('elementAttr', { class: 'filtro-consultal-detalhada' });
                                };
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh',
                            hint: 'Atualiza lista de Produtos',
                            onClick() {
                                CarregaConsultaProdutos();
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            icon: 'hierarchy',
                            text: 'Fechar Agrupamento',
                            hint: 'Fechar ou expandir os agrupamentos',
                            onClick(e) {
                                const dataGrid = $("#gridConsultaProdutos").dxDataGrid('instance');
                                const expanding = e.component.option('text') === 'Expandir Agrupamento';
                                dataGrid.option('grouping.autoExpandAll', expanding);
                                e.component.option('text', expanding ? 'Fechar Agrupamento' : 'Expandir Agrupamento');
                            },
                        },
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
                ],
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

            onContentReady(e) {
                vLkp_Status_Produto_Consulta = $("#lkp_Status_Produto_Consulta").dxLookup('instance');
            },

        }).dxDataGrid("instance"),

        vLkp_Origem_Produto = $('#lkp_Origem_Produto').dxLookup({
            dataSource: [],
            searchExpr: ['DS_PESQUISA'],
            displayExpr: 'DS_PESQUISA',
            valueExpr: 'CD_ORIGEM',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Origem do Produto',
            },
            labelMode: 'floating',
            label: 'Origem do Produto *',
            placeholder: 'Origem do Produto',
            showClearButton: true,
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Origem do Produto obrigatória',
            }], validationGroup: 'DadosGerais'
        }).dxLookup("instance"),

        vLkp_Unidade_Medida_Compra = $('#lkp_Unidade_Medida_Compra').dxLookup({
            dataSource: [],
            searchExpr: ['DS_PESQUISA'],
            displayExpr: 'DS_PESQUISA',
            valueExpr: 'CD_UNIDADE_MEDIDA',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Unidade de Compra',
            },
            labelMode: 'floating',
            label: 'Unidade de Compra *',
            placeholder: 'Unidade de Compra *',
            showClearButton: true,
            onValueChanged(e) {
                valorUnidadeVenda = $('#lkp_Unidade_Medida_Venda').dxLookup('instance').option('value');

                if (e.value !== null && e.value !== undefined && valorUnidadeVenda !== null && valorUnidadeVenda !== undefined && e.value !== valorUnidadeVenda) {
                    $('#panelFatorConversao').slideDown();
                } else {
                    $('#panelFatorConversao').slideUp();
                };
            },
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Unidade de Compra obrigatória',
            }], validationGroup: 'DadosGerais'
        }).dxLookup("instance"),

        vLkp_Unidade_Medida_Venda = $('#lkp_Unidade_Medida_Venda').dxLookup({
            dataSource: [],
            searchExpr: ['DS_PESQUISA'],
            displayExpr: 'DS_PESQUISA',
            valueExpr: 'CD_UNIDADE_MEDIDA',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Unidade de Venda',
            },
            labelMode: 'floating',
            label: 'Unidade de Venda *',
            placeholder: 'Unidade de Venda *',
            showClearButton: true,
            onValueChanged(e) {
                valorUnidadeCompra = $('#lkp_Unidade_Medida_Compra').dxLookup('instance').option('value');

                if (e.value !== null && e.value !== undefined && valorUnidadeCompra !== null && valorUnidadeCompra !== undefined && e.value !== valorUnidadeCompra) {
                    $('#panelFatorConversao').slideDown();
                } else {
                    $('#panelFatorConversao').slideUp();
                };
            },
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Unidade de Venda obrigatória',
            }], validationGroup: 'DadosGerais'
        }).dxLookup("instance"),

        vLkp_Situacao_Tributaria_PIS_Inclusao = $('#lkp_Situacao_Tributaria_PIS_Inclusao').dxLookup({
            dataSource: [],
            searchExpr: ['DS_PESQUISA'],
            displayExpr: 'DS_PESQUISA',
            valueExpr: 'CD_SITUACAO_TRIBUTARIA_PIS',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'CST PIS',
            },
            labelMode: 'floating',
            label: 'Situação Tributária de PIS',
            placeholder: 'Situação Tributária de PIS',
            showClearButton: true,
        }).dxLookup("instance"),

        vLkp_Situacao_Tributaria_COFINS_Inclusao = $('#lkp_Situacao_Tributaria_COFINS_Inclusao').dxLookup({
            dataSource: [],
            searchExpr: ['DS_PESQUISA'],
            displayExpr: 'DS_PESQUISA',
            valueExpr: 'CD_SITUACAO_TRIBUTARIA_COFINS',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'CST COFINS',
            },
            labelMode: 'floating',
            label: 'Situação Tributária de COFINS',
            placeholder: 'Situação Tributária de COFINS',
            showClearButton: true,
        }).dxLookup("instance"),

        vDbx_Dt_Cadastro = $('#dt_Cadastro').dxDateBox({
            labelMode: 'floating',
            label: 'Data de Cadastro',
            placeholder: '',
            readOnly: true,
            showClearButton: false,
            useMaskBehavior: true,
            displayFormat: 'dd/MM/yyyy HH:mm',
            type: 'date',
            value: Date(),
        }).dxDateBox("instance"),

        vDbx_Dt_Atualizacao = $('#dt_Atualizacao').dxDateBox({
            labelMode: 'floating',
            label: 'Última Alteração',
            placeholder: '',
            readOnly: true,
            showClearButton: false,
            useMaskBehavior: true,
            displayFormat: 'dd/MM/yyyy HH:mm',
            type: 'date',
            value: Date(),
        }).dxDateBox("instance"),

        vTxt_Cd_Login_Inclusao = $('#txt_Cd_Login_Inclusao').dxTextBox({
            labelMode: 'floating',
            label: 'Login Cadastro',
            maxLength: 10,
            readOnly: true,
            value: '',
        }).dxTextBox("instance"),

        vChk_Encomenda = $('#chk_Lg_Encomenda').dxCheckBox({
            value: false,
            text: "Venda sob encomenda",
            onValueChanged: function (e) {
                if (vSuprimeConfiguracaoIndicadoresCadastro == true) return;
                configuraIndicadoresCadastroProduto();
            },
        }).dxCheckBox("instance"),

        vChk_Faturamento_Bloqueado = $('#chk_Faturamento_Bloqueado').dxCheckBox({
            value: false,
            text: "Bloquear faturamento para revisão cadastro",
            onValueChanged: function (e) {
                if (vSuprimeConfiguracaoIndicadoresCadastro == true) return;
                configuraIndicadoresCadastroProduto();
            },
        }).dxCheckBox("instance"),

        vLkp_Status_Produto = $('#lkp_Status_Produto').dxLookup({
            dataSource: dataSourceStatus,
            elementAttr: {
                class: 'status_ativo',
            },
            searchExpr: ['DS_STATUS'],
            displayExpr: 'DS_STATUS',
            valueExpr: 'CD_STATUS',
            value: 'A',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Status',
            },
            labelMode: 'floating',
            label: 'Status',
            placeholder: '',
            showClearButton: false,
            onValueChanged(e) {
                if (e.value == 'I') {
                    e.component.option('elementAttr', { class: 'status_inativo' });

                    if (vSuprimeConfiguracaoIndicadoresCadastro == true) return;
                    configuraIndicadoresCadastroProduto();
                } else {
                    e.component.option('elementAttr', { class: 'status_ativo' });

                    if (vSuprimeConfiguracaoIndicadoresCadastro == true) return;
                    configuraIndicadoresCadastroProduto();
                };
            },
        }).dxLookup("instance"),

        vLkp_Fora_Linha = $('#lkp_Fora_Linha').dxLookup({
            dataSource: dataSourceForaLinha,
            elementAttr: {
                class: 'status_ativo',
            },
            searchExpr: ['DS_FORA_LINHA'],
            displayExpr: 'DS_FORA_LINHA',
            valueExpr: 'LG_FORA_LINHA',
            value: false,
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Situação para Compra',
            },
            labelMode: 'floating',
            label: 'Situação para Compra',
            placeholder: '',
            showClearButton: false,
            onValueChanged(e) {
                if (e.value == true) {
                    e.component.option('elementAttr', { class: 'status_inativo' });

                    if (vSuprimeConfiguracaoIndicadoresCadastro == true) return;
                    configuraIndicadoresCadastroProduto();
                } else {
                    e.component.option('elementAttr', { class: 'status_ativo' });

                    if (vSuprimeConfiguracaoIndicadoresCadastro == true) return;
                    configuraIndicadoresCadastroProduto();
                };
            },
        }).dxLookup("instance"),

        vLkp_Operador_Conversao = $('#lkp_Operador_Conversao').dxLookup({
            dataSource: dataSourceOperadorConversao,
            searchExpr: ['DS_OPERADOR'],
            displayExpr: 'DS_OPERADOR',
            valueExpr: 'CD_OPERADOR',
            value: '*',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Operador',
            },
            //labelMode: 'floating',
            //label: 'Operador',
            placeholder: 'Operador',
            showClearButton: false,
        }).dxLookup("instance"),

        vLkp_Operador_Conversao_Exportacao = $('#lkp_Operador_Conversao_Exportacao').dxLookup({
            dataSource: dataSourceOperadorConversao,
            searchExpr: ['DS_OPERADOR'],
            displayExpr: 'DS_OPERADOR',
            valueExpr: 'CD_OPERADOR',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Operador para Conversão',
            },
            labelMode: 'floating',
            label: 'Operador para Conversão',
            placeholder: 'Operador para Conversão',
            showClearButton: true,
        }).dxLookup("instance"),

        vNbx_Fator_Conversao = $('#nbx_Fator_Conversao').dxNumberBox({
            value: '',
            format: 'por ###,###,###,##0.#####',
            min: 0,
            max: 99999999999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'Fator Conversão *',
            //labelMode: 'floating',
            //label: 'Fator Conversão *',
        }).dxNumberBox("instance"),

        vTxt_Cd_Unidade_Tributacao_Exportacao = $('#txt_Cd_Unidade_Tributacao_Exportacao').dxTextBox({
            labelMode: 'floating',
            label: 'Unidade de Tributação',
            maxLength: 15,
        }).dxTextBox("instance"),

        vTxt_Cd_EAN_Tributacao_Exportacao = $('#txt_Cd_EAN_Tributacao_Exportacao').dxTextBox({
            labelMode: 'floating',
            label: 'Codigo de Barras Tributação',
            maxLength: 15,
        }).dxTextBox("instance"),

        vNbx_Fator_Conversao_Exportacao = $('#nbx_Fator_Conversao_Exportacao').dxNumberBox({
            value: '',
            format: 'por ###,###,###,##0.#####',
            min: 0,
            max: 99999999999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'Fator Conversão *',
            labelMode: 'floating',
            label: 'Fator Conversão *',
        }).dxNumberBox("instance"),

        vTxt_Cd_Produto = $('#txt_Cd_Produto').dxTextBox({
            labelMode: 'floating',
            label: 'Código Interno',
            maxLength: 15,
        }).dxValidator({}).dxTextBox("instance"),

        vTxt_Cd_EAN_Produto = $('#txt_Cd_EAN_Produto').dxTextBox({
            labelMode: 'floating',
            label: 'Código de Barras',
            maxLength: 15,
            onValueChanged: async function () {
                await CarregaRadarPrecos();
                if (objClassProduto.OPERACAO == 'I') {
                    configuraComparativoRadarPrecoInclusao();
                } else {
                    configuraComparativoRadarPreco();
                }
            },
        }).dxTextBox("instance"),

        vTxt_Ds_Produto = $('#txt_Ds_Produto').dxTextBox({
            labelMode: 'floating',
            label: 'Descrição Completa *',
            maxLength: 60,
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Descrição Completa obrigatória',
            }], validationGroup: 'DadosGerais'
        }).dxTextBox("instance"),

        vTxt_Ds_Produto_Reduzida = $('#txt_Ds_Produto_Reduzida').dxTextBox({
            labelMode: 'floating',
            label: 'Descrição Reduzida para Cupom Fiscal *',
            maxLength: 20,
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Descrição Reduzida obrigatória',
            }], validationGroup: 'DadosGerais'
        }).dxTextBox("instance"),

        vTxt_Ds_Marca = $('#txt_Ds_Marca').dxTextBox({
            labelMode: 'floating',
            label: 'Marca',
            maxLength: 15,
        }).dxTextBox("instance"),

        vNbx_Qt_Multiplo_Compra = $('#nbx_Qt_Multiplo_Compra').dxNumberBox({
            value: '',
            format: '###,###,###,##0.####',
            min: 0,
            max: 99999999999999,
            showClearButton: true,
            showSpinButtons: true,
            step: 1,
            placeholder: 'Múltiplo de Compra *',
            labelMode: 'floating',
            label: 'Múltiplo de Compra *',
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Múltiplo de Compra obrigatório',
            }], validationGroup: 'DadosGerais'
        }).dxNumberBox("instance"),

        vNbx_Ps_Produto_Compra = $('#nbx_Ps_Produto_Compra').dxNumberBox({
            value: '',
            format: "###,###,###,##0.#### 'Kg'",
            min: 0,
            max: 99999999999999,
            showClearButton: true,
            showSpinButtons: true,
            step: 1,
            placeholder: 'Peso de Compra *',
            labelMode: 'floating',
            label: 'Peso de Compra *',
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Peso de Compra obrigatório',
            }], validationGroup: 'DadosGerais'
        }).dxNumberBox("instance"),

        vNbx_Ps_Produto_Venda = $('#nbx_Ps_Produto_Venda').dxNumberBox({
            value: '',
            format: "###,###,###,##0.#### 'Kg'",
            min: 0,
            max: 99999999999999,
            showClearButton: true,
            showSpinButtons: true,
            step: 1,
            placeholder: 'Peso de Venda *',
            labelMode: 'floating',
            label: 'Peso de Venda *',
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Peso de Venda obrigatório',
            }], validationGroup: 'DadosGerais'
        }).dxNumberBox("instance"),

        vTxt_Cd_Fabricante = $('#txt_Cd_Fabricante').dxTextBox({
            labelMode: 'floating',
            label: 'Código Fabricante',
            maxLength: 20,
        }).dxTextBox("instance"),

        vTxt_Cd_Original = $('#txt_Cd_Original').dxTextBox({
            labelMode: 'floating',
            label: 'Código Original',
            maxLength: 25,
        }).dxTextBox("instance"),

        vTxt_Cd_Opcional = $('#txt_Cd_Opcional').dxTextBox({
            labelMode: 'floating',
            label: 'Código Opcional',
            maxLength: 25,
        }).dxTextBox("instance"),

        vNbx_Cd_NCM = $('#nbx_Cd_NCM').dxNumberBox({
            value: '',
            format: '00000000',
            min: 0,
            max: 99999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'Código NCM',
            labelMode: 'floating',
            label: 'Código NCM',
            onValueChanged: function (e) {
                if (vCamposPrecificacaoCriados == true && vNbx_Cd_NCM_Aba_Preco.option('value') != e.value) {
                    vNbx_Cd_NCM_Aba_Preco.option('value', e.value);
                }
            },
        }).dxNumberBox("instance"),

        vNbx_Cd_CEST = $('#nbx_Cd_CEST').dxNumberBox({
            value: '',
            format: '0000000',
            min: 0,
            max: 9999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'CEST',
            labelMode: 'floating',
            label: 'Código CEST',
            onValueChanged: function (e) {
                if (vCamposPrecificacaoCriados == true && vNbx_Cd_CEST_Aba_Preco.option('value') != e.value) {
                    vNbx_Cd_CEST_Aba_Preco.option('value', e.value);
                }
            },
        }).dxNumberBox("instance"),

        vTxt_Nr_FCI = $('#txt_Nr_FCI').dxTextBox({
            labelMode: 'floating',
            label: 'Código FCI - Ficha de Conteúdo de Importação',
            maxLength: 40,
            onValueChanged: function (e) {
                if (vCamposPrecificacaoCriados == true && vTxt_Nr_FCI_Aba_Preco.option('value') != e.value) {
                    vTxt_Nr_FCI_Aba_Preco.option('value', e.value);
                }
            },
        }).dxTextBox("instance"),

        vTxt_Ds_Aplicacao = $('#txt_Ds_Aplicacao').dxTextArea({
            labelMode: 'floating',
            label: 'Aplicação',
            autoResizeEnabled: true,
            maxLength: 4000,
        }).dxTextArea('instance'),

        vTxt_Ds_Marca_Aplicacao = $('#txt_Ds_Marca_Aplicacao').dxTextBox({
            labelMode: 'floating',
            label: 'Marca',
            maxLength: 200,
        }).dxTextBox("instance"),

        vTxt_Ds_Modelo_Aplicacao = $('#txt_Ds_Modelo_Aplicacao').dxTextBox({
            labelMode: 'floating',
            label: 'Modelo',
            maxLength: 200,
        }).dxTextBox("instance"),

        vNbx_Nr_Ano_Inicial_Aplicacao = $('#nbx_Nr_Ano_Inicial_Aplicacao').dxNumberBox({
            value: '',
            format: '0000',
            min: 1900,
            max: 2999,
            showClearButton: true,
            showSpinButtons: true,
            step: 1,
            placeholder: 'Ano Inicial',
            labelMode: 'floating',
            label: 'Ano Inicial',
        }).dxNumberBox("instance"),

        vNbx_Nr_Ano_Final_Aplicacao = $('#nbx_Nr_Ano_Final_Aplicacao').dxNumberBox({
            value: '',
            format: '0000',
            min: 1900,
            max: 2999,
            showClearButton: true,
            showSpinButtons: true,
            step: 1,
            placeholder: 'Ano Final',
            labelMode: 'floating',
            label: 'Ano Final',
        }).dxNumberBox("instance"),

        vLkp_Separador_Aplicacao = $('#lkp_Separador_Aplicacao').dxLookup({
            dataSource: dataSourceSeparadorAplicacao,
            searchExpr: ['DS_SEPARADOR'],
            displayExpr: 'DS_SEPARADOR',
            valueExpr: 'CD_SEPARADOR',
            value: ' ',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Separador',
            },
            labelMode: 'floating',
            label: 'Separador',
            placeholder: 'Separador',
            showClearButton: false,
        }).dxLookup("instance"),

        vChk_Lg_Kit = $('#chk_Lg_Kit').dxCheckBox({
            value: false,
            text: "Kit - Este item é composto por mais de um produto ou é vendido em mais de uma unidade de medida",
            onValueChanged: function (e) {
                if (e.value == true) {
                    $('#panelDependenciasKit').slideDown();

                    $('#chk_Lg_Kit_Movimento_Estoque_Producao').dxCheckBox("instance").option('readOnly', false);
                    $('#chk_Lg_Kit_Venda_Diversas_Unidades_Medida').dxCheckBox("instance").option('readOnly', false);
                } else {
                    $('#panelDependenciasKit').slideUp();

                    $('#chk_Lg_Kit_Movimento_Estoque_Producao').dxCheckBox("instance").option('readOnly', true);
                    $('#chk_Lg_Kit_Movimento_Estoque_Producao').dxCheckBox("instance").option('value', false);

                    $('#chk_Lg_Kit_Venda_Diversas_Unidades_Medida').dxCheckBox("instance").option('readOnly', true);
                    $('#chk_Lg_Kit_Venda_Diversas_Unidades_Medida').dxCheckBox("instance").option('value', false);
                };
            },
        }).dxCheckBox("instance"),

        vChk_Lg_Kit_Movimento_Estoque_Producao = $('#chk_Lg_Kit_Movimento_Estoque_Producao').dxCheckBox({
            value: false,
            readOnly: true,
            text: "Movimenta estoque dos componentes no apontamento de produção do Kit",
        }).dxCheckBox("instance"),

        vChk_Lg_Kit_Venda_Diversas_Unidades_Medida = $('#chk_Lg_Kit_Venda_Diversas_Unidades_Medida').dxCheckBox({
            value: false,
            readOnly: true,
            text: "Vendido em mais de uma unidade de medida",
        }).dxCheckBox("instance"),

        vChk_Lg_Controla_Lote = $('#chk_Lg_Controla_Lote').dxCheckBox({
            value: false,
            text: "Lote - Controla estoque por lote do produto",

            onValueChanged: function (e) {

                if (e.value == true) {
                    $('#panelDependenciasLote').slideDown();

                    $('#chk_Lg_Controla_Validade_Lote').dxCheckBox("instance").option('readOnly', false);
                    $('#chk_Lg_Reaproveita_Lote').dxCheckBox("instance").option('readOnly', false);
                    $('#chk_Lg_Informa_Lote_Fabricante').dxCheckBox("instance").option('readOnly', false);
                    $('#chk_Lg_Imprime_Lote_Etiqueta').dxCheckBox("instance").option('readOnly', false);
                    $('#chk_Lg_Pneu').dxCheckBox("instance").option('readOnly', false);
                } else {
                    $('#panelDependenciasLote').slideUp();

                    $('#chk_Lg_Controla_Validade_Lote').dxCheckBox("instance").option('readOnly', true);
                    $('#chk_Lg_Reaproveita_Lote').dxCheckBox("instance").option('readOnly', true);
                    $('#chk_Lg_Informa_Lote_Fabricante').dxCheckBox("instance").option('readOnly', true);
                    $('#chk_Lg_Imprime_Lote_Etiqueta').dxCheckBox("instance").option('readOnly', true);
                    $('#chk_Lg_Pneu').dxCheckBox("instance").option('readOnly', true);

                    $('#chk_Lg_Controla_Validade_Lote').dxCheckBox("instance").option('value', false);
                    $('#chk_Lg_Reaproveita_Lote').dxCheckBox("instance").option('value', false);
                    $('#chk_Lg_Informa_Lote_Fabricante').dxCheckBox("instance").option('value', false);
                    $('#chk_Lg_Imprime_Lote_Etiqueta').dxCheckBox("instance").option('value', false);
                    $('#chk_Lg_Pneu').dxCheckBox("instance").option('value', false);
                };
            },
        }).dxCheckBox("instance"),

        vChk_Lg_Controla_Validade_Lote = $('#chk_Lg_Controla_Validade_Lote').dxCheckBox({
            value: false,
            readOnly: true,
            text: "Controla a validade do lote",
        }).dxCheckBox("instance"),

        vChk_Lg_Reaproveita_Lote = $('#chk_Lg_Reaproveita_Lote').dxCheckBox({
            value: false,
            readOnly: true,
            text: "Reaproveita lotes existentes no Recebimento da Mercadoria",
        }).dxCheckBox("instance"),

        vChk_Lg_Informa_Lote_Fabricante = $('#chk_Lg_Informa_Lote_Fabricante').dxCheckBox({
            value: false,
            readOnly: true,
            text: "Permite registrar o lote do fabricante no Recebimento da Mercadoria",
        }).dxCheckBox("instance"),

        vChk_Lg_Imprime_Lote_Etiqueta = $('#chk_Lg_Imprime_Lote_Etiqueta').dxCheckBox({
            value: false,
            readOnly: true,
            text: "Imprime o número do lote na etiqueta do produto",
        }).dxCheckBox("instance"),

        vChk_Lg_Pneu = $('#chk_Lg_Pneu').dxCheckBox({
            value: false,
            readOnly: true,
            text: "Pneu - Identifica este produto como pneu gerando um número de lote para cada unidade comprada",
        }).dxCheckBox("instance"),

        vChk_Lg_Utiliza_Ordem_Servico_Producao = $('#chk_Lg_Utiliza_Ordem_Servico_Producao').dxCheckBox({
            value: false,
            text: "Ordem de Produção - Cria uma ordem de serviço de produção após a venda deste produto",

            onValueChanged: function (e) {

                if (e.value == true) {
                    $('#panelDependenciasOrdemProducao').slideDown();

                    $('#chk_Lg_Obrigatorio_Detalhes_Producao_Pedido').dxCheckBox("instance").option('readOnly', false);
                } else {
                    $('#panelDependenciasOrdemProducao').slideUp();

                    $('#chk_Lg_Obrigatorio_Detalhes_Producao_Pedido').dxCheckBox("instance").option('readOnly', true);
                    $('#chk_Lg_Obrigatorio_Detalhes_Producao_Pedido').dxCheckBox("instance").option('value', false);
                };
            },
        }).dxCheckBox("instance"),

        vChk_Lg_Obrigatorio_Detalhes_Producao_Pedido = $('#chk_Lg_Obrigatorio_Detalhes_Producao_Pedido').dxCheckBox({
            value: false,
            readOnly: true,
            text: "Obrigatório preencher campos de detalhes para produção no pedido de venda deste produto",
        }).dxCheckBox("instance"),

        vChk_Lg_Permite_Informar_Quantidade_Conferencia = $('#chk_Lg_Permite_Informar_Quantidade_Conferencia').dxCheckBox({
            value: false,
            text: "Permite informar a quantidade para este produto no processo de conferência de seperação de mercadorias vendidas",
        }).dxCheckBox("instance"),

        vChk_Lg_Preco_Definido_Na_Venda = $('#chk_Lg_Preco_Definido_Na_Venda').dxCheckBox({
            value: false,
            text: "O preço deste produto será definido pelo vendedor na emissão do pedido de venda",
        }).dxCheckBox("instance"),

        vChk_Lg_Exibir_Cod_Fabricante_Obs_NF = $('#chk_Lg_Exibir_Cod_Fabricante_Obs_NF').dxCheckBox({
            value: false,
            text: "Exibir o código do fabricante na observação do item na emissão da Nota Fiscal",
        }).dxCheckBox("instance"),

        vChk_Lg_Venda_Somente_PF = $('#chk_Lg_Venda_Somente_PF').dxCheckBox({
            value: false,
            text: "Aplicar controle sobre Pessoas Físicas",
        }).dxCheckBox("instance"),

        vChk_Lg_Venda_Somente_PJ = $('#chk_Lg_Venda_Somente_PJ').dxCheckBox({
            value: false,
            text: "Aplicar controle sobre Pessoas Jurídicas",
        }).dxCheckBox("instance"),

        vNbx_Qt_Maxima_Pedido_Venda_Mes = $('#nbx_Qt_Maxima_Pedido_Venda_Mes').dxNumberBox({
            value: '',
            format: 'Máximo de ###,###,###,##0 pedidos por mês deste produto para cada cliente',
            min: 0,
            max: 9999999999,
            showClearButton: true,
            showSpinButtons: true,
            step: 1,
            placeholder: 'Quantidade máximo de pedidos por mês deste produto para cada cliente',
            //labelMode: 'floating',
            //label: 'Quantidade máximo de pedidos por mês deste produto para cada cliente',
        }).dxNumberBox("instance"),

        vChk_Lg_Bloquear_Impressao_Etiqueta_Recebimento = $('#chk_Lg_Bloquear_Impressao_Etiqueta_Recebimento').dxCheckBox({
            value: false,
            text: "Bloquear impressão automática de etiquetas de preço no Recebimento da Mercadoria",
        }).dxCheckBox("instance"),

        vChk_Lg_Bloquear_Escrituracao_SPED = $('#chk_Lg_Bloquear_Escrituracao_SPED').dxCheckBox({
            value: false,
            text: "Bloquear scrituração deste produto no arquivo SPED",
        }).dxCheckBox("instance"),

        vNbx_IPI_Venda = $('#nbx_IPI_Venda').dxNumberBox({
            value: '',
            format: "###,##0.## '%'",
            min: 0,
            max: 999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'IPI para Venda',
            labelMode: 'floating',
            label: 'IPI para Venda',
        }).dxNumberBox("instance"),

        vNbx_Nr_Dias_Garantia = $('#nbx_Nr_Dias_Garantia').dxNumberBox({
            value: '',
            format: '###,### dias',
            min: 0,
            max: 999999,
            showClearButton: true,
            showSpinButtons: true,
            step: 10,
            placeholder: 'Tempo de Garantia',
            labelMode: 'floating',
            label: 'Tempo de Garantia',
        }).dxNumberBox("instance"),

        vChk_Lg_Exige_Pedido_Venda_Devolucao = $('#chk_Lg_Exige_Pedido_Venda_Devolucao').dxCheckBox({
            value: false,
            text: "Obrigatório informar o número de pedido de origem na devolução deste produto",
        }).dxCheckBox("instance"),

        vTxt_Cd_Ativo = $('#txt_Cd_Ativo').dxTextBox({
            labelMode: 'floating',
            label: 'Ativo',
            maxLength: 25,
        }).dxTextBox("instance"),

        vTxt_Cd_Modelo = $('#txt_Cd_Modelo').dxTextBox({
            labelMode: 'floating',
            label: 'Modelo',
            maxLength: 25,
        }).dxTextBox("instance"),

        vTxt_Cd_Serie = $('#txt_Cd_Serie').dxTextBox({
            labelMode: 'floating',
            label: 'Modelo',
            maxLength: 25,
        }).dxTextBox("instance"),

        vTxt_Ds_Pressao_Potencia = $('#txt_Ds_Pressao_Potencia').dxTextBox({
            labelMode: 'floating',
            label: 'Pressão/Portência',
            maxLength: 30,
        }).dxTextBox("instance"),

        vTxt_Ds_Vazao = $('#txt_Ds_Vazao').dxTextBox({
            labelMode: 'floating',
            label: 'Vazão',
            maxLength: 30,
        }).dxTextBox("instance"),

        vTxt_Ds_Consumo = $('#txt_Ds_Consumo').dxTextBox({
            labelMode: 'floating',
            label: 'Consumo',
            maxLength: 30,
        }).dxTextBox("instance"),

        vTxt_Ds_Capacidade = $('#txt_Ds_Capacidade').dxTextBox({
            labelMode: 'floating',
            label: 'Capacidade',
            maxLength: 30,
        }).dxTextBox("instance"),

        vChk_Lg_Combustivel_Solvente = $('#chk_Lg_Combustivel_Solvente').dxCheckBox({
            value: false,
            text: "Produto classificado como Combustível/Solvente",
        }).dxCheckBox("instance"),

        vLkp_Grandeza = $('#lkp_Grandeza').dxLookup({
            dataSource: dataSourceGrandeza,
            searchExpr: ['DS_GRANDEZA'],
            displayExpr: 'DS_GRANDEZA',
            valueExpr: 'CD_GRANDEZA',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Grandeza',
            },
            labelMode: 'floating',
            label: 'Grandeza',
            placeholder: 'Grandeza',
            showClearButton: false,
        }).dxLookup("instance"),

        vNbx_Qt_Medida_Grandeza = $('#nbx_Qt_Medida_Grandeza').dxNumberBox({
            value: '',
            format: '###,###,###,###,##0.#####',
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: true,
            step: 1,
            placeholder: 'Medida da Grandeza',
            labelMode: 'floating',
            label: 'Medida da Grandeza',
        }).dxNumberBox("instance"),

        vNbx_Cd_Caracteristica_Fisico_Quimica_ANP = $('#nbx_Cd_Caracteristica_Fisico_Quimica_ANP').dxNumberBox({
            value: '',
            format: '##,###',
            min: 0,
            max: 99999,
            showClearButton: true,
            showSpinButtons: true,
            step: 1,
            placeholder: 'Característica',
            labelMode: 'floating',
            label: 'Característica',
        }).dxNumberBox("instance"),

        vNbx_Cd_Metodo_Afericao_Caracteristica = $('#nbx_Cd_Metodo_Afericao_Caracteristica').dxNumberBox({
            value: '',
            format: '##,###',
            min: 0,
            max: 99999,
            showClearButton: true,
            showSpinButtons: true,
            step: 1,
            placeholder: 'Método de Aferição',
            labelMode: 'floating',
            label: 'Método de Aferição',
        }).dxNumberBox("instance"),

        vNbx_Vl_Caracteristica = $('#nbx_Vl_Caracteristica').dxNumberBox({
            value: '',
            format: '###,###,###,###,##0.#####',
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: true,
            step: 1,
            placeholder: 'Valor',
            labelMode: 'floating',
            label: 'Valor',
        }).dxNumberBox("instance"),

        vNbx_Qt_Massa_Especifica = $('#nbx_Qt_Massa_Especifica').dxNumberBox({
            value: '',
            format: '###,###,###,###,##0.#####',
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: true,
            step: 1,
            placeholder: 'Massa Específica',
            labelMode: 'floating',
            label: 'Massa Específica',
        }).dxNumberBox("instance"),

        vLkp_Situacao_Tributaria_Inclusao = $('#lkp_Situacao_Tributaria_Inclusao').dxLookup({
            dataSource: dataSourceSituacaoTributaria,
            searchExpr: ['DS_PESQUISA'],
            displayExpr: 'DS_PESQUISA',
            valueExpr: 'CD_SITUACAO_TRIBUTARIA',
            value: '',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Situação Tributária de ICMS',
            },
            labelMode: 'floating',
            label: 'Situação Tributária de ICMS *',
            placeholder: 'Situação Tributária de ICMS *',
            showClearButton: true,
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Situação Tributária de ICMS obrigatória',
            }], validationGroup: 'PrecoInclusao'
        }).dxLookup("instance"),

        vTag_Filiais_Precificacao_Inclusao = $('#tag_Filiais_Precificacao_Inclusao').dxTagBox({
            dataSource: dataSourceFiliaisAcesso,
            searchEnabled: true,
            searchExpr: ['DS_PESQUISA'],
            cleanSearchOnOpening: true,
            displayExpr: 'DS_PESQUISA',
            valueExpr: 'CD_FILIAL',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'A precificação será aplicada nas Filiais',
            },
            labelMode: 'floating',
            label: 'A precificação será aplicada nas Filiais',
            placeholder: '',
            showClearButton: true,
            //applyValueMode: 'useButtons',
            applyValueMode: 'instantly',
            showSelectionControls: true,
            //value: [1,2,3]
        }).dxTagBox("instance"),

        vDbx_Dt_Vigencia_Inclusao = $('#dbx_Dt_Vigencia_Inclusao').dxDateBox({
            labelMode: 'floating',
            label: 'Data Vigência *',
            placeholder: 'Data Vigência *',
            showClearButton: false,
            useMaskBehavior: true,
            displayFormat: 'dd/MM/yyyy',
            type: 'date',
            value: Date(),
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Data de Vigência obrigatória',
            }], validationGroup: 'PrecoInclusao'
        }).dxDateBox("instance"),

        vNbx_Vl_Custo_Bruto_Inclusao = $('#nbx_Vl_Custo_Bruto_Inclusao').dxNumberBox({
            value: '',
            format: 'R$ ###,###,###,###,##0.00###',
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'Custo Bruto sem Impostos e sem Desconto *',
            labelMode: 'floating',
            label: 'Custo Bruto sem Impostos e sem Desconto *',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaCustoLiquidoInclusao();
                }
            },
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Custo Bruto obrigatório',
            }], validationGroup: 'PrecoInclusao'
        }).dxNumberBox("instance"),

        vTgx_Descontos_Inclusao = $("#tgxDescontosInclusao").dxTagBox({
            acceptCustomValue: true,
            displayExpr: function (item) {
                // trata pois o "item" pode ser nulo
                return item && formataNumero(item.Valor, 0, 4) + '%';
            },
            //displayExpr: "Valor",
            valueExpr: "Sequencia",
            labelMode: 'floating',
            label: 'Digite % de desconto e tecle <Enter>',
            showClearButton: true,
            openOnFieldClick: false,
            onValueChanged: function (e) {
                let descontos = e.component.option("selectedItems").map((x) => x.Valor);
                let desconto = 0;

                if (descontos.length > 0) {
                    desconto = 100;
                    for (let x of descontos) {
                        desconto = desconto * (1 - x / 100);
                    }
                    //desconto = 100 - desconto;
                    desconto = Number(parseFloat(100 - desconto).toFixed(2));
                }

                vNbx_Pc_Desconto_Total_Inclusao.option("value", desconto);
            },

            onCustomItemCreating(args) {

                if (!args.text) {
                    args.customItem = null;
                    return;
                }

                args.text = args.text.replace(",", ".");

                if (isNaN(parseFloat(args.text))) {
                    args.customItem = null;
                    return;
                }

                let valor = parseFloat(args.text);

                if (valor > 100 || valor < 0) {
                    args.customItem = null;
                    return;
                }

                const { component } = args;

                const currentItems = component.option("items");

                let nextId = currentItems.length == 0 ? 1 : Math.max.apply(null, currentItems.map((x) => x.Sequencia)) + 1;

                const newValue = { Sequencia: nextId, Valor: valor };
                currentItems.unshift(newValue);

                component.option("items", currentItems);
                args.customItem = newValue;
            }
        }).dxTagBox("instance"),

        vNbx_Pc_Desconto_Total_Inclusao = $('#nbx_Pc_Desconto_Total_Inclusao').dxNumberBox({
            value: '',
            format: "###,###,###,##0.#####'%'     ",
            showClearButton: false,
            showSpinButtons: false,
            readOnly: true,
            //step: 1000,
            labelMode: 'floating',
            label: 'Desconto Total do Fornecedor',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaCustoLiquidoInclusao();
                }
            },
        }).dxNumberBox("instance"),

        vNbx_Vl_Custo_Liquido_Inclusao = $('#nbx_Vl_Custo_Liquido_Inclusao').dxNumberBox({
            value: '',
            format: "'R$' ###,###,###,###,##0.00###     ",
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            readOnly: true,
            placeholder: 'Custo Líquido sem Impostos',
            labelMode: 'floating',
            label: 'Custo Líquido sem Impostos',

            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                CalculaCustoTotalInclusao();
            },
        }).dxNumberBox("instance"),

        vNbx_Pc_Custo_IPI_Inclusao = $('#nbx_Pc_Custo_IPI_Inclusao').dxNumberBox({
            value: '',
            format: "###,###,##0.##### '%'",
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: '% IPI de Compra',
            labelMode: 'floating',
            label: '% IPI de Compra',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                CalculaCustoTotalInclusao();
            },
        }).dxNumberBox("instance"),

        vNbx_Pc_Custo_Frete_Inclusao = $('#nbx_Pc_Custo_Frete_Inclusao').dxNumberBox({
            value: '',
            format: "     ###,###,##0.##### '%'",
            min: 0,
            max: 999999999999.99999,
            showClearButton: false,
            showSpinButtons: false,
            step: 1,
            placeholder: '% Frete de Compra',
            labelMode: 'floating',
            label: '% Frete de Compra',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },

            buttons: [{
                name: 'currency',
                location: 'after',
                options: {
                    text: '%',
                    stylingMode: 'text',
                    width: 40,
                    elementAttr: {
                        class: 'currency',
                        class: 'botao-number-box',
                    },
                    onInitialized(e) {
                        //Seta a variável que representa o botão deste Number Box para que seja possível parametrizá-lo em outras funções fora do componente
                        componenteBotaoNumberBoxInclusao = e;
                    },
                    onClick(e) {
                        //Seta a variável que representa o botão deste Number Box para que seja possível parametrizá-lo em outras funções fora do componente
                        componenteBotaoNumberBoxInclusao = e;

                        //Chama função para reconfigurar o NumberBox
                        configuraNumberBoxCustoFreteInclusao(componenteBotaoNumberBoxInclusao);

                        CalculaCustoTotalInclusao();
                    },
                },
            }, 'clear', 'spins'],
            onValueChanged: function (e) {
                CalculaCustoTotalInclusao();
            },
        }).dxNumberBox('instance'),

        vNbx_Pc_Custo_ST_Inclusao = $('#nbx_Pc_Custo_ST_Inclusao').dxNumberBox({
            value: '',
            format: "###,###,##0.##### '%'",
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: '% ST de Compra',
            labelMode: 'floating',
            label: '% ST de Compra',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                CalculaCustoTotalInclusao();
            },
        }).dxNumberBox("instance"),

        vNbx_Pc_Custo_Outros_Custos_Inclusao = $('#nbx_Pc_Custo_Outros_Custos_Inclusao').dxNumberBox({
            value: '',
            format: "###,###,##0.#####'%'",
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: '% Outros Custos',
            labelMode: 'floating',
            label: '% Outros Custos',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                CalculaCustoTotalInclusao();
            },
        }).dxNumberBox("instance"),

        vNbx_Vl_Custo_Total_Inclusao = $('#nbx_Vl_Custo_Total_Inclusao').dxNumberBox({
            value: '',
            format: 'R$ ###,###,###,###,##0.00###      ',
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'Custo com Impostos',
            labelMode: 'floating',
            label: 'Custo com Impostos',
            readOnly: true,
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "darkred",
                    "back-ground": "darkred",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaPrecoMinimoVendaInclusao("C");
                }
            },
        }).dxNumberBox("instance"),

        vNbx_Pc_Lucro_Inclusao = $('#nbx_Pc_Lucro_Inclusao').dxNumberBox({
            value: '',
            format: "###,###,##0.##### '%'",
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: '% Lucro *',
            labelMode: 'floating',
            label: '% Lucro *',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaPrecoMinimoVendaInclusao("L");
                }
            },
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Lucro obrigatório',
            }], validationGroup: 'PrecoInclusao'
        }).dxNumberBox("instance"),

        vNbx_Pc_Rentabilidade_Inclusao = $('#nbx_Pc_Rentabilidade_Inclusao').dxNumberBox({
            value: '',
            format: "###,###,##0.##### '%'",
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: '% Rentabilidade *',
            labelMode: 'floating',
            label: '% Rentabilidade *',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaPrecoMinimoVendaInclusao("R")
                }
            },
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Rentabilidade obrigatória',
            }], validationGroup: 'PrecoInclusao'
        }).dxNumberBox("instance"),

        vNbx_Vl_Preco_Minimo_Venda_Inclusao = $('#nbx_Vl_Preco_Minimo_Venda_Inclusao').dxNumberBox({
            value: '',
            format: 'R$ ###,###,###,###,##0.00###',
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'Preço de Venda *',
            label: 'Preço de Venda *',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "18px",
                    "font-weight": "bold",
                    "color": "#0077b6",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaPrecoMinimoVendaInclusao("V")
                }
            },
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Preço de Venda obrigatório',
            }], validationGroup: 'PrecoInclusao'
        }).dxNumberBox("instance"),

        vBtn_Salvar = $('#btn_Salvar').dxButton({
            text: 'Salvar Dados Gerais',
            icon: 'save',
            type: 'success',
            onClick(e) {
                SalvaProdutoDadosGerais();
            },
        }).dxButton("instance"),

        //REPLICAÇÃO DE PREÇOS - INÍCIO

        vChk_Lg_Replicar_Precos_Entre_Filiais = $('#chk_Lg_Replicar_Precos_Entre_Filiais').dxCheckBox({
            value: true,
            text: "Replicar Precificação",
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    validaParametrosReplicaoPrecos();
                }
            }
        }).dxCheckBox('instance'),

        vChk_Lg_Replicar_Dados_Fiscais_Entre_Filiais = $('#chk_Lg_Replicar_Dados_Fiscais_Entre_Filiais').dxCheckBox({
            value: true,
            text: "Replicar Dados Fiscais",
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    validaParametrosReplicaoPrecos();
                }
            }
        }).dxCheckBox('instance'),

        vChk_Lg_Replicar_Regras_Comerciais_Entre_Filiais = $('#chk_Lg_Replicar_Regras_Comerciais_Entre_Filiais').dxCheckBox({
            value: true,
            text: "Replicar Regras Comerciais",
            onValueChanged: function (e) {
                console.log("suppressOnChange", suppressOnChange);
                if (!vSuppressOnChange) {
                    validaParametrosReplicaoPrecos();
                }
            }
        }).dxCheckBox('instance'),

        vChk_Aplicar_Precos_Todas_Filiais = $('#chk_Aplicar_Precos_Todas_Filiais').dxSwitch({
            value: false,
            switchedOffText: 'NÃO',
            switchedOnText: 'SIM',
            width: '40px',
            onValueChanged: function (e) {
                suppressOnChange(true, "apicarPrecosTodasFiliais");
                if (e.value) {
                    $('#indicacaoReplicacaoAutomaticaPrecos').slideDown();
                    $('#panelParametrosReplicacaoEntreFiliais').slideDown();

                    $('#chk_Lg_Replicar_Precos_Entre_Filiais').dxCheckBox('instance').option('value', true);
                    $('#chk_Lg_Replicar_Dados_Fiscais_Entre_Filiais').dxCheckBox('instance').option('value', true);
                    $('#chk_Lg_Replicar_Regras_Comerciais_Entre_Filiais').dxCheckBox('instance').option('value', true);
                } else {
                    $('#indicacaoReplicacaoAutomaticaPrecos').slideUp();
                    $('#panelParametrosReplicacaoEntreFiliais').slideUp();

                    $('#chk_Lg_Replicar_Precos_Entre_Filiais').dxCheckBox('instance').option('value', false);
                    $('#chk_Lg_Replicar_Dados_Fiscais_Entre_Filiais').dxCheckBox('instance').option('value', false);
                    $('#chk_Lg_Replicar_Regras_Comerciais_Entre_Filiais').dxCheckBox('instance').option('value', false);
                }
                suppressOnChange(false, "apicarPrecosTodasFiliais");
            }
        }).dxSwitch('instance'),

        //REPLICAÇÃO DE PREÇOS - TÉRMINO
        vBtn_Aderir_Pesquisa_Eletronica = $("#btn_Aderir_Pesquisa_Eletronica").dxButton({
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
                            exibeMensagem("info", "Confirmação de leitura obrigatória", "É necessário marcar o checkbox confirmando a leitura dos termos");
                        } else { //LEITURA CONFIRMADA
                            await $.ajax({
                                type: "POST",
                                url: "/Estoque/HabilitaPesquisaEletronicaRadarPreco",
                                data: { pCDProduto: objClassProduto.CD_PRODUTO },
                                success: async function (response) {
                                    if (response.result == "Erro") {
                                        exibeMensagem("error", "Ocorreu um erro ao habilitar a pesquisa eletrônica", response.msg);
                                    }
                                    else {
                                        exibeMensagem("success", "Operação realizada", "Pesquisa eletrônica habilitada com sucesso");
                                    }
                                },
                                failure: function (response) {
                                    exibeMensagem("error", "Ocorreu um erro ao habilitar a pesquisa eletrônica", JSON.parse(response.responseText));
                                }
                            });

                            await GetParametrosGerais();
                            await CarregaRadarPrecos();

                            exit = true;
                            FecharModal("ModalAderirPesquisaEletronicaRadarPreco");
                        }
                    }
                }
            }
        }).dxButton("instance"),

        vChk_Confirmacao_Leitura_Pesquisa_Eletronica = $("#chk_Confirmacao_Leitura_Pesquisa_Eletronica").dxCheckBox({
            text: "Li os termos acima descritos",
        }).dxCheckBox("instance"),

        vListPendenciasCadastro = $("#listPendenciasCadastro").dxTreeView({
            dataSource: [],
            dataStructure: "plain",
            parentIdExpr: "CD_VALIDACAO_PAI",
            keyExpr: "CD_VALIDACAO",
            rootValue: "0",
            selectByClick: true,
            selectionMode: "single",
            itemTemplate: function (itemData, itemIndex, itemElement) {
                var itemClass = (itemData.CD_VALIDACAO_PAI == null ? (itemData.LG_PENDENTE ? "alert-danger" : "alert-success") : "panel-white");
                var itemStyle = itemData.CD_VALIDACAO_PAI == null ? "" : "background-color: white";
                var iconClass = itemData.LG_PENDENTE ? "fa-close text-danger" : "fa-check text-success";

                var text = itemData.LG_PENDENTE ? itemData.DS_VALIDACAO_PENDENTE : itemData.DS_VALIDACAO_OK;

                var div = $(`<div class="row mb-1 mt-0 ${itemClass}" style="${itemStyle}">
                             <div class="col-lg-12 mb-0 mt-0">
                                 <h5 style="cursor: pointer;">
                                     <i class="fa ${iconClass}" style="font-size: 20px;"></i>
                                     <n class="mt-0">${text}</n>
                                 </h5>
                             </div>
                         </div>`);

                itemElement.append(div);
            },
        }).dxTreeView("instance"),

        vDdb_Cadastros_Dependentes = $('#ddb_Cadastros_Dependentes').dxDropDownButton({
            text: 'Cadastros Dependentes',
            icon: 'hierarchy',
            elementAttr: {
                class: "drop-down-button"
            },
            items: [
                {
                    text: 'Origem de Produto',
                    icon: "spinnext",
                    onClick(e) {
                        window.open("../cadastrosgerais/origemProduto", '_blank').focus();
                    },
                },
                {
                    text: 'Família de Produto',
                    icon: "spinnext",
                    onClick(e) {
                        window.open("../cadastrosgerais/familiaProduto", '_blank').focus();
                    },
                },
                {
                    text: 'Unidade de Medida',
                    icon: "spinnext",
                    onClick(e) {
                        window.open("../cadastrosgerais/unidadedemedida", '_blank').focus();
                    },
                },
                {
                    text: 'Departamento (e-Commerce)',
                    icon: "spinnext",
                    onClick(e) {
                        window.open("../eCommerceDepartamento/eCommerceDepartamento", '_blank').focus();
                    },
                },
                {
                    text: 'Categoria (e-Commerce)',
                    icon: "spinnext",
                    onClick(e) {
                        window.open("../eCommerceCategoria/eCommerceCategoria", '_blank').focus();
                    },
                },
                {
                    text: 'Marca (e-Commerce)',
                    icon: "spinnext",
                    onClick(e) {
                        window.open("../eCommerceMarca/eCommerceMarca", '_blank').focus();
                    },
                },
            ],
        }),

        carregaFiliaisAcesso(),
        carregaOrigemProduto(),
        carregaFamiliaProduto(),
        carregaUnidadeMedida(),
        carregaSituacaoTributaria(),
        carregaSituacaoTributariaPIS(),
        carregaSituacaoTributariaCOFINS(),
    ]);

    vCamposDadosGeraisCriados = true;
}

function validaParametrosReplicaoPrecos() {
    var precos = vChk_Lg_Replicar_Precos_Entre_Filiais.option('value');
    var fiscal = vChk_Lg_Replicar_Dados_Fiscais_Entre_Filiais.option('value');
    var comercial = vChk_Lg_Replicar_Regras_Comerciais_Entre_Filiais.option('value');

    console.log("Caller", arguments.callee.caller.name);
    console.log("precos", precos);
    console.log("fiscal", fiscal);
    console.log("comercial", comercial);

    if (precos || fiscal || comercial) {
        console.log("aqui 1")
        $('#indicacaoReplicacaoAutomaticaPrecos').slideDown();
        $('#panelParametrosReplicacaoEntreFiliais').slideDown();
        $('#chk_Aplicar_Precos_Todas_Filiais').dxSwitch('instance').option('value', true);
    } else {
        console.log("aqui 2")
        $('#indicacaoReplicacaoAutomaticaPrecos').slideUp();
        $('#panelParametrosReplicacaoEntreFiliais').slideUp();
        $('#chk_Aplicar_Precos_Todas_Filiais').dxSwitch('instance').option('value', false);
    }
}

function configuraAbaDadosGerais() {
    rolarTopo();

    //CONFIGURA O ASSITENTE DE PREENCHIMENTO DE APLICAÇÃO
    if (objClassParametrosEmpresa.CD_SEGMENTO == 2) {
        $("#panelAssistentePreenchimentoAplicacao").show();
    } else {
        $("#panelAssistentePreenchimentoAplicacao").hide();
    }

    //CONFIGURA OS PAINEIS DE CURSO DE FORMAÇÃO DE PREÇOS
    if (objClassUsuario.LG_EXIBE_BANNER_CURSO_PRECIFICACAO == true) {
        exibirSugestaoCursoInclusao();
        exibirSugestaoCurso();
    } else {
        fecharSugestaoCursoInclusao();
        fecharSugestaoCurso();
    }

    if (objClassProduto.OPERACAO == "I") { //Inclusão
        if (objClassParametrosEmpresa.LG_COD_PRODUTO_AUTOMATICO == true) {
            vTxt_Cd_Produto.option("readOnly", true);
            vTxt_Cd_Produto.option("label", 'Código Interno (Automático)');
        } else {
            vTxt_Cd_Produto.option("readOnly", false);
            vTxt_Cd_Produto.option("label", 'Código Interno *');
        }

        vLkp_Filtro_Pesquisa_Produtos.option("value", null);

        $('#dt_Cadastro').hide();
        $('#dt_Atualizacao').hide();
        $('#txt_Cd_Login_Inclusao').hide();
        $("#cardRadarPrecos").hide();
        $("#cardRadarPrecosFechado").hide();
        $('#abaAcessoPrecificacao').hide();
        $('#abaAcessoFornecedores').hide();
        $('#abaAcessoEstoque').hide();
        $('#abaAcessoMentorVendas').hide();
        $('#abaAcessoECommerce').hide();
        $('#abaAcessoSimilaresComplementares').hide();
        $('#abaAcessoEstatisticas').hide();
        $("#panelDadosGerais").removeClass("col-lg-9").addClass("col-lg-12");
        $('#panelFotoProduto').hide();
        $("#panelPrecificacaoInclusao").show();
        $("#divAlmoxarifadosInclusao").show();
        $("#divDadosFiscaisPrecificacaoInclusao").show();
    }
    else { //Alteração
        vTxt_Cd_Produto.option("label", 'Código Interno');

        $('#dt_Cadastro').show();
        $('#dt_Atualizacao').show();
        $('#txt_Cd_Login_Inclusao').show();
        $('#abaAcessoPrecificacao').show();
        $('#abaAcessoFornecedores').show();
        $('#abaAcessoEstoque').show();
        $('#abaAcessoMentorVendas').show();
        $('#abaAcessoECommerce').show();
        $('#abaAcessoSimilaresComplementares').show();
        $('#abaAcessoEstatisticas').show();
        $("#panelDadosGerais").removeClass("col-lg-12").addClass("col-lg-9");
        $('#panelFotoProduto').show();
        $("#panelPrecificacaoInclusao").hide();
        $("#divAlmoxarifadosInclusao").hide();
        $("#divDadosFiscaisPrecificacaoInclusao").hide();
    }
}

function GetParametrosGerais() {
    var deferred = new $.Deferred;

    //BUSCA OS PARAMETROS
    $.ajax({
        type: "POST",
        url: "/Estoque/GetParametrosGerais",
        success: function (response) {
            if (response.result == "Erro") {
                exibeMensagem("error", "Ocorreu um erro ao buscar os parâmetros iniciais", response.msg);
                deferred.reject(response.msg);
            }
            else {
                objClassParametrosEmpresa.CD_EMPRESA = response[0].CD_EMPRESA;
                objClassParametrosEmpresa.DS_NOME_EMPRESA = response[0].DS_NOME_EMPRESA;
                objClassParametrosEmpresa.CD_SEGMENTO = response[0].CD_SEGMENTO;
                objClassParametrosEmpresa.LG_DESCADASTRADO_PESQUISA_PRECO = isNull(response[0].LG_DESCADASTRADO_PESQUISA_PRECO, true);

                objClassParametrosEmpresa.LG_COD_PRODUTO_AUTOMATICO = isNull(response[0].LG_COD_PRODUTO_AUTOMATICO, false);
                objClassParametrosEmpresa.PC_SOBRE_PRECO_VENDEDOR = isNull(response[0].PC_SOBRE_PRECO_VENDEDOR, 0);
                objClassParametrosEmpresa.PC_SOBRE_PRECO_GERENTE = isNull(response[0].PC_SOBRE_PRECO_GERENTE, 0);
                objClassParametrosEmpresa.PC_SOBRE_PRECO_DIRETORIA = isNull(response[0].PC_SOBRE_PRECO_DIRETORIA, 0);
                objClassParametrosEmpresa.PC_SOBRE_PRECO_FINANCEIRO = isNull(response[0].PC_SOBRE_PRECO_FINANCEIRO, 0);

                objClassParametrosEmpresa.QT_DECIMAIS_COMPRA = isNull(response[0].QT_DECIMAIS_COMPRA, 2);
                objClassParametrosEmpresa.QT_DECIMAIS_VENDA = isNull(response[0].QT_DECIMAIS_VENDA, 2);

                $("#spanSobrePrecoVendedor").text(formataNumero(objClassParametrosEmpresa.PC_SOBRE_PRECO_VENDEDOR, 2, 5));
                $("#spanSobrePrecoGerente").text(formataNumero(objClassParametrosEmpresa.PC_SOBRE_PRECO_GERENTE, 2, 5));
                $("#spanSobrePrecoDiretor").text(formataNumero(objClassParametrosEmpresa.PC_SOBRE_PRECO_DIRETORIA, 2, 5));
                $("#spanSobrePrecoFinanceiro").text(formataNumero(objClassParametrosEmpresa.PC_SOBRE_PRECO_FINANCEIRO, 2, 5));

                deferred.resolve();
            }
        },
        failure: function (response) {
            exibeMensagem("error", "Ocorreu um erro ao buscar os parâmetros iniciais", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function CarregaConsultaProdutos() {
    var deferred = new $.Deferred;

    var filtroStatus = vLkp_Status_Produto_Consulta.option('value');
    filtroStatus = `{CD_STATUS: ${filtroStatus == null ? 'null' : `"${filtroStatus}"`}}`;

    GetAzureDataSource(16, filtroStatus).then((result) => {
        if (result.success) {
            vGridConsultaProdutos.option("dataSource", result.data);
            deferred.resolve();
        }
        else {
            exibeMensagem("error", result.name, result.error);
            deferred.reject();
        }
    });

    return deferred.promise();
}

function CadastrarNovoProduto() {
    $("#abaAcessoDados").click();
    rolarTopo();

    objClassProduto = new classProduto();
    objClassProduto.OPERACAO = "I";

    LimpaCamposCadastro();
    configuraAbaDadosGerais();

    vLkp_Status_Produto.option("value", "A");
    vLkp_Fora_Linha.option("value", false);
}

function carregaOrigemProduto() {
    var deferred = new $.Deferred;

    GetAzureDataSource(51, '{CD_STATUS: "A"}').then((result) => {
        if (result.success) {
            vLkp_Origem_Produto.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar as origens de produtos", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaFamiliaProduto() {
    var deferred = new $.Deferred;

    Load_Azr_DropDownBox_FamiliaProduto(COMPONENTES, 'lkp_Familias', 'Família do Produto *', 1).then(() => {
        vDbx_Familias = DevExpress.ui.dxDropDownBox.getInstance('#lkp_Familias');
        $('#lkp_Familias').dxValidator({
            validationRules: [{
                type: 'required', message: 'Família do Produto obrigatória',
            }], validationGroup: 'DadosGerais'
        });

        deferred.resolve();
    })

    return deferred.promise();
}

function carregaUnidadeMedida() {
    var deferred = new $.Deferred;

    GetAzureDataSource(52, '{CD_STATUS: "A"}').then((result) => {
        if (result.success) {
            vLkp_Unidade_Medida_Compra.option("dataSource", result.data);
            vLkp_Unidade_Medida_Venda.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar as unidades de medida", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaFiliaisAcesso() {
    var deferred = new $.Deferred;

    GetAzureDataSource(33, '{CD_STATUS: "A"}').then((result) => {
        if (result.success) {
            dataSourceFiliaisAcesso = result.data.sort(function (a, b) { return a.CD_FILIAL - b.CD_FILIAL });
            vTag_Filiais_Precificacao_Inclusao.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar as situações tributárias de ICMS", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaSituacaoTributaria() {
    var deferred = new $.Deferred;

    GetAzureDataSource(54, '{CD_STATUS: "A"}').then((result) => {
        if (result.success) {
            dataSourceSituacaoTributaria = result.data
            vLkp_Situacao_Tributaria_Inclusao.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar as situações tributárias de ICMS", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaSituacaoTributariaPIS() {
    var deferred = new $.Deferred;

    GetAzureDataSource(55).then((result) => {
        if (result.success) {
            dataSourceSituacaoTributariaPIS = result.data;
            vLkp_Situacao_Tributaria_PIS_Inclusao.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar as situações tributárias do PIS", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaSituacaoTributariaCOFINS() {
    var deferred = new $.Deferred;

    GetAzureDataSource(56).then((result) => {
        if (result.success) {
            dataSourceSituacaoTributariaCOFINS = result.data;
            vLkp_Situacao_Tributaria_COFINS_Inclusao.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar as situações tributárias do COFINS", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function CarregaProdutoAlteracao(pCDProduto) {
    showProcessPanel("Carregando...", arguments.callee.name);

    vSuprimeConfiguracaoIndicadoresCadastro = true;

    var deferred = new $.Deferred;

    objClassProduto = new classProduto();
    objClassProduto.CD_PRODUTO = pCDProduto;
    objClassProduto.OPERACAO = "A";

    LimpaCamposCadastro();
    configuraAbaDadosGerais();

    //BUSCA OS DADOS GERAIS DO PRODUTO
    GetAzureDataSource(65, `{CD_PRODUTO: "${pCDProduto}"}`).then(async (result) => {
        if (result.success) {
            var PRODUTO = result.data[0];

            //CARREGA O FORNECEDOR PADRÃO
            CarregaFornecedorPadrao(PRODUTO.CD_PRODUTO);

            vTxt_Cd_Produto.option("value", PRODUTO.CD_PRODUTO);
            vTxt_Cd_Produto.option("readOnly", true);
            vLkp_Fora_Linha.option("value", isNull(PRODUTO.LG_FORA_LINHA, false));
            vLkp_Status_Produto.option("value", PRODUTO.CD_STATUS);
            vTxt_Ds_Produto.option("value", PRODUTO.DS_PRODUTO);
            vTxt_Ds_Produto_Reduzida.option("value", PRODUTO.DS_PRODUTO_REDUZIDA);
            vChk_Encomenda.option("value", isNull(PRODUTO.LG_ENCOMENDA, false));
            vChk_Faturamento_Bloqueado.option("value", isNull(PRODUTO.LG_PRODUTO_BLOQUEADO_REVISAO, false));
            vLkp_Origem_Produto.option("value", PRODUTO.CD_ORIGEM);
            vDbx_Familias.option("value", PRODUTO.CD_FAMILIA.toString());
            vTxt_Ds_Marca.option("value", PRODUTO.DS_MARCA);
            vNbx_Qt_Multiplo_Compra.option("value", PRODUTO.QT_MULTIPLO_COMPRA);
            vNbx_Ps_Produto_Compra.option("value", PRODUTO.PS_PRODUTO_COMPRA);
            vLkp_Unidade_Medida_Compra.option("value", PRODUTO.CD_UNIDADE_MEDIDA_COMPRA);
            vLkp_Unidade_Medida_Venda.option("value", PRODUTO.CD_UNIDADE_MEDIDA_VENDA);
            vNbx_Ps_Produto_Venda.option("value", PRODUTO.PS_PRODUTO_VENDA);
            vLkp_Operador_Conversao.option("value", PRODUTO.CD_OPERADOR_CONVERSAO);
            vNbx_Fator_Conversao.option("value", PRODUTO.VL_FATOR_CONVERSAO);
            vTxt_Cd_EAN_Produto.option("value", PRODUTO.CD_EAN_PRODUTO);
            vTxt_Cd_Fabricante.option("value", PRODUTO.CD_FABRICANTE);
            vTxt_Cd_Original.option("value", PRODUTO.CD_ORIGINAL);
            vTxt_Cd_Opcional.option("value", PRODUTO.CD_OPCIONAL);
            vNbx_Cd_NCM.option("value", PRODUTO.CD_NCM);
            vNbx_Cd_CEST.option("value", PRODUTO.CD_CEST);
            vTxt_Nr_FCI.option("value", PRODUTO.NR_FCI);
            vLkp_Situacao_Tributaria_Inclusao.option("value", PRODUTO.CD_SITUACAO_TRIBUTARIA);
            vLkp_Situacao_Tributaria_PIS_Inclusao.option("value", PRODUTO.CD_SITUACAO_TRIBUTARIA_PIS);
            vLkp_Situacao_Tributaria_COFINS_Inclusao.option("value", PRODUTO.CD_SITUACAO_TRIBUTARIA_COFINS);
            vTxt_Ds_Aplicacao.option("value", PRODUTO.DS_TEXTO_EXPLICATIVO);
            vChk_Lg_Kit.option("value", isNull(PRODUTO.LG_KIT, false));
            vChk_Lg_Kit_Movimento_Estoque_Producao.option("value", isNull(PRODUTO.LG_MOVIMENTA_ESTOQUE_PRODUCAO_KIT, false));
            vChk_Lg_Kit_Venda_Diversas_Unidades_Medida.option("value", isNull(PRODUTO.LG_VENDA_UNIDADE_MEDIDA_DIVERSAS, false));
            vChk_Lg_Controla_Lote.option("value", isNull(PRODUTO.LG_ESTOQUE_LOTE, false));
            vChk_Lg_Controla_Validade_Lote.option("value", isNull(PRODUTO.LG_CONTROLA_VALIDADE_LOTE, false));
            vChk_Lg_Reaproveita_Lote.option("value", isNull(PRODUTO.LG_REAPROVEITA_LOTE_EXISTENTE, false));
            vChk_Lg_Informa_Lote_Fabricante.option("value", isNull(PRODUTO.LG_INFORMA_LOTE_FABRICANTE, false));
            vChk_Lg_Imprime_Lote_Etiqueta.option("value", isNull(PRODUTO.LG_IMPRIME_LOTE_ETIQUETA, false));
            vChk_Lg_Pneu.option("value", isNull(PRODUTO.LG_PNEU, false));
            vChk_Lg_Utiliza_Ordem_Servico_Producao.option("value", isNull(PRODUTO.LG_UTILIZA_ORDEM_SERVICO_PRODUCAO, false));
            vChk_Lg_Obrigatorio_Detalhes_Producao_Pedido.option("value", isNull(PRODUTO.LG_OBRIGA_DETALHE_PRODUCAO_VENDA, false));
            vChk_Lg_Preco_Definido_Na_Venda.option("value", isNull(PRODUTO.LG_DEFINIR_PRECO_VENDA_PEDIDO, false));
            vChk_Lg_Exibir_Cod_Fabricante_Obs_NF.option("value", isNull(PRODUTO.LG_EXIBE_CODIGO_FABRICANTE_OBS_ITEM_NF, false));
            vNbx_IPI_Venda.option("value", PRODUTO.PC_IPI_VENDA);
            vNbx_Qt_Maxima_Pedido_Venda_Mes.option("value", PRODUTO.QT_MAXIMA_PEDIDO_VENDA_MES);
            vChk_Lg_Venda_Somente_PF.option("value", isNull(PRODUTO.LG_VENDA_SOMENTE_PF, false));
            vChk_Lg_Venda_Somente_PJ.option("value", isNull(PRODUTO.LG_VENDA_SOMENTE_PJ, false));
            vChk_Lg_Permite_Informar_Quantidade_Conferencia.option("value", isNull(PRODUTO.LG_PERMITE_QUANTIDADE_CONFERENCIA_VENDA, false));
            vNbx_Nr_Dias_Garantia.option("value", PRODUTO.NR_DIAS_COBERTURA_GARANTIA);
            vChk_Lg_Exige_Pedido_Venda_Devolucao.option("value", isNull(PRODUTO.LG_EXIGE_PEDIDO_VENDA_DEVOLUCAO, false));
            vTxt_Cd_Unidade_Tributacao_Exportacao.option("value", PRODUTO.CD_UNIDADE_MEDIDA_TRIBUTACAO);
            vTxt_Cd_EAN_Tributacao_Exportacao.option("value", PRODUTO.CD_EAN_TRIBUTACAO);
            vLkp_Operador_Conversao_Exportacao.option("value", PRODUTO.CD_OPERADOR_CONVERSAO_TRIBUTACAO);
            vNbx_Fator_Conversao_Exportacao.option("value", PRODUTO.VL_FATOR_CONVERSAO_TRIBUTACAO);
            vChk_Lg_Bloquear_Impressao_Etiqueta_Recebimento.option("value", isNull(PRODUTO.LG_BLOQUEAR_IMPRESSAO_ETIQUETA_PRECO, false));
            vChk_Lg_Bloquear_Escrituracao_SPED.option("value", isNull(PRODUTO.LG_BLOQUEIA_ESCRITURACAO_SPED, false));
            vLkp_Tipo_Produto_SPED.option("value", PRODUTO.CD_TIPO_PRODUTO_SPED);
            vChk_Lg_Combustivel_Solvente.option("value", isNull(PRODUTO.LG_COMBUSTIVEL_SOLVENTE, false));
            vNbx_Cd_Caracteristica_Fisico_Quimica_ANP.option("value", PRODUTO.CD_CARACTERISTICA_FISICO_QUIMICA_ANP);
            vNbx_Cd_Metodo_Afericao_Caracteristica.option("value", PRODUTO.CD_METODO_AFERICAO_CARACTERISTICA);
            vNbx_Vl_Caracteristica.option("value", PRODUTO.VL_CARACTERISTICA);
            vNbx_Qt_Massa_Especifica.option("value", PRODUTO.QT_MASSA_ESPECIFICA);
            vLkp_Grandeza.option("value", PRODUTO.CD_GRANDEZA);
            vNbx_Qt_Medida_Grandeza.option("value", PRODUTO.QT_MEDIDA_GRANDEZA);
            vTxt_Cd_Ativo.option("value", PRODUTO.CD_ATIVO);
            vTxt_Cd_Modelo.option("value", PRODUTO.CD_MODELO);
            vTxt_Cd_Serie.option("value", PRODUTO.CD_SERIE);
            vTxt_Ds_Pressao_Potencia.option("value", PRODUTO.DS_PRESSAO_POTENCIA);
            vTxt_Ds_Vazao.option("value", PRODUTO.DS_VAZAO);
            vTxt_Ds_Consumo.option("value", PRODUTO.DS_CONSUMO);
            vTxt_Ds_Capacidade.option("value", PRODUTO.DS_CAPACIDADE);
            vTxt_Cd_Login_Inclusao.option("value", PRODUTO.CD_LOGIN_INCLUSAO);
            vDbx_Dt_Cadastro.option("value", PRODUTO.DT_INCLUSAO);
            vDbx_Dt_Atualizacao.option("value", PRODUTO.DT_ATUALIZACAO);
            vChk_Lg_Replicar_Precos_Entre_Filiais.option("value", isNull(PRODUTO.LG_REPLICAR_PRECOS_ENTRE_FILIAIS, false));
            vChk_Lg_Replicar_Dados_Fiscais_Entre_Filiais.option("value", isNull(PRODUTO.LG_REPLICAR_DADOS_FISCAIS_ENTRE_FILIAIS, false));
            vChk_Lg_Replicar_Regras_Comerciais_Entre_Filiais.option("value", isNull(PRODUTO.LG_REPLICAR_REGRAS_COMERCIAIS_ENTRE_FILIAIS, false));
            //vChk_Aplicar_Precos_Todas_Filiais.option('value', isNull(PRODUTO.LG_REPLICAR_PRECOS_ENTRE_FILIAIS, false) || isNull(PRODUTO.LG_REPLICAR_DADOS_FISCAIS_ENTRE_FILIAIS, false) || isNull(PRODUTO.LG_REPLICAR_REGRAS_COMERCIAIS_ENTRE_FILIAIS, false));

            await Promise.all([
                CarregaRadarPrecos(),
                getPendenciasCadastro(),
            ]);

            if (vCamposPrecificacaoCriados) {
                await carregaPrecificacaoPrimeiraFilial();
            }

            vSuprimeConfiguracaoIndicadoresCadastro = false;
            configuraIndicadoresCadastroProduto();

            hideProcessPanel(arguments.callee.name);
            deferred.resolve();
        }
        else {
            exibeMensagem("error", result.name, result.error);
            deferred.reject();
        }
    });

    return deferred.promise();
}

async function getPendenciasCadastro() {
    var queryParam = JSON.stringify({
        CD_EMPRESA: objClassParametrosEmpresa.CD_EMPRESA,
        CD_PRODUTO: objClassProduto.CD_PRODUTO
    });

    await GetAzureDataSource(76, queryParam).then((result) => {
        if (result.success) {
            vListPendenciasCadastro.option("dataSource", result.data)

            //$("#indicadorCadastroIncompleto").slideUp();
            //$("#indicadorProntoComercializar").slideUp();

            //MONTA UM ARRAY CONTENDO SOMENTE A VALIDACAO BASE
            validacaoBase = result.data.filter(a => a.CD_VALIDACAO_PAI == null);

            ////TESTA SE ALGUM ITEM ESTÁ PENDENTE
            //var resultValidacao = validacaoBase.some((item, index) => {
            //    if (item.LG_PENDENTE) return false;
            //});

            resultValidacaoCadastro = true;
            validacaoBase.forEach((item) => {
                if (item.LG_PENDENTE) {
                    resultValidacaoCadastro = false;
                    vListPendenciasCadastro.expandItem(item.CD_VALIDACAO);
                }
            })

            //    if (resultValidacao) {
            //        $("#indicadorProntoComercializar").slideDown();
            //    } else {
            //        $("#indicadorCadastroIncompleto").slideDown();
            //    }
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao verificar as pendencias do cadastro", result.name + " " + result.error);
        }
    })
}

function configuraIndicadoresCadastroProduto() {
    if (vLkp_Status_Produto.option("value") == "I") {
        if ($("#indicadorInativo").css("display") == "none") {
            $("#indicadorInativo").slideDown();
        }

        if (componentVisible("indicadorCadastroIncompleto")) {
            $("#indicadorCadastroIncompleto").slideUp();
        }
        if (componentVisible("indicadorProntoComercializar")) {
            $("#indicadorProntoComercializar").slideUp();
        }
    } else {
        if (componentVisible("indicadorInativo")) {
            $("#indicadorInativo").slideUp();
        }

        if (resultValidacaoCadastro == true) {
            $("#indicadorCadastroIncompleto").slideUp();
            if (!componentVisible("indicadorProntoComercializar")) {
                $("#indicadorProntoComercializar").slideDown();
            }
        } else {
            $("#indicadorProntoComercializar").slideUp();
            if (!componentVisible("indicadorCadastroIncompleto")) {
                $("#indicadorCadastroIncompleto").slideDown();
            }
        }
    }

    if (vChk_Faturamento_Bloqueado.option("value") == true) {
        if (!componentVisible("indicadorFaturamentoBloqueado")) {
            $("#indicadorFaturamentoBloqueado").slideDown();
        }
    } else {
        if (componentVisible("indicadorFaturamentoBloqueado")) {
            $("#indicadorFaturamentoBloqueado").slideUp();
        }
    }

    if (vChk_Encomenda.option("value") == true) {
        if (!componentVisible("indicadorEncomenda")) {
            $("#indicadorEncomenda").slideDown();
        }
    } else {
        if (componentVisible("indicadorEncomenda")) {
            $("#indicadorEncomenda").slideUp();
        }
    }

    if (vLkp_Fora_Linha.option("value") == true) {
        if (!componentVisible("indicadorForaLinha")) {
            $("#indicadorForaLinha").slideDown();
        }
    } else {
        if (componentVisible("indicadorForaLinha")) {
            $("#indicadorForaLinha").slideUp();
        }
    }
}

function componentVisible(pId) {
    return [undefined, "flex", "block"].includes($("#" + pId).css("display"))
}

function CarregaFornecedorPadrao(pCDProduto) {
    var deferred = new $.Deferred;

    $.ajax({
        type: "POST",
        url: "/Estoque/GetFornecedorPadrao",
        data: { pCDProduto: pCDProduto },
        success: function (response) {
            if (response.result == "Erro") {
                exibeMensagem("error", "Ocorreu um erro ao buscar o fornecedor padrão", response.msg);
                deferred.reject(response.msg);
            }
            else {
                vLkp_Fornecedor_Padrao.option("value", response.Cd_Fornecedor_Padrao);
                deferred.resolve();
            }
        },
        failure: function (response) {
            exibeMensagem("error", "Ocorreu um erro ao buscar o fornecedor padrão", JSON.parse(response.responseText));
            deferred.reject();
        }
    });

    return deferred.promise();
}

function CarregaRadarPrecos() {
    var deferred = new $.Deferred;

    objClassProduto.LG_RADAR_PRECO_VALIDADO = false;

    $("#corpoRadarPreco").hide();
    $("#SemInformacaoRadarPreco").hide();
    $("#AderirPesquisaEletronica").hide();
    if ($("#cardRadarPrecos").css("display") == "none") {
        $("#cardRadarPrecosFechado").show();
    }

    //VERIFICA SE O RADAR SERÁ DESABILITADO (EMPRESA DESCADASTRADA)
    if (objClassParametrosEmpresa.LG_DESCADASTRADO_PESQUISA_PRECO == true) {
        $("#AderirPesquisaEletronica").show();
        if (objClassUsuario.NR_NIVEL_ACESSO == 0) {
            $("#divBotaoAderirPesquisaEletronica").hide();
        } else {
            $("#divBotaoAderirPesquisaEletronica").show();
        }
        deferred.resolve();
        return;
    }

    //VERIFICA SE O PRODUTO POSSUI EAN PARA BUSCAR OS DADOS NO CATÁLOGO CONTRUHUB
    if (!vTxt_Cd_EAN_Produto.option('value')) {
        $("#mensagemRadarPreco").text("Não foi possível realizar a pesquisa no Radar de Preços");
        $("#complementoMensagemRadarPreco").text("O produto não possui código de barras");
        $("#SemInformacaoRadarPreco").show();
        deferred.resolve();
        return;
    }

    let options = null;

    var param = {
        CD_EMPRESA: objClassParametrosEmpresa.CD_EMPRESA,
        CD_EAN: vTxt_Cd_EAN_Produto.option('value'),
        CD_LOGIN: objClassUsuario.CD_LOGIN,
    }

    //CATÁLOGO DE PRODUTOS CONSTRUHUB
    GetAzureDataSource(77, JSON.stringify(param)).then((result) => {
        if (result.success) {

            if (result.data.length == 0) {
                $("#mensagemRadarPreco").text("Não encontramos informações suficientes para tabular a pesquisa");
                $("#complementoMensagemRadarPreco").text("São necessárias, no mínimo, dez empresas participantes que tenham o código de barras cadastrado para este produto");
                $("#SemInformacaoRadarPreco").show();
                deferred.resolve();
                return;
            }

            var catalogo = result.data[0];

            //POPULA OS DADOS NA CLASSE DO PRODUTO
            objClassProduto.VL_CUSTO_LIQUIDO_RADAR_PRECO = round(catalogo.VL_PRECO_CUSTO_SEM_IMPOSTOS_MEDIO, objClassParametrosEmpresa.QT_DECIMAIS_COMPRA);
            objClassProduto.VL_CUSTO_TOTAL_RADAR_PRECO = round(catalogo.VL_PRECO_CUSTO_COM_IMPOSTOS_MEDIO, objClassParametrosEmpresa.QT_DECIMAIS_COMPRA);
            objClassProduto.VL_PRECO_VENDA_RADAR_PRECO = round(catalogo.VL_PRECO_VENDA_MEDIO, objClassParametrosEmpresa.QT_DECIMAIS_VENDA);

            objClassProduto.LG_RADAR_PRECO_VALIDADO = true;
            $("#corpoRadarPreco").show();

            options = {
                series: [{
                    name: 'Preço de Venda',
                    data: [
                        round(catalogo.VL_PRECO_VENDA_MAIOR, objClassParametrosEmpresa.QT_DECIMAIS_VENDA),
                        round(catalogo.VL_PRECO_VENDA_MENOR, objClassParametrosEmpresa.QT_DECIMAIS_VENDA),
                        round(catalogo.VL_PRECO_VENDA_MEDIO, objClassParametrosEmpresa.QT_DECIMAIS_VENDA),
                        round(isNull(catalogo.VL_PRECO_VENDA_LOJA, 0), objClassParametrosEmpresa.QT_DECIMAIS_VENDA)
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
                        return formataNumero(val, 2, objClassParametrosEmpresa.QT_DECIMAIS_VENDA);
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
                            return formataNumero(val, 2, objClassParametrosEmpresa.QT_DECIMAIS_VENDA);
                        }
                    }
                }
            };

            var chartPrecoVenda = new ApexCharts(document.querySelector("#chartPrecoVenda"), options);
            chartPrecoVenda.render();
            chartPrecoVenda.update();

            options = {
                series: [{
                    name: 'Preço de Custo Sem Impostos',
                    data: [
                        round(catalogo.VL_PRECO_CUSTO_SEM_IMPOSTOS_MAIOR, objClassParametrosEmpresa.QT_DECIMAIS_COMPRA),
                        round(catalogo.VL_PRECO_CUSTO_SEM_IMPOSTOS_MENOR, objClassParametrosEmpresa.QT_DECIMAIS_COMPRA),
                        round(catalogo.VL_PRECO_CUSTO_SEM_IMPOSTOS_MEDIO, objClassParametrosEmpresa.QT_DECIMAIS_COMPRA),
                        round(isNull(catalogo.VL_PRECO_CUSTO_SEM_IMPOSTOS_LOJA, 0), objClassParametrosEmpresa.QT_DECIMAIS_COMPRA)
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
                        return formataNumero(val, 2, objClassParametrosEmpresa.QT_DECIMAIS_COMPRA);
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
                            return formataNumero(val, 2, objClassParametrosEmpresa.QT_DECIMAIS_COMPRA);
                        }
                    }
                }
            };

            var chartCustoSemImpostos = new ApexCharts(document.querySelector("#chartCustoSemImpostos"), options);
            chartCustoSemImpostos.render();
            chartCustoSemImpostos.update();

            options = {
                series: [{
                    name: 'Preço de Custo Com Impostos',
                    data: [
                        round(catalogo.VL_PRECO_CUSTO_COM_IMPOSTOS_MAIOR, objClassParametrosEmpresa.QT_DECIMAIS_COMPRA),
                        round(catalogo.VL_PRECO_CUSTO_COM_IMPOSTOS_MENOR, objClassParametrosEmpresa.QT_DECIMAIS_COMPRA),
                        round(catalogo.VL_PRECO_CUSTO_COM_IMPOSTOS_MEDIO, objClassParametrosEmpresa.QT_DECIMAIS_COMPRA),
                        round(isNull(catalogo.VL_PRECO_CUSTO_COM_IMPOSTOS_LOJA, 0), objClassParametrosEmpresa.QT_DECIMAIS_COMPRA)
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
                        return formataNumero(val, 2, objClassParametrosEmpresa.QT_DECIMAIS_COMPRA);
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
                            return formataNumero(val, 2, objClassParametrosEmpresa.QT_DECIMAIS_COMPRA);
                        }
                    }
                },
            };

            var chartCustoComImpostos = new ApexCharts(document.querySelector("#chartCustoComImpostos"), options);
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

            var chartMargemLucro = new ApexCharts(document.querySelector("#chartMargemLucro"), options);
            chartMargemLucro.render();
            chartMargemLucro.update();
            //DISPARA O EVENTO RESIZE PARA EXIBIR OS GRÁFICOS DO APEX CHARTS. EXISTE UM PROBLEMA NO APEX CHARTS QUE NÃO 
            //EXIBE OS GRÁFICOS ATÉ QUE A TELA SEJA REDIMENSIONADA.
            window.dispatchEvent(new Event('resize'));

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar o catálogo de produtos Construhub", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function ValidaDadosGerais() {
    rolarTopo();

    //var CD_PRODUTO = vTxt_Cd_Produto.option('value');
    //var CD_PRODUTO_ECOMMERCE = vTxt_Cd_Produto_Ecommerce.option('value');
    //var LG_KIT = vChk_Lg_Kit.option('value');
    //var LG_VENDA_UNIDADE_MEDIDA_DIVERSAS = vChk_Lg_Kit_Venda_Diversas_Unidades_Medida.option('value');
    //var LG_MOVIMENTA_ESTOQUE_PRODUCAO_KIT = vChk_Lg_Kit_Movimento_Estoque_Producao.option('value');

    var CD_UNIDADE_MEDIDA_VENDA = vLkp_Unidade_Medida_Venda.option('value');
    var CD_UNIDADE_MEDIDA_COMPRA = vLkp_Unidade_Medida_Compra.option('value');

    //LIMPA OS VALIDADORES 
    $('#lkp_Operador_Conversao').dxValidator({});
    $('#nbx_Fator_Conversao').dxValidator({});
    $('#txt_Cd_Produto').dxValidator({});
    $('#tag_Filiais_Precificacao_Inclusao').dxValidator({});
    $('#tag_Almoxarifados_Inclusao').dxValidator({});

    if (isNull(CD_UNIDADE_MEDIDA_COMPRA, '') != isNull(CD_UNIDADE_MEDIDA_VENDA, '')) {
        //CONFIGURA O VALIDADOR PARA O OPERADOR DE CONVERSÃO
        $('#lkp_Operador_Conversao').dxValidator({
            validationRules: [{
                type: 'required', message: 'Operador de conversão obrigatório',
            }], validationGroup: 'DadosGerais'
        });

        //CONFIGURA O VALIDADOR PARA O FATOR DE CONVERSÃO
        $('#nbx_Fator_Conversao').dxValidator({
            validationRules: [{
                type: 'required', message: 'Fator de Conversão obrigatório',
            }], validationGroup: 'DadosGerais'
        });
    }

    if (objClassProduto.OPERACAO == "I") { //INCLUSÃO

        //VALIDA SE O CÓDIGO DO PRODUTO DEVE SER INFORMADO
        if (!objClassParametrosEmpresa.LG_COD_PRODUTO_AUTOMATICO) {
            //CONFIGURA O VALIDADOR PARA O CÓDIGO DO PRODUTO
            $('#txt_Cd_Produto').dxValidator({
                validationRules: [{
                    type: 'required', message: 'Código Interno obrigatório',
                }], validationGroup: 'DadosGerais'
            });
        }

        //CONFIGURA O VALIDADOR PARA AS FILIAIS
        $('#tag_Filiais_Precificacao_Inclusao').dxValidator({
            validationRules: [{
                type: 'required', message: 'Filial onde será aplicada a precificação obrigatória',
            }], validationGroup: 'PrecoInclusao'
        });

        //CONFIGURA O VALIDADOR PARA OS ALMOXARIFADOS
        $("#tag_Almoxarifados_Inclusao").dxValidator({
            validationRules: [{
                type: 'required', message: 'Almoxarifado obrigatório',
            }], validationGroup: 'DadosGerais'
        });

        const resultadoValidacaoDadosGerais = DevExpress.validationEngine.validateGroup("DadosGerais");
        const resultadoValidacaoPrecoInclusao = DevExpress.validationEngine.validateGroup("PrecoInclusao");

        if (!resultadoValidacaoDadosGerais.isValid || !resultadoValidacaoPrecoInclusao.isValid) {
            exibeMensagem("info", "Campo de preenchimento obrigatório", "Por favor, verifique o preenchimento dos campos obrigatórios");
            return false;
        }
    }
    else { //ALTERAÇÃO
        const resultadoValidacaoDadosGerais = DevExpress.validationEngine.validateGroup("DadosGerais");

        if (!resultadoValidacaoDadosGerais.isValid) {
            exibeMensagem("info", "Campo de preenchimento obrigatório", "Por favor, verifique o preenchimento dos campos obrigatórios");
            return false;
        }
    }

    ////SE O PRODUTO POSSUI CÓDIGO E-COMMERCE VALIDA AS CONFIGURAÇÕES DO KIT
    //if (CD_PRODUTO_ECOMMERCE && LG_KIT == true && LG_VENDA_UNIDADE_MEDIDA_DIVERSAS == false && LG_MOVIMENTA_ESTOQUE_PRODUCAO_KIT == false) {
    //    exibeMensagem("info", "Configuração inválida", "O kit não pode ter código do e-commerce preenchido se não estiver marcado para movimentar estoque na produção ou não for vendido em diversas unidades de medida");
    //    return false;
    //}

    //if (validaNome) {
    //    $('#indicadorCadastroIncompleto').slideDown();
    //    $('#indicadorProntoComercializar').slideUp();
    //    $('#indicadorNovoProduto').slideUp();
    //} else {
    //    $('#indicadorProntoComercializar').slideDown();
    //    $('#indicadorCadastroIncompleto').slideUp();
    //    $('#indicadorNovoProduto').slideUp();
    //}

    //$("#panelDadosGerais").removeClass("col-lg-12").addClass("col-lg-9");

    //$('#panelFotoProduto').slideDown();
    //$('#cardRadarPrecos').slideDown();
    //ExibirEsconderPaineis('panelPrecificacaoInclusao', 'none');
    //ExibirEsconderPaineis('lkp_Situacao_Tributaria_Inclusao', 'none');
    //ExibirEsconderPaineis('panelBotaoClonarProduto', 'block');

    return true;
}

async function SalvaProdutoDadosGerais() {
    if (ValidaDadosGerais() == false) {
        return;
    }

    var precos = [];
    var almoxarifados = [];
    var fornecedor = [];

    if (objClassProduto.OPERACAO == "I") { //INCLUSÃO
        var selectedFiliais = vTag_Filiais_Precificacao_Inclusao.option('value');
        for (indiceFilial in selectedFiliais) {
            //DESCONTOS DO FORNECEDOR
            var descontosFornecedor = [];
            var selectedDescontos = vTgx_Descontos_Inclusao.option('selectedItems');

            for (indiceDesconto in selectedDescontos) {
                descontosFornecedor.push({
                    Cd_Empresa: objClassParametrosEmpresa.CD_EMPRESA,
                    Cd_Filial: selectedFiliais[indiceFilial],
                    Cd_Produto: vTxt_Cd_Produto.option('value'),
                    Dt_Vigencia: new Date(vDbx_Dt_Vigencia_Inclusao.option('value')).yyyyMMdd() + "T00:00:00Z",
                    Nr_Sequencia: selectedDescontos[indiceDesconto].Sequencia,
                    Pc_Desconto: selectedDescontos[indiceDesconto].Valor
                })
            }

            //CÁLCULO DO FRETE CONFORME O TIPO
            var valorFrete = 0;
            var percentualFrete = 0;
            var tipoFrete = componenteBotaoNumberBoxInclusao.component.option('text') == '%' ? 1 : 2;

            if (tipoFrete == 1) {
                percentualFrete = isNull(vNbx_Pc_Custo_Frete_Inclusao.option('value'), 0);
                valorFrete = round(isNull(vNbx_Vl_Custo_Liquido_Inclusao.option('value'), 0) * percentualFrete / 100, 2);
            }
            else {
                valorFrete = isNull(vNbx_Pc_Custo_Frete_Inclusao.option('value'), 0);
                if (valorFrete > 0) {
                    percentualFrete = round(100 / isNull(vNbx_Vl_Custo_Liquido_Inclusao.option('value'), 0) * valorFrete, 4);
                }
            }

            //PRECIFICAÇÃO
            precos.push({
                CD_EMPRESA: objClassParametrosEmpresa.CD_EMPRESA,
                CD_FILIAL: selectedFiliais[indiceFilial],
                CD_PRODUTO: vTxt_Cd_Produto.option('value'),
                DT_VIGENCIA: new Date(vDbx_Dt_Vigencia_Inclusao.option('value')).yyyyMMdd() + "T00:00:00Z",
                CD_SITUACAO_TRIBUTARIA: vLkp_Situacao_Tributaria_Inclusao.option('value'),
                CD_SITUACAO_TRIBUTARIA_COFINS: vLkp_Situacao_Tributaria_COFINS_Inclusao.option('value'),
                CD_SITUACAO_TRIBUTARIA_PIS: vLkp_Situacao_Tributaria_PIS_Inclusao.option('value'),
                CD_LOGIN: objClassUsuario.CD_LOGIN,
                VL_CUSTO_BRUTO: vNbx_Vl_Custo_Bruto_Inclusao.option('value'),
                PC_DESCONTO_FORNECEDOR_TOTAL: vNbx_Pc_Desconto_Total_Inclusao.option('value'),
                VL_CUSTO_LIQUIDO: vNbx_Vl_Custo_Liquido_Inclusao.option('value'),
                PC_MARKUP: vNbx_Pc_Rentabilidade_Inclusao.option('value'),
                PC_LUCRO: vNbx_Pc_Lucro_Inclusao.option('value'),
                CD_TIPO_CALCULO_FRETE: tipoFrete,
                PC_FRETE_COMPRA: percentualFrete,
                VL_FRETE_COMPRA: valorFrete,
                PC_DESPESAS_DIVERSAS: vNbx_Pc_Custo_Outros_Custos_Inclusao.option('value'),
                PC_IVA: vNbx_Pc_Custo_ST_Inclusao.option('value'),
                VL_CUSTO_TOTAL: vNbx_Vl_Custo_Total_Inclusao.option('value'),
                VL_PRECO_MINIMO_VENDA: vNbx_Vl_Preco_Minimo_Venda_Inclusao.option('value'),
                DESCONTOS_FORNECEDOR: descontosFornecedor,
            })
        }

        //ALMOXARIFADOS
        var selectedAlmoxarifados = vTag_Almoxarifados_Inclusao.option('value');

        for (i in selectedAlmoxarifados) {
            almoxarifados.push({
                CD_EMPRESA: objClassParametrosEmpresa.CD_EMPRESA,
                CD_ALMOXARIFADO: selectedAlmoxarifados[i],
                CD_PRODUTO: vTxt_Cd_Produto.option('value'),
                CD_STATUS: "A",
                LG_ALMOXARIFADO_PADRAO: i == "0" ? true : false,
            })
        }
    }

    //FORNECEDOR
    fornecedor.push({
        Cd_Empresa: objClassParametrosEmpresa.CD_EMPRESA,
        Cd_Produto: vTxt_Cd_Produto.option('value'),
        Cd_Fornecedor: vLkp_Fornecedor_Padrao.option('value'),
        Lg_Fornecedor_Padrao: true,
    });

    let produto = {
        OPERACAO: objClassProduto.OPERACAO,
        CD_EMPRESA: objClassParametrosEmpresa.CD_EMPRESA,
        CD_PRODUTO: vTxt_Cd_Produto.option('value'),
        LG_FORA_LINHA: vLkp_Fora_Linha.option('value'),
        CD_STATUS: vLkp_Status_Produto.option('value'),
        DS_PRODUTO: vTxt_Ds_Produto.option('value'),
        DS_PRODUTO_REDUZIDA: vTxt_Ds_Produto_Reduzida.option('value'),
        LG_ENCOMENDA: vChk_Encomenda.option('value'),
        LG_PRODUTO_BLOQUEADO_REVISAO: vChk_Faturamento_Bloqueado.option('value'),
        CD_ORIGEM: vLkp_Origem_Produto.option('value'),
        CD_FAMILIA: vDbx_Familias.option('value'),
        DS_MARCA: vTxt_Ds_Marca.option('value'),
        QT_MULTIPLO_COMPRA: vNbx_Qt_Multiplo_Compra.option('value'),
        PS_PRODUTO_COMPRA: vNbx_Ps_Produto_Compra.option('value'),
        CD_UNIDADE_MEDIDA_COMPRA: vLkp_Unidade_Medida_Compra.option('value'),
        CD_UNIDADE_MEDIDA_VENDA: vLkp_Unidade_Medida_Venda.option('value'),
        PS_PRODUTO_VENDA: vNbx_Ps_Produto_Venda.option('value'),
        CD_OPERADOR_CONVERSAO: vLkp_Operador_Conversao.option('value'),
        VL_FATOR_CONVERSAO: vNbx_Fator_Conversao.option('value'),
        CD_EAN_PRODUTO: vTxt_Cd_EAN_Produto.option('value'),
        CD_FABRICANTE: vTxt_Cd_Fabricante.option('value'),
        CD_ORIGINAL: vTxt_Cd_Original.option('value'),
        CD_OPCIONAL: vTxt_Cd_Opcional.option('value'),
        CD_NCM: vNbx_Cd_NCM.option('value'),
        CD_CEST: vNbx_Cd_CEST.option('value'),
        NR_FCI: vTxt_Nr_FCI.option('value'),
        CD_SITUACAO_TRIBUTARIA: vLkp_Situacao_Tributaria_Inclusao.option('value'),
        CD_SITUACAO_TRIBUTARIA_PIS: vLkp_Situacao_Tributaria_PIS_Inclusao.option('value'),
        CD_SITUACAO_TRIBUTARIA_COFINS: vLkp_Situacao_Tributaria_COFINS_Inclusao.option('value'),
        DS_TEXTO_EXPLICATIVO: vTxt_Ds_Aplicacao.option('value'),
        LG_KIT: vChk_Lg_Kit.option('value'),
        LG_MOVIMENTA_ESTOQUE_PRODUCAO_KIT: vChk_Lg_Kit_Movimento_Estoque_Producao.option('value'),
        LG_VENDA_UNIDADE_MEDIDA_DIVERSAS: vChk_Lg_Kit_Venda_Diversas_Unidades_Medida.option('value'),
        LG_ESTOQUE_LOTE: vChk_Lg_Controla_Lote.option('value'),
        LG_CONTROLA_VALIDADE_LOTE: vChk_Lg_Controla_Validade_Lote.option('value'),
        LG_REAPROVEITA_LOTE_EXISTENTE: vChk_Lg_Reaproveita_Lote.option('value'),
        LG_INFORMA_LOTE_FABRICANTE: vChk_Lg_Informa_Lote_Fabricante.option('value'),
        LG_IMPRIME_LOTE_ETIQUETA: vChk_Lg_Imprime_Lote_Etiqueta.option('value'),
        LG_PNEU: vChk_Lg_Pneu.option('value'),
        LG_UTILIZA_ORDEM_SERVICO_PRODUCAO: vChk_Lg_Utiliza_Ordem_Servico_Producao.option('value'),
        LG_OBRIGA_DETALHE_PRODUCAO_VENDA: vChk_Lg_Obrigatorio_Detalhes_Producao_Pedido.option('value'),
        LG_DEFINIR_PRECO_VENDA_PEDIDO: vChk_Lg_Preco_Definido_Na_Venda.option('value'),
        LG_EXIBE_CODIGO_FABRICANTE_OBS_ITEM_NF: vChk_Lg_Exibir_Cod_Fabricante_Obs_NF.option('value'),
        PC_IPI_VENDA: vNbx_IPI_Venda.option('value'),
        QT_MAXIMA_PEDIDO_VENDA_MES: vNbx_Qt_Maxima_Pedido_Venda_Mes.option('value'),
        LG_VENDA_SOMENTE_PF: vChk_Lg_Venda_Somente_PF.option('value'),
        LG_VENDA_SOMENTE_PJ: vChk_Lg_Venda_Somente_PJ.option('value'),
        LG_PERMITE_QUANTIDADE_CONFERENCIA_VENDA: vChk_Lg_Permite_Informar_Quantidade_Conferencia.option('value'),
        NR_DIAS_COBERTURA_GARANTIA: vNbx_Nr_Dias_Garantia.option('value'),
        LG_EXIGE_PEDIDO_VENDA_DEVOLUCAO: vChk_Lg_Exige_Pedido_Venda_Devolucao.option('value'),
        CD_UNIDADE_MEDIDA_TRIBUTACAO: vTxt_Cd_Unidade_Tributacao_Exportacao.option('value'),
        CD_EAN_TRIBUTACAO: vTxt_Cd_EAN_Tributacao_Exportacao.option('value'),
        CD_OPERADOR_CONVERSAO_TRIBUTACAO: vLkp_Operador_Conversao_Exportacao.option('value'),
        VL_FATOR_CONVERSAO_TRIBUTACAO: vNbx_Fator_Conversao_Exportacao.option('value'),
        LG_BLOQUEAR_IMPRESSAO_ETIQUETA_PRECO: vChk_Lg_Bloquear_Impressao_Etiqueta_Recebimento.option('value'),
        LG_BLOQUEIA_ESCRITURACAO_SPED: vChk_Lg_Bloquear_Escrituracao_SPED.option('value'),
        CD_TIPO_PRODUTO_SPED: vLkp_Tipo_Produto_SPED.option('value'),
        LG_COMBUSTIVEL_SOLVENTE: vChk_Lg_Combustivel_Solvente.option('value'),
        CD_CARACTERISTICA_FISICO_QUIMICA_ANP: vNbx_Cd_Caracteristica_Fisico_Quimica_ANP.option('value'),
        CD_METODO_AFERICAO_CARACTERISTICA: vNbx_Cd_Metodo_Afericao_Caracteristica.option('value'),
        VL_CARACTERISTICA: vNbx_Vl_Caracteristica.option('value'),
        QT_MASSA_ESPECIFICA: vNbx_Qt_Massa_Especifica.option('value'),
        CD_GRANDEZA: vLkp_Grandeza.option('value'),
        QT_MEDIDA_GRANDEZA: vNbx_Qt_Medida_Grandeza.option('value'),
        CD_ATIVO: vTxt_Cd_Ativo.option('value'),
        CD_MODELO: vTxt_Cd_Modelo.option('value'),
        CD_SERIE: vTxt_Cd_Serie.option('value'),
        DS_PRESSAO_POTENCIA: vTxt_Ds_Pressao_Potencia.option('value'),
        DS_VAZAO: vTxt_Ds_Vazao.option('value'),
        DS_CONSUMO: vTxt_Ds_Consumo.option('value'),
        DS_CAPACIDADE: vTxt_Ds_Capacidade.option('value'),
        PRECOS: precos,
        ALMOXARIFADOS: almoxarifados,
        FORNECEDORES: fornecedor,
    };

    await $.ajax({
        type: "POST",
        url: "/Estoque/SalvaProdutoDadosGerais",
        data: { pProduto: JSON.stringify(produto) },
    }).done(function (response) {
        exibeMensagem("success", "Operação realizada", "Salvo com sucesso");
        vDbx_Dt_Atualizacao.option("value", response.DT_ATUALIZACAO);
        objClassProduto.CD_PRODUTO = response.CD_PRODUTO;

        if (objClassProduto.OPERACAO == "I") { //INCLUSÃO
            $("#indicadorNovoProduto").show();
        }

        configuraAbaDadosGerais("A");
        getPendenciasCadastro();
        configuraIndicadoresCadastroProduto();
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao gravar os dados gerais do produto", response);
    });
}

function LimpaCamposCadastro() {
    suppressOnChange(true, "LimpaCamposCadastro");

    if (vCamposDadosGeraisCriados == true) LimpaCamposDadosGerais();
    if (vCamposPrecificacaoCriados == true) limpaCamposPrecificacao();

    suppressOnChange(false, "LimpaCamposCadastro");
}

function LimpaCamposDadosGerais() {
    $("#lkp_Fornecedor_Padrao").dxLookup("reset");
    $("#lkp_Fornecedor_Padrao").dxValidator("reset");
    $("#lkp_Familias").dxDropDownBox("reset");
    $("#lkp_Familias").dxValidator("reset");
    $("#tag_Almoxarifados_Inclusao").dxTagBox("reset");
    $("#lkp_Origem_Produto").dxLookup("reset");
    $("#lkp_Origem_Produto").dxValidator("reset");
    $("#lkp_Unidade_Medida_Compra").dxLookup("reset");
    $("#lkp_Unidade_Medida_Compra").dxValidator("reset");
    $("#lkp_Unidade_Medida_Venda").dxLookup("reset");
    $("#lkp_Unidade_Medida_Venda").dxValidator("reset");
    $("#lkp_Tipo_Produto_SPED").dxLookup("reset");
    $("#lkp_Situacao_Tributaria_PIS_Inclusao").dxLookup("reset");
    $("#lkp_Situacao_Tributaria_COFINS_Inclusao").dxLookup("reset");
    $("#dt_Cadastro").dxDateBox("reset");
    $("#dt_Atualizacao").dxDateBox("reset");
    $("#txt_Cd_Login_Inclusao").dxTextBox("reset");
    $("#chk_Lg_Encomenda").dxCheckBox("reset");
    $("#chk_Faturamento_Bloqueado").dxCheckBox("reset");
    $("#lkp_Status_Produto").dxLookup("reset");
    $("#lkp_Fora_Linha").dxLookup("reset");
    $("#lkp_Operador_Conversao").dxLookup("reset");
    $("#lkp_Operador_Conversao_Exportacao").dxLookup("reset");
    $("#nbx_Fator_Conversao").dxNumberBox("reset");
    $("#txt_Cd_Unidade_Tributacao_Exportacao").dxTextBox("reset");
    $("#txt_Cd_EAN_Tributacao_Exportacao").dxTextBox("reset");
    $("#nbx_Fator_Conversao_Exportacao").dxNumberBox("reset");
    $("#txt_Cd_Produto").dxTextBox("reset");
    $("#txt_Cd_Produto").dxValidator("reset");
    $("#txt_Ds_Produto").dxTextBox("reset");
    $("#txt_Ds_Produto").dxValidator("reset");
    $("#txt_Ds_Produto_Reduzida").dxTextBox("reset");
    $("#txt_Ds_Produto_Reduzida").dxValidator("reset");
    $("#txt_Ds_Marca").dxTextBox("reset");
    $("#nbx_Qt_Multiplo_Compra").dxNumberBox("reset");
    $("#nbx_Qt_Multiplo_Compra").dxValidator("reset");
    $("#nbx_Ps_Produto_Compra").dxNumberBox("reset");
    $("#nbx_Ps_Produto_Compra").dxValidator("reset");
    $("#nbx_Ps_Produto_Venda").dxNumberBox("reset");
    $("#nbx_Ps_Produto_Venda").dxValidator("reset");
    $("#txt_Cd_Fabricante").dxTextBox("reset");
    $("#txt_Cd_Original").dxTextBox("reset");
    $("#txt_Cd_Opcional").dxTextBox("reset");
    $("#nbx_Cd_NCM").dxNumberBox("reset");
    $("#nbx_Cd_CEST").dxNumberBox("reset");
    $("#txt_Nr_FCI").dxTextBox("reset");
    $("#txt_Ds_Aplicacao").dxTextArea("reset");
    $("#txt_Ds_Marca_Aplicacao").dxTextBox("reset");
    $("#txt_Ds_Modelo_Aplicacao").dxTextBox("reset");
    $("#nbx_Nr_Ano_Inicial_Aplicacao").dxNumberBox("reset");
    $("#nbx_Nr_Ano_Final_Aplicacao").dxNumberBox("reset");
    $("#lkp_Separador_Aplicacao").dxLookup("reset");
    $("#chk_Lg_Kit").dxCheckBox("reset");
    $("#chk_Lg_Kit_Movimento_Estoque_Producao").dxCheckBox("reset");
    $("#chk_Lg_Kit_Venda_Diversas_Unidades_Medida").dxCheckBox("reset");
    $("#chk_Lg_Controla_Lote").dxCheckBox("reset");
    $("#chk_Lg_Controla_Validade_Lote").dxCheckBox("reset");
    $("#chk_Lg_Reaproveita_Lote").dxCheckBox("reset");
    $("#chk_Lg_Informa_Lote_Fabricante").dxCheckBox("reset");
    $("#chk_Lg_Imprime_Lote_Etiqueta").dxCheckBox("reset");
    $("#chk_Lg_Pneu").dxCheckBox("reset");
    $("#chk_Lg_Utiliza_Ordem_Servico_Producao").dxCheckBox("reset");
    $("#chk_Lg_Obrigatorio_Detalhes_Producao_Pedido").dxCheckBox("reset");
    $("#chk_Lg_Permite_Informar_Quantidade_Conferencia").dxCheckBox("reset");
    $("#chk_Lg_Preco_Definido_Na_Venda").dxCheckBox("reset");
    $("#chk_Lg_Exibir_Cod_Fabricante_Obs_NF").dxCheckBox("reset");
    $("#chk_Lg_Venda_Somente_PF").dxCheckBox("reset");
    $("#chk_Lg_Venda_Somente_PJ").dxCheckBox("reset");
    $("#nbx_Qt_Maxima_Pedido_Venda_Mes").dxNumberBox("reset");
    $("#chk_Lg_Bloquear_Impressao_Etiqueta_Recebimento").dxCheckBox("reset");
    $("#chk_Lg_Bloquear_Escrituracao_SPED").dxCheckBox("reset");
    $("#nbx_IPI_Venda").dxNumberBox("reset");
    $("#nbx_Nr_Dias_Garantia").dxNumberBox("reset");
    $("#chk_Lg_Exige_Pedido_Venda_Devolucao").dxCheckBox("reset");
    $("#txt_Cd_Ativo").dxTextBox("reset");
    $("#txt_Cd_Modelo").dxTextBox("reset");
    $("#txt_Cd_Serie").dxTextBox("reset");
    $("#txt_Ds_Pressao_Potencia").dxTextBox("reset");
    $("#txt_Ds_Vazao").dxTextBox("reset");
    $("#txt_Ds_Consumo").dxTextBox("reset");
    $("#txt_Ds_Capacidade").dxTextBox("reset");
    $("#chk_Lg_Combustivel_Solvente").dxCheckBox("reset");
    $("#lkp_Grandeza").dxLookup("reset");
    $("#nbx_Qt_Medida_Grandeza").dxNumberBox("reset");
    $("#nbx_Cd_Caracteristica_Fisico_Quimica_ANP").dxNumberBox("reset");
    $("#nbx_Cd_Metodo_Afericao_Caracteristica").dxNumberBox("reset");
    $("#nbx_Vl_Caracteristica").dxNumberBox("reset");
    $("#nbx_Qt_Massa_Especifica").dxNumberBox("reset");
    $("#lkp_Situacao_Tributaria_Inclusao").dxLookup("reset");
    $("#lkp_Situacao_Tributaria_Inclusao").dxValidator("reset");
    $("#tag_Filiais_Precificacao_Inclusao").dxTagBox("reset");
    $("#dbx_Dt_Vigencia_Inclusao").dxDateBox("reset");
    $("#dbx_Dt_Vigencia_Inclusao").dxValidator("reset");
    $("#nbx_Vl_Custo_Bruto_Inclusao").dxNumberBox("reset");
    $("#nbx_Vl_Custo_Bruto_Inclusao").dxValidator("reset");
    $("#tgxDescontosInclusao").dxTagBox("reset");
    $("#nbx_Pc_Desconto_Total_Inclusao").dxNumberBox("reset");
    $("#nbx_Vl_Custo_Liquido_Inclusao").dxNumberBox("reset");
    $("#nbx_Pc_Custo_IPI_Inclusao").dxNumberBox("reset");
    $("#nbx_Pc_Custo_Frete_Inclusao").dxNumberBox("reset");
    $("#nbx_Pc_Custo_ST_Inclusao").dxNumberBox("reset");
    $("#nbx_Pc_Custo_Outros_Custos_Inclusao").dxNumberBox("reset");
    $("#nbx_Vl_Custo_Total_Inclusao").dxNumberBox("reset");
    $("#nbx_Pc_Lucro_Inclusao").dxNumberBox("reset");
    $("#nbx_Pc_Lucro_Inclusao").dxValidator("reset");
    $("#nbx_Pc_Rentabilidade_Inclusao").dxNumberBox("reset");
    $("#nbx_Pc_Rentabilidade_Inclusao").dxValidator("reset");
    $("#nbx_Vl_Preco_Minimo_Venda_Inclusao").dxNumberBox("reset");
    $("#nbx_Vl_Preco_Minimo_Venda_Inclusao").dxValidator("reset");
    $("#chk_Confirmacao_Leitura_Pesquisa_Eletronica").dxCheckBox("reset");
    $("#chk_Lg_Replicar_Precos_Entre_Filiais").dxCheckBox("reset");
    $("#chk_Lg_Replicar_Dados_Fiscais_Entre_Filiais").dxCheckBox("reset");
    $("#chk_Lg_Replicar_Regras_Comerciais_Entre_Filiais").dxCheckBox("reset");
    $("#chk_Aplicar_Precos_Todas_Filiais").dxSwitch("reset");

    $("#labelCustoBrutoInclusao").text('');
    $("#labelDescontoTotalInclusao").text('');
    $("#labelCustoLiquidoInclusao").text('');
    $("#labelCustoTotalInclusao").text('');
    $("#labelCargaCustoTotalInclusao").text('');
    $("#labelPrecoVendaInclusao").text('');
    $("#labelAdicionaisPrecoVendaInclusao").text('');
}

function proximoProduto() {
    const filterExpr = vGridConsultaProdutos.getCombinedFilter(true);
    const dataSource = vGridConsultaProdutos.getDataSource();
    const loadOptions = dataSource.loadOptions();

    dataSource
        .store()
        .load({ filter: filterExpr, sort: loadOptions.sort, group: loadOptions.group })
        .then((result) => {
            var b = result;
            if (loadOptions.group != null) {
                function retornaLista(a) {
                    var lista = [];
                    for (i of a) {
                        i.items.forEach(b => {
                            lista.push(b);
                        })
                    }
                    return lista;
                }
                for (let index = 0; index < loadOptions.group.length; index++) {
                    b = retornaLista(b);
                }
                result = b;
            }

            vLkp_Filtro_Pesquisa_Produtos.option("dataSource", dataSourceProdutoFiltro);

            if (objClassProduto.CD_PRODUTO == null) {
                vLkp_Filtro_Pesquisa_Produtos.option('value', result[0].CD_PRODUTO)
            } else {
                var vRegistroLocalizado = false;

                for (i in result) {
                    if (result[i].CD_PRODUTO === objClassProduto.CD_PRODUTO) {
                        var atual = result[parseInt(i) + 1];

                        vRegistroLocalizado = true;

                        if (atual == undefined) {
                            vLkp_Filtro_Pesquisa_Produtos.option('value', result[0].CD_PRODUTO)
                        } else {
                            vLkp_Filtro_Pesquisa_Produtos.option('value', atual.CD_PRODUTO)
                        }
                        break;
                    }
                }

                if (vRegistroLocalizado == false) {
                    vLkp_Filtro_Pesquisa_Produtos.option('value', result[0].CD_PRODUTO)
                }
            }
        })
};

function produtoAnterior() {
    const filterExpr = vGridConsultaProdutos.getCombinedFilter(true);
    const dataSource = vGridConsultaProdutos.getDataSource();
    const loadOptions = dataSource.loadOptions();

    dataSource
        .store()
        .load({ filter: filterExpr, sort: loadOptions.sort, group: loadOptions.group })
        .then((result) => {
            var b = result;
            if (loadOptions.group != null) {
                function retornaLista(a) {
                    var lista = [];
                    for (i of a) {
                        i.items.forEach(b => {
                            lista.push(b);
                        })
                    }
                    return lista;
                }
                for (let index = 0; index < loadOptions.group.length; index++) {
                    b = retornaLista(b);
                }
                result = b;
            }

            vLkp_Filtro_Pesquisa_Produtos.option("dataSource", dataSourceProdutoFiltro);

            if (objClassProduto.CD_PRODUTO == null) {
                vLkp_Filtro_Pesquisa_Produtos.option('value', result[parseInt(result.length) - 1].CD_PRODUTO)
            } else {
                var vRegistroLocalizado = false;

                for (i in result) {
                    if (result[i].CD_PRODUTO === objClassProduto.CD_PRODUTO) {
                        var atual = result[parseInt(i) - 1];

                        vRegistroLocalizado = true;

                        if (atual == undefined) {
                            vLkp_Filtro_Pesquisa_Produtos.option('value', result[parseInt(result.length) - 1].CD_PRODUTO)
                        } else {
                            vLkp_Filtro_Pesquisa_Produtos.option('value', atual.CD_PRODUTO)
                        }
                        break;
                    }
                }

                if (vRegistroLocalizado == false) {
                    vLkp_Filtro_Pesquisa_Produtos.option('value', result[parseInt(result.length) - 1].CD_PRODUTO)
                }
            }
        })
};

function CalculaCustoLiquidoInclusao() {
    var custoBruto = isNaN(parseFloat(vNbx_Vl_Custo_Bruto_Inclusao.option('value'))) ? 0 : vNbx_Vl_Custo_Bruto_Inclusao.option('value');
    var pcDescontoTotal = isNaN(parseFloat(vNbx_Pc_Desconto_Total_Inclusao.option('value'))) ? 0 : vNbx_Pc_Desconto_Total_Inclusao.option('value');

    var descontoTotal = round(custoBruto * (pcDescontoTotal / 100), 5);
    var custoLiquido = custoBruto - descontoTotal;

    vNbx_Vl_Custo_Liquido_Inclusao.option('value', custoLiquido);
    $("#labelCustoBrutoInclusao").text('R$ ' + formataNumero(custoLiquido, 2, 5));
    $("#labelDescontoTotalInclusao").text(formataNumero(pcDescontoTotal, 2, 4) + '%');
    $("#labelCustoLiquidoInclusao").text('R$ ' + formataNumero(custoLiquido, 2, 5));
}

function CalculaCustoTotalInclusao() {
    var custoLiquido = isNaN(parseFloat(vNbx_Vl_Custo_Liquido_Inclusao.option('value'))) ? 0 : vNbx_Vl_Custo_Liquido_Inclusao.option('value');
    var pcCustoIPI = isNaN(parseFloat(vNbx_Pc_Custo_IPI_Inclusao.option('value'))) ? 0 : vNbx_Pc_Custo_IPI_Inclusao.option('value');
    var pcCustoST = isNaN(parseFloat(vNbx_Pc_Custo_ST_Inclusao.option('value'))) ? 0 : vNbx_Pc_Custo_ST_Inclusao.option('value');
    var pcCustoFrete = isNaN(parseFloat(vNbx_Pc_Custo_Frete_Inclusao.option('value'))) ? 0 : vNbx_Pc_Custo_Frete_Inclusao.option('value');
    var pcOutrosCustos = isNaN(parseFloat(vNbx_Pc_Custo_Outros_Custos_Inclusao.option('value'))) ? 0 : vNbx_Pc_Custo_Outros_Custos_Inclusao.option('value');

    var custoIPI = round(custoLiquido * pcCustoIPI / 100, 5);
    var custoST = round(custoLiquido * pcCustoST / 100, 5);
    var custoOutros = round(custoLiquido * pcOutrosCustos / 100, 5);

    //Verifica se o frete é calculado por percentual do custo líquido ou se é um valor fixo
    if (componenteBotaoNumberBoxInclusao.component.option('text') == '%') {
        var custoFrete = round(custoLiquido * pcCustoFrete / 100, 5);
    } else {
        var custoFrete = pcCustoFrete;
    }

    var valorTotalImpostos = custoIPI + custoST + custoFrete + custoOutros
    var custoTotal = custoLiquido + valorTotalImpostos;
    var carga = 0;
    if (custoLiquido) {
        carga = (100 / custoLiquido) * valorTotalImpostos;
    }

    vNbx_Vl_Custo_Total_Inclusao.option('value', custoTotal);
    $("#labelCustoTotalInclusao").text('R$ ' + formataNumero(custoTotal, 2, 5));
    $("#labelCargaCustoTotalInclusao").text(formataNumero(carga, 2, 4) + '%');
}

function CalculaPrecoMinimoVendaInclusao(pOrigem) {
    suppressOnChange(true, "CalculaPrecoMinimoVendaInclusao");

    var custoTotal, pcLucro, pcRentabilidade, precoMinimo;

    custoTotal = isNaN(parseFloat(vNbx_Vl_Custo_Total_Inclusao.option('value'))) ? 0 : vNbx_Vl_Custo_Total_Inclusao.option('value');

    if (pOrigem == "C" || pOrigem == "L") { //<C> CUSTO TOTAL / <L> LUCRO 
        pcLucro = isNaN(parseFloat(vNbx_Pc_Lucro_Inclusao.option('value'))) ? 0 : vNbx_Pc_Lucro_Inclusao.option('value');

        precoMinimo = round(custoTotal * (1 + (pcLucro / 100)), 5);

        if (precoMinimo == 0) {
            pcLucro = 0;
            pcRentabilidade = 0;
        } else {
            pcRentabilidade = round(((precoMinimo - custoTotal) / precoMinimo) * 100, 4);
        }
    }
    else if (pOrigem == "R") { //<R> RENTABILIDADE
        pcRentabilidade = isNaN(parseFloat(vNbx_Pc_Rentabilidade_Inclusao.option('value'))) ? 0 : vNbx_Pc_Rentabilidade_Inclusao.option('value');
        if (pcRentabilidade >= 100) pcRentabilidade = 99.9999

        if (custoTotal == 0) {
            precoMinimo = 0;
            pcLucro = 0;
            pcRentabilidade = 0;
        } else {
            precoMinimo = round(custoTotal / (1 - (pcRentabilidade / 100)), 5);
            pcLucro = round((precoMinimo - custoTotal) / custoTotal * 100, 4);
        }
    }
    else if (pOrigem == "V") { //<V> PREÇO MÍNIMO DE VENDA
        var precoMinimo = isNaN(parseFloat(vNbx_Vl_Preco_Minimo_Venda_Inclusao.option('value'))) ? 0 : vNbx_Vl_Preco_Minimo_Venda_Inclusao.option('value');

        if (precoMinimo == 0) {
            pcLucro = 0;
            pcRentabilidade = 0;
        } else {
            pcLucro = round(((precoMinimo / custoTotal) - 1) * 100, 4);
            pcRentabilidade = round(((precoMinimo - custoTotal) / precoMinimo) * 100, 4);
        }
    }

    vNbx_Pc_Lucro_Inclusao.option('value', pcLucro);
    vNbx_Pc_Rentabilidade_Inclusao.option('value', pcRentabilidade);
    vNbx_Vl_Preco_Minimo_Venda_Inclusao.option('value', precoMinimo);

    var precoVendaComAdicionais = precoMinimo
    precoVendaComAdicionais = round(precoVendaComAdicionais * (1 + (objClassParametrosEmpresa.PC_SOBRE_PRECO_VENDEDOR / 100)), 5)
    precoVendaComAdicionais = round(precoVendaComAdicionais * (1 + (objClassParametrosEmpresa.PC_SOBRE_PRECO_GERENTE / 100)), 5)
    precoVendaComAdicionais = round(precoVendaComAdicionais * (1 + (objClassParametrosEmpresa.PC_SOBRE_PRECO_DIRETORIA / 100)), 5)
    precoVendaComAdicionais = round(precoVendaComAdicionais * (1 + (objClassParametrosEmpresa.PC_SOBRE_PRECO_FINANCEIRO / 100)), 5)

    var pcAdicionais = 0;
    var vlAdicionais = precoVendaComAdicionais - precoMinimo;
    if (precoMinimo && precoVendaComAdicionais) {
        pcAdicionais = (100 / precoMinimo) * vlAdicionais;
    }

    $("#labelPrecoVendaInclusao").text('R$ ' + formataNumero(precoVendaComAdicionais, 2, 5));
    $("#labelAdicionaisPrecoVendaInclusao").text(formataNumero(pcAdicionais, 2, 4) + '%');

    suppressOnChange(false, "CalculaPrecoMinimoVendaInclusao");

    configuraComparativoRadarPrecoInclusao();
}

function configuraNumberBoxCustoFreteInclusao(e) {
    if (e.component.option('text') == '%') {
        e.component.option('text', 'R$');
        vNbx_Pc_Custo_Frete_Inclusao.option('format', "     'R$' ###,###,###,##0.00###");
        vNbx_Pc_Custo_Frete_Inclusao.option('label', 'Frete de Compra');
    } else {
        e.component.option('text', '%');
        vNbx_Pc_Custo_Frete_Inclusao.option('format', "     ###,###,###,##0.#####'%'");
        vNbx_Pc_Custo_Frete_Inclusao.option('label', '% Frete de Compra');
    }
};

function LoadCampoAplicacao() {
    var aplicacaoMontada = "";
    var marca = vTxt_Ds_Marca_Aplicacao.option("value");
    var modelo = vTxt_Ds_Modelo_Aplicacao.option("value");
    var anoInicio = vNbx_Nr_Ano_Inicial_Aplicacao.option("value");
    var anoFim = vNbx_Nr_Ano_Final_Aplicacao.option("value");
    var separador = isNull(vLkp_Separador_Aplicacao.option("value"), " ");

    if (!marca) {
        exibeMensagem("info", "Configuração incorreta no Assitente de Aplicação", "Ao menos o campo \"Marca\" deve estar preenchido para usar o Assitente de Aplicação!");
        return;
    }
    else if ((anoInicio && !anoFim) || (!anoInicio && anoFim)) {
        exibeMensagem("info", "Configuração incorreta no Assitente de Aplicação", "Os campos \"Ano Início\" e \"Ano Fim\" devem estar ambos preenchidos ou ambos omitidos!");
        return;
    }

    separador = (separador == " " ? separador : " " + separador + " ");

    if (anoInicio && anoFim) {
        if (anoInicio > anoFim) {
            exibeMensagem("info", "Configuração incorreta no Assitente de Aplicação", "O Ano Inicial não pode ser superior ao Ano Final");
            return;
        }

        aplicacaoAnterior = isNull(vTxt_Ds_Aplicacao.option("value"), "");
        aplicacaoMontada = aplicacaoAnterior;

        for (var i = anoInicio; i <= anoFim; i++) {
            aplicacaoMontada = (aplicacaoMontada ? aplicacaoMontada + separador : aplicacaoMontada) + marca + (modelo ? " " + modelo : "") + " " + String(i).substr(2, 2);
        }
    }
    else {
        aplicacaoAnterior = isNull(vTxt_Ds_Aplicacao.option("value"), "");
        aplicacaoMontada = (aplicacaoAnterior ? aplicacaoAnterior + separador : "") + marca + (modelo ? " " + modelo : "")
    }

    vTxt_Ds_Aplicacao.option("value", aplicacaoMontada);

    $("#txt_Ds_Marca_Aplicacao").dxTextBox("reset");
    $("#txt_Ds_Modelo_Aplicacao").dxTextBox("reset");
    $("#nbx_Nr_Ano_Inicial_Aplicacao").dxNumberBox("reset");
    $("#nbx_Nr_Ano_Final_Aplicacao").dxNumberBox("reset");
    $("#lkp_Separador_Aplicacao").dxLookup("reset");
}

function ResetCampoAplicacao() {
    vTxt_Ds_Aplicacao.option("value", aplicacaoAnterior);
}

function recarregaCadastrosDependentes() {
    if (vCamposDadosGeraisCriados) {
        carregaOrigemProduto();
        carregaFamiliaProduto();
        carregaUnidadeMedida();
        carregaSituacaoTributariaPIS();
        carregaSituacaoTributariaCOFINS();
    }
}

function configuraComparativoRadarPrecoInclusao() {
    $("#divCustoLiquidoMercadoInclusao").hide();
    $("#divDescontoTotalInclusao").removeClass("col-lg-6").addClass("col-lg-12");
    $("#divCustoTotalMercadoInclusao").hide();
    $("#divCargaCustoTotalInclusao").removeClass("col-lg-6").addClass("col-lg-12");
    $("#divPrecoVendaMercadoInclusao").hide();
    $("#divAdicionaisInclusao").removeClass("col-lg-6").addClass("col-lg-12");

    if (objClassProduto.LG_RADAR_PRECO_VALIDADO) {
        $("#divCustoLiquidoMercadoInclusao").show();
        $("#divDescontoTotalInclusao").removeClass("col-lg-12").addClass("col-lg-6");
        $("#divCustoTotalMercadoInclusao").show();
        $("#divCargaCustoTotalInclusao").removeClass("col-lg-12").addClass("col-lg-6");
        $("#divPrecoVendaMercadoInclusao").show();
        $("#divAdicionaisInclusao").removeClass("col-lg-12").addClass("col-lg-6");

        //CUSTO LÍQUIDO
        var custoLiquido = isNaN(parseFloat(vNbx_Vl_Custo_Liquido_Inclusao.option('value'))) ? 0 : vNbx_Vl_Custo_Liquido_Inclusao.option('value');
        if (objClassProduto.VL_CUSTO_LIQUIDO_RADAR_PRECO > custoLiquido) {
            $("#labelCustoLiquidoMercadoInclusao").removeClass("badge-danger").addClass("badge-success");
            $("#labelCustoLiquidoMercadoInclusao").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_CUSTO_LIQUIDO_RADAR_PRECO, 2, 5)} <i class="fa fa-arrow-circle-up mr-1"></i>`)
        } else if (objClassProduto.VL_CUSTO_LIQUIDO_RADAR_PRECO < custoLiquido) {
            $("#labelCustoLiquidoMercadoInclusao").removeClass("badge-success").addClass("badge-danger");
            $("#labelCustoLiquidoMercadoInclusao").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_CUSTO_LIQUIDO_RADAR_PRECO, 2, 5)} <i class="fa fa-arrow-circle-down mr-1"></i>`)
        } else {
            $("#labelCustoLiquidoMercadoInclusao").removeClass("badge-danger").addClass("badge-success");
            $("#labelCustoLiquidoMercadoInclusao").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_CUSTO_LIQUIDO_RADAR_PRECO, 2, 5)}`)
        }

        //CUSTO TOTAL
        var custoTotal = isNaN(parseFloat(vNbx_Vl_Custo_Total_Inclusao.option('value'))) ? 0 : vNbx_Vl_Custo_Total_Inclusao.option('value');
        if (objClassProduto.VL_CUSTO_TOTAL_RADAR_PRECO > custoTotal) {
            $("#labelCustoTotalMercadoInclusao").removeClass("badge-danger").addClass("badge-success");
            $("#labelCustoTotalMercadoInclusao").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_CUSTO_TOTAL_RADAR_PRECO, 2, 5)} <i class="fa fa-arrow-circle-up mr-1"></i>`)
        } else if (objClassProduto.VL_CUSTO_TOTAL_RADAR_PRECO < custoTotal) {
            $("#labelCustoTotalMercadoInclusao").removeClass("badge-success").addClass("badge-danger");
            $("#labelCustoTotalMercadoInclusao").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_CUSTO_TOTAL_RADAR_PRECO, 2, 5)} <i class="fa fa-arrow-circle-down mr-1"></i>`)
        } else {
            $("#labelCustoTotalMercadoInclusao").removeClass("badge-danger").addClass("badge-success");
            $("#labelCustoTotalMercadoInclusao").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_CUSTO_TOTAL_RADAR_PRECO, 2, 5)}`)
        }

        //PREÇO VENDA
        var precoVenda = isNaN(parseFloat(vNbx_Vl_Preco_Minimo_Venda_Inclusao.option('value'))) ? 0 : vNbx_Vl_Preco_Minimo_Venda_Inclusao.option('value');
        if (objClassProduto.VL_PRECO_VENDA_RADAR_PRECO > precoVenda) {
            $("#labelPrecoVendaMercadoInclusao").removeClass("badge-danger").addClass("badge-success");
            $("#labelPrecoVendaMercadoInclusao").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_PRECO_VENDA_RADAR_PRECO, 2, 5)} <i class="fa fa-arrow-circle-up mr-1"></i>`)
        } else if (objClassProduto.VL_PRECO_VENDA_RADAR_PRECO < precoVenda) {
            $("#labelPrecoVendaMercadoInclusao").removeClass("badge-success").addClass("badge-danger");
            $("#labelPrecoVendaMercadoInclusao").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_PRECO_VENDA_RADAR_PRECO, 2, 5)} <i class="fa fa-arrow-circle-down mr-1"></i>`)
        } else {
            $("#labelPrecoVendaMercadoInclusao").removeClass("badge-danger").addClass("badge-success");
            $("#labelPrecoVendaMercadoInclusao").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_PRECO_VENDA_RADAR_PRECO, 2, 5)}`)
        }
    }
}


//******************************************
// PRECIFICAÇÃO
//******************************************
async function criaCamposPrecificacao() {
    await Promise.all([
        listFiliaisPrecificacao = $('#listFiliaisPrecificacao').dxList({
            dataSource: dataSourceFiliaisAcesso,
            selectionMode: 'single',
            itemTemplate: function (itemData, itemIndex, itemElement) {
                itemElement.parent().css({ border: 'none' }).addClass("mt-0 mb-2");
                itemElement.addClass("mt-0 mb-0 p-0");
                return `<button type="button" class="mb-0 mt-0 p-2 btn btn-default btn-block btn-com-quebra" style="background-color: transparent;" data-toggle="tooltip" data-placement="bottom" title="" onclick="carregaPrecificacao(${itemData.CD_FILIAL});">Filial ${itemData.CD_FILIAL}<h6 class="mb-0 mt-0 text-center" style="font-size: 10px">${itemData.DS_NOME_FANTASIA}</h6></button>`;
            },
        }).dxList("instance"),

        vDbx_Dt_Vigencia = $('#dbx_Dt_Vigencia').dxDateBox({
            labelMode: 'floating',
            label: 'Data Vigência *',
            placeholder: 'Data Vigência *',
            showClearButton: false,
            useMaskBehavior: true,
            displayFormat: 'dd/MM/yyyy',
            type: 'date',
            value: Date(),
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Data de Vigência obrigatória',
            }], validationGroup: 'Preco'
        }).dxDateBox("instance"),

        vNbx_Vl_Custo_Bruto = $('#nbx_Vl_Custo_Bruto').dxNumberBox({
            value: '',
            format: 'R$ ###,###,###,###,##0.00###',
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'Custo Bruto sem Impostos e sem Desconto *',
            labelMode: 'floating',
            label: 'Custo Bruto sem Impostos e sem Desconto *',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaCustoLiquido();
                }
            },
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Custo Bruto obrigatório',
            }], validationGroup: 'Preco'
        }).dxNumberBox("instance"),

        vTgx_Descontos = $("#tgxDescontos").dxTagBox({
            acceptCustomValue: true,
            displayExpr: function (item) {
                // trata pois o "item" pode ser nulo
                return item && formataNumero(item.Valor, 0, 4) + '%';
            },
            //displayExpr: "Valor",
            valueExpr: "Sequencia",
            labelMode: 'floating',
            label: 'Digite % de desconto e tecle <Enter>',
            showClearButton: true,
            openOnFieldClick: false,
            onValueChanged: function (e) {
                let descontos = e.component.option("selectedItems").map((x) => x.Valor);
                let desconto = 0;

                if (descontos.length > 0) {
                    desconto = 100;
                    for (let x of descontos) {
                        desconto = desconto * (1 - x / 100);
                    }
                    //desconto = 100 - desconto;
                    desconto = Number(parseFloat(100 - desconto).toFixed(2));
                }

                vNbx_Pc_Desconto_Total.option("value", desconto);
            },

            onCustomItemCreating(args) {

                if (!args.text) {
                    args.customItem = null;
                    return;
                }

                args.text = args.text.replace(",", ".");

                if (isNaN(parseFloat(args.text))) {
                    args.customItem = null;
                    return;
                }

                let valor = parseFloat(args.text);

                if (valor > 100 || valor < 0) {
                    args.customItem = null;
                    return;
                }

                const { component } = args;

                const currentItems = component.option("items");

                let nextId = currentItems.length == 0 ? 1 : Math.max.apply(null, currentItems.map((x) => x.Sequencia)) + 1;

                const newValue = { Sequencia: nextId, Valor: valor };
                currentItems.unshift(newValue);

                component.option("items", currentItems);
                args.customItem = newValue;
            }
        }).dxTagBox("instance"),

        vNbx_Pc_Desconto_Total = $('#nbx_Pc_Desconto_Total').dxNumberBox({
            value: '',
            format: "###,###,###,##0.#####'%'     ",
            showClearButton: false,
            showSpinButtons: false,
            readOnly: true,
            //step: 1000,
            labelMode: 'floating',
            label: 'Desconto Total do Fornecedor',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaCustoLiquido();
                }
            },
        }).dxNumberBox("instance"),

        vNbx_Vl_Custo_Liquido = $('#nbx_Vl_Custo_Liquido').dxNumberBox({
            value: '',
            format: "'R$' ###,###,###,###,##0.00###     ",
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            readOnly: true,
            placeholder: 'Custo Líquido sem Impostos',
            labelMode: 'floating',
            label: 'Custo Líquido sem Impostos',

            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaCustoTotal();
                }
            },
        }).dxNumberBox("instance"),

        vNbx_Pc_Custo_IPI = $('#nbx_Pc_Custo_IPI').dxNumberBox({
            value: '',
            format: "###,###,##0.##### '%'",
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: '% IPI de Compra',
            labelMode: 'floating',
            label: '% IPI de Compra',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaCustoTotal();
                }
            },
        }).dxNumberBox("instance"),

        vNbx_Pc_Custo_Frete = $('#nbx_Pc_Custo_Frete').dxNumberBox({
            value: '',
            format: "     ###,###,##0.##### '%'",
            min: 0,
            max: 999999999999.99999,
            showClearButton: false,
            showSpinButtons: false,
            step: 1,
            placeholder: '% Frete de Compra',
            labelMode: 'floating',
            label: '% Frete de Compra',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },

            buttons: [{
                name: 'currency',
                location: 'after',
                options: {
                    text: '%',
                    stylingMode: 'text',
                    width: 40,
                    elementAttr: {
                        class: 'currency',
                        class: 'botao-number-box',
                    },
                    onInitialized(e) {
                        //Seta a variável que representa o botão deste Number Box para que seja possível parametrizá-lo em outras funções fora do componente
                        componenteBotaoNumberBox = e;
                    },
                    onClick(e) {
                        //Seta a variável que representa o botão deste Number Box para que seja possível parametrizá-lo em outras funções fora do componente
                        componenteBotaoNumberBox = e;

                        //Chama função para reconfigurar o NumberBox
                        configuraNumberBoxCustoFrete(componenteBotaoNumberBox);

                        if (!vSuppressOnChange) {
                            CalculaCustoTotal();
                        }
                    },
                },
            }, 'clear', 'spins'],
            onChange(e) {
                componenteValorReajuste = e;
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaCustoTotal();
                }
            },
        }).dxNumberBox('instance'),

        vNbx_Pc_Custo_ST = $('#nbx_Pc_Custo_ST').dxNumberBox({
            value: '',
            format: "###,###,##0.##### '%'",
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: '% ST de Compra',
            labelMode: 'floating',
            label: '% ST de Compra',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaCustoTotal();
                }
            },
        }).dxNumberBox("instance"),

        vNbx_Pc_Custo_Outros_Custos = $('#nbx_Pc_Custo_Outros_Custos').dxNumberBox({
            value: '',
            format: "###,###,##0.#####'%'",
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: '% Outros Custos',
            labelMode: 'floating',
            label: '% Outros Custos',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaCustoTotal();
                }
            },
        }).dxNumberBox("instance"),

        vNbx_Vl_Custo_Total = $('#nbx_Vl_Custo_Total').dxNumberBox({
            value: '',
            format: 'R$ ###,###,###,###,##0.00###      ',
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'Custo com Impostos',
            labelMode: 'floating',
            label: 'Custo com Impostos',
            readOnly: true,
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "darkred",
                    "back-ground": "darkred",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaPrecoMinimoVenda("C");
                }
            },
        }).dxNumberBox("instance"),

        vNbx_Pc_Lucro = $('#nbx_Pc_Lucro').dxNumberBox({
            value: '',
            format: "###,###,##0.##### '%'",
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: '% Lucro *',
            labelMode: 'floating',
            label: '% Lucro *',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaPrecoMinimoVenda("L");
                }
            },
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Lucro obrigatório',
            }], validationGroup: 'Preco'
        }).dxNumberBox("instance"),

        vNbx_Pc_Lucro_Referencia = $('#nbx_Pc_Lucro_Referencia').dxNumberBox({
            value: '',
            format: "###,###,##0.##### '%'",
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: '% Lucro Referência',
            labelMode: 'floating',
            label: '% Lucro Referência',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
        }).dxNumberBox("instance"),

        vNbx_Pc_Rentabilidade = $('#nbx_Pc_Rentabilidade').dxNumberBox({
            value: '',
            format: "###,###,##0.##### '%'",
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: '% Rentabilidade *',
            labelMode: 'floating',
            label: '% Rentabilidade *',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "14px",
                    "font-weight": "bold",
                    "color": "#415a77",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaPrecoMinimoVenda("R")
                }
            },
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Rentabilidade obrigatória',
            }], validationGroup: 'Preco'
        }).dxNumberBox("instance"),

        vNbx_Vl_Preco_Minimo_Venda = $('#nbx_Vl_Preco_Minimo_Venda').dxNumberBox({
            value: '',
            format: 'R$ ###,###,###,###,##0.00###',
            min: 0,
            max: 999999999999.99999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'Preço de Venda *',
            label: 'Preço de Venda *',
            onContentReady: function (e) {
                e.component.element().find("input").eq(1).css({
                    "text-align": "center",
                    "font-size": "18px",
                    "font-weight": "bold",
                    "color": "#0077b6",
                });
            },
            onValueChanged: function (e) {
                if (!vSuppressOnChange) {
                    CalculaPrecoMinimoVenda("V")
                }
            },
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Preço de Venda obrigatório',
            }], validationGroup: 'Preco'
        }).dxNumberBox("instance"),

        vNbx_Cd_NCM_Aba_Preco = $('#nbx_Cd_NCM_Aba_Preco').dxNumberBox({
            value: '',
            format: '00000000',
            min: 0,
            max: 99999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'Código NCM',
            labelMode: 'floating',
            label: 'Código NCM',
            onValueChanged: function (e) {
                if (vNbx_Cd_NCM.option('value') != e.value) {
                    vNbx_Cd_NCM.option('value', e.value);
                }
            },
        }).dxNumberBox("instance"),

        vNbx_Cd_CEST_Aba_Preco = $('#nbx_Cd_CEST_Aba_Preco').dxNumberBox({
            value: '',
            format: '0000000',
            min: 0,
            max: 9999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'CEST',
            labelMode: 'floating',
            label: 'Código CEST',
            onValueChanged: function (e) {
                if (vNbx_Cd_CEST.option('value') != e.value) {
                    vNbx_Cd_CEST.option('value', e.value);
                }
            },
        }).dxNumberBox("instance"),

        vTxt_Nr_FCI_Aba_Preco = $('#txt_Nr_FCI_Aba_Preco').dxTextBox({
            labelMode: 'floating',
            label: 'Código FCI - Ficha de Conteúdo de Importação',
            maxLength: 40,
            onValueChanged: function (e) {
                if (vTxt_Nr_FCI.option('value') != e.value) {
                    vTxt_Nr_FCI.option('value', e.value);
                }
            },
        }).dxTextBox("instance"),

        vNbx_Pc_PIS = $('#nbx_Pc_PIS').dxNumberBox({
            value: '',
            format: "###,##0.## '%'",
            min: 0,
            max: 999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 10,
            placeholder: '% PIS',
            labelMode: 'floating',
            label: 'PIS',
        }).dxNumberBox("instance"),

        vNbx_Pc_COFINS = $('#nbx_Pc_COFINS').dxNumberBox({
            value: '',
            format: "###,##0.## '%'",
            min: 0,
            max: 999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 10,
            placeholder: '% COFINS',
            labelMode: 'floating',
            label: 'COFINS',
        }).dxNumberBox("instance"),

        vNbx_Pc_PIS_Aba_Preco = $('#nbx_Pc_PIS_Aba_Preco').dxNumberBox({
            value: '',
            format: "###,##0.## '%'",
            min: 0,
            max: 999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 10,
            placeholder: '% PIS',
            labelMode: 'floating',
            label: 'PIS',
        }).dxNumberBox("instance"),

        vNbx_Pc_COFINS_Aba_Preco = $('#nbx_Pc_COFINS_Aba_Preco').dxNumberBox({
            value: '',
            format: "###,##0.## '%'",
            min: 0,
            max: 999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 10,
            placeholder: '% COFINS',
            labelMode: 'floating',
            label: 'COFINS',
        }).dxNumberBox("instance"),

        vTxt_Cd_Beneficio_Fiscal_Aba_Preco = $('#txt_Cd_Beneficio_Fiscal_Aba_Preco').dxTextBox({
            labelMode: 'floating',
            label: 'Código Benefício Fiscal',
            maxLength: 20,
        }).dxTextBox("instance"),

        vNbx_Pc_Carga_Tributaria_Aba_Preco = $('#nbx_Pc_Carga_Tributaria_Aba_Preco').dxNumberBox({
            value: '',
            format: "###,##0.## '%'",
            min: 0,
            max: 999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 10,
            placeholder: '% Carga Tributária',
            labelMode: 'floating',
            label: 'Carga Tributária',
        }).dxNumberBox("instance"),

        vNbx_Pc_Desconto_Maximo_Aba_Preco = $('#nbx_Pc_Desconto_Maximo_Aba_Preco').dxNumberBox({
            value: '',
            format: "###,##0.## '%'",
            min: 0,
            max: 100,
            showClearButton: true,
            showSpinButtons: false,
            step: 10,
            placeholder: '% Desconto Máximo',
            labelMode: 'floating',
            label: 'Desconto Máximo',
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Percentual de Desconto Máximo obrigatório',
            }], validationGroup: 'Preco'
        }).dxNumberBox("instance"),

        vNbx_Pc_Comissao_Venda_Aba_Preco = $('#nbx_Pc_Comissao_Venda_Aba_Preco').dxNumberBox({
            value: '',
            format: "###,##0.## '%'",
            min: 0,
            max: 999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 10,
            placeholder: '% Comissão Venda',
            labelMode: 'floating',
            label: 'Comissão Venda',
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Percentual de Comissão de Venda obrigatório',
            }], validationGroup: 'Preco'
        }).dxNumberBox("instance"),

        vNbx_Pc_Comissao_Fretista_Aba_Preco = $('#nbx_Pc_Comissao_Fretista_Aba_Preco').dxNumberBox({
            value: '',
            format: "###,##0.## '%'",
            min: 0,
            max: 999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 10,
            placeholder: '% Comissão Fretista',
            labelMode: 'floating',
            label: 'Comissão Fretista',
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Percentual de Comissão de Fretista obrigatório',
            }], validationGroup: 'Preco'
        }).dxNumberBox("instance"),

        vNbx_Qt_Multiplo_Venda_Aba_Preco = $('#nbx_Qt_Multiplo_Venda_Aba_Preco').dxNumberBox({
            value: '',
            format: "###,##0.#####",
            min: 0,
            max: 999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'Múltiplo de Venda',
            labelMode: 'floating',
            label: 'Múltiplo de Venda',
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Múltiplo de Venda obrigatório',
            }], validationGroup: 'Preco'
        }).dxNumberBox("instance"),

        vNbx_Qt_Embalagem_Aba_Preco = $('#nbx_Qt_Embalagem_Aba_Preco').dxNumberBox({
            value: '',
            format: "###,##0.####",
            min: 0,
            max: 999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'Qtde. Embalagem',
            labelMode: 'floating',
            label: 'Qtde. Embalagem',
        }).dxNumberBox("instance"),

        vChk_Lg_Somente_Vendido_Multiplos_Aba_Preco = $('#chk_Lg_Somente_Vendido_Multiplos_Aba_Preco').dxCheckBox({
            value: false,
            text: "Este produto deve ser vendido somente em múltiplos",

            onValueChanged: function (e) {

                if (e.value == true) {
                    $('#panelCalcularVolumes').slideDown();
                } else {
                    $('#panelCalcularVolumes').slideUp();
                    $('#chk_Lg_Calcular_Volumes_Venda_Expedicao_Aba_Preco').dxCheckBox('instance').option('value', false);
                };
            },
        }).dxCheckBox("instance"),

        vChk_Lg_Calcular_Volumes_Venda_Expedicao_Aba_Preco = $('#chk_Lg_Calcular_Volumes_Venda_Expedicao_Aba_Preco').dxCheckBox({
            value: false,
            text: "Calcular quantidade de volumes baseado no múltiplo para exibir no pedido e romaneio",
        }).dxCheckBox("instance"),

        vChk_Lg_Aceita_Vendas_Estoque_Negativo_Aba_Preco = $('#chk_Lg_Aceita_Vendas_Estoque_Negativo_Aba_Preco').dxCheckBox({
            value: false,
            text: "Este produto pode ser vendido com estoque negativo",
        }).dxCheckBox("instance"),

        vChk_Lg_Bloqueia_Atualizacao_Preco_Custo_Venda_Recebimento = $('#chk_Lg_Bloqueia_Atualizacao_Preco_Custo_Venda_Recebimento').dxCheckBox({
            value: false,
            text: "Não atualiza preço de custo e de venda no recebimento de mercadorias",
        }).dxCheckBox("instance"),

        vGridHistoricoPrecos = $("#gridHistoricoPrecos").dxDataGrid({
            dataSource: null,
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            columnsAutoWidth: true,
            allowColumnResizing: true,
            allowColumnReordering: true,
            focusedRowEnabled: true,

            selection: {
                mode: 'single',
            },

            editing: {
                //mode: 'normal',
                allowUpdating: false,
                //startEditAction: 'dblClick',
                allowAdding: false,
                allowDeleting: true,
                useIcons: true,
            },

            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: { mode: "multiple" },
            groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
            paging: { pageSize: 15 },
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
                var worksheet = workbook.addWorksheet('Preços');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'HistoricoPreços.xlsx');
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
            columnChooser: { enabled: true, allowSearch: true, height: 350 },
            keyExpr: 'DT_VIGENCIA',
            columns: [
                {
                    dataField: "DT_VIGENCIA",
                    caption: "Vigência",
                    width: 82,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    cssClass: "column-data-grid",
                    visible: true,
                    alignment: "center",
                    dataType: "date",
                    format: "dd/MM/yyyy",
                    allowHiding: false,
                },
                {
                    dataField: "VL_PRECO_COMPRA",
                    caption: "Preço de Compra",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,##0.00",
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: 'right',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "VL_CUSTO_TOTAL",
                    caption: "Custo Total",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,##0.00###",
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: 'right',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "VL_PRECO_MINIMO_VENDA",
                    caption: "Preço Venda",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,##0.00###",
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: 'right',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "PC_MARKUP",
                    caption: "% Rentab.",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,##0.00'%'",
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    visible: true,
                },
                {
                    dataField: "PC_LUCRO",
                    caption: "% Lucro",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,##0.00'%'",
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    visible: true,
                },
                {
                    dataField: "VL_CUSTO_BRUTO",
                    caption: "Custo Bruto",
                    width: 60,
                    dataType: "number",
                    format: "###,###,###,###,##0.00###",
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: 'right',
                    cssClass: "column-data-grid",
                    visible: true,
                },
                {
                    dataField: "DT_ATUALIZACAO",
                    caption: "Atualização",
                    //width: 100,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    cssClass: "column-data-grid",
                    visible: true,
                    alignment: "center",
                    dataType: "date",
                    format: "dd/MM/yyyy HH:mm",
                    visible: true,
                },
                {
                    dataField: "CD_LOGIN",
                    caption: "Login",
                    //width: 70,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    cssClass: "column-data-grid",
                    alignment: "center",
                    visible: true,
                },
                {
                    type: "buttons",
                    width: 30,
                    //cssClass: "column-data-grid",
                },

            ],

            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    if ((e.column.dataField === "PC_MARKUP" && e.data.PC_MARKUP < 0) || (e.column.dataField === "PC_LUCRO" && e.data.PC_LUCRO < 0)) {
                        //e.cellElement.css("background-color", '#f26419');
                        e.cellElement.css("color", '#d00000');
                        e.cellElement.css("font-weight", 'bold');
                    }
                }

                if (e.column.dataField) {
                    e.cellElement.css({ "cursor": "pointer" });
                }

            },

            stateStoring: AutoLoad("gridHistoricoPrecos", false),

            onToolbarPreparing: AutoResetState([]),

            onInitialized(e) {
                new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            e.component.updateDimensions();
                        }
                    });
                }).observe(e.element[0]);
            },

        }).dxDataGrid('instance'),

        vGridTabelasPrecos = $("#gridTabelasPrecos").dxDataGrid({
            dataSource: null,
            hoverStateEnabled: false,
            showBorders: false,
            showRowLines: false,
            showColumnHeaders: false,
            rowAlternationEnabled: false,
            wordWrapEnabled: true,
            columnHidingEnabled: false,
            columnsAutoWidth: true,
            allowColumnResizing: false,
            allowColumnReordering: false,
            focusedRowEnabled: false,

            selection: {
                mode: 'single',
            },

            editing: {
                //mode: 'normal',
                allowUpdating: false,
                //startEditAction: 'dblClick',
                allowAdding: false,
                allowDeleting: false,
                useIcons: false,
            },

            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: { mode: "multiple" },
            groupPanel: { visible: false, emptyPanelText: "Agrupamento" },
            paging: { pageSize: 1000 },
            pager: {
                visible: false,
                allowedPageSizes: [10, 15, 20, 50, 100],
                showPageSizeSelector: false,
                showNavigationButtons: true
            },
            export: {
                enabled: false,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('Tabelas');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'TabelasPreços.xlsx');
                    });
                });
                e.cancel = true;
            },
            filterRow: { visible: false, applyFilter: "auto" },
            headerFilter: {
                visible: true,
                allowSearch: true
            },
            filterPanel: { visible: false },
            columnChooser: { enabled: false, allowSearch: true, height: 350 },
            keyExpr: ['CD_TABELA_PRECO'],
            columns: [
                {
                    dataField: "DS_TABELA_PRECO",
                    caption: "TABELAS",
                    //width: 70,
                    allowSorting: false,
                    allowHeaderFiltering: true,
                    cssClass: "column-data-grid",
                    alignment: "center",
                    visible: true,
                    cellTemplate: function (e, x) {

                        var codigoTabela = x.data.CD_TABELA_PRECO;
                        var nomeTabela = x.data.DS_TABELA_PRECO;
                        var pcPadraoTabela = x.data.PC_PADRAO;
                        var btnAtivarTabela;
                        var btnEditarExcluir;
                        var pcPadraoTabelaFormatado;
                        var tipoTabela;
                        var tabelaAtivada;
                        var orientacaoDescontosAcrescimos = '';
                        var camposReadOnly = false;
                        var fundoCamposReadOnly = '';
                        var iconeTabela = '';

                        var campoLucro = 'nbx_Pc_Lucro_Tabela_Preco_Aba_Preco_' + x.data.CD_TABELA_PRECO;
                        var campoRentabilidade = 'nbx_Pc_Rentabilidade_Tabela_Preco_Aba_Preco_' + x.data.CD_TABELA_PRECO;
                        var campoDiferenca = 'nbx_Pc_Diferenca_Tabela_Preco_Aba_Preco_' + x.data.CD_TABELA_PRECO;
                        var campoPreco = 'nbx_Vl_Preco_Venda_Tabela_Preco_Aba_Preco_' + x.data.CD_TABELA_PRECO;
                        var idHtmlCampos = 'cardCamposTabela_' + x.data.CD_TABELA_PRECO;
                        var idHtmlCamposFuncao = "'#cardCamposTabela_" + x.data.CD_TABELA_PRECO + "'";

                        var campoLucroConteudo = x.data.PC_LUCRO_TABELA;
                        var campoRentabilidadeConteudo = x.data.PC_RENTABILIDADE_TABELA;
                        var campoDiferencaConteudo = x.data.PC_DIFERENCA_PRECO_PADRAO;
                        var campoPrecoConteudo = x.data.VL_PRECO_TABELA;

                        if (pcPadraoTabela !== null && pcPadraoTabela !== undefined) {
                            pcPadraoTabelaFormatado = (pcPadraoTabela).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) + '%';
                        }

                        if (x.data.CD_TIPO_TABELA == 'P') {
                            tipoTabela = 'personalizado por Produto';
                            orientacaoDescontosAcrescimos = '* utilize percentuais negativos para desconto e positivos para acréscimo';
                            iconeTabela = 'fa-gears';
                        } else if (x.data.CD_TIPO_TABELA == 'R') {
                            tipoTabela = 'rentabilidade fixa de ' + pcPadraoTabelaFormatado;
                            camposReadOnly = true;
                            fundoCamposReadOnly = '"background": "#f8f9fa",';
                            iconeTabela = 'fa-lock';
                        } else if (x.data.CD_TIPO_TABELA == 'D') {
                            if (pcPadraoTabela <= 0) {
                                tipoTabela = 'desconto fixo de ' + pcPadraoTabelaFormatado;
                            } else {
                                tipoTabela = 'acréscimo fixo de ' + pcPadraoTabelaFormatado;
                            }
                            camposReadOnly = true;
                            fundoCamposReadOnly = '"background": "#f8f9fa",';
                            iconeTabela = 'fa-lock';
                        }

                        if (x.data.CD_PRODUTO == null || x.data.CD_PRODUTO == undefined) {
                            tabelaAtivada = 'none';
                            btnAtivarTabela = '<div id="panelBtnAtivarTabela_' + codigoTabela + '" style="display: block;" class="col-lg-3 mb-0 text-left"><btn id="btnAtivarTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-1" data-toggle="tooltip" data-placement="top" title="Ativar o produto para esta tabela" onclick="ativarTabela(' + codigoTabela + ')"><i class="fa fa-plus mr-2"></i>Ativar</btn></div><div id="panelBtnTabelaAtivada_' + codigoTabela + '" style="display: none;" class="col-lg-3 mb-0 text-left"><h3 class="card-subtitle mt-0 mb-0" style="font-size: 18px;"><i class="fa ' + iconeTabela + ' mt-1 mb-0 ml-2"></i></h3></div>';
                            btnEditarExcluir = '<div id="panelBtnEditarTabela_' + codigoTabela + '" style="display: block;" class="col-lg-3 mt-0 mb-0 text-right"><btn id="btnEditarTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-0" data-toggle="tooltip" data-placement="top" title="Editar configurações da tabela"><i class="fa fa-pencil"></i></btn></div><div id="panelBtnEditarExcluirTabela_' + codigoTabela + '" style="display: none;" class="col-lg-3 mt-0 mb-0 text-right"><btn id="btnEditarTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-0" data-toggle="tooltip" data-placement="top" title="Editar configurações da tabela"><i class="fa fa-pencil"></i></btn><btn id="btnExcluirProdutoTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-0 ml-1" data-toggle="tooltip" data-placement="top" title="Excluir o produto desta tabela"><i class="fa fa-trash" onclick="excluirProdutoTabela(' + codigoTabela + ')"></i></btn></div>';
                        } else {
                            tabelaAtivada = 'block';
                            btnAtivarTabela = '<div id="panelBtnAtivarTabela_' + codigoTabela + '" style="display: none;" class="col-lg-3 mb-0 text-left"><btn id="btnAtivarTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-1" data-toggle="tooltip" data-placement="top" title="Ativar o produto para esta tabela" onclick="ativarTabela(' + codigoTabela + ')"><i class="fa fa-plus mr-2"></i>Ativar</btn></div><div id="panelBtnTabelaAtivada_' + codigoTabela + '" style="display: block;" class="col-lg-3 mb-0 text-left"><h3 class="card-subtitle mt-0 mb-0" style="font-size: 18px;"><i class="fa ' + iconeTabela + ' mt-1 mb-0 ml-2"></i></h3></div>';
                            btnEditarExcluir = '<div id="panelBtnEditarTabela_' + codigoTabela + '" style="display: none;" class="col-lg-3 mt-0 mb-0 text-right"><btn id="btnEditarTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-0" data-toggle="tooltip" data-placement="top" title="Editar configurações da tabela"><i class="fa fa-pencil"></i></btn></div><div id="panelBtnEditarExcluirTabela_' + codigoTabela + '" style="display: block;" class="col-lg-3 mt-0 mb-0 text-right"><btn id="btnEditarTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-0" data-toggle="tooltip" data-placement="top" title="Editar configurações da tabela"><i class="fa fa-pencil"></i></btn><btn id="btnExcluirProdutoTabela_' + codigoTabela + '" class="btn btn-default btn-xs mb-0 mt-0 ml-1" data-toggle="tooltip" data-placement="top" title="Excluir o produto desta tabela"><i class="fa fa-trash" onclick="excluirProdutoTabela(' + codigoTabela + ')"></i></btn></div>';
                        }


                        e.append(`
                                <script>
                                    $('#${campoDiferenca}').dxNumberBox({
                                        value: ${campoDiferencaConteudo},
                                        readOnly: ${camposReadOnly},
                                        format: "###,###,##0.######################'%'",
                                        min: -999999,
                                        max: 999999,
                                        showClearButton: false,
                                        showSpinButtons: false,
                                        step: 10,
                                        placeholder: '% Desc(-) ou Acrésc(+)',
                                        labelMode: 'floating',
                                        label: '% Desc(-) ou Acrésc(+)',
                                        onContentReady: function (e) {
                                            e.component.element().find("input").eq(1).css({
                                                "text-align": "center",
                                                "font-weight": "bold",
                                                "color": "#6c757d",
                                                ${fundoCamposReadOnly}
                                            });
                                        },
                                    });

                                    $('#${campoLucro}').dxNumberBox({
                                        value: ${campoLucroConteudo},
                                        readOnly: ${camposReadOnly},
                                        format: "###,###,##0.######################'%'",
                                        min: -999999,
                                        max: 999999,
                                        showClearButton: false,
                                        showSpinButtons: false,
                                        step: 10,
                                        placeholder: '% Lucro',
                                        labelMode: 'floating',
                                        label: '% Lucro',
                                        onContentReady: function (e) {
                                            e.component.element().find("input").eq(1).css({
                                                "text-align": "center",
                                                "font-weight": "bold",
                                                "color": "#6c757d",
                                                ${fundoCamposReadOnly}
                                            });
                                        },
                                    });

                                    $('#${campoRentabilidade}').dxNumberBox({
                                        value: ${campoRentabilidadeConteudo},
                                        readOnly: ${camposReadOnly},
                                        format: "###,###,##0.######################'%'",
                                        min: -999999,
                                        max: 999999,
                                        showClearButton: false,
                                        showSpinButtons: false,
                                        step: 10,
                                        placeholder: '% Rentabilidade',
                                        labelMode: 'floating',
                                        label: '% Rentabilidae',
                                        onContentReady: function (e) {
                                            e.component.element().find("input").eq(1).css({
                                                "text-align": "center",
                                                "font-weight": "bold",
                                                "color": "#6c757d",
                                                ${fundoCamposReadOnly}
                                            });
                                        },
                                    });

                                    $('#${campoPreco}').dxNumberBox({
                                        value: ${campoPrecoConteudo},
                                        readOnly: ${camposReadOnly},
                                        format: "R$ ###,###,##0.00###",
                                        min: 0,
                                        max: 999999,
                                        showClearButton: false,
                                        showSpinButtons: false,
                                        step: 10,
                                        placeholder: 'Preço de Venda',
                                        labelMode: 'floating',
                                        label: 'Preço de Venda',
                                        onContentReady: function (e) {
                                            e.component.element().find("input").eq(1).css({
                                                "text-align": "center",
                                                "font-size": "14px",
                                                "font-weight": "bold",
                                                "color": "#0077b6",
                                                ${fundoCamposReadOnly}
                                            });
                                        },

                                    });

                                </script>

                                <div class="row mb-0 mt-0">
                                    <div class="col-lg-12 mt-0 mb-0">

                                        <section class="card card-default mt-0 mb-0">
                                            <header class="card-header mt-0 mb-0">
                                                
                                                <div class="row mt-0 mb-0">
                                                    ${btnAtivarTabela}
                                                    <div class="col-lg-6 mt-0 mb-0">
                                                        <h6 class="card-subtitle mb-0 mt-0 mb-0 pb-0 text-center"><b>${nomeTabela}</b></h6>
                                                        <h6 class="card-subtitle mb-0 mt-0 mb-0 pt-0 text-center">${tipoTabela}</h6>
                                                    </div>
                                                    ${btnEditarExcluir}
                                                </div>

                                            </header>
                                        </section>
                                        <div id="${idHtmlCampos}" class="card-body card-featured-bottom bg-white mt-0 pb-0" style="display: ${tabelaAtivada}">
                                            <div class="widget-summary mt-0">
                                                <div class="widget-summary-col mt-0">
                                                    <div class="summary mt-0">


                                                        <div class="info mt-1">

                                                            <div class="row mb-2 mt-0">
                                                                <div class="col-lg-6 mb-2">
                                                                    <div id="${campoLucro}" class="mt-0 mb-0"></div>
                                                                </div>
                                                                <div class="col-lg-6 mb-2">
                                                                    <div id="${campoRentabilidade}" class="mt-0 mb-0"></div>
                                                                </div>
                                                                <div class="col-lg-6 mb-2">
                                                                    <div id="${campoDiferenca}" class="mt-0 mb-0"></div>
                                                                </div>
                                                                <div class="col-lg-6 mb-2">
                                                                    <div id="${campoPreco}" class="mt-0 mb-0"></div>
                                                                </div>
                                                                <div class="col-lg-12 mb-2">
                                                                    <h6 class="mb-0 mt-0 text-left" style="font-size: 12px; font-family: Calibri;">${orientacaoDescontosAcrescimos}</h6>
                                                                </div>
                                                            </div>

                                                        </div>

                                                                                       
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            `);

                    },

                },
            ],

            onContentReady: function (e) {
                e.component.element().addClass("custom-focus-style");
            },

            toolbar: {
                items: [
                    'searchPanel',
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            icon: 'plus',
                            text: 'Criar ou editar tabelas',
                            //hint: 'Criar ou editar tabelas de preços',
                            type: 'success',
                            onClick(e) {
                                AbrirModal('#ModalIncluirEditarTabelaPrecos');
                            },
                        },
                    },
                ],
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

        }).dxDataGrid('instance'),

        vGridTabelasConsultaAbaPrecos = $("#gridTabelasConsultaAbaPrecos").dxDataGrid({
            dataSource: null,
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            showColumnLines: true,
            rowAlternationEnabled: true,
            wordWrapEnabled: true,
            columnHidingEnabled: true,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: false,
                highlightSearchText: true,
                placeholder: "Procurar...",
            },
            sorting: {
                mode: "multiple",
            },
            //selection: {
            //    mode: 'multiple',
            //    allowSelectAll: false,
            //    showCheckBoxesMode: 'always',
            //    deferred: false,
            //},
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
                visible: true,
                allowedPageSizes: [10, 20, 50],
                showPageSizeSelector: true,
                showNavigationButtons: true
            },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('Tabelas');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'TabelasPreços.xlsx');
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
            keyExpr: 'CD_TABELA_PRECO',
            columns: [
                //{
                //    type: "selection",
                //    dataField: "CD_SELECAO",
                //    width: 30,
                //    value: false,
                //    allowHiding: false,
                //},

                //{
                //    dataField: 'DS_BANCO_LOGO',
                //    caption: null,
                //    width: 60,
                //    allowFiltering: false,
                //    allowSorting: false,
                //    alignment: 'center',
                //    cssClass: "column-data-grid",
                //    cellTemplate: function (e, x) {

                //        e.append(`<figure class="mb-0">
                //                      <img src="${x.data.DS_BANCO_LOGO}?${new Date()}" style="width: 40px; height: 40px;" class="rounded-circle">
                //                  </figure>`);

                //    },
                //},
                {
                    dataField: "CD_TABELA_PRECO",
                    caption: "Código",
                    width: 65,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    allowFiltering: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    visible: true,
                    allowHiding: false,
                },
                {
                    dataField: "DS_TABELA_PRECO",
                    caption: "Nome da Tabela",
                    //width: 200,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    allowFiltering: true,
                    alignment: 'left',
                    cssClass: "column-data-grid",
                    allowHiding: false,
                    visible: true,
                    //groupIndex: 0,
                },
                {
                    dataField: "DS_TIPO_TABELA",
                    caption: "Tipo de Tabela",
                    width: 165,
                    allowEditing: false,
                    allowSorting: true,
                    alignment: 'center',
                    allowHeaderFiltering: true,
                    allowHiding: true,
                    cssClass: "column-data-grid",
                    hidingPriority: 4,
                },
                {
                    dataField: "PC_PADRAO",
                    caption: "Percentual",
                    width: 100,
                    dataType: 'number',
                    format: "###,###,###,##0.###############'%'",
                    allowEditing: false,
                    allowSorting: true,
                    alignment: 'center',
                    allowHeaderFiltering: false,
                    allowHiding: true,
                    cssClass: "column-data-grid",
                    visible: true,
                    hidingPriority: 3,
                },
                {
                    dataField: "DS_APLICACAO_PRODUTOS",
                    caption: "Aplicação",
                    width: 140,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    hidingPriority: 2,
                },
                {
                    dataField: "CD_STATUS",
                    caption: "Status",
                    width: 75,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    visible: false,
                    hidingPriority: 1,
                },
                {
                    dataField: "DS_STATUS",
                    caption: "Status",
                    width: 75,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    visible: true,
                    hidingPriority: 100,
                },
                {
                    dataField: "DS_IMAGEM_EDITAR_CONTA",
                    caption: "Editar",
                    width: 60,
                    allowEditing: false,
                    allowSorting: false,
                    allowHeaderFiltering: false,
                    allowFiltering: false,
                    allowHiding: false,
                    alignment: "center",
                    cssClass: "column-data-grid",
                    cellTemplate: $('#imgGridTabelaConsulta'),
                },
            ],

            onCellClick: function (e) {
                if (e.rowType === "data") {
                    if (e.column.caption == "Editar") {

                        if (e.data.CD_TABELA_PRECO !== null && e.data.CD_TABELA_PRECO !== undefined) {
                            var percentual = e.data.PC_PADRAO;
                            var tipo = e.data.CD_TIPO_TABELA;

                            if (e.data.CD_TIPO_TABELA == 'D') {
                                if (e.data.PC_PADRAO < 0) {
                                    percentual = e.data.PC_PADRAO * -1
                                } else {
                                    tipo = 'A'
                                }
                            }

                            editarTabelaPreco(e.data.CD_TABELA_PRECO, e.data.DS_TABELA_PRECO, tipo, percentual, e.data.CD_APLICACAO_PRODUTOS, e.data.CD_STATUS);
                        }

                    }
                }
            },

            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS") {
                        if (e.value === "Inativo") {
                            e.cellElement.css("color", "#d00000");
                            e.cellElement.css("font-weight", "bold");
                        };
                    }
                };
                if (e.rowType === "group") {
                    e.cellElement.css("color", "#f05b41");
                    e.cellElement.css("background-color", "white");
                };
            },

            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            icon: 'plus',
                            text: 'Nova Tabela',
                            hint: 'Cadastrar nova tabela de preços',
                            type: 'success',
                            onClick() {
                                criarTabelaPreco();
                            },
                        },
                    },
                    {
                        name: "groupPanel",
                        locateInMenu: "auto",
                    },
                    'exportButton',
                    'columnChooserButton',
                    'searchPanel',
                ],
            },

            stateStoring: AutoLoad("gridTabelasConsultaAbaPrecos", false),
            onToolbarPreparing: AutoResetState([]),

            onInitialized(e) {
                new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            e.component.updateDimensions();
                        }
                    });
                }).observe(e.element[0]);
            },

        }).dxDataGrid('instance'),

        //ESTE LOOKUP NÃO ESTÁ SENDO UTILIZADO, POR ENQUANTO
        vLkpTabelasPrecosConsultaGeral = $('#lkp_Tabelas_Precos_Consulta_Geral').dxLookup({
            dataSource: null,
            searchExpr: ['DS_TABELA_PRECO', 'DS_TIPO_TABELA', 'DS_APLICACAO_PRODUTOS', 'DS_STATUS'],
            displayExpr: 'DS_TABELA_PRECO',
            valueExpr: 'CD_TABELA_PRECO',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Tabelas de Preços',
            },
            //labelMode: 'floating',
            //label: 'Origem do Produto *',
            placeholder: 'Selecione uma tabela para editar',
            showClearButton: true,
            itemTemplate(data) {
                return getTemplateTabela(data);

                lkpTabelasPrecosConsultaGeral.option('value', null);
            },
            onValueChanged: function (e) {
                var tabela = e.component.option('selectedItem');

                console.log('TABELA ', tabela);

                if (tabela !== null && tabela !== undefined) {
                    if (tabela.CD_TABELA_PRECO !== null && tabela.CD_TABELA_PRECO !== undefined) {
                        var percentual = tabela.PC_PADRAO;
                        var tipo = tabela.CD_TIPO_TABELA;

                        if (tabela.CD_TIPO_TABELA == 'D') {
                            if (tabela.PC_PADRAO < 0) {
                                percentual = tabela.PC_PADRAO * -1
                            } else {
                                tipo = 'A'
                            }
                        }

                        editarTabelaPreco(tabela.CD_TABELA_PRECO, tabela.DS_TABELA_PRECO, tipo, percentual, tabela.CD_APLICACAO_PRODUTOS);
                    }
                }
            },
        }).dxLookup('instance'),

        vTxt_Ds_Tabela_Preco_Aba_Preco = $('#txt_Ds_Tabela_Preco_Aba_Preco').dxTextBox({
            labelMode: 'floating',
            label: 'Nome da Tabela',
            maxLength: 60,
        }).dxTextBox("instance"),

        vLkp_Tipos_Tabelas_Aba_Preco = $('#lkp_Tipos_Tabelas_Aba_Preco').dxLookup({
            dataSource: dataSourceTiposTabelas,
            searchExpr: ['DS_TIPO_TABELA'],
            displayExpr: 'DS_TIPO_TABELA',
            valueExpr: 'CD_TIPO_TABELA',
            value: null,
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Tipos de Tabelas',
            },
            labelMode: 'floating',
            label: 'Tipo de Tabela',
            placeholder: '',
            showClearButton: false,

            onValueChanged(e) {
                if (e.value == 'P') {
                    $('#panelPercentualPadraoTabelaPreco').slideUp();
                    $('#panelAplicacaoProdutosTabelaPreco').slideUp();
                } else {
                    $('#panelPercentualPadraoTabelaPreco').slideDown();
                    $('#panelAplicacaoProdutosTabelaPreco').slideDown();
                };
            },
        }).dxLookup('instance'),

        vNbx_Pc_Padrao = $('#nbx_Pc_Padrao').dxNumberBox({
            value: '',
            format: "###,##0.###############'%'",
            min: 0,
            max: 999999,
            showClearButton: true,
            showSpinButtons: false,
            step: 1,
            placeholder: 'Percentual',
            labelMode: 'floating',
            label: 'Percentual',
        }).dxNumberBox('instance'),

        vLkp_Aplicacao_Produtos_Tabelas_Aba_Preco = $('#lkp_Aplicacao_Produtos_Tabelas_Aba_Preco').dxLookup({
            dataSource: dataSourceAplicacaoProdutosTabelas,
            searchExpr: ['DS_APLICACAO_PRODUTOS'],
            displayExpr: 'DS_APLICACAO_PRODUTOS',
            valueExpr: 'CD_APLICACAO_PRODUTOS',
            value: null,
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Aplicação para Produtos',
            },
            labelMode: 'floating',
            label: 'Aplicação para Produtos',
            placeholder: '',
            showClearButton: false,
        }).dxLookup('instance'),

        vLkp_Status_Tabela_Aba_Preco = $('#lkp_Status_Tabela_Aba_Preco').dxLookup({
            dataSource: dataSourceStatus,
            elementAttr: {
                class: 'status_ativo',
            },
            searchExpr: ['DS_STATUS'],
            displayExpr: 'DS_STATUS',
            valueExpr: 'CD_STATUS',
            value: 'A',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Status',
            },
            labelMode: 'floating',
            label: 'Status',
            placeholder: '',
            showClearButton: false,
            onValueChanged(e) {
                if (e.value == 'I') {
                    e.component.option('elementAttr', { class: 'status_inativo' });
                } else {
                    e.component.option('elementAttr', { class: 'status_ativo' });
                };
            },
        }).dxLookup('instance'),

        //Situações Tributárias de ICMS
        vLkp_Situacao_Tributaria_Aba_Preco = $('#lkp_Situacao_Tributaria_Aba_Preco').dxLookup({
            dataSource: dataSourceSituacaoTributaria,
            searchExpr: ['DS_PESQUISA'],
            displayExpr: 'DS_PESQUISA',
            valueExpr: 'CD_SITUACAO_TRIBUTARIA',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Situação Tributária de ICMS',
            },
            labelMode: 'floating',
            label: 'Situação Tributária de ICMS',
            placeholder: 'Situação Tributária de ICMS',
            showClearButton: true,
        }).dxValidator({
            validationRules: [{
                type: 'required', message: 'Situação Tributária de ICMS obrigatória',
            }], validationGroup: 'Preco'
        }).dxLookup('instance'),

        vLkp_Situacao_Tributaria_PIS_Aba_Preco = $('#lkp_Situacao_Tributaria_PIS_Aba_Preco').dxLookup({
            dataSource: dataSourceSituacaoTributariaPIS,
            searchExpr: ['DS_PESQUISA'],
            displayExpr: 'DS_PESQUISA',
            valueExpr: 'CD_SITUACAO_TRIBUTARIA_PIS',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'CST PIS',
            },
            labelMode: 'floating',
            label: 'Situação Tributária de PIS',
            placeholder: 'Situação Tributária de PIS',
            showClearButton: true,
        }).dxLookup('instance'),

        vLkp_Situacao_Tributaria_COFINS_Aba_Preco = $('#lkp_Situacao_Tributaria_COFINS_Aba_Preco').dxLookup({
            dataSource: dataSourceSituacaoTributariaCOFINS,
            searchExpr: ['DS_PESQUISA'],
            displayExpr: 'DS_PESQUISA',
            valueExpr: 'CD_SITUACAO_TRIBUTARIA_COFINS',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'CST COFINS',
            },
            labelMode: 'floating',
            label: 'Situação Tributária de COFINS',
            placeholder: 'Situação Tributária de COFINS',
            showClearButton: true,
        }).dxLookup('instance'),
    ]);

    vCamposPrecificacaoCriados = true;
}

function limpaCamposPrecificacao() {
    //DADOS FISCAIS
    vNbx_Cd_NCM_Aba_Preco.option('value', vNbx_Cd_NCM.option('value'));
    vNbx_Cd_CEST_Aba_Preco.option('value', vNbx_Cd_CEST.option('value'));
    vTxt_Nr_FCI_Aba_Preco.option('value', vTxt_Nr_FCI.option('value'));
    vLkp_Situacao_Tributaria_Aba_Preco.reset();
    $("#lkp_Situacao_Tributaria_Aba_Preco").dxValidator("reset");
    vLkp_Situacao_Tributaria_PIS_Aba_Preco.reset();
    vLkp_Situacao_Tributaria_COFINS_Aba_Preco.reset();
    vNbx_Pc_PIS_Aba_Preco.reset();
    vNbx_Pc_COFINS_Aba_Preco.reset();
    vTxt_Cd_Beneficio_Fiscal_Aba_Preco.reset();
    vNbx_Pc_Carga_Tributaria_Aba_Preco.reset();

    //REGRAS COMERCIAIS
    vChk_Lg_Aceita_Vendas_Estoque_Negativo_Aba_Preco.reset();
    vChk_Lg_Bloqueia_Atualizacao_Preco_Custo_Venda_Recebimento.reset();
    vNbx_Pc_Desconto_Maximo_Aba_Preco.reset();
    $("#nbx_Pc_Desconto_Maximo_Aba_Preco").dxValidator("reset");
    vNbx_Pc_Comissao_Venda_Aba_Preco.reset();
    $("#nbx_Pc_Comissao_Venda_Aba_Preco").dxValidator("reset");
    vNbx_Pc_Comissao_Fretista_Aba_Preco.reset();
    $("#nbx_Pc_Comissao_Fretista_Aba_Preco").dxValidator("reset");
    vNbx_Qt_Embalagem_Aba_Preco.reset();
    vNbx_Qt_Multiplo_Venda_Aba_Preco.reset();
    $("#nbx_Qt_Multiplo_Venda_Aba_Preco").dxValidator("reset");
    vChk_Lg_Somente_Vendido_Multiplos_Aba_Preco.reset();

    //PREÇOS
    vDbx_Dt_Vigencia.reset();
    $("#dbx_Dt_Vigencia").dxValidator("reset");
    vNbx_Vl_Custo_Bruto.reset();
    $("#nbx_Vl_Custo_Bruto").dxValidator("reset");
    vTgx_Descontos.reset();
    vTgx_Descontos.option("items", []);
    vNbx_Pc_Desconto_Total.reset();
    vNbx_Vl_Custo_Liquido.reset();
    vNbx_Pc_Custo_IPI.reset();
    vNbx_Pc_Custo_Frete.reset();
    vNbx_Pc_Custo_ST.reset();
    vNbx_Pc_Custo_Outros_Custos.reset();
    vNbx_Vl_Custo_Total.reset();
    vNbx_Pc_Lucro.reset();
    $("#nbx_Pc_Lucro").dxValidator("reset");
    vNbx_Pc_Lucro_Referencia.reset();
    vNbx_Pc_Rentabilidade.reset();
    $("#nbx_Pc_Rentabilidade").dxValidator("reset");
    vNbx_Vl_Preco_Minimo_Venda.reset();
    $("#nbx_Vl_Preco_Minimo_Venda").dxValidator("reset");

    $("#labelCustoBruto").text('');
    $("#labelDescontoTotal").text('');
    $("#labelCustoLiquido").text('');
    $("#labelCustoTotal").text('');
    $("#labelCargaCustoTotal").text('');
    $("#labelPrecoVenda").text('');
    $("#labelAdicionaisPrecoVenda").text('');
}

async function iniciaAbaPrecificacao() {
    if (vCamposPrecificacaoCriados == false) {
        showProcessPanel("Carregando...", arguments.callee.name);
        criaCamposPrecificacao();
        await configuraAbaPrecificacao();
        hideProcessPanel(arguments.callee.name);
    }
}

async function configuraAbaPrecificacao() {
    await carregaPrecificacaoPrimeiraFilial();
    configuraComparativoRadarPreco();
}

async function carregaPrecificacaoPrimeiraFilial() {
    //MARCA COMO CLICADO
    listFiliaisPrecificacao.itemElements().first().trigger("dxclick");
    await carregaPrecificacao(dataSourceFiliaisAcesso[0].CD_FILIAL);
}

async function carregaPrecificacao(pFilial) {
    showProcessPanel("Carregando...", arguments.callee.name);

    document.getElementById("panelPrecoFilial").style.display = 'block';
    objClassProduto.CD_FILIAL_PRECIFICACAO = pFilial;

    suppressOnChange(true, "carregaPrecificacao");

    limpaCamposPrecificacao();

    await $.ajax({
        type: "POST",
        url: "/Estoque/getPrecificacaoFilial",
        data: { pCDProduto: objClassProduto.CD_PRODUTO, pCDFilial: pFilial },
    }).done(function (response) {
        if (response[0].length > 0) {

            var preco = response[0][0];

            //DADOS FISCAIS
            vNbx_Cd_NCM_Aba_Preco.option('value', vNbx_Cd_NCM.option('value'));
            vNbx_Cd_CEST_Aba_Preco.option('value', vNbx_Cd_CEST.option('value'));
            vTxt_Nr_FCI_Aba_Preco.option('value', vTxt_Nr_FCI.option('value'));
            vLkp_Situacao_Tributaria_Aba_Preco.option("value", preco.CD_SITUACAO_TRIBUTARIA);
            vLkp_Situacao_Tributaria_PIS_Aba_Preco.option("value", preco.CD_SITUACAO_TRIBUTARIA_PIS);
            vLkp_Situacao_Tributaria_COFINS_Aba_Preco.option("value", preco.CD_SITUACAO_TRIBUTARIA_COFINS);
            vNbx_Pc_PIS_Aba_Preco.option("value", preco.PC_PIS);
            vNbx_Pc_COFINS_Aba_Preco.option("value", preco.PC_COFINS);
            vTxt_Cd_Beneficio_Fiscal_Aba_Preco.option("value", preco.CD_BENEFICIO_FISCAL);
            vNbx_Pc_Carga_Tributaria_Aba_Preco.option("value", preco.PC_CARGA_TRIBUTARIA);

            //REGRAS COMERCIAIS
            vChk_Lg_Aceita_Vendas_Estoque_Negativo_Aba_Preco.option('value', isNull(preco.LG_ESTOQUE_NEGATIVO, false));
            vChk_Lg_Bloqueia_Atualizacao_Preco_Custo_Venda_Recebimento.option('value', isNull(preco.LG_BLOQUEIA_ATUALIZACAO_PRECO_CUSTO_VENDA_RECEBIMENTO, false));
            vNbx_Pc_Desconto_Maximo_Aba_Preco.option('value', preco.PC_DESCONTO_MAXIMO);
            vNbx_Pc_Comissao_Venda_Aba_Preco.option('value', preco.PC_COMISSAO_VENDA);
            vNbx_Pc_Comissao_Fretista_Aba_Preco.option('value', preco.PC_COMISSAO_FRETISTA);
            vNbx_Qt_Embalagem_Aba_Preco.option('value', preco.QT_EMBALAGEM_VENDA);
            vNbx_Qt_Multiplo_Venda_Aba_Preco.option('value', preco.QT_MULTIPLO_VENDA);
            vChk_Lg_Somente_Vendido_Multiplos_Aba_Preco.option('value', isNull(preco.LG_SOMENTE_MULTIPLO, false));
            vChk_Lg_Calcular_Volumes_Venda_Expedicao_Aba_Preco.option('value', isNull(preco.LG_EXIBIR_VOLUMES_VENDA_EXPEDICAO, false));

            vDbx_Dt_Vigencia.option("value", preco.DT_VIGENCIA);
            vNbx_Vl_Custo_Bruto.option("value", preco.VL_CUSTO_BRUTO);

            //DESCONTOS DO FORNECEDOR
            if (response[1].length > 0) {
                let items = vTgx_Descontos.option("items");

                for (let desconto of response[1]) {
                    items.push({ Sequencia: desconto.NR_SEQUENCIA, Valor: desconto.PC_DESCONTO });
                }

                vTgx_Descontos.option("items", items);
                vTgx_Descontos.option("value", items.map(a => a.Sequencia));
            }

            vNbx_Pc_Desconto_Total.option("value", preco.PC_DESCONTO_FORNECEDOR_TOTAL);
            vNbx_Vl_Custo_Liquido.option("value", preco.VL_CUSTO_LIQUIDO);

            vNbx_Pc_Custo_IPI.option("value", preco.PC_IPI);

            if (preco.CD_TIPO_CALCULO_FRETE == 1) {
                componenteBotaoNumberBox.component.option('text', '%');
                vNbx_Pc_Custo_Frete.option('format', "     ###,###,###,##0.#####'%'");
                vNbx_Pc_Custo_Frete.option('label', '% Frete de Compra');
                vNbx_Pc_Custo_Frete.option("value", preco.PC_FRETE_COMPRA);
            } else {
                componenteBotaoNumberBox.component.option('text', 'R$');
                vNbx_Pc_Custo_Frete.option('format', "     'R$' ###,###,###,##0.00###");
                vNbx_Pc_Custo_Frete.option('label', 'Frete de Compra');
                vNbx_Pc_Custo_Frete.option("value", preco.VL_FRETE_COMPRA);
            }

            vNbx_Pc_Custo_ST.option("value", preco.PC_IVA);
            vNbx_Pc_Custo_Outros_Custos.option("value", preco.PC_DESPESAS_DIVERSAS);
            vNbx_Vl_Custo_Total.option("value", preco.VL_CUSTO_TOTAL);

            vNbx_Pc_Lucro.option("value", preco.PC_LUCRO);
            vNbx_Pc_Lucro_Referencia.option("value", preco.PC_LUCRO_REFERENCIA);
            vNbx_Pc_Rentabilidade.option("value", preco.PC_MARKUP);
            vNbx_Vl_Preco_Minimo_Venda.option("value", preco.VL_PRECO_MINIMO_VENDA);
        }
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao carregar a precificação para a filial " + pFilial, response);
    }).always(() => {
        hideProcessPanel(arguments.callee.name);
    });

    CalculaCustoLiquido();
    CalculaCustoTotal();
    CalculaPrecoMinimoVenda("C");

    suppressOnChange(false, "carregaPrecificacao");
}

function ValidaPrecificacao() {
    rolarTopo();

    const resultadoValidacaoPrecificacao = DevExpress.validationEngine.validateGroup("Preco");

    if (!resultadoValidacaoPrecificacao.isValid) {
        exibeMensagem("info", "Campo de preenchimento obrigatório", "Por favor, verifique o preenchimento dos campos obrigatórios");
        return false;
    }

    return true;
}

async function SalvaProdutoPrecificacao() {
    if (ValidaPrecificacao() == false) {
        return;
    }

    var precos = [];
    var descontosFornecedor = [];

    //DESCONTOS DO FORNECEDOR
    var selectedDescontos = vTgx_Descontos.option('selectedItems');

    for (indiceDesconto in selectedDescontos) {
        descontosFornecedor.push({
            Cd_Empresa: objClassParametrosEmpresa.CD_EMPRESA,
            Cd_Filial: objClassProduto.CD_FILIAL_PRECIFICACAO,
            Cd_Produto: objClassProduto.CD_PRODUTO,
            Dt_Vigencia: new Date(vDbx_Dt_Vigencia.option('value')).yyyyMMdd() + "T00:00:00Z",
            Nr_Sequencia: selectedDescontos[indiceDesconto].Sequencia,
            Pc_Desconto: selectedDescontos[indiceDesconto].Valor
        })
    }

    //CÁLCULO DO FRETE CONFORME O TIPO
    var valorFrete = 0;
    var percentualFrete = 0;
    var tipoFrete = componenteBotaoNumberBox.component.option('text') == '%' ? 1 : 2;

    if (tipoFrete == 1) {
        percentualFrete = isNull(vNbx_Pc_Custo_Frete.option('value'), 0);
        valorFrete = round(isNull(vNbx_Vl_Custo_Liquido.option('value'), 0) * percentualFrete / 100, 2);
    }
    else {
        valorFrete = isNull(vNbx_Pc_Custo_Frete.option('value'), 0);
        if (valorFrete > 0) {
            percentualFrete = round(100 / isNull(vNbx_Vl_Custo_Liquido.option('value'), 0) * valorFrete, 4);
        }
    }

    var produto = {
        CD_EMPRESA: objClassParametrosEmpresa.CD_EMPRESA,
        CD_PRODUTO: objClassProduto.CD_PRODUTO,
        CD_NCM: vNbx_Cd_NCM_Aba_Preco.option('value'),
        CD_CEST: vNbx_Cd_CEST_Aba_Preco.option('value'),
        NR_FCI: vTxt_Nr_FCI_Aba_Preco.option('value'),
        LG_REPLICAR_PRECOS_ENTRE_FILIAIS: vChk_Lg_Replicar_Precos_Entre_Filiais.option("value"),
        LG_REPLICAR_DADOS_FISCAIS_ENTRE_FILIAIS: vChk_Lg_Replicar_Dados_Fiscais_Entre_Filiais.option("value"),
        LG_REPLICAR_REGRAS_COMERCIAIS_ENTRE_FILIAIS: vChk_Lg_Replicar_Regras_Comerciais_Entre_Filiais.option("value"),
        PRECOS: precos,
    }

    //PRECIFICAÇÃO
    precos.push({
        CD_EMPRESA: objClassParametrosEmpresa.CD_EMPRESA,
        CD_FILIAL: objClassProduto.CD_FILIAL_PRECIFICACAO,
        CD_PRODUTO: objClassProduto.CD_PRODUTO,
        DT_VIGENCIA: new Date(vDbx_Dt_Vigencia.option('value')).yyyyMMdd() + "T00:00:00Z",
        CD_LOGIN: objClassUsuario.CD_LOGIN,

        //DADOS FISCAIS
        CD_SITUACAO_TRIBUTARIA: vLkp_Situacao_Tributaria_Aba_Preco.option('value'),
        CD_SITUACAO_TRIBUTARIA_PIS: vLkp_Situacao_Tributaria_PIS_Aba_Preco.option('value'),
        PC_PIS: vNbx_Pc_PIS_Aba_Preco.option('value'),
        CD_SITUACAO_TRIBUTARIA_COFINS: vLkp_Situacao_Tributaria_COFINS_Aba_Preco.option('value'),
        PC_COFINS: vNbx_Pc_COFINS_Aba_Preco.option('value'),
        CD_BENEFICIO_FISCAL: vTxt_Cd_Beneficio_Fiscal_Aba_Preco.option('value'),
        PC_CARGA_TRIBUTARIA: vNbx_Pc_Carga_Tributaria_Aba_Preco.option('value'),

        //REGRAS COMERCIAIS
        LG_ESTOQUE_NEGATIVO: vChk_Lg_Aceita_Vendas_Estoque_Negativo_Aba_Preco.option('value'),
        PC_DESCONTO_MAXIMO: vNbx_Pc_Desconto_Maximo_Aba_Preco.option('value'),
        PC_COMISSAO_VENDA: vNbx_Pc_Comissao_Venda_Aba_Preco.option('value'),
        PC_COMISSAO_FRETISTA: vNbx_Pc_Comissao_Fretista_Aba_Preco.option('value'),
        QT_EMBALAGEM_VENDA: vNbx_Qt_Embalagem_Aba_Preco.option('value'),
        QT_MULTIPLO_VENDA: vNbx_Qt_Multiplo_Venda_Aba_Preco.option('value'),
        LG_SOMENTE_MULTIPLO: vNbx_Qt_Multiplo_Venda_Aba_Preco.option('value'),

        //PREÇO
        VL_CUSTO_BRUTO: vNbx_Vl_Custo_Bruto.option('value'),
        PC_DESCONTO_FORNECEDOR_TOTAL: vNbx_Pc_Desconto_Total.option('value'),
        VL_CUSTO_LIQUIDO: vNbx_Vl_Custo_Liquido.option('value'),
        PC_MARKUP: vNbx_Pc_Rentabilidade.option('value'),
        PC_LUCRO: vNbx_Pc_Lucro.option('value'),
        PC_LUCRO_REFERENCIA: vNbx_Pc_Lucro_Referencia.option('value'),
        CD_TIPO_CALCULO_FRETE: tipoFrete,
        PC_FRETE_COMPRA: percentualFrete,
        VL_FRETE_COMPRA: valorFrete,
        PC_DESPESAS_DIVERSAS: vNbx_Pc_Custo_Outros_Custos.option('value'),
        PC_IVA: vNbx_Pc_Custo_ST.option('value'),
        VL_CUSTO_TOTAL: vNbx_Vl_Custo_Total.option('value'),
        VL_PRECO_MINIMO_VENDA: vNbx_Vl_Preco_Minimo_Venda.option('value'),
        DESCONTOS_FORNECEDOR: descontosFornecedor,
    })

    console.log("produto", produto)

    await $.ajax({
        type: "POST",
        url: "/Estoque/SalvaProdutoPrecificacao",
        data: { pProduto: JSON.stringify(produto) },
    }).done(function (response) {
        exibeMensagem("success", "Operação realizada", "Salvo com sucesso");
        vDbx_Dt_Atualizacao.option("value", response.DT_ATUALIZACAO);
        getPendenciasCadastro();
        configuraIndicadoresCadastroProduto();
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao gravar a precificação do produto", response);
    });
}

async function DesfazerAlteracaoPrecificacao() {
    console.log("desfazer alteração")
    await carregaPrecificacao(objClassProduto.CD_FILIAL_PRECIFICACAO);
    console.log("desfazer concluído")
}

function CalculaCustoLiquido() {
    var custoBruto = isNaN(parseFloat(vNbx_Vl_Custo_Bruto.option('value'))) ? 0 : vNbx_Vl_Custo_Bruto.option('value');
    var pcDescontoTotal = isNaN(parseFloat(vNbx_Pc_Desconto_Total.option('value'))) ? 0 : vNbx_Pc_Desconto_Total.option('value');

    var descontoTotal = round(custoBruto * (pcDescontoTotal / 100), 5);
    var custoLiquido = custoBruto - descontoTotal;

    vNbx_Vl_Custo_Liquido.option('value', custoLiquido);
    $("#labelCustoBruto").text('R$ ' + formataNumero(custoLiquido, 2, 5));
    $("#labelDescontoTotal").text(formataNumero(pcDescontoTotal, 2, 4) + '%');
    $("#labelCustoLiquido").text('R$ ' + formataNumero(custoLiquido, 2, 5));
}

function CalculaCustoTotal() {
    var custoLiquido = isNaN(parseFloat(vNbx_Vl_Custo_Liquido.option('value'))) ? 0 : vNbx_Vl_Custo_Liquido.option('value');
    var pcCustoIPI = isNaN(parseFloat(vNbx_Pc_Custo_IPI.option('value'))) ? 0 : vNbx_Pc_Custo_IPI.option('value');
    var pcCustoST = isNaN(parseFloat(vNbx_Pc_Custo_ST.option('value'))) ? 0 : vNbx_Pc_Custo_ST.option('value');
    var pcCustoFrete = isNaN(parseFloat(vNbx_Pc_Custo_Frete.option('value'))) ? 0 : vNbx_Pc_Custo_Frete.option('value');
    var pcOutrosCustos = isNaN(parseFloat(vNbx_Pc_Custo_Outros_Custos.option('value'))) ? 0 : vNbx_Pc_Custo_Outros_Custos.option('value');

    var custoIPI = round(custoLiquido * pcCustoIPI / 100, 5);
    var custoST = round(custoLiquido * pcCustoST / 100, 5);
    var custoOutros = round(custoLiquido * pcOutrosCustos / 100, 5);

    //Verifica se o frete é calculado por percentual do custo líquido ou se é um valor fixo
    if (componenteBotaoNumberBox.component.option('text') == '%') {
        var custoFrete = round(custoLiquido * pcCustoFrete / 100, 5);
    } else {
        var custoFrete = pcCustoFrete;
    }

    var valorTotalImpostos = custoIPI + custoST + custoFrete + custoOutros
    var custoTotal = custoLiquido + valorTotalImpostos;
    var carga = 0;
    if (custoLiquido) {
        carga = (100 / custoLiquido) * valorTotalImpostos;
    }

    vNbx_Vl_Custo_Total.option('value', custoTotal);
    $("#labelCustoTotal").text('R$ ' + formataNumero(custoTotal, 2, 5));
    $("#labelCargaCustoTotal").text(formataNumero(carga, 2, 4) + '%');
}

function CalculaPrecoMinimoVenda(pOrigem) {
    var custoTotal, pcLucro, pcRentabilidade, precoMinimo;

    custoTotal = isNaN(parseFloat(vNbx_Vl_Custo_Total.option('value'))) ? 0 : vNbx_Vl_Custo_Total.option('value');

    if (pOrigem == "C" || pOrigem == "L") { //<C> CUSTO TOTAL / <L> LUCRO 
        pcLucro = isNaN(parseFloat(vNbx_Pc_Lucro.option('value'))) ? 0 : vNbx_Pc_Lucro.option('value');

        precoMinimo = round(custoTotal * (1 + (pcLucro / 100)), 5);

        if (precoMinimo == 0) {
            pcLucro = 0;
            pcRentabilidade = 0;
        } else {
            pcRentabilidade = round(((precoMinimo - custoTotal) / precoMinimo) * 100, 4);
        }
    }
    else if (pOrigem == "R") { //<R> RENTABILIDADE
        pcRentabilidade = isNaN(parseFloat(vNbx_Pc_Rentabilidade.option('value'))) ? 0 : vNbx_Pc_Rentabilidade.option('value');
        if (pcRentabilidade >= 100) pcRentabilidade = 99.9999

        if (custoTotal == 0) {
            precoMinimo = 0;
            pcLucro = 0;
            pcRentabilidade = 0;
        } else {
            precoMinimo = round(custoTotal / (1 - (pcRentabilidade / 100)), 5);
            pcLucro = round((precoMinimo - custoTotal) / custoTotal * 100, 4);
        }
    }
    else if (pOrigem == "V") { //<V> PREÇO MÍNIMO DE VENDA
        var precoMinimo = isNaN(parseFloat(vNbx_Vl_Preco_Minimo_Venda.option('value'))) ? 0 : vNbx_Vl_Preco_Minimo_Venda.option('value');

        if (precoMinimo == 0) {
            pcLucro = 0;
            pcRentabilidade = 0;
        } else {
            pcLucro = round(((precoMinimo / custoTotal) - 1) * 100, 4);
            pcRentabilidade = round(((precoMinimo - custoTotal) / precoMinimo) * 100, 4);
        }
    }

    vNbx_Pc_Lucro.option('value', pcLucro);
    vNbx_Pc_Rentabilidade.option('value', pcRentabilidade);
    vNbx_Vl_Preco_Minimo_Venda.option('value', precoMinimo);

    var precoVendaComAdicionais = precoMinimo
    precoVendaComAdicionais = round(precoVendaComAdicionais * (1 + (objClassParametrosEmpresa.PC_SOBRE_PRECO_VENDEDOR / 100)), 5)
    precoVendaComAdicionais = round(precoVendaComAdicionais * (1 + (objClassParametrosEmpresa.PC_SOBRE_PRECO_GERENTE / 100)), 5)
    precoVendaComAdicionais = round(precoVendaComAdicionais * (1 + (objClassParametrosEmpresa.PC_SOBRE_PRECO_DIRETORIA / 100)), 5)
    precoVendaComAdicionais = round(precoVendaComAdicionais * (1 + (objClassParametrosEmpresa.PC_SOBRE_PRECO_FINANCEIRO / 100)), 5)

    var pcAdicionais = 0;
    var vlAdicionais = precoVendaComAdicionais - precoMinimo;
    if (precoMinimo && precoVendaComAdicionais) {
        pcAdicionais = (100 / precoMinimo) * vlAdicionais;
    }

    $("#labelPrecoVenda").text('R$ ' + formataNumero(precoVendaComAdicionais, 2, 5));
    $("#labelAdicionaisPrecoVenda").text(formataNumero(pcAdicionais, 2, 4) + '%');

    configuraComparativoRadarPreco();
}

function configuraNumberBoxCustoFrete(e) {
    if (e.component.option('text') == '%') {
        e.component.option('text', 'R$');
        vNbx_Pc_Custo_Frete.option('format', "     'R$' ###,###,###,##0.00###");
        vNbx_Pc_Custo_Frete.option('label', 'Frete de Compra');
    } else {
        e.component.option('text', '%');
        vNbx_Pc_Custo_Frete.option('format', "     ###,###,###,##0.#####'%'");
        vNbx_Pc_Custo_Frete.option('label', '% Frete de Compra');
    }
};

function configuraComparativoRadarPreco() {
    if (!vCamposPrecificacaoCriados) return;

    $("#divCustoLiquidoMercado").hide();
    $("#divDescontoTotal").removeClass("col-lg-6").addClass("col-lg-12");
    $("#divCustoTotalMercado").hide();
    $("#divCargaCustoTotal").removeClass("col-lg-6").addClass("col-lg-12");
    $("#divPrecoVendaMercado").hide();
    $("#divAdicionais").removeClass("col-lg-6").addClass("col-lg-12");

    if (objClassProduto.LG_RADAR_PRECO_VALIDADO) {
        $("#divCustoLiquidoMercado").show();
        $("#divDescontoTotal").removeClass("col-lg-12").addClass("col-lg-6");
        $("#divCustoTotalMercado").show();
        $("#divCargaCustoTotal").removeClass("col-lg-12").addClass("col-lg-6");
        $("#divPrecoVendaMercado").show();
        $("#divAdicionais").removeClass("col-lg-12").addClass("col-lg-6");

        //CUSTO LÍQUIDO
        var custoLiquido = isNaN(parseFloat(vNbx_Vl_Custo_Liquido.option('value'))) ? 0 : vNbx_Vl_Custo_Liquido.option('value');
        if (objClassProduto.VL_CUSTO_LIQUIDO_RADAR_PRECO > custoLiquido) {
            $("#labelCustoLiquidoMercado").removeClass("badge-danger").addClass("badge-success");
            $("#labelCustoLiquidoMercado").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_CUSTO_LIQUIDO_RADAR_PRECO, 2, 5)} <i class="fa fa-arrow-circle-up mr-1"></i>`)
        } else if (objClassProduto.VL_CUSTO_LIQUIDO_RADAR_PRECO < custoLiquido) {
            $("#labelCustoLiquidoMercado").removeClass("badge-success").addClass("badge-danger");
            $("#labelCustoLiquidoMercado").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_CUSTO_LIQUIDO_RADAR_PRECO, 2, 5)} <i class="fa fa-arrow-circle-down mr-1"></i>`)
        } else {
            $("#labelCustoLiquidoMercado").removeClass("badge-danger").addClass("badge-success");
            $("#labelCustoLiquidoMercado").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_CUSTO_LIQUIDO_RADAR_PRECO, 2, 5)}`)
        }

        //CUSTO TOTAL
        var custoTotal = isNaN(parseFloat(vNbx_Vl_Custo_Total.option('value'))) ? 0 : vNbx_Vl_Custo_Total.option('value');
        if (objClassProduto.VL_CUSTO_TOTAL_RADAR_PRECO > custoTotal) {
            $("#labelCustoTotalMercado").removeClass("badge-danger").addClass("badge-success");
            $("#labelCustoTotalMercado").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_CUSTO_TOTAL_RADAR_PRECO, 2, 5)} <i class="fa fa-arrow-circle-up mr-1"></i>`)
        } else if (objClassProduto.VL_CUSTO_TOTAL_RADAR_PRECO < custoTotal) {
            $("#labelCustoTotalMercado").removeClass("badge-success").addClass("badge-danger");
            $("#labelCustoTotalMercado").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_CUSTO_TOTAL_RADAR_PRECO, 2, 5)} <i class="fa fa-arrow-circle-down mr-1"></i>`)
        } else {
            $("#labelCustoTotalMercado").removeClass("badge-danger").addClass("badge-success");
            $("#labelCustoTotalMercado").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_CUSTO_TOTAL_RADAR_PRECO, 2, 5)}`)
        }

        //PREÇO VENDA
        var precoVenda = isNaN(parseFloat(vNbx_Vl_Preco_Minimo_Venda.option('value'))) ? 0 : vNbx_Vl_Preco_Minimo_Venda.option('value');
        if (objClassProduto.VL_PRECO_VENDA_RADAR_PRECO > precoVenda) {
            $("#labelPrecoVendaMercado").removeClass("badge-danger").addClass("badge-success");
            $("#labelPrecoVendaMercado").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_PRECO_VENDA_RADAR_PRECO, 2, 5)} <i class="fa fa-arrow-circle-up mr-1"></i>`)
        } else if (objClassProduto.VL_PRECO_VENDA_RADAR_PRECO < precoVenda) {
            $("#labelPrecoVendaMercado").removeClass("badge-success").addClass("badge-danger");
            $("#labelPrecoVendaMercado").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_PRECO_VENDA_RADAR_PRECO, 2, 5)} <i class="fa fa-arrow-circle-down mr-1"></i>`)
        } else {
            $("#labelPrecoVendaMercado").removeClass("badge-danger").addClass("badge-success");
            $("#labelPrecoVendaMercado").html(`Mercado: R$ ${formataNumero(objClassProduto.VL_PRECO_VENDA_RADAR_PRECO, 2, 5)}`)
        }
    }
}

function ativarTabela(codigoTabela) {
    var idHtmlCampos = "#cardCamposTabela_" + codigoTabela;
    var idHtmlBtnAtivarTabela = "panelBtnAtivarTabela_" + codigoTabela;
    var idHtmlBtnTabelaAtivada = "panelBtnTabelaAtivada_" + codigoTabela;
    var idHtmlBtnEditar = "panelBtnEditarTabela_" + codigoTabela;
    var idHtmlBtnEditarExcluir = "panelBtnEditarExcluirTabela_" + codigoTabela;
    var campoLucroFoco = '#nbx_Pc_Lucro_Tabela_Preco_Aba_Preco_' + codigoTabela;

    $(idHtmlCampos).slideDown();

    ExibirEsconderPaineis(idHtmlBtnAtivarTabela, 'none');
    ExibirEsconderPaineis(idHtmlBtnTabelaAtivada, 'block');

    ExibirEsconderPaineis(idHtmlBtnEditar, 'none');
    ExibirEsconderPaineis(idHtmlBtnEditarExcluir, 'block');

    $(campoLucroFoco).dxNumberBox('instance').focus();
}

function excluirProdutoTabela(codigoTabela) {
    var idHtmlCampos = "#cardCamposTabela_" + codigoTabela;
    var idHtmlBtnAtivarTabela = "panelBtnAtivarTabela_" + codigoTabela;
    var idHtmlBtnTabelaAtivada = "panelBtnTabelaAtivada_" + codigoTabela;
    var idHtmlBtnEditar = "panelBtnEditarTabela_" + codigoTabela;
    var idHtmlBtnEditarExcluir = "panelBtnEditarExcluirTabela_" + codigoTabela;

    $(idHtmlCampos).slideUp();

    ExibirEsconderPaineis(idHtmlBtnAtivarTabela, 'block');
    ExibirEsconderPaineis(idHtmlBtnTabelaAtivada, 'none');

    ExibirEsconderPaineis(idHtmlBtnEditar, 'block');
    ExibirEsconderPaineis(idHtmlBtnEditarExcluir, 'none');
}

function criarTabelaPreco() {
    tabelaPrecoClientesCarregados = false;
    tabelaPrecoProdutosECommerceCarregados = false;

    $("#txt_Ds_Tabela_Preco_Aba_Preco").dxTextBox("instance").option("value", "");
    $("#lkp_Tipos_Tabelas_Aba_Preco").dxLookup("instance").option("value", null);
    $("#nbx_Pc_Padrao").dxNumberBox("instance").option("value", "");
    $("#lkp_Aplicacao_Produtos_Tabelas_Aba_Preco").dxLookup("instance").option("value", null);
    $("#lkp_Status_Tabela_Aba_Preco").dxLookup("instance").option("value", 'A');

    ExibirEsconderPaineis('panelPercentualPadraoTabelaPreco', 'none');
    ExibirEsconderPaineis('panelAplicacaoProdutosTabelaPreco', 'none');
    ExibirEsconderPaineis('cardTabelaPrecosTabsProdutoCliente', 'none');
    avancaProximaEtapa('#panelTabelaPrecosManutencaoInicio', '#panelTabelaPrecosDadosAbaPreco')
}

function editarTabelaPreco(codigo, nome, tipo, percentual, aplicacao, status) {

    tabelaPrecoClientesCarregados = false;
    tabelaPrecoProdutosECommerceCarregados = false;
    tabelaPreco = codigo;
    tabelaPrecoTipo = tipo;
    tabelaPrecoAplicacao = aplicacao;

    $("#txt_Ds_Tabela_Preco_Aba_Preco").dxTextBox("instance").option("value", nome);
    $("#lkp_Tipos_Tabelas_Aba_Preco").dxLookup("instance").option("value", tipo);
    $("#nbx_Pc_Padrao").dxNumberBox("instance").option("value", percentual);
    $("#lkp_Aplicacao_Produtos_Tabelas_Aba_Preco").dxLookup("instance").option("value", aplicacao);
    $("#lkp_Status_Tabela_Aba_Preco").dxLookup("instance").option("value", status);

    avancaProximaEtapa('#panelTabelaPrecosManutencaoInicio', '#panelTabelaPrecosDadosAbaPreco')

    if (aplicacao == 'T') {
        ExibirEsconderPaineis('cardGridBoxTabelaProdutosInclusao', 'none');
        ExibirEsconderPaineis('labelTabelaAplicadaTodosProdutos', 'block');
        btnHabilitarExclusaoProdutoTabelaAplicacao = false;
    } else {
        ExibirEsconderPaineis('cardGridBoxTabelaProdutosInclusao', 'block');
        ExibirEsconderPaineis('labelTabelaAplicadaTodosProdutos', 'none');
        btnHabilitarExclusaoProdutoTabelaAplicacao = true;
    }

    if (tabelaPrecoTipo !== 'P') {
        btnHabilitarAlteracaoProdutoTabelaAplicacao = false;
    } else {
        btnHabilitarAlteracaoProdutoTabelaAplicacao = true;
    }

    ExibirEsconderPaineis('cardTabelaPrecosTabsProdutoCliente', 'block');
    carregarProdutosManutencaoTabelaPreco(codigo);
}

function gravarTabelaPreco() {
    codigo = 6; //código gerado no banco de dados para a nova tabela
    tabelaPreco = codigo; //variável geral para navegação entre as abas
    tabelaPrecoAplicacao = $("#lkp_Aplicacao_Produtos_Tabelas_Aba_Preco").dxLookup("instance").option("value");
    tabelaPrecoTipo = $("#lkp_Tipos_Tabelas_Aba_Preco").dxLookup("instance").option("value");

    if (tabelaPrecoAplicacao == 'T') {
        ExibirEsconderPaineis('cardGridBoxTabelaProdutosInclusao', 'none');
        ExibirEsconderPaineis('labelTabelaAplicadaTodosProdutos', 'block');
        btnHabilitarExclusaoProdutoTabelaAplicacao = false;
    } else {
        ExibirEsconderPaineis('cardGridBoxTabelaProdutosInclusao', 'block');
        ExibirEsconderPaineis('labelTabelaAplicadaTodosProdutos', 'none');
        btnHabilitarExclusaoProdutoTabelaAplicacao = true;
    }

    if (tabelaPrecoTipo !== 'P') {
        btnHabilitarAlteracaoProdutoTabelaAplicacao = false;
    } else {
        btnHabilitarAlteracaoProdutoTabelaAplicacao = true;
    }

    document.getElementById('abaAcessoTabelaPrecosProdutos').click();

    $('#cardTabelaPrecosTabsProdutoCliente').slideDown();
    carregarProdutosManutencaoTabelaPreco(codigo);
}

function retornaTabelaPrecoInicial() {
    retornaEtapaAnterior('#panelTabelaPrecosDadosAbaPreco', '#panelTabelaPrecosManutencaoInicio');
    $('#panelTabelaPrecosProdutosAbaPreco').slideUp();
    $('#panelTabelaPrecosClientesAbaPreco').slideUp();
    document.getElementById('abaAcessoTabelaPrecosProdutos').click();

}

function carregarProdutosManutencaoTabelaPreco(tabela) {

    $('#gridTabelasProdutosAbaPrecos').slideUp();

    loadPanelTabelaPrecosProdutos = $('#loadPanelTabelaPrecosProdutos').dxLoadPanel({
        shadingColor: 'rgba(0,0,0,0.4)',
        message: 'Carregando Produtos',
        //position: { of: '#ModalIncluirEditarTabelaPrecos' },
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        hideOnOutsideClick: false,
    }).dxLoadPanel('instance');

    loadPanelTabelaPrecosProdutos2 = $('#loadPanelTabelaPrecosProdutos2').dxLoadPanel({
        shadingColor: 'rgba(0,0,0,0.4)',
        message: 'Carregando Produtos',
        //position: { of: '#ModalIncluirEditarTabelaPrecos' },
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        hideOnOutsideClick: false,
    }).dxLoadPanel('instance');

    loadPanelTabelaPrecosProdutos.show();
    loadPanelTabelaPrecosProdutos2.show();

    //Produtos de uma Determinada Tabelas de Preços
    GetAzureDataSource(82, '{ CD_TABELA_PRECO: ' + tabela + ', CD_STATUS_PRODUTO: "A" }', 180).then((result) => {

        if (result.success) {

            console.log('CARGA PRIMEIRO DATASOURCE PRODUTOS');

            gridTabelasProdutosAbaPrecos = $("#gridTabelasProdutosAbaPrecos").dxDataGrid({
                dataSource: result.data,
                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                showColumnLines: true,
                rowAlternationEnabled: true,
                wordWrapEnabled: true,
                columnHidingEnabled: true,
                editing: {
                    mode: 'batch',
                    allowUpdating: btnHabilitarAlteracaoProdutoTabelaAplicacao,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: false,
                    useIcons: false,
                },
                keyboardNavigation: {
                    enterKeyAction: 'moveFocus',
                    enterKeyDirection: 'column',
                    editOnKeyPress: true,
                },
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
                    mode: 'multiple',
                    allowSelectAll: true,
                    showCheckBoxesMode: 'always',
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
                paging: { pageSize: 10 },
                pager: {
                    visible: true,
                    allowedPageSizes: [10, 20, 50],
                    showPageSizeSelector: true,
                    showNavigationButtons: true
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Produtos');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProdutosTabelaPreço_' + tabela + '.xlsx');
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
                keyExpr: 'CD_PRODUTO',
                columns: [
                    {
                        type: "selection",
                        dataField: "CD_SELECAO",
                        width: 30,
                        value: false,
                        allowHiding: false,
                    },
                    {
                        dataField: "CD_PRODUTO",
                        caption: "Código",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                        allowHiding: false,
                    },
                    {
                        dataField: "DS_PRODUTO",
                        caption: "Produto",
                        //width: 200,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        allowHiding: false,
                        visible: true,
                        //groupIndex: 0,
                    },
                    {
                        dataField: "CD_PRODUTO_ECOMMERCE",
                        caption: "Código e-Commerce",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "DS_STATUS",
                        caption: "Status",
                        width: 75,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "LG_FORA_LINHA",
                        caption: "Fora Linha",
                        width: 70,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: true,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "VL_PRECO_MINIMO_VENDA",
                        caption: "Preço Padrão",
                        width: 80,
                        dataType: 'number',
                        format: "###,###,###,##0.00",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'right',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "PC_DIFERENCA_PRECO_PADRAO",
                        caption: "Desc(-) Acresc(+)",
                        width: 120,
                        dataType: 'number',
                        format: "###,###,###,##0.###############'%'",
                        allowEditing: true,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "PC_LUCRO_TABELA",
                        caption: "% Lucro Tabela",
                        width: 120,
                        dataType: 'number',
                        format: "###,###,###,##0.###############'%'",
                        allowEditing: true,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "PC_RENTABILIDADE_TABELA",
                        caption: "% Rentabilidade da Tabela",
                        width: 130,
                        dataType: 'number',
                        format: "###,###,###,##0.###############'%'",
                        allowEditing: true,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: true,
                    },
                    {
                        dataField: "VL_PRECO_TABELA",
                        caption: "Preço desta Tabela",
                        width: 80,
                        dataType: 'number',
                        format: "###,###,###,##0.00",
                        allowEditing: true,
                        allowSorting: true,
                        alignment: 'right',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: true,
                        allowHiding: false,
                    },
                    {
                        dataField: "DS_MARCA",
                        caption: "Marca",
                        //width: 200,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "DS_FAMILIA",
                        caption: "Família",
                        //width: 200,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_CURVA_ABC",
                        caption: "Curva",
                        width: 60,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_FABRICANTE",
                        caption: "Cód. Fabricante",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_ORIGINAL",
                        caption: "Cód. Original",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_OPCIONAL",
                        caption: "Cód. Opcional",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_EAN_PRODUTO",
                        caption: "Código Barras",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_NCM",
                        caption: "NCM",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_INTERNO_PRODUTO_FORNECEDOR",
                        caption: "Cód. Interno Fornec",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "CD_FORNECEDOR",
                        caption: "Fornecedor",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "DS_RAZAO_SOCIAL_FORNECEDOR",
                        caption: "Razão Social Fornecedor",
                        //width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "DS_FANTASIA_FORNECEDOR",
                        caption: "Fantasia Fornecedor",
                        //width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        allowFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "VL_CUSTO_SEM_IMPOSTOS",
                        caption: "Custo Sem Impostos",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.00###",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'right',
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "VL_CUSTO_TOTAL",
                        caption: "Custo Com Impostos",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.00###",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'right',
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "PC_IPI",
                        caption: "% IPI Custo",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.#####'%'",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "PC_SUBSTITUICAO",
                        caption: "% ST Custo",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.#####'%'",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "PC_FRETE_COMPRA",
                        caption: "% Frete Compra",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.#####'%'",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "VL_FRETE_COMPRA",
                        caption: "Frete Compra",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.00###",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'right',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "PC_LUCRO",
                        caption: "% Lucro Produto",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.#####'%'",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "PC_RENTABILIDADE",
                        caption: "% Rentab. Produto",
                        width: 90,
                        dataType: 'number',
                        format: "###,###,###,##0.#####'%'",
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        allowHiding: true,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                ],

                onCellPrepared: function (e) {
                    if (e.rowType === "data") {

                        if (e.column.allowEditing && btnHabilitarAlteracaoProdutoTabelaAplicacao == true) {
                            e.cellElement.css("background-color", "#EDF3F8");
                        }

                        if (e.column.dataField === "DS_STATUS") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }
                        if (e.column.dataField === "PC_RENTABILIDADE_TABELA") {
                            if (e.value < 0) {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        }
                        if (e.column.dataField === "VL_PRECO_TABELA") {
                            e.cellElement.css("font-weight", "bold");
                        }
                        if (e.column.dataField === "LG_FORA_LINHA") {
                            e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                            e.cellElement.css("color", "white");
                        }
                    };
                    if (e.rowType === "group") {
                        e.cellElement.css("color", "#f05b41");
                        e.cellElement.css("background-color", "white");
                    };
                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            locateInMenu: 'auto',
                            options: {
                                icon: 'trash',
                                text: 'Excluir Produtos',
                                hint: 'Excluir produtos selecionados da tabela de preços',
                                type: 'danger',
                                visible: btnHabilitarExclusaoProdutoTabelaAplicacao,
                                onClick() {
                                },
                            },
                        },
                        {
                            name: "groupPanel",
                            locateInMenu: "auto",
                        },
                        'saveButton',
                        'revertButton',
                        'exportButton',
                        'columnChooserButton',
                        'searchPanel',
                    ],
                },

                stateStoring: AutoLoad("gridTabelasProdutosAbaPrecos", false),
                onToolbarPreparing: AutoResetState([]),

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

            $('#gridTabelasProdutosAbaPrecos').slideDown();
            loadPanelTabelaPrecosProdutos2.hide();
        }
        else {
            loadPanelTabelaPrecosProdutos2.hide();

            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });

    GetAzureDataSource(83, '{ CD_TABELA_PRECO: ' + tabela + ', CD_STATUS_PRODUTO: "A" }', 180).then((result) => {

        if (result.success) {

            $('#panelTabelaPrecosProdutosAbaPreco').slideDown();
            console.log('CARGA SEGUNDO DATASOURCE PRODUTOS');

            gridBoxProdutosNaoHabilitadosTabelaPreco = $('#gridBoxProdutosNaoHabilitadosTabelaPreco').dxDropDownBox({
                valueExpr: 'CD_PRODUTO',
                displayExpr: 'CD_PRODUTO',
                labelMode: 'floating',
                label: '',
                placeholder: '+ Clique para adicionar produtos',
                elementAttr: {
                    class: 'gridbox-font',
                },
                showClearButton: true,
                dataSource: new DevExpress.data.CustomStore({
                    loadMode: "raw",
                    key: ['CD_PRODUTO'],
                    load: function () {
                        return result.data;
                    }
                }),
                dropDownOptions: {
                    //closeOnOutsideClick: true,
                    animation: {
                        show: {
                            type: "slide",
                            from: { opacity: 0, top: 100 },
                            to: {
                                opacity: 1,
                            }
                        },
                        hide: {
                            type: "slide",
                            from: { opacity: 1, top: 100 },
                            to: {
                                opacity: 0,
                            }
                        }
                    },
                    //onShowing: async function (e) {
                    //    e.component._$wrapper.css('z-index', 998);
                    //    await this.fnPromise;
                    //    e.component.repaint();
                    //},
                    onShowing: async (e) => {
                        e.component._$wrapper.css('z-index', 1102);
                        await this.fnPromise;
                        /*e.component.repaint();*/
                    },
                    //onOptionChanged: function (e) {
                    //    if (e.name != 'visible') return;
                    //    if (!e.value) return;
                    //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardMovimentacao')[0].getBoundingClientRect().top;
                    //    this.fnPromise = $('#cardMovimentacao').animate({ top: diffTop }, {
                    //        complete: () => e.component.refreshPosition(),
                    //    }).promise();
                    //},
                    onOptionChanged: function (e) {
                        if (e.name != "visible") return;
                        if (!e.value) return;
                        $("#formCadastroTabelaPreco").hide();
                        this.fnPromise = $('#panelTabelaPrecosDadosAbaPreco').animate({ top: 0 }, {
                            complete: () => {
                                e.component.refreshPosition();
                                //gridBoxProdutosNaoHabilitadosTabelaPreco.refresh();
                            },
                        }).promise();
                    },
                    onHiding: function (e) {
                        $("#formCadastroTabelaPreco").show();
                    },

                },
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGrid = $('<div>').dxDataGrid({
                        dataSource: e.component.getDataSource(),
                        searchExpr: ['CD_PRODUTO'],
                        displayExpr: 'CD_PRODUTO',
                        valueExpr: 'CD_PRODUTO',
                        wordWrapEnabled: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        searchPanel: {
                            visible: true,
                            highlightCaseSensitive: false,
                            highlightSearchText: true,
                            placeholder: "Procurar...",
                        },
                        editing: {
                            mode: 'batch',
                            allowUpdating: btnHabilitarAlteracaoProdutoTabelaAplicacao,
                            startEditAction: 'click',
                            allowAdding: false,
                            allowDeleting: false,
                            useIcons: false,
                        },
                        loadPanel: { enabled: true, },
                        sorting: { mode: "multiple" },
                        allowColumnResizing: true,
                        columnResizingMode: "widget",
                        allowColumnReordering: true,
                        groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                        selection: {
                            mode: 'multiple',
                            showCheckBoxesMode: 'always',
                        },
                        keyboardNavigation: {
                            enterKeyAction: 'moveFocus',
                            enterKeyDirection: 'column',
                            editOnKeyPress: true,
                        },
                        focusedRowEnabled: false,
                        hoverStateEnabled: true,
                        paging: { pageSize: 25 },
                        filterRow: { visible: true, applyFilter: "auto" },
                        headerFilter: {
                            visible: true,
                            allowSearch: true
                        },
                        filterPanel: { visible: true },
                        columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                        columnsAutoWidth: true,
                        cellHintEnabled: true,
                        keyExpr: ['CD_PRODUTO'],
                        columns: [
                            {
                                type: "selection",
                                dataField: "CD_SELECAO",
                                width: 30,
                                value: false,
                                allowHiding: false,
                            },
                            {
                                dataField: "CD_PRODUTO",
                                caption: "Código",
                                width: 90,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: true,
                                allowHiding: false,
                            },
                            {
                                dataField: "DS_PRODUTO",
                                caption: "Produto",
                                //width: 200,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'left',
                                cssClass: "column-data-grid",
                                allowHiding: false,
                                visible: true,
                                //groupIndex: 0,
                            },
                            {
                                dataField: "CD_PRODUTO_ECOMMERCE",
                                caption: "Código e-Commerce",
                                width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: true,
                            },
                            {
                                dataField: "DS_STATUS",
                                caption: "Status",
                                width: 75,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "LG_FORA_LINHA",
                                caption: "Fora Linha",
                                width: 70,
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: true,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: true,
                            },
                            {
                                dataField: "VL_PRECO_MINIMO_VENDA",
                                caption: "Preço Padrão",
                                width: 80,
                                dataType: 'number',
                                format: "###,###,###,##0.00",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'right',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: true,
                            },
                            {
                                dataField: "PC_DIFERENCA_PRECO_PADRAO",
                                caption: "Desc(-) Acresc(+)",
                                width: 120,
                                dataType: 'number',
                                format: "###,###,###,##0.###############'%'",
                                allowEditing: true,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: true,
                            },
                            {
                                dataField: "PC_LUCRO_TABELA",
                                caption: "% Lucro Tabela",
                                width: 120,
                                dataType: 'number',
                                format: "###,###,###,##0.###############'%'",
                                allowEditing: true,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "PC_RENTABILIDADE_TABELA",
                                caption: "% Rentabilidade da Tabela",
                                width: 120,
                                dataType: 'number',
                                format: "###,###,###,##0.###############'%'",
                                allowEditing: true,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: true,
                            },
                            {
                                dataField: "VL_PRECO_TABELA",
                                caption: "Preço desta Tabela",
                                width: 80,
                                dataType: 'number',
                                format: "###,###,###,##0.00",
                                allowEditing: true,
                                allowSorting: true,
                                alignment: 'right',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: true,
                                allowHiding: false,
                            },
                            {
                                dataField: "DS_MARCA",
                                caption: "Marca",
                                //width: 200,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "DS_FAMILIA",
                                caption: "Família",
                                //width: 200,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_CURVA_ABC",
                                caption: "Curva",
                                width: 60,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_FABRICANTE",
                                caption: "Cód. Fabricante",
                                width: 90,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_ORIGINAL",
                                caption: "Cód. Original",
                                width: 90,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_OPCIONAL",
                                caption: "Cód. Opcional",
                                width: 90,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_EAN_PRODUTO",
                                caption: "Código Barras",
                                width: 90,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_NCM",
                                caption: "NCM",
                                width: 80,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_INTERNO_PRODUTO_FORNECEDOR",
                                caption: "Cód. Interno Fornec",
                                width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "CD_FORNECEDOR",
                                caption: "Fornecedor",
                                width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "DS_RAZAO_SOCIAL_FORNECEDOR",
                                caption: "Razão Social Fornecedor",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'left',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "DS_FANTASIA_FORNECEDOR",
                                caption: "Fantasia Fornecedor",
                                //width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                allowFiltering: true,
                                alignment: 'left',
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "VL_CUSTO_SEM_IMPOSTOS",
                                caption: "Custo Sem Impostos",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.00###",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'right',
                                allowHeaderFiltering: false,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "VL_CUSTO_TOTAL",
                                caption: "Custo Com Impostos",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.00###",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'right',
                                allowHeaderFiltering: false,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "PC_IPI",
                                caption: "% IPI Custo",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.#####'%'",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "PC_SUBSTITUICAO",
                                caption: "% ST Custo",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.#####'%'",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "PC_FRETE_COMPRA",
                                caption: "% Frete Compra",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.#####'%'",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "VL_FRETE_COMPRA",
                                caption: "Frete Compra",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.00###",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'right',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "PC_LUCRO",
                                caption: "% Lucro Produto",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.#####'%'",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                            {
                                dataField: "PC_RENTABILIDADE",
                                caption: "% Rentab. Produto",
                                width: 90,
                                dataType: 'number',
                                format: "###,###,###,##0.#####'%'",
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                allowHeaderFiltering: false,
                                allowHiding: true,
                                cssClass: "column-data-grid",
                                visible: false,
                            },
                        ],
                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxLookup',
                                    options: {
                                        dataSource: dataSourceCamposInclusaoProdutosTabelaPreco,
                                        searchExpr: ['DS_CAMPO'],
                                        displayExpr: 'DS_CAMPO',
                                        valueExpr: 'CD_CAMPO',
                                        //value: 'A',
                                        dropDownOptions: {
                                            closeOnOutsideClick: true,
                                            showTitle: false,
                                            title: 'Campo',
                                        },
                                        placeholder: 'Preenchimento Linear',
                                        showClearButton: true,
                                        onValueChanged(e) {

                                        },
                                    },
                                },
                                {
                                    location: 'after',
                                    widget: 'dxNumberBox',
                                    options: {
                                        name: 'nbxValorPreenchimentoLinear',
                                        value: '',
                                        format: "###,##0.###############",
                                        min: 0,
                                        max: 999999,
                                        showClearButton: true,
                                        showSpinButtons: false,
                                        step: 1,
                                        placeholder: 'Valor Linear',
                                        visible: true,
                                    },
                                },
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        type: 'success',
                                        text: 'Adicionar Produtos',
                                        hint: "Adicionar produtos selecionados",
                                        width: 150,
                                        icon: 'plus',
                                        onClick(e) {

                                        },

                                    },
                                },
                                'groupPanel',
                                'columnChooserButton',
                                'searchPanel',
                            ],
                        },
                        showBorders: true,
                        onShowing: async (e) => {
                            e.component._$wrapper.css('z-index', 1101);
                            await this.fnPromise;
                            /*e.component.repaint();*/
                        },
                        onCellPrepared: function (e) {
                            if (e.rowType === "data") {
                                if (e.column.allowEditing && btnHabilitarAlteracaoProdutoTabelaAplicacao == true) {
                                    e.cellElement.css("background-color", "#EDF3F8");
                                }

                                if (e.column.dataField === "DS_STATUS") {
                                    if (e.value === "Inativo") {
                                        e.cellElement.css("color", "#d00000");
                                        e.cellElement.css("font-weight", "bold");
                                    };
                                }
                                if (e.column.dataField === "PC_RENTABILIDADE_TABELA") {
                                    if (e.value < 0) {
                                        e.cellElement.css("color", "#d00000");
                                        e.cellElement.css("font-weight", "bold");
                                    };
                                }
                                if (e.column.dataField === "VL_PRECO_TABELA") {
                                    e.cellElement.css("font-weight", "bold");
                                }
                                if (e.column.dataField === "LG_FORA_LINHA") {
                                    e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                                    e.cellElement.css("color", "white");
                                }
                            };
                            if (e.rowType === "group") {
                                e.cellElement.css("color", "#f05b41");
                                e.cellElement.css("background-color", "white");
                            };
                        },
                        paging: { enabled: true, pageSize: 10 },
                        scrolling: { mode: 'virtual' },
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            listProdutosSelecionadosHabilitar = selectedItems.selectedRowKeys;
                            gridBoxProdutosNaoHabilitadosTabelaPreco.option("value", listProdutosSelecionadosHabilitar.map((obj) => obj.Cd_Produto))

                        },
                        stateStoring: AutoLoad("gridBoxProdutosNaoHabilitadosTabelaPreco", false),
                        onToolbarPreparing: AutoResetState([]),
                    });
                    dataGrid = $dataGrid.dxDataGrid('instance');

                    return $dataGrid;
                },
            }).dxDropDownBox('instance');

            loadPanelTabelaPrecosProdutos.hide();

        }
        else {
            loadPanelTabelaPrecosProdutos.hide();

            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });


}

function carregarProdutosECommerceManutencaoTabelaPreco() {

    if (tabelaPrecoProdutosECommerceCarregados == false) {

        $('#gridTabelasProdutosECommerceAbaPrecos').slideUp();

        loadPanelTabelaPrecosProdutos = $('#loadPanelTabelaPrecosProdutos').dxLoadPanel({
            shadingColor: 'rgba(0,0,0,0.4)',
            message: 'Carregando Produtos e-Commerce',
            //position: { of: '#ModalIncluirEditarTabelaPrecos' },
            visible: false,
            showIndicator: true,
            showPane: true,
            shading: true,
            hideOnOutsideClick: false,
        }).dxLoadPanel('instance');

        loadPanelTabelaPrecosProdutos2 = $('#loadPanelTabelaPrecosProdutos2').dxLoadPanel({
            shadingColor: 'rgba(0,0,0,0.4)',
            message: 'Carregando Produtos e-Commerce',
            //position: { of: '#ModalIncluirEditarTabelaPrecos' },
            visible: false,
            showIndicator: true,
            showPane: true,
            shading: true,
            hideOnOutsideClick: false,
        }).dxLoadPanel('instance');

        loadPanelTabelaPrecosProdutos.show();
        loadPanelTabelaPrecosProdutos2.show();

        //Produtos de uma Determinada Tabelas de Preços
        GetAzureDataSource(82, '{ CD_TABELA_PRECO: ' + tabelaPreco + ', CD_STATUS_PRODUTO: "A", LG_ECOMMERCE: true }', 180).then((result) => {

            if (result.success) {

                console.log('CARREGADO O PRIMEIRO DATASOURCE');

                gridTabelasProdutosECommerceAbaPrecos = $("#gridTabelasProdutosECommerceAbaPrecos").dxDataGrid({
                    dataSource: result.data,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    showColumnLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    editing: {
                        mode: 'batch',
                        allowUpdating: false,
                        startEditAction: 'click',
                        allowAdding: false,
                        allowDeleting: false,
                        useIcons: false,
                    },
                    keyboardNavigation: {
                        enterKeyAction: 'moveFocus',
                        enterKeyDirection: 'column',
                        editOnKeyPress: true,
                    },
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
                        mode: 'multiple',
                        allowSelectAll: true,
                        showCheckBoxesMode: 'always',
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
                    paging: { pageSize: 10 },
                    pager: {
                        visible: true,
                        allowedPageSizes: [10, 20, 50],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: true,
                        allowExportSelectedData: false
                    },
                    onExporting: function (e) {
                        var workbook = new ExcelJS.Workbook();
                        var worksheet = workbook.addWorksheet('Produtos');

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet: worksheet,
                            autoFilterEnabled: true
                        }).then(function () {
                            workbook.xlsx.writeBuffer().then(function (buffer) {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProdutosECommerceTabelaPreço_' + tabela + '.xlsx');
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
                    keyExpr: 'CD_PRODUTO',
                    columns: [
                        {
                            type: "selection",
                            dataField: "CD_SELECAO",
                            width: 30,
                            value: false,
                            allowHiding: false,
                        },
                        {
                            dataField: "CD_PRODUTO",
                            caption: "Código",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: true,
                            allowHiding: false,
                        },
                        {
                            dataField: "DS_PRODUTO",
                            caption: "Produto",
                            //width: 200,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'left',
                            cssClass: "column-data-grid",
                            allowHiding: false,
                            visible: true,
                            //groupIndex: 0,
                        },
                        {
                            dataField: "CD_PRODUTO_ECOMMERCE",
                            caption: "Código e-Commerce",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "DS_STATUS",
                            caption: "Status",
                            width: 75,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_FORA_LINHA",
                            caption: "Fora Linha",
                            width: 70,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "VL_PRECO_MINIMO_VENDA",
                            caption: "Preço Padrão",
                            width: 80,
                            dataType: 'number',
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "PC_DIFERENCA_PRECO_PADRAO",
                            caption: "Desc(-) Acresc(+)",
                            width: 120,
                            dataType: 'number',
                            format: "###,###,###,##0.###############'%'",
                            allowEditing: true,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "PC_LUCRO_TABELA",
                            caption: "% Lucro Tabela",
                            width: 120,
                            dataType: 'number',
                            format: "###,###,###,##0.###############'%'",
                            allowEditing: true,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "PC_RENTABILIDADE_TABELA",
                            caption: "% Rentabilidade da Tabela",
                            width: 130,
                            dataType: 'number',
                            format: "###,###,###,##0.###############'%'",
                            allowEditing: true,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "VL_PRECO_TABELA",
                            caption: "Preço desta Tabela",
                            width: 80,
                            dataType: 'number',
                            format: "###,###,###,##0.00",
                            allowEditing: true,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: true,
                            allowHiding: false,
                        },
                        {
                            dataField: "DS_MARCA",
                            caption: "Marca",
                            //width: 200,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "DS_FAMILIA",
                            caption: "Família",
                            //width: 200,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_CURVA_ABC",
                            caption: "Curva",
                            width: 60,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_FABRICANTE",
                            caption: "Cód. Fabricante",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_ORIGINAL",
                            caption: "Cód. Original",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_OPCIONAL",
                            caption: "Cód. Opcional",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_EAN_PRODUTO",
                            caption: "Código Barras",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_NCM",
                            caption: "NCM",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_INTERNO_PRODUTO_FORNECEDOR",
                            caption: "Cód. Interno Fornec",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "CD_FORNECEDOR",
                            caption: "Fornecedor",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "DS_RAZAO_SOCIAL_FORNECEDOR",
                            caption: "Razão Social Fornecedor",
                            //width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'left',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "DS_FANTASIA_FORNECEDOR",
                            caption: "Fantasia Fornecedor",
                            //width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'left',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "VL_CUSTO_SEM_IMPOSTOS",
                            caption: "Custo Sem Impostos",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.00###",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "VL_CUSTO_TOTAL",
                            caption: "Custo Com Impostos",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.00###",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "PC_IPI",
                            caption: "% IPI Custo",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.#####'%'",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "PC_SUBSTITUICAO",
                            caption: "% ST Custo",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.#####'%'",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "PC_FRETE_COMPRA",
                            caption: "% Frete Compra",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.#####'%'",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "VL_FRETE_COMPRA",
                            caption: "Frete Compra",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.00###",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "PC_LUCRO",
                            caption: "% Lucro Produto",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.#####'%'",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "PC_RENTABILIDADE",
                            caption: "% Rentab. Produto",
                            width: 90,
                            dataType: 'number',
                            format: "###,###,###,##0.#####'%'",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                    ],

                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {

                            if (e.column.dataField === "DS_STATUS") {
                                if (e.value === "Inativo") {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }
                            if (e.column.dataField === "PC_RENTABILIDADE_TABELA") {
                                if (e.value < 0) {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }
                            if (e.column.dataField === "VL_PRECO_TABELA") {
                                e.cellElement.css("font-weight", "bold");
                            }
                            if (e.column.dataField === "LG_FORA_LINHA") {
                                e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                                e.cellElement.css("color", "white");
                            }
                        };
                        if (e.rowType === "group") {
                            e.cellElement.css("color", "#f05b41");
                            e.cellElement.css("background-color", "white");
                        };
                    },

                    toolbar: {
                        items: [
                            {
                                location: 'after',
                                widget: 'dxButton',
                                locateInMenu: 'auto',
                                options: {
                                    icon: 'trash',
                                    text: 'Excluir Produtos',
                                    hint: 'Excluir produtos e-commerce selecionados da tabela de preços',
                                    type: 'danger',
                                    visible: btnHabilitarExclusaoProdutoTabelaAplicacao,
                                    onClick() {
                                    },
                                },
                            },
                            {
                                name: "groupPanel",
                                locateInMenu: "auto",
                            },
                            'saveButton',
                            'revertButton',
                            'exportButton',
                            'columnChooserButton',
                            'searchPanel',
                        ],
                    },

                    stateStoring: AutoLoad("gridTabelasProdutosECommerceAbaPrecos", false),
                    onToolbarPreparing: AutoResetState([]),

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

                $('#gridTabelasProdutosECommerceAbaPrecos').slideDown();
                loadPanelTabelaPrecosProdutos2.hide();
            }
            else {
                loadPanelTabelaPrecosProdutos2.hide();

                DevExpress.ui.notify({
                    message: `${result.name}: ${result.error}`,
                    type: 'error',
                    displayTime: 5000,
                });
                console.error(`${result.name}: ${result.error}`);
            }
        });

        GetAzureDataSource(83, '{ CD_TABELA_PRECO: ' + tabelaPreco + ', CD_STATUS_PRODUTO: "A", LG_ECOMMERCE: true }', 180).then((result) => {

            if (result.success) {
                console.log('CARREGADO O SEGUNDO DATASOURCE');

                $('#panelTabelaPrecosProdutosECommerceAbaPreco').slideDown();

                gridBoxProdutosECommerceNaoHabilitadosTabelaPreco = $('#gridBoxProdutosECommerceNaoHabilitadosTabelaPreco').dxDropDownBox({
                    valueExpr: 'CD_PRODUTO',
                    displayExpr: 'CD_PRODUTO',
                    labelMode: 'floating',
                    label: '',
                    placeholder: '+ Clique para adicionar produtos',
                    elementAttr: {
                        class: 'gridbox-font',
                    },
                    showClearButton: true,
                    dataSource: new DevExpress.data.CustomStore({
                        loadMode: "raw",
                        key: ['CD_PRODUTO'],
                        load: function () {
                            return result.data;
                        }
                    }),
                    dropDownOptions: {
                        //closeOnOutsideClick: true,
                        animation: {
                            show: {
                                type: "slide",
                                from: { opacity: 0, top: 100 },
                                to: {
                                    opacity: 1,
                                }
                            },
                            hide: {
                                type: "slide",
                                from: { opacity: 1, top: 100 },
                                to: {
                                    opacity: 0,
                                }
                            }
                        },
                        //onShowing: async function (e) {
                        //    e.component._$wrapper.css('z-index', 998);
                        //    await this.fnPromise;
                        //    e.component.repaint();
                        //},
                        onShowing: async (e) => {
                            e.component._$wrapper.css('z-index', 1102);
                            await this.fnPromise;
                            /*e.component.repaint();*/
                        },
                        //onOptionChanged: function (e) {
                        //    if (e.name != 'visible') return;
                        //    if (!e.value) return;
                        //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardMovimentacao')[0].getBoundingClientRect().top;
                        //    this.fnPromise = $('#cardMovimentacao').animate({ top: diffTop }, {
                        //        complete: () => e.component.refreshPosition(),
                        //    }).promise();
                        //},
                        onOptionChanged: function (e) {
                            if (e.name != "visible") return;
                            if (!e.value) return;
                            $("#formCadastroTabelaPreco").hide();
                            this.fnPromise = $('#panelTabelaPrecosDadosAbaPreco').animate({ top: 0 }, {
                                complete: () => {
                                    e.component.refreshPosition();
                                    //gridBoxProdutosNaoHabilitadosTabelaPreco.refresh();
                                },
                            }).promise();
                        },
                        onHiding: function (e) {
                            $("#formCadastroTabelaPreco").show();
                        },

                    },
                    contentTemplate(e) {
                        const value = e.component.option('value');
                        const $dataGrid = $('<div>').dxDataGrid({
                            dataSource: e.component.getDataSource(),
                            searchExpr: ['CD_PRODUTO'],
                            displayExpr: 'CD_PRODUTO',
                            valueExpr: 'CD_PRODUTO',
                            wordWrapEnabled: true,
                            showRowLines: true,
                            rowAlternationEnabled: true,
                            searchPanel: {
                                visible: true,
                                highlightCaseSensitive: false,
                                highlightSearchText: true,
                                placeholder: "Procurar...",
                            },
                            editing: {
                                mode: 'batch',
                                allowUpdating: false,
                                startEditAction: 'click',
                                allowAdding: false,
                                allowDeleting: false,
                                useIcons: false,
                            },
                            loadPanel: { enabled: true, },
                            sorting: { mode: "multiple" },
                            allowColumnResizing: true,
                            columnResizingMode: "widget",
                            allowColumnReordering: true,
                            groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                            selection: {
                                mode: 'multiple',
                                showCheckBoxesMode: 'always',
                            },
                            keyboardNavigation: {
                                enterKeyAction: 'moveFocus',
                                enterKeyDirection: 'column',
                                editOnKeyPress: true,
                            },
                            focusedRowEnabled: false,
                            hoverStateEnabled: true,
                            paging: { pageSize: 25 },
                            filterRow: { visible: true, applyFilter: "auto" },
                            headerFilter: {
                                visible: true,
                                allowSearch: true
                            },
                            filterPanel: { visible: true },
                            columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                            columnsAutoWidth: true,
                            cellHintEnabled: true,
                            keyExpr: ['CD_PRODUTO'],
                            columns: [
                                {
                                    type: "selection",
                                    dataField: "CD_SELECAO",
                                    width: 30,
                                    value: false,
                                    allowHiding: false,
                                },
                                {
                                    dataField: "CD_PRODUTO",
                                    caption: "Código",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                    allowHiding: false,
                                },
                                {
                                    dataField: "DS_PRODUTO",
                                    caption: "Produto",
                                    //width: 200,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'left',
                                    cssClass: "column-data-grid",
                                    allowHiding: false,
                                    visible: true,
                                    //groupIndex: 0,
                                },
                                {
                                    dataField: "CD_PRODUTO_ECOMMERCE",
                                    caption: "Código e-Commerce",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "DS_STATUS",
                                    caption: "Status",
                                    width: 75,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_FORA_LINHA",
                                    caption: "Fora Linha",
                                    width: 70,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "VL_PRECO_MINIMO_VENDA",
                                    caption: "Preço Padrão",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "PC_DIFERENCA_PRECO_PADRAO",
                                    caption: "Desc(-) Acresc(+)",
                                    width: 120,
                                    dataType: 'number',
                                    format: "###,###,###,##0.###############'%'",
                                    allowEditing: true,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "PC_LUCRO_TABELA",
                                    caption: "% Lucro Tabela",
                                    width: 120,
                                    dataType: 'number',
                                    format: "###,###,###,##0.###############'%'",
                                    allowEditing: true,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "PC_RENTABILIDADE_TABELA",
                                    caption: "% Rentabilidade da Tabela",
                                    width: 120,
                                    dataType: 'number',
                                    format: "###,###,###,##0.###############'%'",
                                    allowEditing: true,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "VL_PRECO_TABELA",
                                    caption: "Preço desta Tabela",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00",
                                    allowEditing: true,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: true,
                                    allowHiding: false,
                                },
                                {
                                    dataField: "DS_MARCA",
                                    caption: "Marca",
                                    //width: 200,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "DS_FAMILIA",
                                    caption: "Família",
                                    //width: 200,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_CURVA_ABC",
                                    caption: "Curva",
                                    width: 60,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_FABRICANTE",
                                    caption: "Cód. Fabricante",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_ORIGINAL",
                                    caption: "Cód. Original",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_OPCIONAL",
                                    caption: "Cód. Opcional",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_EAN_PRODUTO",
                                    caption: "Código Barras",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_NCM",
                                    caption: "NCM",
                                    width: 80,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_INTERNO_PRODUTO_FORNECEDOR",
                                    caption: "Cód. Interno Fornec",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "CD_FORNECEDOR",
                                    caption: "Fornecedor",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "DS_RAZAO_SOCIAL_FORNECEDOR",
                                    caption: "Razão Social Fornecedor",
                                    //width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'left',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "DS_FANTASIA_FORNECEDOR",
                                    caption: "Fantasia Fornecedor",
                                    //width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'left',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "VL_CUSTO_SEM_IMPOSTOS",
                                    caption: "Custo Sem Impostos",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00###",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "VL_CUSTO_TOTAL",
                                    caption: "Custo Com Impostos",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00###",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "PC_IPI",
                                    caption: "% IPI Custo",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.#####'%'",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "PC_SUBSTITUICAO",
                                    caption: "% ST Custo",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.#####'%'",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "PC_FRETE_COMPRA",
                                    caption: "% Frete Compra",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.#####'%'",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "VL_FRETE_COMPRA",
                                    caption: "Frete Compra",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00###",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "PC_LUCRO",
                                    caption: "% Lucro Produto",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.#####'%'",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "PC_RENTABILIDADE",
                                    caption: "% Rentab. Produto",
                                    width: 90,
                                    dataType: 'number',
                                    format: "###,###,###,##0.#####'%'",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                            ],
                            toolbar: {
                                items: [
                                    {
                                        location: 'after',
                                        widget: 'dxButton',
                                        options: {
                                            type: 'success',
                                            text: 'Adicionar Produtos',
                                            hint: "Adicionar produtos selecionados",
                                            width: 150,
                                            icon: 'plus',
                                            onClick(e) {

                                            },

                                        },
                                    },
                                    'groupPanel',
                                    'columnChooserButton',
                                    'searchPanel',
                                ],
                            },
                            showBorders: true,
                            onShowing: async (e) => {
                                e.component._$wrapper.css('z-index', 1101);
                                await this.fnPromise;
                                /*e.component.repaint();*/
                            },
                            onCellPrepared: function (e) {
                                if (e.rowType === "data") {
                                    if (e.column.dataField === "DS_STATUS") {
                                        if (e.value === "Inativo") {
                                            e.cellElement.css("color", "#d00000");
                                            e.cellElement.css("font-weight", "bold");
                                        };
                                    }
                                    if (e.column.dataField === "PC_RENTABILIDADE_TABELA") {
                                        if (e.value < 0) {
                                            e.cellElement.css("color", "#d00000");
                                            e.cellElement.css("font-weight", "bold");
                                        };
                                    }
                                    if (e.column.dataField === "VL_PRECO_TABELA") {
                                        e.cellElement.css("font-weight", "bold");
                                    }
                                    if (e.column.dataField === "LG_FORA_LINHA") {
                                        e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                                        e.cellElement.css("color", "white");
                                    }
                                };
                                if (e.rowType === "group") {
                                    e.cellElement.css("color", "#f05b41");
                                    e.cellElement.css("background-color", "white");
                                };
                            },
                            paging: { enabled: true, pageSize: 10 },
                            scrolling: { mode: 'virtual' },
                            height: '100%',
                            onSelectionChanged(selectedItems) {
                                listProdutosECommerceSelecionadosHabilitar = selectedItems.selectedRowKeys;
                                gridBoxProdutosECommerceNaoHabilitadosTabelaPreco.option("value", listProdutosECommerceSelecionadosHabilitar.map((obj) => obj.Cd_Produto))

                            },
                            stateStoring: AutoLoad("gridBoxProdutosECommerceNaoHabilitadosTabelaPreco", false),
                            onToolbarPreparing: AutoResetState([]),
                        });
                        dataGrid = $dataGrid.dxDataGrid('instance');

                        return $dataGrid;
                    },
                }).dxDropDownBox('instance');

                loadPanelTabelaPrecosProdutos.hide();
                tabelaPrecoProdutosECommerceCarregados = true;

            }
            else {
                loadPanelTabelaPrecosProdutos.hide();

                DevExpress.ui.notify({
                    message: `${result.name}: ${result.error}`,
                    type: 'error',
                    displayTime: 5000,
                });
                console.error(`${result.name}: ${result.error}`);
            }
        });

    }

}

function carregarClientesManutencaoTabelaPreco() {

    if (tabelaPrecoClientesCarregados == false) {

        $('#gridTabelasClientesAbaPrecos').slideUp();

        loadPanelTabelaPrecosClientes = $('#loadPanelTabelaPrecosClientes').dxLoadPanel({
            shadingColor: 'rgba(0,0,0,0.4)',
            message: 'Carregando Clientes',
            //position: { of: '#ModalIncluirEditarTabelaPrecos' },
            visible: false,
            showIndicator: true,
            showPane: true,
            shading: true,
            hideOnOutsideClick: false,
        }).dxLoadPanel('instance');

        loadPanelTabelaPrecosClientes2 = $('#loadPanelTabelaPrecosClientes2').dxLoadPanel({
            shadingColor: 'rgba(0,0,0,0.4)',
            message: 'Carregando Clientes',
            //position: { of: '#ModalIncluirEditarTabelaPrecos' },
            visible: false,
            showIndicator: true,
            showPane: true,
            shading: true,
            hideOnOutsideClick: false,
        }).dxLoadPanel('instance');

        loadPanelTabelaPrecosClientes.show();
        loadPanelTabelaPrecosClientes2.show();

        //Produtos de uma Determinada Tabelas de Preços
        GetAzureDataSource(84, '{ CD_TABELA_PRECO: ' + tabelaPreco + ', CD_STATUS_CLIENTE: "A" }', 180).then((result) => {

            if (result.success) {

                gridTabelasClientesAbaPrecos = $("#gridTabelasClientesAbaPrecos").dxDataGrid({
                    dataSource: result.data,
                    hoverStateEnabled: true,
                    showBorders: true,
                    showRowLines: true,
                    showColumnLines: true,
                    rowAlternationEnabled: true,
                    wordWrapEnabled: true,
                    columnHidingEnabled: true,
                    editing: {
                        mode: 'batch',
                        allowUpdating: false,
                        startEditAction: 'click',
                        allowAdding: false,
                        allowDeleting: false,
                        useIcons: false,
                    },
                    keyboardNavigation: {
                        enterKeyAction: 'moveFocus',
                        enterKeyDirection: 'column',
                        editOnKeyPress: true,
                    },
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
                        mode: 'multiple',
                        allowSelectAll: true,
                        showCheckBoxesMode: 'always',
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
                    paging: { pageSize: 10 },
                    pager: {
                        visible: true,
                        allowedPageSizes: [10, 20, 50],
                        showPageSizeSelector: true,
                        showNavigationButtons: true
                    },
                    export: {
                        enabled: true,
                        allowExportSelectedData: false
                    },
                    onExporting: function (e) {
                        var workbook = new ExcelJS.Workbook();
                        var worksheet = workbook.addWorksheet('Clientes');

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet: worksheet,
                            autoFilterEnabled: true
                        }).then(function () {
                            workbook.xlsx.writeBuffer().then(function (buffer) {
                                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ClientesTabelaPreço_' + tabela + '.xlsx');
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
                    keyExpr: 'CD_CPF_CNPJ',
                    columns: [
                        {
                            type: "selection",
                            dataField: "CD_SELECAO",
                            width: 30,
                            value: false,
                            allowHiding: false,
                        },
                        {
                            dataField: "CD_CPF_CNPJ",
                            caption: "CPF/CNPJ",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: true,
                            allowHiding: false,
                        },
                        {
                            dataField: "DS_FANTASIA",
                            caption: "Cliente - Nome Fantasia",
                            //width: 200,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'left',
                            cssClass: "column-data-grid",
                            visible: true,
                            //groupIndex: 0,
                        },
                        {
                            dataField: "DS_CATEGORIA_CLIENTE",
                            caption: "Categoria",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "DS_CLIENTE_ATUACAO",
                            caption: "Atuação",
                            width: 110,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "DS_FORMA_PAGAMENTO",
                            caption: "Forma Pagamento",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "DT_VENCTO_TITULO_ABERTO",
                            caption: "Vencto. Título Aberto",
                            width: 90,
                            dataType: "date",
                            format: "dd/MM/yyyy",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "VL_TITULO_ABERTO",
                            caption: "Valor Título Aberto",
                            width: 80,
                            dataType: 'number',
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: true,
                        },
                        {
                            dataField: "DS_RAZAO_SOCIAL",
                            caption: "Cliente - Razão Social",
                            //width: 200,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'left',
                            cssClass: "column-data-grid",
                            visible: false,
                            //groupIndex: 0,
                        },
                        {
                            dataField: "CD_FILIAL_CADASTRO",
                            caption: "Filial Cadastro",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "DS_STATUS",
                            caption: "Status",
                            width: 75,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "DS_TIPO_CPF_CNPJ",
                            caption: "Tipo Pessoa",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "DT_CADASTRO",
                            caption: "Dt. Cadastro",
                            width: 90,
                            dataType: "date",
                            format: "dd/MM/yyyy",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "DT_ATUALIZACAO",
                            caption: "Dt. Atualização",
                            width: 90,
                            dataType: "date",
                            format: "dd/MM/yyyy",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_POSSUI_TITULO_ABERTO",
                            caption: "Título Aberto",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "NR_LANCAMENTO_TITULO_ABERTO",
                            caption: "Número Título Aberto",
                            width: 80,
                            dataType: 'number',
                            format: "###########",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "NR_PARCELA_TITULO_ABERTO",
                            caption: "Parcela Título Aberto",
                            width: 80,
                            dataType: 'number',
                            format: "###########",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_CONTROLA_LIMITE_CREDITO",
                            caption: "Controla Limite",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "VL_LIMITE_CREDITO",
                            caption: "Limite Crédito",
                            width: 80,
                            dataType: 'number',
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "VL_LIMITE_DISPONIVEL",
                            caption: "Saldo Limite",
                            width: 80,
                            dataType: 'number',
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE",
                            caption: "Saldo Conta Corrente",
                            width: 80,
                            dataType: 'number',
                            format: "###,###,###,##0.00",
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'right',
                            allowHeaderFiltering: false,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_CAPTACAO_ECOMMERCE",
                            caption: "Captado e-Commerce",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_ORGAO_PUBLICO",
                            caption: "Orgão Público",
                            width: 90,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE",
                            caption: "Fidelidade Cliente",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR",
                            caption: "Fidelidade Indicador",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE",
                            caption: "Fidelidade Bloqueado Cliente",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                        {
                            dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR",
                            caption: "Fidelidade Bloqueado Indicador",
                            width: 100,
                            allowEditing: false,
                            allowSorting: true,
                            alignment: 'center',
                            allowHeaderFiltering: true,
                            allowHiding: true,
                            cssClass: "column-data-grid",
                            visible: false,
                        },
                    ],

                    onCellPrepared: function (e) {
                        if (e.rowType === "data") {

                            if (e.column.allowEditing) {
                                e.cellElement.css("background-color", "#EDF3F8");
                            }

                            if (e.column.dataField === "DS_STATUS") {
                                if (e.value === "Inativo") {
                                    e.cellElement.css("color", "#d00000");
                                    e.cellElement.css("font-weight", "bold");
                                };
                            }

                            if (e.column.dataField === "VL_TITULO_ABERTO") {
                                if (e.value > 0) {
                                    e.cellElement.css("color", "#b23a48");
                                    e.cellElement.css("background-color", "#fae0e4");
                                };
                            }
                        };
                        if (e.rowType === "group") {
                            e.cellElement.css("color", "#f05b41");
                            e.cellElement.css("background-color", "white");
                        };
                    },

                    toolbar: {
                        items: [
                            {
                                location: 'after',
                                widget: 'dxButton',
                                locateInMenu: 'auto',
                                options: {
                                    icon: 'trash',
                                    text: 'Excluir Clientes',
                                    hint: 'Excluir clientes selecionados da tabela de preços',
                                    type: 'danger',
                                    visible: true,
                                    onClick() {

                                    },
                                },
                            },
                            {
                                name: "groupPanel",
                                locateInMenu: "auto",
                            },
                            'saveButton',
                            'revertButton',
                            'exportButton',
                            'columnChooserButton',
                            'searchPanel',
                        ],
                    },

                    stateStoring: AutoLoad("gridTabelasClientesAbaPrecos", false),
                    onToolbarPreparing: AutoResetState([]),

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

                $('#gridTabelasClientesAbaPrecos').slideDown();
                loadPanelTabelaPrecosClientes2.hide();
            }
            else {
                loadPanelTabelaPrecosClientes2.hide();

                DevExpress.ui.notify({
                    message: `${result.name}: ${result.error}`,
                    type: 'error',
                    displayTime: 5000,
                });
                console.error(`${result.name}: ${result.error}`);
            }
        });

        GetAzureDataSource(85, '{ CD_TABELA_PRECO: ' + tabelaPreco + ', CD_STATUS_CLIENTE: "A" }', 180).then((result) => {

            if (result.success) {

                $('#panelTabelaPrecosClientesAbaPreco').slideDown();

                gridBoxClientesNaoHabilitadosTabelaPreco = $('#gridBoxClientesNaoHabilitadosTabelaPreco').dxDropDownBox({
                    valueExpr: 'CD_CPF_CNPJ',
                    displayExpr: 'CD_CPF_CNPJ',
                    labelMode: 'floating',
                    label: '',
                    placeholder: '+ Clique para adicionar clientes na tabela',
                    elementAttr: {
                        class: 'gridbox-font',
                    },
                    showClearButton: true,
                    dataSource: new DevExpress.data.CustomStore({
                        loadMode: "raw",
                        key: ['CD_CPF_CNPJ'],
                        load: function () {
                            return result.data;
                        }
                    }),
                    dropDownOptions: {
                        //closeOnOutsideClick: true,
                        animation: {
                            show: {
                                type: "slide",
                                from: { opacity: 0, top: 100 },
                                to: {
                                    opacity: 1,
                                }
                            },
                            hide: {
                                type: "slide",
                                from: { opacity: 1, top: 100 },
                                to: {
                                    opacity: 0,
                                }
                            }
                        },
                        //onShowing: async function (e) {
                        //    e.component._$wrapper.css('z-index', 998);
                        //    await this.fnPromise;
                        //    e.component.repaint();
                        //},
                        onShowing: async (e) => {
                            e.component._$wrapper.css('z-index', 1102);
                            await this.fnPromise;
                            /*e.component.repaint();*/
                        },
                        //onOptionChanged: function (e) {
                        //    if (e.name != 'visible') return;
                        //    if (!e.value) return;
                        //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardMovimentacao')[0].getBoundingClientRect().top;
                        //    this.fnPromise = $('#cardMovimentacao').animate({ top: diffTop }, {
                        //        complete: () => e.component.refreshPosition(),
                        //    }).promise();
                        //},
                        onOptionChanged: function (e) {
                            if (e.name != "visible") return;
                            if (!e.value) return;
                            $("#formCadastroTabelaPreco").hide();
                            this.fnPromise = $('#panelTabelaPrecosDadosAbaPreco').animate({ top: 0 }, {
                                complete: () => {
                                    e.component.refreshPosition();
                                    //gridBoxClientesNaoHabilitadosTabelaPreco.refresh();
                                },
                            }).promise();
                        },
                        onHiding: function (e) {
                            $("#formCadastroTabelaPreco").show();
                        },

                    },
                    contentTemplate(e) {
                        const value = e.component.option('value');
                        const $dataGrid = $('<div>').dxDataGrid({
                            dataSource: e.component.getDataSource(),
                            searchExpr: ['CD_CPF_CNPJ'],
                            displayExpr: 'CD_CPF_CNPJ',
                            valueExpr: 'CD_CPF_CNPJ',
                            wordWrapEnabled: true,
                            showRowLines: true,
                            rowAlternationEnabled: true,
                            searchPanel: {
                                visible: true,
                                highlightCaseSensitive: false,
                                highlightSearchText: true,
                                placeholder: "Procurar...",
                            },
                            editing: {
                                mode: 'batch',
                                allowUpdating: false,
                                startEditAction: 'click',
                                allowAdding: false,
                                allowDeleting: false,
                                useIcons: false,
                            },
                            loadPanel: { enabled: true, },
                            sorting: { mode: "multiple" },
                            allowColumnResizing: true,
                            columnResizingMode: "widget",
                            allowColumnReordering: true,
                            groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                            selection: {
                                mode: 'multiple',
                                showCheckBoxesMode: 'always',
                            },
                            keyboardNavigation: {
                                enterKeyAction: 'moveFocus',
                                enterKeyDirection: 'column',
                                editOnKeyPress: true,
                            },
                            focusedRowEnabled: false,
                            hoverStateEnabled: true,
                            paging: { pageSize: 25 },
                            filterRow: { visible: true, applyFilter: "auto" },
                            headerFilter: {
                                visible: true,
                                allowSearch: true
                            },
                            filterPanel: { visible: true },
                            columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                            columnsAutoWidth: true,
                            cellHintEnabled: true,
                            keyExpr: ['CD_CPF_CNPJ'],
                            columns: [
                                {
                                    type: "selection",
                                    dataField: "CD_SELECAO",
                                    width: 30,
                                    value: false,
                                    allowHiding: false,
                                },
                                {
                                    dataField: "CD_CPF_CNPJ",
                                    caption: "CPF/CNPJ",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                    allowHiding: false,
                                },
                                {
                                    dataField: "DS_FANTASIA",
                                    caption: "Cliente - Nome Fantasia",
                                    //width: 200,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'left',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                    //groupIndex: 0,
                                },
                                {
                                    dataField: "DS_CATEGORIA_CLIENTE",
                                    caption: "Categoria",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "DS_CLIENTE_ATUACAO",
                                    caption: "Atuação",
                                    width: 110,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "DS_FORMA_PAGAMENTO",
                                    caption: "Forma Pagamento",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "DT_VENCTO_TITULO_ABERTO",
                                    caption: "Vencto. Título Aberto",
                                    width: 90,
                                    dataType: "date",
                                    format: "dd/MM/yyyy",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "VL_TITULO_ABERTO",
                                    caption: "Valor Título Aberto",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: true,
                                },
                                {
                                    dataField: "DS_RAZAO_SOCIAL",
                                    caption: "Cliente - Razão Social",
                                    //width: 200,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'left',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                    //groupIndex: 0,
                                },
                                {
                                    dataField: "CD_FILIAL_CADASTRO",
                                    caption: "Filial Cadastro",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    allowFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "DS_STATUS",
                                    caption: "Status",
                                    width: 75,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "DS_TIPO_CPF_CNPJ",
                                    caption: "Tipo Pessoa",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "DT_CADASTRO",
                                    caption: "Dt. Cadastro",
                                    width: 90,
                                    dataType: "date",
                                    format: "dd/MM/yyyy",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "DT_ATUALIZACAO",
                                    caption: "Dt. Atualização",
                                    width: 90,
                                    dataType: "date",
                                    format: "dd/MM/yyyy",
                                    allowEditing: false,
                                    allowSorting: true,
                                    allowHeaderFiltering: true,
                                    alignment: 'center',
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_POSSUI_TITULO_ABERTO",
                                    caption: "Título Aberto",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "NR_LANCAMENTO_TITULO_ABERTO",
                                    caption: "Número Título Aberto",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###########",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "NR_PARCELA_TITULO_ABERTO",
                                    caption: "Parcela Título Aberto",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###########",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_CONTROLA_LIMITE_CREDITO",
                                    caption: "Controla Limite",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "VL_LIMITE_CREDITO",
                                    caption: "Limite Crédito",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "VL_LIMITE_DISPONIVEL",
                                    caption: "Saldo Limite",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "VL_SALDO_ATUAL_CONTA_CORRENTE",
                                    caption: "Saldo Conta Corrente",
                                    width: 80,
                                    dataType: 'number',
                                    format: "###,###,###,##0.00",
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'right',
                                    allowHeaderFiltering: false,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_CAPTACAO_ECOMMERCE",
                                    caption: "Captado e-Commerce",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_ORGAO_PUBLICO",
                                    caption: "Orgão Público",
                                    width: 90,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_CLIENTE",
                                    caption: "Fidelidade Cliente",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_PROGRAMA_FIDELIDADE_PARTICIPANTE_INDICADOR",
                                    caption: "Fidelidade Indicador",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_CLIENTE",
                                    caption: "Fidelidade Bloqueado Cliente",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                                {
                                    dataField: "LG_PROGRAMA_FIDELIDADE_BLOQUEADO_INDICADOR",
                                    caption: "Fidelidade Bloqueado Indicador",
                                    width: 100,
                                    allowEditing: false,
                                    allowSorting: true,
                                    alignment: 'center',
                                    allowHeaderFiltering: true,
                                    allowHiding: true,
                                    cssClass: "column-data-grid",
                                    visible: false,
                                },
                            ],
                            toolbar: {
                                items: [
                                    {
                                        location: 'after',
                                        widget: 'dxButton',
                                        options: {
                                            type: 'success',
                                            text: 'Adicionar Clientes',
                                            hint: "Adicionar clientes selecionados",
                                            width: 150,
                                            icon: 'plus',
                                            onClick(e) {

                                            },

                                        },
                                    },
                                    'groupPanel',
                                    'columnChooserButton',
                                    'searchPanel',
                                ],
                            },
                            showBorders: true,
                            onShowing: async (e) => {
                                e.component._$wrapper.css('z-index', 1101);
                                await this.fnPromise;
                                /*e.component.repaint();*/
                            },
                            onCellPrepared: function (e) {
                                if (e.rowType === "data") {

                                    if (e.column.allowEditing) {
                                        e.cellElement.css("background-color", "#EDF3F8");
                                    }

                                    if (e.column.dataField === "DS_STATUS") {
                                        if (e.value === "Inativo") {
                                            e.cellElement.css("color", "#d00000");
                                            e.cellElement.css("font-weight", "bold");
                                        };
                                    }

                                    if (e.column.dataField === "VL_TITULO_ABERTO") {
                                        if (e.value > 0) {
                                            e.cellElement.css("color", "#b23a48");
                                            e.cellElement.css("background-color", "#fae0e4");
                                        };
                                    }
                                };

                                if (e.rowType === "group") {
                                    e.cellElement.css("color", "#f05b41");
                                    e.cellElement.css("background-color", "white");
                                };
                            },
                            paging: { enabled: true, pageSize: 10 },
                            scrolling: { mode: 'virtual' },
                            height: '100%',
                            onSelectionChanged(selectedItems) {
                                listClientesSelecionadosHabilitar = selectedItems.selectedRowKeys;
                                gridBoxClientesNaoHabilitadosTabelaPreco.option("value", listClientesSelecionadosHabilitar.map((obj) => obj.Cd_Produto))

                            },
                            stateStoring: AutoLoad("gridBoxClientesNaoHabilitadosTabelaPreco", false),
                            onToolbarPreparing: AutoResetState([]),
                        });
                        dataGrid = $dataGrid.dxDataGrid('instance');

                        return $dataGrid;
                    },
                }).dxDropDownBox('instance');

                loadPanelTabelaPrecosClientes.hide();
                tabelaPrecoClientesCarregados = true;

            }
            else {
                loadPanelTabelaPrecosClientes.hide();

                DevExpress.ui.notify({
                    message: `${result.name}: ${result.error}`,
                    type: 'error',
                    displayTime: 5000,
                });
                console.error(`${result.name}: ${result.error}`);
            }
        });
    }
}

function carregaHistoricoPreco() {
    var deferred = new $.Deferred;

    GetAzureDataSource(79, `{CD_PRODUTO: "${objClassProduto.CD_PRODUTO}"}`).then((result) => {
        if (result.success) {
            vGridHistoricoPrecos.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar o histórico de preços", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaTabelaPreco() {
    var deferred = new $.Deferred;

    GetAzureDataSource(80, `{CD_PRODUTO: "${objClassProduto.CD_PRODUTO}"}`).then((result) => {
        if (result.success) {
            vGridTabelasPrecos.option("dataSource", result.data);

            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar as tabelas de preços", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function carregaGridTabelasConsultaAbaPrecos() {
    var deferred = new $.Deferred;

    GetAzureDataSource(80, `{CD_PRODUTO: "${objClassProduto.CD_PRODUTO}"}`).then((result) => {
        if (result.success) {
            vGridTabelasConsultaAbaPrecos.option("dataSource", result.data);
            vLkpTabelasPrecosConsultaGeral.option("dataSource", result.data);
            deferred.resolve();
        }
        else {
            exibeMensagem("error", "Ocorreu um erro ao carregar as tabelas de preços", `${result.name}: ${result.error}`);
            deferred.reject()
        }
    });

    return deferred.promise();
}

function getTemplateTabela(data) {
    let tabelaNome = data.DS_TABELA_PRECO;
    let tabelaTipo = data.DS_TIPO_TABELA;
    let tabelaAplicacao = data.DS_APLICACAO_PRODUTOS;
    let tabelaStatus = data.DS_STATUS;

    if (data.CD_STATUS == 'A') {
        tabelaStatus = '';
    } else {
        tabelaStatus = '<h5 class="mt-0 mb-0"><b style="color: darkred">' + data.DS_STATUS + '</b></h5>';
    }

    if (data.DS_TIPO_TABELA == 'P') {
        return `<div class="row mt-0 mb-0" style="color: #6c757d; border-bottom: 1px dotted lightGray;"><div class="col-lg-12 mt-0 mb-2"><h5 class="mt-0 mb-0"><b>${tabelaNome}</b></h4><h5 class="mt-0 mb-0">${tabelaTipo}</h5>${tabelaStatus}</div></div>`;
    } else {
        return `<div class="row mt-0 mb-0" style="color: #6c757d; border-bottom: 1px dotted lightGray;"><div class="col-lg-12 mt-0 mb-2"><h5 class="mt-0 mb-0"><b>${tabelaNome}</b></h4><h5 class="mt-0 mb-0">${tabelaTipo}</h5><h5 class="mt-0 mb-0">${tabelaAplicacao}</h5>${tabelaStatus}</div></div>`;
    }
}

//******************************************
// DIVERSOS
//******************************************
function suppressOnChange(pSuppress, pCaller) {
    if (pSuppress == true) {
        if (!callerSuppressOnChange) {
            callerSuppressOnChange = pCaller;
        }
        vSuppressOnChange = true;
    } else {
        if (callerSuppressOnChange == pCaller) {
            vSuppressOnChange = false;
            callerSuppressOnChange = null;
        }
    }
}

function showProcessPanel(pMessage, pCaller) {
    if (!callerShowProcessPanel) {
        processPanel = $("#processPanel").dxLoadPanel({
            shadingColor: "rgba(0,0,0,0.4)",
            message: pMessage,
            visible: false,
            showIndicator: true,
            showPane: true,
            shading: true,
            hideOnOutsideClick: false,
        }).dxLoadPanel("instance");

        processPanel.show();

        callerShowProcessPanel = pCaller;
    }
}

function hideProcessPanel(pCaller) {
    if (callerShowProcessPanel == pCaller) {
        processPanel.hide();
        callerShowProcessPanel = null;
    }
}

function AbrirModal(idModal) {
    $("#" + idModal).modal("toggle");
}

function FecharModal(idModal) {
    $("#" + idModal).modal("toggle");
}

function rolar_para(elemento) {
    $('html, body').animate({ scrollTop: $(elemento).offset().top }, 1300);
    //window.scrollTo(0, document.body.scrollHeight);
}

function ajustaLayoutGrids() {
    vGridConsultaProdutos.updateDimensions();
};

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

function recolherRadarPrecos(recolher) {

    if (recolher) {
        ExibirEsconderPaineis('cardRadarPrecosFechado', 'block');
        $('#cardRadarPrecos').slideUp();
    } else {
        $('#cardRadarPrecos').slideDown();
        ExibirEsconderPaineis('cardRadarPrecosFechado', 'none');
        //DISPARA O EVENTO RESIZE PARA EXIBIR OS GRÁFICOS DO APEX CHARTS. EXISTE UM PROBLEMA NO APEX CHARTS QUE NÃO 
        //EXIBE OS GRÁFICOS ATÉ QUE A TELA SEJA REDIMENSIONADA.
        window.dispatchEvent(new Event('resize'));
    }

}

function pesquisarFotoGoogle() {
    $('#produtoComImagem').slideDown();
    $('#produtoSemImagem').slideUp();

    $('#botoesConfirmacaoGoogle').slideDown();
    $('#linkPesquisarFotoGoogle').slideUp();
}

function descartarFotoGoogle() {
    $('#produtoComImagem').slideUp();
    $('#produtoSemImagem').slideDown();

    $('#botoesConfirmacaoGoogle').slideUp();
    $('#linkPesquisarFotoGoogle').slideDown();
}

function pesquisaAvancadaFotoGoogle() {
    $('#produtoComImagem').slideUp();
    $('#produtoSemImagem').slideDown();

    $('#botoesConfirmacaoGoogle').slideUp();
    $('#linkPesquisarFotoGoogle').slideDown();
}

function confirmaFotoGoogle() {
    $('#botoesConfirmacaoGoogle').slideUp();
    $('#linkPesquisarFotoGoogle').slideDown();
}

function upLoadFoto() {
    $('#produtoComImagem').slideDown();
    $('#produtoSemImagem').slideUp();
}

function apagarFoto() {
    $('#produtoSemImagem').slideDown();
    $('#produtoComImagem').slideUp();
}

function exibirSugestaoCursoInclusao() {
    $('#panelSugestaoCursoFechadoInclusao').slideUp();
    $('#panelSugestaoCursoInclusao').slideDown();
}

function fecharSugestaoCursoInclusao() {
    $('#panelSugestaoCursoInclusao').slideUp();
    $('#panelSugestaoCursoFechadoInclusao').slideDown();

    if (objClassUsuario.LG_EXIBE_BANNER_CURSO_PRECIFICACAO == true) {
        objClassUsuario.LG_EXIBE_BANNER_CURSO_PRECIFICACAO = false;
        salvarPermissoesUsuarioLogado();
    }
}

function exibirSugestaoCurso() {
    $('#panelSugestaoCursoFechado').slideUp();
    $('#panelSugestaoCurso').slideDown();
}

function fecharSugestaoCurso() {
    $('#panelSugestaoCurso').slideUp();
    $('#panelSugestaoCursoFechado').slideDown();

    if (objClassUsuario.LG_EXIBE_BANNER_CURSO_PRECIFICACAO == true) {
        objClassUsuario.LG_EXIBE_BANNER_CURSO_PRECIFICACAO = false;
        salvarPermissoesUsuarioLogado();
    }
}

function fecharPainelDadosFiscais() {
    $('#panelDadosFiscais').slideUp();
}

function exibirPainelDadosFiscais() {
    $('#panelDadosFiscais').slideDown();
}

function exibirPainelRegrasComerciais() {
    $('#panelRegrasComerciais').slideDown();
}

function fecharPainelRegrasComerciais() {
    $('#panelRegrasComerciais').slideUp();
}

async function exibirPainelTabelasPrecos() {
    ExibirEsconderPaineis('panelOfertas', 'none');
    ExibirEsconderPaineis('panelHistoricoPrecos', 'none');
    ExibirEsconderPaineis('panelMenuPrecificacao', 'none');
    ExibirEsconderPaineis('panelOpcoesPrecificacao', 'none');

    $('#panelTabelasPrecos').slideDown();

    showProcessPanel("Carregando...", arguments.callee.name);
    await Promise.all([
        carregaTabelaPreco(),
        carregaGridTabelasConsultaAbaPrecos()
    ]);
    hideProcessPanel(arguments.callee.name);
}

function fecharPainelTabelasPrecos() {
    ExibirEsconderPaineis('panelTabelasPrecos', 'none');
    ExibirEsconderPaineis('panelOfertas', 'none');
    ExibirEsconderPaineis('panelHistoricoPrecos', 'none');
    ExibirEsconderPaineis('panelMenuPrecificacao', 'block');
    ExibirEsconderPaineis('panelOpcoesPrecificacao', 'block');
}

function exibirPainelOfertas() {
    ExibirEsconderPaineis('panelTabelasPrecos', 'none');
    ExibirEsconderPaineis('panelHistoricoPrecos', 'none');
    ExibirEsconderPaineis('panelMenuPrecificacao', 'none');
    ExibirEsconderPaineis('panelOpcoesPrecificacao', 'none');

    $('#panelOfertas').slideDown();
}

function fecharPainelOfertas() {
    ExibirEsconderPaineis('panelHistoricoPrecos', 'none');
    ExibirEsconderPaineis('panelOfertas', 'none');
    ExibirEsconderPaineis('panelTabelasPrecos', 'none');
    ExibirEsconderPaineis('panelMenuPrecificacao', 'block');
    ExibirEsconderPaineis('panelOpcoesPrecificacao', 'block');
}

async function exibirPainelHistoricoPrecos() {
    ExibirEsconderPaineis('panelTabelasPrecos', 'none');
    ExibirEsconderPaineis('panelOfertas', 'none');
    ExibirEsconderPaineis('panelMenuPrecificacao', 'none');
    ExibirEsconderPaineis('panelOpcoesPrecificacao', 'none');

    $('#panelHistoricoPrecos').slideDown();

    showProcessPanel("Carregando...", arguments.callee.name);
    await carregaHistoricoPreco();
    hideProcessPanel(arguments.callee.name);
}

function fecharPainelHistoricoPrecos() {
    ExibirEsconderPaineis('panelHistoricoPrecos', 'none');
    ExibirEsconderPaineis('panelOfertas', 'none');
    ExibirEsconderPaineis('panelTabelasPrecos', 'none');
    ExibirEsconderPaineis('panelMenuPrecificacao', 'block');
    ExibirEsconderPaineis('panelOpcoesPrecificacao', 'block');
}

function FormatButtons() {
    let buttonsPrincipal = $("#panelBotoesFiliaisPreco button");
    buttonsPrincipal.removeClass('btn-gray').addClass('btn-default');
    buttonsPrincipal.on("click", a => {
        buttonsPrincipal.removeClass('btn-gray').addClass('btn-default');
        $(a.currentTarget).removeClass('btn-default').addClass('btn-gray');
    });
}

function exibeMensagem(pTipo, pTitulo, pTexto) {

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

function round(pNumber, pDecimals) {
    return parseFloat(Math.round(pNumber * Math.pow(10, pDecimals)) / Math.pow(10, pDecimals).toFixed(pDecimals));
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
    return new Intl.DateTimeFormat("pt-BR");
};

Date.prototype.ddMMyyyyHHmm = function () {
    const options = { hour: "numeric", minute: "numeric", hour12: false, timeZone: 'America/Sao_Paulo', day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("pt-BR", options).format(this).replace(",", "");
};

function isNull(pObj, pObjRetorno) {
    return pObj == null ? pObjRetorno : pObj;
}

function avancaProximaEtapa(cardInibir, cardExibir) {
    animateCSS(cardInibir, 'fadeOutLeft', 'out').then(() => {
        animateCSS(cardExibir, 'fadeInRight');
    });

    rolarTopo();
}

function retornaEtapaAnterior(cardInibir, cardExibir) {
    animateCSS(cardInibir, 'fadeOutRight', 'out').then(() => {
        animateCSS(cardExibir, 'fadeInLeft');
    });

    rolarTopo();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

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
    exibirEsconderPaineis("cardMenu", "none");
    exibirEsconderPaineis("cardCadastroProdutos", "none");
    exibirEsconderPaineis("cardConsultaProdutos", "none");
    exibirEsconderPaineis("cardConfiguracoesGerais", "none");
    exibirEsconderPaineis("cardPermissoesAvancadas", "none");

    rolarTopo();
};

function iniciaModuloGestaoProduto() {
    desabilitaTodosPanels();

    exibirEsconderPaineis("cardCabecalho", "block");
    exibirEsconderPaineis("cardMenu", "block");
};

function rolarTopo() {
    window.scrollTo(0, 0);
};

function carregaPermissoesUsuarioLogado() {
    var deferred = new $.Deferred;

    //BUSCA OS PARAMETROS
    $.ajax({
        type: "POST",
        url: "/Estoque/CarregaPermissoesUsuarioGestaoProduto",
        data: { pUsuario: null },
        success: function (response) {
            if (response.result == "error") {
                exibeMensagem("error", "Ocorreu um erro ao buscar os parâmetros do usuário", response.msg);
                deferred.reject(response.msg);
            }
            else {
                objClassUsuario.CD_EMPRESA = response.CD_EMPRESA;
                objClassUsuario.CD_LOGIN = response.CD_LOGIN;
                objClassUsuario.NR_NIVEL_ACESSO = response.NR_NIVEL_ACESSO;
                objClassUsuario.DS_NOME = response.DS_NOME;
                objClassUsuario.LG_PERMITE_CADASTRO_PRODUTO = response.LG_PERMITE_CADASTRO_PRODUTO;
                objClassUsuario.LG_PERMITE_MANUTENCAO_MANUAL = response.LG_PERMITE_MANUTENCAO_MANUAL;
                objClassUsuario.LG_PERMITE_MANUTENCAO_VIA_PLANILHA = response.LG_PERMITE_MANUTENCAO_VIA_PLANILHA;
                objClassUsuario.LG_POSSUI_ACESSO_MODULO = response.LG_POSSUI_ACESSO_MODULO;
                objClassUsuario.LG_EXIBE_BANNER_CURSO_PRECIFICACAO = response.LG_EXIBE_BANNER_CURSO_PRECIFICACAO;
                deferred.resolve();
            }
        },
    }).then(null, function () {
        exibeMensagem("error", "Ocorreu um erro ao buscar os parâmetros do usuário", JSON.parse(response.responseText));
        deferred.reject();
    });

    return deferred.promise();
}

async function salvarPermissoesUsuarioLogado() {
    if (vLoading == true) return;

    var vParametrosPermissoes = JSON.stringify({
        CD_LOGIN: objClassUsuario.CD_LOGIN,
        LG_PERMITE_CADASTRO_PRODUTO: objClassUsuario.LG_PERMITE_CADASTRO_PRODUTO,
        LG_PERMITE_MANUTENCAO_MANUAL: objClassUsuario.LG_PERMITE_MANUTENCAO_MANUAL,
        LG_PERMITE_MANUTENCAO_VIA_PLANILHA: objClassUsuario.LG_PERMITE_MANUTENCAO_VIA_PLANILHA,
        LG_EXIBE_BANNER_CURSO_PRECIFICACAO: objClassUsuario.LG_EXIBE_BANNER_CURSO_PRECIFICACAO,
    });

    showProcessPanel("Salvando...", arguments.callee.name);

    await $.ajax({
        type: 'POST',
        url: "/Estoque/SalvarPermissoesUsuarioGestaoProduto",
        data: { pPermissoes: vParametrosPermissoes },
        success: function (responseData) {
            if (responseData.result == "error") {
                exibeMensagem("error", "Erro ao salvar as configurações para o usuário logado", responseData.msg);
            } else {
                exibeMensagem("success", "Operação realizada!", "Configuração alterada com sucesso");
            }
        }
    }).then(null, function () {
        exibeMensagem("error", "Erro ao salvar as configurações para o usuário logado", "");
    });

    hideProcessPanel(arguments.callee.name);
}

async function cadastroProdutos() {
    if (objClassUsuario.NR_NIVEL_ACESSO == 1 || objClassUsuario.LG_PERMITE_CADASTRO_PRODUTO == true) {
        desabilitaTodosPanels();

        exibirEsconderPaineis("cardCabecalho", "block");
        exibirEsconderPaineis("cardCadastroProdutos", "block");

        if (vCamposDadosGeraisCriados == false) {
            showProcessPanel("Carregando...", arguments.callee.name);
            await criaCamposDadosGerais();
            CarregaConsultaProdutos();
            CadastrarNovoProduto();
            hideProcessPanel(arguments.callee.name);
        }
    } else {
        popupAcessoNegado.show();
    }
}

function manutencaoManual() {
    if (objClassUsuario.NR_NIVEL_ACESSO == 1 || objClassUsuario.LG_PERMITE_MANUTENCAO_MANUAL == true) {
        desabilitaTodosPanels();

        window.open("/Estoque/GestaoProduto", "_parent");
    } else {
        popupAcessoNegado.show();
    }
}

function manutencaoViaPlanilha() {
    if (objClassUsuario.NR_NIVEL_ACESSO == 1 || objClassUsuario.LG_PERMITE_MANUTENCAO_VIA_PLANILHA == true) {
        desabilitaTodosPanels();

        window.open("/ManutencaoProduto/ManutencaoProduto", "_parent");
    } else {
        popupAcessoNegado.show();
    }
}

function configuracoesGerais() {
    if (objClassUsuario.NR_NIVEL_ACESSO == 1) {
        desabilitaTodosPanels();

        exibirEsconderPaineis("cardCabecalho", "block");
        exibirEsconderPaineis("cardMenu", "block");
        exibirEsconderPaineis("cardConfiguracoesGerais", "block");

        if (vCamposConfiguracoesCriados == false) {
            criaCamposConfiguracoes();
            carregaParametrosCorporativos();
        }
    } else {
        popupAcessoNegado.show();
    }
}

function permissoesAvancadas() {
    if (objClassUsuario.NR_NIVEL_ACESSO == 1) {
        desabilitaTodosPanels();

        exibirEsconderPaineis("cardCabecalho", "block");
        exibirEsconderPaineis("cardMenu", "block");
        exibirEsconderPaineis("cardPermissoesAvancadas", "block");

        if (vCamposPermissoesCriados == false) {
            criaCamposPermissoes();
            carregaUsuarios();
        }
    } else {
        popupAcessoNegado.show();
    }
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

    exibeMensagem("error", pMensagemOperacao, vMsgErroHTTP);
}

function carregaUsuarios() {
    showProcessPanel("Carregando...", arguments.callee.name);

    GetAzureDataSource(34).then((result) => {
        if (result.success) {
            hideProcessPanel(arguments.callee.name);

            oLkpUsuarioConfiguracoes.option("dataSource", result.data);
        }
        else {
            hideProcessPanel(arguments.callee.name);

            exibeMensagem("error", "Erro ao carregar os usuários", result.error);
        }
    });
}

function criaCamposConfiguracoes() {
    //CAMPOS DE CONFIGURAÇÕES GERAIS - CORPORATIVOS
    oNbxQtdeDecimaisVenda = $('#nbx_Qtde_Decimais_Venda').dxNumberBox({
        value: '',
        format: '0',
        min: 0,
        max: 5,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        labelMode: 'floating',
        label: 'Qtde. Casas Decimais Venda',
        onValueChanged: function (e) {
            salvarParametrosCorporativos();
        },
    }).dxNumberBox("instance");

    oNbxQtdeDecimaisCompra = $('#nbx_Qtde_Decimais_Compra').dxNumberBox({
        value: '',
        format: '0',
        min: 0,
        max: 5,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        labelMode: 'floating',
        label: 'Qtde. Casas Decimais Compra',
        onValueChanged: function (e) {
            salvarParametrosCorporativos();
        },
    }).dxNumberBox("instance");

    oTxtFormulaMediaVenda = $('#txt_Formula_Media_Venda').dxTextBox({
        labelMode: 'floating',
        label: 'Fórmula Média Venda',
        maxLength: 1000,
        onValueChanged: function (e) {
            salvarParametrosCorporativos();
        },
    }).dxTextBox('instance');

    oChkAutoNumProduto = $('#chk_Auto_Num_Produto').dxCheckBox({
        value: false,
        text: "Utiliza numeração automática de produtos",
        onValueChanged: function (e) {
            salvarParametrosCorporativos();
        },
    }).dxCheckBox('instance');

    oChkAlteraPrecoCusto = $('#chk_Altera_Preco_Custo').dxCheckBox({
        value: false,
        text: "Altera preço de custo na entrada mercadoria",
        onValueChanged: function (e) {
            if (e.value == true) {
                oChkAlteraPrecoVenda.option("disabled", false);

                if (oChkAlteraPrecoVenda.option("value") == true) {
                    oChkAlteraVendaQuandoMaior.option("disabled", false);
                    oChkUtilizaLucroReferencia.option("disabled", false);
                    oChkVisualizaPrecoEntrada.option("disabled", false);
                } else {
                    oChkAlteraVendaQuandoMaior.option("disabled", true);
                    oChkAlteraVendaQuandoMaior.option("value", false);

                    oChkUtilizaLucroReferencia.option("disabled", true);
                    oChkUtilizaLucroReferencia.option("value", false);

                    oChkVisualizaPrecoEntrada.option("disabled", true);
                    oChkVisualizaPrecoEntrada.option("value", false);
                }
            } else {
                oChkAlteraPrecoVenda.option("disabled", true);
                oChkAlteraPrecoVenda.option("value", false);

                oChkAlteraVendaQuandoMaior.option("disabled", true);
                oChkAlteraVendaQuandoMaior.option("value", false);

                oChkUtilizaLucroReferencia.option("disabled", true);
                oChkUtilizaLucroReferencia.option("value", false);

                oChkVisualizaPrecoEntrada.option("disabled", true);
                oChkVisualizaPrecoEntrada.option("value", false);
            }

            salvarParametrosCorporativos();
        },
    }).dxCheckBox('instance');

    oChkAlteraPrecoVenda = $('#chk_Altera_Preco_Venda').dxCheckBox({
        value: false,
        disabled: true,
        text: "Altera preço de venda na entrada mercadoria",
        onValueChanged: function (e) {
            if (e.value == true) {
                oChkAlteraVendaQuandoMaior.option("disabled", false);
                oChkUtilizaLucroReferencia.option("disabled", false);
                oChkVisualizaPrecoEntrada.option("disabled", false);
            } else {
                oChkAlteraVendaQuandoMaior.option("disabled", true);
                oChkAlteraVendaQuandoMaior.option("value", false);

                oChkUtilizaLucroReferencia.option("disabled", true);
                oChkUtilizaLucroReferencia.option("value", false);

                oChkVisualizaPrecoEntrada.option("disabled", true);
                oChkVisualizaPrecoEntrada.option("value", false);
            }

            salvarParametrosCorporativos();
        },
    }).dxCheckBox('instance');

    oChkAlteraVendaQuandoMaior = $('#chk_Altera_Venda_Quando_Maior').dxCheckBox({
        value: false,
        disabled: true,
        text: "Altera preço de venda somente quando maior que o atual",
        onValueChanged: function (e) {
            salvarParametrosCorporativos();
        },
    }).dxCheckBox('instance');

    oChkUtilizaLucroReferencia = $('#chk_Utiliza_Lucro_Referencia').dxCheckBox({
        value: false,
        disabled: true,
        text: "Utiliza lucro de referência",
        onValueChanged: function (e) {
            salvarParametrosCorporativos();
        },
    }).dxCheckBox('instance');

    oChkVisualizaPrecoEntrada = $('#chk_Visualiza_Preco_Entrada').dxCheckBox({
        value: false,
        disabled: true,
        text: "Visualiza preço produto a produto na entrada de mercadorias",
        onValueChanged: function (e) {
            salvarParametrosCorporativos();
        },
    }).dxCheckBox('instance');

    oChkControlaVencimentoLote = $('#chk_Controla_Vencimento_Lote').dxCheckBox({
        value: false,
        text: "Controla vencimentos de lotes de produtos",
        onValueChanged: function (e) {
            salvarParametrosCorporativos();
        },
    }).dxCheckBox('instance');

    oChkInibiProdutoIncluidoCaixaViaSeparacao = $('#chk_Inibi_Produto_Incluido_Caixa_Via_Separacao').dxCheckBox({
        value: false,
        text: "Não imprimir na via de separação de mercadorias os produtos incluidos em auto-atendimento",
        onValueChanged: function (e) {
            salvarParametrosCorporativos();
        },
    }).dxCheckBox('instance');

    oChkInibiProdutoIncluidoCaixaModuloConferencia = $('#chk_Inibi_Produto_Incluido_Caixa_Modulo_Conferencia').dxCheckBox({
        value: false,
        text: "Não validar no módulo de conferência os produtos incluidos em auto-atendimento",
        onValueChanged: function (e) {
            salvarParametrosCorporativos();
        },
    }).dxCheckBox('instance');

    //CAMPOS DE CONFIGURAÇÕES GERAIS - POR FILIAL
    oLkpFiliaisParametros = $('#lkp_Filiais_Parametros').dxLookup({
        onValueChanged: function (e) {
            if (e.component.option('selectedItem') !== null) {
                exibirEsconderPaineis('cardParametrosFilial', 'block');

                carregaParametrosFilial();
            } else {
                exibirEsconderPaineis('cardParametrosFilial', 'none');
            }
        }
    }).dxLookup('instance');

    oNbxDiaLimiteManutencaoPreco = $('#nbx_Dia_Limite_Manutencao_Preco').dxNumberBox({
        value: '',
        format: '00 dias',
        min: 1,
        max: 99,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        labelMode: 'floating',
        label: 'Limite para manutenção de preços de meses anteriores',
        onValueChanged: function (e) {
            salvarParametrosFilial();
        },
    }).dxNumberBox("instance");

    oChkPermiteAlterarFoto = $('#chk_Permite_Alterar_Foto').dxCheckBox({
        value: false,
        text: "Permite alterar foto cadastrada",
        onValueChanged: function (e) {
            if (e.value == true) {
                oChkSomenteGerenteAlteraFoto.option("disabled", false);
                oChkSomenteGerenteExcluiFoto.option("disabled", false);
            } else {
                oChkSomenteGerenteAlteraFoto.option("disabled", true);
                oChkSomenteGerenteAlteraFoto.option("value", false);

                oChkSomenteGerenteExcluiFoto.option("disabled", true);
                oChkSomenteGerenteExcluiFoto.option("value", false);
            }

            salvarParametrosFilial();
        },
    }).dxCheckBox('instance');

    oChkSomenteGerenteAlteraFoto = $('#chk_Somente_Gerente_Altera_Foto').dxCheckBox({
        value: false,
        disabled: true,
        text: "Somente gerente altera foto",
        onValueChanged: function (e) {
            salvarParametrosFilial();
        },
    }).dxCheckBox('instance');

    oChkSomenteGerenteExcluiFoto = $('#chk_Somente_Gerente_Exclui_Foto').dxCheckBox({
        value: false,
        disabled: true,
        text: "Somente gerente exclui foto",
        onValueChanged: function (e) {
            salvarParametrosFilial();
        },
    }).dxCheckBox('instance');

    oChkExibeFotoProdutoPedido = $('#chk_Exibe_Foto_Produto_Pedido').dxCheckBox({
        value: false,
        text: "Exibe foto do produto no pedido de venda",
        onValueChanged: function (e) {
            salvarParametrosFilial();
        },
    }).dxCheckBox('instance');

    oTxtCaminhoFotoArquivo = $('#txt_Caminho_Foto_Arquivo').dxTextBox({
        labelMode: 'floating',
        label: 'Caminho Arquivo',
        maxLength: 250,
        onValueChanged: function (e) {
            salvarParametrosFilial();
        },
    }).dxTextBox('instance');

    oTxtFiltroFoto = $('#txt_Filtro_Foto').dxTextBox({
        labelMode: 'floating',
        label: 'Filtro',
        maxLength: 500,
        onValueChanged: function (e) {
            salvarParametrosFilial();
        },
    }).dxTextBox('instance');

    Load_Azr_Lookup_Filial2(COMPONENTES, "lkp_Filiais_Parametros", 1, 0, null, "Filial");

    vCamposConfiguracoesCriados = true;
}

function criaCamposPermissoes() {
    oLkpUsuarioConfiguracoes = $("#lkpUsuarioConfiguracoes").dxLookup({
        dataSource: [],
        searchExpr: ["DS_PESQUISA"],
        displayExpr: "DS_PESQUISA",
        valueExpr: "CD_LOGIN",
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: "Usuário",
        },
        placeholder: "Clique para selecionar um usuário",
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
                carregaPermissoesUsuarioSelecionado(null, "/img/fotos-usuarios/sem-foto-pesquisa.jpg");
            } else {
                carregaPermissoesUsuarioSelecionado(data.selectedItem.CD_LOGIN, data.selectedItem.DS_URL_FOTO);
            }
        }
    }).dxLookup("instance");

    oChkCadastroProduto = $('#chk_Cadastro_Produto').dxCheckBox({
        value: false,
        text: "Permitir que o usuário inclua, altere e consulte produtos",
        onValueChanged: function (e) {
            salvarPermissoesUsuario();
        },
    }).dxCheckBox('instance');

    oChkManutencaoManual = $('#chk_Manutencao_Manual').dxCheckBox({
        value: false,
        text: "Permitir que o usuário efetue manutenção em massa no cadastro de produtos de forma manual",
        onValueChanged: function (e) {
            salvarPermissoesUsuario();
        },
    }).dxCheckBox('instance');

    oChkManutencaoViaPlanilha = $('#chk_Manutencao_Via_Planilha').dxCheckBox({
        value: false,
        text: "Permitir que o usuário efetue manutenção em massa no cadastro de produtos via carga de planilha",
        onValueChanged: function (e) {
            salvarPermissoesUsuario();
        },
    }).dxCheckBox('instance');

    vCamposPermissoesCriados = true;
}

function openConsultaProdutosPanel() {
    const pageWidth = document.documentElement.scrollWidth;

    if (pageWidth > 1600) {
        $("#cardPrincipal").removeClass("col-lg-12").addClass("col-lg-9");
        $("#cardConsultaProdutos").removeClass("col-lg-12").addClass("col-lg-3");
        $("#cardConsultaProdutos").removeClass("panelConsultaProdutosLateral").addClass("panelConsultaProdutosLateral");

        document.getElementById("divBtnExpandirFecharConsulta").style.display = "block";
        document.getElementById("divBtnFecharConsulta").style.display = "none";

        document.getElementById("cardConsultaProdutos").style.display = "block";

        ajustaLayoutGrids();
    }
    else {
        expandirConsultaProdutosPanel();
    }

}

function expandirConsultaProdutosPanel() {
    $("#cardConsultaProdutos").removeClass("col-lg-3").addClass("col-lg-12");
    $("#cardConsultaProdutos").removeClass("panelConsultaProdutosLateral");

    document.getElementById("cardPrincipal").style.display = "none";

    document.getElementById("divBtnExpandirFecharConsulta").style.display = "none";
    document.getElementById("divBtnFecharConsulta").style.display = "block";

    document.getElementById("cardConsultaProdutos").style.display = "block";

    ajustaLayoutGrids();
}

function closeConsultaProdutosPanel() {
    $("#cardPrincipal").removeClass("col-lg-9").addClass("col-lg-12");

    document.getElementById("cardConsultaProdutos").style.display = "none";
    document.getElementById("cardPrincipal").style.display = "flex";

    ajustaLayoutGrids();
}

async function carregaPermissoesUsuarioSelecionado(pLogin, pCaminhoURLFoto) {
    let vFotoAtual = pCaminhoURLFoto + '?' + new Date().getTime();

    var oImg = document.querySelector("#fotoUsuarioConfiguracoes");
    oImg.setAttribute("src", vFotoAtual);
    oImg.setAttribute("onerror", "this.onerror=null;this.src='/img/fotos-usuarios/sem-foto-pesquisa.jpg' + '?' + new Date().getTime();");

    vLoading = true;

    showProcessPanel("Carregando...", arguments.callee.name);

    await $.ajax({
        type: 'POST',
        url: "/Estoque/CarregaPermissoesUsuarioGestaoProduto",
        data: { pUsuario: pLogin },
        success: function (responseData) {
            if (responseData.result == "error") {
                exibeMensagem("error", "Erro ao executar a consulta das permissões do usuário", responseData.msg);
            } else {
                if (responseData.NR_NIVEL_ACESSO == 1) {
                    exibirEsconderPaineis('accParametrosUsuario', 'none');
                    exibirEsconderPaineis('mensagemUsuarioAdministrador', 'block');
                    exibirEsconderPaineis('mensagemUsuarioSemAcessoModuloAjuste', 'none');

                } else if (responseData.LG_POSSUI_ACESSO_MODULO == false) {
                    exibirEsconderPaineis('accParametrosUsuario', 'none');
                    exibirEsconderPaineis('mensagemUsuarioAdministrador', 'none');
                    exibirEsconderPaineis('mensagemUsuarioSemAcessoModuloAjuste', 'block');
                } else {
                    exibirEsconderPaineis('accParametrosUsuario', 'block');
                    exibirEsconderPaineis('mensagemUsuarioAdministrador', 'none');
                    exibirEsconderPaineis('mensagemUsuarioSemAcessoModuloAjuste', 'none');

                    oChkCadastroProduto.option('value', responseData.LG_PERMITE_CADASTRO_PRODUTO);
                    oChkManutencaoManual.option('value', responseData.LG_PERMITE_MANUTENCAO_MANUAL);
                    oChkManutencaoViaPlanilha.option('value', responseData.LG_PERMITE_MANUTENCAO_VIA_PLANILHA);
                }
            }
        }
    }).then(null, function () {
        exibeMensagem("error", "Erro ao executar a consulta das permissões do usuário", "");
    });

    hideProcessPanel(arguments.callee.name);

    vLoading = false;
}

async function salvarPermissoesUsuario() {
    if (vLoading == true) return;

    var vParametrosPermissoes = JSON.stringify({
        CD_LOGIN: oLkpUsuarioConfiguracoes.option('value'),
        LG_PERMITE_CADASTRO_PRODUTO: oChkCadastroProduto.option('value'),
        LG_PERMITE_MANUTENCAO_MANUAL: oChkManutencaoManual.option('value'),
        LG_PERMITE_MANUTENCAO_VIA_PLANILHA: oChkManutencaoViaPlanilha.option('value'),
        LG_EXIBE_BANNER_CURSO_PRECIFICACAO: oChkManutencaoViaPlanilha.option('value'),
    });

    showProcessPanel("Salvando...", arguments.callee.name);

    await $.ajax({
        type: 'POST',
        url: "/Estoque/SalvarPermissoesUsuarioGestaoProduto",
        data: { pPermissoes: vParametrosPermissoes },
        success: function (responseData) {
            if (responseData.result == "error") {
                exibeMensagem("error", "Erro ao salvar as configurações para o usuário selecionado", responseData.msg);
            } else {
                exibeMensagem("success", "Operação realizada!", "Permissão alterada com sucesso");
            }
        }
    }).then(null, function () {
        exibeMensagem("error", "Erro ao salvar as configurações para o usuário selecionado", "");
    });

    hideProcessPanel(arguments.callee.name);
}

async function carregaParametrosCorporativos() {
    vLoading = true;

    showProcessPanel("Carregando...", arguments.callee.name);

    await $.ajax({
        type: "POST",
        url: "/Estoque/CarregaParametrosCorporativosGestaoProduto",
        success: function (responseData) {
            if (responseData.result == "error") {
                exibeMensagem("error", "Erro ao executar a consulta dos parâmetros corporativos", responseData.msg);
            } else {
                oNbxQtdeDecimaisVenda.option("value", responseData[0].QT_DECIMAIS_VENDA);
                oNbxQtdeDecimaisCompra.option("value", responseData[0].QT_DECIMAIS_COMPRA);
                oTxtFormulaMediaVenda.option("value", responseData[0].DS_FORMULA_MEDIA_VENDA_DIARIA);
                oChkAutoNumProduto.option("value", responseData[0].LG_COD_PRODUTO_AUTOMATICO);
                oChkAlteraPrecoCusto.option("value", responseData[0].LG_ALTERA_PRECO_CUSTO_ENTRADA);
                oChkAlteraPrecoVenda.option("value", responseData[0].LG_ALTERA_PRECO_VENDA_ENTRADA);
                oChkAlteraVendaQuandoMaior.option("value", responseData[0].LG_ALTERA_PRECO_VENDA_QUANDO_MAIOR);
                oChkUtilizaLucroReferencia.option("value", responseData[0].LG_UTILIZA_LUCRO_REFERENCIA);
                oChkVisualizaPrecoEntrada.option("value", responseData[0].LG_VISUALIZA_PRECO_ENTRADA);
                oChkControlaVencimentoLote.option("value", responseData[0].LG_CONTROLA_VENCIMENTO_LOTE);
                oChkInibiProdutoIncluidoCaixaViaSeparacao.option("value", responseData[0].LG_INIBI_PRODUTO_INCLUIDO_CAIXA_VIA_SEPARACAO);
                oChkInibiProdutoIncluidoCaixaModuloConferencia.option("value", responseData[0].LG_INIBI_PRODUTO_INCLUIDO_CAIXA_MODULO_CONFERENCIA);
            }
        },
    }).then(null, function () {
        exibeMensagem("error", "Erro ao executar a consulta dos parâmetros corporativos", "");
    });

    hideProcessPanel(arguments.callee.name);

    vLoading = false;
}

async function carregaParametrosFilial() {
    vLoading = true;

    showProcessPanel("Carregando...", arguments.callee.name);

    await $.ajax({
        type: "POST",
        url: "/Estoque/CarregaParametrosFilialGestaoProduto",
        data: { pFilial: oLkpFiliaisParametros.option("value") },
        success: function (responseData) {
            if (responseData.result == "error") {
                exibeMensagem("error", "Erro ao executar a consulta dos parâmetros da filial selecionada", responseData.msg);
            } else {
                oNbxDiaLimiteManutencaoPreco.option("value", responseData[0].NR_DIA_LIMITE_MANUTENCAO_PRECO);
                oChkPermiteAlterarFoto.option("value", responseData[0].LG_PERMITE_ALTERAR_FOTO_PRODUTO);
                oChkSomenteGerenteAlteraFoto.option("value", responseData[0].LG_SOMENTE_GERENTE_ALTERA_FOTO_PRODUTO);
                oChkSomenteGerenteExcluiFoto.option("value", responseData[0].LG_SOMENTE_GERENTE_EXCLUI_FOTO_PRODUTO);
                oChkExibeFotoProdutoPedido.option("value", responseData[0].LG_EXIBE_FOTO_PRODUTO);
                oTxtCaminhoFotoArquivo.option("value", responseData[0].DS_CAMINHO_FOTO_PRODUTO);
                oTxtFiltroFoto.option("value", responseData[0].DS_FILTRO_FOTO_PRODUTO);
            }
        },
    }).then(null, function () {
        exibeMensagem("error", "Erro ao executar a consulta dos parâmetros da filial selecionada", "");
    });

    hideProcessPanel(arguments.callee.name);

    vLoading = false;
}

async function salvarParametrosCorporativos() {
    if (vLoading == true) return;

    var vParametrosCorporativos = JSON.stringify({
        QT_DECIMAIS_VENDA: oNbxQtdeDecimaisVenda.option("value"),
        QT_DECIMAIS_COMPRA: oNbxQtdeDecimaisCompra.option("value"),
        DS_FORMULA_MEDIA_VENDA_DIARIA: oTxtFormulaMediaVenda.option("value"),
        LG_COD_PRODUTO_AUTOMATICO: oChkAutoNumProduto.option("value"),
        LG_ALTERA_PRECO_CUSTO_ENTRADA: oChkAlteraPrecoCusto.option("value"),
        LG_ALTERA_PRECO_VENDA_ENTRADA: oChkAlteraPrecoVenda.option("value"),
        LG_ALTERA_PRECO_VENDA_QUANDO_MAIOR: oChkAlteraVendaQuandoMaior.option("value"),
        LG_UTILIZA_LUCRO_REFERENCIA: oChkUtilizaLucroReferencia.option("value"),
        LG_VISUALIZA_PRECO_ENTRADA: oChkVisualizaPrecoEntrada.option("value"),
        LG_CONTROLA_VENCIMENTO_LOTE: oChkControlaVencimentoLote.option("value"),
        LG_INIBI_PRODUTO_INCLUIDO_CAIXA_VIA_SEPARACAO: oChkInibiProdutoIncluidoCaixaViaSeparacao.option("value"),
        LG_INIBI_PRODUTO_INCLUIDO_CAIXA_MODULO_CONFERENCIA: oChkInibiProdutoIncluidoCaixaModuloConferencia.option("value"),
    });

    showProcessPanel("Salvando...", arguments.callee.name);

    await $.ajax({
        type: 'POST',
        url: "/Estoque/SalvarParametrosCorporativosGestaoProduto",
        data: { pParametros: vParametrosCorporativos },
        success: function (responseData) {
            if (responseData.result == "error") {
                exibeMensagem("error", "Erro ao salvar os parâmetros corporativos", responseData.msg);
            } else {
                exibeMensagem("success", "Operação realizada!", "Parâmetro alterado com sucesso");
            }
        },
    }).then(null, function () {
        exibeMensagem("error", "Erro ao salvar os parâmetros corporativos", "");
    });

    hideProcessPanel(arguments.callee.name);
}

async function salvarParametrosFilial() {
    if (vLoading == true) return;

    var vParametrosFilial = JSON.stringify({
        CD_FILIAL: oLkpFiliaisParametros.option("value"),
        NR_DIA_LIMITE_MANUTENCAO_PRECO: oNbxDiaLimiteManutencaoPreco.option("value"),
        LG_PERMITE_ALTERAR_FOTO_PRODUTO: oChkPermiteAlterarFoto.option("value"),
        LG_SOMENTE_GERENTE_ALTERA_FOTO_PRODUTO: oChkSomenteGerenteAlteraFoto.option("value"),
        LG_SOMENTE_GERENTE_EXCLUI_FOTO_PRODUTO: oChkSomenteGerenteExcluiFoto.option("value"),
        LG_EXIBE_FOTO_PRODUTO: oChkExibeFotoProdutoPedido.option("value"),
        DS_CAMINHO_FOTO_PRODUTO: oTxtCaminhoFotoArquivo.option("value"),
        DS_FILTRO_FOTO_PRODUTO: oTxtFiltroFoto.option("value"),
    });

    showProcessPanel("Salvando...", arguments.callee.name);

    await $.ajax({
        type: 'POST',
        url: "/Estoque/SalvarParametrosFilialGestaoProduto",
        data: { pParametros: vParametrosFilial },
        success: function (responseData) {
            if (responseData.result == "error") {
                exibeMensagem("error", "Erro ao salvar os parâmetros para a filial selecionada", responseData.msg);
            } else {
                exibeMensagem("success", "Operação realizada!", "Parâmetro alterado com sucesso");
            }
        },
    }).then(null, function () {
        exibeMensagem("error", "Erro ao salvar os parâmetros para a filial selecionada", "");
    });

    hideProcessPanel(arguments.callee.name);
}


//#endregion [ FUNÇÕES ]
