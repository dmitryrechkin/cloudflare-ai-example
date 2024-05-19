import { AnswerImproverService } from '../services/AnswerImproverService';
import { AiClientChatFactory } from './AiClientChatFactory';

export class AnswerImproverServiceFactory
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
	 * @returns {AnswerImproverService}
	 */
	public create(env: any): AnswerImproverService
	{
		return new AnswerImproverService(this.aiChatClientFactory.create(env));
	}
}
