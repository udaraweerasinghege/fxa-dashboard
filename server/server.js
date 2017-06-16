import express from 'express';
import morgan from 'morgan';
import path from 'path';
import mysql from 'mysql';

const app = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.get('/timeline-data', (req, res) => {
  // read from db and return here.
});

export default app;
