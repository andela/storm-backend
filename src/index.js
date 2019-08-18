import express from 'express';
import trimmer from 'trim-request-body';
import cors from 'cors';
import debug from 'debug';
import swaggerUi from 'swagger-ui-express';
import messages from './utils/messages';
import response from './utils/response';
import './config/env';
import routes from './routes';
import swaggerDoc from './config/swaggerDoc';

// Instance of express app
const app = express();

const infoLog = debug('http:info');
const router = express.Router();

// Pass router to routes
routes(router);

// Pass router to swagger middleware
swaggerDoc(router);

app.use('/api/v1', router, swaggerUi.serve);

// Allow cross origin access
app.use(cors());

// Parse application/json
app.use(express.json());

// Parse application/xwww-
app.use(express.urlencoded({ extended: false }));

// Trim the parsed request body
app.use(trimmer);

// Handle base route
app.get('/', (req, res) => response(res, 200, 'success', {
  message: messages.welcome,
}));

// Handle routes not found
app.use('*', (req, res) => response(res, 404, 'error', {
  message: messages.notFound,
}));

// Finally, start server...
const server = app.listen(process.env.PORT || 3000, () => infoLog(`Listening on port ${server.address().port}`));

export default app;
