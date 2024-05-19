import { AnswerFinderService } from '../services/AnswerFinderService';
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
	 * @param {any} env
	 * @returns {AnswerFinderService}
	 */
	public create(env: any): AnswerFinderService
	{
		return new AnswerFinderService(this.aiChatClientFactory.create(env));
	}
}
