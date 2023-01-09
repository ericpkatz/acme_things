const express = require('express');
const app = express();
const pg = require('pg');
const client = new pg.Client('postgres://localhost/acme_things_db');

app.get('/api/things', async(req, res, next)=> {
  try {
    const response = await client.query('SELECT * FROM things;');
    res.send(response.rows);
  }
  catch(ex){
    next(ex);
  }
});


const setup = async()=> {
  try {
    await client.connect();
    console.log('connected');
    const SQL = `
      DROP TABLE IF EXISTS things;
      CREATE TABLE things(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50)
      );

      INSERT INTO things(name) VALUES('foo');
      INSERT INTO things(name) VALUES('bar');
      INSERT INTO things(name) VALUES('bazz');
      INSERT INTO things(name) VALUES('quq');
    `;
    await client.query(SQL);
    console.log('data is seeded');
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

setup();