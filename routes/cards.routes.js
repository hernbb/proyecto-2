const router = require("express").Router();

const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Card = require("../models/Card.model");
const User = require("../models/User.model");
const Deck = require("../models/Deck.model");
// const Api = require("../services/ApiHandler");
// const CharactersAPI = new Api()

// Import the package
const { ClashRoyaleAPI } = require("@varandas/clash-royale-api");

// Initialize the api Hernando
//const api = new ClashRoyaleAPI("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQxMWU0ODIwLWNmNmUtNDY5OC04YjhlLTBhYmFmNDQyMzJkZCIsImlhdCI6MTY1Njk0MjUyMywic3ViIjoiZGV2ZWxvcGVyLzdjZTRlN2JkLTlkMGItMzA5NS02OWMyLTIxYWM5ZjE1NmIyYyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIzNy4yMjMuMjUuMTcwIl0sInR5cGUiOiJjbGllbnQifV19.br9qbMwiAcm7wwrSnJMmCJWPNCb7_5UOAHtaWDBI2HXC4DJwG7nZbOgmVF53e8QAujQjTT_LrjWMA7xouG51cw");
// Initialize the api Kay
 //const api = new ClashRoyaleAPI('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA1MGZkY2UyLTZhY2EtNDU2ZC05MjA4LTM2NWE3ZmZiODA3MiIsImlhdCI6MTY1Njk0NDk2Mywic3ViIjoiZGV2ZWxvcGVyLzc1MzJjOTI0LWJiZDEtNDA4NS03NDhlLWU3MjdlMTE5ZTMyOCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI3OS4xNTMuMjMuMjU1Il0sInR5cGUiOiJjbGllbnQifV19.5V7PCtz6zwjOyphI_DDztYGikQ0pxLfIZs1aHOwruKnrRLdEup1O0eDMEDvWqcD2SgUOZh64gSWjQqocw_K3tw')

 const api = new ClashRoyaleAPI('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjM2MDJkM2E0LTQ0OGUtNDRkOC1hZmY0LWMyMTBkOGZkMjQxYiIsImlhdCI6MTY1NzE4NzgzMiwic3ViIjoiZGV2ZWxvcGVyLzc1MzJjOTI0LWJiZDEtNDA4NS03NDhlLWU3MjdlMTE5ZTMyOCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIzNC4yNDEuMTE1LjY3Il0sInR5cGUiOiJjbGllbnQifV19.36Og7bDIxUkgKSff-qd2L7hHb0J0T_aCgXdj4bd3Qijo6kPrUHzHftS-XhzrC-ne4Y9gRrDNGvSSjAh3iS59Dw')

// Use the api to get cards

router.get("/cards", (req, res) => {
  api
    .getCards()
    .then((cards) => {
      // console.log(cards)
      // Do something with the cards
      res.render(`cards/list`, { cards: cards });
      //res.send( {cards: cards} )
    })
    .catch((err) => {
      // handle errors
    });
});

router.post("/add-favorite", isLoggedIn, (req, res) => {
  const query = ({ name, apiId, maxLevel, iconUrls } = req.body);
  Card.find({ apiId: apiId }).then((charArray) => {
    //comprobar si ese apiId ya esta en db cards
    if (charArray.length === 0) {
      Card.create(query)
        .then((result) => {
          console.log(result);
          User.findByIdAndUpdate(req.user._id, {
            $push: { favorites: result._id },
          }).then(() => {
             res.redirect("/cards");
          });
        })
        .catch((err) => console.log(err));
    } else {
      User.findById(req.user._id)
        .then((user) => {
          if (!user.favorites.includes(charArray[0]._id)) {
            User.findByIdAndUpdate(req.user._id, {
              $push: { favorites: charArray[0]._id },
            }).then(() => {
              res.redirect("/cards");
            });
          } else {
            res.redirect("/cards");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

router.post("/delete-favorite", isLoggedIn, (req, res) => {
  const { id } = req.body;
  User.findByIdAndUpdate(req.user._id, { $pull: { favorites: id } })
    .then(() => {
      res.redirect("/profile");
    })
    .catch((err) => {console.log(err)});
});
router.get("/deck/:id", isLoggedIn, (req, res) => {
    User.findById(req.params._id)
  .then((response)=> { 
    
  res.render('/deck', {response} )
  })
  .catch((err) => {console.log(err)})

});

router.post("/deck/:_id", isLoggedIn, (req, res) => {
    const deckQuery = ({ apiId, name, iconUrls, userId } = req.body);
    const {id} = req.params

  Card.find({ userId: userId})
  
  
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;
