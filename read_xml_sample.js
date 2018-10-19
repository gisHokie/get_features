var read_xml = require('./lib/read_xml.js');

var json_Dir = "E:/test_scripts/features_to_postgres/weather_statons.json";
var xml_feed = "https://w1.weather.gov/xml/current_obs/index.xml";
read_xml(xml_feed, json_Dir);