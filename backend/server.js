const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const mongoose = require('./config/db');
const authRoute = require('./app/routes/AuthRoute');
const CategoryRoute = require('./app/routes/CategoryRoute');
const postRoute = require('./app/routes/PostRoute');
const UserRoute = require('./app/routes/UserRoute');
const PubRoute = require('./app/routes/PubRoute');

const cors = require('cors');
require('dotenv').config();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//* routes

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', CategoryRoute);
app.use('/api/v1/post', postRoute);
app.use('/api/v1/pub', PubRoute);
app.use('/api/v1/user', UserRoute);

//* server handling :::

const PORT = process.env.PORTS || 5000;

const privateKeyPath = '/etc/letsencrypt/live/gamz-dz.com/privkey.pem';
const certificatePath = '/etc/letsencrypt/live/gamz-dz.com/fullchain.pem';

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
  console.log(`Express server is running on HTTPS port ${PORT}...`);
});
