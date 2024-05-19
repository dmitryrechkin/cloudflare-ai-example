import { Hono, Context } from 'hono';
import { AskQuestionController } from '../controllers/AskQuestionController';
import { AnswerFinderServiceFactory } from '../factories/AnswerFinderServiceFactory';

export const questionRoutes = (new Hono()).basePath('/questions');

questionRoutes.post('/', async (context: Context) =>
{
	return (new AskQuestionController(new AnswerFinderServiceFactory())).execute(context);
});
