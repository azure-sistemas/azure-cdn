/// <reference path="../../../properties/referencesdevexpress/dx.all.d.ts" />
/// <reference path="../../../properties/referencesdevexpress/jquery.d.ts" />

const dataSources = new CreateDataSources();
const dxComp = new Init();

function CreateDataSources() {
    const fetchData = (url, method, data, callback) => new Promise((resolve, reject) => {
        const fetchOptions = {
            method: method ?? 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };
        fetch(url, fetchOptions)
            .then(async (result) => {
                if (result.ok) {
                    return result.json();
                }
                throw result.json();
            })
            .then(res => {
                if (callback && typeof callback == 'function') {
                    try {
                        resolve(callback(res));
                    } catch (e) {
                        throw new Error(`Erro ao processar da dados. URL: ${url}, METODO: ${optionsFetch?.method ?? 'GET'}`);
                    }
                    return;
                }
                resolve(res);
            })
            .catch(erro => reject(erro))
    });

    this.quadroAviso = {
        url: "suporte/quadroAvisos",
        get() {
            this.promiseGet = new Promise((resolve, reject) => {
                fetchData(this.url)
                    .then(result => resolve(result.DataResult))
                    .catch(erro => reject(erro))
            });
            return this.promiseGet;
        },
        update(id, status) {
            this.promiseUpdate = fetchData(this.url, "PUT", { id, status });
            return this.promiseUpdate;
        }
    }

    this.fetchData = fetchData;
}

function Init() {
    const onGetQuadro = (data) => {
        const $template = $('#quadroAvisosTemplate')
        const $avisos = $('#avisos');

        for (let item of data) {
            const inicio = moment(item.DtInicio);
            item.DtInicioFormatada = inicio.isValid() ? inicio.format('DD/MM/YYYY') : '-';

            const fim = moment(item.DtFim)
            item.DtFimFormatada = fim.isValid() ? fim.format('DD/MM/YYYY') : '-';

            item.UrlFormatado = item.Url ? `${item.Url.substring(0, 50)}...` : '';

            item.ArquivoImagem = "/img/quadro-avisos/" + item.ArquivoImagem;
            const mu = mustache.render($template.html(), item);
            const $mu = $(mu);

            item.switch = new DevExpress.ui.dxSwitch($mu.find(`#switch_${item.Id}`), {
                width: 98,
                value: item.Status ?? false,
                switchedOffText: "Desativado",
                switchedOnText: "Ativado",
                onValueChanged({ value }) {
                    dataSources.quadroAviso.update(item.Id, value)
                        .then(() => {
                            _ = new PNotify({
                                title: "Alteração de parâmetro",
                                text: `Parâmetro alterado com sucesso`,
                                type: "success",
                                delay: 2500
                            })
                        });
                }
            });

            $avisos.append($mu);
        }
    }

    dataSources.quadroAviso.get().then(onGetQuadro);
}
