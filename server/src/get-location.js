const { client } = require('./database');

async function getLocation(id) {
    console.log(id);
    let response =
    await client.query(`SELECT ST_AsText(coordinates) FROM Bus where identifier = ${id};`);
    return response;
}

module.exports = { getLocation }
