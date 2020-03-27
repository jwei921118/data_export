/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1574753007174_8681';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // csrf
  config.security = {
    csrf: {
      enable: false
    }
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '120.77.158.138',
    port: 3306,
    database: 'inno_parking',
    username: 'root',
    password: 'Gzcd2015_'
  };

  return {
    ...config,
    ...userConfig,
  };
};