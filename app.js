var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//schema set up
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Meme Hills", 
//         image: "http://www.genericvan.life/wp-content/uploads/2018/06/Generic-Van-Life-Camping-Spot-Carolside-Campground-Alberta-van-1024x685.jpg"


//     }, function(err, campground){
//         if(err){
//             console.log("oh no");
//             console.log(err);
//         } else {
//             console.log("nice new campground:");
//             console.log(campground);
//         }
//     });

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else{
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});
});


app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err)
        } else{
            res.redirect("/campgrounds");
        }
    })
});

app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp has started"); 
});

