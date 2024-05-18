import { AiChatClientMessage, AiChatClientOptions, AiChatClientResponse } from "./Types";

export interface AiChatClientInterface {
	/**
	 * Sets the options for the AI chat
	 *
	 * @param {Partial<AiChatClientOptions>} options
	 * @returns {void}
	 */
	setOptions(options: Partial<AiChatClientOptions>): void;

	/**
	 * Invokes the AI model with the given messages
	 *
	 * @param {AiChatClientMessage[]} messages
	 * @returns {Promise<AiChatClientResponse>}
	 */
	invoke(messages: AiChatClientMessage[]): Promise<AiChatClientResponse>;
}
