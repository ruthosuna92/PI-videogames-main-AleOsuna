//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config()
const {API_KEY} = process.env
const { Genre} = require('./src/db.js')
const axios = require('axios')


// Syncing all the models at once.
conn.sync({ force: true}).then(() => {
  server.listen(3002, async () => {
    try {
      const {results} = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data
      results.map(async (gen)=> await Genre.findOrCreate({where: {name: gen.name}}))
      

    } catch (error) {
      console.log(error)
    }
    console.log('%s listening at 3002'); // eslint-disable-line no-console
  });
});
