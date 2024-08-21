/// <reference path="../../../properties/referencesdevexpress/dx.all.d.ts" />
/// <reference path="../../../properties/referencesdevexpress/jquery.d.ts" />
//TIPOS DE OPERAÇÃO:
//<I> Inclusão de novo título
//<A> Alteração individual de um título
//<AS> Alteração em série de mais de um título
//<CNAB> Geração de arquivo CNAB

class Lancamento {
    Cd_Filial;
    Ds_Historico;
    Cd_Fornecedor;
    Cd_Tipo_Documento;
    Nr_Documento;
    Cd_Centro_Custo;
    Dt_Vencimento;
    Vl_Parcela;
    Vl_Juros;
    Vl_Multa;
    Vl_Desconto;
    Cd_Categoria;
    Dt_Emissao_Documento;
    Cd_Plano_Conta;
    Cd_Origem = 2;
    Cd_Tipo_Pagamento;
    Cd_Banco_Baixa;
    Cd_Agencia_Baixa;
    Cd_Conta_Corrente_Baixa;
    Cd_Forma_Pagamento_Baixa;
    Lg_Controla_Recebimento_Boleto = false;
    Parcelas = [];
    #thisForLancamento() {
        const lancamento = {};
        for (const prop of Object.entries(this)) {
            if (!['Parcelas'].includes(prop[0]))
                lancamento[prop[0]] = prop[1];
        }
        return lancamento;
    }
    create() {
        const body = {
            lancamento: this.#thisForLancamento(),
            parcelas: this.Parcelas
        };
        console.log(body);
        fetch("titulo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Erro:', error));
    };
}

class FetchData {
    constructor(endpoint, parans = {}, dxDataSourceKey = null, namePropResult = 'DataResult') {
        this.endpoint = endpoint;
        this.parans = parans;
        this.dxDataSourceKey = dxDataSourceKey;
        this.namePropResult = namePropResult;
        this.get();
        if (!dxDataSourceKey)
            return;
        this.dxDataSource = new DevExpress.data.CustomStore({
            loadMode: 'raw',
            key: dxDataSourceKey?.key,
            load: async () => {
                const result = await this.promise;
                if (typeof dxDataSourceKey?.fn == 'function') {
                    const resultFn = await dxDataSourceKey?.fn(result);
                    return resultFn;
                }
                return result;
            },
        });
    }
    get(p = this.parans) {
        this.promise = new Promise((resolve, reject) => {
            p.Origem = 2; //Contas a Pagar
            this.parans = p;
            if (!this.endpoint || typeof this.parans != 'object')
                reject(new Error(`Erro ao gerar data source, faltando parametros. ${JSON.stringify({
                    endpoint, parans, namePropResult, dxDataSourceKey
                })}`));
            const parametros = Object.fromEntries(Object.entries(this.parans).filter(a => ![undefined, null].includes(a[1])));
            fetch(`${this.endpoint}?${new URLSearchParams(parametros).toString()}`)
                .then((resp) => resp.json())
                .then((resp) => {
                    let result = !this.namePropResult ? resp : resp[this.namePropResult];
                    this.data = result;
                    resolve(result);
                })
                .catch((error) => reject(new Error(`Erro ao gerar data source, ${error}`)));
        });
        return this.promise;
    }
}

const createPopover = (target, text) => {
    const $div = $body.appendChild(document.createElement('div'));
    $div.classList.add('text-center');
    $div.innerText = text;

    return new DevExpress.ui.dxPopover($div, {
        target: target,
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        maxWidth: 200,
    });
}
$.fn.createPopover = function (text) {
    this.popover = createPopover(this, text);
    return this;
}
const formatDate = (dateInput) => {
    const input = moment(dateInput);
    if (!input.isValid())
        return null;
    return input.format(moment.defaultFormatUtc);
}
const enumTipoLancamentoPlanoConta = Object.freeze({
    Credito: 0,
    Debito: 1,
    CreditoDebito: 2,
    Nenhum: 3,
    getIcon: (tipo) => {
        return {
            0: '/img/iconePositivo.png',
            1: '/img/iconeNegativo.png',
            2: '/img/iconePositivoNegativo.png',
            3: null,
        }[tipo];
    },
});
const enumSituacaoLancamento = Object.freeze({
    Aberto: 1,
    Pago: 2,
    Cancelado: 3,
});
const enumTiposData = Object.freeze({
    Vencimento: 0,
    Pagamento: 1,
    Lancamento: 2,
    Emissao: 3,
    Baixa: 4,
    getNome: (tipo) => {
        return {
            0: "Dt_Vencimento",
            1: "Dt_Pagamento",
            2: "Dt_lancamento",
            3: "Dt_Emissao_Documento",
            4: "Dt_Baixa",
        }[tipo]
    }
});
const $body = document.querySelector('body');
const messages = new LoadPNotifyMessages();
const animateCSS = (elements, animation, operacao = 'in', duration = 400, prefix = 'animate__') => new Promise((resolve) => {
    elements = !Array.isArray(elements) ? [elements] : elements;
    const animationName = `${prefix}${animation}`;

    if (elements.length == 0)
        resolve();

    elements.forEach((element, index) => {
        const node = document.querySelector(element);
        node.style.animationDuration = duration + 'ms';
        node.classList.add(`${prefix}animated`, animationName);
        node.addEventListener('animationend', handleAnimationEnd, { once: true });
        if (operacao == 'in')
            $(element).show();
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            if (operacao == 'out')
                $(element).hide();
            if (index == elements.length - 1)
                resolve('Animation ended');
        }
    });
});

const pathBase = '/financeiro';

const addRequiredMark = (component) => component.element()
    .addClass('dx-field-item-required')
    .find('.dx-label span')
    .attr('data-mark', ' *');
const removeRequiredMark = (component) => addRequiredMark(component).attr('data-mark', '');

const dataSource = new GetDataSource();

const createPromiseFilial = () => new Promise((resolve) => {
    Promise.all([
        fetch('/Componente/GetFilial?apenasPermitidas=1', { method: 'POST' }).then(a => a.json()),
        Load_Azr_Lookup_Filial2(
            [],
            'lkp_filial_ApenasAtivasPorUsuario',
            azrFramework_tipoStatus.Todos,
            undefined,
            'Apenas filiais ativas permitidas por usuario',
            'Filial'
        ),
    ]).then(async (result) => {
        const permitidas = result[0].map(a => a.CD_PESQUISA);
        const { Component: filialComponent } = result[1];
        const data = filialComponent.getDataSource();
        const { _array: arr } = data._store;

        data._store._array = arr
            .map(b => {
                const a = { ...b };
                a.id = parseInt(a.CD_PESQUISA);
                const hasInativo = a.DS_PESQUISA.includes('INATIVO');
                a.disabled = !permitidas.includes(a.CD_PESQUISA) || hasInativo;
                if (a.disabled)
                    a.DS_PESQUISA = `${a.DS_PESQUISA}${hasInativo ? '' : ' [Indisponível neste usuário]'}`;
                return a;
            })
            .sort((a, b) => {
                if (a.disabled === b.disabled) {
                    return a.id - b.id;
                }
                return a.disabled ? 1 : -1;
            });

        const { toolbarItems } = filialComponent._popupConfig();
        toolbarItems.push({
            widget: "dxButton",
            location: 'center',
            name: 'add',
            toolbar: 'bottom',
            options: {
                width: 33,
                icon: 'refresh',
                elementAttr: {
                    class: 'min-width-button-custom',
                },
                onClick() {
                    filialComponent.option('value', null);
                    createPromiseFilial().then(filialComponent.getDataSource().reload);
                },
                onInitialized({ element }) {
                    element.createPopover('Atualizar lista de Filiais');
                }
            },
        })

        filialComponent.option({
            dataSource: data,
            wrapItemText: true,
            dropDownOptions: {
                closeOnOutsideClick: true,
                width: 400,
                toolbarItems
            },
            onSelectionChanged: async (option) => {

                const filialValue = option.selectedItem ? parseInt(option?.selectedItem?.CD_PESQUISA) : null;
                const gridPagamentosLanctoQuitado = dxComp.principaisTitulos.titulo.gridPagamentosLanctoQuitado;

                let isLancamentoQuitado = dxComp?.principaisTitulos?.titulo?.check_lancamento_quitado.option('value') ?? false;
                if (isLancamentoQuitado) {
                    const dataSourceGrid = gridPagamentosLanctoQuitado.option('dataSource');
                    let lancamentos = dataSourceGrid.store()._array;
                    const verificaLancamentos = lancamentos.some(a => a.filiais.includes(filialValue));
                    if (lancamentos.length > 0 && (!filialValue || !verificaLancamentos)) {
                        dataSourceGrid.store()._array = [];
                        gridPagamentosLanctoQuitado.option('dataSource', dataSourceGrid);
                        messages.info('Pagamentos quitados', `Os lançamentos de pagamentos quitados foram excluídos, existem contas correntes selecionadas que não podem ser utilizadas para a filial ${filialValue}.`, 4000);
                    }
                }
                const lkp_Conta_Corrente_Baixa_Futura = dxComp?.principaisTitulos?.titulo?.lkp_Conta_Corrente_Baixa_Futura;
                const contaCorrenteBaixa = lkp_Conta_Corrente_Baixa_Futura.option('selectedItem');
                if (contaCorrenteBaixa && (!filialValue || !contaCorrenteBaixa.Filiais.includes(filialValue))) {
                    messages.info('Conta corrente baixa', !filialValue ? 'Removido a conta corrnte para baixa futura, a filial é necessária para validar as contas disponíveis.' : `A conta corrente para baixa ${contaCorrenteBaixa.DescricaoConta} foi removida, ela não pode ser utilizada para filial ${filialValue}.`, 4000);
                    lkp_Conta_Corrente_Baixa_Futura.option('value', null);
                }

                await dataSource.contasCorrentes.promise;
                const dxDataSource = dataSource.contasCorrentes.dxDataSource;

                if (dxDataSource.__rawDataPromise) {
                    await dxDataSource.__rawDataPromise;
                }
                dxDataSource.__rawData.forEach(value => {
                    const oldDescricaoConta = value.oldDescricaoConta ?? value.DescricaoConta;
                    value.oldDescricaoConta = oldDescricaoConta;
                    value.DescricaoConta = oldDescricaoConta;

                    const oldDisabled = value.oldDisabled ?? value.disabled;
                    value.oldDisabled = oldDisabled;
                    value.disabled = oldDisabled;

                    if (filialValue &&
                        value.Status &&
                        value.Filiais.length > 0 &&
                        !value.Filiais.includes(filialValue)) {
                        value.disabled = true;
                        value.DescricaoConta = `Indisponível na filial ${filialValue} - ${value.DescricaoConta}`;
                    }
                });
                const dataSort = await dxDataSource.load({ sort: ['disabled'] });

                dataSource.contasCorrentes.dxDataSource.__rawData = dataSort;

                lkp_Conta_Corrente_Baixa_Futura.option('dataSource', dataSource.contasCorrentes.dxDataSource);

                const CD_CONTA_CORRENTE = gridPagamentosLanctoQuitado?.CD_CONTA_CORRENTE;
                if (CD_CONTA_CORRENTE && CD_CONTA_CORRENTE.element().is(':visible')) {
                    CD_CONTA_CORRENTE.getDataSource().load();
                }
                lkp_Conta_Corrente_Baixa_Futura.repaint();
            },
            onValueChanged({ value }) {
                dxComp.lancamento.Cd_Filial = value;
            },
        });
        filialComponent.validator = new DevExpress.ui.dxValidator(filialComponent.element(), {
            validationGroup: "dadosTitulo",
            validationRules: [{
                type: 'required',
                message: 'Filial obrigatória',
            }],
        });
        addRequiredMark(filialComponent);
        resolve(filialComponent);
    });
})
const createPromiseFornecedor = () => new Promise((resolve) => {
    const onLoad = ({ Component: fornecedorComponent }) => {
        let arrFornecedor = fornecedorComponent.getDataSource().store()._array;
        for (const a of arrFornecedor) {
            a.disabled = a.DS_FANTASIA_RAZAO_SOCIAL.includes('INATIVO');
        }

        const { toolbarItems } = fornecedorComponent._popupConfig();
        toolbarItems.push({
            widget: "dxButton",
            location: 'center',
            name: 'refresh',
            toolbar: 'bottom',
            options: {
                width: 33,
                icon: 'refresh',
                elementAttr: {
                    class: 'min-width-button-custom',
                },
                onClick() {
                    fornecedorComponent.option('value', null);
                    createPromiseFornecedor().then(fornecedorComponent.getDataSource().reload);
                },
                onInitialized({ element }) {
                    element.createPopover('Atualizar lista de Fornecedores');
                }
            },
        }, {
            widget: "dxButton",
            location: 'center',
            name: 'add',
            toolbar: 'bottom',
            options: {
                width: 33,
                icon: 'plus',
                elementAttr: {
                    class: 'min-width-button-custom',
                },
                onClick() {
                    window.open(urlsLegado.get(117));
                },
                onInitialized({ element }) {
                    element.createPopover('Abrir nova aba no cadastro de Fornecedores');
                }
            },
        })

        fornecedorComponent.option({
            wrapItemText: true,
            dropDownOptions: {
                closeOnOutsideClick: true,
                width: 400,
                toolbarItems,
            },
            onValueChanged(option) {
                dxComp.lancamento.Cd_Fornecedor = option.value;
            }
        });
        fornecedorComponent.validator = new DevExpress.ui.dxValidator(fornecedorComponent.element(), {
            validationGroup: "dadosTitulo",
            validationRules: [{
                type: 'required',
                message: 'Fornecedor obrigatório',
            }],
        });
        addRequiredMark(fornecedorComponent);
        resolve(fornecedorComponent);
    };
    Load_Azr_Lookup_FornecedorV2('lkp_fornecedores', [], azrFramework_tipoStatus.Todos, 'Selecione um fornecedor', 'Fornecedor').then(onLoad);

})
const createPromiseCategoria = () => new Promise((resolve) => {
    const onLoad = (categoria) => {
        let arrCategoria = categoria.Component.getDataSource().store()._array;
        arrCategoria.forEach(a => {
            a.disabled = a.DS_CATEGORIA.includes('(INATIVO)');
        });
        arrCategoria.sort((a, b) => a.disabled - b.disabled || a.CD_CATEGORIA - b.CD_CATEGORIA);
        categoria.Component.option({
            wrapItemText: true,
            dropDownOptions: {
                closeOnOutsideClick: true,
                width: 400,
            },
            onValueChanged(option) {
                dxComp.lancamento.Cd_Categoria = option.value;
            }
        });
        categoria.Component.validator = new DevExpress.ui.dxValidator(categoria.Component.element(), {
            validationGroup: "dadosTitulo",
            validationRules: [{
                type: 'required',
                message: 'Categoria obrigatória',
            }],
        });
        addRequiredMark(categoria.Component);
        resolve(categoria.Component);
    }
    Load_Azr_Lookup_CategoriaFinanceira('lkp_categoriaFinanceira', [], azrFramework_tipoStatus.Todos, 'Selecione uma categoria', 'Categoria').then(onLoad);
})
const createPromiseCentroCusto = () => new Promise((resolve) => {
    const onLoad = (centroCusto) => {
        let arrCentro = centroCusto.Component.getDataSource().store()._array;
        for (const a of arrCentro) {
            a.disabled = a.DS_CENTRO_CUSTO.includes('INATIVO');
        }
        centroCusto.Component.option({
            wrapItemText: true,
            dropDownOptions: {
                closeOnOutsideClick: true,
                width: 400,
            },
            onValueChanged(option) {
                dxComp.lancamento.Cd_Centro_Custo = option.value;
            },
        });
        centroCusto.Component.validator = new DevExpress.ui.dxValidator(centroCusto.Component.element(), {
            validationGroup: "dadosTitulo",
            validationRules: [{
                type: 'required',
                message: 'Centro de Custos obrigatório',
            }],
        });
        addRequiredMark(centroCusto.Component);
        resolve(centroCusto.Component);
    }
    Load_Azr_Lookup_CentroCusto('lkp_centroCusto', [], azrFramework_tipoStatus.Todos, 'Selecione um centro de custo', 'Centro de Custo').then(onLoad);
})
const createPromisePlanoConta = () => new Promise((resolve) => {
    const onLoad = (planoConta) => {
        planoConta.Component.option({
            wrapItemText: true,
            dropDownOptions: {
                closeOnOutsideClick: true,
                width: 400,
                onShowing: (e) => {
                    e.component.option('position', {
                        my: 'center top',
                        at: 'center bottom',
                    })
                },
            },
            onValueChanged(option) {
                dxComp.lancamento.Cd_Plano_Conta = !option.value ? null : option.value[0];
            },
        });
        planoConta.Component.validator = new DevExpress.ui.dxValidator(planoConta.Component.element(), {
            validationGroup: "dadosTitulo",
            validationRules: [{
                type: 'required',
                message: 'Conta Contábil (Plano de Conta) obrigatório',
            }],
        });
        addRequiredMark(planoConta.Component);
        resolve(planoConta.Component);
    }
    Load_Azr_TreeView_PlanoConta([], 'lkp_planoDeContas_D_CD', ['D', 'CD'], 'Selecione uma conta contábil', 'Conta Contábil (Plano de Conta)').then(onLoad);
})
const createPromiseTipoDocumento = () => new Promise((resolve) => {
    const onLoad = (tipoDocumento) => {
        let arrDocumento = tipoDocumento.Component.getDataSource().store()._array;
        for (const a of arrDocumento) {
            a.disabled = a.DS_TIPO_DOCUMENTO.includes('INATIVO');
        }
        tipoDocumento.Component.option({
            wrapItemText: true,
            dropDownOptions: {
                closeOnOutsideClick: true,
                width: 400,
            },
            onValueChanged(option) {
                dxComp.lancamento.Cd_Tipo_Documento = option.value;
            },
        });
        tipoDocumento.Component.validator = new DevExpress.ui.dxValidator(tipoDocumento.Component.element(), {
            validationGroup: "dadosTitulo",
            validationRules: [{
                type: 'required',
                message: 'Tipo de documento obrigatório',
            }],
        });
        addRequiredMark(tipoDocumento.Component);
        resolve(tipoDocumento.Component);
    }
    Load_Azr_Lookup_TipoDocumento('lkp_tipoDocumento', [], azrFramework_tipoStatus.Todos, 'Selecione um tipo de documento', 'Tipo de Documento').then(onLoad);
})
const createPromiseFormaPagamento = () => new Promise((resolve) => {
    const onLoad = (formaPagamento) => {
        let arrForma = formaPagamento.Component.getDataSource().store()._array;
        for (const a of arrForma) {
            a.disabled = a.CD_STATUS == 'I';
        }
        formaPagamento.Component.option({
            wrapItemText: true,
            dropDownOptions: {
                closeOnOutsideClick: true,
                width: 400,
            },
            onValueChanged({ value }) {
                dxComp.lancamento.Cd_Forma_Pagamento_Baixa = value;
            },
        });
        resolve(formaPagamento.Component);
    }
    Load_Azr_Lookup_FormaPagamento('lkp_Forma_Pagamento_Baixa_Futura', [], azrFramework_tipoStatus.Todos, 'Selecione uma forma de pagamento', 'Forma de Pagamento').then(onLoad);
})
const createPromiseContaCorrente = () => new Promise((resolve) => {
    const onload = (contaCorrente) => {
        let arrConta = contaCorrente.Component.getDataSource().store()._array;
        for (const a of arrConta) {
            a.disabled = a.DS_PESQUISA.includes('INATIVO');
        }
        contaCorrente.Component.option({
            wrapItemText: true,
            dropDownOptions: {
                closeOnOutsideClick: true,
                width: 400,
            },
        });
        resolve(contaCorrente.Component);
    }
    Load_Azr_Lookup_ContaCorrente('lkp_contaCorrente_CNAB', [], azrFramework_tipoStatus.Todos, 'Apenas contas correntes que atendem a filial', 'Conta Corrente').then(onload);
})

const loadComponentesAzrFramework = [
    createPromiseFilial(),
    createPromiseFornecedor(),
    createPromiseCategoria(),
    createPromiseCentroCusto(),
    createPromisePlanoConta(),
    createPromiseTipoDocumento(),
    createPromiseFormaPagamento(),
    createPromiseContaCorrente(),
];

const dxComp = {
    navegacao: new LoadNavegacao(),
    consultaTitulos: new LoadConsultaTitulos(),
    popups: new LoadPopups(),
    principaisTitulos: {
        titulo: new LoadTitulos(),
        pagamentos: new LoadPagamentos(),
        parcelas: new LoadParcelas(),
    },
    lancamento: new Lancamento(),
    criarLancamento() {
        this.lancamento = new Lancamento();
        return this.lancamento;
    },
};

let operacaoTipo = 'I';
let operacaoNumeroTitulo = 0;
let operacaoParcelaAtual = 0;
let operacaoParcelaTotal = 0;
let operacaoSituacaoTitulo = 0;
let operacaoValorTitulo = 0;
let operacaoSaldoPagar = 0;

let tipoPagamentoCNAB;
let valorTotalTitulo = 0;
let diferencaTitulo = 0;
let tipoParcelamento;
let tipoRateioParcelamentoPc;
let tipoPeriodicidadeParcelasFixas;
let dataVencimentoBase;
let tipoOperacaoGridParcelas;

let diferencaTituloLanctoQuitado = 0;
let diferencaTituloRateioCentroCusto = 0;

let totalPagamentosGerais = 0;
let totalPagamentosChequeProprio = 0;
let totalPagamentosChequeTerceiros = 0;
let diferencaTituloQuitacao = 0;

let dataPagtoChequeTerceiros;
let validacaoPagtoChequeTerceiros;

let planoContaChequeTerceiros;
let validacaoPlanoContaChequeTerceiros;

let centroCustoChequeTerceiros;
let validacaoCentroCustoChequeTerceiros;

let historicoPagtoChequeTerceiros;

