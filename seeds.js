const mongoose = require("mongoose");

const Place = require("./models/Place");

require("dotenv/config");
const mongouri = process.env.MONGODB_URI;
mongoose.connect(mongouri);


const places = [
    {
        "Name": "Beach Mitte",
        "Address": "Caroline-Michaelis-Straße 8, 10115 Berlin",
        "Prices": "'from 15 euros during the work week for 1 hour (Mo-Fr 10-17 o’clock), from 18,50 in the evening / at the weekend (Mo-Fr 17-22 o’clock, Saturday + Sunday)'",
        "Number of courts": "55",
        "Opening hours": "MO-SA 10-22 o’clock",
        "Terrace": "large terrace with a cocktail bar, food, drinks, snacks, etc.",
        "Website": "http://www.beachberlin.de/beachmitte.html"
      },
      {
        "Name": "Beach 61, Park am Gleisdreieck",
        "Address": "Luckenwalder/Ecke Schöneberger, Bülowstraße station",
        "Prices": "'from 15 euros during the work week for 1 hour (Mo-Fr 11:30-15:30 o’clock), 20 euros from 15:30 o’clock and at the weekend'",
        "Number of courts": "25",
        "Opening hours": "MO-SA 11:30-22 o’clock",
        "Terrace": "large terrace with a cocktail bar, food, drinks, snacks, etc.",
        "Website": "https://www.beach61.de/"
      },
      {
        "Name": "South Beach (Area 85)",
        "Address": "Trachenbergring 85, 12249 Berlin – 8 minutes on foot from S-Bahn Marienfelde",
        "Prices": "from 24 euros indoor, from 20 euros outdoor, EC cards accepted",
        "Number of courts": "11",
        "Opening hours": "MO-FR 10-24 o’clock • SA-SU 10-22 o’clock",
        "Terrace": "relatively large terrace outside with food, snacks and drinks",
        "Website": "https://area-85.de/beachvolleyball-berlin/"
      },
      {
        "Name": "East 61",
        "Address": "Naumannstraße 43, S-Bahn Südkreuz and Julius-Leber-Brücke nearby, Kleistpark station",
        "Prices": "from 25 euros to 36 euros for an hour (36 Euro e.g. at the weekend, on holidays and during the work week from 17:30 o’clock)",
        "Number of places": "10 indoor, 9 outdoor",
        "Opening hours": "MO-FR 11:30-23:30 o’clock, SA-SU 10:00 – 22:00 o’clock",
        "Terrace": "large terrace indoors and outdoors with food, drinks, snacks, etc",
        "Website": "https://www.beach61.de/"
      },
      {
        "Name": "Beach Zone Lichtenberg",
        "Address": "Weißenseer Weg 100, 10369 Berlin",
        "Prices": "6 euros for an hour during the work week till 17 o’clock, or 12 euros per hour at any other time",
        "Number of courts": "14 courts",
        "Opening hours": "MO-FR 14 – 21 o’clock, SA 13-22 o’clock, SU 11-22 o’clock",
        "Terrace": "large terrace with food (also BBQ), drinks, snacks, etc",
        "Website": "http://beach-zone.de/"
      },
      {
        "Name": "SPOK (Sport Kultur Pankow)",
        "Address": "Nordendstr. 56",
        "Prices": "18 euros for 2 hours, 15 euros for 2 hours for the members",
        "Number of courts": "6",
        "Opening hours": "MO-SU 8-21 o’clock",
        "Terrace": "large terrace with a cocktail bar, food, drinks, snacks, etc.",
        "Website": "https://spok.de/index.php/sport/beach-sport"
      },
      {
        "Name": "Volkspark Friedrichshain",
        "Adress": "Paul-Heyse-Straße 1, 10407 Berlin",
        "Prices": "free of charge",
        "Number of courts": "6",
        "Opening hours": "from dusk to an open end (no floodlights in the night)",
        "Terrace": "Drinks and snacks are available in the kiosk directly in front of beachvolleyball courts"
      }
];

Place.insertMany(places)
  .then((placesFromDB) => {
    console.log(
      `Success - ${placesFromDB.length} places got created`
    );
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));