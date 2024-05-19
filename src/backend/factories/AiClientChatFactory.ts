import { AiClientChatInterface } from '../../libraries/AiClient/AiClientChatInterface';
import { CloudflareAiClientChat } from '../../libraries/AiClient/Cloudflare/CloudflareAiClientChat';
import { Bindings } from '../types/Bindings';
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
	 * @param {Bindings} env
	 * @returns {AiClientChatInterface}
	 */
	public create(env: Bindings): AiClientChatInterface
	{
		return new CloudflareAiClientChat(env.AI, this.aiChatClientOptionsFactory.create(env));
	}
}
