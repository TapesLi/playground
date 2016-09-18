/**
 * Created by tapes on 16/9/16.
 */

var csv = require('csv');

csv.generate({seed: 1, columns: 2, length: 20}, function (err, data) {
    csv.parse(data, function (err, data) {
        csv.transform(data, function (data) {
            return data.map(function (value) {
                return value.toUpperCase()
            });
        }, function (err, data) {
            csv.stringify(data, function (err, data) {
                process.stdout.write(data);
            });
        });
    });
});