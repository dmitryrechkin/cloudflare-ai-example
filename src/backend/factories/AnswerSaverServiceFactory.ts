import { AnswerWriteRepository } from '../repositories/AnswerWriteRepository';
import { QuestionWriteRepository } from '../repositories/QuestionWriteRepository';
import { VectorizeWriteRepository } from '../repositories/VectorizeWriteRepository';
import { AnswerSaverService } from '../services/AnswerSaverService';
import { VectorizeWriterService } from '../services/VectorizeWriterService';
import { Bindings } from '../types/Bindings';
import { AiClientEmbeddingsFactory } from './AiClientEmbeddingsFactory';
import { AiClientEmbeddingsOptionsFactory } from './AiClientEmbeddingsOptionsFactory';

export class AnswerSaverServiceFactory
{
	/**
	 * Creates an answer saver service.
	 *
	 * @param {Bindings} env
	 * @returns {AnswerSaverService}
	 */
	public create(env: Bindings): AnswerSaverService
	{
		return new AnswerSaverService(
			new QuestionWriteRepository(env.DB),
			new AnswerWriteRepository(env.DB),
			new VectorizeWriterService(
				(new AiClientEmbeddingsFactory(new AiClientEmbeddingsOptionsFactory())).create(env),
				new VectorizeWriteRepository(env.VECTORIZE_INDEX)
			)
		);
	}
}
