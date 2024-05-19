import { AiClientOptions } from '../AiClientOptions';
import { AiClientEmbeddingsInterface } from '../AiClientEmbeddingsInterface';
import { AiClientEmbeddingsResponse } from '../AiClientEmbeddingsResponse';

export class CloudflareAiClientEmbeddings implements AiClientEmbeddingsInterface
{
	/**
	 * Constructor.
	 *
	 * @param {Ai} ai
	 * @param {Partial<AiChatOptions>} options
	 */
	public constructor(
		private readonly ai: Ai,
		private options: Partial<AiClientOptions> = {}
	)
	{
		this.ai = ai;
		this.setOptions(options);
	}

	/**
	 * Sets the options for the AI chat.
	 *
	 * @param {Partial<AiChatOptions>} options
	 * @returns {void}
	 */
	public setOptions(options: Partial<AiClientOptions>): void
	{
		// Set the default options
		this.options = {
			modelId: '@cf/meta/llama-2-7b-chat-int8',
			maxRetries: 3,
			maxTokens: 256,
			temperature: 0.5,
			timeout: 5000,
			...this.options,
			...options
		};
	}

	/**
	 * Invokes the AI model with the input to create embeddings.
	 *
	 * @param {string} input
	 * @returns {Promise<AiClientEmbeddingsResponse>}
	 */
	public async create(input: string): Promise<AiClientEmbeddingsResponse>
	{
		let result: Promise<AiClientEmbeddingsResponse>;

		try
		{
			const response: AiTextEmbeddingsOutput = await this.ai.run(
				this.options.modelId,
				{
					text: [ input ],
					stream: false,
					timeout: this.options.timeout
				}
			);

			result = Promise.resolve({
				data: response.data[0],
				success: true,
				errors: []
			});
		}
		catch (error)
		{
			console.error(error);

			result = Promise.resolve({
				data: [],
				success: false,
				errors: [(error as Error)?.message ?? 'Unknown error']
			});
		}

		return result;
	}
}
