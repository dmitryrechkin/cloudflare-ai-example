import { Context, TypedResponse } from 'hono';
import { AnswerImproverService } from '../services/AnswerImproverService';

export class ImproveAnswerController
{
	/**
	 * Constructor.
	 *
	 * @param {AnswerImproverService} AnswerImproverService
	 */
	public constructor(
		private readonly answerImproverService: AnswerImproverService = new AnswerImproverService()
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

		return this.answerImproverService.improveAnswer(data.answer).then((improvedAnswer) =>
		{
			return context.json({ answer: improvedAnswer });
		});
	}
}
