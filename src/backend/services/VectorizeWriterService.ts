import { AiClientEmbeddingsInterface } from '../../libraries/AiClient/AiClientEmbeddingsInterface';
import { VectorizeWriteRepository } from '../repositories/VectorizeWriteRepository';

export class VectorizeWriterService
{
	/**
	 * Constructor.
	 *
	 * @param {AiClientEmbeddingsInterface} aiClientEmbeddings
	 * @param {VectorizeWriteRepository} vectorizeWriteRepository
	 */
	public constructor(
		private aiClientEmbeddings: AiClientEmbeddingsInterface,
		private vectorizeWriteRepository: VectorizeWriteRepository
	) {}

	/**
	 * Vectorize a question.
	 *
	 * @param {number} questionId
	 * @param {string} question
	 * @returns {Promise<string[]>}
	 */
	public async vectorize(questionId: number, question: string): Promise<string[]>
	{
		return this.aiClientEmbeddings
			.create(question)
			.then((response) =>
			{
				if (response.errors.length > 0)
				{
					console.log('Errors:', response.errors);
					throw new Error(response.errors.join(', '));
				}

				return this.vectorizeWriteRepository.upsert(questionId, response.data);
			})
			.then((inserted) =>
			{
				console.log('Inserted:', inserted);
				return inserted;
			});
	}
}
