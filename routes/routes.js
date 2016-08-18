var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var validator = require("validator");
mongoose.connect(proccess.env.MONGOLAB_URI); // connects to data database

// informs database connection
mongoose.connection.once('open',function(){
   console.log("DB connected !");
});
var Schema = mongoose.Schema;

var hostUrl = "https://shortify.tk";
// makes new url schema
var urlSchema = new Schema({
   original_URL: String,
   shorten_URL: String,
   shorten_id: String
});

// makes model of urlSchema schema
var Url = mongoose.model("Url",urlSchema);

// generates random number
function ranAlphaNum() {
   return Math.random().toString(36).slice(-6);
}

// serves to the shortify layout
router.get('/',function(req, res){
   res.render('shortify');
});

// redirects to the original url
router.get('/:id',function(req,res,next){
    Url.find({shorten_id: req.params.id},function(err, url){
         if(err) throw err;
         res.redirect(url[0].original_URL);
       });
});

// response to the post request
router.post('/', function(req, res, next) {
  var url = (req.body.url);
  var shorten_id = ranAlphaNum();
  var shorten_URL = hostUrl + "/" + shorten_id;
    if(validator.isURL(url)) {
      var newUrl = new Url({
      original_URL: url,
      shorten_URL: shorten_URL,
      shorten_id: shorten_id
   }).save(); // saves to the database

   // responds shorten url
   res.send(shorten_URL);
  }
   else {
    // responds warning
    res.send("Invalid url");
   }

});


module.exports = router;
