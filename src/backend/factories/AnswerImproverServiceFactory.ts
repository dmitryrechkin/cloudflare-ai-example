import { AnswerImproverService } from '../services/AnswerImproverService';
import { Bindings } from '../types/Bindings';
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
	 * Creates an answer improver service.
	 *
	 * @param {Bindings} env
	 * @returns {AnswerImproverService}
	 */
	public create(env: Bindings): AnswerImproverService
	{
		return new AnswerImproverService(this.aiChatClientFactory.create(env));
	}
}
