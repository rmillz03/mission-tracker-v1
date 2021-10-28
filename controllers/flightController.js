const Flight = require("../models/flightModel");
const Crew = require("../models/crewModel");
const Planes = require("../models/planeModel");

// *****************************
//         ALL FLIGHTS
// *****************************
exports.allFlights = async (req,res) => {
    let [missions, _] = await Flight.findAll();
    let julianDate = 21290;

    res.render('flights/allFlights.ejs', {
        missions: missions,
        julian: julianDate
    });
}

// *****************************
//         CREATE FLIGHT
// *****************************
exports.flightForm = async (req, res) => {
    let julianDate = 21290;

    //load recordset for pilots and planes
    let [pilots, _] = await Crew.findCrew('pilot');
    let [aircraft, n] = await Planes.findAll();
    
    res.render('flights/flightForm.ejs', { 
        julian: julianDate,
        pilots: pilots,
        aircraft: aircraft
     });
}

exports.createFlight = async (req, res, next) => {
    const body = req.body;

    let newFlight = new Flight(
        body.pilot1,
        body.tailNum,
        body.ETD,
        body.julianDate  
    );

    newFlight = await newFlight.save();

    console.log(newFlight);        //debugging

    res.redirect('/flightRoute/allFlights');
}
