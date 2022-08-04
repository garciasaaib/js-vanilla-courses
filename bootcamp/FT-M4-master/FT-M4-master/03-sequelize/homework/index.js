const app = require('./server');
const { db } = require('./db');
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  db.sync({ force: true });
});