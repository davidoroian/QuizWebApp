import * as questionsService from "../../services/questionsService.js"
import * as topicsService from "../../services/topicsService.js"
import * as answerService from "../../services/answersService.js"
import { validasaur } from "../../deps.js";
import { questionValidationRules } from "../../utils/validationRules.js";

const getQuestionData = async (request, params) => {
    const body = request.body({ type: "form" });
    const formParams = await body.value;
    return {
        topic: await topicsService.findTopicById(params.topic_id),
        question_text: formParams.get("question_text"),
    };
};

const addQuestion = async ({ request, response, user, render, params }) => {
    const questionData = await getQuestionData(request, params);

    const [passes, errors] = await validasaur.validate(
        questionData,
        questionValidationRules,
    );

    if (!passes) {
        questionData.validationErrors = errors;
        render("topic.eta", questionData);
    } else {
        await questionsService.addQuestion(
            user.id,
            params.topic_id,
            questionData.question_text,
        );

        response.redirect(`/topics/${params.topic_id}`);
    }
};

const viewQuestion = async ({ params, render }) => {
    render("question.eta", {
        question: await questionsService.findQuestionById(params.question_id),
        topic: await topicsService.findTopicById(params.topic_id),
        answer_options: await answerService.listAnswerOptions(params.question_id),
    });
};

const deleteQuestion = async ({params, response}) =>{
    await questionsService.deleteQuestion(params.question_id);
    response.redirect(`/topics/${params.topic_id}`);
}

export { addQuestion, viewQuestion, deleteQuestion }