const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
app.use(express.static(path.resolve(__dirname, '../build')));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/app', (req, res) => res.sendFile(path.resolve(__dirname, '../build/index.html')));

app.listen(port, () => {
    console.log(`Example app listening at http://192.168.1.255:${port}`);
});
