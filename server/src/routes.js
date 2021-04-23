  
const express = require('express');
const router = express.Router();
const allBus = require('./select-bus');
const getLocation = require('./get-location');
const update = require('./update-bus-occupation');
const { client } = require('./database');

router.get('/bus', (req, response) => {
    allBus.selectAllBus().then((res) =>{
        let result = res.rows;
        console.log(result);
        let regex=/[POINT()]/g
        result.map((bus) => {
            let toFormat = bus.st_astext.replace(regex,'');
            let formatedCoordinate = toFormat.split(" ");
            bus.coordinates = { lng: formatedCoordinate[0], lat: formatedCoordinate[1] }
            delete bus.st_astext;
        })

        
        response.status(200).send(result);
    });
})

router.get('/getbus', (req, res) => {
    getLocation.getLocation(req.query.id).then((response) =>{
        let regex=/[POINT()]/g
        let toFormat = response.rows[0].st_astext.replace(regex,'');
        let formatedCoordinate = toFormat.split(" ");
        const coordinates = { lng: formatedCoordinate[0], lat: formatedCoordinate[1] }
        console.log(coordinates);
        res.status(200).send(coordinates);
    });
})

router.post('/update', (req, res) => {
    console.log(req.query.id);
    console.log(req.query.userId);
    update.update(req.query.userId);
})

module.exports = router;