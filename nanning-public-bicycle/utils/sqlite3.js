/**
 * Created by tapes on 16/5/13.
 */
"use strict";

const sqlite3 = require('sqlite3').verbose();
const dbFile = 'BikeStatus.db';
const fs = require('fs');
const db = new sqlite3.Database(dbFile);

if (fs.existsSync(dbFile)) {
    console.log('Ok, databases already created (' + dbFile + ')');
} else {
    console.log('Creating ' + dbFile + '...');

    db.serialize(function () {
        db.prepare(`
            DROP TABLE IF EXISTS "BIKE_STATUS";
            CREATE TABLE "BIKE_STATUS" (
                "TIME" integer,
                "NO" text,
                "E" integer,
                "T" integer,
                "A" integer,
                "R" real
            );
        `).run().finalize(function () {
            console.log('Finished');
        });
    })
}

module.exports.getDatabase = function () {
    return db;
};