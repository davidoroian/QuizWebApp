import * as topicsService from "../../services/topicsService.js"
import * as questionsService from "../../services/questionsService.js"
import * as answersService from "../../services/answersService.js"

const listQuizTopics = async ({ render }) => {
    render("quiz.eta", {
        topics: await topicsService.listTopics(),
    });
};

const findRandomQuestion = async ({ response, params, render }) => {
    const question = await questionsService.findRandomQuestion(params.topic_id);

    if (question) {
        response.redirect(`/quiz/${params.topic_id}/questions/${question.id}`);
    } else {
        render("noQuestions.eta");
    }
};

const listAnswerOptions = async ({ render, params }) => {
    render("quizQuestion.eta", {
        topic: await topicsService.findTopicById(params.topic_id),
        question: await questionsService.findQuestionById(params.question_id),
        answer_options: await answersService.listAnswerOptions(params.question_id),
    });
};

const verifyAnswerOption = async({ params, response }) =>{
    const option = await answersService.findAnswerOptionById(params.option_id);

    if(!option.is_correct){
        response.redirect(`/quiz/${params.topic_id}/questions/${params.question_id}/incorrect`);
    } else {
        response.redirect(`/quiz/${params.topic_id}/questions/${params.question_id}/correct`);
    }
};

const isCorrect = async ({render, params}) =>{
    render("correct.eta", {
        topic: await topicsService.findTopicById(params.topic_id),
    });
}

const isIncorrect = async ({render, params}) =>{
    render("incorrect.eta", {
        correct_options: await answersService.findCorrectAnswerOptions(params.question_id),
        topic: await topicsService.findTopicById(params.topic_id),
    });
}

export { listQuizTopics, findRandomQuestion, listAnswerOptions, verifyAnswerOption, isCorrect, isIncorrect }