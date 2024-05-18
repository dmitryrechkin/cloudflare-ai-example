import { Hono, Context } from 'hono';
import { AskQuestionController } from '../controllers/AskQuestionController';
import { AnswerFinderService } from '../services/AnswerFinderService';
import { CloudflareAiChatClient } from '../../libraries/AiChatClient/Cloudflare/CloudflareAiChatClient';

export const questionRoutes = (new Hono()).basePath('/questions');

questionRoutes.post('/', async (context: Context) => {
	console.log(JSON.stringify(context.env));

	const aiChatClientOptions = {
		modelId: context.env?.AI_MODEL_ID,
		timeout: 600,
		maxTokens: 1024,
		temperature: 0.75,
	};

	const answerFinder = new AnswerFinderService(new CloudflareAiChatClient(context.env?.AI, aiChatClientOptions));

	return (new AskQuestionController(answerFinder)).execute(context)
});
