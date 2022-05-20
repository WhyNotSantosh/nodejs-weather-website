const request = require('request');
const weather = (long, lat, loc, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=578706cdcbf499d1dfb378e1250446c5&query=" + lat + "," + long + "&units=f";
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service", undefined);
        }
        else if (body.error) {
            callback("Unable to connect to weather service. " + body.error.info, undefined);
        }
        else {
            callback(undefined, "It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " outside. Today's humidity is " +body.current.humidity +".");
        }
    })
}
module.exports = weather