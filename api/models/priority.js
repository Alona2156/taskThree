const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrioritySchema = ({
  color: {type: String},
  level: {type: String},
  userId: {type: String}
});

module.exports = mongoose.model("Priority", PrioritySchema);
