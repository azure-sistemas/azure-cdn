/// <reference path="../../../properties/referencesdevexpress/dx.all.d.ts" />
/// <reference path="../../../properties/referencesdevexpress/jquery.d.ts" />

Object.assign($.fn, {
    createPopover(text) {
        const $body = document.querySelector('body');
        const $div = $body.appendChild(document.createElement('div'));
        $div.classList.add('text-center');
        $div.innerText = text;

        this.popover = new DevExpress.ui.dxPopover($div, {
            target: this,
            showEvent: 'mouseenter',
            hideEvent: 'mouseleave',
            maxWidth: 200,
        });
        return this;
    }
})
const mathRandom = Math.random().toString().slice(2);
const _enumFiltroProdutos = Object.freeze({
    Origem: 'O',
    OrigemDestino: 'OD',
});
const _enumFiltroProdutosStatus = Object.freeze({
    Todos: 0,
    Ativos: 1,
    Inativos: 2,
});
const _enumRegraMovimentacaoEstoque = Object.freeze({
    Conclusao: 'CON',
    Inicio: 'INI',
    Nuvem: 'NUV',
    GetByInt(enumStatus) {
        if (enumStatus == 0)
            return this.Conclusao;
        if (enumStatus == 1)
            return this.Inicio;
        if (enumStatus == 2)
            return this.Nuvem;
        return null;
    },
    GetTextByInt(enumStatus) {
        const valueInt = this.GetByInt(enumStatus);
        return {
            "CON": "apenas na conclusão",
            "INI": "no início",
            "NUV": "no início e na conclusão"
        }[valueInt];
    },
    NameOf(prop) {
        return this[prop];
    }
});
const _enumSituacaoTransferencia = Object.freeze({
    EmElaboracao: 1,
    EmTransito: 2,
    Concluida: 3,
    Cancelada: 4,
    RecebidaEmAnalise: 5,
    Recusada: 6,
    EmSeparacao: 7,
    IsEnum(enumStatus) {
        return Object.values(this).includes(enumStatus);
    },
    GetInt(enumStatus) {
        return Object.values(_enumSituacaoTransferencia).find(a => a == enumStatus);
    },
    GetColor(enumStatus) {
        return {
            1: 'var(--EmElaboracao)',
            2: 'var(--EmTransito)',
            3: 'var(--Concluida)',
            4: 'var(--Cancelada)',
            5: 'var(--RecebidaEmAnalise)',
            6: 'var(--Recusada)',
            7: 'var(--EmSeparacao)',
        }[enumStatus];
    },
    GetName(enumStatus) {
        return {
            1: 'Em elaboração',
            2: 'Em trânsito',
            3: 'Concluída',
            4: 'Cancelada',
            5: 'Recebida em Análise',
            6: 'Recusada',
            7: 'Em Separação',
        }[enumStatus];
    },
    GetIconAndText(enumStatus) {
        const result = { text: this.GetName(enumStatus) };
        result.icon = {
            1: 'fa-file-pen',
            2: 'fa-cars',
            3: 'fa-badge-check',
            4: 'fa-ban',
            5: 'fa-magnifying-glass-arrow-right',
            6: 'fa-hand',
            7: 'fa-filter-list',
        }[enumStatus];
        return result;
    },
});
const icons = {
    concluir: 'fas ' + _enumSituacaoTransferencia.GetIconAndText(_enumSituacaoTransferencia.Concluida).icon,
    recusar: 'fas ' + _enumSituacaoTransferencia.GetIconAndText(_enumSituacaoTransferencia.Recusada).icon,
    iniciar: 'fa-duotone fa-paper-plane-top',
}
const messages = {
    success: (title, text, delay = 2500, animation = fnAnimationPNotify) =>
        new PNotify({
            title: title,
            text: text,
            type: "success",
            delay: delay,
            animation: animation,
        }),
    error: (title, text, delay = 4000, animation = fnAnimationPNotify) =>
        new PNotify({
            title: title,
            text: text,
            type: "error",
            delay: delay,
            animation: animation,
        }),
    info: (title, text, delay = 2500, animation = fnAnimationPNotify) =>
        new PNotify({
            title: title,
            text: text,
            type: "info",
            delay: delay,
            animation: animation,
        }),
}
PNotify.messages = {
    success: messages.success,
    error: messages.error,
    info: messages.info,
    Parameter: {
        Ok: text => new PNotify({
            title: "Alteração de parâmetro",
            text: `Parâmetro alterado com sucesso: \n\n${text}`,
            type: "success",
            delay: 2500
        }),
        Error: (text, statusCode, responseText) => new PNotify({
            title: "Alteração de parâmetro",
            text: `Erro ao tentar alterar parâmetro:\n\n${text}\n\nCódigo: ${statusCode}\nMensagem: ${responseText}`,
            type: 'error',
            delay: 4000
        })
    },
    dataGridSelecaoProdutos: {
        quantidadeMenor: new PNotify({
            auto_display: false,
            title: "Quantidade insuficiente",
            text: "Quantidade insuficiente no estoque de Origem",
            type: "notice",
            delay: 2500
        }),
        produtosAdicionados: quantidade => new PNotify({
            title: "Quantidade adicionada",
            text: `${quantidade} Produto${quantidade > 1 ? 's' : ''} adicionado${quantidade > 1 ? 's' : ''} no grid`,
            type: "success",
            delay: 1500,
            animation: fnAnimationPNotify,
        }),
    },
    gridProdutosTransferencia: {
        limpezaQuantidades: count => {
            if (count <= 0) return;
            return new PNotify({
                auto_display: false,
                title: "Limpeza de Quantidades",
                text: "As quantidades dos produtos foram limpas",
                type: "notice",
                delay: 2500
            })
        },
    },
    popupTrocarDestinatario: {
        destinatarioAlterado: new PNotify({
            auto_display: false,
            title: "Destinatário alterado",
            text: "Destinatário alterado com sucesso",
            type: "success",
            delay: 1500
        })
    },
};

const dataSources = new CreateDataSource();
const parameters = new CreateParameters();
const dxComp = {
    labelTransferencia: {},
    parameterUser: new CreateParameterUser(),
    parameterGeral: new CreateParameterGeral(),
    gridBoxProdutos: {},
    popupTrocarDestinatario: {},
    popupObservacoesTransferencia: {},
    filtroAlmoxarifados: {},
};
const animateCSS = (elements, animation, operacao = 'in', duration = 400, prefix = 'animate__') =>
    new Promise((resolve, reject) => {
        elements = !isArray(elements) ? [elements] : elements;
        const animationName = `${prefix}${animation}`;

        elements.forEach((element, index) => {
            try {
                const node = document.querySelector(element);
                node.style.animationDuration = duration + 'ms';
                node.classList.add(`${prefix}animated`, animationName);
                node.addEventListener('animationend', handleAnimationEnd, { once: true });
                if (operacao == 'in')
                    $(element).show();
                function handleAnimationEnd(event) {
                    event.stopPropagation();
                    node.classList.remove(`${prefix}animated`, animationName);
                    if (operacao == 'out') $(element).hide();
                    if (index == elements.length - 1) resolve('Animation ended');
                }

            } catch (e) {
                console.log(e);
            }
        });
    });
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

