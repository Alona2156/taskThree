const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {type: String},
  time: {type: String},
  status: {type: String},
  priority: {type: mongoose.Schema.Types.ObjectId, ref: "Priority"},
  timeDone: {type: String},
  urgent: {type: Boolean},
  userId: {type: String}
});

module.exports = mongoose.model('Task', taskSchema);
