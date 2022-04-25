// eslint-disable-next-line import/extensions
const dotenv = require('dotenv');
const app = require('./app.js');

dotenv.config();

const PORT = process.env.PORT || 3333;

app.listen(PORT);
