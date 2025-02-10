const express = require("express");
const routes = express.Router({mergeParams : true});
const warpAsync  = require("../utils/warpAsync.js");
const {validateReview , isLoggodIn ,isReviewOuther} = require("../middleware.js")
const reviewControllers = require("../controllers/review.js")


 
// Create Review routes 
routes.post("/",isLoggodIn, validateReview, warpAsync(reviewControllers.createReview))

/// Review Delete 
routes.delete("/:reviewid",isReviewOuther, warpAsync(reviewControllers.destroyReview))

module.exports = routes;