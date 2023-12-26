const mongoose = require("mongoose");

const validateObjectID = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "ID IS INCORRECT" });
  } else {
    next();
  }
};

module.exports = {
  validateObjectID,
};
