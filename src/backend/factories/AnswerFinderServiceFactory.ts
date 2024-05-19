import { AnswerFinderService } from '../services/AnswerFinderService';
import { Bindings } from '../types/Bindings';
import { AiClientChatFactory } from './AiClientChatFactory';

export class AnswerFinderServiceFactory
{
	/**
	 * Constructor.
	 *
	 * @param {AiClientChatFactory} aiChatClientFactory
	 */
	public constructor(
		private readonly aiChatClientFactory: AiClientChatFactory = new AiClientChatFactory()
	) {}

	/**
	 * Creates an answer finder service.
	 *
	 * @param {Bindings} env
	 * @returns {AnswerFinderService}
	 */
	public create(env: Bindings): AnswerFinderService
	{
		return new AnswerFinderService(this.aiChatClientFactory.create(env));
	}
}
