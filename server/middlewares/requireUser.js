module.exports = async (req, res, next) => {
    console.log("i am inside middleware");
    next();
};