document.addEventListener('DOMContentLoaded', async () => {
    $.get('/Estoque/Transferencias/RefreshHistorico');

    LoadComponents();

    await parameters._get;

    animateCSS('#inicioLoad', 'fadeOut', 'out', 800).then(() => {
        animateCSS('#areaPrincipal', 'fadeIn', 'in', 800);
    });
})
function CreateParameters() {
    const configureRestricao = (almoxs) => {
        const origem = almoxs
            .filter(a => a.RestricaoOrigem)
            .map(a => a.Almoxarifado);
        const destino = almoxs
            .filter(a => a.RestricaoDestino)
            .map(a => a.Almoxarifado);
        const receberSeparar = almoxs
            .filter(a => a.RestricaoReceber)
            .map(a => a.Almoxarifado);
        return { origem, destino, receberSeparar };
    };
    const get = (format = true) => {
        this._get = new Promise((resolve, reject) => {
            $.getJSON("/Estoque/Transferencias/Parametros", (a) => $.each(a, (b, c) => parameters[b] = c))
                .done((param) => {
                    param.almoxarifados.forEach(alm => {
                        alm.descricao = `${alm.Id} - ${alm.Nome}`;
                    });

                    param.listUsuario.forEach(b => {
                        b.describe = "";
                        if (!b.Cd_Status) {
                            b.visible = false;
                            b.disabled = true;
                            b.describe = "INATIVO - ";
                        }
                        if (b.Administrador && b.Cd_Status) {
                            b.describe = "Admin - ";
                        }
                        b.describe = b.describe + b.Cd_Login + " | " + b.Nome;
                    });

                    param.usuario.restricao = configureRestricao(param.usuario.Almoxarifados);

                    const list = param.listUsuario.map(item => ({ ...item }));
                    parameters.usuarioDestinatario = list
                        .filter(b => b.Cd_Status && (b.IsDestinatario || b.Administrador))
                        .map(b => {
                            if (b.Administrador && b.Cd_Status) {
                                b.disabled = false;
                            }
                            return b;
                        });

                    param.origemDestino.dxColumns = [];
                    param.origemDestino.forEach(b => {
                        param.origemDestino.dxColumns.push({
                            dataField: "dataField_" + b.OrigemId,
                            dataType: "boolean",
                            caption: "Alm" + b.OrigemId,
                            allowEditing: true,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            allowFiltering: false,
                            visible: true,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                            DestinoId: b.OrigemId,
                        });
                    });
                    if (format)
                        FormatButtons();
                    resolve(parameters);
                })
                .fail((a) => {
                    reject(a);
                });
        })
        return this._get;
    };
    get();
    this.get = get;
    const me = this;
    this.user = {
        parans: null,
        _get: function () {
            this.promise = new Promise((resolve, reject) =>
                $.getJSON('/Estoque/Transferencias/Usuario/Parametro')
                    .done((result) => {
                        this.parans = result.data;
                        me.usuario = result.data;
                        me.usuario.restricao = configureRestricao(result.data.Almoxarifados);
                        FormatButtons(false);
                        resolve(me.usuario);
                    })
                    .fail((jqXHR) => {
                        const [status, msg, data] = [`Status: ${jqXHR.status}`, jqXHR.responseJSON?.msg || '', jqXHR.responseJSON?.data || ''];
                        reject(new Error(`${status}${msg && ' - ' + msg}${data && ' | ' + data}`));
                    }));
            return this.promise;
        }
    };
}
function CreateDataSource() {
    this.onlyPositive = true;
    this.produtosFiltro = {
        get: function (status = _enumFiltroProdutosStatus.Ativos) {
            this._get = $.getJSON('/Estoque/Transferencias/FiltroProduto', { status: status }).done(a => {
                this.status = status;
                this.items = a;
            });
        },
    };
    this.radioFiltroProdutosConfiguracoes = [
        { id: 'OD', text: 'Permitir transferência somente de itens ativos nos dois almoxarifados' },
        { id: 'O', text: 'Permitir transferência de todos os produtos ativos no almoxarifado de origem' },
    ];
    this.consultaGeral = (new function () {
        const def = this;
        this.getTranferencias = (() => {
            const fn = (dias, produto) => {
                def._getTranferencias = $.getJSON("/Estoque/Transferencias", { nrDiasFiltro: dias, cdProduto: produto }, a => {
                    def.items = a;
                    def.dias = dias;
                });
            };
            fn(60);
            return fn;
        })();
    });
    this.etapas = (new function () {
        const def = this;
        this.get = (() => {
            const fn = () => {
                def._get = $.getJSON("/Estoque/Transferencias/Etapas").done(a => {
                    if (!a.find(b => b.Id == _enumSituacaoTransferencia.RecebidaEmAnalise).Status) {
                        const item = a.find(b => b.Id == _enumSituacaoTransferencia.Recusada);
                        item.Status = false;
                        item.disabled = true;
                    }
                    def.items = a;
                }).fail(a => { });//TODO: desenvolver falha dataSources.etapas.get
            }
            fn();
            return fn;
        })();
    });
    this.getProdutos = function (almOrigem, almDestino, onlyPositive = true, filtro = _enumFiltroProdutos.OrigemDestino) {
        this.getProdutos.promise = new Promise((resolve) => {
            $.getJSON('/Estoque/Transferencias/Produto', {
                almoxarifadodoOrigem: almOrigem,
                almoxarifadodoDestino: almDestino,
                onlyPositive: onlyPositive,
                filtroProdutosString: filtro,
            }, a => {
                $.each(a, (b, c) => this[b] = c)
                this.onlyPositive = onlyPositive;
                resolve(a);
            })
        });
        return this.getProdutos.promise;
    };
    this.getProduto = (codigo, almOrigem, almDestino, filtro, lote) => {
        this._getProduto = new Promise(resolve => {
            $.getJSON('/Estoque/Transferencias/Produto', {
                almoxarifadodoOrigem: almOrigem,
                almoxarifadodoDestino: almDestino,
                onlyPositive: false,
                filtro: filtro,
                produto: codigo,
                lote: lote,
            }, response => {
                resolve(response);
            });
        })
    };
    this.produtosTransferencia = [];
    this.tasks = { OD: ['Ao selecionar os produtos para montar o processo de transferência, apenas os ativos tanto no almoxarifado de origem quanto no almoxarifado de destino, estarão disponíveis'], O: ['Permite selecionar qualquer produto ativo no almoxarifado de origem para montar o processo de transferência', 'Se o produto não estiver ativo no almoxarifado de destino, o sistema irá cadastrá-lo e ativá-lo automaticamente', 'Utilize esta opção apenas se você tem certeza de que deseja cadastrar e disponibilizar novos produtos no almoxarifado de destino',] };
    this.dataSourceConsultaGeralLegenda = [{ DS_COLOR_STATUS_1: "#0088CC", DS_STATUS_1: "", DS_LEGENDA_1: "Em Elaboração", DS_COLOR_STATUS_2: "#736f72", DS_STATUS_2: "", DS_LEGENDA_2: "Em Trânsito", DS_COLOR_STATUS_3: "#D2322D", DS_STATUS_3: "", DS_LEGENDA_3: "Cancelado", }, { DS_COLOR_STATUS_1: "#47A447", DS_STATUS_1: "", DS_LEGENDA_1: "Concluído", DS_COLOR_STATUS_2: "#ED9C28", DS_STATUS_2: "", DS_LEGENDA_2: "Recebido em Análise", DS_COLOR_STATUS_3: "#000000", DS_STATUS_3: "", DS_LEGENDA_3: "Recusado pelo Destinatário", },];
    this.orcamentos = {
        async get(dias, orcamentos) {
            orcamentos = Array.isArray(orcamentos) || !orcamentos ? orcamentos?.length == 0 ? null : orcamentos : [orcamentos];
            const queryOrcamentos = orcamentos?.map(a => `orcamentos=${a}`).join('&');
            this.promise = fetch(`Transferencias/Orcamentos?dias=${dias ?? ''}&${queryOrcamentos ?? ""}`)
                .then(async a => await a.json())
                .then(({ DataResult }) => DataResult)
                .catch(erro => messages.error("Erro na busca de orçamentos", erro));
            this.data = await this.promise;
            return this.data;
        }
    };
}
function CreateParameterGeral() {
    this.preenchimentoAlteracao = {};
    this.listWorkflow = new DevExpress.ui.dxList('#listWorkflow', { //TODO: quando tirar a seleção do "Recebida", tirar do "Recusada" e desabilitar ele
        keyExpr: 'Id',
        showSelectionControls: true,
        selectionMode: 'multiple',
        dataSource: new DevExpress.data.DataSource({
            key: 'Id',
            loadMode: 'raw',
            load: async () => {
                await dataSources.etapas._get;
                return dataSources.etapas.items;
            },
        }),
        itemTemplate: data => $('<div>').text(data.Descricao),
        onContentReady: e => {
            const data = e.component.getDataSource().store().__rawData;
            if (!data)
                return;
            e.component.option('selectedItemKeys', data.filter(a => a.Status).map(a => a.Id));
        },
        onSelectionChanged: async (a) => {
            const itemsMap = [
                ...a.addedItems.map(b => Object({
                    id: b.Id,
                    status: true,
                })),
                ...a.removedItems.map(b => Object({
                    id: b.Id,
                    status: false,
                })),
            ];

            const def = this;
            await UpdateStatusEtapa(itemsMap[0].id, itemsMap[0].status);

            FormatButtons(false);

            async function UpdateStatusEtapa(id, status) {
                await dataSources.etapas._get;
                if (id == _enumSituacaoTransferencia.RecebidaEmAnalise && !status) {
                    const item = def.listWorkflow.option().items.find(a => a.Id == _enumSituacaoTransferencia.Recusada);
                    item.disabled = true;
                    item.Status = false;
                    def.listWorkflow.repaint();
                }
                if (dataSources.etapas.items.find(b => b.Id == id).Status == status)
                    return;
                const paramString = dataSources.etapas.items.find(b => b.Id == id).Descricao;
                return new Promise((resolve, reject) => {
                    $.ajax(`/Estoque/Transferencias/Etapas/${id}`, {
                        method: 'PUT',
                        data: { status },
                        async: true,
                    }).done(b => {
                        dataSources.etapas.items = b.etapas;
                        def.listWorkflow.option('dataSource', b.etapas);
                        def.listWorkflow.option('selectedItemKeys', b.etapas.filter(a => a.Status).map(a => a.Id));
                        PNotify.messages.Parameter.Ok(paramString);
                        resolve();
                    }).fail(async b => {
                        dataSources.etapas.get();
                        await dataSources.etapas._get;
                        def.listWorkflow.option('selectedItemKeys', dataSources.etapas.items.map(c => { if (c.Status) return c.Id; }))
                        PNotify.messages.Parameter.Error(paramString, b.status, b.responseText);
                        reject();
                    });
                });
            }
        },
    });

    const createTemplateConfiguracoesEstoque = (tema, texto) => $('<span>')
        .append($('<b>').text(tema))
        .append($('<span>').text(texto))

    this.radioConfiguracoesEstoque = new DevExpress.ui.dxRadioGroup("#radioConfiguracoesEstoque", {
        items: [
            {
                id: 'INI',
                template: () => createTemplateConfiguracoesEstoque(
                    'Início: ',
                    'Realizada ao enviar a transferência'
                ),
            },
            {
                id: 'CON',
                template: () => createTemplateConfiguracoesEstoque(
                    'Conclusão: ',
                    'Realizada na conclusão do processo'
                ),
            },
            {
                id: 'NUV',
                template: () => createTemplateConfiguracoesEstoque(
                    'Reserva: ',
                    'Reservar estoque no envio da transferência e disponibilizá-lo na conclusão'
                ),
            },
        ],
        valueExpr: 'id',
        displayExpr: 'text',
        onValueChanged: async (e) => {
            await parameters._get;
            const paramString = "Movimentação de estoque dos produtos transferidos";
            if (e.value == null || e.value == parameters.transferencia.Cd_Regra_Movimentacao_Estoque) return;
            $.ajax({
                url: `/Estoque/Transferencias/ParametroRegraMovimentacao`,
                method: 'PUT',
                data: { regra: e.value },
                async: true,
            }).done(() => {
                parameters.transferencia.Cd_Regra_Movimentacao_Estoque = e.value;
                PNotify.messages.Parameter.Ok(paramString);
            }).fail((a) => {
                e.component.option('value', parameters.transferencia.Cd_Regra_Movimentacao_Estoque);
                PNotify.messages.Parameter.Error(paramString, a.status, a.responseText);
            });
        },
    });

    this.radioFiltroProdutosConfiguracoes = new DevExpress.ui.dxRadioGroup('#radioFiltroProdutosConfiguracoes', {
        valueExpr: 'id',
        displayExpr: 'text',
        updateClassLista: value => {
            if (value == null) return;
            $("#alertaFiltroProdutosConfiguracoes").removeClass(["alert-info", "alert-danger"]).addClass(value === 'OD' ? "alert-info" : "alert-danger");
            $("#listConfiguracoes").children().remove();
            dataSources.tasks[value].forEach(a => $('#listConfiguracoes').append($('<li/>').text(a))); //TODO: inserir animação de slide
        },
        onContentReady: e => e.component.option().updateClassLista(e.component.option('value')),
        onValueChanged: e => {
            e.component.option().updateClassLista(e.value);
            if (e.value == null || e.value == parameters.transferencia.FiltroProdutosString || !e.component.option('items').some(a => a.id == e.value))
                return;
            const paramString = e.component.option('items').find(a => a.id == e.value).text;
            $.ajax("/Estoque/Transferencias/ParametroFiltroProdutos", {
                method: 'PUT',
                data: { filtro: e.value },
                async: true,
            }).done(async a => {
                await parameters._get;
                Object.defineProperty(parameters.transferencia, 'Cd_Filtro_Produtos', {
                    get() {
                        return this._filtroProdutos;
                    },
                    set(value) {
                        this._filtroProdutos = value;
                        if (dxComp.radioFiltroProdutos == null) return;
                        dxComp.radioFiltroProdutos.option('value', value);
                    },
                    enumerable: true,
                    configurable: true,
                })
                parameters.transferencia.Cd_Filtro_Produtos = e.value;
                PNotify.messages.Parameter.Ok(paramString);
            }).fail(async a => {
                await parameters._get;
                this.radioFiltroProdutosConfiguracoes.option('value', parameters.transferencia.Cd_Filtro_Produtos);
                PNotify.messages.Parameter.Error(paramString, a.status, a.responseText);
            });
        },
    });

    (async () => {
        await parameters._get;
        this.radioConfiguracoesEstoque.option('value', parameters.transferencia.Cd_Regra_Movimentacao_Estoque)
        this.radioFiltroProdutosConfiguracoes.option({
            items: dataSources.radioFiltroProdutosConfiguracoes,
            value: parameters.transferencia.Cd_Filtro_Produtos,
        });

        const updateParametroGeral = (object, validaNull = true) => {
            const paramString = object.component.option('parametro');
            const atualParameter = parameters.transferencia[paramString];

            if (validaNull && object.value == null) {
                onError();
                return;
            }
            if (paramString == null || object.value == atualParameter)
                return;

            $.ajax({
                url: `/Estoque/Transferencias/Parametro/${paramString}`,
                method: 'PUT',
                data: { value: object.value, }
            }).done(a => {
                Object.defineProperty(parameters.transferencia, paramString, {
                    get: function () {
                        return this["_" + paramString];
                    },
                    set: function (valor) {
                        this["_" + paramString] = valor;
                    },
                });
                parameters.transferencia[paramString] = object.value;
                PNotify.messages.Parameter.Ok(paramString);
                const checkAlteracoesGerais = dxComp.parameterGeral.preenchimentoAlteracao.chk_Alteraracoes_Gerais_Transferencia;
                if (paramString == 'Lg_Permite_Consultar_Processos_Outros_Usuarios') {
                    checkAlteracoesGerais.option({
                        disabled: false
                    });
                    if (checkAlteracoesGerais.option('value'))
                        checkAlteracoesGerais.option({
                            value: false,
                            disabled: true
                        });
                }
            }).fail(a => {
                onError(a);
            });

            function onError(response = null) {
                object.component.option('value', atualParameter);
                if (response == null) return;
                PNotify.messages.Parameter.Error(paramString, response.status, response.responseText);
            }

        };

        this.preenchimentoAlteracao = {
            chk_Obrigatorio_Destinatario: new DevExpress.ui.dxCheckBox('#chk_Obrigatorio_Destinatario', {
                parametro: "Lg_Obrigatorio_Destinatario",
                value: parameters.transferencia["Lg_Obrigatorio_Destinatario"],
                text: "Obrigatório informar o destinatário ao criar uma transferência",
                onValueChanged: updateParametroGeral,
            }),
            chk_Obrigatorio_Observacao: new DevExpress.ui.dxCheckBox('#chk_Obrigatorio_Observacao', {
                value: parameters.transferencia["Lg_Obrigatorio_Observacao"],
                text: "Obrigatório informar uma observação na criação de uma transferência",
                parametro: "Lg_Obrigatorio_Observacao",
                onValueChanged: updateParametroGeral,
            }),
            chk_Substituir_Destinatario: new DevExpress.ui.dxCheckBox('#chk_Substituir_Destinatario', {
                value: parameters.transferencia["Lg_Permite_Alterar_Destinatario"],
                text: "Permite substituir usuário destinatário após o envio da transferência",
                parametro: "Lg_Permite_Alterar_Destinatario",
                onValueChanged: updateParametroGeral,
            }),
            chk_Alterar_Obs: new DevExpress.ui.dxCheckBox('#chk_Alterar_Obs', {
                value: parameters.transferencia["Lg_Permite_Alterar_Observacao"],
                text: "Permite alterar observações após o envio da transferência",
                parametro: "Lg_Permite_Alterar_Observacao",
                onValueChanged: updateParametroGeral,
            }),
            chk_Alterar_Filtro_Produto: new DevExpress.ui.dxCheckBox('#chk_Alterar_Filtro_Produto', {
                value: parameters.transferencia["Lg_Permite_Alterar_Filtro_Produto"],
                text: "Permite alterar o filtro padrão de produtos durante elaboração da transferência",
                parametro: "Lg_Permite_Alterar_Filtro_Produto",
                onValueChanged: updateParametroGeral,
            }),
            chk_Alteraracoes_Gerais_Transferencia: new DevExpress.ui.dxCheckBox('#chk_Alteraracoes_Gerais_Transferencia', {
                text: "Permite usuários não administradores alterar e movimentar processos criados por outros usuários",
                value: parameters.transferencia["Lg_Permite_Alterar_Processos_Outros_Usuarios"],
                parametro: "Lg_Permite_Alterar_Processos_Outros_Usuarios",
                onValueChanged: updateParametroGeral,
            }),
            chk_Consultas_Gerais_Transferencia: new DevExpress.ui.dxCheckBox('#chk_Consultas_Gerais_Transferencia', {
                text: "Permite usuários não administradores consultar processos criados por outros usuários",
                value: parameters.transferencia["Lg_Permite_Consultar_Processos_Outros_Usuarios"],
                parametro: "Lg_Permite_Consultar_Processos_Outros_Usuarios",
                onValueChanged: updateParametroGeral,
            }),
            nbx_qt_max_impressao: new DevExpress.ui.dxNumberBox("#nbx_qt_max_impressao", {
                label: "Quantidade máxima de impressões",
                labelMode: "hidden",
                showSpinButtons: true,
                showClearButton: true,
                width: 80,
                max: 99,
                step: 1,
                format: '#',
                value: parameters?.transferencia?.Qt_Maxima_Impressao_Transferencia,
                parametro: "Qt_Maxima_Impressao_Transferencia",
                onValueChanged: (e) => {
                    clearTimeout(e.component?.timeoutValueChanged);
                    e.component.timeoutValueChanged = setTimeout(() => {
                        if (e.value == 0)
                            e.value = null;
                        updateParametroGeral(e, false);
                    }, 1000);
                },
            }),
        };

        this.gridConfigAlmoxarifadoOrigemDestino = new DevExpress.ui.dxDataGrid("#gridConfigAlmoxarifadoOrigemDestino", {
            dataSource: parameters.origemDestino,
            hoverStateEnabled: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            repaintChangesOnly: true,
            wordWrapEnabled: false,
            renderAsync: true,
            editing: {
                mode: 'cell',
                allowUpdating: true,
                allowAdding: false,
                allowDeleting: false,
                useIcons: false,
                selectTextOnEditStart: true,
            },
            sorting: { mode: "multiple" },
            allowColumnResizing: true,
            columnResizingMode: "widget",
            allowColumnReordering: false,
            groupPanel: { visible: false, },
            paging: { enabled: false, },
            export: {
                enabled: true,
                allowExportSelectedData: false
            },
            scrolling: {
                columnRenderingMode: 'standard',
                renderAsync: true,
            },
            onExporting: function (e) {
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('Origem e Destino');

                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet: worksheet,
                    autoFilterEnabled: true
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Configuração_Almoxarifados_Origem_Destino.xlsx');
                    });
                });
                e.cancel = true;
            },
            filterRow: { visible: false },
            columnChooser: { enabled: false },
            columnsAutoWidth: true,
            keyExpr: 'OrigemId',
            columnMinWidth: 40,
            columns: [
                {
                    dataField: "GRP_ALMOXARIFADO_ORIGEM",
                    caption: "ALMOXARIFADO DE ORIGEM",
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    fixed: true,
                    columns: [
                        {
                            dataField: "OrigemId",
                            caption: "Código",
                            width: 50,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            allowFiltering: false,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                        },
                        {
                            dataField: "OrigemText",
                            caption: "Nome",
                            width: 150,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: false,
                            allowFiltering: false,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                        },
                    ],
                },
                {
                    dataField: "GRP_ALMOXARIFADO_DESTINO",
                    caption: "ALMOXARIFADOS DE DESTINO",
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    columns: parameters.origemDestino.dxColumns,
                },
            ],
            showBorders: true,
            activeStateEnabled: true,
            onCellPrepared: e => {
                if (e.rowType === "header") {
                    if (e.column.dataField === "GRP_ALMOXARIFADO_ORIGEM" || e.column.dataField === "GRP_ALMOXARIFADO_DESTINO") {
                        e.cellElement.css("color", "#f05b41");
                        e.cellElement.css("font-weight", "bold");
                        e.cellElement.css("background-color", "#f8f9fa");
                    }
                }
            },
            onEditorPreparing: async e => {
                if (e.DestinoId == e.row.key) {
                    e.editorOptions.disabled = true;
                }
                e.editorOptions.onValueChanged = a => {
                    if (a.value == null || parameters.origemDestino.find(c => c.OrigemId == e.row.key)["caption_" + e.DestinoId] == a.value) return;
                    $.ajax({
                        url: `/Estoque/Transferencias/ParametroOrigemDestino/${e.row.key}`,
                        method: 'PUT',
                        data: {
                            origemId: e.row.key,
                            destinoId: e.DestinoId,
                            value: a.value,
                        }
                    }).done(b => {
                        parameters.origemDestino.find(c => c.OrigemId == b.origemId)["dataField_" + b.destinoId] = b.value;
                        PNotify.messages.Parameter.Ok(`Almoxarifado ${b.origemId} ${b.value ? "pode" : "não pode"} tranferir para o ${b.destinoId}`);
                    }).fail(b => {
                        PNotify.messages.Parameter.Error(`${a.value ? "Ativação" : "Desativação"} da transferência do almoxarifado ${e.row.key} para o ${e.DestinoId}`, b.status, b.responseText);
                        parameters.origemDestino.find(c => c.OrigemId == e.row.key)["caption_" + e.DestinoId] = !a.value;
                        a.component.option('value', !a.value);
                    });
                }
            },
        });

        let $div = $("#collapseAlmoxarifados");
        let observer = new MutationObserver((mutations) => {
            mutations.forEach(() =>
                dxComp.parameterGeral.gridConfigAlmoxarifadoOrigemDestino.updateDimensions());
        });

        observer.observe($div[0], {
            attributes: true,
            attributeFilter: ['class']
        });
    })()
}
function LoadComponents() {
    dxComp.switchFiltroProduto = new DevExpress.ui.dxSwitch('#switchFiltroProduto', {
        switchedOffText: null,
        switchedOnText: null,
        onValueChanged({ value, component }) {
            let mostrarLoad = false;
            if (!component?.primeiroAcesso) {
                mostrarLoad = true;
                dataSources.orcamentos.get(7);
            }
            component.primeiroAcesso = true;
            $('#fProdutos')[value ? 'removeClass' : 'addClass']('font-weight-bold');
            $('#fOrcamentos')[!value ? 'removeClass' : 'addClass']('font-weight-bold');
            animateCSS(value ? '#fOrcamentos' : '#fProdutos', 'headShake', 'in', 800);
            animateCSS([value ? '#optionProdutos' : '#optionOrcamentos', '#fTitle'], 'zoomOut', 'out', 180)
                .then(() => {
                    $('#fTitle').text(value ? "POR ORÇAMENTOS" : "DE PRODUTOS");
                    animateCSS([value ? '#optionOrcamentos' : '#optionProdutos', '#fTitle'], 'zoomIn', 'in', 180)
                        .then(() => {
                            if (mostrarLoad) {
                                const { buscar, loadPanel, getDataSource } = dxComp.gridOrcamentos;
                                buscar.option('disabled', true);
                                loadPanel.show();
                                getDataSource().reload()
                                    .then(() => {
                                        buscar.option('disabled', false);
                                        loadPanel.hide();
                                    });
                            }
                        })
                })
        }
    });

    dxComp.gridOrcamentos = new DevExpress.ui.dxDataGrid('#gridOrcamentos', {
        onInitialized({ component }) {
            component.option({
                toolbar: {
                    items: [
                        {
                            location: 'before',
                            widget: 'dxNumberBox',
                            name: 'dias',
                            options: {
                                elementAttr: {
                                    class: 'mt-0',
                                },
                                value: 7,
                                showSpinButtons: true,
                                step: 1,
                                min: 1,
                                max: 60,
                                width: 60,
                                labelMode: 'floating',
                                label: 'Dias',
                                disabled: false,
                                onInitialized(e) {
                                    component.dias = e.component;
                                    const diasMax = e.component.option('max');
                                    e.element.createPopover(`Número de dias para buscar orçamentos. (Máx. ${diasMax} dias)`);
                                },
                                onContentReady({ element }) {
                                    element.find('input.dx-texteditor-input').addClass('text-center');
                                },
                                onValueChanged(e) {
                                    if (!e.value) {
                                        e.component.option('value', 7);
                                    }
                                },
                            },
                        },
                        {
                            location: 'before',
                            widget: 'dxTextBox',
                            name: 'orcamento',
                            options: {
                                elementAttr: {
                                    class: 'mt-0',
                                },
                                width: 100,
                                showClearButton: true,
                                labelMode: 'floating',
                                label: '#Orçamento',
                                disabled: false,
                                onInitialized(e) {
                                    component.orcamento = e.component;
                                    e.element.createPopover("Número de orçamento específico, de qualquer data");
                                },
                                onContentReady({ element }) {
                                    element.find('input.dx-texteditor-input').addClass('text-center');
                                },
                            },
                        },
                        {
                            location: 'before',
                            widget: 'dxButton',
                            name: 'buscar',
                            options: {
                                elementAttr: {
                                    class: 'botao-aplicar-number-box-sem-height',
                                },
                                text: "Buscar",
                                icon: 'fa-duotone fa-magnifying-glass',
                                stylingMode: 'text',
                                width: 80,
                                onClick: (e) => {
                                    e.component.option('disabled', true);
                                    const { dias, orcamento } = component;
                                    const diasValue = dias.option('value');
                                    const orcamentoValue = orcamento.option('value');
                                    dataSources.orcamentos.get(diasValue, orcamentoValue);
                                    dxComp.gridOrcamentos.getDataSource().reload().then(() => e.component.option('disabled', false));
                                },
                                onInitialized(e) {
                                    component.buscar = e.component;
                                },
                            },
                        },
                        'columnChooserButton',
                        'searchPanel'
                    ]
                },
                loadPanel: {
                    onInitialized(e) {
                        component.loadPanel = e.component;
                    }
                },
            });
        },
        rowAlternationEnabled: true,
        dataSource: new DevExpress.data.DataSource({
            loadMode: 'raw',
            key: 'Pedido',
            async load() {
                const { promise } = dataSources.orcamentos
                if (!promise) {
                    return [];
                }
                return await promise;
            },
        }),
        masterDetail: {
            enabled: true,
            grids: {},
            template(container, options) {
                const { Produtos } = options.data;

                const card = mustache.render($('#templateProdutosOrcamento').html(), options.data)
                const $card = $(card);

                $card.find('#gridProdutosOrcamento').dxDataGrid({
                    columnAutoWidth: true,
                    showBorders: true,
                    dataSource: new DevExpress.data.DataSource({
                        store: new DevExpress.data.ArrayStore({
                            data: Produtos,
                            key: 'Id',
                        }),
                    }),
                    columns: [
                        {
                            dataField: "Id",
                            caption: "#",
                            sortOrder: "asc",
                            minWidth: 30,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                        },
                        {
                            dataField: "Codigo",
                            caption: "Código",
                            minWidth: 70,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                        },
                        {
                            dataField: "Nome",
                            caption: "Descrição",
                            minWidth: 100,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                        },
                        {
                            dataField: "Quantidade",
                            caption: "Quantidade",
                            minWidth: 70,
                            dataType: "number",
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                        },
                        {
                            dataField: "Lote",
                            caption: "Lote",
                            minWidth: 70,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: 'center',
                            cssClass: "column-data-grid",
                        },
                    ],
                    allowColumnResizing: true,
                });

                container.append($card);
            },
        },
        columns: [
            {
                dataField: "Pedido",
                caption: "#Orçamento",
                minWidth: 70,
                allowEditing: false,
                allowSorting: true,
                allowFiltering: true,
                allowSearch: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "CountProdutos",
                caption: "Qt. Produtos",
                dataType: "number",
                allowEditing: false,
                allowSorting: true,
                allowFiltering: false,
                allowSearch: true,
                allowHeaderFiltering: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Filial",
                caption: "Filial",
                width: 48,
                allowEditing: false,
                allowSorting: true,
                allowFiltering: true,
                allowSearch: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "DataEmissao",
                caption: "Data Emissão",
                dataType: "datetime",
                width: 110,
                sortOrder: "desc",
                allowEditing: false,
                allowSorting: true,
                allowFiltering: true,
                allowSearch: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "CpfCnpjCliente",
                caption: "CPF/CNPJ",
                minWidth: 120,
                allowEditing: false,
                allowSorting: true,
                allowFiltering: true,
                allowSearch: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "NomeCliente",
                caption: "Cliente",
                minWidth: 180,
                allowEditing: false,
                allowSorting: true,
                allowFiltering: true,
                allowSearch: true,
                allowHeaderFiltering: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "ValorTotal",
                caption: "Total Pedido",
                dataType: "number",
                format: "###,###,###.00",
                allowEditing: false,
                allowSorting: true,
                allowFiltering: false,
                allowSearch: true,
                allowHeaderFiltering: false,
                alignment: 'right',
                cssClass: "column-data-grid",
                visible: true,
            },
        ],
        columnAutoWidth: false,
        columnHidingEnabled: false,
        allowColumnResizing: true,
        autoResizeEnabled: true,
        showBorders: true,
        selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
        },
        searchPanel: {
            visible: true
        },
        filterRow: {
            visible: true
        },
        headerFilter: {
            visible: true,
        },
        onSelectionChanged({ component }) {
            component.refresh(true);
        },
        elementAttr: {
            class: "removeColumnsFilterHidden",
        },
        summary: {
            totalItems: [
                {
                    name: 'Selecionado',
                    summaryType: 'custom',
                    showInColumn: 'Pedido',
                },
            ],
            calculateCustomSummary(options) {
                if (options.name === "Selecionado") {
                    if (options.summaryProcess === "finalize") {
                        const total = options.component.getSelectedRowKeys().length;
                        const plural = total > 1;
                        options.totalValue = `${total == 0 ? 'Nenhum' : total} Orçamento${plural ? 's' : ''} Selecionado${plural ? 's' : ''}`;
                    }
                }
            }
        },
        stateStoring: AutoLoad('gridOrcamentos', false),
    });

    dxComp.loadPanelTransferencia = new DevExpress.ui.dxLoadPanel('#loadPanel', {
        minHeight: 73,
        height: 'auto',
        shading: true,
        shadingColor: "rgba(255,255,255,.8)",
        message: "Carregando...",
        animation: {
            show: {
                type: "pop",
                duration: 300,
                from: {
                    scale: 0.55
                }
            },
            hide: {
                type: "pop",
                duration: 300,
                to: {
                    opacity: 0,
                    scale: 0.55
                },
                from: {
                    opacity: 1,
                    scale: 1,
                    position: {
                        boundaryOffset: {
                            h: 0,
                            v: 0
                        },
                        my: "center",
                        at: "center"
                    }
                }
            }
        },
        onShowing({ component }) {
            component._$wrapper
                .css({ 'z-index': 1502 })
                .removeClass('fade-out')
                .addClass('fade-in');
        },
        onHiding({ component }) {
            component._$wrapper
                .removeClass('fade-in')
                .addClass('fade-out');
        },
        onInitialized({ component }) {
            component.alterarMensagem = (message = "Carregando...") => {
                component.option("message", message);
                return component;
            }
            component.exibir = (message = "Carregando...") => {
                component.alterarMensagem(message);
                return component.show();
            }
        },
        onHidden({ component }) {
            component.option("message", "Carregando...");
        }
    });

    dxComp.labelTransferencia = new LoadLabelTransferencia('', '', _enumSituacaoTransferencia.EmElaboracao);

    dxComp.popupModalLogTransacoes = new DevExpress.ui.dxPopup("#popupModalLogTransacoes", {
        minWidth: 208,
        maxWidth: 800,
        width: '90vw',
        minHeight: 100,
        maxHeight: '90%',
        showCloseButton: false,
        showTitle: false,
        onShown: (e) => {
            e.component.RefreshPositionScrollViewHeight();
        },
        onInitialized: (e) => {
            e.component.exibir = async (idProcesso) => {
                if (!idProcesso)
                    return;
                e.component.processo = idProcesso;

                await $.get(`/Estoque/Transferencias/${idProcesso}/historico`, (result) => {
                    result.data = result.data.map((a, b) => {
                        a.DataTransacaoFormat = moment(a.DataTransacao).format('DD/MM/YYYY HH:mm');
                        a.Icon = _enumSituacaoTransferencia.GetIconAndText(a.StatusTransferencia).icon;
                        a.FotoDestinatarioAnterior += `?v=${mathRandom}`;
                        a.FotoDestinatarioAlterado += `?v=${mathRandom}`;
                        a.FotoLogin += `?v=${mathRandom}`;
                        a.Color = _enumSituacaoTransferencia.GetColor(a.StatusTransferencia);
                        a.UpdateObservacao = !a.ObservacaoAnterior && !a.ObservacaoAlterada ? false : true;
                        a.UpdateDestinatario = !a.DestinatarioAnterior && !a.DestinatarioAlterado ? false : true;
                        a.UpdateFiltroProdutos = !a.FiltroProdutosAnterior && !a.FiltroProdutosAlterado ? false : true;
                        const getTextFiltro = (filtro) => `Permitir transferência somente de itens ativos ${filtro == "OD" ? "nos dois almoxarifados" : "apenas no almoxarifado de origem"}`;
                        a.FiltroProdutosAnteriorText = getTextFiltro(a.FiltroProdutosAnterior);
                        a.FiltroProdutosAlteradoText = getTextFiltro(a.FiltroProdutosAlterado);
                        a.IsFirst = b == result.data.length - 1;
                        if (a.IsFirst) {
                            const transferencia = dxComp.labelTransferencia.getTransferenciaAtual();
                            a.Movimentacao = `A movimentação do estoque será realizada ${_enumRegraMovimentacaoEstoque.GetTextByInt(transferencia.RegraMovimentacaoEstoque)} do processo`;
                            a.Filtro = getTextFiltro(transferencia.FiltroProdutosString);
                        }
                        return a;
                    });
                    e.component.log = result;
                    e.component.show();
                });
            }
            e.component.RefreshPositionScrollViewHeight = () => {
                const height = $('#footerLog').offset().top - $('#alertLog').offset().top - $('#alertLog')[0].getBoundingClientRect().height;
                if (e.component.logScroll)
                    e.component.logScroll.option('height', height + 'px');
                return height;
            };
        },
        onShowing: (e) => {
            e.component.SetProcesso(e.component.processo);
            const scrollView = $("<div id='scrollView'></div>");
            const ms = $.parseHTML(mustache.render($('#logMustache').html(), e.component.log));
            scrollView.append(ms);
            e.component.logScroll = new DevExpress.ui.dxScrollView(scrollView, {
                width: '100%'
            });
            e.component.findSection('.tm-body').append(scrollView);;
        },
        onHidden: (e) => {
            if (e.component.logScroll)
                e.component.logScroll.dispose();
        },
        contentTemplate: function (container) {
            container.addClass('p-0');
            this.$section = $($('#contentPopupModalLogTransacoes').html());
            this.findSection = (selector) => this.$section.find(selector);
            this.SetProcesso = (processo) => this.findSection('#processo').text(processo || '');
            this.toolbar = new DevExpress.ui.dxToolbar(this.findSection('#toolbar'), {
                items: [
                    {
                        location: 'after',
                        locateInMenu: 'auto',
                        widget: 'dxButton',
                        disabled: true,
                        options: {
                            text: 'Imprimir',
                            icon: 'fas fa-print',
                            type: 'default',
                            onClick: () => {

                            },
                        },
                    },
                    {
                        location: 'after',
                        locateInMenu: 'auto',
                        widget: 'dxButton',
                        options: {
                            text: 'Fechar',
                            icon: 'fas fa-right-from-bracket',
                            onClick: () => this.hide(),
                        },
                    },
                ],
            });
            container.append(this.$section);
            return container;
        },
    });

    dxComp.popupConfirmacaoSairTela = new DevExpress.ui.dxPopup("#popupConfirmacaoSairTela", {
        minWidth: 208,
        maxWidth: 800,
        width: '90vw',
        minHeight: 100,
        height: 'auto',
        showCloseButton: false,
        showTitle: false,
        onShowing: (e) => {
            e.component._$wrapper.css('z-index', 99);
        },
        contentTemplate: function (content) {
            content.addClass('p-0');
            const $section = $($('#contentPopupConfirmacaoSairTela').html());
            const findSection = (selector) => $section.find(selector);
            this.toolbar = new DevExpress.ui.dxToolbar(findSection('#toolbar'), {
                items: [
                    {
                        location: 'after',
                        locateInMenu: 'auto',
                        widget: 'dxButton',
                        options: {
                            text: 'Sair',
                            type: 'default',
                            onClick: () => {
                                window.location = '/';
                            },
                        },
                    },
                    {
                        location: 'after',
                        locateInMenu: 'auto',
                        widget: 'dxButton',
                        options: {
                            text: 'Abortar',
                            type: 'danger',
                            onClick: () => this.hide(),
                        },
                    },
                ],
            });
            return $section;
        },
    });

    dxComp.popupReplicarTransferencia = new DevExpress.ui.dxPopup("#popupReplicarTransferencia", {
        minWidth: 208,
        maxWidth: 800,
        width: '90vw',
        minHeight: 100,
        height: 'auto',
        showCloseButton: false,
        showTitle: false,
        onInitialized: (e) => {
            e.component.exibir = async (transferencia = dxComp.labelTransferencia.getTransferenciaAtual()) => {
                e.component.transferencia = transferencia;
                await parameters.user._get();
                if (!parameters.usuario.Administrador && !parameters.usuario.Lg_Replica_Analise_Transferencia) {
                    messages.info('Permissão necessária', `Seu Login (${parameters.usuario.Cd_Login.toUpperCase()}) não tem permissão para replicar transferências`, 5000);
                    return;
                }
                e.component.show();
            };
        },
        onShowing: (e) => {
            e.component._$wrapper.css('z-index', 997);
            e.component.$idProcessoDate.text(`#${e.component.transferencia.IdProcesso} | ${moment(e.component.transferencia.DataElaboracao).format('DD/MM/YYYY')}`);

            const almoxarifados = dxComp.filtroAlmoxarifados.dataSource;
            const almoxarifadodoOrigem = almoxarifados.find(a => a.CD_ALMOXARIFADO == e.component.transferencia.AlmoxarifadoOrigem);
            const almoxarifadodoDestino = almoxarifados.find(a => a.CD_ALMOXARIFADO == e.component.transferencia.AlmoxarifadoDestino);
            e.component.$almoxarifadoOrigem.text(almoxarifadodoOrigem.DS_ALMOXARIFADO_PESQUISA);
            e.component.$almoxarifadoDestino.text(almoxarifadodoDestino.DS_ALMOXARIFADO_PESQUISA);

            const filtro = dataSources.radioFiltroProdutosConfiguracoes.find(a => a.id == e.component.transferencia.FiltroProdutosString);
            e.component.$filtroProdutos.text(filtro.text);

            const tipoMovimentoData = dxComp.parameterGeral.radioConfiguracoesEstoque.option('items');
            const tipoMovimento = tipoMovimentoData.find(a => a.id == parameters.transferencia.Cd_Regra_Movimentacao_Estoque);
            e.component.$tipoMovimento.text(tipoMovimento.text);

            e.component.$fotoDestinatario.attr('src', e.component.transferencia.FotoDestinatario);
            e.component.$fotoRemetente.attr('src', e.component.transferencia.FotoRemetente);
            e.component.$nomeRemetente.text(e.component.transferencia.Remetente);

            if (!e.component.destinatario)
                e.component.destinatario = new DevExpress.ui.dxLookup(e.component.$lkp_Usuario_Destinatario_Replicacao, {
                    dataSource: new DevExpress.data.DataSource({
                        key: 'Cd_Login',
                        loadMode: 'raw',
                        load: async () => {
                            await parameters._get;
                            return parameters.usuarioDestinatario;
                        }
                    }),
                    searchExpr: 'describe',
                    valueExpr: 'Cd_Login',
                    displayExpr: 'describe',
                    value: e.component.transferencia.Destinatario,
                    labelMode: 'floating',
                    placeholder: 'Destinatário (se selecionado, somente este usuário poderá concluir a Transferência)',
                    itemTemplate: data => getTemplateFoto(data, 'custom-item'),
                    onValueChanged: (a) => {
                        if (!a.value) {
                            e.component.$fotoDestinatario.attr('src', '/img/fotos-usuarios/sem-foto-pesquisa.jpg?v=' + mathRandom);
                            return;
                        }
                        const userData = a.component.getDataSource().store().__rawData.find(b => b.Cd_Login == a.value);
                        e.component.$fotoDestinatario.attr('src', userData.URL_Foto + '?v=' + mathRandom);
                    }
                });
            else
                e.component.destinatario.option('value', e.component.transferencia.Destinatario);

            if (!e.component.observacao)
                e.component.observacao = new DevExpress.ui.dxTextArea(e.component.$txt_Obs_Transferencia_Replicacao, {
                    labelMode: 'floating',
                    label: 'Observações',
                    value: e.component.transferencia.Observacao,
                    height: 80,
                    maxLength: 5000,
                });
            else
                e.component.observacao.option('value', e.component.transferencia.Observacao);

            if (!e.component.toolbar)
                e.component.toolbar = new DevExpress.ui.dxToolbar(e.component.$toolbar, {
                    items: [
                        {
                            location: 'after',
                            locateInMenu: 'auto',
                            widget: 'dxButton',
                            options: {
                                text: 'Replicar Transferência',
                                icon: 'fas fa-copy',
                                type: 'default',
                                onClick: async (a) => {
                                    const $icon = a.element.find('i');
                                    const atualIcon = $icon[0].className;
                                    $icon.removeClass().addClass(['fa-duotone', 'fa-spinner', 'dx-icon', 'fa-spin-custom']);
                                    const destinatario = e.component.destinatario.option('value');
                                    const observacao = e.component.observacao.option('value');

                                    await Transferencia.ReplicarTransferencia(e.component.transferencia.IdProcesso, false, destinatario, observacao)
                                        .then(async (result) => {
                                            await LoadTransferenciaAlter(result.IdProcesso);
                                            messages.success('Transferência replicada', 'A transferência foi replicada com sucesso, a nova está no início da lista');
                                        })
                                        .catch((error) => {
                                            messages.error('Erro ao replicar transferência', error, 8000);
                                        })
                                        .finally(() => {
                                            $icon.removeClass().addClass(atualIcon);
                                            e.component.hide();
                                        });
                                },
                            },
                        },
                        {
                            location: 'after',
                            locateInMenu: 'auto',
                            widget: 'dxButton',
                            options: {
                                text: 'Fechar sem replicar',
                                icon: 'fas fa-right-from-bracket',
                                onClick: () => {
                                    e.component.hide();
                                },
                            },
                        },
                    ],
                });

        },
        contentTemplate: function (content) {
            content.addClass('p-0');
            const $section = $($('#contentPopupReplicarTransferencia').html());
            const findSection = (selector) => $section.find(selector);

            this.$idProcessoDate = findSection("#idProcessoDate");
            this.$almoxarifadoOrigem = findSection("#almoxarifadoOrigem");
            this.$almoxarifadoDestino = findSection("#almoxarifadoDestino");
            this.$filtroProdutos = findSection("#filtroProdutosReplicar");
            this.$tipoMovimento = findSection("#tipoMovimento");

            this.$fotoDestinatario = findSection("#fotoDestinatario");
            this.$fotoRemetente = findSection("#fotoRemetente");
            this.$nomeRemetente = findSection("#nomeRemetente");

            this.$lkp_Usuario_Destinatario_Replicacao = findSection("#lkp_Usuario_Destinatario_Replicacao");
            this.$txt_Obs_Transferencia_Replicacao = findSection("#txt_Obs_Transferencia_Replicacao");
            this.$toolbar = findSection("#toolbar");

            return $section;
        },
    });

    dxComp.popupExecTransferencia = new DevExpress.ui.dxPopup("#popupExecTransferencia", {
        minWidth: 208,
        maxWidth: 800,
        width: '90vw',
        minHeight: 100,
        height: 'auto',
        showCloseButton: false,
        showTitle: false,
        onInitialized: ({ component }) => {
            component.produtosExcluidos = Array();
            component.getProdutosExcluidos = (callback) => {
                let transferencia = dxComp.labelTransferencia.transferenciaAtual;
                try {
                    component.produtosExcluidos = transferencia.Produtos
                        .filter((prod) => prod.Quantidade <= 0)
                        .map((prod) => ({
                            IdProduto: prod.IdProduto,
                            Descricao: prod.ProdutoGeral.Nome,
                            Lote: prod.Lote,
                            Quantidade: prod.Quantidade,
                            EstoqueOrigem: prod.ProdutoGeral.EstoqueOrigem,
                        }));

                    if (typeof callback == "function")
                        callback(component.produtosExcluidos);
                } catch {
                    component.hide();
                }
                return component.produtosExcluidos;
            };
            component.tiposProcesso = Object.freeze({
                Conclusao: "CON",
                Inicio: "INI",
                Recusa: "REC",
            });
            component.exibir = (tipoProcesso, show = false) => {
                component.option('visible', false);
                Object.assign(component, {
                    tipoProcesso: tipoProcesso,
                    mostrarPopup: show,
                });
                component.show();
                return component;
            };
        },
        onShowing: async ({ component }) => {
            component.progress.textMsg.updateText('', 0);
            component._$wrapper.css('z-index', 997);
            parameters.user._get().then(() => {
                component.select.option({
                    value: false,
                    visible: !(!parameters.usuario.Administrador && !parameters.usuario.Lg_Replica_Analise_Transferencia)
                });
            });
            const data = component.getProdutosExcluidos((dataSource) =>
                component.gridProdutosExcluidos.option('dataSource', dataSource));
            const { tiposProcesso, toolbar, tipoProcesso, $processo,
                $produtosTransferidos, $produtosTotal, $produtosExcluidos } = component;
            const isInicio = tipoProcesso == tiposProcesso.Inicio;
            if (data.length > 0 && isInicio)
                $produtosExcluidos.fadeIn();
            else
                $produtosExcluidos.fadeOut();

            const { transferenciaAtual } = dxComp.labelTransferencia;
            $processo.text(transferenciaAtual.IdProcesso ? '#' + transferenciaAtual.IdProcesso : "Carregando...");
            $produtosTransferidos.text('0');

            const quantidadeProdutosProcessar = transferenciaAtual.Produtos.length - data.length;
            $produtosTotal.text(quantidadeProdutosProcessar);

            toolbar.iniciar.option({
                visible: isInicio,
                disabled: false,
            });

            toolbar.fechar.option({
                disabled: !isInicio,
            });

            if (isInicio) {
                return;
            }

            if (tipoProcesso == tiposProcesso.Conclusao) {
                transferenciaAtual.ConcluirTransferencia(component.progress.updateValues)
                    .then(async () => {
                        messages.success("Transferência concluída 👍", "Os produtos foram transferidos ao almoxarifado de destino");
                        await LoadTransferenciaAlter(transferenciaAtual.IdProcesso);
                    })
                    .catch((error) => {
                        messages.error("Erro na conclusão da transferência ‼️", error, 8000);
                    })
                    .finally(() => {
                        component.hide();
                        component.progress.option('value', 0);
                    });
            }
        },
        contentTemplate(content) {
            content.addClass('p-0');
            const $section = $($('#contentPopupExecTransferencia').html());
            const findSection = (selector) => $section.find(selector);

            this.$produtosExcluidos = findSection('#produtosExcluidos');

            this.gridProdutosExcluidos = new DevExpress.ui.dxDataGrid(findSection('#gridProdutosExcluidos'), {
                dataSource: this.produtosExcluidos,
                wordWrapEnabled: true,
                showColumnHeaders: true,
                showRowLines: false,
                showBorders: true,
                rowAlternationEnabled: true,
                searchPanel: { visible: false, },
                allowColumnResizing: false,
                allowColumnReordering: false,
                groupPanel: { visible: false },
                pager: {
                    visible: false,
                    showPageSizeSelector: false,
                    showNavigationButtons: false
                },
                cellHintEnabled: true,
                loadPanel: {
                    enabled: true,
                },
                scrolling: {
                    mode: 'virtual',
                    showScrollbar: 'always',
                },
                sorting: {
                    mode: 'none',
                },
                keyExpr: ['IdProduto', 'Lote'],
                columns: [
                    {
                        dataField: "IdProduto",
                        caption: "Produto",
                        allowEditing: false,
                        allowSorting: false,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        dataType: 'string',
                        width: 120,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Descricao",
                        caption: "Descrição",
                        allowEditing: false,
                        allowSorting: false,
                        allowHeaderFiltering: false,
                        dataType: 'string',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Lote",
                        caption: "Lote",
                        width: 80,
                        allowEditing: false,
                        allowSorting: false,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        dataType: 'string',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "EstoqueOrigem",
                        caption: "Estoque Alm. Origem",
                        width: 80,
                        allowEditing: false,
                        allowSorting: false,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Quantidade",
                        caption: "Quant. Transf.",
                        width: 80,
                        allowEditing: false,
                        allowSorting: false,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        cssClass: "column-data-grid",
                    },
                ],
            });
            this.select = new DevExpress.ui.dxCheckBox(findSection('#select'), {
                value: false,
                text: "Marque esta opção caso deseje criar uma nova transferência em elaboração com os produtos abaixo", //TODO: verificar se o usuário pode criar/clonar transferencias
            });
            this.progress = new DevExpress.ui.dxProgressBar(findSection('#progress'), {
                statusFormat: (ratio) => `Progresso: ${parseFloat((ratio * 100).toFixed(2)).toString().replace('.', ',')} %`,
                onContentReady: ({ component }) => {
                    component._$wrapper.append($('<div id="textMsg" class="text-right">'));
                    const $textMsg = component._$wrapper.find('#textMsg');
                    component.textMsg = {
                        element: $textMsg,
                        component: component,
                        updateText: (text = '', porcent) => {
                            $textMsg.text(text);
                            if (porcent || porcent == 0)
                                component.option('value', porcent);
                        },
                    }
                },
                onInitialized: ({ component }) => {
                    component.updateValues = (result) => {
                        if (result.ProdutosTotal)
                            this.$produtosTotal.text(result.ProdutosTotal);
                        if (result.ProdutosTransferidos)
                            this.$produtosTransferidos.text(result.ProdutosTransferidos);
                        if (result.Mensagem && result.Mensagem.toLowerCase() != 'inválido')
                            component.textMsg.updateText(result.Mensagem, result.Porcentagem >= 100 ? 100 : result.Porcentagem);
                    }
                },
            });
            this.toolbar = new DevExpress.ui.dxToolbar(findSection('#toolbar'), {
                onInitialized: (e) => {
                    e.component.option({
                        items: [
                            {
                                location: 'after',
                                locateInMenu: 'auto',
                                widget: 'dxButton',
                                name: 'iniciar',
                                options: {
                                    text: 'Iniciar Transferência',
                                    icon: icons.iniciar,
                                    type: 'default',
                                    onClick: ({ component, element }) => {
                                        const $icon = element.find('i');
                                        const atualIcon = $icon[0].className;
                                        $icon.removeClass().addClass(['fa-duotone', 'fa-spinner', 'dx-icon', 'fa-spin-custom']);

                                        const transferenciaAtual = dxComp.labelTransferencia.transferenciaAtual;
                                        if (this.select.option('value')) {
                                            this.progress.textMsg.updateText('Replicando transferência', 5);
                                            Transferencia.ReplicarTransferencia(transferenciaAtual.IdProcesso, true)
                                                .then(() => messages.info('Transferência replicada', 'Uma nova transferência foi criada apenas com os produtos detalhados no grid anterior'))
                                                .catch((error) => messages.error('Erro na replicação', 'Um erro foi encontrado na replicação e infelizmente os produtos detalhados no grid anterior foram perdidos, será necessário criar uma nova transferência e inserir os produtos novamente. Segue o erro apresentado: ' + error, 8000));
                                        }

                                        component.option('disabled', true);
                                        this.toolbar.fechar.option({
                                            disabled: true,
                                        });

                                        let complete = false;

                                        const callback = (data) => {
                                            this.progress.updateValues(data);
                                            return complete;
                                        }

                                        transferenciaAtual.EnviarTransferencia(callback)
                                            .then(() => {
                                                messages.success('Transferência efetuada com sucesso', 'Os produtos foram transferidos ao almoxarifado de destino, a próxima etapa será carregada');
                                                LoadTransferenciaAlter(transferenciaAtual);
                                                complete = true;
                                            })
                                            .catch((error) => {
                                                messages.error('Erro no processamento da transferência', error, 8000);
                                                complete = true;
                                            })
                                            .finally(() => {
                                                $icon.removeClass().addClass(atualIcon);
                                                component.option('disabled', true);
                                                this.hide();
                                                this.progress.option('value', 0);
                                                this.toolbar.fechar.option({
                                                    disabled: false,
                                                });
                                                complete = true;
                                            });
                                    },
                                    onInitialized: ({ component }) => {
                                        e.component.iniciar = component;
                                    }
                                },
                            },
                            {
                                location: 'after',
                                locateInMenu: 'auto',
                                widget: 'dxButton',
                                name: 'fechar',
                                options: {
                                    text: 'Fechar sem Aplicar',
                                    icon: 'fas fa-right-from-bracket',
                                    onClick: () => this.hide(),
                                    onInitialized: ({ component }) => {
                                        e.component.fechar = component;
                                    }
                                },
                            },
                        ]
                    })
                }
            });
            this.$processo = $section.find("#processo");
            this.$produtosTransferidos = $section.find("#produtosTransferidos");
            this.$produtosTotal = $section.find("#produtosTotal");

            return $section;
        },
        onHidden({ component }) {
            component.toolbar.fechar.option({
                disabled: false,
            });
        }
    })

    dxComp.popupObservacoesTransferencia = new DevExpress.ui.dxPopup("#popupObservacoesTransferencia", {
        minWidth: 208,
        maxWidth: 800,
        width: '90vw',
        minHeight: 282,
        height: 'auto',
        showCloseButton: false,
        showTitle: false,
        onShowing: function (e) {
            e.component._$wrapper.css('z-index', 997);
            this.observacao.option('value', this.observacoes);
        },
        contentTemplate: function (content) {
            content.addClass('p-0');
            const $section = $($('#contentObservacoesTransferencia').html());

            this.observacao = new DevExpress.ui.dxTextArea($section.find("#txt_Obs_Transferencia_Alteracao"), {
                labelMode: 'floating',
                label: 'Observações',
                width: '100%',
                minHeight: 130,
                height: '100%',
                maxLength: 5000,
                value: e => this.observacoes,
            });
            this.toolbar = new DevExpress.ui.dxToolbar($section.find("#toolbar"), {
                items: [
                    {
                        location: 'after',
                        locateInMenu: 'never',
                        widget: 'dxButton',
                        options: {
                            text: "Salvar Observação",
                            icon: "fa-solid fa-save",
                            type: "default",
                            onClick: async (e) => {
                                const newObservacao = this.observacao.option('value');
                                dxComp.txt_Obs_Transferencia.option('value', newObservacao);
                                const $icon = e.element.find('i');
                                const atualIcon = $icon[0].className;
                                $icon.removeClass().addClass(['fa-duotone', 'fa-spinner', 'dx-icon', 'fa-spin-custom']);
                                await dxComp.labelTransferencia.transferenciaAtual.SetObservacao(newObservacao)
                                    .then((result) => {
                                        PNotify.messages.success("Observação alterada", "Observação alterada com sucesso");
                                        this.observacoes = result.data;
                                    })
                                    .catch((error) => {
                                        this.observacao.option('value', dxComp.labelTransferencia.transferenciaAtual.Observacao);
                                        PNotify.messages.error("Alteração não realizada", `Erro ao alterar observação: ${error}`);
                                        console.error(error);
                                    })
                                    .finally(() => {
                                        $icon.removeClass().addClass(atualIcon);
                                        this.hide();
                                    });
                            },
                            onInitialized: (e) => this.save = e.component,
                        },
                    },
                    {
                        location: 'after',
                        locateInMenu: 'never',
                        widget: 'dxButton',
                        options: {
                            text: "Fechar",
                            icon: "fa-solid fa-right-from-bracket",
                            onClick: (e) => this.hide(),
                            onInitialized: (e) => this.cancel = e.component,
                        },
                    },
                ],
            });

            return $section;
        },
        onInitialized: (e) => {
            e.component.exibir = async (obs) => {
                await parameters.user._get();
                const transferencia = dxComp.labelTransferencia.getTransferenciaAtual();
                let statusSemObs = [_enumSituacaoTransferencia.Concluida, _enumSituacaoTransferencia.Cancelada, _enumSituacaoTransferencia.Recusada];
                if (statusSemObs.includes(transferencia.StatusTransferencia)) {
                    messages.info(`Status ${_enumSituacaoTransferencia.GetName(transferencia.StatusTransferencia)}`, 'No status atual não é possível alterar a observação da transferência', 5000);
                    return;
                }
                if (!parameters.usuario.Administrador) {
                    if (_enumSituacaoTransferencia.EmElaboracao != transferencia.StatusTransferencia &&
                        (!parameters.transferencia.Lg_Permite_Alterar_Observacao || !parameters.usuario.Lg_Permite_Alterar_Observacao)) {
                        messages.info('Permissão necessária', `Seu Login (${parameters.usuario.Cd_Login.toUpperCase()}) não tem permissão para alterar a observação`, 5000);
                        return;
                    }
                    if (transferencia.Remetente.toUpperCase() != parameters.usuario.Cd_Login.toUpperCase() &&
                        (!parameters.usuario.Lg_Permite_Alterar_Processos_Outros_Usuarios || !parameters.transferencia.Lg_Permite_Alterar_Processos_Outros_Usuarios)) {
                        messages.info('Permissão necessária', `Seu Login (${parameters.usuario.Cd_Login.toUpperCase()}) não tem permissão para alterar a observação de outros usuários`, 5000);
                        return;
                    }
                }
                e.component.observacoes = obs;
                e.component.show();
            }
        },
    });

    dxComp.popupTrocarDestinatario = new DevExpress.ui.dxPopup("#popupTrocarDestinatario", {
        minWidth: 208,
        maxWidth: 800,
        width: '90vw',
        height: 'auto',
        showCloseButton: false,
        showTitle: false,
        visible: false,
        onShowing: (e) => {
            e.component.lista.getDataSource().reload();
        },
        onInitialized: function (e) {
            this.$popup = $($('#contentPopupTrocarDestinatario').html());
            this.messages = {
                destinatarioAlterado: new PNotify({
                    auto_display: false,
                    title: "Destinatário alterado",
                    text: "Destinatário alterado com sucesso",
                    type: "success",
                    delay: 1500
                })
            };
            this.lista = new DevExpress.ui.dxLookup(this.$popup.find("#lkp_Usuario_Destinatario_Substituicao"), {
                dataSource: new DevExpress.data.DataSource({
                    key: 'Cd_Login',
                    loadMode: 'raw',
                    load: async () => {
                        await parameters._get;
                        return parameters.usuarioDestinatario;
                    }
                }),
                searchExpr: 'describe',
                valueExpr: 'Cd_Login',
                displayExpr: 'describe',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Usuário',
                },
                labelMode: 'floating',
                label: 'Destinatário (se selecionado, somente este usuário poderá concluir a Transferência)',
                placeholder: 'Destinatário (se selecionado, somente este usuário poderá concluir a Transferência)',
                showClearButton: true,
                itemTemplate: data => getTemplateFoto(data, 'custom-item'),
            });
            this.toolbar = new DevExpress.ui.dxToolbar(this.$popup.find("#toolbar"), {
                items: [
                    {
                        location: 'after',
                        locateInMenu: 'never',
                        widget: 'dxButton',
                        options: {
                            text: "Confirmar Substituição",
                            icon: "fa-solid fa-exchange",
                            type: "default",
                            onClick: async () => {
                                //TODO: validações de usuário e configurações
                                const elem = dxComp.popupTrocarDestinatario.lista;
                                if (elem.option('value') != null) {
                                    await dxComp.labelTransferencia.transferenciaAtual.SetDestinatario(elem.option('value'))
                                        .then((result) => {
                                            if (dxComp.lkp_Usuario_Destinatario.option('value') != elem.option('value'))
                                                PNotify.messages.success('Troca de destinatário', 'Troca realizada com sucesso', 1800);
                                            $('#destinatario #idNome').text(elem.option().selectedItem.Nome);
                                            $('#destinatario #imgDestinatario').attr('src', verificarSemFoto(elem.option().selectedItem.URL_Foto));
                                        })
                                        .catch((error) => {
                                            PNotify.messages.error("Alteração não realizada", `Erro ao alterar o destinatário: ${error}`);
                                            console.error(error);
                                        })
                                        .finally(() => {
                                            dxComp.popupTrocarDestinatario.hide();
                                            elem.option('value', null);
                                        });
                                } else {
                                    PNotify.messages.info("Faltando dados", "Selecione um destinatário antes de continuar", 1800);
                                }
                            },
                            onInitialized: (e) => {
                                dxComp.popupTrocarDestinatario.confirmar = e.component;
                            },
                        },
                    },
                    {
                        location: 'after',
                        locateInMenu: 'never',
                        widget: 'dxButton',
                        options: {
                            text: "Abortar Substituição",
                            icon: "fa-solid fa-right-from-bracket",
                            onClick: (e) => {
                                dxComp.popupTrocarDestinatario.lista.reset();
                                dxComp.popupTrocarDestinatario.hide();
                            },
                            onInitialized: (e) => dxComp.popupTrocarDestinatario.abortar = e.component,
                        },
                    },
                ],
            });
        },
        contentTemplate: function (content) {
            content.addClass('p-0');
            return this.$popup;
        },
    });

    dxComp.popupFiltroProdutos = new DevExpress.ui.dxPopup("#popupFiltroProdutos", {
        minWidth: 208,
        maxWidth: 800,
        width: '90vw',
        height: 'auto',
        showCloseButton: false,
        showTitle: false,
        visible: false,
        contentTemplate: function (content) {
            content.addClass('p-0');
            const $section = $($('#contentPopupFiltroProdutos').html());

            this.radio = new DevExpress.ui.dxRadioGroup($section.find('#radioFiltroProdutosAlteracao'), {
                items: dataSources.radioFiltroProdutosConfiguracoes,
                valueExpr: 'id',
                displayExpr: 'text',
                value: 'O',
                onValueChanged: (e) => e.component.updateClassLista(e.value),
                onInitialized: (e) => {
                    e.component.updateClassLista = (value) => {
                        if (!value) return;
                        $("#alertaFiltroProdutosAlteracao").removeClass(["alert-info", "alert-danger"]).addClass(value === 'OD' ? "alert-info" : "alert-danger");
                        $("#listFiltroProdutosAlteracao").children().remove();
                        dataSources.tasks[value].forEach(a => $('#listFiltroProdutosAlteracao').append($('<li/>').text(a)));
                    }
                },
            });

            this.toolbar = new DevExpress.ui.dxToolbar($section.find('#toolbar'), {
                items: [
                    {
                        location: 'after',
                        locateInMenu: 'auto',
                        widget: 'dxButton',
                        options: {
                            text: 'Aplicar Filtro',
                            icon: 'fas fa-filter',
                            type: 'default',
                            onClick: async (e) => {
                                const $icon = e.element.find('i');
                                const atualIcon = $icon[0].className;
                                const value = this.radio.option().value;
                                if (value == dxComp.labelTransferencia.transferenciaAtual.FiltroProdutosString) {
                                    this.hide();
                                    return;
                                }
                                $icon.removeClass().addClass(['fa-duotone', 'fa-spinner', 'dx-icon', 'fa-spin-custom']);
                                dxComp.radioFiltroProdutos.option('value', value);
                                await dxComp.labelTransferencia.transferenciaAtual.SetFiltroProdutos(value)
                                    .then((result) => {
                                        PNotify.messages.success("Observação alterada", "Observação alterada com sucesso");
                                        dxComp.labelTransferencia.transferenciaAtual.FiltroProdutosString = value;
                                        dxComp.gridBoxProdutos.dataGridSelecaoProdutos.reloadDataSource();
                                        this.value = value;
                                    })
                                    .catch((error) => {
                                        this.radio.option('value', dxComp.radioFiltroProdutos.option().value);
                                        PNotify.messages.error("Alteração não realizada", `Erro ao alterar o filtro de produtos: ${error}`); //TODO: ao alterar, na hora de salvar... verificar os produtos que necessitarem de ativação do almoxarifado 
                                        console.error(error);
                                    })
                                    .finally(() => {
                                        $icon.removeClass().addClass(atualIcon);
                                        dataSources.getProdutos(dxComp.labelTransferencia.transferenciaAtual.AlmoxarifadoOrigem,
                                            dxComp.labelTransferencia.transferenciaAtual.AlmoxarifadoDestino,
                                            true,
                                            dxComp.labelTransferencia.transferenciaAtual.FiltroProdutosString);
                                        this.hide();
                                    });
                            },
                        },
                    },
                    {
                        location: 'after',
                        locateInMenu: 'auto',
                        widget: 'dxButton',
                        options: {
                            text: 'Fechar sem Aplicar',
                            icon: 'fas fa-right-from-bracket',
                            onClick: e => {
                                this.option('value', (dxComp.radioFiltroProdutos.option('value')));
                                this.hide();
                            },
                        },
                    },
                ],
            });

            return $section;
        },
        onShowing: (e) => {
            e.component.radio.option('value', null);
            e.component.radio.option('value', e.component.filtroValue);
        },
        onInitialized: (e) => {
            e.component.exibir = async (filtroAtual) => {
                await parameters.user._get();
                if (!parameters.usuario.Administrador) {
                    if (!parameters.transferencia.Lg_Permite_Alterar_Filtro_Produto || !parameters.usuario.Lg_Permite_Alterar_Filtro_Produto) {
                        messages.info('Permissão necessária', `Seu Login (${parameters.usuario.Cd_Login.toUpperCase()}) não tem permissão para alterar o filtro`, 5000);
                        return;
                    }
                    const transferencia = dxComp.labelTransferencia.getTransferenciaAtual();
                    if (transferencia.Remetente.toUpperCase() != parameters.usuario.Cd_Login.toUpperCase() &&
                        (!parameters.transferencia.Lg_Permite_Alterar_Processos_Outros_Usuarios || !parameters.usuario.Lg_Permite_Alterar_Processos_Outros_Usuarios)) {
                        messages.info('Permissão necessária', `Seu Login (${parameters.usuario.Cd_Login.toUpperCase()}) não tem permissão para alterar o filtro no processo de outros usuários`, 5000);
                        return;
                    }
                }
                e.component.filtroValue = filtroAtual;
                e.component.show();
            }
        },
    });

    dxComp.popupCancelamento = new DevExpress.ui.dxPopup("#popupCancelamento", {
        minWidth: 208,
        maxWidth: 800,
        width: '90vw',
        minHeight: 320,
        height: 'auto',
        showCloseButton: false,
        showTitle: false,
        contentTemplate(content) {
            content.addClass('p-0');
            const $section = $($('#contentPopupCancelamento').html());

            this.$listaTransferencias = $section.find('#transfersList');
            this.$listaTransferencias.text(this.processos.join(' / '));

            this.motivo = new DevExpress.ui.dxTextArea($section.find("#txt_Justificativa_Cancelamento"), {
                labelMode: 'floating',
                label: 'Justificativa de Cancelamento',
                width: '100%',
                minHeight: 175,
                height: '100%',
                maxLength: 5000,
            });

            new DevExpress.ui.dxValidator($section.find("#txt_Justificativa_Cancelamento"), { validationGroup: 'motivoCancelamento', validationRules: [{ type: "required", message: "Preenchimento obrigatório", }], });

            this.toolbar = new DevExpress.ui.dxToolbar($section.find("#toolbar"), {
                items: [
                    {
                        location: 'after',
                        locateInMenu: 'never',
                        widget: 'dxButton',
                        options: {
                            text: "Cancelar Transferência",
                            icon: "fas fa-trash-xmark",
                            type: "danger",
                            onClick: async (botaoCancelar) => {
                                const $icon = botaoCancelar.component.element().find('i');
                                const iconName = $icon[0].className;
                                if (DevExpress.validationEngine.validateGroup("motivoCancelamento").isValid) {
                                    $icon.removeClass().addClass(['fa-duotone', 'fa-spinner', 'dx-icon', 'fa-spin-custom']);
                                    dxComp.loadPanelTransferencia.show();
                                    await Transferencia.CancelarTransferencia(this.processos, this.motivo.option('value'))
                                        .then(() => {
                                            messages.success("Cancelamento efetuado", "Os processos foram cancelados corretamente");
                                            iniciaCardConsultaGeral();
                                            this.motivo.option('value', null);
                                            this.hide();
                                        })
                                        .catch((error) => {
                                            messages.error("Erro no cancelamento", "Um erro foi encontrado ao processar o cancelamento dos processos. " + error);
                                        })
                                        .finally(() => {
                                            $icon.removeClass().addClass(iconName);
                                            dxComp.loadPanelTransferencia.hide();
                                        });
                                }
                            },
                        },
                    },
                    {
                        location: 'after',
                        locateInMenu: 'never',
                        widget: 'dxButton',
                        options: {
                            text: "Fechar",
                            icon: "fas fa-right-from-bracket",
                            onClick: () => this.hide(),
                        },
                    },
                ],
            });

            return $section;
        },
        onInitialized: (e) => {
            e.component.exibir = async (processos) => {
                processos = Array.isArray(processos) ? processos : [processos];
                if (processos.length == 0)
                    return;
                await parameters.user._get();
                if (!parameters.usuario.Administrador) {
                    if (!parameters.usuario.Lg_Cancela_Analise_Transferencia) {
                        messages.info('Permissão necessária', `Seu Login (${parameters.usuario.Cd_Login.toUpperCase()}) não tem permissão para cancelar transferências`, 5000);
                        return;
                    }
                    const procs = dataSources.consultaGeral.items
                        .filter(a => processos.includes(a.IdProcesso))
                        .map(a => Object({
                            Remetente: a.Remetente,
                            IdProcesso: a.IdProcesso,
                        }));

                    const processosByUser = procs.filter(a => a.Remetente.toUpperCase() == parameters.usuario.Cd_Login.toUpperCase())
                    if (processosByUser.length < procs.length && (!parameters.transferencia.Lg_Permite_Alterar_Processos_Outros_Usuarios || !parameters.usuario.Lg_Permite_Movimentar_Processos_Outros_Usuarios)) {
                        if (processosByUser.length == 0) {
                            messages.info("Destinatário inválido", `Seu login (${parameters.usuario.Cd_Login.toUpperCase()}) não é o remetente ${procs.length == 1 ? 'deste processo' : 'destes processos'}.`);
                            dxComp.consultaGeral.gridConsultaGeral.deselectAll();
                            dxComp.emTransito.gridConsultaTransito.deselectAll();
                            return;
                        }
                        else {
                            const processosNoUser = procs.filter(a => a.Remetente.toUpperCase() != parameters.usuario.Cd_Login.toUpperCase())
                            messages.info("Processos sem seu login", `Os seguintes processos não serão cancelados: ${processosNoUser.map(a => a.IdProcesso).join(',')}. \nSeu login (${parameters.usuario.Cd_Login.toUpperCase()}) não é o remetente deles.`);
                            dxComp.consultaGeral.gridConsultaGeral.deselectRows(processosNoUser.map(a => a.IdProcesso));
                            dxComp.emTransito.gridConsultaTransito.deselectRows(processosNoUser.map(a => a.IdProcesso));
                            processos = processosByUser.map(a => a.IdProcesso);
                        }
                    }
                }
                e.component.processos = processos;
                if (e.component.$listaTransferencias)
                    e.component.$listaTransferencias.text(processos.join(' / '));
                e.component.show();
            };
        },
        onShowing: (e) => {
            e.component._$wrapper.css('z-index', 997);
        },
    });

    dxComp.popupRecusa = new DevExpress.ui.dxPopup("#popupRecusa", {
        minWidth: 208,
        maxWidth: 800,
        width: '90vw',
        minHeight: 320,
        height: 'auto',
        showCloseButton: false,
        showTitle: false,
        contentTemplate(content) {
            content.addClass('p-0');
            const $section = $($('#contentPopupRecusa').html());

            this.$transfersList = $section.find('#transfersList');

            this.motivo = new DevExpress.ui.dxTextArea($section.find("#txt_Justificativa_Recusa"), {
                labelMode: 'floating',
                label: 'Justificativa para recusar o recebimento da transferência',
                width: '100%',
                minHeight: 175,
                height: '100%',
                maxLength: 5000,
            });
            this.validator = new DevExpress.ui.dxValidator($section.find("#txt_Justificativa_Recusa"), {
                validationGroup: 'motivoRecusa', validationRules: [{
                    type: "required",
                    message: "Preenchimento obrigatório",
                }],
            });

            this.toolbar = new DevExpress.ui.dxToolbar($section.find("#toolbar"), {
                items: [
                    {
                        location: 'after',
                        locateInMenu: 'never',
                        widget: 'dxButton',
                        options: {
                            text: "Enviar Recusa",
                            icon: icons.recusar,
                            type: "danger",
                            onClick: async () => {
                                if (!DevExpress.validationEngine.validateGroup("motivoRecusa").isValid) {
                                    return;
                                }
                                const { popupExecTransferencia, loadPanelTransferencia, consultaGeral } = dxComp;

                                const dataProcessos = consultaGeral.gridConsultaGeral.option('dataSource._store.__rawData');
                                const recusaProcessos = dataProcessos.filter(a => this.processos.includes(a.IdProcesso));
                                const processosComMovimento = recusaProcessos.filter(a =>
                                    _enumRegraMovimentacaoEstoque.GetByInt(a.RegraMovimentacaoEstoque) != _enumRegraMovimentacaoEstoque.Conclusao);
                                if (processosComMovimento.length > 0) {
                                    const plural = processosComMovimento.length > 1;
                                    const confirmacao = await DevExpress.ui.dialog.confirm(`A${plural ? 's' : ''} transferência${plural ? 's' : ''} ${processosComMovimento.map(a => a.IdProcesso).join(' / ')} moviment${plural ? 'aram' : 'ou'} estoque
                                        no envio e estornar${plural ? 'ão' : 'á'} ao almoxarifado de origem, deseja continuar?`, 'Estornar quantidades');
                                    if (!confirmacao)
                                        return;
                                }

                                const processosSemMovimento = recusaProcessos.filter(a =>
                                    _enumRegraMovimentacaoEstoque.GetByInt(a.RegraMovimentacaoEstoque) == _enumRegraMovimentacaoEstoque.Conclusao);
                                const motivo = this.motivo.option('value');
                                let withErro = false;
                                const processar = [
                                    async () => {
                                        if (processosSemMovimento.length == 0) {
                                            return;
                                        }
                                        loadPanelTransferencia.exibir('Iniciando recusa sem movimento de estoque');
                                        const callback = ({
                                            Porcentagem,
                                            Mensagem,
                                            ProdutoAtual,
                                            ProdutosTransferidos,
                                            ProdutosTotal
                                        }) => {
                                            if (!Mensagem || Mensagem == "Inválido") {
                                                return;
                                            }
                                            loadPanelTransferencia.alterarMensagem(`${Math.trunc(Porcentagem)}% | 
                                                ${Mensagem}${ProdutoAtual ? ` - Produto: ${ProdutoAtual}` : ""}
                                                ${ProdutosTransferidos && ProdutosTotal ? ` (${ProdutosTransferidos}/${ProdutosTotal})` : ""}`);
                                        }
                                        const idsProcessos = processosSemMovimento.map(a => a.IdProcesso);
                                        await Transferencia.RecusarTransferencia(idsProcessos, motivo, callback)
                                            .catch(error => {
                                                withErro = true;
                                                messages.error("Erro nas Recusas sem movimento", error);
                                            });
                                        loadPanelTransferencia.hide();
                                    },
                                    async () => {
                                        if (processosComMovimento.length == 0) {
                                            return;
                                        }
                                        let recusa = popupExecTransferencia.exibir();
                                        let porcentagemTotal = 0;
                                        let increment = 1;
                                        let porcentagemAtual = null;
                                        let complete = false;
                                        const callback = ({
                                            Porcentagem,
                                            Mensagem,
                                            ProdutosTransferidos,
                                            ProdutosTotal,
                                            Processo,
                                            CountProcessos,
                                            NumeroProcesso,
                                        }) => {
                                            if (!Mensagem || Mensagem == "Inválido") {
                                                return;
                                            }
                                            const parte = 100 / CountProcessos;
                                            const porcentagemParte = (Porcentagem * parte) / 100;
                                            const calculo = (parte * (NumeroProcesso - 1)) + porcentagemParte;

                                            porcentagemTotal = NumeroProcesso > increment
                                                ? calculo
                                                : Porcentagem == porcentagemAtual
                                                    ? porcentagemTotal
                                                    : calculo;

                                            porcentagemAtual = Porcentagem;
                                            increment = NumeroProcesso;
                                            if (Processo)
                                                recusa.$processo.text("#" + Processo);
                                            if (ProdutosTotal)
                                                recusa.$produtosTotal.text(ProdutosTotal)
                                            if (ProdutosTransferidos)
                                                recusa.$produtosTransferidos.text(ProdutosTransferidos)
                                            recusa.progress.textMsg.updateText(Mensagem.toLocaleLowerCase() != 'inválido' && Mensagem ? Mensagem : '', Porcentagem >= 100 ? 100 : Porcentagem);
                                            return complete;
                                        }
                                        const idsProcessos = processosComMovimento.map(a => a.IdProcesso);
                                        await Transferencia.RecusarTransferencia(idsProcessos, motivo, callback)
                                            .catch(error => {
                                                complete = true;
                                                withErro = true;
                                                messages.error("Erro nas Recusas sem movimento", error);
                                            });
                                        popupExecTransferencia.hide();
                                    },
                                    () => {
                                        if (withErro)
                                            return;
                                        if (this.destino == 'geral')
                                            iniciaCardConsultaGeral();
                                        else
                                            iniciaCardTransferenciasTransito();
                                    }
                                ]
                                await this.hide();
                                for (index in processar) {
                                    const fn = processar[index];
                                    await fn();
                                }
                            },
                        },
                    },
                    {
                        location: 'after',
                        locateInMenu: 'never',
                        widget: 'dxButton',
                        options: {
                            text: "Fechar",
                            icon: "fas fa-right-from-bracket",
                            onClick: () => this.hide(),
                        },
                    },
                ],
            });

            return $section;
        },
        onShowing({ component }) {
            this.motivo.option({
                value: null,
                validationStatus: 'valid'
            });
            if (!component.hasProcessos())
                return;
            const count = component.processos.length;
            const plural = count < 2 ? '' : 's';
            component.motivo.option('label', `Justificativa para recusar o recebimento da${plural} transferência${plural}`);
            component.$transfersList.text(component.processos.join(' / '));
            component.toolbar.option('text', component?.textEnvio ?? "Enviar Recusa");
        },
        onInitialized: ({ component, element }) => {
            component.processos = [];
            component.hasProcessos = () => component.processos.length > 0;
            component.exibe = async (itens, destino = 'geral') => {
                itens = Array.isArray(itens) ? itens : [itens];
                component.destino = destino;
                if (itens.length == 0) {
                    messages.info('Transferências não detectadas', 'Não foram detectadas transferências selecionadas para realizar o processo de recusa', 2500);
                    return;
                }

                const parametersUser = await parameters.user._get();

                if (!parametersUser.Administrador) {
                    if (!parametersUser.Lg_Recusa_Analise_Transferencia) {
                        messages.info('Permissão necessária', `Seu Login (${parametersUser.Cd_Login.toUpperCase()}) não tem permissão para recusar transferências`, 5000);
                        return;
                    }
                    const processos = dataSources.consultaGeral.items
                        .filter(a => itens.includes(a.IdProcesso))
                        .map(a => Object({
                            Destinatario: a.Destinatario,
                            IdProcesso: a.IdProcesso,
                        }));

                    const processosByUser = processos.filter(a => a.Destinatario.toUpperCase() == parametersUser.Cd_Login.toUpperCase())
                    if (processosByUser.length < processos.length && (!parametersUser.Lg_Permite_Movimentar_Processos_Outros_Usuarios || !parametersUser.Lg_Permite_Movimentar_Processos_Outros_Usuarios)) {
                        if (processosByUser.length == 0) {
                            messages.info("Destinatário inválido", `Seu login (${parametersUser.Cd_Login.toUpperCase()}) não é o destinatário ${processos.length == 1 ? 'deste processo' : 'destes processos'}.`);
                            dxComp.consultaGeral.gridConsultaGeral.deselectAll();
                            dxComp.emTransito.gridConsultaTransito.deselectAll();
                            return;
                        }
                        else {
                            const processosNoUser = processos.filter(a => a.Destinatario.toUpperCase() != parametersUser.Cd_Login.toUpperCase())
                            messages.info("Processos sem seu login", `Os seguintes processos não serão recusados: ${processosNoUser.map(a => a.IdProcesso).join(',')}. \nSeu login (${parametersUser.Cd_Login.toUpperCase()}) não é o destinatário deles.`);
                            dxComp.consultaGeral.gridConsultaGeral.deselectRows(processosNoUser.map(a => a.IdProcesso));
                            dxComp.emTransito.gridConsultaTransito.deselectRows(processosNoUser.map(a => a.IdProcesso));
                            itens = processosByUser.map(a => a.IdProcesso);
                        }
                    }
                }

                component.processos = itens;
                component.textEnvio = `Enviar Recusa${itens.length > 1 ? "s" : ""}`;
                component.show();
            };
        },
    });

    (async () => {
        await await parameters._get;
        dxComp.chk_Lg_Transferencia_Estoque_Negativo = new DevExpress.ui.dxCheckBox('#chk_Lg_Transferencia_Estoque_Negativo', {
            text: 'Permitir transferências mesmo que o estoque esteja negativo',
            value: parameters.transferencia.Lg_Permite_Transferencia_Estoque_Negativo ?? false,
            onValueChanged: (e) => {
                fetch(`transferencias/aceitaEstoqueNegativo?value=${e.value ?? false}`, {
                    method: 'PUT'
                }).then(result => {
                    if (result.ok) {
                        messages.success("Alteração de parâmetro", `Transferências ${e.value ? '' : 'não'} podem utilizar estoque negativo`);
                        return;
                    }
                    messages.error("Falha ao alterar parâmetro", "Erro ao tentar alterar parâmetro que possibilita utilização de estoque negativo");
                })
            },
        });
    })();

    dxComp.loadAlmoxOrigem = Load_Azr_Lookup_Almoxarifado([], 'almoxarifadoAtivosOrigem', 1, 'Selecione o almoxarifado de Origem', 'Almoxarifado de Origem')
        .then((comp) => {
            const paramUser = parameters.user._get();

            function FiltroAlmoxarifados(origem) {
                const deferred = $.Deferred();
                this.promise = deferred.promise();
                this.origem = origem;
                this.dataSource = this.origem.getDataSource().store()._array;

                this.configurarAlmoxRestricao = () => {
                    paramUser.then(({ Almoxarifados: almoxs, Administrador: isAdmin }) => {
                        if (isAdmin)
                            return;
                        const origem = almoxs
                            .filter(a => a.RestricaoOrigem)
                            .map(a => a.Almoxarifado);
                        const destino = almoxs
                            .filter(a => a.RestricaoDestino)
                            .map(a => a.Almoxarifado);
                        const restricao = { origem, destino };

                        const configure = (tipo) => {
                            const data = this[tipo].getDataSource();

                            const dataMap = data._store._array.map(alm => {
                                const result = { ...alm };
                                result.disabled = restricao[tipo].includes(alm.CD_ALMOXARIFADO);
                                result.DS_ALMOXARIFADO_PESQUISA = result.disabled ? (' - Almoxarifado restrito para seu usuário' + tipo) : result.DS_ALMOXARIFADO
                                return result;
                            })

                            this[tipo].option('dataSource', new DevExpress.data.DataSource({
                                store: dataMap,
                                key: "CD_ALMOXARIFADO",
                            }));
                        }

                        configure('origem');
                        configure('destino');

                        console.log({ origem, destino });
                    });
                }

                this.destino = new DevExpress.ui.dxLookup('#almoxarifadoAtivosDestino', {
                    dropDownOptions: {
                        closeOnOutsideClick: true,
                        showTitle: false,
                        title: "Almoxarifado de Destino",
                    },
                    dataSource: new DevExpress.data.DataSource({
                        store: this.dataSource.map(a => ({ ...a })),
                        key: "CD_ALMOXARIFADO",
                    }),
                    disabled: true,
                    searchEnabled: true,
                    searchExpr: ['DS_ALMOXARIFADO_PESQUISA'],
                    cleanSearchOnOpening: true,
                    displayExpr: 'DS_ALMOXARIFADO_PESQUISA',
                    valueExpr: 'CD_ALMOXARIFADO',
                    placeholder: "Selecione o almoxarifado de Destino",
                    labelMode: 'floating',
                    label: "Almoxarifado de Destino",
                    showClearButton: true,
                    showPopupTitle: true,
                    onValueChanged: a => {
                        $('#idAlmoxarifadoDestino').text(a.value);
                        if (a.value == null) {
                            $("#avancarAlm").attr("disabled", "");
                            return;
                        }
                        $("#avancarAlm").removeAttr("disabled");
                    },
                    onContentReady: e => deferred.resolve(),
                });
                paramUser.then(({ Almoxarifados: almoxs, Administrador: isAdmin }) => {
                    const origem = almoxs
                        .filter(a => a.RestricaoOrigem)
                        .map(a => a.Almoxarifado);
                    const store = this.origem.getDataSource().store()._array.map(a => ({ ...a }));
                    for (const item of store) {
                        item.disabled = true;
                        item.DS_ALMOXARIFADO_PESQUISA = `${item.CD_ALMOXARIFADO} - ${item.DS_ALMOXARIFADO} - Restrição de uso ${origem.includes(item.CD_ALMOXARIFADO) ? "no seu usuário" : ""}`;
                        if (!origem.includes(item.CD_ALMOXARIFADO) || isAdmin) {
                            item.disabled = false;
                            item.DS_ALMOXARIFADO_PESQUISA = `${item.CD_ALMOXARIFADO} - ${item.DS_ALMOXARIFADO}`;
                        }
                    };
                    this.origem.option({
                        dataSource: store,
                        onValueChanged: a => {
                            $('#remetente #idAlmoxarifadoOrigem').text(a.value);
                            this.destino.option({
                                value: null,
                                validationStatus: 'valid',
                                disabled: true,
                            });
                            if (a.value == null) {
                                this.destino.getDataSource().store()._array.forEach(item => item.disabled = false);
                                this.destino.getDataSource().reload();
                                $("#avancarAlm").attr("disabled", "");
                                return;
                            }

                            const destino = almoxs
                                .filter(a => a.RestricaoDestino)
                                .map(a => a.Almoxarifado);
                            let store = a.component.getDataSource().store()._array.map(b => ({ ...b }));
                            store.forEach(item => {
                                item.DS_ALMOXARIFADO_PESQUISA = `${item.CD_ALMOXARIFADO} - ${item.DS_ALMOXARIFADO} - Restrição de uso ${destino.includes(item.CD_ALMOXARIFADO) ? "no seu usuário" : ""}`;
                                item.disabled = true;
                                if (parameters.allOrigemDestino[a.value].some(b => b == item.CD_ALMOXARIFADO) &&
                                    (isAdmin || !destino.includes(a.value))) {
                                    item.disabled = false;
                                    item.DS_ALMOXARIFADO_PESQUISA = `${item.CD_ALMOXARIFADO} - ${item.DS_ALMOXARIFADO}`;
                                }
                            });
                            this.destino.option('dataSource', store);
                            if (DevExpress.validationEngine.validateGroup("almoxarifadosOrigemDestino").isValid)
                                this.destino.option('disabled', false);

                        },
                    });
                });
            }

            dxComp.filtroAlmoxarifados = new FiltroAlmoxarifados(comp.Component);

            new DevExpress.ui.dxValidator("#almoxarifadoAtivosOrigem", { validationGroup: 'almoxarifadosOrigemDestino', validationRules: [{ type: "required", message: "Preenchimento obrigatório", }], });
            new DevExpress.ui.dxValidator("#almoxarifadoAtivosDestino", { validationGroup: 'almoxarifadosOrigemDestino', validationRules: [{ type: "required", message: "Preenchimento obrigatório", }], });
        })
        .catch((error) => {
            //TODO: tratar erro de datasource
        });

    dxComp.txt_Obs_Transferencia = new DevExpress.ui.dxTextArea('#txt_Obs_Transferencia', {
        labelMode: 'floating',
        label: 'Observações',
        height: 80,
        maxLength: 5000,
        onValueChanged: a => dxComp.popupObservacoesTransferencia.option('observacoes', a.value), //todo: retirar
        onInitialized: () => new DevExpress.ui.dxValidator("#txt_Obs_Transferencia", { validationGroup: 'UsuarioDestinatarioValidator', validationRules: [{ type: "required", message: "Preenchimento obrigatório", }], }),
    });

    dxComp.lkp_Usuario_Destinatario = new DevExpress.ui.dxLookup('#lkp_Usuario_Destinatario', {
        dataSource: new DevExpress.data.DataSource({
            loadMode: 'raw',
            key: 'Cd_Login',
            load: async () => {
                await parameters._get;
                return parameters.usuarioDestinatario;
            },
        }),
        searchExpr: 'describe',
        valueExpr: 'Cd_Login',
        displayExpr: 'describe',
        labelMode: 'floating',
        label: 'Destinatário (se selecionado, somente este usuário poderá concluir a Transferência)',
        placeholder: 'Destinatário (se selecionado, somente este usuário poderá concluir a Transferência)',
        showClearButton: true,
        itemTemplate: data => getTemplateFoto(data, 'custom-item'),
        onValueChanged: a => {
            if (!a.value) return;
            $('#destinatario #idNome').text(a.component.option().selectedItem.Nome);
            $('#destinatario #imgDestinatario').attr('src', verificarSemFoto(a.component.option().selectedItem.URL_Foto));
        },
        onInitialized: () => new DevExpress.ui.dxValidator("#lkp_Usuario_Destinatario", { validationGroup: 'UsuarioDestinatarioValidator', validationRules: [{ type: "required", message: "Preenchimento obrigatório", }], }),
    });

    dxComp.radioFiltroProdutos = new DevExpress.ui.dxRadioGroup('#radioFiltroProdutos', {
        items: dataSources.radioFiltroProdutosConfiguracoes,
        valueExpr: 'id',
        displayExpr: 'text',
        onContentReady: async (e) => {
            await parameters._get;
            e.component.option('value', parameters.transferencia.FiltroProdutosString);
        },
        onValueChanged: (e) => {
            e.component.updateClassLista(e.value);
        },
        onInitialized: (e) => {
            e.component.updateClassLista = (value) => {
                if (!value) return;
                $("#alertaFiltroProdutos").removeClass(["alert-info", "alert-danger"]).addClass(value === 'OD' ? "alert-info" : "alert-danger");
                $("#listFiltroProdutos").children().remove();
                dataSources.tasks[String(value)].forEach(a => $('#listFiltroProdutos').append($('<li/>').text(a)));
            }
        },
    });

    dxComp.btnTrocarDestinatario = (new function () {
        const selector = '#btnTrocarDestinatario';
        this.$element = $(selector);
        this.show = () => this.$element.show();
        this.hide = () => this.$element.hide();
        this.configBySituacao = (situacao) => new Promise(async (resolve) => {
            await parameters._get;
            if ([_enumSituacaoTransferencia.Concluida, _enumSituacaoTransferencia.Cancelada, _enumSituacaoTransferencia.Recusada].includes(situacao)) {
                this.hide();
                return resolve();
            }
            if (!parameters.administrador &&
                _enumSituacaoTransferencia.EmElaboracao != situacao &&
                (!parameters.transferencia.Lg_Permite_Alterar_Destinatario || !parameters.usuario.Lg_Permite_Alterar_Destinatario)) {
                this.hide();
                return resolve();
            }
            this.show();
            resolve();
        })
    });

    function CreateEvolucao() {
        this.element = $('#evolucaoTransferencia');
        this.wizard = this.element.bootstrapWizard({
            tabClass: 'wizard-steps',
            nextSelector: 'ul.pager li.next',
            previousSelector: 'ul.pager li.previous',
            firstSelector: null,
            lastSelector: null,
            onTabClick(tab, navigation, index, newindex) {
                return newindex > index;
            },
            onTabChange(tab, navigation, index, newindex) {
                let $total = navigation.find('li').length - 1;
                $('#w3').find(this.nextSelector)[newindex == $total ? 'addClass' : 'removeClass']('hidden');
            },
            async onTabShow(tab) {
                const etapas = await dataSources.etapas._get;
                const qtEtapasAtivas = etapas.filter(a => a.Status).length;
                const qtEtapasInativas = etapas.length - qtEtapasAtivas;
                const valorSomaPorcentagem = (100 / (qtEtapasAtivas - 1));
                const valorEntreEtapas = valorSomaPorcentagem / 2;
                const { StatusTransferencia } = dxComp.labelTransferencia.transferenciaAtual;

                const getPorcentagem = () => {
                    if (!StatusTransferencia)
                        return 0;
                    let soma = 0;
                    for (index in etapas) {
                        const etapa = { ...etapas[index] };
                        const porcentagem = soma + (etapa.Status ? 0 : valorEntreEtapas);
                        soma += index == 0 && qtEtapasInativas > 0 ? 0 : valorSomaPorcentagem;
                        if (etapa.EtapaId == StatusTransferencia) {
                            return porcentagem > 100 ? 100 : porcentagem;
                        }
                    }
                    return 0;
                }

                $('#w3').find('.progress-indicator').css({ 'width': getPorcentagem() + '%' });
                tab.prevAll().addClass('completed');
                tab.nextAll().removeClass(['completed', 'active', 'disabled']);
                if (StatusTransferencia)
                    tab.addClass('active').removeClass(['completed', 'disabled']);
            },
        }).data('bootstrapWizard');

        let fnRefresh = () => new Promise(async (resolve) => {
            dataSources.etapas.get();
            await dataSources.etapas._get.then(items => {
                items
                    .map(a => ({
                        Ordem: a.Ordem,
                        Status: a.Status
                    }))
                    .forEach((a, index, arr) => {
                        this.wizard[!a.Status ? "hide" : "display"](a.Ordem - 1)
                        if (index + 1 == arr.length)
                            resolve();
                    });
            });
        });

        this.wizard.refresh = fnRefresh;

        fnRefresh();

        this.wizard.getAtualIndex = () => this.wizard.getIndex(this.wizard.activeTab());

        this.wizard.select = index => {
            this.wizard.resetWizard();
            this.wizard.show(0);
            this.wizard.show(index);
            $.when(fnRefresh());
        };

        this.wizard.selectByEnum = (enumStatus) => new Promise((resolve) => {
            if (!Object.values(_enumSituacaoTransferencia).includes(enumStatus)) {
                console.error(`O valor ${enumStatus} não é válido`);
                fnRefresh();
                return;
            }
            dataSources.etapas._get.then(items => {
                this.wizard.resetWizard();
                const { Ordem } = items.find(a => a.Id == enumStatus);
                const $wizardSteps = $('.wizard-steps');
                const $stepsProgress = $('.steps-progress');
                $wizardSteps.removeClass(['justify-content-between', 'justify-content-center'])
                this.wizard.select(Ordem - 1);
                fnRefresh().then(() => {
                    const arrStatusSozinhos = [
                        _enumSituacaoTransferencia.Cancelada,
                        _enumSituacaoTransferencia.Concluida,
                        _enumSituacaoTransferencia.Recusada
                    ];
                    if (!arrStatusSozinhos.includes(enumStatus)) {
                        $wizardSteps.addClass('justify-content-between');
                        $stepsProgress.show();
                        resolve();
                        return;
                    }
                    $wizardSteps.addClass('justify-content-center');
                    items
                        .filter(a => a.Id != enumStatus)
                        .forEach((a, index, arr) => {
                            this.wizard.hide(a.Ordem - 1);
                            if (index + 1 == arr.length) {
                                this.wizard.display(Ordem - 1);
                                $stepsProgress.hide();
                                resolve();
                            }
                        });
                });
            })
        });
    }

    dxComp.evolucao = new CreateEvolucao();

    let destinoVoltarConsulta = 'geral';

    const onClickImprimirRelatorio = (idProcesso) => window.open(`Transferencias/${idProcesso}/relatorio?v=${Math.random().toString().slice(2)}`);

    dxComp.toolbarAcoesProcesso = {
        toolbar: new DevExpress.ui.dxToolbar('#toolbarAcoesProcesso', {
            items: [
                {
                    location: 'before',
                    locateInMenu: 'auto',
                    widget: 'dxButton',
                    name: 'observacao',
                    options: {
                        text: 'Observações',
                        icon: 'fa-solid fa-comment',
                        onClick: () => dxComp.popupObservacoesTransferencia.exibir(dxComp.labelTransferencia.getTransferenciaAtual().Observacao),
                    },
                },
                {
                    location: 'before',
                    locateInMenu: 'auto',
                    widget: 'dxButton',
                    name: 'filtroProdutos',
                    options: {
                        text: 'Filtro Produtos',
                        icon: 'fa-solid fa-filter',
                        onClick: () => dxComp.popupFiltroProdutos.exibir(dxComp.labelTransferencia.getTransferenciaAtual().FiltroProdutosString),
                    },
                },
                {
                    location: 'after',
                    locateInMenu: 'never',
                    widget: 'dxButton',
                    name: 'voltar',
                    options: {
                        text: 'Voltar',
                        icon: 'fa-solid fa-arrow-left',
                        onClick: () => {
                            if (destinoVoltarConsulta == 'geral')
                                iniciaCardConsultaGeral();
                            else
                                iniciaCardTransferenciasTransito();
                        },
                        onInitialized: (e) => this.btnVoltar = e.component,
                    },
                },
                {
                    location: 'after',
                    locateInMenu: 'never',
                    widget: 'dxButton',
                    name: 'separar',
                    options: {
                        text: 'Enviar para Separação',
                        icon: 'fa fa-shelves mr-2',
                        type: 'default',
                        onClick: () => {
                            const { IdProcesso } = dxComp.labelTransferencia.getTransferenciaAtual();
                            dxComp.loadPanelTransferencia.exibir("Alterando processo para \"Em Separação\"");
                            Transferencia.SepararTransferencia(IdProcesso)
                                .then(() => messages.success("Etapa alterada", "Processo pronto para iniciar separação"))
                                .catch((err) => messages.error("Erro ao alterar etapa", err))
                                .finally(() => {
                                    LoadTransferenciaAlter(IdProcesso).then(() => dxComp.loadPanelTransferencia.hide());
                                })
                        },
                        onInitialized: (e) => this.btnSeparar = e.component,
                    },
                },
                {
                    location: 'after',
                    locateInMenu: 'auto',
                    widget: 'dxButton',
                    name: 'enviar',
                    options: {
                        text: 'Enviar Transferência',
                        icon: 'fa-solid fa-truck-fast mr-2',
                        type: 'default',
                        onClick: async () => {

                            const transferencia = dxComp.labelTransferencia.getTransferenciaAtual();
                            if (!parameters.user?.promise)
                                await parameters.user._get();
                            if (!parameters.usuario.Administrador) {
                                if (!parameters.usuario.Lg_Envia_Transferencia) {
                                    messages.info('Permissão necessária', `Seu Login (${parameters.usuario.Cd_Login.toUpperCase()}), não tem permissão para realizar o envio de transferências`, 5000);
                                    return;
                                }
                                if (transferencia.Remetente.toUpperCase() != parameters.usuario.Cd_Login.toUpperCase() &&
                                    (!parameters.usuario.Lg_Permite_Movimentar_Processos_Outros_Usuarios || !parameters.transferencia.Lg_Permite_Alterar_Processos_Outros_Usuarios)) {
                                    messages.info('Permissão necessária', `Seu Login (${parameters.usuario.Cd_Login.toUpperCase()}) não tem permissão para enviar essa transferência, apenas o Remetente (${transferencia.Remetente.toUpperCase()}) pode realizar o envio`, 5000);
                                    return;
                                }
                            }

                            const dataProdutos = dxComp.gridProdutosTransferencia.getDataSource();
                            let isValid = true;
                            if (dataProdutos.totalCount() == 0) {
                                messages.info("Faltando produtos", "Insira produtos e suas quantidades antes de continuar", 4000);
                                isValid = false;
                            } else if (!dataProdutos.store().__rawData.some(a => a.Quantidade > 0)) {
                                messages.info("Produtos sem quantidade", "Insira as quantidades antes de continuar", 4000);
                                const amount = $('.amount').map((a, b) => '#' + b.id).toArray();
                                animateCSS(amount, 'headShake', 'in', 1000);
                                isValid = false;
                            }
                            if (!dxComp.labelTransferencia.transferenciaAtual.Destinatario) {
                                dxComp.popupTrocarDestinatario.show();
                                messages.info("Faltando destinatário", "Selecione um destinatário antes de continuar", 4000);
                                isValid = false;
                            }
                            if (!isValid)
                                return;

                            const regra = _enumRegraMovimentacaoEstoque.GetByInt(transferencia.RegraMovimentacaoEstoque);

                            const proxEtapa = dataSources.etapas.items
                                .filter(a => a.Status && a.Id != 1)
                                .sort((a, b) => a.Ordem - b.Ordem)
                                .shift();
                            const isConcluida = proxEtapa.Id == _enumSituacaoTransferencia.Concluida && regra == _enumRegraMovimentacaoEstoque.Conclusao;

                            if (regra == _enumRegraMovimentacaoEstoque.Conclusao && !isConcluida) {
                                dxComp.loadPanelTransferencia.exibir("Alterando etapa do processo...");
                                transferencia.EnviarTransferencia((data) => {
                                    dxComp.loadPanelTransferencia.alterarMensagem(`${data.Porcentagem >= 100 ? '100%' : data.Porcentagem + '%'}${data.Mensagem.toLocaleLowerCase() != 'inválido' && data.Mensagem ? ' | ' + data.Mensagem : ''}`);
                                })
                                    .then(async () => {
                                        await LoadTransferenciaAlter(transferencia.IdProcesso);
                                        messages.success('Etapa alterada comsucesso', 'Nova etapa aplicada');
                                    })
                                    .catch((error) => {
                                        messages.error('Erro no processamento', error, 8000);
                                    })
                                    .finally(async () => {
                                        dxComp.loadPanelTransferencia.hide();
                                        dxComp.loadPanelTransferencia.alterarMensagem();
                                    });
                                return;
                            }
                            dxComp.popupExecTransferencia.exibir(dxComp.popupExecTransferencia.tiposProcesso[isConcluida ? "Conclusao" : "Inicio"]);
                        },
                    },
                },
                {
                    location: 'after',
                    locateInMenu: 'auto',
                    widget: 'dxButton',
                    visible: false,
                    name: 'receber',
                    options: {
                        text: 'Receber em Análise',
                        icon: 'fa-solid fa-cogs',
                        type: 'info',
                        onClick: async () => {
                            await parameters.user._get();
                            const transferencia = dxComp.labelTransferencia.getTransferenciaAtual();

                            if (!parameters.usuario.Administrador) {
                                if (!parameters.usuario.Lg_Recebe_Analise_Transferencia) {
                                    messages.info('Permissão necessária', `Seu Login (${parameters.usuario.Cd_Login.toUpperCase()}), não tem permissão para realizar o recebimento de transferências`, 6000);
                                    this.gridConsultaGeral.deselectAll();
                                    return;
                                }
                                if (transferencia.Destinatario.toUpperCase() != parameters.usuario.Cd_Login.toUpperCase() &&
                                    (!parameters.transferencia.Lg_Permite_Alterar_Processos_Outros_Usuarios || !parameters.usuario.Lg_Permite_Movimentar_Processos_Outros_Usuarios)) {
                                    messages.info("Destinatário inválido", `Seu usuário (${parameters.usuario.Cd_Login.toUpperCase()}) não é o destinatário para receber essa transferência, apenas o usuário ${transferencia.Destinatario.toUpperCase()} pode recebê-la`, 4000);
                                    return;
                                }
                            }

                            dxComp.loadPanelTransferencia.show();
                            await Transferencia.ReceberTransferencia(transferencia.IdProcesso)
                                .then(async () => {
                                    messages.success('Transferência recebida', `A transferência ${transferencia.IdProcesso} foi alterada para "Recebida em Análise" com sucesso`);
                                    await LoadTransferenciaAlter(transferencia.IdProcesso);
                                })
                                .catch((error) => {
                                    messages.error('Erro no recebimento', `Não conseguimos receber a transferência ${transferencia.IdProcess}. Segue o erro: ${error}`);
                                })
                                .finally(() => dxComp.loadPanelTransferencia.hide());
                        },
                    },
                },
                {
                    location: 'after',
                    locateInMenu: 'auto',
                    widget: 'dxButton',
                    visible: false,
                    name: 'concluir',
                    options: {
                        text: 'Iniciar Conclusão',
                        icon: icons.concluir,
                        type: 'success',
                        onClick: async () => {
                            const transferencia = dxComp.labelTransferencia.getTransferenciaAtual();
                            await parameters.user._get();
                            if (!parameters.usuario.Administrador) {
                                if (!parameters.usuario.Lg_Conclui_Analise_Transferencia) {
                                    messages.info(
                                        'Permissão necessária',
                                        `Seu Login (${parameters.usuario.Cd_Login.toUpperCase()}), não tem permissão para concluir transferências`,
                                        5000
                                    );
                                    return;
                                }
                                if (transferencia.Destinatario.toUpperCase() != parameters.usuario.Cd_Login.toUpperCase() &&
                                    (!parameters.usuario.Lg_Permite_Movimentar_Processos_Outros_Usuarios || !parameters.transferencia.Lg_Permite_Alterar_Processos_Outros_Usuarios)) {
                                    messages.info(
                                        'Permissão necessária',
                                        `Seu Login (${parameters.usuario.Cd_Login.toUpperCase()}), não tem permissão para concluir esta transferência, apenas o usuário Destinatário (${transferencia.Destinatario.toUpperCase()}).`,
                                        5000
                                    );
                                    return;
                                }
                            }

                            const regra = _enumRegraMovimentacaoEstoque.GetByInt(transferencia.RegraMovimentacaoEstoque);
                            if (regra == _enumRegraMovimentacaoEstoque.Inicio) {

                                if (transferencia.Produtos.some(a => a.Quantidade <= 0)) {
                                    dxComp.popupExecTransferencia.exibir(dxComp.popupExecTransferencia.tiposProcesso.Inicio);
                                    return;
                                }

                                dxComp.loadPanelTransferencia.exibir("Iniciando processo de conclusão...");
                                await transferencia.ConcluirTransferencia((data) => {
                                    dxComp.loadPanelTransferencia.alterarMensagem(`${data.Porcentagem >= 100 ? '100%' : data.Porcentagem + '%'}${data.Mensagem.toLocaleLowerCase() != 'inválido' && data.Mensagem ? ' | ' + data.Mensagem : ''}`);
                                })
                                    .then(async () => {
                                        messages.success('Transferência concluída', `A transferência ${transferencia.IdProcesso} foi concluída com sucesso`);
                                        iniciaCardConsultaGeral();
                                    })
                                    .catch((error) => {
                                        messages.error('Erro na conclusão', `Não conseguimos concluir a transferência ${transferencia.IdProcess}. Segue o erro: ${error}`);
                                    })
                                    .finally(async () => {
                                        dxComp.loadPanelTransferencia.hide();
                                        dxComp.loadPanelTransferencia.alterarMensagem();
                                    });
                                return;
                            }

                            dxComp.popupExecTransferencia.exibir(dxComp.popupExecTransferencia.tiposProcesso.Conclusao);
                        },
                    },
                },
                {
                    locateInMenu: 'always',
                    widget: 'dxButton',
                    name: 'recusar',
                    options: {
                        text: 'Recusar Transferência',
                        icon: icons.recusar,
                        onClick: () => dxComp.popupRecusa.exibe(dxComp.labelTransferencia.transferenciaAtual.IdProcesso),
                    },
                },
                {
                    locateInMenu: 'always',
                    widget: 'dxButton',
                    name: 'cancelar',
                    options: {
                        text: 'Cancelar Transferência',
                        icon: 'close',
                        onClick: () => dxComp.popupCancelamento.exibir(dxComp.labelTransferencia.transferenciaAtual.IdProcesso),
                    },
                },
                {
                    locateInMenu: 'always',
                    widget: 'dxButton',
                    name: 'replicar',
                    options: {
                        text: 'Replicar Transferência',
                        icon: 'unselectall',
                        onClick: () => dxComp.popupReplicarTransferencia.exibir(),
                    },
                },
                {
                    locateInMenu: 'always',
                    widget: 'dxButton',
                    name: 'log',
                    options: {
                        text: 'Log de Transações',
                        icon: 'fa fa-server',
                        onClick: () => {
                            dxComp.popupModalLogTransacoes.exibir(dxComp.labelTransferencia.getTransferenciaAtual().IdProcesso)
                        },
                    },
                },
                {
                    location: 'after',
                    locateInMenu: 'never',
                    widget: 'dxButton',
                    name: 'imprimir',
                    options: {
                        text: 'Imprimir relatório',
                        icon: 'fa-duotone fa-print imprimir',
                        onClick: () => onClickImprimirRelatorio(dxComp.labelTransferencia.getTransferenciaAtual().IdProcesso),
                    },
                },
            ],
            onInitialized: ({ component, element }) => {
                new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting)
                            component.repaint();
                    });
                }).observe(element[0]);
                component.configurar = (enumStatus) => new Promise((resolve) => {
                    if (!Object.values(_enumSituacaoTransferencia).includes(enumStatus)) {
                        console.error(`O valor ${enumStatus} não é válido`);
                        return;
                    }
                    let arrayItensVisible = ['voltar', 'log', 'replicar', 'imprimir'];
                    const getParametersUser = parameters.user._get();

                    const onGetEtapas = (callback) => {
                        const { items } = dataSources.etapas;
                        const execute = {
                            [_enumSituacaoTransferencia.EmElaboracao]() {
                                arrayItensVisible.push('cancelar', 'filtroProdutos', 'observacao');
                                if (items.some(a => a.Id == _enumSituacaoTransferencia.EmSeparacao && a.Status)) {
                                    arrayItensVisible.push('separar');
                                    return;
                                }
                                arrayItensVisible.push('enviar');
                            },
                            [_enumSituacaoTransferencia.EmTransito]() {
                                if (items.some(a => a.Id == _enumSituacaoTransferencia.RecebidaEmAnalise && a.Status)) {
                                    arrayItensVisible.push('receber');
                                    return;
                                }
                                arrayItensVisible.push('concluir');
                            },
                            [_enumSituacaoTransferencia.RecebidaEmAnalise]() {
                                if (items.some(a => a.Id == _enumSituacaoTransferencia.Recusada && a.Status))
                                    arrayItensVisible.push('recusar')
                                arrayItensVisible.push('concluir');
                            },
                            [_enumSituacaoTransferencia.EmSeparacao]() {
                                arrayItensVisible.push('enviar', 'cancelar', 'observacao');
                            },
                        };

                        if (execute[enumStatus])
                            execute[enumStatus]();

                        if (![
                            _enumSituacaoTransferencia.Cancelada,
                            _enumSituacaoTransferencia.Concluida,
                            _enumSituacaoTransferencia.Recusada
                        ].includes(enumStatus))
                            arrayItensVisible.push('observacao');
                        const transferencia = dxComp.labelTransferencia.getTransferenciaAtual();


                        const onGetParametersUser = (callback) => {
                            component.option('items').forEach((a, index, arr) => {
                                a.options.disabled = false;
                                if (a.name == 'observacao') {
                                    a.options.disabled = true;
                                    if (enumStatus == _enumSituacaoTransferencia.EmElaboracao ||
                                        (parameters.administrador || parameters.transferencia.Lg_Permite_Alterar_Observacao))
                                        a.options.disabled = false;
                                }
                                if (a.name == 'filtroProdutos') {
                                    a.options.disabled = true;
                                    if (parameters.administrador || parameters.transferencia.Lg_Permite_Alterar_Filtro_Produto)
                                        a.options.disabled = false;
                                }
                                a.visible = false;
                                if (arrayItensVisible.includes(a.name))
                                    a.visible = true;

                                const arrNomes = [
                                    transferencia.NomeEmissao,
                                    transferencia.NomeConclusao,
                                    transferencia.NomeElaboracao,
                                    transferencia.NomeCancelamento,
                                    transferencia.Remetente,
                                    transferencia.Destinatario
                                ];
                                const nomeIncluido = arrNomes
                                    .filter(b => b)
                                    .map(b => b.toUpperCase())
                                    .includes(parameters.usuario.Cd_Login.toUpperCase());

                                const almoxarifadoDestinoComRestricao = parameters.usuario.restricao.receberSeparar
                                    .includes(transferencia.AlmoxarifadoDestino);

                                if (!parameters.administrador &&
                                    (
                                        (!nomeIncluido &&
                                            !parameters.transferencia.Lg_Permite_Alterar_Processos_Outros_Usuarios) ||
                                        almoxarifadoDestinoComRestricao
                                    ))
                                    a.options.disabled = true;

                                if (['replicar', 'voltar', 'log'].includes(a.name))
                                    a.options.disabled = false;

                                if (index + 1 == arr.length && (callback && typeof callback == 'function'))
                                    callback();
                            })
                        };

                        getParametersUser.then(() => onGetParametersUser(callback));
                    };

                    dataSources.etapas._get
                        .then(() => onGetEtapas(() => {
                            component.repaint();
                            resolve();
                        }))
                })
            },
        })
    }

    dxComp.gridBoxProdutos = new DevExpress.ui.dxDropDownBox('#gridBoxProdutos', {
        valueExpr: 'IdLote',
        displayExpr: (a) => {
            if (['', null, '0'].includes(a.LoteOrigem))
                return a.Id;
            return `${a.Id} (Lt: ${a.LoteOrigem})`;
        },
        labelMode: 'floating',
        label: '',
        placeholder: 'Clique para selecionar produtos',
        showClearButton: true,
        dataSource: new DevExpress.data.CustomStore({
            loadMode: 'raw',
            key: 'IdLote',
            load: async () => {
                await dataSources.getProdutos.promise;
                dxComp.gridBoxProdutos.dataGridSelecaoProdutos.option('disabled', false);
                dxComp.gridBoxProdutos.onlyQuantity.option('value', dataSources.onlyPositive);
                return dataSources.produtos;
            },
            update: (key, eValue) => {
                if (eValue.Quantidade == null) return;
                const data = JSON.parse(JSON.stringify(dxComp.gridBoxProdutos.getDataSource().store().__rawData.find(a => a.IdLote == key)));
                data.Quantidade = eValue.Quantidade;
                const findObj = dataSources.produtosTransferencia.find(a => a.IdLote == key);
                if (findObj == null) {
                    dataSources.produtosTransferencia.push(data);
                    return;
                }
            },
        }),
        contentTemplate: (template) => {
            let $dataGrid;

            template.component.dataGridSelecaoProdutos.option({
                dataSource: template.component.getDataSource(),
                selectedRowKeys: [template.component.option('value')],
            });

            $dataGrid = template.component.dataGridSelecaoProdutos.element();

            template.component.on('valueChanged', args => {
                const { value } = args;
                dxComp.gridBoxProdutos.dataGridSelecaoProdutos.selectRows(value, false);
            });

            return $dataGrid;
        },
        dropDownOptions: {
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
            onShowing: async ({ component }) => {
                component._$wrapper.css('z-index', 997);
                await component.fnPromise;
                component.repaint();
            },
            onOptionChanged: ({ name, value, component }) => {
                if (name != 'visible')
                    return;
                if (!value)
                    return;
                const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - component.$cardGridTransferencia[0].getBoundingClientRect().top;
                component.fnPromise = component.$cardGridTransferencia.animate({ top: diffTop }, {
                    complete: () => component.refreshPosition(),
                }).promise();
            },
            onHiding: ({ component }) => {
                component.$cardGridTransferencia.animate({ top: 0 }, {
                    complete: async () => {
                        const produtosAguardandoAdicionar = dxComp.gridBoxProdutos.option('value');
                        if (produtosAguardandoAdicionar && produtosAguardandoAdicionar.length > 0) {
                            const resposta = await DevExpress.ui.dialog.confirm('<span>Produtos selecionados e não incluídos, deseja adicionar agora?</span>', 'Adicionar produtos');
                            if (resposta)
                                dxComp.buttonAddProdutosDrop._clickAction();
                        }
                    }
                });
            },
            onInitialized: ({ component }) => {
                component.$cardGridTransferencia = $('#cardGridTransferencia');
                dxComp.popupGridProdutos = component
            },
        },
        onOptionChanged: (e) => {
            if (e.name === "disabled") {
                const $elem = $('.textAdd');
                $elem.removeClass('desativado');
                if (e.value)
                    $elem.addClass('desativado');
            }
        },
        onInitialized: (e) => {
            e.component.configuraBySituacao = (status) => {
                if (!_enumSituacaoTransferencia.IsEnum(status))
                    return new Erro(`O valor informado (${status}) não é uma Situação de Transferência`);
                e.component.option('disabled', status != _enumSituacaoTransferencia.EmElaboracao)
            }
            e.component.onEditorPreparingForGrids = (b, saveValue = false) => {
                if (b.parentType != 'dataRow')
                    return;
                switch (b.dataField) {
                    case 'Quantidade':
                        Object.assign(b.editorOptions, {
                            onValueChanged: async (a) => {
                                await parameters._get;
                                if (!parameters.transferencia.Lg_Permite_Transferencia_Estoque_Negativo && a.value > 0 &&
                                    (b.row.data.EstoqueOrigem <= 0 || a.value > b.row.data.EstoqueOrigem)
                                ) {
                                    saveValue = false;
                                    const notify = PNotify.messages.dataGridSelecaoProdutos.quantidadeMenor;
                                    a.value = a.previousValue;
                                    if (!a.component?.usePreviousValue) {
                                        a.component.usePreviousValue = true;
                                        a.component.option('value', b.row.data.EstoqueOrigem <= 0 ? 0 : a.value);
                                    } else {
                                        delete a.component.usePreviousValue;
                                    }
                                    if (['closed', "initializing"].includes(notify.state))
                                        notify.open();
                                }
                                if (['', null, 0].includes(a.value)) {
                                    b.component.deselectRows(b.row.key);
                                    b.setValue(0);
                                    if (a.previousValue == a.value)
                                        return;
                                }

                                let casasDecimais = b.row.data.CasasDecimais;

                                if (!Number.isInteger(b.row.data.EstoqueOrigem)) {
                                    const tamanho = b.row.data.EstoqueOrigem.toString().split('.')[1].length;
                                    if (tamanho > casasDecimais) casasDecimais = tamanho;
                                }

                                b.setValue(Number(a.value.toFixed(casasDecimais)));
                                const keys = await dxComp.gridBoxProdutos.dataGridSelecaoProdutos.getSelectedRowKeys();
                                keys.push(b.row.key);
                                b.component.selectRows(keys);

                                if (saveValue) {
                                    const values = b.row.data;
                                    dxComp.labelTransferencia.transferenciaAtual.UpdateQuantidade(values.Id, values.LoteOrigem, values.Quantidade)
                                        .then(() => {
                                            PNotify.messages.success('Quantidade alterada', `👍 Salvamos a quantidade ${values.Quantidade}\n Produto: ${values.Id}\nLote: ${values.LoteOrigem}`, 1800);
                                        })
                                        .catch((erro) => {
                                            PNotify.messages.error('Erro ao alterar quantidade', `😥 Não conseguimos alterar a quantidade solicitada, segue o erro do servidor: ${erro}`, 1800);
                                            b.component.getDataSource().store().__rawData.find((w) => w.Id == b.row.data.Id && w.LoteOrigem == b.row.data.LoteOrigem).Quantidade = a.previousValue;
                                            b.component.refresh();
                                        });
                                }
                            }
                        });
                        break;
                    case 'EstoqueOrigem', 'EstoqueDestino':
                        b.setValue(Number(a.value.toFixed(b.row.data.CasasDecimais)));
                        break;
                }
            }
            e.component.dataGridSelecaoProdutos = new DevExpress.ui.dxDataGrid($('<div>'), {
                elementAttr: {
                    id: "dataGridSelecaoProdutos",
                    class: "removeColumnsFilterHidden",
                },
                searchExpr: ['Id', 'Nome'],
                displayExpr: 'Nome',
                valueExpr: 'IdLote',
                wordWrapEnabled: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                sorting: {
                    mode: "multiple",
                },
                editing: {
                    mode: 'batch',
                    allowUpdating: true,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: false,
                    useIcons: false,
                },
                loadPanel: { enabled: true, },
                sorting: { mode: "multiple" },
                allowColumnResizing: true,
                allowColumnReordering: true,
                groupPanel: {
                    visible: true,
                    emptyPanelText: "Agrupamento",
                },
                selection: {
                    mode: 'multiple',
                    showCheckBoxesMode: 'always',
                    allowSelectAll: false,
                },
                keyboardNavigation: {
                    enterKeyAction: 'moveFocus',
                    enterKeyDirection: 'column',
                    editOnKeyPress: true,
                },
                focusedRowEnabled: false,
                hoverStateEnabled: true,
                paging: { pageSize: 25, enabled: false },
                filterRow: { visible: true, applyFilter: "auto" },
                headerFilter: {
                    visible: true,
                    allowSearch: true
                },
                filterPanel: { visible: true },
                columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                columnsAutoWidth: true,
                cellHintEnabled: true,
                showBorders: true,
                scrolling: {
                    mode: 'virtual',
                    columnRenderingMode: 'virtual',
                },
                height: '100%',
                disabled: true,
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                columns: [
                    {
                        type: "selection",
                        width: 30,
                        fixed: true,
                        fixedPosition: "left"
                    },
                    {
                        dataField: "Id",
                        caption: "Código Interno",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        fixed: true,
                        fixedPosition: "left"
                    },
                    {
                        dataField: "IsForaLinhaText",
                        caption: "Fora Linha",
                        width: 40,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: true,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Nome",
                        caption: "Descrição Produto",
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        cssClass: "column-data-grid",
                        sortIndex: 0,
                        sortOrder: "asc",
                        minWidth: 140,
                    },
                    {
                        dataField: "IdFabricante",
                        caption: "Código Fabricante",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "StatusText",
                        caption: "Status",
                        width: 70,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        alignment: 'center',
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Ean",
                        caption: "EAN",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "IdOriginal",
                        caption: "Código Original",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "IdOpcional",
                        caption: "Código Opcional",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PesoUnitarioVenda",
                        caption: 'Peso Unitário',
                        width: 60,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        dataType: 'number',
                        alignment: 'center',
                        cssClass: "column-data-grid-bold",
                    },
                    {
                        dataField: "Cest",
                        caption: "CEST",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "IdProdutoEcommerce",
                        caption: "Código e-Commerce",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "NomeMarca",
                        caption: "Marca",
                        width: 80,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "FornecedorId",
                        caption: "Código Fornec.",
                        width: 90,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        alignment: 'center',
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "FornecedorRazao",
                        caption: "Fornecedor Padrão (Razão Social)",
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: true,
                        cssClass: "column-data-grid",
                        minWidth: 140,
                    },
                    {
                        dataField: "FornecedorFantasia",
                        caption: "Fornecedor Padrão (Fantasia)",
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        visible: false,
                        cssClass: "column-data-grid",
                        minWidth: 140,
                    },
                    {
                        dataField: "CurvaAbc",
                        caption: "A B C",
                        width: 55,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "NomeFamilia",
                        caption: "Família",
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Aplicacao",
                        caption: "Aplicação",
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        cssClass: "column-data-grid",
                        minWidth: 140,
                    },
                    {
                        dataField: "IsKitText",
                        caption: "Produto Produzido",
                        width: 100,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "IsMovimentoEstoqueProducaoKitText",
                        caption: "Apontamento Produção",
                        width: 100,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "IsEncomendaText",
                        caption: "Encomenda",
                        width: 100,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "IsProdutoTintometricoText",
                        caption: "Produto Tintométrico",
                        width: 100,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "LoteOrigem",
                        caption: "L o t e",
                        width: 55,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "UnidadeMedidaVenda",
                        caption: "U N",
                        width: 53,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CasasDecimais",
                        caption: "Quant. Casas Decimais",
                        width: 53,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "EstoqueOrigem",
                        caption: `Estoque Origem\nAlm ${dxComp.filtroAlmoxarifados.origem == null ? "" : dxComp.filtroAlmoxarifados.origem.option().value}`,
                        width: 60,
                        allowEditing: false,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: true,
                        dataType: 'number',
                        //format: "###,###,###,###,##0.#####",
                        alignment: 'center',
                        cssClass: "column-data-grid-bold",
                    },
                    {
                        dataField: "EstoqueDestino",
                        caption: `Estoque Destino\nAlm ${dxComp.filtroAlmoxarifados.destino == null ? "" : dxComp.filtroAlmoxarifados.destino.option().value}`,
                        width: 60,
                        allowEditing: false,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: true,
                        dataType: 'number',
                        //format: "###,###,###,###,##0.#####",
                        alignment: 'center',
                        cssClass: "column-data-grid-bold",
                    },
                    {
                        dataField: "Quantidade",
                        caption: "Qtde. Transferência",
                        width: 75,
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: true,
                        dataType: 'number',
                        editorOptions: {
                            min: 0,
                        },
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        fixed: true,
                        fixedPosition: "right",
                    },
                ],
                summary: {//TODO: inserir quantidade produtos selecionados
                    totalItems: [
                        {
                            column: 'Id',
                            summaryType: 'count',
                            displayFormat: "{0} Produtos",
                        },
                    ],
                },
                stateStoring: AutoLoad('dataGridSelecaoProdutos', false),
                toolbar: AutoResetStateForToolbar('dataGridSelecaoProdutos', [
                    {
                        location: 'after',
                        widget: 'dxSelectBox',
                        locateInMenu: 'auto',
                        options: {
                            width: 170,
                            keyExpr: 'id',
                            valueExpr: 'id',
                            displayExpr: 'text',
                            value: dataSources.onlyPositive,
                            items: [
                                { id: true, text: 'Apenas positivos' },
                                { id: false, text: 'Positivos e negativos' },
                            ],
                            buttons: [
                                {
                                    location: 'after',
                                    name: 'refresh',
                                    options: {
                                        icon: 'fa-solid fa-refresh',
                                        onClick: async (a) => {
                                            if (e.component.onlyQuantity.option().value == dataSources.onlyPositive) return;
                                            const onlyPositive = e.component.onlyQuantity.option().value;
                                            const $icon = a.element.find('i');
                                            $icon.removeClass('fa-beat-custom').addClass('fa-spin-custom');
                                            e.component.dataGridSelecaoProdutos.option('disabled', true);
                                            dataSources.onlyPositive = onlyPositive;
                                            await e.component.dataGridSelecaoProdutos.reloadDataSource(dxComp.labelTransferencia.transferenciaAtual.AlmoxarifadoOrigem,
                                                dxComp.labelTransferencia.transferenciaAtual.AlmoxarifadoDestino,
                                                onlyPositive);
                                            $icon.removeClass('fa-spin-custom');
                                            e.component.dataGridSelecaoProdutos.option('disabled', false);
                                        },
                                        onInitialized: a => e.component.onlyQuantity.refresh = a.component,
                                    }
                                },
                                'dropDown',
                            ],
                            onValueChanged: a => {
                                const $icon = e.component.onlyQuantity.refresh.element().find('i');
                                if (a.value == dataSources.onlyPositive) {
                                    $icon.removeClass('fa-beat-custom');
                                    return;
                                };
                                $icon.addClass('fa-beat-custom');
                            },
                            onInitialized: a => e.component.onlyQuantity = a.component,
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            hint: "Adicionar produtos selecionados",
                            text: 'Adicionar produtos',
                            icon: 'plus',
                            onClick: () => {
                                dxComp.loadPanelTransferencia.show();
                                const dataBefore = dxComp.gridProdutosTransferencia.getDataSource().store().__rawData;
                                const countBefore = dataBefore.length;
                                e.component.dataGridSelecaoProdutos.saveEditData().then(async () => {
                                    const dataProdutos = dxComp.gridProdutosTransferencia.getDataSource().store().__rawData;
                                    const allSelectedRows = await e.component.dataGridSelecaoProdutos.getSelectedRowsData();
                                    const selectedWithValue = dataProdutos.map(a => a.IdLote);
                                    const selectedNoValue = allSelectedRows.filter(a => !selectedWithValue.some(b => b == a.IdLote));
                                    dataProdutos.push(...selectedNoValue);
                                    const after = dxComp.labelTransferencia.transferenciaAtual;
                                    const newProdutos = dataProdutos.map(produto => {
                                        const produtoTransferencia = new ProdutoTransferencia();
                                        produtoTransferencia.Processo = after.IdProcesso;
                                        produtoTransferencia.IdProduto = produto.Id;
                                        produtoTransferencia.Lote = produto.LoteOrigem;
                                        produtoTransferencia.Quantidade = produto.Quantidade;
                                        return produtoTransferencia;
                                    })
                                    after.AddProduto(newProdutos, true);
                                    const msgOut = {};
                                    after.CreateProdutos()
                                        .then((result) => {
                                            if (countBefore < selectedWithValue.length + selectedNoValue.length) {
                                                const quantidade = Math.abs(countBefore - (selectedWithValue.length + selectedNoValue.length));
                                                msgOut.title = "Novos produtos";
                                                msgOut.text = `${quantidade} Produto${quantidade > 1 ? 's' : ''} adicionado${quantidade > 1 ? 's' : ''} no grid`;
                                                msgOut.notify = PNotify.messages.success;
                                            }
                                            const produtosGeral = result.map(a => a.ProdutoGeral);
                                            dataSources.produtosTransferencia = produtosGeral;
                                            dxComp.gridProdutosTransferencia.refresh();
                                            const productsResult = result.map(a => new ProdutoTransferencia(a));
                                            dxComp.labelTransferencia.transferenciaAtual.AddProduto(productsResult, true);
                                        })
                                        .catch((error) => {
                                            msgOut.title = 'Falha ao adicionar';
                                            msgOut.text = 'Não foi possível adicionar os produtos no grid';
                                            msgOut.notify = PNotify.messages.error;
                                            dataProdutos = dataBefore;
                                        })
                                        .finally(() => {
                                            dxComp.gridProdutosTransferencia.getDataSource().reload().then(() => {
                                                e.component.option('value', null);
                                                e.component._popup.hide();
                                                msgOut.notify(msgOut.title, msgOut.text, 1800);
                                            });
                                            dxComp.loadPanelTransferencia.hide();
                                        });
                                });
                            },
                            onInitialized: a => dxComp.buttonAddProdutosDrop = a.component,
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        locateInMenu: 'auto',
                        options: {
                            hint: "Marcar todos os produtos",
                            text: "Marcar tudo",
                            icon: "fa fa-list-ul",
                            onClick: () => {
                                //const keys = e.component.dataGridSelecaoProdutos.getDataSource().store().__rawData.filter(a => a.EstoqueOrigem > 0).map(a => a.IdLote);
                                //e.component.dataGridSelecaoProdutos.selectRows(keys);
                                dxComp.gridBoxProdutos.dataGridSelecaoProdutos.selectAll();
                            },
                        },
                    },
                    'groupPanel',
                    'columnChooserButton',
                    'exportButton',
                    'searchPanel',
                ]),
                onInitialized: (e) => {
                    e.component.reloadDataSource = (origem = dxComp.labelTransferencia.transferenciaAtual.AlmoxarifadoOrigem, destino = dxComp.labelTransferencia.transferenciaAtual.AlmoxarifadoDestino, onlyPositive = true) => {
                        return new Promise(async (resolve) => {

                            dxComp.filtroAlmoxarifados.origem.option('value', origem);
                            dxComp.filtroAlmoxarifados.destino.option('value', destino);
                            dataSources.getProdutos(origem, destino, onlyPositive, dxComp.labelTransferencia.transferenciaAtual.FiltroProdutosString);

                            await dataSources.getProdutos.promise.then(() => {
                                e.component.refresh().then(() => resolve());
                            });
                        });
                    };
                },
                onCellPrepared: a => {
                    if (a.rowType === "data") {
                        switch (a.column.dataField) {
                            case "IsForaLinhaText":
                                a.cellElement.css("background-color", a.data.DS_COLOR_FORA_LINHA);
                                a.cellElement.css("color", "white");
                                break;
                            case "StatusText":
                                if (a.data.Status) return;
                                a.cellElement.css("color", "#d00000");
                                a.cellElement.css("font-weight", "bold");
                                break;
                            case "Quantidade":
                                a.cellElement.css("background-color", "#EDF3F8");
                                break;
                            case "EstoqueOrigem":
                                if (a.data.EstoqueOrigem < 0)
                                    a.cellElement.css("color", "#d00000");
                                break;
                            case "EstoqueDestino":
                                if (a.data.EstoqueDestino < 0)
                                    a.cellElement.css("color", "#d00000");
                                break;
                        }
                    }
                },
                onSelectionChanged({ selectedRowKeys }) {
                    e.component.option('value', selectedRowKeys);
                },
                onEditorPreparing: e.component.onEditorPreparingForGrids,
                onExporting: (e) => {
                    const workbook = new ExcelJS.Workbook();
                    const worksheet = workbook.addWorksheet('Transferências');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(() => workbook.xlsx.writeBuffer().then(buffer => saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Produtos para transferência.xlsx')));
                    e.cancel = true;
                },
            });
        },
        configuraBySituacao: function (status) {
            if (!_enumSituacaoTransferencia.IsEnum(status))
                return new Erro(`O valor informado (${status}) não é uma Situação de Transferência`);
            this.disabled = !status == _enumSituacaoTransferencia.EmElaboracao;
        },
    });

    dxComp.gridProdutosTransferencia = new DevExpress.ui.dxDataGrid("#gridProdutosTransferencia", {
        dataSource: new DevExpress.data.DataSource({
            loadMode: 'raw',
            key: 'IdLote',
            load: async () => {
                await dxComp.labelTransferencia.transferenciaAtual.GetTransferencia.promise;
                if (!dataSources.produtosTransferencia)
                    dataSources.produtosTransferencia = Array();
                return dataSources.produtosTransferencia;
            },
            update: (key, value) => {
                dataSources.produtosTransferencia.find(c => c.IdLote == key).Quantidade = value.Quantidade;
                dxComp.gridProdutosTransferencia.deselectAll();
            },
            remove: async (a) => {
                const prodRemove = dataSources.produtosTransferencia.find(b => b.IdLote == a);
                await dxComp.labelTransferencia.transferenciaAtual.DeleteProduto([prodRemove])
                    .then(() => {
                        messages.success("Produto excluído", "Produto excluído com sucesso");
                        dataSources.produtosTransferencia = dataSources.produtosTransferencia.filter(b => b.IdLote != a);
                    })
                    .catch((erro) => {
                        messages.error("Erro na exclusão", `Erro ao tentar excluir o produto: ${erro}`)
                        dxComp.gridProdutosTransferencia.refresh()
                    });
            },
        }),
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
        sorting: { mode: "multiple" },
        selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
        },
        allowColumnResizing: true,
        allowColumnReordering: true,
        columnFixing: {
            enabled: true,
        },
        groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
        paging: { pageSize: 15 },
        pager: {
            visible: true,
            allowedPageSizes: [15, 20, 50, 100],
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
        columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
        columnsAutoWidth: true,
        showBorders: true,
        columns: [
            {
                type: "selection",
                minWidth: 28,
                fixed: true,
            },
            {
                dataField: "Id",
                caption: "Código Interno",
                minWidth: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFixing: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                fixed: true,
            },
            {
                dataField: "IsForaLinhaText",
                caption: "Fora Linha",
                minWidth: 70,
                allowEditing: false,
                allowSorting: true,
                alignment: 'center',
                allowHeaderFiltering: true,
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "Nome",
                caption: "Descrição Produto",
                minWidth: 200,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                cssClass: "column-data-grid",
            },
            {
                dataField: "IdFabricante",
                caption: "Código Fabricante",
                minWidth: 93,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "StatusText",
                caption: "Status",
                minWidth: 76,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                alignment: 'center',
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "Ean",
                caption: "EAN",
                minWidth: 94,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "IdOriginal",
                caption: "Código Original",
                minWidth: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "IdOpcional",
                caption: "Código Opcional",
                minWidth: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "PesoUnitarioVenda",
                caption: 'Peso Unitário',
                width: 60,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                dataType: 'number',
                alignment: 'center',
                cssClass: "column-data-grid-bold",
            },
            {
                dataField: "PesoUnitarioVendaTotal",
                caption: 'Peso Unitário Total',
                calculateCellValue: (rowData) => {
                    return rowData.PesoUnitarioVenda * rowData.Quantidade ?? 0;
                },
                width: 60,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                dataType: 'number',
                alignment: 'center',
                cssClass: "column-data-grid-bold",
            },
            {
                dataField: "Cest",
                caption: "CEST",
                minWidth: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "IdProdutoEcommerce",
                caption: "Código e-Commerce",
                minWidth: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "NomeMarca",
                caption: "Marca",
                minWidth: 80,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "FornecedorId",
                caption: "Código Fornec.",
                minWidth: 96,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                alignment: 'center',
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "FornecedorRazao",
                caption: "Fornecedor Padrão (Razão Social)",
                minWidth: 200,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: true,
                cssClass: "column-data-grid",
            },
            {
                dataField: "FornecedorFantasia",
                caption: "Fornecedor Padrão (Fantasia)",
                minWidth: 200,
                allowEditing: false,
                allowHeaderFiltering: true,
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "CurvaAbc",
                caption: `A\nB\nC`,
                minWidth: 55,
                maxWidth: 56,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "NomeFamilia",
                caption: "Família",
                minWidth: 113,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "Aplicacao",
                caption: "Aplicação",
                minWidth: 200,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "IsKitText",
                caption: "Produto Produzido",
                minWidth: 90,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "IsMovimentoEstoqueProducaoKitText",
                caption: "Apontamento Produção",
                minWidth: 106,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "IsEncomendaText",
                caption: "Encomenda",
                minWidth: 98,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "IsProdutoTintometricoText",
                caption: "Produto Tintométrico",
                minWidth: 101,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "LoteOrigem",
                caption: "Lote",
                minWidth: 91,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "UnidadeMedidaVenda",
                caption: `U\nN`,
                minWidth: 53,
                width: 53,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "EstoqueOrigem",
                caption: 'Estoque Origem',
                minWidth: 60,
                allowEditing: false,
                allowHeaderFiltering: false,
                allowSorting: true,
                visible: true,
                dataType: 'number',
                alignment: 'center',
                cssClass: "column-data-grid-bold",
            },
            {
                dataField: "EstoqueDestino",
                caption: 'Estoque Destino',
                minWidth: 60,
                allowEditing: false,
                allowHeaderFiltering: false,
                allowSorting: true,
                visible: true,
                dataType: 'number',
                alignment: 'center',
                cssClass: "column-data-grid-bold",
            },
            {
                dataField: "Quantidade",
                caption: "Qtde. Transferência",
                width: 75,
                allowEditing: true,
                allowHeaderFiltering: false,
                allowSorting: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
                fixed: true,
                fixedPosition: "right",
                dataType: 'number',
                editorOptions: {
                    min: 0,
                }
            },
            {
                type: "buttons",
                width: 30,
                fixed: true,
            },
        ],
        summary: {
            totalItems: [
                {
                    column: 'Id',
                    summaryType: 'count',
                    displayFormat: "{0} Produtos",
                },
                {
                    column: 'PesoUnitarioVendaTotal',
                    summaryType: 'sum',
                    displayFormat: "{0} Kg",
                },
            ],
        },
        stateStoring: AutoLoad('gridProdutosTransferencia', false),
        onContentReady: async (e) => {
            await dxComp.loadAlmoxOrigem;
            await dxComp.filtroAlmoxarifados.promise;
            dxComp.filtroAlmoxarifados.origem.option('onInitialized', function () {
                if (dxComp.filtroAlmoxarifados.origem.option().value == null) return;
                e.component.columnOption(e.component.option('columns').findIndex(a => a.dataField == "EstoqueOrigem"), 'caption', `Estoque Origem\nAlm ${dxComp.filtroAlmoxarifados.origem.option().value}`);
                e.component.columnOption(e.component.option('columns').findIndex(a => a.dataField == "EstoqueDestino"), 'caption', `Estoque Destino\nAlm ${dxComp.filtroAlmoxarifados.destino.option().value}`);
            });
        },
        onExporting: (e) => {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Produtos');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Produtos_Transferencia.xlsx');
                });
            });
            e.cancel = true;
        },
        onCellPrepared: (e) => {
            if (e.rowType === "data") {
                if (e.column.dataField === "EstoqueOrigem" && e.data.EstoqueOrigem < 0)
                    e.cellElement.css("color", "#d00000");

                if (e.column.dataField === "EstoqueDestino" && e.data.EstoqueDestino < 0)
                    e.cellElement.css("color", "#d00000");

                if (e.column.dataField === "IsForaLinhaText") {
                    e.cellElement.css("background-color", e.data.DS_COLOR_FORA_LINHA);
                    e.cellElement.css("color", "white");
                }
                if (e.column.dataField === "DS_STATUS") {
                    if (e.value === "Inativo") {
                        e.cellElement.css("color", "#d00000");
                        e.cellElement.css("font-weight", "bold");
                    };
                }
                if (e.column.dataField === "Quantidade") {
                    e.cellElement.css("background-color", "#EDF3F8");
                    if (!e.cellElement.hasClass("dx-hidden-cell")) {
                        e.cellElement.attr('id', 'A' + Math.random().toString().replace('.', ''));
                        e.cellElement.addClass('amount');
                    }
                }
            }
        },
        onEditorPreparing(e) {
            return dxComp.gridBoxProdutos.onEditorPreparingForGrids(e, true)
        },
        onInitialized: function (e) {
            this.boolBtnLimpar = false;
            this.boolBtnExcluir = false;

            this.option({
                toolbar: AutoResetStateForToolbar('gridProdutosTransferencia', [
                    {
                        locateInMenu: "auto",
                        location: 'after',
                        widget: 'dxButton',
                        name: 'limpar',
                        options: {
                            hint: "Limpar as quantidades dos produtos selecionados",
                            text: 'Limpar Quantidades Selecionadas',
                            icon: 'fa-solid fa-eraser mr-2',
                            disabled: this.boolBtnLimpar,
                            elementAttr: { id: "limpar", },
                            onClick: async () => {
                                dxComp.loadPanelTransferencia.show();
                                const gridProdutosTransferencia = dxComp.gridProdutosTransferencia;
                                const keys = gridProdutosTransferencia.getSelectedRowKeys();
                                let data = gridProdutosTransferencia.getDataSource().store().__rawData;
                                const produtosZerar = data
                                    .filter((a) => keys.includes(a.IdLote))
                                    .map((a) => Object({
                                        Id: a.Id,
                                        Lote: a.LoteOrigem,
                                    }));
                                await dxComp.labelTransferencia.transferenciaAtual.ZerarQuantidades(produtosZerar)
                                    .then(() => {
                                        messages.success("Limpeza de quantidades", "Produtos zerados com sucesso");
                                        dataSources.produtosTransferencia = data.map(a => {
                                            if (keys.includes(a.IdLote)) a.Quantidade = 0;
                                            return a;
                                        });
                                        gridProdutosTransferencia.refresh();
                                        gridProdutosTransferencia.deselectAll();
                                    })
                                    .catch((erro) => {
                                        messages.error("Erro na limpeza de quantidade", `Ao tentar realizar o zeramento das quantidades, o seguinte erro foi retornado: ${erro}`);
                                    })
                                    .finally(() => dxComp.loadPanelTransferencia.hide());

                            },
                            onInitialized: (e) => e.component.option('disabled', this.boolBtnLimpar),
                        },
                    },
                    {
                        locateInMenu: "auto",
                        location: 'after',
                        widget: 'dxButton',
                        name: 'excluir',
                        options: {
                            hint: "Excluir da lista de transferência os produtos selecionados",
                            text: 'Excluir Produtos Selecionados',
                            icon: 'fa-solid fa-trash-can mr-2',
                            disabled: this.boolBtnExcluir,
                            elementAttr: { id: "excluir", },
                            onClick: async () => {
                                dxComp.loadPanelTransferencia.show();
                                const gridProdutosTransferencia = dxComp.gridProdutosTransferencia;
                                const selectData = gridProdutosTransferencia.getSelectedRowsData();
                                const produtosDelete = selectData.map((a) => Object({
                                    Id: a.Id,
                                    Lote: a.LoteOrigem,
                                }))
                                await dxComp.labelTransferencia.transferenciaAtual.DeleteProduto(produtosDelete)
                                    .then(() => {
                                        messages.success("Exclusão de produtos", "Produtos excluídos com sucesso");
                                        const keys = selectData.map(a => a.IdLote);
                                        let data = gridProdutosTransferencia.getDataSource().store().__rawData;
                                        dataSources.produtosTransferencia = data.filter(a => !keys.includes(a.IdLote));
                                        gridProdutosTransferencia.refresh();
                                        gridProdutosTransferencia.deselectAll();
                                    })
                                    .catch((erro) => {
                                        messages.error("Erro na exclusão", `Erro ao tentar excluir os produtos selecionados: ${erro}`)
                                    })
                                    .finally(() => dxComp.loadPanelTransferencia.hide());
                            },
                            onInitialized: (e) => e.component.option('disabled', this.boolBtnExcluir),
                        },
                    },
                    'groupPanel',
                    'columnChooserButton',
                    'exportButton',
                    'searchPanel',
                    {
                        locateInMenu: "always",
                        location: "after",
                        widget: 'dxButton',
                        name: 'estoqueOrigem',
                        disabled: this.boolBtnExcluir,
                        showText: "inMenu",
                        options: {
                            hint: "Utilizar estoque de origem para os itens selecionados",
                            text: "Auto-Preenchimento de quantidade",
                            icon: 'fa-solid fa-pen',
                            onClick: async () => {
                                const gridProdutosTransferencia = dxComp.gridProdutosTransferencia;
                                const selectData = gridProdutosTransferencia.getSelectedRowsData();

                                if (selectData.length == 0) {
                                    messages.info("Seleção de produtos", "Selecione algum produto para usar o estoque de origem")
                                    return;
                                }

                                dxComp.loadPanelTransferencia.show();

                                const produtos = selectData.map((a) => Object({
                                    Produto: a.Id,
                                    Lote: a.LoteOrigem,
                                }))
                                const { IdProcesso } = dxComp.labelTransferencia.transferenciaAtual

                                await Transferencia.PreencherQuantidadesPorAlmoxOrigem(IdProcesso, produtos)
                                    .then((res) => messages.info(
                                        "Preenchimento de quantidade",
                                        "Quantidades atiualizadas com sucesso"))
                                    .catch((error) => messages.error(
                                        "Preenchimento de quantidade",
                                        `Erro ao preencher quantidades: ${error}`
                                    ));
                                await LoadTransferenciaAlter(IdProcesso);

                                dxComp.loadPanelTransferencia.hide();
                            },
                            onInitialized: (e) => e.component.option('disabled', this.boolBtnExcluir),
                        },
                    },
                ]),
            });

            this.updateEditing = (situacao) => {
                if (!situacao) return;
                const option = [_enumSituacaoTransferencia.EmElaboracao, _enumSituacaoTransferencia.EmSeparacao].includes(situacao);
                this.option({
                    editing: {
                        allowDeleting: option && situacao == _enumSituacaoTransferencia.EmElaboracao,
                        allowUpdating: option,
                    }
                })
            };

            this.updateButtonsBySituacao = (situacao) => {
                if (!situacao) return;
                const option = situacao !== _enumSituacaoTransferencia.EmElaboracao;
                this.boolBtnLimpar = option && situacao !== _enumSituacaoTransferencia.EmSeparacao;
                this.boolBtnExcluir = option;
            };

            this.adicionaProdutos = async (processo) => {
                if (!processo.Produtos) return;

                produtos = isArray(processo.Produtos) ? processo.Produtos : [processo.Produtos];
                dataSources.produtosTransferencia = [];

                if (produtos.length < 1) {
                    await this.getDataSource().reload();
                    return;
                }

                new Promise((resolve) => {
                    produtos.forEach((produto, index) => {
                        produto.ProdutoGeral.Quantidade = produto.Quantidade;
                        produto.ProdutoGeral.IsEstornado = produto.IsEstornado;
                        produto.ProdutoGeral.IsTransferido = produto.IsTransferido;
                        produto.ProdutoGeral.LoteOrigem = produto.Lote;
                        dataSources.produtosTransferencia.push(produto.ProdutoGeral);
                        if (index == produtos.length - 1) resolve();
                    });
                }).then(async () => await this.getDataSource().reload());

            };

            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) e.component.updateDimensions();
                });
            }).observe(e.element[0]);
        },
        onExporting: (e) => {
            const dataGrid = e.component;
            const colunasVisiveis = dataGrid.getVisibleColumns().filter(a => a.type == undefined);
            const transferencia = dxComp.labelTransferencia.getTransferenciaAtual();

            //IDENTIFICA A QUANTIDADE DE COLUNAS AGRUPADAS DO GRID PARA UTILIZAR NO MERGE DOS TÍTULOS
            let colCount = 0;
            for (let i = 0; i < dataGrid.columnCount(); i++) {
                if (dataGrid.columnOption(i, "groupIndex") >= 0) {
                    colCount++;
                }
            }
            let quantidadeColunasAgrupadas = colCount;
            let quantidadeColunasVisiveis = colunasVisiveis.length - quantidadeColunasAgrupadas;
            let tituloAgrupamento = null;

            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Produtos');

            // Set page orientation to landscape
            worksheet.pageSetup.orientation = 'landscape';

            // Configurar ajuste de escala manualmente
            //worksheet.pageSetup.fitToPage = true;
            //worksheet.pageSetup.fitToHeight = 0; // Altura da página
            worksheet.pageSetup.fitToWidth = 1; // Largura da página
            worksheet.pageSetup.scale = 67;

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet,
                topLeftCell: { row: 4, column: 1 },
                autoFilterEnabled: true,
                customizeCell: async (options) => {
                    const { gridCell } = options;
                    const { excelCell } = options;

                    //VERIFICA SE EXISTE AGRUPAMENTO NO GRID PARA DAR UM MERGE NAS COLUNAS
                    if (gridCell.rowType === 'group') {

                        try {
                            worksheet.mergeCells(excelCell.row, 1, excelCell.row, quantidadeColunasVisiveis);
                        } catch {
                        }

                        if (gridCell.value !== undefined && gridCell.value !== null) {
                            tituloAgrupamento = gridCell.value;
                        }
                    }

                    //SET OS VALORES DOS TÍTULOS DOS AGRUPAMENTOS APÓS O MERGE DAS COLUNAS
                    if (gridCell.rowType === 'group') {
                        const groupRowTitulo = worksheet.getRow(excelCell.row);

                        groupRowTitulo.getCell(1).value = tituloAgrupamento;
                    }
                },
            }).then(async (cellRange) => {

                //Logotipo
                const headerRowLogo = worksheet.getRow(1);

                let imagePath = `/img/logos/RSLogo_${parameters.transferencia.Cd_Empresa}.gif`;

                const base64Image = await convertImageToBase64(imagePath + '?v=' + new Date())
                    .then((result) => result)
                    .catch(async () => {
                        imagePath = '/img/logos/RSLogo_7.gif';
                        return await convertImageToBase64(imagePath + '?v=' + new Date());
                    });

                //VERIFICA SE A IMAGEM FOI ENCONTRADA
                if (base64Image.length > 25) {
                    const image = workbook.addImage({
                        base64: base64Image,
                        extension: 'gif',
                    });

                    // Get image dimensions
                    const img = new Image();
                    img.src = base64Image;
                    await img.decode();
                    const imgWidth = img.width;
                    const imgHeight = img.height;

                    // Calculate dimensions to fit the image within a specific cell range
                    const maxWidth = 200; // maximum width in pixels
                    const maxHeight = 60; // maximum height in pixels
                    const scaleFactor = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
                    const width = imgWidth * scaleFactor;
                    const height = imgHeight * scaleFactor;

                    headerRowLogo.height = 50;
                    worksheet.mergeCells(1, 1, 2, 2);

                    worksheet.addImage(image, {
                        //tl: { col: 0, row: 0 },
                        //br: { col: 2, row: 1 },

                        tl: { col: 0, row: 0 },
                        ext: { width: width, height: height }
                    });
                }

                //Título
                const headerRowTitulo = worksheet.getRow(1);
                headerRowTitulo.height = 30;
                worksheet.mergeCells(1, 3, 1, quantidadeColunasVisiveis);


                headerRowTitulo.getCell(3).value = `Relatório da Transferência Nº. ${transferencia.IdProcesso}`;
                headerRowTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 22 };
                headerRowTitulo.getCell(3).alignment = { horizontal: 'center' };

                //Subtítulo
                const headerRowSubTitulo = worksheet.getRow(2);
                headerRowSubTitulo.height = 17;
                worksheet.mergeCells(2, 3, 2, quantidadeColunasVisiveis);

                headerRowSubTitulo.getCell(3).value = `Processo: ${transferencia.IdProcesso} / Remetente: ${transferencia.Remetente} / Destinatário: ${transferencia.Destinatario} / Alm. Origem: ${transferencia.AlmoxarifadoOrigem} / Alm. Destino: ${transferencia.AlmoxarifadoDestino} / Status: ${transferencia.StatusTransferencia} - ${_enumSituacaoTransferencia.GetName(transferencia.StatusTransferencia)}`;
                headerRowSubTitulo.getCell(3).font = { name: 'Segoe UI Light', size: 12 };
                headerRowSubTitulo.getCell(3).alignment = { horizontal: 'center' };

            }).then(() => {
                workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `RelTransferência_${transferencia.IdProcesso}.xlsx`);
                });
            });
            e.cancel = true;
        },
    });

    const gridConsultaOptions = {
        elementAttr: { class: "removeColumnsFilterHidden", },
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        columnHidingEnabled: false, //Obs: reticências https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/GridColumnsHidingPriority/jQuery/Light/
        searchPanel: {
            visible: true,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
        },
        sorting: { mode: "multiple" },
        selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
        },
        columnResizingMode: "widget",
        allowColumnReordering: true,
        groupPanel: { visible: true, emptyPanelText: "Agrupamento" },
        paging: { pageSize: 15 },
        pager: {
            visible: true,
            allowedPageSizes: [15, 20, 50, 100],
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
        summary: {
            totalItems: [
                {
                    column: 'IdProcesso',
                    summaryType: 'count',
                    displayFormat: "{0} transf.",
                },
            ],
        },
        columns: [
            {
                type: "selection",
                width: 30,
            },
            {
                dataField: "IdProcesso",
                caption: "Processo",
                minWidth: 70,
                width: 70,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Color",
                caption: "",
                width: 7,
                allowEditing: false,
                allowSorting: false,
                allowHeaderFiltering: false,
                allowFiltering: false,
                cellTemplate: () => { },
            },
            {
                dataField: "TextStatusTransferencia",
                caption: "Situação",
                minWidth: 102,
                width: 102,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                cssClass: "column-data-grid",
                alignment: 'center',
                cellTemplate: (elem, columnOption) => {
                    let $mustache = { color: _enumSituacaoTransferencia.GetColor(columnOption.data.StatusTransferencia) };

                    const statusObj = _enumSituacaoTransferencia.GetIconAndText(columnOption.data.StatusTransferencia);

                    Object.assign($mustache, statusObj);

                    elem.append(mustache.render($('#gridSituacao').html(), $mustache));
                },
            },
            {
                caption: "Almoxarifado",
                alignment: 'center',
                cssClass: "column-data-grid",
                columns: [
                    {
                        dataField: "AlmoxarifadoOrigem",
                        caption: "Origem",
                        minWidth: 74,
                        width: 74,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "AlmoxarifadoDestino",
                        caption: "Destino",
                        minWidth: 74,
                        width: 74,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                ],
            },
            {
                dataField: "NomeElaboracao",
                caption: "Login Criação",
                minWidth: 87,
                width: 87,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "DataElaboracao",
                caption: "Dt. Criação",
                minWidth: 77,
                width: 77,
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
                caption: "Envio",
                alignment: 'center',
                cssClass: "column-data-grid",
                columns: [
                    {
                        dataField: "NomeEmissao",
                        caption: "Login",
                        minWidth: 87,
                        width: 87,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DataEmissao",
                        caption: "Data",
                        minWidth: 70,
                        width: 70,
                        dataType: "date",
                        format: "dd/MM/yyyy",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                ],
            },
            {
                caption: "Conclusão",
                alignment: 'center',
                cssClass: "column-data-grid",
                columns: [
                    {
                        dataField: "NomeConclusao",
                        caption: "Login",
                        minWidth: 87,
                        width: 87,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DataConclusao",
                        caption: "Data",
                        minWidth: 70,
                        width: 70,
                        dataType: "date",
                        format: "dd/MM/yyyy",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                ],
            },
            {
                dataField: "CountProdutos",
                caption: "Qtde. Produtos",
                dataType: 'number',
                minWidth: 80,
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                caption: "Remetente",
                cssClass: "column-data-grid",
                alignment: 'center',
                dataField: "Remetente",
                minWidth: 89,
                width: 89,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cellTemplate: (elem, columnOption) => {
                    if (columnOption.data.Remetente == null) return null;
                    return elem.append(mustache.render($('#gridPhoto').html(), { fotoLink: verificarSemFoto(columnOption.data.FotoRemetente), nome: columnOption.data.Remetente }))
                },
            },
            {
                caption: "Destinatário",
                cssClass: "column-data-grid",
                alignment: 'center',
                dataField: "Destinatario",
                minWidth: 95,
                width: 95,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                cellTemplate: (elem, columnOption) => {
                    if (columnOption.data.Destinatario == null) return null;
                    return elem.append(mustache.render($('#gridPhoto').html(), { fotoLink: verificarSemFoto(columnOption.data.FotoDestinatario), nome: columnOption.data.Destinatario }))
                },
            },
            {
                dataField: "Observacao",
                caption: "Observação",
                minWidth: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                cssClass: "column-data-grid",

            },
            {
                caption: "Cancelamento",
                alignment: 'center',
                cssClass: "column-data-grid",
                visible: false,
                columns: [
                    {
                        dataField: "NomeCancelamento",
                        caption: "Login",
                        minWidth: 106,
                        width: 106,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DataCancelamento",
                        caption: "Data",
                        minWidth: 106,
                        width: 106,
                        dataType: "date",
                        format: "dd/MM/yyyy",
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                ],
            },
            {
                dataField: "MotivoCancelamento",
                caption: "Motivo do Cancelamento",
                minWidth: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                cssClass: "column-data-grid",

            },
            {
                dataField: "MotivoRecusa",
                caption: "Motivo de Recusa da Transferência",
                minWidth: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                type: 'buttons',
                width: 40,
                fixed: true,
                fixedPosition: "right",
            },
        ],
        onExporting: (e) => {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Transferências');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(() => workbook.xlsx.writeBuffer().then(buffer => saveAs(
                new Blob([buffer], {
                    type: 'application/octet-stream'
                }),
                'Transferências de mercadoria.xlsx')));
            e.cancel = true;
        },
        onCellPrepared: (e) => {
            if (e.rowType === "data") {
                if (e.column.dataField === "CountProdutos") {
                    if (e.data.CountProdutos == 0)
                        return;

                    const $icon = $('<i class="fas fa-list fa-2x ml-2" style="color: #0088cc;">');

                    let $mustache = {
                        prods: e.data.Produtos.map((produto) => {
                            return {
                                produto: produto.IdProduto,
                                lote: produto.Lote,
                                quantidade: produto.Quantidade
                            }
                        })
                    };

                    const $tooltipRow = $('<div class="tooltipRow">').append(mustache.render($('#tabelaTooltipRow').html(), $mustache));

                    new DevExpress.ui.dxTooltip($tooltipRow, {
                        target: $icon,
                        showEvent: 'mouseenter',
                        hideEvent: 'mouseleave',
                        hideOnOutsideClick: false,
                        height: 'auto',
                    });

                    $icon.append($tooltipRow)
                    e.cellElement.append($icon);
                }
                if (e.column.dataField === "Color") {
                    const color = _enumSituacaoTransferencia.GetColor(e.data.StatusTransferencia)
                    e.cellElement.css("background-color", color);
                }
                if (e.column.type === 'buttons') {
                    e.cellElement.css('vertical-align', 'middle');
                    const $content = $('<div>');
                    new DevExpress.ui.dxButton($content, {
                        icon: 'fa-duotone fa-print imprimir',
                        onClick: () => onClickImprimirRelatorio(e.data.IdProcesso),
                    });
                    const $popover = $('<div class="text-center">').text('Imprimir relatório da transferência #' + e.data.IdProcesso);
                    $('body').append($popover);
                    new DevExpress.ui.dxPopover($popover, {
                        target: $content,
                        showEvent: 'mouseenter',
                        hideEvent: 'mouseleave',
                        width: 144,
                    });
                    e.cellElement.append($content);
                }
            };
            if (e.rowType === "group") {
                e.cellElement.css("color", "#f05b41");
                e.cellElement.css("background-color", "white");
            };
        },
        onInitialized: (e) => {
            new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) e.component.updateDimensions();
                });
            }).observe(e.element[0]);
        },
        onRowPrepared: (e) => {
            if (e.rowType == 'data') {
                e.rowElement.css({ cursor: 'pointer' })
            }
        },
    };
    const lookupConsultaOptions = {
        searchExpr: ['Id', 'Nome'],
        valueExpr: 'Id',
        displayExpr: 'Nome',
        showClearButton: true,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Produto',
        },
        labelMode: 'floating',
        label: 'Produto para filtrar lista de transferências',
        placeholder: 'Selecione um produto',
        width: '100%',
        maxWidth: '779px',
        wrapItemText: true,
    };
    const botaoVoltarConsultaOptions = {
        icon: 'fas fa-arrow-left',
        text: 'Voltar',
        hint: 'Volta para o menu principal de transferência',
        onClick: () => retornaMenuPrincipal(),
    };
    const diasFiltroOptions = {
        value: 60,
        format: '###,### dias',
        showClearButton: true,
        showSpinButtons: true,
        step: 10,
        min: 1,
        max: 9999,
        labelMode: 'floating',
        label: 'Registros dos últimos',
        disabled: true,
    };

    dxComp.consultaGeral = (new function () {
        this.voltar = new DevExpress.ui.dxButton('#cardConsultaGeral #voltar', botaoVoltarConsultaOptions);
        this.gridConsultaGeral = new DevExpress.ui.dxDataGrid('#gridConsultaGeral', {
            ...gridConsultaOptions,
            stateStoring: AutoLoad('gridConsultaGeral', false),
            toolbar: AutoResetStateForToolbar('gridConsultaGeral', ['exportButton', 'columnChooserButton', 'searchPanel']),
            dataSource: new DevExpress.data.DataSource({
                loadMode: 'raw',
                key: 'IdProcesso',
                load: async () => {
                    parameters.get();
                    let fnAlter = (item, value) => this[item].option('disabled', value);
                    const comps = ['gridConsultaGeral', 'diasFiltro', 'produtoStatus', 'filtroProduto', 'toolbar'];
                    comps.forEach(a => fnAlter(a, true));

                    await dataSources.consultaGeral._getTranferencias.then((data) => {
                        data.forEach((a) => a.ArrayProdutos = a.Produtos.map((b) => b.Id));
                    });

                    comps.forEach((a) => fnAlter(a, false));

                    await parameters._get;
                    if (!parameters.administrador && (!parameters.transferencia.Lg_Permite_Consultar_Processos_Outros_Usuarios || !parameters.usuario.Lg_Permite_Consultar_Processos_Outros_Usuarios))
                        return dataSources.consultaGeral.items
                            .filter(a => [a.Remetente, a.Destinatario]
                                .filter(b => b)
                                .map(b => b.toUpperCase())
                                .includes(parameters.usuario.Cd_Login.toUpperCase()));

                    return dataSources.consultaGeral.items;
                },
            }),
            onCellDblClick: (e) => {
                destinoVoltarConsulta = 'geral';
                dxComp.loadPanelTransferencia.show();
                LoadTransferenciaAlter(e.key).then(() => dxComp.loadPanelTransferencia.hide());
            },
        });
        this.diasFiltro = new DevExpress.ui.dxNumberBox('#nbx_Dias_Filtro_Grid', {
            ...diasFiltroOptions,
            buttons: [{
                name: 'aplicar',
                location: 'after',
                options: {
                    text: 'Aplicar',
                    icon: 'fas fa-refresh',
                    stylingMode: 'text',
                    width: 80,
                    elementAttr: { class: 'botao-aplicar-number-box', },
                    onClick: () => {
                        const produto = this.filtroProduto != null ? this.filtroProduto.option().value : null;
                        dataSources.consultaGeral.getTranferencias(this.diasFiltro.option().value, produto);
                        this.gridConsultaGeral.getDataSource().reload();
                    },
                    onInitialized: (e) => this.btnAplicar = e.component,
                },
            }, 'clear', 'spins'],
            onValueChanged: () => this.diasFiltro.toolTip._refresh(),
            onInitialized: (e) => {
                let options = e.component.option();
                const textToolTip = `De ${moment().add(-(options.value), 'day').format('DD/MM/YYYY')} a ${moment().format('DD/MM/YYYY')}`;
                let $div = $('<div>').dxTooltip({
                    target: e.element[0],
                    showEvent: 'mouseenter',
                    hideEvent: 'mouseleave',
                    hideOnOutsideClick: false,
                    contentTemplate: (data) => {
                        data.text(textToolTip);
                    },
                    onShowing: (a) => {
                        a.component.content().text(`De ${moment().add(-(this.diasFiltro.option().value), 'day').format('DD/MM/YYYY')} a ${moment().format('DD/MM/YYYY')}`);
                    },
                    onInitialized: (a) => e.component.toolTip = a.component,
                });
                e.element.append($div);
            },
        });
        this.filtroProduto = new DevExpress.ui.dxLookup('#lkp_Produtos_Filtro_Grid', {
            ...lookupConsultaOptions,
            dataSource: new DevExpress.data.DataSource({
                loadMode: 'raw',
                key: 'Id',
                load: async () => {
                    await dataSources.produtosFiltro._get;
                    this.produtoStatus.option('disabled', false);
                    return dataSources.produtosFiltro.items;
                },
            }),
            onValueChanged: (e) => {
                if (!e.value) {
                    this.gridConsultaGeral.clearFilter();
                    return;
                }
                const filtro = this.gridConsultaGeral.getDataSource().store().__rawData
                    .filter(a => a.ProdutosArray.includes(e.value))
                    .map(a => a.IdProcesso)
                    .map(a => ['IdProcesso', '=', a])
                    .map(a => [a, 'or'])
                    .flat()
                    .slice(0, -1);
                this.gridConsultaGeral.option('filterValue', filtro);
            },
        });
        this.produtoStatus = new DevExpress.ui.dxSelectBox('#cardConsultaGeral .filtros #statusProduto', {
            items: [
                { id: _enumFiltroProdutosStatus.Ativos, text: 'Ativos' },
                { id: _enumFiltroProdutosStatus.Todos, text: 'Todos' },
                { id: _enumFiltroProdutosStatus.Inativos, text: 'Inativos' },
            ],
            value: _enumFiltroProdutosStatus.Ativos,
            disabled: true,
            displayExpr: 'text',
            valueExpr: 'id',
            width: 150,
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
            },
            labelMode: 'floating',
            label: 'Status Produto',
            buttons: [
                {
                    location: 'after',
                    name: 'refresh',
                    options: {
                        icon: 'fas fa-refresh',
                        onClick: (e) => {
                            const value = this.produtoStatus.option().value;
                            if (value == dataSources.produtosFiltro.status)
                                return;
                            const elemFiltro = this.filtroProduto;
                            elemFiltro.reset();
                            elemFiltro.option('disabled', true);
                            this.produtoStatus.option('disabled', true);
                            const $icon = e.element.find('i');
                            $icon.removeClass('fa-beat-custom').addClass('fa-spin-custom');
                            dataSources.produtosFiltro.get(value);
                            $.when(elemFiltro.getDataSource().reload()).then(() => {
                                $icon.removeClass('fa-spin-custom');
                                elemFiltro.option('disabled', false);
                            });
                        },
                    }
                },
                'clear',
                'dropDown',
            ],
            onValueChanged: e => {
                const $icon = this.produtoStatus.element().find('i');
                if (e.value == dataSources.produtosFiltro.status) {
                    $icon.removeClass('fa-beat-custom');
                    return;
                };
                $icon.addClass('fa-beat-custom');
            },
        });
        this.toolbar = new DevExpress.ui.dxToolbar('#cardConsultaGeral #toolbar', { //TODO: verificar etapas ativas para mostrar ou não
            items: [
                {
                    location: 'after',
                    widget: 'dxButton',
                    locateInMenu: 'auto',
                    visible: false,
                    options: {
                        icon: 'fa-duotone fa-truck-fast',
                        text: 'Enviar Transferências',
                        hint: 'Enviar transferências selecionadas',
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    locateInMenu: 'auto',
                    disabled: false,
                    options: {
                        icon: icons.concluir,
                        text: 'Enviar para Separação',
                        onClick: () => {
                            const data = this.gridConsultaGeral.getSelectedRowsData();
                            if (data.length == 0) {
                                messages.info("Selecionar itens", `Selecione algum processo da lista abaixo antes de continuar`, 4000);
                                return;
                            }
                            const processosEmElaboracao = data
                                .filter(a => a.StatusTransferencia === _enumSituacaoTransferencia.EmElaboracao)
                                .map(a => a.IdProcesso);
                            const isPlural = processosEmElaboracao.length > 1;
                            if (processosEmElaboracao.length == 0) {
                                messages.info('Selecionar itens', `Selecione algum processo "Em Elaboração" para continuar`, 4000);
                                return;
                            }
                            if (data.length > processosEmElaboracao.length) {
                                messages.info('Processos remarcados', `O${isPlural ? 's' : ''} processo${isPlural ? 's' : ''} (${processosEmElaboracao.join('/')}) fo${isPlural ? 'ram' : 'i'} remarcado${isPlural ? 's' : ''}, apenas ele${isPlural ? 's' : ''} est${isPlural ? 'ão' : 'á'} "Em Elaboração"`, 4000);
                                this.gridConsultaGeral.deselectAll();
                                this.gridConsultaGeral.selectRows(processosEmElaboracao);
                                return;
                            }

                            dxComp.loadPanelTransferencia.exibir("Enviando processos para Separação...");
                            Transferencia.SepararTransferencia(processosEmElaboracao)
                                .then(() => {
                                    messages.success("Processo concluído", `Transferência${isPlural ? 's' : ''} enviada${isPlural ? 's' : ''} para separação`);
                                    iniciaCardConsultaGeral();
                                })
                                .catch((err) => messages.error("Erro no envio", err, 6000))
                                .finally(() => dxComp.loadPanelTransferencia.hide());
                        },
                        onInitialized({ element }) {
                            element.createPopover("Envio de processos Em Elaboração para separação");
                        }
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    locateInMenu: 'auto',
                    options: {
                        icon: 'fa-duotone fa-cogs',
                        text: 'Receber em Análise',
                        onClick: async () => {
                            const data = this.gridConsultaGeral.getSelectedRowsData();
                            if (data.length == 0) {
                                messages.info("Selecionar itens", `Selecione algum processo da lista abaixo para realizar o recebimento em análise`, 4000);
                                return;
                            }
                            const processosEmTransito = data
                                .filter(a => a.StatusTransferencia == _enumSituacaoTransferencia.EmTransito);
                            const procs = processosEmTransito.map(a => a.IdProcesso);
                            let isPlural = procs.length > 1;
                            let showMessage = false;

                            if (procs.length == 0) {
                                messages.info('Nenhum processo "Em Trânsito" selecionado', `Selecione algum processo em trânsito para continuar`, 4000);
                                return;
                            }
                            else if (data.length > procs.length) {
                                showMessage = true;
                                this.gridConsultaGeral.deselectAll();
                                this.gridConsultaGeral.selectRows(procs);
                            }
                            await parameters._get;
                            if (!parameters.administrador) {
                                if (!parameters.usuario.Lg_Recebe_Analise_Transferencia) {
                                    messages.info('Permissão necessária', `Seu Login (${parameters.usuario.Cd_Login.toUpperCase()}), não tem permissão para realizar o recebimento de transferências`, 6000);
                                    this.gridConsultaGeral.deselectAll();
                                    return;
                                }

                                if (parameters.transferencia.Lg_Permite_Alterar_Processos_Outros_Usuarios && parameters.usuario.Lg_Permite_Movimentar_Processos_Outros_Usuarios) {
                                    const processosByUser = processosEmTransito.filter(a => a.Destinatario.toUpperCase() == parameters.usuario.Cd_Login.toUpperCase());
                                    if (processosByUser.length == 0) {
                                        messages.info('Destinatário inválido', `Nenhum processo selecionado está configurado com o seu Login (${parameters.usuario.Cd_Login.toUpperCase()}) como Destinatário, não é possível realizar o recebimento em análise`, 6000);
                                        this.gridConsultaGeral.deselectAll();
                                        return;
                                    } else if (processosEmTransito.length > processosByUser.length) {
                                        isPlural = processosByUser.length > 1;
                                        messages.info('Processos remarcados', `O${isPlural ? 's' : ''} processo${isPlural ? 's' : ''} (${processosByUser.join('/')}) fo${isPlural ? 'ram' : 'i'} remarcado${isPlural ? 's' : ''}, apenas ele${isPlural ? 's' : ''} ${isPlural ? 'têm' : 'tem'} o seu usuário como destinatário"`, 4000);
                                        showMessage = false;
                                        this.gridConsultaGeral.deselectAll();
                                        this.gridConsultaGeral.selectRows(processosByUser.map(a => a.IdProcesso));
                                    }
                                }
                            }


                            if (showMessage)
                                messages.info('Processos remarcados', `O${isPlural ? 's' : ''} processo${isPlural ? 's' : ''} (${procs.join('/')}) fo${isPlural ? 'ram' : 'i'} remarcado${isPlural ? 's' : ''}, apenas ele${isPlural ? 's' : ''} est${isPlural ? 'ão' : 'á'} "Em Trânsito"`, 4000);

                            dxComp.loadPanelTransferencia.show();
                            await Transferencia.ReceberTransferencia(procs)
                                .then(() => {
                                    messages.success('Status Alterado', `O${isPlural ? 's' : ''} status da${isPlural ? 's' : ''} transferência${isPlural ? 's' : ''} selecionada${isPlural ? 's' : ''} fo${isPlural ? 'am' : 'i'} alterado${isPlural ? 's' : ''} para "Recebida em Análise"`);
                                    iniciaCardConsultaGeral();
                                })
                                .catch((error) => {
                                    messages.error('Erro no recebimento', 'Ao tentar fazer o recebimento em massa, um erro foi encontrada. Segue o erro: ' + error);
                                })
                                .finally(dxComp.loadPanelTransferencia.hide());
                        },
                        onInitialized({ element }) {
                            element.createPopover("Receber Transferências Em Trânsito selecionadas");
                        }
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    locateInMenu: 'auto',
                    disabled: false,
                    options: {
                        text: 'Recusar',
                        icon: 'fa-duotone fa-hand',
                        onClick: () => {
                            const data = this.gridConsultaGeral.getSelectedRowsData();
                            if (data.length == 0) {
                                messages.info("Selecionar itens", `Selecione algum processo da lista abaixo para realizar a recusa`, 4000);
                                return;
                            }

                            const processosEmAnalise = data
                                .filter(a => a.StatusTransferencia === _enumSituacaoTransferencia.RecebidaEmAnalise)
                                .map(a => a.IdProcesso);
                            const isPlural = processosEmAnalise.length > 1;

                            if (processosEmAnalise.length == 0) {
                                messages.info('Selecionar itens', `Selecione algum processo "Recebido em Análise" para continuar`, 4000);
                                return;
                            }
                            else if (data.length > processosEmAnalise.length) {
                                messages.info('Processos remarcados', `O${isPlural ? 's' : ''} processo${isPlural ? 's' : ''} (${processosEmAnalise.join('/')}) fo${isPlural ? 'ram' : 'i'} remarcado${isPlural ? 's' : ''}, apenas ele${isPlural ? 's' : ''} est${isPlural ? 'ão' : 'á'} "Recebido em Análise"`, 4000);
                                this.gridConsultaGeral.deselectAll();
                                this.gridConsultaGeral.selectRows(processosEmAnalise);
                            }

                            dxComp.popupRecusa.exibe(processosEmAnalise);
                        },
                        onInitialized({ element }) {
                            element.createPopover("Recusar Transferências Aguardando Análise selecionadas");
                        }
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    locateInMenu: 'auto',
                    options: {
                        text: 'Cancelar',
                        icon: 'fas fa-xmark-large',
                        onClick: () => {
                            const dataProcessos = this.gridConsultaGeral.getSelectedRowsData();
                            if (dataProcessos.length == 0)
                                messages.info("Selecionar itens", "Selecione itens no grid para realizar o cancelamento");

                            const processosDiff = dataProcessos
                                .filter(b => b.StatusTransferencia != _enumSituacaoTransferencia.EmElaboracao)
                                .map(b => b.IdProcesso);

                            const processosElaboracao = dataProcessos
                                .filter(b => b.StatusTransferencia == _enumSituacaoTransferencia.EmElaboracao)
                                .map(b => b.IdProcesso);

                            if (processosDiff.length > 0)
                                messages.info("Processos diferentes de \"Em Elaboração\"", `Processos diferentes de "Em Elaboração": ${processosDiff.join('/')}. ${processosElaboracao == 1 ? `\n\nO processo a seguir será cancelado: ${processosElaboracao.join('/')}` : processosElaboracao > 1 ? `\n\nOs processos a seguir serão cancelados: ${processosElaboracao.join('/')}` : ''}`, 7000);

                            if (processosElaboracao.length > 0)
                                dxComp.popupCancelamento.exibir(processosElaboracao);
                        },
                        onInitialized({ element }) {
                            element.createPopover("Cancelar Transferências Em Elaboração selecionadas");
                        }
                    },
                },
            ],
            disabled: true,
        });
    });

    dxComp.emTransito = (new function () {
        this.voltar = new DevExpress.ui.dxButton('#cardTransferenciasTransito #voltar', botaoVoltarConsultaOptions);
        this.gridConsultaTransito = new DevExpress.ui.dxDataGrid('#gridConsultaTransito', {
            ...gridConsultaOptions,
            stateStoring: AutoLoad('gridConsultaTransito', false),
            toolbar: AutoResetStateForToolbar('gridConsultaTransito', ['exportButton', 'columnChooserButton', 'searchPanel']),
            dataSource: new DevExpress.data.DataSource({
                loadMode: 'raw',
                key: 'IdProcesso',
                load: async () => {
                    let fnAlter = (item, value) => this[item].option('disabled', value);
                    const comps = ['gridConsultaTransito', 'filtroProduto', 'produtoStatus', 'toolbar', 'diasFiltro'];
                    comps.forEach(a => fnAlter(a, true));

                    await dataSources.consultaGeral._getTranferencias.then((data) => {
                        data.forEach((a) => a.ArrayProdutos = a.Produtos.map((b) => b.Id));
                    });

                    comps.forEach((a) => fnAlter(a, false));

                    const data = dataSources.consultaGeral.items.filter(a => [_enumSituacaoTransferencia.EmTransito, _enumSituacaoTransferencia.RecebidaEmAnalise].includes(a.StatusTransferencia));

                    await parameters._get;
                    if (!parameters.administrador && (!parameters.transferencia.Lg_Permite_Consultar_Processos_Outros_Usuarios || !parameters.user.Lg_Permite_Consultar_Processos_Outros_Usuarios))
                        return data
                            .filter(a => [a.Remetente, a.Destinatario, a.NomeElaboracao, a.NomeEmissao, a.NomeConclusao, a.NomeCancelamento]
                                .filter(b => b)
                                .map(b => b.toUpperCase())
                                .includes(parameters.usuario.Cd_Login.toUpperCase()));

                    return data;
                },
            }),
            onCellDblClick: async (e) => {
                destinoVoltarConsulta = 'trânsito';
                dxComp.loadPanelTransferencia.show();
                await LoadTransferenciaAlter(e.key);
                dxComp.loadPanelTransferencia.hide();
            },
        });
        this.diasFiltro = new DevExpress.ui.dxNumberBox('#nbx_Dias_Filtro_Grid_Transito', {
            ...diasFiltroOptions,
            buttons: [{
                name: 'aplicar',
                location: 'after',
                options: {
                    text: 'Aplicar',
                    icon: 'fas fa-refresh',
                    stylingMode: 'text',
                    width: 80,
                    elementAttr: { class: 'botao-aplicar-number-box', },
                    onClick: () => {
                        const produto = this.filtroProduto != null ? this.filtroProduto.option().value : null;
                        dataSources.consultaGeral.getTranferencias(this.diasFiltro.option().value, produto);
                        this.gridConsultaTransito.getDataSource().reload();
                    },
                    onInitialized: (e) => this.btnAplicar = e.component,
                },
            }, 'clear', 'spins'],
            onValueChanged: () => this.diasFiltro.toolTip._refresh(),
            onInitialized: (e) => {
                let options = e.component.option();
                const textToolTip = `De ${moment().add(-(options.value), 'day').format('DD/MM/YYYY')} a ${moment().format('DD/MM/YYYY')}`;
                let $div = $('<div>').dxTooltip({
                    target: e.element[0],
                    showEvent: 'mouseenter',
                    hideEvent: 'mouseleave',
                    hideOnOutsideClick: false,
                    contentTemplate: (data) => {
                        data.text(textToolTip);
                    },
                    onShowing: (a) => {
                        a.component.content().text(`De ${moment().add(-(this.diasFiltro.option().value), 'day').format('DD/MM/YYYY')} a ${moment().format('DD/MM/YYYY')}`);
                    },
                    onInitialized: (a) => e.component.toolTip = a.component,
                });
                e.element.append($div);
            },
        });
        this.filtroProduto = new DevExpress.ui.dxLookup('.filtroProdutoGridTransito #lkp_Produtos_Filtro_Grid_Transito', {
            ...lookupConsultaOptions,
            dataSource: new DevExpress.data.DataSource({
                loadMode: 'raw',
                key: 'Id',
                load: async () => {
                    await dataSources.produtosFiltro._get;
                    this.produtoStatus.option('disabled', false);
                    return dataSources.produtosFiltro.items;
                },
            }),
            onValueChanged: (e) => {
                if (!e.value) {
                    this.gridConsultaTransito.clearFilter();
                    return;
                }
                const filtro = this.gridConsultaTransito.getDataSource().store().__rawData
                    .filter(a => a.ProdutosArray.includes(e.value))
                    .map(a => a.IdProcesso)
                    .map(a => ['IdProcesso', '=', a])
                    .map(a => [a, 'or'])
                    .flat()
                    .slice(0, -1);
                this.gridConsultaTransito.option('filterValue', filtro);
            },
        });
        this.produtoStatus = new DevExpress.ui.dxSelectBox('.filtroProdutoGridTransito #produtoStatus', {
            items: [
                { id: _enumFiltroProdutosStatus.Ativos, text: 'Ativos' },
                { id: _enumFiltroProdutosStatus.Todos, text: 'Todos' },
                { id: _enumFiltroProdutosStatus.Inativos, text: 'Inativos' },
            ],
            value: _enumFiltroProdutosStatus.Ativos,
            disabled: true,
            displayExpr: 'text',
            valueExpr: 'id',
            width: 150,
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
            },
            labelMode: 'floating',
            label: 'Status Produto',
            buttons: [
                {
                    location: 'after',
                    name: 'refresh',
                    options: {
                        icon: 'fas fa-refresh',
                        onClick: e => {
                            const value = this.produtoStatus.option().value;
                            if (value == dataSources.produtosFiltro.status) return;
                            const elemFiltro = this.filtroProduto;
                            elemFiltro.reset();
                            elemFiltro.option('disabled', true);
                            this.produtoStatus.option('disabled', true);

                            const $icon = e.element.find('i');
                            $icon.removeClass('fa-beat-custom').addClass('fa-spin-custom');
                            dataSources.produtosFiltro.get(value);
                            $.when(elemFiltro.getDataSource().reload()).then(() => {
                                $icon.removeClass('fa-spin-custom');
                                elemFiltro.option('disabled', false)
                            });
                        },
                    }
                },
                'clear',
                'dropDown',
            ],
            onValueChanged: e => {
                const $icon = this.produtoStatus.element().find('i');
                if (e.value == dataSources.produtosFiltro.status) {
                    $icon.removeClass('fa-beat-custom');
                    return;
                };
                $icon.addClass('fa-beat-custom');
            },
        });
        this.legenda = new DevExpress.ui.dxDataGrid("#gridConsultaTransitoLegenda", {
            dataSource: dataSources.dataSourceConsultaGeralLegenda,
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
            keyExpr: 'DS_FL',
            columns: [
                {
                    dataField: "DS_STATUS_2",
                    caption: "",
                    width: 25,
                    allowEditing: false,
                    allowSorting: false,
                    alignment: 'center',
                    allowHeaderFiltering: false,
                },
                {
                    dataField: "DS_LEGENDA_2",
                    caption: "",
                    //width: 120,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                },


            ],
            showBorders: false,
            onCellPrepared: (e) => {
                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS_1") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_1),
                            e.cellElement.css("color", 'white')
                    };
                    if (e.column.dataField === "DS_STATUS_2") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_2),
                            e.cellElement.css("color", 'white')
                    };
                    if (e.column.dataField === "DS_STATUS_3") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_3),
                            e.cellElement.css("color", 'white')
                    };
                    if (e.column.dataField === "DS_STATUS_4") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_4),
                            e.cellElement.css("color", 'white')
                    };
                    if (e.column.dataField === "DS_STATUS_5") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_5),
                            e.cellElement.css("color", 'white')
                    };
                    if (e.column.dataField === "DS_STATUS_6") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_6),
                            e.cellElement.css("color", 'white')
                    };
                }
            },
        });
        this.toolbar = new DevExpress.ui.dxToolbar('#toolbarAcoesTransito', { //TODO: verificar etapas ativas para mostrar ou não
            items: [
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'fa-duotone fa-cogs',
                        text: 'Receber em Análise',
                        onClick: async () => {
                            const data = this.gridConsultaTransito.getSelectedRowsData();
                            if (data.length == 0) {
                                messages.info("Selecionar itens", `Selecione algum processo da lista abaixo para realizar o recebimento em análise`, 4000);
                                return;
                            }
                            const procs = data
                                .filter(a => a.StatusTransferencia == _enumSituacaoTransferencia.EmTransito)
                            const processosEmTransito = procs
                                .map(a => a.IdProcesso);
                            const isPlural = processosEmTransito.length > 1;
                            let showMessage = false;

                            if (processosEmTransito.length == 0) {
                                messages.info('Nenhum processo "Em Trânsito" selecionado', `Selecione algum processo em trânsito para continuar`, 4000);
                                return;
                            }
                            else if (data.length > processosEmTransito.length) {
                                showMessage = true;
                                this.gridConsultaTransito.deselectAll();
                                this.gridConsultaTransito.selectRows(processosEmTransito);
                            }
                            await parameters._get;
                            if (!parameters.administrador) {
                                if (!parameters.usuario.Lg_Recebe_Analise_Transferencia) {
                                    messages.info('Permissão necessária', `Seu Login (${parameters.usuario.Cd_Login.toUpperCase()}), não tem permissão para realizar o recebimento de transferências`, 6000);
                                    this.gridConsultaTransito.deselectAll();
                                    return;
                                }

                                if (!parameters.transferencia.Lg_Permite_Alterar_Processos_Outros_Usuarios || !parameters.usuario.Lg_Permite_Movimentar_Processos_Outros_Usuarios) {
                                    const processosByUser = procs.filter(a => a.Destinatario.toUpperCase() == parameters.usuario.Cd_Login.toUpperCase());
                                    if (processosByUser.length == 0) {
                                        messages.info('Destinatário inválido', `Nenhum processo selecionado está configurado com o seu Login (${parameters.usuario.Cd_Login.toUpperCase()}) como Destinatário, não é possível realizar o recebimento em análise`, 6000);
                                        this.gridConsultaTransito.deselectAll();
                                        return;
                                    } else if (procs.length > processosByUser.length) {
                                        isPlural = processosByUser.length > 1;
                                        messages.info('Processos remarcados', `O${isPlural ? 's' : ''} processo${isPlural ? 's' : ''} (${processosByUser.join('/')}) fo${isPlural ? 'ram' : 'i'} remarcado${isPlural ? 's' : ''}, apenas ele${isPlural ? 's' : ''} ${isPlural ? 'têm' : 'tem'} o seu usuário como destinatário"`, 4000);
                                        showMessage = false;
                                        this.gridConsultaTransito.deselectAll();
                                        this.gridConsultaTransito.selectRows(processosByUser.map(a => a.IdProcesso));
                                    }
                                }
                            }

                            if (showMessage)
                                messages.info('Processos remarcados', `O${isPlural ? 's' : ''} processo${isPlural ? 's' : ''} (${processosEmTransito.join('/')}) fo${isPlural ? 'ram' : 'i'} remarcado${isPlural ? 's' : ''}, apenas ele${isPlural ? 's' : ''} est${isPlural ? 'ão' : 'á'} "Em Trânsito"`, 4000);

                            dxComp.loadPanelTransferencia.show();
                            await Transferencia.ReceberTransferencia(processosEmTransito)
                                .then(() => {
                                    messages.success('Status Alterado', `O${isPlural ? 's' : ''} status da${isPlural ? 's' : ''} transferência${isPlural ? 's' : ''} selecionada${isPlural ? 's' : ''} fo${isPlural ? 'am' : 'i'} alterado${isPlural ? 's' : ''} para "Recebida em Análise"`);
                                    iniciaCardTransferenciasTransito();
                                })
                                .catch((error) => {
                                    messages.error('Erro no recebimento', 'Ao tentar fazer o recebimento em massa, um erro foi encontrada. Segue o erro: ' + error);
                                })
                                .finally(dxComp.loadPanelTransferencia.hide());
                        },
                    },
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    disabled: false, //TODO: verificar configurações e permissões de usuário
                    options: {
                        text: 'Recusar',
                        icon: 'fa-duotone fa-hand',
                        onClick: () => {
                            const data = this.gridConsultaTransito.getSelectedRowsData();
                            if (data.length == 0) {
                                messages.info("Selecionar itens", `Selecione algum processo da lista abaixo para realizar a recusa`, 4000);
                                return;
                            }

                            const processosEmAnalise = data
                                .filter(a => a.StatusTransferencia === _enumSituacaoTransferencia.RecebidaEmAnalise)
                                .map(a => a.IdProcesso);
                            const isPlural = processosEmAnalise.length > 1;

                            if (processosEmAnalise.length == 0) {
                                messages.info('Selecionar itens', `Selecione algum processo "Recebido em Análise" para continuar`, 4000);
                                return;
                            }
                            else if (data.length > processosEmAnalise.length) {
                                messages.info('Processos remarcados', `O${isPlural ? 's' : ''} processo${isPlural ? 's' : ''} (${processosEmAnalise.join('/')}) fo${isPlural ? 'ram' : 'i'} remarcado${isPlural ? 's' : ''}, apenas ele${isPlural ? 's' : ''} est${isPlural ? 'ão' : 'á'} "Recebido em Análise"`, 4000);
                                this.gridConsultaTransito.deselectAll();
                                this.gridConsultaTransito.selectRows(processosEmAnalise);
                            }

                            dxComp.popupRecusa.exibe(processosEmAnalise, 'transito');
                        },
                    },
                },
            ],
            disabled: true,
        });
    });

    dxComp.newTransferLoad = new DevExpress.ui.dxLoadIndicator('#newTransferLoad', {
        height: 25,
        width: 25,
        visible: false,
    })
}
function verificarSemFoto(url) {
    if (!url.includes('sem-foto-pesquisa'))
        url += `?v=${mathRandom}`;
    return url;
}
function CreateParameterUser() {
    let isLoad = false;
    let updateParametroUsuario = ({ component, value, verificaNull = true }) => {

        if (isLoad)
            return;

        const { parametro, text } = component.option();
        const { value: user } = this.lkp_Usuario_Configuracoes.option();
        const atualParametersUser = parameters.listUsuario.find(a => a.Cd_Login.toUpperCase() == user.toUpperCase());

        if (verificaNull && typeof value != 'boolean') {
            onError();
            return;
        }
        if (!parametro || !user || value == atualParametersUser[parametro])
            return;

        $.ajax({
            url: `/Estoque/Transferencias/ParametroUsuarios/${parametro}`,
            method: 'PUT',
            data: {
                paramString: parametro,
                value,
                user: user,
            }
        }).done(a => {
            let findUser = parameters.listUsuario.find(b => b.Cd_Login.toUpperCase() == user.toUpperCase());
            findUser[parametro] = a.usuarioParametros[parametro];
            PNotify.messages.Parameter.Ok(text);
        }).fail(a => {
            onError(a);
        });

        function onError(response = null) {
            component.option('value', atualParametersUser[parametro]);
            if (response == null)
                return;
            PNotify.messages.Parameter.Error(parametro, response.status, response.responseText);
        }
    }

    const parans = [
        {
            name: "chk_Usuario_Consultar_Transferencia",
            parametro: "Lg_Consulta_Transferencia",
            text: "Consultar processos"
        },
        {
            name: "chk_Usuario_Criar_Transferencia",
            parametro: "Lg_Inclui_Transferencia",
            text: "Criar novos processos"
        },
        {
            name: "chk_Usuario_Move_Separacao",
            parametro: "Lg_Move_Em_Separacao",
            text: "Colocar em separação"
        },
        {
            name: "chk_Usuario_Enviar_Transferencia",
            parametro: "Lg_Envia_Transferencia",
            text: "Enviar"
        },
        {
            name: "chk_Usuario_Receber_Analise_Transferencia",
            parametro: "Lg_Recebe_Analise_Transferencia",
            text: "Receber em análise"
        },
        {
            name: "chk_Usuario_Recusar_Transferencia",
            parametro: "Lg_Recusa_Analise_Transferencia",
            text: "Recusar"
        },
        {
            name: "chk_Usuario_Concluir_Transferencia",
            parametro: "Lg_Conclui_Analise_Transferencia",
            text: "Concluir"
        },
        {
            name: "chk_Usuario_Cancelar_Transferencia",
            parametro: "Lg_Cancela_Analise_Transferencia",
            text: "Cancelar processos em elaboração/separação"
        },
        {
            name: "chk_Usuario_Replicar_Transferencia",
            parametro: "Lg_Replica_Analise_Transferencia",
            text: "Replicar "
        },
        {
            name: "chk_Usuario_Movimentacao_Transferencia_Outros",
            parametro: "Lg_Permite_Movimentar_Processos_Outros_Usuarios",
            text: "Permite aplicar suas permissões de movimentação em processos criados por outros usuários"
        },
        {
            name: "chk_Usuario_Consulta_Transferencia_Outros",
            parametro: "Lg_Permite_Consultar_Processos_Outros_Usuarios",
            text: "Permite consultar processos criados por outros usuários"
        },
        {
            name: "chk_Usuario_Substituir_Destinatario",
            parametro: "Lg_Permite_Alterar_Destinatario",
            text: "Permite substituir usuário destinatário após o envio da transferência"
        },
        {
            name: "chk_Usuario_Alterar_Obs",
            parametro: "Lg_Permite_Alterar_Observacao",
            text: "Permite alterar observações após o envio da transferência"
        },
        {
            name: "chk_Usuario_Alterar_Filtro_Produto",
            parametro: "Lg_Permite_Alterar_Filtro_Produto",
            text: "Permite alterar o filtro padrão de produtos durante elaboração da transferência"
        },
        {
            name: "chk_usuario_alterar_em_separacao",
            parametro: "Lg_Permite_Alterar_Processos_Em_Separacao",
            text: "Permite alterar produtos e quantidades enquanto o processo estiver na etapa Em Separação"
        },
        {
            name: "chk_Usuario_Alterar_Transferencia_Outros",
            parametro: "Lg_Permite_Alterar_Processos_Outros_Usuarios",
            text: "Permite aplicar suas permissões de alteração em processos criados por outros usuários"
        }
    ]

    for (const i in parans) {
        const { name, text, parametro } = parans[i];
        this[name] = new DevExpress.ui.dxCheckBox('#' + name, {
            value: null,
            text,
            parametro,
            onValueChanged: updateParametroUsuario,
        });
    }

    this.nbx_qt_max_impressao_usuario = new DevExpress.ui.dxNumberBox("#nbx_qt_max_impressao_usuario", {
        showSpinButtons: true,
        showClearButton: true,
        width: 80,
        max: 99,
        step: 1,
        format: '#',
        value: null,
        parametro: "Qt_Maxima_Impressao_Transferencia",
        onValueChanged: (e) => {
            clearTimeout(e.component?.timeoutValueChanged);
            e.component.timeoutValueChanged = setTimeout(() => {
                if (e.value == 0)
                    e.value = null;
                e.verificaNull = false
                updateParametroUsuario(e);
            }, 1000);
        },
    });

    const atualizaValorAlmoxarifadosRestritos = (p, user) => {
        p = !p ? parameters.get() : parameters._get;
        p.then(({ listUsuario: usuarios }) => {

            const { Almoxarifados: alms } = usuarios.find(a => a.Cd_Login.toUpperCase() == user.toUpperCase());
            const filtrarAlms = (tipo) => alms.filter(a => a[tipo]).map(a => a.Almoxarifado);
            const [origem, destino, receber] = [
                filtrarAlms('RestricaoOrigem'),
                filtrarAlms('RestricaoDestino'),
                filtrarAlms('RestricaoReceber'),
            ]

            this.tag_almox_origem.select(origem);
            this.tag_almox_destino.select(destino);
            this.tag_almox_recebimento.select(receber);
        })
    }
    this.lkp_Usuario_Configuracoes = new DevExpress.ui.dxLookup('#lkp_Usuario_Configuracoes', {
        dataSource: new DevExpress.data.DataSource({
            loadMode: 'raw',
            key: 'Cd_Login',
            load: async () => {
                await parameters._get;
                parameters.listUsuario.forEach(a => {
                    a.visible = typeof a.visible != 'boolean' ? true : a.visible;
                });
                return parameters.listUsuario.filter(a => a.visible);
            }
        }),
        searchExpr: ['Nome', 'Cd_Login'],
        valueExpr: 'Cd_Login',
        displayExpr: 'describe',
        deferRendering: true,
        showClearButton: true,
        height: 24,
        width: 400,
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Usuário',
        },
        placeholder: 'Clique para selecionar um usuário',
        itemTemplate: data => getTemplateFoto(data, 'custom-item'),
        onSelectionChanged: async ({ selectedItem }) => {
            if (selectedItem == null) {
                $("#fotoUsuarioConfiguracoes").attr("src", "/img/fotos-usuarios/sem-foto-pesquisa.jpg");
                $("#accParametrosUsuario").slideUp();
                return;
            }
            await parameters._get;
            const dataUser = parameters.listUsuario.find(a => a.Cd_Login.toUpperCase() == selectedItem.Cd_Login.toUpperCase());

            $("#fotoUsuarioConfiguracoes").attr("src", verificarSemFoto(dataUser.URL_Foto));

            if (dataUser.Administrador) {
                $("#accParametrosUsuario").slideUp();
                $("#mensagemUsuarioSemAcesso").slideUp();
                $("#mensagemUsuarioAdministrador").slideDown();
                return;
            }
            $("#mensagemUsuarioAdministrador").slideUp();

            if (!dataUser.HasAccess) {
                $("#accParametrosUsuario").slideUp();
                $("#mensagemUsuarioSemAcesso").slideDown();
                return;
            }

            atualizaValorAlmoxarifadosRestritos(parameters, selectedItem.Cd_Login);

            $("#mensagemUsuarioSemAcesso").slideUp();

            if (parameters.administrador) {
                new Promise((res) => {
                    isLoad = true;
                    $.each(this, (a, b) => {
                        if (typeof b.option('parametro') != 'undefined') {
                            b.option('value', dataUser[b.option('parametro')]);
                        }
                    });
                    isLoad = false;
                    res();
                }).then(() => $("#accParametrosUsuario").slideDown());
            }
        },
        onOpened: (e) => {
            if (this.btn_Controle_Usuarios != null)
                return;
            $(e.component._popup._$bottom).find('.dx-toolbar-center')
                .css({
                    margin: '0px auto',
                    float: 'none',
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    flexWrap: 'nowrap',
                    alignContent: 'center'
                })
                .append(`<div id="btn_Controle_Usuarios">`);
            this.btn_Controle_Usuarios = new DevExpress.ui.dxButton("#btn_Controle_Usuarios", {
                icon: "fas fa-plus",
                type: "default",
                stylingMode: 'outlined',
                text: "Controle de Usuários",
                onClick: () => window.open('/controleacesso/usuario'),
            });
        },
        onInitialized: (e) => {
            e.component.refreshDataSource = new DevExpress.ui.dxButton('#btn_refresh_lkp_Usuario_Configuracoes', {
                elementAttr: {
                    class: 'align-self-end ml-3'
                },
                icon: 'fas fa-refresh',
                height: e.component.option('height'),
                onClick: async (a) => {
                    const $icon = a.element.find('i');
                    const atualIcon = $icon[0].className;
                    $icon.removeClass().addClass(['fa-duotone', 'fa-spinner', 'dx-icon', 'fa-spin-custom']);
                    await parameters.get(false);
                    await e.component.getDataSource().reload();
                    const value = e.component.option('value');
                    e.component.option('value', 'null');
                    e.component.option('value', value);
                    $icon.removeClass().addClass(atualIcon);
                }
            })
        },
    });
    const TIPOS_ATRIBUTO = Object.freeze({
        Origem: 0,
        Destino: 1,
        Recebimento: 2,
    });
    const createOptionsTag = (msgPopover, atributo) => ({
        dataSource: new DevExpress.data.DataSource({
            loadMode: 'raw',
            key: 'Id',
            load: async () => {
                await parameters._get;
                return parameters.almoxarifados.filter(a => a.Status);
            }
        }),
        displayExpr: 'descricao',
        valueExpr: 'Id',
        labelMode: "floating",
        showSelectionControls: true,
        onValueChanged: async (e) => {
            const { component, value } = e;
            let { __rawDataPromise: dataPromise } = component.getDataSource().store();
            if (dataPromise)
                await dataPromise;
            const filterAlmox = {
                [TIPOS_ATRIBUTO.Origem]: 'RestricaoOrigem',
                [TIPOS_ATRIBUTO.Destino]: 'RestricaoDestino',
                [TIPOS_ATRIBUTO.Recebimento]: 'RestricaoReceber',
            }[atributo];
            const almox = this.lkp_Usuario_Configuracoes.option('selectedItem.Almoxarifados').filter(a => a[filterAlmox]).map(a => a.Almoxarifado);

            if (almox.sort().toString() == value.sort().toString())
                return;

            const incluir = value;
            const remover = almox;
            const { value: user } = this.lkp_Usuario_Configuracoes.option();
            const forBody = { user, incluir, remover, atributo, };

            if (component?.fetch &&
                forBody.user == component?.fetch?.options?.user &&
                forBody.incluir.sort().toString() == component?.fetch?.options?.incluir?.sort().toString() &&
                forBody.remover.sort().toString() == component?.fetch?.options?.remover?.sort().toString() &&
                forBody.atributo == component?.fetch?.options?.atributo)
                return;

            const fetchOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(forBody),
            };
            component.fetch = {
                options: forBody,
                atual: fetch('transferencias/usuario/almoxarifado', fetchOptions)
                    .then(async a => {
                        const result = await a.json()
                        if (!a.ok)
                            throw result;
                        messages.success("Restição atualizada", "Almoxarifados com restrição atualizados com sucesso");
                    })
                    .catch(({ ErrorMessage }) => {
                        messages.error("Erro ao atualizar restrições", ErrorMessage, 5000)
                        atualizaValorAlmoxarifadosRestritos(null, user);
                    })
                    .finally(() => {
                        parameters.get();
                        this.lkp_Usuario_Configuracoes.getDataSource().reload();
                    })
            }

        },
        onInitialized({ component, element }) {
            component.operador = true;
            component.clear = () => {
                component.operador = true;
                component.reset();
            };
            component.select = (items) => {
                items = Array.isArray(items ?? []) ? items : [items];
                component.operador = true;
                component.option('value', items?.length == 0 ? [] : items);
            };
            if (!msgPopover)
                return;
            element.createPopover(msgPopover);
        },
    });
    this.tag_almox_origem = new DevExpress.ui.dxTagBox('#tag_almox_origem', {
        ...createOptionsTag("Almoxarifados que não podem ser utilizados como Origem para o usuário selecionado", TIPOS_ATRIBUTO.Origem),
        label: "Origem",
    });
    this.tag_almox_destino = new DevExpress.ui.dxTagBox('#tag_almox_destino', {
        ...createOptionsTag("Almoxarifados que não podem ser utilizados como Destino para o usuário selecionado", TIPOS_ATRIBUTO.Destino),
        label: "Destino",
    });
    this.tag_almox_recebimento = new DevExpress.ui.dxTagBox('#tag_almox_recebimento', {
        ...createOptionsTag("Almoxarifados que não podem ser utilizados para separar/concluir Transferências para o usuário selecionado", TIPOS_ATRIBUTO.Recebimento),
        label: "Separação / Recebimento",
    });
}
async function iniciaFiltroProcessoTransferencia(button) {
    dxComp.newTransferLoad.option('visible', true);

    dxComp.labelTransferencia.transferenciaAtual = new Transferencia();

    await dxComp.loadAlmoxOrigem;

    const $selectors = ['#cardCabecalho', '#cardMenu', '#panelMenu', '#filtroAlmoxarifados'];
    await desabilitaTodosPanels($selectors);
    animateCSS($selectors.filter(a => !$(a).is(':visible')), 'fadeInRight');

    dxComp.newTransferLoad.option('visible', false);
    if (button == 'destinatarioObservacoes') return;
    [
        dxComp.filtroAlmoxarifados.origem,
        dxComp.lkp_Usuario_Destinatario,
        dxComp.txt_Obs_Transferencia
    ].forEach(a => {
        a.reset();
        a.option('validationStatus', 'valid')
    });

    dxComp.radioFiltroProdutos.option('value', parameters.transferencia.FiltroProdutosString);

    //TODO: adicionar outros componentes que precisam começar em branco
}
function filtroProcessoTransferenciaDestinatario(clear = true) {
    const { filtroAlmoxarifados, lkp_Usuario_Destinatario, txt_Obs_Transferencia, labelTransferencia } = dxComp

    if (!filtroAlmoxarifados.origem || !filtroAlmoxarifados.destino)
        return;
    if (!filtroAlmoxarifados.origem.option().value || !filtroAlmoxarifados.destino.option().value)
        return;
    const userOptions = {}
    if (clear) { userOptions.value = null; }
    userOptions.validationStatus = 'valid';
    lkp_Usuario_Destinatario.option(userOptions);
    let parametros = parameters.get(false).then(() => {
        lkp_Usuario_Destinatario.getDataSource().reload();
    });
    const obsOptions = {};
    if (clear) { obsOptions.value = null; }
    obsOptions.validationStatus = 'valid';
    txt_Obs_Transferencia.option(obsOptions);
    dataSources.getProdutos(
        filtroAlmoxarifados.origem.option().value,
        filtroAlmoxarifados.destino.option().value,
        !parametros?.transferencia?.Lg_Permite_Transferencia_Estoque_Negativo ?? true);
    labelTransferencia.transferenciaAtual = new Transferencia();
    labelTransferencia.transferenciaAtual.AlmoxarifadoOrigem = filtroAlmoxarifados.origem.option().value;
    labelTransferencia.transferenciaAtual.AlmoxarifadoDestino = filtroAlmoxarifados.destino.option().value;

    const $selectors = ['#cardCabecalho', '#cardMenu', '#panelMenu', '#filtroDestinatario'];
    desabilitaTodosPanels($selectors).then(() =>
        animateCSS($selectors.filter(a => !$(a).is(':visible')), 'fadeInRight'));
}
async function filtroProcessoTransferenciaProdutos() {

    await parameters._get;
    if (parameters.transferencia.Lg_Obrigatorio_Destinatario ||
        parameters.transferencia.Lg_Obrigatorio_Observacao) {
        dxComp.lkp_Usuario_Destinatario.validationRequest.fire();
        dxComp.txt_Obs_Transferencia.validationRequest.fire();
        if (dxComp.lkp_Usuario_Destinatario.option('validationStatus') != 'valid' ||
            dxComp.txt_Obs_Transferencia.option('validationStatus') != 'valid')
            return;
    }

    const transferencia = dxComp.labelTransferencia.transferenciaAtual;

    const destinatario = dxComp.lkp_Usuario_Destinatario.option().value;
    transferencia.Destinatario = destinatario;

    const observacao = dxComp.txt_Obs_Transferencia.option().value;
    transferencia.Observacao = observacao == '' ? null : observacao;

    dxComp.radioFiltroProdutos.option('value', parameters.transferencia.FiltroProdutosString);
    if (dxComp.radioFiltroProdutos.option('value') != parameters.transferencia.FiltroProdutosString)
        dxComp.radioFiltroProdutos.option('value', parameters.transferencia.FiltroProdutosString)

    dxComp.switchFiltroProduto.option('value', false);
    dxComp.gridOrcamentos.deselectAll();

    const $selectors = ['#cardCabecalho', '#cardMenu', '#panelMenu', '#filtroProdutos'];
    await desabilitaTodosPanels($selectors);
    animateCSS($selectors.filter(a => !$(a).is(':visible')), 'fadeInRight');
}
let newTransferencia = false;
async function CriaProcessoTransferencia(proc) {
    const $selectors = ['#cardCabecalho', '#labelProcessoTransferencia', '#cardGridTransferencia', '#cardBotoesAcoesTransferencia', '#w3'];
    const transferencia = dxComp.labelTransferencia.transferenciaAtual;

    if (proc == 'new')
        newTransferencia = true;
    if (proc == 'LoadNewTransferencia') {
        PNotify.messages.success(newTransferencia ? 'Nova Transferência' : `Transferência ${transferencia.IdProcesso}`, newTransferencia ? 'Novo processo de transferência criado com sucesso' : 'Transferência carregada com sucesso', 1800);
        await desabilitaTodosPanels($selectors);
        animateCSS($selectors.filter(a => a != '#cardCabecalho'), 'fadeInRight');
        newTransferencia = false;
        return;
    }

    const isFiltroOrcamentos = dxComp.switchFiltroProduto.option('value');

    const filtro = dxComp.radioFiltroProdutos.option('value');
    transferencia.FiltroProdutosString = isFiltroOrcamentos ? _enumFiltroProdutos.Origem : filtro;
    const keysOrcamentos = dxComp.gridOrcamentos.getSelectedRowKeys();

    if (isFiltroOrcamentos && keysOrcamentos.length == 0) {
        const resp = await DevExpress.ui.dialog.confirm("Não foi selecionado nenhum orçamento, deseja alterar o filtro para Produtos?", "Orçamentos");
        if (resp) {
            dxComp.switchFiltroProduto.option('value', false);
            return;
        }
        return;
    }

    const orcamentos = !isFiltroOrcamentos || keysOrcamentos.length == 0 ? null : keysOrcamentos;

    dxComp.loadPanelTransferencia.show();
    await transferencia.CreateUpdateTransferencia('create', null, orcamentos)
        .then(async () => {
            await LoadTransferenciaAlter(transferencia);
            //dxComp.gridProdutosTransferencia.updateDimensions();
        })
        .catch((error) => {
            PNotify.messages.error("Erro ao criar Transferência", `Erro ao criar nova Transferência: ${error.message}`);
            console.error(error.message);
            retornaMenuPrincipal();
        })
        .finally(() => dxComp.loadPanelTransferencia.hide());
}
async function iniciaCardConsultaGeral() {
    await parameters._get;
    if (!parameters.administrador && !parameters.usuario.Lg_Consulta_Transferencia) {
        messages.info('Acesso restrito', `Seu usuário ${parameters.usuario.Cd_Login.toUpperCase()} não tem acesso à consulta de transferências e será redirecionado ao menu central. \nParâmetro: "Consultar processos de transferência"`);
        return retornaMenuPrincipal();
    }
    dxComp.consultaGeral.gridConsultaGeral.deselectAll();
    dxComp.gridProdutosTransferencia.deselectAll();
    dataSources.produtosFiltro.get();
    dxComp.consultaGeral.btnAplicar._clickAction();
    dxComp.consultaGeral.filtroProduto.option('value', null);
    const $selectors = ['#cardCabecalho', '#cardConsultaGeral'];
    await desabilitaTodosPanels($selectors);
    animateCSS($selectors.filter(a => !$(a).is(':visible')), 'fadeInRight');
    FormatButtons();
}
async function iniciaCardTransferenciasTransito() {
    await parameters._get;
    if (!parameters.administrador && !parameters.usuario.Lg_Consulta_Transferencia) {
        messages.info('Acesso restrito', `Seu usuário ${parameters.usuario.Cd_Login.toUpperCase()} não tem acesso à consulta de transferências e será redirecionado ao menu central. \nParâmetro: "Consultar processos de transferência"`);
        return retornaMenuPrincipal();
    }
    dxComp.emTransito.gridConsultaTransito.deselectAll();
    dataSources.produtosFiltro.get();
    dxComp.emTransito.btnAplicar._clickAction();
    dxComp.emTransito.filtroProduto.option('value', null);
    const $selectors = ['#cardCabecalho', '#cardTransferenciasTransito'];
    await desabilitaTodosPanels($selectors);
    animateCSS($selectors.filter(a => !$(a).is(':visible')), 'fadeInRight');
    FormatButtons();
}
async function retornaMenuPrincipal() {
    const $selectors = ['#cardCabecalho', '#cardMenu', '#panelMenu'];
    await desabilitaTodosPanels($selectors);
    animateCSS($selectors.filter(a => !$(a).is(':visible')), 'fadeInRight');
    FormatButtons();
}
async function iniciaConfiguracoesGerais() {
    $('.accordion-toggle').collapse('toggle');
    const $selectors = ['#cardCabecalho', '#cardMenu', '#panelMenu', '#configuracoesGerais'];
    parameters.get(false).then(() => {
        if (dxComp.parameterGeral.radioFiltroProdutosConfiguracoes.option('value') != parameters.transferencia.FiltroProdutosString)
            dxComp.parameterGeral.radioFiltroProdutosConfiguracoes.option('value', parameters.transferencia.FiltroProdutosString)
    });
    await desabilitaTodosPanels($selectors);
    animateCSS($selectors.filter(a => !$(a).is(':visible')), 'fadeInRight');

    const height = $("#gridConfigAlmoxarifadoOrigemDestino").find("#dx-col-2").outerHeight();
    dxComp.parameterGeral.gridConfigAlmoxarifadoOrigemDestino.updateDimensions();
    $("#gridConfigAlmoxarifadoOrigemDestino").find(".dx-row.dx-column-lines.dx-header-row").css('height', height);
}
async function iniciaConfiguracoesUsuario() {
    $('#mensagemUsuarioAdministrador').slideUp();
    $('#mensagemUsuarioSemAcesso').slideUp();
    parameters.get(false);
    dxComp.parameterUser.lkp_Usuario_Configuracoes.option('value', null);
    dxComp.parameterUser.lkp_Usuario_Configuracoes.getDataSource().reload().then(() => dxComp.parameterUser.lkp_Usuario_Configuracoes.repaint());
    const $selectors = ['#cardCabecalho', '#cardMenu', '#panelMenu', '#configuracoesUsuario'];
    await desabilitaTodosPanels($selectors);
    animateCSS($selectors.filter(a => !$(a).is(':visible')), 'fadeInRight');
}
function carregaConfiguracoesUsuario(foto) {
    $('#fotoUsuarioConfiguracoes').attr('src', verificarSemFoto(foto));
    $('#accParametrosUsuario').show();
};
async function desabilitaTodosPanels(arrRemover) {
    $('.tooltipRow').detach();
    arrRemover = !Array.isArray(arrRemover) ? [arrRemover] : arrRemover;
    selectors = [
        '#cardCabecalho',
        '#labelProcessoTransferencia',
        '#filtroAlmoxarifados',
        '#filtroDestinatario',
        '#filtroProdutos',
        '#panelMenu',
        '#cardGridTransferencia',
        '#cardBotoesAcoesTransferencia',
        '#cardMenu',
        '#w3',
        '#cardConsultaGeral',
        '#cardTransferenciasTransito',
        '#configuracoesGerais',
        '#configuracoesUsuario'
    ].filter(a => !arrRemover.includes(a)).filter(a => $(a).is(':visible'));

    return new Promise(async (resolve, reject) => {
        let i = 1, $sel = $(selectors.join(','));
        if ($sel.length == 0) resolve();
        await animateCSS(selectors, 'fadeOutLeft', 'out');
        ScrollToTop();
        resolve();
    });
}
async function FormatButtons(retitaBlack = true) {
    let buttonsPrincipal = $("#panelMenu button").not('.btn-configs');
    if (retitaBlack) {
        $('#panelMenu button').removeClass('btn-dark')
        buttonsPrincipal.addClass('btn-block');
        $(".btn-configs").addClass('btn-default')
    }
    if (!$._data($('#panelMenu button')[0], 'events').click)
        $('#panelMenu button').on("click", a => {
            buttonsPrincipal.removeClass('btn-dark').addClass('btn-block');
            $(".btn-configs").removeClass('btn-dark').addClass('btn-default');
            if ($(a.currentTarget).hasClass('btn-configs'))
                $(a.currentTarget).removeClass('btn-default').addClass('btn-dark');
            else
                $(a.currentTarget).removeClass('btn-block').addClass('btn-dark');
        })

    await parameters._get;
    await dataSources.etapas._get;

    if (parameters.administrador)
        $(".btn-configs").fadeIn();

    if (dataSources.etapas.items.find(a => a.Id == _enumSituacaoTransferencia.EmTransito).Status)
        $("#TransferenciaTransito").removeAttr('disabled', 'title');
    else
        $("#TransferenciaTransito").attr({ disabled: "", title: "Sem permissão de acesso" });

    if (parameters.usuario.Lg_Consulta_Transferencia)
        $("#ConsultaGeral").removeAttr('disabled', 'title');
    else
        $("#TransferenciaTransito, #ConsultaGeral").attr({ disabled: "", title: "Sem permissão de acesso" });

    if (!parameters.usuario.Lg_Inclui_Transferencia)
        $("#NovaTransferencia").attr({ disabled: "", title: "Sem permissão de acesso" });

}
function getTemplateFoto(data, classe) {
    let $div = $('<div>')
        .addClass(classe)
        .css({
            alignItems: 'center',
            display: 'flex',
            gap: '8px'
        })
        .attr('id', data.Id)
        .append($('<img>')
            .addClass('rounded-circle')
            .attr({
                src: verificarSemFoto(data.URL_Foto),
                onError: `this.onerror=null;this.src='/img/fotos-usuarios/sem-foto-pesquisa.jpg';`,
            }))
        .append($('<div>')
            .css({
                flex: 'auto',
                textWrap: 'wrap'
            })
            .append($('<div>')
                .html(`${data.describe}`))
            .append($('<div>')
                .html(`${data.HasAccess || data.Administrador ? '' : '**Usuário sem acesso na transferência de mercadorias'}`)
                .addClass('mt-1')
                .css({
                    color: 'rgb(150, 0, 0, 0.6)',
                    fontSize: '11px',
                })))
        .append($(`<div>`)
            .dxButton({
                icon: "fas fa-plus",
                stylingMode: 'outlined',
                type: "default",
                visible: !data.HasAccess && !data.Administrador,
                hint: "Acessar controle de usuário",
                onClick: () => window.open(`/controleacesso/usuario?user=${data.Cd_Login.toLocaleLowerCase()}`),
            }));

    return $div;
}
function LoadFloatingActionButton() {
    DevExpress.config({
        floatingActionButtonConfig: {
            position: { at: "right bottom", my: "right bottom", offset: "-16 -75" }
        }
    });
    DevExpress.ui.repaintFloatingActionButton();
    dxComp.action = new DevExpress.ui.dxSpeedDialAction("#action", {
        icon: 'fa-solid fa-rotate fa-spin-custom-pulse',
        //icon: 'refresh',
    });
}
function LoadLabelTransferencia() {
    this.onChanged;
    this.transferenciaAtual = new Transferencia();

    const defineData = (status) => {
        if (!status) return moment(this.transferenciaAtual.DataElaboracao).format('DD/MM/YYYY HH:mm');
        const dateType = {
            [_enumSituacaoTransferencia.EmElaboracao]: "DataElaboracao",
            [_enumSituacaoTransferencia.EmTransito]: "DataEmissao",
            [_enumSituacaoTransferencia.Concluida]: "DataConclusao",
            [_enumSituacaoTransferencia.Cancelada]: "DataCancelamento",
            [_enumSituacaoTransferencia.Recusada]: "DataEmissao",
            [_enumSituacaoTransferencia.RecebidaEmAnalise]: "DataEmissao",
            [_enumSituacaoTransferencia.EmSeparacao]: "DataElaboracao",
        }[status];

        return moment(this.transferenciaAtual[dateType] ?? this.transferenciaAtual.DataElaboracao).format('DD/MM/YYYY HH:mm');
    }

    this.setTransferenciaAtual = (transferencia) => {
        if (transferencia instanceof Transferencia) {
            this.transferenciaAtual = transferencia;

            let dtCriacao = defineData(transferencia.StatusTransferencia);

            this.setDataCriacao(dtCriacao == null ? moment(transferencia.DataElaboracao) : dtCriacao);

            functionOnChanged('transferencia');
        }
    }

    this.getTransferenciaAtual = () => this.transferenciaAtual;

    let functionOnChanged = (operation) => {
        if (this.onChanged && typeof this.onChanged == 'function') {
            this.onChanged();
        }
        return operation;
    };

    const $id = $('#labelProcessoTransferencia');
    const $processo = $id.find('.card-title');
    const $dataCriacao = $id.find('.dataCriacao');
    const $status = $id.find('#infoPedido').children();

    this.isVisible = () => $id.is(':visible');

    this.setStatus = (statusSet) => {
        if (!_enumSituacaoTransferencia.IsEnum(statusSet)) return;
        $status.each((a, b) => {
            $(b).hide();
            if ($(b).data('value') === statusSet) $(b).show();
        })
        return functionOnChanged('status');
    }
    this.setProcesso = (processoSet) => {
        $processo.text(processoSet != '' ? '# ' + processoSet : '');
        return functionOnChanged('processo');
    }
    this.setDataCriacao = (dataCriacaoSet) => {
        $dataCriacao.text(dataCriacaoSet);
        return functionOnChanged('dataCriacao');
    }

    this.apply = () => {
        const transferencia = this.transferenciaAtual;
        if (![transferencia.IdProcesso, transferencia.DataElaboracao, transferencia.StatusTransferencia].every(prop => prop != undefined || prop != null)) {
            console.error('Valor null ou undefined', transferencia.IdProcesso, transferencia.DataElaboracao, transferencia.StatusTransferencia);
            return;
        }
        this.setProcesso(transferencia.IdProcesso);
        this.setDataCriacao(defineData(transferencia.StatusTransferencia));
        this.setStatus(transferencia.StatusTransferencia);
    };

    this.show = (callback) => {
        $id.fadeIn(400, () => {
            if (typeof callback == 'function') callback();
        });
        return functionOnChanged('show');
    }
    this.hide = (callback) => {
        $id.fadeOut(400, () => {
            if (typeof callback == 'function') callback();
        });
        return functionOnChanged('hide');
    }
    this.hide();
}
async function LoadTransferenciaAlter(transferencia) {
    const parans = parameters.get();
    const label = dxComp.labelTransferencia;
    label.transferenciaAtual = new Transferencia();

    if (transferencia instanceof Transferencia) {
        label.transferenciaAtual = transferencia;
        return Carregar(transferencia);
    }

    if (!transferencia) return;

    return await label.transferenciaAtual.GetTransferencia(transferencia)
        .then(async (result) => {
            label.transferenciaAtual.SetByKeyValue(result);
            return Carregar(label.transferenciaAtual);
        })
        .catch((error) => {
            messages.error("Erro ao recuperar transferência", error);
        });
    function Carregar(processo) {
        return new Promise(async (resolve) => {
            await parans;

            label.apply();

            const remetente = LoadCabecalhoTransferencia("remetente", processo);

            const destinatario = LoadCabecalhoTransferencia("destinatario", processo);

            const wizard = dxComp.evolucao.wizard.selectByEnum(processo.StatusTransferencia);

            const toolbar = dxComp.toolbarAcoesProcesso.toolbar.configurar(processo.StatusTransferencia);

            dxComp.gridBoxProdutos.configuraBySituacao(processo.StatusTransferencia);

            dxComp.gridBoxProdutos.dataGridSelecaoProdutos.reloadDataSource(processo.AlmoxarifadoOrigem, processo.AlmoxarifadoDestino, !parameters?.transferencia?.Lg_Permite_Transferencia_Estoque_Negativo ?? true);

            dxComp.gridProdutosTransferencia.adicionaProdutos(processo);

            dxComp.gridProdutosTransferencia.updateButtonsBySituacao(processo.StatusTransferencia);

            dxComp.gridProdutosTransferencia.updateEditing(processo.StatusTransferencia);

            const trocaDestinatario = dxComp.btnTrocarDestinatario.configBySituacao(processo.StatusTransferencia);

            await Promise.all([trocaDestinatario, remetente, destinatario, wizard, toolbar]);

            CriaProcessoTransferencia('LoadNewTransferencia').finally(() => resolve());

            const atualProcess = dataSources.consultaGeral.items.find(a => a.IdProcesso == processo.IdProcesso);
            $.each(atualProcess, (a) => atualProcess[a] = processo[a]);
            if (dxComp.consultaGeral.gridConsultaGeral)
                dxComp.consultaGeral.gridConsultaGeral.getDataSource().reload();
        });
    };
}
function ScrollToTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}
function LoadCabecalhoTransferencia(tipo, processo) {
    return new Promise((resolve) => {
        this.$main = $(`#${tipo}`)

        this.$almoxarifado = this.$main.find(tipo == 'destinatario' ? '#idAlmoxarifadoDestino' : '#idAlmoxarifadoOrigem');
        this.$foto = this.$main.find(tipo == 'destinatario' ? '#imgDestinatario' : '#imgRemetente');
        this.$nome = this.$main.find('#idNome');

        this.$almoxarifado.text(processo.almoxarifado);
        if (!processo.Remetente && tipo == 'remetente') {
            $.ajax({
                url: `/Estoque/Transferencias/RemetenteTransferencia/${processo.IdProcesso}`,
                method: 'PUT',
                data: { login: processo.NomeElaboracao, },
                success: (result) => {
                    processo.SetByKeyValue(result.data);
                },
                error: (jqXHR) => {
                    //TODO: criar falha aoa fazer o update
                    //const [status, msg, data] = [`Status: ${jqXHR.status}`, jqXHR.responseJSON?.msg || '', jqXHR.responseJSON?.data || ''];
                    //reject(new Error(`${status}${msg == '' ? msg : ` - ${msg}`}${data == '' ? data : ` | ${data}`}`));
                },
            });
            this.user = parameters.listUsuario.find(a => a.Cd_Login == processo.NomeElaboracao.toUpperCase());
            this.$foto.attr('src', verificarSemFoto(this.user.URL_Foto));
            this.$nome.text(this.user.Nome + ' [Emitente]');
            return;
        }
        this.$foto.attr('src', verificarSemFoto((tipo == 'destinatario' ? processo.FotoDestinatario : processo.FotoRemetente)));
        this.$nome.text(tipo == 'destinatario' ? processo.Destinatario : processo.Remetente);
        resolve();
    });

}
function convertImageToBase64(imageUrl) {
    return new Promise(async (resolve, reject) => {
        await fetch(imageUrl).then(async (response) => {
            if (response.status != 200)
                reject(new Error("Failed to fetch image."));
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(await response.blob());
        });
    });
}

