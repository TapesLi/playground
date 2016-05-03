/**
 * Created by tapes on 16/5/3.
 */

'use strict';

const spawn = require('child_process').spawn;
const ps = spawn('ps', ['ax']);
const grep = spawn('grep', ['node']);

ps.stdout.on('data', (data) => {
    grep.stdin.write(data);
});

ps.stderr.on('data', (data) => {
    console.log(`ps stderr: ${data}`);
});

ps.on('close', (code) => {
    if (code !== 0) {
        console.log(`ps process exited with code ${code}`);
    }

    grep.stdin.end();
});

grep.stdout.on('data', (data) => {
    console.log(`${data}`);
});

grep.stderr.on('data', (data) => {
    console.log(`grep stderr ${data}`);
});

grep.on('close', (code) => {
    if (code != 0) {
        console.log(`grep process exited with code ${code}`);
    }
});