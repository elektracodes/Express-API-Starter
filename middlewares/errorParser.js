const errorParser = (err, req, res, next) => {
  next(err);
  if (err) {
    const status = err.status ? err.status : 400;

    const errorResponse = {
      error: "error",
      message: err.message
    };

    if (err.errors) {
      errorResponse["errors"] = err.errors.map(e => e.messages);
    }

    return res.status(status).send(errorResponse);
  } else {
    return next(err);
  }
};

module.exports = errorParser;
