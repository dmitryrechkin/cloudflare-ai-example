import { AnswerImproverService } from '../services/AnswerImproverService';
import { AiChatClientFactory } from './AiChatClientFactory';

export class AnswerImproverServiceFactory
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
	 * @returns {AnswerImproverService}
	 */
	public create(env: any): AnswerImproverService
	{
		return new AnswerImproverService(this.aiChatClientFactory.create(env));
	}
}
