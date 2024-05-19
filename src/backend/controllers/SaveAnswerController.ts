import { Context, TypedResponse } from 'hono';
import { AnswerSaverServiceFactory } from '../factories/AnswerSaverServiceFactory';

export class SaveAnswerController
{
	/**
	 * Constructor.
	 *
	 * @param {AnswerSaverServiceFactory} answerSaverService
	 */
	public constructor(
		private readonly answerSaverServiceFactory: AnswerSaverServiceFactory
	) {}

	/**
	 * Save an answer.
	 *
	 * @param {Context} context
	 * @returns {Promise<TypedResponse>}
	 */
	public async execute(context: Context): Promise<TypedResponse>
	{
		const data = await context.req.json();

		return this.answerSaverServiceFactory.create(context.env).saveAnswer(data).then((questionAnswer) =>
		{
			return context.json(questionAnswer);
		});
	}
}
