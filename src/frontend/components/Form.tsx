import { useState } from 'hono/jsx';
import { QuestionAnswer } from '../../types/QuestionAnswer';
import { Errors } from '../../types/Errors';
import { Answer } from '../../types/Answer';

export const Form = () => {
	const [questionId, setQuestionId] = useState(0);
	const [answerId, setAnswerId] = useState(0);
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const [alerts, setAlerts] = useState('');

	console.log("Form component rendered ");

	const handleGenerateAnswer = async () => {
		console.log("handleGenerateAnswer called with question:", question);

		const response = await fetch('/api/v1/questions', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ question })
		});

		const data = await response.json() as QuestionAnswer | Errors;

		console.log("data:", JSON.stringify(data));

		setQuestionId((data as QuestionAnswer)?.questionId ?? 0);
		setAnswerId((data as QuestionAnswer)?.answerId ?? 0);
		setAnswer((data as Answer)?.answer ?? '');
		setAlerts((data as Errors)?.errors[0] ?? '');
	};

	const handleImproveAnswer = async () => {
		console.log("handleImproveAnswer called with answer:", answer);

		const response = await fetch('/api/v1/answers/improve', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ answer })
		});

		const data = await response.json() as Answer | Errors;

		console.log("data:", JSON.stringify(data));

		setAnswer((data as Answer)?.answer ?? '');
		setAlerts((data as Errors)?.errors[0] ?? '');
	};

	const handleSaveAnswer = async () => {
		console.log("handleSaveAnswer called with answer:", answer);

		const response = await fetch('/api/v1/answers', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ question, answer })
		});

		const data = await response.json() as QuestionAnswer | Errors;
		const error = (data as Errors)?.errors ? (data as Errors)?.errors[0] : undefined;

		console.log("data:", JSON.stringify(data));

		setQuestionId((data as QuestionAnswer)?.questionId ?? 0);
		setAnswerId((data as QuestionAnswer)?.answerId ?? 0);
		setAlerts(error ?? 'Saved!');
	};

	return (
		<div>
			<h1>Example JSX Form with Hono for CloudFlare Page</h1>
			<dialog id="alerts" style={{ display: alerts ? 'block' : 'none' }}>{alerts}</dialog>
			<form onSubmit={(e) => e.preventDefault()}>
				<input type="hidden" name="questionId" value={questionId} />
				<input type="hidden" name="answerId" value={answerId} />
				<div>
					<label htmlFor="question">Question</label>
					<textarea id="question" name="question" rows={10} value={question} onClick={() => setAlerts('')} onChange={(e) => setQuestion((e.target as HTMLTextAreaElement)?.value ?? '')}></textarea>
				</div>
				<div>
					<label htmlFor="answer">Answer</label>
					<textarea id="answer" name="answer" rows={10} value={answer} onClick={() => setAlerts('')} onChange={(e) => setAnswer((e.target as HTMLTextAreaElement)?.value ?? '')}></textarea>
				</div>
				<div>
					<button type="button" onClick={handleGenerateAnswer}>Find Answer</button>
					<button type="button" onClick={handleImproveAnswer}>Improve Answer</button>
					<button type="button" onClick={handleSaveAnswer}>Save Answer</button>
				</div>
			</form>
		</div>
	);
};
