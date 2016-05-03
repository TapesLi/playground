/**
 * Created by tapes on 16/5/3.
 */

'use strict';

var child_process = require('child_process');

const p = child_process.exec(
    'ps -ae',
    (err, stdout, stderr) => {
        if (err) {
            console.log('err: ', err, err.code, err.signal);
        }

        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
    }
);

console.log('child pid: ', p.pid);