function GetDataSource() {
    this.titulos = new FetchData('titulo', {
        TipoData: enumTiposData.Vencimento,
        SituacaoLancamento: enumSituacaoLancamento.Aberto,
    }, { key: ['Nr_Lancamento', 'Nr_Parcela_Atual'] });
    this.titulos.getLancamento = function (lancamento) {
        return new Promise(resolve => {
            const req = new FetchData(this.endpoint, { Lancamento: lancamento });
            req.promise.then((res) => resolve(res));
        });
    }
    this.planoConta = new FetchData(`${pathBase}/planoConta`, undefined, {
        key: 'Cd_Plano_Conta',
        fn: (result) => {
            result.forEach(a => {
                const tipoLancamentoAceito = [
                    enumTipoLancamentoPlanoConta.Debito,
                    enumTipoLancamentoPlanoConta.CreditoDebito
                ].includes(a.Cd_Tipo_Lancamento);
                a.disabled = !a.IsActive || !tipoLancamentoAceito;
                a.text = `${a.IsActive ? '' : 'INATIVO - '}${a.Cd_Plano_Conta} - (${a.Cd_Completo_Plano_Conta}) ${a.Ds_Plano_Conta} | Tipo${tipoLancamentoAceito ? ': ' : ' incompatível com CAP: '}${a.Ds_Tipo_Lancamento}`;
                a.icon = enumTipoLancamentoPlanoConta.getIcon(a.Cd_Tipo_Lancamento);
            });
            return result.sort((a, b) => a.disabled - b.disabled);
        },
    });
    this.categoria = new FetchData(`${pathBase}/contasapagar/categoria`);
    this.chequeTerceiros = new FetchData(`${pathBase}/contasapagar/chequeTerceiros`, undefined, { key: 'Nr_Folha_Cheque' });
    this.contasCorrentes = new FetchData(`${pathBase}/contasapagar/contasCorrentes`, undefined, {
        key: 'Key',
        fn: (result) => new Promise(async (resolve) => {
            let bancos = dataSource.contasCorrentes.data
                .map(a => a.Banco)
                .filter(a => a)
                .map(a => parseInt(a));
            bancos = [...new Set(bancos)];
            const guid = new DevExpress.data.Guid().toString();
            const listaImagens = await fetch(`${pathBase}/contasapagar/imagens/bancos`)
                .then(a => a.json())
                .then(a => a.DataResult)
                .catch(() => []);
            const listaImagensKeys = Object.getOwnPropertyNames(listaImagens);
            bancos = bancos.map(a => {
                const str = a.toString();
                return {
                    banco: a,
                    icon: `../img/bancos/${listaImagensKeys.includes(str) ? listaImagens[str] : 'banco-sem-foto.png'}?v=${guid}`,
                }
            });
            resolve(
                result.map(a => {
                    return {
                        ...a,
                        disabled: !a.disabled,
                        icon: bancos.find(b => b.banco == a.Banco).icon,
                    }
                })
            )
        })
    });
    this.fornecedor = new FetchData(`${pathBase}/contasapagar/fornecedor`);
    this.formasPagamento = new FetchData(`${pathBase}/contasapagar/formasPagamento`, undefined, {
        key: 'Id',
        fn: (result) => {
            result.forEach(a => {
                a.disabled = !a.Status || !a.UsaCAP;
                a.Name = `${a.Name}${a.UsaCAP ? '' : ' [Indisponível no Contas a Pagar]'}`;
            });
            result.sort((a, b) => a.disabled - b.disabled || a.Id - b.Id);
            return result;
        },
    });
    this.parametros = new FetchData(`${pathBase}/contasapagar/parametros`);
    this.centroCusto = new FetchData(`${pathBase}/centroCusto`, undefined, {
        key: 'Cd_Centro_Custo',
        fn: (result) => {
            const map = result.map(a => {
                const ret = Object.assign(a);
                ret.disabled = !a.IsActive;
                ret.text = `${a.Cd_Centro_Custo} - ${a.disabled ? '(Inativo) ' : ''}${a.Ds_Centro_Custo}`;
                return ret;
            }).sort((a, b) => a.disabled - b.disabled);
            return map;
        }
    });
    this.parcelasRateioPercentual = [];
    this.lanctoQuitado = [];
    this.rateioCentroCusto = [];
    this.pagamentosQuitacao = [];
    this.pagamentosQuitacaoChequeProprio = [];
    this.chequesTerceirosDisponiveis = [];
}
function createOptionsGridLancamentos() {
    return {
        elementAttr: { class: "removeColumnsFilterHidden", },
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
        grouping: {
            contextMenuEnabled: true,
            expandMode: 'rowClick',
        },
        allowColumnReordering: true,
        groupPanel: { visible: true, emptyPanelText: "Arraste as colunas do grid para esta área para agrupar" },
        paging: { pageSize: 20 },
        pager: {
            visible: true,
            allowedPageSizes: [10, 20, 50, 100],
            showPageSizeSelector: true,
            showNavigationButtons: true
        },
        loadPanel: {
            enabled: true,
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Contas a Pagar');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'TítulosPagar.xlsx');
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
        columnChooser: { enabled: true, allowSearch: true, },
        columns: [
            {
                type: "selection",
                width: 30,
                allowResizing: false
            },
            {
                dataField: "Ds_Situacao_Lancamento", //CRIAR
                caption: "Situação",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Cd_Filial",
                caption: "Filial",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                width: 68,
                visible: false
            },
            {
                dataField: "Nr_Lancamento",
                caption: "Lancto",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid"
            },
            {
                dataField: "Nr_Parcela_Atual",
                caption: "Parcela",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                width: 50
            },
            {
                dataField: "Nr_Parcelas_Total",
                caption: "Total Parcelas",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                width: 52
            },
            {
                dataField: "Nr_Documento",
                caption: "Docto",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid"
            },
            {
                dataField: "Ds_Fornecedor", //CRIAR
                caption: "Fornecedor",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "left",
                cssClass: "column-data-grid",
                width: 250
            },
            {
                dataField: "Lancamento_Agrupado", //CRIAR, colocar sim nos que forem true
                caption: "Lancto Agrup",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                width: 75
            },
            {
                dataField: "Cd_Situacao_Lancamento",
                caption: "Código Situação",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Cd_Fornecedor",
                caption: "Código Fornecedor",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Ds_Razao_Social", //CRIAR
                caption: "Razão Social Fornecedor",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "left",
                cssClass: "column-data-grid",
                visible: false,
                width: 250
            },
            {
                dataField: "Ds_Fantasia", //CRIAR
                caption: "Fantasia Fornecedor",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "left",
                cssClass: "column-data-grid",
                visible: false,
                width: 250
            },
            {
                dataField: "Ds_Historico",
                caption: "Histórico/Observação",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "left",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Ds_Historico_Cancelamento",
                caption: "Histórico Cancelamento",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "left",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Cd_Centro_Custo",
                caption: "Código Centro de Custo",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Ds_Centro_Custo", //CRIAR
                caption: "Centro de Custo",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "left",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Cd_Completo_Plano_Conta", //CRIAR
                caption: "Plano Conta",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "left",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Ds_Plano_Conta", //CRIAR
                caption: "Nome Conta Contábil",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "left",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Cd_Categoria",
                caption: "Código Categoria",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Ds_Categoria", //CRIAR
                caption: "Categoria",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "left",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Cd_Login",
                caption: "Login Lançamento",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Controla_Recebimento_Boleto", //CRIAR, colocar sim nos que forem true
                caption: "Boleto Pendente",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                visible: true,
                width: 88
            },
            {
                dataField: "Cd_Tipo_Pagamento", //CRIAR
                caption: "CNAB Forma",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                visible: true,
                width: 75
            },
            {
                dataField: "Cd_Boleto_Pagamento",
                caption: "Código Barras Boleto",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Arquivo_Cnab_Gerado", //CRIAR, colocar sim nos que forem true
                caption: "CNAB Gerado",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                cssClass: "column-data-grid",
                visible: true,
                width: 79
            },
            {
                dataField: "Dt_Vencimento",
                caption: "Vencto",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                dataType: "date",
                format: "dd/MM/yyyy",
                cssClass: "column-data-grid",
                sortOrder: "asc",
                width: 105
            },
            {
                dataField: "Dt_Competencia", //CRIAR
                caption: "Competência",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                dataType: "date",
                format: "MM/yyyy",
                cssClass: "column-data-grid",
                visible: false,
                editorOptions: {
                    calendarOptions: {
                        maxZoomLevel: 'year',
                        zoomLevel: 'year',
                    },
                },
            },
            {
                dataField: "Dt_Lancamento",
                caption: "Data Lançamento",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                dataType: "date",
                format: "dd/MM/yyyy",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Dt_Emissao_Documento",
                caption: "Data Emissão Documento",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                dataType: "date",
                format: "dd/MM/yyyy",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Dt_Pagamento",
                caption: "Data Pagamento",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                dataType: "date",
                format: "dd/MM/yyyy",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Dt_Baixa",
                caption: "Data Baixa",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                alignment: "center",
                dataType: "date",
                format: "dd/MM/yyyy",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Vl_Parcela",
                caption: "Valor Título",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                allowFiltering: true,
                alignment: "right",
                format: "###,###,###,###,##0.00",
                cssClass: "column-data-grid"
            },
            {
                dataField: "Vl_Desconto",
                caption: "Valor Desconto",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                allowFiltering: true,
                alignment: "right",
                format: "###,###,###,###,##0.00",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Vl_Juros",
                caption: "Valor Juros",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                allowFiltering: true,
                alignment: "right",
                format: "###,###,###,###,##0.00",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Vl_Multa",
                caption: "Valor Multa",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                allowFiltering: true,
                alignment: "right",
                format: "###,###,###,###,##0.00",
                cssClass: "column-data-grid",
                visible: false
            },
            {
                dataField: "Vl_Pago",
                caption: "Valor Pago",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                allowFiltering: true,
                alignment: "right",
                format: "###,###,###,###,##0.00",
                cssClass: "column-data-grid"
            },
            {
                dataField: "Vl_Saldo_Pagar",
                caption: "Valor Saldo",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                allowFiltering: true,
                alignment: "right",
                format: "###,###,###,###,##0.00",
                cssClass: "column-data-grid"
            }
        ],
        summary: {
            totalItems: [{
                column: 'Nr_Lancamento',
                summaryType: 'count',
                displayFormat: "{0} Títulos",
            }, {
                column: 'Vl_Parcela',
                summaryType: 'sum',
                valueFormat: "###,###,###,##0.00",
                displayFormat: "{0}",
            }, {
                column: 'Vl_Desconto',
                summaryType: 'sum',
                valueFormat: "###,###,###,##0.00",
                displayFormat: "{0}",
            }, {
                column: 'Vl_Juros',
                summaryType: 'sum',
                valueFormat: "###,###,###,##0.00",
                displayFormat: "{0}",
            }, {
                column: 'Vl_Multa',
                summaryType: 'sum',
                valueFormat: "###,###,###,##0.00",
                displayFormat: "{0}",
            }, {
                column: 'Vl_Pago',
                summaryType: 'sum',
                valueFormat: "###,###,###,##0.00",
                displayFormat: "{0}",
            }, {
                column: 'Vl_Saldo_Pagar',
                summaryType: 'sum',
                valueFormat: "###,###,###,##0.00",
                displayFormat: "{0}",
            }
            ],
        },
        showBorders: true,
        onCellPrepared: (e) => {
            if (e.rowType === "data") {

                //var date1 = new Date(e.data.DT_VENCIMENTO + ' 00:00:00 GMT');
                //var date2 = new Date();

                ////Calcula o tempo em milisegundos entre as duas datas
                //var diferenteEntreDatas = date2.getTime() - date1.getTime();

                ////Converte para dias  intervela entre as datas
                ////var diferenteEntreDatas = parseInt(diferenteEntreDatas / (1000 * 3600 * 24));
                //var diferenteEntreDatas = diferenteEntreDatas / (1000 * 3600 * 24);

                //console.log('diferença entre datas - ', diferenteEntreDatas);

                ////Verifica se o título está atrasado
                //if ( e.column.dataField === "DT_VENCIMENTO" && diferenteEntreDatas >= 1 && e.data.CD_SITUACAO_LANCAMENTO == 1 ) {
                //    //Título vencido
                //    e.cellElement.css("color", "#d00000");
                //    e.cellElement.css("font-weight", "bold");
                //};

                if (e.column.dataField === "Nr_Lancamento") {
                    const classe = {
                        1: 'aberto',
                        2: 'quitado',
                        3: 'cancelado',
                    }[e.data.Cd_Situacao_Lancamento];
                    e.cellElement.addClass(classe).addClass('status-indicator');
                };

                //Verifica se o título vence hoje ou já está vencido
                const diffVencimentoParaHoje = moment(e.data.Dt_Vencimento).diff(moment(e.data.Hoje), 'day');
                if (e.data.Cd_Situacao_Lancamento == enumSituacaoLancamento.Aberto && diffVencimentoParaHoje <= 0) {
                    if (e.column.dataField === "Dt_Vencimento") {
                        e.cellElement.css({
                            color: diffVencimentoParaHoje == 0 ? '#4a4e69' : '#d2322d',
                            fontWeight: "bold",
                        });
                        e.cellElement.addClass('status-indicator').addClass(diffVencimentoParaHoje == 0 ? 'venceHoje' : 'atrasado');
                    };
                }
            }
        },
    }
}
function LoadConsultaTitulos() {
    const load = this;
    this.filtrosConsulta = {
        dataInicial: null,
        dataFinal: null,
        tipoData: enumTiposData.Vencimento,
        situacao: enumSituacaoLancamento.Aberto,
        set: function (p) {
            if (!p || typeof p !== 'object')
                return;

            const filteredP = {};
            Object.keys(this).forEach(key => {
                if (key in p)
                    filteredP[key] = p[key];
            });

            const propertiesToCheck = Object.keys(filteredP)
                .filter(key => typeof this[key] !== 'function');

            const isDifferent = propertiesToCheck
                .some(key => this[key] !== filteredP[key]);

            const $icon = load.refreshButton.element().find('.fa-rotate');
            if (isDifferent) {
                $icon.addClass('fa-beat-fade');
                load.showRefreshText(true);
            } else {
                $icon.removeClass('fa-beat-fade');
                load.showRefreshText(false);
            }
        },
    };
    this.gridConsultaTitulos = new DevExpress.ui.dxDataGrid("#gridConsultaTitulos", {
        ...createOptionsGridLancamentos(),
        ...{
            dataSource: new DevExpress.data.DataSource({
                key: ['Nr_Lancamento', 'Nr_Parcela_Atual'],
                loadMode: 'raw',
                load: async () => await dataSource.titulos.promise.then(result => {
                    this.filtrosConsulta.tipoData = this.refreshButton?.parametros?.tipoData ?? this.filtrosConsulta.tipoData;
                    this.filtrosConsulta.situacao = this.refreshButton?.parametros?.situacao ?? this.filtrosConsulta.situacao;
                    this.filtrosConsulta.dataFinal = this.refreshButton?.parametros?.dataFinal ?? this.filtrosConsulta.dataFinal;
                    this.filtrosConsulta.dataInicial = this.refreshButton?.parametros?.dataInicial ?? this.filtrosConsulta.dataInicial;

                    if (!this.filtrosConsulta.dataInicial || !this.filtrosConsulta.dataFinal) {
                        const dates = result.map(a => moment(a[enumTiposData.getNome(this.filtrosConsulta.tipoData)]));
                        const dateRange = dxComp.consultaTitulos.dateRange.getComponent();

                        const min = moment.min(dates);
                        const max = moment.max(dates);

                        if (!this.filtrosConsulta.dataInicial) {
                            this.filtrosConsulta.dataInicial = min.format('YYYY-MM-DD');
                            dateRange.setEndDate(min);
                            dateRange.setStartDate(min);
                        }
                        if (!this.filtrosConsulta.dataFinal) {
                            this.filtrosConsulta.dataFinal = max.format('YYYY-MM-DD');
                            dateRange.setEndDate(max);
                        }
                    }

                    return result;
                }),
            }),
            selection: {
                mode: 'multiple',
                showCheckBoxesMode: 'always',
                deferred: true,
            },
            focusedRowEnabled: true,
            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxSelectBox',
                        options: {
                            dataSource: new DevExpress.data.DataSource({
                                key: 'id',
                                store: [
                                    { id: 3, text: "Emissão" },
                                    { id: 0, text: "Vencimento" },
                                    { id: 2, text: "Lançamento" },
                                    { id: 1, text: "Pagamento" },
                                    { id: 4, text: "Baixa" },
                                ],
                            }),
                            displayExpr: 'text',
                            valueExpr: 'id',
                            value: this.filtrosConsulta.tipoData,
                            width: 100,
                            showClearButton: false,
                            onInitialized: (e) => {
                                const $popover = $('<div>').text('Filtro pelo tipo de data');
                                $('body').append($popover);
                                new DevExpress.ui.dxPopover($popover, {
                                    target: e.element,
                                    showEvent: 'mouseenter',
                                    hideEvent: 'mouseleave',
                                });
                                this.filtroDataTitulos = e.component;
                            },
                            onValueChanged: (e) => {
                                this.filtrosConsulta.set({ tipoData: e.value });
                            }
                        },
                    },
                    {
                        location: 'after',
                        locateInMenu: 'never',
                        template: () => {
                            const $div = $('<div>');
                            const $dateRange = $('<input class="dateRange dx-texteditor dx-editor-outlined">').daterangepicker({
                                timePicker: false,
                                autoApply: true,
                                showDropdowns: true,
                                drops: 'auto',
                                startDate: moment(),
                                endDate: moment(),
                                locale: {
                                    format: 'DD/MM/YYYY',
                                    separator: ' ▶ ',
                                    applyLabel: 'Confirmar',
                                    cancelLabel: 'Cancelar',
                                    fromLabel: "De",
                                    toLabel: "Até",
                                    daysOfWeek: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
                                    monthNames: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
                                    firstDay: 0
                                }
                            }, (start, end) => {
                                this.filtrosConsulta.set({
                                    dataInicial: start.format('YYYY-MM-DD'),
                                    dataFinal: end.format('YYYY-MM-DD'),
                                });
                            });
                            const $popover = $('<div>').text('Período de consulta');
                            $('body').append($popover);
                            new DevExpress.ui.dxPopover($popover, {
                                target: $dateRange,
                                showEvent: 'mouseenter',
                                hideEvent: 'mouseleave',

                            });
                            this.dateRange = {
                                element: $dateRange,
                                getComponent: () => $dateRange.data('daterangepicker'),
                            };
                            $div.append($dateRange);
                            return $div;
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxSelectBox',
                        options: {
                            dataSource: new DevExpress.data.DataSource({
                                key: 'id',
                                store: [
                                    { id: 0, text: "Todos os títulos" },
                                    { id: 1, text: "Somente Títulos Abertos" },
                                    { id: 2, text: "Somente Títulos Quitados" },
                                    { id: 3, text: "Somente Títulos Cancelados" },
                                ],
                            }),
                            displayExpr: 'text',
                            valueExpr: 'id',
                            value: 1,
                            width: 200,
                            showClearButton: false,
                            onInitialized: (e) => {
                                const $popover = $('<div>').text('Filtro pela situação do lançamento');
                                $('body').append($popover);
                                new DevExpress.ui.dxPopover($popover, {
                                    target: e.element,
                                    showEvent: 'mouseenter',
                                    hideEvent: 'mouseleave',
                                });
                                this.filtroSituacao = e.component;
                            },
                            onValueChanged: (e) => {
                                this.filtrosConsulta.set({ situacao: e.value });
                            }
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'fas fa-rotate',
                            onClick: (e) => {
                                const dateRange = this.dateRange.getComponent();
                                const parametros = {
                                    dataInicial: dateRange.startDate.format('YYYY-MM-DD'),
                                    dataFinal: dateRange.endDate.format('YYYY-MM-DD'),
                                    tipoData: this.filtroDataTitulos.option('value'),
                                    situacao: this.filtroSituacao.option('value'),
                                }
                                const $icon = e.element.find('.fa-rotate');
                                $icon.removeClass('fa-beat-fade').addClass('fa-spin');
                                e.component.parametros = parametros;
                                dataSource.titulos.get({
                                    dataInicial: parametros.dataInicial,
                                    dataFinal: parametros.dataFinal,
                                    tipoData: parametros.tipoData,
                                    situacaoLancamento: parametros.situacao == 0 ? null : parametros.situacao,
                                })
                                this.gridConsultaTitulos.getDataSource().reload().then(() => {
                                    const columns = this.gridConsultaTitulos.option('columns');
                                    columns.forEach((a, index) => {
                                        let cols = [
                                            "Dt_Vencimento",
                                            "Dt_Pagamento",
                                            "Dt_lancamento",
                                            "Dt_Emissao_Documento",
                                            "Dt_Baixa",
                                        ];
                                        if (cols.includes(a.dataField))
                                            if (enumTiposData.getNome(this.filtrosConsulta.tipoData) == a.dataField)
                                                this.gridConsultaTitulos.columnOption(index, {
                                                    sortOrder: 'asc',
                                                    visible: true,
                                                })
                                            else
                                                this.gridConsultaTitulos.columnOption(index, {
                                                    sortOrder: null,
                                                    visible: a.dataField == "Dt_Vencimento" ? true : false,
                                                })
                                    });

                                    $icon.removeClass('fa-spin');
                                    this.showRefreshText(false);
                                });
                            },
                            onInitialized: (e) => {
                                const $text = $('<div>').text('Atualiza a lista de títulos a pagar');
                                const $textWaning = $('<div class="font-warning hidden">').text('Atualizar dados');
                                const $popover = $('<div class="text-center">').append($text, $textWaning);
                                $('body').append($popover);
                                new DevExpress.ui.dxPopover($popover, {
                                    target: e.element,
                                    showEvent: 'mouseenter',
                                    hideEvent: 'mouseleave',
                                });
                                this.showRefreshText = (bool) => {
                                    if (bool)
                                        $textWaning.removeClass('hidden');
                                    else
                                        $textWaning.addClass('hidden');
                                };
                                this.refreshButton = e.component;
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'hierarchy',
                            text: '',
                            hint: 'Fechar ou expandir os agrupamentos',
                            onClick(e) {
                                const dataGrid = $("#gridConsultaTitulos").dxDataGrid('instance');

                                const expanding = e.component.option('text') === 'Expandir Agrupamento';
                                dataGrid.option('grouping.autoExpandAll', expanding);
                                e.component.option('text', expanding ? '' : 'Expandir Agrupamento');
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
            onRowDblClick: (e) => {
                return; //TODO: verificar
                if (e.rowType === "data" && e.column.type !== "selection" && e.column.type !== "adaptive") {
                    if (document.getElementById("cadastroTitulos").style.display === 'none') {

                        closeConsultaTitulosPanel();
                        formataTelaOperacao('A', 354727, 1, 2, 1, 100.25, 100.25);

                        verificaDiferencaTituloQuitacao();
                    }
                }
            },
            onFocusedRowChanged: (e) => {
                e.component.focusRow = e.row;
            }
        }
    });
}
function LoadTitulos() {

    $('#abaDadosTitulo section.toggle label').off('click').on('click', (a) => {
        const $target = $(a.currentTarget);
        const isActive = $target.data('active') ?? true;
        if (isActive)
            rolar_para($target);
        $target.data('active', isActive ? false : true);
    });

    const titulos = this;
    const conferenciaPagtosLanctoQuitado = {
        popover: (() => {
            const $popoverTotalMaior = $('<div class="text-center">');
            const txt = 'Valor total das pagamentos maior<br>que o lançamento!';
            const $textoPopover = $('<b id="meuTexto">').html(txt);
            $popoverTotalMaior.append($textoPopover);
            $('body').append($popoverTotalMaior);
            return new DevExpress.ui.dxPopover($popoverTotalMaior, {
                target: $('#taggleTituloQuitado'),
                showEvent: 'mouseenter',
                hideEvent: 'mouseleave',
                onShowing: (e) => {
                    e.cancel = !e.component.mostrarPopover;
                },
                onInitialized: (e) => {
                    e.component.setStateView = (state = false) => {
                        e.component.mostrarPopover = state;
                        e.component.hide();
                        return e.component;
                    }
                    e.component.alteraTextoPopover = (textoHtml = txt) => {
                        $textoPopover.html(textoHtml);
                        e.component.hide();
                        return e.component;
                    }
                },
            });
        })(),
        taggleTituloQuitado: {
            $: $('#taggleTituloQuitado'),
        },
        memPagoLanctoQuitado: {
            $: $('#memPagoLanctoQuitado'),
            name: '#memPagoLanctoQuitado'
        },
        memSaldoLanctoQuitado: {
            $: $('#memSaldoLanctoQuitado'),
            name: '#memSaldoLanctoQuitado',
        },
        memTotalLanctoQuitado: {
            $: $('#memTotalLanctoQuitado'),
            name: 'memTotalLanctoQuitado',
        },
        conferenciaPagtosLanctoQuitado: {
            $: $('#conferenciaPagtosLanctoQuitado').off('resize').on('resize', () => {
                $('.valoresPgtoQuitado').each((index, element) => {
                    const span = $(element);
                    const containerWidth = span.parent().width();
                    span.css('font-size', containerWidth > 65 ? "14px" : "clamp(9px, 0.91vw, 14px)");
                });
            }),
            name: '#conferenciaPagtosLanctoQuitado'
        },
        show: function () {
            if (this.conferenciaPagtosLanctoQuitado.$.is(':hidden')) {
                animateCSS(this.conferenciaPagtosLanctoQuitado.name, 'fadeIn');
            }
            return this;
        },
        hide: function () {
            if (this.conferenciaPagtosLanctoQuitado.$.is(':visible')) {
                animateCSS(this.conferenciaPagtosLanctoQuitado.name, 'fadeOut', 'out');
            }
            return this;
        },
        alterarValores: function ({ pago, saldo, total }) {
            this.memPagoLanctoQuitado.$.text('R$ ' + (!pago ? '-' : pago.toString().replace('.', ',')));
            this.memSaldoLanctoQuitado.$.text('R$ ' + (!saldo ? '-' : saldo.toString().replace('.', ',')));
            this.memTotalLanctoQuitado.$.text('R$ ' + (!total ? '-' : total.toString().replace('.', ',')));
            const alertClass = saldo == 0 ? 'alert-success' : saldo > 0 ? 'alert-warning' : 'alert-danger';
            this.conferenciaPagtosLanctoQuitado.$
                .removeClass(['alert-warning', 'alert-danger', 'alert-success'])
                .addClass(alertClass);
            const isOk = alertClass == 'alert-success';
            this.taggleTituloQuitado.$.parent()[isOk ? 'removeClass' : 'addClass']('pulse-border');
            if (isOk) {
                this.popover.setStateView().alteraTextoPopover();
                return this;
            }
            const color = {
                'alert-warning': ['rgb(157 136 2 / 40%)', 'Ainda há saldo a pagar'],
                'alert-danger': ['rgb(220 53 69 / 40%)', 'Saldo menor que o valor dos pagamentos,<br>verifique os valores adicionados'],
            }[alertClass];
            this.taggleTituloQuitado.$.parent().css('--color-pulse-custom-1', color[0]);
            this.popover.setStateView(true).alteraTextoPopover(color[1]);
            return this;
        },
        verificar: function () {
            const isPagamentoQuitado = titulos.check_lancamento_quitado.option('value') || false;
            if (!isPagamentoQuitado) {
                return this;
            }
            const valorTotal = titulos.nbx_Vl_Total_Titulo.option('value');
            const dataSource = titulos.gridPagamentosLanctoQuitado.option('dataSource')?._store?._array;
            if (!dataSource || dataSource.length == 0) {
                titulos.nbx_Vl_Juros.reset();
                titulos.nbx_Vl_Multa.reset();
                titulos.nbx_Vl_Desconto.reset();
                return this.alterarValores({ saldo: valorTotal, total: valorTotal });
            }
            const [juros, multa, desconto] = [
                Number(titulos.nbx_Vl_Juros.option('value')),
                Number(titulos.nbx_Vl_Multa.option('value')),
                Number(titulos.nbx_Vl_Desconto.option('value')),
            ];
            const pagamentos = titulos.gridPagamentosLanctoQuitado.getTotalSummaryValue('totalPagamento');
            const saldo = valorTotal - pagamentos + juros + multa - desconto;
            return this.alterarValores({ pago: pagamentos, saldo: saldo, total: valorTotal });
        }
    }

    this.check_rateio_centro = new DevExpress.ui.dxCheckBox('#check_rateio_centro', {
        text: "Ratear entre centro de custos",
        value: false,
        onValueChanged: (e) => {
            conferenciaRateio.taggleRateioCentroCusto.$.parent().removeClass('pulse-border');
            if (e.value) {
                conferenciaRateio.verificar();
            }

            const [
                animation,
                operation,
                state
            ] = e.value ? ['fadeIn', 'in', ':hidden'] : ['fadeOut', 'out', ':visible'];

            if (e.component.toggle.$.is(state)) {
                animateCSS(e.component.toggle.name, animation, operation);
            }
        },
        onInitialized: (e) => {
            const name = '#taggleRateioCentroCusto';
            e.component.toggle = {
                $: $(name),
                name: name,
            };
        },
    })
    this.check_lancamento_quitado = new DevExpress.ui.dxCheckBox('#check_lancamento_quitado', {
        text: "Lançamento quitado",
        value: false,
        onValueChanged: (e) => {
            conferenciaPagtosLanctoQuitado.taggleTituloQuitado.$.parent().removeClass('pulse-border');
            if (e.value) {
                conferenciaPagtosLanctoQuitado.verificar();
            }

            const $hide = e.value ? ['#taggleParcelamento', '#taggleBaixaFutura'] : '#taggleTituloQuitado';
            const $show = !e.value ? ['#taggleParcelamento', '#taggleBaixaFutura'] : '#taggleTituloQuitado';
            animateCSS($hide, 'fadeOut', 'out').then(() => {
                animateCSS($show, 'fadeIn', 'in').then(() => {
                    const $jShow = $($show);
                    if (!$jShow.hasClass('active')) {
                        $jShow.find('label').trigger('click');
                    }
                });
            })
        },
    });
    const valoresAcrescimoDesconto = (name) => ({
        format: 'R$ ###,###,###,##0.00',
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        onValueChanged(option) {
            conferenciaPagtosLanctoQuitado.verificar();
            dxComp.lancamento[name] = option.value;
        },
    }), withDarkRedColor = (name) => ({
        ...valoresAcrescimoDesconto(name),
        ...{
            onContentReady: (e) => {
                e.component.element().find("input").eq(1).css({
                    "color": "darkred",
                });
            },
        }
    });
    this.nbx_Vl_Juros = new DevExpress.ui.dxNumberBox('#nbx_Vl_Juros', withDarkRedColor('Vl_Juros'));
    this.nbx_Vl_Multa = new DevExpress.ui.dxNumberBox('#nbx_Vl_Multa', withDarkRedColor('Vl_Multa'));
    this.nbx_Vl_Desconto = new DevExpress.ui.dxNumberBox('#nbx_Vl_Desconto', valoresAcrescimoDesconto('Vl_Desconto'));
    this.gridPagamentosLanctoQuitado = new DevExpress.ui.dxDataGrid("#gridPagamentosLanctoQuitado", {
        dataSource: new DevExpress.data.DataSource({
            store: dataSource.lanctoQuitado,
        }),
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        editing: {
            mode: 'form',
            allowUpdating: true,
            startEditAction: 'click',
            allowAdding: true,
            allowDeleting: true,
            useIcons: true,
            form: {
                colCount: 4,
                labelMode: 'floating',
                items: [
                    {
                        colSpan: 2,
                        dataField: 'CD_CENTRO_CUSTO',
                        label: {
                            text: 'Centro de Custo'
                        }
                    },
                    {
                        colSpan: 2,
                        dataField: 'CD_PLANO_CONTA',
                        label: {
                            text: 'Plano de Contas'
                        }
                    },
                    {
                        colSpan: 2,
                        dataField: 'CD_CONTA_CORRENTE',
                        label: {
                            text: 'Conta Corrente'
                        }
                    },
                    {
                        colSpan: 2,
                        dataField: 'CD_FORMA_PAGAMENTO',
                        label: {
                            text: 'Forma de Pagamento'
                        }
                    },
                    {
                        colSpan: 2,
                        dataField: 'DS_HISTORICO',
                        label: {
                            text: 'Histórico (0/80)'
                        }
                    },
                    {
                        colSpan: 1,
                        dataField: 'DT_PAGAMENTO',
                        label: {
                            text: 'Data Pagamento'
                        }
                    },
                    {
                        colSpan: 1,
                        dataField: 'VL_PAGAMENTO',
                        label: {
                            text: 'Valor Pagamento'
                        }
                    },
                ]
            },
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
        allowColumnReordering: false,
        groupPanel: {
            visible: false,
            emptyPanelText: "Arraste as colunas do grid para esta área para agrupar"
        },
        paging: {
            pageSize: 15
        },
        pager: {
            visible: true,
            //allowedPageSizes: [15, 20, 50, 100],
            //showPageSizeSelector: true,
            showNavigationButtons: true
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
        summary: {
            totalItems: [
                {
                    column: 'CD_CONTA_CORRENTE',
                    summaryType: 'count',
                    displayFormat: "{0} Pagamento(s)",
                },
                {
                    column: 'VL_PAGAMENTO',
                    summaryType: 'sum',
                    valueFormat: "###,###,###,##0.00",
                    displayFormat: "{0}",
                    name: 'totalPagamento',
                },
            ],
        },
        columns: [
            {
                dataField: "CD_FORMA_PAGAMENTO",
                caption: "FORMA DE PAGAMENTO",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Forma de Pagamento obrigatória', }],
                lookup: {
                    dataSource: dataSource.formasPagamento.dxDataSource,
                    searchExpr: 'Name',
                    valueExpr: 'Id',
                    displayExpr: 'Name',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Forma de Pagamento',
                        width: 400,
                    },
                },
                editorOptions: {
                    wrapItemText: true,
                    onInitialized({ component }) {
                        component.option({
                            buttons: [
                                {
                                    name: 'add',
                                    location: 'after',
                                    options: {
                                        icon: 'plus',
                                        onClick() {
                                            window.open(urlsLegado.get(49));
                                        },
                                        onInitialized({ element }) {
                                            element.createPopover("Abrir nova aba no cadastro de Forma de Pagamento");
                                        }
                                    },
                                },
                                {
                                    name: 'refresh',
                                    location: 'after',
                                    options: {
                                        icon: 'refresh',
                                        onClick() {
                                            component.option('disabled', true);
                                            dataSource.formasPagamento.get();
                                            component.getDataSource().reload()
                                                .then(() => component.option({
                                                    disabled: false,
                                                    value: null,
                                                    validationStatus: 'valid',
                                                }));
                                        },
                                        onInitialized({ element }) {
                                            element.createPopover("Atualizar lista de Formas de Pagamento");
                                        }
                                    },
                                },
                                'dropDown'
                            ],
                        })
                    },
                },
            },
            {
                dataField: "CD_CONTA_CORRENTE",
                caption: "CONTA CORRENTE",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Conta Corrente obrigatória', }],
                lookup: {
                    dataSource: dataSource.contasCorrentes.dxDataSource,
                    searchExpr: 'DescricaoConta',
                    displayExpr: 'DescricaoConta',
                    valueExpr: 'Key',
                },
                editorOptions: {
                    wrapItemText: true,
                    onInitialized: (e) => {
                        const { component } = e;
                        this.gridPagamentosLanctoQuitado.CD_CONTA_CORRENTE = component;
                        component.option({
                            buttons: [
                                {
                                    name: 'add',
                                    location: 'after',
                                    options: {
                                        icon: 'plus',
                                        onClick() {
                                            window.open(urlsLegado.get(22));
                                        },
                                        onInitialized({ element }) {
                                            element.createPopover("Abrir nova aba no cadastro de Conta Corrente");
                                        }
                                    },
                                },
                                {
                                    name: 'refresh',
                                    location: 'after',
                                    options: {
                                        icon: 'refresh',
                                        onClick() {
                                            component.option('disabled', true);
                                            dataSource.contasCorrentes.get();
                                            component.getDataSource().reload()
                                                .then(() => component.option({
                                                    disabled: false,
                                                    value: null,
                                                    validationStatus: 'valid',
                                                }));
                                        },
                                        onInitialized({ element }) {
                                            element.createPopover("Atualizar lista de Contas de Correntes");
                                        }
                                    },
                                },
                                'dropDown'
                            ],
                        })
                    },
                },
            },
            {
                dataField: "CD_CENTRO_CUSTO",
                caption: "CENTRO DE CUSTO",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Centro de Custo obrigatório', }],
                lookup: {
                    dataSource: dataSource.centroCusto.dxDataSource,
                    searchExpr: 'text',
                    valueExpr: 'Cd_Centro_Custo',
                    displayExpr: 'text',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Centro de Custo',
                        width: 400,
                    },
                },
                editorOptions: {
                    wrapItemText: true,
                    onInitialized({ component }) {
                        component.option({
                            buttons: [
                                {
                                    name: 'add',
                                    location: 'after',
                                    options: {
                                        icon: 'plus',
                                        onClick() {
                                            window.open(urlsLegado.get(17));
                                        },
                                        onInitialized({ element }) {
                                            element.createPopover("Abrir nova aba no cadastro de Centro de custo");
                                        }
                                    },
                                },
                                {
                                    name: 'refresh',
                                    location: 'after',
                                    options: {
                                        icon: 'refresh',
                                        onClick() {
                                            component.option('disabled', true);
                                            dataSource.centroCusto.get();
                                            component.getDataSource().reload()
                                                .then(() => component.option({
                                                    disabled: false,
                                                    value: null,
                                                    validationStatus: 'valid',
                                                }));
                                        },
                                        onInitialized({ element }) {
                                            element.createPopover("Atualizar lista de Centros de custo");
                                        }
                                    },
                                },
                                'dropDown'
                            ],
                        })
                    },
                },
            },
            {
                dataField: "CD_PLANO_CONTA",
                caption: "PLANO DE CONTA",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Conta obrigatória', }],
                lookup: {
                    dataSource: dataSource.planoConta.dxDataSource,
                    searchExpr: ['Cd_Completo_Plano_Conta', 'Ds_Plano_Conta', 'text'],
                    valueExpr: 'Cd_Plano_Conta',
                    displayExpr: 'text',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Plano de Conta',
                        width: 400,
                    },
                },
                editorOptions: {
                    wrapItemText: true,
                    onInitialized({ component }) {
                        component.option({
                            buttons: [
                                {
                                    name: 'add',
                                    location: 'after',
                                    options: {
                                        icon: 'plus',
                                        onClick() {
                                            window.open(urlsLegado.get(16));
                                        },
                                        onInitialized({ element }) {
                                            element.createPopover("Abrir nova aba no cadastro de Plano de Contas");
                                        }
                                    },
                                },
                                {
                                    name: 'refresh',
                                    location: 'after',
                                    options: {
                                        icon: 'refresh',
                                        onClick() {
                                            component.option('disabled', true);
                                            dataSource.planoConta.get();
                                            component.getDataSource().reload()
                                                .then(() => component.option({
                                                    disabled: false,
                                                    value: null,
                                                    validationStatus: 'valid',
                                                }));
                                        },
                                        onInitialized({ element }) {
                                            element.createPopover("Atualizar lista de Planos de Contas");
                                        }
                                    },
                                },
                                'dropDown'
                            ],
                        })
                    },
                },
            },
            {
                dataField: "DS_HISTORICO",
                caption: "HISTÓRICO",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                editorOptions: {
                    spellcheck: true,
                    maxLength: 80,
                    onInput: (e) => {
                        const { text, maxLength } = e.component.option();
                        e.component.option('label', `Histórico (${text.length}/${maxLength})`);
                    },
                }
            },
            {
                dataField: "DT_PAGAMENTO",
                caption: "DATA PAGTO",
                width: 90,
                sortOrder: 'asc',
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                dataType: "date",
                format: "dd/MM/yyyy",
                editorOptions: { useMaskBehavior: true },
                alignment: 'center',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Data do pagamento obrigatória', }],
            },
            {
                dataField: "VL_PAGAMENTO",
                caption: "VALOR PAGAMENTO",
                width: 80,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                dataType: "number",
                alignment: 'right',
                cssClass: "column-data-grid",
                format: "###,###,###,##0.00",
                editorOptions: {
                    min: 0.01,
                    format: "###,###,###,##0.00",
                },
                validationRules: [{ type: 'required', message: 'Valor do pagamento obrigatório', }],
            },
            {
                type: "buttons",
                cssClass: "column-data-grid",
                buttons: ["edit", "delete"]
            }
        ],
        onExporting: (e) => {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Pagamentos');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], {
                        type: 'application/octet-stream'
                    }), 'PagamentosQuitacaoNoLancamento.xlsx');
                });
            });
            e.cancel = true;
        },
        onRowPrepared: () => {
            return; //TODO: verificar função
            //Verifica se existe diferença entre a somatória dos pagamentos para lançamento de títulos já quitado e o valor total do título
            verificaDiferencaTituloPagtosLanctoQuitado();
        },
        onRowInserting: (e) => {
            const conta = dataSource.contasCorrentes.data.find(a => a.Key.toUpperCase() == e.data.CD_CONTA_CORRENTE.toUpperCase())
            e.data.filiais = conta?.Filiais;
            conferenciaPagtosLanctoQuitado.verificar();
        },
        onInitialized: (e) => {
            ['onRowInserted', 'onRowRemoved', 'onRowUpdated'].forEach(a => e.component.option(a, () => conferenciaPagtosLanctoQuitado.verificar()));
            e.component.loadData = (data) => {
                e.component.option('dataSource', new DevExpress.data.DataSource({
                    store: data,
                }));
            }
            const excluirPagamentos = {
                location: 'after',
                widget: 'dxButton',
                name: 'removerPagamentos',
                options: {
                    icon: 'trash',
                    text: 'Excluir Pagamentos',
                    hint: "Excluir todos os pagamentos",
                    onClick: () => {
                        const dataSource = e.component.option('dataSource');
                        if (dataSource._store._array.length == 0) {
                            messages.info("Sem pagamentos", "Não existe pagamentos para excluir");
                            return;
                        }
                        dxComp.popups.popupConfirmacao().then((excluir) => {
                            if (!excluir) {
                                return;
                            }
                            dataSource._store._array = [];
                            e.component.option('dataSource', dataSource);
                            messages.success("Limpar grid", "Pagamentos excluídos com sucesso");
                            conferenciaPagtosLanctoQuitado.verificar();
                        });
                    },
                },
            };
            const addRow = {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'plus',
                    hint: "Adicionar parcela",
                    onClick: async () => {
                        await loadComponentesAzrFramework[0];
                        const filial = this.lkp_filial_ApenasAtivasPorUsuario;
                        const validate = filial.validator.validate();
                        if (!validate.isValid || !validaValorDataVencimento(true)) {
                            messages.info('Filial inválida', 'Verifique a filial antes de adicionar novos pagamentos quitados');
                            rolar_para('#' + filial.element()[0].id);
                            return;
                        }
                        e.component.addRow();
                    },
                },
            };
            const texto = {
                location: 'before',
                template: () => {
                    return $('<div class="d-flex align-items-center">').append(
                        $('<h6 class="mb-0 mt-0 ml-2 mr-2 informer">')
                            .text('CLIQUE NO ÍCONE'),
                        $('<i class="fa-regular fa-square-plus fa-xl">')
                            .css('cursor', 'pointer')
                            .on('click', addRow.options.onClick),
                        $('<h6 class="mb-0 mt-0 ml-2 informer">')
                            .text('PARA ADICIONAR PAGAMENTOS PARA QUITAÇÃO')
                    );
                },
            };
            const toolbar = {
                items: [excluirPagamentos, addRow, texto],
            };
            e.component.option('toolbar', toolbar);
            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) e.component.updateDimensions();
                });
            }).observe(e.element[0]);
        },
    });
    this.txt_Ds_Historico = new DevExpress.ui.dxTextBox('#txt_Ds_Historico', {
        labelMode: 'floating',
        label: 'Histórico/Observação (0/80)',
        maxLength: 80,
        showClearButton: true,
        onInput: (e) => {
            const { text, maxLength } = e.component.option();
            e.component.option('label', `Histórico/Observação (${text.length}/${maxLength})`);
        },
        onInitialized: (e) => {
            const validator = new DevExpress.ui.dxValidator(e.element, {
                validationGroup: "dadosTitulo",
                validationRules: [{ type: 'required', message: 'Histórico Obrigatório', }],
            });
            e.component.validator = validator;
        },
        onValueChanged(option) {
            dxComp.lancamento.Ds_Historico = option.value;
        },
    });

    this.dt_Vencimento = new DevExpress.ui.dxDateBox('#dt_Vencimento', {
        labelMode: 'floating',
        label: 'Vencimento Base',
        placeholder: '',
        readOnly: false,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        onValueChanged: (e) => {
            if (!this.dt_Competencia.option('value') && e.value) {
                this.dt_Competencia.option('value', e.value);
            }
            dxComp.lancamento.Dt_Vencimento = formatDate(e.value);
        },
        onInitialized: (e) => {
            const validator = new DevExpress.ui.dxValidator(e.element, {
                validationGroup: "dadosTitulo",
                validationRules: [{
                    type: 'required',
                    message: 'Data de Vencimento Obrigatória',
                }],
            });
            e.component.validator = validator;
        },
    });

    this.dt_Competencia = new DevExpress.ui.dxDateBox('#dt_Competencia', {
        labelMode: 'floating',
        label: 'Competência',
        placeholder: '',
        readOnly: false,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'MM/yyyy',
        calendarOptions: {
            maxZoomLevel: 'year',
            zoomLevel: 'year',
        },
        onInitialized: (e) => {
            e.component.getMesAno = () => {
                const value = e.component.option('value');
                const date = moment(value);
                const dataValida = date.isValid();
                return {
                    mes: dataValida ? parseInt(date.format('MM')) : null,
                    ano: dataValida ? parseInt(date.format('YYYY')) : null,
                }
            };
            const validator = new DevExpress.ui.dxValidator(e.element, {
                validationGroup: "dadosTitulo",
                validationRules: [{ type: 'required', message: 'Competência Obrigatória', }],
            });
            e.component.validator = validator;
        },
    });
    this.txt_Nr_Documento = new DevExpress.ui.dxTextBox('#txt_Nr_Documento', {
        labelMode: 'floating',
        label: 'Número do Documento',
        maxLength: 20,
        showClearButton: true,
        onInitialized: (e) => {
            const validator = new DevExpress.ui.dxValidator(e.element, {
                validationGroup: "dadosTitulo",
                validationRules: [{ type: 'required', message: 'Número do Documento Obrigatório', }],
            });
            e.component.validator = validator;
        },
        onValueChanged(option) {
            dxComp.lancamento.Nr_Documento = option.value;
        },
    });
    this.dt_Emissao_Documento = new DevExpress.ui.dxDateBox('#dt_Emissao_Documento', {
        labelMode: 'floating',
        label: 'Emissão Documento',
        placeholder: '',
        readOnly: false,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        onInitialized: (e) => {
            const validator = new DevExpress.ui.dxValidator(e.element, {
                validationGroup: "dadosTitulo",
                validationRules: [{ type: 'required', message: 'Data de Emissão do Documento Obrigatória', }],
            });
            e.component.validator = validator;
        },
        onValueChanged(option) {
            const dateMoment = moment(option.value).format('YYYY-MM-DDTHH:mm:ssZ');
            dxComp.lancamento.Dt_Emissao_Documento = dateMoment;
        },
    });
    this.lkp_Tipo_Pagamento_CNAB = new DevExpress.ui.dxSelectBox('#lkp_Tipo_Pagamento_CNAB', {
        dataSource: new DevExpress.data.DataSource({
            key: 'id',
            store: [
                { id: 0, text: "Não utilizar pagamento via CNAB", },
                { id: 2, text: "Boleto", },
                { id: 1, text: "Transferência bancária", },
            ],
        }),
        searchExpr: 'text',
        displayExpr: 'text',
        valueExpr: 'id',
        value: 0,
        placeholder: 'Selecione a Forma Pagamento',
        labelMode: 'floating',
        label: 'Forma Pagamento - CNAB',
        onSelectionChanged: async (e) => {
            if (!e.selectedItem)
                return;

            const isBoleto = e.selectedItem.id == 2;

            const animation = isBoleto ? ['fadeInUp', 'in'] : ['fadeOutDown', 'out']
            animateCSS(['#div_imagemBoleto'].filter(a => $(a).is(animation[1] == 'in' ? ':hidden' : ':visible')), animation[0], animation[1]);

            if (this.gridParcelasPercentual) {
                const indexColumnOption = this.gridParcelasPercentual.option('columns').findIndex(a => a.dataField == 'CD_BARRAS_BOLETO');
                this.gridParcelasPercentual.columnOption(indexColumnOption, {
                    visible: isBoleto,
                    allowEditing: isBoleto,
                });
            }
        },
        onValueChanged({ value }) {
            dxComp.lancamento.Cd_Tipo_Pagamento = !value ? null : value;
        }
    });
    this.informacaoPagamentoCNAB = $('#informacaoPagamentoCNAB')
        .on('click', () => CreateDxPopUp({
            titulo: 'Pagamento através de arquivo CNAB',
            idTemplate: 'contentPopupPagamentoCNAB',
        }))
        .createPopover('Mais informações sobre pagamento através de arquivo CNAB')
    this.informacaoRecebimentoBoleto = $('#informacaoRecebimentoBoleto')
        .on('click', () => CreateDxPopUp({
            titulo: 'Controle de Recebimento de Boletos',
            idTemplate: 'contentPopupDetalheControleRecebimentoBoleto'
        }))
        .createPopover('Mais informações sobre Controle de Recebimento de Boletos')
    this.ckb_Controla_Recebimento_Boleto = new DevExpress.ui.dxCheckBox('#ckb_Controla_Recebimento_Boleto', {
        value: false,
        text: "Controlar o recebimento do boleto",
        onValueChanged({ value }) {
            dxComp.lancamento.Lg_Controla_Recebimento_Boleto = value ?? false;
        },
    });
    this.nbx_Qt_Parcelas_Fixas = new DevExpress.ui.dxNumberBox('#nbx_Qt_Parcelas_Fixas', {
        value: null,
        min: 1,
        max: 9999,
        maxLength: 5,
        showSpinButtons: true,
        step: 1,
        labelMode: 'floating',
        label: 'Quantidade',
        readOnly: false,
        onInitialized: (e) => {
            const validator = new DevExpress.ui.dxValidator(e.element, {
                validationGroup: "dadosParcelamento",
                validationRules: [{
                    type: 'required',
                    message: 'Quantidade de parcelas obrigatória',
                }],
            });
            e.component.validator = validator;
        },
    });
    this.lkp_Periodicidade_Parcelas_Fixas = new DevExpress.ui.dxSelectBox('#lkp_Periodicidade_Parcelas_Fixas', {
        dataSource: {
            store: new DevExpress.data.ArrayStore({
                key: 'id',
                data: [
                    { id: 30, text: "Mensal" },
                    { id: 7, text: "Semanal" },
                    { id: 14, text: "Quinzenal" },
                    { id: 10, text: "A cada 10 dias" },
                    { id: 20, text: "A cada 20 dias" },
                ],
            })
        },
        searchExpr: 'text',
        displayExpr: 'text',
        valueExpr: 'id',
        value: 30,
        labelMode: 'floating',
        label: 'Periodicidade Parcelas',
        readOnly: false,
        onSelectionChanged: (e) => {
            const objShow = '#div_parcelamentoDiasFixos';
            if (e.selectedItem?.id == 30) {
                animateCSS([objShow].filter(a => $(a).is(':hidden')), 'fadeIn', 'in');
                return;
            };
            animateCSS([objShow].filter(a => $(a).is(':visible')), 'fadeOut', 'out');
        },
    });
    this.ckb_Parcelamento_Dias_Fixos = new DevExpress.ui.dxCheckBox('#ckb_Parcelamento_Dias_Fixos', {
        value: false,
        text: "Dia Fixo (Base data vencimento 1º Parcela)",
    });

    const conferenciaParcelasValorTitulo = {
        popover: (() => {
            const $popover = $('<div class="text-center">');
            const txt = 'Valor total das parcelas maior<br>que o lançamento!';
            const $textoPopover = $('<b id="meuTexto">').html(txt);
            $popover.append($textoPopover);
            $('body').append($popover);
            return new DevExpress.ui.dxPopover($popover, {
                target: $('#taggleParcelamento'),
                showEvent: 'mouseenter',
                hideEvent: 'mouseleave',
                onShowing: (e) => {
                    e.cancel = !e.component.mostrarPopover;
                },
                onInitialized: (e) => {
                    e.component.setStateView = (state = false) => {
                        e.component.mostrarPopover = state;
                        e.component.hide();
                        return e.component;
                    }
                    e.component.alteraTextoPopover = (textoHtml = txt) => {
                        $textoPopover.html(textoHtml);
                        e.component.hide();
                        return e.component;
                    }
                },
            });
        })(),
        taggleParcelamento: {
            $: $('#taggleParcelamento'),
            name: '#taggleParcelamento',
        },
        memValorParcelas: {
            $: $('#memValorParcelas'),
            name: '#memValorParcelas'
        },
        memSaldoParcelas: {
            $: $('#memSaldoParcelas'),
            name: '#memSaldoParcelas'
        },
        memTotalTituloParcelas: {
            $: $('#memTotalTituloParcelas'),
        },
        div_conferenciaParcelasValorTitulo: {
            $: $('#div_conferenciaParcelasValorTitulo'),
            name: '#div_conferenciaParcelasValorTitulo'
        },
        show() {
            if (this.div_conferenciaParcelasValorTitulo.$.is(':hidden')) {
                animateCSS(this.div_conferenciaParcelasValorTitulo.name, 'fadeIn');
            }
            return this;
        },
        hide() {
            if (this.div_conferenciaParcelasValorTitulo.$.is(':visible')) {
                animateCSS(this.div_conferenciaParcelasValorTitulo.name, 'fadeOut', 'out');
            }
            return this;
        },
        verificar() {
            const tipoParcelamento = titulos.lkp_Tipo_Parcelamento.option('value');
            if (!tipoParcelamento) {
                return this.hide().alterarValores({});
            }
            const dataSource = titulos.gridParcelasPercentual.option('dataSource.store._array');
            const totalParcelas = dataSource.length == 0 ? 0 : dataSource.map(a => a.VL_PARCELA).reduce((a, b) => a + b);
            const totalTitulo = titulos.nbx_Vl_Total_Titulo.option('value');
            return this.alterarValores({ valor: totalParcelas, saldo: totalTitulo - totalParcelas }).show();
        },
        alterarValores({ valor, saldo }) {
            const toFixed2WithReplace = (vl) => 'R$ ' + (!vl ? '-' : vl.toFixed(2).replace('.', ','));
            const total = titulos.nbx_Vl_Total_Titulo.option('value') ?? 0;
            const parcelas = titulos.gridParcelasPercentual.getDataSource()?.store()?._array;
            const semParcelamento = (parcelas?.length ?? 0) == 0;
            saldo = !saldo || parseFloat(saldo.toFixed(2)) == 0 ? null : saldo;
            const [valorStr, saldoStr, totalStr] = [
                toFixed2WithReplace(valor),
                toFixed2WithReplace(saldo),
                toFixed2WithReplace(total),
            ];
            this.memValorParcelas.$.text(valorStr);
            this.memSaldoParcelas.$.text(saldoStr);
            this.memTotalTituloParcelas.$.text(totalStr);
            const alertClass = saldo == 0 || !saldo || semParcelamento ? 'alert-success' : saldo > 0 ? 'alert-warning' : 'alert-danger';
            this.div_conferenciaParcelasValorTitulo.$.find('.alert')
                .removeClass(['alert-warning', 'alert-danger', 'alert-success'])
                .addClass(semParcelamento ? 'alert-warning' : alertClass);
            const isOk = alertClass == 'alert-success';
            this.taggleParcelamento.$.parent()[isOk ? 'removeClass' : 'addClass']('pulse-border');

            titulos.gridParcelasPercentual.configureParcelasLancamento(parcelas, total);

            if (isOk) {
                this.popover.setStateView().alteraTextoPopover();
                return this;
            }
            const color = {
                'alert-warning': ['rgb(157 136 2 / 40%)', `Ainda há ${saldoStr} a parcelar,<br>inclua mais parcelas`],
                'alert-danger': ['rgb(220 53 69 / 40%)', `Parcelamento R$ ${Math.abs(saldo).toString().replace('.', ',')} maior que o total,<br>verifique os valores adicionados`],
            }[alertClass];
            this.taggleParcelamento.$.parent().css('--color-pulse-custom-1', color[0]);
            this.popover.setStateView(true).alteraTextoPopover(color[1]);
            return this;
        }
    }

    this.nbx_Vl_Total_Titulo = new DevExpress.ui.dxNumberBox('#nbx_Vl_Total_Titulo', {
        value: null,
        format: 'R$ ###,###,###,##0.00',
        min: 0.01,
        showSpinButtons: true,
        step: 10,
        placeholder: 'Insira o Valor total do título',
        onContentReady: (e) => {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                "color": "darkred",
            });
        },
        onInitialized: (e) => {
            const validator = new DevExpress.ui.dxValidator(e.element, {
                validationGroup: "dadosTitulo",
                validationRules: [{
                    type: 'required',
                    message: 'Valor Total do Título Obrigatório',
                }],
            });
            e.component.validator = validator;
        },
        onValueChanged: (e) => {

            this.gridParcelasPercentual.configureParcelasLancamento();

            const isLancamentoQuitado = this.check_lancamento_quitado.option('value') ?? false;
            if (isLancamentoQuitado) {
                conferenciaPagtosLanctoQuitado.verificar();
            } else {
                const tipoParcelamento = this.lkp_Tipo_Parcelamento.option('value');
                if (tipoParcelamento) {
                    conferenciaParcelasValorTitulo.verificar();
                }
            }

            const dataSourceRateio = dxComp.principaisTitulos.titulo.gridRateioCentroCusto.option('dataSource');
            if (dataSourceRateio.store._array.length == 0) {
                return;
            }
            if (!e.value) {
                dataSourceRateio.store._array = [];
                messages.info("Rateio limpo", "Rateio de centro de custos foi limpo");
            } else {
                const total = dxComp.principaisTitulos.titulo.nbx_Vl_Total_Titulo.option('value');
                dataSourceRateio.store._array.forEach((value, index, arr) => {
                    arr.soma = (index == 0 ? 0 : arr[index - 1].VL_RATEIO) + value.VL_RATEIO
                    value.VL_RATEIO = arr.length == 1 ? total : index == arr.length - 1 ? total - arr.soma : parseFloat((total * (value.PC_RATEIO / 100)).toFixed(2));
                });
                messages.info("Rateio atualizado", "Rateio de centro de custos atualizado para o novo total conforme as porcentagens");
            }
            dxComp.principaisTitulos.titulo.gridRateioCentroCusto.option('dataSource', dataSourceRateio);

            //TODO: acrescentar mensagem confirmando que vai limpar o grid de rateio de centro de custos caso haja rateio

            return;//TODO: verificar função

            //Se o usuário alterou o valor do título, os grids de parcelas deverão ser reiniciados
            if (valorTotalTitulo != e.value) {

                var compGrid = $('#gridParcelasPercentual').dxDataGrid('instance');

                compGrid.option('dataSource', null);

                compGrid.refresh().done(function () {
                    compGrid.option('dataSource', []);
                });

                //Seta a diferença entre a somatória das parcelas para o valor total do título
                diferencaTitulo = e.value;
                verificaDiferencaTituloParcelas();

                //Seta a diferença entre a somatória dos pagamentos para lançamento de títulos já quitado e o valor total do título
                if (operacaoTipo == 'I') {
                    //Valoriza variável com o valor do título a ser utilizado em caso de rateio de parcelas
                    valorTotalTitulo = e.value;

                    verificaDiferencaTituloPagtosLanctoQuitado();
                    verificaDiferencaRateioCentroCustoTitulo();
                } else {
                    //Valoriza variável com o valor do título a ser utilizado em caso de rateio de parcelas
                    valorTotalTitulo = e.value;

                    verificaDiferencaRateioCentroCustoTitulo();
                    verificaDiferencaTituloQuitacao();
                };
            };

            //Valoriza variável com o valor do título a ser utilizado em caso de rateio de parcelas
            valorTotalTitulo = e.value;
        }
    });

    [
        'txt_Ds_Historico',
        'dt_Vencimento',
        'dt_Competencia',
        'txt_Nr_Documento',
        'dt_Emissao_Documento',
    ].forEach(component => addRequiredMark(this[component]));

    this.gridParcelasPercentual = new DevExpress.ui.dxDataGrid('#gridParcelasPercentual', {
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
        allowColumnReordering: false,
        groupPanel: {
            visible: false,
            emptyPanelText: "Arraste as colunas do grid para esta área para agrupar"
        },
        paging: {
            pageSize: 15
        },
        pager: {
            visible: true,
            //allowedPageSizes: [15, 20, 50, 100],
            //showPageSizeSelector: true,
            showNavigationButtons: true
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
        summary: {
            recalculateWhileEditing: true,
            groupItems: [{
                summaryType: "count"
            }],
            totalItems: [
                {
                    column: 'NR_DIAS',
                    summaryType: 'count',
                    displayFormat: "{0} Parcelas",
                },
                {
                    column: 'PC_RATEIO',
                    summaryType: 'sum',
                    valueFormat: "###,###,###,##0.###",
                    displayFormat: "{0}%",
                    name: 'porcentagem',
                },
                {
                    column: 'VL_PARCELA',
                    summaryType: 'sum',
                    valueFormat: "###,###,###,##0.00",
                    displayFormat: "{0}",
                    name: 'parcela',
                }
            ],
        },
        toolbar: {
            items: [
                {
                    location: 'before',
                    template: () => {
                        let $div = $('<div>');
                        let $h6 = $('<h6 class="mb-1 mt-0 ml-2 informer">').text('CLIQUE NO ÍCONE + PARA ADICIONAR PARCELAS');
                        $div.append($h6);
                        return $div;
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'trash',
                        text: 'Excluir parcelas',
                        hint: "Excluir todas as parcelas",
                        onClick: async () => {
                            if (this.gridParcelasPercentual.totalCount() == 0) {
                                messages.info("Nenhuma parcela", "Não há parcelas para exclusão.");
                                return;
                            }
                            const result = await dxComp.popups.popupConfirmacaoExclusaoParcelas.exibir();
                            if (result) {
                                this.gridParcelasPercentual.loadData();
                                messages.success("Exclusão de parcelas", "Parcelas excluídas com sucesso");
                            }
                        },
                    },
                },
            ],
        },
        columns: [
            {
                dataField: 'id',
                caption: '#',
                allowEditing: false,
                allowSorting: true,
                width: 38,
                alignment: 'center',
            },
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
                    const vencimento = moment(this.dt_Vencimento.option('value'));
                    newData.DT_VENCIMENTO = vencimento.add(value, 'day').toDate();

                    if (this.getValueAtualizaCompetencia())
                        newData.DT_COMPETENCIA = newData.DT_VENCIMENTO;

                    return;
                },
            },
            {
                dataField: "PC_RATEIO",
                caption: "% PARCELA",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                dataType: "number",
                format: "###,###,###,##0.###",
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
                    const total = this.nbx_Vl_Total_Titulo.option('value');
                    newData.PC_RATEIO = value ?? 0;
                    newData.VL_PARCELA = parseFloat(((newData.PC_RATEIO / 100) * total).toFixed(2));
                },
            },
            {
                dataField: "DT_VENCIMENTO",
                caption: "DATA VENCIMENTO",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                dataType: "date",
                format: "dd/MM/yyyy",
                editorOptions: {
                    useMaskBehavior: true,
                },
                alignment: 'center',
                cssClass: "column-data-grid",
                validationRules: [{
                    type: 'required',
                    message: 'Data de vencimento obrigatória',
                }],
                setCellValue: (newData, value, currentRowData) => {
                    if (!value)
                        return;
                    const vencimentoParcela = moment(value);
                    const vencimentoBase = moment(this.dt_Vencimento.option('value'));

                    newData.DT_VENCIMENTO = vencimentoParcela.toDate();
                    newData.NR_DIAS = vencimentoParcela.diff(vencimentoBase, 'day');

                    if (this.getValueAtualizaCompetencia())
                        newData.DT_COMPETENCIA = newData.DT_VENCIMENTO;
                },
            },
            {
                dataField: "DT_COMPETENCIA",
                caption: "COMPETÊNCIA",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                dataType: "date",
                format: "MM/yyyy",
                editorOptions: {
                    useMaskBehavior: true,
                    calendarOptions: {
                        maxZoomLevel: 'year',
                        zoomLevel: 'year',
                    },
                },
                alignment: 'center',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Data de competência obrigatória', }],
            },
            {
                dataField: "VL_PARCELA",
                caption: "VALOR PARCELA",
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
                    const total = this.nbx_Vl_Total_Titulo.option('value');
                    newData.VL_PARCELA = value ?? 0;
                    newData.PC_RATEIO = parseFloat(((newData.VL_PARCELA / total) * 100).toFixed(2));
                },
            },
            {
                dataField: "CD_BARRAS_BOLETO",
                caption: "CÓDIGO DE BARRAS DO BOLETO",
                width: 260,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                type: "buttons",
                width: 30,
            }
        ],
        onExporting: (e) => {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Parcelamento Título (percentual)');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], {
                        type: 'application/octet-stream'
                    }), 'ParcelamentoTituloPercentual.xlsx');
                });
            });
            e.cancel = true;
        },
        onRowRemoved: async (e) => {

            if (this.lkp_Tipo_Parcelamento.option('value') != 'F')
                return;

            const parcelas = gerarParcelas(
                this.nbx_Vl_Total_Titulo.option('value'),
                e.component.totalCount(),
                moment(this.dt_Vencimento.option('value')),
                this.getOptionParcelaDiferenca() == 2,
                this.lkp_Periodicidade_Parcelas_Fixas.option('value') ?? 30,
                this.ckb_Parcelamento_Dias_Fixos.option('value') ?? false
            );

            this.gridParcelasPercentual.loadData(parcelas);
        },
        onEditingStart: (e) => {
            if (!validaValorDataVencimento(true)) {
                e.cancel = true;
                e.component.cancelEditData();
            }
        },
        onCellPrepared: (e) => {
            if (e.rowType === "data") {
                if (e.column.dataField === "CD_BARRAS_BOLETO") {
                    e.cellElement.css("background-color", "#EDF3F8");
                }
            }
            if (e.rowType == "totalFooter" && e.column.dataField == "VL_PARCELA") {
                //const summaryValue = e.summaryItems.find(a => a.column == "VL_PARCELA");
                //const total = this.nbx_Vl_Total_Titulo.option('value');
                //const maiorMetodo = parseFloat(summaryValue.value.toFixed(2)) > total ? 'addClass' : 'removeClass';
                //e.component.mostrarPopover = maiorMetodo == 'removeClass';
                //e.cellElement[maiorMetodo]('danger animate__animated animate__headShake animate__infinite');
                //conferenciaParcelasValorTitulo.taggleParcelamento.$[maiorMetodo]('pulse-border');
                //if (!e.component?.$popoverTotalMaior) {
                //    e.component.$popoverTotalMaior = $('<div class="text-center">').html('<b>Valor total das parcelas maior<br>que o lançamento!</b>');
                //    $('body').append(e.component.$popoverTotalMaior);
                //    e.component.popoverTotalMaior = new DevExpress.ui.dxPopover(e.component.$popoverTotalMaior, {
                //        target: conferenciaParcelasValorTitulo.taggleParcelamento.$,
                //        showEvent: 'mouseenter',
                //        hideEvent: 'mouseleave',
                //        onShowing: (a) => {
                //            a.cancel = e.component.mostrarPopover;
                //        }
                //    });
                //}
                //e.component.popoverTotalMaior[!e.component.mostrarPopover ? 'show' : 'hide']();
            }
        },
        onInitialized: (e) => {

            const configureParcelasLancamento = (parcelas, total) => {
                const parcelasFn = parcelas ?? e.component.getDataSource()?.store()?._array;
                const semParcelamento = (parcelasFn?.length ?? 0) == 0;
                if (semParcelamento) {
                    const totalFn = total ?? titulos.nbx_Vl_Total_Titulo.option('value') ?? 0;
                    dxComp.lancamento.Parcelas = [{
                        parcela: 1,
                        valor: totalFn,
                        vencimento: formatDate(dxComp.lancamento.Dt_Vencimento),
                    }];
                    return;
                }
                dxComp.lancamento.Parcelas = parcelasFn.map((parcela, index) => {
                    const vencimento = formatDate(parcela.DT_VENCIMENTO),
                        competencia = formatDate(parcela.DT_COMPETENCIA);
                    return {
                        parcela: index + 1,
                        valor: parcela.VL_PARCELA,
                        competencia,
                        vencimento,
                        linhaDigitavel: parcela.CD_BARRAS_BOLETO
                    };
                })
            }
            e.component.configureParcelasLancamento = configureParcelasLancamento;
            e.component.option('onSaved', () => configureParcelasLancamento());
            e.component.loadData = (data) => {
                data = !data ? [] : Array.isArray(data) ? data : [data];
                const atual = e.component.option('dataSource');
                atual.store._array = data;
                e.component.option('dataSource', atual);
                conferenciaParcelasValorTitulo.verificar();
                return e.component;
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
            e.component.ratear = (id, valor, porcentagem) => e.component.getDataSource().load().then((data) => {
                const total = this.nbx_Vl_Total_Titulo.option('value') ?? 0;

                let vlDemaisParcelas = id ? total - valor < 0 ? 0 : (total - valor) / (data.length - 1) : total / data.length;
                vlDemaisParcelas = parseFloat(vlDemaisParcelas.toFixed(2));

                const vlParcelaDiferenca = vlDemaisParcelas == 0 ? 0 : parseFloat(((total - (id ? valor : 0)) - (vlDemaisParcelas * (data.length - (id ? 1 : 0)))).toFixed(2)) + vlDemaisParcelas;

                let pcDemaisParcelas = vlDemaisParcelas <= 0 ? 0 : (vlDemaisParcelas / total) * 100;
                pcDemaisParcelas = parseFloat(pcDemaisParcelas.toFixed(3));

                const pcParcelaDiferenca = pcDemaisParcelas == 0 ? 0 : parseFloat(((100 - (id ? porcentagem : 0)) - (pcDemaisParcelas * (data.length - (id ? 1 : 0)))).toFixed(3)) + pcDemaisParcelas;

                const primeiraOuUltima = this.getOptionParcelaDiferenca();
                const parcelaDiferenca = primeiraOuUltima == 1 ? data.filter(a => id ? a.id != id : a)[0] : data.filter(a => id ? a.id != id : a).slice(-1)[0];

                return data.map(a => {
                    if (!id || a.id != id) {
                        a.VL_PARCELA = a.id == parcelaDiferenca.id ? vlParcelaDiferenca : vlDemaisParcelas
                        a.PC_RATEIO = a.id == parcelaDiferenca.id ? pcParcelaDiferenca : pcDemaisParcelas
                    }
                    return a;
                });

            });
            this.getValueAtualizaCompetencia = () => e.component?.check_atualiza_competencia ? e.component.check_atualiza_competencia.option('value') : true;
            this.getOptionParcelaDiferenca = () => e.component?.select_parcela_diferenca ? e.component.select_parcela_diferenca.option('value') : 2;
            const optionAtualizaCompetencia = {
                location: 'after',
                locateInMenu: 'always',
                widget: 'dxCheckBox',
                options: {
                    text: 'Atualizar competência automaticamente',
                    onInitialized: (a) => {
                        const value = this.getValueAtualizaCompetencia();
                        e.component.check_atualiza_competencia = a.component;
                        a.component.option('value', value);
                        const $popover = $('<div>').html('<span><b>Ativo:</b> Alterar os campos "Dias" ou "Data Vencimento", recalcula a competência.</span><br><br><span><b>Inativo:</b> Competência não é alterada automaticamente.</span>');
                        $('body').append($popover);
                        new DevExpress.ui.dxPopover($popover, {
                            target: a.element,
                            showEvent: 'mouseenter',
                            hideEvent: 'mouseleave',
                            maxWidth: 200,
                        });
                    }
                },
            };
            const optionParcelaDiferenca = {
                location: 'after',
                locateInMenu: 'always',
                widget: 'dxSelectBox',
                options: {
                    dataSource: {
                        store: new DevExpress.data.ArrayStore({
                            key: 'id',
                            data: [
                                {
                                    id: 1,
                                    text: "Primeira"
                                },
                                {
                                    id: 2,
                                    text: "Última "
                                },
                            ],
                        })
                    },
                    displayExpr: 'text',
                    valueExpr: 'id',
                    placeholder: 'Selecione a Parcela da diferença',
                    labelMode: 'floating',
                    label: 'Parcela da diferença',
                    onInitialized: (a) => {
                        const value = this.getOptionParcelaDiferenca();
                        e.component.select_parcela_diferenca = a.component;
                        a.component.option('value', value);
                        const $popover = $('<div>').html('<span class="text-center">Selecione a parcela onde a diferença do rateio será aplicada.</span>');
                        $('body').append($popover);
                        new DevExpress.ui.dxPopover($popover, {
                            target: a.element,
                            showEvent: 'mouseenter',
                            hideEvent: 'mouseleave',
                            maxWidth: 200,
                        });
                    }
                },
            };
            const addRow = {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'plus',
                    hint: "Adicionar parcela",
                    onClick: () => {
                        if (this.lkp_Tipo_Parcelamento.option('value') == 'F') {
                            const count = e.component.totalCount();

                            const parcelas = gerarParcelas(
                                this.nbx_Vl_Total_Titulo.option('value'),
                                count + 1,
                                moment(this.dt_Vencimento.option('value')),
                                this.getOptionParcelaDiferenca() == 2,
                                this.lkp_Periodicidade_Parcelas_Fixas.option('value') ?? 30,
                                this.ckb_Parcelamento_Dias_Fixos.option('value') ?? false
                            );

                            e.component.loadData(parcelas);
                            return;
                        }
                        e.component.addRow();
                    },
                },
            }
            const toolbarItems = e.component.option('toolbar.items');
            toolbarItems.push(addRow, optionAtualizaCompetencia, optionParcelaDiferenca);
            e.component.option('toolbar.items', toolbarItems);
        },
        onRowUpdated: async (e) => {
            if (e.component.totalCount() < 2)
                return;
            const data = await e.component.getDataSource().load();
            let newData = data;

            const tipoCalculo = this.lkp_Tipo_Calculo_Parcela_Variavel_Percentual.option('value');
            const tipoParcelamento = this.lkp_Tipo_Parcelamento.option('value');

            if (tipoCalculo == 'R' && tipoParcelamento == 'V')
                newData = await e.component.ratear(e.data.id, e.data.VL_PARCELA, e.data.PC_RATEIO);

            newData = newData.map((a, b) => {
                a.id = b + 1;
                return a;
            });
            e.component.loadData(newData);
        },
        onRowInserting: (e) => {
            const data = e.component.getDataSource().store()._array;
            e.data.id = data.length == 0 ? 1 : data
                .map(a => a.id)
                .sort()
                .findLast(a => a) + 1;
        },
        onRowInserted: async (e) => {
            const tipoCalculo = this.lkp_Tipo_Calculo_Parcela_Variavel_Percentual.option('value');
            const tipoParcelamento = this.lkp_Tipo_Parcelamento.option('value');

            if (tipoCalculo == 'R' && tipoParcelamento == 'V') {
                const newData = await e.component.ratear(e.data.id, e.data.VL_PARCELA, e.data.PC_RATEIO);
                e.component.loadData(newData);
            }

            e.component.refreshIds();
        },
        onOptionChanged: (option) => {
            const getValorTitulo = () => this.nbx_Vl_Total_Titulo.option('value')

            switch (option.name) {
                case "dataSource":
                    optionDataSource();
                    break;
                case "editing":
                    optionEditing();
                    break;
            }

            function optionDataSource() {
                const dataSource = option.value;
                if (!dataSource?.store?._array || dataSource?.store?._array?.length == 0) {
                    conferenciaParcelasValorTitulo.alterarValores({});
                    return;
                }
                const valorTitulo = getValorTitulo();
                const parcelado = dataSource.store._array.map(a => a.VL_PARCELA).reduce((a, b) => a + b);
                conferenciaParcelasValorTitulo.alterarValores({
                    valor: parcelado,
                    saldo: (valorTitulo - parcelado),
                }).show();
                return;
            }
            function optionEditing() {
                const arr = Array.isArray(option.value);
                const d = option.component.totalCount();
                if (d > 1 || option.fullName != 'editing.changes' || (!arr || (arr && option.value.length == 0))) {
                    return;
                }
                const { data } = option.value[0];
                if (!data || !Object.getOwnPropertyNames(data).includes('VL_PARCELA')) {
                    return;
                }
                const valorTitulo = getValorTitulo();
                conferenciaParcelasValorTitulo.alterarValores({
                    valor: data.VL_PARCELA,
                    saldo: (valorTitulo - data.VL_PARCELA)
                }).show();
            }
        },
    });
    this.btn_gerar_parcelas = new DevExpress.ui.dxButton('#btn_gerar_parcelas', {
        text: "Gerar Parcelas",
        icon: "fa fa-list-check mr-2",
        type: "default",
        onClick: async () => {

            if (!validaValorDataVencimento(true))
                return;

            let value_nbx_Qt_Parcelas_Fixas = this.nbx_Qt_Parcelas_Fixas.option('value');
            value_nbx_Qt_Parcelas_Fixas = value_nbx_Qt_Parcelas_Fixas > 1 ? value_nbx_Qt_Parcelas_Fixas : 1;
            this.nbx_Qt_Parcelas_Fixas.option('value', value_nbx_Qt_Parcelas_Fixas);

            const parcelasByValor = this.nbx_Vl_Total_Titulo.option('value') * 100;

            if (value_nbx_Qt_Parcelas_Fixas > parcelasByValor) {
                const parcelasZeradas = value_nbx_Qt_Parcelas_Fixas - parcelasByValor;
                const continuar = await DevExpress.ui.dialog.confirm(`<span>Número de parcelas que serão geradas com valor zerado: ${parcelasZeradas}. <b>Deseja continuar?</b></span>`, 'Novas parcelas zeradas');
                if (!continuar)
                    return;
            }

            const parcelas = gerarParcelas(
                this.nbx_Vl_Total_Titulo.option('value'),
                value_nbx_Qt_Parcelas_Fixas,
                moment(this.dt_Vencimento.option('value')),
                this.getOptionParcelaDiferenca() == 2,
                this.lkp_Periodicidade_Parcelas_Fixas.option('value') ?? 30,
                this.ckb_Parcelamento_Dias_Fixos.option('value') ?? false
            );

            this.gridParcelasPercentual.loadData(parcelas);
            messages.success('Novas parcelas', 'Parcelas geradas com sucesso');
        }
    });
    this.lkp_Tipo_Parcelamento = new DevExpress.ui.dxSelectBox('#lkp_Tipo_Parcelamento', {
        dataSource: {
            store: new DevExpress.data.ArrayStore({
                key: 'id',
                data: [
                    { id: 'F', text: "Fixo" },
                    { id: 'V', text: "Variável" },
                ]
            }),
        },
        searchExpr: 'text',
        displayExpr: 'text',
        valueExpr: 'id',
        labelMode: 'floating',
        label: 'Tipo de parcelamento',
        placeholder: 'Selecione um tipo de parcelamento',
        showClearButton: true,
        readOnly: false,
        onSelectionChanged: async (e) => {

            conferenciaParcelasValorTitulo.verificar();

            if (e.selectedItem && !validaValorDataVencimento(true)) {
                e.component.option("value", null);
                return;
            }

            const value = e.selectedItem?.id;

            if (!value) {
                animateCSS([
                    '#div_parcelasFixas',
                    '#div_gridParcelasPercentual',
                    '#div_parcelasFixas',
                    '#div_parcelamentoDiasFixos',
                    '#div_imagemBoleto',
                    '#div_tipoCalculoParcelaVariavelPercentual',
                ].filter(a => $(a).is(':visible')), 'fadeOutDown', 'out');
                return;
            }

            const titulo = dxComp.principaisTitulos.titulo;

            if (value == "F") {
                await animateCSS([
                    '#div_tipoCalculoParcelaVariavelPercentual',
                    titulo.lkp_Periodicidade_Parcelas_Fixas.option('value') != 30 ? '#div_parcelamentoDiasFixos' : ''
                ].filter(a => $(a).is(':visible')), 'fadeOutDown', 'out');
                animateCSS([
                    '#div_parcelasFixas',
                    '#div_gridParcelasPercentual',
                    titulo.lkp_Periodicidade_Parcelas_Fixas.option('value') == 30 ? '#div_parcelamentoDiasFixos' : '',
                ].filter(a => $(a).is(':hidden')), 'fadeInUp', 'in');
            } else {
                await animateCSS(['#div_parcelasFixas', '#div_parcelamentoDiasFixos'].filter(a => $(a).is(':visible')), 'fadeOutDown', 'out');
                animateCSS(['#div_tipoCalculoParcelaVariavelPercentual', '#div_gridParcelasPercentual'].filter(a => $(a).is(':hidden')), 'fadeInUp', 'in');
            };

        },
    });
    this.lkp_Tipo_Calculo_Parcela_Variavel_Percentual = new DevExpress.ui.dxSelectBox('#lkp_Tipo_Calculo_Parcela_Variavel_Percentual', {
        dataSource: new DevExpress.data.DataSource({
            store: new DevExpress.data.ArrayStore({
                key: 'id',
                data: [
                    {
                        id: 'R',
                        text: "Rateio automático e linear do percentual",
                        help: "Não é possível alterar os percentuais, eles serão calculados automaticamente. "
                            + "Após cada alteração, será realizado um rateio entre porcentual e valores nas demais parcelas "
                            + "mantendo o valor da última parcela alterada.",
                    },
                    {
                        id: 'M',
                        text: "Digitação manual do percentual",
                        help: "É possível alterar os valores e percentuais no grid de parcelas. Cada parcela pode ser alterada manualmente, leve em consideração o valor total do lançamento.",
                    }
                ],
            }),
        }),
        value: 'R',
        searchExpr: 'text',
        displayExpr: 'text',
        valueExpr: 'id',
        labelMode: 'floating',
        label: 'Cálculo do percentual da parcela',
        readOnly: false,
        onSelectionChanged: (e) => {
            e.component.setTextPopover(e.selectedItem.help);
            this.gridParcelasPercentual.columnOption("PC_RATEIO", "allowEditing", e.selectedItem.id == "M");
        },
        onInitialized: async (e) => {
            const $div = $body.appendChild(document.createElement('div'));
            $div.classList.add('text-center');
            const $span = $div.appendChild(document.createElement('span'));

            e.component.popover = new DevExpress.ui.dxPopover($div, {
                target: e.element,
                showEvent: 'mouseenter',
                hideEvent: 'mouseleave',
                maxWidth: 400,
            });

            e.component.setTextPopover = (text) => {
                $span.innerText = text;
                const content = $div.querySelector('.dx-popup-content');
                content.innerText = text;
            };
        }
    });
    this.lkp_Conta_Corrente_Baixa_Futura = new DevExpress.ui.dxLookup('#lkp_Conta_Corrente_Baixa_Futura', {
        dataSource: dataSource.contasCorrentes.dxDataSource,
        searchExpr: 'DescricaoConta',
        displayExpr: 'DescricaoConta',
        valueExpr: 'Key',
        wrapItemText: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            width: 400,
            onShowing: () => {
                const isValid = this.lkp_filial_ApenasAtivasPorUsuario.validator.validate().isValid;
                if (!isValid) {
                    this.lkp_Conta_Corrente_Baixa_Futura.close();
                    rolar_para('#lkp_filial_ApenasAtivasPorUsuario');
                    messages.info('Filial obrigatória', 'Selecione uma filial para utilizar a baixa futura');
                }
            }
        },
        labelMode: 'floating',
        label: 'Conta Corrente',
        placeholder: 'Selecione uma conta',
        showClearButton: true,
        readOnly: false,
        onValueChanged({ value }) {
            dxComp.lancamento.Cd_Conta_Corrente_Baixa = value;
        },
    });
    this.nbx_Vl_Juros_Baixa_Futura = new DevExpress.ui.dxNumberBox('#nbx_Vl_Juros_Baixa_Futura', {
        value: null,
        format: 'R$ ###,###,###,##0.00', //ATENÇÃO: Este campo de formatação de moeda deverá retornar da tabela de Parâmetros Corporativos (NÃO DEVE SER FIXO)
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Juros (+)',
        labelMode: 'floating',
        label: 'Juros (+)',
        //onContentReady: function (e) {
        //    e.component.element().find("input").eq(1).css({
        //        //"font-weight": "bold",
        //        "color": "darkred",
        //    });
        //},
        onValueChanged({ value }) {
            dxComp.lancamento.Vl_Juros = value;
        },
    });
    this.nbx_Vl_Multa_Baixa_Futura = new DevExpress.ui.dxNumberBox('#nbx_Vl_Multa_Baixa_Futura', {
        value: null,
        format: 'R$ ###,###,###,##0.00', //ATENÇÃO: Este campo de formatação de moeda deverá retornar da tabela de Parâmetros Corporativos (NÃO DEVE SER FIXO)
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Multa (+)',
        labelMode: 'floating',
        label: 'Multa (+)',
        //onContentReady: function (e) {
        //    e.component.element().find("input").eq(1).css({
        //        //"font-weight": "bold",
        //        "color": "darkred",
        //    });
        //},
        onValueChanged({ value }) {
            dxComp.lancamento.Vl_Multa = value;
        },
    });
    this.nbx_Vl_Desconto_Baixa_Futura = new DevExpress.ui.dxNumberBox('#nbx_Vl_Desconto_Baixa_Futura', {
        value: null,
        format: 'R$ ###,###,###,##0.00', //ATENÇÃO: Este campo de formatação de moeda deverá retornar da tabela de Parâmetros Corporativos (NÃO DEVE SER FIXO)
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        placeholder: 'Desconto (-)',
        labelMode: 'floating',
        label: 'Desconto (-)',
        //onContentReady: function (e) {
        //    //e.component.element().find("input").eq(1).css({
        //    //    "font-weight": "bold",
        //    //});
        //},
        onValueChanged({ value }) {
            dxComp.lancamento.Vl_Desconto = value;
        },
    });

    const conferenciaRateio = {
        popover: (() => {
            const $popover = $('<div class="text-center">');
            const txt = 'Valor total das parcelas maior<br>que o lançamento!';
            const $textoPopover = $('<b id="meuTextoPopover">').html(txt);
            $popover.append($textoPopover);
            $('body').append($popover);
            return new DevExpress.ui.dxPopover($popover, {
                target: $('#taggleRateioCentroCusto'),
                showEvent: 'mouseenter',
                hideEvent: 'mouseleave',
                onShowing: (e) => {
                    e.cancel = !e.component.mostrarPopover;
                },
                onInitialized: (e) => {
                    e.component.setStateView = (state = false) => {
                        e.component.mostrarPopover = state;
                        e.component.hide();
                        return e.component;
                    }
                    e.component.alteraTextoPopover = (textoHtml = txt) => {
                        $textoPopover.html(textoHtml);
                        e.component.hide();
                        return e.component;
                    }
                },
            });
        })(),
        taggleRateioCentroCusto: {
            $: $('#taggleRateioCentroCusto'),
            name: '#taggleRateioCentroCusto',
        },
        memValorRateioParcelas: {
            $: $('#memValorRateioParcelas'),
            name: '#memValorRateioParcelas'
        },
        memSaldoRatioParcelas: {
            $: $('#memSaldoRatioParcelas'),
            name: '#memSaldoRatioParcelas'
        },
        memTotalTituloRateioParcelas: {
            $: $('#memTotalTituloRateioParcelas'),
        },
        div_conferenciaRateioCentroCusto: {
            $: $('#div_conferenciaRateioCentroCusto'),
            name: '#div_conferenciaRateioCentroCusto'
        },
        show: function () {
            if (this.div_conferenciaRateioCentroCusto.$.is(':hidden')) {
                animateCSS(this.div_conferenciaRateioCentroCusto.name, 'fadeIn');
            }
            return this;
        },
        hide: function () {
            if (this.div_conferenciaRateioCentroCusto.$.is(':visible')) {
                animateCSS(this.div_conferenciaRateioCentroCusto.name, 'fadeOut', 'out');
            }
            return this;
        },
        verificar: function () {
            const tipoParcelamento = titulos.lkp_Tipo_Parcelamento.option('value');
            if (!tipoParcelamento) {
                return this.hide().alterarValores({});
            }
            const dataSource = titulos.gridRateioCentroCusto.option('dataSource.store._array');
            const totalRateio = dataSource.length == 0 ? 0 : dataSource.map(a => a.VL_RATEIO).reduce((a, b) => a + b);
            const totalTitulo = titulos.nbx_Vl_Total_Titulo.option('value');
            return this.alterarValores({ valor: totalRateio, saldo: totalTitulo - totalRateio }).show();
        },
        alterarValores: function ({ valor, saldo }) {
            const toFixed2WithReplace = (vl) => 'R$ ' + (!vl ? '-' : vl.toFixed(2).replace('.', ','))
            const total = titulos.nbx_Vl_Total_Titulo.option('value') ?? 0;
            saldo = !saldo || parseFloat(saldo.toFixed(2)) == 0 ? null : saldo;
            const [valorStr, saldoStr, totalStr] = [
                toFixed2WithReplace(valor),
                toFixed2WithReplace(saldo),
                toFixed2WithReplace(total),
            ];
            this.memValorRateioParcelas.$.text(valorStr);
            this.memSaldoRatioParcelas.$.text(saldoStr);
            this.memTotalTituloRateioParcelas.$.text(totalStr);
            const alertClass = saldo == 0 || !saldo ? 'alert-success' : saldo > 0 ? 'alert-warning' : 'alert-danger';
            this.div_conferenciaRateioCentroCusto.$.find('.alert')
                .removeClass(['alert-warning', 'alert-danger', 'alert-success'])
                .addClass(alertClass);
            const isOk = alertClass == 'alert-success';
            this.taggleRateioCentroCusto.$.parent()[isOk ? 'removeClass' : 'addClass']('pulse-border');
            if (isOk) {
                this.popover.setStateView().alteraTextoPopover();
                return this;
            }
            const color = {
                'alert-warning': ['rgb(157 136 2 / 40%)', `Ainda há ${saldoStr} para ratear,<br>inclua mais Centros de Custo`],
                'alert-danger': ['rgb(220 53 69 / 40%)', `Rateio R$ ${Math.abs(saldo).toString().replace('.', ',')} maior que o total,<br>verifique os valores adicionados`],
            }[alertClass];
            this.taggleRateioCentroCusto.$.parent().css('--color-pulse-custom-1', color[0]);
            this.popover.setStateView(true).alteraTextoPopover(color[1]);
            return this;
        }
    }
    this.gridRateioCentroCusto = new DevExpress.ui.dxDataGrid("#gridRateioCentroCusto", {
        dataSource: {
            store: new DevExpress.data.ArrayStore({
                key: 'id',
                data: dataSource.rateioCentroCusto,
            }),
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
        allowColumnReordering: false,
        groupPanel: {
            visible: false,
            emptyPanelText: "Arraste as colunas do grid para esta área para agrupar"
        },
        paging: {
            pageSize: 15
        },
        pager: {
            visible: true,
            showNavigationButtons: true
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
        summary: {
            recalculateWhileEditing: true,
            groupItems: [{
                summaryType: "count"
            }],
            totalItems: [{
                column: 'CD_CENTRO_CUSTO',
                summaryType: 'count',
                displayFormat: "{0} Lançamento(s)",
            }, {
                column: 'VL_RATEIO',
                summaryType: 'sum',
                valueFormat: "###,###,###,##0.00",
                displayFormat: "{0}",
            }],
        },
        toolbar: {
            items: [
                {
                    location: 'before',
                    template: () => {
                        let $div = $('<div>');
                        let $h6 = $('<h6 class="mb-1 mt-0 ml-2 informer">').text('CLIQUE NO ÍCONE + PARA ADICIONAR CENTROS DE CUSTO PARA RATEIO');
                        $div.append($h6);
                        return $div;
                    },
                },
            ],
        },
        columns: [
            {
                dataField: "CD_CENTRO_CUSTO",
                caption: "CENTRO DE CUSTO",
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Centro de Custo obrigatório', }],
                lookup: {
                    dataSource: dataSource.centroCusto.dxDataSource,
                    searchExpr: 'text',
                    valueExpr: 'Cd_Centro_Custo',
                    displayExpr: 'text',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Centro de Custo',
                        width: 400,
                    },
                },
            },
            {
                dataField: "PC_RATEIO",
                caption: "% RATEIO",
                width: 200,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                dataType: "number",
                format: "###,###,###,##0.000",
                customizeText: (text) => text.valueText == "" || !text.valueText ? "" : text.valueText + '%',
                alignment: 'center',
                cssClass: "column-data-grid",
                editorOptions: {
                    min: 0.001,
                    max: 100
                },
                setCellValue: (newData, value, currentRowData) => {
                    if (!this.gridRateioCentroCusto.verificaValorColunas(newData, value))
                        return;
                    const total = this.nbx_Vl_Total_Titulo.option('value');
                    newData.PC_RATEIO = value;
                    newData.VL_RATEIO = parseFloat((total * (value / 100)).toFixed(3));
                },
            },
            {
                dataField: "VL_RATEIO",
                caption: "VALOR RATEIO",
                width: 200,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                dataType: "number",
                format: "###,###,###,##0.00",
                alignment: 'right',
                cssClass: "column-data-grid",
                editorOptions: {
                    min: 0
                },
                validationRules: [{ type: 'required', message: 'Valor do rateio obrigatório', }],
                setCellValue: (newData, value, currentRowData) => {
                    if (!this.gridRateioCentroCusto.verificaValorColunas(newData, value))
                        return;
                    const total = this.nbx_Vl_Total_Titulo.option('value');
                    value = parseFloat(value.toFixed(2));
                    newData.PC_RATEIO = parseFloat(((value / total) * 100).toFixed(3));
                    newData.VL_RATEIO = value;
                },
            },
            {
                type: "buttons",
                width: 30,
            }
        ],
        onEditingStart: (e) => {
            const count = e.component.totalCount();
            if (count == 0) {
                const total = this.nbx_Vl_Total_Titulo.option('value');
                e.data.VL_RATEIO = total;
                e.data.PC_RATEIO = 100;
                return;
            }
        },
        onEditorPreparing: (e) => {
            const total = this.nbx_Vl_Total_Titulo.option('value');
            switch (e.dataField) {
                case "VL_RATEIO":
                    e.editorOptions.max = total;
                    break;
                case "PC_RATEIO":
                    e.editorOptions.min = parseFloat(((0.01 / total) * 100).toFixed(3));
                    break;
            }
        },
        onExporting: (e) => {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Rateio');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], {
                        type: 'application/octet-stream'
                    }), 'RateioCentroCusto.xlsx');
                });
            });
            e.cancel = true;
        },
        onInitialized: (e) => {
            ['onRowInserted', 'onRowRemoved', 'onRowUpdated'].forEach(a => e.component.option(a, () => conferenciaRateio.verificar()));
            e.component.verificaValorColunas = (newData, value) => {
                value = value <= 0 ? null : value;
                if (!value) {
                    newData.PC_RATEIO = null;
                    newData.VL_RATEIO = null;
                    return false;
                }
                return true;
            }
            const toolbar = e.component.option('toolbar');
            const addRow = {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'plus',
                    onClick: () => {
                        if (!validaValorDataVencimento(true)) {
                            return;
                        };
                        e.component.addRow();
                    },
                    onInitialized: (a) => {
                        const $popover = $('<div>').text('Adicionar Centro de Custo');
                        $('body').append($popover);
                        new DevExpress.ui.dxPopover($popover, {
                            target: a.element,
                            showEvent: 'mouseenter',
                            hideEvent: 'mouseleave',
                        });
                    }
                },
            }
            const excluirTudo = {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'trash',
                    text: 'Excluir Rateios',
                    onClick: async () => {
                        const count = e.component.totalCount();
                        if (count == 0) {
                            messages.info("Limpar grid", "Sem itens para limpar o grid de rateio");
                            return;
                        }
                        const excluir = await dxComp.popups.popupConfirmacao();
                        if (excluir) {
                            const dataSource = e.component.option('dataSource');
                            dataSource.store._array = [];
                            e.component.option('dataSource', dataSource);
                            messages.success("Limpar grid", "Rateio excluído com sucesso");
                        }
                        conferenciaRateio.verificar();
                    },
                    onInitialized: (a) => {
                        const $popover = $('<div>').text('Excluir todas as linhas de rateio');
                        $('body').append($popover);
                        new DevExpress.ui.dxPopover($popover, {
                            target: a.element,
                            showEvent: 'mouseenter',
                            hideEvent: 'mouseleave',
                        });
                    }
                },
            };
            const ratear = {
                location: 'after',
                widget: 'dxButton',
                options: {
                    icon: 'percent',
                    text: 'Ratear Igualmente',
                    onClick: () => {
                        const count = e.component.totalCount();
                        if (count == 0) {
                            messages.info("Ratear grid", "Sem itens para realizar o rateio");
                            return;
                        }
                        const total = this.nbx_Vl_Total_Titulo.option('value');
                        const dataSource = e.component.option('dataSource');
                        const rateioPorcentagem = parseFloat((100 / count).toFixed(3));
                        const rateioValores = parseFloat((total / count).toFixed(2));
                        let somaPorcentagem = 0, somaValores = 0;
                        dataSource.store._array = dataSource.store._array.map((value, index, lista) => {
                            const ultima = index == lista.length - 1;
                            value.PC_RATEIO = ultima ? 100 - somaPorcentagem : rateioPorcentagem;
                            somaPorcentagem += rateioPorcentagem;
                            value.VL_RATEIO = ultima ? total - somaValores : rateioValores;
                            somaValores += rateioValores;
                            return value;
                        });
                        e.component.option('dataSource', dataSource);
                        messages.success("Ratear grid", "Rateio realizado com sucesso");
                        conferenciaRateio.verificar();
                    },
                    onInitialized: (a) => {
                        const $popover = $('<div>').text('Rateio automático entre os centros de custo');
                        $('body').append($popover);
                        new DevExpress.ui.dxPopover($popover, {
                            target: a.element,
                            showEvent: 'mouseenter',
                            hideEvent: 'mouseleave',
                        });
                    }
                },
            };
            toolbar.items.push(ratear, excluirTudo, addRow);
            e.component.option('toolbar', toolbar);
            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) e.component.updateDimensions();
                });
            }).observe(e.element[0]);
        },
        onRowInserting: (e) => {
            const data = e.component.getDataSource().store()._array;
            e.data.id = data.length == 0 ? 1 : data
                .map(a => a.id)
                .sort()
                .findLast(a => a) + 1;
        },
    });
    this.botao_limpar_baixa_futura = new DevExpress.ui.dxButton('#botao_limpar_baixa_futura', {
        width: '100%',
        icon: 'fa fa-trash',
        text: 'Limpar campos',
        template: () => {
            const $icon = $('<div class="col-12">').append('<i class="fa fa-trash">');
            const $text = $('<div class="col-12">').append($('<span>').text('Limpar campos'));
            const $div = $('<div class="row align-content-center align-items-center justify-content-center h-100">').append($icon, $text);
            $div.css('lineHeight', 'normal');
            return $div;
        },
        onClick: () => {
            [
                'lkp_Conta_Corrente_Baixa_Futura',
                'lkp_Forma_Pagamento_Baixa_Futura',
                'nbx_Vl_Juros_Baixa_Futura',
                'nbx_Vl_Multa_Baixa_Futura',
                'nbx_Vl_Desconto_Baixa_Futura',
            ].forEach(a => this[a].reset())
        }
    });
    function gerarParcelas(valorTitulo,
        qtParcelas,
        primeiroVencimento,
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

        const parcelas = new Array(qtParcelas).fill().map((_a, index) => {
            const id = index + 1;
            const dataVencimento = moment(primeiroVencimento).add(diaFixoAtivo ? index : index * periodo, diaOuMes).toDate();
            return {
                id,
                NR_DIAS: index * periodo,
                DT_VENCIMENTO: dataVencimento,
                DT_COMPETENCIA: dataVencimento,
                VL_PARCELA: parcelaGeralFormatada,
                PC_RATEIO: porcentagemGeral,
            };
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

}
function LoadPagamentos() {
    this.gridPagamentosQuitacao = new DevExpress.ui.dxDataGrid("#gridPagamentosQuitacao", {
        dataSource: dataSource.pagamentosQuitacao,
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
            visible: true,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
        },
        sorting: {
            mode: "multiple"
        },
        selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
            deferred: true,
        },
        allowColumnResizing: true,
        columnResizingMode: "widget",
        allowColumnReordering: true,
        showBorders: true,
        columnsAutoWidth: true,
        groupPanel: {
            visible: true,
            emptyPanelText: "Solte aqui as colunas para agrupar"
        },
        paging: {
            pageSize: 15
        },
        pager: {
            visible: true,
            allowedPageSizes: [15, 20, 50, 100],
            showPageSizeSelector: false,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        filterPanel: {
            visible: true
        },
        columnChooser: {
            enabled: true,
            allowSearch: true,
        },
        summary: {
            totalItems: [{
                column: 'CD_FORMA_PAGAMENTO',
                summaryType: 'count',
                displayFormat: "{0} Pagto(s)",
            }, {
                column: 'VL_PAGAMENTO',
                summaryType: 'sum',
                valueFormat: "###,###,###,##0.00",
                displayFormat: "{0}",
            }
            ],
        },
        toolbar: {
            items: [
                {
                    name: "groupPanel",
                    locateInMenu: "auto",
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'hierarchy',
                        text: '',
                        hint: 'Fechar ou expandir os agrupamentos',
                        onClick: (e) => {
                            const dataGrid = $("#gridPagamentosQuitacao").dxDataGrid('instance');

                            const expanding = e.component.option('text') === 'Expandir Agrupamento';
                            dataGrid.option('grouping.autoExpandAll', expanding);
                            e.component.option('text', expanding ? '' : 'Expandir Agrupamento');
                        },
                    },
                },
                'exportButton',
                'columnChooserButton',
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'trash',
                        text: 'Excluir Pagamentos',
                        hint: "Excluir os pagamentos selecionados",
                        onClick: () => {
                            AbrirModal('#ModalConfirmacaoExclusaoPagamentosQuitacao');
                        },
                    },
                },
                'searchPanel',
                'addRowButton' //TODO: verificar >tipoOperacaoGridParcelas = 'I';
            ],
        },
        columns: [
            {
                type: "selection",
                width: 30,
            },
            {
                dataField: "CD_FORMA_PAGAMENTO",
                caption: "FORMA DE PAGAMENTO",
                //width: 80,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Forma de Pagamento obrigatória', }],
                lookup: {
                    dataSource: new DevExpress.data.CustomStore({
                        key: 'Id',
                        load: async () => {
                            const result = await dataSource.formasPagamento.promise;
                            return result;
                        }
                    }),
                    searchExpr: 'Name',
                    valueExpr: 'Id',
                    displayExpr: 'Name',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Forma de Pagamento',
                        width: 400,
                    },
                },
            },
            {
                dataField: "CD_CONTA_CORRENTE",
                caption: "CONTA CORRENTE",
                //width: 350,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Conta Corrente obrigatória', }],
                lookup: {
                    dataSource: new DevExpress.data.CustomStore({
                        key: 'Key',
                        load: async () => {
                            const result = await dataSource.contasCorrentes.promise;
                            return result;
                        },
                    }),
                    searchExpr: 'DescricaoConta',
                    displayExpr: 'DescricaoConta',
                    valueExpr: 'Key',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Conta Corrente',
                        width: 400,
                    },
                },
            },
            {
                dataField: "CD_CENTRO_CUSTO",
                caption: "CENTRO DE CUSTO",
                //width: 350,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Centro de Custo obrigatório', }],
                lookup: {
                    dataSource: dataSource.centroCusto.dxDataSource,
                    searchExpr: 'text',
                    valueExpr: 'Cd_Centro_Custo',
                    displayExpr: 'text',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Centro de Custo',
                        width: 400,
                    },
                },
            }, {
                dataField: "CD_PLANO_CONTA",
                caption: "PLANO DE CONTA",
                //width: 350,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Conta obrigatória', }],
                lookup: {
                    dataSource: dataSource.planoConta.dxDataSource,
                    searchExpr: 'text',
                    valueExpr: 'Cd_Plano_Conta',
                    displayExpr: 'text',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Plano de Conta',
                        width: 400,
                    },
                },
            },
            {
                dataField: "DS_HISTORICO",
                caption: "HISTÓRICO",
                //width: 80,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                //validationRules: [{ type: 'required', message: 'Forma de Pagamento obrigatória', }],
            },
            {
                dataField: "DT_PAGAMENTO",
                caption: "DATA PAGTO",
                width: 90,
                sortOrder: 'asc',
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                dataType: "date",
                format: "dd/MM/yyyy",
                editorOptions: { useMaskBehavior: true },
                alignment: 'center',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Data do pagamento obrigatória', }],
            },
            {
                dataField: "VL_PAGAMENTO",
                caption: "VALOR PAGAMENTO",
                width: 80,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                dataType: "number",
                format: "###,###,###,##0.00",
                alignment: 'right',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Valor do pagamento obrigatório', }],
                //setCellValue: function(newData, value, currentRowData) {

                //    var pcRateio

                //    if (valorTotalTitulo > 0) {
                //        pcRateio = value / valorTotalTitulo
                //    } else {
                //        validaValorDataVencimento();
                //    };

                //    newData.PC_RATEIO = pcRateio;
                //    newData.VL_PARCELA = value;

                //},
            },
            {
                type: "buttons",
                width: 30,
                cssClass: "column-data-grid",
            }
        ],
        onExporting: (e) => {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Pagamentos');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], {
                        type: 'application/octet-stream'
                    }), 'PagamentosGerais.xlsx');
                });
            });
            e.cancel = true;
        },
        onRowPrepared: () => {
            //Verifica se existe diferença entre a somatória dos pagamentos e o valor total do título
            verificaDiferencaTituloQuitacao();
        },
        onRowRemoved: () => {
            //Verifica se existe diferença entre a somatória dos pagamentos e o valor total do título
            verificaDiferencaTituloQuitacao();
        },
        onEditingStart: (e) => {
            //Verifica se a data de vencimento e o valor do título foram informados
            if (validaValorDataVencimento() == false) {
                e.component.cancelEditData();
            };
        },
        onEditorPreparing: (e) => {

            e.editorOptions.onOpened = function (arg) {
                var popupInstance = arg.component._popup;
                popupInstance.option('width', 400);
                popupInstance.off("optionChanged", optionChangedHandler);
                popupInstance.on("optionChanged", optionChangedHandler);
            }
        },
    });
    this.div_TotalPagamentosGerais = {
        $div_TotalPagamentosGerais: $('#div_TotalPagamentosGerais'),
        $memTotalPagamentosGerais: $('#memTotalPagamentosGerais')
    }
    this.gridPagamentosQuitacaoChequeProprio = new DevExpress.ui.dxDataGrid("#gridPagamentosQuitacaoChequeProprio", {
        dataSource: dataSource.pagamentosQuitacaoChequeProprio,
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
            //popup: {
            //    title: 'Cheque próprio',
            //    showTitle: true,
            //    width: 700,
            //    height: 300,
            //},
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
            mode: "multiple"
        },
        selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
            deferred: true,
        },
        allowColumnResizing: true,
        //columnResizingMode: "widget",
        allowColumnReordering: true,
        groupPanel: {
            visible: true,
            emptyPanelText: "Agrupamento"
        },
        paging: {
            pageSize: 15
        },
        pager: {
            visible: true,
            allowedPageSizes: [15, 20, 50, 100],
            showPageSizeSelector: false,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        filterPanel: {
            visible: true
        },
        columnChooser: {
            enabled: true,
            allowSearch: true,
        },
        columnsAutoWidth: true,
        showBorders: true,
        toolbar: {
            items: [
                {
                    name: "groupPanel",
                    locateInMenu: "auto",
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'hierarchy',
                        text: '',
                        hint: 'Fechar ou expandir os agrupamentos',
                        onClick: (e) => {
                            const dataGrid = $("#gridPagamentosQuitacaoChequeProprio").dxDataGrid('instance');

                            const expanding = e.component.option('text') === 'Expandir Agrupamento';
                            dataGrid.option('grouping.autoExpandAll', expanding);
                            e.component.option('text', expanding ? '' : 'Expandir Agrupamento');
                        },
                    },
                },
                'exportButton',
                'columnChooserButton',
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'trash',
                        text: 'Excluir Pagamentos',
                        hint: "Excluir os pagamentos selecionados",
                        onClick: () => {
                            AbrirModal('#ModalConfirmacaoExclusaoPagamentosChequeProprioQuitacao');
                        },
                    },
                },
                'searchPanel',
                'addRowButton' //TODO: verificar >tipoOperacaoGridParcelas = 'I';
            ],
        },
        columns: [
            {
                type: "selection",
                width: 30,
            },
            {
                dataField: "CD_CONTA_CORRENTE",
                caption: "CONTA CORRENTE",
                //width: 350,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Conta Corrente obrigatória', }],
                setCellValue: (rowData, value) => {
                    rowData.CD_CONTA_CORRENTE = value;
                    rowData.NR_CHEQUE = null;
                },
                lookup: {
                    dataSource: dataSource.contasCorrentes.dxDataSource,
                    searchExpr: 'DescricaoConta',
                    displayExpr: 'DescricaoConta',
                    valueExpr: 'Key',
                },
            },
            {
                dataField: "NR_CHEQUE",
                caption: "NÚMERO CHEQUE",
                width: 60,
                allowEditing: true,
                allowSorting: false,
                allowFiltering: false,
                allowHeaderFiltering: false,
                showEditorAlways: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Número do Cheque obrigatório', }],
                setCellValue: (rowData, value, currentRowData) => {
                    console.log('NR_CHEQUE setCellValue', rowData, value, currentRowData)
                    rowData.NR_CHEQUE = value;
                },
            },
            {
                dataField: "DS_NOMINAL",
                caption: "NOMINAL",
                //width: 80,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                //validationRules: [{ type: 'required', message: 'Forma de Pagamento obrigatória', }],
            },
            {
                dataField: "CD_CENTRO_CUSTO",
                caption: "CENTRO DE CUSTO",
                //width: 350,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Centro de Custo obrigatório', }],
                lookup: {
                    dataSource: dataSource.centroCusto.dxDataSource,
                    searchExpr: 'text',
                    valueExpr: 'Cd_Centro_Custo',
                    displayExpr: 'text',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Centro de Custo',
                        width: 400,
                    },
                },
            },
            {
                dataField: "CD_PLANO_CONTA",
                caption: "PLANO DE CONTA",
                //width: 350,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Conta obrigatória', }],
                lookup: {
                    dataSource: dataSource.planoConta.dxDataSource,
                    searchExpr: 'text',
                    valueExpr: 'Cd_Plano_Conta',
                    displayExpr: 'text',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Plano de Conta',
                        width: 400,
                    },
                },
            },
            {
                dataField: "DS_HISTORICO",
                caption: "HISTÓRICO",
                //width: 80,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                //validationRules: [{ type: 'required', message: 'Forma de Pagamento obrigatória', }],
            },
            {
                dataField: "DT_PAGAMENTO",
                caption: "DATA PAGTO",
                width: 90,
                sortOrder: 'asc',
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                dataType: "date",
                format: "dd/MM/yyyy",
                editorOptions: { useMaskBehavior: true },
                alignment: 'center',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Data do pagamento obrigatória', }],
                setCellValue: function (newData, value, currentRowData) {

                    newData.DT_PAGAMENTO = value;

                    console.log("Data emissão: ", currentRowData.DT_EMISSAO)

                    //Só replicada a data de pagamento para a coluna de data de emissão e data pré se o usuário ainda não preencheu estes campos.
                    if (currentRowData.DT_EMISSAO === undefined) {
                        newData.DT_EMISSAO = value;
                    };

                    if (currentRowData.DT_PRE === undefined) {
                        newData.DT_PRE = value;
                    };

                },
            },
            {
                dataField: "DT_EMISSAO",
                caption: "DATA EMISSÃO",
                width: 90,
                //sortOrder: 'asc',
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                dataType: "date",
                format: "dd/MM/yyyy",
                editorOptions: { useMaskBehavior: true },
                alignment: 'center',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Data de emissão obrigatória', }],
            },
            {
                dataField: "DT_PRE",
                caption: "DATA PRÉ",
                width: 90,
                //sortOrder: 'asc',
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                dataType: "date",
                format: "dd/MM/yyyy",
                editorOptions: { useMaskBehavior: true },
                alignment: 'center',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Data pré obrigatória', }],
            },
            {
                dataField: "VL_PAGAMENTO",
                caption: "VALOR PAGAMENTO",
                width: 80,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                dataType: "number",
                format: "###,###,###,##0.00",
                alignment: 'right',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Valor do pagamento obrigatório', }],
                //setCellValue: function(newData, value, currentRowData) {

                //    var pcRateio

                //    if (valorTotalTitulo > 0) {
                //        pcRateio = value / valorTotalTitulo
                //    } else {
                //        validaValorDataVencimento();
                //    };

                //    newData.PC_RATEIO = pcRateio;
                //    newData.VL_PARCELA = value;

                //},
            },
            {
                type: "buttons",
                width: 30,
                cssClass: "column-data-grid",
            }
        ],
        summary: {
            totalItems: [{
                column: 'CD_CONTA_CORRENTE',
                summaryType: 'count',
                displayFormat: "{0} Pagto(s)",
            }, {
                column: 'VL_PAGAMENTO',
                summaryType: 'sum',
                valueFormat: "###,###,###,##0.00",
                displayFormat: "{0}",
            }
            ],
        },
        onExporting: (e) => {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Pagamentos');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], {
                        type: 'application/octet-stream'
                    }), 'PagamentosGeraisChequeProprio.xlsx');
                });
            });
            e.cancel = true;
        },
        onRowPrepared() {
            return;//TODO: VERIFICAR
            //Verifica se existe diferença entre a somatória dos pagamentos para lançamento de títulos já quitado e o valor total do título
            verificaDiferencaTituloQuitacao();
        },
        onRowRemoved() {
            return;//TODO: VERIFICAR
            //Verifica se existe diferença entre a somatória dos pagamentos para lançamento de títulos já quitado e o valor total do título
            verificaDiferencaTituloQuitacao();
        },
        onEditingStart(e) {
            return;//TODO: VERIFICAR
            //Verifica se a data de vencimento e o valor do título foram informados
            if (validaValorDataVencimento() == false) {
                e.component.cancelEditData();
            };
        },
        onEditorPreparing: (e) => {
            //if (e.parentType == 'dataRow' && e.dataField == 'NR_CHEQUE') {
            //    var onValueChanged = e.editorOptions.onValueChanged;
            //    e.editorOptions.onValueChanged = function (args) {
            //        onValueChanged.apply(this, arguments);
            //        console.log('NR_CHEQUE onValueChanged', args);  
            //    }
            //}
            return;//TODO: VERIFICAR
            //if(e.parentType === "dataRow" && e.dataField === "CD_CONTA_CORRENTE") {  
            //}  
            e.editorOptions.onOpened = function (arg) {
                var popupInstance = arg.component._popup;
                popupInstance.option('width', 400);
                popupInstance.off("optionChanged", optionChangedHandler);
                popupInstance.on("optionChanged", optionChangedHandler);
            }
        },
    });
    this.div_TotalPagamentosChequeProprio = {
        $div_TotalPagamentosChequeProprio: $('#div_TotalPagamentosChequeProprio'),
        $memTotalPagamentosChequeProprio: $('#memTotalPagamentosChequeProprio'),
    }
    this.gridBoxChequesTerceirosDisponiveis = new DevExpress.ui.dxDropDownBox('#gridBoxChequesTerceirosDisponiveis', {
        valueExpr: 'Nr_Folha_Cheque',
        displayExpr: 'Nr_Folha_Cheque',
        labelMode: 'floating',
        label: 'Cheques de terceiros',
        placeholder: '+ Selecione os cheques de terceiros a serem utilizados para o pagamento do título',
        showClearButton: true,
        dataSource: dataSource.chequeTerceiros.dxDataSource,

        //onEditorPreparing: function(e) {  
        //    //e.editorOptions.dropDownOptions = { width: 400 };
        //    e.editorOptions.onOpened = function (arg) {  
        //        var popupInstance = arg.component._popup;  
        //        popupInstance.option('width', 400);  
        //        popupInstance.off("optionChanged", optionChangedHandler);  
        //        popupInstance.on("optionChanged", optionChangedHandler);  
        //    }  
        //},

        contentTemplate: function (e) {
            const value = e.component.option('value');

            const $div = $('<div>');
            this.grid = new DevExpress.ui.dxDataGrid($div, {
                //dataSource: new DevExpress.data.CustomStore({
                //    loadMode: 'raw',
                //    key: 'Nr_Folha_Cheque',
                //    load: async () => {
                //        const result = await dataSource.chequeTerceiros.promise;
                //        return result;
                //    },
                //}),
                elementAttr: {
                    class: "margin-top-zero-labelMode-floating"
                },
                dataSource: e.component.getDataSource(),
                searchExpr: 'Nr_Folha_Cheque',
                displayExpr: 'Nr_Folha_Cheque',
                valueExpr: 'Nr_Folha_Cheque',
                wordWrapEnabled: true,
                showRowLines: true,
                rowAlternationEnabled: true,
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
                groupPanel: {
                    visible: false,
                    emptyPanelText: "Agrupamento"
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
                focusedRowEnabled: false,
                hoverStateEnabled: true,
                paging: { pageSize: 25 },
                filterRow: { visible: true, applyFilter: "auto" },
                headerFilter: {
                    visible: true,
                    allowSearch: true
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                filterPanel: { visible: true },
                columnChooser: { enabled: true, allowSearch: true, },
                columnsAutoWidth: true,
                cellHintEnabled: true,
                columns: [
                    {
                        type: "selection",
                        width: 30,
                    },
                    {
                        dataField: "Cd_Banco",
                        caption: "Banco",
                        //width: 40,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Cd_Agencia",
                        caption: "Ag.",
                        //width: 40,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Cd_Conta_Corrente",
                        caption: "Conta",
                        //width: 40,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Nr_Folha_Cheque",
                        caption: "Nº Cheque",
                        //width: 40,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Nr_Lancamento",
                        caption: "Nº Título Origem",
                        //width: 40,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Nr_Parcela_Origem",
                        caption: "Parcela Origem",
                        //width: 40,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Nr_Documento_Origem",
                        caption: "Nº Docto Origem",
                        //width: 40,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Cd_CPF_CNPJ_Titular",
                        caption: "CPF/CNPJ Titular",
                        //width: 40,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "Ds_Razao_Social_Cliente",
                        caption: "Cliente Origem",
                        width: 200,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'left',
                        allowHeaderFiltering: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Ds_Fantasia_Cliente",
                        caption: "Fantasia Cliente Origem",
                        width: 200,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'left',
                        allowHeaderFiltering: true,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Dt_Pre",
                        caption: "Data Pré",
                        width: 90,
                        //sortOrder: 'asc',
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        dataType: "date",
                        format: "dd/MM/yyyy",
                        editorOptions: { useMaskBehavior: true },
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Vl_Cheque",
                        caption: "Valor Cheque",
                        width: 90,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        alignment: 'right',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Nr_Sequencia",
                        caption: "Sequência",
                        //width: 40,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                    {
                        dataField: "Nr_Parcela_Atual",
                        caption: "Parcela Atual",
                        //width: 40,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                        visible: false,
                    },
                ],
                toolbar: {
                    items: [
                        {
                            location: 'before',
                            widget: 'dxDateBox',
                            options: {
                                readOnly: false,
                                showClearButton: false,
                                useMaskBehavior: true,
                                displayFormat: 'dd/MM/yyyy',
                                type: 'date',
                                width: 100,
                                placeholder: 'Data Pagto',
                                labelMode: 'floating',
                                label: 'Data Pagto',
                                //value: Date(),
                                onInitialized: (e) => {
                                    const validator = e.element.dxValidator({
                                        validationRules: [{
                                            type: 'required',
                                            validationGroup: "pagtoChequeTerceiro", message: 'Data do Pagamento Obrigatória'
                                        }]
                                    });
                                    e.component.validator = validator;
                                    this.dataPagamento = e.component;
                                },
                                onFocusOut: (e) => {
                                    if (e.value == undefined) {
                                        e.element.dxValidator("instance").validate();
                                        if (validacaoPagtoChequeTerceiros == null || validacaoPagtoChequeTerceiros == undefined) {

                                            e.element.dxValidator("instance").focus();
                                            validacaoPagtoChequeTerceiros = 1;

                                        }
                                    }
                                },
                                onValueChanged: (e) => {
                                    return; //TODO: verificar função
                                    //Se o valor informado pelo usuário para a variável geral
                                    dataPagtoChequeTerceiros = e.value;
                                },
                            },
                        },
                        {
                            location: 'before',
                            widget: 'dxLookup',
                            options: {
                                dataSource: dataSource.centroCusto.dxDataSource,
                                searchExpr: 'text',
                                valueExpr: 'Cd_Centro_Custo',
                                displayExpr: 'text',
                                placeholder: 'Centro de Custo',
                                labelMode: 'floating',
                                label: 'Centro de Custo',
                                dropDownOptions: {
                                    closeOnOutsideClick: true,
                                    showTitle: false,
                                    title: 'Centro de Custo',
                                    width: 400,
                                },
                                onInitialized: (e) => {
                                    const validator = e.element.dxValidator({
                                        validationRules: [{ type: 'required', validationGroup: "pagtoChequeTerceiro", message: 'Centro de Custo Obrigatório' }]
                                    });
                                    e.component.validator = validator;
                                    this.centroCusto = e.component;
                                },
                                onFocusOut: (e) => {
                                    if (e.value == undefined) {
                                        e.element.dxValidator("instance").validate();
                                        if (validacaoCentroCustoChequeTerceiros == null || validacaoCentroCustoChequeTerceiros == undefined) {

                                            e.element.dxValidator("instance").focus();
                                            validacaoCentroCustoChequeTerceiros = 1;

                                        }
                                    }
                                },
                                onValueChanged: (e) => {
                                    //Se o valor informado pelo usuário para a variável geral
                                    centroCustoChequeTerceiros = e.value;
                                },
                            },
                        },
                        {
                            location: 'before',
                            widget: 'dxLookup',
                            options: {
                                dataSource: dataSource.planoConta.dxDataSource,
                                searchExpr: 'text',
                                valueExpr: 'Cd_Plano_Conta',
                                displayExpr: 'text',
                                placeholder: 'Plano de Conta',
                                labelMode: 'floating',
                                label: 'Plano de Conta',
                                dropDownOptions: {
                                    closeOnOutsideClick: true,
                                    showTitle: false,
                                    title: 'Plano de Conta',
                                    width: 400,
                                },
                                onInitialized: (e) => {
                                    const validator = e.element.dxValidator({
                                        validationRules: [{ type: 'required', validationGroup: "pagtoChequeTerceiro", message: 'Conta Obrigatória' }]
                                    });
                                    e.component.validator = validator;
                                    this.planoConta = e.component;
                                },
                                onFocusOut: (e) => {
                                    if (e.value == undefined) {
                                        e.element.dxValidator("instance").validate();
                                        if (validacaoPlanoContaChequeTerceiros == null || validacaoPlanoContaChequeTerceiros == undefined) {

                                            e.element.dxValidator("instance").focus();
                                            validacaoPlanoContaChequeTerceiros = 1;

                                        }
                                    }
                                },
                                onValueChanged: (e) => {
                                    //Se o valor informado pelo usuário para a variável geral
                                    planoContaChequeTerceiros = e.value;
                                },
                            },
                        },
                        {
                            location: 'before',
                            widget: 'dxTextBox',
                            options: {
                                placeholder: 'Histórico/Observação',
                                labelMode: 'floating',
                                label: 'Histórico/Observação',
                                maxLength: 80,
                                showClearButton: true,
                                //width: 220,
                                onValueChanged: (e) => {
                                    //Se o valor informado pelo usuário para a variável geral
                                    historicoPagtoChequeTerceiros = e.value;
                                },
                                onInitialized: (e) => {
                                    this.historicoObs = e.component;
                                },
                            },
                        },
                        {
                            location: 'after', //TODO: implementar algo para quando a pessoa esquecer de gravar
                            widget: 'dxButton',
                            options: {
                                text: 'Gravar',
                                hint: "Utilizar cheques selecionados para gravar os pagamentos",
                                width: 80,
                                icon: 'save',
                                onClick: (e) => {
                                    return; //TODO: verificar
                                    if (dataPagtoChequeTerceiros !== null && dataPagtoChequeTerceiros !== undefined &&
                                        centroCustoChequeTerceiros !== null && centroCustoChequeTerceiros !== undefined &&
                                        planoContaChequeTerceiros !== null && planoContaChequeTerceiros !== undefined) {

                                        $("#gridBoxChequesTerceirosDisponiveis").dxDropDownBox("instance").close();

                                        new PNotify({
                                            title: 'Concluído',
                                            text: 'Os cheques selecionados foram utilizados para o pagamento do título com sucesso!',
                                            type: 'success'
                                        });

                                        $("#gridBoxChequesTerceirosDisponiveis").dxDropDownBox("instance").option("value", null);
                                    } else {
                                        DevExpress.ui.notify({
                                            message: 'Por favor, informe a data de pagamento, centro de custo e plano de conta antes de gravar.',
                                            type: 'error',
                                            displayTime: 5000,
                                        });

                                    }

                                },
                            },
                        },
                        'groupPanel',
                        'exportButton',
                        'columnChooserButton',
                        'searchPanel',
                    ],
                },
                showBorders: true,
                //onCellPrepared: function(e) {
                //    if (e.rowType === "data") {
                //        if (e.column.dataField === "LG_FORA_LINHA")  {
                //            e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                //            e.cellElement.css("color", "white");
                //        }
                //    }
                //},
                paging: { enabled: true, pageSize: 10 },
                scrolling: { mode: 'virtual' },
                selectedRowKeys: [value],
                height: '100%',
                onExporting: (e) => {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('ChequesTerceiros');
                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(() => {
                        workbook.xlsx.writeBuffer().then((buffer) => {
                            saveAs(new Blob([buffer], {
                                type: 'application/octet-stream'
                            }), 'ChequesTerceirosDisponiveis.xlsx');
                        });
                    });
                    e.cancel = true;
                },
                onSelectionChanged(selectedItems) {
                    const keys = selectedItems.selectedRowKeys;
                    e.component.option('value', keys);
                },
            });

            e.component.on('valueChanged', (args) => {
                console.log('gridBoxChequesTerceirosDisponiveis > e.component.on("valueChanged', e);
                const { value } = args;
                this.grid.selectRows(value, false);
            });

            return $div;
        },
        onValueChanged: (e) => {
            console.log('gridBoxChequesTerceirosDisponiveis > onValueChanged', e);
        },
    });
    this.gridPagamentosQuitacaoChequeTerceiro = new DevExpress.ui.dxDataGrid("#gridPagamentosQuitacaoChequeTerceiro", {
        dataSource: dataSource.chequesTerceirosDisponiveis,
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        editing: {
            mode: 'cell',
            allowUpdating: true,
            startEditAction: 'click',
            allowAdding: false,
            allowDeleting: true,
            useIcons: true,
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
            mode: "multiple"
        },
        selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
            deferred: true,
        },
        allowColumnResizing: true,
        allowColumnReordering: true,
        groupPanel: {
            visible: true,
            emptyPanelText: "Solte aqui as colunas para agrupar"
        },
        paging: {
            pageSize: 15
        },
        pager: {
            visible: true,
            allowedPageSizes: [15, 20, 50, 100],
            showPageSizeSelector: false,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        filterPanel: {
            visible: true
        },
        columnChooser: {
            enabled: true,
            allowSearch: true,
        },
        columnsAutoWidth: true,
        showBorders: true,
        summary: {
            totalItems: [{
                column: 'CD_BANCO',
                summaryType: 'count',
                displayFormat: "{0} Pagto(s)",
            }, {
                column: 'VL_CHEQUE',
                summaryType: 'sum',
                valueFormat: "###,###,###,##0.00",
                displayFormat: "{0}",
            }
            ],
        },
        toolbar: {
            items: [
                {
                    name: "groupPanel",
                    locateInMenu: "auto",
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'hierarchy',
                        text: '',
                        hint: 'Fechar ou expandir os agrupamentos',
                        onClick(e) {
                            const dataGrid = $("#gridPagamentosQuitacaoChequeTerceiro").dxDataGrid('instance');

                            const expanding = e.component.option('text') === 'Expandir Agrupamento';
                            dataGrid.option('grouping.autoExpandAll', expanding);
                            e.component.option('text', expanding ? '' : 'Expandir Agrupamento');
                        },
                    },
                },
                'exportButton',
                'columnChooserButton',
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'trash',
                        text: 'Excluir Pagamentos',
                        hint: "Excluir os pagamentos selecionados",
                        onClick() {
                            AbrirModal('#ModalConfirmacaoExclusaoPagamentosChequeTerceirosQuitacao');
                        },
                    },
                },
                'searchPanel'
            ],
        },
        columns: [
            {
                type: "selection",
                width: 30,
            },
            {
                dataField: "CD_BANCO",
                caption: "Banco",
                width: 75,
                allowEditing: false,
                allowSorting: true,
                alignment: 'center',
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
            },
            {
                dataField: "CD_AGENCIA",
                caption: "Ag",
                width: 60,
                allowEditing: false,
                allowSorting: true,
                alignment: 'center',
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
            },
            {
                dataField: "CD_CONTA_CORRENTE",
                caption: "CC",
                width: 65,
                allowEditing: false,
                allowSorting: true,
                alignment: 'center',
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
            },
            {
                dataField: "NR_FOLHA_CHEQUE",
                caption: "Nº Cheque",
                width: 60,
                allowEditing: false,
                allowSorting: true,
                alignment: 'center',
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "NR_LANCAMENTO",
                caption: "Nº Título Origem",
                width: 60,
                allowEditing: false,
                allowSorting: true,
                alignment: 'center',
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "NR_PARCELA_ORIGEM",
                caption: "Parcela Origem",
                //width: 40,
                allowEditing: false,
                allowSorting: true,
                alignment: 'center',
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                dataField: "NR_DOCUMENTO_ORIGEM",
                caption: "Nº Docto Origem",
                //width: 40,
                allowEditing: false,
                allowSorting: true,
                alignment: 'center',
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                dataField: "CD_CPF_CNPJ_TITULAR",
                caption: "CPF/CNPJ Titular",
                //width: 40,
                allowEditing: false,
                allowSorting: true,
                alignment: 'center',
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                dataField: "DS_RAZAO_SOCIAL_CLIENTE",
                caption: "Cliente Origem",
                width: 200,
                allowEditing: false,
                allowSorting: true,
                alignment: 'left',
                allowHeaderFiltering: true,
                cssClass: "column-data-grid",
                groupIndex: 0,
            },
            {
                dataField: "DS_FANTASIA_CLIENTE",
                caption: "Fantasia Cliente Origem",
                width: 200,
                allowEditing: false,
                allowSorting: true,
                alignment: 'left',
                allowHeaderFiltering: true,
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "CD_CENTRO_CUSTO",
                caption: "CENTRO DE CUSTO",
                //width: 350,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Centro de Custo obrigatório', }],
                lookup: {
                    dataSource: dataSource.centroCusto.dxDataSource,
                    searchExpr: 'text',
                    valueExpr: 'Cd_Centro_Custo',
                    displayExpr: 'text',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Centro de Custo',
                        width: 400,
                    },
                },
            }, {
                dataField: "CD_PLANO_CONTA",
                caption: "PLANO DE CONTA",
                //width: 350,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'left',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Conta obrigatória', }],
                lookup: {
                    dataSource: dataSource.planoConta.dxDataSource,
                    searchExpr: 'text',
                    valueExpr: 'Cd_Plano_Conta',
                    displayExpr: 'text',
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: 'Plano de Conta',
                        width: 400,
                    },
                },
            },
            {
                dataField: "DS_HISTORICO",
                caption: "Histórico",
                //width: 150,
                allowEditing: true,
                allowSorting: true,
                alignment: 'left',
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
                visible: true,
            },
            {
                dataField: "DT_PAGAMENTO",
                caption: "Data Pagto",
                width: 90,
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                dataType: "date",
                format: "dd/MM/yyyy",
                editorOptions: { useMaskBehavior: true },
                alignment: 'center',
                cssClass: "column-data-grid",
                validationRules: [{ type: 'required', message: 'Data do pagamento obrigatória', }],
            },
            {
                dataField: "DT_PRE",
                caption: "Data Pré",
                width: 90,
                //sortOrder: 'asc',
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                dataType: "date",
                format: "dd/MM/yyyy",
                editorOptions: { useMaskBehavior: true },
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "VL_CHEQUE",
                caption: "Valor Cheque",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                dataType: "number",
                format: "###,###,###,##0.00",
                alignment: 'right',
                cssClass: "column-data-grid",
            },
            {
                dataField: "NR_SEQUENCIA",
                caption: "Sequência",
                //width: 40,
                allowEditing: false,
                allowSorting: true,
                alignment: 'center',
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                dataField: "NR_PARCELA_ATUAL",
                caption: "Parcela Atual",
                //width: 40,
                allowEditing: false,
                allowSorting: true,
                alignment: 'center',
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
                visible: false,
            },
            {
                type: "buttons",
                width: 30,
                cssClass: "column-data-grid",
            },
        ],
        onExporting: (e) => {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Pagamentos');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], {
                        type: 'application/octet-stream'
                    }), 'PagamentosGeraisChequeTerceiro.xlsx');
                });
            });
            e.cancel = true;
        },
        onRowPrepared: () => {
            //Verifica se existe diferença entre a somatória dos pagamentos para lançamento de títulos já quitado e o valor total do título
            verificaDiferencaTituloQuitacao();
        },
        onRowRemoved: () => {
            //Verifica se existe diferença entre a somatória dos pagamentos para lançamento de títulos já quitado e o valor total do título
            verificaDiferencaTituloQuitacao();
        },
        onEditingStart(e) {
            //Verifica se a data de vencimento e o valor do título foram informados
            if (validaValorDataVencimento() == false) {
                e.component.cancelEditData();
            };
        },
        onEditorPreparing: (e) => {

            //if(e.parentType === "dataRow" && e.dataField === "CD_CONTA_CORRENTE") {  
            //}  
            e.editorOptions.onOpened = function (arg) {
                var popupInstance = arg.component._popup;
                popupInstance.option('width', 400);
                popupInstance.off("optionChanged", optionChangedHandler);
                popupInstance.on("optionChanged", optionChangedHandler);
            }
        },
        onCellPrepared: (e) => {
            if (e.rowType === "data") {
                if (e.column.dataField === "CD_PLANO_CONTA" || e.column.dataField === "CD_CENTRO_CUSTO" || e.column.dataField === "DS_HISTORICO" || e.column.dataField === "DT_PAGAMENTO") {
                    e.cellElement.css("background-color", "#EDF3F8");
                }
            }
        },
    });
    this.nbx_Vl_Juros_Quitacao = new DevExpress.ui.dxNumberBox('#nbx_Vl_Juros_Quitacao', {
        value: '',
        format: 'R$ ###,###,###,##0.00', //ATENÇÃO: Este campo de formatação de moeda deverá retornar da tabela de Parâmetros Corporativos (NÃO DEVE SER FIXO)
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                //"font-weight": "bold",
                "color": "darkred",
            });
        },
        onValueChanged: (e) => {
            return; //Verificar
            //Verifica a diferença entre a somatória dos pagamentos para lançamento de títulos já quitado e o valor total do título
            verificaDiferencaTituloQuitacao();
        }
    });
    this.nbx_Vl_Multa_Quitacao = new DevExpress.ui.dxNumberBox('#nbx_Vl_Multa_Quitacao', {
        value: '',
        format: 'R$ ###,###,###,##0.00', //ATENÇÃO: Este campo de formatação de moeda deverá retornar da tabela de Parâmetros Corporativos (NÃO DEVE SER FIXO)
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        //placeholder: 'Multa (+)',
        //labelMode: 'floating',
        //label: 'Multa (+)',
        onContentReady: (e) => {
            e.component.element().find("input").eq(1).css({
                //"font-weight": "bold",
                "color": "darkred",
            });
        },
        onValueChanged: (e) => {
            return; //TODO: verificar
            //Verifica a diferença entre a somatória dos pagamentos para lançamento de títulos já quitado e o valor total do título
            verificaDiferencaTituloQuitacao();
        }
    });
    this.nbx_Vl_Desconto_Quitacao = new DevExpress.ui.dxNumberBox('#nbx_Vl_Desconto_Quitacao', {
        value: '',
        format: 'R$ ###,###,###,##0.00', //ATENÇÃO: Este campo de formatação de moeda deverá retornar da tabela de Parâmetros Corporativos (NÃO DEVE SER FIXO)
        min: 0,
        showClearButton: true,
        showSpinButtons: true,
        step: 1,
        onContentReady: (e) => {
            //e.component.element().find("input").eq(1).css({
            //    "font-weight": "bold",
            //});
        },
        onValueChanged: (e) => {
            return; //TODO: verificar
            //Verifica a diferença entre a somatória dos pagamentos para lançamento de títulos já quitado e o valor total do título
            verificaDiferencaTituloQuitacao();
        }
    });
    this.alertaConferenciaPagtosQuitacao = {
        $div_alertaConferenciaPagtosQuitacao: $('#div_alertaConferenciaPagtosQuitacao'),
        $memValorTituloPagtoQuitacao: $('#memValorTituloPagtoQuitacao'),
        $memTotalPagtoQuitacao: $('#memTotalPagtoQuitacao'),
        $memSaldoPagtoQuitacao: $('#memSaldoPagtoQuitacao'),
    }
}
function LoadParcelas() {
    const gridOptions = createOptionsGridLancamentos()
    gridOptions.columns = gridOptions.columns.filter(a => a.type != "selection");
    this.gridParcelasRelacionadas = new DevExpress.ui.dxDataGrid('#gridParcelasRelacionadas', Object.assign(gridOptions, {
        toolbar: {
            items: [
                {
                    location: 'after',
                    widget: 'dxSelectBox',
                    options: {
                        dataSource: new DevExpress.data.DataSource({
                            key: 'id',
                            store: [
                                { id: 0, text: "Todos os títulos Relacionados" },
                                { id: 1, text: "Somente Títulos Abertos" },
                                { id: 2, text: "Somente Títulos Quitados" },
                                { id: 3, text: "Somente Títulos Cancelados" },
                            ]
                        }),
                        searchExpr: 'text',
                        displayExpr: 'text',
                        valueExpr: 'id',
                        value: 0,
                        hint: 'Filtrar títulos pela situação',
                        width: 200,
                        //labelMode: 'floating',
                        //label: 'Filtro por Situação',
                        placeholder: 'Filtro por Situação',
                        showClearButton: false,
                        onValueChanged: (e) => {
                            //if (e.value == 0) {
                            //    e.component.option('elementAttr', { class: 'filtro_titulos_total' });
                            //} else {
                            //    //e.component.option('elementAttr', {class: 'filtro_titulos_parcial'});
                            //    e.component.option('elementAttr', { class: 'filtro_titulos_total' });
                            //};
                        },
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'refresh',
                        hint: 'Atualiza a lista de títulos a pagar',
                        onClick() {
                            const dataGrid = $("#gridConsultaTitulos").dxDataGrid('instance');
                            dataGrid.refresh();
                        },
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'hierarchy',
                        text: '',
                        hint: 'Fechar ou expandir os agrupamentos',
                        onClick(e) {
                            const dataGrid = $("#gridConsultaTitulos").dxDataGrid('instance');

                            const expanding = e.component.option('text') === 'Expandir Agrupamento';
                            dataGrid.option('grouping.autoExpandAll', expanding);
                            e.component.option('text', expanding ? '' : 'Expandir Agrupamento');
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
        onInitialized: (e) => {
            e.component.loadData = (data) => {
                e.component.option('dataSource', new DevExpress.data.DataSource({
                    key: ["Nr_Lancamento", "Nr_Parcela_Atual"],
                    store: data,
                }));
            }
        }
    }));
}
function LoadNavegacao() {
    let indiceAtual = null;
    const getGrid = () => dxComp.consultaTitulos.gridConsultaTitulos;
    const getItems = () => getGrid().getDataSource().store().__rawData;
    this.getFilterDataKeys = () => {
        const grid = dxComp.consultaTitulos.gridConsultaTitulos;
        const filterExpr = grid.getCombinedFilter(true);
        const dataSource = grid.getDataSource();
        const loadOptions = dataSource.loadOptions();

        return dataSource
            .store()
            .load({ filter: filterExpr, sort: loadOptions.sort, group: loadOptions.group })
            .then((result) => {
                if (loadOptions.group != null)
                    for (let index = 0; index < loadOptions.group.length; index++)
                        result = [].concat(...result.map(a => a.items));
                return result.map(a => ({
                    Nr_Lancamento: a.Nr_Lancamento,
                    Nr_Parcela_Atual: a.Nr_Parcela_Atual,
                }));
            })
    };
    this.lancamento = {};
    this.parcelas = [];
    this.loadLancamento = async (index) => {
        dxComp.loadPanel.show();
        if (Number.isInteger(index))
            indiceAtual = index < 0 ? indiceAtual : index;
        const grid = getGrid();
        if (typeof index == 'string') {
            this.parcelas = null;
            this.lancamento = null;
        } else {
            const arrKeys = await this.getFilterDataKeys();
            const item = arrKeys[indiceAtual];
            grid.navigateToRow(item);
            grid.option('focusedRowKey', item);
            this.parcelas = await dataSource.titulos.getLancamento(item.Nr_Lancamento);
            this.lancamento = this.parcelas.find(a => a.Nr_Parcela_Atual == item.Nr_Parcela_Atual);
        }

        console.group('loadLancamento');
        console.log(this.lancamento);
        console.time('load');

        await Promise.all([
            new loadDadosGerais(this.lancamento),
            new loadParcelasLancamento(this.parcelas),
            new loadInfoTitulo(this.lancamento),
            new loadParcelamento(),
            new loadLancamentoQuitado(),
            new loadDadosBaixaFutura(this.lancamento),
            new loadRateioCentroCusto(this.lancamento),
            new loadPagamentosLancamento(this.lancamento),
        ]);
        dxComp.loadPanel.hide();
        console.timeEnd('load');
        console.groupEnd('loadLancamento');
    }
    this.anterior = () => {
        indiceAtual = indiceAtual ?? 0;
        if (indiceAtual > 0)
            indiceAtual--;
        else
            indiceAtual = getItems().length - 1;
        return this.loadLancamento();
    }
    this.proximo = () => {
        indiceAtual = indiceAtual ?? -1;
        if (indiceAtual < getItems().length - 1)
            indiceAtual++;
        else
            indiceAtual = 0;
        return this.loadLancamento();
    }

    const elements = {
        $div_statusTitulo: $('#div_statusTitulo'),
        $infoInclusaoTitulo: $('#infoInclusaoTitulo'),
        $infoTituloAberto: $('#infoTituloAberto'),
        $infoTituloRecebidoParcial: $('#infoTituloRecebidoParcial'),
        $infoTituloRecebidoTotal: $('#infoTituloRecebidoTotal'),
        $infoTituloQuitado: $('#infoTituloQuitado'),
        $infoTituloCancelado: $('#infoTituloCancelado'),
        $btnVisualizarJustificativaCancelamento: $('#btnVisualizarJustificativaCancelamento'),
        $infoNumeroLancamento: $('#infoNumeroLancamento'),
        $nr_lancamento: $('#infoNumeroLancamento #nr_lancamento'),
        $parcela_atual: $('#infoNumeroLancamento #parcela_atual'),
        $parcela_total: $('#infoNumeroLancamento #parcela_total'),
        $taggleParcelamento: $('#taggleParcelamento'),
        $taggleTituloQuitado: $('#taggleTituloQuitado'),
        $taggleBaixaFutura: $('#taggleBaixaFutura'),
        $taggleRateioCentroCusto: $('#taggleRateioCentroCusto'),
        getTagByStatus: function (status, saldoPagar, parcela) {
            if (status == enumSituacaoLancamento.Aberto) {
                if (saldoPagar == parcela)
                    return this.$infoTituloRecebidoTotal;
                if (saldoPagar < parcela)
                    return this.$infoTituloRecebidoParcial;
                return this.$infoTituloAberto;
            }
            if (status == enumSituacaoLancamento.Pago)
                return this.$infoTituloQuitado;
            return this.$infoTituloCancelado;
        },
    }

    this.elements = elements;

    function loadInfoTitulo(lancamento) {
        console.time('loadInfoTitulo');
        return new Promise((resolve) => {
            animateCSS(['#abaAcessoParcelas', '#abaAcessoPagamentos'], lancamento ? 'fadeIn' : 'fadeOut', lancamento ? 'in' : 'out');

            $('.infos-titulo:visible').hide();

            elements.$div_statusTitulo.removeClass(["alert-info", "alert-danger", "alert-success", "alert-dark"]);

            if (!lancamento) {
                elements.$infoInclusaoTitulo.show();
                elements.$div_statusTitulo.addClass('alert-dark');
                return resolve();
            }

            elements.$infoInclusaoTitulo.hide();

            elements.$infoNumeroLancamento.show();
            elements.$nr_lancamento.text(lancamento.Nr_Lancamento);
            elements.$parcela_atual.text(lancamento.Nr_Parcela_Atual);
            elements.$parcela_total.text(lancamento.Nr_Parcelas_Total);

            const tag = elements.getTagByStatus(lancamento.Cd_Situacao_Lancamento,
                lancamento.Vl_Saldo_Pagar,
                lancamento.Vl_Parcela);
            tag.show();

            const classDiv_statusTitulo = {
                1: 'alert-info',
                2: 'alert-success',
                3: 'alert-danger',
            }[lancamento.Cd_Situacao_Lancamento];
            elements.$div_statusTitulo.addClass(classDiv_statusTitulo);

            animateCSS('#infoTitulo', 'fadeIn', 'in');
            console.timeEnd('loadInfoTitulo');
            resolve();
        });
    }

    function loadDadosGerais(lancamento) {
        console.time('loadDadosGerais');
        return new Promise((resolve) => {

            const titulo = dxComp.principaisTitulos.titulo;

            titulo.lkp_filial_ApenasAtivasPorUsuario.option('value', !lancamento?.Cd_Filial ? null : String(lancamento.Cd_Filial));
            titulo.lkp_fornecedores.option('value', !lancamento?.Cd_Fornecedor ? null : String(lancamento.Cd_Fornecedor));
            titulo.lkp_categoriaFinanceira.option('value', lancamento?.Cd_Categoria ?? null);
            titulo.lkp_centroCusto.option('value', !lancamento?.Cd_Centro_Custo ? null : String(lancamento.Cd_Centro_Custo));
            titulo.lkp_planoDeContas_D_CD.option('value', lancamento?.Cd_Plano_Conta ?? null);
            titulo.lkp_tipoDocumento.option('value', lancamento?.Cd_Tipo_Documento ?? null);
            titulo.txt_Ds_Historico.option('value', lancamento?.Ds_Historico ?? null);

            const configureDate = (date) => {
                const dateMoment = moment(date);
                if (dateMoment.isValid())
                    return dateMoment.toDate();
                return null;
            }

            titulo.dt_Vencimento.option('value', !lancamento?.Dt_Vencimento ? null : configureDate(lancamento.Dt_Vencimento));
            titulo.dt_Competencia.option('value', !lancamento?.Dt_Competencia ? null : configureDate(lancamento.Dt_Competencia));
            titulo.dt_Emissao_Documento.option('value', !lancamento?.Dt_Emissao_Documento ? null : configureDate(lancamento.Dt_Emissao_Documento));

            titulo.txt_Nr_Documento.option('value', lancamento?.Nr_Documento ?? null);
            titulo.lkp_Tipo_Pagamento_CNAB.option('value', lancamento?.Cd_Tipo_Pagamento ?? 0);
            titulo.ckb_Controla_Recebimento_Boleto.option('value', lancamento?.Lg_Controla_Recebimento_Boleto ?? false);
            titulo.nbx_Vl_Total_Titulo.option('value', lancamento?.Vl_Parcela ?? null);
            titulo.check_lancamento_quitado.option('value', false);

            if (!lancamento) {
                DevExpress.validationEngine.resetGroup("dadosTitulo");
            }

            console.timeEnd('loadDadosGerais');
            resolve();
        });
    }

    function loadParcelamento() {
        console.time('loadParcelamento');
        return new Promise((resolve) => {
            elements.$taggleParcelamento.show();
            dxComp.principaisTitulos.titulo.gridParcelasPercentual.loadData([]);
            console.timeEnd('loadParcelamento');
            resolve();
        });
    }

    function loadLancamentoQuitado() {
        console.time('loadLancamentoQuitado')
        return new Promise((resolve) => {
            elements.$taggleTituloQuitado.hide();
            console.timeEnd('loadLancamentoQuitado')
            resolve();
        });
    }

    function loadRateioCentroCusto(lancamento) {
        console.time('loadRateioCentroCusto')
        return new Promise((resolve) => {
            console.timeEnd('loadRateioCentroCusto');
            resolve();
        });
    }

    function loadDadosBaixaFutura(lancamento) {
        console.time('loadDadosBaixaFutura')
        return new Promise((resolve) => {
            console.timeEnd('loadDadosBaixaFutura')
            resolve();
        });
    }

    function loadPagamentosLancamento(lancamento) {
        console.time('loadPagamentosLancamento')
        return new Promise((resolve) => {
            console.timeEnd('loadPagamentosLancamento');
            resolve();
        });
    }

    function loadParcelasLancamento(parcelas) {
        console.time('loadParcelasLancamento')
        return new Promise((resolve) => {
            dxComp.principaisTitulos.parcelas.gridParcelasRelacionadas.loadData(parcelas ?? []);
            console.timeEnd('loadParcelasLancamento')
            resolve();
        });
    }
}
function LoadPNotifyMessages() {
    const fnAnimationPNotify = (type, fnCallback, element, obj) => {
        if (!obj.options.class) obj.options.class = 'q' + String(Math.random()).replace('.', '');
        element.addClass(obj.options.class);

        if (type == 'in') {
            element.show();
            animateCSS('.' + obj.options.class, 'fadeInRightBig');
            fnCallback();
        }
        else {
            animateCSS('.' + obj.options.class, 'bounceOutRight').then(() => {
                fnCallback();
                element.hide();
            })
        }
    }
    this.success = (title, text, delay = 2500, animation = fnAnimationPNotify) =>
        new PNotify({
            title: title,
            text: text,
            type: "success",
            delay: delay,
            animation: animation,
        });
    this.error = (title, text, delay = 4000, animation = fnAnimationPNotify) => {
        console.error({ title, text, delay, animation });
        return new PNotify({
            title: title,
            text: text,
            type: "error",
            delay: delay,
            animation: animation,
        });
    }
    this.info = (title, text, delay = 2500, animation = fnAnimationPNotify) => {
        console.info({ title, text, delay, animation })
        return new PNotify({
            title: title,
            text: text,
            type: "info",
            delay: delay,
            animation: animation,
        });
    }
}
function LoadPopups() {
    this.popupConfirmacaoExclusaoParcelas = new DevExpress.ui.dxPopup("#popupConfirmacaoExclusaoParcelas", {
        minWidth: 208,
        maxWidth: 800,
        width: '90vw',
        minHeight: 282,
        height: 'auto',
        showCloseButton: false,
        showTitle: false,
        onShowing: (e) => {
            e.component._$wrapper.css('z-index', 997);
            e.component.setTextoAdicional(e.component?.textoAdicional ?? '');
        },
        contentTemplate: function (content) {
            content.addClass('p-0');
            const $section = $($('#contentPopupConfirmacaoExclusaoParcelas').html());
            this.setTextoAdicional = (text) => $section.find('#textoAdicional').text(text);
            this.toolbar = new DevExpress.ui.dxToolbar($section.find('#toolbar'), {
                items: [
                    {
                        location: 'after',
                        locateInMenu: 'never',
                        widget: 'dxButton',
                        options: {
                            text: "Confirmar exclusão",
                            icon: "fa-solid fa-trash-can-list mr-3",
                            type: "default",
                            onClick: () => {
                                this.resolve(true);
                                this.hide();
                            },
                        },
                    },
                    {
                        location: 'after',
                        locateInMenu: 'never',
                        widget: 'dxButton',
                        options: {
                            text: "Cancelar exclusão",
                            icon: "fa-solid fa-xmark",
                            type: "danger",
                            onClick: () => {
                                this.resolve(false);
                                this.hide();
                            },
                        },
                    },
                ],
            });
            return $section;
        },
        onInitialized: (e) => {
            e.component.exibir = (textoAdicional) => {
                e.component.textoAdicional = textoAdicional;
                const promise = new Promise((resolve) => {
                    e.component.resolve = resolve;
                });
                e.component.show();
                return promise;
            }
        },
    });

    this.popupConfirmacao = (
        titulo = 'Confirmação',
        icone = 'fa fa-question-circle fa-5x',
        pergunta = 'Deseja realmente realizar esta operação?',
        texto = 'Este processo não poderá ser desfeito.',
        botoes = [
            {
                text: "Confirmar",
                icon: "fa-solid fa-trash-can-list mr-3",
                type: "default",
            },
            {
                text: "Cancelar",
                icon: "fa-solid fa-xmark",
                type: "danger",
            }
        ],
    ) => {
        const render = mustache.render($('#contentPopupConfirmacao').html(), { titulo, icone, pergunta, texto });
        const $section = $(render);
        const promise = new Promise((resolve) => {
            const popup = new DevExpress.ui.dxPopup("#popupConfirmacao", {
                minWidth: 208,
                maxWidth: 800,
                width: '90vw',
                minHeight: 282,
                height: 'auto',
                showCloseButton: false,
                showTitle: false,
                onShowing: (e) => {
                    e.component._$wrapper.css('z-index', 997);
                },
                contentTemplate: function (content) {
                    content.addClass('p-0');
                    this.toolbar = new DevExpress.ui.dxToolbar($section.find('#toolbar'), {
                        items: [
                            {
                                location: 'after',
                                locateInMenu: 'never',
                                widget: 'dxButton',
                                options: {
                                    ...botoes[0],
                                    ...{
                                        onClick: () => {
                                            resolve(true);
                                            this.hide();
                                        },
                                    }
                                }
                            },
                            {
                                location: 'after',
                                locateInMenu: 'never',
                                widget: 'dxButton',
                                options: {
                                    ...botoes[1],
                                    ...{
                                        onClick: () => {
                                            resolve(false);
                                            this.hide();
                                        },
                                    }
                                }
                            },
                        ],
                    });
                    return $section;
                },
            })
            popup.show();
        });
        return promise;
    };

    this.popupInfo = ({ titulo = 'Informação', icone = 'fa fa-circle-info', idConteudo }) => {
        const conteudo = $(`${idConteudo.includes('#') ? '' : '#'}${idConteudo}`).html();
        const render = mustache.render($('#contentPopupInfo').html(), { titulo, icone, conteudo });
        const $section = $(render);
        const popup = new DevExpress.ui.dxPopup("#popupInfo", {
            minWidth: 208,
            maxWidth: 800,
            width: '90vw',
            minHeight: 282,
            height: 'auto',
            showCloseButton: false,
            showTitle: false,
            onShowing: (e) => {
                e.component._$wrapper.css('z-index', 997);
            },
            contentTemplate(content) {
                content.addClass('p-0');
                this.btn_sair = new DevExpress.ui.dxButton($section.find('#btn_sair'), {
                    text: 'Fechar',
                    icon: 'fa fa-person-from-portal',
                    onClick: () => {
                        this.hide();
                    },
                });
                return $section;
            },
        })
        popup.show();
    };
}
function LoadMenu() {
    const getVisibleHidden = (type = 'visible') => [
        'opcoes',
        'informacoesTitulo',
        'consultaTitulos',
        'cabecalho',
        'btn_voltar',
        'principalTitulos',
    ].filter(a => $(`#${a}`).is(`:${type ?? 'hidden'}`));
    const myShow = (mostrar) => {
        const juntar = (arr) => arr.map(a => "#" + a);
        dxComp.principaisTitulos.salvarAlterar.option('visible', mostrar.includes('botao-alterar-salvar') ? true : false);
        return animateCSS(
            juntar(getVisibleHidden('visible').filter(a => !mostrar.includes(a))),
            'fadeOut',
            'out'
        ).then(() =>
            animateCSS(
                juntar(getVisibleHidden('hidden').filter(a => mostrar.includes(a))),
                'fadeIn',
                'in'
            )
        );
    };
    const name = '#tituloCAP', $name = $(name);
    this.AlterarTituloCAP = (titulo = "Menu Contas a Pagar") => {
        if ($name.text() == titulo) {
            return;
        }
        animateCSS(name, 'fadeOut', 'out').then(() => {
            $name.text(titulo);
            animateCSS(name, 'fadeIn', 'in');
        })
    };
    this.MenuInicial = () => {
        this.AlterarTituloCAP();
        myShow(['cabecalho', 'opcoes', 'principalTitulos']);
    };
    this.NovoLancamento = () => {
        //dxComp.criarLancamento(); //TODO: retirar comentário
        this.AlterarTituloCAP("Novo Lançamento de Contas a Pagar");
        myShow(['cabecalho', 'informacoesTitulo', 'btn_voltar', 'principalTitulos', 'botao-alterar-salvar']);
    };
    this.ConsultaGeral = (alterarText = true) => {
        if (alterarText) {
            this.AlterarTituloCAP();
        }
        myShow(['consultaTitulos']);
    };

    const $voltar = $('#btn_voltar');
    const $btnFecharConsulta = $('#btnFecharConsulta');
    $btnFecharConsulta.popover = createPopover($btnFecharConsulta, "Fechar consulta e voltar para o menu principal");

    $('#NovoLancamento').on('click', () => {
        $voltar.data('pagina', 'menu');
        this.NovoLancamento();
    });
    $('#ConsultaGeral').on('click', () => {
        $voltar.data('pagina', 'menu');
        $btnFecharConsulta.data('pagina', 'menu');
        this.ConsultaGeral();
    });

    $btnFecharConsulta.on('click', () => {
        const { pagina } = $btnFecharConsulta.data();
        let execute = {
            menu: this.MenuInicial,
            titulo: this.NovoLancamento,
        }[pagina ?? 'menu'];
        execute();
    });
}
function RateioPercentualGridDelete() {
    var comp = $('#gridParcelasPercentual').dxDataGrid('instance');

    var qtRegistros = comp.totalCount();
    var pcRateio;
    var valorParcela;
    var varDizima = 0;

    if (valorTotalTitulo > 0) {
        if (qtRegistros > 0) {

            pcRateio = 100 / qtRegistros;
            valorParcela = valorTotalTitulo * (pcRateio / 100);
            valorParcela = parseFloat(valorParcela.toFixed(2));

            //Verifica se houve dízima
            if ((valorParcela * qtRegistros) !== valorTotalTitulo) {
                varDizima = valorTotalTitulo - (valorParcela * qtRegistros);
                varDizima = parseFloat(varDizima.toFixed(2));
            };

            comp.getDataSource().store().load().done((res) => {
                for (var i in res) {

                    //Ajusta a dízima no primeiro registro
                    if (i == 0 && varDizima !== 0) {
                        res[i]["PC_RATEIO"] = (valorParcela + varDizima) / valorTotalTitulo;
                        res[i]["VL_PARCELA"] = valorParcela + varDizima;
                    } else {
                        res[i]["PC_RATEIO"] = valorParcela / valorTotalTitulo;
                        res[i]["VL_PARCELA"] = valorParcela;
                    };

                }
            });

            comp.refresh();
        }
    }
}
function RateioPercentualGrid(newData, tipo) {
    var comp = $('#gridParcelasPercentual').dxDataGrid('instance');
    var qtRegistros = comp.totalCount();
    var pcRateio;
    var valorParcela;
    var varDizima = 0;

    if (tipo == 'I') {
        qtRegistros = qtRegistros + 1;
    };

    if (valorTotalTitulo > 0) {
        //if (qtRegistros > 0) {
        //    //if (tipo == 'I') {
        //    //    pcRateio = 100 / (qtRegistros + 1);
        //    //} else {
        //    //    pcRateio = 100 / (qtRegistros);
        //    //};
        //} else {
        //    pcRateio = 100
        //};

        pcRateio = 100 / qtRegistros;

        valorParcela = valorTotalTitulo * (pcRateio / 100)
        valorParcela = parseFloat(valorParcela.toFixed(2))
    } else {
        //Verificar se o valor do lançamento e data de vencimento foram informados pelo usuário
        validaValorDataVencimento();
    };

    //Verifica se houve dízima
    if ((valorParcela * qtRegistros) !== valorTotalTitulo) {
        varDizima = valorTotalTitulo - (valorParcela * qtRegistros);
        varDizima = parseFloat(varDizima.toFixed(2));
    };

    //newData.PC_RATEIO = pcRateio / 100;
    newData.PC_RATEIO = (valorParcela + varDizima) / valorTotalTitulo;
    newData.VL_PARCELA = parseFloat(valorParcela.toFixed(2)) + parseFloat(varDizima.toFixed(2));

    comp.getDataSource().store().load().done((res) => {
        for (var i in res) {
            res[i]["PC_RATEIO"] = valorParcela / valorTotalTitulo;
            res[i]["VL_PARCELA"] = valorParcela;
        }
    });

    comp.refresh();
}

$(async () => {
    dxComp.acoesMenu = new LoadMenu();

    $('<div>').appendTo('.content-body').each((index, element) => {
        dxComp.principaisTitulos.salvarAlterar = new DevExpress.ui.dxSpeedDialAction(element, { //TODO: verificar mobile
            icon: 'fas fa-floppy-disk',
            label: 'Salvar',
            visible: false,
            onClick: () => {
                console.log('salvarAlterar');

                const { lancamento } = dxComp;

                dxComp.principaisTitulos.titulo.gridParcelasPercentual.saveEditData()
                    .then(() => lancamento.create());
            },
            onContentReady: (e) => {
                const div = e.actionElement.find('.dx-overlay-content.dx-resizable')[0];

                div.addEventListener('mousedown', (event) => {
                    const offsetX = event.clientX - div.offsetLeft;
                    const offsetY = event.clientY - div.offsetTop;

                    const mouseMoveHandler = (event) => {
                        div.style.left = `${event.clientX - offsetX}px`;
                        div.style.top = `${event.clientY - offsetY}px`;
                    };

                    const mouseUpHandler = () => {
                        document.removeEventListener('mousemove', mouseMoveHandler);
                        document.removeEventListener('mouseup', mouseUpHandler);
                    };

                    document.addEventListener('mousemove', mouseMoveHandler);
                    document.addEventListener('mouseup', mouseUpHandler);
                });
            },
            onInitialized: (e) => {
                e.component.operacoesAtual = 'salvar';
                e.component.alterarText = (text) => {
                    e.component.option('label', text);
                    return e.component;
                }
                e.component.alterarIcon = (icon) => {
                    e.component.option('icon', icon);
                    return e.component;
                }
                e.component.alterarTextIconFromOperation = (operation) => {
                    let [text, icon] = {
                        'salvar': ['Salvar', 'fas fa-floppy-disk'],
                        'reativar': ['Reativar', 'fas fa-clock-rotate-left'],
                        'cancelar': ['Cancelar', 'fas fa-window-close']
                    }[operation];
                    e.component.operacoesAtual = operation;
                    return e.component.alterarText(text).alterarIcon(icon);
                }
                DevExpress.config({
                    floatingActionButtonConfig: {
                        icon: 'rowfield',
                        shading: true,
                        position: {
                            my: 'bottom',
                            at: 'bottom',
                            offset: '0 -10',
                        },
                    },
                });
            },
        })
    });

    dxComp.loadPanel = DevExpress.ui.dxLoadPanel.getInstance('#loadPanelCAP');

    const $titulos = document.querySelector('.botoes-superiores #titulos');
    $titulos.addEventListener('click', () => {
        dxComp.acoesMenu.ConsultaGeral(false);
        $('#btnFecharConsulta').data('pagina', 'titulo');
    });
    createPopover($titulos, "Consultar Títulos a Pagar para manutenção");

    const $anterior = document.querySelector('.botoes-superiores #anterior');
    $anterior.addEventListener('click', () => dxComp.navegacao.anterior());
    createPopover($anterior, "Título Anterior");

    const $proximo = document.querySelector('.botoes-superiores #proximo');
    $proximo.addEventListener('click', () => dxComp.navegacao.proximo());
    createPopover($proximo, "Próximo Título");

    const $novo = document.querySelector('.botoes-superiores #novo');
    $novo.addEventListener('click', () => {
        dxComp.navegacao.loadLancamento('novo');
        dxComp.criarLancamento();
    });
    createPopover($novo, "Criar novo título");

    const $sair = document.querySelector('#btn_sair');
    $sair.addEventListener('click', () => {
        dxComp.popups.popupConfirmacao(
            "Sair do módulo",
            "fa-duotone fa-person-from-portal fa-5x",
            "Deseja voltar para o Painel Central?",
            "Redirecionaremos você automaticamente.",
            [
                {
                    text: "Ir para Painel Central",
                    icon: "fa-duotone fa-door-open",
                    type: "default",
                },
                {
                    text: "Cancelar",
                    icon: "fa-solid fa-xmark",
                    type: "danger",
                }
            ]
        ).then(resposta => {
            if (resposta) {
                window.location.href = "/";
            }
        })
    });
    createPopover($sair, "Sair do Contas a Pagar");

    const $voltar = document.querySelector('#btn_voltar');
    $voltar.addEventListener('click', () => {
        const { pagina } = $voltar.dataset;
        let execute = {
            menu: dxComp.acoesMenu.MenuInicial,
            titulo: dxComp.acoesMenu.NovoLancamento,
        }[pagina];
        execute();
    });

    animateCSS('#inicioLoad', 'fadeOut', 'out').then(() => animateCSS('#cap_main', 'fadeIn', 'in'));

    $('#lkp_contaCorrente_CNAB').dxLookup({
        items: [ //TODO: verificar dataSource
            { CD_CHAVE: "237|104|281216", DS_PESQUISA: "BRADESCO KPR COTIA - Banco: 237 / Agência: 104 / Conta: 281216-9", },
            { CD_CHAVE: "237|104|82980", DS_PESQUISA: "BRADESCO MEF - Banco: 237 / Agência: 104 / Conta: 82980-3", },
            { CD_CHAVE: "999|999|999", DS_PESQUISA: "CAIXA - Banco: 999 / Agência: 999 / Conta: 999-9", },
            { CD_CHAVE: "0|000|000", DS_PESQUISA: "CHEQUE DE TERCEIROS - Banco: 0 / Agência: 000 / Conta: 000-0", },
            { CD_CHAVE: "341|8215|14519", DS_PESQUISA: "ITAU KPR - Banco: 341 / Agência: 8215 / Conta: 14519-7", },
            { CD_CHAVE: "341|8215|14525", DS_PESQUISA: "ITAU MEF - Banco: 341 / Agência: 8215 / Conta: 14525-4", },
            { CD_CHAVE: "33|0389|013003593", DS_PESQUISA: "SANTANDER KPR - Banco: 33 / Agência: 0389 / Conta: 013003593-6", },
            { CD_CHAVE: "33|0389|013003604", DS_PESQUISA: "SANTANDER MEF - Banco: 33 / Agência: 0389 / Conta: 013003604-7", },
            { CD_CHAVE: "33|0389|013003594", DS_PESQUISA: "SANTANDER RK8 - Banco: 33 / Agência: 0389 / Conta: 013003594-3", },
        ],
        searchExpr: ['DS_PESQUISA'],
        displayExpr: 'DS_PESQUISA',
        valueExpr: 'CD_CHAVE',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Conta Corrente para débito *',
            width: 400,
        },
        labelMode: 'floating',
        label: 'Conta Corrente para débito *',
        placeholder: 'Contas habilitadas com número de convênio CNAB e que atendem as filiais dos títulos selecionadas',
        showClearButton: true,
        readOnly: false,
    }).dxValidator({ validationGroup: "geracaoCNAB", validationRules: [{ type: 'required', message: 'Conta Corrente para débito Obrigatória', }], });
    $('#dt_Pagamento_CNAB').dxDateBox({
        labelMode: 'floating',
        label: 'Data do Pagamento *',
        placeholder: '',
        readOnly: false,
        showClearButton: false,
        useMaskBehavior: true,
        displayFormat: 'dd/MM/yyyy',
        type: 'date',
        value: Date(),
    }).dxValidator({ validationGroup: "geracaoCNAB", validationRules: [{ type: 'required', message: 'Data de Pagamento Obrigatória', }], });
    $('#nbx_Cd_Banco_Fornecedor').dxNumberBox({
        value: '',
        //format: '#####',
        min: 0,
        max: 99999,
        maxLength: 5,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'Banco',
        readOnly: true,
    });
    $('#txt_Cd_Banco_Digito_Fornecedor').dxTextBox({
        labelMode: 'floating',
        label: 'Dígito',
        maxLength: 3,
        showClearButton: true,
        readOnly: true,
    });
    $('#nbx_Cd_Agencia_Fornecedor').dxNumberBox({
        value: '',
        min: 0,
        max: 99999999999999999999,
        maxLength: 20,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'Agência',
        readOnly: true,
    });
    $('#txt_Cd_Agencia_Digito_Fornecedor').dxTextBox({
        labelMode: 'floating',
        label: 'Dígito',
        maxLength: 5,
        showClearButton: true,
        readOnly: true,
    });
    $('#nbx_Cd_Conta_Corrente_Fornecedor').dxNumberBox({
        value: '',
        min: 0,
        max: 99999999999999999999,
        maxLength: 20,
        showClearButton: true,
        showSpinButtons: false,
        step: 0,
        labelMode: 'floating',
        label: 'Número da Conta',
        readOnly: true,
    });
    $('#txt_Cd_Conta_Corrente_Digito_Fornecedor').dxTextBox({
        labelMode: 'floating',
        label: 'Dígito',
        maxLength: 5,
        showClearButton: true,
        readOnly: true,
    });
    $('#lkp_Cd_Tipo_Conta_Fornecedor').dxLookup({
        dataSource: new DevExpress.data.DataSource({
            key: '',
            store: [
                { id: 'C', name: "Conta Corrente" },
                { id: 'P', name: "Conta Poupança" },
            ]
        }),
        searchExpr: 'name',
        displayExpr: 'name',
        valueExpr: 'id',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Tipo da Conta',
        },
        labelMode: 'floating',
        label: 'Tipo da Conta',
        placeholder: '',
        showClearButton: true,
        readOnly: true,
    });
    $('#txt_Cd_CPF_CNPJ_Titular_Conta_Fornecedor').dxTextBox({
        labelMode: 'floating',
        label: 'CPF/CNPJ do titular',
        mask: '',
        maxLength: 14,
        showClearButton: true,
        onFocusIn(e) {
            if (e.value.length == 11) {
                e.component.option('mask', '000.000.000-00');
                e.component.option('label', 'CPF do Titular');
            } else if (e.value.length == 14) {
                e.component.option('mask', '00.000.000/0000-00');
                e.component.option('label', 'CNPJ do Titular');
            } else {
                e.component.option('mask', '00000000000000');
                e.component.option('label', 'CPF/CNPJ');
            };
        },
        onValueChanged(e) {
            if (e.value.length == 11) {
                e.component.option('mask', '000.000.000-00');
                e.component.option('label', 'CPF do Titular');
            } else if (e.value.length == 14) {
                e.component.option('mask', '00.000.000/0000-00');
                e.component.option('label', 'CNPJ do Titular');
            } else {
                e.component.option('mask', '00000000000000');
                e.component.option('label', 'CPF/CNPJ do titular');
            };
        },
        readOnly: true,
    });
    $('#txt_Ds_Nome_Titular_Conta_Fornecedor').dxTextBox({
        labelMode: 'floating',
        label: 'Nome do titular da Conta',
        maxLength: 60,
        showClearButton: true,
        readOnly: true,
    });
    $('#txt_Justificativa_Cancelamento').dxTextArea({
        labelMode: 'floating',
        label: 'Justificativa de Cancelamento *',
        height: 150,
        maxLength: 4000,
    }).dxValidator({ validationGroup: "cancelamentoTitulo", validationRules: [{ type: 'required', message: 'Justificativa do Cancelamento Obrigatório', }], });
    $('#txt_Justificativa_Cancelamento_Visualizar_Modal').dxTextArea({
        labelMode: 'floating',
        label: 'Justificativa de Cancelamento',
        value: 'Cobrança indevida do fornecedor. \nFoi realizado um novo pedido para um distribuidor diferente.',
        height: 150,
        maxLength: 4000,
        readOnly: true,
    });

    $('#txt_Codigo_Barras_Boleto').dxNumberBox({
        value: '',
        showClearButton: true,
        showSpinButtons: false,
        placeholder: 'Leia o código de barras do boleto neste campo',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                //"color": "darkred",
            });
        },
    });
    $('#txt_Codigo_Barras_Boleto_Alteracao').dxNumberBox({
        value: '',
        showClearButton: true,
        showSpinButtons: false,
        placeholder: 'Leia o código de barras do boleto neste campo',
        onContentReady: function (e) {
            e.component.element().find("input").eq(1).css({
                "text-align": "center",
                "font-size": "14px",
                "font-weight": "bold",
                //"color": "darkred",
            });
        },
    });

    $('#toolbarAcoesTitulos').dxToolbar({
        items: [
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Editar em série os títulos selecionados',
                    icon: 'edit',
                    onClick() {

                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Cancelar títulos selecionados',
                    icon: 'trash',
                    onClick() {
                        //Validar se o usuário selecionou somente títulos Abertos e Quitados para cancelamento.
                        //Os títulos que já estão Cancelados não podem ser cancelados novamente para não atualizar a justificativa.
                        AbrirModal("#ModalRegistrarJustificativaCancelamento");
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Reativar títulos selecionados',
                    icon: 'check',
                    onClick() {
                        //Somente títulos cancelados ou quitados podem ser reativados
                        new PNotify({
                            title: 'Reatiavação de Título',
                            text: 'Título(s) reativados(s) com sucesso!',
                            type: 'success'
                        });
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Agrupar títulos de mesmo fornecedor',
                    //icon: 'smalliconslayout',
                    icon: 'mediumiconslayout',
                    onClick() {
                        //DevExpress.ui.notify('Save option has been clicked!');
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Desagrupar títulos',
                    icon: 'detailslayout',
                    onClick() {
                        new PNotify({
                            title: 'Desagrupamento de Títulos',
                            text: 'Títulos desagrupados com sucesso!',
                            type: 'success'
                        });
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Desmarcar boleto pendente (recebido)',
                    icon: 'unselectall',
                    onClick() {
                        new PNotify({
                            title: 'Controle de Boletos Pendentes',
                            text: 'Boleto(s) retirados(s) do controle de pendências com sucesso!',
                            type: 'success'
                        });
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Marcar boleto como pendente',
                    icon: 'selectall',
                    onClick() {
                        new PNotify({
                            title: 'Controle de Boletos Pendentes',
                            text: 'Boleto(s) marcados(s) como ainda não recebido(s) do Fornecedor!',
                            type: 'success'
                        });
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Gerar arquivo CNAB para pagamento',
                    icon: 'movetofolder',
                    onClick() {
                        AbrirModal("#ModalGerarCNAB");
                    },
                },
            },
        ],
    });
    $('#dropButtonCadastrosDependentes').dxDropDownButton({
        text: 'Cadastros Dependentes',
        icon: 'hierarchy',
        elementAttr: {
            class: "drop-down-button"
        },
        items: [
            {
                text: 'Fornecedor',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Centro de Custo',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Categoria Financeira',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Plano de Contas',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Tipo de Documento',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Forma de Pagamento',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Conta Corrente',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
            {
                text: 'Manutenção de Cheques',
                icon: "spinnext",
                onClick(e) {
                    DevExpress.ui.notify(e.itemData.text, 'success', 3000);
                },
            },
        ],
    });
    $('#toolbarPedidosConsulta').dxToolbar({
        items: [
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Concluir pedidos selecionados',
                    icon: 'check',
                    onClick() {
                        //DevExpress.ui.notify('Save option has been clicked!');
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Alterar pedidos selecionados para Elaboração',
                    icon: 'edit',
                    onClick() {
                        //DevExpress.ui.notify('Print option has been clicked!');
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Excluir pedidos selecionados',
                    icon: 'trash',
                    onClick() {
                        //DevExpress.ui.notify('Save option has been clicked!');
                    },
                },
            },
        ],
    });

    //openConsultaTitulosPanel(); //TODO: retirar
    //$('#abaAcessoPagamentos').show(); //TODO: retirar
    //$('#abaAcessoParcelas').show(); //TODO: retirar
    //$('.infos-titulo').show(); //TODO: retirar

    await Promise.all(loadComponentesAzrFramework).then((component) => {
        Object.assign(dxComp.principaisTitulos.titulo, {
            lkp_filial_ApenasAtivasPorUsuario: component[0],
            lkp_fornecedores: component[1],
            lkp_categoriaFinanceira: component[2],
            lkp_centroCusto: component[3],
            lkp_planoDeContas_D_CD: component[4],
            lkp_tipoDocumento: component[5],
            lkp_Forma_Pagamento_Baixa_Futura: component[6],
            lkp_contaCorrente_CNAB: component[7],
        });
    });

    const tituloTeste = dxComp.principaisTitulos.titulo;
    tituloTeste.lkp_filial_ApenasAtivasPorUsuario.option('value', '1');
    tituloTeste.dt_Vencimento.option('value', moment().add(5, 'day').toDate());
    tituloTeste.nbx_Vl_Total_Titulo.option('value', 170);
});

function openConsultaTitulosPanel() {

    const pageWidth = document.documentElement.scrollWidth;

    //A OPÇÃO DE ABRIR A CONSULTA LATERAL ESTÁ DESATIVADA
    //if (pageWidth > 1600 )
    if (pageWidth == -100) {
        $("#principalTitulos").removeClass("col-lg-12").addClass("col-lg-9");
        $("#consultaTitulos").removeClass("col-lg-12").addClass("col-lg-3");
        $("#consultaTitulos").removeClass("panelConsultaTitulosLateral").addClass("panelConsultaTitulosLateral");


        //$("#gridConsultaTitulos").dxDataGrid("instance").columnOption("CD_CPF_CNPJ", "visible", false);
        //$("#gridConsultaTitulos").dxDataGrid("instance").columnOption("DS_RAZAO_SOCIAL", "visible", false);
        //$("#gridConsultaTitulos").dxDataGrid("instance").columnOption("DS_CONTATO", "visible", false);
        //$("#gridConsultaTitulos").dxDataGrid("instance").columnOption("DS_GRUPO_ECONOMICO", "visible", false);
        //$("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_FATURAMENTO_MINIMO", "visible", false);

        //$("#gridConsultaTitulos").dxDataGrid("instance").option("groupPanel", {visible: true, emptyPanelText: "Agrupamento" });

        document.getElementById("divBtnExpandirFecharConsulta").style.display = 'block';
        document.getElementById("divBtnFecharConsulta").style.display = 'none';

        document.getElementById("consultaTitulos").style.display = 'block';
    }
    else {
        expandirConsultaTitulosPanel();
    }

}

function expandirConsultaTitulosPanel() {

    $("#consultaTitulos").removeClass("col-lg-3").addClass("col-lg-12");
    $("#consultaTitulos").removeClass("panelConsultaTitulosLateral");

    //$("#gridConsultaTitulos").dxDataGrid("instance").columnOption("DS_RAZAO_SOCIAL", "visible", true);
    //$("#gridConsultaTitulos").dxDataGrid("instance").columnOption("CD_CPF_CNPJ", "visible", true);
    //$("#gridConsultaTitulos").dxDataGrid("instance").columnOption("DS_CONTATO", "visible", true);
    //$("#gridConsultaTitulos").dxDataGrid("instance").columnOption("DS_GRUPO_ECONOMICO", "visible", true);
    //$("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_FATURAMENTO_MINIMO", "visible", true);

    //$("#gridConsultaTitulos").dxDataGrid("instance").option("groupPanel", {visible: true, emptyPanelText: "Arraste as colunas do grid para esta área para agrupar" });

    document.getElementById("cadastroTitulos").style.display = 'none';

    document.getElementById("divBtnExpandirFecharConsulta").style.display = 'none';
    document.getElementById("divBtnFecharConsulta").style.display = 'block';

    document.getElementById("consultaTitulos").style.display = 'block';

    redimensionaComponentes();
}

function closeConsultaTitulosPanel() {
    //        $("#cadastroTitulos").removeClass("col-lg-9").addClass("col-lg-12");
    $("#principalTitulos").removeClass("col-lg-9").addClass("col-lg-12");

    document.getElementById("consultaTitulos").style.display = 'none';
    document.getElementById("cadastroTitulos").style.display = 'block';
}

function AbrirModal(e) {
    $(e).modal('toggle');
}

function FecharModal(e) {
    $(e).modal('hide');
}

function exibeDadosFornecedor(tipoPagamento) {
    //CNAB - Transferência Bancária
    if (tipoPagamento == 1) {
        rolar_para('#lkp_Tipo_Pagamento_CNAB');

        document.getElementById("ControleRecebimentoBoleto").style.display = 'none';
        document.getElementById("AjudaControleRecebimentoBoleto").style.display = 'none';
        document.getElementById("ControleRecebimentoBoletoAlinhamento").style.display = 'block';

        document.getElementById("MensagemBoletoCNAB").style.display = 'none';
        document.getElementById("div_imagemBoleto").style.display = 'none';
        document.getElementById("DadosBancariosFornecedor").style.display = 'block';

        $('#gridParcelasPercentual').dxDataGrid('instance').columnOption("CD_BARRAS_BOLETO", "visible", false);
        $('#gridParcelasPercentual').dxDataGrid('instance').columnOption("NR_DIAS", "width", null);
        $('#gridParcelasPercentual').dxDataGrid('instance').columnOption("DT_VENCIMENTO", "width", null);
        $('#gridParcelasPercentual').dxDataGrid('instance').columnOption("DT_COMPETENCIA", "caption", "COMPETÊNCIA");
        //CNAB - Boleto
    } else if (tipoPagamento == 2) {
        compGridParcelas = $('#gridParcelasPercentual').dxDataGrid('instance');
        var qtRegistros = compGridParcelas.totalCount();

        if (qtRegistros > 0) {
            document.getElementById("div_imagemBoleto").style.display = 'block';
        };

        rolar_para('#lkp_Tipo_Pagamento_CNAB');

        document.getElementById("ControleRecebimentoBoleto").style.display = 'block';
        document.getElementById("AjudaControleRecebimentoBoleto").style.display = 'block';
        document.getElementById("ControleRecebimentoBoletoAlinhamento").style.display = 'none';

        document.getElementById("MensagemBoletoCNAB").style.display = 'block';
        document.getElementById("DadosBancariosFornecedor").style.display = 'none';


        $('#gridParcelasPercentual').dxDataGrid('instance').columnOption("CD_BARRAS_BOLETO", "visible", true);
        $('#gridParcelasPercentual').dxDataGrid('instance').columnOption("NR_DIAS", "width", 70);
        $('#gridParcelasPercentual').dxDataGrid('instance').columnOption("DT_VENCIMENTO", "width", 80);
        $('#gridParcelasPercentual').dxDataGrid('instance').columnOption("DT_COMPETENCIA", "caption", "COMP");
        //Não usa CNAB
    } else {
        document.getElementById("ControleRecebimentoBoleto").style.display = 'block';
        document.getElementById("AjudaControleRecebimentoBoleto").style.display = 'block';
        document.getElementById("ControleRecebimentoBoletoAlinhamento").style.display = 'none';

        document.getElementById("MensagemBoletoCNAB").style.display = 'none';
        document.getElementById("div_imagemBoleto").style.display = 'none';
        document.getElementById("DadosBancariosFornecedor").style.display = 'none';

        $('#gridParcelasPercentual').dxDataGrid('instance').columnOption("CD_BARRAS_BOLETO", "visible", false);
        $('#gridParcelasPercentual').dxDataGrid('instance').columnOption("NR_DIAS", "width", null);
        $('#gridParcelasPercentual').dxDataGrid('instance').columnOption("DT_VENCIMENTO", "width", null);
        $('#gridParcelasPercentual').dxDataGrid('instance').columnOption("DT_COMPETENCIA", "caption", "COMPETÊNCIA");
    }
}

//function exibeOpcoesParcelamento(tipoParcelamento) {
//    //rolar_para('#lkp_Tipo_Pagamento_CNAB'); TODO: verificar

//    if (tipoParcelamento == "F") {
//        document.getElementById("div_parcelasFixas").style.display = 'block';
//        document.getElementById("div_tipoCalculoParcelaVariavelPercentual").style.display = 'none';
//        document.getElementById("div_gridParcelasPercentual").style.display = 'block';
//    } else if (tipoParcelamento == "V") {
//        document.getElementById("div_parcelasFixas").style.display = 'none';
//        document.getElementById("div_parcelamentoDiasFixos").style.display = 'none';
//        document.getElementById("div_tipoCalculoParcelaVariavelPercentual").style.display = 'block';
//        document.getElementById("div_gridParcelasPercentual").style.display = 'block';
//    };
//}

//function configuraGridParcelamentosPercentual(paramTipoRateioParcelamentoPc) {
//    if (paramTipoRateioParcelamentoPc == "M") {
//        $('#gridParcelasPercentual').dxDataGrid('instance').columnOption("PC_RATEIO", "allowEditing", true);
//    } else {
//        $('#gridParcelasPercentual').dxDataGrid('instance').columnOption("PC_RATEIO", "allowEditing", false);
//    };
//}

function validaValorDataVencimento(withNotify = false) {

    const textError = [];
    const titulo = dxComp.principaisTitulos.titulo;

    titulo.nbx_Vl_Total_Titulo.validator.validate();
    if (titulo.nbx_Vl_Total_Titulo.option('validationStatus') != 'valid')
        textError.push('Total do título');

    titulo.dt_Vencimento.validationRequest.fire();
    if (titulo.dt_Vencimento.option('validationStatus') != 'valid')
        textError.push('Data de vencimento');

    let validacao = textError.length == 0;
    if (!validacao && withNotify)
        messages.info("Faltando informações", `Verificar: ${textError.join(' / ')}`);

    return validacao;
}

function checarData(data) {
    const _moment = moment(data);
    return _moment.isValid();
}

function excluirParcelasGrid() {
    var compGrid = $('#gridParcelasPercentual').dxDataGrid('instance');

    compGrid.option('dataSource', null);

    compGrid.refresh().done(function () {
        compGrid.option('dataSource', []);
    });
}

function verificaDiferencaTituloParcelas() {
    var comp = $('#gridParcelasPercentual').dxDataGrid('instance');
    var compPagtosLanctoQuitado = $('#gridPagamentosLanctoQuitado').dxDataGrid('instance');
    var valorParcelado = 0;

    if (compPagtosLanctoQuitado.totalCount() > 0 && comp.totalCount() > 0) {
        AbrirModal("#ModalAlertaParcelamentoPagtosLanctoQuitado");
    };

    if (comp.totalCount() > 0) {
        valorParcelado = comp.getTotalSummaryValue('VL_PARCELA');
    }

    diferencaTitulo = valorTotalTitulo - valorParcelado;
    diferencaTitulo = parseFloat(diferencaTitulo.toFixed(2));

    if (diferencaTitulo !== 0 && comp.totalCount() > 0) {
        $('#memSaldoParcelas').hide().text(diferencaTitulo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })).fadeIn(200);
        $('#memValorParcelas').hide().text(valorParcelado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })).fadeIn(200);
        document.getElementById("div_conferenciaParcelasValorTitulo").style.display = 'block';

        return true;
    } else {
        document.getElementById("div_conferenciaParcelasValorTitulo").style.display = 'none';

        return false;
    };
}

function gravaRegistro() {
    new PNotify({
        title: 'Lançamento de título',
        text: 'Dados gravados com sucesso!',
        type: 'success'
    });

    compPagamentosLanctoQuitado = $("#gridPagamentosLanctoQuitado").dxDataGrid('instance');

    //Após incluir o Título, habilita a aba de pagamento
    document.getElementById("abaAcessoPagamentos").style.display = 'block';
    document.getElementById("abaAcessoParcelas").style.display = 'block';

    if (compPagamentosLanctoQuitado.totalCount() > 0) {
        formataTelaOperacao('A', 354727, 1, 2, 2, 100.25, 100.25);
    } else {
        formataTelaOperacao('A', 354727, 1, 2, 1, 100.25, 100.25);
    }

    verificaDiferencaTituloQuitacao();
}

function quitarTitulo() {
    new PNotify({
        title: 'Quitação de título',
        text: 'Título quitado com sucesso!',
        type: 'success'
    });

    formataTelaOperacao('A', 354727, 1, 2, 2, 100.25, 100.25);
}

function reativarTitulo() {
    new PNotify({
        title: 'Reativação de título',
        text: 'Título reativado com sucesso!',
        type: 'success'
    });

    formataTelaOperacao('A', 354727, 1, 2, 1, 100.25, 100.25);
}

function cancelarTitulo() {
    const result = DevExpress.validationEngine.validateGroup("cancelamentoTitulo");

    if (result.isValid) {
        new PNotify({
            title: 'Cancelamento de Título',
            text: 'Título(s) cancelado(s) com sucesso!',
            type: 'success'
        });

        FecharModal("#ModalRegistrarJustificativaCancelamento");
    }

}

function gerarArquivoCNAB() {
    const result = DevExpress.validationEngine.validateGroup("geracaoCNAB");

    if (result.isValid) {
        new PNotify({
            title: 'Geração de arquivo CNAB',
            text: 'Arquivo gerado com sucesso!',
            type: 'success'
        });

        FecharModal("#ModalGerarCNAB");
    }
}

function rolar_para(elemento, tempo = 1100) {
    const top = $(elemento).offset().top;
    $('html, body').animate({
        scrollTop: top - 150
    }, tempo, 'easeInOutCubic');
}

function excluirPagamentosQuitacao() {
    var compGrid = $('#gridPagamentosQuitacao').dxDataGrid('instance');

    //Limpa o grid de pagamentos
    compGrid.option('dataSource', null);

    compGrid.refresh().done(function () {
        compGrid.option('dataSource', []);
    });

}

function excluirPagamentosChequeProprioQuitacao() {
    var compGrid = $('#gridPagamentosQuitacaoChequeProprio').dxDataGrid('instance');

    //Limpa o grid de pagamentos
    compGrid.option('dataSource', null);

    compGrid.refresh().done(function () {
        compGrid.option('dataSource', []);
    });

}

function excluirPagamentosChequeTerceirosQuitacao() {
    var compGrid = $('#gridPagamentosQuitacaoChequeTerceiro').dxDataGrid('instance');

    //Limpa o grid de pagamentos
    compGrid.option('dataSource', null);

    compGrid.refresh().done(function () {
        compGrid.option('dataSource', []);
    });

}

function excluirRateioCentroCustoGrid() {
    var compGrid = $('#gridRateioCentroCusto').dxDataGrid('instance');

    //Limpa o grid de rateio por centro de custo
    compGrid.option('dataSource', null);

    compGrid.refresh().done(function () {
        compGrid.option('dataSource', []);
    });

    document.getElementById("div_conferenciaRateioCentroCusto").style.display = 'none';
}

function verificaDiferencaTituloPagtosLanctoQuitado() {
    var comp = $('#gridPagamentosLanctoQuitado').dxDataGrid('instance');
    var compParcelamento = $('#gridParcelasPercentual').dxDataGrid('instance');
    var valorPago = 0;
    var vlJuros = 0;
    var vlMulta = 0;
    var vlDesconto = 0;

    if (compParcelamento.totalCount() > 0 && comp.totalCount() > 0) {
        AbrirModal("#ModalAlertaParcelamentoPagtosLanctoQuitado");
    };

    if (comp.totalCount() > 0) {
        valorPago = comp.getTotalSummaryValue('VL_PAGAMENTO');
    };

    if ($('#nbx_Vl_Juros').dxNumberBox('instance').option('value') != null && $('#nbx_Vl_Juros').dxNumberBox('instance').option('value') != '') {
        vlJuros = $('#nbx_Vl_Juros').dxNumberBox('instance').option('value');
    };

    if ($('#nbx_Vl_Multa').dxNumberBox('instance').option('value') != null && $('#nbx_Vl_Multa').dxNumberBox('instance').option('value') != '') {
        vlMulta = $('#nbx_Vl_Multa').dxNumberBox('instance').option('value')
    };

    if ($('#nbx_Vl_Desconto').dxNumberBox('instance').option('value') != null && $('#nbx_Vl_Desconto').dxNumberBox('instance').option('value') != '') {
        vlDesconto = $('#nbx_Vl_Desconto').dxNumberBox('instance').option('value');
    };

    diferencaTituloLanctoQuitado = ((valorTotalTitulo - vlDesconto) + vlMulta + vlJuros) - valorPago;
    diferencaTituloLanctoQuitado = parseFloat(diferencaTituloLanctoQuitado.toFixed(2));

    //seta o saldo a pagar no label da tela
    $('#memSaldoLanctoQuitado').hide().text(diferencaTituloLanctoQuitado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })).fadeIn(200);
    $('#memPagoLanctoQuitado').hide().text(valorPago.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })).fadeIn(200);

    if (comp.totalCount() > 0) {
        document.getElementById("div_conferenciaPagtosLanctoQuitadoTitulo").style.display = 'block';
    } else {
        document.getElementById("div_conferenciaPagtosLanctoQuitadoTitulo").style.display = 'none';
    };

    if (diferencaTituloLanctoQuitado < 0) {
        $("#div_alertaConferenciaPagtosLanctoQuitado").removeClass("alert-info").removeClass("alert-warning").addClass("alert-danger");
    } else if (diferencaTituloLanctoQuitado == 0) {
        $("#div_alertaConferenciaPagtosLanctoQuitado").removeClass("alert-danger").removeClass("alert-warning").addClass("alert-info");
    } else if (diferencaTituloLanctoQuitado > 0) {
        $("#div_alertaConferenciaPagtosLanctoQuitado").removeClass("alert-danger").removeClass("alert-info").addClass("alert-warning");
    } else {
        $("#div_alertaConferenciaPagtosLanctoQuitado").removeClass("alert-danger").removeClass("alert-warning").addClass("alert-info");
    };

}

