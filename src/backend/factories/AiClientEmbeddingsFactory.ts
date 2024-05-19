import { AiClientEmbeddingsInterface } from '../../libraries/AiClient/AiClientEmbeddingsInterface';
import { AiClientEmbeddingsOptionsFactory } from './AiClientEmbeddingsOptionsFactory';
import { CloudflareAiClientEmbeddings } from '../../libraries/AiClient/Cloudflare/CloudflareAiClientEmbeddings';
import { Bindings } from '../types/Bindings';

export class AiClientEmbeddingsFactory
{
	/**
	 * Constructor.
	 *
	 * @param {AiClientEmbeddingsOptionsFactory} aiClientEmbeddingsOptionsFactory
	 */
	public constructor(
		private readonly aiClientEmbeddingsOptionsFactory: AiClientEmbeddingsOptionsFactory = new AiClientEmbeddingsOptionsFactory()
	) {}

	/**
	 * Creates an AI chat client.
	 *
	 * @param {Bindings} env
	 * @returns {AiClientEmbeddingsInterface}
	 */
	public create(env: Bindings): AiClientEmbeddingsInterface
	{
		return new CloudflareAiClientEmbeddings(env.AI, this.aiClientEmbeddingsOptionsFactory.create(env));
	}
}
