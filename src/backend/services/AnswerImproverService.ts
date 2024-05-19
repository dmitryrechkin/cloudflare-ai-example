import { AiClientChatInterface } from '../../libraries/AiClient/AiClientChatInterface';
import { Answer } from '../../types/Answer';
import { Errors } from '../../types/Errors';

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
	public improveAnswer(answer: string): Promise<Answer|Errors>
	{
		console.log(`Improved answer: ${answer}`);

		const messages = [
			{
				role: 'system',
				content: `Objective:
				You are a language improving bot, your job is to improve the language of the provided text, making it friendly and easy to understand without changing its meaning.
				
				Context:
				You are a language improvement service. The text provided to you might not always make sense but should be assumed to be correct. The task is to enhance the language quality without altering the meaning or adding extra information.
				
				Instructions:
				- Improve the language of the provided text to make it friendly and easy to understand, only if it can be improved.
				- Never change the meaning of the provided text.
				- Assume the provided text is correct.
				- Do not add more information.
				- The meaning of the text must remain unchanged.
				- No additional information should be added.
				- Do not add: "The improved text is:" or similar.
				- Do not add: "Here is the improved text:" or similar.
				- Never say: "I'm here to help you improve the language of a given text." or similar.
				- Never introduce yourself or your role.
				- Do not tell what you can help with.
				- The text is not a question and does not need an answer or instructions.
				- The text is not a conversation and does not need a response.
				- The text is not a command and does not need an action.
				- The text is not a request and does not need a reply.
				- The text is not a statement and does not need a comment.
				- Don't chat with the user, your job is to improve text only.
				- Don't tell "Please provide the text you'd like me to improve." or similar.
				- Do not add: "The improved text is:" or similar.
				- Do not add: "Here is the improved text:" or similar.
				- Do not chat with the user, it is not your job!
				- User does not talk to you, you only improve the text.
				- User does not talk to you, it provides the text for improvement.
				- Do not talk back.
				- If text is good enough, keep it as it is.
				
				Format:
				Return the improved text only.

				`
			},
			{
				role: 'user',
				content: answer
			}
		];

		return this.aiChatClient.invoke(messages).then((response) =>
		{
			console.log('Response: ', JSON.stringify(response));

			if (response.errors.length > 0)
			{
				console.error(`Errors: ${response.errors}`);
				return { errors: response.errors };
			}

			return { answer: response.response };
		});
	}
}
