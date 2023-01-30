import * as answerService from "../../services/answersService.js"
import * as questionService from "../../services/questionsService.js"
import * as topicService from "../../services/topicsService.js"
import { validasaur } from "../../deps.js";
import { answerOptionValidationRules } from "../../utils/validationRules.js";

const getAnswerOptionData = async (request, params) => {
    const body = request.body({ type: "form" });
    const formParams = await body.value;
    let is_correct = false;

    if(formParams.has("is_correct")) is_correct = true;

    return {
        topic: await topicService.findTopicById(params.topic_id),
        question: await questionService.findQuestionById(params.question_id),
        option_text: formParams.get("option_text"),
        is_correct: is_correct,
    };
};

const addAnswerOption = async ({ request, response, render, params }) => {
    const answerOptionData = await getAnswerOptionData(request, params);

    const [passes, errors] = await validasaur.validate(
        answerOptionData,
        answerOptionValidationRules,
    );

    if (!passes) {
        answerOptionData.validationErrors = errors;
        render("question.eta", answerOptionData);
    } else {
        await answerService.addAnswerOption(
            params.question_id,
            answerOptionData.option_text,
            answerOptionData.is_correct,
        );

        response.redirect(`/topics/${params.topic_id}/questions/${params.question_id}`);
    }
};

const deleteAnswerOption = async ({params, response}) =>{
    await answerService.deleteAnswerOption(params.option_id);
    response.redirect(`/topics/${params.topic_id}/questions/${params.question_id}`);
}

export { getAnswerOptionData, addAnswerOption, deleteAnswerOption }