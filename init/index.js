const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

const MAIN_URL = "mongodb://127.0.0.1:27017/wanderlast";

main()
.then(() =>{
    console.log("Connected to DB")
}).catch((err) =>{
    console.log(err)
})
async function main() {
    await mongoose.connect(MAIN_URL)
};

const initDB = async () => {
    await listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner:'679cbeeb26f646ed0f92281d'}));
    await listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();