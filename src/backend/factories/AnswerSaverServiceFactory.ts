import { AnswerWriteRepository } from '../repositories/AnswerWriteRepository';
import { QuestionWriteRepository } from '../repositories/QuestionWriteRepository';
import { AnswerSaverService } from '../services/AnswerSaverService';
import { Bindings } from '../types/Bindings';

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
			new AnswerWriteRepository(env.DB)
		);
	}
}
