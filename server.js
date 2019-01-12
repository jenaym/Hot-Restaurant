var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;


let reservation = [];
let waitlist = [];

const maxTables = 5;

// sample reservation data
reservation.push({
  name: "first last",
  phone: '123-456-7890',
  email: 'someone@somewhere.com'
});
waitlist.push({
  name: "waiting for a table",
  phone: '111-222-3333',
  email: 'im@waiting.com'
});

// Express app to handle data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Displays homepage
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "homepage.html"));
});

//Displays reservation page
app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
})

//Displays Tables page
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
})

// Displays all reservations
app.get("/api/reservations", function(req, res) {
  return res.json(reservation);
});

// Displays all waitlist
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

// Handle POST request for a new reservation
app.post("/api/tables", function(req, res) {
  let newReservation = req.body;

  console.log(newReservation);
  addReservation(newReservation);
  res.json(newReservation);
});

//
// Add a new reservation request to the reservation array
// IFF there is an open spot. Otherwise push the request to
// the waitlist array.
//
function addReservation(newReservation) {
  let isReserved = false;
  
  if (reservation.length < maxTables) {
    reservation.push(newReservation);
    isReserved = true;
    console.log('Reservation made successfully');
  }
  else {
    waitlist.push(newReservation);
    console.log('Reservation is placed in the waitlist');
  }
  
  return isReserved;
}

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });


