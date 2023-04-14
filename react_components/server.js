import express from 'express';
import fs from 'fs';
import path from 'path';
import renderApp from './dist/server/entry-server.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;
const html = fs.readFileSync(path.resolve(__dirname, './dist/client/index.html')).toString();
const parts = html.split('<!--ssr-outlet-->');
const app = express();

app.use('/assets', express.static(path.resolve(__dirname, './dist/client/assets')));

app.use((req, res) => {
  res.write(parts[0]);
  const stream = renderApp(req.url, {
    onShellReady() {
      stream.pipe(res);
    },
    onShellError() {},
    onAllReady() {
      res.write(parts[1]);
      res.end();
    },
    onError(err) {
      console.error(err);
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} NodeEnv: development`);
});
