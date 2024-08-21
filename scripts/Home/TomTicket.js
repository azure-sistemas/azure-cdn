export default function tom(cdEmpresa) {

    const tomTicketChat = {
        $widget() {
            return $('#comTomTicketChatWidget')
                .on('click', () => this.intervalTom())
        },
        widgetExists() {
            return this.$widget().length > 0;
        },
        $status: () => $('#comTomTicketChatWidget .tomticketChat-status'),
        statusExists() {
            return this.$status().length > 0;
        },
        $frame: () => $('#comTomTicketChatFrame'),
        frameExists() {
            return this.$frame().length > 0;
        },
        get$ByContentInput(input) {
            return this.$frame().contents().find("#content").find(input);
        },
        $frameEmpresa() {
            return this.get$ByContentInput("input[placeholder='Código da Empresa']");
        },
        $frameEmail() {
            return this.get$ByContentInput("input[placeholder='E-mail']");
        },
        $frameNome() {
            return this.get$ByContentInput("input[placeholder='Nome']");
        },
        async configure$Frame() {
            const { nome, email, empresa } = await this.getResults();
            this.$frameEmpresa()
                .val(empresa)
                .attr('disabled', 'disabled');
            this.$frameNome()
                .val(nome)
                .attr('disabled', 'disabled');
            const emailAtual = this.$frameEmail().val() || this.$frameEmail().text();
            if (!emailAtual)
                this.$frameEmail().val(email?.split(';')[0]);
        },
        fetchUserTomTicket: fetch('/Usuario/GetDadosUsuario', { method: 'POST' })
            .then(async (res) => await res.json())
            .then(res => res),
        async getResults() {
            const [res] = await this.fetchUserTomTicket;
            return {
                nome: res.DS_NOME,
                empresa: cdEmpresa,
                email: res.DS_EMAIL
            };
        },
        fnInterval() {
            if (tomTicketChat.widgetExists()) {
                tomTicketChat.$widget()
                    .css({
                        minWidth: '51px',
                        backgroundColor: 'rgb(42, 68, 93, 0.6)',
                    })
                    .find('.tomticketChat-status')
                    .fadeOut();
            }

            if (!tomTicketChat.statusExists() || tomTicketChat?.mutObserver) {
                return;
            }

            tomTicketChat.mutObserver = true;
            new MutationObserver((mutations) => {
                const mutationsFilter = mutations.filter(mut => mut.attributeName == 'class');
                for (let i = 0; i < mutationsFilter.length; i++) {
                    const mutation = mutationsFilter[i];
                    let interval;
                    if (mutation.target.className.includes('tt-fadeInUp')) {
                        interval = setInterval(() => {
                            tomTicketChat.configure$Frame();
                        }, 500)
                        break;
                    }
                    clearInterval(interval);
                    break;
                }
            }).observe($('#comTomTicketChatContainer')[0], {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: true,
                characterDataOldValue: true,
                attributeOldValue: true,
            });
        },
        excutingInterval: false,
        intervalTom() {
            if (this.excutingInterval)
                return;
            this.excutingInterval = true;
            this.fnInterval();
            this.interval = setInterval(this.fnInterval, 2 * 1000);
            return this;
        },
    };

    return tomTicketChat;
}
