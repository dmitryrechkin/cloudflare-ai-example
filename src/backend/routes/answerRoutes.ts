import { Context, Hono } from 'hono';
import { ImproveAnswerController } from '../controllers/ImproveAnswerController';
import { SaveAnswerController } from '../controllers/SaveAnswerController';

export const answerRoutes = (new Hono()).basePath('/answers');

answerRoutes.put('/improve', async (context: Context) => (new ImproveAnswerController()).execute(context));
answerRoutes.post('/', async (context: Context) => (new SaveAnswerController()).execute(context));
