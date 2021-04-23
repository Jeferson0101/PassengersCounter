const { client } = require('./database');

async function selectAllBus(){
    let response =
    await client.query('SELECT identifier, seats, passengersLimit, ST_AsText(coordinates), occupation from Bus;');
    return response;
}

module.exports = { selectAllBus }
