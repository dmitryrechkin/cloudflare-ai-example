export class AnswerFinderService {
	/**
	 * Find an answer for a given question.
	 * 
	 * @param {string} question 
	 * @returns {string}
	 */
	public findAnswer(question: string): Promise<string> {
		console.log(`Generated answer for: ${question}`);

		const answer = `Generated answer for: ${question}`;

		return Promise.resolve(answer);
	}
}