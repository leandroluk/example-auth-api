import express from 'express';
import 'express-async-errors';
import { bodyParserMiddleware } from './middlewares/body-parser';
import { corsMiddleware } from './middlewares/cors';
import { errorHandlerMiddleware } from './middlewares/error-handler';
import { urlParserMiddleware } from './middlewares/url-parser';
import routes from './routes';

const app = express();

app.disable('x-powered-by');
app.disable('etag');

app.use(bodyParserMiddleware);
app.use(corsMiddleware);
app.use(urlParserMiddleware);

app.use(routes);

app.use(errorHandlerMiddleware);

export default app;
