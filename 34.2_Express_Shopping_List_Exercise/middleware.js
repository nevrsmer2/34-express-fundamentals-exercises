function logger(req, res, next) {
    console.log(`Receivrd a ${req.method} request at path: ${req.path}.`);
    return next();
}


module.exports = {
    logger: logger
};
