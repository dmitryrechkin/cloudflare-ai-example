import { AiClientEmbeddingsInterface } from '../../libraries/AiClient/AiClientEmbeddingsInterface';
import { VectorizeReadRepository } from '../repositories/VectorizeReadRepository';

export class VectorizeReadService
{
	/**
	 * Constructor.
	 *
	 * @param {AiClientEmbeddingsInterface} aiClientEmbeddings
	 * @param {VectorizeReadRepository} vectorizeReadRepository
	 */
	public constructor(
		private aiClientEmbeddings: AiClientEmbeddingsInterface,
		private vectorizeReadRepository: VectorizeReadRepository
	) {}

	/**
	 * Returns a list of ids that match a given input.
	 *
	 * @param {string} input
	 * @returns {Promise<string[]>}
	 */
	public async query(input: string): Promise<number[]>
	{
		return this.aiClientEmbeddings
			.create(input)
			.then((response) =>
			{
				if (response.errors.length > 0)
				{
					console.log('Errors:', response.errors);
					throw new Error(response.errors.join(', '));
				}

				return this.vectorizeReadRepository.query(response.data);
			});
	}
}
