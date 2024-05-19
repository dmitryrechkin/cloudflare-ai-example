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
				content: 'You are a language improving service. Your goal is to improve the language of the provided text, to make it friendly and easy to understand. Never change the meaning of the provided text. Any provided text should be assumed to be correct. Never add more information.'
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
