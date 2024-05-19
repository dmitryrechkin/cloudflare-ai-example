import { Context, TypedResponse } from 'hono';
import { AnswerImproverServiceFactory } from '../factories/AnswerImproverServiceFactory';

export class ImproveAnswerController
{
	/**
	 * Constructor.
	 *
	 * @param {AnswerImproverServiceFactory} answerImproverServiceFactory
	 */
	public constructor(
		private readonly answerImproverServiceFactory: AnswerImproverServiceFactory
	) {}

	/**
	 * Returns a found answer for a given question.
	 *
	 * @param {Context} context
	 * @returns {Promise<TypedResponse>}
	 */
	public async execute(context: Context): Promise<TypedResponse>
	{
		const data = await context.req.json();

		return this.answerImproverServiceFactory.create(context.env).improveAnswer(data.answer).then((answer) =>
		{
			return context.json(answer);
		});
	}
}
