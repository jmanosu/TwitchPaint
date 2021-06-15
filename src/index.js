const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { connectTwitchClient } = require('./twitch');
const { loadDefaultTiles, getModifyData, modifyTileData, modifyRandom } = require('./data');
const { RANDOM_MODE } = require('./constants');

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));
app.use(cors())

app.use('/tiles', require('./tiles').router);

app.use('*', function (req, res, next) {
    res.status(404).json({
        error: "Requested resource " + req.originalUrl + " does not exist"
    });
});

setTimeout(() => {
    loadDefaultTiles(); 

    app.listen(port, () => {
        console.log("== Server is listening on port:", port);
    });

    let twitchClient = connectTwitchClient();
    twitchClient.on('message', (channel, userstate, message, self) => {
		if(self) return;
        if (RANDOM_MODE) {
            modifyRandom();
        } else {
            let modData = getModifyData(message.toLowerCase());
            modifyTileData(modData);
        }
	});
});