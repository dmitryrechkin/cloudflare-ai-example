export class VectorizeWriteRepository
{
	/**
	 * Constructor.
	 *
	 * @param {VectorizeIndex} database
	 */
	public constructor(
		private readonly database: VectorizeIndex
	) {}

	/**
	 * Add or update a vector that represents a question to the vectorize index.
	 *
	 * @param {string} question
	 * @returns {Promise<string[]>}
	 */
	public upsert(questionId: number, values: number[]): Promise<string[]>
	{
		console.log(`Upsert question to vectorize: ${questionId}, ${values}`);

		return this.database
			.upsert([ { id: questionId.toString(), values } ])
			.then((inserted) =>
			{
				console.log('Results: ', JSON.stringify(inserted));
				return inserted.ids;
			});
	}
}
