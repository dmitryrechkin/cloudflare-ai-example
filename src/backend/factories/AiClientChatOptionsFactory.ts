import { AiClientOptions } from '../../libraries/AiClient/AiClientOptions';
import { Bindings } from '../types/Bindings';

export class AiClientChatOptionsFactory
{
	/**
	 * Creates the AI chat client options.
	 *
	 * @param {Bindings} env
	 * @returns {Partial<AiClientOptions>}
	 */
	public create(env: Bindings): Partial<AiClientOptions>
	{
		return {
			modelId: env.AI_CHAT_MODEL_ID,
			timeout: 600,
			maxTokens: 1024,
			temperature: 0.75
		};
	}
}
