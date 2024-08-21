/**
 * 
 * @param {Array<string>} selectors
 */
export default function azureAnimate(...selectors, animateIn = 'fadeInRight', animateOut = 'fadeOutLeft') {
    this.animateIn = animateIn;
    this.animateOut = animateOut;
    this.mainSelectors = selectors;
    this.desableSelectors = (...inputSelectors, callback) =>
        new Promise(async (resolve, reject) => {
            if (!window.jQuery)
                reject("Faltando jQuery");
            const sels = this.mainSelectors.filter(a => !inputSelectors.includes(a)).filter(a => $(a).is(':visible'));
            let i = 1, $sel = $(sels.join(','));
            if ($sel.length == 0)
                resolve();
            await this.animateCSS(sels, this.animateOut, 'out');
            if (typeof callback == 'function')
                callback();
            reolve();
        })
    this.enableSelectors = (...selectors) => this.animateCSS(selectors.filter(a => !$(a).is(':visible')), this.animateIn);

    this.animateCSS = (...elements, animation, operacao = 'in', duration = 400, prefix = 'animate__') =>
        new Promise((resolve) => {
            const animationName = `${prefix}${animation}`;

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
                    if (operacao == 'out') $(element).hide();
                    if (index == elements.length - 1) resolve('Animation ended');
                }
            });
        });
}