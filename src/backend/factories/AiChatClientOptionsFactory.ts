import { AiChatClientOptions } from "../../libraries/AiChatClient/Types";

export class AiChatClientOptionsFactory {
	/**
	 * Creates the AI chat client options.
	 * 
	 * @param {any} env
	 * @returns {Partial<AiChatClientOptions>}
	 */
	public create(env: any): Partial<AiChatClientOptions> {
		return {
			modelId: env?.AI_MODEL_ID,
			timeout: 600,
			maxTokens: 1024,
			temperature: 0.75,
		};
	}
}