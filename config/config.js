var mongoose = require('mongoose');
var pass = "ylist@123";

// mongoose.connect('mongodb://18.220.249.133/ylist',{user:'ylist',pass:'ylist@123',ssl:true})
//mongoose.connect('mongodb://ylist1:ylist1233@18.220.249.133/ylist?authSource=customAuthDB')
mongoose.connect('mongodb://localhost:27017/uniq', { useMongoClient: true })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

module.exports = mongoose;