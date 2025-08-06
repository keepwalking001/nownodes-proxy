let express = require('express');
let router = express.Router();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const URL_BTCBOOK = 'https://btcbook.nownodes.io';
const URL_BTC='https://btc.nownodes.io';
const headers = {
    'Content-Type': 'application/json',
    'api-key': 'xxxxxxx-xxxxxxxx-xxxxxxx-xxxxxxx'
}


/* GET home page. */
router.get('*', async function(req, res, next) {
    let URL = req.hostname === 'nownodes-btcbook.bel2.org' ? URL_BTCBOOK : URL_BTC
    let response = await fetch(URL + req.url, {method: 'GET', headers})
    let result = await response.json();
    res.json(result);
});

router.post('*', async function(req, res, next) {
    let URL = req.hostname === 'nownodes-btcbook.bel2.org' ? URL_BTCBOOK : URL_BTC
    let response = await fetch(URL + req.url, {method: 'POST',body: JSON.stringify(req.body), headers})
    try {
        let result = await response.json();
        res.json(result);
    } catch (error) {
        console.log(response);
        console.log(response.headers);
        res.json({})
    }
});

module.exports = router;
