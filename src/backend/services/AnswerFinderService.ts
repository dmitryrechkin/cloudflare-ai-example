import { AiClientChatInterface } from '../../libraries/AiClient/AiClientChatInterface';
import { Errors } from '../../types/Errors';
import { QuestionAnswer } from '../../types/QuestionAnswer';

export class AnswerFinderService
{
	/**
	 * Constructor.
	 *
	 * @param {AiChatInterface} aiChatClient
	 */
	public constructor(
		private readonly aiChatClient: AiClientChatInterface
	) {}

	/**
	 * Find an answer for a given question.
	 *
	 * @param {string} question
	 * @returns {string}
	 */
	public async findAnswer(question: string): Promise<QuestionAnswer|Errors>
	{
		console.log(`Generate answer for: ${question}`);

		return this.aiChatClient.invoke([{role: 'user', content: question}]).then((response) =>
		{
			console.log('Response: ', JSON.stringify(response));

			if (response.errors.length > 0)
			{
				console.error(`Errors: ${response.errors}`);
				return { errors: response.errors };
			}

			return { question: question, answer: response.response };
		});
	}
}
