import { AiClientChatMessagesBuilder } from '../builders/AiClientChatMessagesBuilder';
import { AnswerReadRepository } from '../repositories/AnswerReadRepository';
import { VectorizeReadRepository } from '../repositories/VectorizeReadRepository';
import { AnswerFinderService } from '../services/AnswerFinderService';
import { VectorizeReadService } from '../services/VectorizeReadService';
import { Bindings } from '../types/Bindings';
import { AiClientChatFactory } from './AiClientChatFactory';
import { AiClientEmbeddingsFactory } from './AiClientEmbeddingsFactory';

export class AnswerFinderServiceFactory
{
	/**
	 * Constructor.
	 *
	 * @param {AiClientChatFactory} aiChatClientFactory
	 */
	public constructor(
		private readonly aiChatClientFactory: AiClientChatFactory = new AiClientChatFactory(),
		private readonly aiClientEmbeddingsFactory: AiClientEmbeddingsFactory = new AiClientEmbeddingsFactory()
	) {}

	/**
	 * Creates an answer finder service.
	 *
	 * @param {Bindings} env
	 * @returns {AnswerFinderService}
	 */
	public create(env: Bindings): AnswerFinderService
	{
		return new AnswerFinderService(
			this.aiChatClientFactory.create(env),
			new VectorizeReadService(
				this.aiClientEmbeddingsFactory.create(env),
				new VectorizeReadRepository(
					env.VECTORIZE_INDEX,
					env.VECTORIZE_OPTIONS_MIN_MATCH_SCORE,
					env.VECTORIZE_OPTIONS_MAX_MATCHES
				)
			),
			new AnswerReadRepository(env.DB),
			new AiClientChatMessagesBuilder()
				.withAllowWithoutContext(env.ALLOW_ANSWER_WITHOUT_CONTEXT)
				.withSystemPrompt(env.ANSWER_FIND_SYSTEM_PROMPT)
		);
	}
}
