import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as quizController from "./controllers/quizController.js"
import * as questionsController from "./controllers/questionsController.js"
import * as answerController from "./controllers/answersController.js"
import * as loginController from "./controllers/loginController.js";
import * as registrationController from "./controllers/registrationController.js";

import * as questionApi from "./apis/questionApi.js"

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicsController.listTopics);
router.post("/topics", topicsController.addTopic);
router.post("/topics/:id/delete", topicsController.deleteTopic);
router.get("/topics/:topic_id", topicsController.viewTopic);

router.post("/topics/:topic_id/questions", questionsController.addQuestion);
router.get("/topics/:topic_id/questions/:question_id", questionsController.viewQuestion);
router.post("/topics/:topic_id/questions/:question_id/delete", questionsController.deleteQuestion);

router.post("/topics/:topic_id/questions/:question_id/options", answerController.addAnswerOption);
router.post("/topics/:topic_id/questions/:question_id/options/:option_id/delete", answerController.deleteAnswerOption);

router.get("/quiz", quizController.listQuizTopics);
router.get("/quiz/:topic_id", quizController.findRandomQuestion);
router.get("/quiz/:topic_id/questions/:question_id", quizController.listAnswerOptions);
router.post("/quiz/:topic_id/questions/:question_id/options/:option_id", quizController.verifyAnswerOption);
router.get("/quiz/:topic_id/questions/:question_id/correct", quizController.isCorrect);
router.get("/quiz/:topic_id/questions/:question_id/incorrect", quizController.isIncorrect);

router.get("/api/questions/random", questionApi.listRandomQuestion);
router.post("/api/questions/answer", questionApi.handleAnswer);


router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

export { router };
