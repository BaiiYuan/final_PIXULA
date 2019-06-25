const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb+srv://PIXULA_backend:backendserver@cluster0-abych.gcp.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`Connected to mongo`));