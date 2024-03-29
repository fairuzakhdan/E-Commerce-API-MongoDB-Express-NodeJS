const wrapAsync = (func) => (req, res, next) => func(req, res, next).catch(next);
module.exports = wrapAsync;
