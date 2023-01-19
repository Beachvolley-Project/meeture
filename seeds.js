const mongoose = require("mongoose");
const Location = require("./models/Location");

require("dotenv/config");
const mongouri = process.env.MONGODB_URI;
mongoose.connect(mongouri);


const locations = [
    {
        "name": "Beach Mitte",
        "address": "Caroline-Michaelis-Straße 8, 10115 Berlin",
        "prices": "from 15 euros during the work week for 1 hour (Mo-Fr 10-17 o’clock), from 18,50 in the evening / at the weekend (Mo-Fr 17-22 o’clock, Saturday + Sunday)",
        "numberOfCourts": "55",
        "openingHours": "MO-SA 10-22 o’clock",
        "website": "http://www.beachberlin.de/beachmitte.html",
        "lng" : 13.384521537181707, 
        "lat" : 52.53396355686272
      },
      {
        "name": "Beach 61, Park am Gleisdreieck",
        "address": "Luckenwalder/Ecke Schöneberger, Bülowstraße station",
        "prices": "from 15 euros during the work week for 1 hour (Mo-Fr 11:30-15:30 o’clock), 20 euros from 15:30 o’clock and at the weekend",
        "numberOfCourts": "25",
        "openingHours": "MO-SA 11:30-22 o’clock",
        "website": "https://www.beach61.de/",
        "lng" : 13.372996532790966, 
        "lat" : 52.49665215758351
      },
      {
        "name": "South Beach (Area 85)",
        "address": "Trachenbergring 85, 12249 Berlin – 8 minutes on foot from S-Bahn Marienfelde",
        "prices": "from 24 euros indoor, from 20 euros outdoor, EC cards accepted",
        "numberOfCourts": "11",
        "openingHours": "MO-FR 10-24 o’clock • SA-SU 10-22 o’clock",
        "website": "https://area-85.de/beachvolleyball-berlin/",
        "lng" : 13.370462607252215, 
        "lat" : 52.42737821117734
      },
      {
        "name": "East 61",
        "address": "Naumannstraße 43, S-Bahn Südkreuz and Julius-Leber-Brücke nearby, Kleistpark station",
        "prices": "from 25 euros to 36 euros for an hour (36 Euro e.g. at the weekend, on holidays and during the work week from 17:30 o’clock)",
        "numberOfCourts": "19",
        "openingHours": "MO-FR 11:30-23:30 o’clock, SA-SU 10:00 – 22:00 o’clock",
        "website": "https://www.beach61.de/",
        "lng" : 13.364415592598993, 
        "lat" : 52.48200153089764
      },
      {
        "name": "Beach Zone Lichtenberg",
        "address": "Weißenseer Weg 100, 10369 Berlin",
        "prices": "6 euros for an hour during the work week till 17 o’clock, or 12 euros per hour at any other time",
        "numberOfCourts": "14",
        "openingHours": "MO-FR 14 – 21 o’clock, SA 13-22 o’clock, SU 11-22 o’clock",
        "website": "http://beach-zone.de/",
        "lng" : 13.477201764928068, 
        "lat" : 52.53047971546039
      },
      {
        "name": "SPOK (Sport Kultur Pankow)",
        "address": "Nordendstr. 56",
        "prices": "18 euros for 2 hours, 15 euros for 2 hours for the members",
        "numberOfCourts": "6",
        "openingHours": "MO-SU 8-21 o’clock",
        "website": "https://spok.de/index.php/sport/beach-sport",
        "lng" : 13.391220678423526, 
        "lat" : 52.588963796824416
      },
      {
        "name": "Volkspark Friedrichshain",
        "address": "Paul-Heyse-Straße 1, 10407 Berlin",
        "prices": "free of charge",
        "numberOfCourts": "6",
        "openingHours": "from dusk to an open end (no floodlights in the night)",
        "website": "https://www.berlin.de/en/parks-and-gardens/3560363-4407152-volkspark-friedrichshain.en.html",
        "lng" : 13.442090409832312, 
        "lat" : 52.528733677798506
      }
];


Location.insertMany(locations)
  .then((locationsFromsDb) => {
    console.log(
      `Success - ${locationsFromsDb.length} locations got created`
    );
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));