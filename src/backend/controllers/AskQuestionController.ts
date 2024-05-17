import { Context, TypedResponse } from "hono";
import { AnswerFinderService } from "../services/AnswerFinderService";

export class AskQuestionController {
	/**
	 * Constructor.
	 * 
	 * @param {AnswerFinderService} answerFinderService 
	 */
	public constructor(
		private answerFinderService: AnswerFinderService = new AnswerFinderService()
	) {}

	/**
	 * Returns a found answer for a given question.
	 * 
	 * @param {Context} context
	 * @returns {Promise<TypedResponse>}
	 */
	public async execute(context: Context): Promise<TypedResponse> {
		const data = await context.req.json();

		return this.answerFinderService.findAnswer(data.question).then((answer) => {
			return context.json({ answer });
		});
	}
}