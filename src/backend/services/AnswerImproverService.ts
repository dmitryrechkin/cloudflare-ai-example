import { AiChatClientInterface } from '../../libraries/AiChatClient/AiChatClientInterface';
import { AnswerResponse } from '../../types/AnswerResponse';

export class AnswerImproverService
{
	/**
	 * Constructor.
	 *
	 * @param {AiChatInterface} aiChatClient
	 */
	public constructor(
		private readonly aiChatClient: AiChatClientInterface
	) {}

	/**
	 * Improve an answer.
	 *
	 * @param {string} answer
	 * @returns {string}
	 */
	public improveAnswer(answer: string): Promise<AnswerResponse>
	{
		console.log(`Improved answer: ${answer}`);

		const messages = [
			{
				role: 'system',
				content: 'Improve the language of the answer. Make it friendly and easy to understand.'
			},
			{
				role: 'user',
				content: answer
			}
		];

		return this.aiChatClient.invoke(messages).then((response) =>
		{
			console.log(`Response: ${response}`);

			return { answer: response.response, errors: response.errors};
		});
	}
}
