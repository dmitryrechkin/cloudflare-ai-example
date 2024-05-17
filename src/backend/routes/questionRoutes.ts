import { Hono, Context } from 'hono';
import { AskQuestionController } from '../controllers/AskQuestionController';

export const questionRoutes = (new Hono()).basePath('/questions');

questionRoutes.post('/', async (context: Context) => (new AskQuestionController()).execute(context));
