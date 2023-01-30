import { validasaur } from "../deps.js";

const topicValidationRules = {
    name: [validasaur.required, validasaur.minLength(2)],
};

const questionValidationRules = {
    question_text: [validasaur.required, validasaur.minLength(4)],
};

const answerOptionValidationRules = {
    option_text: [validasaur.required],
};

export { topicValidationRules, questionValidationRules, answerOptionValidationRules }