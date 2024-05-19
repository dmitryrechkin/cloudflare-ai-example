export class QuestionWriteRepository
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
	 * @param {string} question
	 * @returns {Promise<number>}
	 */
	public async add(question: string): Promise<number>
	{
		console.log(`Add question: ${question}`);

		const preparedStatement = this.database.prepare('INSERT INTO question (question) VALUES (?) RETURNING *');

		const result = (await preparedStatement.bind(question).run()) as D1Result<{id: number, question: string}>;

		console.log('Results: ', JSON.stringify(result?.results ?? []));

		if (result.results.length === 0)
		{
			throw new Error('Failed to add question');
		}

		return result.results[0].id;
	}
}
