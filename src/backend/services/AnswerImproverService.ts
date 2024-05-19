import { AiClientChatInterface } from '../../libraries/AiClient/AiClientChatInterface';
import { AnswerResponse } from '../../types/AnswerResponse';

export class AnswerImproverService
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
				content: `Objective:
				To improve the language of the provided text, making it friendly and easy to understand without changing its meaning. \
				 
				Context:
				You are a language improvement service. The text provided to you might not always make sense but should be assumed to be correct. The task is to enhance the language quality without altering the meaning or adding extra information.
				
				Instructions:
				- Improve the language of the provided text to make it friendly and easy to understand.
				- Never change the meaning of the provided text.
				- Assume the provided text is correct.
				- Do not add more information.
				- The text is not a question and does not need an answer or instructions.
				
				Format:
				Return the improved text only.
				
				Constraints:
				- The meaning of the text must remain unchanged.
				- No additional information should be added.
				- Do not add: "The improved text is:" or similar.
				
				Example:
				
				Input: London is a capital of London.
				
				Output: London is the capital of London.'`
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
