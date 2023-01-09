DROP TABLE IF EXISTS things;
CREATE TABLE things(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

INSERT INTO things(name) VALUES('foo');
INSERT INTO things(name) VALUES('bar');
INSERT INTO things(name) VALUES('bazz');
INSERT INTO things(name) VALUES('quq');

SELECT id, name
FROM things;