import { AiClientChatMessage } from './AiClientChatMessage';
import { AiClientChatResponse } from './AiClientChatResponse';
import { AiClientOptions } from './AiClientOptions';

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
	 * @param {AiClientChatMessage[]} messages
	 * @returns {Promise<AiClientChatResponse>}
	 */
	invoke(messages: AiClientChatMessage[]): Promise<AiClientChatResponse>;
}
