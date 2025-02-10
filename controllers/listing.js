const listing = require("../models/listing.js")

module.exports.index = async(req, res) =>{
    const alllisting = await listing.find({});
    res.render("listings/index.ejs", {alllisting})
}

module.exports.renderNewForm =  (req, res) =>{
    res.render("listings/new.ejs")
}

module.exports.showListing = async (req, res) =>{
    let { id } = req.params;
    const Listing = await listing.findById(id).populate({ path: "reviews",
        populate : {
            path : "author"
        }
    }).populate("owner")
    if(!Listing){
        req.flash("error","Listing you requested for does not exists")
        // res.redirect("/listings")
    }
    console.log(Listing);
    res.render("listings/show.ejs", {Listing})
}

module.exports.creatListing = async (req, res , next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log("calling add listing");

    const newlisting = new listing(req.body.listing);
    newlisting.owner = req.user._id
    newlisting.image = {url, filename};
    await newlisting.save();
    req.flash("success","New Listing Created!")
    res.redirect("/listings");
};


module.exports.renderEditForm = async (req, res) =>{
    let { id } = req.params;
    const Listing = await listing.findById(id);
    if(!Listing){
        req.flash("error","Listing you requested for does not exists")
        res.redirect("/listings")
    }
    
        let originalimageurl = Listing.image.url;
        let neworiginalimageurl = originalimageurl.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs", {Listing, neworiginalimageurl});
}


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listings = await listing.findByIdAndUpdate(id, {...req.body.listing});
    // console.log("id is "+ id);

    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listings.image = {url, filename};
        await listings.save();
    }
    req.flash("success","Listing Updated!")
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) =>{
    let { id } = req.params;
    let deletedlisting = await listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!")
    // console.log(deletedlisting);
    res.redirect("/listings")
}