let acompanhamento = new CreateAcompanhamentoProcessos();
function CreateAcompanhamentoProcessos() {
    this.conclusao = [];
    this.envio = [];
    this.remove = (proc, processo) => {
        let arr = this[proc];
        if (!Array.isArray(arr))
            return this;
        if (processo)
            this[proc] = arr.filter(p => p != processo)
        return this;
    };
    this.exists = (proc, processo) => {
        const arr = this[proc];
        if (!Array.isArray(arr))
            return this;
        return arr.includes(processo);
    }
    this.add = (proc, processo) => {
        const arr = this[proc];
        if (!Array.isArray(arr))
            return this;
        if (processo && !arr.includes(processo))
            arr.push(processo);
        return this;
    }
}

class Transferencia {
    IdProcesso;
    AlmoxarifadoOrigem;
    AlmoxarifadoDestino;
    Remetente;
    FotoRemetente;
    Destinatario;
    FotoDestinatario;
    NomeEmissao
    DataEmissao;
    NomeConclusao;
    DataConclusao;
    NomeCancelamento;
    DataCancelamento;
    NomeElaboracao;
    DataElaboracao;
    StatusTransferencia;
    Observacao;
    MotivoCancelamento;
    MotivoRecusa;
    RegraMovimentacaoEstoque;
    IsProcessamento;
    FiltroProdutosString;
    Produtos = [];

