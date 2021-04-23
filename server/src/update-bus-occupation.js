const { client } = require('./database');

async function update(id){
    console.log(id);
    let response =
    await client.query(`update Bus set occupation = occupation + 1 where identifier = ${id};`);
    return response;
}

module.exports = { update }
