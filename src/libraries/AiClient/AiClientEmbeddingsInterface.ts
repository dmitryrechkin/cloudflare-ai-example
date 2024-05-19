import { AiClientEmbeddingsResponse } from './AiClientEmbeddingsResponse';
import { AiClientOptions } from './AiClientOptions';

export interface AiClientEmbeddingsInterface {
	/**
	 * Sets the options for the AI chat
	 *
	 * @param {Partial<AiClientOptions>} options
	 * @returns {void}
	 */
	setOptions(options: Partial<AiClientOptions>): void;

	/**
	 * Invokes the AI model with the input to create embeddings.
	 *
	 * @param {string} input
	 * @returns {Promise<AiClientEmbeddingsResponse>}
	 */
	create(input: string): Promise<AiClientEmbeddingsResponse>;
}
