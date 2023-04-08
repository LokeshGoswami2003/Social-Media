const mongoose = require("mongoose");

module.exports = async () => {
    const mongoUri =
        "mongodb+srv://LokeshGoswami:fTZmR6eMhh4XuWv2@social-media.klur2u3.mongodb.net/?retryWrites=true&w=majority";
    try {
        const connect = await mongoose.connect(mongoUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("mongoDB Connected : ", connect.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
