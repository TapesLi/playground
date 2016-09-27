/**
 * Created by tapes on 16/5/8.
 */

'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');

let querystring = require('querystring');
let BikeStatusDAO = require('./DAO/BikeStatusDAO');

const CRAW_INTERVAL = 60 * 1000;
const URLBikeStatus = 'http://nnbike.citycome.com/Home/BikeStatus2';

let GLOBAL_gLastUpdateTime = 0;

function getReqURL(URLBase, timestamp) {

    var paramObj = {
        //at: GLOBAL_gLastUpdateTime,
        x: timestamp,
        _: timestamp
    };


    return URLBase + '?' + querystring.stringify(paramObj);

}

function craw() {

    var timestamp = Date.now();
    var url = getReqURL(URLBikeStatus, timestamp);

    console.log('url: ', url);

    fetch(url)
        .then(function (res) {
            if (res.ok) {

                res.text().then(function (text) {
                    //console.log('text: ', text);

                    let resultFun = new Function(text + '\n return {gLastUpdateTime: gLastUpdateTime, gBikeStatus: gBikeStatus};');

                    try {
                        let result = resultFun();

                        console.log('gLastUpdateTime: ', result.gLastUpdateTime);
                        //console.log('gBikeStatus: ', result.gBikeStatus);

                        GLOBAL_gLastUpdateTime = result.gLastUpdateTime;

                        BikeStatusDAO.addTest(result.gBikeStatus, timestamp, function () {
                            console.log('finished addTest: ', result.gBikeStatus.length);
                        });
                    } catch (e) {
                        console.error('resultFun error: ', error);
                    }
                });
            } else {
                console.warn('status: ', res.status);
            }
        })
        .catch(crawError)
}



function crawError(error) {
    console.log('error: ', error);
}

setInterval(craw, CRAW_INTERVAL);