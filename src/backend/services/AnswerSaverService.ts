export class AnswerSaverService {
	/**
	 * Save an answer.
	 * 
	 * @param {string} answer 
	 * @returns {number} - ID of the saved answer
	 */
	public saveAnswer(answer: string): Promise<number> {
		console.log(`Saved answer: ${answer}`);

		const id = 1;

		return Promise.resolve(id);
	}
}