function verificaDiferencaTituloQuitacao() {
    var compGeral = $('#gridPagamentosQuitacao').dxDataGrid('instance');
    var compChequeProprio = $('#gridPagamentosQuitacaoChequeProprio').dxDataGrid('instance');
    var compChequeTerceiro = $('#gridPagamentosQuitacaoChequeTerceiro').dxDataGrid('instance');

    var vlPagamentosGerais = 0;
    var vlPagamentosChequeProprio = 0;
    var vlPagamentosChequeTerceiro = 0;

    var vlJuros = 0;
    var vlMulta = 0;
    var vlDesconto = 0;

    var vlTotalPago = 0;

    if (compGeral.totalCount() > 0) {
        vlPagamentosGerais = compGeral.getTotalSummaryValue('VL_PAGAMENTO')
    };

    if (compChequeTerceiro.totalCount() > 0) {
        vlPagamentosChequeTerceiro = compChequeTerceiro.getTotalSummaryValue('VL_CHEQUE')
    };

    if (compChequeProprio.totalCount() > 0) {
        vlPagamentosChequeProprio = compChequeProprio.getTotalSummaryValue('VL_PAGAMENTO')
    };

    if ($('#nbx_Vl_Juros_Quitacao').dxNumberBox('instance').option('value') != null && $('#nbx_Vl_Juros_Quitacao').dxNumberBox('instance').option('value') != '') {
        vlJuros = $('#nbx_Vl_Juros_Quitacao').dxNumberBox('instance').option('value');
    };

    if ($('#nbx_Vl_Multa_Quitacao').dxNumberBox('instance').option('value') != null && $('#nbx_Vl_Multa_Quitacao').dxNumberBox('instance').option('value') != '') {
        vlMulta = $('#nbx_Vl_Multa_Quitacao').dxNumberBox('instance').option('value')
    };

    if ($('#nbx_Vl_Desconto_Quitacao').dxNumberBox('instance').option('value') != null && $('#nbx_Vl_Desconto_Quitacao').dxNumberBox('instance').option('value') != '') {
        vlDesconto = $('#nbx_Vl_Desconto_Quitacao').dxNumberBox('instance').option('value');
    };

    diferencaTituloQuitacao = ((valorTotalTitulo - vlDesconto) + vlMulta + vlJuros) - vlPagamentosGerais - vlPagamentosChequeProprio - vlPagamentosChequeTerceiro;
    diferencaTituloQuitacao = parseFloat(diferencaTituloQuitacao.toFixed(2));

    vlTotalPago = vlPagamentosGerais + vlPagamentosChequeProprio + vlPagamentosChequeTerceiro;

    //seta o saldo a pagar no label da tela
    $('#memTotalPagamentosGerais').hide().text(vlPagamentosGerais.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })).fadeIn(200);
    $('#memTotalPagamentosChequeProprio').hide().text(vlPagamentosChequeProprio.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })).fadeIn(200);
    $('#memTotalPagamentosChequeTerceiro').hide().text(vlPagamentosChequeTerceiro.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })).fadeIn(200);
    $('#memTotalPagtoQuitacao').hide().text(vlTotalPago.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })).fadeIn(200);
    $('#memSaldoPagtoQuitacao').hide().text(diferencaTituloQuitacao.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })).fadeIn(200);
    $('#memValorTituloPagtoQuitacao').hide().text(valorTotalTitulo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })).fadeIn(200);

    if (vlPagamentosGerais > 0) {
        document.getElementById("div_TotalPagamentosGerais").style.display = 'block';
    } else {
        document.getElementById("div_TotalPagamentosGerais").style.display = 'none';
    };

    if (vlPagamentosChequeProprio > 0) {
        document.getElementById("div_TotalPagamentosChequeProprio").style.display = 'block';
    } else {
        document.getElementById("div_TotalPagamentosChequeProprio").style.display = 'none';
    };

    if (vlPagamentosChequeTerceiro > 0) {
        document.getElementById("div_TotalPagamentosChequeTerceiro").style.display = 'block';
    } else {
        document.getElementById("div_TotalPagamentosChequeTerceiro").style.display = 'none';
    };


    if (diferencaTituloQuitacao > 0) {
        $("#div_alertaConferenciaPagtosQuitacao").removeClass("alert-info").addClass("alert-danger");
        document.getElementById("div_btnQuitarTitulo").style.display = 'none';

    } else if (diferencaTituloQuitacao == 0) {

        $("#div_alertaConferenciaPagtosQuitacao").removeClass("alert-danger").addClass("alert-info");

        if (valorTotalTitulo > 0) {
            document.getElementById("div_btnQuitarTitulo").style.display = 'block';
        };
    } else if (diferencaTituloQuitacao < 0) {

        $("#div_alertaConferenciaPagtosQuitacao").removeClass("alert-info").addClass("alert-danger");
        document.getElementById("div_btnQuitarTitulo").style.display = 'none';

    } else {

        $("#div_alertaConferenciaPagtosQuitacao").removeClass("alert-danger").addClass("alert-info");
        document.getElementById("div_btnQuitarTitulo").style.display = 'none';
    };
}