    get ProdutosArray() {
        return this.Produtos.map(a => a.KeyValueToObject());
    }

    KeyValue = (keysWithValue = false) => Object.entries(this)
        .filter(a => typeof (a[1]) != 'function')
        .filter(a => {
            if (keysWithValue) return a[1] != null;
            return a;
        })

    AddProduto = (produto, limpar = false) => {
        produto = isArray(produto) ? produto : [produto];
        if (limpar)
            this.Produtos = new Array();
        if (produto.filter(a => !(a instanceof ProdutoTransferencia)).length > 0) {
            console.error('Produtos inválidos', produto.filter(a => !(a instanceof ProdutoTransferencia)));
            return;
        }
        this.Produtos.push(...produto);
    };

    ConcluirTransferencia = (callback, verificarProgresso = true) => {
        let complete = false;
        const new_callback = (data) => {
            const result = callback(data);
            if (result)
                return result;
            return complete;
        }
        if (acompanhamento.exists('conclusao', this.IdProcesso)) {
            return this.ConcluirTransferencia.promise;
        }
        this.ConcluirTransferencia.promise = new Promise(async (resolve, reject) => {
            acompanhamento.add('conclusao', this.IdProcesso)
            const key = this.criarKeyProgresso();
            $.ajax({
                type: 'PUT',
                url: `/Estoque/Transferencias/${this.IdProcesso}/Concluir`,
                data: { wsId: key },
                success: (result) => {
                    complete = true;
                    resolve(result);
                },
                error: (jqXHR) => {
                    const [status, msg, data] = [`Status: ${jqXHR.status}`, jqXHR.responseJSON?.msg || '', jqXHR.responseJSON?.data || ''];
                    reject(new Error(`${status}${msg == '' ? msg : ` - ${msg}`}${data == '' ? data : ` | ${data}`}`));
                },
                complete() {
                    acompanhamento.remove('conclusao', this.IdProcesso);
                }
            });
            if (verificarProgresso)
                Transferencia.startVerificacaoProgresso(typeof new_callback == 'function' ? { callback: new_callback, key } : {});
        });
        return this.ConcluirTransferencia.promise;
    };

