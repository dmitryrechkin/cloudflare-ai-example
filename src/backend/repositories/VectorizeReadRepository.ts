
export class VectorizeReadRepository
{
	/**
	 * Constructor.
	 *
	 * @param {VectorizeIndex} database
	 * @param {number} similarityCutOff
	 */
	public constructor(
		private readonly database: VectorizeIndex,
		private readonly similarityCutOff: number
	) {}

	/**
	 * Query the database for similar vectors and return the vector ids.
	 *
	 * @param {number[]} values
	 * @returns {Promise<number[]>}
	 */
	public query(values: number[]): Promise<number[]>
	{
		console.log(`Query vectorize: ${values} with similarity cut off: ${this.similarityCutOff}`);

		return this.database
			.query(values, { topK: 1 })
			.then((vectorizeMatches: VectorizeMatches) =>
			{
				const vectorIds = vectorizeMatches.matches
					// filter out vectors with a score below the similarity cut off
					.filter(vector => vector.score > this.similarityCutOff)
					// convert vectorIds to numbers
					.map(vector => parseFloat(vector.id));

				console.log('Results: ', JSON.stringify(vectorIds));

				return vectorIds;
			});
	}
}
