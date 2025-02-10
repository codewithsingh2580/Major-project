const express = require("express");
const router = express.Router();
const warpAsync  = require("../utils/warpAsync.js");
const {isLoggodIn , isOwner ,validateListing} = require("../middleware.js")
const listingControllers = require("../controllers/listing.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })


router.route("/")
.get(warpAsync(listingControllers.index))
.post(isLoggodIn,upload.single("listing[image]"), validateListing, warpAsync (listingControllers.creatListing))


// New Route 
router.get("/new", isLoggodIn, listingControllers.renderNewForm);
  
router.route("/:id")
.get(warpAsync(listingControllers.showListing))
.put(isLoggodIn, 
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    warpAsync(listingControllers.updateListing))
.delete(isLoggodIn,isOwner, warpAsync(listingControllers.destroyListing))

// Edit Route 
router.get("/:id/edit", isLoggodIn,isOwner, warpAsync(listingControllers.renderEditForm))


module.exports = router;