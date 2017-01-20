const express = require('express');
const app = express();

app.use(express.static(__dirname + '/client/build'));

app.get('*', function(req, res){
  res.sendFile(__dirname + '/client/build/index.html');
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
    console.log(`Express server listening on port ${app.get('port')}`);
});