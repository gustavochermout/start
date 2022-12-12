const mongoose = require('mongoose');

const usuarioDb = encodeURIComponent(process.env.DB_USER);
const pwDb = encodeURIComponent(process.env.DB_PW);
const nameDB = encodeURIComponent(process.env.DB_NAME);
const host = encodeURIComponent(process.env.DB_HOST);

mongoose.connect(`mongodb://${usuarioDb}:${pwDb}@${host}:27017/${nameDB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

module.exports = mongoose;

/*
MongoDB create container
1. docker run --name mongodb -d -p 27017:27017 mongo:5.0

MongoDB create user

1. use start
2. db.createUser({ 
  user: "admin", 
  pwd: "123456",
  roles: [ 
    { role: "clusterAdmin", db: "admin" },
    { role: "readAnyDatabase", db: "admin" },
    "readWrite"
  ] 
})

*/