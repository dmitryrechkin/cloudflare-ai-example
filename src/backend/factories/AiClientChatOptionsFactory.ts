import { AiClientOptions } from '../../libraries/AiClient/Types';

export class AiClientChatOptionsFactory
{
	/**
	 * Creates the AI chat client options.
	 *
	 * @param {any} env
	 * @returns {Partial<AiClientOptions>}
	 */
	public create(env: any): Partial<AiClientOptions>
	{
		return {
			modelId: env?.AI_CHAT_MODEL_ID,
			timeout: 600,
			maxTokens: 1024,
			temperature: 0.75
		};
	}
}
