import { Context, Hono } from 'hono';
import { ImproveAnswerController } from '../controllers/ImproveAnswerController';
import { SaveAnswerController } from '../controllers/SaveAnswerController';
import { AnswerImproverServiceFactory } from '../factories/AnswerImproverServiceFactory';
import { AnswerSaverServiceFactory } from '../factories/AnswerSaverServiceFactory';

export const answerRoutes = (new Hono()).basePath('/answers');

answerRoutes.put('/improve', async (context: Context) =>
{
	return (new ImproveAnswerController(new AnswerImproverServiceFactory())).execute(context);
});

answerRoutes.post('/', async (context: Context) =>
{
	return (new SaveAnswerController(new AnswerSaverServiceFactory())).execute(context);
});
