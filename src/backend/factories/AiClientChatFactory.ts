import { AiClientChatInterface } from '../../libraries/AiClient/AiClientChatInterface';
import { CloudflareAiClientChat } from '../../libraries/AiClient/Cloudflare/CloudflareAiClientChat';
import { AiClientChatOptionsFactory } from './AiClientChatOptionsFactory';

export class AiClientChatFactory
{
	/**
	 * Constructor.
	 *
	 * @param {AiClientChatOptionsFactory} aiChatClientOptionsFactory
	 */
	public constructor(
		private readonly aiChatClientOptionsFactory: AiClientChatOptionsFactory = new AiClientChatOptionsFactory()
	) {}

	/**
	 * Creates an AI chat client.
	 *
	 * @param {any} env
	 * @returns {AiClientChatInterface}
	 */
	public create(env: any): AiClientChatInterface
	{
		return new CloudflareAiClientChat(env?.AI, this.aiChatClientOptionsFactory.create(env));
	}
}