function verificaDiferencaRateioCentroCustoTitulo() {
    var comp = $('#gridRateioCentroCusto').dxDataGrid('instance');
    var valorRateado = 0;

    if (comp.totalCount() > 0) {
        valorRateado = comp.getTotalSummaryValue('VL_RATEIO');
    }

    diferencaTituloRateioCentroCusto = valorTotalTitulo - valorRateado;
    diferencaTituloRateioCentroCusto = parseFloat(diferencaTituloRateioCentroCusto.toFixed(2));

    //seta o saldo a ratear no label da tela
    $('#memSaldoRateioCentroCusto').hide().text(diferencaTituloRateioCentroCusto.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })).fadeIn(200);
    $('#memValorRateadoCentroCusto').hide().text(valorRateado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })).fadeIn(200);

    if (diferencaTituloRateioCentroCusto !== 0) {
        $("#div_DiferencaTituloRateioCentroCusto").removeClass("alert-info").addClass("alert-danger");
    } else {
        $("#div_DiferencaTituloRateioCentroCusto").removeClass("alert-danger").addClass("alert-info");
    };

    if (diferencaTituloRateioCentroCusto == 0 || comp.totalCount() == 0) {
        document.getElementById("div_conferenciaRateioCentroCusto").style.display = 'none';
    } else {
        document.getElementById("div_conferenciaRateioCentroCusto").style.display = 'block';
    }

}

