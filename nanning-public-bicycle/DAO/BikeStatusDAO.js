/**
 * Created by tapes on 16/5/8.
 */
"use strict";

let redis = require('../utils/redis');

const KEY_OF_BIKE_STATUS = '__BikeStatus__';

module.exports = {
    add: function(bikeStatusList, timestamp, callback) {

        bikeStatusList.forEach(function (bikeStatus) {

            var contentObj = {
                timestamp: timestamp,
                bikeStatus: bikeStatus
            };

            var contentStr;

            try {
                contentStr = JSON.stringify(contentObj);
            } catch (error) {
                console.log('JSON.stringify error: ', error);
            }

            redis.rpush(KEY_OF_BIKE_STATUS + bikeStatus['NO'], contentStr, function (error, result) {
                if (error) {
                    console.log('redis.rpush error: ', error);
                } else {
                    console.log('redis.rpush success: ', result);

                }
            });

        });

    }
};
