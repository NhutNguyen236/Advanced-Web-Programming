const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/week10', {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}).catch(err => console.log(err.reason));