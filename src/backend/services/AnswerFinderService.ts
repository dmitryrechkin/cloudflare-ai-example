import { AiChatClientInterface } from "../../libraries/AiChatClient/AiChatClientInterface";
import { AnswerResponse } from "../../types/AnswerResponse";

export class AnswerFinderService {
	/**
	 * Constructor.
	 * 
	 * @param {AiChatInterface} aiChat 
	 */
	public constructor(
		private aiChat: AiChatClientInterface
	) {}

	/**
	 * Find an answer for a given question.
	 * 
	 * @param {string} question 
	 * @returns {string}
	 */
	public async findAnswer(question: string): Promise<AnswerResponse> {
		console.log(`Generate answer for: ${question}`);

		return this.aiChat.invoke([{role: 'user', content: question}]).then((response) => {
			console.log(`Response: ${response}`);

			return { answer: response.response, errors: response.errors};
		});
	}
}