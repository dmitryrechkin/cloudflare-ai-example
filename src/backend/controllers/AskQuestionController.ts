import { Context, TypedResponse } from 'hono';
import { AnswerFinderServiceFactory } from '../factories/AnswerFinderServiceFactory';

export class AskQuestionController
{
	/**
	 * Constructor.
	 *
	 * @param {AnswerFinderServiceFactory} answerFinderServiceFactory
	 */
	public constructor(
		private readonly answerFinderServiceFactory: AnswerFinderServiceFactory
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

		return this.answerFinderServiceFactory.create(context.env).findAnswer(data.question).then((answer) =>
		{
			return context.json(answer);
		});
	}
}
