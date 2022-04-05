import {DateTime} from 'luxon';
import { numberToColumn } from './numberToColumn';
    /** find the starting and ending cell, based on today's date.
     * Start at b3 - b387
     * elapsed_days = current_day - 4/5/2022
     * startColumn = elapsed_days + 2(in letter format)
     * startRow = elapsed_days * 384 + 2
     * endRow = startRow + 384
     * start_cell = ${startColumn}${StartRow}:${startColumn}${endRow}
     *  */
     export function findStartEnd(){
        const today = DateTime.now()
        const elapsed_days = today.diff(DateTime.fromISO('2020-04-05'), 'days').toObject().days;
        console.log('elapsed_days ****************************', elapsed_days)
        let startColumn = '';
        let startRow = 0;
        let endRow = 0;
        let startCell = '';
        let endCell = '';

        if (elapsed_days) {
            startColumn =  numberToColumn(2 + elapsed_days);
            startRow = 2 + elapsed_days * 384;
            endRow = startRow + 384;
            startCell = `${startColumn}${startRow}`;
            endCell = `${startColumn}${endRow}`;
        } else {
            console.error("Problem getting dates");
        }
        return {startCell, endCell};
    }
