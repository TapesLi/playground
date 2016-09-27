/**
 * Created by tapes on 16/5/8.
 */
"use strict";

const redis = require('../utils/redis');
const sqlite3 = require('../utils/sqlite3');

const KEY_OF_BIKE_STATUS = '__BikeStatus__';

module.exports = {
    add: function (bikeStatusList, timestamp, callback) {

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

    },

    addTest: function (bikeStatusList, timestamp, callback) {

        let db = sqlite3.getDatabase();

        db.serialize(function () {
            let stmt = db.prepare("INSERT INTO BIKE_STATUS (TIME, NO, E, T, A, R) VALUES (?, ?, ?, ?, ?, ?)");

            bikeStatusList.forEach(function (bikeStatus) {
                stmt.run(timestamp, bikeStatus['NO'], bikeStatus['E'], bikeStatus['T'], bikeStatus['A'], bikeStatus['R']);
            });

            stmt.finalize(callback);
        });

    }
};
