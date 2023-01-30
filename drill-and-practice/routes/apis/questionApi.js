import * as questionsService from "../../services/questionsService.js";
import * as answersService from "../../services/answersService.js";

const listRandomQuestion = async ({ response }) => {
    let data = {
        questionId: "",
        questionText: "",
        answerOptions: [],
    }

    const question = await questionsService.findRandomQuestionNoId();

    if (!question) {
        response.body = {};
        return;
    }

    delete question.user_id;
    delete question.topic_id;
    data.questionId = question.id;
    data.questionText = question.question_text;
    const answerOptions = await answersService.listAnswerOptions(question.id);

    answerOptions.forEach((option) => {
        let ansOption = {
            optionId: "",
            optionText: "",
        }

        ansOption.optionId=option.id;
        ansOption.optionText=option.option_text;

        data.answerOptions.push(ansOption);
    });

    response.body = data;
};

const handleAnswer = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const content = await body.value;

    const answer = await answersService.findAnswerOptionById(content.optionId);
    
    if (answer && content.questionId && content.optionId) {
        if (answer.is_correct===true && answer.question_id === Number(content.questionId)) {
            response.body = { correct: true };
            return;
        }
    } 
    response.body = { correct: false };
};

export { listRandomQuestion, handleAnswer };