const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

require('./src/app/controllers/index')(app);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
