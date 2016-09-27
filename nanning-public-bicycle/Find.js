/**
 * Created by tapes on 2016/7/12.
 */

const mysql = require('mysql');
const _ = require('underscore');

console.log('hello mysql: ', mysql);

const devOption = {
    'host': '10.20.37.93',
    'port': 3306,
    'user': 'report',
    'password': 'aaa',
    'database': 'WA_SHELL',
    'charset': 'utf8_general_ci'
};

const gjOption = {
    'host': '10.36.117.214',
    'port': 13315,
    'user': 'REPORTS',
    'password': '1lbpcuKFM401asF',
    'database': 'WA_SHELL',
    'charset': 'utf8_general_ci'
};

function main(option) {
    const connection = mysql.createConnection(option);

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query('SELECT * FROM MODULE_CONFIG WHERE APP_ID = "20040"', function (err, rows, fields) {
            // console.log(arguments);

            var moduleIdList = [];

            rows.forEach(function (row) {
                var dataSourceListStr = row['COMPLEX_SOURCES'];
                var moduleId = row['MODULE_ID'];
                var dataSourceList;

                try {
                    dataSourceList = JSON.parse(dataSourceListStr);
                } catch (err) {
                    console.error('the dataSourceListStr is: ', dataSourceListStr);
                }

                if (isCurrentModuleJoinTargetModule(dataSourceList)) {
                    moduleIdList.push(moduleId);
                }

            });

            console.log('moduleIdList: ', moduleIdList);
        });

    });
}

function isCurrentModuleJoinTargetModule(dataSourceList) {
    "use strict";

    var target = _.find(dataSourceList, function (dataSource) {
        return dataSource.appId == '20040' && dataSource.sourceId.indexOf('54357') > -1;
        // return dataSource.appId == '352' && dataSource.sourceId.indexOf('203') > -1;
    });

    return !!target;
}

main(gjOption);