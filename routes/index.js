module.exports = (app) => {

app.use("/", require('./auth'))
app.use("/", require('./cards.routes'))
app.use("/", require('./base.routes.js'))

}  


// const router = require("express").Router();

// /* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

// module.exports = router;



 



