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
const api = new ClashRoyaleAPI(
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQxMWU0ODIwLWNmNmUtNDY5OC04YjhlLTBhYmFmNDQyMzJkZCIsImlhdCI6MTY1Njk0MjUyMywic3ViIjoiZGV2ZWxvcGVyLzdjZTRlN2JkLTlkMGItMzA5NS02OWMyLTIxYWM5ZjE1NmIyYyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIzNy4yMjMuMjUuMTcwIl0sInR5cGUiOiJjbGllbnQifV19.br9qbMwiAcm7wwrSnJMmCJWPNCb7_5UOAHtaWDBI2HXC4DJwG7nZbOgmVF53e8QAujQjTT_LrjWMA7xouG51cw"
);
// Initialize the api Kay
// const api = new ClashRoyaleAPI('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA1MGZkY2UyLTZhY2EtNDU2ZC05MjA4LTM2NWE3ZmZiODA3MiIsImlhdCI6MTY1Njk0NDk2Mywic3ViIjoiZGV2ZWxvcGVyLzc1MzJjOTI0LWJiZDEtNDA4NS03NDhlLWU3MjdlMTE5ZTMyOCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI3OS4xNTMuMjMuMjU1Il0sInR5cGUiOiJjbGllbnQifV19.5V7PCtz6zwjOyphI_DDztYGikQ0pxLfIZs1aHOwruKnrRLdEup1O0eDMEDvWqcD2SgUOZh64gSWjQqocw_K3tw')


router.get("/deck", isLoggedIn, (req, res) => {
    User.findById(req.user._id)
    .then((user) => {
        if(user.tag){
          api.getPlayerByTag(user.tag)
          .then((userTag) => {
            console.log(userTag);
            let avg = (userTag.wins / userTag.losses).toFixed(2);
            res.render("deck", {user: user, userTag: userTag, avg});
            // res.send({ userTag: userTag });
          });

        }})})

router.post("/deck", isLoggedIn, (req, res) => {
    const deckQuery = ({ apiId, name, iconUrls, userId } = req.body);
    const {id} = req.params

  Card.find({ userId: userId})
  
  
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;