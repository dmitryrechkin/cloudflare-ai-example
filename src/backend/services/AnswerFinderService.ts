import { AiChatClientInterface } from "../../libraries/AiChatClient/AiChatClientInterface";
import { AnswerResponse } from "../../types/AnswerResponse";

export class AnswerFinderService {
	/**
	 * Constructor.
	 * 
	 * @param {AiChatInterface} aiChatClient 
	 */
	public constructor(
		private readonly aiChatClient: AiChatClientInterface
	) {}

	/**
	 * Find an answer for a given question.
	 * 
	 * @param {string} question 
	 * @returns {string}
	 */
	public async findAnswer(question: string): Promise<AnswerResponse> {
		console.log(`Generate answer for: ${question}`);

		return this.aiChatClient.invoke([{role: 'user', content: question}]).then((response) => {
			console.log(`Response: ${response}`);

			return { answer: response.response, errors: response.errors};
		});
	}
}