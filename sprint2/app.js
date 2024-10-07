const express = require('express');
const app = express();

app.listen(8888);

const youtuberRouter = require('./routes/youtubes');
const channelRouter = require('./routes/channels');

app.use('/users', youtuberRouter);
app.use('/channels', channelRouter);
