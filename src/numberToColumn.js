"use strict";
exports.__esModule = true;
exports.numberToColumn = void 0;
function numberToColumn(num) {
    var letters = '';
    while (num >= 0) {
        letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num % 26] + letters;
        num = Math.floor(num / 26) - 1;
    }
    return letters;
}
exports.numberToColumn = numberToColumn;
