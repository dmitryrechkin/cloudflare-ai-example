import { AiClientChatInterface } from '../AiClientChatInterface';
import { AiChatClientMessage, AiClientOptions, AiChatClientResponse } from '../Types';
import { Ai } from '@cloudflare/ai';

export class CloudflareAiClientChat implements AiClientChatInterface
{
	private ai: Ai;

	/**
	 * Constructor.
	 *
	 * @param {any} binding
	 * @param {Partial<AiChatOptions>} options
	 */
	public constructor(
		binding: any,
		private options: Partial<AiClientOptions> = {}
	)
	{
		this.ai = new Ai(binding);
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
	 * Invokes the AI model with the given messages
	 *
	 * @param {AiChatClientMessage[]} messages
	 * @returns {Promise<AiChatClientResponse>}
	 */
	public async invoke(messages: AiChatClientMessage[]): Promise<AiChatClientResponse>
	{
		let result: Promise<AiChatClientResponse>;

		try
		{
			const response = await this.ai.run(
				this.options.modelId,
				{
					messages,
					stream: false,
					timeout: this.options.timeout,
					// eslint-disable-next-line @typescript-eslint/naming-convention
					max_tokens: this.options.maxTokens,
					temperature: this.options.temperature
				}
			);

			result = Promise.resolve({
				response: (response as {response: string}).response,
				success: true,
				errors: []
			});
		}
		catch (error)
		{
			console.error(error);

			result = Promise.resolve({
				response: '',
				success: false,
				errors: [JSON.stringify(error)]
			});
		}

		return result;
	}
}
