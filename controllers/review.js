const listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async( req , res) =>{
    let foundlisting = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    foundlisting.reviews.push(newReview);

    await newReview.save();
    await foundlisting.save();
    req.flash("success","New Review Created!")
    // console.log("New review saved")
    res.redirect(`/listings/${foundlisting._id}`);
}

module.exports.destroyReview = async (req, res) => {
    let {id, reviewid}  = req.params;
    
    await listing.findByIdAndUpdate(id, {$pull:{reviews:reviewid}})
    await Review.findByIdAndDelete(reviewid);
    req.flash("success","Review Deleted!")
    res.redirect(`/listings/${id}`);
}