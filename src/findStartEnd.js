"use strict";
exports.__esModule = true;
exports.findStartEnd = void 0;
var luxon_1 = require("luxon");
var numberToColumn_1 = require("./numberToColumn");
/** find the starting and ending cell, based on today's date.
 * Start at b3 - b387
 * elapsed_days = current_day - 4/5/2022
 * startColumn = elapsed_days + 2(in letter format)
 * startRow = elapsed_days * 384 + 2
 * endRow = startRow + 384
 * start_cell = ${startColumn}${StartRow}:${startColumn}${endRow}
 *  */
function findStartEnd() {
    var today = luxon_1.DateTime.now();
    var elapsed_days = today.diff(luxon_1.DateTime.fromISO('2020-04-05'), 'days').toObject().days;
    console.log('elapsed_days ****************************', elapsed_days);
    var startColumn = '';
    var startRow = 0;
    var endRow = 0;
    var startCell = '';
    var endCell = '';
    if (elapsed_days) {
        startColumn = (0, numberToColumn_1.numberToColumn)(2 + elapsed_days);
        startRow = 2 + elapsed_days * 384;
        endRow = startRow + 384;
        startCell = "".concat(startColumn).concat(startRow);
        endCell = "".concat(startColumn).concat(endRow);
    }
    else {
        console.error("Problem getting dates");
    }
    return { startCell: startCell, endCell: endCell };
}
exports.findStartEnd = findStartEnd;