function limparCamposBaixaFutura() {
    $('#lkp_Conta_Corrente_Baixa_Futura').dxLookup('instance').option('value', null)
    $('#lkp_Forma_Pagamento_Baixa_Futura').dxLookup('instance').option('value', null)

    $('#nbx_Vl_Juros_Baixa_Futura').dxNumberBox('instance').option('value', null)
    $('#nbx_Vl_Multa_Baixa_Futura').dxNumberBox('instance').option('value', null)
    $('#nbx_Vl_Desconto_Baixa_Futura').dxNumberBox('instance').option('value', null)
}

function formataTelaOperacao(paramOperacao, paramTitulo, paramParcelaAtual, paramParcelaTotal, paramSituacao, paramValorTitulo, paramSaldoPagar) {

    //Atualiza as variáveis que controlam as operações da tela
    operacaoTipo = paramOperacao;
    operacaoNumeroTitulo = paramTitulo;
    operacaoParcelaAtual = paramParcelaAtual;
    operacaoParcelaTotal = paramParcelaTotal;
    operacaoSituacaoTitulo = paramSituacao;
    operacaoValorTitulo = paramValorTitulo;
    operacaoSaldoPagar = paramSaldoPagar;

    //Desabilita todos as DIVs para habilitar conforme a operação
    document.getElementById("abaAcessoPagamentos").style.display = 'none';
    document.getElementById("abaAcessoParcelas").style.display = 'none';
    document.getElementById("taggleParcelamento").style.display = 'none';
    document.getElementById("taggleTituloQuitado").style.display = 'none';
    document.getElementById("taggleBaixaFutura").style.display = 'none';
    document.getElementById("taggleRateioCentroCusto").style.display = 'none';

    document.getElementById("infoNumeroLancamento").style.display = 'none';
    document.getElementById("infoInclusaoTitulo").style.display = 'none';
    document.getElementById("infoTituloAberto").style.display = 'none';
    document.getElementById("infoTituloRecebidoTotal").style.display = 'none';
    document.getElementById("infoTituloRecebidoParcial").style.display = 'none';
    document.getElementById("infoTituloQuitado").style.display = 'none';
    document.getElementById("infoTituloCancelado").style.display = 'none';
    document.getElementById("btnVisualizarJustificativaCancelamento").style.display = 'none';

    document.getElementById("capturaCodigoBarrasBoletoAlteracao").style.display = 'none';

    document.getElementById("divBtnReativarTitulo").style.display = 'none';
    document.getElementById("divBtnSalvar").style.display = 'none';
    document.getElementById("divBtnAlterar").style.display = 'none';

    if (paramOperacao == 'I') {

        //Inclusão de novo título
        document.getElementById("infoInclusaoTitulo").style.display = 'block';
        document.getElementById("taggleParcelamento").style.display = 'block';
        document.getElementById("taggleTituloQuitado").style.display = 'block';
        document.getElementById("taggleBaixaFutura").style.display = 'block';
        document.getElementById("taggleRateioCentroCusto").style.display = 'block';
        document.getElementById("divBtnSalvar").style.display = 'block';
        $("#div_statusTitulo").removeClass("alert-info").removeClass("alert-danger").removeClass("alert-success").removeClass("alert-dark").addClass("alert-dark");

    } else if (paramOperacao == 'A') {

        //Alteração individual de título
        document.getElementById("abaAcessoPagamentos").style.display = 'block';
        document.getElementById("abaAcessoParcelas").style.display = 'block';
        document.getElementById("capturaCodigoBarrasBoletoAlteracao").style.display = 'block';
        document.getElementById("taggleBaixaFutura").style.display = 'block';
        document.getElementById("taggleRateioCentroCusto").style.display = 'block';

        if (paramSituacao == 1) {
            document.getElementById("divBtnAlterar").style.display = 'block';
        } else {
            document.getElementById("divBtnReativarTitulo").style.display = 'block';
        };

        $('#infoNumeroLancamento').hide().text('# ' + paramTitulo + ' - Parcela ' + paramParcelaAtual + ' de ' + paramParcelaTotal).fadeIn(200);

        if (paramSituacao == 1) {
            $("#div_statusTitulo").removeClass("alert-info").removeClass("alert-danger").removeClass("alert-success").removeClass("alert-dark").addClass("alert-info");
            document.getElementById("infoTituloAberto").style.display = 'block';

            if (paramSaldoPagar == 0) {
                document.getElementById("infoTituloRecebidoTotal").style.display = 'block';
            } else if (paramSaldoPagar !== 0 && paramSaldoPagar !== paramValorTitulo) {
                document.getElementById("infoTituloRecebidoParcial").style.display = 'block';
            };
        } else if (paramSituacao == 2) {

            $("#div_statusTitulo").removeClass("alert-info").removeClass("alert-danger").removeClass("alert-success").removeClass("alert-dark").addClass("alert-success");
            document.getElementById("infoTituloQuitado").style.display = 'block';

        } else if (paramSituacao == 3) {


            $("#div_statusTitulo").removeClass("alert-info").removeClass("alert-danger").removeClass("alert-success").removeClass("alert-dark").addClass("alert-danger");
            document.getElementById("infoTituloCancelado").style.display = 'block';
            document.getElementById("btnVisualizarJustificativaCancelamento").style.display = 'block';

        };
    };

}