    static PreencherQuantidadesPorAlmoxOrigem = (processo, produtos = []) => {
        produtos = isArray(produtos) ? produtos : [produtos];
        this.PreencherQuantidadesPorAlmoxOrigem.promise = new Promise((resolve, reject) => {
            if (!processo || processo == "") {
                reject(new Error("Faltando processo para realizar o preenchimento de estoque"));
                return;
            }
            fetch(`Transferencias/PreencherQuantidadesPorAlmoxOrigem/${processo}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produtos.length == 0 ? [] : produtos),
            })
                .then(result => result.json())
                .then(result => resolve(result));
        });
        return this.PreencherQuantidadesPorAlmoxOrigem.promise;
    }

    static ReceberTransferencia = (processos) => {
        processos = isArray(processos) ? processos : [processos];
        this.ReceberTransferencia.promise = new Promise((resolve, reject) => {
            if (processos.length == 0) {
                reject("Faltando processos para realizar o recebimento");
                return;
            }
            $.ajax({
                type: 'PUT',
                url: `/Estoque/Transferencias/Receber`,
                data: { processos },
                success: (result) => {
                    resolve(result);
                },
                error: (jqXHR) => {
                    const [status, msg, data] = [`Status: ${jqXHR.status}`, jqXHR.responseJSON?.msg || '', jqXHR.responseJSON?.data || ''];
                    reject(new Error(`${status}${msg == '' ? msg : ` - ${msg}`}${data == '' ? data : ` | ${data}`}`));
                }
            });
        });
        return this.ReceberTransferencia.promise;
    };

    static SepararTransferencia = function (processos) {
        processos = isArray(processos) ? processos : [processos];
        this.promise = new Promise((resolve, reject) => {
            if (processos.length == 0) {
                reject("Faltando processos enviar para separação");
                return;
            }
            fetch('/Estoque/Transferencias/Separar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(processos),
            })
                .then(async (res) => {
                    const parseResponse = await res.json();
                    if (res.ok) {
                        resolve(parseResponse);
                        return;
                    }
                    reject(parseResponse?.msg)
                })
                .catch((err) => reject(err.message));
        });
        return this.promise;
    }

    static RecusarTransferencia = (processos, motivo, callback, verificarProgresso = true) => {
        let complete = false;
        const new_callback = (data) => {
            const result = callback(data);
            if (result)
                return result;
            return complete;
        }
        processos = isArray(processos) ? processos : [processos];
        const key = Transferencia.createKey();
        return new Promise((resolve, reject) => {
            if (processos.length == 0) {
                reject(new Error("Faltando processos para realizar a recusa"));
                return;
            }
            $.ajax({
                type: 'PUT',
                url: `/Estoque/Transferencias/Recusar`,
                data: { processos, motivo, id: key },
                success: (result) => {
                    complete = true;
                    resolve(result);
                },
                error: (jqXHR) => {
                    complete = true;
                    const [status, msg, data] = [`Status: ${jqXHR.status}`, jqXHR.responseJSON?.msg || '', jqXHR.responseJSON?.data || ''];
                    reject(new Error(`${status}${msg == '' ? msg : ` - ${msg}`}${data == '' ? data : ` | ${data}`}`));
                }
            });
            if (verificarProgresso) {
                Transferencia.startVerificacaoProgresso(typeof new_callback == 'function' ? { timeout: 1, callback: new_callback, key } : {});
            }
        });
    };

    static CancelarTransferencia = (processos, motivo) => {
        processos = isArray(processos) ? processos : [processos];
        this.CancelarTransferencia.promise = new Promise((resolve, reject) => {
            if (processos.length == 0) {
                reject(new Error("Faltando processos para realizar o cancelamento"));
                return;
            }
            $.ajax({
                type: 'PUT',
                url: `/Estoque/Transferencias/Cancelar`,
                data: { processos, motivo },
                success: (result) => {
                    resolve(result);
                },
                error: (jqXHR) => {
                    const [status, msg, data] = [`Status: ${jqXHR.status}`, jqXHR.responseJSON?.msg || '', jqXHR.responseJSON?.data || ''];
                    reject(new Error(`${status}${msg == '' ? msg : ` - ${msg}`}${data == '' ? data : ` | ${data}`}`));
                }
            });
        });
        return this.CancelarTransferencia.promise;
    };

    static ReplicarTransferencia = (processo, apenasSemQuantidade = false, destinatario, observacao) => {
        this.ReplicarTransferencia.promise = new Promise((resolve, reject) => {
            if (!processo) {
                reject(new Error("Faltando número do processo paa replicar"));
                return;
            }
            $.ajax({
                type: 'POST',
                url: `/Estoque/Transferencias/${processo}/Replicar`,
                data: { processo, apenasSemQuantidade, destinatario, observacao },
                success: (result) => {
                    resolve(result.data);
                },
                error: (jqXHR) => {
                    const [status, msg, data] = [`Status: ${jqXHR.status}`, jqXHR.responseJSON?.msg || '', jqXHR.responseJSON?.data || ''];
                    reject(new Error(`${status}${msg == '' ? msg : ` - ${msg}`}${data == '' ? data : ` | ${data}`}`));
                }
            });
        });
        return this.ReplicarTransferencia.promise;
    };

    EnviarTransferencia = (callback, verificarProgresso = true) => {
        let complete = false;
        const new_callback = (data) => {
            const result = callback(data);
            if (result)
                return result;
            return complete;
        }
        if (acompanhamento.exists('envio', this.IdProcesso)) {
            return this.EnviarTransferencia.promise;
        }
        this.EnviarTransferencia.promise = new Promise(async (resolve, reject) => {
            if (![_enumSituacaoTransferencia.EmElaboracao, _enumSituacaoTransferencia.EmSeparacao].includes(this.StatusTransferencia))
                reject(new Error(`O Status atual da Transferência (${this.StatusTransferencia} - ${_enumSituacaoTransferencia.GetName(this.StatusTransferencia)}) não permite o envio da mesma, ela precisa ser 1 - Em elaboração`));
            acompanhamento.add('envio', this.IdProcesso);
            const key = this.criarKeyProgresso()
            $.ajax({
                type: 'PUT',
                url: `/Estoque/Transferencias/${this.IdProcesso}/Enviar`,
                data: { wsId: key },
                success: (result) => {
                    complete = true;
                    this.SetByKeyValue(result.data);
                    resolve(result.data);
                },
                error: (jqXHR) => {
                    complete = true;
                    const [status, msg, data] = [`Status: ${jqXHR.status}`, jqXHR.responseJSON?.msg || '', jqXHR.responseJSON?.data || ''];
                    reject(new Error(`${status}${msg == '' ? msg : ` - ${msg}`}${data == '' ? data : ` | ${data}`}`));
                },
                complete() {
                    acompanhamento.remove('envio', this.IdProcesso);
                }
            });
            if (verificarProgresso)
                Transferencia.startVerificacaoProgresso(typeof new_callback == 'function' ? { callback: new_callback, key } : {});
        });
        return this.EnviarTransferencia.promise;
    };

    static async checkProgresso(key) {
        const result = await fetch(`${window.location.origin}/Estoque/Transferencias/Progresso/${key}`)
            .then(a => a.json())
            .then(a => a)
            .catch(error => `Erro ao tentar verificar o processo: ${error}`);
        return result;
    };

    static createKey() {
        return (new DevExpress.data.Guid()).toString();
    }
    criarKeyProgresso() {
        return Transferencia.createKey();
    }

    static async startVerificacaoProgresso({ timeout = 50, callback, key } = {}) {
        try {
            const { DataResult } = await Transferencia.checkProgresso(key);
            if (callback && typeof callback == 'function') {
                const result = callback(DataResult);
                if (result) {
                    return;
                }
            }
            if (DataResult.Porcentagem >= 100) {
                return;
            }
        } catch (error) {
            console.error(`Erro ao verificar progresso. ${error}`);
        }
        setTimeout(async () => await Transferencia.startVerificacaoProgresso({ timeout, callback, key }), timeout);
    }

    DeleteProduto = (produtos) => {
        produtos = isArray(produtos) ? produtos : Array(produtos);
        const products = produtos.map((a) => Object({
            Produto: a.Id,
            Lote: a.Lote || '0',
        }));
        this.DeleteProduto.promise = new Promise(async (resolve, reject) => {
            const quantidadeProdutos = 200;
            for (var i = 0; i < products.length / quantidadeProdutos; i++) {
                const prods = products.slice(i * quantidadeProdutos, quantidadeProdutos * (i + 1));
                await $.ajax({
                    type: 'DELETE',
                    url: `/Estoque/Transferencias/${this.IdProcesso}/Produto`,
                    data: { produtos: prods, withReturn: i + 1 > products.length / quantidadeProdutos },
                    success: (result) => {
                        if (i + 1 > products.length / quantidadeProdutos) {
                            this.Produtos = result.data.map((a) => new ProdutoTransferencia(a));
                            resolve(result.data);
                        }
                    },
                    error: (jqXHR) => {
                        const [status, msg, data] = [`Status: ${jqXHR.status}`, jqXHR.responseJSON?.msg || '', jqXHR.responseJSON?.data || ''];
                        reject(`${status}${msg == '' ? msg : ` - ${msg}`}${data == '' ? data : ` | ${data}`}`);
                    },
                })
            }
        });
        return this.DeleteProduto.promise;
    };

    ZerarQuantidades = (produtos) => {
        produtos = isArray(produtos) ? produtos : [produtos];
        this.ZerarQuantidades.promise = new Promise((resolve, reject) => {
            const msgError = [];

            if (produtos.length == 0)
                resolve([]);

            produtos.forEach(async (a, index) => {
                if (!Object(a).hasOwnProperty('Id')) {
                    msgError.push("Faltando código do produto");
                    return;
                }
                a.Lote = a.Lote || '0';
                await this.UpdateQuantidade(a.Id, a.Lote, 0)
                    .catch((error) => {
                        msgError.push(`Produto: ${a.Id} | Lote ${a.Lote}, ${error}`);
                    });
                if (index + 1 == produtos.length) {
                    if (msgError.length > 0) {
                        reject(msgError.join(', '));
                        return;
                    }
                    resolve(this.Produtos);
                }
            });
        });
        return this.ZerarQuantidades.promise;
    };

    UpdateQuantidade = (produto, lote, quantidade) => {
        const prod = this.Produtos.find((a) => a.IdProduto == produto && a.Lote == lote);
        prod.Quantidade = quantidade;
        const produtoTransferencia = new ProdutoTransferencia(prod)
        produtoTransferencia.Changes = ['Quantidade'];
        return this.UpdateProduto(produtoTransferencia.KeyValueToObject());
    };

    UpdateProduto = (produto) => {
        if (produto.length == 0) return;
        this.UpdateProduto.promise = new Promise((resolve, reject) => {
            $.ajax({
                type: 'PUT',
                url: `/Estoque/Transferencias/${this.IdProcesso}/Produto`,
                data: JSON.stringify(produto),
                dataType: "json",
                contentType: "application/json",
                success: (result) => {
                    this.Produtos = this.Produtos.map(a => new ProdutoTransferencia(a));
                    const newProduct = new ProdutoTransferencia(result.data);
                    const index = this.Produtos.findIndex((a) => a.IdProduto == newProduct.IdProduto && a.Lote == newProduct.Lote)
                    this.Produtos[index] = newProduct;
                    resolve(result);
                },
                error: (jqXHR) => {
                    const [status, msg, data] = [`Status: ${jqXHR.status}`, jqXHR.responseJSON?.msg || '', jqXHR.responseJSON?.data || ''];
                    reject(`${status}${msg && ' - ' + msg}${data && ' - ' + data}`);
                }
            });
        });
        return this.UpdateProduto.promise;
    };

    SetDestinatario = (destinatario) => {
        this.SetDestinatario.promise =
            new Promise((resolve, reject) => {
                $.ajax({
                    type: 'PUT',
                    url: `/Estoque/Transferencias/${this.IdProcesso}/Destinatario`,
                    data: { destinatario: destinatario },
                    success: (result) => {
                        this.Destinatario = result.data;
                        resolve(result);
                    },
                    error: (jqXHR) => {
                        const [status, msg, data] = [`Status: ${jqXHR.status}`, jqXHR.responseJSON?.msg || '', jqXHR.responseJSON?.data || ''];
                        reject(new Error(`${status}${msg == '' ? msg : ` - ${msg}`}${data == '' ? data : ` | ${data}`}`));
                    }
                });
            });
        return this.SetDestinatario.promise;
    };

    SetObservacao = (observacao) => {
        this.SetObservacao.promise =
            new Promise((resolve, reject) => {
                $.ajax({
                    type: 'PUT',
                    url: `/Estoque/Transferencias/${this.IdProcesso}/Observacao`,
                    data: { obs: observacao },
                    success: (result) => {
                        this.Observacao = result.data;
                        resolve(result);
                    },
                    error: (jqXHR) => {
                        const [status, msg, data] = [`Status: ${jqXHR.status}`, jqXHR.responseJSON?.msg || '', jqXHR.responseJSON?.data || ''];
                        reject(new Error(`${status}${msg == '' ? msg : ` - ${msg}`}${data == '' ? data : ` | ${data}`}`));
                    }
                });
            })
        return this.SetObservacao.promise;
    };

    SetFiltroProdutos = (filtro) => {
        this.SetFiltroProdutos.promise =
            new Promise((resolve, reject) => {
                $.ajax({
                    type: 'PUT',
                    url: `/Estoque/Transferencias/${this.IdProcesso}/FiltroProdutos/`,
                    data: { filtro: filtro },
                    success: (result) => {
                        this.FiltroProdutosString = result.data;
                        resolve(result);
                    },
                    error: (jqXHR) => {
                        const [status, msg, data] = [`Status: ${jqXHR.status}`, jqXHR.responseJSON?.msg || '', jqXHR.responseJSON?.data || ''];
                        reject(new Error(`${status}${msg == '' ? msg : ` - ${msg}`}${data == '' ? data : ` | ${data}`}`));
                    },
                });
            });
        return this.SetFiltroProdutos.promise;
    };

    GetTransferencia = (processo = this.IdProcesso) => {
        if (!processo)
            return new Error("Faltando IdProcesso para recuperar transferência");
        this.GetTransferencia.promise =
            new Promise((resolve, reject) =>
                $.getJSON(`/Estoque/Transferencias/${processo}`)
                    .done(result => resolve(result))
                    .fail(error => reject(error)));
        return this.GetTransferencia.promise;
    };

    SetByKeyValue = (objTransferencia) => {
        this.KeyValue().forEach((a) => {
            this[a[0]] = objTransferencia[a[0]];
        })
        this.Produtos = this.Produtos.map((a) => new ProdutoTransferencia(a));
    };

    CreateProdutos = (callback) => {
        this.Produtos = this.Produtos.map((a) => new ProdutoTransferencia(a));
        const products = this.Produtos.map((a) => Object.fromEntries(Object.entries(a.KeyValueToObject()).filter(q => q[1])));
        this.CreateProdutos.promise =
            new Promise(async (resolve, reject) => {
                const quantidadeProdutos = 200;
                let msgErrors = [];
                for (var i = 0; i < products.length / quantidadeProdutos; i++) {
                    const prods = products
                        .slice(i * quantidadeProdutos, quantidadeProdutos * (i + 1))
                    await $.ajax({
                        type: 'POST',
                        url: `/Estoque/Transferencias/${this.IdProcesso}/Produtos?withReturn=${i + 1 > products.length / quantidadeProdutos}`,
                        data: JSON.stringify(prods),
                        dataType: "json",
                        contentType: "application/json",
                        success: (result) => {
                            if (i + 1 > products.length / quantidadeProdutos) {
                                this.Produtos = result.data.map((a) => new ProdutoTransferencia(a));
                                resolve(result.data);
                            }
                            if (callback && typeof callback == "function") {
                                callback({ prods, quantidadeProdutos });
                            }
                        },
                        error: (jqXHR) => {
                            const [status, msg, data] = [`Status: ${jqXHR.status}`, jqXHR.responseJSON?.msg || '', jqXHR.responseJSON?.data || ''];
                            msgErrors.push(`${status}${msg == '' ? msg : ` - ${msg}`}${data == '' ? data : ` | ${data}`}`);
                        },
                    })
                    if (msgErrors.length > 0) {
                        reject(new Error(msgErrors.join(', ')))
                    }
                }
            });
        return this.CreateProdutos.promise;
    };

    CreateUpdateTransferencia = (operacao = 'create', alters, orcamentos) => { //TODO: continuar daqui vendo o orçamentos
        if (operacao != 'create' && this.IdProcesso == null) return new Error("Faltando IdProcesso para processar transferência");
        alters = (isArray(alters) ? alters : Array(alters)).map((a) => String(a));
        orcamentos = Array.isArray(orcamentos) ? orcamentos : [orcamentos];
        this.CreateUpdateTransferencia.promise =
            new Promise(async (resolve, reject) => {
                $.ajax({
                    type: operacao == 'create' ? 'POST' : 'PUT',
                    url: `/Estoque/Transferencias/${operacao == 'create' ? '' : `${this.IdProcesso}`}`,
                    data: {
                        newTransferencia: {
                            IdProcesso: this.IdProcesso,
                            AlmoxarifadoOrigem: this.AlmoxarifadoOrigem,
                            AlmoxarifadoDestino: this.AlmoxarifadoDestino,
                            Remetente: this.Remetente,
                            Destinatario: this.Destinatario,
                            Cd_Situacao_Transferencia: this.StatusTransferencia,
                            Observacao: this.Observacao,
                            MotivoCancelamento: this.MotivoCancelamento,
                            MotivoRecusa: this.MotivoRecusa,
                            FiltroProdutosString: this.FiltroProdutosString,
                        },
                        changes: alters,
                        orcamentos,
                    },
                    success: (result) => {
                        this.SetByKeyValue(result.data);
                        this.CreateUpdateTransferencia.promise.status = 'success';
                        resolve(result.data);
                    },
                    error: (jqXHR) => {
                        this.CreateUpdateTransferencia.promise.status = 'error';
                        const [status, msg, data] = [`Status: ${jqXHR.status}`, jqXHR.responseJSON?.msg || '', jqXHR.responseJSON?.data || ''];
                        reject(new Error(`${status}${msg == '' ? msg : ` - ${msg}`}${data == '' ? data : ` | ${data}`}`));
                    }
                })
            });
        return this.CreateUpdateTransferencia.promise;
    };
}
class ProdutoTransferencia {
    Processo;
    Sequencia;
    IsTransferido;
    IsEstornado;
    IdProduto;
    Lote;
    Quantidade;
    ProdutoGeral;
    Changes = [];

    constructor(produto = null) {
        if (produto)
            this.SetByKeyValueProduto(produto);
    }

    KeyValueProduto = (keysWithValue = false) => Object.entries(this)
        .filter(a => typeof (a[1]) != 'function')
        .filter(a => {
            if (keysWithValue) return a[1] != null;
            return a;
        });

    SetByKeyValueProduto = (produto) => {
        this.KeyValueProduto().forEach((a) => {
            this[a[0]] = produto[a[0]];
        })
    };

    KeyValueToObject = () => this.KeyValueProduto()
        .map(a => {
            let b = {};
            b[a[0]] = a[1];
            return b
        })
        .reduce((objetoAcumulado, objetoAtual) => {
            return { ...objetoAcumulado, ...objetoAtual };
        }, {});


}