import { AiChatClientMessage, AiClientOptions, AiChatClientResponse } from './Types';

export interface AiClientChatInterface {
	/**
	 * Sets the options for the AI chat
	 *
	 * @param {Partial<AiClientOptions>} options
	 * @returns {void}
	 */
	setOptions(options: Partial<AiClientOptions>): void;

	/**
	 * Invokes the AI model with the given messages
	 *
	 * @param {AiChatClientMessage[]} messages
	 * @returns {Promise<AiChatClientResponse>}
	 */
	invoke(messages: AiChatClientMessage[]): Promise<AiChatClientResponse>;
}
