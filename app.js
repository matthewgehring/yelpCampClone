var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
    {name: "Yosemite Falls", image: "https://www.yosemite.com/wp-content/uploads/2016/04/Yosemite-Falls.jpg"},
    {name: "Meme Hills", image: "http://www.genericvan.life/wp-content/uploads/2018/06/Generic-Van-Life-Camping-Spot-Carolside-Campground-Alberta-van-1024x685.jpg"},
    {name: "Horse Lane", image: "https://www.outdoorproject.com/sites/default/files/styles/cboxshow/public/1407175164/aron_bosworth-3798.jpg?itok=WMSPxCKK"}
]

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});


app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp has started"); 
});

