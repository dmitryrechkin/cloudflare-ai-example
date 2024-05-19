import { AnswerFinderService } from '../services/AnswerFinderService';
import { AiChatClientFactory } from './AiChatClientFactory';

export class AnswerFinderServiceFactory
{
	/**
	 * Constructor.
	 *
	 * @param {AiChatClientFactory} aiChatClientFactory
	 */
	public constructor(
		private readonly aiChatClientFactory: AiChatClientFactory = new AiChatClientFactory()
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
