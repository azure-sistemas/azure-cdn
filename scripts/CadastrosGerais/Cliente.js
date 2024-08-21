//#region [ Variaveis ]

//////////////////////////////////////////////////////
// DATA SOURCES FIXOS
//////////////////////////////////////////////////////

var dataSourceAtuacao = [
    { CD_ATUACAO: 1, DS_ATUACAO: "Consumidor Final" },
    { CD_ATUACAO: 2, DS_ATUACAO: "Revendedor" },
    { CD_ATUACAO: 3, DS_ATUACAO: "Distribuidor" },
];

var dataSourceTiposEnderecos = [
    { CD_TIPO_ENDERECO: 2, DS_TIPO_ENDERECO: "Comercial" },
    { CD_TIPO_ENDERECO: 3, DS_TIPO_ENDERECO: "Cobrança" },
    { CD_TIPO_ENDERECO: 4, DS_TIPO_ENDERECO: "Entrega" },
];

var dataSourceFiltroConsultaDetalhada = [
    { CD_STATUS: 'A', DS_STATUS: "Ativos" },
    { CD_STATUS: 'I', DS_STATUS: "Inativos" },
    { CD_STATUS: null, DS_STATUS: "Todos" },
];

var dataSourceSituacaoNegativar = [
    { CD_SITUACAO: 1, DS_SITUACAO: "Em Elaboração" },
    { CD_SITUACAO: 2, DS_SITUACAO: "Negativado" },
    { CD_SITUACAO: 3, DS_SITUACAO: "Baixado" },
    { CD_SITUACAO: 4, DS_SITUACAO: "Inclusão Negada" },
    { CD_SITUACAO: 5, DS_SITUACAO: "Exclusão Negada" },

];

var dataSourceSexoNegativar = [
    { CD_SEXO: 'M', DS_SEXO: "Masculino" },
    { CD_SEXO: 'F', DS_SEXO: "Feminino" },

];

var dataSourceEnviaSms = [
    { LG_ENVIA_SMS: false, DS_ENVIA_SMS: "Não" },
    { LG_ENVIA_SMS: true, DS_ENVIA_SMS: "Sim" },

];

var dataSourceStatus = [
    { CD_STATUS: 'A', DS_STATUS: "Ativo" },
    { CD_STATUS: 'I', DS_STATUS: "Inativo" },
];

var dataSourceOperacaoReajuste = [
    { CD_OPERACAO: "A", DS_OPERACAO: "Aumentar em", },
    { CD_OPERACAO: "R", DS_OPERACAO: "Reduzir em", },
];

var dataSourceTipoDespacho = [
    { CD_ENTREGA: 1, DS_ENTREGA: "Retira Imediata", },
    { CD_ENTREGA: 2, DS_ENTREGA: "Entrega", },
    { CD_ENTREGA: 3, DS_ENTREGA: "Retira Futura", },
];

var dataSourceTiposMovimentoContaCorrente = [
    { CD_TIPO_MOVIMENTO: 1, DS_TIPO_MOVIMENTO: 'DEVOLUÇÃO DE MERCADORIA', visible: false, },
    { CD_TIPO_MOVIMENTO: 2, DS_TIPO_MOVIMENTO: 'PEDIDO DE VENDA', visible: false, },
    { CD_TIPO_MOVIMENTO: 3, DS_TIPO_MOVIMENTO: 'RESTITUIÇÃO', visible: false, },
    { CD_TIPO_MOVIMENTO: 4, DS_TIPO_MOVIMENTO: 'CANCELAMENTO DE DEVOLUÇÃO', visible: false, },
    { CD_TIPO_MOVIMENTO: 5, DS_TIPO_MOVIMENTO: 'CANCELAMENTO DE PAGAMENTO', visible: false, },
    { CD_TIPO_MOVIMENTO: 6, DS_TIPO_MOVIMENTO: 'LANÇAMENTO AVULSO (CRÉDITO)', visible: true, },
    { CD_TIPO_MOVIMENTO: 7, DS_TIPO_MOVIMENTO: 'LANÇAMENTO AVULSO (DÉBITO)', visible: true, },
    { CD_TIPO_MOVIMENTO: 8, DS_TIPO_MOVIMENTO: 'LANÇAMENTO CRÉDITO CAIXA', visible: false, },
    { CD_TIPO_MOVIMENTO: 9, DS_TIPO_MOVIMENTO: 'CANCELAMENTO CRÉDITO CAIXA', visible: false, },
];

//var dataSourceSerasaAgregadoCredenetPF = [
//    { DS_AGREGADO: 'Anotações Completas', CD_AGREGADO: "REQ3" },
//    { DS_AGREGADO: 'Capacidade de Pagamento', CD_AGREGADO: "REL7" },
//    { DS_AGREGADO: 'Comprometimento de Renda', CD_AGREGADO: "REL1" },
//    { DS_AGREGADO: 'Histórico de Pagamento', CD_AGREGADO: "REL5" },
//    { DS_AGREGADO: 'Protestos Nacionais', CD_AGREGADO: "LFPN" },
//    { DS_AGREGADO: 'Renda Estimada', CD_AGREGADO: "REL3" },
//    { DS_AGREGADO: 'Serasa Score PF com Positivo', CD_AGREGADO: "REFS" },

//];

var dataSourceSerasaAgregadoCredenetPF = [
    { DS_AGREGADO: 'Alerta de Identidade', CD_AGREGADO: "CAFY" },
    { DS_AGREGADO: 'Alerta Óbito', CD_AGREGADO: "AL24" },
    { DS_AGREGADO: 'Anotações Completas', CD_AGREGADO: "RXCF" },
    { DS_AGREGADO: 'Capacidade de Pagamento', CD_AGREGADO: "REPG" },
    { DS_AGREGADO: 'Comprometimento de Renda', CD_AGREGADO: "RETM" },
    { DS_AGREGADO: 'Histórico de Pagamento', CD_AGREGADO: "REIV" },
    { DS_AGREGADO: 'Indicador de recuperação de crédito', CD_AGREGADO: "REIC" },
    { DS_AGREGADO: 'Índice de relacionamento mercado e setor', CD_AGREGADO: "RMF9" },
    { DS_AGREGADO: 'Localização', CD_AGREGADO: "RELB" },
    { DS_AGREGADO: 'Recomendação de crédito', CD_AGREGADO: "REDC" },
    { DS_AGREGADO: 'Renda Estimada', CD_AGREGADO: "RERD" },

];

var dataSourceSerasaAgregadoCredenetPJ = [
    { DS_AGREGADO: 'Alerta de Identidade PJ', CD_AGREGADO: "PXSI" },
    { DS_AGREGADO: 'Anotações Completas', CD_AGREGADO: "RXCM" },
    { DS_AGREGADO: 'Comportamento de Pagamento do Setor', CD_AGREGADO: "RECA" },
    { DS_AGREGADO: 'Consultas detalhadas à Serasa', CD_AGREGADO: "NRCB" },
    { DS_AGREGADO: 'Dívidas em Órgãos Públicos', CD_AGREGADO: "RECA" },
    { DS_AGREGADO: 'Endereços e Telefones Adicionais', CD_AGREGADO: "NREA" },
    { DS_AGREGADO: 'Faturamento Estimado com Positivo', CD_AGREGADO: "REEP" },
    { DS_AGREGADO: 'Gasto Estimado PJ com Positivo', CD_AGREGADO: "REGE" },
    { DS_AGREGADO: 'Histórico de Pagamento Comercial - Básico', CD_AGREGADO: "PSDJ" },
    { DS_AGREGADO: 'Histórico de Pagamento Financeiro - Básico', CD_AGREGADO: "REDJ" },
    { DS_AGREGADO: 'Indicador de Operacionalidade', CD_AGREGADO: "AI3C" },
    { DS_AGREGADO: 'Índice de Relacionamento Mercado e Setor', CD_AGREGADO: "REI1" },
    { DS_AGREGADO: 'Limite de Crédito PJ', CD_AGREGADO: "RELM" },
    { DS_AGREGADO: 'Mais Anotações', CD_AGREGADO: "RXCJ" },
    { DS_AGREGADO: 'Participações em Empresas', CD_AGREGADO: "NRC6" },
    { DS_AGREGADO: 'Pontualidade de Pagamentos PJ', CD_AGREGADO: "READ" },
    { DS_AGREGADO: 'Quadro Social e Adiministrativo mais completo', CD_AGREGADO: "QSCN" },
    { DS_AGREGADO: 'Serasa Score - Sócios PF', CD_AGREGADO: "NRD2" },
    { DS_AGREGADO: 'Situação Fiscal', CD_AGREGADO: "SSCN" },
    { DS_AGREGADO: 'Vendas com Cartão', CD_AGREGADO: "REM1" },

];

//var dataSourceSerasaAgregadoCredenetPJ = [
//    { DS_AGREGADO: 'Anotações', CD_AGREGADO: "REQ1" },
//    { DS_AGREGADO: 'Faturamento Estimado', CD_AGREGADO: "REQ7" },
//    { DS_AGREGADO: 'Gastos estimados', CD_AGREGADO: "REN3" },
//    { DS_AGREGADO: 'Histórico de Pagamento Comercial Básico', CD_AGREGADO: "REN1" },
//    { DS_AGREGADO: 'Limite de Crédito', CD_AGREGADO: "RES5" },
//    { DS_AGREGADO: 'Pontualidade de Pagamentos', CD_AGREGADO: "REAF" },
//    { DS_AGREGADO: 'Protestos Nacionais', CD_AGREGADO: "LJPN" },
//    { DS_AGREGADO: 'Serasa Score PJ com Positivo', CD_AGREGADO: "REH5" },

//];

var dataSourceSerasaAgregadoRecomendaPF = [
    { CD_AGREGADO: 'RXCF', DS_AGREGADO: 'Anotações Completas' },
    { CD_AGREGADO: 'REIV', DS_AGREGADO: 'Histórico de Pagamento' },
    { CD_AGREGADO: 'RXPS', DS_AGREGADO: 'Participação em Empresas' },
    { CD_AGREGADO: 'RERD', DS_AGREGADO: 'Renda Estimada' },

];

var dataSourceSerasaAgregadoRecomendaPJ = [
    { CD_AGREGADO: 'RXCJ', DS_AGREGADO: 'Anotações Completas' },
    { CD_AGREGADO: 'NRCB', DS_AGREGADO: 'Consultas à Serasa' },
    { CD_AGREGADO: 'REEP', DS_AGREGADO: 'Faturamento Estimado' },
    { CD_AGREGADO: 'QSCN', DS_AGREGADO: 'Quadro Social e Administração' },

];

//////////////////////////////////////////////////////
// DATA SOURCES COM ORIGEM NO BANCO DE DADOS
//////////////////////////////////////////////////////

const donwloadFiles = [
    {
        name: 'Documentos',
        isDirectory: true,
        items: [
            {
                name: 'Custos.xlsx',
                isDirectory: false,
                size: 20480,
            },
            {
                name: 'Crédito.pdf',
                isDirectory: false,
                size: 20480,
            },
            {
                name: 'Precificação.xlsx',
                isDirectory: false,
                size: 20480,
            },
            {
                name: 'Contrato.pdf',
                isDirectory: false,
                size: 437852000,
            },
            {
                name: 'Pesquisa.docx',
                isDirectory: false,
                size: 2048,
            },
            {
                name: 'Anotações.txt',
                isDirectory: false,
                size: 1024,
            },
            {
                name: 'Promoções.xlsx',
                isDirectory: false,
                size: 20480,
            },
            {
                name: 'Notas.rar',
                isDirectory: false,
                size: 1024,
            },
            {
                name: 'Emails.zip',
                isDirectory: false,
                size: 1024,
            },
            {
                name: 'NF-e.xml',
                isDirectory: false,
                size: 1024,
            },
        ],
    },
    {
        name: 'Imagens',
        isDirectory: true,
        items: [
            {
                name: 'Logo.png',
                isDirectory: false,
                size: 20480,
            },
            {
                name: 'Foto-obra.jpeg',
                isDirectory: false,
                size: 10240,
            },
            {
                name: 'Fachada.bmp',
                isDirectory: false,
                size: 10240,
            },
        ],
    },
];

var loaPanel;
var valorOperadorReajuste;
var valorNumberBoxReajustePrecoFixo;
var valorNumberBoxReajuste;
var tipoValorReajuste = '%';
var componenteBotaoNumberBox;
var dataSourceClientesGeral;
var clienteSelecionado;
var clickAbaContaCorrente;
var clickAbaCompradores;
var clickAbaPressificacao;
var clickAbaSerasa;
var dataSourceMunicipios;
var dataSourceRegiao;
var dataSourceFormaPagamento;
var dataUsuarioLogado;
var dataUsuarioRota;
var loginPremissoes;
var tipoConsultaSerasaBasica = false;
var testeRespostaHtml;
var temCadastroSerasa = true;
var testeResponseConsulta;
var credenciaisSerasa;
var clickAbaConfGeraisSerasa;
var itenSelecionadoForma = [];
var itemSelecionadoGridDescFamilia = [];
var itemSelecionadoGridDescProduto = [];
var itemSelecionadoGridProdutoPrecoFixo = [];
let listaDescontoFamilia = [];
let listaDescontoProduto = [];
let dataSourceCondicaoPagamento = [];
var condicaoPagamentoCache = {};
var dataSourceCliente;
var dataEdicaoGridNegativar;
var clienteSelecionadoNegativar;
var dataSourceNegativarInclusao;
var dataSourceNegativarExclusao;

//#endregion

//#region [ Funções ]
CarregaPermissaoUsuarioClienteProc()
//RECARREGA PARÂMETROS USUÁRIOS
function RecarregarUsuario() {
    CarregaUsuarioConfiguracoesParans()
    CarregaPermissoesUsuarioLogadoCliente();

    //if (loginPremissoes) {

    //    CarregaPermissaoModuloAjusteUsuario(loginPremissoes)
    //}

}

//POPUP ENDEREÇO NÃO OBRIGATÓRIO
function PopupAvisoEndereco() {

    let textoCampoFaltando = 'estão faltando os campos'; // texto padrão
    let textoCampoFaltando2 = 'estes campos'; // texto padrão

    const camposFaltando = [
        !lkp_Ds_Municipio_Cadastro_Serasa.option('value') ? '<strong>Município</strong>' : '',
        !nbx_Cd_CEP_Cadastro_Serasa.option('value') ? '<strong>CEP</strong>' : '',
        !txt_Ds_Bairro_Cadastro_Serasa.option('value') ? '<strong>Bairro</strong>' : '',
        !nbx_Nr_Endereco_Cadastro_Serasa.option('value') ? '<strong>Número</strong>' : '',
        !txt_Ds_Endereco_Cadastro_Serasa.option('value') ? '<strong>Endereço</strong>' : ''
    ];

    const teste = camposFaltando.filter(Boolean)
    const camposFaltandoTexto = teste.join(', ');

    // Verifica se há apenas um campo faltando
    if (teste.length === 1) {
        textoCampoFaltando = 'está faltando o campo';
        textoCampoFaltando2 = 'este campo';
    }

    popupEndereco = $('#popupEndereco').dxPopup({
        maxWidth: 600,
        maxHeight: 400,
        showTitle: false,
        visible: true,
        hideOnOutsideClick: true,
        onHidden: function (e) {
            popupEndereco.hide();
        },
        contentTemplate: () => {
            const scrollView = $('<div class="scrollable-content" style="min-height: 100px;" />');
            scrollView.append($(`<div id="textBlock" text-center" style="text-align: center;">
                <div class="modal-content mt-3">
                        <section class="card card-default ">
                            <header class="card-header ">
                                <h4 class="text-danger"><b>AVISO IMPORTANTE</b></h4>
                            </header>
                            <div class="card-body">

                                <div class="modal-wrapper">
                                    <div class="modal-text ">
                                        <h4>
                                            Alguns campos do endereço estão preenchidos, mas para concluir a gravação ${textoCampoFaltando} ${camposFaltandoTexto}.
                                            Se você realmente deseja gravar o endereço, primeiro preencha ${textoCampoFaltando2}.
                                            Caso contrário, clique abaixo no botão "Limpar Campos do Endereço" e tente gravar novamente.
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <footer class="card-footer text-center"> <!-- Adicionando a classe text-center aqui -->
                                <div class="row">
                                    <div class="col-lg-12">
                                        <button type="button" class="btn btn-xs btn-default" onclick="LimparCampos(); popupEndereco.hide();"><i class="fa fa-eraser mr-2"></i>Limpar Campos do Endereço</button>
                                        <button type="button" class="btn btn-xs btn-success" onclick="popupEndereco.hide();"><i class="fa fa-thumbs-up mr-2"></i>Ok, vou preencher os campos</button>
                                    </div>
                                </div>
                            </footer>
                        </section>
                    </div>
                </div>`
            ));

            return scrollView;
        },

    }).dxPopup('instance');
}

//CARREGA PARÂMETROS GERAIS
function CarregaParametrosGeraisCliente() {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/CarregaParametrosGeraisCliente",
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {

        paransGeral = response[0];

        response[0].Qt_Dias_Renova_Cli_Inativ == null || response[0].Qt_Dias_Renova_Cli_Inativ > 0
            ? nbx_Qt_Dias_Renovacao_Clientes.option('value', response[0].Qt_Dias_Renova_Cli_Inativ) : null;


        response[0].Qt_Dias_Renova_Cli_Prazo == null || response[0].Qt_Dias_Renova_Cli_Prazo > 0
            ? nbx_Qt_Dias_Inativacao_Clientes.option('value', response[0].Qt_Dias_Renova_Cli_Prazo) : null;

        response[0].Qt_Dias_Renova_Cli_Zera_Limite_Credito == null || response[0].Qt_Dias_Renova_Cli_Zera_Limite_Credito > 0
            ? nbx_Qt_Zerar_Limite_Credito_Clientes.option('value', response[0].Qt_Dias_Renova_Cli_Zera_Limite_Credito) : null;

        chk_Valida_CPF_CNPJ_Cadastro.option('value', response[0].Lg_Valida_CPF_CNPJ_Cad_Cliente)
        chk_Obriga_RG_Cadastro.option('value', response[0].Lg_Obriga_RG_Cliente)
        chk_Obriga_IE_Cadastro.option('value', response[0].Lg_Obriga_IE_Cliente)
        chk_Valida_IE_Cadastro.option('value', response[0].Lg_Valida_IE_Cliente)
        chk_Obriga_Profissao_Cadastro.option('value', response[0].Lg_Obriga_Profissao_Cadastro_Cliente)
        chk_Obriga_Endereco_Cadastro.option('value', response[0].Lg_Obriga_Endereco_Cliente)

        if (response[0].Lg_Obriga_Endereco_Cliente) {
            $('#toggleEnderecos').trigger('click');

        }

    });
}

function CarregaPermissaoUsuarioClienteProc() {
    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/CarregaPermissaoUsuarioClienteProc",
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {

        if (response.filter(obj => obj.DS_NOME_OBJETO == "collapseClientes").length != 0) {
            dataUsuarioRota = true;
        } else {
            dataUsuarioRota = false;
        }
    });
}

//CARREGA AS PERMISSOES DO USUARIO LOGADO
CarregaPermissoesUsuarioLogadoCliente();
function CarregaPermissoesUsuarioLogadoCliente() {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/CarregaPermissoesUsuarioLogadoCliente",
            success: function (response) {
                resolve(response);
                
            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {

        dataUsuarioLogado = response[0]

        if (dataUsuarioLogado) {

            if (dataUsuarioLogado.NR_NIVEL_ACESSO == 0) {
                ExibirEsconderPaineis('confGerais', 'none');
                ExibirEsconderPaineis('confUsuario', 'none');
            }

            ExibirEsconderPaineis('cardMenu', 'block');
        } else {

            SalvarPermissoesUsuarioCliente(loginPremissoes)
        }

    });
}

//SALVA OS PARAMETROS GERAIS
function SalvarParansGeraisCliente() {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/SalvarParansGeraisCliente",
            data: {

                Qt_Dias_Renova_Cli_Inativ: nbx_Qt_Dias_Renovacao_Clientes.option('value'),
                Qt_Dias_Renova_Cli_Prazo: nbx_Qt_Dias_Inativacao_Clientes.option('value'),
                Qt_Dias_Renova_Cli_Zera_Limite_Credito: nbx_Qt_Zerar_Limite_Credito_Clientes.option('value'),

                Lg_Valida_CPF_CNPJ_Cad_Cliente: chk_Valida_CPF_CNPJ_Cadastro.option('value'),
                Lg_Obriga_RG_Cliente: chk_Obriga_RG_Cadastro.option('value'),
                Lg_Obriga_IE_Cliente: chk_Obriga_IE_Cadastro.option('value'),
                Lg_Valida_IE_Cliente: chk_Valida_IE_Cadastro.option('value'),
                Lg_Obriga_Profissao_Cadastro_Cliente: chk_Obriga_Profissao_Cadastro.option('value'),
                Lg_Obriga_Endereco_Cliente: chk_Obriga_Endereco_Cadastro.option('value'),

            },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();

            }
        });

    }).then(function (response) {
        CarregaParametrosGeraisCliente();

        if (response.Tipo == "Erro") {

            new PNotify({
                title: 'Erro ao salvar os parâmetros gerais!',
                text: response.Mensagem,
                type: 'error',
                width: "28%"
            });

        } else {

            new PNotify({
                title: 'Parâmetros Gerais Alterados',
                text: 'Dados gravados com sucesso!',
                type: 'success',
                width: "20%"
            });
        }

    });

}

//QUANDO CLICA EM CADASTRO DE CLIENTES 
function iniciaCadastroCliente() {
    //ALTERAR QUANDO COMITAR
    if (dataUsuarioLogado.NR_NIVEL_ACESSO == 1) {

        window.open(urlLegado + `CadClienteInc.aspx`, '_blank').focus();

        //CarregaLkpCliente();
        //ExibirEsconderPaineis('cardMenu', 'none');
        //ExibirEsconderPaineis('cardCabecalho', 'none');
        //ExibirEsconderPaineis('cardCadastroCliente', 'block');
        //loaPanel.show();
        //CarregaCategoriaCliente();
        //CarregaRamoAtividadeCliente();
        //CarregaRegiaoCliente();
        //CarregaMunicipios();
        //CarregaTabelaPrecoCliente();
        //CarregaContaCorrenteCliente();
        //CarregaFormaPagamentoCliente();
        //CarregaTransportadoraCliente();

    } else if (dataUsuarioRota) {

        window.open(urlLegado + `CadClienteInc.aspx`, '_blank').focus();

        //CarregaLkpCliente();
        //ExibirEsconderPaineis('cardMenu', 'none');
        //ExibirEsconderPaineis('cardCabecalho', 'none');
        //ExibirEsconderPaineis('cardCadastroCliente', 'block');
        //loaPanel.show();
        //CarregaCategoriaCliente();
        //CarregaRamoAtividadeCliente();
        //CarregaRegiaoCliente();
        //CarregaMunicipios();
        //CarregaTabelaPrecoCliente();
        //CarregaContaCorrenteCliente();
        //CarregaFormaPagamentoCliente();
        //CarregaTransportadoraCliente();

    } else {
        popupAcessoNegado.show();
    }

}

//CARREGA CLIENTES GRID
function CarregaClientesDetalhadoGrid(x) {

    x = !x ? "null" : `"${x}"`
    GetAzureDataSource(4, ` { CD_STATUS: ${x}}`).then((result) => {
        loaPanel.hide();

        if (result.success) {
            dataSourceClientesGeral = result.data;
            gridconsultaClientes.option('dataSource', result.data);
            
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
}

//CARREGA CLIENTES LOOKUP
function CarregaLkpCliente() {

    GetAzureDataSource(5).then((result) => {
        loaPanel.hide();

        if (result.success) {
            lkp_Cliente_Indicador.option('dataSource', result.data);
            lkp_Cliente_Pesquisa.option('dataSource', result.data);
            lkpClientePesquisaNegativar.option('dataSource', result.data);
            /*dataSourceCliente = result.data;*/
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
}

//CARREGA OS DADOS DO CLIENTE SELECIONADO NO LOOKUP
function CarregaClienteSelecionado(cdCliente) {

    return new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/CarregaCliente",
            data: { cnpjCpf: cdCliente },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {
        loaPanel.hide();

        ExibirEsconderPaineis('abaAcessoSerasa', 'block');
        ExibirEsconderPaineis('abaAcessoAnexos', 'block');
        ExibirEsconderPaineis('abaAcessoContaCorrente', 'block');
        ExibirEsconderPaineis('abaAcessoCRM', 'block');
        ExibirEsconderPaineis('abaAcessoCompradores', 'block');
        ExibirEsconderPaineis('abaAcessoPrecificacao', 'block');
        ExibirEsconderPaineis('abaAcessoEquipes', 'block');
        ExibirEsconderPaineis('abaAcessoComodato', 'block');
        ExibirEsconderPaineis('abaAcessoPedidos', 'block');

        txt_Cd_CPF_CNPJ.option('value', response[0].CD_CPF_CNPJ)
        txt_Cd_IE.option('value', response[0].CD_INSCRICAO_ESTADUAL)
        txt_Ds_Telefone.option('value', response[0].DS_TELEFONE)
        txt_Ds_Fax.option('value', response[0].DS_FAX)
        dt_Cadastro.option('value', response[0].DT_CADASTRO)
        dt_Aniversario_Abertura.option('value', response[0].DT_NASCIMENTO_ABERTURA)
        dt_Atualizacao.option('value', response[0].DT_ATUALIZACAO)
        txt_Ds_Razao_Social.option('value', response[0].DS_RAZAO_SOCIAL)
        txt_Ds_Nome_Fantasia.option('value', response[0].DS_FANTASIA)
        txt_Ds_Celular.option('value', response[0].DS_CELULAR_1)
        txt_Ds_Celular_2.option('value', response[0].DS_CELULAR_2)
        nbx_Nr_WhatsApp.option('value', response[0].NR_WHATSAPP)
        txt_Ds_Email.option('value', response[0].DS_EMAIL)
        txt_Ds_Contato.option('value', response[0].DS_CONTATO)
        txt_Ds_Profissao.option('value', response[0].DS_PROFISSAO)
        nbx_Limite_Credito.option('value', response[0].VL_LIMITE_CREDITO)
        txta_Obs_Pedido_Nota.option('value', response[0].DS_OBS)
        txta_Obs_Nao_Destacada.option('value', response[0].DS_OBS_2)
        nbx_Limite_Credito_Utilizado.option('value', response[0].VL_LIMITE_UTILIZADO)
        nbx_Limite_Credito_Disponivel.option('value', response[0].VL_LIMITE_DISPONIVEL)
        txt_Ds_Web_Site.option('value', response[0].DS_WEB_SITE)
        nbx_Cd_DDD_Telefone.option('value', response[0].CD_DDD_TELEFONE)
        nbx_Cd_DDD_Fax.option('value', response[0].CD_DDD_FAX)
        nbx_Cd_DDD_Celular.option('value', response[0].CD_DDD_CELULAR_1)
        nbx_Cd_DDD_Celular_2.option('value', response[0].CD_DDD_CELULAR_2)
        nbx_Cd_DDI_WhatsApp.option('value', response[0].CD_DDI_WHATSAPP)
        nbx_Cd_DDD_WhatsApp.option('value', response[0].CD_DDD_WHATSAPP)
        chk_Email_Orcamento.option('value', response[0].LG_ENVIO_EMAIL_ORCAMENTO !== null ? response[0].LG_ENVIO_EMAIL_ORCAMENTO : false)
        chk_Email_Pedidos_Conta_Corrente.option('value', response[0].LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE !== null ? response[0].LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE : false)
        chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos.option('value', response[0].LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS !== null ?
            response[0].LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS : false)
        chk_Email_Pedido_Informar_Limite_Credito.option('value', response[0].LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO !== null ? response[0].LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO : false)
        chk_Incluir_Obs_Nota_Fiscal.option('value', response[0].LG_OBS_CLIENTE_NF !== null ? response[0].LG_OBS_CLIENTE_NF : false)
        chk_Incluir_Obs_Pedido.option('value', response[0].LG_OBS_CLIENTE_PEDIDO_VENDA !== null ? response[0].LG_OBS_CLIENTE_PEDIDO_VENDA : false)
        chk_Optante_Simples.option('value', response[0].LG_OPTANTE_SIMPLES !== null ? response[0].LG_OPTANTE_SIMPLES : false)
        chk_Orgao_Publico.option('value', response[0].LG_ORGAO_PUBLICO !== null ? response[0].LG_ORGAO_PUBLICO : false);
        chk_Nao_Contribuinte_ICMS.option('value', response[0].LG_NAO_CONTRIBUINTE_ICMS !== null ? response[0].LG_NAO_CONTRIBUINTE_ICMS : false)
        chk_Nao_Calcular_FCP.option('value', response[0].LG_NAO_EFETUA_CALCULO_FCP !== null ? response[0].LG_NAO_EFETUA_CALCULO_FCP : false)
        chk_Email_Pedidos_Faturados.option('value', response[0].LG_ENVIO_EMAIL_PEDIDO_FATURADO !== null ? response[0].LG_ENVIO_EMAIL_PEDIDO_FATURADO : false);
        chk_Controla_Limite_Credito.option('value', response[0].LG_CONTROLA_LIMITE_CREDITO !== null ? response[0].LG_CONTROLA_LIMITE_CREDITO : false)
        chk_Email_Lista_Pedidos_Aguardando_Faturamento.option('value', response[0].LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS !== null ? response[0].LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS : false)
        nbx_Pc_Substituicao_Tributaria.option('value', response[0].PC_MEDIO_SUBSTITUICAO_TRIBUTARIA !== null ? response[0].PC_MEDIO_SUBSTITUICAO_TRIBUTARIA / 100 : null);
        txt_Suframa.option('value', response[0].CD_CADASTRO_SUFRAMA)
        txt_CNAE.option('value', response[0].CD_CNAE)
        txt_Codigo_Beneficio_Fiscal.option('value', response[0].CD_BENEFICIO_FISCAL)
        chk_Enviar_Cartorio.option('value', response[0].LG_ENVIAR_CARTORIO !== null ? response[0].LG_ENVIAR_CARTORIO : false)
        nbx_Dias_Vencimento_Envio_Cartorio.option('value', response[0].QT_DIAS_ATRASO_ENVIO_CARTORIO)
        txt_Ds_Email_Pedido.option('value', response[0].DS_EMAIL_ENVIO_PEDIDO)
        txta_Mensagem_Email_Pedido.option('value', response[0].DS_TEXTO_ENVIO_EMAIL_AUTOMATICO_PEDIDO)
        nbx_Email_Pedido_Periodicidade.option('value', response[0].QT_DIAS_PERIODICIDADE_EMAIL_PEDIDO)
        dt_Dia_Envio_Email_Pedido.option('value', response[0].NR_DIA_ENVIO_EMAIL_PEDIDO !== null ? new Date(2023, 0, response[0].NR_DIA_ENVIO_EMAIL_PEDIDO) : null)
        dia_Fechamento_Inicial_Email_Pedido.option('value', response[0].NR_DIA_INICIAL_ENVIO_EMAIL_PEDIDO !== null ? new Date(2023, 0, response[0].NR_DIA_INICIAL_ENVIO_EMAIL_PEDIDO) : null)
        dia_Fechamento_Final_Email_Pedido.option('value', response[0].NR_DIA_FINAL_ENVIO_EMAIL_PEDIDO !== null ? new Date(2023, 0, response[0].NR_DIA_FINAL_ENVIO_EMAIL_PEDIDO) : null)

        if (response[0].QT_DIAS_PERIODICIDADE_EMAIL_PEDIDO) {
            document.getElementById('radioEmailPeriodicidade').checked = true;

        } else {
            document.getElementById('radioEmailPeriodicidade').checked = false;

            if (dt_Dia_Envio_Email_Pedido.option('value')) {
                document.getElementById('radioEmailDiaFixo').checked = true;
            } else {
                document.getElementById('radioEmailDiaFixo').checked = false;
            }
        }

        if (response[0].LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR) {
            document.getElementById('radioEmailMesAnterior').checked = true;
            document.getElementById('radioEmailIntervalo').checked = false;

        } else {
            document.getElementById('radioEmailMesAnterior').checked = false;

            if (dia_Fechamento_Inicial_Email_Pedido.option('value')) {
                document.getElementById('radioEmailIntervalo').checked = true;
            } else {
                document.getElementById('radioEmailIntervalo').checked = false;
            }

        }

        lkp_Status_Cliente.option('value', response[0].CD_STATUS);
        lkp_Atuacao.option('value', response[0].CD_CLIENTE_ATUACAO);
        lkp_Tabela_Preco.option('value', response[0].CD_TABELA_PRECO);
        lkp_Categoria.option('value', response[0].CD_CATEGORIA_CLIENTE);
        lkp_Ramo_Atividade.option('value', response[0].CD_RAMO_ATIVIDADE);
        lkp_Cliente_Indicador.option('value', response[0].CD_CPF_CNPJ_INDICADOR);
        lkp_Forma_Condicao_Pagamento.option('value', `${response[0].CD_FORMA_PAGAMENTO}|${response[0].CD_CONDICAO_PAGAMENTO}`);
        lkp_Conta_Corrente_Boleto.option('value', `${response[0].CD_BANCO_BOLETO}|${response[0].CD_AGENCIA_BOLETO}|${response[0].CD_CONTA_CORRENTE_BOLETO}`);
        lkp_Transportadoras.option('value', response[0].CD_TRANSPORTADORA);

    });
};

//CARREGA TABELA PREÇO CLIENTE SELECIONADO
function CarregaTabelaPrecoCliente() {

    GetAzureDataSource(2, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {

            lkp_Tabela_Preco.option('dataSource', result.data);
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
}

//CARREGA ENDEREÇOS CLIENTE SELECIONADO
function CarregaEnderecosClientes(x) {
    ExibirEsconderPaineis('EnderecoPrincipalInclusao', 'none');

    GetAzureDataSource(7, ` { CD_CPF_CNPJ: "${x}"}`).then((result) => {

        if (result.success) {
            ExibirEsconderPaineis('EnderecosAlteracao', 'block');

            gridEnderecosCliente.option('columns[7]lookup.dataSource', dataSourceRegiao);
            gridEnderecosCliente.option('columns[5]lookup.dataSource', dataSourceMunicipios);
            gridEnderecosCliente.option('dataSource', result.data);
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
}

//CARREGA ENDEREÇO PELO CEP
function GetEnderecoCEP(cep) {

    return new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/GetCep",
            data: { CdCep: cep },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {

        if (response.length > 0) {

            if (nbx_Cd_CEP_Cadastro_Serasa.option('value')) {
                txt_Ds_Endereco_Cadastro_Serasa.option('value', response[0].Ds_Endereco);
                txt_Ds_Bairro_Cadastro_Serasa.option('value', response[0].Ds_Bairro);
                lkp_Ds_Municipio_Cadastro_Serasa.option('value', response[0].Cd_Municipio);
            }

            if (nbx_Cd_CEP.option('value')) {
                txt_Ds_Endereco.option('value', response[0].Ds_Endereco);
                txt_Ds_Bairro.option('value', response[0].Ds_Bairro);
                lkp_Ds_Municipio.option('value', response[0].Cd_Municipio);
            }

        }

    });
}

//CARREGA CATEGORIA CLIENTE
function CarregaCategoriaCliente() {
    GetAzureDataSource(6, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {
            lkp_Categoria.option('dataSource', result.data);

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
}

//CARREGA RAMOS DE ATIVIDADES
function CarregaRamoAtividadeCliente() {

    GetAzureDataSource(9, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {
            lkp_Ramo_Atividade.option('dataSource', result.data);
            lkp_Ramo_Atividade_Cadastro_Serasa.option('dataSource', result.data);
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
}

//CONSULTA REGIÕES DE ENDEREÇOS
function CarregaRegiaoCliente() {

    GetAzureDataSource(10, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {
            dataSourceRegiao = result.data;
            lkp_Regiao.option('dataSource', result.data);
            lkp_Regiao_Cadastro_Serasa.option('dataSource', result.data);
            /*gridEnderecosCliente.option('columns[7]lookup.dataSource', dataSourceRegiao);*/
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
}

//CONSULTA MUNICÍPIOS
function CarregaMunicipios() {

    GetAzureDataSource(14, '{ }').then((result) => {

        if (!result.success) {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);

        } else {
           
            dataSourceMunicipios = result.data;
            lkp_Ds_Municipio.option('dataSource', result.data);
            lkp_Ds_Municipio_Cadastro_Serasa.option('dataSource', result.data);
            gridCompradoresAutorizados.option('columns[9].lookup.dataSource', dataSourceMunicipios);


        }

    });
}

//CONSULTA FORMA E CONDIÇÃO DE PAGAMENTO COMBINADAS
function CarregaFormaPagamentoCliente() {

    GetAzureDataSource(8, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {
            lkp_Forma_Condicao_Pagamento.option('dataSource', result.data);

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
}

//CARREGA CONTA CORRENTE
function CarregaContaCorrenteCliente() {

    GetAzureDataSource(1, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {
            lkp_Conta_Corrente_Boleto.option('dataSource', result.data);

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
}

//CARREGA TRANSPORTADORA CLIENTE
function CarregaTransportadoraCliente() {

    GetAzureDataSource(3, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {
            lkp_Transportadoras.option('dataSource', result.data);

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
}

//CARREGA USUARIO PARAMETROS
function CarregaUsuarioConfiguracoesParans() {

    GetAzureDataSource(34).then((result) => {

        if (result.success) {
            lkp_Usuario_Configuracoes.option('dataSource', result.data);

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

}

//CARREGA FOTO USUARIO
function getTemplateFoto(data, containerClass) {
    let fotoAtual = data.DS_URL_FOTO + '?' + new Date().getTime();

    return `<div class='${containerClass}'><img src='${fotoAtual}' /><div> ${data.DS_PESQUISA}</div></div>`;

};

function carregaConfiguracoesUsuario(foto) {
    let fotoAtual = foto + '?' + new Date().getTime();

    var img = document.querySelector("#fotoUsuarioConfiguracoes");
    img.setAttribute('src', fotoAtual);

};

function ClickAbaDados() {
    clickAbaContaCorrente = false;
    clickAbaSerasa = false;
    clickAbaCompradores = false;
    clickAbaPressificacao = false;
    habilitaDescontoDiferenciado(clickAbaPressificacao)
}

//CARREGA EXTARTO CONTA CORRENTE CLIENTE
function CarregaExtratoContaCorrenteCliente(clienteSelecionado) {

    let cdCpfCnpj = `"${clienteSelecionado.CD_PESQUISA}"`
    clickAbaContaCorrente = true;
    GetAzureDataSource(24, `{ CD_CPF_CNPJ: ${cdCpfCnpj} }`).then((result) => {

        if (result.success) {

            gridContaCorrente.option('dataSource', result.data);

            let totalSum = 0;
            result.data.forEach(item => {
                totalSum += item.VL_MOVIMENTO || 0;
            });

            let saldoFormatado = totalSum.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
            let saldoAtualElement = document.querySelector('#abaContaCorrente .col-lg-4 h3');

            if (totalSum < 0) {
                saldoAtualElement.classList.add('saldo-negativo');

            } else {
                saldoAtualElement.classList.remove('saldo-negativo');

            }
            saldoAtualElement.textContent = `R$ ${saldoFormatado}`;

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
}

//CARREGA USUARIO SELECIONADO PARAMETROS
function CarregaUsuarioSelecianonadoParametros(loginPremissoes) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/CarregaPermissoesUsuarioSelecionadoCliente",
            data: {
                usuario: loginPremissoes,

            },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();

            }
        });

    }).then(function (response) {

        if (response.Tipo == "Erro") {

            new PNotify({
                title: 'Erro ao carregar as permissões do usuário',
                text: response.Mensagem,
                type: 'error',
                width: "28%"
            });

        } else {

            if (response.length > 0) {

                dataPermissoesUsuario = response;
                
                /*chk_Serasa_Crednet_Light.option('value', response[0].Lg_Permite_Consultar_Serasa_Crednet_Light);*/
                chk_Serasa_Basica.option('value', response[0].Lg_Permite_Consultar_Serasa_Relatorio_Basico);
                chk_Serasa_Recomenda.option('value', response[0].Lg_Permite_Consultar_Serasa_Recomenda);
                chk_Serasa_Agregados.option('value', response[0].Lg_Permite_Consultar_Serasa_Agregados);

                chk_incluir_negativacao.option('value', response[0].Lg_Permite_Incluir_Serasa_Negativacao);
                chk_excluir_negativacao.option('value', response[0].Lg_Permite_Excluir_Serasa_Negativacao);
                chk_consultar_negativacao.option('value', response[0].Lg_Permite_Consultar_Serasa_Negativacao);


                if (response[0].NR_NIVEL_ACESSO == 1) {
                    ExibirEsconderPaineis('accParametrosUsuario', 'none');
                    ExibirEsconderPaineis('mensagemUsuarioAdministrador', 'block');
                    //ExibirEsconderPaineis('mensagemUsuarioSemAcessoModuloAjuste', 'none');


                }
                //else if (mostrarParans) {
                //    //ExibirEsconderPaineis('configuracoesUsuario', 'block');
                //    //ExibirEsconderPaineis('mensagemUsuarioAdministrador', 'none');
                //    //ExibirEsconderPaineis('mensagemUsuarioSemAcessoModuloAjuste', 'none');

                //    chk_Serasa_Crednet_Light.option('value', response[0].Lg_Permite_Consultar_Serasa_Crednet_Light);
                //    chk_Serasa_Recomenda.option('value', response[0].Lg_Permite_Consultar_Serasa_Recomenda);

                //}
                else {

                    ExibirEsconderPaineis('accParametrosUsuario', 'block');
                    ExibirEsconderPaineis('mensagemUsuarioAdministrador', 'none');
                    //ExibirEsconderPaineis('mensagemUsuarioSemAcessoModuloAjuste', 'block');
                }

            } else {

                SalvarPermissoesUsuarioCliente(loginPremissoes)
            }

        }

    });
}

//SALVAR PERMISSOES USUARIO SELECIONADO
function SalvarPermissoesUsuarioCliente(loginPremissoes) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/SalvarPermissoesUsuarioCliente",
            data: {
                Cd_Login: loginPremissoes,

            },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();

            }
        });

    }).then(function (response) {

        if (loginPremissoes) {
            CarregaUsuarioSelecianonadoParametros(loginPremissoes)

        } else {
            CarregaPermissoesUsuarioLogadoCliente()

        }

    });
}

//ALTERA PERMISSOES USUARIO SELECIONADO 
function AlteraPermissoesUsuarioSelecionadoCliente(loginPremissoes) {

    if (loginPremissoes) {

        new Promise(function (resolve, reject) {

            $.ajax({
                type: 'POST',
                url: "/CadastrosGerais/AlteraPermissoesUsuarioSelecionadoCliente",
                data: {
                    Cd_Login: loginPremissoes,
                    /*Lg_Permite_Consultar_Serasa_Crednet_Light: chk_Serasa_Crednet_Light.option('value'),*/
                    Lg_Permite_Consultar_Serasa_Relatorio_Basico: chk_Serasa_Basica.option('value'),
                    Lg_Permite_Consultar_Serasa_Recomenda: chk_Serasa_Recomenda.option('value'),
                    Lg_Permite_Consultar_Serasa_Agregados: chk_Serasa_Agregados.option('value'),

                    Lg_Permite_Incluir_Serasa_Negativacao: chk_incluir_negativacao.option('value'),
                    Lg_Permite_Excluir_Serasa_Negativacao: chk_excluir_negativacao.option('value'),
                    Lg_Permite_Consultar_Serasa_Negativacao: chk_consultar_negativacao.option('value'),

                },
                success: function (response) {
                    resolve(response);

                },
                error: function () {
                    // Rejeita a Promise em caso de erro
                    reject();

                }
            });

        }).then(function (response) {

            CarregaUsuarioSelecianonadoParametros(loginPremissoes)

            if (response.Tipo == "Erro") {

                new PNotify({
                    title: 'Erro ao salvar permissões do usuário!',
                    text: response.Mensagem,
                    type: 'error',
                    width: "28%"
                });

            } else {

                new PNotify({
                    title: 'Permissões do usuário habilitada',
                    text: 'Dados gravados com sucesso!',
                    type: 'success',
                    width: "20%"
                });

            }


        });
    }

}

//SALVAR CLIENTE
function SaveCliente(cliente) {

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/SaveCliente",
            data: { cliente: JSON.stringify(cliente) },
            success: function (dataSource) {
                resolve(dataSource);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });

    });
}

//PEGA OS DADOS DO CLIENTE PARA SALVAR

function GetClienteToInsertNovo(exec) {

    let cpfCnpjValue = txt_Cd_CPF_CNPJ.option('value');
    let municipio = null;
    let cepValue = null;
    let formaCondicaoPagamento = null;
    let boleto = null;
    let substituicaoTributaria = nbx_Pc_Substituicao_Tributaria.option('value');
    substituicaoTributaria = substituicaoTributaria ? parseFloat(substituicaoTributaria) * 100 : null;

    let diaFixo = dt_Dia_Envio_Email_Pedido.option('value') ? new Date(dt_Dia_Envio_Email_Pedido.option('value')).getDate() : null;

    let diaInicial = dia_Fechamento_Inicial_Email_Pedido.option('value') ?
        new Date(dia_Fechamento_Inicial_Email_Pedido.option('value')).getDate() : null;

    let diaFinal = dia_Fechamento_Final_Email_Pedido.option('value') ? new Date(dia_Fechamento_Final_Email_Pedido.option('value')).getDate() : null;

    if (lkp_Forma_Condicao_Pagamento.option('value') != null) {
        formaCondicaoPagamento = lkp_Forma_Condicao_Pagamento.option('dataSource').filter(q => q.CD_PESQUISA == lkp_Forma_Condicao_Pagamento.option('value'))[0];
    }

    if (lkp_Ds_Municipio.option('value') != null) {
        municipio = lkp_Ds_Municipio.option('dataSource').filter(q => q.CD_MUNICIPIO == lkp_Ds_Municipio.option('value'))[0];
    }

    if (lkp_Conta_Corrente_Boleto.option('value') != null) {
        boleto = lkp_Conta_Corrente_Boleto.option('dataSource').filter(q => q.CD_CHAVE == lkp_Conta_Corrente_Boleto.option('value'))[0];

    }

    cepValue = nbx_Cd_CEP.option('value') ? String(nbx_Cd_CEP.option('value')).padStart(8, '0') : null;

    var cliente = {
        EXEC: exec,
        /*EXEC: 'INS',*/
        CD_STATUS: lkp_Status_Cliente.option('value'),
        CD_CPF_CNPJ: cpfCnpjValue,
        CD_TIPO_CPF_CNPJ: '',
        CD_INSCRICAO_ESTADUAL: txt_Cd_IE.option('value'),
        DS_RAZAO_SOCIAL: txt_Ds_Razao_Social.option('value'),
        DS_FANTASIA: txt_Ds_Nome_Fantasia.option('value'),
        DS_CONTATO: txt_Ds_Contato.option('value'),
        CD_DDD_TELEFONE: nbx_Cd_DDD_Telefone.option('value'),
        DS_TELEFONE: txt_Ds_Telefone.option('value'),
        DS_PROFISSAO: txt_Ds_Profissao.option('value'),
        CD_RAMO_ATIVIDADE: lkp_Ramo_Atividade.option('value'),
        CD_CLIENTE_ATUACAO: lkp_Atuacao.option('value'),
        DS_CIDADE: municipio ? municipio.DS_MUNICIPIO : null,
        CD_UF: municipio ? municipio.CD_UF : null,
        CD_MUNICIPIO: municipio ? municipio.CD_MUNICIPIO : null,
        CD_CEP: cepValue,
        CD_REGIAO: lkp_Regiao.option('value'),
        DS_ENDERECO: txt_Ds_Endereco.option('value'),
        NR_ENDERECO: nbx_Nr_Endereco.option('value'),
        DS_ENDERECO_COMPL: txt_Ds_Endereco_Compl.option('value'),
        DS_BAIRRO: txt_Ds_Bairro.option('value'),
        DS_PONTO_REFERENCIA: txt_Ds_Endereco_Referencia.option('value'),
        DT_NASCIMENTO_ABERTURA: dt_Aniversario_Abertura.option('value'),
        /*DT_CADASTRO: dt_Cadastro.option('value'),*/
        /*DT_CADASTRO: null,*/
        DS_FAX: txt_Ds_Fax.option('value'),
        DS_CELULAR_1: txt_Ds_Celular.option('value'),
        DS_CELULAR_2: txt_Ds_Celular_2.option('value'),
        NR_WHATSAPP: nbx_Nr_WhatsApp.option('value'),
        DS_EMAIL: txt_Ds_Email.option('value'),
        VL_LIMITE_CREDITO: nbx_Limite_Credito.option('value'),
        DS_OBS: txta_Obs_Pedido_Nota.option('value'),
        DS_OBS_2: txta_Obs_Nao_Destacada.option('value'),
        VL_LIMITE_UTILIZADO: nbx_Limite_Credito_Utilizado.option('value'),
        VL_LIMITE_DISPONIVEL: nbx_Limite_Credito_Disponivel.option('value'),
        DS_WEB_SITE: txt_Ds_Web_Site.option('value'),
        CD_DDD_FAX: nbx_Cd_DDD_Fax.option('value'),
        CD_DDD_CELULAR_1: nbx_Cd_DDD_Celular.option('value'),
        CD_DDD_CELULAR_2: nbx_Cd_DDD_Celular_2.option('value'),
        CD_DDI_WHATSAPP: nbx_Cd_DDI_WhatsApp.option('value'),
        CD_DDD_WHATSAPP: nbx_Cd_DDD_WhatsApp.option('value'),
        LG_ENVIO_EMAIL_ORCAMENTO: chk_Email_Orcamento.option('value'),
        LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE: chk_Email_Pedidos_Conta_Corrente.option('value'),
        LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS: chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos.option('value'),
        LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO: chk_Email_Pedido_Informar_Limite_Credito.option('value'),
        LG_OBS_CLIENTE_NF: chk_Incluir_Obs_Nota_Fiscal.option('value'),
        LG_OBS_CLIENTE_PEDIDO_VENDA: chk_Incluir_Obs_Pedido.option('value'),
        LG_OPTANTE_SIMPLES: chk_Optante_Simples.option('value'),
        LG_ORGAO_PUBLICO: chk_Orgao_Publico.option('value'),
        LG_NAO_CONTRIBUINTE_ICMS: chk_Nao_Contribuinte_ICMS.option('value'),
        LG_NAO_EFETUA_CALCULO_FCP: chk_Nao_Calcular_FCP.option('value'),
        LG_ENVIO_EMAIL_PEDIDO_FATURADO: chk_Email_Pedidos_Faturados.option('value'),
        LG_CONTROLA_LIMITE_CREDITO: chk_Controla_Limite_Credito.option('value'),
        LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS: chk_Email_Lista_Pedidos_Aguardando_Faturamento.option('value'),
        NR_DIA_ENVIO_EMAIL_PEDIDO: diaFixo,
        NR_DIA_INICIAL_ENVIO_EMAIL_PEDIDO: diaInicial,
        NR_DIA_FINAL_ENVIO_EMAIL_PEDIDO: diaFinal,
        PC_MEDIO_SUBSTITUICAO_TRIBUTARIA: substituicaoTributaria,
        CD_CADASTRO_SUFRAMA: txt_Suframa.option('value'),
        CD_CNAE: txt_CNAE.option('value'),
        CD_BENEFICIO_FISCAL: txt_Codigo_Beneficio_Fiscal.option('value'),
        LG_ENVIAR_CARTORIO: chk_Enviar_Cartorio.option('value'),
        QT_DIAS_ATRASO_ENVIO_CARTORIO: nbx_Dias_Vencimento_Envio_Cartorio.option('value'),
        DS_EMAIL_ENVIO_PEDIDO: txt_Ds_Email_Pedido.option('value'),
        DS_TEXTO_ENVIO_EMAIL_AUTOMATICO_PEDIDO: txta_Mensagem_Email_Pedido.option('value'),
        QT_DIAS_PERIODICIDADE_EMAIL_PEDIDO: nbx_Email_Pedido_Periodicidade.option('value'),
        CD_CATEGORIA_CLIENTE: lkp_Categoria.option('value'),
        CD_CPF_CNPJ_INDICADOR: lkp_Cliente_Indicador.option('value'),
        CD_TABELA_PRECO: lkp_Tabela_Preco.option('value'),
        CD_TRANSPORTADORA: lkp_Transportadoras.option('value'),
        CD_FORMA_PAGAMENTO: formaCondicaoPagamento ? formaCondicaoPagamento.CD_FORMA_PAGAMENTO : null,
        CD_CONDICAO_PAGAMENTO: formaCondicaoPagamento ? formaCondicaoPagamento.CD_CONDICAO_PAGAMENTO : null,
        CD_BANCO_BOLETO: boleto ? boleto.CD_BANCO : null,
        CD_AGENCIA_BOLETO: boleto ? boleto.CD_AGENCIA : null,
        CD_CONTA_CORRENTE_BOLETO: boleto ? boleto.CD_CONTA_CORRENTE : null,
        LG_ENVIO_EMAIL_PEDIDO_MES_ANTERIOR: document.getElementById('radioEmailMesAnterior').checked,

    };

    let cpfCnpjLength = cpfCnpjValue.length;
    switch (cpfCnpjLength) {
        case 11:
            cliente.CD_TIPO_CPF_CNPJ = 'F';
            cliente.CD_TIPO_ENDERECO = '1';

            break;
        case 14:
            cliente.CD_TIPO_CPF_CNPJ = 'J';
            cliente.CD_TIPO_ENDERECO = '2';

            break;
        default:
            cliente.CD_TIPO_CPF_CNPJ = 'F';

            break;
    }
    console.log('cliente', cliente)
    return cliente;
}

////////***FUNÇÕES SERASA***////////
CarregaCredenciaisSerasa(false);
function CarregaCredenciaisSerasa(x) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/CarregaCredenciaisSerasa",
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();

            }
        });

    }).then(function (response) {

        if (response.Tipo == "Erro") {

            new PNotify({
                title: 'Erro ao carregar as credencias Serasa',
                text: response.Mensagem,
                type: 'error',
                width: "28%"
            });

        } else {
            credenciaisSerasa = response[0];

            if (credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario) {
                ExibirEsconderPaineis('serasaSaibaMais', 'none');

            } else {
                ExibirEsconderPaineis('serasaSaibaMais', 'block');

            }
            if (x) {
                novaConsultaAbaSerasa();
            }

            usuarioSerasaConfiguracoes.option('value', response[0].Cd_Integracao_Serasa_Usuario)
            senhaSerasaConfiguracoes.option('value', response[0].Ds_Integracao_Serasa_Senha)
            usuarioSerasaConfiguracoesRecomenda.option('value', response[0].Cd_Integracao_Serasa_Recomenda_Usuario)
            senhaSerasaConfiguracoesRecomenda.option('value', response[0].Ds_Integracao_Serasa_Recomenda_Senha)

            //usuarioSerasa.option('value', response[0].Cd_Integracao_Serasa_Usuario)
            //senhaSerasaCadastrada.option('value', response[0].Ds_Integracao_Serasa_Senha)
            usuarioSerasaRecomenda.option('value', response[0].Cd_Integracao_Serasa_Recomenda_Usuario)
            senhaSerasaRecomenda.option('value', response[0].Ds_Integracao_Serasa_Recomenda_Senha)

            //usuarioAbaSerasa.option('value', response[0].Cd_Integracao_Serasa_Usuario)
            //senhaAbaSerasaCadastrada.option('value', response[0].Ds_Integracao_Serasa_Senha)
            usuarioAbaSerasaRecomenda.option('value', response[0].Cd_Integracao_Serasa_Recomenda_Usuario)
            senhaAbaSerasaRecomenda.option('value', response[0].Ds_Integracao_Serasa_Recomenda_Senha)

        }

    });
}
function applyCellValueLogic(rowData) {
    function transformZeroValue(value) {
        return value ? value : null;
    }

    rowData.PC_CHANCE_PAGAMENTO = transformZeroValue(rowData.PC_CHANCE_PAGAMENTO);

}

//HISTÓRICO DE CONSULTAS SERASA
function CarregaHistoricoSerasa() {

    GetAzureDataSource(49).then((result) => {
        let resultData;

        if (result.success) {

            if (dataUsuarioLogado.NR_NIVEL_ACESSO == 1) {
                resultData = result.data;
                resultData.forEach(function (currentRowData) {
                    applyCellValueLogic(currentRowData);
                });

                gridHistoricoSerasa.option('dataSource', resultData);

            } else {

                if (dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Relatorio_Basico && dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Recomenda) {
                    resultData = result.data;
                    resultData.forEach(function (currentRowData) {
                        applyCellValueLogic(currentRowData);
                    });

                    gridHistoricoSerasa.option('dataSource', result.data);

                } else if (dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Crednet_Light || dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Relatorio_Basico) {

                    /*let dataL = result.data.filter(item => item.DS_TIPO_CONSULTA === "CREDNET LIGHT")*/
                    let dataL = result.data.filter(item => item.DS_TIPO_CONSULTA === "CREDNET LIGHT" || item.DS_TIPO_CONSULTA === "BÁSICA");

                    dataL.forEach(function (currentRowData) {
                        applyCellValueLogic(currentRowData);
                    });
                    gridHistoricoSerasa.option('dataSource', dataL);

                } else if (dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Recomenda) {

                    let dataR = result.data.filter(item => item.DS_TIPO_CONSULTA === "RECOMENDA")
                    dataR.forEach(function (currentRowData) {
                        applyCellValueLogic(currentRowData);
                    });
                    gridHistoricoSerasa.option('dataSource', dataR);

                }
            }

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
}

function CarregaListSerasaUsuario(clienteSelecionado, x) {
    clickAbaSerasa = true;
    loaPanel.show();
    function carregaListaSerasa() {

        GetAzureDataSource(42, `{ CD_CPF_CNPJ: ${clienteSelecionado.CD_PESQUISA} }`).then((result) => {
            if (!x) {

                if (credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario) {

                    novaConsultaAbaSerasa();

                } else {

                    ExibirEsconderPaineis('panelNovaConsultaSerasa', 'none');
                    document.getElementById("cardNovoUsuarioAbaSerasa").style.display = 'inline-block';
                }
            }

            if (result.success) {
                loaPanel.hide();
                let resultadoLista = result.data;

                //if (dataUsuarioLogado.NR_NIVEL_ACESSO == 1) {
                //    listHistoricoSerasa.option('dataSource', resultadoLista);

                //} else if (dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Crednet_Light && dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Recomenda) {
                //    listHistoricoSerasa.option('dataSource', resultadoLista);

                //} else if (dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Crednet_Light && !dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Recomenda) {
                //    //Filtrar só cred net
                //    resultadoLista = resultadoLista.filter(obj => obj.CD_TIPO_CONSULTA === "CL");

                //    listHistoricoSerasa.option('dataSource', resultadoLista);
                //} else if (!dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Crednet_Light && dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Recomenda) {
                //    //Filtrar só recomenda
                //    resultadoLista = resultadoLista.filter(obj => obj.CD_TIPO_CONSULTA === "RC");

                //    listHistoricoSerasa.option('dataSource', resultadoLista);
                //}

                if (dataUsuarioLogado.NR_NIVEL_ACESSO == 1) {
                    listHistoricoSerasa.option('dataSource', resultadoLista);

                } else if (dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Relatorio_Basico && dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Recomenda) {
                    listHistoricoSerasa.option('dataSource', resultadoLista);

                } else if (dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Relatorio_Basico && !dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Recomenda) {
                    //Filtrar só cred net
                    /*resultadoLista = resultadoLista.filter(obj => obj.CD_TIPO_CONSULTA === "CL");*/
                    resultadoLista = resultadoLista.filter(obj => obj.CD_TIPO_CONSULTA === "CL" || obj.CD_TIPO_CONSULTA === "RB");

                    listHistoricoSerasa.option('dataSource', resultadoLista);
                } else if (!dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Relatorio_Basico && dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Recomenda) {
                    //Filtrar só recomenda
                    resultadoLista = resultadoLista.filter(obj => obj.CD_TIPO_CONSULTA === "RC");

                    listHistoricoSerasa.option('dataSource', resultadoLista);
                }

                /*listHistoricoSerasa.option('dataSource', result.data);*/

                let nome = txt_Ds_Razao_Social.option('value');

                if (clienteSelecionado.CD_PESQUISA.length == 11) {
                    $("#txtCpfCnpjAbaSerasa2").text(`CPF: ${clienteSelecionado.CD_PESQUISA.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')}`);
                    $("#txtNomeAbaSerasa").text(`Nome: ${nome}`);

                } else if (clienteSelecionado.CD_PESQUISA.length == 14) {
                    $("#txtCpfCnpjAbaSerasa2").text(`CNPJ: ${clienteSelecionado.CD_PESQUISA.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')}`);
                    $("#txtNomeAbaSerasa").text(`Razão Social: ${nome}`);

                } else {
                    $("#txtCpfCnpjAbaSerasa2").text(`CPF/CNPJ: ${clienteSelecionado.CD_PESQUISA}`);
                    $("#txtNomeAbaSerasa").text(`Nome: ${nome}`);

                }

            }
            else {
                loaPanel.hide();
                DevExpress.ui.notify({
                    message: `${result.name}: ${result.error}`,
                    type: 'error',
                    displayTime: 5000,
                });
                console.error(`${result.name}: ${result.error}`);
            }
        });
    }

    if (dataUsuarioLogado.NR_NIVEL_ACESSO == 1) {
        carregaListaSerasa()

    } else if (dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Relatorio_Basico || dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Recomenda) {
        carregaListaSerasa()

    } else {
        popupAcessoNegado.show()
        loaPanel.hide();
    }


}

//SALAVA CONSULTA CLIENTE SERASA
function SalvaConsultaSerasaCliente(salvaConsulta) {
    let cpfCnpj = salvaConsulta.Cd_CPF_CNPJ;

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/SalvaConsultaSerasaCliente",
            data: {
                serasa: salvaConsulta

            },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                reject();

            }
        });

    }).then(function (response) {
        loaPanel.hide();
        CarregaHistoricoSerasa();
        console.log('SalvaConsultaSerasaCliente', response)

        if (response.result == "Erro") {

            new PNotify({
                title: 'Erro ao salvar a consulta cliente serasa!',
                text: response.Mensagem,
                type: 'error',
                width: "28%"
            });

        } else {

            if (!clickAbaConfGeraisSerasa) {
                CarregaListSerasaUsuario(clienteSelecionado, true)
                resultadoConsultaSerasaAba(response.serasa);

            } else {
                new Promise(function (resolve, reject) {

                    $.ajax({
                        type: 'POST',
                        url: '/CadastrosGerais/GetCliente',
                        data: {
                            cnpjCpf: cpfCnpj

                        },
                        success: function (response) {
                            resolve(response);

                        },
                        error: function (error) {
                            reject(error);

                        }
                    });

                }).then(function (response) {

                    if (!response.length == 0) {

                        ExibirEsconderPaineis('botaoCadastrarCliente', 'none');
                        $("#botaoImprimir").removeClass("ml-5").addClass("ml-5");
                    } else {

                        document.getElementById("botaoCadastrarCliente").style.display = 'inline-block';
                        $("#botaoImprimir").removeClass("ml-5");
                    }

                });

                testeResponseConsulta = response.serasa;
                resultadoConsultaSerasaGestao(response.serasa);
            }

            new PNotify({
                title: 'Consulta Serasa',
                text: 'Dados gravados com sucesso!',
                type: 'success',
                width: "20%"
            });

        }

    });
}

//PEGA OS DADOS DO CLIENTE CONSULTA SERASA PARA SALVAR
function GetClienteToInsertSerasa() {

    let cpfCnpjValue = txt_Cd_CPF_CNPJ_Cadastro_Serasa.option('value');
    let municipio = null;
    let cepValue = null;

    if (lkp_Ds_Municipio_Cadastro_Serasa.option('value') != null) {
        municipio = lkp_Ds_Municipio_Cadastro_Serasa.option('dataSource').filter(q => q.CD_MUNICIPIO == lkp_Ds_Municipio_Cadastro_Serasa.option('value'))[0];
    }

    cepValue = nbx_Cd_CEP_Cadastro_Serasa.option('value') ? String(nbx_Cd_CEP_Cadastro_Serasa.option('value')).padStart(8, '0') : null;

    var cliente = {
        EXEC: "INS",
        CD_STATUS: lkp_Status_Cliente.option('value'),
        CD_CPF_CNPJ: cpfCnpjValue,
        CD_TIPO_CPF_CNPJ: '',
        CD_INSCRICAO_ESTADUAL: '',
        DS_RAZAO_SOCIAL: '',
        DS_FANTASIA: '',
        CD_INSCRICAO_ESTADUAL: txt_Cd_IE_Cadastro_Serasa.option('value'),
        DS_CONTATO: txt_Ds_Contato_Cadastro_Serasa.option('value'),
        CD_DDD_TELEFONE: nbx_Cd_DDD_Telefone_Cadastro_Serasa.option('value'),
        DS_TELEFONE: txt_Ds_Telefone_Cadastro_Serasa.option('value'),
        DS_PROFISSAO: txt_Ds_Profissao_Cadastro_Serasa.option('value'),
        CD_RAMO_ATIVIDADE: lkp_Ramo_Atividade_Cadastro_Serasa.option('value'),
        CD_CLIENTE_ATUACAO: lkp_Atuacao_Cadastro_Serasa.option('value'),
        DS_CIDADE: municipio ? municipio.DS_MUNICIPIO : null,
        CD_UF: municipio ? municipio.CD_UF : null,
        CD_MUNICIPIO: municipio ? municipio.CD_MUNICIPIO : null,
        CD_CEP: cepValue,
        CD_REGIAO: lkp_Regiao_Cadastro_Serasa.option('value'),
        DS_ENDERECO: txt_Ds_Endereco_Cadastro_Serasa.option('value'),
        NR_ENDERECO: nbx_Nr_Endereco_Cadastro_Serasa.option('value'),
        DS_ENDERECO_COMPL: txt_Ds_Endereco_Compl_Cadastro_Serasa.option('value'),
        DS_BAIRRO: txt_Ds_Bairro_Cadastro_Serasa.option('value'),
        DS_PONTO_REFERENCIA: txt_Ds_Endereco_Referencia_Cadastro_Serasa.option('value'),
        DT_NASCIMENTO_ABERTURA: testeResponseConsulta.Dt_Nascimento_Abertura,
    };

    let cpfCnpjLength = cpfCnpjValue.length;
    switch (cpfCnpjLength) {
        case 11:
            cliente.CD_TIPO_CPF_CNPJ = 'F';
            cliente.CD_TIPO_ENDERECO = '1';
            cliente.DS_RAZAO_SOCIAL = txt_Ds_Nome_Cadastro_Serasa.option('value');
            cliente.DS_FANTASIA = cliente.DS_RAZAO_SOCIAL;
            break;
        case 14:
            cliente.CD_TIPO_CPF_CNPJ = 'J';
            cliente.CD_TIPO_ENDERECO = '2';
            cliente.DS_RAZAO_SOCIAL = txt_Ds_Razao_Social_Cadastro_Serasa.option('value');
            cliente.DS_FANTASIA = txt_Ds_Fantasia_Cadastro_Serasa.option('value');
            break;
        default:
            cliente.CD_TIPO_CPF_CNPJ = 'F';
            cliente.DS_RAZAO_SOCIAL = txt_Ds_Nome_Cadastro_Serasa.option('value');
            cliente.DS_FANTASIA = cliente.DS_RAZAO_SOCIAL;
            break;
    }

    return cliente;
}

//FECHAR CONSULTA SERASA
function fecharConsultaSerasa() {
    ExibirEsconderPaineis('consultaHistoricoSerasa', 'none');
    ExibirEsconderPaineis('cardSaibaMaisSerasa', 'none');
    ExibirEsconderPaineis('panelNovaConsultaSerasa', 'block');
    limparDiv('resultadoConsultaSerasa');
    listHistoricoSerasa.unselectAll()
}

//IMPRIMIR CONSULTA SERASA
function imprimirConsultaSerasa(x) {
    let content;

    if (x) {
        content = document.querySelector('#containerImpressao');
    } else {
        content = document.querySelector('#containerImpressaoAbaSerasa');
    }

    const options = {
        margin: x ? [0, 10, 10, 10] : [10, 10, 10, 10],
        filename: "consultaSerasa.pdf",
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        /*jsPDF: { unit: "mm", format: "letter", orientation: "landscape" },*/

    };

    html2pdf().set(options).from(content).save();
    /*html2pdf().from(content).save();*/

};

//RETORNO CONSULTA SERASA TELA PRINCIPAL
function resultadoConsultaSerasaGestao(x) {
    desabilitaTodosPanels();

    ExibirEsconderPaineis('cardResultadoConsultaSerasa', 'block');
    ExibirEsconderPaineis('resultadoConsultaSerasa', 'block');

    $("#resultadoConsultaSerasa").append(x.Ds_Retorno_HTML);
    $("#txtScore").text(x.Nr_Pontuacao);
    $("#txtChancePagamento").text(x.Pc_Chance_Pagamento);
    $("#txtNomeRazao").text(x.Ds_Nome);
    $("#txtDataNascimento").text(moment(x.Dt_Nascimento_Abertura).format('DD/MM/YYYY'));

    if (x.Cd_CPF_CNPJ.length == 14) {

        $("#txtCpfCnpj").text(x.Cd_CPF_CNPJ.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5'));
        $("#txtNascimentoAbertura").text('Data da Abertura');

    } else if (x.Cd_CPF_CNPJ.length == 11) {
        $("#txtCpfCnpj").text(x.Cd_CPF_CNPJ.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4'));
        $("#txtNascimentoAbertura").text('Data de Nascimento');

    } else {
        $("#txtCpfCnpj").text(x.Cd_CPF_CNPJ);
    }

    if (x.Cd_Tipo_Consulta == 'CL' || x.Cd_Tipo_Consulta == 'RB') {
        if (x.Lg_Restricao) {
            $("#testeCor").removeClass("bg-tertiary").addClass("bg-danger");
            $("#txtRestricao").text('COM RESTRIÇÃO');
        } else {
            $("#testeCor").removeClass("bg-danger").addClass("bg-tertiary");
            $("#txtRestricao").text('SEM RESTRIÇÃO');
        }

    } else if (x.Cd_Tipo_Consulta == 'RC') {

        if (x.Lg_Restricao) {
            $("#testeCor").removeClass("bg-tertiary").addClass("bg-danger");
            $("#txtRestricao").text('RECUSADO');
        } else {
            $("#testeCor").removeClass("bg-danger").addClass("bg-tertiary");
            $("#txtRestricao").text('APROVADO');
        }

    }
    if (x.Nr_Pontuacao > 0) {
        $("#rest").removeClass("col-lg-12").addClass("col-lg-4");
        ExibirEsconderPaineis('idScore', 'block');
    } else {
        $("#rest").removeClass("col-lg-4").addClass("col-lg-12");
        ExibirEsconderPaineis('idScore', 'none');
    }

}

function resultadoConsultaSerasaAba(x) {

    ExibirEsconderPaineis('cardFiltroModalidadeConsultaAbaSerasa', 'none');
    ExibirEsconderPaineis('cardNovoUsuarioAbaSerasa', 'none');
    limparDiv('resultadoConsultaAbaSerasa');

    $("#resultadoConsultaAbaSerasa").empty();

    ExibirEsconderPaineis('resultadoConsultaAbaSerasa', 'block');
    ExibirEsconderPaineis('panelNovaConsultaSerasa', 'none');
    ExibirEsconderPaineis('cardResultadoConsultaAbaSerasa', 'block');

    $("#resultadoConsultaAbaSerasa").append(x.Ds_Retorno_HTML);
    $(".card").css('padding', '0');
    $("#txtScoreAbaSerasa").text(x.Nr_Pontuacao);
    /*$("#txtChancePagamento").text(x.Pc_Chance_Pagamento);*/
    $("#txtNomeRazaoAbaSerasa").text(x.Ds_Nome);
    $("#txtDataNascimentoAbaSerasa").text(moment(x.Dt_Nascimento_Abertura).format('DD/MM/YYYY'));

    if (x.Cd_CPF_CNPJ.length == 14) {

        $("#txtCpfCnpjAbaSerasa").text(x.Cd_CPF_CNPJ.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5'));
        $("#txtNascimentoAberturaAbaSerasa").text('Data da Abertura');

    } else if (x.Cd_CPF_CNPJ.length == 11) {
        $("#txtCpfCnpjAbaSerasa").text(x.Cd_CPF_CNPJ.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4'));
        $("#txtNascimentoAberturaAbaSerasa").text('Data de Nascimento');

    } else {
        $("#txtCpfCnpjAbaSerasa").text(x.Cd_CPF_CNPJ);
    }

    if (x.Cd_Tipo_Consulta == 'CL' || x.Cd_Tipo_Consulta == 'RB') {
        if (x.Lg_Restricao) {
            $("#testeCorAbaSerasa").removeClass("bg-tertiary").addClass("bg-danger");
            $("#txtRestricaoAbaSerasa").text('COM RESTRIÇÃO');
        } else {
            $("#testeCorAbaSerasa").removeClass("bg-danger").addClass("bg-tertiary");
            $("#txtRestricaoAbaSerasa").text('SEM RESTRIÇÃO');
        }

    } else if (x.Cd_Tipo_Consulta == 'RC') {

        if (x.Lg_Restricao) {
            $("#testeCorAbaSerasa").removeClass("bg-tertiary").addClass("bg-danger");
            $("#txtRestricaoAbaSerasa").text('RECUSADO');
        } else {
            $("#testeCorAbaSerasa").removeClass("bg-danger").addClass("bg-tertiary");
            $("#txtRestricaoAbaSerasa").text('APROVADO');
        }

    }
    if (x.Nr_Pontuacao > 0) {
        $("#idScoreAbaSerasa").removeClass("col-lg-4").addClass("col-lg-3 ml-3 mr-1");
        $("#restAbaSerasa").removeClass("col-lg-12").addClass("col-lg-5 ml-3");
        /*$("#idScoreAbaSerasa").removeClass("col-lg-4").addClass("col-lg-4 ml-2");*/
        ExibirEsconderPaineis('idScoreAbaSerasa', 'block');

    } else {
        $("#restAbaSerasa").removeClass("col-lg-5 ml-3").addClass("col-lg-12");
        $("#idScoreAbaSerasa").removeClass("col-lg-3 ml-3 mr-1").addClass("col-lg-4");
        ExibirEsconderPaineis('idScoreAbaSerasa', 'none');
    }

}

function novaConsultaAbaSerasa() {
    ExibirEsconderPaineis('btnConcluirConsultaSerasa2', 'none');
    ExibirEsconderPaineis('cardFiltroModalidadeConsultaAbaSerasa', 'none');
    LimparTagBox();
    if (credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario) {

        ExibirEsconderPaineis('panelNovaConsultaSerasa', 'block');
        ExibirEsconderPaineis('cardNovoUsuarioAbaSerasa', 'none');

    } else {

        ExibirEsconderPaineis('panelNovaConsultaSerasa', 'none');
        document.getElementById("cardNovoUsuarioAbaSerasa").style.display = 'inline-block';

    }

    ExibirEsconderPaineis('panelSerasaCrednet2', 'none');
    ExibirEsconderPaineis('panelSerasaRecomenda2', 'none');
    ExibirEsconderPaineis('cardResultadoConsultaAbaSerasa', 'none');

    let nome = txt_Ds_Razao_Social.option('value');

    if (clienteSelecionado.CD_PESQUISA.length == 11) {
        $("#txtCpfCnpjAbaSerasa2").text(`CPF: ${clienteSelecionado.CD_PESQUISA.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')}`);
        $("#txtNomeAbaSerasa").text(`Nome: ${nome}`);

    } else if (clienteSelecionado.CD_PESQUISA.length == 14) {
        $("#txtCpfCnpjAbaSerasa2").text(`CNPJ: ${clienteSelecionado.CD_PESQUISA.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')}`);
        $("#txtNomeAbaSerasa").text(`Razão Social: ${nome}`);

    } else {
        $("#txtCpfCnpjAbaSerasa2").text(`CPF/CNPJ: ${clienteSelecionado.CD_PESQUISA}`);
        $("#txtNomeAbaSerasa").text(`Nome: ${nome}`);

    }
}
function novoUsuarioSerasa() {
    function iniciaConsulta() {

        if (credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario /*|| credenciaisSerasa.Cd_Integracao_Serasa_Usuario*/) {

            ExibirEsconderPaineis('panelNovaConsultaSerasa', 'none');
            ExibirEsconderPaineis('cardFiltroModalidadeConsultaAbaSerasa', 'block');

        } else {
            ExibirEsconderPaineis('cardFiltroModalidadeConsultaAbaSerasa', 'none');
            ExibirEsconderPaineis('panelNovaConsultaSerasa', 'none');
            document.getElementById("cardNovoUsuarioAbaSerasa").style.display = 'inline-block';
        }

    }

    if (dataUsuarioLogado.NR_NIVEL_ACESSO == 1) {
        iniciaConsulta()

    } else if (dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Relatorio_Basico || dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Recomenda) {
        iniciaConsulta()

    } else {
        popupAcessoNegado.show()
    }

}

function saibaMaisSerasa() {

    ExibirEsconderPaineis('cardCabecalho', 'block');
    ExibirEsconderPaineis('cardMenu', 'block');
    ExibirEsconderPaineis('cardSaibaMaisSerasa', 'block');
    ExibirEsconderPaineis('configuracoesGerais', 'none');
}

function novaConsultaSerasa() {
    ExibirEsconderPaineis('panelNovaConsultaSerasa', 'block');
    ExibirEsconderPaineis('consultaHistoricoSerasa', 'none');
    ExibirEsconderPaineis('cardNovoUsuarioSerasa', 'none');

    limparDiv('resultadoConsultaSerasa');
}

function carregar(pagina) {
    $("#resultadoConsultaSerasa").load(pagina);

}

function iniciaConsultaSerasa() {

    function iniciaConsulta() {
        if (credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario) {
            filtroConsultaSerasa();

        } else {
            desabilitaTodosPanels();

            ExibirEsconderPaineis('cardNovoUsuarioSerasa', 'block');
        }

    }

    if (dataUsuarioLogado.NR_NIVEL_ACESSO == 1) {
        iniciaConsulta()

    } else if (dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Relatorio_Basico || dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Recomenda) {
        iniciaConsulta()

    } else {
        popupAcessoNegado.show()
    }

}

function filtroConsultaSerasa() {
    desabilitaTodosPanels();

    ExibirEsconderPaineis('cardCabecalho', 'block');
    ExibirEsconderPaineis('cardMenu', 'block');
    ExibirEsconderPaineis('cardFiltroConsultaSerasa', 'block');
    limparDiv('resultadoConsultaSerasa');
}

function validarCPFCNPJ(cpfCnpj) {

    // Verifica se é CPF (11 dígitos)
    if (cpfCnpj.length === 11) {
        let sum = 0;
        let rest;

        if (cpfCnpj === '00000000000' ||
            cpfCnpj === '11111111111' ||
            cpfCnpj === '22222222222' ||
            cpfCnpj === '33333333333' ||
            cpfCnpj === '44444444444' ||
            cpfCnpj === '55555555555' ||
            cpfCnpj === '66666666666' ||
            cpfCnpj === '77777777777' ||
            cpfCnpj === '88888888888' ||
            cpfCnpj === '99999999999') {
            return false;
        }

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpfCnpj.substring(i - 1, i)) * (11 - i);
        }

        rest = (sum * 10) % 11;

        if ((rest === 10) || (rest === 11)) {
            rest = 0;
        }

        if (rest !== parseInt(cpfCnpj.substring(9, 10))) {
            return false;
        }

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpfCnpj.substring(i - 1, i)) * (12 - i);
        }

        rest = (sum * 10) % 11;

        if ((rest === 10) || (rest === 11)) {
            rest = 0;
        }

        if (rest !== parseInt(cpfCnpj.substring(10, 11))) {
            return false;
        }

        return true;
    }

    return false;
}

function filtroModalidadeConsultaSerasa() {

    const resultSerasa = DevExpress.validationEngine.validateGroup("Serasa");
    const cpfCnpj = cd_CPF_CNPJConsultaSerasa.option('value');

    if (resultSerasa.isValid) {

        if (cpfCnpj.length == 14 || cpfCnpj.length == 11) {
            /*const valido = validarCPFCNPJ(cpfCnpj);*/

            desabilitaTodosPanels();
            ExibirEsconderPaineis('cardCabecalho', 'block');
            ExibirEsconderPaineis('cardMenu', 'block');
            ExibirEsconderPaineis('cardFiltroModalidadeConsultaSerasa', 'block');
            ExibirEsconderPaineis('panelSerasaCrednet', 'none');
            ExibirEsconderPaineis('panelSerasaRecomenda', 'none');
            ExibirEsconderPaineis('btnConcluirConsultaSerasa', 'none');

        } else {

            DevExpress.ui.notify({
                message: 'Por favor, Digite um CNPJ ou CPF válido.',
                type: 'error',
                displayTime: 5000,
            });
        }

    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    }

}

function PopupServicoSerasa() {

    popupServicoSerasa = $('#popupServicoSerasa').dxPopup({
        maxWidth: 560,
        maxHeight: 510,
        showTitle: false,
        visible: true,
        hideOnOutsideClick: true,
        onHidden: function (e) {
            popupServicoSerasa.hide();
        },
        contentTemplate: () => {
            const scrollView = $('<div class="scrollable-content" style="min-height: 100px;" />');
            scrollView.append($(`<div id="textBlock" text-center" style="text-align: center;">
                <div class="modal-content mt-3">
                        <section class="card card-default ">
                            <header class="card-header ">
                                <h4 class="text-danger"><b>VOCÊ AINDA NÃO TEM ESTA MODALIDADE CONTRATADA!</b></h4>
                            </header>
                            <div class="card-body">
                                <div  class=" mb-0 mt-0">
                                     <div class="row mt-0 mb-0">
                                         <div class="col-lg-12 mb-0 mt-0 text-center">
                                             <img id="logoSerasa" src="/img/novo-usuario-serasa-saiba-mais.png" class="mt-0 mb-0" style="width: 100%; cursor: pointer;" onclick="saibaMaisSerasaPopup(); popupServicoSerasa.hide();">
                                         </div>
                                     </div>
                                 </div>
                            </div>
                            <footer class="card-footer text-center"> <!-- Adicionando a classe text-center aqui -->
                                <div class="row">
                                    <div class="col-lg-12">
                                        <button type="button" class="btn btn-xs btn-default" onclick=" popupServicoSerasa.hide();"><i class="fa fa-close mr-2"></i>Fechar</button>
                                        
                                    </div>
                                </div>
                            </footer>
                        </section>
                    </div>
                </div>`
            ));

            return scrollView;
        },

    }).dxPopup('instance');
}

function filtroCEPConsultaSerasaCredinet(x) {

    if (x) {

        ExibirEsconderPaineis('panelSerasaRecomenda', 'none');
        let juridicaFisica = cd_CPF_CNPJConsultaSerasa.option('value').length == 14 ? 'J' : 'F';

        if (credenciaisSerasa.Cd_Integracao_Serasa_Usuario) {

            tipoConsultaSerasaBasica = true;

            if (dataUsuarioLogado.NR_NIVEL_ACESSO == 1) {

                ExibirEsconderPaineis('panelSerasaCrednet', 'block');
                ExibirEsconderPaineis('btnConcluirConsultaSerasa', 'block');

                if (juridicaFisica == "J") {
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PF', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PJ', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasPF', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasPJ").style.display = 'inline-block';

                } else {
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PJ', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PF', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasPJ', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasPF").style.display = 'inline-block';
                }


            } else if (dataUsuarioLogado.NR_NIVEL_ACESSO == 0 && dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Relatorio_Basico) {

                ExibirEsconderPaineis('panelSerasaCrednet', 'block');
                ExibirEsconderPaineis('btnConcluirConsultaSerasa', 'block');

                if (juridicaFisica == "J") {
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PF', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PJ', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasPF', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasPJ").style.display = 'inline-block';

                } else {
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PJ', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PF', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasPJ', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasPF").style.display = 'inline-block';
                }

            } else {
                popupAcessoNegado.show();
            }

        } else {
            PopupServicoSerasa();
        }
    } else {

        ExibirEsconderPaineis('panelSerasaRecomenda2', 'none');
        let jF = clienteSelecionado.CD_PESQUISA.length == 14 ? 'J' : 'F';

        if (credenciaisSerasa.Cd_Integracao_Serasa_Usuario) {

            tipoConsultaSerasaBasica = true;

            if (dataUsuarioLogado.NR_NIVEL_ACESSO == 1) {

                ExibirEsconderPaineis('panelSerasaCrednet2', 'block');
                ExibirEsconderPaineis('btnConcluirConsultaSerasa2', 'block');

                if (jF == "J") {

                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PF2', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PJ2', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasPF2', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasPJ2").style.display = 'inline-block';
                } else {

                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PJ2', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PF2', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasPJ2', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasPF2").style.display = 'inline-block';
                }

            } else if (dataUsuarioLogado.NR_NIVEL_ACESSO == 0 && dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Relatorio_Basico) {

                ExibirEsconderPaineis('panelSerasaCrednet2', 'block');
                ExibirEsconderPaineis('btnConcluirConsultaSerasa2', 'block');

                if (jF == "J") {
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PF2', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PJ2', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasPF2', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasPJ2").style.display = 'inline-block';

                } else {
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PJ2', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Crednet_PF2', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasPF2', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasPJ2").style.display = 'inline-block';
                }

            } else {
                popupAcessoNegado.show();
            }

        } else {
            PopupServicoSerasa();
        }
    }

}

function filtroValorConsultaSerasaRecomenda(x) {

    if (x) {

        ExibirEsconderPaineis('panelSerasaCrednet', 'none');
        let juridicaFisica = cd_CPF_CNPJConsultaSerasa.option('value').length == 14 ? 'J' : 'F';

        if (credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario) {
            tipoConsultaSerasaBasica = false;

            if (dataUsuarioLogado.NR_NIVEL_ACESSO == 1) {

                ExibirEsconderPaineis('panelSerasaRecomenda', 'block');
                ExibirEsconderPaineis('btnConcluirConsultaSerasa', 'block');

                if (juridicaFisica == "J") {
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PF', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PJ', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasRecomendaPF', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasRecomendaPJ").style.display = 'inline-block';

                } else {
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PJ', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PF', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasRecomendaPJ', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasRecomendaPF").style.display = 'inline-block';
                }

            } else if (dataUsuarioLogado.NR_NIVEL_ACESSO == 0 && dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Recomenda) {

                ExibirEsconderPaineis('panelSerasaRecomenda', 'block');
                ExibirEsconderPaineis('btnConcluirConsultaSerasa', 'block');

                if (juridicaFisica == "J") {
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PF', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PJ', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasRecomendaPF', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasRecomendaPJ").style.display = 'inline-block';

                } else {
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PJ', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PF', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasRecomendaPJ', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasRecomendaPF").style.display = 'inline-block';
                }

            } else {
                popupAcessoNegado.show();
            }

        } else {
            PopupServicoSerasa();
        }

    } else {

        ExibirEsconderPaineis('panelSerasaCrednet2', 'none');

        let jF = clienteSelecionado.CD_PESQUISA.length == 14 ? 'J' : 'F';

        if (credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario) {
            tipoConsultaSerasaBasica = false;

            if (dataUsuarioLogado.NR_NIVEL_ACESSO == 1) {

                ExibirEsconderPaineis('panelSerasaRecomenda2', 'block');
                ExibirEsconderPaineis('btnConcluirConsultaSerasa2', 'block');

                if (jF == "J") {
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PF2', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PJ2', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasRecomendaPF2', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasRecomendaPJ2").style.display = 'inline-block';

                } else {
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PJ2', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PF2', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasRecomendaPJ2', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasRecomendaPF2").style.display = 'inline-block';
                }

            } else if (dataUsuarioLogado.NR_NIVEL_ACESSO == 0 && dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Recomenda) {

                ExibirEsconderPaineis('panelSerasaRecomenda2', 'block');
                ExibirEsconderPaineis('btnConcluirConsultaSerasa2', 'block');

                if (jF == "J") {
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PF2', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PJ2', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasRecomendaPF2', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasRecomendaPJ2").style.display = 'inline-block';

                } else {

                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PJ2', 'none');
                    ExibirEsconderPaineis('tag_Serasa_Agregados_Recomenda_PF2', 'block');

                    ExibirEsconderPaineis('linkEspecificacoesConsultasAgregadasRecomendaPJ2', 'none');
                    document.getElementById("linkEspecificacoesConsultasAgregadasRecomendaPF2").style.display = 'inline-block';
                }

            } else {
                popupAcessoNegado.show();
            }

        } else {
            PopupServicoSerasa();
        }

    }

}

//GRAVAR CREDENCIAL SERASA
function GravarCredenciaisSerasa(x, y) {

    let objCredenciais;

    if (x) {
        //if (!usuarioSerasaConfiguracoes.option('value')) {
        //    senhaSerasaConfiguracoes.option('value', null)
        //}
        if (!usuarioSerasaConfiguracoesRecomenda.option('value')) {
            senhaSerasaConfiguracoesRecomenda.option('value', null)
            senhaSerasaConfiguracoes.option('value', null)
            usuarioSerasaConfiguracoes.option('value', null)
        }
        objCredenciais = {
            Cd_Integracao_Serasa_Usuario: usuarioSerasaConfiguracoes.option('value'),
            Ds_Integracao_Serasa_Senha: senhaSerasaConfiguracoes.option('value'),
            Cd_Integracao_Serasa_Recomenda_Usuario: usuarioSerasaConfiguracoesRecomenda.option('value'),
            Ds_Integracao_Serasa_Recomenda_Senha: senhaSerasaConfiguracoesRecomenda.option('value')
        };

    } else if (!x && !y) {

        objCredenciais = {
            //Cd_Integracao_Serasa_Usuario: usuarioSerasa.option('value'),
            //Ds_Integracao_Serasa_Senha: senhaSerasaCadastrada.option('value'),
            Cd_Integracao_Serasa_Recomenda_Usuario: usuarioSerasaRecomenda.option('value'),
            Ds_Integracao_Serasa_Recomenda_Senha: senhaSerasaRecomenda.option('value')
        };
    } else if (!x && y) {

        objCredenciais = {
            //Cd_Integracao_Serasa_Usuario: usuarioAbaSerasa.option('value'),
            //Ds_Integracao_Serasa_Senha: senhaAbaSerasaCadastrada.option('value'),
            Cd_Integracao_Serasa_Recomenda_Usuario: usuarioAbaSerasaRecomenda.option('value'),
            Ds_Integracao_Serasa_Recomenda_Senha: senhaAbaSerasaRecomenda.option('value')
        };
    }

    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'POST',
            url: '/CadastrosGerais/GravarCredenciaisSerasa',
            data: objCredenciais,
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                reject(error);
            }
        });
    }).then(function (response) {
        if (response.result == "Erro") {
            new PNotify({
                title: 'Erro ao gravar as credencias Serasa',
                text: response.msg,
                type: 'error',
                width: "28%"
            });
        } else {
            new PNotify({
                title: 'Concluído',
                text: 'Credenciais gravadas com sucesso!',
                type: 'success'
            });

            CarregaCredenciaisSerasa(true);

            if (!x && !y) {
                filtroConsultaSerasa();

            }

        }
    }).catch(function (error) {

        new PNotify({
            title: 'Erro ao gravar as credencias Serasa',
            text: error,
            type: 'error',
            width: "28%"
        });
    });

}

function ValidaTipoConsulta(x) {
    clickAbaConfGeraisSerasa = x;
    const resultGeral = DevExpress.validationEngine.validateGroup("Recomenda");
    const resultGeral2 = DevExpress.validationEngine.validateGroup("Recomenda2");

    if (tipoConsultaSerasaBasica) {
        AbrirModal('#ModalAvisoConsultaSerasa');

    } else {

        if (x) {

            if (!tipoConsultaSerasaBasica && resultGeral.isValid) {
                AbrirModal('#ModalAvisoConsultaSerasa');

            } else {

                DevExpress.ui.notify({
                    message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
                    type: 'error',
                    displayTime: 5000,
                });
            }

        } else {

            if (!tipoConsultaSerasaBasica && resultGeral2.isValid) {
                AbrirModal('#ModalAvisoConsultaSerasa');

            } else {

                DevExpress.ui.notify({
                    message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
                    type: 'error',
                    displayTime: 5000,
                });
            }
        }

    }

}

function LimparTagBox() {
    tagSerasaAgregadosRecomendaPJ.option('value', '')
    tagSerasaAgregadosRecomendaPF.option('value', '')
    tagSerasaAgregadosCrednetPJ.option('value', '')
    tagSerasaAgregadosCrednetPF.option('value', '')

    tagSerasaAgregadosRecomendaPJ2.option('value', '')
    tagSerasaAgregadosRecomendaPF2.option('value', '')
    tagSerasaAgregadosCrednetPJ2.option('value', '')
    tagSerasaAgregadosCrednetPF2.option('value', '')
}
function ChamaAPIConsultaSerasa() {

    let cpfCnpj;
    /*let cep;*/
    let vlCredito;

    if (clickAbaConfGeraisSerasa) {
        cpfCnpj = cd_CPF_CNPJConsultaSerasa.option('value');
        /*cep = cdCEPSerasa.option('value') ? String(cdCEPSerasa.option('value')).padStart(8, '0') : null;*/
        vlCredito = vlCreditoSerasa.option('value');
    } else {

        cpfCnpj = clienteSelecionado.CD_PESQUISA;
        /*cep = cdCEPSerasa2.option('value') ? String(cdCEPSerasa2.option('value')).padStart(8, '0') : null;*/
        vlCredito = vlCreditoSerasa2.option('value');
    }

    let termo = chkTermoUsoSerasa.option('value');
    let juridicaFisica = cpfCnpj.length == 14 ? 'J' : 'F';
    let codigosAgregados;
    let descricaoAgregados;

    if (termo) {

        FecharModal('#ModalAvisoConsultaSerasa');
        chkTermoUsoSerasa.option('value', false);
        loaPanel.show();

        if (tipoConsultaSerasaBasica) {
            //CONSULTA CREDNET LIGHT
            if (juridicaFisica == "J") {
                codigosAgregados = clickAbaConfGeraisSerasa ? tagSerasaAgregadosCrednetPJ.option('value') : tagSerasaAgregadosCrednetPJ2.option('value');

                if (codigosAgregados && codigosAgregados.length > 0) {
                    descricaoAgregados = dataSourceSerasaAgregadoCredenetPJ
                        .filter(item => codigosAgregados.includes(item.CD_AGREGADO))
                        .map(item => item.DS_AGREGADO)
                        .join(" | ");

                    codigosAgregados = codigosAgregados.join("|")

                } else {
                    codigosAgregados = codigosAgregados = "";
                }
            } else {

                codigosAgregados = clickAbaConfGeraisSerasa ? tagSerasaAgregadosCrednetPF.option('value') : tagSerasaAgregadosCrednetPF2.option('value');

                if (codigosAgregados && codigosAgregados.length > 0) {
                    descricaoAgregados = dataSourceSerasaAgregadoCredenetPF
                        .filter(item => codigosAgregados.includes(item.CD_AGREGADO))
                        .map(item => item.DS_AGREGADO)
                        .join("|");

                    codigosAgregados = codigosAgregados.join("|")

                } else {
                    codigosAgregados = codigosAgregados = "";

                }
            }
            let objChamadaApi = {
                Login: credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario,
                /*Login: '464580',*/
                Password: credenciaisSerasa.Ds_Integracao_Serasa_Recomenda_Senha,
                /*Consulta: tipoConsultaSerasaBasica ? "CREDNET_LIGHT" : "RECOMENDA",*/
                Consulta: tipoConsultaSerasaBasica ? "BASICA" : "RECOMENDA",
                Tipo_Documento: juridicaFisica,
                Documento: cpfCnpj,
                Agregados: codigosAgregados,
                /*Cep: cep*/
            };
            new Promise(function (resolve, reject) {

                $.ajax({
                    type: 'POST',
                    url: '/CadastrosGerais/RealizarConsulta',
                    data: {
                        consultaRequest: JSON.stringify(objChamadaApi)

                    },
                    success: function (response) {
                        resolve(response);

                    },
                    error: function (error) {
                        reject(error);

                    }
                });
            }).then(function (response) {
                loaPanel.hide();
                console.log('Realizar Consulta Basica', response)

                if (!response.error) {

                    if (response.status.codigo == 0 && response.status.codigoResposta !== 4) {

                        const responseCopy = { ...response };
                        if (responseCopy.respostaHtml) {
                            delete responseCopy.respostaHtml;
                        }

                        let restricao;
                        const responseString = JSON.stringify(responseCopy);
                        testeRespostaHtml = response.respostaHtml;
                        let pontuacao = 0;

                        if (juridicaFisica === 'J' && response.resultado.quadrosDetalhe?.SERASA_SCORE_POSITIVO_EMPRESAS?.detalhe?.corpo[0]?.PONTUACAO) {
                            pontuacao = response.resultado.quadrosDetalhe.SERASA_SCORE_POSITIVO_EMPRESAS.detalhe.corpo[0].PONTUACAO.conteudoFormatado;
                        }


                        //if (juridicaFisica === 'F' && response.resultado.quadrosDetalhe && response.resultado.quadrosDetalhe.SERASA_SCORE
                        //    && response.resultado.quadrosDetalhe.SERASA_SCORE.detalhe) {
                        //    const scorePFPositivo = response.resultado.quadrosDetalhe.SERASA_SCORE.detalhe.corpo[0].PONTUACAO;
                        //    if (scorePFPositivo.conteudoFormatado) {
                        //        pontuacao = scorePFPositivo.conteudoFormatado;

                        //    }
                        //}

                        if (juridicaFisica === 'F' && response.resultado.quadrosDetalhe?.SERASA_SCORE_PF_COM_POSITIVO?.detalhe?.corpo?.[0]?.PONTUACAO?.conteudoFormatado) {
                            const scorePFPositivo = response.resultado.quadrosDetalhe.SERASA_SCORE_PF_COM_POSITIVO.detalhe.corpo[0].PONTUACAO;
                            pontuacao = scorePFPositivo.conteudoFormatado;
                        }


                        if (response.status.codigoResposta == 3) {
                            restricao = true;

                        } else if (response.status.codigoResposta == 1) {

                            restricao = false;
                        }

                        let dataString = response.resultado.quadrosDetalhe.CONFIRMEI.detalhe.corpo[0].DT_NASCIMENTO_FUNDACAO.conteudo;
                        let dataObj = new Date(
                            parseInt(dataString.substring(4, 8)),  
                            parseInt(dataString.substring(2, 4)) - 1,  
                            parseInt(dataString.substring(0, 2))  
                        );

                        let dataFormatada = dataObj.toISOString();

                        let salvaConsulta = {
                            Cd_CPF_CNPJ: cpfCnpj,
                            Nr_Pontuacao: pontuacao,
                            Lg_Restricao: restricao,
                            Ds_Retorno_JSON: responseString,
                            Ds_Retorno_HTML: testeRespostaHtml,
                            Ds_Codigos_Consultas_Agregados: codigosAgregados,
                            Ds_Consultas_Agregados: descricaoAgregados,
                            Ds_Nome: response.resultado.quadrosDetalhe.CONFIRMEI.detalhe.corpo[0].NOME_RAZAO_SOCIAL.conteudo,
                            /*Cd_Tipo_Consulta: tipoConsultaSerasaBasica ? "CL" : "RC",*/
                            Cd_Tipo_Consulta: tipoConsultaSerasaBasica ? "RB" : "RC",
                            Dt_Nascimento_Abertura: dataFormatada,
                        };

                        SalvaConsultaSerasaCliente(salvaConsulta)
                    } else {
                        loaPanel.hide();
                        new PNotify({
                            title: 'Erro ao realizar a consulta!',
                            text: response.status.descricaoCodigoResposta,
                            text: response.status.mensagem,
                            type: 'error',
                            width: "28%"
                        });
                    }

                } else {
                    loaPanel.hide();
                    new PNotify({
                        title: 'Erro ao realizar a consulta!',
                        text: response.error,
                        type: 'error',
                        width: "28%"
                    });
                }


            });

        } else {
            // CONSULTA RECOMENDA

            if (juridicaFisica == "J") {

                codigosAgregados = clickAbaConfGeraisSerasa ? tagSerasaAgregadosRecomendaPJ.option('value') : tagSerasaAgregadosRecomendaPJ2.option('value');

                if (codigosAgregados && codigosAgregados.length > 0) {
                    descricaoAgregados = dataSourceSerasaAgregadoRecomendaPJ
                        .filter(item => codigosAgregados.includes(item.CD_AGREGADO))
                        .map(item => item.DS_AGREGADO)
                        .join(" | ");

                    codigosAgregados = codigosAgregados.join("|")

                } else {
                    codigosAgregados = codigosAgregados = "";
                }
            } else {

                codigosAgregados = clickAbaConfGeraisSerasa ? tagSerasaAgregadosRecomendaPF.option('value') : tagSerasaAgregadosRecomendaPF2.option('value');

                if (codigosAgregados && codigosAgregados.length > 0) {
                    descricaoAgregados = dataSourceSerasaAgregadoRecomendaPF
                        .filter(item => codigosAgregados.includes(item.CD_AGREGADO))
                        .map(item => item.DS_AGREGADO)
                        .join("|");

                    codigosAgregados = codigosAgregados.join("|")

                } else {
                    codigosAgregados = codigosAgregados = "";

                }
            }
            let objChamadaApiRecomenda = {
                Login: credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario,
                Password: credenciaisSerasa.Ds_Integracao_Serasa_Recomenda_Senha,
                /*Consulta: tipoConsultaSerasaBasica ? "CREDNET_LIGHT" : "RECOMENDA",*/
                Consulta: tipoConsultaSerasaBasica ? "BASICA" : "RECOMENDA",
                Tipo_Documento: cpfCnpj.length == 14 ? "J" : 'F',
                Documento: cpfCnpj,
                Agregados: codigosAgregados,
                Valor: vlCredito,

            };
            /*console.log('objChamadaApiRecomenda', objChamadaApiRecomenda)*/
            new Promise(function (resolve, reject) {

                $.ajax({
                    type: 'POST',
                    url: '/CadastrosGerais/RealizarConsultaRecomenda',
                    data: {
                        consultaRequest: JSON.stringify(objChamadaApiRecomenda)

                    },
                    success: function (response) {
                        resolve(response);

                    },
                    error: function (error) {
                        reject(error);

                    }
                });

            }).then(function (response) {
                loaPanel.hide();
                console.log('Realizar Consulta recomenda', response)
                if (!response.error) {

                    if (response.status.codigo == 0 && response.status.codigoResposta !== 4) {

                        const responseCopy = { ...response };
                        if (responseCopy.respostaHtml) {
                            delete responseCopy.respostaHtml;
                        }

                        testeRespostaHtml = response.respostaHtml;
                        testeRespostaHtml = testeRespostaHtml.replace(/\\r/g, '').replace(/\\n/g, '').replace(/\\t/g, '').replace(/\\/g, '');

                        let restricao;
                        const responseString = JSON.stringify(responseCopy);

                        let pontuacao;
                        let razaoNome;
                        let dataFundacao;

                        if (response.resultado.quadrosDetalhe.Score.detalhe) {
                            pontuacao = response.resultado.quadrosDetalhe.Score.detalhe.corpo.PONTUACAO.conteudo;
                        } else {
                            pontuacao = 0;
                        }

                        if (juridicaFisica === 'J') {

                            dataFundacao = response.resultado.quadrosDetalhe.Identificacao.detalhe.corpo.FUNDACAO.conteudo;
                            razaoNome = response.resultado.quadrosDetalhe.Identificacao.detalhe.corpo.RAZAO_SOCIAL.conteudo;
                        } else {

                            dataFundacao = response.resultado.quadrosDetalhe.Identificacao.detalhe.corpo.DATA_NASCIMENTO.conteudo
                            razaoNome = response.resultado.quadrosDetalhe.Identificacao.detalhe.corpo.GRAFIA.conteudo;
                        }

                        let aprovacao = response.resultado.quadrosDetalhe.Recomendacao.detalhe.corpo.TIPO_RECOMENDACAO.conteudo;

                        if (aprovacao == 3) {
                            restricao = true;

                        } else if (aprovacao == 1) {
                            restricao = false;

                        }

                        let salvaConsulta = {
                            Cd_CPF_CNPJ: cpfCnpj,
                            Nr_Pontuacao: pontuacao,
                            Lg_Restricao: restricao,
                            Ds_Retorno_JSON: responseString,
                            Ds_Retorno_HTML: testeRespostaHtml,
                            Ds_Nome: razaoNome,
                            Ds_Codigos_Consultas_Agregados: codigosAgregados,
                            Ds_Consultas_Agregados: descricaoAgregados,
                            /*Cd_Tipo_Consulta: tipoConsultaSerasaBasica ? "CL" : "RC",*/
                            Cd_Tipo_Consulta: tipoConsultaSerasaBasica ? "RB" : "RC",
                            Dt_Nascimento_Abertura: dataFundacao,

                        };

                        SalvaConsultaSerasaCliente(salvaConsulta)

                    } else {
                        new PNotify({
                            title: 'Erro ao realizar a consulta!',
                            text: response.status.mensagem,

                            type: 'error',
                            width: "28%"
                        });
                    }

                } else {
                    new PNotify({
                        title: 'Erro ao realizar a consulta!',
                        text: response.error,
                        type: 'error',
                        width: "28%"
                    });
                }


            });

        }

    } else {

        new PNotify({
            title: 'Termo de uso!',
            text: 'Para realizar a consulta leia o aviso e clique no check box, em seguida clique em concordo!',
            type: 'alert',
            width: "28%"
        });

    }

};

function AlteraSenhaCrednet(x) {

    var painelCrednet = document.getElementById('alteraSenhaPefin');
    var painelRecomenda = document.getElementById('alteraSenhaRecomenda');

    if (x) {
        ExibirEsconderPaineis('alteraSenhaRecomenda', 'none');

        if (credenciaisSerasa.Cd_Integracao_Serasa_Usuario) {


            if (painelCrednet.style.display === 'none') {
                ExibirEsconderPaineis('alteraSenhaPefin', 'block');
                if (painelRecomenda.style.display === 'block') {
                    ExibirEsconderPaineis('alteraSenhaRecomenda', 'none');
                }
            } else {
                ExibirEsconderPaineis('alteraSenhaPefin', 'none');
            }
        } else {
            ExibirEsconderPaineis('alteraSenhaPefin', 'none');
            new PNotify({
                title: 'Não é possível alterar senha!',
                text: 'Para alterar a senha precisar ter essa credencial cadastrada',
                type: 'alert',
                width: "28%"
            });
        }

    } else {
        ExibirEsconderPaineis('alteraSenhaPefin', 'none');

        if (credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario) {


            if (painelRecomenda.style.display === 'none') {
                ExibirEsconderPaineis('alteraSenhaRecomenda', 'block');

                if (painelCrednet.style.display === 'block') {
                    ExibirEsconderPaineis('alteraSenhaPefin', 'none');
                }
            } else {
                ExibirEsconderPaineis('alteraSenhaRecomenda', 'none');
            }

        } else {
            ExibirEsconderPaineis('alteraSenhaRecomenda', 'none');

            new PNotify({
                title: 'Não é possível alterar senha!',
                text: 'Para alterar a senha precisar ter essa credencial cadastrada',
                type: 'alert',
                width: "28%"
            });
        }

    }

}

function AlteraSenhaSerasa(x) {

    let objAlteraSenha;
    let objCredenciais;

    const enviarAlteracaoSenha = function () {
        new Promise(function (resolve, reject) {

            $.ajax({
                type: 'POST',
                url: '/CadastrosGerais/AlteraSenhaSerasa',
                data: {
                    consultaRequest: JSON.stringify(objAlteraSenha)

                },
                success: function (response) {
                    resolve(response);

                    // Faça algo com a resposta
                },
                error: function (error) {
                    reject(error);

                    // Lidar com erros
                }
            });

        }).then(function (response) {
           
            if (response.status.codigo == 0) {
                new PNotify({
                    title: 'Sucesso!',
                    /*text: response.status.mensagem,*/
                    type: 'success',
                    width: "28%"
                });
                gravarAlteracaoSenha()

            } else {

                new PNotify({
                    title: 'Erro ao alterar a senha!',
                    text: response.status.mensagem,
                    type: 'error',
                    width: "28%"
                });
            }
        });
    };

    const gravarAlteracaoSenha = function () {
        new Promise(function (resolve, reject) {

            $.ajax({
                type: 'POST',
                url: '/CadastrosGerais/GravarCredenciaisSerasa',
                data: objCredenciais,
                success: function (response) {
                    resolve(response);
                },
                error: function (error) {
                    reject(error);
                }
            });

        }).then(function (response) {

            if (response.result == "Erro") {

                new PNotify({
                    title: 'Erro ao alterar a senha Serasa no nosso banco de dados!',
                    text: response.msg,
                    type: 'error',
                    width: "28%"
                });

            } else {

                new PNotify({
                    title: 'Senha alterada com sucesso!',
                    type: 'success',
                    width: "28%"
                });

                CarregaCredenciaisSerasa(false);

                cpfTrocaSenhaPefin.option('value', null)
                passwordSerasaTrocaSenhaPefin.option('value', null)
                novaSenhaPefin.option('value', null)
                confirmaNovaSenhaPefin.option('value', null)

                cpfTrocaSenhaRecomenda.option('value', null)
                passwordSerasaTrocaSenhaRecomenda.option('value', null)
                novaSenhaRecomenda.option('value', null)
                confirmaNovaSenhaRecomenda.option('value', null)

                ExibirEsconderPaineis('alteraSenhaPefin', 'none');
                ExibirEsconderPaineis('alteraSenhaRecomenda', 'none');
            }

        });
    };

    //const resultSerasaRecomenda = DevExpress.validationEngine.validateGroup("TrocaSenhaSerasaRecomenda");

    //if (resultSerasaRecomenda.isValid) {

    //    if (novaSenhaRecomenda.option('value') == confirmaNovaSenhaRecomenda.option('value')) {

    //        objAlteraSenha = {
    //            Cpf_Solicitante: cpfTrocaSenhaRecomenda.option('value'),
    //            Login: credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario,
    //            Password: passwordSerasaTrocaSenhaRecomenda.option('value'),
    //            Nova_Senha: novaSenhaRecomenda.option('value'),
    //            Confirmar_Nova_Senha: confirmaNovaSenhaRecomenda.option('value'),
    //            Alteracao_Senha_Serasa: x,
    //        };

    //        objCredenciais = {
    //            Cd_Integracao_Serasa_Usuario: credenciaisSerasa.Cd_Integracao_Serasa_Usuario,
    //            Ds_Integracao_Serasa_Senha: credenciaisSerasa.Ds_Integracao_Serasa_Senha,
    //            Cd_Integracao_Serasa_Recomenda_Usuario: credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario,
    //            Ds_Integracao_Serasa_Recomenda_Senha: novaSenhaRecomenda.option('value')
    //        };

    //        enviarAlteracaoSenha()

    //    } else {

    //        new PNotify({
    //            title: 'Senhas diferentes!',
    //            text: 'Os campos, Nova senha Serasa e Confirma nova senha.',
    //            type: 'alert',
    //            width: "28%"
    //        });
    //    }

    //} else {

    //    DevExpress.ui.notify({
    //        message: 'Por favor, verifique o preenchimento dos campos obrigatórios. A senha deve conter no mínimo 6 caracteres.',
    //        type: 'error',
    //        displayTime: 5000,
    //    });
    //}

    if (x) {

        const resultSerasa = DevExpress.validationEngine.validateGroup("TrocaSenhaSerasa");

        if (resultSerasa.isValid) {

            if (novaSenhaPefin.option('value') == confirmaNovaSenhaPefin.option('value')) {
                objAlteraSenha = {

                    Cpf_Solicitante: cpfTrocaSenhaPefin.option('value'),
                    Login: credenciaisSerasa.Cd_Integracao_Serasa_Usuario,
                    Password: passwordSerasaTrocaSenhaPefin.option('value'),
                    Nova_Senha: novaSenhaPefin.option('value'),
                    Confirmar_Nova_Senha: confirmaNovaSenhaPefin.option('value'),
                    Alteracao_Senha_Serasa: x,

                };

                objCredenciais = {
                    Cd_Integracao_Serasa_Usuario: credenciaisSerasa.Cd_Integracao_Serasa_Usuario,
                    Ds_Integracao_Serasa_Senha: novaSenhaPefin.option('value'),
                    Cd_Integracao_Serasa_Recomenda_Usuario: credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario,
                    Ds_Integracao_Serasa_Recomenda_Senha: credenciaisSerasa.Ds_Integracao_Serasa_Recomenda_Senha
                };

                enviarAlteracaoSenha()

            } else {

                new PNotify({
                    title: 'Senhas diferentes!',
                    text: 'Os campos, Nova senha CrednetLight e Confirma nova senha crednet Light precisam ser iguais.',
                    type: 'alert',
                    width: "28%"
                });
            }

        } else {


            DevExpress.ui.notify({
                message: 'Por favor, verifique o preenchimento dos campos obrigatórios. A senha deve conter no mínimo 6 caracteres.',
                type: 'error',
                displayTime: 5000,
            });
        }

    } else {

        const resultSerasaRecomenda = DevExpress.validationEngine.validateGroup("TrocaSenhaSerasaRecomenda");

        if (resultSerasaRecomenda.isValid) {

            if (novaSenhaRecomenda.option('value') == confirmaNovaSenhaRecomenda.option('value')) {

                objAlteraSenha = {
                    Cpf_Solicitante: cpfTrocaSenhaRecomenda.option('value'),
                    Login: credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario,
                    Password: passwordSerasaTrocaSenhaRecomenda.option('value'),
                    Nova_Senha: novaSenhaRecomenda.option('value'),
                    Confirmar_Nova_Senha: confirmaNovaSenhaRecomenda.option('value'),
                    Alteracao_Senha_Serasa: x,
                };

                objCredenciais = {
                    Cd_Integracao_Serasa_Usuario: credenciaisSerasa.Cd_Integracao_Serasa_Usuario,
                    Ds_Integracao_Serasa_Senha: credenciaisSerasa.Ds_Integracao_Serasa_Senha,
                    Cd_Integracao_Serasa_Recomenda_Usuario: credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario,
                    Ds_Integracao_Serasa_Recomenda_Senha: novaSenhaRecomenda.option('value')
                };

                enviarAlteracaoSenha()

            } else {

                new PNotify({
                    title: 'Senhas diferentes!',
                    text: 'Os campos, Nova senha Serasa Recomenda e Confirma nova senha Recomenda.',
                    type: 'alert',
                    width: "28%"
                });
            }

        } else {

            DevExpress.ui.notify({
                message: 'Por favor, verifique o preenchimento dos campos obrigatórios. A senha deve conter no mínimo 6 caracteres.',
                type: 'error',
                displayTime: 5000,
            });
        }

    }

}

function LimparCampos() {

    txt_Ds_Endereco_Cadastro_Serasa.option('value', null);
    nbx_Nr_Endereco_Cadastro_Serasa.option('value', null);
    txt_Ds_Endereco_Compl_Cadastro_Serasa.option('value', null);
    txt_Ds_Endereco_Referencia_Cadastro_Serasa.option('value', null);
    txt_Ds_Bairro_Cadastro_Serasa.option('value', null);
    nbx_Cd_CEP_Cadastro_Serasa.option('value', null);
    lkp_Ds_Municipio_Cadastro_Serasa.option('value', null);
    lkp_Regiao_Cadastro_Serasa.option('value', null);
}

function CarregaHtmlSerasa(x, y) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: '/CadastrosGerais/CarregaHtmlSerasa',
            data: {
                nrConsulta: x

            },
            success: function (response) {
                resolve(response);

                // Faça algo com a resposta
            },
            error: function (error) {
                reject(error);

                // Lidar com erros
            }
        });

    }).then(function (response) {
        console.log('CarregaHtmlSerasa', response)

        testeResponseConsulta = response[0];
        if (testeResponseConsulta.Cd_Tipo_Consulta == "CL" || testeResponseConsulta.Cd_Tipo_Consulta == 'RB') {
            tipoConsultaSerasaBasica = true;
        } else {
            tipoConsultaSerasaBasica = false;
        }
        if (y) {
            resultadoConsultaSerasaGestao(response[0]);

        } else {

            resultadoConsultaSerasaAba(response[0])

        }

        const responseObject = JSON.parse(testeResponseConsulta.Ds_Retorno_JSON);

    });
}

function IniciaCadastroClienteSerasa() {

    const responseObject = JSON.parse(testeResponseConsulta.Ds_Retorno_JSON);

    //PREENCHER OS CAMPOS COM OS DADOS QUE VEM DA CONSULTA SERASA

    txt_Cd_CPF_CNPJ_Cadastro_Serasa.option('value', testeResponseConsulta.Cd_CPF_CNPJ) //PASSAR VALOR CNPJ/CPF DA CONSULTA
    txt_Ds_Nome_Cadastro_Serasa.option('value', testeResponseConsulta.Ds_Nome) //PASSAR VALOR NOME DA CONSULTA
    txt_Ds_Razao_Social_Cadastro_Serasa.option('value', testeResponseConsulta.Ds_Nome) //PASSAR VALOR RAZÃO SOCIAL DA CONSULTA
    txt_Ds_Fantasia_Cadastro_Serasa.option('value', testeResponseConsulta.Ds_Nome) //PASSAR VALOR NOME FANTASIA DA CONSULTA
    txt_Ds_Contato_Cadastro_Serasa.option('value', testeResponseConsulta.Ds_Nome)
    console.log('responseObject', responseObject)

    if (tipoConsultaSerasaBasica) {

        if (testeResponseConsulta.Cd_CPF_CNPJ.length === 11) {
            if (responseObject.resultado.quadrosDetalhe?.LOCALIZADOR_ENDERECO_PF?.detalhe?.corpo[0]?.CEP?.conteudo) {
                nbx_Cd_CEP_Cadastro_Serasa.option('value', responseObject.resultado.quadrosDetalhe.LOCALIZADOR_ENDERECO_PF.detalhe.corpo[0].CEP.conteudo); // PASSAR VALOR CEP DA CONSULTA
            }

        } else {
            if (responseObject.resultado.quadrosDetalhe?.ENDERECOS_ALTERNATIVOS?.detalhe?.corpo[0]?.CEP?.conteudo) {
                nbx_Cd_CEP_Cadastro_Serasa.option('value', responseObject.resultado.quadrosDetalhe.ENDERECOS_ALTERNATIVOS.detalhe.corpo[0].CEP.conteudo); // PASSAR VALOR CEP DA CONSULTA
            }

            if (responseObject.resultado.quadrosDetalhe?.ENDERECOS_ALTERNATIVOS?.detalhe?.corpo[0]?.NUMERO?.conteudo) {
                nbx_Nr_Endereco_Cadastro_Serasa.option('value', responseObject.resultado.quadrosDetalhe.ENDERECOS_ALTERNATIVOS.detalhe.corpo[0].NUMERO.conteudo); // PASSAR VALOR NUMERO DA CONSULTA
            }
        }

    }

    //if (tipoConsultaSerasaBasica) {
    //    /*nbx_Cd_CEP_Cadastro_Serasa.option('value', responseObject.resultado.quadrosDetalhe.CAMPOS_ADICIONAIS.detalhe.corpo[0].CEP.conteudo) //PASSAR VALOR CEP DA CONSULTA*/
    //    nbx_Cd_CEP_Cadastro_Serasa.option('value', responseObject.resultado.quadrosDetalhe.ENDERECOS_ALTERNATIVOS.detalhe.corpo[0].CEP.conteudo) //PASSAR VALOR CEP DA CONSULTA
    //    txt_Ds_Bairro_Cadastro_Serasa.option('value') //PASSAR VALOR BAIRRO DA CONSULTA
    //    txt_Ds_Endereco_Cadastro_Serasa.option('value') //PASSAR VALOR ENDEREÇO DA CONSULTA
    //    /*nbx_Nr_Endereco_Cadastro_Serasa.option('value') //PASSAR VALOR NUMERO DA CONSULTA*/
    //    nbx_Nr_Endereco_Cadastro_Serasa.option('value', responseObject.resultado.quadrosDetalhe.ENDERECOS_ALTERNATIVOS.detalhe.corpo[0].NUMERO.conteudo) //PASSAR VALOR NUMERO DA CONSULTA
    //    lkp_Ds_Municipio_Cadastro_Serasa.option('value') //PASSAR VALOR CODIGO MUNICIPIO DA CONSULTA
    //    txt_Ds_Endereco_Compl_Cadastro_Serasa.option('value') //PASSAR VALOR COMPLEMENTO DA CONSULTA
    //    txt_Ds_Endereco_Referencia_Cadastro_Serasa.option('value') //PASSAR VALOR PONTO DE REFERENCIA DA CONSULTA

    //} else if (testeResponseConsulta.Cd_CPF_CNPJ.length == 11) {
    //    nbx_Cd_CEP_Cadastro_Serasa.option('value', responseObject.resultado.quadrosDetalhe.Endereco.detalhe.corpo.CEP.conteudo)

    //}

    retornaMenuPrincipal();
    AbrirModal('#ModalCadastroClienteConsultaSerasa');

}

function SalvarClienteConsultaSerasa() {

    //VALIDAÇÕES PARÂMETROS GERAIS
    let profissao = false;
    let enderecoObg = false;
    let endereco = false;
    let ieRg = false;
    const resultGeral = DevExpress.validationEngine.validateGroup("CadastroClienteSerasa");

    if (resultGeral.isValid) {

        if (paransGeral.Lg_Obriga_Profissao_Cadastro_Cliente) {

            if (txt_Ds_Profissao_Cadastro_Serasa.option('value')) {

                profissao = true;

            } else {
                profissao = false;

                new PNotify({
                    title: 'Profissão é Obrigatório!',
                    text: 'O parâmetro que obriga profissão no cadastro do cliente está ativado, preencha o campo profissão para salvar!',
                    type: 'alert',
                    width: "40%"
                });

            }

        } else {

            profissao = true;
        }

        if (txt_Cd_CPF_CNPJ_Cadastro_Serasa.option('value').length == 14) { // É CNPJ

            if (!paransGeral.Lg_Valida_IE_Cliente && !paransGeral.Lg_Obriga_IE_Cliente) {
                ieRg = true;

            } else {

                if (txt_Cd_IE_Cadastro_Serasa.option('value') && paransGeral.Lg_Valida_IE_Cliente) {
                    //VALIDA IE AQUI
                    ieRg = true;

                } else if (txt_Cd_IE_Cadastro_Serasa.option('value') && paransGeral.Lg_Obriga_IE_Cliente) {
                    ieRg = true;

                } else {

                    new PNotify({
                        title: 'Inscrição Estadual é Obrigatório!',
                        text: 'O parâmetro que obriga IE no cadastro do cliente está ativado, preencha o campo IE para salvar!',
                        type: 'alert',
                        width: "40%"
                    });

                    ieRg = false;
                }
            }

        } else if (txt_Cd_CPF_CNPJ_Cadastro_Serasa.option('value').length == 11) { // É CPF

            if (!paransGeral.Lg_Obriga_RG_Cliente) {
                ieRg = true;

            } else {

                if (txt_Cd_IE_Cadastro_Serasa.option('value') && paransGeral.Lg_Obriga_RG_Cliente) {

                    ieRg = true;
                } else {

                    new PNotify({
                        title: 'RG é Obrigatório!',
                        text: 'O parâmetro que obriga RG no cadastro do cliente está ativado, preencha o campo RG para salvar!',
                        type: 'alert',
                        width: "40%"
                    });
                    ieRg = false;
                }
            }


        } else {

            ieRg = true;
        }

        if (paransGeral.Lg_Obriga_Endereco_Cliente) {
            endereco = true;

            if (lkp_Ds_Municipio_Cadastro_Serasa.option('value') && nbx_Cd_CEP_Cadastro_Serasa.option('value') && txt_Ds_Bairro_Cadastro_Serasa.option('value')
                && nbx_Nr_Endereco_Cadastro_Serasa.option('value') && txt_Ds_Endereco_Cadastro_Serasa.option('value')) {

                enderecoObg = true;
            } else {

                new PNotify({
                    title: 'Endereço é Obrigatório!',
                    text: 'Verifique os campos cidade, cep, bairro, número e endereço esses campos são obrigatórios!',
                    type: 'alert',
                    width: "40%"
                });
                enderecoObg = false;
            }
        } else {
            endereco = false;

            var municipio = lkp_Ds_Municipio_Cadastro_Serasa.option('value');
            var cep = nbx_Cd_CEP_Cadastro_Serasa.option('value');
            var bairro = txt_Ds_Bairro_Cadastro_Serasa.option('value');
            var numero = nbx_Nr_Endereco_Cadastro_Serasa.option('value');
            var endere = txt_Ds_Endereco_Cadastro_Serasa.option('value');

            if (municipio && cep && bairro && numero && endere) {

                endereco = true;
                enderecoObg = true;

            } else if (!municipio && !cep && !bairro && !numero && !endere) {

                endereco = true;
                enderecoObg = true;

            } else {

                PopupAvisoEndereco();
                endereco = false;

            }

        }

        if (endereco) {

            if (profissao && enderecoObg && ieRg) {

                loaPanel.show();
                SaveCliente(GetClienteToInsertSerasa())
                    .then((result) => {

                        loaPanel.hide();

                        if (result.success) {

                            DevExpress.ui.notify({
                                message: 'Dados gravados com sucesso!',
                                type: 'success',
                                displayTime: 3000,
                            });
                            CarregaHistoricoSerasa();
                            AbrirModal('#ModalCadastroClienteConsultaSerasaSucesso');
                            FecharModal('#ModalCadastroClienteConsultaSerasa');
                            LimparCamposTxt();
                        }
                        else {
                            DevExpress.ui.notify({
                                message: result.error,
                                type: 'error',
                                displayTime: 8000,
                            });
                        }

                    });

            }
        }


    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    }

}

let editRowKey = null;
function CarregaClientesNegativar(x) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/CarregaClientesNegativar",
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {
        
        const modifiedResponse = response.map(item => {
            if (item.VL_DIVIDA === 0) {
                item.VL_DIVIDA = null;
            }
            return item;
        });
        
        gridNegativaClienteSerasa.option('dataSource', modifiedResponse);

        let maxItem = modifiedResponse.reduce((prev, current) => {
            return (prev.NR_SEQUENCIA > current.NR_SEQUENCIA) ? prev : current;
        });

        if (x) {
            editRowKey = {
                NR_SEQUENCIA: maxItem.NR_SEQUENCIA,
                CD_CPF_CNPJ: maxItem.CD_CPF_CNPJ
            };
        } else {
            editRowKey = null;
        }
        
    });
}

function CarregaMotivoClienteNegativar() {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/CarregaMotivoClienteNegativar",
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {

        if (dataUsuarioLogado.NR_NIVEL_ACESSO == 1) {
            CarregaClientesNegativar();

        } else if (dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Negativacao) {
            CarregaClientesNegativar();

        } else {

            ExibirEsconderPaineis('grid_Negativa_Cliente_Serasa', 'none');
            new PNotify({
                title: 'Não tem permissão para consultar Negativados!',
                text: 'Esse usuário não tem permissão para consultar negativados!',
                type: 'alert',
                width: "28%"
            });
        }


        dataSourceNegativarInclusao = response.filter(item => item.Cd_Tipo === 'I');
        dataSourceNegativarExclusao = response.filter(item => item.Cd_Tipo === 'E');

    });
}

function PopupNegativarCliente() {
    /*loaPanel.show();*/
    CarregaLkpCliente();


    popupNegativaCliente = $('#popupNegativaCliente').dxPopup({
        maxWidth: 600,
        maxHeight: 360,
        showTitle: false,
        visible: true,
        hideOnOutsideClick: true,
        onHidden: function (e) {
            popupNegativaCliente.hide();
        },
        contentTemplate: () => {
            const scrollView = $('<div class="scrollable-content" style="min-height: 100px;" />');
            scrollView.append($(`<div id="textBlock" text-center" style="text-align: center;">
                <div class="modal-content mt-3">
                        <section class="card card-default ">
                            <header class="card-header ">
                                <h4 class="text-danger"><b>NEGATIVAR CLIENTE</b></h4>
                            </header>
                            <div class="card-body">

                                <div class="modal-wrapper">
                                    <div class="modal-text ">
                                        <h4>
                                            Selecione o cliente no campo abaixo.
                                        </h4>
                                        <h4>
                                            O cliente precisa estar cadastrado no sistema para Negativação.
                                        </h4>
                                        
                                    </div>
                            </div>
                            <div class="col-lg-12 ml-0 mb-2 mt-0 text-left">
                                        <div id="lkp_Cliente_Pesquisa_Negativar" class="text-left"></div>
                            </div>
                            </div>
                            <footer class="card-footer text-center"> <!-- Adicionando a classe text-center aqui -->
                                <div class="row">
                                    <div class="col-lg-12">
                                        <button type="button" class="btn btn-xs btn-danger" onclick="popupNegativaCliente.hide();"><i class="fa fa-close mr-2"></i>Abortar</button>
                                        <button type="button" class="btn btn-xs btn-success" onclick="InserirNegativado(); popupNegativaCliente.hide();"><i class="fa fa-check mr-2"></i>Incluir Negativação</button>
                                        
                                    </div>
                                </div>
                            </footer>
                        </section>
                    </div>
                </div>`
            ));

            return scrollView;
        },

    }).dxPopup('instance');

    lkpClientePesquisaNegativar = $('#lkp_Cliente_Pesquisa_Negativar').dxLookup({
        searchExpr: ['DS_PESQUISA'],
        displayExpr: 'DS_PESQUISA',
        valueExpr: 'CD_PESQUISA',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Clientes',
        },
        
        placeholder: 'Pesquisar um Cliente para negativar',
        showClearButton: true,
        onValueChanged: function (e) {
            clienteSelecionadoNegativar = e.component.option('selectedItem');
        },

    }).dxLookup('instance');

}

function PopupBaixaNegativacaoCliente(data) {

    popupBaixaNegativaCliente = $('#popupBaixaNegativaCliente').dxPopup({
        maxWidth: 650,
        maxHeight: 360,
        showTitle: false,
        visible: true,
        hideOnOutsideClick: true,
        onHidden: function (e) {
            popupBaixaNegativaCliente.hide();
        },
        contentTemplate: () => {
            const scrollView = $('<div class="scrollable-content" style="min-height: 100px;" />');
            scrollView.append($(`<div id="textBlock" text-center" style="text-align: center;">
                <div class="modal-content mt-2">
                        <section class="card card-default ">
                            <header class="card-header ">
                                <h4 class="text-danger"><b>BAIXAR NEGATIVAÇÃO DO CLIENTE</b></h4>
                            </header>
                            <div class="modal-text mt-3">
                                <h4>
                                    CPF/CNPJ: ${data.CD_CPF_CNPJ}. 
                                </h4>
                                <h4>
                                    Nome/Razão Social: ${data.DS_NOME}.
                                </h4>
                            </div>
                            <hr class="dotted short mt-1 mb-1">
                            <div class="col-lg-12 mb-2">

                            <div class="row mt-1 mb-2">
                                <div class="col-lg-4 mb-0">
                                    <div id="txt_CPF_Usuario_Exclusao" class="mb-1"></div>
                                </div>

                                <div class="col-lg-8 mb-0">
                                    <div id="lkp_Motivo_Exclusao_Sequencia" class="mb-0"></div>
                                </div>

                                <div class="col-lg-4 mb-0">
                                    <div id="dt_Exclusao" class="mb-0"></div>
                                </div>

                                <div class="col-lg-8 mb-0">
                                    <div id="txt_Obs_Exclusao_Negada" class="mb-0"></div>
                                </div>

                                <div class="col-lg-12 mb-0">
                                    <div id="txt_Obs_Exclusao" class="mb-0"></div>
                                </div>
                                
                            </div>

	                        </div>
                            <footer class="card-footer text-center"> <!-- Adicionando a classe text-center aqui -->
                                <div class="row">
                                    <div class="col-lg-12">
                                        <button type="button" class="btn btn-xs btn-danger" onclick="popupBaixaNegativaCliente.hide();"><i class="fa fa-close mr-2"></i>Abortar</button>
                                        <button type="button" class="btn btn-xs btn-success" onclick='BaixaNegativado(${JSON.stringify(data)}); '><i class="fa fa-check mr-2"></i>Baixar Negativação</button>
                                        
                                    </div>
                                </div>
                            </footer>
                            </div>
                            
                        </section>
                    </div>
                </div>`
            ));

            return scrollView;
        },

    }).dxPopup('instance');

    txt_CPF_Usuario_Exclusao = $('#txt_CPF_Usuario_Exclusao').dxTextBox({
        labelMode: 'floating',
        label: 'CPF Usuário Baixa',
        mask: '000.000.000-00',
        maxLength: 11,
        showClearButton: true,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'CPF é Obrigatório', }], validationGroup: 'baixaNegativado' }).dxTextBox('instance');

    lkp_Motivo_Exclusao_Sequencia = $('#lkp_Motivo_Exclusao_Sequencia').dxLookup({
        dataSource: dataSourceNegativarExclusao,
        searchExpr: ['Ds_Motivo_Serasa'],
        displayExpr: 'Ds_Motivo_Serasa',
        valueExpr: 'Nr_Sequencia',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Motivo Exclusão',
        },
        labelMode: 'floating',
        label: 'Motivo Exclusão',
        placeholder: '',
        showClearButton: true,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Motivo Exclusão é Obrigatório', }], validationGroup: 'baixaNegativado' }).dxLookup('instance');

    dt_Exclusao = $('#dt_Exclusao').dxDateBox({
        labelMode: 'floating',
        label: 'Data Exclusão',
        placeholder: '',
        //maxLength: 11,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        value: Date(),
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Data Exclusão é Obrigatório', }], validationGroup: 'baixaNegativado' }).dxDateBox('instance');

    txt_Obs_Exclusao_Negada = $('#txt_Obs_Exclusao_Negada').dxTextBox({
        labelMode: 'floating',
        label: 'Motivo Exclusão Negada',
        showClearButton: false,
        readOnly: true,
    }).dxTextBox('instance');

    txt_Obs_Exclusao = $('#txt_Obs_Exclusao').dxTextBox({
        labelMode: 'floating',
        label: 'Observação Exclusão (Baixa)',
        /*maxLength: 11,*/
        showClearButton: false,
    }).dxTextBox('instance');
}

function BaixaNegativado(data) {
    const result = DevExpress.validationEngine.validateGroup("baixaNegativado");

    if (result.isValid) {

        let motivoSerasa = dataSourceNegativarExclusao.filter(item => item.Nr_Sequencia === lkp_Motivo_Exclusao_Sequencia.option('value'))[0].Cd_Motivo_Serasa;
        const originalDate = new Date(dt_Exclusao.option('value')); 
        
        let objChamadaApiExclusao = {
            Login: credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario,
            Password: credenciaisSerasa.Ds_Integracao_Serasa_Senha,
            Seu_Cpf: txt_CPF_Usuario_Exclusao.option('value'),
            Identificador_Principal: data.CD_NEGATIVACAO_SERASA,
            Motivo_Baixa: motivoSerasa,

        };

        new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                url: '/CadastrosGerais/NegativarClienteExclusão',
                data: {
                    consultaRequest: JSON.stringify(objChamadaApiExclusao)
                },
                success: function (response) {
                    resolve(response);
                },
                error: function (error) {
                    reject(error);
                }
            });
        }).then(function (response) {

            const status = response.status;
            const isValidResponse = (status && status.codigo === 0) ||
                (Array.isArray(status) && status[0] && status[0].codigo === 0);

            let mensagem = '';
            if (status && status.mensagem) {
                mensagem = status.mensagem;
            } else if (Array.isArray(status) && status[0] && status[0].mensagem) {
                mensagem = status[0].mensagem;
            }

            if (isValidResponse) {

                new PNotify({
                    title: 'Sucesso!',
                    text: mensagem,
                    type: 'success',
                    width: '28%'
                });

                data.CD_CPF_USUARIO_EXCLUSAO = txt_CPF_Usuario_Exclusao.option('value');
                data.CD_MOTIVO_EXCLUSAO_SEQUENCIA = lkp_Motivo_Exclusao_Sequencia.option('value');
                data.DS_OBS_EXCLUSAO = txt_Obs_Exclusao.option('value');
                data.DS_MOTIVO_EXCLUSAO_NEGADA = txt_Obs_Exclusao_Negada.option('value');
                data.DT_EXCLUSAO = originalDate;
                data.CD_SITUACAO = 3;
                data.LG_NEGATIVADO = data.LG_NEGATIVADO == "Sim" ? 1 : 0;

                popupBaixaNegativaCliente.hide();
                UpdateNegativaCliente(data);

            } else {
                txt_Obs_Exclusao_Negada.option('value', mensagem);

                data.CD_CPF_USUARIO_EXCLUSAO = null;
                data.CD_MOTIVO_EXCLUSAO_SEQUENCIA = null;
                data.DS_OBS_EXCLUSAO = null;
                data.DS_MOTIVO_EXCLUSAO_NEGADA = mensagem;
                data.DT_EXCLUSAO = null;
                data.CD_SITUACAO = 2;
                data.LG_NEGATIVADO = data.LG_NEGATIVADO == "Sim" ? 1 : 0;
                UpdateNegativaCliente(data);

                new PNotify({
                    title: 'Erro ao concluir a operação!',
                    text: mensagem,
                    type: 'error',
                    width: '28%'
                });
            }

        }).catch(function (error) {
            /*console.error('Erro ao negativar cliente:', error);*/
        });

    }

}

function InserirNegativado() {

    var x = clienteSelecionadoNegativar.CD_PESQUISA;
    var y;

    return new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/CarregaCliente",
            data: { cnpjCpf: x },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {

        GetAzureDataSource(7, ` { CD_CPF_CNPJ: "${x}"}`).then((result) => {

            if (result.success) {
                
                y = result.data.length == 0 ? null : result.data[0];

                let objInsertNegativacao = {
                    CD_EMPRESA: null,
                    CD_CPF_CNPJ: response[0].CD_CPF_CNPJ,
                    CD_NEGATIVACAO_SERASA: null,
                    CD_SITUACAO: 1,
                    LG_NEGATIVADO: 0,
                    DT_INCLUSAO: null,
                    CD_LOGIN_INCLUSAO: null,
                    CD_TIPO_PESSOA: response[0].CD_CPF_CNPJ == 11 ? 'F' : 'J',
                    CD_CPF_USUARIO_INCLUSAO: null,
                    CD_CPF_USUARIO_EXCLUSAO: null,
                    CD_RG: null,
                    DS_NOME: response[0].DS_RAZAO_SOCIAL,
                    CD_SEXO: null,
                    DT_NASCIMENTO: response[0].DT_NASCIMENTO_ABERTURA,
                    LG_ENVIA_SMS: null,
                    CD_CELULAR: response[0].NR_WHATSAPP ?
                        (response[0].CD_DDD_WHATSAPP ? response[0].CD_DDD_WHATSAPP.toString() + response[0].NR_WHATSAPP.toString() : response[0].NR_WHATSAPP.toString()) : null,
                    CD_TELEFONE: response[0].DS_TELEFONE ?
                        (response[0].CD_DDD_TELEFONE ? response[0].CD_DDD_TELEFONE.toString() + response[0].DS_TELEFONE.toString() : response[0].DS_TELEFONE.toString()) : null,
                    CD_CEP: y && y.CD_CEP ? y.CD_CEP : null,
                    DS_ENDERECO: y && y.DS_ENDERECO ? (y.NR_ENDERECO ? y.DS_ENDERECO + ' ' + y.NR_ENDERECO : y.DS_ENDERECO) : null,
                    DS_ENDERECO_COMPLEMENTO: y && y.DS_ENDERECO_COMPL ? y.DS_ENDERECO_COMPL : null,
                    DS_BAIRRO: y && y.DS_BAIRRO ? y.DS_BAIRRO : null,
                    DS_CIDADE: y && y.DS_CIDADE ? y.DS_CIDADE : null,
                    CD_UF: y && y.CD_UF ? y.CD_UF : null,
                    DT_DIVIDA: null,
                    VL_DIVIDA: null,
                    CD_MOTIVO_INCLUSAO_SEQUENCIA: null,
                    DS_OBS_INCLUSAO: null,
                    NR_CONTRATO: null,
                    CD_NUMERO_CONTROLE_ADICIONAL: null,
                    CD_NOSSO_NUMERO: null,
                    CD_ALINEA_CHEQUE_DEVOLVIDO: null,
                    CD_CHEQUE_CMC7: null,
                    DT_EXCLUSAO: null,
                    CD_LOGIN_EXCLUSAO: null,
                    CD_MOTIVO_EXCLUSAO_SEQUENCIA: null,
                    DS_OBS_EXCLUSAO: null,
                    DS_MOTIVO_INCLUSAO_NEGADA: null,
                    DS_MOTIVO_EXCLUSAO_NEGADA: null
                };
                
                GravarNegativaCliente(objInsertNegativacao)
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

    })

    function GravarNegativaCliente(objInsertNegativacao) {
        new Promise(function (resolve, reject) {

            $.ajax({
                type: 'POST',
                url: "/CadastrosGerais/InsertClienteNegativar",
                data: { cliente: JSON.stringify(objInsertNegativacao) },
                success: function (response) {
                    resolve(response);

                },
                error: function () {
                    // Rejeita a Promise em caso de erro
                    reject();
                }
            });

        }).then(function (response) {

            CarregaClientesNegativar(true);

            new PNotify({
                title: 'Sucesso!',
                text: 'Alterações Concluídas com sucesso!',
                type: 'success',
                width: '28%'
            });

        });
    }

}

function UpdateNegativaCliente(objUpdateNegativacao) {
    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/UpdateNegativaCliente",
            data: { cliente: JSON.stringify(objUpdateNegativacao) },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {
        CarregaClientesNegativar();

    });
};

function LimparCamposTxt() {
    txt_Cd_CPF_CNPJ_Cadastro_Serasa.option('value', null)
    txt_Cd_IE_Cadastro_Serasa.option('value', null)
    txt_Ds_Contato_Cadastro_Serasa.option('value', null)
    nbx_Cd_DDD_Telefone_Cadastro_Serasa.option('value', '000')
    txt_Ds_Telefone_Cadastro_Serasa.option('value', null)
    txt_Ds_Profissao_Cadastro_Serasa.option('value', null)
    lkp_Regiao_Cadastro_Serasa.option('value', null)
    txt_Ds_Endereco_Cadastro_Serasa.option('value', null)
    nbx_Nr_Endereco_Cadastro_Serasa.option('value', null)
    txt_Ds_Endereco_Compl_Cadastro_Serasa.option('value', null)
    txt_Ds_Bairro_Cadastro_Serasa.option('value', null)
    txt_Ds_Endereco_Referencia_Cadastro_Serasa.option('value', null)
    txt_Ds_Nome_Cadastro_Serasa.option('value', null)
    txt_Ds_Razao_Social_Cadastro_Serasa.option('value', null)
    txt_Ds_Fantasia_Cadastro_Serasa.option('value', null)
}

function saibaMaisSerasaPopup() {

    desabilitaTodosPanels();

    ExibirEsconderPaineis('cardCabecalho', 'block');
    ExibirEsconderPaineis('cardMenu', 'block');
    ExibirEsconderPaineis('cardSaibaMaisSerasa', 'block');
}

////////***FIM DAS FUNÇÕES SERASA***////////

function CarregaCompradoresAutorizados(clienteSelecionado) {
    let cdCpfCnpj = `"${clienteSelecionado.CD_PESQUISA}"`
    clickAbaCompradores = true;

    GetAzureDataSource(15, `{ CD_CPF_CNPJ: ${cdCpfCnpj} }`).then((result) => {

        if (result.success) {
            gridCompradoresAutorizados.option('dataSource', result.data);

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
}
function applyFormatting(e) {
    if (e.value.length == 11) {
        e.component.option('mask', '000.000.000-00');
        e.component.option('label', 'CPF');
    } else if (e.value.length == 14) {
        e.component.option('mask', '00.000.000/0000-00');
        e.component.option('label', 'CNPJ');
    } else {
        e.component.option('mask', '00000000000000');
        e.component.option('label', 'CPF/CNPJ (somente números)');
    }
}

function limparHTML(html) {
    // Remover caracteres especiais e não alfanuméricos
    let htmlLimpo = html.replace(/[\t\n\r;^]/g, '');

    return htmlLimpo;
}

function limparDiv(div) {
    let alvo = document.getElementById(div);

    // Remove todos os descendentes da <div id="alvo">
    alvo.innerText = '';
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

function iniciaConfiguracoesGerais() {
    desabilitaTodosPanels();

    ExibirEsconderPaineis('cardCabecalho', 'block');
    ExibirEsconderPaineis('cardMenu', 'block');
    ExibirEsconderPaineis('configuracoesGerais', 'block');
}

function iniciaConfiguracoesUsuario() {
    desabilitaTodosPanels();

    ExibirEsconderPaineis('cardCabecalho', 'block');
    ExibirEsconderPaineis('cardMenu', 'block');
    ExibirEsconderPaineis('configuracoesUsuario', 'block');
}

function retornaMenuPrincipal() {
    desabilitaTodosPanels();
    closeConsultaClientesPanel()
    ExibirEsconderPaineis('cardCabecalho', 'block');
    ExibirEsconderPaineis('cardMenu', 'block');
    limparDiv('resultadoConsultaSerasa');

}

function desabilitaTodosPanels() {
    ExibirEsconderPaineis('cardCadastroCliente', 'none');
    ExibirEsconderPaineis('consultaClientes', 'none');
    ExibirEsconderPaineis('cardCabecalho', 'none');
    ExibirEsconderPaineis('cardMenu', 'none');
    ExibirEsconderPaineis('cardNovoUsuarioSerasa', 'none');
    ExibirEsconderPaineis('cardFiltroConsultaSerasa', 'none');
    ExibirEsconderPaineis('cardFiltroModalidadeConsultaSerasa', 'none');
    ExibirEsconderPaineis('cardResultadoConsultaSerasa', 'none');
    ExibirEsconderPaineis('resultadoConsultaSerasa', 'none');
    ExibirEsconderPaineis('configuracoesGerais', 'none');
    ExibirEsconderPaineis('configuracoesUsuario', 'none');
    ExibirEsconderPaineis('cardSaibaMaisSerasa', 'none');
    ExibirEsconderPaineis('cardCadastroClientesEmConstrucao', 'none');

}

function openconsultaClientesPanel() {
    CarregaClientesDetalhadoGrid('A')
    const pageWidth = document.documentElement.scrollWidth;

    if (pageWidth > 1600) {
        $("#principalClientes").removeClass("col-lg-12").addClass("col-lg-9");
        $("#consultaClientes").removeClass("col-lg-12").addClass("col-lg-3");
        $("#consultaClientes").removeClass("panelconsultaClientesLateral").addClass("panelconsultaClientesLateral");

        document.getElementById("divBtnExpandirFecharConsulta").style.display = 'block';
        document.getElementById("divBtnFecharConsulta").style.display = 'none';

        document.getElementById("consultaClientes").style.display = 'block';

        ajustaLayoutGrids();
    }
    else {
        expandirconsultaClientesPanel();
    }

}

function expandirconsultaClientesPanel() {
    $("#consultaClientes").removeClass("col-lg-3").addClass("col-lg-12");
    $("#consultaClientes").removeClass("panelconsultaClientesLateral");

    document.getElementById("cadastroClientes").style.display = 'none';

    document.getElementById("divBtnExpandirFecharConsulta").style.display = 'none';
    document.getElementById("divBtnFecharConsulta").style.display = 'block';

    document.getElementById("consultaClientes").style.display = 'block';

    ajustaLayoutGrids();
}

function closeConsultaClientesPanel() {
    $("#principalClientes").removeClass("col-lg-9").addClass("col-lg-12");

    document.getElementById("consultaClientes").style.display = 'none';
    document.getElementById("cadastroClientes").style.display = 'block';

    ajustaLayoutGrids();
}

function iniciarConversaWhatsApp(celular, contato) {

    if (contato == undefined || contato == null || contato == '') {
        contato = '';
    } else {
        contato = contato + '.';
    }

    var texto = 'Olá, ' + contato + '\n';
    texto = window.encodeURIComponent(texto);

    window.open("https://api.whatsapp.com/send?phone=" + celular + "&text=" + texto, "_blank");
}

function AbrirModal(e) {
    $(e).modal('toggle');
}

function FecharModal(e) {
    $(e).modal('hide');
}

function rolar_para(elemento) {
    $('html, body').animate({ scrollTop: $(elemento).offset().top }, 1300);
    /* $('html, body').animate({ scrollTop: $(elemento).offset().top }, 600);*/
    //window.scrollTo(0, document.body.scrollHeight);
}

function configuraModals() {
    const pageWidth = document.documentElement.scrollWidth;
    const pageHeight = window.innerHeight;

    const heightScrollReajusteAbortado = pageHeight - 200;

    //Modal Manutenção de Grupos de Acesso
    /*document.getElementById("scrollReajusteAbortado").style.height = heightScrollReajusteAbortado + "px";*/
};

function ajustaLayoutGrids() {
    /* $('#grid_Enderecos_Cliente').dxDataGrid("instance").updateDimensions();*/
    /*$('#grid_Conta_Corrente_Cliente').dxDataGrid("instance").updateDimensions();*/
    gridconsultaClientes.updateDimensions();

};

//FUNÇÕES ABA PRESSIFICAÇÃO
function CarregaFormaPagamento() {

    GetAzureDataSource(17, '{ CD_STATUS: "A" }').then((result) => {

        if (result.success) {

            dataSourceFormaPagamento = result.data;

            gridDescontoFamiliasCliente.option('columns[4]lookup.dataSource', dataSourceFormaPagamento);
            gridDescontoProdutosCliente.option('columns[16]lookup.dataSource', dataSourceFormaPagamento);
            gridPrecoFixoProdutosCliente.option('columns[17]lookup.dataSource', dataSourceFormaPagamento);
            lkpAlterarFormaPrecoFixo.option('dataSource', dataSourceFormaPagamento);
            tagDefinirFormaDescontoProdutos.option('dataSource', dataSourceFormaPagamento);
            lkpAlterarFormaDescontoProduto.option('dataSource', dataSourceFormaPagamento);
            tagDefinirFormaDescontoFamilias.option('dataSource', dataSourceFormaPagamento);
            lkpAlterarFormaDescontoFamilias.option('dataSource', dataSourceFormaPagamento);

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
}

function habilitaDescontoDiferenciado(pPanel) {

    CarregaFormaPagamento()

    clickAbaPressificacao = pPanel
    if (pPanel == 'panelDescontoForma') {
        loaPanel.show();
        CarregaDescontoForma();

    } else if (pPanel == 'panelDescontoFamilia') {
        loaPanel.show();
        CarregaDescontoFamilia();

    } else if (pPanel == 'panelDescontoProduto') {
        loaPanel.show();
        CarregaDescontoProduto();

    } else if (pPanel == 'panelPrecoFixoProduto') {
        loaPanel.show();
        CarregaDescontoPrecoFixo();

    }
    document.getElementById("panelDescontoForma").style.display = 'none';
    document.getElementById("panelDescontoFamilia").style.display = 'none';
    document.getElementById("panelDescontoProduto").style.display = 'none';
    document.getElementById("panelPrecoFixoProduto").style.display = 'none';
    document.getElementById("panelMenuPrecificacao").style.display = 'block';
    document.getElementById("panelMenuPrecificacaoFechado").style.display = 'none';

    if (pPanel) {
        document.getElementById(pPanel).style.display = 'block';
    }

};
function CarregaDescontoForma() {
    let cdCpfCnpj = `"${clienteSelecionado.CD_PESQUISA}"`

    GetAzureDataSource(23, `{ CD_CPF_CNPJ: ${cdCpfCnpj} }`).then((result) => {
        loaPanel.hide();

        if (result.success) {
            gridDescontoFormaPagamentoCliente.option('dataSource', result.data);
            gridDescontoFormaPagamentoCliente.selectRows(null);

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
}

function CarregaDescontoFamilia() {
    let cdCpfCnpj = `"${clienteSelecionado.CD_PESQUISA}"`

    GetAzureDataSource(21, `{ CD_CPF_CNPJ: ${cdCpfCnpj} }`).then((result) => {


        if (result.success) {
            gridDescontoFamiliasCliente.option('dataSource', result.data);
            gridDescontoFamiliasCliente.selectRows(null);

            CarregaFamiliaDesconto()
            dataSourceGridDescFamilia = result.data;
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
}

function ValidarDescontoFamilia(x) {
    let listagrid = dataSourceGridDescFamilia;
    const listaClienteFamiliaAdicionar = [];

    let modalDescFamilia = tagDefinirFormaDescontoFamilias.option('value');
    modalDescFamilia = (modalDescFamilia === null || (Array.isArray(modalDescFamilia) && modalDescFamilia.length === 0)) ? [] : modalDescFamilia;

    const adicionarItem = (item, cdFormaPagamento) => {
        const novoItem = {
            CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
            CD_FAMILIA: item.CD_FAMILIA,
            CD_FORMA_PAGAMENTO: cdFormaPagamento,
            PC_ACRESCIMO: item.PC_ACRESCIMO,
            PC_DESCONTO: item.PC_DESCONTO
        };
        listaClienteFamiliaAdicionar.push(novoItem);
    };

    const processarItens = (item) => {
        if (item.CD_FORMA_PAGAMENTO === undefined) {
            modalDescFamilia.forEach(cdFormaPagamento => {
                adicionarItem(item, cdFormaPagamento);
            });
        } else {
            listaClienteFamiliaAdicionar.push(item);
        }
    };

    const verificarDeletarSalvar = () => {
        const listaDeleteFamilia = listaClienteFamiliaAdicionar.filter(itemAtualizado =>
            listagrid.some(itemGrid =>
                itemAtualizado.CD_FAMILIA === itemGrid.CD_FAMILIA &&
                itemAtualizado.CD_FORMA_PAGAMENTO === itemGrid.CD_FORMA_PAGAMENTO
            )
        );

        if (listaDeleteFamilia.length > 0) {
            DeletaDescontoFamilia(listaDeleteFamilia, listaClienteFamiliaAdicionar);
        } else {
            SalvarDescontoFamilia(listaClienteFamiliaAdicionar);
        }
    };

    if (x) {
        listaDescontoFamilia.forEach(processarItens);
        verificarDeletarSalvar();

    } else if (!x && modalDescFamilia.length > 0) {
        listaDescontoFamilia.forEach(processarItens);
        verificarDeletarSalvar();

    } else {
        new PNotify({
            title: 'Forma de pagamento não selecionada!',
            text: 'Selecione ao menos uma forma de pagamento para adicionar as famílias!',
            type: 'alert',
            width: "28%"
        });
    }
}

function ValidarExcluirDescontoFamilia(x) {

    if (x) {

        if (itemSelecionadoGridDescFamilia.length > 0) {
            AbrirModal('#ModalConfirmacaoExclusaoFamiliasDesconto');

        } else {

            new PNotify({
                title: 'Família não selecionada!',
                text: 'Nenhuma Família foi selecionada, selecione ao menos uma Família para excluir',
                type: 'alert',
                width: "28%"
            });

        }

    } else {

        DeletaDescontoFamilia(itemSelecionadoGridDescFamilia, null, true)
    }

}

function SalvarDescontoFamilia(listaClienteFamiliaAdicionar) {

    let requests = listaClienteFamiliaAdicionar.map(cliente => () => new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/SalvarDescontoFamilia",
            data: { cliente: JSON.stringify(cliente) },
            success: resolve,
            error: (xhr, status, error) => reject(error)
        });
    }));

    function limitarExecucoes(arrayDePromises, limite) {
        let index = 0;
        let executando = 0;

        function proxima(resolve, reject) {
            while (executando < limite && index < arrayDePromises.length) {
                executando++;
                const i = index++;
                arrayDePromises[i]()
                    .catch(erro => `Erro: ${erro}`)
                    .finally(() => {
                        executando--;
                        proxima(resolve, reject);
                    });
            }

            if (executando === 0) {
                resolve();
            }
        }

        return proxima;
    }

    let limitador = limitarExecucoes(requests, 5);

    return new Promise((resolve, reject) => {
        limitador(resolve, reject);
    }).then(() => {

        $("#gridBoxFamiliasDescontos").dxDropDownBox("instance").close();
        $("#gridBoxFamiliasDescontos").dxDropDownBox("instance").option("value", null);

        CarregaDescontoFamilia();
        CarregaFamiliaDesconto();
        tagDefinirFormaDescontoFamilias.option('value', null);
        FecharModal('#ModalDefinirFormaDescontoFamilias');

        listaClienteFamiliaAdicionar = [];
        listaDescontoFamilia = [];

        new PNotify({
            title: 'Alteração!',
            text: 'Alterações Concluídas com sucesso!',
            type: 'success',
            width: '28%'
        });
    }).catch(erro => {
        new PNotify({
            title: 'Ocorreu um erro ao limpar descontos e acréscimos!',
            text: erro,
            type: 'error',
            width: "50%"
        });
    });
}

function DeletaDescontoFamilia(listaDeleteFamilia, listaClienteFamiliaAdicionar, x) {

    if (x) {

        const listaNova = listaDeleteFamilia.map(item => ({
            CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
            CD_FAMILIA: item.CD_FAMILIA,
            CD_FORMA_PAGAMENTO: item.CD_FORMA_PAGAMENTO,
            CD_EMPRESA: null
        }));

        listaDeleteFamilia = listaNova;
    }

    let requests = listaDeleteFamilia.map(cliente => () => new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/DeletaDescontoFamilia",
            data: { cliente: JSON.stringify(cliente) },
            success: resolve,
            error: (xhr, status, error) => reject(error)
        });
    }));

    function limitarExecucoes(arrayDePromises, limite) {
        let index = 0;
        let executando = 0;

        function proxima(resolve, reject) {
            while (executando < limite && index < arrayDePromises.length) {
                executando++;
                const i = index++;
                arrayDePromises[i]()
                    .catch(erro => `Erro: ${erro}`)
                    .finally(() => {
                        executando--;
                        proxima(resolve, reject);
                    });
            }

            if (executando === 0) {
                resolve();
            }
        }

        return proxima;
    }

    let limitador = limitarExecucoes(requests, 5);

    return new Promise((resolve, reject) => {
        limitador(resolve, reject);
    }).then(() => {
        listaDeleteFamilia = [];
        if (x) {
            CarregaDescontoFamilia();

            new PNotify({
                title: 'Sucesso!',
                text: 'Famílias excluídas com sucesso!',
                type: 'success',
                width: '28%'
            });

        } else {
            SalvarDescontoFamilia(listaClienteFamiliaAdicionar);
        }

    }).catch(erro => {
        new PNotify({
            title: 'Ocorreu um erro ao limpar descontos e acréscimos!',
            text: erro,
            type: 'error',
            width: "50%"
        });
    });
}

function AlterarDescAcrescimoFamilia(x) {

    let listAlteraFamilia;
    let pcDesconto = nbxPcAlteracaoDescontoFamiliasCliente.option('value');
    let pcAcrescimo = nbxPcAlteracaoAcrescimoFamiliasCliente.option('value');

    if (x) {
        const result = DevExpress.validationEngine.validateGroup("AlterarDescontoFamilias");

        if (result.isValid) {

            listAlteraFamilia = itemSelecionadoGridDescFamilia.map(item => ({
                CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                CD_FAMILIA: item.CD_FAMILIA,
                CD_FORMA_PAGAMENTO: item.CD_FORMA_PAGAMENTO,
                PC_ACRESCIMO: '0',
                PC_DESCONTO: pcDesconto * 100,
                CD_EMPRESA: null,
                DT_CADASTRO: null,
                CD_LOGIN: null
            }));
            aplicarAlteracaoDescontoFamilias(listAlteraFamilia)


        } else {

            DevExpress.ui.notify({
                message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
                type: 'error',
                displayTime: 5000,
            });
        };


    } else {

        const resultAcrescimo = DevExpress.validationEngine.validateGroup("AlterarAcrescimoFamilias");

        if (resultAcrescimo.isValid) {

            listAlteraFamilia = itemSelecionadoGridDescFamilia.map(item => ({
                CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                CD_FAMILIA: item.CD_FAMILIA,
                CD_FORMA_PAGAMENTO: item.CD_FORMA_PAGAMENTO,
                PC_ACRESCIMO: pcAcrescimo * 100,
                PC_DESCONTO: '0',
                CD_EMPRESA: null,
                DT_CADASTRO: null,
                CD_LOGIN: null
            }));

            aplicarAlteracaoDescontoFamilias(listAlteraFamilia)
        } else {

            DevExpress.ui.notify({
                message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
                type: 'error',
                displayTime: 5000,
            });
        };

    }

    function aplicarAlteracaoDescontoFamilias(listAlteraFamilia) {

        let requests = listAlteraFamilia.map(cliente => () => new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: "/CadastrosGerais/AlteraDescontoFamiliaCliente",
                data: { cliente: JSON.stringify(cliente) },
                success: resolve,
                error: (xhr, status, error) => reject(error)
            });
        }));

        function limitarExecucoes(arrayDePromises, limite) {
            let index = 0;
            let executando = 0;

            function proxima(resolve, reject) {
                while (executando < limite && index < arrayDePromises.length) {
                    executando++;
                    const i = index++;
                    arrayDePromises[i]()
                        .catch(erro => `Erro: ${erro}`)
                        .finally(() => {
                            executando--;
                            proxima(resolve, reject);
                        });
                }

                if (executando === 0) {
                    resolve();
                }
            }

            return proxima;
        }

        let limitador = limitarExecucoes(requests, 5);

        return new Promise((resolve, reject) => {
            limitador(resolve, reject);
        }).then(() => {

            CarregaDescontoFamilia();
            listAlteraFamilia = [];
            gridDescontoFamiliasCliente.selectRows(null);

            if (x) {

                FecharModal('#ModalAlterarDescontoFamilias');
                new PNotify({
                    title: 'Alteração de Desconto',
                    text: 'Dados gravados com sucesso!',
                    type: 'success'
                });

            } else {

                FecharModal('#ModalAlterarAcrescimoFamilias');
                new PNotify({
                    title: 'Alteração de Acréscimo',
                    text: 'Dados gravados com sucesso!',
                    type: 'success'
                });
            }

        }).catch(erro => {
            new PNotify({
                title: 'Ocorreu um erro ao limpar descontos e acréscimos!',
                text: erro,
                type: 'error',
                width: "50%"
            });
        });
    }

}

function aplicarAlteracaoFormaDescontoFamilias() {
    const result = DevExpress.validationEngine.validateGroup("AlterarFormaFamilias");
    let listAlteraFamilia;
    let formaPagamento = lkpAlterarFormaDescontoFamilias.option('value');
    let listagrid = dataSourceGridDescFamilia;

    if (result.isValid) {

        const familiaCounts = itemSelecionadoGridDescFamilia.reduce((acc, item) => {
            acc[item.CD_FAMILIA] = (acc[item.CD_FAMILIA] || 0) + 1;
            return acc;
        }, {});

        listAlteraFamilia = itemSelecionadoGridDescFamilia
            .map(item => ({
                CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                CD_FAMILIA: item.CD_FAMILIA,
                old_CD_FORMA_PAGAMENTO: item.CD_FORMA_PAGAMENTO,
                new_CD_FORMA_PAGAMENTO: formaPagamento,
                PC_ACRESCIMO: item.PC_ACRESCIMO !== null ? item.PC_ACRESCIMO * 100 : item.PC_ACRESCIMO,
                PC_DESCONTO: item.PC_DESCONTO !== null ? item.PC_DESCONTO * 100 : item.PC_DESCONTO,
                CD_EMPRESA: null,
                DT_CADASTRO: null,
                CD_LOGIN: null
            }))
            .filter(item => familiaCounts[item.CD_FAMILIA] === 1);

        const uniqueListAlteraFamilia = [];
        const uniqueKeys = new Set();

        for (const item of listAlteraFamilia) {
            const key = `${item.CD_FAMILIA}-${item.new_CD_FORMA_PAGAMENTO}`;
            if (!uniqueKeys.has(key)) {
                uniqueListAlteraFamilia.push(item);
                uniqueKeys.add(key);
            }
        }

        listAlteraFamilia = uniqueListAlteraFamilia;
        let mensagemMostrada = false;

        listagrid.forEach(itemGrid => {
            const index = listAlteraFamilia.findIndex(itemAltera =>
                itemAltera.CD_FAMILIA === itemGrid.CD_FAMILIA &&
                itemAltera.new_CD_FORMA_PAGAMENTO === itemGrid.CD_FORMA_PAGAMENTO
            );

            if (index !== -1) {
                listAlteraFamilia.splice(index, 1);

                if (!mensagemMostrada) {
                    new PNotify({
                        title: 'Forma de pagamento já existe',
                        text: 'Alguma das famílias selecionadas já existe a forma de pagamento que deseja alterar',
                        type: 'alert',
                        width: '28%'
                    });
                    mensagemMostrada = true;
                }
            }
        });

        if (listAlteraFamilia.length > 0) {
            let requests = listAlteraFamilia.map(cliente => () => new Promise((resolve, reject) => {
                $.ajax({
                    type: 'POST',
                    url: "/CadastrosGerais/AlteraDescAcrescFamiliaCliente",
                    data: { cliente: JSON.stringify(cliente) },
                    success: resolve,
                    error: (xhr, status, error) => reject(error)
                });
            }));

            function limitarExecucoes(arrayDePromises, limite) {
                let index = 0;
                let executando = 0;

                function proxima(resolve, reject) {
                    while (executando < limite && index < arrayDePromises.length) {
                        executando++;
                        const i = index++;
                        arrayDePromises[i]()
                            .catch(erro => `Erro: ${erro}`)
                            .finally(() => {
                                executando--;
                                proxima(resolve, reject);
                            });
                    }

                    if (executando === 0) {
                        resolve();
                    }
                }

                return proxima;
            }

            let limitador = limitarExecucoes(requests, 5);

            return new Promise((resolve, reject) => {
                limitador(resolve, reject);
            }).then(() => {

                CarregaDescontoFamilia();
                listAlteraFamilia = [];
                gridDescontoFamiliasCliente.selectRows(null);
                FecharModal('#ModalAlterarFormaDescontoFamilias');

                new PNotify({
                    title: 'Alteração de Forma de Pagamento',
                    text: 'Dados gravados com sucesso!',
                    type: 'success'
                });

            }).catch(erro => {
                new PNotify({
                    title: 'Ocorreu um erro ao alterar Forma de Pagamento!',
                    text: erro,
                    type: 'error',
                    width: "50%"
                });
            });

        } else {

            new PNotify({
                title: 'Verifique as famílias selecionadas',
                text: 'Não é possível adicionar a mesma forma de pagamento para uma mesma familía mais de uma vez!',
                type: 'alert',
                width: '28%'
            });
        }

    } else {
        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    }
}

function CarregaFamiliaDesconto() {

    GetAzureDataSource(20, '{ CD_STATUS: "A" }').then((result) => {
        loaPanel.hide();
        if (result.success) {

            let dataGridDescontosFamilias;
            function expandAllNodes(treeList) {
                treeList.beginUpdate();
                try {
                    result.data.forEach((object) => {
                        if (object.CD_FAMILIA.toString().length > 0) {
                            treeList.expandRow(object.CD_FAMILIA);
                        }
                    });
                } finally {
                    treeList.endUpdate();
                }
            }

            function collapseAllNodes(treeList) {
                treeList.beginUpdate();
                try {
                    result.data.forEach((object) => {
                        if (object.CD_FAMILIA.toString().length > 0) {
                            treeList.collapseRow(object.CD_FAMILIA);
                        }
                    });
                } finally {
                    treeList.endUpdate();
                }
            }

            $('#gridBoxFamiliasDescontos').dxDropDownBox({
                valueExpr: 'CD_FAMILIA',
                displayExpr: 'CD_FAMILIA',
                labelMode: 'floating',
                label: '+ Adicionar famílias de produtos com descontos ou acréscimos para o Cliente',
                placeholder: '+ Adicionar famílias de produtos com descontos ou acréscimos para o Cliente',
                showClearButton: true,
                dataSource: new DevExpress.data.CustomStore({
                    loadMode: 'raw',
                    key: 'CD_FAMILIA',
                    load() {
                        return result.data;
                    }
                }),
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGridDescontosFamilias = $('<div>').dxTreeList({
                        dataSource: e.component.getDataSource(),
                        searchExpr: ['DS_FAMILIA'],
                        displayExpr: 'DS_FAMILIA',
                        valueExpr: 'CD_FAMILIA',

                        keyExpr: 'CD_FAMILIA',
                        parentIdExpr: 'CD_FAMILIA_PAI',
                        autoExpandAll: false,

                        wordWrapEnabled: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        editing: {
                            mode: 'batch',
                            allowUpdating: true,
                            startEditAction: 'click',
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
                        loadPanel: { enabled: true, },
                        sorting: { mode: "multiple" },
                        allowColumnResizing: true,
                        columnResizingMode: "widget",
                        allowColumnReordering: true,
                        groupPanel: { visible: true },
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
                        columnChooser: { enabled: true, allowSearch: true, },
                        columnsAutoWidth: true,
                        cellHintEnabled: true,
                        columns: [

                            {
                                dataField: "DS_FAMILIA",
                                caption: "Famílias",
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                cssClass: "column-data-grid",
                            },
                            {
                                dataField: "CD_FAMILIA",
                                caption: "Código Família",
                                width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                alignment: 'center',
                                visible: false,
                                cssClass: "column-data-grid",
                            },
                            {
                                dataField: "CD_FAMILIA_PAI",
                                caption: "Código Pai",
                                width: 100,
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                alignment: 'center',
                                visible: false,
                                cssClass: "column-data-grid",
                            },
                            {
                                dataField: "DS_STATUS",
                                caption: "Status",
                                width: 90,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                alignment: "center",
                                cssClass: "column-data-grid",
                            },
                            {
                                dataField: "CD_FORMA_PAGAMENTO",
                                caption: "Forma",
                                width: 250,
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                cssClass: "column-data-grid",
                                lookup: {
                                    dataSource: dataSourceFormaPagamento,
                                    valueExpr: "CD_FORMA_PAGAMENTO",
                                    displayExpr: "DS_FORMA_PAGAMENTO",
                                    searchExpr: ["CD_FORMA_PAGAMENTO", "DS_FORMA_PAGAMENTO"],

                                },
                                alignment: 'center',
                                visible: true,

                            },
                            {
                                dataField: "PC_DESCONTO",
                                caption: "% Desconto",
                                width: 110,
                                dataType: "number",
                                format: "###,###,###,##0.##%",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                setCellValue: function (newData, value, currentRowData) {

                                    var desconto = value / 100
                                    newData.PC_DESCONTO = desconto;
                                    newData.PC_ACRESCIMO = null;

                                    listaDescontoFamilia.push({
                                        CD_FAMILIA: currentRowData.CD_FAMILIA,
                                        CD_FORMA_PAGAMENTO: currentRowData.CD_FORMA_PAGAMENTO,
                                        PC_ACRESCIMO: newData.PC_ACRESCIMO,
                                        PC_DESCONTO: value
                                    });

                                },
                                alignment: 'center',
                            },
                            {
                                dataField: "PC_ACRESCIMO",
                                caption: "% Acréscimo",
                                width: 110,
                                dataType: "number",
                                format: "###,###,###,##0.##%",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                setCellValue: function (newData, value, currentRowData) {

                                    var desconto = value / 100
                                    newData.PC_ACRESCIMO = desconto;
                                    newData.PC_DESCONTO = null;

                                    listaDescontoFamilia.push({
                                        CD_FAMILIA: currentRowData.CD_FAMILIA,
                                        CD_FORMA_PAGAMENTO: currentRowData.CD_FORMA_PAGAMENTO,
                                        PC_ACRESCIMO: value,
                                        PC_DESCONTO: newData.PC_DESCONTO
                                    });

                                },
                                alignment: 'center',
                            },

                        ],

                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        text: 'Adicionar Famílias',
                                        hint: "Adicionar famílias selecionados",
                                        width: 150,
                                        icon: 'save',
                                        onClick(e) {

                                            if (listaDescontoFamilia.length > 0) {

                                                listaDescontoFamilia.forEach(item => {

                                                    const rowKey = item.CD_FAMILIA;
                                                    const rowIndex = dataGridDescontosFamilias.getRowIndexByKey(rowKey);
                                                    item.CD_CPF_CNPJ = clienteSelecionado.CD_PESQUISA;

                                                    if (rowIndex !== -1) {

                                                        const rowData = dataGridDescontosFamilias.getVisibleRows()[rowIndex].data;
                                                        const cdFormaPagamentoValue = rowData.CD_FORMA_PAGAMENTO;
                                                        item.CD_FORMA_PAGAMENTO = cdFormaPagamentoValue;
                                                    }
                                                });

                                                const hasUndefinedCDFormaPagamento = listaDescontoFamilia.some(item => item.CD_FORMA_PAGAMENTO === undefined);

                                                if (hasUndefinedCDFormaPagamento) {

                                                    AbrirModal("#ModalDefinirFormaDescontoFamilias");
                                                    $("#gridBoxFamiliasDescontos").dxDropDownBox("instance").close();

                                                } else {

                                                    ValidarDescontoFamilia(true);

                                                }
                                            } else {

                                                new PNotify({
                                                    title: 'Descontos ou acréscimos não adicionados!',
                                                    text: 'Adicione valores de descontos ou acréscimos na família que deseja incluir!',
                                                    type: 'alert',
                                                    width: "28%"
                                                });
                                            }

                                        },

                                    },
                                },
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    locateInMenu: 'auto',
                                    options: {
                                        icon: 'hierarchy',
                                        text: 'Expandir Famílias',
                                        hint: 'Fechar ou expandir as famílias',
                                        onClick(e) {
                                            if (e.component.option('text') === 'Fechar Famílias') {

                                                collapseAllNodes(dataGridDescontosFamilias);
                                                e.component.option('text', 'Expandir Famílias');
                                                e.component.option('icon', 'hierarchy');

                                            } else {

                                                expandAllNodes(dataGridDescontosFamilias);
                                                e.component.option('text', 'Fechar Famílias');
                                                e.component.option('icon', 'hidepanel');

                                            };
                                        },
                                    },
                                },

                                'groupPanel',
                                'columnChooserButton',
                                'searchPanel',
                            ],
                        },
                        showBorders: true,

                        //onInitialized: function (e) {
                        //    e.component.option("filterValue", ["DS_STATUS", "=", "Ativo"]);
                        //},

                        onCellPrepared: function (e) {
                            if (e.rowType === "data") {
                                if (e.column.dataField === "PC_DESCONTO" || e.column.dataField === "PC_ACRESCIMO" || e.column.dataField === "CD_FORMA_PAGAMENTO") {
                                    e.cellElement.css("background-color", "#EDF3F8");
                                    //e.cellElement.css("font-weight", "bold");

                                    if (e.value < 0) {
                                        e.cellElement.css("color", "#d00000");
                                    };
                                }
                                if (e.column.dataField === "DS_STATUS") {
                                    if (e.value == "Inativo") {
                                        e.cellElement.css("color", "#d00000");
                                        e.cellElement.css("font-weight", "bold");
                                    }
                                }
                            }
                        },

                        paging: { enabled: true, pageSize: 10 },
                        scrolling: { mode: 'virtual' },
                        selectedRowKeys: [value],
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            const keys = selectedItems.selectedRowKeys;
                            e.component.option('value', keys);
                        },

                    });

                    dataGridDescontosFamilias = $dataGridDescontosFamilias.dxTreeList('instance');

                    //e.component.on('valueChanged', (args) => {
                    //    const { value } = args;
                    //    dataGridDescontosFamilias.selectRows(value, false);

                    //});

                    return $dataGridDescontosFamilias;
                },

            });


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
}

function CarregaDescontoProduto() {

    let cdCpfCnpj = `"${clienteSelecionado.CD_PESQUISA}"`
    GetAzureDataSource(19, `{ CD_CPF_CNPJ: ${cdCpfCnpj} }`).then((result) => {

        if (result.success) {
            dataSourceGridDescProduto = result.data;
            gridDescontoProdutosCliente.option('dataSource', result.data);
            gridDescontoProdutosCliente.selectRows(null);
            CarregaProdutoDesconto()
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
}

function CarregaProdutoDesconto() {

    GetAzureDataSource(16, '{ CD_STATUS: "A" }').then((result) => {
        loaPanel.hide();
        if (result.success) {

            let dataGridDescontosProdutos;

            $('#gridBoxProdutosDescontos').dxDropDownBox({
                valueExpr: 'CD_PRODUTO',
                displayExpr: 'CD_PRODUTO',
                labelMode: 'floating',
                label: '+ Adicionar produtos com descontos ou acréscimos para o Cliente',
                placeholder: '+ Adicionar produtos com descontos ou acréscimos para o Cliente',
                showClearButton: true,
                dataSource: new DevExpress.data.CustomStore({
                    loadMode: 'raw',
                    key: 'CD_PRODUTO',
                    load() {
                        return result.data;
                    },
                    update(key, values) {
                        return Promise.resolve();
                    },
                    insert(values) {
                        return Promise.resolve();
                    },
                    remove(key) {
                        return Promise.resolve();
                    }
                }),
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGridDescontosProdutos = $('<div>').dxDataGrid({
                        dataSource: e.component.getDataSource(),

                        searchExpr: ['DS_PRODUTO'],
                        displayExpr: 'DS_PRODUTO',
                        valueExpr: 'CD_PRODUTO',
                        wordWrapEnabled: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        editing: {
                            mode: 'batch',
                            allowUpdating: true,
                            startEditAction: 'click',
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
                        loadPanel: { enabled: true, },
                        sorting: { mode: "multiple" },
                        allowColumnResizing: true,
                        columnResizingMode: "widget",
                        allowColumnReordering: true,
                        groupPanel: { visible: true },
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
                        columnChooser: { enabled: true, allowSearch: true, },
                        columnsAutoWidth: true,
                        cellHintEnabled: true,

                        columns: [
                            {
                                dataField: "LG_FORA_LINHA",
                                caption: "Fora Linha",
                                width: 40,
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                visible: false,
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
                                width: 250,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_FABRICANTE",
                                caption: "Código Fabricante",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_ORIGINAL",
                                caption: "Código Original",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_OPCIONAL",
                                caption: "Código Opcional",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_EAN_PRODUTO",
                                caption: "Código Barras",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_NCM",
                                caption: "NCM",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_MARCA",
                                caption: "Marca",
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_FORNECEDOR",
                                caption: "Código Fornecedor",
                                width: 90,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                alignment: 'center',
                                visible: false,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_RAZAO_SOCIAL",
                                caption: "Fornecedor Padrão (Razão Social)",
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                visible: false,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_FANTASIA",
                                caption: "Fornecedor Padrão (Fantasia)",
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: false,
                                visible: false,
                                cssClass: "column-data-grid",
                            }, {
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
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                visible: false,
                                cssClass: "column-data-grid",
                            },
                            {
                                dataField: "VL_PRECO_MINIMO_VENDA",
                                caption: "Preço Atual",
                                width: 70,
                                dataType: "number",
                                format: "###,###,###,##0.00##",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                cssClass: "column-data-grid",
                            },
                            {
                                dataField: "CD_FORMA_PAGAMENTO",
                                caption: "Forma",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                cssClass: "column-data-grid",
                                lookup: {
                                    dataSource: dataSourceFormaPagamento,
                                    valueExpr: "CD_FORMA_PAGAMENTO",
                                    displayExpr: "DS_FORMA_PAGAMENTO",
                                    searchExpr: ["CD_FORMA_PAGAMENTO", "DS_FORMA_PAGAMENTO"]
                                },
                                alignment: 'center',
                                visible: true,
                                setCellValue: function (newData, value, currentRowData) {
                                    newData.CD_FORMA_PAGAMENTO = value;

                                },
                            },
                            {
                                dataField: "PC_DESCONTO",
                                caption: "% Desconto",
                                width: 70,
                                dataType: "number",
                                format: "###,###,###,##0.##%",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                setCellValue: function (newData, value, currentRowData) {

                                    var desconto = value / 100
                                    newData.PC_DESCONTO = desconto;
                                    newData.PC_ACRESCIMO = null;
                                    newData.VL_PRECO_FINAL = parseFloat((currentRowData.VL_PRECO_MINIMO_VENDA - (currentRowData.VL_PRECO_MINIMO_VENDA * desconto)).toFixed(2));

                                },
                                alignment: 'center',
                            },
                            {
                                dataField: "PC_ACRESCIMO",
                                caption: "% Acréscimo",
                                width: 70,
                                dataType: "number",
                                format: "###,###,###,##0.##%",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                                setCellValue: function (newData, value, currentRowData) {

                                    var desconto = value / 100

                                    newData.PC_ACRESCIMO = desconto;
                                    newData.PC_DESCONTO = null;
                                    newData.VL_PRECO_FINAL = parseFloat((currentRowData.VL_PRECO_MINIMO_VENDA * (1 + desconto)).toFixed(2));

                                },
                                alignment: 'center',
                            },

                            {
                                dataField: "VL_PRECO_FINAL",
                                caption: "Preço do Cliente",
                                width: 70,
                                dataType: "number",
                                format: "###,###,###,##0.00##",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                cssClass: "column-data-grid",
                            },

                        ],
                        onSaving(e) {

                            if (e.changes.length > 0) {
                                let shouldOpenModal = false;

                                listaDescontoProduto = e.changes.map(change => {

                                    if (change.data.CD_FORMA_PAGAMENTO === undefined || change.data.CD_FORMA_PAGAMENTO === null) {
                                        shouldOpenModal = true;
                                    }

                                    return {
                                        CD_PRODUTO: change.key,
                                        CD_FORMA_PAGAMENTO: change.data.CD_FORMA_PAGAMENTO !== undefined ? change.data.CD_FORMA_PAGAMENTO : null,
                                        CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                                        PC_ACRESCIMO: change.data.PC_ACRESCIMO !== null ? change.data.PC_ACRESCIMO * 100 : change.data.PC_ACRESCIMO,
                                        PC_DESCONTO: change.data.PC_DESCONTO !== null ? change.data.PC_DESCONTO * 100 : change.data.PC_DESCONTO,

                                    };
                                });

                                $("#gridBoxProdutosDescontos").dxDropDownBox("instance").close();

                                if (shouldOpenModal) {
                                    AbrirModal("#ModalDefinirFormaDescontoProdutos");

                                } else {
                                    ValidarDescontoProduto(true);
                                }

                            } else {

                                new PNotify({
                                    title: 'Nenhum item adicionado',
                                    text: 'Ao menos um item precisa ser adicionado!',
                                    type: 'alert'
                                });
                            }

                        },

                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        text: 'Adicionar Produtos',
                                        hint: "Adicionar produtos selecionados",
                                        width: 150,
                                        icon: 'save',
                                        onClick(e) {
                                            dataGridDescontosProdutos.saveEditData();

                                        },
                                    },
                                },
                                'groupPanel',
                                'columnChooserButton',
                                'searchPanel',
                            ],
                        },

                        showBorders: true,

                        onCellPrepared: function (e) {
                            if (e.rowType === "data") {
                                if (e.column.dataField === "LG_FORA_LINHA") {
                                    e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                                    e.cellElement.css("color", "white");
                                }
                                if (e.column.dataField === "PC_DESCONTO" || e.column.dataField === "PC_ACRESCIMO" || e.column.dataField === "CD_FORMA_PAGAMENTO") {
                                    e.cellElement.css("background-color", "#EDF3F8");
                                    //e.cellElement.css("font-weight", "bold");

                                    if (e.value < 0) {
                                        e.cellElement.css("color", "#d00000");
                                    };
                                }
                            }
                        },

                        paging: { enabled: true, pageSize: 10 },
                        scrolling: { mode: 'virtual' },
                        selectedRowKeys: [value],
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            const keys = selectedItems.selectedRowKeys;
                            e.component.option('value', keys);
                        },

                    });

                    dataGridDescontosProdutos = $dataGridDescontosProdutos.dxDataGrid('instance');

                    e.component.on('valueChanged', (args) => {
                        const { value } = args;
                        dataGridDescontosProdutos.selectRows(value, false);
                    });

                    return $dataGridDescontosProdutos;
                },

            });

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
}

function ValidarDescontoProduto(x) {

    let listagrid = dataSourceGridDescProduto;
    let listaClienteProdutosAdicionar = [];
    let modalDescProduto = tagDefinirFormaDescontoProdutos.option('value');
    modalDescProduto = (modalDescProduto === null || (Array.isArray(modalDescProduto) && modalDescProduto.length === 0)) ? [] : modalDescProduto;

    const adicionarItem = (item, cdFormaPagamento) => {
        const novoItem = {
            CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
            CD_PRODUTO: item.CD_PRODUTO,
            CD_FORMA_PAGAMENTO: cdFormaPagamento,
            PC_ACRESCIMO: item.PC_ACRESCIMO,
            PC_DESCONTO: item.PC_DESCONTO
        };
        listaClienteProdutosAdicionar.push(novoItem);
    };

    const processarItens = (item) => {
        if (item.CD_FORMA_PAGAMENTO === null) {
            modalDescProduto.forEach(cdFormaPagamento => {
                adicionarItem(item, cdFormaPagamento);
            });
        } else {
            listaClienteProdutosAdicionar.push(item);
        }
    };

    const verificarDeletarSalvar = () => {
        const listaDeleteProduto = listaClienteProdutosAdicionar.filter(itemAtualizado =>
            listagrid.some(itemGrid =>
                itemAtualizado.CD_PRODUTO === itemGrid.CD_PRODUTO &&
                itemAtualizado.CD_FORMA_PAGAMENTO === itemGrid.CD_FORMA_PAGAMENTO
            )
        );

        if (listaDeleteProduto.length > 0) {
            DeletaDescontoProduto(listaDeleteProduto, listaClienteProdutosAdicionar);
        } else {
            SalvarDescontoProduto(listaClienteProdutosAdicionar);
        }
    };

    if (x) {
        listaDescontoProduto.forEach(processarItens);
        verificarDeletarSalvar();

    } else if (!x && modalDescProduto.length > 0) {
        listaDescontoProduto.forEach(processarItens);
        verificarDeletarSalvar();

    } else {
        new PNotify({
            title: 'Forma de pagamento não selecionada!',
            text: 'Selecione ao menos uma forma de pagamento para adicionar aos Produtos!',
            type: 'alert',
            width: "28%"
        });
    }

}

function DeletaDescontoProduto(listaDeleteProduto, listaClienteProdutosAdicionar, x) {

    if (x) {

        const listaNova = listaDeleteProduto.map(item => ({
            CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
            CD_PRODUTO: item.CD_PRODUTO,
            CD_FORMA_PAGAMENTO: item.CD_FORMA_PAGAMENTO,
            CD_EMPRESA: null
        }));

        listaDeleteProduto = listaNova;
    }

    let requests = listaDeleteProduto.map(cliente => () => new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/DeletaDescontoProdutoCliente",
            data: { cliente: JSON.stringify(cliente) },
            success: resolve,
            error: (xhr, status, error) => reject(error)
        });
    }));

    function limitarExecucoes(arrayDePromises, limite) {
        let index = 0;
        let executando = 0;

        function proxima(resolve, reject) {
            while (executando < limite && index < arrayDePromises.length) {
                executando++;
                const i = index++;
                arrayDePromises[i]()
                    .catch(erro => `Erro: ${erro}`)
                    .finally(() => {
                        executando--;
                        proxima(resolve, reject);
                    });
            }

            if (executando === 0) {
                resolve();
            }
        }

        return proxima;
    }

    let limitador = limitarExecucoes(requests, 5);

    return new Promise((resolve, reject) => {
        limitador(resolve, reject);
    }).then(() => {
        listaDeleteProduto = [];
        if (x) {
            CarregaDescontoProduto();

            new PNotify({
                title: 'Sucesso!',
                text: 'Produtos excluídos com sucesso!',
                type: 'success',
                width: '28%'
            });

        } else {
            SalvarDescontoProduto(listaClienteProdutosAdicionar);
        }

    }).catch(erro => {
        new PNotify({
            title: 'Ocorreu um erro ao limpar descontos e acréscimos!',
            text: erro,
            type: 'error',
            width: "50%"
        });
    });
}

function SalvarDescontoProduto(listaClienteProdutosAdicionar) {

    let requests = listaClienteProdutosAdicionar.map(cliente => () => new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/SalvarDescontoProdutoCliente",
            data: { cliente: JSON.stringify(cliente) },
            success: resolve,
            error: (xhr, status, error) => reject(error)
        });
    }));

    function limitarExecucoes(arrayDePromises, limite) {
        let index = 0;
        let executando = 0;

        function proxima(resolve, reject) {
            while (executando < limite && index < arrayDePromises.length) {
                executando++;
                const i = index++;
                arrayDePromises[i]()
                    .catch(erro => `Erro: ${erro}`)
                    .finally(() => {
                        executando--;
                        proxima(resolve, reject);
                    });
            }

            if (executando === 0) {
                resolve();
            }
        }

        return proxima;
    }

    let limitador = limitarExecucoes(requests, 5);

    return new Promise((resolve, reject) => {
        limitador(resolve, reject);
    }).then(() => {

        $("#gridBoxProdutosDescontos").dxDropDownBox("instance").close();
        $("#gridBoxProdutosDescontos").dxDropDownBox("instance").option("value", null);

        CarregaDescontoProduto();

        tagDefinirFormaDescontoProdutos.option('value', null);
        FecharModal('#ModalDefinirFormaDescontoProdutos');

        listaClienteProdutosAdicionar = [];

        new PNotify({
            title: 'Alteração!',
            text: 'Alterações Concluídas com sucesso!',
            type: 'success',
            width: '28%'
        });

    }).catch(erro => {
        new PNotify({
            title: 'Ocorreu um erro ao limpar descontos e acréscimos!',
            text: erro,
            type: 'error',
            width: "50%"
        });
    });
}

function ValidarExcluirDescontoProduto(x) {

    if (x) {

        if (itemSelecionadoGridDescProduto.length > 0) {
            AbrirModal('#ModalConfirmacaoExclusaoProdutosDesconto');

        } else {

            new PNotify({
                title: 'Produto não selecionado!',
                text: 'Nenhuma Produto foi selecionado, selecione ao menos um Produto para excluir',
                type: 'alert',
                width: "28%"
            });

        }

    } else {

        DeletaDescontoProduto(itemSelecionadoGridDescProduto, null, true)
    }

}

function aplicarAlteracaoFormaDescontoProduto() {

    const result = DevExpress.validationEngine.validateGroup("AlterarFormaProdutos");
    let listAlteraProduto;
    let formaPagamento = lkpAlterarFormaDescontoProduto.option('value');
    let listagrid = dataSourceGridDescProduto;

    if (result.isValid) {

        const produtoCounts = itemSelecionadoGridDescProduto.reduce((acc, item) => {
            acc[item.CD_PRODUTO] = (acc[item.CD_PRODUTO] || 0) + 1;
            return acc;
        }, {});

        listAlteraProduto = itemSelecionadoGridDescProduto.map(item => ({
            CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
            CD_PRODUTO: item.CD_PRODUTO,

            old_CD_FORMA_PAGAMENTO: item.CD_FORMA_PAGAMENTO,
            new_CD_FORMA_PAGAMENTO: formaPagamento,
            PC_ACRESCIMO: item.PC_ACRESCIMO !== null ? item.PC_ACRESCIMO * 100 : item.PC_ACRESCIMO,
            PC_DESCONTO: item.PC_DESCONTO !== null ? item.PC_DESCONTO * 100 : item.PC_DESCONTO,

            CD_EMPRESA: null,
            DT_CADASTRO: null,
            CD_LOGIN: null

        })).filter(item => produtoCounts[item.CD_PRODUTO] === 1);

        const uniqueListAlteraProduto = [];
        const uniqueKeys = new Set();

        for (const item of listAlteraProduto) {
            const key = `${item.CD_PRODUTO}-${item.new_CD_FORMA_PAGAMENTO}`;
            if (!uniqueKeys.has(key)) {
                uniqueListAlteraProduto.push(item);
                uniqueKeys.add(key);
            }
        }
        listAlteraProduto = uniqueListAlteraProduto;
        let mensagemMostrada = false;

        listagrid.forEach(itemGrid => {
            const index = listAlteraProduto.findIndex(itemAltera =>
                itemAltera.CD_PRODUTO === itemGrid.CD_PRODUTO &&
                itemAltera.new_CD_FORMA_PAGAMENTO === itemGrid.CD_FORMA_PAGAMENTO
            );

            if (index !== -1) {
                listAlteraProduto.splice(index, 1);

                if (!mensagemMostrada) {
                    new PNotify({
                        title: 'Forma de pagamento já existe',
                        text: 'Alguma das famílias selecionadas já existe a forma de pagamento que deseja alterar',
                        type: 'alert',
                        width: '28%'
                    });
                    mensagemMostrada = true;
                }
            }
        });

        if (listAlteraProduto.length > 0) {

            let requests = listAlteraProduto.map(cliente => () => new Promise((resolve, reject) => {
                $.ajax({
                    type: 'POST',
                    url: "/CadastrosGerais/AlteraDescAcrescProdutoCliente",
                    data: { cliente: JSON.stringify(cliente) },
                    success: resolve,
                    error: (xhr, status, error) => reject(error)
                });
            }));

            function limitarExecucoes(arrayDePromises, limite) {
                let index = 0;
                let executando = 0;

                function proxima(resolve, reject) {
                    while (executando < limite && index < arrayDePromises.length) {
                        executando++;
                        const i = index++;
                        arrayDePromises[i]()
                            .catch(erro => `Erro: ${erro}`)
                            .finally(() => {
                                executando--;
                                proxima(resolve, reject);
                            });
                    }

                    if (executando === 0) {
                        resolve();
                    }
                }

                return proxima;
            }

            let limitador = limitarExecucoes(requests, 5);

            return new Promise((resolve, reject) => {
                limitador(resolve, reject);
            }).then(() => {

                CarregaDescontoProduto();
                listAlteraProduto = [];
                gridDescontoProdutosCliente.selectRows(null);
                FecharModal('#ModalAlterarFormaDescontoProduto');

                new PNotify({
                    title: 'Alteração de Forma de Pagamento',
                    text: 'Dados gravados com sucesso!',
                    type: 'success'
                });

            }).catch(erro => {
                new PNotify({
                    title: 'Ocorreu um erro ao alterar Forma de Pagamento!',
                    text: erro,
                    type: 'error',
                    width: "50%"
                });
            });

        } else {

            new PNotify({
                title: 'Verifique os Produtos selecionados',
                text: 'Não é possível adicionar a mesma forma de pagamento para o mesmo Produto mais de uma vez!',
                type: 'alert',
                width: '28%'
            });
        }

    } else {

        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    };

};

function AlterarDescAcresProduto(x) {

    let listAlteraProduto;
    let pcDesconto = nbxPcAlteracaoDescontoProdutoCliente.option('value');
    let pcAcrescimo = nbxPcAlteracaoAcrescimoProdutoCliente.option('value');

    if (x) {
        const result = DevExpress.validationEngine.validateGroup("AlterarDescontoProduto");

        if (result.isValid) {

            listAlteraProduto = itemSelecionadoGridDescProduto.map(item => ({
                CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                CD_PRODUTO: item.CD_PRODUTO,
                CD_FORMA_PAGAMENTO: item.CD_FORMA_PAGAMENTO,
                PC_ACRESCIMO: '0',
                PC_DESCONTO: pcDesconto * 100,
                CD_EMPRESA: null,
                DT_CADASTRO: null,
                CD_LOGIN: null
            }));

            aplicarAlteracaoDescontoProdutos(listAlteraProduto)

        } else {

            DevExpress.ui.notify({
                message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
                type: 'error',
                displayTime: 5000,
            });
        };


    } else {

        const resultAcrescimo = DevExpress.validationEngine.validateGroup("AlterarAcrescimoProduto");

        if (resultAcrescimo.isValid) {

            listAlteraProduto = itemSelecionadoGridDescProduto.map(item => ({
                CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                CD_PRODUTO: item.CD_PRODUTO,
                CD_FORMA_PAGAMENTO: item.CD_FORMA_PAGAMENTO,
                PC_ACRESCIMO: pcAcrescimo * 100,
                PC_DESCONTO: '0',
                CD_EMPRESA: null,
                DT_CADASTRO: null,
                CD_LOGIN: null
            }));

            aplicarAlteracaoDescontoProdutos(listAlteraProduto)
        } else {

            DevExpress.ui.notify({
                message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
                type: 'error',
                displayTime: 5000,
            });
        };

    }

    function aplicarAlteracaoDescontoProdutos(listAlteraProduto) {

        let requests = listAlteraProduto.map(cliente => () => new Promise((resolve, reject) => {
            $.ajax({
                type: 'POST',
                url: "/CadastrosGerais/AlteraDescontoProdutoCliente",
                data: { cliente: JSON.stringify(cliente) },
                success: resolve,
                error: (xhr, status, error) => reject(error)
            });
        }));

        function limitarExecucoes(arrayDePromises, limite) {
            let index = 0;
            let executando = 0;

            function proxima(resolve, reject) {
                while (executando < limite && index < arrayDePromises.length) {
                    executando++;
                    const i = index++;
                    arrayDePromises[i]()
                        .catch(erro => `Erro: ${erro}`)
                        .finally(() => {
                            executando--;
                            proxima(resolve, reject);
                        });
                }

                if (executando === 0) {
                    resolve();
                }
            }

            return proxima;
        }

        let limitador = limitarExecucoes(requests, 5);

        return new Promise((resolve, reject) => {
            limitador(resolve, reject);
        }).then(() => {

            CarregaDescontoProduto();
            listAlteraProduto = [];
            gridDescontoProdutosCliente.selectRows(null);

            if (x) {

                FecharModal('#ModalAlterarDescontoProduto');
                new PNotify({
                    title: 'Alteração de Desconto',
                    text: 'Dados gravados com sucesso!',
                    type: 'success'
                });

            } else {

                FecharModal('#ModalAlterarAcrescimoProduto');
                new PNotify({
                    title: 'Alteração de Acréscimo',
                    text: 'Dados gravados com sucesso!',
                    type: 'success'
                });
            }

        }).catch(erro => {
            new PNotify({
                title: 'Ocorreu um erro ao limpar descontos e acréscimos!',
                text: erro,
                type: 'error',
                width: "50%"
            });
        });
    }

}

function ValidaExclusaoDescontoAcrescimoForma() {

    if (itenSelecionadoForma.length > 0) {
        AbrirModal('#ModalConfirmacaoExclusaoDescontoAcrescimoForma');
    } else {

        new PNotify({
            title: 'Forma de pagamento não selecionada!',
            text: 'Nenhuma forma de pagamento foi selecionada, selecione ao menos uma forma de pagamento para limpar os descontos e acréscimos',
            type: 'alert',
            width: "28%"
        });
    }
}

function ExclusaoDescontoAcrescimoForma() {

    objForma = itenSelecionadoForma.map((x) => x.CD_FORMA_PAGAMENTO);

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: '/CadastrosGerais/ExclusaoDescontoAcrescimoForma',
            data: { cliente: clienteSelecionado.CD_PESQUISA, formas: objForma },
            success: function (response) {
                resolve(response);

            },
            error: function (error) {
                reject(error);

            }
        });

    }).then(function (response) {
        new PNotify({
            title: 'Limpar descontos e acréscimos!',
            text: 'Desconto e Acréscimos excluídos!',
            type: 'success',
            width: '28%'
        });

        CarregaDescontoForma()
        gridDescontoFormaPagamentoCliente.selectRows("value", false);

    });
}

function CarregaDescontoPrecoFixo() {
    let cdCpfCnpj = `"${clienteSelecionado.CD_PESQUISA}"`;
    GetAzureDataSource(18, `{ CD_CPF_CNPJ: ${cdCpfCnpj} }`).then((result) => {
        if (result.success) {
            let adjustedData = result.data.map(item => {
                if (item.PC_MAXIMO_DESCONTO === 0) {
                    item.PC_MAXIMO_DESCONTO = null;
                }
                return item;
            });

            let formaPagamentos = [...new Set(adjustedData.map(item => item.CD_FORMA_PAGAMENTO).filter(fp => fp !== null))];

            let promises = formaPagamentos.map(formaPagamento =>
                GetAzureDataSource(22, `{ CD_FORMA_PAGAMENTO: "${formaPagamento}", CD_STATUS: "A" }`)
            );

            Promise.all(promises).then(results => {
                let condicoes = results.flatMap(result => result.success ? result.data : []);
                dataSourceCondicaoPagamento = condicoes;

                gridPrecoFixoProdutosCliente.option('columns[18].lookup.dataSource', dataSourceCondicaoPagamento);
                gridPrecoFixoProdutosCliente.option('dataSource', adjustedData);
                gridPrecoFixoProdutosCliente.selectRows("value", false);

                CarregaDescontoPrecoFixoProduto();

            }).catch(error => {
                DevExpress.ui.notify({
                    message: `Erro ao carregar condições de pagamento: ${error}`,
                    type: 'error',
                    displayTime: 5000,
                });
                console.error('Erro ao carregar condições de pagamento:', error);
            });

        } else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });
}

function CarregaDescontoPrecoFixoProduto() {

    GetAzureDataSource(16, '{ CD_STATUS: "A" }').then((result) => {
        loaPanel.hide();

        if (result.success) {

            let dataGrid;

            $('#gridBoxProdutos').dxDropDownBox({
                valueExpr: 'CD_PRODUTO',
                displayExpr: 'CD_PRODUTO',
                labelMode: 'floating',
                label: '+ Adicionar produtos com preço fixo para o Cliente',
                placeholder: '+ Adicionar produtos com preço fixo para o Cliente',
                showClearButton: true,
                dataSource: new DevExpress.data.CustomStore({
                    loadMode: 'raw',
                    key: 'CD_PRODUTO',
                    load() {
                        return result.data;
                    },
                    update(key, values) {
                        return Promise.resolve();
                    },
                    insert(values) {
                        return Promise.resolve();
                    },
                    remove(key) {
                        return Promise.resolve();
                    }
                }),
                contentTemplate(e) {
                    const value = e.component.option('value');
                    const $dataGrid = $('<div>').dxDataGrid({
                        dataSource: e.component.getDataSource(),

                        searchExpr: ['DS_PRODUTO'],
                        displayExpr: 'DS_PRODUTO',
                        valueExpr: 'CD_PRODUTO',
                        wordWrapEnabled: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        editing: {
                            mode: 'batch',
                            allowUpdating: true,
                            startEditAction: 'click',
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
                        loadPanel: { enabled: true, },
                        sorting: { mode: "multiple" },
                        allowColumnResizing: true,
                        columnResizingMode: "widget",
                        allowColumnReordering: true,
                        groupPanel: { visible: true },
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
                        columnChooser: { enabled: true, allowSearch: true, },
                        columnsAutoWidth: true,
                        cellHintEnabled: true,

                        columns: [
                            {
                                dataField: "LG_FORA_LINHA",
                                caption: "Fora Linha",
                                width: 40,
                                allowEditing: false,
                                allowSorting: true,
                                alignment: 'center',
                                visible: false,
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
                                width: 250,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_FABRICANTE",
                                caption: "Código Fabricante",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: true,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_ORIGINAL",
                                caption: "Código Original",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_OPCIONAL",
                                caption: "Código Opcional",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_EAN_PRODUTO",
                                caption: "Código Barras",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_NCM",
                                caption: "NCM",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_MARCA",
                                caption: "Marca",
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                visible: false,
                                alignment: 'center',
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "CD_FORNECEDOR",
                                caption: "Código Fornecedor",
                                width: 90,
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                alignment: 'center',
                                visible: false,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_RAZAO_SOCIAL",
                                caption: "Fornecedor Padrão (Razão Social)",
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                visible: false,
                                cssClass: "column-data-grid",
                            }, {
                                dataField: "DS_FANTASIA",
                                caption: "Fornecedor Padrão (Fantasia)",
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: false,
                                visible: false,
                                cssClass: "column-data-grid",
                            }, {
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
                                allowEditing: false,
                                allowHeaderFiltering: true,
                                allowSorting: true,
                                visible: false,
                                cssClass: "column-data-grid",
                            },
                            {
                                dataField: "VL_PRECO_MINIMO_VENDA",
                                caption: "Preço Atual",
                                width: 70,
                                dataType: "number",
                                format: "###,###,###,##0.00##",
                                allowEditing: false,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                cssClass: "column-data-grid",
                            },
                            {
                                dataField: "VL_PRECO_VENDA",
                                caption: "Preço do Cliente",
                                width: 70,
                                dataType: "number",
                                format: "###,###,###,##0.00##",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                cssClass: "column-data-grid",
                                setCellValue: function (newData, value, currentRowData) {
                                    newData.VL_PRECO_VENDA = value;

                                },

                            },
                            {
                                dataField: "CD_FORMA_PAGAMENTO",
                                caption: "Forma",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                cssClass: "column-data-grid",
                                lookup: {
                                    dataSource: dataSourceFormaPagamento,
                                    valueExpr: "CD_FORMA_PAGAMENTO",
                                    displayExpr: "DS_FORMA_PAGAMENTO",
                                    searchExpr: ["CD_FORMA_PAGAMENTO", "DS_FORMA_PAGAMENTO"]
                                },
                                alignment: 'center',
                                visible: true,
                                setCellValue: function (newData, value, currentRowData) {

                                    newData.CD_FORMA_PAGAMENTO = value;
                                    newData.CD_CONDICAO_PAGAMENTO = null;
                                },
                            },

                            {
                                dataField: "CD_CONDICAO_PAGAMENTO",
                                caption: "Condição",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                cssClass: "column-data-grid",
                                lookup: {
                                    valueExpr: "CD_CONDICAO_PAGAMENTO",
                                    displayExpr: "DS_CONDICAO_PAGAMENTO",
                                    searchExpr: ["DS_CONDICAO_PAGAMENTO"]
                                },
                                alignment: 'center',
                                visible: true,


                            },
                            {
                                dataField: "CD_ENTREGA",
                                caption: "Despacho",
                                width: 90,
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: true,
                                alignment: "center",
                                cssClass: "column-data-grid",
                                lookup: {
                                    dataSource: dataSourceTipoDespacho,
                                    valueExpr: "CD_ENTREGA",
                                    displayExpr: "DS_ENTREGA",
                                    searchExpr: ["DS_ENTREGA"],
                                    dropDownOptions: {
                                        closeOnOutsideClick: true,
                                        width: 400,
                                    },
                                },
                                alignment: 'center',
                                visible: true,
                                setCellValue: function (newData, value, currentRowData) {
                                    newData.CD_ENTREGA = value;

                                },
                            },
                            {
                                dataField: "PC_MAXIMO_DESCONTO",
                                caption: "% Desc. Máximo",
                                width: 55,
                                dataType: "number",
                                format: "###,###,###,##0.##%",
                                allowEditing: true,
                                allowSorting: true,
                                allowHeaderFiltering: false,
                                visible: true,
                                cssClass: "column-data-grid",
                                setCellValue: function (newData, value, currentRowData) {

                                    var desconto = value / 100
                                    newData.PC_MAXIMO_DESCONTO = desconto;

                                },
                                alignment: 'center',
                            },


                        ],

                        onEditorPrepared: function (e) {
                            if (e.dataField === "CD_CONDICAO_PAGAMENTO" && e.row && e.row.data) {
                                var formaPagamento = e.row.data.CD_FORMA_PAGAMENTO;

                                if (formaPagamento) {
                                    if (e.row.data.condicaoPagamentoDataSource) {
                                        var resultData = e.row.data.condicaoPagamentoDataSource;
                                        var lookupInstance = e.editorElement.dxSelectBox("instance");
                                        if (lookupInstance) {
                                            lookupInstance.option("dataSource", resultData);
                                        } else {
                                            e.editorElement.dxSelectBox({
                                                dataSource: resultData,
                                                value: e.value
                                            });
                                        }
                                    } else if (condicaoPagamentoCache[formaPagamento]) {
                                        var resultData = condicaoPagamentoCache[formaPagamento];
                                        var lookupInstance = e.editorElement.dxSelectBox("instance");
                                        if (lookupInstance) {
                                            lookupInstance.option("dataSource", resultData);
                                        } else {
                                            e.editorElement.dxSelectBox({
                                                dataSource: resultData,
                                                value: e.value
                                            });
                                        }
                                    } else {

                                        GetAzureDataSource(22, `{ CD_FORMA_PAGAMENTO: "${formaPagamento}", CD_STATUS: "A" }`).then((result) => {
                                            if (result.success) {
                                                condicaoPagamentoCache[formaPagamento] = result.data;
                                                e.row.data.condicaoPagamentoDataSource = result.data;
                                                var lookupInstance = e.editorElement.dxSelectBox("instance");
                                                if (lookupInstance) {
                                                    lookupInstance.option("dataSource", result.data);
                                                } else {
                                                    e.editorElement.dxSelectBox({
                                                        dataSource: result.data,
                                                        value: e.value
                                                    });
                                                }
                                            } else {
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
                            }
                        },

                        toolbar: {
                            items: [
                                {
                                    location: 'after',
                                    widget: 'dxButton',
                                    options: {
                                        text: 'Adicionar Produtos',
                                        hint: "Adicionar produtos selecionados",
                                        width: 150,
                                        icon: 'save',
                                        onClick(e) {
                                            dataGrid.saveEditData();

                                        },
                                    },
                                },
                                'groupPanel',
                                'columnChooserButton',
                                'searchPanel',
                            ],
                        },
                        showBorders: true,

                        onCellPrepared: function (e) {
                            if (e.rowType === "data") {
                                if (e.column.dataField === "LG_FORA_LINHA") {
                                    e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                                    e.cellElement.css("color", "white");
                                }
                                if (e.column.dataField === "PC_MAXIMO_DESCONTO" || e.column.dataField === "VL_PRECO_VENDA" || e.column.dataField === "CD_FORMA_PAGAMENTO" || e.column.dataField === "CD_CONDICAO_PAGAMENTO" || e.column.dataField === "CD_ENTREGA") {
                                    e.cellElement.css("background-color", "#EDF3F8");
                                    //e.cellElement.css("font-weight", "bold");

                                    if (e.value < 0) {
                                        e.cellElement.css("color", "#d00000");
                                    };
                                }
                                if (e.column.dataField === "CD_CONDICAO_PAGAMENTO" && e.data) {
                                    var formaPagamento = e.data.CD_FORMA_PAGAMENTO;

                                    if (formaPagamento) {
                                        let resultData = null;
                                        if (e.data.condicaoPagamentoDataSource) {
                                            resultData = e.data.condicaoPagamentoDataSource;
                                        } else if (condicaoPagamentoCache[formaPagamento]) {
                                            resultData = condicaoPagamentoCache[formaPagamento];
                                        }

                                        if (resultData) {
                                            var item = resultData.find(item => item.CD_CONDICAO_PAGAMENTO === e.data.CD_CONDICAO_PAGAMENTO);

                                            if (item) {

                                                e.cellElement.attr('data-value', item.CD_CONDICAO_PAGAMENTO);

                                            }
                                        }
                                    }
                                }
                            }

                        },
                        onSaving(e) {

                            e.cancel = true;

                            if (e.changes.length > 0) {
                                let listaDescontoProdutoFixo = e.changes.map(change => {
                                    return {
                                        Cd_Produto: change.key,
                                        Cd_Forma_Pagamento: change.data.CD_FORMA_PAGAMENTO !== undefined ? change.data.CD_FORMA_PAGAMENTO : null,
                                        Vl_Preco_Venda: change.data.VL_PRECO_VENDA !== undefined ? change.data.VL_PRECO_VENDA : null,
                                        Cd_Condicao_Pagamento: change.data.CD_CONDICAO_PAGAMENTO !== undefined ? change.data.CD_CONDICAO_PAGAMENTO : null,
                                        Cd_Entrega: change.data.CD_ENTREGA !== undefined ? change.data.CD_ENTREGA : null,
                                        Pc_Maximo_Desconto: change.data.PC_MAXIMO_DESCONTO !== undefined ? change.data.PC_MAXIMO_DESCONTO : null,
                                        Cd_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,

                                    };
                                });

                                const listaComPreco = listaDescontoProdutoFixo.filter(item => item.VL_PRECO_VENDA !== null);
                                const listaSemPreco = listaDescontoProdutoFixo.filter(item => item.VL_PRECO_VENDA === null);

                                if (listaSemPreco.length > 0) {
                                    new PNotify({
                                        title: 'Item sem preço do cliente',
                                        text: 'Algum item da lista está sem o preço do cliente e não pode ser adicionado!',
                                        type: 'alert',
                                        width: '50%'
                                    });
                                }

                                if (listaComPreco.length > 0) {

                                    SalvarDescontoProdutoPrecoFixo(listaComPreco);

                                } else {
                                    new PNotify({
                                        title: 'Nenhum item adicionado',
                                        text: 'Os produtos precisam ter preço do cliente para serem adicionados!',
                                        type: 'alert',
                                        width: '50%'
                                    });

                                }

                            } else {
                                new PNotify({
                                    title: 'Nenhum item adicionado',
                                    text: 'Ao menos um item precisa ser adicionado!',
                                    type: 'alert',
                                    width: '50%'
                                });

                            }
                        },

                        paging: { enabled: true, pageSize: 10 },
                        scrolling: { mode: 'virtual' },
                        selectedRowKeys: [value],
                        height: '100%',
                        onSelectionChanged(selectedItems) {
                            const keys = selectedItems.selectedRowKeys;
                            e.component.option('value', keys);

                        },
                    });

                    dataGrid = $dataGrid.dxDataGrid('instance');

                    e.component.on('valueChanged', (args) => {
                        const { value } = args;
                        dataGrid.selectRows(value, false);
                    });

                    return $dataGrid;
                },

            });

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
}

function SalvarDescontoProdutoPrecoFixo(listaDescontoProdutoFixo) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/SalvarDescontoProdutoPrecoFixoCliente",
            data: { cliente: JSON.stringify(listaDescontoProdutoFixo) },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {

        $("#gridBoxProdutos").dxDropDownBox("instance").close();
        $("#gridBoxProdutos").dxDropDownBox("instance").option("value", null);

        CarregaDescontoPrecoFixo();
        listaDescontoProdutoFixo = [];

        new PNotify({
            title: 'Alteração!',
            text: 'Alterações Concluídas com sucesso!',
            type: 'success',
            width: '28%'
        });

    });

}

function ValidarExcluirProdutoPrecoFixo(x) {

    if (itemSelecionadoGridProdutoPrecoFixo.length > 0) {

        AbrirModal('#ModalConfirmacaoExclusaoProdutosPrecoFixo');

    } else {

        new PNotify({
            title: 'Produto não selecionado!',
            text: 'Nenhum Produto foi selecionado, selecione ao menos um Produto para excluir',
            type: 'alert',
            width: "28%"
        });

    }

}

function ExclusaoProdutoPrecoFixoCliente() {

    objForma = itemSelecionadoGridProdutoPrecoFixo.map((x) => x.NR_SEQUENCIA);

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: '/CadastrosGerais/ExclusaoProdutoPrecoFixoCliente',
            data: { cliente: clienteSelecionado.CD_PESQUISA, produto: objForma },
            success: function (response) {
                resolve(response);

            },
            error: function (error) {
                reject(error);

            }
        });

    }).then(function (response) {

        new PNotify({
            title: 'Limpar descontos e acréscimos!',
            text: 'Desconto e Acréscimos excluídos!',
            type: 'success',
            width: '28%'
        });

        CarregaDescontoPrecoFixo();

        itemSelecionadoGridProdutoPrecoFixo = [];
        gridPrecoFixoProdutosCliente.selectRows("value", false);


    });
}

function AlterarTipoDespachoProdutoFixoCliente() {

    let despacho = lkpAlterarDespachoPrecoFixo.option('value');
    let nrSequencia = itemSelecionadoGridProdutoPrecoFixo.map((x) => x.NR_SEQUENCIA);
    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: '/CadastrosGerais/AlterarTipoDespachoProdutoFixoCliente',
            data: {
                cliente: clienteSelecionado.CD_PESQUISA,
                produtos: nrSequencia,
                tipoDespacho: despacho,
            },
            success: function (response) {
                resolve(response);

            },
            error: function (error) {
                reject(error);

            }
        });

    }).then(function (response) {
        FecharModal('#ModalAlterarDespachoPrecoFixo');

        new PNotify({
            title: 'Dados gravados com sucesso!',
            text: 'Tipo de despacho alterado com sucesso!',
            type: 'success',
            width: '28%'
        });
        gridPrecoFixoProdutosCliente.selectRows("value", false);

        CarregaDescontoPrecoFixo();

    });

}

function AlterarDescontoMaximoPrecoFixoCliente() {

    let desconto = valorAlteracaoDescontoMaximoGrid.option('value');
    let nrSequencia = itemSelecionadoGridProdutoPrecoFixo.map((x) => x.NR_SEQUENCIA);
    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: '/CadastrosGerais/AlterarDescontoMaximoPrecoFixoCliente',
            data: {
                cliente: clienteSelecionado.CD_PESQUISA,
                produtos: nrSequencia,
                descontoMax: desconto !== null ? desconto * 100 : desconto,
            },
            success: function (response) {
                resolve(response);

            },
            error: function (error) {
                reject(error);

            }
        });

    }).then(function (response) {
        FecharModal('#ModalAlterarDescontoMaximo');

        new PNotify({
            title: 'Alteração de Desconto Máximo',
            text: 'Dados gravados com sucesso!',
            type: 'success'
        });

        gridPrecoFixoProdutosCliente.selectRows("value", false);

        CarregaDescontoPrecoFixo();

    });
};

function AlterarFormaPrecoFixoCliente() {

    let forma = lkpAlterarFormaPrecoFixo.option('value');
    let condicao = lkpAlterarCondicaoPrecoFixo.option('value');
    let nrSequencia = itemSelecionadoGridProdutoPrecoFixo.map((x) => x.NR_SEQUENCIA);

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: '/CadastrosGerais/AlterarFormaPrecoFixoCliente',
            data: {
                cliente: clienteSelecionado.CD_PESQUISA,
                produtos: nrSequencia,
                forma: forma,
                condicao: condicao,
            },
            success: function (response) {
                resolve(response);

            },
            error: function (error) {
                reject(error);

            }
        });

    }).then(function (response) {
        FecharModal('#ModalAlterarFormaCondicaoPrecoFixo');

        new PNotify({
            title: 'Alteração de Forma de Pagamento',
            text: 'Dados gravados com sucesso!',
            type: 'success'
        });

        gridPrecoFixoProdutosCliente.selectRows("value", false);
        CarregaDescontoPrecoFixo();

    });
};

function ExclusaoFormaPrecoFixoCliente() {

    let nrSequencia = itemSelecionadoGridProdutoPrecoFixo.map((x) => x.NR_SEQUENCIA);

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: '/CadastrosGerais/ExclusaoFormaPrecoFixoCliente',
            data: {
                cliente: clienteSelecionado.CD_PESQUISA,
                produtos: nrSequencia,
                condicao: null,
            },
            success: function (response) {
                resolve(response);

            },
            error: function (error) {
                reject(error);

            }
        });

    }).then(function (response) {
        FecharModal('#ModalAlterarFormaCondicaoPrecoFixo');

        new PNotify({
            title: 'Alteração de Condição de Pagamento',
            text: 'Dados gravados com sucesso!',
            type: 'success'
        });

        gridPrecoFixoProdutosCliente.selectRows("value", false);
        CarregaDescontoPrecoFixo();

    });
};

function exibirExemploReajuste() {
    var valorExemplo = 100;
    var valorReajustadoPrecoFixo = 0;

    const result = DevExpress.validationEngine.validateGroup("ReajustaPrecoFixo");

    if (result.isValid) {

        var linha1;
        if (tipoValorReajuste === '%') {
            linha1 = `Você escolheu ${valorOperadorReajuste === 'A' ? 'aumentar' : 'reduzir'} o preço dos produtos selecionados em ${valorNumberBoxReajuste}${tipoValorReajuste}`;
        } else {
            linha1 = `Você escolheu ${valorOperadorReajuste === 'A' ? 'aumentar' : 'reduzir'} o preço dos produtos selecionados em R$ ${valorNumberBoxReajuste.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`;
        }

        var linha2_coluna1 = 'Preço antes do reajuste: ';
        var linha2_coluna2 = `R$ ${valorExemplo.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`;

        var linha3_coluna1;
        var linha3_coluna2;
        if (tipoValorReajuste === '%') {
            linha3_coluna1 = `${valorOperadorReajuste === 'A' ? 'Aumentando' : 'Reduzindo'} o preço em ${valorNumberBoxReajuste}${tipoValorReajuste}: `;
            linha3_coluna2 = `R$ ${valorExemplo.toLocaleString('pt-br', { minimumFractionDigits: 2 })} ${valorOperadorReajuste === 'A' ? '+' : '-'} ${valorNumberBoxReajuste}${tipoValorReajuste}`;
        } else {
            linha3_coluna1 = `${valorOperadorReajuste === 'A' ? 'Aumentando' : 'Reduzindo'} o preço em R$: ${valorNumberBoxReajuste.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`;
            linha3_coluna2 = `R$ ${valorExemplo.toLocaleString('pt-br', { minimumFractionDigits: 2 })} ${valorOperadorReajuste === 'A' ? '+' : '-'} R$ ${valorNumberBoxReajuste.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`;
        }

        if (tipoValorReajuste === '%') {
            if (valorOperadorReajuste === 'A') {
                valorReajustadoPrecoFixo = valorExemplo * (1 + (valorNumberBoxReajuste / 100));
            } else {
                valorReajustadoPrecoFixo = valorExemplo * (1 - (valorNumberBoxReajuste / 100));
            }
        } else {
            if (valorOperadorReajuste === 'A') {
                valorReajustadoPrecoFixo = valorExemplo + valorNumberBoxReajuste;
            } else {
                valorReajustadoPrecoFixo = valorExemplo - valorNumberBoxReajuste;
            }
        }

        valorReajustadoPrecoFixo = valorReajustadoPrecoFixo.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        var linha4_coluna1 = 'Novo preço do Cliente: ';
        var linha4_coluna2 = `R$ ${valorReajustadoPrecoFixo}`;

        $('#reajustePrecoFixo_linha1').hide().text(linha1).fadeIn(500);
        $('#reajustePrecoFixo_linha2_coluna1').hide().text(linha2_coluna1).fadeIn(500);
        $('#reajustePrecoFixo_linha2_coluna2').hide().text(linha2_coluna2).fadeIn(500);
        $('#reajustePrecoFixo_linha3_coluna1').hide().text(linha3_coluna1).fadeIn(500);
        $('#reajustePrecoFixo_linha3_coluna2').hide().text(linha3_coluna2).fadeIn(500);
        $('#reajustePrecoFixo_linha4_coluna1').hide().text(linha4_coluna1).fadeIn(500);
        $('#reajustePrecoFixo_linha4_coluna2').hide().text(linha4_coluna2).fadeIn(500);

        document.getElementById("FiltrosReajuste").style.display = 'none';
        document.getElementById("ValidacaoCampos").style.display = 'none';
        document.getElementById("ExemploReajuste").style.display = 'block';
        document.getElementById("RodapeReajuste").style.display = 'none';

    } else {
        DevExpress.ui.notify({
            message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
            type: 'error',
            displayTime: 5000,
        });
    }
}

function inibirExemploReajuste() {

    document.getElementById("FiltrosReajuste").style.display = 'block';
    document.getElementById("ExemploReajuste").style.display = 'none';
    document.getElementById("ValidacaoCampos").style.display = 'none';
    document.getElementById("RodapeReajuste").style.display = 'block';

};

function ValidarReajustarPrecoFixoProduto(x) {

    if (itemSelecionadoGridProdutoPrecoFixo.length > 0) {

        AbrirModal('#ModalAjustarPrecoFixoProduto');

    } else {

        new PNotify({
            title: 'Produto não selecionado!',
            text: 'Nenhum Produto foi selecionado, selecione ao menos um Produto para Reajustar Preço',
            type: 'alert',
            width: "28%"
        });

    }

}

function AlterarPrecoFixoProdutoCliente() {

    FecharModal('#ModalAjustarPrecoFixoProduto');

    const novaLista = itemSelecionadoGridProdutoPrecoFixo.map(item => {

        let novoItem = { ...item };
        let valorAtual = parseFloat(novoItem.VL_PRECO_CLIENTE);
        let valorReajustado;

        if (tipoValorReajuste === '%') {

            if (valorOperadorReajuste === 'A') {
                valorReajustado = valorAtual * (1 + (valorNumberBoxReajuste / 100));
            } else if (valorOperadorReajuste === 'R') {
                valorReajustado = valorAtual * (1 - (valorNumberBoxReajuste / 100));
            }
        } else if (tipoValorReajuste === 'R$') {

            if (valorOperadorReajuste === 'A') {
                valorReajustado = valorAtual + valorNumberBoxReajuste;
            } else if (valorOperadorReajuste === 'R') {
                valorReajustado = valorAtual - valorNumberBoxReajuste;
            }
        }

        valorReajustado = valorReajustado.toFixed(2);

        return {
            CD_EMPRESA: null,
            CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
            CD_PRODUTO: item.CD_PRODUTO,
            NR_SEQUENCIA: item.NR_SEQUENCIA,
            CD_CONDICAO_PAGAMENTO: item.CD_CONDICAO_PAGAMENTO,
            CD_FORMA_PAGAMENTO: item.CD_FORMA_PAGAMENTO,
            CD_ENTREGA: item.CD_ENTREGA,
            VL_PRECO_VENDA: valorReajustado,
            PC_MAXIMO_DESCONTO: item.PC_MAXIMO_DESCONTO
        };

    });

    let requests = novaLista.map(produto => () => new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: "/CadastrosGerais/AlteraPrecoProdutoCliente",
            data: { produto: JSON.stringify(produto) },
            success: resolve,
            error: (xhr, status, error) => reject(error)
        });
    }));

    function limitarExecucoes(arrayDePromises, limite) {
        let index = 0;
        let executando = 0;

        function proxima(resolve, reject) {
            while (executando < limite && index < arrayDePromises.length) {
                executando++;
                const i = index++;
                arrayDePromises[i]()
                    .catch(erro => `Erro: ${erro}`)
                    .finally(() => {
                        executando--;
                        proxima(resolve, reject);
                    });
            }

            if (executando === 0) {
                resolve();
            }
        }

        return proxima;
    }

    let limitador = limitarExecucoes(requests, 5);

    return new Promise((resolve, reject) => {
        limitador(resolve, reject);
    }).then(() => {
        inibirExemploReajuste();
        CarregaDescontoPrecoFixo();
        itemSelecionadoGridProdutoPrecoFixo = [];
        gridPrecoFixoProdutosCliente.selectRows(null);

    }).catch(erro => {
        new PNotify({
            title: 'Ocorreu um erro ao Reajustar Preços dos Produtos!',
            text: erro,
            type: 'error',
            width: "50%"
        });
    });

}

function fetchCondicaoPagamento(formaPagamento, callback) {
    if (!formaPagamento) {
        if (callback) callback([]);
        return;
    }

    GetAzureDataSource(22, `{ CD_FORMA_PAGAMENTO: "${formaPagamento}", CD_STATUS: "A" }`).then((result) => {
        if (result.success) {
            dataSourceCondicaoPagamento = result.data;
            if (callback) callback(result.data);
        } else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
            if (callback) callback([]);
        }
    });
}

//window.onresize = function () {
//    configuraModals();
//};

//#endregion

//INICIA CARREGAMENTO TELA
$(() => {
    CarregaParametrosGeraisCliente();
    CarregaUsuarioConfiguracoesParans();
    CarregaCategoriaCliente();
    CarregaRamoAtividadeCliente();
    CarregaRegiaoCliente();
    CarregaMunicipios();
    /*CarregaCredenciaisSerasa(false);*/
    //CarregaTabelaPrecoCliente();
    //CarregaContaCorrenteCliente();
    //CarregaFormaPagamentoCliente();
    //CarregaTransportadoraCliente();

    //POPUP DE LOAD

    // CAMPOS GERAIS
    //#region [campos gerais]
    loaPanel = $('#load_Panel').dxLoadPanel({
        shadingColor: 'rgba(0,0,0,0.4)',
        message: 'Carregando, Aguarde...',
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        hideOnOutsideClick: false,

    }).dxLoadPanel('instance');

    lkp_Cliente_Pesquisa = $('#lkp_Cliente_Pesquisa').dxLookup({
        searchExpr: ['DS_PESQUISA'],
        displayExpr: 'DS_PESQUISA',
        valueExpr: 'CD_PESQUISA',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Clientes',
        },
        placeholder: 'Pesquisar um Cliente para edição',
        showClearButton: true,
        onValueChanged: function (e) {
            clienteSelecionado = e.component.option('selectedItem');

            if (clienteSelecionado) {
                if (clickAbaContaCorrente) {
                    CarregaExtratoContaCorrenteCliente(clienteSelecionado)

                }
                if (clickAbaSerasa) {
                    CarregaListSerasaUsuario(clienteSelecionado, false)
                    novaConsultaAbaSerasa()
                    loaPanel.show();

                }
                if (clickAbaCompradores) {
                    CarregaCompradoresAutorizados(clienteSelecionado)

                }
                if (clickAbaPressificacao == 'panelDescontoForma') {
                    console.log('chama função por forma')
                    CarregaDescontoForma();

                } else if (clickAbaPressificacao == 'panelDescontoFamilia') {
                    CarregaDescontoFamilia();

                } else if (clickAbaPressificacao == 'panelDescontoProduto') {
                    CarregaDescontoProduto();

                } else if (clickAbaPressificacao == 'panelPrecoFixoProduto') {
                    CarregaDescontoPrecoFixo();
                }
                txt_Cd_CPF_CNPJ.option("readOnly", true);
                CarregaClienteSelecionado(clienteSelecionado.CD_PESQUISA)
                CarregaEnderecosClientes(clienteSelecionado.CD_PESQUISA)
                console.log('cliente selecionado', clienteSelecionado.CD_PESQUISA)

            }
            //else {
            //    //FUNÇÃO PARA LIMPAR OS CAMPOS AQUI

            //    txt_Cd_CPF_CNPJ.option("readOnly", false);
            //    txt_Cd_CPF_CNPJ.option("value", null);

            //}

        },

    }).dxLookup('instance');



    //LKP CLIENTE INDICADOR
    lkp_Cliente_Indicador = $('#lkp_Cliente_Indicador').dxLookup({
        dataSource: new DevExpress.data.CustomStore({
            loadMode: 'raw',
            key: 'CD_PESQUISA',
            load() {
                return result.data;
            },
        }),
        searchExpr: ['DS_PESQUISA'],
        displayExpr: 'DS_PESQUISA',
        valueExpr: 'CD_PESQUISA',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Clientes',
        },
        labelMode: 'floating',
        label: 'Cliente indicado por',
        placeholder: 'Indicado por',
        showClearButton: true,

    }).dxLookup('instance');

    //LKP TABELA PREÇO CLIENTE
    lkp_Tabela_Preco = $('#lkp_Tabela_Preco').dxLookup({
        searchExpr: ['DS_PESQUISA'],
        displayExpr: 'DS_PESQUISA',
        valueExpr: 'CD_PESQUISA',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Tabela de Preços',
        },
        labelMode: 'floating',
        label: 'Tabela de Preço do Cliente',
        placeholder: 'Tabela de Preço do Cliente',
        showClearButton: true,
    }).dxLookup('instance');

    //LKP MUNICIPIOS
    lkp_Ds_Municipio = $('#lkp_Ds_Municipio').dxLookup({
        searchExpr: ['DS_MUNICIPIO_UF'],
        displayExpr: 'DS_MUNICIPIO_UF',
        valueExpr: 'CD_MUNICIPIO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Cidade',
        },
        labelMode: 'floating',
        label: 'Cidade',
        placeholder: '',
        showClearButton: true,
    }).dxLookup('instance');

    //LKP CATEGORIAS DE CLIENTES
    lkp_Categoria = $('#lkp_Categoria').dxLookup({
        searchExpr: ['DS_CATEGORIA_CLIENTE'],
        displayExpr: 'DS_CATEGORIA_CLIENTE',
        valueExpr: 'CD_CATEGORIA_CLIENTE',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Categoria do Cliente',
        },
        labelMode: 'floating',
        label: 'Categoria',
        placeholder: '',
        showClearButton: false,
    }).dxLookup('instance');

    //LKP FORMA PAGAMENTO FATURAMENTO
    lkp_Forma_Condicao_Pagamento = $('#lkp_Forma_Condicao_Pagamento').dxLookup({
        searchExpr: ['DS_PESQUISA'],
        displayExpr: 'DS_PESQUISA',
        valueExpr: 'CD_PESQUISA',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Forma e Condição',
        },
        labelMode: 'floating',
        label: 'Forma de Pagamento para Faturamento',
        placeholder: 'Forma e Condição de Pagamento',
        showClearButton: true,
    }).dxLookup('instance');

    //LKP RAMO ATIVIDADE
    lkp_Ramo_Atividade = $('#lkp_Ramo_Atividade').dxLookup({
        searchExpr: ['DS_RAMO_ATIVIDADE'],
        displayExpr: 'DS_RAMO_ATIVIDADE',
        valueExpr: 'CD_RAMO_ATIVIDADE',
        value: 1,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Ramo de Atividade',
        },
        labelMode: 'floating',
        label: 'Ramo de Atividade',
        placeholder: '',
        showClearButton: false,
    }).dxLookup('instance');

    //LKP CONTA CORRENTE PARA CNAB
    lkp_Conta_Corrente_Boleto = $('#lkp_Conta_Corrente_Boleto').dxLookup({
        searchExpr: ['DS_PESQUISA'],
        displayExpr: 'DS_PESQUISA',
        valueExpr: 'CD_CHAVE',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Conta Corrente para emissão de Boleto de Cobrança',
        },
        labelMode: 'floating',
        label: 'Conta Corrente para emissão de Boleto de Cobrança',
        placeholder: 'Conta Corrente para emissão de Boleto de Cobrança',
        showClearButton: true,
        readOnly: false,
    }).dxLookup('instance');

    //LKP TRANSPORTADORAS
    lkp_Transportadoras = $('#lkp_Transportadoras').dxLookup({
        searchExpr: ['DS_PESQUISA'],
        displayExpr: 'DS_PESQUISA',
        valueExpr: 'CD_PESQUISA',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Transportadoras',
        },
        labelMode: 'floating',
        label: 'Transportadora padrão do Cliente',
        placeholder: 'Transportadora padrão do Cliente',
        showClearButton: true,
    }).dxLookup('instance');

    //LKP REGIÃO 
    lkp_Regiao = $('#lkp_Regiao').dxLookup({
        searchExpr: ['DS_REGIAO'],
        displayExpr: 'DS_REGIAO',
        valueExpr: 'CD_REGIAO',
        //value: 1,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Região',
        },
        labelMode: 'floating',
        label: 'Região',
        placeholder: '',
        showClearButton: true,
    }).dxLookup('instance');

    lkp_Status_Cliente = $('#lkp_Status_Cliente').dxLookup({
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
            title: 'Status do Cliente',
        },
        labelMode: 'floating',
        label: 'Status do Cliente',
        placeholder: '',
        showClearButton: false,
        onValueChanged(e) {
            if (e.value == 'I') {
                e.component.option('elementAttr', { class: 'status_inativo' });
            } else {
                e.component.option('elementAttr', { class: 'status_ativo' });
            };
        },
    }).dxLookup('instance');

    gridconsultaClientes = $("#gridconsultaClientes").dxDataGrid({
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
        paging: { pageSize: 20 },
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
            var worksheet = workbook.addWorksheet('Clientes');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ConsultaGeralClientes.xlsx');
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
        keyExpr: 'CD_CPF_CNPJ',
        columns: [
            { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ", width: 100, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", hidingPriority: 203, },
            { dataField: "DS_RAZAO_SOCIAL", caption: "Razão Social", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", allowHiding: false, },
            { dataField: "DS_FANTASIA", caption: "Nome Fantasia", width: 220, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", hidingPriority: 202, },
            { dataField: "DS_STATUS", caption: "Status", width: 75, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", allowHiding: false, },
            { dataField: "CD_TIPO_CPF_CNPJ", caption: "Tipo Pessoa", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, hidingPriority: 201, },
            { dataField: "CD_INSCRICAO_ESTADUAL", caption: "IE/RG", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, hidingPriority: 200, },

            { dataField: "DS_CONTATO", caption: "Contato", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", hidingPriority: 149, },
            { dataField: "DS_TELEFONE", caption: "Telefone", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", hidingPriority: 148, },
            { dataField: "DS_FAX", caption: "Telefone 2", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", hidingPriority: 147, },
            { dataField: "DS_CELULAR_1", caption: "Celular 1", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", hidingPriority: 146, },
            { dataField: "DS_CELULAR_2", caption: "Celular 2", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", hidingPriority: 145, },
            { dataField: "DS_WHATSAPP", caption: "WhatsApp", width: 90, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", hidingPriority: 144, },

            { dataField: "DS_CLIENTE_ATUACAO", width: 150, caption: "Atuação", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", hidingPriority: 143, },
            { dataField: "DS_RAMO_ATIVIDADE", width: 150, caption: "Ramo", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", hidingPriority: 142, },
            { dataField: "DS_CATEGORIA_CLIENTE", width: 150, caption: "Categoria", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", hidingPriority: 141, },

            { dataField: "DS_EMAIL", caption: "e-Mails", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, hidingPriority: 140, },
            { dataField: "DT_CADASTRO", caption: "Data Cadastro", dataType: "date", format: "dd/MM/yyyy HH:mm", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, hidingPriority: 139, },
            { dataField: "DT_ATUALIZACAO", caption: "Data Atualização", dataType: "date", format: "dd/MM/yyyy HH:mm", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, hidingPriority: 138, },
            { dataField: "DT_ANIVERSARIO", caption: "Data Aniversário", dataType: "date", format: "dd/MM/yyyy", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, hidingPriority: 137, },
            { dataField: "DS_PROFISSAO", caption: "Profissão", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: false, hidingPriority: 136, },

            {
                caption: "Comercial",
                cssClass: "column-data-grid",
                alignment: "center",
                visible: false,
                columns: [
                    { dataField: "DS_TABELA_PRECO", caption: "Tabela Preços", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: true, hidingPriority: 125, },
                    { dataField: "DS_FORMA_PAGAMENTO", caption: "Forma Pagamento", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: true, hidingPriority: 124, },
                    { dataField: "DS_CONDICAO_PAGAMENTO", caption: "Condição Pagamento", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: true, hidingPriority: 123, },
                    { dataField: "CD_TRANSPORTADORA", caption: "Código Transportadora", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 122, },
                    { dataField: "DS_RAZAO_SOCIAL_TRANSPORTADORA", caption: "Nome Transportadora", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: true, hidingPriority: 121, },
                ]
            },

            {
                caption: "Crédito",
                cssClass: "column-data-grid",
                alignment: "center",
                visible: false,
                columns: [
                    { dataField: "LG_CONTROLA_LIMITE_CREDITO", caption: "Controla Limite", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 120, },
                    { dataField: "VL_LIMITE_CREDITO", caption: "Vl. Limite Crédito", width: 140, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, hidingPriority: 119, },
                    { dataField: "VL_LIMITE_UTILIZADO", caption: "Vl. Limite Utilizado", width: 140, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", visible: true, hidingPriority: 118, },
                    { dataField: "VL_LIMITE_DISPONIVEL", caption: "Vl. Limite Disponível", width: 140, format: "###,###,###,###,##0.00", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'right', cssClass: "column-data-grid", hvisible: true, idingPriority: 117, },
                ]
            },

            {
                caption: "Observações",
                cssClass: "column-data-grid",
                alignment: "center",
                visible: false,
                columns: [
                    { dataField: "DS_OBS", caption: "Obs. Geral (NF-e e Pedido)", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: true, hidingPriority: 116, },
                    { dataField: "LG_OBS_CLIENTE_NF", caption: "Obs. na NF-e", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 115, },
                    { dataField: "LG_OBS_CLIENTE_PEDIDO_VENDA", caption: "Obs. no Pedido", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 114, },
                    { dataField: "DS_OBS_2", caption: "Obs. Restrita", allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'left', cssClass: "column-data-grid", visible: true, hidingPriority: 113, },
                ]
            },


            {
                caption: "e-Mail",
                cssClass: "column-data-grid",
                alignment: "center",
                visible: false,
                columns: [
                    { dataField: "LG_ENVIO_EMAIL_ORCAMENTO", caption: "e-mail Orçamentos", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 112, },
                    { dataField: "LG_ENVIO_EMAIL_PEDIDO_CONTA_CORRENTE", caption: "e-mail Conta Corrente", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 111, },
                    { dataField: "LG_ENVIO_EMAIL_PEDIDO_FATURADO", caption: "e-mail Pedidos Faturados", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 110, },
                    { dataField: "LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS", caption: "Somente Novos Pedidos", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 109, },
                    { dataField: "LG_ENVIO_EMAIL_RESUMO_PEDIDOS_ABERTOS_SEM_NOVOS_PEDIDOS", caption: "Novos e Antigos Pedidos", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 108, },
                    { dataField: "LG_INFORMA_LIMITE_CREDITO_EMAIL_PEDIDO", caption: "Limite Crédito no e-mail", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 107, },
                ]
            },

            {
                caption: "Faturamento",
                cssClass: "column-data-grid",
                alignment: "center",
                visible: false,
                columns: [
                    { dataField: "LG_CAPTACAO_ECOMMERCE", caption: "Cliente e-Commerce", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 99, },
                    { dataField: "LG_OPTANTE_SIMPLES", caption: "Optante Simples", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 106, },
                    { dataField: "LG_ORGAO_PUBLICO", caption: "Orgão Público", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 105, },
                    { dataField: "LG_CADASTRADO_SUFRAMA", caption: "Cadastro Suframa", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 104, },
                    { dataField: "LG_ENVIAR_CARTORIO", caption: "Enviar Cartório Título Vencido ", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 103, },
                    { dataField: "LG_NAO_CONTRIBUINTE_ICMS", caption: "Não Contribuinte ICMS", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 102, },
                    { dataField: "LG_NAO_EFETUA_CALCULO_FCP", caption: "Não Calcular FCP", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 101, },
                    { dataField: "LG_SUBSTITUICAO_TRIBUTARIA", caption: "Substituição por Liminar", width: 80, allowEditing: false, allowSorting: true, allowHeaderFiltering: true, allowFiltering: true, alignment: 'center', cssClass: "column-data-grid", visible: true, hidingPriority: 100, },
                ]
            },

        ],
        showBorders: true,
        onCellPrepared: function (e) {

            if (e.rowType === "data") {
                if (e.column.dataField === "DS_STATUS") {
                    if (e.value === "Inativo") {
                        e.cellElement.css("color", "#d00000");
                        e.cellElement.css("font-weight", "bold");
                    };
                }
            }
        },

        onCellClick: function (e) {
            if (e.rowType === "data") {

                if (document.getElementById("principalClientes").style.display === 'none') {
                    closeConsultaClientesPanel();
                }
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
                        hint: 'Filtro de Clientes por Status',
                        width: 80,
                        elementAttr: {

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
                            loaPanel.show();
                            CarregaClientesDetalhadoGrid(e.value)

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
                            const expanding = e.component.option('text') === 'Expandir Agrupamento';
                            gridconsultaClientes.option('grouping.autoExpandAll', expanding);
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

    }).dxDataGrid('instance');

    //GRID ENDEREÇOS CLIENTE
    gridEnderecosCliente = $("#grid_Enderecos_Cliente").dxDataGrid({
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        columnHidingEnabled: true,
        columnsAutoWidth: true,
        allowColumnResizing: true,
        allowColumnReordering: true,

        editing: {
            mode: 'popup',
            allowUpdating: true,
            startEditAction: 'dblClick',
            allowAdding: true,
            allowDeleting: false,
            useIcons: true,

            popup: {
                showTitle: true,
                titleTemplate: function (element) {
                    const $title = $("<div class='mb-3 mt-3 ml-2' style='font-size: 18px'>").text("Cadastro de Endereço");
                    element.append($title);
                },
                maxWidth: 900,
                height: 450,
            },

            form: {
                labelMode: 'floating',
                items: [
                    {
                        itemType: 'group',
                        colCount: 4,
                        colSpan: 2,
                        items: [
                            {
                                dataField: 'CD_CEP',
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                    {
                                        type: "numeric",
                                        message: "Este campo aceita apenas números",
                                    },
                                    {
                                        type: "stringLength",
                                        min: 8,
                                        max: 8,
                                        message: "O CEP deve conter 8 dígitos numéricos",
                                    },
                                ],
                                editorOptions: {
                                    maxLength: 8,
                                }
                            },
                            {
                                dataField: 'CD_TIPO_ENDERECO',
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                ],
                            },
                            {
                                dataField: "CD_STATUS",
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                ],
                            },

                        ],

                    },
                    {
                        itemType: 'group',
                        colCount: 4,
                        colSpan: 2,
                        items: [
                            {
                                itemType: 'group',
                                colCount: 1,
                                colSpan: 3,
                                items: [
                                    {
                                        dataField: "DS_ENDERECO",
                                        editorOptions: {
                                            maxLength: 60,
                                        },
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },
                                ],

                            },
                            {
                                itemType: 'group',
                                colCount: 1,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "NR_ENDERECO",
                                        editorOptions: {
                                            maxLength: 6,
                                        },
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },
                                ],

                            },
                        ],

                    },
                    {
                        itemType: 'group',
                        colCount: 2,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "DS_ENDERECO_COMPL",
                                editorOptions: {
                                    maxLength: 40,
                                },
                            },
                            {
                                dataField: "CD_REGIAO",
                            },
                        ],

                    },
                    {
                        itemType: 'group',
                        colCount: 2,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "DS_BAIRRO",
                                editorOptions: {
                                    maxLength: 40,
                                },
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                ],
                            },
                            {
                                dataField: "CD_MUNICIPIO",
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                ],
                            },
                        ],

                    },
                    {
                        itemType: 'group',
                        colCount: 1,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "DS_PONTO_REFERENCIA",
                                editorOptions: {
                                    maxLength: 500,
                                },
                            },

                        ],

                    },
                    {
                        itemType: 'group',
                        colCount: 2,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "DS_CONTATO",
                                editorOptions: {
                                    maxLength: 60,
                                },
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                ],
                            },

                        ],

                    },
                    {
                        itemType: 'group',
                        colCount: 4,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "CD_DDD_TELEFONE",
                                editorOptions: {
                                    maxLength: 3,
                                },
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                    {
                                        type: "numeric",
                                        message: "Este campo aceita apenas números",
                                    },
                                    {
                                        type: "stringLength",
                                        min: 2,
                                        max: 3,
                                        message: "O DDD deve conter no mínimo 2 dígitos numéricos",
                                    },
                                ],
                            },
                            {
                                itemType: 'group',
                                colCount: 1,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "DS_TELEFONE",
                                        editorOptions: {
                                            maxLength: 30,
                                        },
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },
                                ],

                            },
                        ],

                    },
                    {
                        itemType: 'group',
                        colCount: 4,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "CD_DDD_FAX",
                                editorOptions: {
                                    maxLength: 3,
                                },
                                validationRules: [
                                    {
                                        type: "numeric",
                                        message: "Este campo aceita apenas números",
                                    },
                                    {
                                        type: "stringLength",
                                        min: 0,
                                        max: 3,
                                        message: "O DDD deve conter no máximo 3 dígitos numéricos",
                                    },
                                ],
                            },
                            {
                                itemType: 'group',
                                colCount: 1,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "DS_FAX",
                                        editorOptions: {
                                            maxLength: 30,
                                        },
                                    },
                                ],

                            },
                        ],

                    },

                ],
            },
        },
        searchPanel: {
            visible: true,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
        },
        sorting: { mode: "multiple" },
        groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
        paging: { pageSize: 20 },
        pager: {
            visible: true,
            allowedPageSizes: [10, 15, 20],
            showPageSizeSelector: false,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Endereços');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ClientesEndereços.xlsx');
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
        keyExpr: 'NR_SEQUENCIA',
        columns: [
            {
                dataField: "CD_TIPO_ENDERECO",
                caption: "Tipo",
                width: 100,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'center',
                lookup: {
                    dataSource: dataSourceTiposEnderecos,
                    valueExpr: "CD_TIPO_ENDERECO",
                    displayExpr: "DS_TIPO_ENDERECO",
                    searchExpr: ["CD_TIPO_ENDERECO, DS_TIPO_ENDERECO"]
                }
            },
            {
                dataField: "DS_ENDERECO",
                caption: "Endereço",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
            },
            {
                dataField: "NR_ENDERECO",
                caption: "Número",
                width: 65,
                dataType: "number",
                format: "#####",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "DS_ENDERECO_COMPL",
                caption: "Complemento",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
            },
            {
                dataField: "DS_BAIRRO",
                caption: "Bairro",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
            },
            {
                dataField: "CD_MUNICIPIO",
                caption: "Cidade",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                lookup: {
                    dataSource: dataSourceMunicipios,
                    valueExpr: "CD_MUNICIPIO",
                    displayExpr: "DS_MUNICIPIO_UF",
                    searchExpr: ["DS_MUNICIPIO_UF"]
                }
            },
            {
                dataField: "CD_CEP",
                caption: "CEP",
                width: 70,
                mask: '00000000',
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "CD_REGIAO",
                caption: "Região",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                lookup: {
                    dataSource: dataSourceRegiao,
                    valueExpr: "CD_REGIAO",
                    displayExpr: "DS_REGIAO",
                    searchExpr: ["DS_REGIAO"]
                }
            },
            {
                dataField: "CD_STATUS",
                caption: "Status",
                width: 75,
                value: 'A',
                allowEditing: true,
                allowHeaderFiltering: false,
                allowSorting: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                lookup: {
                    dataSource: dataSourceStatus,
                    valueExpr: "CD_STATUS",
                    displayExpr: "DS_STATUS"
                }
            },
            {
                dataField: "CD_DDD_TELEFONE",
                caption: "DDD Fone 1",
                width: 90,
                dataType: "number",
                format: "000",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                dataField: "DS_TELEFONE",
                caption: "Telefone 1",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
                alignment: 'center',
                visible: false,
            },

            {
                dataField: "CD_DDD_FAX",
                caption: "DDD Fone 2",
                width: 90,
                dataType: "number",
                format: "000",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                dataField: "DS_FAX",
                caption: "Telefone 2",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
                alignment: 'center',
                visible: false,
            },
            {
                dataField: "DS_CONTATO",
                caption: "Contato",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                dataField: "DS_PONTO_REFERENCIA",
                caption: "Ponto Referência",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                type: "buttons",
                width: 30,
                //cssClass: "column-data-grid",
            },

        ],

        onCellPrepared: function (e) {
            if (e.rowType === "data") {
                if (e.column.dataField === "CD_STATUS" &&
                    e.data.CD_STATUS === 'I') {
                    //e.cellElement.css("background-color", '#f26419');
                    e.cellElement.css("color", '#d00000');
                    e.cellElement.css("font-weight", 'bold');
                }
            }
        },

        toolbar: {
            items: [
                {
                    name: "groupPanel",
                    locateInMenu: "auto",
                },
                {
                    name: 'addRowButton',
                    showText: 'always',
                    options: {
                        type: 'success',
                        text: 'Novo Endereço',
                        hint: 'Novo Endereço',
                    },
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

    }).dxDataGrid('instance');

    dt_Cadastro = $('#dt_Cadastro').dxDateBox({
        labelMode: 'floating',
        label: 'Data de Cadastro',
        placeholder: '',
        readOnly: true,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy HH:mm',
        type: 'date',
        value: Date(),
    }).dxDateBox('instance');

    dt_Aniversario_Abertura = $('#dt_Aniversario_Abertura').dxDateBox({
        labelMode: 'floating',
        label: 'Nascimento',
        placeholder: '',
        readOnly: false,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        //value: Date(),
    }).dxDateBox('instance');

    dt_Atualizacao = $('#dt_Atualizacao').dxDateBox({
        labelMode: 'floating',
        label: 'Última Alteração',
        placeholder: '',
        readOnly: true,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy HH:mm',
        type: 'date',
        value: Date(),
    }).dxDateBox('instance');

    txt_Ds_Razao_Social = $('#txt_Ds_Razao_Social').dxTextBox({
        labelMode: 'floating',
        label: 'Razão Social *',
        maxLength: 60,
        showClearButton: true,
        onValueChanged(e) {
            var razao = e.value;
            var fantasia = txt_Ds_Nome_Fantasia.option('value');

            if (fantasia == null || fantasia == undefined || fantasia == '') {
                txt_Ds_Nome_Fantasia.option('value', razao);
            }

        }
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Razão Social Obrigatório', }], validationGroup: 'Geral' }).dxTextBox('instance');

    txt_Ds_Nome_Fantasia = $('#txt_Ds_Nome_Fantasia').dxTextBox({
        labelMode: 'floating',
        label: 'Nome Fantasia *',
        maxLength: 60,
        showClearButton: true,
        onValueChanged(e) {
            var fantasia = e.value;
            var razao = txt_Ds_Razao_Social.option('value');

            if (razao == null || razao == undefined || razao == '') {
                txt_Ds_Razao_Social.option('value', fantasia);
            }

        }
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Nome Fantasia Obrigatório', }], validationGroup: 'Geral' }).dxTextBox('instance');

    txt_Cd_CPF_CNPJ = $('#txt_Cd_CPF_CNPJ').dxTextBox({
        labelMode: 'floating',
        label: 'CPF/CNPJ (somente números) *',
        mask: '',
        maxLength: 14,
        showClearButton: true,
        onFocusIn(e) {
            if (e.value) {
                if (paransGeral.Lg_Valida_CPF_CNPJ_Cad_Cliente) {
                    applyFormatting(e)
                }

            }

        },
        onValueChanged(e) {
            if (e.value) {
                if (paransGeral.Lg_Valida_CPF_CNPJ_Cad_Cliente) {
                    applyFormatting(e)
                }

                if (!clienteSelecionado) {
                    let dataCliente = lkp_Cliente_Pesquisa.option('dataSource')
                    let x = dataCliente.filter(obj => obj.CD_PESQUISA === e.value);

                    if (x.length != 0) {

                        new PNotify({
                            title: 'Cliente já cadastrado!',
                            text: 'Já existe esse cliente cadastrado, se deseja editar selecione o cliente no campo acima, pesquisa de clientes!',
                            type: 'alert',
                            width: "28%"
                        });
                        e.component.focus($('#txt_Cd_CPF_CNPJ'));

                    }

                }

            }

        },

    }).dxTextBox('instance');

    txt_Cd_IE = $('#txt_Cd_IE').dxTextBox({
        labelMode: 'floating',
        label: 'Inscrição Estadual ou RG',
        maxLength: 25,
        showClearButton: true,
        buttons: [{
            name: 'btnIsento',
            location: 'after',
            options: {
                text: 'Isento',
                disabled: false,
                type: 'gray',
                onClick(e) {
                    if (e.component.option('text') === 'Isento') {
                        e.component.option('text', '');
                        e.component.option('icon', 'edit');
                        txt_Cd_IE.option("value", "Isento");
                        txt_Cd_IE.option("label", "Inscrição Estadual");
                        txt_Cd_IE.option("readOnly", true);
                    } else {
                        e.component.option('text', 'Isento');
                        e.component.option('icon', '');
                        txt_Cd_IE.option("value", "");
                        txt_Cd_IE.option("readOnly", false);
                        txt_Cd_IE.option("label", "Inscrição Estadual ou RG");
                        txt_Cd_IE.focus();
                    }
                },
            },
        }],
    }).dxTextBox('instance');

    lkp_Atuacao = $('#lkp_Atuacao').dxLookup({
        dataSource: dataSourceAtuacao,
        searchExpr: ['DS_ATUACAO'],
        displayExpr: 'DS_ATUACAO',
        valueExpr: 'CD_ATUACAO',
        value: 1,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Atuação do Cliente',
        },
        labelMode: 'floating',
        label: 'Atuação',
        placeholder: '',
        showClearButton: false,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Comprador Obrigatório', }], validationGroup: 'Geral' }).dxLookup('instance');

    nbx_Cd_DDD_Telefone = $('#nbx_Cd_DDD_Telefone').dxNumberBox({
        value: '',
        format: '000',
        writeStylingMode: 'filled',
        min: 0,
        max: 999,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'DDD *',
    }).dxValidator({ validationRules: [{ type: 'required', message: 'DDD do Telefone Obrigatório', }], validationGroup: 'Geral' }).dxNumberBox('instance');

    txt_Ds_Telefone = $('#txt_Ds_Telefone').dxTextBox({
        labelMode: 'floating',
        label: 'Telefone Principal *',
        maxLength: 30,
        showClearButton: true,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Telefone Obrigatório', }], validationGroup: 'Geral' }).dxTextBox('instance');

    nbx_Cd_DDD_Fax = $('#nbx_Cd_DDD_Fax').dxNumberBox({
        value: '',
        format: '000',
        min: 0,
        max: 999,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'DDD 2',
    }).dxNumberBox('instance');

    txt_Ds_Fax = $('#txt_Ds_Fax').dxTextBox({
        labelMode: 'floating',
        label: 'Telefone 2',
        maxLength: 30,
        showClearButton: true,
    }).dxTextBox('instance');

    nbx_Cd_DDD_Celular = $('#nbx_Cd_DDD_Celular').dxNumberBox({
        value: '',
        format: '000',
        min: 0,
        max: 999,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'DDD 3',
    }).dxNumberBox('instance');

    txt_Ds_Celular = $('#txt_Ds_Celular').dxTextBox({
        labelMode: 'floating',
        label: 'Telefone 3',
        maxLength: 30,
        showClearButton: true,
    }).dxTextBox('instance');

    nbx_Cd_DDD_Celular_2 = $('#nbx_Cd_DDD_Celular_2').dxNumberBox({
        value: '',
        format: '000',
        min: 0,
        max: 999,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'DDD 4',
    }).dxNumberBox('instance');

    txt_Ds_Celular_2 = $('#txt_Ds_Celular_2').dxTextBox({
        labelMode: 'floating',
        label: 'Telefone 4',
        maxLength: 30,
        showClearButton: true,
    }).dxTextBox('instance');

    nbx_Cd_DDI_WhatsApp = $('#nbx_Cd_DDI_WhatsApp').dxNumberBox({
        value: '55',
        format: '000',
        min: 0,
        max: 999,
        showClearButton: false,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'DDI',
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Obrigatório para troca de mensagens via WhatsApp' }], validationGroup: 'whatsApp' }).dxNumberBox('instance');

    nbx_Cd_DDD_WhatsApp = $('#nbx_Cd_DDD_WhatsApp').dxNumberBox({
        value: '',
        format: '000',
        min: 0,
        max: 999,
        showClearButton: false,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'DDD',
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Obrigatório para troca de mensagens via WhatsApp' }], validationGroup: 'whatsApp' }).dxNumberBox('instance');

    nbx_Nr_WhatsApp = $('#nbx_Nr_WhatsApp').dxNumberBox({
        value: '',
        format: '000000000',
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: ' WhastApp',
        buttons: [{
            name: 'whatsApp',
            location: 'after',
            options: {
                icon: 'fa fa-whatsapp',
                type: 'success',
                hint: 'Inicie uma conversa no WhatsApp com o Cliente',
                onClick(e) {
                    var ddi = nbx_Cd_DDI_WhatsApp.option('value');
                    var ddd = nbx_Cd_DDD_WhatsApp.option('value')
                    var numero = nbx_Nr_WhatsApp.option('value');
                    var celular = nbx_Cd_DDI_WhatsApp.option('value') + nbx_Cd_DDD_WhatsApp.option('value') + nbx_Nr_WhatsApp.option('value');
                    var contato = txt_Ds_Contato.option('value');

                    const result = DevExpress.validationEngine.validateGroup("whatsApp");

                    if (result.isValid) {
                        iniciarConversaWhatsApp(celular, contato);
                    } else {
                        DevExpress.ui.notify({
                            message: 'Por favor, verifique o preenchimento dos campos obrigatórios para troca de mensagens via WhatsApp.',
                            type: 'error',
                            displayTime: 5000,
                        });
                    }
                },
            },
        }],
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Obrigatório para troca de mensagens via WhatsApp' }], validationGroup: 'whatsApp' }).dxNumberBox('instance');

    txt_Ds_Email = $('#txt_Ds_Email').dxTextBox({
        labelMode: 'floating',
        label: 'e-mails para NF-e (utilize ponto e vírgula para separar os e-mails)',
        maxLength: 1000,
        showClearButton: true,
    }).dxTextBox('instance');

    chk_Email_Envio_Periodicidade_Dias = $('#chk_Email_Envio_Periodicidade_Dias').dxCheckBox({
        value: true,
        text: "INTERVALO EM DIAS",
        elementAttr: {
            class: "class-checkbox-bold"
        },
    }).dxCheckBox('instance');

    chk_Email_Envio_Dia_Especifico = $('#chk_Email_Envio_Dia_Especifico').dxCheckBox({
        value: false,
        text: "DIA FIXO DO MÊS",
        elementAttr: {
            class: "class-checkbox-bold"
        },
    }).dxCheckBox('instance');

    txt_Ds_Email_Pedido = $('#txt_Ds_Email_Pedido').dxTextBox({
        labelMode: 'floating',
        label: 'e-mails do cliente (utilize ponto e vírgula para separar os e-mails)',
        maxLength: 1000,
        showClearButton: true,
    }).dxTextBox('instance');

    txta_Mensagem_Email_Pedido = $('#txta_Mensagem_Email_Pedido').dxTextArea({
        labelMode: 'floating',
        label: 'Mensagem do corpo do e-mail',
        height: 100,
        autoResizeEnabled: false,
        maxLength: 2000,
    }).dxTextArea('instance');

    chk_Email_Orcamento = $('#chk_Email_Orcamento').dxCheckBox({
        value: false,
        text: "Enviar Orçamentos",

        onValueChanged: function (e) {

            if (e.value == true) {

                chk_Email_Lista_Pedidos_Aguardando_Faturamento.option('readOnly', false);
                chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos.option('readOnly', false);
                chk_Email_Pedido_Informar_Limite_Credito.option('readOnly', false);

            } else if (chk_Email_Pedidos_Faturados.option('value') == false && chk_Email_Pedidos_Conta_Corrente.option('value') == false) {

                chk_Email_Lista_Pedidos_Aguardando_Faturamento.option('value', false);
                chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos.option('value', false);
                chk_Email_Pedido_Informar_Limite_Credito.option('value', false);

                chk_Email_Lista_Pedidos_Aguardando_Faturamento.option('readOnly', true);
                chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos.option('readOnly', true);
                chk_Email_Pedido_Informar_Limite_Credito.option('readOnly', true);

            };
        },

    }).dxCheckBox('instance');

    chk_Email_Pedidos_Faturados = $('#chk_Email_Pedidos_Faturados').dxCheckBox({
        value: false,
        text: "Enviar Pedidos Faturados",

        onValueChanged: function (e) {

            if (e.value == true) {

                chk_Email_Lista_Pedidos_Aguardando_Faturamento.option('readOnly', false);
                chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos.option('readOnly', false);
                chk_Email_Pedido_Informar_Limite_Credito.option('readOnly', false);

            } else if (chk_Email_Orcamento.option('value') == false && chk_Email_Pedidos_Conta_Corrente.option('value') == false) {

                chk_Email_Lista_Pedidos_Aguardando_Faturamento.option('value', false);
                chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos.option('value', false);
                chk_Email_Pedido_Informar_Limite_Credito.option('value', false);

                chk_Email_Lista_Pedidos_Aguardando_Faturamento.option('readOnly', true);
                chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos.option('readOnly', true);
                chk_Email_Pedido_Informar_Limite_Credito.option('readOnly', true);

            };
        },
    }).dxCheckBox('instance');

    chk_Email_Pedidos_Conta_Corrente = $('#chk_Email_Pedidos_Conta_Corrente').dxCheckBox({
        value: false,
        text: "Enviar Pedidos Aguardando Faturamento (Conta Corrente)",

        onValueChanged: function (e) {

            if (e.value == true) {

                chk_Email_Lista_Pedidos_Aguardando_Faturamento.option('readOnly', false);
                chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos.option('readOnly', false);
                chk_Email_Pedido_Informar_Limite_Credito.option('readOnly', false);

            } else if (chk_Email_Orcamento.option('value') == false && chk_Email_Pedidos_Faturados.option('value') == false) {

                chk_Email_Lista_Pedidos_Aguardando_Faturamento.option('value', false);
                chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos.option('value', false);
                chk_Email_Pedido_Informar_Limite_Credito.option('value', false);

                chk_Email_Lista_Pedidos_Aguardando_Faturamento.option('readOnly', true);
                chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos.option('readOnly', true);
                chk_Email_Pedido_Informar_Limite_Credito.option('readOnly', true);

            };
        },
    }).dxCheckBox('instance');

    chk_Email_Lista_Pedidos_Aguardando_Faturamento = $('#chk_Email_Lista_Pedidos_Aguardando_Faturamento').dxCheckBox({
        value: false,
        text: "Somente quando houver novos pedidos ou orçamentos no período, enviar também uma lista de pedidos antigos Aguardando Faturamento (Conta Corrente)",
        readOnly: true,

        onValueChanged: function (e) {

            if (e.value == true) {
                chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos.option('value', false);
            };
        },
    }).dxCheckBox('instance');

    chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos = $('#chk_Enviar_Email_Mesmo_Sem_Novos_Pedidos').dxCheckBox({
        value: false,
        text: "Sempre enviar uma lista de pedidos antigos Aguardando Faturamento (Conta Corrente), mesmo que não existam novos pedidos ou orçamentos no período",
        readOnly: true,

        onValueChanged: function (e) {

            if (e.value == true) {
                chk_Email_Lista_Pedidos_Aguardando_Faturamento.option('value', false);
            };
        },
    }).dxCheckBox('instance');

    chk_Email_Pedido_Informar_Limite_Credito = $('#chk_Email_Pedido_Informar_Limite_Credito').dxCheckBox({
        value: false,
        text: "Informar saldo do Limite de Crédito nos e-mails",
        readOnly: true,
    }).dxCheckBox('instance');

    nbx_Email_Pedido_Periodicidade = $('#nbx_Email_Pedido_Periodicidade').dxNumberBox({
        value: '',
        format: 'a cada ### dias',
        min: 0,
        max: 999,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Frequência em dias',
        onValueChanged: function (e) {

            if (e.value) {
                dt_Dia_Envio_Email_Pedido.option('value', null);
                document.getElementById('radioEmailPeriodicidade').checked = true;

            } else {
                document.getElementById('radioEmailPeriodicidade').checked = false;
            }
        },
    }).dxNumberBox('instance');

    dt_Dia_Envio_Email_Pedido = $("#Dt_Dia_Envio_Email_Pedido").dxDateBox({
        placeholder: 'Dia do mês',
        readOnly: false,
        showClearButton: true,
        useMaskBehavior: true,
        displayFormat: "'todo dia' dd",
        onInitialized: e => {
            e.component.option('returnDay', () => {
                const value = e.component.option('value');
                if (value == null) return value;
                return value.getDate();
            });
        },
        onOpened: e => {
            const $content = e.component._popup._$popupContent;
            $content.find('.dx-calendar-navigator').css('display', 'none');
            $content.find('.dx-calendar-body').css('top', '0px');
            $content.find('[aria-label="Calendário"]').find('thead').css('display', 'none');
            $content.find('[aria-label="Calendário"]').find('.dx-calendar-other-month').css('display', 'none');
        },

        onContentReady: function (e) {
            e.component.option('inputAttr', { readonly: true })
        },

        calendarOptions: {
            maxZoomLevel: 'month',
            minZoomLevel: 'month',
            min: new Date(2023, 0, 1),
            max: new Date(2023, 0, 31),
        },
        type: 'date',
        onValueChanged: function (e) {

            if (e.value) {
                nbx_Email_Pedido_Periodicidade.option('value', null);
                document.getElementById('radioEmailDiaFixo').checked = true;

            } else {
                document.getElementById('radioEmailDiaFixo').checked = false;
            }
        },
    }).dxDateBox('instance');

    dia_Fechamento_Inicial_Email_Pedido = $("#Dt_Dia_Fechamento_Inicial_Email_Pedido").dxDateBox({
        placeholder: 'Entre',
        readOnly: false,
        showClearButton: true,
        useMaskBehavior: true,
        displayFormat: "'entre o dia' dd",
        onInitialized: e => {
            e.component.option('returnDay', () => {
                const value = e.component.option('value');
                if (value == null) return value;
                return value.getDate();
            });
        },
        onOpened: e => {
            const $content = e.component._popup._$popupContent;
            $content.find('.dx-calendar-navigator').css('display', 'none');
            $content.find('.dx-calendar-body').css('top', '0px');
            $content.find('[aria-label="Calendário"]').find('thead').css('display', 'none');
            $content.find('[aria-label="Calendário"]').find('.dx-calendar-other-month').css('display', 'none');
        },
        onContentReady: function (e) {
            e.component.option('inputAttr', { readonly: true })
        },
        onValueChanged: function (e) {

            var diaInicial = dia_Fechamento_Inicial_Email_Pedido.option().returnDay();
            var diaFinal

            if (diaInicial == 1) {
                diaFinal = 31;
            } else {
                diaFinal = diaInicial - 1;
            };
            dia_Fechamento_Final_Email_Pedido.option('value', new Date(2023, 0, diaFinal));

            if (!dia_Fechamento_Inicial_Email_Pedido.option('value')) {
                dia_Fechamento_Final_Email_Pedido.option('value', null)
                document.getElementById('radioEmailIntervalo').checked = false;
            } else {
                document.getElementById('radioEmailIntervalo').checked = true;
            }
        },
        calendarOptions: {
            maxZoomLevel: 'month',
            minZoomLevel: 'month',
            min: new Date(2023, 0, 1),
            max: new Date(2023, 0, 31),
        },
        type: 'date',

    }).dxDateBox('instance');

    document.getElementById('radioEmailPeriodicidade').addEventListener('click', function () {
        if (this.checked) {
            dt_Dia_Envio_Email_Pedido.option('value', null)
        }
    });

    document.getElementById('radioEmailDiaFixo').addEventListener('click', function () {
        if (this.checked) {
            nbx_Email_Pedido_Periodicidade.option('value', null)
        }
    });

    document.getElementById('radioEmailMesAnterior').addEventListener('click', function () {
        if (this.checked) {
            dia_Fechamento_Inicial_Email_Pedido.option('value', null)
            dia_Fechamento_Final_Email_Pedido.option('value', null)
        }
    });

    dia_Fechamento_Final_Email_Pedido = $("#Dt_Dia_Fechamento_Final_Email_Pedido").dxDateBox({
        placeholder: 'Até',
        readOnly: true,
        showClearButton: true,
        useMaskBehavior: true,
        displayFormat: "'até o dia' dd",
        onInitialized: e => {
            e.component.option('returnDay', () => {
                const value = e.component.option('value');
                if (value == null) return value;
                return value.getDate();
            });
        },
        onOpened: e => {
            const $content = e.component._popup._$popupContent;
            $content.find('.dx-calendar-navigator').css('display', 'none');
            $content.find('.dx-calendar-body').css('top', '0px');
            $content.find('[aria-label="Calendário"]').find('thead').css('display', 'none');
            $content.find('[aria-label="Calendário"]').find('.dx-calendar-other-month').css('display', 'none');
        },
        onContentReady: function (e) {
            e.component.option('inputAttr', { readonly: true })
        },
        calendarOptions: {
            maxZoomLevel: 'month',
            minZoomLevel: 'month',
            min: new Date(2023, 0, 1),
            max: new Date(2023, 0, 31),
        },
        type: 'date',
    }).dxDateBox('instance');

    txt_Ds_Contato = $('#txt_Ds_Contato').dxTextBox({
        labelMode: 'floating',
        label: 'Contato *',
        maxLength: 60,
        showClearButton: true,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Contato Obrigatório', }], validationGroup: 'Geral' }).dxTextBox('instance');

    txt_Ds_Profissao = $('#txt_Ds_Profissao').dxTextBox({
        labelMode: 'floating',
        label: 'Profissão',
        maxLength: 20,
        showClearButton: true,
    }).dxTextBox('instance');

    txt_Ds_Web_Site = $('#txt_Ds_Web_Site').dxTextBox({
        labelMode: 'floating',
        label: 'Website do Cliente',
        maxLength: 150,
        showClearButton: true,
    }).dxTextBox('instance');

    txta_Obs_Pedido_Nota = $('#txta_Obs_Pedido_Nota').dxTextArea({
        labelMode: 'floating',
        autoResizeEnabled: true,
        maxLength: 4000,
    }).dxTextArea('instance');

    chk_Incluir_Obs_Nota_Fiscal = $('#chk_Incluir_Obs_Nota_Fiscal').dxCheckBox({
        value: false,
        text: "Incluir a observação acima em Notas Fiscais emitidas para o Cliente",
    }).dxCheckBox('instance');

    chk_Incluir_Obs_Pedido = $('#chk_Incluir_Obs_Pedido').dxCheckBox({
        value: false,
        text: "Incluir a observação acima em Pedidos emitidos para o Cliente",
    }).dxCheckBox('instance');

    chk_Optante_Simples = $('#chk_Optante_Simples').dxCheckBox({
        value: false,
        text: "Optante pelo Simples",
    }).dxCheckBox('instance');

    chk_Nao_Contribuinte_ICMS = $('#chk_Nao_Contribuinte_ICMS').dxCheckBox({
        value: false,
        text: "Cliente não contribuinte do ICMS",
    }).dxCheckBox('instance');

    chk_Orgao_Publico = $('#chk_Orgao_Publico').dxCheckBox({
        value: false,
        text: "Cliente é Orgão Público",
    }).dxCheckBox('instance');

    chk_Nao_Calcular_FCP = $('#chk_Nao_Calcular_FCP').dxCheckBox({
        value: false,
        text: "Não calcular FCP (Fundo de Combate a Pobreza) para este cliente na emissão da NF-e",
    }).dxCheckBox('instance');

    nbx_Pc_Substituicao_Tributaria = $('#nbx_Pc_Substituicao_Tributaria').dxNumberBox({
        value: '',
        format: '###,###,###,##0.00 %',
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 0.01,
        labelMode: 'floating',
        label: '% Subst. Tribut. Liminar',
    }).dxNumberBox('instance');

    txt_CNAE = $('#txt_CNAE').dxTextBox({
        labelMode: 'floating',
        label: 'Código do CNAE',
        maxLength: 20,
        showClearButton: true,
    }).dxTextBox('instance');

    txt_Codigo_Beneficio_Fiscal = $('#txt_Codigo_Beneficio_Fiscal').dxTextBox({
        labelMode: 'floating',
        label: 'Código do Benefício Fiscal',
        maxLength: 20,
        showClearButton: true,
    }).dxTextBox('instance');

    txt_Suframa = $('#txt_Suframa').dxTextBox({
        labelMode: 'floating',
        label: 'Código do Suframa',
        maxLength: 20,
        showClearButton: true,
    }).dxTextBox('instance');

    txta_Obs_Nao_Destacada = $('#txta_Obs_Nao_Destacada').dxTextArea({
        labelMode: 'floating',
        autoResizeEnabled: true,
        maxLength: 4000,
    }).dxTextArea('instance');

    chk_Controla_Limite_Credito = $('#chk_Controla_Limite_Credito').dxCheckBox({
        value: false,
        text: "Aplicar controle de limite de crédito",
    }).dxCheckBox('instance');

    nbx_Limite_Credito = $('#nbx_Limite_Credito').dxNumberBox({
        value: '',
        format: 'R$ ###,###,###,##0.00',
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1000,
        labelMode: 'floating',
        label: 'Limite de Crédito',
    }).dxNumberBox('instance');

    nbx_Limite_Credito_Utilizado = $('#nbx_Limite_Credito_Utilizado').dxNumberBox({
        value: 0,
        format: 'R$ ###,###,###,##0.00',
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1000,
        labelMode: 'floating',
        label: 'Limite Utilizado',
        readOnly: true,
    }).dxNumberBox('instance');

    nbx_Limite_Credito_Disponivel = $('#nbx_Limite_Credito_Disponivel').dxNumberBox({
        value: 0,
        format: 'R$ ###,###,###,##0.00',
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1000,
        labelMode: 'floating',
        label: 'Limite Disponível',
        readOnly: true,
    }).dxNumberBox('instance');

    chk_Enviar_Cartorio = $('#chk_Enviar_Cartorio').dxCheckBox({
        value: false,
        text: "Ativar lembrete no Relatório de Contas a Receber para envio de títulos vencidos para cartório, de acordo com a quantidade de dias de atraso prenchido no campo abaixo",
    }).dxCheckBox('instance');

    nbx_Dias_Vencimento_Envio_Cartorio = $('#nbx_Dias_Vencimento_Envio_Cartorio').dxNumberBox({
        value: '',
        format: '###,###,###,##0',
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        labelMode: 'floating',
        label: 'Dias de atraso',
    }).dxNumberBox('instance');

    txt_Ds_Endereco = $('#txt_Ds_Endereco').dxTextBox({
        labelMode: 'floating',
        label: 'Endereço',
        maxLength: 100,
        showClearButton: true,
    }).dxTextBox('instance');

    nbx_Nr_Endereco = $('#nbx_Nr_Endereco').dxNumberBox({
        value: '',
        format: '#####',
        min: 0,
        max: 99999,
        maxLength: 5,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'Número',
    }).dxNumberBox('instance');

    txt_Ds_Endereco_Compl = $('#txt_Ds_Endereco_Compl').dxTextBox({
        labelMode: 'floating',
        label: 'Complemento',
        maxLength: 40,
        showClearButton: true,
    }).dxTextBox('instance');

    txt_Ds_Endereco_Referencia = $('#txt_Ds_Endereco_Referencia').dxTextBox({
        labelMode: 'floating',
        label: 'Ponto de Referência',
        maxLength: 500,
        showClearButton: true,
    }).dxTextBox('instance');

    txt_Ds_Bairro = $('#txt_Ds_Bairro').dxTextBox({
        labelMode: 'floating',
        label: 'Bairro',
        maxLength: 100,
        showClearButton: true,
    }).dxTextBox('instance');

    nbx_Cd_CEP = $('#nbx_Cd_CEP').dxNumberBox({
        value: '',
        format: '00000000',
        min: 0,
        max: 99999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'CEP',
        onInitialized: function (e) {
            e.component.option("onValueChanged", function (e) {
                if (e.value) {
                    const cepValue = String(e.value).padStart(8, '0');
                    GetEnderecoCEP(cepValue)
                }

            });
        },
    }).dxNumberBox('instance');

    gaugeLimiteCredito = $("#gaugeLimiteCredito").dxLinearGauge({
        value: 85,
        top: 0,
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 50,
            minorTickInterval: 10,
            minorTick: {
                visible: true,
            },
            label: {
                customizeText(arg) {
                    return `${arg.valueText}%`;
                },
                font: { size: 11 },
            },
        },

        valueIndicator: {
            type: 'rangebar',
            color: '#92000A',
        },
        size: {
            height: 50,
        },

        tooltip: {
            enabled: true,
            customizeTooltip(arg) {
                let result = `<b>${arg.valueText}% utilizado</b> <br/> <br/> Limite: R$ 15.000,00 <br/> Utilizado: R$ 12.750,00 <br/> <br/> <b>Disponível: R$ 2.250,00</b>`;

                return {
                    text: result,
                };
            },
        },

        onInitialized(e) {
            var valor = e.component.option('value');

            if (valor <= 69) {
                e.component.option('valueIndicator', { color: "#28A745" });
            } else if (valor <= 84) {
                e.component.option('valueIndicator', { color: "#ee9b00" });
            } else {
                e.component.option('valueIndicator', { color: "#DC3545" });
            };

            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        e.component.render();
                    }
                });
            }).observe(e.element[0]);
        },
    });

    $('#btn_Salvar').dxButton({
        text: 'Salvar Dados Gerais',
        icon: 'save',
        type: 'success',
        onClick(e) {

            const resultGeral = DevExpress.validationEngine.validateGroup("Geral");
            /*const resultEndereco = DevExpress.validationEngine.validateGroup("Endereco");*/

            if (resultGeral.isValid /*|| resultEndereco.isValid*/) {

                if (!clienteSelecionado) {
                    //INSERT NOVO
                    loaPanel.show();
                    let exec = "INS"
                    SaveCliente(GetClienteToInsertNovo(exec))
                        .then((result) => {

                            if (result.success) {

                                GetAzureDataSource(5).then((result) => {

                                    if (result.success) {

                                        lkp_Cliente_Pesquisa.option('dataSource', result.data);
                                        lkp_Cliente_Indicador.option('dataSource', result.data);
                                        lkp_Cliente_Pesquisa.option('value', txt_Cd_CPF_CNPJ.option('value'));
                                        CarregaClienteSelecionado(txt_Cd_CPF_CNPJ.option('value'))
                                        CarregaEnderecosClientes(txt_Cd_CPF_CNPJ.option('value'))
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

                                DevExpress.ui.notify({
                                    message: 'Dados gravados com sucesso!',
                                    type: 'success',
                                    displayTime: 3000,
                                });
                                loaPanel.hide();

                            }
                            else {
                                loaPanel.hide();
                                DevExpress.ui.notify({
                                    message: result.error,
                                    type: 'error',
                                    displayTime: 8000,
                                });
                            }

                        });

                } else {
                    //UPDATE
                    loaPanel.show();
                    let exec = "UPD"
                    SaveCliente(GetClienteToInsertNovo(exec))
                        .then((result) => {

                            if (result.success) {
                                loaPanel.hide();

                                GetAzureDataSource(5).then((result) => {
                                    loaPanel.show();
                                    if (result.success) {

                                        lkp_Cliente_Pesquisa.option('dataSource', result.data);
                                        lkp_Cliente_Indicador.option('dataSource', result.data);
                                        lkp_Cliente_Pesquisa.option('value', clienteSelecionado.CD_PESQUISA);
                                        CarregaClienteSelecionado(clienteSelecionado.CD_PESQUISA)
                                        CarregaEnderecosClientes(clienteSelecionado.CD_PESQUISA)

                                    }
                                    else {
                                        loaPanel.hide();
                                        DevExpress.ui.notify({
                                            message: `${result.name}: ${result.error}`,
                                            type: 'error',
                                            displayTime: 5000,
                                        });
                                        console.error(`${result.name}: ${result.error}`);
                                    }
                                });

                                DevExpress.ui.notify({
                                    message: 'Dados gravados com sucesso!',
                                    type: 'success',
                                    displayTime: 3000,
                                });
                                /*loaPanel.hide();*/

                            }
                            else {
                                loaPanel.hide();

                                DevExpress.ui.notify({
                                    message: result.error,
                                    type: 'error',
                                    displayTime: 8000,
                                });
                            }

                        });

                }

            } else {

                DevExpress.ui.notify({
                    message: 'Por favor, verifique o preenchimento dos campos obrigatórios.',
                    type: 'error',
                    displayTime: 5000,
                });
            }
        },
    });


    $('#dropButtonCadastrosDependentes').dxDropDownButton({
        text: 'Cadastros Dependentes',
        icon: 'hierarchy',
        elementAttr: {
            class: "drop-down-button"
        },
        items: [
            {
                text: 'Categoria de Clientes',
                icon: "spinnext",
                onClick(e) {
                    window.open("../cadastrosgerais/categoriacliente", '_blank').focus();

                },
            },
            {
                text: 'Controle de Acesso',
                icon: "spinnext",
                onClick(e) {
                    window.open("../controleAcesso/Usuario", '_blank').focus();
                },
            },
            //{
            //    text: 'Contas Correntes',
            //    icon: "spinnext",
            //    onClick(e) {
            //        DevExpress.ui.notify(e.itemData.text, 'success', 3000);
            //    },
            //},
            //{
            //    text: 'Equipes de Venda',
            //    icon: "spinnext",
            //    onClick(e) {
            //        DevExpress.ui.notify(e.itemData.text, 'success', 3000);
            //    },
            //},
            {
                text: 'Forma de Pagamento',
                icon: "spinnext",
                onClick(e) {
                    window.open(urlLegado + `CadFormaPagtoInc.aspx`, '_blank').focus();
                },
            },
            {
                text: 'Condição de Pagamento',
                icon: "spinnext",
                onClick(e) {
                    window.open(urlLegado + `CadCondicaoPagamentoInc.aspx`, '_blank').focus();
                },
            },
            {
                text: 'Ramos de Atividade',
                icon: "spinnext",
                onClick(e) {
                    window.open("../cadastrosgerais/ramoatividade", '_blank').focus();
                },
            },
            {
                text: 'Tabelas de Preço',
                icon: "spinnext",
                onClick(e) {
                    window.open(urlLegado + `cadTabelaPrecoInc.aspx`, '_blank').focus();
                },
            },
            {
                text: 'Transportadora',
                icon: "spinnext",
                onClick(e) {
                    window.open("../cadastrosgerais/Fornecedor", '_blank').focus();
                },
            },
        ],
    });

    //#endregion

    // SERASA
    //#region [serasa]

    var popover = $('#especificacoesConsultasAgregadasPF').dxPopover({
        target: '#linkEspecificacoesConsultasAgregadasPF',
        showEvent: 'mouseenter',
        hideEvent: 'click',
        position: 'top',
        width: 650,

        animation: {
            show: {
                type: 'pop',
                from: { scale: 0 },
                to: { scale: 1 },
            },
            hide: {
                type: 'fade',
                from: 1,
                to: 0,
            },
        },
    }).dxPopover('instance');

    $('#especificacoesConsultasAgregadasPJ').dxPopover({
        target: '#linkEspecificacoesConsultasAgregadasPJ',
        showEvent: 'mouseenter',
        /*hideEvent: 'mouseleave',*/
        hideEvent: 'click',
        position: 'top',
        width: 650,
        animation: {
            show: {
                type: 'pop',
                from: { scale: 0 },
                to: { scale: 1 },
            },
            hide: {
                type: 'fade',
                from: 1,
                to: 0,
            },
        },
    });

    $('#especificacoesConsultasAgregadasRecomendaPF').dxPopover({
        target: '#linkEspecificacoesConsultasAgregadasRecomendaPF',
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        position: 'top',
        width: 650,
        animation: {
            show: {
                type: 'pop',
                from: { scale: 0 },
                to: { scale: 1 },
            },
            hide: {
                type: 'fade',
                from: 1,
                to: 0,
            },
        },
    });

    $('#especificacoesConsultasAgregadasRecomendaPJ').dxPopover({
        target: '#linkEspecificacoesConsultasAgregadasRecomendaPJ',
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        position: 'top',
        width: 650,
        animation: {
            show: {
                type: 'pop',
                from: { scale: 0 },
                to: { scale: 1 },
            },
            hide: {
                type: 'fade',
                from: 1,
                to: 0,
            },
        },
    });

    $('#detalhamentoConsultasAgregadas').dxPopover({
        target: '#linkDetalhamentoConsultasAgregadas',
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        position: 'top',
        width: 300,
        animation: {
            show: {
                type: 'pop',
                from: { scale: 0 },
                to: { scale: 1 },
            },
            hide: {
                type: 'fade',
                from: 1,
                to: 0,
            },
        },
    });

    $('#detalhamentoConsultasAgregadasRecomenda').dxPopover({
        target: '#linkDetalhamentoConsultasAgregadasRecomenda',
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        position: 'top',
        width: 300,
        animation: {
            show: {
                type: 'pop',
                from: { scale: 0 },
                to: { scale: 1 },
            },
            hide: {
                type: 'fade',
                from: 1,
                to: 0,
            },
        },
    });

    tagSerasaAgregadosCrednetPF = $('#tag_Serasa_Agregados_Crednet_PF').dxTagBox({
        dataSource: dataSourceSerasaAgregadoCredenetPF,
        searchEnabled: true,
        searchExpr: ['DS_AGREGADO'],
        cleanSearchOnOpening: true,
        displayExpr: 'DS_AGREGADO',
        valueExpr: 'CD_AGREGADO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Consultas Agregadas',
        },
        placeholder: ' + Complementos (Custo Adicional)',
        showClearButton: true,
        showSelectionControls: true,
        onInitialized: function (e) {
            e.component.option("onValueChanged", function (e) {
                if (e.value && e.value.length > 0) {

                    if (dataUsuarioLogado.NR_NIVEL_ACESSO == 0 && !dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Agregados) {
                        tagSerasaAgregadosCrednetPF.option('value', null)
                        new PNotify({
                            title: 'Não tem permissão para adicionar agregados!',
                            text: 'Esse usuário não tem permissão para adicionar agregados!',
                            type: 'alert',
                            width: "28%"
                        });
                    }
                }
            });
        }

    }).dxTagBox('instance');

    tagSerasaAgregadosCrednetPJ = $('#tag_Serasa_Agregados_Crednet_PJ').dxTagBox({
        dataSource: dataSourceSerasaAgregadoCredenetPJ,
        searchEnabled: true,
        searchExpr: ['DS_AGREGADO'],
        cleanSearchOnOpening: true,
        displayExpr: 'DS_AGREGADO',
        valueExpr: 'CD_AGREGADO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Consultas Agregadas',
        },
        placeholder: ' + Complementos (Custo Adicional)',
        showClearButton: true,
        showSelectionControls: true,
        onInitialized: function (e) {
            e.component.option("onValueChanged", function (e) {
                if (e.value && e.value.length > 0) {

                    if (dataUsuarioLogado.NR_NIVEL_ACESSO == 0 && !dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Agregados) {
                        tagSerasaAgregadosCrednetPJ.option('value', null)

                        new PNotify({
                            title: 'Não tem permissão para adicionar agregados!',
                            text: 'Esse usuário não tem permissão para adicionar agregados!',
                            type: 'alert',
                            width: "28%"
                        });

                    } else {
                        if (e.value) {

                            if (e.value.includes('REH5') && e.value.includes('REAF')) {
                                const filteredValues = e.value.filter(value => value !== 'REH5' && value !== 'REAF');
                                tagSerasaAgregadosCrednetPJ.option('value', filteredValues);

                                popupAgregados = $('#popupAgregados').dxPopup({
                                    maxWidth: 550,
                                    maxHeight: 400,
                                    showTitle: false,
                                    visible: true,
                                    hideOnOutsideClick: true,
                                    onHidden: function (e) {
                                        popupAgregados.hide();
                                    },
                                    contentTemplate: () => {
                                        const scrollView = $('<div class="scrollable-content" style="min-height: 100px;" />');
                                        scrollView.append($(`<div id="textBlock" text-center" style="text-align: center;">
                                            <div class="modal-content mt-0 mb-0 ml-0 mr-0">
                                                    <section class="card card-default ">
                                                        <header class="card-header ">
                                                            <h4 class="text-danger"><b>AVISO IMPORTANTE</b></h4>
                                                        </header>
                                                        <div class="card-body">

                                                            <div class="modal-wrapper">
                                                                <div class="modal-text ">
                                                                    <h4>
                                                                        Não é possível incluir ao mesmo tempo as duas consultas agregadas <strong>Pontualidade de Pagamento</strong> e o <strong>Serasa Score PJ com Positivo</strong>
                                                                    </h4>
			                                						<h4>
                                                                        Escolha apenas uma destas consultas agregadas por pesquisa.
                                                                    </h4>
                                                                    <h4>
                                                                        As demais consultas agregadas podem ser combinadas normalmente na mesma pesquisa.
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <footer class="card-footer text-center"> <!-- Adicionando a classe text-center aqui -->
                                                            <div class="row">
                                                                <div class="col-lg-12">
                                                                    <button type="button" class="btn btn-xs btn-default" onclick="popupAgregados.hide();"><i class="fa fa-close mr-2"></i>Fechar</button>
                                                                </div>
                                                            </div>
                                                        </footer>
                                                    </section>
                                                </div>
                                            </div>`
                                        ));

                                        return scrollView;
                                    },

                                }).dxPopup('instance');


                            }
                        }
                    }
                }
            });
        }

    }).dxTagBox('instance');

    tagSerasaAgregadosRecomendaPF = $('#tag_Serasa_Agregados_Recomenda_PF').dxTagBox({
        dataSource: dataSourceSerasaAgregadoRecomendaPF,
        searchEnabled: true,
        searchExpr: ['DS_AGREGADO'],
        cleanSearchOnOpening: true,
        displayExpr: 'DS_AGREGADO',
        valueExpr: 'CD_AGREGADO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Consultas Agregadas',
        },
        placeholder: ' + Complementos (Custo Adicional)',
        showClearButton: true,
        showSelectionControls: true,
        onInitialized: function (e) {
            e.component.option("onValueChanged", function (e) {
                if (e.value && e.value.length > 0) {

                    if (dataUsuarioLogado.NR_NIVEL_ACESSO == 0 && !dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Agregados) {
                        tagSerasaAgregadosRecomendaPF.option('value', null)
                        new PNotify({
                            title: 'Não tem permissão para adicionar agregados!',
                            text: 'Esse usuário não tem permissão para adicionar agregados!',
                            type: 'alert',
                            width: "28%"
                        });
                    }
                }
            });
        }

    }).dxTagBox('instance');

    tagSerasaAgregadosRecomendaPJ = $('#tag_Serasa_Agregados_Recomenda_PJ').dxTagBox({
        dataSource: dataSourceSerasaAgregadoRecomendaPJ,
        searchEnabled: true,
        searchExpr: ['DS_AGREGADO'],
        cleanSearchOnOpening: true,
        displayExpr: 'DS_AGREGADO',
        valueExpr: 'CD_AGREGADO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Consultas Agregadas',
        },
        placeholder: ' + Complementos (Custo Adicional)',
        showClearButton: true,
        showSelectionControls: true,
        onInitialized: function (e) {
            e.component.option("onValueChanged", function (e) {
                if (e.value && e.value.length > 0) {

                    if (dataUsuarioLogado.NR_NIVEL_ACESSO == 0 && !dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Agregados) {
                        tagSerasaAgregadosRecomendaPJ.option('value', null)
                        new PNotify({
                            title: 'Não tem permissão para adicionar agregados!',
                            text: 'Esse usuário não tem permissão para adicionar agregados!',
                            type: 'alert',
                            width: "28%"
                        });
                    }
                }
            });
        }

    }).dxTagBox('instance');

    tagSerasaAgregadosCrednetPF2 = $('#tag_Serasa_Agregados_Crednet_PF2').dxTagBox({
        dataSource: dataSourceSerasaAgregadoCredenetPF,
        searchEnabled: true,
        searchExpr: ['DS_AGREGADO'],
        cleanSearchOnOpening: true,
        displayExpr: 'DS_AGREGADO',
        valueExpr: 'CD_AGREGADO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Consultas Agregadas',
        },
        placeholder: ' + Complementos (Custo Adicional)',
        showClearButton: true,
        showSelectionControls: true,
        onInitialized: function (e) {
            e.component.option("onValueChanged", function (e) {
                if (e.value && e.value.length > 0) {

                    if (dataUsuarioLogado.NR_NIVEL_ACESSO == 0 && !dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Agregados) {
                        tagSerasaAgregadosCrednetPF2.option('value', null)
                        new PNotify({
                            title: 'Não tem permissão para adicionar agregados!',
                            text: 'Esse usuário não tem permissão para adicionar agregados!',
                            type: 'alert',
                            width: "28%"
                        });
                    }
                }
            });
        }

    }).dxTagBox('instance');

    tagSerasaAgregadosCrednetPJ2 = $('#tag_Serasa_Agregados_Crednet_PJ2').dxTagBox({
        dataSource: dataSourceSerasaAgregadoCredenetPJ,
        searchEnabled: true,
        searchExpr: ['DS_AGREGADO'],
        cleanSearchOnOpening: true,
        displayExpr: 'DS_AGREGADO',
        valueExpr: 'CD_AGREGADO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Consultas Agregadas',
        },
        placeholder: ' + Complementos (Custo Adicional)',
        showClearButton: true,
        showSelectionControls: true,
        onInitialized: function (e) {
            e.component.option("onValueChanged", function (e) {
                if (e.value && e.value.length > 0) {

                    if (dataUsuarioLogado.NR_NIVEL_ACESSO == 0 && !dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Agregados) {
                        tagSerasaAgregadosCrednetPJ2.option('value', null)

                        new PNotify({
                            title: 'Não tem permissão para adicionar agregados!',
                            text: 'Esse usuário não tem permissão para adicionar agregados!',
                            type: 'alert',
                            width: "28%"
                        });

                    } else {
                        if (e.value) {

                            if (e.value.includes('REH5') && e.value.includes('REAF')) {
                                const filteredValues = e.value.filter(value => value !== 'REH5' && value !== 'REAF');
                                tagSerasaAgregadosCrednetPJ2.option('value', filteredValues);

                                popupAgregados = $('#popupAgregados').dxPopup({
                                    maxWidth: 550,
                                    maxHeight: 400,
                                    showTitle: false,
                                    visible: true,
                                    hideOnOutsideClick: true,
                                    onHidden: function (e) {
                                        popupAgregados.hide();
                                    },
                                    contentTemplate: () => {
                                        const scrollView = $('<div class="scrollable-content" style="min-height: 100px;" />');
                                        scrollView.append($(`<div id="textBlock" text-center" style="text-align: center;">
                                            <div class="modal-content mt-0 mb-0 ml-0 mr-0">
                                                    <section class="card card-default ">
                                                        <header class="card-header ">
                                                            <h4 class="text-danger"><b>AVISO IMPORTANTE</b></h4>
                                                        </header>
                                                        <div class="card-body">

                                                            <div class="modal-wrapper">
                                                                <div class="modal-text ">
                                                                    <h4>
                                                                        Não é possível incluir ao mesmo tempo as duas consultas agregadas <strong>Pontualidade de Pagamento</strong> e o <strong>Serasa Score PJ com Positivo</strong>
                                                                    </h4>
			                                						<h4>
                                                                        Escolha apenas uma destas consultas agregadas por pesquisa.
                                                                    </h4>
                                                                    <h4>
                                                                        As demais consultas agregadas podem ser combinadas normalmente na mesma pesquisa.
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <footer class="card-footer text-center"> <!-- Adicionando a classe text-center aqui -->
                                                            <div class="row">
                                                                <div class="col-lg-12">
                                                                    <button type="button" class="btn btn-xs btn-default" onclick="popupAgregados.hide();"><i class="fa fa-close mr-2"></i>Fechar</button>
                                                                </div>
                                                            </div>
                                                        </footer>
                                                    </section>
                                                </div>
                                            </div>`
                                        ));

                                        return scrollView;
                                    },

                                }).dxPopup('instance');


                            }
                        }
                    }
                }
            });
        }

    }).dxTagBox('instance');

    tagSerasaAgregadosRecomendaPJ2 = $('#tag_Serasa_Agregados_Recomenda_PJ2').dxTagBox({
        dataSource: dataSourceSerasaAgregadoRecomendaPJ,
        searchEnabled: true,
        searchExpr: ['DS_AGREGADO'],
        cleanSearchOnOpening: true,
        displayExpr: 'DS_AGREGADO',
        valueExpr: 'CD_AGREGADO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Consultas Agregadas',
        },
        placeholder: ' + Complementos (Custo Adicional)',
        showClearButton: true,
        showSelectionControls: true,
        onInitialized: function (e) {
            e.component.option("onValueChanged", function (e) {
                if (e.value && e.value.length > 0) {

                    if (dataUsuarioLogado.NR_NIVEL_ACESSO == 0 && !dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Agregados) {
                        tagSerasaAgregadosRecomendaPJ2.option('value', null)
                        new PNotify({
                            title: 'Não tem permissão para adicionar agregados!',
                            text: 'Esse usuário não tem permissão para adicionar agregados!',
                            type: 'alert',
                            width: "28%"
                        });
                    }
                }
            });
        }

    }).dxTagBox('instance');

    tagSerasaAgregadosRecomendaPF2 = $('#tag_Serasa_Agregados_Recomenda_PF2').dxTagBox({
        dataSource: dataSourceSerasaAgregadoRecomendaPF,
        searchEnabled: true,
        searchExpr: ['DS_AGREGADO'],
        cleanSearchOnOpening: true,
        displayExpr: 'DS_AGREGADO',
        valueExpr: 'CD_AGREGADO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Consultas Agregadas',
        },
        placeholder: ' + Complementos (Custo Adicional)',
        showClearButton: true,
        showSelectionControls: true,
        onInitialized: function (e) {
            e.component.option("onValueChanged", function (e) {
                if (e.value && e.value.length > 0) {

                    if (dataUsuarioLogado.NR_NIVEL_ACESSO == 0 && !dataUsuarioLogado.Lg_Permite_Consultar_Serasa_Agregados) {
                        tagSerasaAgregadosRecomendaPF2.option('value', null)
                        new PNotify({
                            title: 'Não tem permissão para adicionar agregados!',
                            text: 'Esse usuário não tem permissão para adicionar agregados!',
                            type: 'alert',
                            width: "28%"
                        });
                    }
                }
            });
        }

    }).dxTagBox('instance');

    $('#especificacoesConsultasAgregadasPF2').dxPopover({
        target: '#linkEspecificacoesConsultasAgregadasPF2',
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        position: 'top',
        width: 650,
        animation: {
            show: {
                type: 'pop',
                from: { scale: 0 },
                to: { scale: 1 },
            },
            hide: {
                type: 'fade',
                from: 1,
                to: 0,
            },
        },
    });

    $('#especificacoesConsultasAgregadasPJ2').dxPopover({
        target: '#linkEspecificacoesConsultasAgregadasPJ2',
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        position: 'top',
        width: 650,
        animation: {
            show: {
                type: 'pop',
                from: { scale: 0 },
                to: { scale: 1 },
            },
            hide: {
                type: 'fade',
                from: 1,
                to: 0,
            },
        },
    });

    $('#detalhamentoConsultasAgregadas2').dxPopover({
        target: '#linkDetalhamentoConsultasAgregadas2',
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        position: 'top',
        width: 300,
        animation: {
            show: {
                type: 'pop',
                from: { scale: 0 },
                to: { scale: 1 },
            },
            hide: {
                type: 'fade',
                from: 1,
                to: 0,
            },
        },
    });

    $('#especificacoesConsultasAgregadasRecomendaPF2').dxPopover({
        target: '#linkEspecificacoesConsultasAgregadasRecomendaPF2',
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        position: 'top',
        width: 650,
        animation: {
            show: {
                type: 'pop',
                from: { scale: 0 },
                to: { scale: 1 },
            },
            hide: {
                type: 'fade',
                from: 1,
                to: 0,
            },
        },
    });

    $('#especificacoesConsultasAgregadasRecomendaPJ2').dxPopover({
        target: '#linkEspecificacoesConsultasAgregadasRecomendaPJ2',
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        position: 'top',
        width: 650,
        animation: {
            show: {
                type: 'pop',
                from: { scale: 0 },
                to: { scale: 1 },
            },
            hide: {
                type: 'fade',
                from: 1,
                to: 0,
            },
        },
    });

    $('#detalhamentoConsultasAgregadasRecomenda2').dxPopover({
        target: '#linkDetalhamentoConsultasAgregadasRecomenda2',
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        position: 'top',
        width: 300,
        animation: {
            show: {
                type: 'pop',
                from: { scale: 0 },
                to: { scale: 1 },
            },
            hide: {
                type: 'fade',
                from: 1,
                to: 0,
            },
        },
    });

    //usuarioSerasa = $('#txt_Usuario_Serasa').dxTextBox({
    //    labelMode: 'floating',
    //    label: 'Usuário Connect Serasa Experian',
    //    maxLength: 100,
    //}).dxTextBox('instance');

    //senhaSerasaCadastrada = $('#txt_Senha_Serasa').dxTextBox({
    //    placeholder: 'Senha Connect Serasa Experian',
    //    maxLength: 100,
    //    mode: 'password',
    //    inputAttr: { 'aria-label': 'Password' },
    //    stylingMode: 'filled',
    //    buttons: [{
    //        name: 'password',
    //        location: 'after',
    //        options: {
    //            icon: '/img/visualizar-senha.png',
    //            type: 'default',
    //            onClick() {
    //                senhaSerasaCadastrada.option('mode', senhaSerasaCadastrada.option('mode') === 'text' ? 'password' : 'text');
    //            },
    //        },
    //    }],
    //}).dxTextBox('instance');

    usuarioSerasaRecomenda = $('#txt_Usuario_Serasa_Recomenda').dxTextBox({
        labelMode: 'floating',
        label: 'Usuário Connect Serasa Experian',
        maxLength: 100,
    }).dxTextBox('instance');

    senhaSerasaRecomenda = $('#txt_Senha_Serasa_Recomenda').dxTextBox({
        placeholder: 'Senha Connect Serasa Experian',
        maxLength: 100,
        mode: 'password',
        inputAttr: { 'aria-label': 'Password' },
        stylingMode: 'filled',
        buttons: [{
            name: 'password',
            location: 'after',
            options: {
                icon: '/img/visualizar-senha.png',
                type: 'default',
                onClick() {
                    senhaSerasaRecomenda.option('mode', senhaSerasaRecomenda.option('mode') === 'text' ? 'password' : 'text');
                },
            },
        }],
    }).dxTextBox('instance');

    //usuarioAbaSerasa = $('#txt_Usuario_Aba_Serasa').dxTextBox({
    //    labelMode: 'floating',
    //    label: 'Usuário Connect Serasa Experian',
    //    maxLength: 100,
    //}).dxTextBox('instance');

    //senhaAbaSerasaCadastrada = $('#txt_Senha_Aba_Serasa').dxTextBox({
    //    placeholder: 'Senha Connect Serasa Experian',
    //    maxLength: 100,
    //    mode: 'password',
    //    inputAttr: { 'aria-label': 'Password' },
    //    stylingMode: 'filled',
    //    buttons: [{
    //        name: 'password',
    //        location: 'after',
    //        options: {
    //            icon: '/img/visualizar-senha.png',
    //            type: 'default',
    //            onClick() {
    //                senhaAbaSerasaCadastrada.option('mode', senhaAbaSerasaCadastrada.option('mode') === 'text' ? 'password' : 'text');
    //            },
    //        },
    //    }],
    //}).dxTextBox('instance');

    usuarioAbaSerasaRecomenda = $('#txt_Usuario_Aba_Serasa_Recomenda').dxTextBox({
        labelMode: 'floating',
        label: 'Usuário Connect Serasa Experian',
        maxLength: 100,
        
    }).dxTextBox('instance');

    senhaAbaSerasaRecomenda = $('#txt_Senha_Aba_Serasa_Recomenda').dxTextBox({
        placeholder: 'Senha Connect Serasa Experian',
        maxLength: 100,
        mode: 'password',
        inputAttr: { 'aria-label': 'Password' },
        stylingMode: 'filled',
        buttons: [{
            name: 'password',
            location: 'after',
            options: {
                icon: '/img/visualizar-senha.png',
                type: 'default',
                onClick() {
                    senhaAbaSerasaRecomenda.option('mode', senhaAbaSerasaRecomenda.option('mode') === 'text' ? 'password' : 'text');
                },
            },
        }],
    }).dxTextBox('instance');

    usuarioSerasaConfiguracoes = $('#txt_Usuario_Serasa_Configuracoes_Pefin').dxTextBox({
        labelMode: 'floating',
        label: 'Usuário Connect Serasa Experia',
        maxLength: 100,
        readOnly: true
    }).dxTextBox('instance');

    senhaSerasaConfiguracoes = $('#txt_Senha_Serasa_Configuracoes_Pefin').dxTextBox({
        placeholder: 'Senha Connect para negativações de clientes',
        maxLength: 100,
        mode: 'password',
        inputAttr: { 'aria-label': 'Password' },
        stylingMode: 'filled',
        buttons: [{
            name: 'password',
            location: 'after',
            options: {
                icon: '/img/visualizar-senha.png',
                type: 'default',
                onClick() {
                    senhaSerasaConfiguracoes.option('mode', senhaSerasaConfiguracoes.option('mode') === 'text' ? 'password' : 'text');
                },
            },
        }],
    }).dxTextBox('instance');

    usuarioSerasaConfiguracoesRecomenda = $('#txt_Usuario_Serasa_Configuracoes_Recomenda').dxTextBox({
        labelMode: 'floating',
        label: 'Usuário Connect Serasa Experian',
        maxLength: 100,
        onInitialized: function (e) {
            e.component.option("onValueChanged", function (e) {
                usuarioSerasaConfiguracoes.option('value', e.value)
            })
        },
        
    }).dxTextBox('instance');

    senhaSerasaConfiguracoesRecomenda = $('#txt_Senha_Serasa_Configuracoes_Recomenda').dxTextBox({
        placeholder: 'Senha Connect Serasa Experian',
        maxLength: 100,
        mode: 'password',
        inputAttr: { 'aria-label': 'Password' },
        stylingMode: 'filled',
        buttons: [{
            name: 'password',
            location: 'after',
            options: {
                icon: '/img/visualizar-senha.png',
                type: 'default',
                onClick() {
                    senhaSerasaConfiguracoesRecomenda.option('mode', senhaSerasaConfiguracoesRecomenda.option('mode') === 'text' ? 'password' : 'text');
                },
            },
        }],
    }).dxTextBox('instance');

    cpfTrocaSenhaPefin = $('#txt_Cpf_Troca_Senha_Pefin').dxTextBox({
        labelMode: 'floating',
        label: 'Digite o seu CPF',
        mask: '000.000.000-00',
        maxLength: 100,
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'CPF Obrigatório', }],
        validationGroup: 'TrocaSenhaSerasa'
    }).dxTextBox('instance');

    passwordSerasaTrocaSenhaPefin = $('#txt_Password_Serasa_Troca_Senha_Pefin').dxTextBox({
        placeholder: 'Senha Atual negativa cliente',
        maxLength: 100,
        mode: 'password',
        inputAttr: { 'aria-label': 'Password' },
        stylingMode: 'filled',
        buttons: [{
            name: 'password',
            location: 'after',
            options: {
                icon: '/img/visualizar-senha.png',
                type: 'default',
                onClick() {
                    passwordSerasaTrocaSenhaPefin.option('mode', passwordSerasaTrocaSenhaPefin.option('mode') === 'text' ? 'password' : 'text');
                },
            },
        }],
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'Senha Atual CrednetLight obrigatório', }],
        validationGroup: 'TrocaSenhaSerasa'
    }).dxTextBox('instance');

    novaSenhaPefin = $('#txt_Nova_Senha_Pefin').dxTextBox({
        placeholder: 'Nova senha negativa cliente',
        maxLength: 100,
        mode: 'password',
        inputAttr: { 'aria-label': 'Password' },
        stylingMode: 'filled',
        buttons: [{
            name: 'password',
            location: 'after',
            options: {
                icon: '/img/visualizar-senha.png',
                type: 'default',
                onClick() {
                    novaSenhaPefin.option('mode', novaSenhaPefin.option('mode') === 'text' ? 'password' : 'text');
                },
            },
        }],

    }).dxValidator({
        validationRules: [
            { type: 'required', message: 'Nova senha CrednetLight obrigatório' },
            { type: 'stringLength', min: 6, message: 'A senha deve ter no mínimo 6 caracteres' }
        ],
        validationGroup: 'TrocaSenhaSerasa'
    }).dxTextBox('instance');

    confirmaNovaSenhaPefin = $('#txt_Confirma_Nova_Senha_Pefin').dxTextBox({
        placeholder: 'Confirma nova senha negativa cliente',
        maxLength: 100,
        mode: 'password',
        inputAttr: { 'aria-label': 'Password' },
        stylingMode: 'filled',
        buttons: [{
            name: 'password',
            location: 'after',
            options: {
                icon: '/img/visualizar-senha.png',
                type: 'default',
                onClick() {
                    confirmaNovaSenhaPefin.option('mode', confirmaNovaSenhaPefin.option('mode') === 'text' ? 'password' : 'text');
                },
            },
        }],
    }).dxValidator({
        validationRules: [
            { type: 'required', message: 'Confimra nova senha CrednetLight obrigatório' },
            { type: 'stringLength', min: 6, message: 'A senha deve ter no mínimo 6 caracteres' }
        ],
        validationGroup: 'TrocaSenhaSerasa'
    }).dxTextBox('instance');

    cpfTrocaSenhaRecomenda = $('#txt_Cpf_Troca_Senha_Recomenda').dxTextBox({
        labelMode: 'floating',
        label: 'Digite o seu CPF',
        mask: '000.000.000-00',
        maxLength: 100,
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'Cpf obrigatório', }],
        validationGroup: 'TrocaSenhaSerasaRecomenda'
    }).dxTextBox('instance');

    passwordSerasaTrocaSenhaRecomenda = $('#txt_Password_Serasa_Troca_Senha_Recomenda').dxTextBox({
        placeholder: 'Senha Atual consulta Serasa',
        maxLength: 100,
        mode: 'password',
        inputAttr: { 'aria-label': 'Password' },
        stylingMode: 'filled',
        buttons: [{
            name: 'password',
            location: 'after',
            options: {
                icon: '/img/visualizar-senha.png',
                type: 'default',
                onClick() {
                    passwordSerasaTrocaSenhaRecomenda.option('mode', passwordSerasaTrocaSenhaRecomenda.option('mode') === 'text' ? 'password' : 'text');
                },
            },
        }],
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'Senha Atual Serasa Experian obrigatório', }],
        validationGroup: 'TrocaSenhaSerasaRecomenda'
    }).dxTextBox('instance');

    novaSenhaRecomenda = $('#txt_Nova_Senha_Recomenda').dxTextBox({
        placeholder: 'Nova senha consultas Serasa',
        maxLength: 100,
        mode: 'password',
        inputAttr: { 'aria-label': 'Password' },
        stylingMode: 'filled',
        buttons: [{
            name: 'password',
            location: 'after',
            options: {
                icon: '/img/visualizar-senha.png',
                type: 'default',
                onClick() {
                    novaSenhaRecomenda.option('mode', novaSenhaRecomenda.option('mode') === 'text' ? 'password' : 'text');
                },
            },
        }],
    }).dxValidator({
        validationRules: [{
            type: 'required', message: 'Nova senha Serasa Experian obrigatório',
            type: 'stringLength', min: 6, message: 'A senha deve ter no mínimo 6 caracteres'
        }],
        validationGroup: 'TrocaSenhaSerasaRecomenda'
    }).dxTextBox('instance');

    confirmaNovaSenhaRecomenda = $('#txt_Confirma_Nova_Senha_Recomenda').dxTextBox({
        placeholder: 'Confirma nova senha consultas Serasa',
        maxLength: 100,
        mode: 'password',
        inputAttr: { 'aria-label': 'Password' },
        stylingMode: 'filled',
        buttons: [{
            name: 'password',
            location: 'after',
            options: {
                icon: '/img/visualizar-senha.png',
                type: 'default',
                onClick() {
                    confirmaNovaSenhaRecomenda.option('mode', confirmaNovaSenhaRecomenda.option('mode') === 'text' ? 'password' : 'text');
                },
            },
        }],
    }).dxValidator({
        validationRules: [{
            type: 'required', message: 'Confirma nova senha Serasa obrigatório',
            type: 'stringLength', min: 6, message: 'A senha deve ter no mínimo 6 caracteres'
        }], validationGroup: 'TrocaSenhaSerasaRecomenda'
    }).dxTextBox('instance');

    cd_CPF_CNPJConsultaSerasa = $('#txt_Cd_CPF_CNPJ_Consulta_Serasa').dxTextBox({
        labelMode: 'floating',
        label: 'CPF/CNPJ (somente números) *',
        mask: '',
        maxLength: 14,
        showClearButton: true,
        onValueChanged(e) {

            if (!e.value) {
                e.component.option('mask', '');
                e.component.option('label', 'CPF/CNPJ (somente números)');
            } else {

                applyFormatting(e);
            }
        },
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'CPF/CNPJ Obrigatório', }], validationGroup: 'Serasa'
    }).dxTextBox('instance');

    //cdCEPSerasa = $('#nbx_Cd_CEP_Serasa').dxNumberBox({
    //    value: '',
    //    format: '00000000',
    //    min: 0,
    //    max: 99999999,
    //    showClearButton: true,
    //    showSpinButtons: false,
    //    step: 0,
    //    labelMode: 'floating',
    //    label: 'CEP do Cliente (Opcional)',
    //}).dxNumberBox('instance');

    vlCreditoSerasa = $('#nbx_Vl_Credito_Serasa').dxNumberBox({
        value: '',
        format: 'R$ ###,###,###,##0.00', //ATENÇÃO: Este campo de formatação de moeda deverá retornar da tabela de Parâmetros Corporativos (NÃO DEVE SER FIXO)
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1000,
        labelMode: 'floating',
        label: 'Valor do Crédito *',
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'Valor do Crédito Obrigatório', }], validationGroup: 'Recomenda'
    }).dxNumberBox('instance');

    chkTermoUsoSerasa = $('#chk_Termo_Uso_Serasa').dxCheckBox({
        value: false,
        iconSize: 20,
        text: 'Concordo com os termos para utilização das informações consultadas.',
        elementAttr: {
            class: 'checkbox-font',
        },

    }).dxCheckBox('instance');

    //cdCEPSerasa2 = $('#nbx_Cd_CEP_Serasa2').dxNumberBox({
    //    value: '',
    //    format: '00000000',
    //    min: 0,
    //    max: 99999999,
    //    showClearButton: true,
    //    showSpinButtons: false,
    //    step: 0,
    //    labelMode: 'floating',
    //    label: 'CEP do Cliente (Opcional)',
    //}).dxNumberBox('instance');

    vlCreditoSerasa2 = $('#nbx_Vl_Credito_Serasa2').dxNumberBox({
        value: '',
        format: 'R$ ###,###,###,##0.00', //ATENÇÃO: Este campo de formatação de moeda deverá retornar da tabela de Parâmetros Corporativos (NÃO DEVE SER FIXO)
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1000,
        labelMode: 'floating',
        label: 'Valor do Crédito *',
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'Valor do Crédito Obrigatório', }], validationGroup: 'Recomenda2'
    }).dxNumberBox('instance');

    txt_Cd_CPF_CNPJ_Cadastro_Serasa = $('#txt_Cd_CPF_CNPJ_Cadastro_Serasa').dxTextBox({
        labelMode: 'floating',
        label: 'CPF/CNPJ',
        mask: '',
        maxLength: 14,
        showClearButton: false,
        readOnly: true,
        onFocusIn(e) {
            if (e.value) {
                if (e.value.length == 11) {
                    e.component.option('mask', '000.000.000-00');
                    e.component.option('label', 'CPF');
                    ExibirEsconderPaineis('txt_Ds_Razao_Social_Cadastro_Serasa', 'none');
                    ExibirEsconderPaineis('txt_Ds_Fantasia_Cadastro_Serasa', 'none');
                    ExibirEsconderPaineis('txt_Ds_Nome_Cadastro_Serasa', 'block');

                } else if (e.value.length == 14) {
                    e.component.option('mask', '00.000.000/0000-00');
                    e.component.option('label', 'CNPJ');
                    ExibirEsconderPaineis('txt_Ds_Razao_Social_Cadastro_Serasa', 'block');
                    ExibirEsconderPaineis('txt_Ds_Fantasia_Cadastro_Serasa', 'block');
                    ExibirEsconderPaineis('txt_Ds_Nome_Cadastro_Serasa', 'none');

                } else {
                    e.component.option('mask', '00000000000000');
                    e.component.option('label', 'CPF/CNPJ');
                };
            }

        },
        onValueChanged(e) {
            if (e.value) {

                if (e.value.length == 11) {
                    e.component.option('mask', '000.000.000-00');
                    e.component.option('label', 'CPF');
                    ExibirEsconderPaineis('txt_Ds_Razao_Social_Cadastro_Serasa', 'none');
                    ExibirEsconderPaineis('txt_Ds_Fantasia_Cadastro_Serasa', 'none');
                    ExibirEsconderPaineis('txt_Ds_Nome_Cadastro_Serasa', 'block');
                    ExibirEsconderPaineis('txt_Ds_Profissao_Cadastro_Serasa', 'block');

                    if (paransGeral.Lg_Obriga_Profissao_Cadastro_Cliente) {
                        txt_Ds_Profissao_Cadastro_Serasa.option('label', 'Profissão *')
                    } else {
                        txt_Ds_Profissao_Cadastro_Serasa.option('label', 'Profissão ')

                    }

                    if (paransGeral.Lg_Obriga_RG_Cliente) {
                        txt_Cd_IE_Cadastro_Serasa.option('label', 'RG *')
                    } else {
                        txt_Cd_IE_Cadastro_Serasa.option('label', 'RG')
                    }

                } else if (e.value.length == 14) {
                    e.component.option('mask', '00.000.000/0000-00');
                    e.component.option('label', 'CNPJ');
                    ExibirEsconderPaineis('txt_Ds_Razao_Social_Cadastro_Serasa', 'block');
                    ExibirEsconderPaineis('txt_Ds_Fantasia_Cadastro_Serasa', 'block');
                    ExibirEsconderPaineis('txt_Ds_Nome_Cadastro_Serasa', 'none');
                    ExibirEsconderPaineis('txt_Ds_Profissao_Cadastro_Serasa', 'none');

                    if (paransGeral.Lg_Obriga_Profissao_Cadastro_Cliente) {
                        txt_Ds_Profissao_Cadastro_Serasa.option('value', '-');
                    } else {
                        txt_Ds_Profissao_Cadastro_Serasa.option('value', null);

                    }

                    if (paransGeral.Lg_Obriga_IE_Cliente) {
                        txt_Cd_IE_Cadastro_Serasa.option('label', 'Inscrição Estadual * ');
                    } else {
                        txt_Cd_IE_Cadastro_Serasa.option('label', 'Inscrição Estadual');
                    }

                } else {
                    e.component.option('mask', '00000000000000');
                    e.component.option('label', 'CPF/CNPJ (somente números)');
                    txt_Cd_IE_Cadastro_Serasa.option('label', 'RG/IE')
                };

                if (paransGeral.Lg_Obriga_Endereco_Cliente) {
                    txt_Ds_Endereco_Cadastro_Serasa.option('label', 'Endereço *')
                    nbx_Nr_Endereco_Cadastro_Serasa.option('label', 'Número *')
                    txt_Ds_Bairro_Cadastro_Serasa.option('label', 'Bairro *')
                    nbx_Cd_CEP_Cadastro_Serasa.option('label', 'CEP *')
                    lkp_Ds_Municipio_Cadastro_Serasa.option('label', 'Cidade *')
                } else {
                    txt_Ds_Endereco_Cadastro_Serasa.option('label', 'Endereço')
                    nbx_Nr_Endereco_Cadastro_Serasa.option('label', 'Número')
                    txt_Ds_Bairro_Cadastro_Serasa.option('label', 'Bairro')
                    nbx_Cd_CEP_Cadastro_Serasa.option('label', 'CEP')
                    lkp_Ds_Municipio_Cadastro_Serasa.option('label', 'Cidade')
                }
            }

        },
    }).dxValidator({ validationRules: [{ type: 'required', message: 'CPF/CNPJ Obrigatório', }], validationGroup: 'CadastroClienteSerasa' }).dxTextBox('instance');

    txt_Cd_IE_Cadastro_Serasa = $('#txt_Cd_IE_Cadastro_Serasa').dxTextBox({
        labelMode: 'floating',
        label: 'RG/IE',
        mask: '',
        maxLength: 25,
        showClearButton: false,
    }).dxTextBox('instance');

    txt_Ds_Nome_Cadastro_Serasa = $('#txt_Ds_Nome_Cadastro_Serasa').dxTextBox({
        labelMode: 'floating',
        label: 'Nome *',
        maxLength: 60,
        showClearButton: false,
    }).dxTextBox('instance');

    txt_Ds_Profissao_Cadastro_Serasa = $('#txt_Ds_Profissao_Cadastro_Serasa').dxTextBox({
        labelMode: 'floating',
        label: 'Profissão *',
        maxLength: 60,
        showClearButton: false,
    }).dxTextBox('instance');

    txt_Ds_Razao_Social_Cadastro_Serasa = $('#txt_Ds_Razao_Social_Cadastro_Serasa').dxTextBox({
        labelMode: 'floating',
        label: 'Razão Social *',
        maxLength: 60,
        showClearButton: false,
    }).dxTextBox('instance');

    txt_Ds_Fantasia_Cadastro_Serasa = $('#txt_Ds_Fantasia_Cadastro_Serasa').dxTextBox({
        labelMode: 'floating',
        label: 'Nome Fantasia *',
        maxLength: 60,
        showClearButton: false,
    }).dxTextBox('instance');

    nbx_Cd_DDD_Telefone_Cadastro_Serasa = $('#nbx_Cd_DDD_Telefone_Cadastro_Serasa').dxNumberBox({
        format: '000',
        writeStylingMode: 'filled',
        min: 0,
        max: 999,
        showClearButton: false,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'DDD *',
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Obrigatório', }], validationGroup: 'CadastroClienteSerasa' }).dxNumberBox('instance');

    txt_Ds_Telefone_Cadastro_Serasa = $('#txt_Ds_Telefone_Cadastro_Serasa').dxTextBox({
        labelMode: 'floating',
        label: 'Telefone Principal *',
        maxLength: 30,
        showClearButton: false,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Obrigatório', }], validationGroup: 'CadastroClienteSerasa' }).dxTextBox('instance');

    txt_Ds_Contato_Cadastro_Serasa = $('#txt_Ds_Contato_Cadastro_Serasa').dxTextBox({
        labelMode: 'floating',
        label: 'Contato *',
        maxLength: 60,
        showClearButton: false,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Obrigatório', }], validationGroup: 'CadastroClienteSerasa' }).dxTextBox('instance');

    txt_Ds_Endereco_Cadastro_Serasa = $('#txt_Ds_Endereco_Cadastro_Serasa').dxTextBox({
        labelMode: 'floating',
        label: 'Endereço',
        maxLength: 100,
        showClearButton: true,
    }).dxTextBox('instance');

    nbx_Nr_Endereco_Cadastro_Serasa = $('#nbx_Nr_Endereco_Cadastro_Serasa').dxNumberBox({
        value: '',
        format: '#####',
        min: 0,
        max: 99999,
        maxLength: 5,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'Número',
    }).dxNumberBox('instance');

    txt_Ds_Endereco_Compl_Cadastro_Serasa = $('#txt_Ds_Endereco_Compl_Cadastro_Serasa').dxTextBox({
        labelMode: 'floating',
        label: 'Complemento',
        maxLength: 40,
        showClearButton: true,
    }).dxTextBox('instance');

    txt_Ds_Endereco_Referencia_Cadastro_Serasa = $('#txt_Ds_Endereco_Referencia_Cadastro_Serasa').dxTextBox({
        labelMode: 'floating',
        label: 'Ponto de Referência',
        maxLength: 500,
        showClearButton: true,
    }).dxTextBox('instance');

    txt_Ds_Bairro_Cadastro_Serasa = $('#txt_Ds_Bairro_Cadastro_Serasa').dxTextBox({
        labelMode: 'floating',
        label: 'Bairro',
        maxLength: 100,
        showClearButton: true,
    }).dxTextBox('instance');

    nbx_Cd_CEP_Cadastro_Serasa = $('#nbx_Cd_CEP_Cadastro_Serasa').dxNumberBox({
        value: '',
        format: '00000000',
        min: 0,
        max: 99999999,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'CEP',

        onInitialized: function (e) {
            e.component.option("onValueChanged", function (e) {
                if (e.value && e.value > 0) {
                    let cepValue = String(e.value);

                    if (cepValue.length < 8) {
                        cepValue = cepValue.padStart(8, '0');
                        nbx_Cd_CEP_Cadastro_Serasa.option('value', cepValue)

                    } else if (cepValue.length > 8) {
                        cepValue = cepValue.substring(1);
                        nbx_Cd_CEP_Cadastro_Serasa.option('value', cepValue)

                    } else {

                        GetEnderecoCEP(cepValue);
                    }

                } else {
                    nbx_Cd_CEP_Cadastro_Serasa.option('value', null)
                }
            });
        },

    }).dxNumberBox('instance');

    //Consulta Municípios
    lkp_Ds_Municipio_Cadastro_Serasa = $('#lkp_Ds_Municipio_Cadastro_Serasa').dxLookup({
        /*dataSource: result.data,*/
        searchExpr: ['DS_MUNICIPIO_UF'],
        displayExpr: 'DS_MUNICIPIO_UF',
        valueExpr: 'CD_MUNICIPIO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Cidade',
            width: 270,
        },
        labelMode: 'floating',
        label: 'Cidade',
        placeholder: '',
        showClearButton: true,
    }).dxLookup('instance');

    lkp_Regiao_Cadastro_Serasa = $('#lkp_Regiao_Cadastro_Serasa').dxLookup({
        searchExpr: ['DS_REGIAO'],
        displayExpr: 'DS_REGIAO',
        valueExpr: 'CD_REGIAO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Região',
        },
        labelMode: 'floating',
        label: 'Região',
        placeholder: '',
        showClearButton: true,
    }).dxLookup('instance');

    lkp_Ramo_Atividade_Cadastro_Serasa = $('#lkp_Ramo_Atividade_Cadastro_Serasa').dxLookup({
        searchExpr: ['DS_RAMO_ATIVIDADE'],
        displayExpr: 'DS_RAMO_ATIVIDADE',
        valueExpr: 'CD_RAMO_ATIVIDADE',
        value: 1,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Ramo de Atividade',
        },
        labelMode: 'floating',
        label: 'Ramo de Atividade',
        placeholder: '',
        showClearButton: false,
    }).dxLookup('instance');

    lkp_Atuacao_Cadastro_Serasa = $('#lkp_Atuacao_Cadastro_Serasa').dxLookup({
        dataSource: dataSourceAtuacao,
        searchExpr: ['DS_ATUACAO'],
        displayExpr: 'DS_ATUACAO',
        valueExpr: 'CD_ATUACAO',
        value: 1,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Atuação do Cliente',
        },
        labelMode: 'floating',
        label: 'Atuação',
        placeholder: '',
        showClearButton: false,
    }).dxLookup('instance');

    lkp_Usuario_Configuracoes = $('#lkp_Usuario_Configuracoes').dxLookup({
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
            return getTemplateFoto(data, 'custom-item');
        },
        onSelectionChanged(data) {

            if (data.selectedItem === null) {
                carregaConfiguracoesUsuario('/img/fotos-usuarios/sem-foto-pesquisa.jpg');
                loginPremissoes = null;
                ExibirEsconderPaineis('accParametrosUsuario', 'none');
            } else {
                loginPremissoes = data.selectedItem.CD_LOGIN;
                carregaConfiguracoesUsuario(data.selectedItem.DS_URL_FOTO);
                CarregaUsuarioSelecianonadoParametros(loginPremissoes)
            }

        }
    }).dxLookup('instance');

    ////LISTA HISTÓRICO SERASA POR CLIENTE SELECIONADO 

    listHistoricoSerasa = $('#lstHistoricoSerasa').dxList({
        height: '90%',
        searchEnabled: true,
        searchExpr: ['DT_FORMATADA', 'DS_RESTRICAO', 'CD_LOGIN', 'DS_RETORNO_JSON', 'DS_RETORNO_HTML'],
        selectionMode: 'single',
        itemTemplate(data) {

            var dataConsultaSerasaFormatada = data.DT_FORMATADA;
            var restricaoConsutlaSerasa = data.DS_RESTRICAO;

            if (data.LG_RESTRICAO == true) {
                var classeRestricao = 'alert alert-danger'
            } else {
                var classeRestricao = ''
            }

            return $('<div>')
                .append($('<div class="titulo-list ' + classeRestricao + ' p-0 mb-1 mt-1 text-center">').text(restricaoConsutlaSerasa))
                .append($('<div class="titulo-list text-center">').text(dataConsultaSerasaFormatada))

        },
        menuItems: [
            {
                text: 'Visualizar Consulta',
                icon: 'unselectall',
                action: function (e) {
                },
            }, {
                text: 'Imprimir Consulta',
                icon: 'edit',
                action: function (e) {

                },
            },
        ],
        onItemClick(e) {

            CarregaHtmlSerasa(e.itemData.NR_SEQUENCIA, false)

        },
    }).dxList('instance');

    //GRID HISTÓRICO SERASA
    gridHistoricoSerasa = $("#grid_Historico_Serasa").dxDataGrid({
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        columnHidingEnabled: true,
        columnsAutoWidth: true,
        allowColumnResizing: true,
        allowColumnReordering: true,
        stateStoring: AutoLoad('grid_Historico_Serasa'),
        searchPanel: {
            visible: true,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
        },
        sorting: { mode: "multiple" },
        groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
        paging: { pageSize: 20 },
        pager: {
            visible: true,
            allowedPageSizes: [10, 15, 20],
            showPageSizeSelector: false,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Histórico Serasa');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Histórico_Consultas_Serasa.xlsx');
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
        keyExpr: 'NR_SEQUENCIA',
        columns: [
            {
                dataField: "CD_CPF_CNPJ",
                caption: "CPF/CNPJ ",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'center',
                width: 95,
                /*hidingPriority: 0,*/
            },
            {
                dataField: "DS_NOME",
                caption: "Nome",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 0,
            },
            {
                dataField: "DT_CONSULTA",
                caption: "Data Consulta",
                width: 100,
                dataType: "date",
                format: "dd/MM/yyyy",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: true,
                hidingPriority: 1,
            },
            {
                dataField: "CD_LOGIN",
                caption: "Usuário",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'center',
                visible: false,
            },
            {
                dataField: "NR_PONTUACAO",
                caption: "Pontuação",
                width: 80,
                dataType: "number",
                format: "###,###,###,###",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 2,
            },
            {
                dataField: "PC_CHANCE_PAGAMENTO",
                caption: "Chance Pagamento",
                width: 80,
                dataType: "number",
                format: "###,###,###,###.00%",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 3,
                visible: false,
            },
            {
                dataField: "LG_CLIENTE_CADASTRADO",
                caption: "Cliente Cadastrado",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'center',
                visible: false,
                hidingPriority: 4,
            },
            {
                dataField: "LG_RESTRICAO",
                caption: "Restrição",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'center',
                hidingPriority: 5,
            },
            {
                dataField: "DS_TIPO_CONSULTA",
                caption: "Tipo Consulta",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'center',
                hidingPriority: 6,
            },
            {
                dataField: "DS_CONSULTAS_AGREGADOS",
                caption: "Descrição dos agregados",
                width: 250,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'center',
                visible: false,
            },
            {
                dataField: "DS_CODIGOS_CONSULTAS_AGREGADOS",
                caption: "Códigos dos agregados",
                width: 150,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'center',
                visible: false,
            },
            {
                dataField: "DS_IMAGEM_DETALHE",
                caption: "Abrir",
                width: 45,
                allowEditing: false,
                allowSorting: false,
                allowHeaderFiltering: false,
                allowFiltering: false,
                alignment: "center",
                cssClass: "column-data-grid",
                cellTemplate: $('#gridImagemHistoricoSerasa'),
                /*hidingPriority: 1,*/

            },

        ],

        onCellPrepared: function (e) {
            if (e.rowType === "data") {
                if (e.column.dataField === "LG_RESTRICAO" && e.value === "Sim") {

                    e.cellElement.css("color", "#b23a48");
                    e.cellElement.css("background-color", "#fae0e4");
                }
            };
            if (e.rowType === "group") {
                e.cellElement.css("color", "#f05b41");
                e.cellElement.css("background-color", "white");
            };
        },

        onCellClick: function (e) {
            if (e.column.caption == "Abrir") {
                document.getElementById("botaoCadastrarCliente").style.display = 'inline-block';
                $("#botaoImprimir").removeClass("ml-5");

                //if (e.data.LG_CLIENTE_CADASTRADO) {

                //    ExibirEsconderPaineis('botaoCadastrarCliente', 'none');
                //    $("#botaoImprimir").removeClass("ml-5").addClass("ml-5");
                //} else {

                //    document.getElementById("botaoCadastrarCliente").style.display = 'inline-block';
                //    $("#botaoImprimir").removeClass("ml-5");
                //}
                CarregaHtmlSerasa(e.data.NR_SEQUENCIA, true)
            }

        },

        toolbar: {
            items: [
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
        onToolbarPreparing: AutoResetState([]),
    }).dxDataGrid('instance');

    gridNegativaClienteSerasa = $("#grid_Negativa_Cliente_Serasa").dxDataGrid({
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
        editing: {
            mode: 'popup',
            allowUpdating: true,
            
            allowAdding: false,
            allowDeleting: true,
            useIcons: true,
            popup: {
                showTitle: true,
                titleTemplate: function (element) {
                    const $title = $("<div class='mb-3 mt-3 ml-2' style='font-size: 18px'>").text("Inclusão/Exclusão de Negativados");
                    element.append($title);
                },
                maxWidth: 850,
                height: 490,
                
            },
            form: {
                labelMode: 'floating',
                items: [
                    {
                        itemType: 'group',
                        colCount: 3,
                        colSpan: 2,
                        items: [
                            { dataField: "CD_CPF_CNPJ", caption: "CPF/CNPJ Devedor" },
                            {
                                dataField: "DT_INCLUSAO",
                                caption: "Data Inclusão",
                                editorOptions: { type: "date", format: "dd/MM/yyyy" },
                                validationRules: [{ type: 'required', message: "Campo obrigatório", useMaskBehavior: true }],
                            },
                            { dataField: "CD_SITUACAO", caption: "Situação", editorOptions: { maxLength: 75 } },
                        ],
                    },
                    {
                        itemType: 'group',
                        colCount: 3,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "CD_CPF_USUARIO_INCLUSAO",
                                caption: "CPF Usuario Inclusão",
                                editorOptions: { maxLength: 11, mask: '000.000.000-00', },
                                validationRules: [{ type: 'required', message: "Campo obrigatório" }],
                            },
                            {
                                dataField: "DS_NOME",
                                caption: "Nome",
                                editorOptions: { maxLength: 60 },
                                validationRules: [{ type: 'required', message: "Campo obrigatório" }],
                            },
                            { dataField: "CD_RG", caption: "Rg", editorOptions: { maxLength: 15 } },
                        ],
                    },
                    {
                        itemType: 'group',
                        colCount: 4,
                        colSpan: 2,
                        items: [
                            { dataField: "DT_NASCIMENTO", caption: "Data Nascimento", editorOptions: { type: "date", format: "dd/MM/yyyy", useMaskBehavior: true } },
                            { dataField: "CD_CELULAR", caption: "DDD + Celular", editorOptions: { maxLength: 70, type: "number" } },
                            { dataField: "CD_TELEFONE", caption: "DDD + Telefone", editorOptions: { maxLength: 70, type: "number" } },
                            { dataField: "CD_SEXO", caption: "Sexo" },
                        ],
                    },
                    {
                        itemType: 'group',
                        colCount: 12,
                        colSpan: 2,
                        items: [
                            {
                                dataField: 'CD_CEP',
                                caption: "Cep",
                                colSpan: 2,
                                editorOptions: { maxLength: 8 },
                                validationRules: [
                                    { type: 'required', message: "Campo obrigatório" },
                                    { type: "numeric", message: "Este campo aceita apenas números" },
                                    { type: "stringLength", min: 8, max: 8, message: "O CEP deve conter 8 dígitos numéricos" },
                                ],
                            },
                            {
                                dataField: "DS_ENDERECO",
                                caption: "Endereço",
                                colSpan: 6,
                                editorOptions: { maxLength: 60 },
                                validationRules: [{ type: 'required', message: "Campo obrigatório" }],
                            },
                            {
                                dataField: "DS_BAIRRO",
                                caption: "Bairro",
                                colSpan: 4,
                                editorOptions: { maxLength: 40 },
                                validationRules: [{ type: 'required', message: "Campo obrigatório" }],
                            },
                        ],
                    },
                    {
                        itemType: 'group',
                        colCount: 8,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "DS_CIDADE",
                                caption: "Cidade",
                                colSpan: 3,
                                validationRules: [{ type: 'required', message: "Campo obrigatório" }],
                            },
                            
                            { dataField: "DS_ENDERECO_COMPLEMENTO", caption: "Complemento", colSpan: 5, editorOptions: { maxLength: 40 } },
                        ],
                    },
                    {
                        itemType: 'group',
                        colCount: 9,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "NR_CONTRATO",
                                caption: "Número contrato",
                                colSpan: 4,
                                validationRules: [{ type: 'required', message: "Campo obrigatório" }],
                            },
                            {
                                dataField: "DT_DIVIDA",
                                caption: "Data Dívida",
                                colSpan: 3,
                                editorOptions: { type: "date", format: "dd/MM/yyyy", useMaskBehavior: true },
                                validationRules: [{ type: 'required', message: "Campo obrigatório" }],
                            },
                            {
                                dataField: "VL_DIVIDA",
                                caption: "Valor Dívida",
                                colSpan: 2,
                                editorOptions: { type: "number", format: "###,###,###,###,##0.00", min: 0.01 },
                                validationRules: [
                                    { type: 'required', message: "Campo obrigatório" },
                                    { type: "numeric", message: "Este campo aceita apenas números" },
                                ],
                            },
                        ],
                    },
                    {
                        itemType: 'group',
                        colCount: 12,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "CD_MOTIVO_INCLUSAO_SEQUENCIA",
                                caption: "Motivo Inclusão",
                                colSpan: 6,
                                validationRules: [{ type: 'required', message: "Campo obrigatório" }],
                            },
                            { dataField: "CD_NOSSO_NUMERO", caption: "Número controle", colSpan: 4 },
                            { dataField: "LG_ENVIA_SMS", caption: "Envia SMS", colSpan: 2 },
                        ],
                    },
                    {
                        itemType: 'group',
                        colCount: 3,
                        colSpan: 2,
                        items: [
                            { dataField: "CD_NUMERO_CONTROLE_ADICIONAL", caption: "Número controle adicional" },
                            { dataField: "CD_ALINEA_CHEQUE_DEVOLVIDO", caption: "Número cheque devolvido" },
                            { dataField: "CD_CHEQUE_CMC7", caption: "Número adicional cheque devolvido" },
                        ],
                    },
                    {
                        itemType: 'group',
                        colCount: 12,
                        colSpan: 2,
                        items: [
                            { dataField: "DS_OBS_INCLUSAO", caption: "Observação Inclusão", editorOptions: { maxLength: 40 }, colSpan: 7 },
                            { dataField: "DS_MOTIVO_INCLUSAO_NEGADA", caption: "Motivo Inclusão Negada", colSpan: 5 },
                        ],
                    },

                ],
            },


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
            allowedPageSizes: [10, 15, 20],
            showPageSizeSelector: false,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Negativações Clientes');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Negativacao_Clientes.xlsx');
                });
            });
            e.cancel = true;
        },
        
        //onExporting: function (e) {
        //    var workbook = new ExcelJS.Workbook();
        //    var worksheet = workbook.addWorksheet('Endereços');

        //    DevExpress.excelExporter.exportDataGrid({
        //        component: e.component,
        //        worksheet: worksheet,
        //        autoFilterEnabled: true
        //    }).then(function () {
        //        workbook.xlsx.writeBuffer().then(function (buffer) {
        //            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ClientesEndereços.xlsx');
        //        });
        //    });
        //    e.cancel = true;
        //},
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        filterPanel: { visible: true },
        columnChooser: { enabled: true, allowSearch: true, height: 350 },
        keyExpr: ['NR_SEQUENCIA', 'CD_CPF_CNPJ'],
        columns: [

            {
                dataField: "CD_CPF_CNPJ",
                caption: "CPF/CNPJ Devedor",
                width: 110,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                visible: true,
                hidingPriority: 111,
            },
            {
                dataField: "DS_NOME",
                caption: "Nome",
                allowEditing: true,
                width: 160,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 112,
            },
            {
                dataField: "DT_INCLUSAO",
                caption: "Data Inclusão",
                width: 90,
                dataType: "date",
                format: "dd/MM/yyyy",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: true,
                editorOptions: { useMaskBehavior: true },
                hidingPriority: 113,
            },
            {
                dataField: "CD_LOGIN_INCLUSAO",
                caption: "Login Inclusão",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'center',
                hidingPriority: 3,
                visible: true,
            },
            {
                dataField: "CD_CPF_USUARIO_INCLUSAO",
                caption: "CPF Usuário Inclusão",
                allowEditing: true,
                width: 110,
                mask: '000.000.000-00',
                maxLength: 11,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 104,
                visible: true,
            },

            {
                dataField: "CD_RG",
                caption: "Rg",
                width: 70,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 5,
                visible: false,
            },
            {
                dataField: "VL_DIVIDA",
                caption: "Valor Dívida",
                width: 80,
                dataType: "number",
                format: "###,###,###,###,##0.00",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                alignment: 'right',
                cssClass: "column-data-grid",
                hidingPriority: 115,

            },
            {
                dataField: "CD_CPF_USUARIO_EXCLUSAO",
                caption: "CPF Usuário Exclusão",
                allowEditing: true,
                width: 90,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 9,
                visible: true,
            },

            {
                dataField: "CD_SEXO",
                caption: "Sexo",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                hidingPriority: 10,
                lookup: {
                    dataSource: dataSourceSexoNegativar,
                    valueExpr: "CD_SEXO",
                    displayExpr: "DS_SEXO",
                    searchExpr: ["DS_SEXO"]
                },
                visible: false,
            },
            {
                dataField: "DT_NASCIMENTO",
                caption: "Data Nascimento",
                width: 110,
                dataType: "date",
                format: "dd/MM/yyyy",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 7,
                visible: false,
                allowHiding: true,
                editorOptions: { useMaskBehavior: true },
            },
            {
                dataField: "CD_CELULAR",
                caption: "DDD + Celular",
                width: 70,
                dataType: "number",
                format: "######",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: false,
                hidingPriority: 9,

            },
            {
                dataField: "CD_TELEFONE",
                caption: "DDD + Telefone",
                width: 70,
                dataType: "number",
                format: "######",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: false,
                hidingPriority: 10,
            },
            {
                dataField: "CD_CEP",
                caption: "Cep",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                visible: false,
                hidingPriority: 11,
                setCellValue: function (newData, value) {
                    
                    if (value) {
                        return new Promise(function (resolve, reject) {

                            $.ajax({
                                type: 'POST',
                                url: "/CadastrosGerais/GetCep",
                                data: { CdCep: value },
                                success: function (response) {
                                    resolve(response);

                                },
                                error: function () {
                                    // Rejeita a Promise em caso de erro
                                    reject();
                                }
                            });

                        }).then(function (response) {
                            
                            newData.CD_CEP = value;
                            if (response.length > 0) {
                                newData.DS_ENDERECO = response[0].Ds_Endereco;
                                newData.DS_BAIRRO = response[0].Ds_Bairro;
                                newData.DS_CIDADE = response[0].Ds_Municipio;
                                dataEdicaoGridNegativar.CD_UF = response[0].CD_UF;

                            }

                        })
                    }


                }
            },
            {
                dataField: "DS_ENDERECO",
                caption: "Endereço + número",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 12,
                visible: false,
            },
            {
                dataField: "DS_ENDERECO_COMPLEMENTO",
                caption: "Complemento",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 13,
                visible: false,
            },
            {
                dataField: "DS_BAIRRO",
                caption: "Bairro",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 14,
                visible: false,
            },
            {
                dataField: "DS_CIDADE",
                caption: "Cidade",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                lookup: {
                    dataSource(options) {
                        return {
                            store: dataSourceMunicipios,
                            paginate: true,
                        };
                    },
                    valueExpr: "DS_MUNICIPIO",
                    displayExpr: "DS_MUNICIPIO_UF"
                },
                editorOptions: {
                    onValueChanged: function (e) {
                        const selectedItem = e.component.option("selectedItem");
                        if (selectedItem) {
                            dataEdicaoGridNegativar.CD_UF = selectedItem.CD_UF;
                            
                        }

                    }
                },
                hidingPriority: 15,
                visible: false,

            },
            {
                dataField: "DT_DIVIDA",
                caption: "Data Dívida",
                width: 80,
                dataType: "date",
                format: "dd/MM/yyyy",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: true,
                hidingPriority: 17,
                editorOptions: { useMaskBehavior: true },
                
            },

            {
                dataField: "DS_OBS_INCLUSAO",
                caption: "Observação Inclusão",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 18,
            },
            {
                dataField: "CD_NUMERO_CONTROLE_ADICIONAL",
                caption: "Número controle adicional",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 19,
            },
            {
                dataField: "NR_CONTRATO",
                caption: "Número contrato",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 20,
            },
            {
                dataField: "CD_NOSSO_NUMERO",
                caption: "Número controle",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 21,
            },
            {
                dataField: "CD_ALINEA_CHEQUE_DEVOLVIDO",
                caption: "Número cheque devolvido",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 22,
            },
            {
                dataField: "CD_CHEQUE_CMC7",
                caption: "Número adicional cheque devolvido",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 23,
            },
            {
                dataField: "DT_EXCLUSAO",
                caption: "Data Exclusão",
                width: 100,
                dataType: "date",
                format: "dd/MM/yyyy",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 24,
                
            },
            {
                dataField: "CD_LOGIN_EXCLUSAO",
                caption: "Login Exclusão",
                allowEditing: false,
                allowSorting: true,

                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                visible: true,
                alignment: 'left',
                hidingPriority: 25,
            },
            {
                dataField: "CD_MOTIVO_EXCLUSAO_SEQUENCIA",
                caption: "Motivo Exclusão",
                width: 160,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                visible: true,
                hidingPriority: 26,
                lookup: {
                    dataSource(options) {
                        return {
                            store: dataSourceNegativarExclusao,
                            paginate: true,
                        };
                    },
                    valueExpr: "Nr_Sequencia",
                    displayExpr: "Ds_Motivo_Serasa",
                    searchExpr: ["Ds_Motivo_Serasa"]
                },

            },
            {
                dataField: "DS_OBS_EXCLUSAO",
                caption: "Observação Exclusão",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                visible: true,
                alignment: 'left',
                hidingPriority: 27,
            },
            {
                dataField: "DS_MOTIVO_INCLUSAO_NEGADA",
                caption: "Motivo Inclusão Negada",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                visible: true,
                alignment: 'left',
                hidingPriority: 28,
                readOnly: true,
            },
            {
                dataField: "DS_MOTIVO_EXCLUSAO_NEGADA",
                caption: "Motivo Exclusão Negada",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 29,

            },
            {
                dataField: "CD_MOTIVO_INCLUSAO_SEQUENCIA",
                caption: "Motivo inclusão",
                width: 160,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 110,
                visible: true,
                lookup: {
                    dataSource(options) {
                        return {
                            store: dataSourceNegativarInclusao,
                            paginate: true,
                        };
                    },
                    valueExpr: "Nr_Sequencia",
                    displayExpr: "Ds_Motivo_Serasa",
                    searchExpr: ["Ds_Motivo_Serasa"]
                },

            },

            {
                dataField: "LG_ENVIA_SMS",
                caption: "Envia SMS",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 31,

                visible: false,
                dataType: 'text',
                lookup: {
                    dataSource: dataSourceEnviaSms,
                    valueExpr: "LG_ENVIA_SMS",
                    displayExpr: "DS_ENVIA_SMS",
                    searchExpr: ["DS_ENVIA_SMS"]
                }
            },

            {
                dataField: "CD_SITUACAO",
                caption: "Situação",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                lookup: {
                    dataSource: dataSourceSituacaoNegativar,
                    valueExpr: "CD_SITUACAO",
                    displayExpr: "DS_SITUACAO",
                    searchExpr: ["DS_SITUACAO"]
                },
                visible: true,
                width: 80,
                hidingPriority: 108,
            },
            {
                dataField: "CD_NEGATIVACAO_SERASA",
                caption: "Código Identificador Serasa",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                visible: false,
                hidingPriority: 32,

            },
            {
                type: "buttons",
                width: 50,
                
            },
        ],
        toolbar: {
            items: [
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        type: 'success',
                        text: 'Incluir Negativação',
                        hint: "Incluir Negativação",
                        width: 150,
                        icon: 'save',
                        onClick(e) {

                            if (dataUsuarioLogado.NR_NIVEL_ACESSO == 1) {
                                PopupNegativarCliente();

                            } else if (dataUsuarioLogado.Lg_Permite_Incluir_Serasa_Negativacao) {
                                PopupNegativarCliente();

                            } else {
                                
                                new PNotify({
                                    title: 'Não tem permissão para Incluir Negativações!',
                                    text: 'Esse usuário não tem permissão para Incluir Negativações!',
                                    type: 'alert',
                                    width: "28%"
                                });
                            }
                            

                        },
                    },
                },
                'groupPanel',
                'columnChooserButton',
                'exportButton',
                'searchPanel',
            ],
        },
        onCellPrepared: function (e) {
            if (e.rowType === "data") {

                if (e.row.data.CD_SITUACAO == 3) {

                    if (e.column.name == "buttons") {

                        e.cellElement.find('.dx-link-edit').remove();

                    }
                    if (e.column.dataField == "CD_SITUACAO") {

                        e.cellElement.css("color", "#155724");
                        e.cellElement.css("background-color", "#D4EDDA");

                    }
                }
                if (e.row.data.CD_SITUACAO !== 1) {
                    if (e.column.name == "buttons") {

                        e.cellElement.find('.dx-link-delete').remove();

                    }

                }
                if (e.row.data.CD_SITUACAO == 2) {
                    if (e.column.dataField == "CD_SITUACAO") {

                        e.cellElement.css("color", "#b23a48");
                        e.cellElement.css("background-color", "#fae0e4")

                    }
                    if (e.column.name == "buttons") {
                        let editButton = e.cellElement.find('.dx-link-edit');
                        editButton.removeClass('dx-link-edit dx-icon-edit')
                            .addClass('dx-icon-check');

                    }

                }

            }
        },
        onContentReady: function (e) {
            if (editRowKey) {

                let rowIndex = e.component.getRowIndexByKey(editRowKey);
                if (rowIndex >= 0) {

                    e.component.editRow(rowIndex);
                    editRowKey = null;
                }
            }
        },
        
        onEditingStart: function (e) {

            dataEdicaoGridNegativar = e.data;
            if (e.data.CD_SITUACAO == 1 || e.data.CD_SITUACAO == 4) {
                e.data.DT_INCLUSAO = new Date();

            } else if (e.data.CD_SITUACAO == 2 || e.data.CD_SITUACAO == 5) {
                e.data.DT_EXCLUSAO = new Date();

            }

            if (dataUsuarioLogado.NR_NIVEL_ACESSO == 1) {
                if (e.data.CD_SITUACAO == 2) {
                    e.cancel = true;
                    let data = e.data;
                    PopupBaixaNegativacaoCliente(data);
                }

            } else {

                if (e.data.CD_SITUACAO == 2) {
                    if (dataUsuarioLogado.Lg_Permite_Excluir_Serasa_Negativacao) {
                        e.cancel = true;
                        let data = e.data;
                        PopupBaixaNegativacaoCliente(data);
                    } else {
                        e.cancel = true;
                        new PNotify({
                            title: 'Não tem permissão para Baixar Negativações!',
                            text: 'Esse usuário não tem permissão para baixar Negativações!',
                            type: 'alert',
                            width: "28%"
                        });
                    }
                    
                } else {

                    if (!dataUsuarioLogado.Lg_Permite_Incluir_Serasa_Negativacao) {
                        e.cancel = true;
                        new PNotify({
                            title: 'Não tem permissão para Incluir Negativações!',
                            text: 'Esse usuário não tem permissão para Incluir Negativações!',
                            type: 'alert',
                            width: "28%"
                        });
                    }
                }
                

            }
           
        },
        onSaving: function (e) {
            
            if (e.changes.length > 0 && e.changes[0].type == "remove") {
                
                let objDelete = {
                    NR_SEQUENCIA: e.changes[0].key.NR_SEQUENCIA,
                    CD_CPF_CNPJ: e.changes[0].key.CD_CPF_CNPJ,

                }

                new Promise(function (resolve, reject) {
                    $.ajax({
                        type: 'POST',
                        url: '/CadastrosGerais/DeleteNegativaCliente',
                        data: {
                            cliente: JSON.stringify(objDelete)
                        },
                        success: function (response) {
                            resolve(response);
                        },
                        error: function (error) {
                            reject(error);
                        }
                    });
                }).then(function (response) {
                    
                    new PNotify({
                        title: 'Sucesso!',
                        text: "Registro excluído com sucesso!",
                        type: 'success',
                        width: '28%'
                    });
                    CarregaClientesNegativar();
                })

            } else {

                if (dataEdicaoGridNegativar.CD_SITUACAO == 1 || dataEdicaoGridNegativar.CD_SITUACAO == 4) {

                    function areRequiredFieldsFilled(data) {
                        let requiredFields = [
                            'CD_CPF_USUARIO_INCLUSAO',
                            'CD_MOTIVO_INCLUSAO_SEQUENCIA',
                            'DT_INCLUSAO',
                            'DS_NOME',
                            'CD_CEP',
                            'DS_ENDERECO',
                            'DS_BAIRRO',
                            'DS_CIDADE',
                            'NR_CONTRATO',
                            'DT_DIVIDA',
                            'VL_DIVIDA'
                        ];

                        if (data.LG_ENVIA_SMS === true || data.LG_ENVIA_SMS === "Sim") {
                            requiredFields.push('CD_CELULAR');
                            new PNotify({
                                title: 'Celular é obrigatório!',
                                text: 'Se o campo Envia SMS for Sim, o campo Celular é obrigatório!',
                                type: 'alert',
                                width: "28%"
                            });
                            
                        }

                        return requiredFields.every(field => data && data[field] !== undefined && data[field] !== null && data[field] !== '');
                    }

                    if (e.changes.length > 0) {
                        e.changes.forEach(change => {
                            for (let key in change.data) {
                                if (change.data.hasOwnProperty(key)) {
                                    dataEdicaoGridNegativar[key] = change.data[key];
                                }
                            }
                        });
                    }
                    
                    let isValid = areRequiredFieldsFilled(dataEdicaoGridNegativar);

                    if (!isValid) {
                        e.cancel = true;
                        DevExpress.ui.notify("Preencha todos os campos obrigatórios.", "error", 3000);
                        return;
                    }

                    let motivoSerasa = dataSourceNegativarInclusao.filter(item => item.Nr_Sequencia === dataEdicaoGridNegativar.CD_MOTIVO_INCLUSAO_SEQUENCIA)[0].Cd_Motivo_Serasa;
                    let dataDivida = dataEdicaoGridNegativar.DT_DIVIDA;
                    let dataNascimento = dataEdicaoGridNegativar.DT_NASCIMENTO;

                    function formatDate(dateString) {
                        let date = new Date(dateString);
                        let day = String(date.getDate()).padStart(2, '0');
                        let month = String(date.getMonth() + 1).padStart(2, '0');
                        let year = date.getFullYear();
                        return `${day}/${month}/${year}`;
                    }

                    let formattedDate = formatDate(dataDivida);
                    let formattedDateN = formatDate(dataNascimento);

                    let objChamadaApi = {
                        //Login: '463573',
                        //Password: '694852',
                        Login: credenciaisSerasa.Cd_Integracao_Serasa_Recomenda_Usuario,
                        Password: credenciaisSerasa.Ds_Integracao_Serasa_Senha,
                        CD_SITUACAO: dataEdicaoGridNegativar.CD_SITUACAO,
                        Seu_Cpf: dataEdicaoGridNegativar.CD_CPF_USUARIO_INCLUSAO,
                        Tipo_Documento: dataEdicaoGridNegativar.CD_CPF_CNPJ.length == 11 ? "F" : "J",
                        Documento: dataEdicaoGridNegativar.CD_CPF_CNPJ,
                        Nome: dataEdicaoGridNegativar.DS_NOME,
                        Sexo: dataEdicaoGridNegativar.CD_SEXO,
                        Data_Nascimento: formattedDateN,
                        Rg: dataEdicaoGridNegativar.CD_RG,
                        Envia_Sms: dataEdicaoGridNegativar.LG_ENVIA_SMS == true ? '1' : "0",
                        Telefone: dataEdicaoGridNegativar.CD_TELEFONE,
                        Celular: dataEdicaoGridNegativar.CD_CELULAR,
                        Cep: dataEdicaoGridNegativar.CD_CEP,
                        Endereco: dataEdicaoGridNegativar.DS_ENDERECO,
                        Complemento: dataEdicaoGridNegativar.DS_ENDERECO_COMPLEMENTO,
                        Bairro: dataEdicaoGridNegativar.DS_BAIRRO,
                        Cidade: dataEdicaoGridNegativar.DS_CIDADE,
                        Uf: dataEdicaoGridNegativar.CD_UF,
                        Data_Divida: formattedDate,
                        Valor: dataEdicaoGridNegativar.VL_DIVIDA,
                        Motivo: motivoSerasa,
                        Numero_Contrato: dataEdicaoGridNegativar.NR_CONTRATO,
                        Numero_Adicional: dataEdicaoGridNegativar.CD_NUMERO_CONTROLE_ADICIONAL,
                        Nosso_Numero: dataEdicaoGridNegativar.CD_NOSSO_NUMERO,
                        Alinea: dataEdicaoGridNegativar.CD_ALINEA_CHEQUE_DEVOLVIDO,
                        Cmc7: dataEdicaoGridNegativar.CD_CHEQUE_CMC7

                    };

                    new Promise(function (resolve, reject) {
                        $.ajax({
                            type: 'POST',
                            url: '/CadastrosGerais/NegativarClienteInclusao',
                            data: {
                                consultaRequest: JSON.stringify(objChamadaApi)
                            },
                            success: function (response) {
                                resolve(response);
                            },
                            error: function (error) {
                                reject(error);
                            }
                        });
                    }).then(function (response) {
                        loaPanel.hide();

                        const status = response.status;
                        const isValidResponse = (status && status.codigo === 0) ||
                            (Array.isArray(status) && status[0] && status[0].codigo === 0);

                        let mensagem = '';
                        if (status && status.mensagem) {
                            mensagem = status.mensagem;
                        } else if (Array.isArray(status) && status[0] && status[0].mensagem) {
                            mensagem = status[0].mensagem;
                        }

                        let identificador;
                        
                        if (response.status && response.status[0] && response.status[0].identificador) {
                            identificador = response.status[0].identificador;
                        } else if (response.status && response.status.identificador) {
                            identificador = response.status.identificador;
                        } else {
                            identificador = null;
                        }

                        if (isValidResponse) {
                            
                            new PNotify({
                                title: 'Sucesso!',
                                text: mensagem,
                                type: 'success',
                                width: '28%'
                            });

                            let objUpdate = {
                                CD_EMPRESA: null,
                                NR_SEQUENCIA: dataEdicaoGridNegativar.NR_SEQUENCIA,
                                CD_CPF_USUARIO_INCLUSAO: dataEdicaoGridNegativar.CD_CPF_USUARIO_INCLUSAO,
                                CD_CPF_USUARIO_EXCLUSAO: dataEdicaoGridNegativar.CD_CPF_USUARIO_EXCLUSAO,
                                CD_SITUACAO: 2,
                                LG_NEGATIVADO: 1,
                                CD_NEGATIVACAO_SERASA: identificador,
                                DT_INCLUSAO: dataEdicaoGridNegativar.DT_INCLUSAO,
                                CD_LOGIN_INCLUSAO: dataEdicaoGridNegativar.CD_LOGIN_INCLUSAO,
                                CD_TIPO_PESSOA: dataEdicaoGridNegativar.CD_CPF_CNPJ.length == 11 ? "F" : "J",
                                CD_CPF_CNPJ: dataEdicaoGridNegativar.CD_CPF_CNPJ,
                                DS_NOME: dataEdicaoGridNegativar.DS_NOME,
                                CD_SEXO: dataEdicaoGridNegativar.CD_SEXO,
                                DT_NASCIMENTO: dataEdicaoGridNegativar.DT_NASCIMENTO,
                                CD_RG: dataEdicaoGridNegativar.CD_RG,
                                LG_ENVIA_SMS: dataEdicaoGridNegativar.LG_ENVIA_SMS,
                                CD_TELEFONE: dataEdicaoGridNegativar.CD_TELEFONE,
                                CD_CELULAR: dataEdicaoGridNegativar.CD_CELULAR,
                                CD_CEP: dataEdicaoGridNegativar.CD_CEP,
                                DS_ENDERECO: dataEdicaoGridNegativar.DS_ENDERECO,
                                DS_ENDERECO_COMPLEMENTO: dataEdicaoGridNegativar.DS_ENDERECO_COMPLEMENTO,
                                DS_BAIRRO: dataEdicaoGridNegativar.DS_BAIRRO,
                                DS_CIDADE: dataEdicaoGridNegativar.DS_CIDADE,
                                CD_UF: dataEdicaoGridNegativar.CD_UF,
                                DT_DIVIDA: dataEdicaoGridNegativar.DT_DIVIDA,
                                VL_DIVIDA: dataEdicaoGridNegativar.VL_DIVIDA,
                                CD_MOTIVO_INCLUSAO_SEQUENCIA: dataEdicaoGridNegativar.CD_MOTIVO_INCLUSAO_SEQUENCIA,
                                DS_OBS_INCLUSAO: dataEdicaoGridNegativar.DS_OBS_INCLUSAO,
                                NR_CONTRATO: dataEdicaoGridNegativar.NR_CONTRATO,
                                CD_NUMERO_CONTROLE_ADICIONAL: dataEdicaoGridNegativar.CD_NUMERO_CONTROLE_ADICIONAL,
                                CD_NOSSO_NUMERO: dataEdicaoGridNegativar.CD_NOSSO_NUMERO,
                                CD_ALINEA_CHEQUE_DEVOLVIDO: dataEdicaoGridNegativar.CD_ALINEA_CHEQUE_DEVOLVIDO,
                                CD_CHEQUE_CMC7: dataEdicaoGridNegativar.CD_CHEQUE_CMC7,
                                DT_EXCLUSAO: dataEdicaoGridNegativar.DT_EXCLUSAO,
                                CD_LOGIN_EXCLUSAO: dataEdicaoGridNegativar.CD_LOGIN_EXCLUSAO,
                                CD_MOTIVO_EXCLUSAO_SEQUENCIA: dataEdicaoGridNegativar.CD_MOTIVO_EXCLUSAO_SEQUENCIA,
                                DS_OBS_EXCLUSAO: dataEdicaoGridNegativar.DS_OBS_EXCLUSAO,
                                DS_MOTIVO_INCLUSAO_NEGADA: dataEdicaoGridNegativar.DS_MOTIVO_INCLUSAO_NEGADA,
                                DS_MOTIVO_EXCLUSAO_NEGADA: dataEdicaoGridNegativar.DS_MOTIVO_EXCLUSAO_NEGADA,

                            };

                            UpdateNegativaCliente(objUpdate);

                        } else {

                            new PNotify({
                                title: 'Erro ao concluir a operação!',
                                text: mensagem,
                                type: 'error',
                                width: '28%'
                            });

                            let objUpdate = {
                                CD_EMPRESA: null,
                                NR_SEQUENCIA: dataEdicaoGridNegativar.NR_SEQUENCIA,
                                CD_CPF_USUARIO_INCLUSAO: dataEdicaoGridNegativar.CD_CPF_USUARIO_INCLUSAO,
                                CD_CPF_USUARIO_EXCLUSAO: null,
                                CD_SITUACAO: identificador == null ? 1 : 4,
                                LG_NEGATIVADO: 0,
                                CD_NEGATIVACAO_SERASA: identificador,
                                DT_INCLUSAO: dataEdicaoGridNegativar.DT_INCLUSAO,
                                CD_LOGIN_INCLUSAO: dataEdicaoGridNegativar.CD_LOGIN_INCLUSAO,
                                CD_TIPO_PESSOA: dataEdicaoGridNegativar.CD_CPF_CNPJ.length == 11 ? "F" : "J",
                                CD_CPF_CNPJ: dataEdicaoGridNegativar.CD_CPF_CNPJ,
                                DS_NOME: dataEdicaoGridNegativar.DS_NOME,
                                CD_SEXO: dataEdicaoGridNegativar.CD_SEXO,
                                DT_NASCIMENTO: dataEdicaoGridNegativar.DT_NASCIMENTO,
                                CD_RG: dataEdicaoGridNegativar.CD_RG,
                                LG_ENVIA_SMS: dataEdicaoGridNegativar.LG_ENVIA_SMS,
                                CD_TELEFONE: dataEdicaoGridNegativar.CD_TELEFONE,
                                CD_CELULAR: dataEdicaoGridNegativar.CD_CELULAR,
                                CD_CEP: dataEdicaoGridNegativar.CD_CEP,
                                DS_ENDERECO: dataEdicaoGridNegativar.DS_ENDERECO,
                                DS_ENDERECO_COMPLEMENTO: dataEdicaoGridNegativar.DS_ENDERECO_COMPLEMENTO,
                                DS_BAIRRO: dataEdicaoGridNegativar.DS_BAIRRO,
                                DS_CIDADE: dataEdicaoGridNegativar.DS_CIDADE,
                                CD_UF: dataEdicaoGridNegativar.CD_UF,
                                DT_DIVIDA: dataEdicaoGridNegativar.DT_DIVIDA,
                                VL_DIVIDA: dataEdicaoGridNegativar.VL_DIVIDA,
                                CD_MOTIVO_INCLUSAO_SEQUENCIA: dataEdicaoGridNegativar.CD_MOTIVO_INCLUSAO_SEQUENCIA,
                                DS_OBS_INCLUSAO: dataEdicaoGridNegativar.DS_OBS_INCLUSAO,
                                NR_CONTRATO: dataEdicaoGridNegativar.NR_CONTRATO,
                                CD_NUMERO_CONTROLE_ADICIONAL: dataEdicaoGridNegativar.CD_NUMERO_CONTROLE_ADICIONAL,
                                CD_NOSSO_NUMERO: dataEdicaoGridNegativar.CD_NOSSO_NUMERO,
                                CD_ALINEA_CHEQUE_DEVOLVIDO: dataEdicaoGridNegativar.CD_ALINEA_CHEQUE_DEVOLVIDO,
                                CD_CHEQUE_CMC7: dataEdicaoGridNegativar.CD_CHEQUE_CMC7,
                                DT_EXCLUSAO: null,
                                CD_LOGIN_EXCLUSAO: null,
                                CD_MOTIVO_EXCLUSAO_SEQUENCIA: null,
                                DS_OBS_EXCLUSAO: null,
                                DS_MOTIVO_INCLUSAO_NEGADA: mensagem,
                                DS_MOTIVO_EXCLUSAO_NEGADA: null,

                            };

                            UpdateNegativaCliente(objUpdate);
                        }

                    }).catch(function (error) {
                        
                    });

                }
            }

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

        stateStoring: AutoLoad('grid_Negativa_Cliente_Serasa'),
        onToolbarPreparing: AutoResetState([]),

    }).dxDataGrid('instance');

    //#endregion

    //PARÂMETROS
    //#region [parametros]

    nbx_Qt_Dias_Renovacao_Clientes = $('#nbx_Qt_Dias_Renovacao_Clientes').dxNumberBox({
        value: '',
        format: 'Inativar clientes que não tiveram seus cadastros atualizados nos últimos ##### dias',
        min: 0,
        max: 99999,
        showClearButton: true,
        showSpinButtons: true,
        step: 30,
        placeholder: 'Quantidade de dias para inativação de clientes que não tiveram nenhuma atualização em seus cadastros',
        onInitialized: function (e) {
            e.component.option("onValueChanged", function (e) {

                if (nbx_Qt_Dias_Renovacao_Clientes.option('value') !== paransGeral.Qt_Dias_Renova_Cli_Inativ) {

                    SalvarParansGeraisCliente();

                }

            });
        },

    }).dxNumberBox('instance');

    nbx_Qt_Dias_Inativacao_Clientes = $('#nbx_Qt_Dias_Inativacao_Clientes').dxNumberBox({
        value: '',
        format: 'Inativar clientes sempre a cada ##### dias para reavaliação cadastral',
        min: 0,
        max: 99999,
        showClearButton: true,
        showSpinButtons: true,
        step: 30,
        placeholder: 'Quantidade de dias para inativação automática de clientes para reavaliação cadastral',
        onInitialized: function (e) {
            e.component.option("onValueChanged", function (e) {

                if (nbx_Qt_Dias_Inativacao_Clientes.option('value') !== paransGeral.Qt_Dias_Renova_Cli_Prazo) {

                    SalvarParansGeraisCliente();

                }

            });
        },
    }).dxNumberBox('instance');

    nbx_Qt_Zerar_Limite_Credito_Clientes = $('#nbx_Qt_Zerar_Limite_Credito_Clientes').dxNumberBox({
        value: '',
        format: 'Zerar limite de crédito de clientes sempre a cada ##### dias para reavaliação cadastral',
        min: 0,
        max: 99999,
        showClearButton: true,
        showSpinButtons: true,
        step: 30,
        placeholder: 'Quantidade de dias para zerar automaticamente limite de crédito de clientes para reavaliação cadastral',
        onInitialized: function (e) {
            e.component.option("onValueChanged", function (e) {

                if (nbx_Qt_Zerar_Limite_Credito_Clientes.option('value') !== paransGeral.Qt_Dias_Renova_Cli_Zera_Limite_Credito) {

                    SalvarParansGeraisCliente();

                }

            });
        },

    }).dxNumberBox('instance');

    chk_Valida_CPF_CNPJ_Cadastro = $('#chk_Valida_CPF_CNPJ_Cadastro').dxCheckBox({
        value: false,
        text: 'Permite cadastrar clientes apenas com CPF ou CNPJ válidos',
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {
                    if (!chk_Valida_CPF_CNPJ_Cadastro.option('value')) {
                        AbrirModal('#modalAvisoValidacaoCPF_CNPJ');
                    }

                    if (chk_Valida_CPF_CNPJ_Cadastro.option('value') !== paransGeral.Lg_Valida_CPF_CNPJ_Cad_Cliente) {

                        SalvarParansGeraisCliente();

                    }
                });
            });
        },

    }).dxCheckBox('instance');

    chk_Obriga_RG_Cadastro = $('#chk_Obriga_RG_Cadastro').dxCheckBox({
        value: false,
        text: 'Obrigatório informar o RG para cadastro de pessoas físicas',
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (chk_Obriga_RG_Cadastro.option('value') !== paransGeral.Lg_Obriga_RG_Cliente) {

                        SalvarParansGeraisCliente();

                    }
                });
            });
        },
    }).dxCheckBox('instance');

    chk_Obriga_IE_Cadastro = $('#chk_Obriga_IE_Cadastro').dxCheckBox({
        value: false,
        text: 'Obrigatório informar a Inscrição Estadual para cadastro de pessoas jurídicas',
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (chk_Obriga_IE_Cadastro.option('value') !== paransGeral.Lg_Obriga_IE_Cliente) {

                        SalvarParansGeraisCliente();

                    }
                });
            });
        },
    }).dxCheckBox('instance');

    chk_Valida_IE_Cadastro = $('#chk_Valida_IE_Cadastro').dxCheckBox({
        value: false,
        text: 'Permite informar apenas Inscrições Estaduais válidas para cadastro de pessoas jurídicas',
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (chk_Valida_IE_Cadastro.option('value') !== paransGeral.Lg_Valida_IE_Cliente) {

                        SalvarParansGeraisCliente();

                    }
                });
            });
        },
    }).dxCheckBox('instance');

    chk_Obriga_Profissao_Cadastro = $('#chk_Obriga_Profissao_Cadastro').dxCheckBox({
        value: false,
        text: 'Obrigatório informar a Profissão para cadastro de clientes',
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (chk_Obriga_Profissao_Cadastro.option('value') !== paransGeral.Lg_Obriga_Profissao_Cadastro_Cliente) {

                        SalvarParansGeraisCliente();

                    }
                });
            });
        },
    }).dxCheckBox('instance');

    chk_Obriga_Endereco_Cadastro = $('#chk_Obriga_Endereco_Cadastro').dxCheckBox({
        value: false,
        text: 'Obrigatório informar Endereço para cadastro de clientes',
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (chk_Obriga_Endereco_Cadastro.option('value') !== paransGeral.Lg_Obriga_Endereco_Cliente) {

                        SalvarParansGeraisCliente();

                    }
                });
            });
        },
    }).dxCheckBox('instance');

    chk_Clientes_Consultar = $('#chk_Clientes_Consultar').dxCheckBox({
        value: true,
        text: 'Consultar clientes',
    }).dxCheckBox('instance');

    chk_Clientes_Cadastrar = $('#chk_Clientes_Cadastrar').dxCheckBox({
        value: true,
        text: 'Cadastrar novos clientes',
    }).dxCheckBox('instance');

    chk_Clientes_Alterar = $('#chk_Clientes_Alterar').dxCheckBox({
        value: true,
        text: 'Alterar clientes cadastrados',
    }).dxCheckBox('instance');

    chk_Anexos_Consultar = $('#chk_Anexos_Consultar').dxCheckBox({
        value: true,
        text: 'Consultar arquivos anexados ao cadastro do cliente',
    }).dxCheckBox('instance');

    chk_Anexos_Upload = $('#chk_Anexos_Upload').dxCheckBox({
        value: true,
        text: 'Anexar arquivos ao cadastro do cliente',
    }).dxCheckBox('instance');

    chk_Anexos_Pastas = $('#chk_Anexos_Pastas').dxCheckBox({
        value: true,
        text: 'Criar novas pastas no repositório de arquivos do cliente',
    }).dxCheckBox('instance');

    chk_Anexos_Excluir = $('#chk_Anexos_Excluir').dxCheckBox({
        value: true,
        text: 'Excluir pastas e arquivos do repositório do cliente',
    }).dxCheckBox('instance');

    chk_Creditos_Consultar = $('#chk_Creditos_Consultar').dxCheckBox({
        value: true,
        text: 'Consultar Extrato de Créditos de clientes',
    }).dxCheckBox('instance');

    chk_Creditos_Incluir = $('#chk_Creditos_Incluir').dxCheckBox({
        value: true,
        text: 'Lançar novos créditos ou débitos para clientes',
    }).dxCheckBox('instance');

    chk_CRM_Consultar = $('#chk_CRM_Consultar').dxCheckBox({
        value: true,
        text: 'Consultar CRM',
    }).dxCheckBox('instance');

    chk_Compradores_Consultar = $('#chk_Compradores_Consultar').dxCheckBox({
        value: true,
        text: 'Consultar compradores autorizados',
    }).dxCheckBox('instance');

    chk_Compradores_Cadastrar = $('#chk_Compradores_Cadastrar').dxCheckBox({
        value: true,
        text: 'Cadastrar novos compradores autorizados',
    }).dxCheckBox('instance');

    chk_Compradores_Alterar = $('#chk_Compradores_Alterar').dxCheckBox({
        value: true,
        text: 'Alterar compradores autorizados cadastrados',
    }).dxCheckBox('instance');

    chk_Precificacao_Consultar = $('#chk_Precificacao_Consultar').dxCheckBox({
        value: true,
        text: 'Consultar precificação diferenciada de clientes',
    }).dxCheckBox('instance');

    chk_Precificacao_Definir = $('#chk_Precificacao_Definir').dxCheckBox({
        value: true,
        text: 'Definir precificação diferenciada para clientes',
    }).dxCheckBox('instance');

    chk_Equipe_Consultar = $('#chk_Equipe_Consultar').dxCheckBox({
        value: true,
        text: 'Consultar equipes de vendas de clientes',
    }).dxCheckBox('instance');

    chk_Equipe_Definir = $('#chk_Equipe_Definir').dxCheckBox({
        value: true,
        text: 'Definir equipes de vendas para clientes',
    }).dxCheckBox('instance');

    chk_Comodato_Consultar = $('#chk_Comodato_Consultar').dxCheckBox({
        value: true,
        text: 'Consultar equipamentos em comodato',
    }).dxCheckBox('instance');

    chk_Comodato_Cadastrar = $('#chk_Comodato_Cadastrar').dxCheckBox({
        value: true,
        text: 'Cadastrar novos equipamentos em comodato',
    }).dxCheckBox('instance');

    chk_Comodato_Alterar = $('#chk_Comodato_Alterar').dxCheckBox({
        value: true,
        text: 'Alterar equipamentos em comodato cadastrados',
    }).dxCheckBox('instance');

    chk_Comodato_Excluir = $('#chk_Comodato_Excluir').dxCheckBox({
        value: true,
        text: 'Excluir equipamentos em comodato cadastrados',
    }).dxCheckBox('instance');

    chk_Pedidos_Consultar = $('#chk_Pedidos_Consultar').dxCheckBox({
        value: true,
        text: 'Consultar histórico de pedidos de venda de clientes',
    }).dxCheckBox('instance');

    chk_Pedidos_Enviar = $('#chk_Pedidos_Enviar').dxCheckBox({
        value: true,
        text: 'Enviar pedidos de venda de clientes por e-mail ou WhatsApp',
    }).dxCheckBox('instance');

    chk_Serasa_Basica = $('#chk_Serasa_Basica').dxCheckBox({
        text: 'Consultar - Modalidade Básica',
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (chk_Serasa_Basica.option('value') !== dataPermissoesUsuario[0].Lg_Permite_Consultar_Serasa_Relatorio_Basico) {

                        if (!chk_Serasa_Recomenda.option('value') && !chk_Serasa_Basica.option('value')) {
                            chk_Serasa_Agregados.option('value', false)
                            AlteraPermissoesUsuarioSelecionadoCliente(loginPremissoes);
                        } else {
                            AlteraPermissoesUsuarioSelecionadoCliente(loginPremissoes);
                        }
                    }
                });
            });
        },
    }).dxCheckBox('instance');

    chk_Serasa_Recomenda = $('#chk_Serasa_Recomenda').dxCheckBox({
        text: 'Consultar - Modalidade RECOMENDA',
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (chk_Serasa_Recomenda.option('value') !== dataPermissoesUsuario[0].Lg_Permite_Consultar_Serasa_Recomenda) {
                        if (!chk_Serasa_Recomenda.option('value') && !chk_Serasa_Basica.option('value')) {
                            chk_Serasa_Agregados.option('value', false)
                            AlteraPermissoesUsuarioSelecionadoCliente(loginPremissoes);
                        } else {
                            AlteraPermissoesUsuarioSelecionadoCliente(loginPremissoes);
                        }

                    }
                });
            });
        },
    }).dxCheckBox('instance');

    chk_Serasa_Agregados = $('#chk_Serasa_Agregados').dxCheckBox({
        text: 'Permite realizar CONSULTAS AGREGADAS com Cobranças Adicionais',
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (chk_Serasa_Agregados.option('value') !== dataPermissoesUsuario[0].Lg_Permite_Consultar_Serasa_Agregados) {
                        if (!chk_Serasa_Basica.option('value') && !chk_Serasa_Recomenda.option('value')) {
                            chk_Serasa_Agregados.option('value', false)

                            new PNotify({
                                title: 'Não pode ser habilitado se ambos os parâmetros acima estiverem desabilitados!',
                                text: 'Para habilitar esse parâmetro, habilite ao menos um dos dois parâmetros acima!',
                                type: 'alert',
                                width: "28%"
                            });
                        } else {
                            AlteraPermissoesUsuarioSelecionadoCliente(loginPremissoes);
                        }

                    }
                });
            });
        },
    }).dxCheckBox('instance');

    chk_incluir_negativacao = $('#chk_incluir_negativacao').dxCheckBox({
        text: 'Permite incluir negativações',
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (chk_incluir_negativacao.option('value') !== dataPermissoesUsuario[0].chk_incluir_negativacao) {
                        AlteraPermissoesUsuarioSelecionadoCliente(loginPremissoes);
                    }
                });
            });
        },
    }).dxCheckBox('instance');

    chk_excluir_negativacao = $('#chk_excluir_negativacao').dxCheckBox({
        text: 'Permite dar baixa nas negativações',
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (chk_excluir_negativacao.option('value') !== dataPermissoesUsuario[0].Lg_Permite_Excluir_Serasa_Negativacao) {

                        if (chk_excluir_negativacao.option('value') && !chk_consultar_negativacao.option('value')) {
                            chk_consultar_negativacao.option('value', true)
                            AlteraPermissoesUsuarioSelecionadoCliente(loginPremissoes);
                        } else {
                            AlteraPermissoesUsuarioSelecionadoCliente(loginPremissoes);
                        }

                    }
                });
            });
        },
    }).dxCheckBox('instance');

    chk_consultar_negativacao = $('#chk_consultar_negativacao').dxCheckBox({
        text: 'Permite consultar negativações.',
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (chk_consultar_negativacao.option('value') !== dataPermissoesUsuario[0].Lg_Permite_Consultar_Serasa_Negativacao) {

                        if (!chk_consultar_negativacao.option('value')) {
                            chk_excluir_negativacao.option('value', false)
                            AlteraPermissoesUsuarioSelecionadoCliente(loginPremissoes);

                        } else {
                            AlteraPermissoesUsuarioSelecionadoCliente(loginPremissoes);

                        }
                    }
                });
            });
        },
    }).dxCheckBox('instance');


    //#endregion

    // ABA ANEXOS
    //#region [ aba anexos ]    
    $('#file-manager').dxFileManager({
        name: 'fileManager',
        fileSystemProvider: donwloadFiles,
        rootFolderName: "Arquivos do Cliente",
        itemView: {
            mode: 'thumbnails',
            showFolders: false,
            showParentFolder: false,
        },
        height: 400,
        currentPath: "Documents/Images",
        permissions: {
            create: true,
            copy: true,
            move: true,
            delete: true,
            rename: true,
            upload: true,
            download: true,
        },
        customizeThumbnail(fileSystemItem) {
            if (fileSystemItem.isDirectory) { return 'images/thumbnails/folder.svg'; }

            const fileExtension = fileSystemItem.getFileExtension();
            switch (fileExtension) {
                case '.docx':
                case '.doc':
                    return '/img/icones-extensao-aplicativos/word.png';
                case '.xls':
                case '.xlsx':
                    return '/img/icones-extensao-aplicativos/excel.png';
                case '.pdf':
                    return '/img/icones-extensao-aplicativos/pdf.png';
                case '.xml':
                    return '/img/icones-extensao-aplicativos/xml.png';
                case '.jpg':
                case '.jpeg':
                case '.png':
                case '.bmp':
                case '.gif':
                    return '/img/icones-extensao-aplicativos/imagens.png';
                case '.rar':
                    return '/img/icones-extensao-aplicativos/rar.png';
                case '.rtf':
                    return '/img/icones-extensao-aplicativos/rtf.png';
                case '.zip':
                    return '/img/icones-extensao-aplicativos/zip.png';
                case '.txt':
                    return '/img/icones-extensao-aplicativos/txt.png';
                default:
                    return '/img/icones-extensao-aplicativos/arquivo.png';
            }
        },
        allowedFileExtensions: ['.rar', '.png', '.jpg', '.jpeg', '.bmp', '.gif', '.pdf', '.zip', '.xls', '.xlsx', '.doc', '.docx', '.rtf', '.txt', '.xml'],

        onInitialized(e) {
            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        e.component.repaint();
                    }
                });
            }).observe(e.element[0]);
        },

        // Add the onFileUploaded event
        onFileUploaded(e) {
            console.log('File uploaded:', e.file.name);
            // Perform additional actions after the file is uploaded
        },

        // Add the onFileUploading event
        onFileUploading(e) {
            console.log('Uploading file:', e.file.name);
            // Perform actions while the file is uploading
        },

        // Add the onFileUploadingError event
        onFileUploadingError(e) {
            console.error('Error uploading file:', e.error);
            // Handle upload error
        },
    });


    //$('#file-manager').dxFileManager({
    //    name: 'fileManager',
    //    fileSystemProvider: donwloadFiles,
    //    rootFolderName: "Arquivos do Cliente",
    //    itemView: {
    //        mode: 'thumbnails',
    //        showFolders: false,
    //        showParentFolder: false,
    //    },
    //    height: 400,
    //    currentPath: "Documents/Images",
    //    permissions: {
    //        create: true,
    //        copy: true,
    //        move: true,
    //        delete: true,
    //        rename: true,
    //        upload: true,
    //        download: true,
    //    },
    //    customizeThumbnail(fileSystemItem) {
    //        if (fileSystemItem.isDirectory) { return 'images/thumbnails/folder.svg'; }

    //        const fileExtension = fileSystemItem.getFileExtension();
    //        switch (fileExtension) {
    //            case '.docx':
    //                return '/img/icones-extensao-aplicativos/word.png';
    //            case '.doc':
    //                return '/img/icones-extensao-aplicativos/word.png';
    //            case '.xls':
    //                return '/img/icones-extensao-aplicativos/excel.png';
    //            case '.xlsx':
    //                return '/img/icones-extensao-aplicativos/excel.png';
    //            case '.pdf':
    //                return '/img/icones-extensao-aplicativos/pdf.png';
    //            case '.xml':
    //                return '/img/icones-extensao-aplicativos/xml.png';
    //            case '.jpg':
    //                return '/img/icones-extensao-aplicativos/imagens.png';
    //            case '.jpeg':
    //                return '/img/icones-extensao-aplicativos/imagens.png';
    //            case '.png':
    //                return '/img/icones-extensao-aplicativos/imagens.png';
    //            case '.bmp':
    //                return '/img/icones-extensao-aplicativos/imagens.png';
    //            case '.gif':
    //                return '/img/icones-extensao-aplicativos/imagens.png';
    //            case '.rar':
    //                return '/img/icones-extensao-aplicativos/rar.png';
    //            case '.rft':
    //                return '/img/icones-extensao-aplicativos/rft.png';
    //            case '.zip':
    //                return '/img/icones-extensao-aplicativos/zip.png';
    //            case '.txt':
    //                return '/img/icones-extensao-aplicativos/txt.png';
    //            default:
    //                return '/img/icones-extensao-aplicativos/arquivo.png';
    //        }
    //    },
    //    allowedFileExtensions: ['.rar', '.png', '.jpg', '.jpeg', '.bmp', '.gif', '.pdf', '.zip', '.xls', '.xlsx', '.doc', '.docx', '.rtf', '.txt', '.xml'],

    //    onInitialized(e) {
    //        new IntersectionObserver(entries => {
    //            entries.forEach(entry => {
    //                if (entry.isIntersecting) {
    //                    e.component.repaint();
    //                }
    //            });
    //        }).observe(e.element[0]);
    //    },
    //});

    lkp_Filtro_Pesquisa_Detalhada = $('#lkp_Filtro_Pesquisa_Detalhada').dxLookup({
        dataSource: dataSourceFiltroConsultaDetalhada,
        searchExpr: ['DS_STATUS'],
        displayExpr: 'DS_STATUS',
        valueExpr: 'CD_STATUS',
        value: 'A',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Filtro',
        },
        labelMode: 'floating',
        label: 'Filtro',
        placeholder: 'Filtro',
        showClearButton: false,
    }).dxLookup('instance');

    $('#gaugeEspacoDisponivel').dxLinearGauge({
        scale: {
            startValue: 0,
            endValue: 100,
            tickInterval: 50,
            minorTickInterval: 10,
            minorTick: {
                visible: true,
            },
            label: {
                customizeText(arg) {
                    return `${arg.valueText}%`;
                },
                font: { size: 10 },
            },
        },
        size: {
            height: 50,
        },
        valueIndicator: {
            type: 'rangebar',
            color: '#92000A',
        },
        tooltip: {
            enabled: true,
            customizeTooltip(arg) {
                let result = `<b>${arg.valueText}Mb utilizado</b> <br/> <br/> Espaço total: 100Mb <br/> Espaço utilizado: 65Mb <br/> <br/> <b> Espaço disponível: 35Mb</b>`;

                return {
                    text: result,
                };
            },
        },
        export: {
            enabled: false,
        },
        value: 65,
        onInitialized(e) {
            var valor = e.component.option('value');

            if (valor <= 69) {
                e.component.option('valueIndicator', { color: "#28A745" });
            } else if (valor <= 84) {
                e.component.option('valueIndicator', { color: "#ee9b00" });
            } else {
                e.component.option('valueIndicator', { color: "#DC3545" });
            };

            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) e.component.render();
                });
            }).observe(e.element[0]);
        },
    });

    //#endregion

    // ABA EXTRATO CRÉDITOS
    //#region [aba extrato creditos]
    //GRID CONTA CORRENTE CLIENTE
    gridContaCorrente = $("#grid_Conta_Corrente_Cliente").dxDataGrid({
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        columnHidingEnabled: true,
        columnsAutoWidth: true,
        allowColumnResizing: true,
        allowColumnReordering: true,

        editing: {
            mode: 'popup',
            allowUpdating: false,
            startEditAction: 'dblClick',
            allowAdding: true,
            allowDeleting: false,
            useIcons: false,

            popup: {
                showTitle: true,
                titleTemplate: function (element) {
                    const $title = $("<div class='mb-3 mt-3 ml-2' style='font-size: 18px'>").text("Ajuste de saldo de Crédito do Cliente");
                    element.append($title);
                },
                maxWidth: 600,
                height: 270,
            },

            form: {
                labelMode: 'floating',
                items: [
                    {
                        itemType: 'group',
                        colCount: 2,
                        colSpan: 2,
                        items: [
                            {
                                dataField: 'CD_TIPO_MOVIMENTO',
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                ],
                            },
                            {
                                itemType: 'group',
                                colCount: 2,
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: 'VL_MOVIMENTO',
                                        editorType: 'dxNumberBox',
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                            {
                                                type: "numeric",
                                                message: "Este campo aceita apenas números",
                                            },
                                        ],
                                        editorOptions: {
                                            maxLength: 19,
                                            format: "###,###,###,###,##0.00",
                                            min: 0.01,
                                        },
                                    },
                                ],

                            },
                        ],

                    },


                    {
                        itemType: 'group',
                        colCount: 1,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "DS_OBSERVACAO",
                                editorType: 'dxTextArea',
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                ],
                                editorOptions: {
                                    maxLength: 250,
                                    height: 80,
                                },
                            },

                        ],

                    },

                ],
            },
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
            allowedPageSizes: [10, 15, 20],
            showPageSizeSelector: false,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Endereços');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ClientesEndereços.xlsx');
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
        keyExpr: 'NR_LANCAMENTO',
        columns: [
            {
                dataField: "DT_MOVIMENTO",
                caption: "Data",
                width: 110,
                dataType: "date",
                format: "dd/MM/yyyy HH:mm",
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
                dataField: "DS_TIPO_MOVIMENTO",
                caption: "Movimento",
                width: 200,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                visible: true,
                hidingPriority: 200,
            },
            {
                dataField: "CD_LOGIN",
                caption: "Login",
                width: 75,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'center',
                hidingPriority: 198,
            },
            {
                dataField: "DS_OBSERVACAO",
                caption: "Observação",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                hidingPriority: 197,
            },
            {
                dataField: "CD_FILIAL",
                caption: "Filial",
                width: 70,
                dataType: "number",
                format: "######",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 196,
            },
            {
                dataField: "CD_CAIXA",
                caption: "Caixa",
                width: 70,
                dataType: "number",
                format: "######",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 195,
            },
            {
                dataField: "NR_DOCUMENTO",
                caption: "Documento",
                width: 75,
                dataType: "number",
                format: "############",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: false,
                hidingPriority: 194,
            },
            {
                dataField: "CD_TIPO_MOVIMENTO",
                caption: "Tipo Movimento",
                width: 200,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                lookup: {
                    dataSource: dataSourceTiposMovimentoContaCorrente,
                    valueExpr: "CD_TIPO_MOVIMENTO",
                    displayExpr: "DS_TIPO_MOVIMENTO",
                    searchExpr: ["DS_TIPO_MOVIMENTO"]
                },
                visible: false,
                hidingPriority: 194,
            },
            {
                dataField: "VL_MOVIMENTO",
                caption: "Valor",
                width: 85,
                dataType: "number",
                format: "###,###,###,###,##0.00",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'right',
                cssClass: "column-data-grid",
                allowHiding: false,
            },
        ],
        summary: {
            totalItems: [
                {
                    column: 'VL_MOVIMENTO',
                    summaryType: 'sum',
                    valueFormat: "###,###,###,##0.00",
                    displayFormat: "{0}",
                }
            ],
        },
        onCellPrepared: function (e) {
            if (e.rowType === "data") {
                if (e.column.dataField === "VL_MOVIMENTO") {
                    if (e.value < 0) {
                        e.cellElement.css("color", "#d00000");
                        //e.cellElement.css("font-weight", "bold");
                    } else {
                        //e.cellElement.css("font-weight", "bold");
                    };
                }
            }
        },

        toolbar: {
            items: [
                {
                    name: "groupPanel",
                    locateInMenu: "auto",
                },
                {
                    name: 'addRowButton',
                    showText: 'always',
                    options: {
                        type: 'success',
                        text: 'Novo Lançamento',
                        hint: 'Novo Lançamento',
                    },
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
        onRowValidating(e) {

            if (e.isValid) {

                var objSalvar = {
                    CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                    CD_TIPO_MOVIMENTO: e.newData.CD_TIPO_MOVIMENTO,
                    VL_MOVIMENTO: e.newData.VL_MOVIMENTO,
                    DS_OBSERVACAO: e.newData.DS_OBSERVACAO,
                }

                new Promise(function (resolve, reject) {

                    $.ajax({
                        type: 'POST',
                        url: "/CadastrosGerais/InsertContaCorrenteCliente",
                        data: { objCliente: JSON.stringify(objSalvar) },
                        success: function (response) {
                            resolve(response);

                        },
                        error: function () {
                            // Rejeita a Promise em caso de erro
                            reject();
                        }
                    });

                }).then(function (response) {
                    CarregaExtratoContaCorrenteCliente(clienteSelecionado)
                })
            }
        },
        stateStoring: AutoLoad('grid_Conta_Corrente_Cliente'),
        onToolbarPreparing: AutoResetState([]),

    }).dxDataGrid('instance');

    //#endregion [aba extrato creditos]

    //ABA COMPRADORES
    //#region [aba compradores]
    //CONSULTA COMPRADORES AUTORIZADOS DO CLIENTE
    gridCompradoresAutorizados = $("#grid_Compradores_Autorizados").dxDataGrid({
        /*dataSource: result.data,*/
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        columnHidingEnabled: true,
        columnsAutoWidth: true,
        allowColumnResizing: true,
        allowColumnReordering: true,

        editing: {
            mode: 'popup',
            allowUpdating: true,
            startEditAction: 'dblClick',
            allowAdding: true,
            allowDeleting: true,
            useIcons: true,

            popup: {
                //title: 'Cadastro de Endereço',
                showTitle: true,
                titleTemplate: function (element) {
                    const $title = $("<div class='mb-3 mt-3 ml-2' style='font-size: 18px'>").text("Cadastro de Compradores Autorizados");
                    element.append($title);
                },
                maxWidth: 900,
                height: 520,
                onShown: obj => {
                    //dá o foco na instância da coluna marcada nos itens
                    widgetInstancet.focus();
                },
            },

            form: {
                labelMode: 'floating',
                items: [
                    {
                        itemType: 'group',
                        colCount: 3,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "CD_STATUS",
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        itemType: 'group',
                        colCount: 3,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "DS_NOME_COMPRADOR",
                                colSpan: 2,
                                editorOptions: {
                                    maxLength: 60,
                                },
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                ],
                            },
                            {
                                dataField: "DS_NOME_AUTORIZANTE",
                                editorOptions: {
                                    maxLength: 60,
                                },
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        itemType: 'group',
                        colCount: 3,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "CD_CPF_COMPRADOR",
                                editorOptions: {
                                    maxLength: 11,
                                },
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                ],
                            },
                            {
                                dataField: "CD_RG",
                                editorOptions: {
                                    maxLength: 15,
                                },
                            },
                            {
                                dataField: "VL_LIMITE_COMPRA",
                                editorType: 'dxNumberBox',
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                    {
                                        type: "numeric",
                                        message: "Este campo aceita apenas números",
                                    },
                                ],
                                editorOptions: {
                                    maxLength: 19,
                                    format: "###,###,###,###,##0.00",
                                    min: 0.01,
                                },
                            },
                        ],
                    },
                    {
                        itemType: 'group',
                        colCount: 3,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "CD_DDD_TELEFONE",
                                editorType: 'dxNumberBox',
                                editorOptions: {
                                    maxLength: 3,
                                    format: "###",
                                    max: 999,
                                },
                            },
                            {
                                dataField: "DS_TELEFONE",
                                editorOptions: {
                                    maxLength: 30,
                                },
                            },
                            {
                                dataField: "DS_EMAIL",
                                editorOptions: {
                                    maxLength: 150,
                                },
                            },

                        ],
                    },

                    {
                        itemType: 'group',
                        colCount: 4,
                        colSpan: 2,
                        items: [
                            {
                                dataField: 'CD_CEP',
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                    {
                                        type: "numeric",
                                        message: "Este campo aceita apenas números",
                                    },
                                    {
                                        type: "stringLength",
                                        min: 8,
                                        max: 8,
                                        message: "O CEP deve conter 8 dígitos numéricos",
                                    },
                                ],
                                editorOptions: {
                                    maxLength: 8,
                                }
                            },
                        ],

                    },
                    {
                        itemType: 'group',
                        colCount: 3,
                        colSpan: 2,
                        items: [
                            {
                                itemType: 'group',
                                colSpan: 2,
                                items: [
                                    {
                                        dataField: "DS_ENDERECO",
                                        editorOptions: {
                                            maxLength: 60,
                                        },
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },
                                ],

                            },
                            {
                                itemType: 'group',
                                items: [
                                    {
                                        dataField: "NR_ENDERECO",
                                        editorOptions: {
                                            maxLength: 6,
                                        },
                                        validationRules: [
                                            {
                                                type: 'required',
                                                message: "Campo obrigatório",
                                            },
                                        ],
                                    },
                                ],

                            },
                        ],
                    },
                    {
                        itemType: 'group',
                        colCount: 3,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "DS_ENDERECO_COMPL",
                                editorOptions: {
                                    maxLength: 40,
                                },
                            },
                            {
                                dataField: "DS_BAIRRO",
                                editorOptions: {
                                    maxLength: 40,
                                },
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                ],
                            },
                            {
                                dataField: "DS_CIDADE",
                                validationRules: [
                                    {
                                        type: 'required',
                                        message: "Campo obrigatório",
                                    },
                                ],

                            },
                        ],

                    },
                    {
                        itemType: 'group',
                        colCount: 1,
                        colSpan: 2,
                        items: [
                            {
                                dataField: "DS_OBSERVACAO",
                                editorType: 'dxTextArea',
                                editorOptions: {
                                    maxLength: 3500,
                                    height: 80,
                                },
                            },

                        ],

                    },
                ],

            },
        },
        searchPanel: {
            visible: true,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
        },
        sorting: { mode: "multiple" },
        groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
        paging: { pageSize: 20 },
        pager: {
            visible: true,
            allowedPageSizes: [10, 15, 20],
            showPageSizeSelector: false,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Compradores');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Compradores_Autorizados_Clientes.xlsx');
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
        keyExpr: 'CD_CPF_COMPRADOR',
        columns: [
            {
                dataField: "DS_NOME_COMPRADOR",
                caption: "Nome Comprador",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                visible: true,
                allowHiding: false,
                editorOptions: {
                    onContentReady: obj => {
                        widgetInstancet = obj.component; //sava a instância para dar foco na edição
                    },
                },
            },
            {
                dataField: "CD_CPF_COMPRADOR",
                caption: "CPF Comprador",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'center',
                width: 95,
                setCellValue: function (newData, value) {

                    if (!validarCPFCNPJ(value)) {

                        new PNotify({
                            title: 'CPF Inválido!',
                            text: 'Por favor, digite um CPF válido!',
                            type: 'error',
                            width: '28%'
                        });
                    }
                    else {
                        newData.CD_CPF_COMPRADOR = value;
                    }
                }
            },
            {
                dataField: "CD_RG",
                caption: "RG Comprador",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'center',
                width: 95,
            },
            {
                dataField: "VL_LIMITE_COMPRA",
                caption: "Limite Compra",
                width: 85,
                dataType: "number",
                format: "###,###,###,###,##0.00",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'right',
                cssClass: "column-data-grid",
            },
            {
                dataField: "DS_NOME_AUTORIZANTE",
                caption: "Nome Autorizador",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                visible: true,
            },
            {
                dataField: "DS_ENDERECO",
                caption: "Endereço",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                dataField: "NR_ENDERECO",
                caption: "Número",
                width: 65,
                dataType: "number",
                format: "#####",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                dataField: "DS_ENDERECO_COMPL",
                caption: "Complemento",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                dataField: "DS_BAIRRO",
                caption: "Bairro",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                dataField: "DS_CIDADE",
                caption: "Cidade",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                lookup: {
                    dataSource: dataSourceMunicipios,
                    valueExpr: "CD_MUNICIPIO",
                    displayExpr: "DS_MUNICIPIO",
                    searchExpr: ["DS_MUNICIPIO"],

                },
                visible: false,


            },
            {
                dataField: "CD_CEP",
                caption: "CEP",
                width: 70,
                mask: '00000000',
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: false,
                setCellValue: function (newData, value) {

                    return new Promise(function (resolve, reject) {

                        $.ajax({
                            type: 'POST',
                            url: "/CadastrosGerais/GetCep",
                            data: { CdCep: value },
                            success: function (response) {
                                resolve(response);

                            },
                            error: function () {
                                // Rejeita a Promise em caso de erro
                                reject();
                            }
                        });

                    }).then(function (response) {

                        newData.CD_CEP = value;
                        if (response.length > 0) {
                            newData.DS_ENDERECO = response[0].Ds_Endereco;
                            newData.DS_BAIRRO = response[0].Ds_Bairro;
                            newData.DS_CIDADE = response[0].Cd_Municipio;

                        }

                    })

                }
            },
            {
                dataField: "CD_DDD_TELEFONE",
                caption: "DDD",
                width: 70,
                dataType: "number",
                format: "000",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: true,
            },
            {
                dataField: "DS_TELEFONE",
                caption: "Telefone",
                width: 120,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
                alignment: 'center',
                visible: true,
            },
            {
                dataField: "DS_EMAIL",
                caption: "E-mail",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
                alignment: 'center',
                visible: false,
            },
            {
                dataField: "DS_OBSERVACAO",
                caption: "Observação",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                alignment: 'left',
                visible: false,
            },
            {
                dataField: "DT_CADASTRO",
                caption: "Cadastro",
                width: 110,
                dataType: "date",
                format: "dd/MM/yyyy HH:mm",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: true,
            },
            {
                dataField: "DT_ATUALIZACAO",
                caption: "Atualização",
                width: 110,
                dataType: "date",
                format: "dd/MM/yyyy HH:mm",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                dataField: "CD_STATUS",
                caption: "Status",
                width: 75,
                value: 'A',
                allowEditing: true,
                allowHeaderFiltering: false,
                allowSorting: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                lookup: {
                    dataSource: dataSourceStatus,
                    valueExpr: "CD_STATUS",
                    displayExpr: "DS_STATUS"
                }
            },

            {
                type: "buttons",
                width: 50,
                //cssClass: "column-data-grid",
            },

        ],

        onCellPrepared: function (e) {
            if (e.rowType === "data") {
                if (e.column.dataField === "CD_STATUS" &&
                    e.data.CD_STATUS === 'I') {
                    //e.cellElement.css("background-color", '#f26419');
                    e.cellElement.css("color", '#d00000');
                    e.cellElement.css("font-weight", 'bold');
                }
            }
        },

        toolbar: {
            items: [
                {
                    name: "groupPanel",
                    locateInMenu: "auto",
                },
                {
                    name: 'addRowButton',
                    showText: 'always',
                    options: {
                        type: 'success',
                        text: 'Novo Comprador',
                        hint: 'Novo Comprador',
                    },
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
        onEditingStart: function (e) {
            e.component.columnOption("CD_CPF_COMPRADOR", "allowEditing", false)

        },
        onInitNewRow: function (e) {
            e.component.columnOption("CD_CPF_COMPRADOR", "allowEditing", true)

        },

        onRowValidating(e) {
            let objSalvar;
            if (e.isValid) {

                if (!e.oldData) {
                    let uf = dataSourceMunicipios.filter(obj => obj.CD_MUNICIPIO == e.newData.DS_CIDADE)

                    objSalvar = {
                        EXEC: 'INS',
                        CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                        CD_CPF_COMPRADOR: e.newData.CD_CPF_COMPRADOR,
                        DS_ENDERECO: e.newData.DS_ENDERECO,
                        CD_RG: e.newData.CD_RG !== null ? e.newData.CD_RG.toString() : null,
                        NR_ENDERECO: e.newData.NR_ENDERECO,
                        DS_ENDERECO_COMPL: e.newData.DS_ENDERECO_COMPL,
                        CD_DDD_TELEFONE: e.newData.CD_DDD_TELEFONE !== null ? e.newData.CD_DDD_TELEFONE.toString() : null,
                        DS_TELEFONE: e.newData.DS_TELEFONE !== null ? e.newData.DS_TELEFONE.toString() : null,
                        DS_BAIRRO: e.newData.DS_BAIRRO,
                        DS_CIDADE: uf[0].DS_MUNICIPIO,
                        CD_UF: uf[0].CD_UF,
                        CD_CEP: e.newData.CD_CEP,
                        DS_EMAIL: e.newData.DS_EMAIL !== null ? e.newData.DS_EMAIL.toString() : null,
                        VL_LIMITE_COMPRA: e.newData.VL_LIMITE_COMPRA,
                        DS_NOME_COMPRADOR: e.newData.DS_NOME_COMPRADOR.toString(),
                        DS_NOME_AUTORIZANTE: e.newData.DS_NOME_AUTORIZANTE.toString(),
                        CD_STATUS: e.newData.CD_STATUS,
                        DS_OBSERVACAO: e.newData.DS_OBSERVACAO !== null ? e.newData.DS_OBSERVACAO.toString() : null,

                    }



                } else {
                    var novoObj = Object.assign(e.oldData, e.newData);
                    let cidade;
                    let ufCidade;

                    if (e.newData.DS_CIDADE) {
                        let municipio = dataSourceMunicipios.filter(obj => obj.CD_MUNICIPIO == e.newData.DS_CIDADE)
                        cidade = municipio[0].DS_MUNICIPIO;
                        ufCidade = municipio[0].CD_UF;

                    } else {
                        cidade = novoObj.DS_CIDADE;
                        ufCidade = novoObj.CD_UF;
                    }

                    objSalvar = {
                        EXEC: 'UPD',
                        CD_CPF_CNPJ: novoObj.CD_CPF_CNPJ,
                        CD_CPF_COMPRADOR: novoObj.CD_CPF_COMPRADOR,
                        DS_ENDERECO: novoObj.DS_ENDERECO,
                        CD_RG: novoObj.CD_RG !== null ? novoObj.CD_RG.toString() : null,
                        NR_ENDERECO: novoObj.NR_ENDERECO,
                        DS_ENDERECO_COMPL: novoObj.DS_ENDERECO_COMPL,
                        CD_DDD_TELEFONE: novoObj.CD_DDD_TELEFONE !== null ? novoObj.CD_DDD_TELEFONE.toString() : null,
                        DS_TELEFONE: novoObj.DS_TELEFONE !== null ? novoObj.DS_TELEFONE.toString() : null,
                        DS_BAIRRO: novoObj.DS_BAIRRO,
                        DS_CIDADE: cidade,
                        CD_UF: ufCidade,
                        CD_CEP: novoObj.CD_CEP,
                        DS_EMAIL: novoObj.DS_EMAIL !== null ? novoObj.DS_EMAIL.toString() : null,
                        VL_LIMITE_COMPRA: novoObj.VL_LIMITE_COMPRA,
                        DS_NOME_COMPRADOR: novoObj.DS_NOME_COMPRADOR.toString(),
                        DS_NOME_AUTORIZANTE: novoObj.DS_NOME_AUTORIZANTE.toString(),
                        CD_STATUS: novoObj.CD_STATUS,
                        DS_OBSERVACAO: novoObj.DS_OBSERVACAO !== null ? novoObj.DS_OBSERVACAO.toString() : null,
                        DT_CADASTRO: novoObj.DT_CADASTRO
                    };

                }

                for (const key in objSalvar) {
                    if (objSalvar.hasOwnProperty(key) && objSalvar[key] === undefined) {
                        objSalvar[key] = null;
                    }
                }
                new Promise(function (resolve, reject) {

                    $.ajax({
                        type: 'POST',
                        url: "/CadastrosGerais/GravarCompradoresAutorizadosCliente",
                        data: { objCliente: JSON.stringify(objSalvar) },
                        success: function (response) {
                            resolve(response);

                        },
                        error: function () {
                            // Rejeita a Promise em caso de erro
                            reject();
                        }
                    });

                }).then(function (response) {

                    CarregaCompradoresAutorizados(clienteSelecionado)

                    if (response.result != "Erro") {
                        new PNotify({
                            title: 'Comprador Autorizado Alterado!',
                            text: 'Dados gravados com sucesso!',
                            type: 'success',
                            width: "20%"
                        });

                    } else {

                        new PNotify({
                            title: 'Erro ao alterar comprador autorizado!',
                            text: response.msg,
                            type: 'error',
                            width: "20%"
                        });
                    }

                })
            }
        },
        onRowRemoving: function (e) {

            let objDel = {
                CD_CPF_CNPJ: e.data.CD_CPF_CNPJ,
                CD_CPF_COMPRADOR: e.data.CD_CPF_COMPRADOR,

            };
            new Promise(function (resolve, reject) {

                $.ajax({
                    type: 'POST',
                    url: "/CadastrosGerais/DeleteCompradorAutorizadoCliente",
                    data: { objCliente: JSON.stringify(objDel) },
                    success: function (response) {
                        resolve(response);

                    },
                    error: function () {
                        // Rejeita a Promise em caso de erro
                        reject();
                    }
                });

            }).then(function (response) {
                CarregaCompradoresAutorizados(clienteSelecionado)
                if (response.result != "Erro") {
                    new PNotify({
                        title: 'Comprador Autorizado Alterado!',
                        text: 'Dados gravados com sucesso!',
                        type: 'success',
                        width: "20%"
                    });

                } else {

                    new PNotify({
                        title: 'Erro ao alterar comprador autorizado!',
                        text: response.msg,
                        type: 'error',
                        width: "20%"
                    });
                }

            })
        },
        stateStoring: AutoLoad('grid_Compradores_Autorizados'),
        onToolbarPreparing: AutoResetState([]),

    }).dxDataGrid('instance');

    //#endregion [aba compradores]

    //ABA PRECIFICAÇAO
    //#region [aba precificação]

    //ABA PRESSIFICAÇÃO
    lkpAlterarFormaPrecoFixo = $('#lkp_Alterar_Forma_Preco_Fixo').dxLookup({
        /*dataSource: result.data,*/
        searchExpr: ['CD_FORMA_PAGAMENTO', 'DS_FORMA_PAGAMENTO'],
        displayExpr: 'DS_FORMA_PAGAMENTO',
        valueExpr: 'CD_FORMA_PAGAMENTO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Forma de Pagamento',
        },
        labelMode: 'floating',
        label: 'Nova Forma de Pagamento',
        placeholder: 'Nova Forma de Pagamento',
        showClearButton: true,
        onValueChanged(e) {
            document.getElementById("panelCondicaoPagamentoPorForma").style.display = 'none';

            if (e.value) {

                GetAzureDataSource(22, `{ CD_FORMA_PAGAMENTO: "${e.value}", CD_STATUS: "A" }`).then((result) => {

                    if (result.success) {

                        lkpAlterarCondicaoPrecoFixo.option('dataSource', result.data);
                        document.getElementById("panelCondicaoPagamentoPorForma").style.display = 'block';
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


            } else {
                document.getElementById("panelCondicaoPagamentoPorForma").style.display = 'none';
            }

        },
    }).dxLookup('instance');

    lkpAlterarCondicaoPrecoFixo = $('#lkp_Alterar_Condicao_Preco_Fixo').dxLookup({
        /*dataSource: result.data,*/
        searchExpr: ['DS_CONDICAO_PAGAMENTO'],
        displayExpr: 'DS_CONDICAO_PAGAMENTO',
        valueExpr: 'CD_CONDICAO_PAGAMENTO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Condição de Pagamento',
        },
        labelMode: 'floating',
        label: 'Nova Condição de Pagamento',
        placeholder: 'Nova Condição de Pagamento',
        showClearButton: true,

    }).dxLookup('instance');

    tagDefinirFormaDescontoProdutos = $('#tag_Definir_Forma_Desconto_Produtos').dxTagBox({
        /*dataSource: result.data,*/
        searchExpr: ['CD_FORMA_PAGAMENTO', 'DS_FORMA_PAGAMENTO'],
        displayExpr: 'DS_FORMA_PAGAMENTO',
        valueExpr: 'CD_FORMA_PAGAMENTO',
        searchEnabled: true,
        showSelectionControls: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Forma de Pagamento',
        },
        //labelMode: 'floating',
        //label: 'Nova Forma de Pagamento',
        placeholder: 'Definir Formas de Pagamento *',
        showClearButton: true,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Ao menos uma Forma de Pagamento é Obrigatória', }], validationGroup: 'DefinirFormaProdutos' }).dxTagBox('instance');

    lkpAlterarFormaDescontoProduto = $('#lkp_Alterar_Forma_Desconto_Produto').dxLookup({
        /*dataSource: result.data,*/
        searchExpr: ['CD_FORMA_PAGAMENTO', 'DS_FORMA_PAGAMENTO'],
        displayExpr: 'DS_FORMA_PAGAMENTO',
        valueExpr: 'CD_FORMA_PAGAMENTO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Forma de Pagamento',
        },
        labelMode: 'floating',
        label: 'Nova Forma de Pagamento',
        placeholder: 'Nova Forma de Pagamento',
        showClearButton: true,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Forma de Pagamento é Obrigatória', }], validationGroup: 'AlterarFormaProdutos' }).dxLookup('instance');

    tagDefinirFormaDescontoFamilias = $('#tag_Definir_Forma_Desconto_Familias').dxTagBox({
        /*dataSource: result.data,*/
        searchExpr: ['CD_FORMA_PAGAMENTO', 'DS_FORMA_PAGAMENTO'],
        displayExpr: 'DS_FORMA_PAGAMENTO',
        valueExpr: 'CD_FORMA_PAGAMENTO',
        searchEnabled: true,
        showSelectionControls: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Forma de Pagamento',
        },
        //labelMode: 'floating',
        //label: 'Nova Forma de Pagamento',
        placeholder: 'Definir Formas de Pagamento *',
        showClearButton: true,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Ao menos uma Forma de Pagamento é Obrigatória', }], validationGroup: 'DefinirFormaFamilias' }).dxTagBox('instance');

    lkpAlterarFormaDescontoFamilias = $('#lkp_Alterar_Forma_Desconto_Familias').dxLookup({
        /*dataSource: result.data,*/
        searchExpr: ['CD_FORMA_PAGAMENTO', 'DS_FORMA_PAGAMENTO'],
        displayExpr: 'DS_FORMA_PAGAMENTO',
        valueExpr: 'CD_FORMA_PAGAMENTO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Forma de Pagamento',
        },
        //labelMode: 'floating',
        //label: 'Nova Forma de Pagamento',
        placeholder: 'Nova Forma de Pagamento *',
        showClearButton: true,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Forma de Pagamento Obrigatória', }], validationGroup: 'AlterarFormaFamilias' }).dxLookup('instance');

    //GRID DESCONTO POR FORMA
    gridDescontoFormaPagamentoCliente = $("#grid_Desconto_Forma_Pagamento_Cliente").dxDataGrid({
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        columnHidingEnabled: true,
        columnsAutoWidth: true,
        allowColumnResizing: true,
        allowColumnReordering: true,

        editing: {
            mode: 'batch',
            allowUpdating: true,
            startEditAction: 'click',
            allowAdding: false,
            allowDeleting: false,
            useIcons: true,
        },
        selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
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
        sorting: { mode: "multiple" },
        groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
        paging: { pageSize: 100 },
        pager: {
            visible: true,
            allowedPageSizes: [10, 15, 20, 50, 100],
            showPageSizeSelector: false,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Forma de Pagamento');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Desconto_Cliente_Forma_Pagamento.xlsx');
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
        keyExpr: 'CD_FORMA_PAGAMENTO',
        columns: [
            {
                type: "selection",
                width: 30,
            },
            {
                dataField: "CD_FORMA_PAGAMENTO",
                caption: "Código Forma",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 100,
            },
            {
                dataField: "DS_FORMA_PAGAMENTO",
                caption: "Forma de Pagamento",
                //width: 250,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                cssClass: "column-data-grid",
                allowHiding: false,
            },
            {
                dataField: "PC_DESCONTO",
                caption: "% Desconto",
                width: 100,
                dataType: "number",
                format: "###,###,###,##0.##%",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                setCellValue: function (newData, value, currentRowData) {

                    var desconto = value / 100;
                    newData.PC_DESCONTO = desconto;
                    newData.PC_ACRESCIMO = null;
                },
                hidingPriority: 199,

            },

            {
                dataField: "PC_ACRESCIMO",
                caption: "% Acréscimo",
                width: 100,
                dataType: "number",
                format: "###,###,###,##0.##%",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                alignment: "center",
                cssClass: "column-data-grid",
                setCellValue: function (newData, value, currentRowData) {

                    var desconto = value / 100;
                    newData.PC_ACRESCIMO = desconto;
                    newData.PC_DESCONTO = null;
                },
                hidingPriority: 200,
            },
            {
                dataField: "DS_STATUS",
                caption: "Status da Forma",
                //width: 130,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 198,
            },
            {
                dataField: "CD_LOGIN",
                caption: "Login Configuração",
                //width: 130,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 197,
            },
            {
                dataField: "DT_CADASTRO",
                caption: "Data Configuração",
                //width: 130,
                dataType: "date",
                format: "dd/MM/yyyy HH:mm",
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                alignment: "center",
                cssClass: "column-data-grid",
                hidingPriority: 196,
            },

            //{
            //    type: "buttons",
            //    width: 30,
            //    alignment: 'center',
            //    //cssClass: "column-data-grid",
            //},

        ],
        onToolbarPreparing: function (e) {

            var revertButton = e.toolbarOptions.items.filter(function (i) {
                return i.name === "revertButton"
            })[0];

            var origClick = revertButton.options.onClick;

            revertButton.options.onClick = function () {
                var result = DevExpress.ui.dialog.confirm("Você deseja desfazer as alteraões?", "Desfazer");
                result.done(function (dialogResult) {
                    if (dialogResult) {
                        origClick.apply(arguments);
                    }
                });
            }

            var saveButton = e.toolbarOptions.items.filter(function (i) {
                return i.name === "saveButton"
            })[0];

            var origClickSave = saveButton.options.onClick;

            saveButton.options.onClick = function () {
                var result = DevExpress.ui.dialog.confirm("Você deseja gravar as alterações?", "Gravar");
                result.done(function (dialogResult) {
                    if (dialogResult) {
                        origClickSave.apply(arguments);
                    }
                });
            }

        },

        onCellPrepared: function (e) {
            if (e.rowType === "data") {
                if (e.column.dataField === "DS_STATUS" && e.value == "Inativo") {
                    e.cellElement.css("color", '#d00000');
                    e.cellElement.css("font-weight", 'bold');
                }
                if (e.column.dataField === "PC_DESCONTO" || e.column.dataField === "PC_ACRESCIMO") {
                    e.cellElement.css("background-color", "#EDF3F8");
                    /*e.cellElement.css("font-weight", "bold");*/
                }
            }
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
        onSelectionChanged(selectedItems) {
            itenSelecionadoForma = selectedItems.selectedRowsData;
            /*produtoSelecionado = itenSelecionado;*/

        },
        onSaving(e) {
            e.cancel = true;

            let FuncaoSalvarItensGridForma;

            FuncaoSalvarItensGridForma = function () {
                if (e.changes.length) {
                    

                    let salvaItensForma = e.changes.map(item => {

                        const PC_ACRESCIMO = item.data.PC_ACRESCIMO === null ? 0 : item.data.PC_ACRESCIMO;
                        const PC_DESCONTO = item.data.PC_DESCONTO === null ? 0 : item.data.PC_DESCONTO;

                        return {
                            CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                            CD_LOGIN: null,
                            DT_CADASTRO: null,
                            PC_ACRESCIMO: PC_ACRESCIMO * 100,
                            PC_DESCONTO: PC_DESCONTO * 100,
                            CD_FORMA_PAGAMENTO: item.key
                        };
                    });

                    let requests = [];

                    for (let i in salvaItensForma) {
                        const produto = salvaItensForma[i];

                        let promise = () => new Promise((resolve, reject) => {
                            $.ajax({
                                type: 'POST',
                                url: "/CadastrosGerais/AlteraPrecificacaoFormaCliente",
                                data: { cliente: JSON.stringify(produto) },
                                success: function (response) {
                                    if (response.result == 'Erro') {
                                        reject(response);
                                    } else {
                                        resolve(response);
                                    }
                                },
                                error: function () {
                                    reject();
                                }
                            });
                        });

                        requests.push(promise);
                    }

                    function limitarExecucoes(arrayDePromises, limite) {
                        let index = 0;
                        let executando = 0;
                        const resultados = new Array(arrayDePromises.length);

                        function proxima(resolve = () => { }, reject = () => { }, resultadosParciais = []) {
                            while (executando < limite && index < arrayDePromises.length) {
                                executando++;
                                const i = index++;
                                arrayDePromises[i]()
                                    .then((resultado) => {
                                        resultados[i] = resultado;
                                    })
                                    .catch((erro) => {
                                        resultados[i] = `Erro: ${erro}`;
                                    })
                                    .finally(() => {
                                        executando--;
                                        proxima(resolve, reject, resultados.slice());
                                    });
                            }

                            if (executando === 0) {
                                resolve(resultados);
                            }
                        }

                        return {
                            iniciar: () => {
                                return new Promise((resolve, reject) => {
                                    proxima(resolve, reject, []);
                                });
                            },
                        };
                    }

                    let limitador = limitarExecucoes(requests, 5);

                    limitador.iniciar().then((resultados) => {

                        CarregaDescontoForma()

                        new PNotify({
                            title: 'Alteração!',
                            text: 'Alterações Concluídas com sucesso!',
                            type: 'success',
                            width: '28%'
                        });
                        e.cancel = false;
                        e.component.refresh(true).done(() => {
                            e.component.cancelEditData();
                        });

                    }).catch((erro) => {
                        // Aqui é quando houver erro
                        new PNotify({
                            title: 'Ocorreu um erro ao limpar descontos e acréscimos!',
                            text: erro,
                            type: 'error',
                            width: "50%"
                        });
                    });

                } else {

                    e.component.refresh(true).done(() => {
                        e.component.cancelEditData();
                    });

                }

            }

            FuncaoSalvarItensGridForma();
        },
        stateStoring: AutoLoad('grid_Desconto_Forma_Pagamento_Cliente', false),
        onToolbarPreparing: AutoResetState([]),

    }).dxDataGrid('instance');

    //GRID DESCONTO POR FAMILIA
    gridDescontoFamiliasCliente = $("#grid_Desconto_Familias_Cliente").dxDataGrid({
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        columnHidingEnabled: true,
        columnsAutoWidth: true,
        allowColumnResizing: true,
        allowColumnReordering: true,

        editing: {
            mode: 'batch',
            allowUpdating: true,
            startEditAction: 'click',
            allowAdding: false,
            allowDeleting: true,
            useIcons: true,
        },
        selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
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
        sorting: { mode: "multiple" },
        groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
        paging: { pageSize: 20 },
        pager: {
            visible: true,
            allowedPageSizes: [10, 15, 20],
            showPageSizeSelector: false,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Famílias');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DescontoClientesFamilias.xlsx');
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
        keyExpr: ['CD_FAMILIA', 'CD_FORMA_PAGAMENTO'],
        /*keyExpr: 'CD_FAMILIA',*/
        columns: [
            {
                type: "selection",
                width: 30,
            },
            {
                dataField: "CD_FAMILIA",
                caption: "Código",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                allowHiding: false,
            },
            {
                dataField: "CD_FAMILIA_PAI",
                caption: "Código Pai",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                dataField: "DS_FAMILIA",
                caption: "Família",
                //width: 250,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                cssClass: "column-data-grid",
                hidingPriority: 196,
            },
            {
                dataField: "CD_FORMA_PAGAMENTO",
                caption: "Forma",
                width: 130,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                lookup: {
                    dataSource: dataSourceFormaPagamento,
                    valueExpr: "CD_FORMA_PAGAMENTO",
                    displayExpr: "DS_FORMA_PAGAMENTO",
                    searchExpr: ["CD_FORMA_PAGAMENTO", "DS_FORMA_PAGAMENTO"],
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        width: 400,
                    },
                },
                visible: true,
                hidingPriority: 199,
            },
            {
                dataField: "PC_DESCONTO",
                caption: "% Desconto",
                width: 70,
                dataType: "number",
                format: "###,###,###,##0.##%",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                setCellValue: function (newData, value, currentRowData) {

                    var desconto = value / 100
                    newData.PC_DESCONTO = desconto;
                    newData.PC_ACRESCIMO = null;
                    newData.VL_PRECO_FINAL = currentRowData.VL_PRECO_MINIMO_VENDA - (currentRowData.VL_PRECO_MINIMO_VENDA * (value / 100));

                },

            },
            {
                dataField: "PC_ACRESCIMO",
                caption: "% Acréscimo",
                width: 70,
                dataType: "number",
                format: "###,###,###,##0.##%",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                setCellValue: function (newData, value, currentRowData) {

                    var desconto = value / 100

                    newData.PC_ACRESCIMO = desconto;
                    newData.PC_DESCONTO = null;
                    newData.VL_PRECO_FINAL = (currentRowData.VL_PRECO_MINIMO_VENDA * (1 + (value / 100)));
                    
                },

            },
            {
                dataField: "CD_LOGIN",
                caption: "Login Configuração",
                width: 90,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 180,

            },
            {
                dataField: "DT_CADASTRO",
                caption: "Data Configuração",
                width: 110,
                dataType: "date",
                format: "dd/MM/yyyy HH:mm",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 179,

            },
            {
                type: "buttons",
                width: 30,
                alignment: 'center',
                //cssClass: "column-data-grid",
            },

        ],
        onToolbarPreparing: function (e) {

            var revertButton = e.toolbarOptions.items.filter(function (i) {
                return i.name === "revertButton"
            })[0];

            var origClick = revertButton.options.onClick;

            revertButton.options.onClick = function () {
                var result = DevExpress.ui.dialog.confirm("Você deseja desfazer as alteraões?", "Desfazer");
                result.done(function (dialogResult) {
                    if (dialogResult) {
                        origClick.apply(arguments);
                    }
                });
            }

            var saveButton = e.toolbarOptions.items.filter(function (i) {
                return i.name === "saveButton"
            })[0];

            var origClickSave = saveButton.options.onClick;

            saveButton.options.onClick = function () {
                var result = DevExpress.ui.dialog.confirm("Você deseja gravar as alterações?", "Gravar");
                result.done(function (dialogResult) {
                    if (dialogResult) {
                        origClickSave.apply(arguments);
                    }
                });
            }

        },
        onCellPrepared: function (e) {
            if (e.rowType === "data") {
                if (e.column.dataField === "LG_FORA_LINHA") {
                    e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                    e.cellElement.css("color", "white");
                }
                if (e.column.dataField === "PC_DESCONTO" || e.column.dataField === "PC_ACRESCIMO" || e.column.dataField === "CD_FORMA_PAGAMENTO") {
                    e.cellElement.css("background-color", "#EDF3F8");
                    /*e.cellElement.css("font-weight", "bold");*/

                    if (e.value < 0) {
                        e.cellElement.css("color", "#d00000");
                    };
                }
            }
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
        onSelectionChanged(selectedItems) {
            itemSelecionadoGridDescFamilia = selectedItems.selectedRowsData;
            

        },
        onSaving(e) {
            e.cancel = true;
            
            const listaRemove = e.changes.filter(change => change.type === 'remove').map(change => {
                const chave = change.key;
                return {
                    CD_FAMILIA: chave.CD_FAMILIA,
                    CD_FORMA_PAGAMENTO: chave.CD_FORMA_PAGAMENTO
                };
            });
            
            const novaListaDeChanges = e.changes.filter(change => change.type !== 'remove').map(change => {
                const chave = change.key;
                const dados = change.data;

                return {
                    CD_FAMILIA: chave.CD_FAMILIA,
                    old_CD_FORMA_PAGAMENTO: chave.CD_FORMA_PAGAMENTO,
                    new_CD_FORMA_PAGAMENTO: dados.CD_FORMA_PAGAMENTO !== undefined ? dados.CD_FORMA_PAGAMENTO : null,
                    PC_ACRESCIMO: dados.PC_ACRESCIMO !== undefined ? dados.PC_ACRESCIMO : null,
                    PC_DESCONTO: dados.PC_DESCONTO !== undefined ? dados.PC_DESCONTO : null
                };
            });
            
            let listaComNewFormaPagamento = novaListaDeChanges.filter(change => change.new_CD_FORMA_PAGAMENTO !== null);
            
            let listaSemNewFormaPagamento = novaListaDeChanges.filter(change => change.new_CD_FORMA_PAGAMENTO === null).map(change => {
                return {
                    CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                    CD_FAMILIA: change.CD_FAMILIA,
                    CD_FORMA_PAGAMENTO: change.old_CD_FORMA_PAGAMENTO,
                    PC_ACRESCIMO: change.PC_ACRESCIMO !== null ? change.PC_ACRESCIMO * 100 : change.PC_ACRESCIMO,
                    PC_DESCONTO: change.PC_DESCONTO !== null ? change.PC_DESCONTO * 100 : change.PC_DESCONTO,
                    CD_EMPRESA: null,
                    DT_CADASTRO: null,
                    CD_LOGIN: null
                };
            });

            if (listaComNewFormaPagamento.length > 0) {

                listaComNewFormaPagamento = listaComNewFormaPagamento.map(change => {
                    if (change.PC_ACRESCIMO === null && change.PC_DESCONTO === null) {
                        const matchingItem = dataSourceGridDescFamilia.find(item =>
                            item.CD_FAMILIA === change.CD_FAMILIA && item.CD_FORMA_PAGAMENTO === change.old_CD_FORMA_PAGAMENTO
                        );

                        if (matchingItem) {
                            change.PC_ACRESCIMO = matchingItem.PC_ACRESCIMO;
                            change.PC_DESCONTO = matchingItem.PC_DESCONTO;
                        }
                    }
                    return change;
                });
                
                listaComNewFormaPagamento = listaComNewFormaPagamento.filter(change => {
                    const existsInDataSource = dataSourceGridDescFamilia.some(item =>
                        item.CD_FAMILIA === change.CD_FAMILIA && item.CD_FORMA_PAGAMENTO === change.new_CD_FORMA_PAGAMENTO
                    );
                    return !existsInDataSource;
                });
            }

            if (listaSemNewFormaPagamento.length > 0) {
                AlteraListaSemNewFormaPagamento(listaSemNewFormaPagamento)

            } else if (listaRemove.length > 0) {

                DeleteListaRemove(listaRemove);

            } else if (listaComNewFormaPagamento.length > 0) {

                listaComNewFormaPagamento = listaComNewFormaPagamento.map(item => ({
                    CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                    CD_FAMILIA: item.CD_FAMILIA,
                    old_CD_FORMA_PAGAMENTO: item.old_CD_FORMA_PAGAMENTO,
                    new_CD_FORMA_PAGAMENTO: item.new_CD_FORMA_PAGAMENTO,
                    PC_ACRESCIMO: item.PC_ACRESCIMO !== null ? item.PC_ACRESCIMO * 100 : item.PC_ACRESCIMO,
                    PC_DESCONTO: item.PC_DESCONTO !== null ? item.PC_DESCONTO * 100 : item.PC_DESCONTO,
                    CD_EMPRESA: null,
                    DT_CADASTRO: null,
                    CD_LOGIN: null

                }));

                AlteraDescAcrescFamiliaCliente(listaComNewFormaPagamento);

            } else {
                e.component.refresh(true).done(() => {
                    e.component.cancelEditData();
                });

                new PNotify({
                    title: 'os itens editados não podem ser alterados!',
                    text: 'Verifique os itens alterados para editar!',
                    type: 'alert'
                });
            }

            function AlteraListaSemNewFormaPagamento(listaSemNewFormaPagamento) {

                let requests = listaSemNewFormaPagamento.map(cliente => () => new Promise((resolve, reject) => {
                    $.ajax({
                        type: 'POST',
                        url: "/CadastrosGerais/AlteraDescontoFamiliaCliente",
                        data: { cliente: JSON.stringify(cliente) },
                        success: resolve,
                        error: (xhr, status, error) => reject(error)
                    });
                }));

                function limitarExecucoes(arrayDePromises, limite) {
                    let index = 0;
                    let executando = 0;

                    function proxima(resolve, reject) {
                        while (executando < limite && index < arrayDePromises.length) {
                            executando++;
                            const i = index++;
                            arrayDePromises[i]()
                                .catch(erro => `Erro: ${erro}`)
                                .finally(() => {
                                    executando--;
                                    proxima(resolve, reject);
                                });
                        }

                        if (executando === 0) {
                            resolve();
                        }
                    }

                    return proxima;
                }

                let limitador = limitarExecucoes(requests, 5);

                return new Promise((resolve, reject) => {
                    limitador(resolve, reject);
                }).then(() => {

                    listaSemNewFormaPagamento = [];
                    gridDescontoFamiliasCliente.selectRows(null);

                    if (listaRemove.length > 0) {

                        DeleteListaRemove(listaRemove);

                    } else if (listaComNewFormaPagamento.length > 0) {

                        listaComNewFormaPagamento = listaComNewFormaPagamento.map(item => ({
                            CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                            CD_FAMILIA: item.CD_FAMILIA,
                            old_CD_FORMA_PAGAMENTO: item.old_CD_FORMA_PAGAMENTO,
                            new_CD_FORMA_PAGAMENTO: item.new_CD_FORMA_PAGAMENTO,
                            PC_ACRESCIMO: item.PC_ACRESCIMO !== null ? item.PC_ACRESCIMO * 100 : item.PC_ACRESCIMO,
                            PC_DESCONTO: item.PC_DESCONTO !== null ? item.PC_DESCONTO * 100 : item.PC_DESCONTO,
                            CD_EMPRESA: null,
                            DT_CADASTRO: null,
                            CD_LOGIN: null

                        }));

                        AlteraDescAcrescFamiliaCliente(listaComNewFormaPagamento);

                    } else {

                        e.component.refresh(true).done(() => {
                            e.component.cancelEditData();
                        });
                        CarregaDescontoFamilia();
                        new PNotify({
                            title: 'Alterações',
                            text: 'Dados gravados com sucesso!',
                            type: 'success'
                        });
                    }

                }).catch(erro => {
                    new PNotify({
                        title: 'Ocorreu um erro ao limpar descontos e acréscimos!',
                        text: erro,
                        type: 'error',
                        width: "50%"
                    });
                });
            }

            function AlteraDescAcrescFamiliaCliente(listaComNewFormaPagamento) {

                let requests = listaComNewFormaPagamento.map(cliente => () => new Promise((resolve, reject) => {
                    $.ajax({
                        type: 'POST',
                        url: "/CadastrosGerais/AlteraDescAcrescFamiliaCliente",
                        data: { cliente: JSON.stringify(cliente) },
                        success: resolve,
                        error: (xhr, status, error) => reject(error)
                    });
                }));

                function limitarExecucoes(arrayDePromises, limite) {
                    let index = 0;
                    let executando = 0;

                    function proxima(resolve, reject) {
                        while (executando < limite && index < arrayDePromises.length) {
                            executando++;
                            const i = index++;
                            arrayDePromises[i]()
                                .catch(erro => `Erro: ${erro}`)
                                .finally(() => {
                                    executando--;
                                    proxima(resolve, reject);
                                });
                        }

                        if (executando === 0) {
                            resolve();
                        }
                    }

                    return proxima;
                }

                let limitador = limitarExecucoes(requests, 5);

                return new Promise((resolve, reject) => {
                    limitador(resolve, reject);
                }).then(() => {

                    listaComNewFormaPagamento = [];

                    gridDescontoFamiliasCliente.selectRows(null);
                    e.component.refresh(true).done(() => {
                        e.component.cancelEditData();
                    });

                    CarregaDescontoFamilia();

                    new PNotify({
                        title: 'Alterações',
                        text: 'Dados gravados com sucesso!',
                        type: 'success'
                    });

                }).catch(erro => {
                    new PNotify({
                        title: 'Ocorreu um erro ao limpar descontos e acréscimos!',
                        text: erro,
                        type: 'error',
                        width: "50%"
                    });
                });
            }

            function DeleteListaRemove(listaRemove) {

                listaRemove = listaRemove.map(item => ({
                    CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                    CD_FAMILIA: item.CD_FAMILIA,
                    CD_FORMA_PAGAMENTO: item.CD_FORMA_PAGAMENTO,
                    CD_EMPRESA: null
                }));

                let requests = listaRemove.map(cliente => () => new Promise((resolve, reject) => {
                    $.ajax({
                        type: 'POST',
                        url: "/CadastrosGerais/DeletaDescontoFamilia",
                        data: { cliente: JSON.stringify(cliente) },
                        success: resolve,
                        error: (xhr, status, error) => reject(error)
                    });
                }));

                function limitarExecucoes(arrayDePromises, limite) {
                    let index = 0;
                    let executando = 0;

                    function proxima(resolve, reject) {
                        while (executando < limite && index < arrayDePromises.length) {
                            executando++;
                            const i = index++;
                            arrayDePromises[i]()
                                .catch(erro => `Erro: ${erro}`)
                                .finally(() => {
                                    executando--;
                                    proxima(resolve, reject);
                                });
                        }

                        if (executando === 0) {
                            resolve();
                        }
                    }

                    return proxima;
                }

                let limitador = limitarExecucoes(requests, 5);

                return new Promise((resolve, reject) => {
                    limitador(resolve, reject);
                }).then(() => {

                    listaRemove = [];

                    if (listaComNewFormaPagamento.length > 0) {

                        listaComNewFormaPagamento = listaComNewFormaPagamento.map(item => ({
                            CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                            CD_FAMILIA: item.CD_FAMILIA,
                            old_CD_FORMA_PAGAMENTO: item.old_CD_FORMA_PAGAMENTO,
                            new_CD_FORMA_PAGAMENTO: item.new_CD_FORMA_PAGAMENTO,
                            PC_ACRESCIMO: item.PC_ACRESCIMO !== null ? item.PC_ACRESCIMO * 100 : item.PC_ACRESCIMO,
                            PC_DESCONTO: item.PC_DESCONTO !== null ? item.PC_DESCONTO * 100 : item.PC_DESCONTO,
                            CD_EMPRESA: null,
                            DT_CADASTRO: null,
                            CD_LOGIN: null

                        }));

                        AlteraDescAcrescFamiliaCliente(listaComNewFormaPagamento);

                    } else {

                        CarregaDescontoFamilia();
                        new PNotify({
                            title: 'Alterações',
                            text: 'Dados gravados com sucesso!',
                            type: 'success'
                        });
                    }
                }).catch(erro => {
                    new PNotify({
                        title: 'Ocorreu um erro ao limpar descontos e acréscimos!',
                        text: erro,
                        type: 'error',
                        width: "50%"
                    });
                });
            }
        },
        stateStoring: AutoLoad('grid_Desconto_Familias_Cliente', false),
        onToolbarPreparing: AutoResetState([]),

    }).dxDataGrid('instance');

    //GRID DESCONTO POR PRODUTO
    gridDescontoProdutosCliente = $("#grid_Desconto_Produtos_Cliente").dxDataGrid({
        /*dataSource: result.data,*/
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        columnHidingEnabled: true,
        columnsAutoWidth: true,
        allowColumnResizing: true,
        allowColumnReordering: true,

        editing: {
            mode: 'batch',
            allowUpdating: true,
            startEditAction: 'click',
            allowAdding: false,
            allowDeleting: true,
            useIcons: true,
        },
        selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
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
        sorting: { mode: "multiple" },
        groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
        paging: { pageSize: 20 },
        pager: {
            visible: true,
            allowedPageSizes: [10, 15, 20],
            showPageSizeSelector: false,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Produtos Preço Fixo');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Produtos_Preco_Fixo_Cliente.xlsx');
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
        keyExpr: ['CD_PRODUTO', 'CD_FORMA_PAGAMENTO'],
        columns: [
            {
                type: "selection",
                width: 30,
            },
            {
                dataField: "CD_PRODUTO",
                caption: "Código Interno",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                allowHiding: false,
            },
            {
                dataField: "DS_PRODUTO",
                caption: "Descrição Produto",
                //width: 250,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                cssClass: "column-data-grid",
                hidingPriority: 196,
            }, {
                dataField: "CD_FABRICANTE",
                caption: "Código Fabricante",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 186,
            }, {
                dataField: "CD_ORIGINAL",
                caption: "Código Original",
                //width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 194,
            }, {
                dataField: "CD_OPCIONAL",
                caption: "Código Opcional",
                //width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 193,
            }, {
                dataField: "CD_EAN_PRODUTO",
                caption: "Código Barras",
                //width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 192,
            }, {
                dataField: "CD_NCM",
                caption: "NCM",
                //width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 191,
            }, {
                dataField: "DS_MARCA",
                caption: "Marca",
                //width: 100,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 190,
            }, {
                dataField: "CD_FORNECEDOR",
                caption: "Código Fornecedor",
                width: 90,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                alignment: 'center',
                visible: false,
                cssClass: "column-data-grid",
                hidingPriority: 189,
            }, {
                dataField: "DS_RAZAO_SOCIAL",
                caption: "Fornecedor Padrão (Razão Social)",
                //width: 250,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                cssClass: "column-data-grid",
                hidingPriority: 188,
            }, {
                dataField: "DS_FANTASIA",
                caption: "Fornecedor Padrão (Fantasia)",
                //width: 250,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: false,
                visible: false,
                cssClass: "column-data-grid",
                hidingPriority: 187,
            }, {
                dataField: "CD_CURVA_ABC",
                caption: "A B C",
                width: 55,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 186,
            }, {
                dataField: "DS_FAMILIA",
                caption: "Família",
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                cssClass: "column-data-grid",
                hidingPriority: 185,
            },
            {
                dataField: "LG_FORA_LINHA",
                caption: "Fora Linha",
                width: 40,
                allowEditing: false,
                allowSorting: true,
                alignment: 'center',
                visible: false,
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
                hidingPriority: 184,
            },
            {
                dataField: "VL_PRECO_MINIMO_VENDA",
                caption: "Preço Padrão",
                width: 70,
                dataType: "number",
                format: "###,###,###,##0.00##",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                cssClass: "column-data-grid",
                hidingPriority: 195,
            },
            {
                dataField: "CD_FORMA_PAGAMENTO",
                caption: "Forma",
                width: 130,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                lookup: {
                    dataSource: dataSourceFormaPagamento,
                    valueExpr: "CD_FORMA_PAGAMENTO",
                    displayExpr: "DS_FORMA_PAGAMENTO",
                    searchExpr: ["CD_FORMA_PAGAMENTO", "DS_FORMA_PAGAMENTO"],
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        width: 400,
                    },
                },
                visible: true,
                hidingPriority: 199,
            },
            {
                dataField: "PC_DESCONTO",
                caption: "% Desconto",
                width: 70,
                dataType: "number",
                format: "###,###,###,##0.##%",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                setCellValue: function (newData, value, currentRowData) {

                    var desconto = value / 100
                    newData.PC_DESCONTO = desconto;
                    newData.PC_ACRESCIMO = null;
                    /*newData.VL_PRECO_FINAL = currentRowData.VL_PRECO_MINIMO_VENDA - (currentRowData.VL_PRECO_MINIMO_VENDA * (value / 100));*/
                    newData.VL_PRECO_FINAL = parseFloat((currentRowData.VL_PRECO_MINIMO_VENDA - (currentRowData.VL_PRECO_MINIMO_VENDA * desconto)).toFixed(2));

                },

            },
            {
                dataField: "PC_ACRESCIMO",
                caption: "% Acréscimo",
                width: 70,
                dataType: "number",
                format: "###,###,###,##0.##%",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                setCellValue: function (newData, value, currentRowData) {

                    var desconto = value / 100
                    newData.PC_ACRESCIMO = desconto;
                    newData.PC_DESCONTO = null;
                    newData.VL_PRECO_FINAL = parseFloat((currentRowData.VL_PRECO_MINIMO_VENDA * (1 + desconto)).toFixed(2));
                    
                },

            },

            {
                dataField: "VL_PRECO_FINAL",
                caption: "Preço do Cliente",
                width: 70,
                dataType: "number",
                format: "###,###,###,##0.00##",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                cssClass: "column-data-grid",
            },
            {
                dataField: "CD_LOGIN",
                caption: "Login Configuração",
                width: 90,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 180,

            },
            {
                dataField: "DT_CADASTRO",
                caption: "Data Configuração",
                width: 110,
                dataType: "date",
                format: "dd/MM/yyyy HH:mm",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 179,

            },
            {
                type: "buttons",
                width: 30,
                alignment: 'center',
                //cssClass: "column-data-grid",
            },

        ],

        onCellPrepared: function (e) {
            if (e.rowType === "data") {
                if (e.column.dataField === "LG_FORA_LINHA") {
                    e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                    e.cellElement.css("color", "white");
                }
                if (e.column.dataField === "PC_DESCONTO" || e.column.dataField === "PC_ACRESCIMO" || e.column.dataField === "CD_FORMA_PAGAMENTO") {
                    e.cellElement.css("background-color", "#EDF3F8");
                    /*e.cellElement.css("font-weight", "bold");*/

                    if (e.value < 0) {
                        e.cellElement.css("color", "#d00000");
                    };
                }
            }
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
        onSelectionChanged(selectedItems) {
            itemSelecionadoGridDescProduto = selectedItems.selectedRowsData;

        },
        onSaving(e) {
            e.cancel = true;

            const listaRemove = e.changes.filter(change => change.type === 'remove').map(change => {
                const chave = change.key;
                return {
                    CD_PRODUTO: chave.CD_PRODUTO,
                    CD_FORMA_PAGAMENTO: chave.CD_FORMA_PAGAMENTO
                };
            });
            
            const novaListaDeChanges = e.changes.filter(change => change.type !== 'remove').map(change => {
                const chave = change.key;
                const dados = change.data;

                return {
                    CD_PRODUTO: chave.CD_PRODUTO,
                    old_CD_FORMA_PAGAMENTO: chave.CD_FORMA_PAGAMENTO,
                    new_CD_FORMA_PAGAMENTO: dados.CD_FORMA_PAGAMENTO !== undefined ? dados.CD_FORMA_PAGAMENTO : null,
                    PC_ACRESCIMO: dados.PC_ACRESCIMO !== undefined ? dados.PC_ACRESCIMO : null,
                    PC_DESCONTO: dados.PC_DESCONTO !== undefined ? dados.PC_DESCONTO : null
                };
            });

            let listaComNewFormaPagamento = novaListaDeChanges.filter(change => change.new_CD_FORMA_PAGAMENTO !== null);

            let listaSemNewFormaPagamento = novaListaDeChanges.filter(change => change.new_CD_FORMA_PAGAMENTO === null).map(change => {
                return {
                    CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                    CD_PRODUTO: change.CD_PRODUTO,
                    CD_FORMA_PAGAMENTO: change.old_CD_FORMA_PAGAMENTO,
                    PC_ACRESCIMO: change.PC_ACRESCIMO !== null ? change.PC_ACRESCIMO * 100 : change.PC_ACRESCIMO,
                    PC_DESCONTO: change.PC_DESCONTO !== null ? change.PC_DESCONTO * 100 : change.PC_DESCONTO,
                    CD_EMPRESA: null,
                    DT_CADASTRO: null,
                    CD_LOGIN: null
                };
            });

            if (listaComNewFormaPagamento.length > 0) {

                listaComNewFormaPagamento = listaComNewFormaPagamento.map(change => {
                    if (change.PC_ACRESCIMO === null && change.PC_DESCONTO === null) {
                        const matchingItem = dataSourceGridDescProduto.find(item =>
                            item.CD_PRODUTO === change.CD_PRODUTO && item.CD_FORMA_PAGAMENTO === change.old_CD_FORMA_PAGAMENTO
                        );

                        if (matchingItem) {
                            change.PC_ACRESCIMO = matchingItem.PC_ACRESCIMO;
                            change.PC_DESCONTO = matchingItem.PC_DESCONTO;
                        }
                    }
                    return change;
                });
                
                listaComNewFormaPagamento = listaComNewFormaPagamento.filter(change => {
                    const existsInDataSource = dataSourceGridDescProduto.some(item =>
                        item.CD_PRODUTO === change.CD_PRODUTO && item.CD_FORMA_PAGAMENTO === change.new_CD_FORMA_PAGAMENTO
                    );
                    return !existsInDataSource;
                });
            }

            if (listaSemNewFormaPagamento.length > 0) {
                AlteraListaSemNewFormaPagamento(listaSemNewFormaPagamento)

            } else if (listaRemove.length > 0) {

                DeleteListaRemove(listaRemove);

            } else if (listaComNewFormaPagamento.length > 0) {

                listaComNewFormaPagamento = listaComNewFormaPagamento.map(item => ({
                    CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                    CD_PRODUTO: item.CD_PRODUTO,
                    old_CD_FORMA_PAGAMENTO: item.old_CD_FORMA_PAGAMENTO,
                    new_CD_FORMA_PAGAMENTO: item.new_CD_FORMA_PAGAMENTO,
                    PC_ACRESCIMO: item.PC_ACRESCIMO !== null ? item.PC_ACRESCIMO * 100 : item.PC_ACRESCIMO,
                    PC_DESCONTO: item.PC_DESCONTO !== null ? item.PC_DESCONTO * 100 : item.PC_DESCONTO,
                    CD_EMPRESA: null,
                    DT_CADASTRO: null,
                    CD_LOGIN: null

                }));

                AlteraDescAcrescProdutoCliente(listaComNewFormaPagamento);

            } else {
                e.component.refresh(true).done(() => {
                    e.component.cancelEditData();
                });

                new PNotify({
                    title: 'os itens editados não podem ser alterados!',
                    text: 'Verifique os itens alterados para editar!',
                    type: 'alert'
                });
            }

            function AlteraListaSemNewFormaPagamento(listaSemNewFormaPagamento) {

                let requests = listaSemNewFormaPagamento.map(cliente => () => new Promise((resolve, reject) => {
                    $.ajax({
                        type: 'POST',
                        url: "/CadastrosGerais/AlteraDescontoProdutoCliente",
                        data: { cliente: JSON.stringify(cliente) },
                        success: resolve,
                        error: (xhr, status, error) => reject(error)
                    });
                }));

                function limitarExecucoes(arrayDePromises, limite) {
                    let index = 0;
                    let executando = 0;

                    function proxima(resolve, reject) {
                        while (executando < limite && index < arrayDePromises.length) {
                            executando++;
                            const i = index++;
                            arrayDePromises[i]()
                                .catch(erro => `Erro: ${erro}`)
                                .finally(() => {
                                    executando--;
                                    proxima(resolve, reject);
                                });
                        }

                        if (executando === 0) {
                            resolve();
                        }
                    }

                    return proxima;
                }

                let limitador = limitarExecucoes(requests, 5);

                return new Promise((resolve, reject) => {
                    limitador(resolve, reject);
                }).then(() => {

                    listaSemNewFormaPagamento = [];
                    gridDescontoProdutosCliente.selectRows(null);

                    if (listaRemove.length > 0) {

                        DeleteListaRemove(listaRemove);

                    } else if (listaComNewFormaPagamento.length > 0) {

                        listaComNewFormaPagamento = listaComNewFormaPagamento.map(item => ({
                            CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                            CD_PRODUTO: item.CD_PRODUTO,
                            old_CD_FORMA_PAGAMENTO: item.old_CD_FORMA_PAGAMENTO,
                            new_CD_FORMA_PAGAMENTO: item.new_CD_FORMA_PAGAMENTO,
                            PC_ACRESCIMO: item.PC_ACRESCIMO !== null ? item.PC_ACRESCIMO * 100 : item.PC_ACRESCIMO,
                            PC_DESCONTO: item.PC_DESCONTO !== null ? item.PC_DESCONTO * 100 : item.PC_DESCONTO,
                            CD_EMPRESA: null,
                            DT_CADASTRO: null,
                            CD_LOGIN: null

                        }));

                        AlteraDescAcrescProdutoCliente(listaComNewFormaPagamento);

                    } else {

                        e.component.refresh(true).done(() => {
                            e.component.cancelEditData();
                        });
                        CarregaDescontoProduto();
                        new PNotify({
                            title: 'Alterações',
                            text: 'Dados gravados com sucesso!',
                            type: 'success'
                        });
                    }

                }).catch(erro => {
                    new PNotify({
                        title: 'Ocorreu um erro ao limpar descontos e acréscimos!',
                        text: erro,
                        type: 'error',
                        width: "50%"
                    });
                });
            }

            function AlteraDescAcrescProdutoCliente(listaComNewFormaPagamento) {

                let requests = listaComNewFormaPagamento.map(cliente => () => new Promise((resolve, reject) => {
                    $.ajax({
                        type: 'POST',
                        url: "/CadastrosGerais/AlteraDescAcrescProdutoCliente",
                        data: { cliente: JSON.stringify(cliente) },
                        success: resolve,
                        error: (xhr, status, error) => reject(error)
                    });
                }));

                function limitarExecucoes(arrayDePromises, limite) {
                    let index = 0;
                    let executando = 0;

                    function proxima(resolve, reject) {
                        while (executando < limite && index < arrayDePromises.length) {
                            executando++;
                            const i = index++;
                            arrayDePromises[i]()
                                .catch(erro => `Erro: ${erro}`)
                                .finally(() => {
                                    executando--;
                                    proxima(resolve, reject);
                                });
                        }

                        if (executando === 0) {
                            resolve();
                        }
                    }

                    return proxima;
                }

                let limitador = limitarExecucoes(requests, 5);

                return new Promise((resolve, reject) => {
                    limitador(resolve, reject);
                }).then(() => {

                    listaComNewFormaPagamento = [];

                    gridDescontoProdutosCliente.selectRows(null);
                    e.component.refresh(true).done(() => {
                        e.component.cancelEditData();
                    });

                    CarregaDescontoProduto();

                    new PNotify({
                        title: 'Alterações',
                        text: 'Dados gravados com sucesso!',
                        type: 'success'
                    });

                }).catch(erro => {
                    new PNotify({
                        title: 'Ocorreu um erro ao limpar descontos e acréscimos!',
                        text: erro,
                        type: 'error',
                        width: "50%"
                    });
                });
            }

            function DeleteListaRemove(listaRemove) {

                listaRemove = listaRemove.map(item => ({
                    CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                    CD_PRODUTO: item.CD_PRODUTO,
                    CD_FORMA_PAGAMENTO: item.CD_FORMA_PAGAMENTO,
                    CD_EMPRESA: null
                }));

                let requests = listaRemove.map(cliente => () => new Promise((resolve, reject) => {
                    $.ajax({
                        type: 'POST',
                        url: "/CadastrosGerais/DeletaDescontoProdutoCliente",
                        data: { cliente: JSON.stringify(cliente) },
                        success: resolve,
                        error: (xhr, status, error) => reject(error)
                    });
                }));

                function limitarExecucoes(arrayDePromises, limite) {
                    let index = 0;
                    let executando = 0;

                    function proxima(resolve, reject) {
                        while (executando < limite && index < arrayDePromises.length) {
                            executando++;
                            const i = index++;
                            arrayDePromises[i]()
                                .catch(erro => `Erro: ${erro}`)
                                .finally(() => {
                                    executando--;
                                    proxima(resolve, reject);
                                });
                        }

                        if (executando === 0) {
                            resolve();
                        }
                    }

                    return proxima;
                }

                let limitador = limitarExecucoes(requests, 5);

                return new Promise((resolve, reject) => {
                    limitador(resolve, reject);
                }).then(() => {

                    listaRemove = [];

                    if (listaComNewFormaPagamento.length > 0) {

                        listaComNewFormaPagamento = listaComNewFormaPagamento.map(item => ({
                            CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                            CD_PRODUTO: item.CD_PRODUTO,
                            old_CD_FORMA_PAGAMENTO: item.old_CD_FORMA_PAGAMENTO,
                            new_CD_FORMA_PAGAMENTO: item.new_CD_FORMA_PAGAMENTO,
                            PC_ACRESCIMO: item.PC_ACRESCIMO !== null ? item.PC_ACRESCIMO * 100 : item.PC_ACRESCIMO,
                            PC_DESCONTO: item.PC_DESCONTO !== null ? item.PC_DESCONTO * 100 : item.PC_DESCONTO,
                            CD_EMPRESA: null,
                            DT_CADASTRO: null,
                            CD_LOGIN: null

                        }));

                        AlteraDescAcrescProdutoCliente(listaComNewFormaPagamento);

                    } else {

                        CarregaDescontoProduto();
                        new PNotify({
                            title: 'Alterações',
                            text: 'Dados gravados com sucesso!',
                            type: 'success'
                        });
                    }
                }).catch(erro => {
                    new PNotify({
                        title: 'Ocorreu um erro ao limpar descontos e acréscimos!',
                        text: erro,
                        type: 'error',
                        width: "50%"
                    });
                });
            }
        },
        stateStoring: AutoLoad('grid_Desconto_Produtos_Cliente', false),
        onToolbarPreparing: AutoResetState([]),

    }).dxDataGrid('instance');

    //GRID DESCONTO PREÇO FIXO
    gridPrecoFixoProdutosCliente = $("#grid_Preco_Fixo_Produtos_Cliente").dxDataGrid({
        /*dataSource: result.data,*/
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        columnHidingEnabled: true,
        columnsAutoWidth: true,
        allowColumnResizing: true,
        allowColumnReordering: true,

        editing: {
            mode: 'batch',
            allowUpdating: true,
            startEditAction: 'click',
            allowAdding: false,
            allowDeleting: true,
            useIcons: true,
        },
        selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
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
        sorting: { mode: "multiple" },
        groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
        paging: { pageSize: 20 },
        pager: {
            visible: true,
            allowedPageSizes: [10, 15, 20],
            showPageSizeSelector: false,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Produtos Preço Fixo');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Produtos_Preco_Fixo_Cliente.xlsx');
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
        keyExpr: ['CD_PRODUTO', 'NR_SEQUENCIA'],
        columns: [
            {
                type: "selection",
                width: 30,
            },
            {
                dataField: "CD_PRODUTO",
                caption: "Código Interno",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                allowHiding: false,
            },
            {
                dataField: "DS_PRODUTO",
                caption: "Descrição Produto",
                //width: 250,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                cssClass: "column-data-grid",
                hidingPriority: 196,
            }, {
                dataField: "CD_FABRICANTE",
                caption: "Código Fabricante",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 186,
            }, {
                dataField: "CD_ORIGINAL",
                caption: "Código Original",
                //width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 194,
            }, {
                dataField: "CD_OPCIONAL",
                caption: "Código Opcional",
                //width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 193,
            }, {
                dataField: "CD_EAN_PRODUTO",
                caption: "Código Barras",
                //width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 192,
            }, {
                dataField: "CD_NCM",
                caption: "NCM",
                //width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 191,
            }, {
                dataField: "DS_MARCA",
                caption: "Marca",
                //width: 100,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 190,
            }, {
                dataField: "CD_FORNECEDOR",
                caption: "Código Fornecedor",
                width: 90,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                alignment: 'center',
                visible: false,
                cssClass: "column-data-grid",
                hidingPriority: 189,
            }, {
                dataField: "DS_RAZAO_SOCIAL",
                caption: "Fornecedor Padrão (Razão Social)",
                //width: 250,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                cssClass: "column-data-grid",
                hidingPriority: 188,
            }, {
                dataField: "DS_FANTASIA",
                caption: "Fornecedor Padrão (Fantasia)",
                //width: 250,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: false,
                visible: false,
                cssClass: "column-data-grid",
                hidingPriority: 187,
            }, {
                dataField: "CD_CURVA_ABC",
                caption: "A B C",
                width: 55,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                hidingPriority: 186,
            }, {
                dataField: "DS_FAMILIA",
                caption: "Família",
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                cssClass: "column-data-grid",
                hidingPriority: 185,
            },
            {
                dataField: "LG_FORA_LINHA",
                caption: "Fora Linha",
                width: 40,
                allowEditing: false,
                allowSorting: true,
                alignment: 'center',
                visible: false,
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
                hidingPriority: 184,
            },
            {
                dataField: "VL_PRECO_MINIMO_VENDA",
                caption: "Preço Padrão",
                width: 70,
                dataType: "number",
                format: "###,###,###,##0.00##",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                cssClass: "column-data-grid",
                hidingPriority: 195,
            },
            {
                dataField: "VL_PRECO_CLIENTE",
                caption: "Preço do Cliente",
                width: 70,
                dataType: "number",
                format: "###,###,###,##0.00##",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                cssClass: "column-data-grid",
                hidingPriority: 200,
            },
            {
                dataField: "CD_FORMA_PAGAMENTO",
                caption: "Forma",
                width: 130,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                lookup: {
                    dataSource: dataSourceFormaPagamento,
                    valueExpr: "CD_FORMA_PAGAMENTO",
                    displayExpr: "DS_FORMA_PAGAMENTO",
                    searchExpr: ["CD_FORMA_PAGAMENTO", "DS_FORMA_PAGAMENTO"],
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        width: 400,
                    },
                    showClearButton: true,
                },
                visible: true,
                hidingPriority: 199,
                setCellValue: function (newData, value, currentRowData) {
                    newData.CD_FORMA_PAGAMENTO = value;
                    newData.CD_CONDICAO_PAGAMENTO = null;

                    if (value) {
                        // Fetch new dataSource based on the new CD_FORMA_PAGAMENTO value
                        fetchCondicaoPagamento(value, function (condicoes) {
                            newData.CD_CONDICAO_PAGAMENTO = condicoes.length > 0 ? condicoes[0].CD_CONDICAO_PAGAMENTO : null;
                            var rowIndex = gridPrecoFixoProdutosCliente.getRowIndexByKey(currentRowData.ID);

                            gridPrecoFixoProdutosCliente.cellValue(rowIndex, "CD_CONDICAO_PAGAMENTO", newData.CD_CONDICAO_PAGAMENTO);

                            var cellElement = gridPrecoFixoProdutosCliente.getCellElement(rowIndex, "CD_CONDICAO_PAGAMENTO");
                            if (cellElement) {
                                var selectBoxInstance = cellElement.find(".dx-selectbox").dxSelectBox("instance");
                                if (selectBoxInstance) {
                                    selectBoxInstance.option("dataSource", condicoes);
                                    selectBoxInstance.option("value", newData.CD_CONDICAO_PAGAMENTO);
                                } else {
                                    cellElement.dxSelectBox({
                                        dataSource: condicoes,
                                        value: newData.CD_CONDICAO_PAGAMENTO
                                    });
                                }
                            }
                        });
                    }
                }
            },

            {
                dataField: "CD_CONDICAO_PAGAMENTO",
                caption: "Condição",
                width: 120,
                allowEditing: function (options) {

                    return options.row.data.CD_FORMA_PAGAMENTO !== null;

                },
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                lookup: {
                    valueExpr: "CD_CONDICAO_PAGAMENTO",
                    displayExpr: "DS_CONDICAO_PAGAMENTO",
                    searchExpr: ["DS_CONDICAO_PAGAMENTO"],
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        width: 400,
                    },
                },
                visible: true,
                hidingPriority: 198,
            },
            {
                dataField: "CD_ENTREGA",
                caption: "Despacho",
                width: 90,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                lookup: {
                    dataSource: dataSourceTipoDespacho,
                    valueExpr: "CD_ENTREGA",
                    displayExpr: "DS_ENTREGA",
                    searchExpr: ["DS_ENTREGA"],
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        width: 400,
                    },
                },
                visible: true,
                hidingPriority: 197,
            },
            {
                dataField: "PC_MAXIMO_DESCONTO",
                caption: "% Desc. Máximo",
                width: 55,
                dataType: "number",
                format: "###,###,###,##0.##'%'",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                cssClass: "column-data-grid",
                hidingPriority: 196,

            },
            {
                type: "buttons",
                width: 30,
                alignment: 'center',
                //cssClass: "column-data-grid",
            },

        ],
        onEditorPrepared: function (e) {
            if (e.dataField === "CD_CONDICAO_PAGAMENTO" && e.row && e.row.data) {
                var formaPagamento = e.row.data.CD_FORMA_PAGAMENTO;

                if (formaPagamento) {
                    if (e.row.data.condicaoPagamentoDataSource) {
                        var resultData = e.row.data.condicaoPagamentoDataSource;
                        e.editorElement.dxSelectBox({
                            dataSource: resultData,
                            value: e.value
                        });
                    } else if (condicaoPagamentoCache[formaPagamento]) {
                        var resultData = condicaoPagamentoCache[formaPagamento];
                        e.editorElement.dxSelectBox({
                            dataSource: resultData,
                            value: e.value
                        });
                    } else {
                        // Fetch data from the database and cache it
                        fetchCondicaoPagamento(formaPagamento, function (condicoes) {
                            e.row.data.condicaoPagamentoDataSource = condicoes;
                            condicaoPagamentoCache[formaPagamento] = condicoes;
                            e.editorElement.dxSelectBox({
                                dataSource: condicoes,
                                value: e.value
                            });
                        });
                    }
                }
            }
        },
        onCellPrepared: function (e) {
            if (e.rowType === "data") {
                if (e.column.dataField === "LG_FORA_LINHA") {
                    e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                    e.cellElement.css("color", "white");
                }
                if (["PC_MAXIMO_DESCONTO", "VL_PRECO_CLIENTE", "CD_FORMA_PAGAMENTO", "CD_CONDICAO_PAGAMENTO", "CD_ENTREGA"].includes(e.column.dataField)) {
                    e.cellElement.css("background-color", "#EDF3F8");

                    if (e.value < 0) {
                        e.cellElement.css("color", "#d00000");
                    }
                }
            }
            if (e.rowType === "data" && e.column.dataField === "CD_CONDICAO_PAGAMENTO" && e.data) {

                var formaPagamento = e.data.CD_FORMA_PAGAMENTO;

                if (formaPagamento) {
                    var item = dataSourceCondicaoPagamento.find(item => item.CD_CONDICAO_PAGAMENTO === e.data.CD_CONDICAO_PAGAMENTO);
                    if (item) {

                        e.cellElement.text(item.DS_CONDICAO_PAGAMENTO);
                    }
                }
            }
        },
        onEditingStart: function (e) {
            if (e.column.dataField === "CD_CONDICAO_PAGAMENTO" && !e.data.CD_FORMA_PAGAMENTO) {
                e.cancel = true;
            }
        },
        onSelectionChanged(selectedItems) {
            itemSelecionadoGridProdutoPrecoFixo = selectedItems.selectedRowsData;

        },

        onSaving(e) {
            e.cancel = true;

            let listaDescontoProdutoFixo = [];
            let listaDelete = [];
            if (e.changes.length > 0) {
                var listaGrid = gridPrecoFixoProdutosCliente.option('dataSource');

                e.changes.forEach(change => {
                    if (change.type === "remove") {
                        listaDelete.push({
                            NR_SEQUENCIA: change.key.NR_SEQUENCIA,
                            CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,

                        });

                    } else {
                        listaDescontoProdutoFixo.push({
                            CD_PRODUTO: change.key.CD_PRODUTO,
                            NR_SEQUENCIA: change.key.NR_SEQUENCIA,
                            CD_CONDICAO_PAGAMENTO: change.data.CD_CONDICAO_PAGAMENTO !== undefined ? change.data.CD_CONDICAO_PAGAMENTO : undefined,
                            CD_FORMA_PAGAMENTO: change.data.CD_FORMA_PAGAMENTO !== undefined ? change.data.CD_FORMA_PAGAMENTO : undefined,
                            CD_ENTREGA: change.data.CD_ENTREGA !== undefined ? change.data.CD_ENTREGA : undefined,
                            VL_PRECO_VENDA: change.data.VL_PRECO_CLIENTE !== undefined ? change.data.VL_PRECO_CLIENTE : undefined,
                            PC_MAXIMO_DESCONTO: change.data.PC_MAXIMO_DESCONTO !== undefined ? change.data.PC_MAXIMO_DESCONTO : undefined,
                            CD_CPF_CNPJ: clienteSelecionado.CD_PESQUISA,
                            CD_EMPRESA: null
                        });
                    }
                });

                if (listaDelete.length > 0) {

                    new Promise(function (resolve, reject) {

                        $.ajax({
                            type: 'POST',
                            url: '/CadastrosGerais/ExclusaoProdutoPrecoFixoCliente',
                            data: { cliente: clienteSelecionado.CD_PESQUISA, produto: listaDelete.map((x) => x.NR_SEQUENCIA) },
                            success: function (response) {
                                resolve(response);

                                // Faça algo com a resposta
                            },
                            error: function (error) {
                                reject(error);

                                // Lidar com erros
                            }
                        });

                    }).then(function (response) {
                        listaDelete = [];

                    });

                }
                if (listaDescontoProdutoFixo.length > 0) {

                    listaDescontoProdutoFixo.forEach(item => {
                        const correspondingGridItem = listaGrid.find(gridItem =>
                            gridItem.CD_PRODUTO === item.CD_PRODUTO && gridItem.NR_SEQUENCIA === item.NR_SEQUENCIA
                        );

                        if (correspondingGridItem) {

                            item.CD_CONDICAO_PAGAMENTO = item.CD_CONDICAO_PAGAMENTO === undefined ? correspondingGridItem.CD_CONDICAO_PAGAMENTO : item.CD_CONDICAO_PAGAMENTO;
                            item.CD_FORMA_PAGAMENTO = item.CD_FORMA_PAGAMENTO === undefined ? correspondingGridItem.CD_FORMA_PAGAMENTO : item.CD_FORMA_PAGAMENTO;
                            item.CD_ENTREGA = item.CD_ENTREGA === undefined ? correspondingGridItem.CD_ENTREGA : item.CD_ENTREGA;
                            item.VL_PRECO_VENDA = item.VL_PRECO_VENDA == null ? correspondingGridItem.VL_PRECO_CLIENTE : item.VL_PRECO_VENDA;
                            item.PC_MAXIMO_DESCONTO = item.PC_MAXIMO_DESCONTO === undefined ? correspondingGridItem.PC_MAXIMO_DESCONTO : item.PC_MAXIMO_DESCONTO;
                        }
                    });

                    let requests = listaDescontoProdutoFixo.map(produto => () => new Promise((resolve, reject) => {
                        $.ajax({
                            type: 'POST',
                            url: "/CadastrosGerais/AlteraPrecoProdutoCliente",
                            data: { produto: JSON.stringify(produto) },
                            success: resolve,
                            error: (xhr, status, error) => reject(error)
                        });
                    }));

                    function limitarExecucoes(arrayDePromises, limite) {
                        let index = 0;
                        let executando = 0;

                        function proxima(resolve, reject) {
                            while (executando < limite && index < arrayDePromises.length) {
                                executando++;
                                const i = index++;
                                arrayDePromises[i]()
                                    .catch(erro => `Erro: ${erro}`)
                                    .finally(() => {
                                        executando--;
                                        proxima(resolve, reject);
                                    });
                            }

                            if (executando === 0) {
                                resolve();
                            }
                        }

                        return proxima;
                    }

                    let limitador = limitarExecucoes(requests, 5);

                    return new Promise((resolve, reject) => {
                        limitador(resolve, reject);
                    }).then(() => {

                        CarregaDescontoPrecoFixo();
                        listaDescontoProdutoFixo = [];
                        gridPrecoFixoProdutosCliente.selectRows(null);
                        e.component.refresh(true).done(() => {
                            e.component.cancelEditData();
                        });

                    }).catch(erro => {
                        new PNotify({
                            title: 'Ocorreu um erro ao Reajustar Preços dos Produtos!',
                            text: erro,
                            type: 'error',
                            width: "50%"
                        });
                    });

                } else {

                    new PNotify({
                        title: 'Concluído!',
                        text: 'Dados gravados com sucesso!',
                        type: 'success',
                        width: '28%'
                    });

                    CarregaDescontoPrecoFixo();

                    gridPrecoFixoProdutosCliente.selectRows("value", false);

                }

            }

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
        stateStoring: AutoLoad('grid_Preco_Fixo_Produtos_Cliente', false),
        onToolbarPreparing: AutoResetState([]),

    }).dxDataGrid('instance');

    $('#toolbarProdutosPrecoFixo').dxToolbar({
        items: [
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Forma e Condição dos produtos selecionados',
                    icon: 'fa fa-credit-card',
                    onClick() {

                        if (itemSelecionadoGridProdutoPrecoFixo.length > 0) {

                            AbrirModal('#ModalAlterarFormaCondicaoPrecoFixo');

                        } else {

                            new PNotify({
                                title: 'Produto não selecionado!',
                                text: 'Nenhum Produto foi selecionado, selecione ao menos um Produto para Alterar Forma de Pagamento',
                                type: 'alert',
                                width: "28%"
                            });

                        }
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Tipo de Despacho dos produtos selecionados',
                    icon: 'fa fa-truck',
                    onClick() {

                        if (itemSelecionadoGridProdutoPrecoFixo.length > 0) {

                            AbrirModal('#ModalAlterarDespachoPrecoFixo');

                        } else {

                            new PNotify({
                                title: 'Produto não selecionado!',
                                text: 'Nenhum Produto foi selecionado, selecione ao menos um Produto para Alterar Tipo de despacho',
                                type: 'alert',
                                width: "28%"
                            });

                        }
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Desconto Máximo dos produtos selecionados',
                    icon: 'fa fa-percent',
                    onClick() {
                        if (itemSelecionadoGridProdutoPrecoFixo.length > 0) {

                            AbrirModal('#ModalAlterarDescontoMaximo');

                        } else {

                            new PNotify({
                                title: 'Produto não selecionado!',
                                text: 'Nenhum Produto foi selecionado, selecione ao menos um Produto para Alterar Desconto máximo',
                                type: 'alert',
                                width: "28%"
                            });

                        }

                    },
                },
            },

            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Limpar Condição de Pagamento dos produtos selecionados',
                    icon: 'fa fa-eraser',
                    onClick() {

                        if (itemSelecionadoGridProdutoPrecoFixo.length > 0) {

                            AbrirModal('#ModalConfirmacaoLimparCondicaoProdutoPrecoFixo');

                        } else {

                            new PNotify({
                                title: 'Produto não selecionado!',
                                text: 'Nenhum Produto foi selecionado, selecione ao menos um Produto para Limpar a Condição de Pagamento',
                                type: 'alert',
                                width: "28%"
                            });

                        }
                    },
                },
            },

        ],
    });

    $('#toolbarDescontoProdutos').dxToolbar({
        items: [
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Forma de Pagamento dos produtos selecionados',
                    icon: 'fa fa-credit-card',
                    onClick() {
                        /*AbrirModal('#ModalAlterarFormaDescontoProduto');*/

                        if (itemSelecionadoGridDescProduto.length > 0) {

                            AbrirModal('#ModalAlterarFormaDescontoProduto');

                        } else {

                            new PNotify({
                                title: 'Produto não selecionado!',
                                text: 'Selecione ao menos um Produto para alterar a forma de pagamento',
                                type: 'alert',
                                width: "28%"
                            });

                        }
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Desconto dos produtos selecionados',
                    icon: 'fa fa-percent',
                    onClick() {

                        if (itemSelecionadoGridDescProduto.length > 0) {

                            AbrirModal('#ModalAlterarDescontoProduto');

                        } else {

                            new PNotify({
                                title: 'Produto não selecionado!',
                                text: 'Selecione ao menos um Produto para alterar os descontos',
                                type: 'alert',
                                width: "28%"
                            });

                        }
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Acréscimo dos produtos selecionados',
                    icon: 'fa fa-percent',
                    onClick() {

                        if (itemSelecionadoGridDescProduto.length > 0) {

                            AbrirModal('#ModalAlterarAcrescimoProduto');

                        } else {

                            new PNotify({
                                title: 'Produto não selecionado!',
                                text: 'Selecione ao menos um Produto para alterar os Acréscimos',
                                type: 'alert',
                                width: "28%"
                            });

                        }
                    },
                },
            },
        ],
    });

    nbxPcAlteracaoDescontoProdutoCliente = $('#nbx_Pc_Alteracao_Desconto_Produto_Cliente').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#####%',
        showClearButton: false,
        showSpinButtons: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: '',
        },
        step: 0.01,
        min: 0,
        placeholder: 'Novo Desconto',
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'Desconto é Obrigatório', }], validationGroup: 'AlterarDescontoProduto'
    }).dxNumberBox('instance');

    nbxPcAlteracaoAcrescimoProdutoCliente = $('#nbx_Pc_Alteracao_Acrescimo_Produto_Cliente').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#####%',
        showClearButton: false,
        showSpinButtons: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: '',
        },
        step: 0.01,
        min: 0,
        placeholder: 'Novo Acréscimo',
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'Acréscimo é Obrigatório', }], validationGroup: 'AlterarAcrescimoProduto'
    }).dxNumberBox('instance');

    $('#toolbarDescontoFamilias').dxToolbar({
        items: [
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Forma de Pagamento das Famílias selecionadas',
                    icon: 'fa fa-credit-card',
                    onClick() {


                        if (itemSelecionadoGridDescFamilia.length > 0) {

                            AbrirModal('#ModalAlterarFormaDescontoFamilias');

                        } else {

                            new PNotify({
                                title: 'Família não selecionada!',
                                text: 'Selecione ao menos uma Família para alterar a forma de pagamento',
                                type: 'alert',
                                width: "28%"
                            });

                        }
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Desconto das Famílias selecionadas',
                    icon: 'fa fa-percent',
                    onClick() {
                        if (itemSelecionadoGridDescFamilia.length > 0) {


                            AbrirModal('#ModalAlterarDescontoFamilias');

                        } else {

                            new PNotify({
                                title: 'Família não selecionada!',
                                text: 'Selecione ao menos uma Família para alterar os descontos',
                                type: 'alert',
                                width: "28%"
                            });

                        }

                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar Acréscimo das Famílias selecionadas',
                    icon: 'fa fa-percent',
                    onClick() {

                        if (itemSelecionadoGridDescFamilia.length > 0) {


                            AbrirModal('#ModalAlterarAcrescimoFamilias');

                        } else {

                            new PNotify({
                                title: 'Família não selecionada!',
                                text: 'Selecione ao menos uma Família para alterar os Acréscimos',
                                type: 'alert',
                                width: "28%"
                            });

                        }


                    },
                },
            },
        ],
    });

    nbxPcAlteracaoDescontoFamiliasCliente = $('#nbx_Pc_Alteracao_Desconto_Familias_Cliente').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#####%',
        showClearButton: false,
        showSpinButtons: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: '',
        },
        step: 0.01,
        min: 0,
        placeholder: 'Novo Desconto',
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'Desconto é Obrigatório', }], validationGroup: 'AlterarDescontoFamilias'
    }).dxNumberBox('instance');

    nbxPcAlteracaoAcrescimoFamiliasCliente = $('#nbx_Pc_Alteracao_Acrescimo_Familias_Cliente').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#####%',
        showClearButton: false,
        showSpinButtons: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: '',
        },
        step: 0.01,
        min: 0,
        placeholder: 'Novo Acréscimo',
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'Acréscimo é Obrigatório', }], validationGroup: 'AlterarAcrescimoFamilias'
    }).dxNumberBox('instance');

    function configuraNumberBoxValorReajuste(e) {
        if (e.component.option('text') == '%') {
            e.component.option('text', 'R$');
            tipoValorReajuste = 'R$';
            valorReajuste.option('format', 'R$ ###,###,###,##0.00###');
            valorReajuste.option('label', 'Valor de reajuste');
        } else {
            e.component.option('text', '%');
            tipoValorReajuste = '%';
            valorReajuste.option('format', '###,###,###,##0.#####%');
            valorReajuste.option('label', 'Percentual de reajuste');
        }

        /*valorNumberBoxReajuste = valorReajuste.option("text");*/
    };

    operadorReajuste = $('#lkp_Operador_Reajuste').dxLookup({
        dataSource: dataSourceOperacaoReajuste,
        searchExpr: ['DS_OPERACAO'],
        displayExpr: 'DS_OPERACAO',
        valueExpr: 'CD_OPERACAO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Operação',
        },
        labelMode: 'floating',
        label: 'Operação',
        placeholder: '',
        showClearButton: false,
        onSelectionChanged: function (e) {
            valorOperadorReajuste = e.selectedItem.CD_OPERACAO;

            //Quando o usuário trocar de Operador de Reajuste será necessário reconfigurar o Number Box duas vezes para que ele vá para a configuração adequada de acordo com o Operador.
            configuraNumberBoxValorReajuste(componenteBotaoNumberBox);
            configuraNumberBoxValorReajuste(componenteBotaoNumberBox);

            document.getElementById("ValidacaoCampos").style.display = 'none';

        },
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'Operador Obrigatório', }],
        validationGroup: 'ReajustaPrecoFixo'
    }).dxLookup('instance');

    valorReajuste = $('#nbx_Valor_Reajuste').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#####%',
        showClearButton: false,
        showSpinButtons: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: '',
        },
        labelMode: 'floating',
        label: 'Percentual de reajuste',
        placeholder: '',
        step: 0.01,
        min: 0,
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
                    componenteBotaoNumberBox = e;
                },
                onClick(e) {
                    componenteBotaoNumberBox = e;
                    configuraNumberBoxValorReajuste(componenteBotaoNumberBox);
                },
            },
        }, 'clear', 'spins'],
        onKeyPress(e) {
            document.getElementById("ValidacaoCampos").style.display = 'none';
        },
        onValueChanged(e) {
            valorNumberBoxReajuste = tipoValorReajuste === '%' ? e.value * 100 : e.value;
            document.getElementById("ValidacaoCampos").style.display = 'none';

        }
    }).dxValidator({
        validationRules: [{ type: 'required', message: 'Fator do Reajuste Obrigatório', }],
        validationGroup: 'ReajustaPrecoFixo'
    }).dxNumberBox('instance');

    lkpAlterarDespachoPrecoFixo = $('#lkp_Alterar_Despacho_Preco_Fixo').dxLookup({
        dataSource: dataSourceTipoDespacho,
        searchExpr: ['DS_ENTREGA'],
        displayExpr: 'DS_ENTREGA',
        valueExpr: 'CD_ENTREGA',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Tipo de Despacho',
        },
        //labelMode: 'floating',
        //label: 'Novo Tipo de Despacho',
        placeholder: 'Novo Despacho',
        showClearButton: true,
    }).dxLookup('instance');

    valorAlteracaoDescontoMaximoGrid = $('#nbx_Pc_Alteracao_Desconto_Maximo_Grid').dxNumberBox({
        value: '',
        format: '###,###,###,##0.#####%',
        showClearButton: false,
        showSpinButtons: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: '',
        },
        step: 0.01,
        min: 0,
        placeholder: 'Desconto Máximo',
    }).dxNumberBox('instance');



    //#endregion [aba precificação]

    //ABA PEDIDOS
    //#region [aba pedidos]

    //Campos do formulário de envio do pedido por e-mail
    $('#txt_Remetente_Email').dxTextBox({
        labelMode: 'floating',
        label: 'Máscara do remetente',
        value: 'Loja ABC - Filial 2',
        showClearButton: true,
    });

    $('#txt_Destinatario_Email').dxTextBox({
        labelMode: 'floating',
        label: 'E-mail do destinatário (mais de um e-mail deve ser separado por vírgula)',
        value: 'meu.email@meuemail.com.br',
        showClearButton: true,
    });

    $('#txt_Assunto_Email').dxTextBox({
        labelMode: 'floating',
        label: 'Assunto',
        value: 'Pedido de Compra - #35472',
        showClearButton: true,
    });

    $('#txta_Corpo_Email').dxTextArea({
        labelMode: 'floating',
        label: 'Texto do e-mail',
        value: 'Segue pedido de compra #35472.',
        height: 90,
        maxLength: 4000,
    }).dxTextArea('instance');

    $('#ckb_Anexar_Pedido_Email').dxCheckBox({
        value: true,
        text: "Anexar o pedido de compra no e-mail",
    });

    //Fim dos campos do formulário de envio do pedido por e-mail

    //Campos do formulário de envio do pedido por WhatsApp
    $('#txt_Telefone_WhatsApp').dxTextBox({
        labelMode: 'floating',
        label: 'Número WhatsApp do Cliente',
        mask: '+00 (00) 00000-0000',
        //maskRules: { X: /[02-9]/ },
        value: '55(11)96857-2256',
        showClearButton: true,
    });

    $('#txta_Mensagem_WhatsApp').dxTextArea({
        labelMode: 'floating',
        label: 'Mensagem Inicial',
        value: 'Olá, segue link para o Pedido de Venda #35472 \nLoja ABC Ltda, Filial 2.',
        height: 90,
        maxLength: 4000,
    }).dxTextArea('instance');

    $('#ckb_Enviar_Link_Pedido_WhatsApp').dxCheckBox({
        value: true,
        text: "Enviar link na mensagem para o Forncedor baixar o pedido",
    });

    //Fim dos campos do formulário de envio do pedido por WhatsApp
    //#endregion

});







