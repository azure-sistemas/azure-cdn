const animateCSS = (elements, animation, operacao = 'in', duration = 400, prefix = 'animate__') =>
    new Promise((resolve) => {
        elements = !isArray(elements) ? [elements] : elements;
        const animationName = `${prefix}${animation}`;

        elements.forEach((element, index) => {
            const node = document.querySelector(element);
            node.style.animationDuration = `${duration}ms`;
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
        });
    });

const animate = function () {
    this.allSelectors = [];
    this.desabilitaTodosSelectors = (arrRemover) => {
        arrRemover = !Array.isArray(arrRemover) ? [arrRemover] : arrRemover;
        if (!Array.isArray(this.allSelectors)) throw new Error('Faltando seletores padrões')
        let selectors = this.allSelectors.filter(a => !arrRemover.includes(a)).filter(a => $(a).is(':visible'));
        return new Promise(async (resolve) => {
            let $sel = $(selectors.join(','));
            if ($sel.length == 0) resolve();
            await animateCSS(selectors, 'fadeOutLeft', 'out');
            resolve();
        });
    };
}

export { animate };