export class AnswerWriteRepository
{
	/**
	 * Constructor.
	 *
	 * @param {D1Database} database
	 */
	public constructor(
		private readonly database: D1Database
	) {}

	/**
	 * Add a question.
	 *
	 * @param {number} questionId
	 * @param {string} answer
	 * @returns {Promise<number>}
	 */
	public async add(questionId: number, answer: string): Promise<number>
	{
		console.log(`Add answer: ${questionId}, ${answer}`);

		const preparedStatement = this.database.prepare('INSERT INTO answer (question_id, answer) VALUES (?, ?) RETURNING *');

		// eslint-disable-next-line @typescript-eslint/naming-convention
		const result = (await preparedStatement.bind(questionId, answer).run()) as D1Result<{id: number, question_id: number, answer: string}>;

		console.log('Results: ', JSON.stringify(result?.results ?? []));

		if (result.results.length === 0)
		{
			throw new Error('Failed to add answer');
		}

		return result.results[0].id;
	}
}
