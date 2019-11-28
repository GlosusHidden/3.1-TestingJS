const express = require('express')

const app = express()

const port = process.env.PORT || 5000

app.use(express.static(__dirname + '../../public'));

app.listen(port, () => {
    console.log('Server listen at %s port', port);
})

app.get('*', (req, res) => {
   res.sendFile('index.html', { root: __dirname });
 });
