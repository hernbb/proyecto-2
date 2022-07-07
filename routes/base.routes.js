const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const { ClashRoyaleAPI } = require("@varandas/clash-royale-api");
const Deck = require("../models/Deck.model");
const isLoggedOut = require("../middleware/isLoggedOut");


// Initialize the api Hernando
//const api = new ClashRoyaleAPI("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQxMWU0ODIwLWNmNmUtNDY5OC04YjhlLTBhYmFmNDQyMzJkZCIsImlhdCI6MTY1Njk0MjUyMywic3ViIjoiZGV2ZWxvcGVyLzdjZTRlN2JkLTlkMGItMzA5NS02OWMyLTIxYWM5ZjE1NmIyYyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIzNy4yMjMuMjUuMTcwIl0sInR5cGUiOiJjbGllbnQifV19.br9qbMwiAcm7wwrSnJMmCJWPNCb7_5UOAHtaWDBI2HXC4DJwG7nZbOgmVF53e8QAujQjTT_LrjWMA7xouG51cw");
// Initialize the api Kay
  //const api = new ClashRoyaleAPI('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA1MGZkY2UyLTZhY2EtNDU2ZC05MjA4LTM2NWE3ZmZiODA3MiIsImlhdCI6MTY1Njk0NDk2Mywic3ViIjoiZGV2ZWxvcGVyLzc1MzJjOTI0LWJiZDEtNDA4NS03NDhlLWU3MjdlMTE5ZTMyOCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI3OS4xNTMuMjMuMjU1Il0sInR5cGUiOiJjbGllbnQifV19.5V7PCtz6zwjOyphI_DDztYGikQ0pxLfIZs1aHOwruKnrRLdEup1O0eDMEDvWqcD2SgUOZh64gSWjQqocw_K3tw')
  const api = new ClashRoyaleAPI('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjM2MDJkM2E0LTQ0OGUtNDRkOC1hZmY0LWMyMTBkOGZkMjQxYiIsImlhdCI6MTY1NzE4NzgzMiwic3ViIjoiZGV2ZWxvcGVyLzc1MzJjOTI0LWJiZDEtNDA4NS03NDhlLWU3MjdlMTE5ZTMyOCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIzNC4yNDEuMTE1LjY3Il0sInR5cGUiOiJjbGllbnQifV19.36Og7bDIxUkgKSff-qd2L7hHb0J0T_aCgXdj4bd3Qijo6kPrUHzHftS-XhzrC-ne4Y9gRrDNGvSSjAh3iS59Dw')
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
// router.get("/profile", isLoggedOut,(req, res, next)=>{
//   res.render("auth/login")
// } )

router.get("/profile", isLoggedIn, (req, res, next) => {
 
    User.findById(req.user._id)
      .populate("favorites")
      .then((user) => {
        if(user.tag){
          // console.log(user.tag)
          api.getPlayerByTag(user.tag)
          .then((userTag) => {
            //console.log(userTag);
            api.getPlayerUpcomingChests(user.tag)
            .then((chest)=>{
              //console.log(chest)
              let avg = (userTag.wins / userTag.losses).toFixed(2);
              res.render("profile", {user: user, userTag: userTag, avg, chest:chest});
            })
            // res.send({ userTag: userTag });
          });
        }
        else{ 
          res.render("profile", {user: user});
        }
      })
      .catch((e) => {
        console.log(e);
      });

  }
  
);



module.exports = router;