window.addEventListener("load", function () {
    window.dispatchEvent(new Event('resize'));
});

window.onresize = function () {
    return; //todo: Verificar

    const pageWidth = document.documentElement.scrollWidth;

    //console.log(pageWidth);

    if (pageWidth < 1200) {
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_JUROS", "visible", true);
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_MULTA", "visible", true);
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_DESCONTO", "visible", true);

        $("#gridConsultaTitulos").dxDataGrid("instance").option("columnHidingEnabled", true);
        $("#gridParcelasRelacionadas").dxDataGrid("instance").option("columnHidingEnabled", true);

        $("#gridPagamentosQuitacaoChequeTerceiro").dxDataGrid("instance").columnOption("DS_RAZAO_SOCIAL_CLIENTE", "width", 150);

        //$("#consultaTitulos").removeClass("col-lg-3").removeClass("col-lg-12").addClass("col-lg-12");

        //$("#gridPagamentosQuitacaoChequeTerceiro").dxDataGrid("instance").option("columnHidingEnabled", true);
        //$("#gridPagamentosQuitacaoChequeProprio").dxDataGrid("instance").option("columnHidingEnabled", true);
    } else {
        $("#gridConsultaTitulos").dxDataGrid("instance").option("columnHidingEnabled", false);
        $("#gridParcelasRelacionadas").dxDataGrid("instance").option("columnHidingEnabled", false);

        //$("#gridPagamentosQuitacaoChequeTerceiro").dxDataGrid("instance").option("columnHidingEnabled", false);
        //$("#gridPagamentosQuitacaoChequeProprio").dxDataGrid("instance").option("columnHidingEnabled", false);
    };


    //JUSTA AS COLUNAS DO GRID DE CONSULTA GERAL QUANDO A JANELA DO BROWSER É REDIMENCIONADA
    if (pageWidth >= 1200 && pageWidth < 1280) {
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("DS_FORNECEDOR", "width", 150);

        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_JUROS", "visible", false);
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_MULTA", "visible", false);
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_DESCONTO", "visible", false);
        $("#gridConsultaTitulos").dxDataGrid("instance").option("groupPanel", { visible: true, emptyPanelText: "Agrupamento" });
    }
    else if (pageWidth >= 1280 && pageWidth < 1400) {
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("DS_FORNECEDOR", "width", 200);

        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_JUROS", "visible", false);
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_MULTA", "visible", false);
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_DESCONTO", "visible", false);
        $("#gridConsultaTitulos").dxDataGrid("instance").option("groupPanel", { visible: true, emptyPanelText: "Agrupamento" });
    }
    else if (pageWidth >= 1400 && pageWidth < 1460) {
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("DS_FORNECEDOR", "width", 300);

        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_JUROS", "visible", false);
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_MULTA", "visible", false);
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_DESCONTO", "visible", false);
    }
    else if (pageWidth >= 1460 && pageWidth < 1700) {
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("DS_FORNECEDOR", "width", 330);

        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_JUROS", "visible", false);
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_MULTA", "visible", false);
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_DESCONTO", "visible", false);
    }
    else if (pageWidth >= 1700 && pageWidth < 1750) {
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("DS_FORNECEDOR", "width", 300);

        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_JUROS", "visible", true);
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_MULTA", "visible", true);
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_DESCONTO", "visible", true);
    }
    else if (pageWidth >= 1750) {
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("DS_FORNECEDOR", "width", 350);

        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_JUROS", "visible", true);
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_MULTA", "visible", true);
        $("#gridConsultaTitulos").dxDataGrid("instance").columnOption("VL_DESCONTO", "visible", true);
    }
}

function redimensionaComponentes() {
    var compConsultaTitulos = $("#gridConsultaTitulos").dxDataGrid("instance");
    var compParcelasRelacionadas = $("#gridParcelasRelacionadas").dxDataGrid("instance");

    compConsultaTitulos.updateDimensions();
    compParcelasRelacionadas.updateDimensions();
}

//formataTelaOperacao('A', 354727, 1, 2, 1, 100.25, 100.25);
//formataTelaOperacao('I', null, null, null, null, null, null);

function verificarPendencias() {

}

