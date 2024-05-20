
export class VectorizeReadRepository
{
	/**
	 * Constructor.
	 *
	 * @param {VectorizeIndex} database
	 * @param {number} matchMinScore
	 * @param {number} maxMatches
	 */
	public constructor(
		private readonly database: VectorizeIndex,
		private readonly matchMinScore: number,
		private readonly maxMatches: number
	) {}

	/**
	 * Query the database for similar vectors and return the vector ids.
	 *
	 * @param {number[]} values
	 * @returns {Promise<number[]>}
	 */
	public query(values: number[]): Promise<number[]>
	{
		console.log(`Query vectorize: ${values} with similarity cut off: ${this.matchMinScore}`);
		if (values.length === 0)
		{
			console.log('No values provided.');
			return Promise.resolve([]);
		}

		return this.database
			.query(values, { topK: parseInt(this.maxMatches.toString()) })
			.then((vectorizeMatches: VectorizeMatches) =>
			{
				const vectorIds = vectorizeMatches.matches
					// filter out vectors with a score below the similarity cut off
					.filter(vector => vector.score > this.matchMinScore)
					// convert vectorIds to numbers
					.map(vector => parseFloat(vector.id));

				console.log('Results: ', JSON.stringify(vectorIds));

				return vectorIds;
			});
	}
}
