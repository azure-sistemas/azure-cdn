//Inclusão de função callback para o addClass do jQuery
var oAddClass = $.fn.addClass;
$.fn.addClass = function () {
    for (var i in arguments) {
        var arg = arguments[i];
        if (!!(arg && arg.constructor && arg.call && arg.apply)) {
            arg();
            delete arg;
        }
    }
    return oAddClass.apply(this, arguments);
}