const express = require('express');
const app = express();

app.use(express.static('./dist/forms-management'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/forms-management'});
  });

  app.listen(process.env.PORT || 8080);