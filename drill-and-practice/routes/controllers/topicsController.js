import * as topicsService from "../../services/topicsService.js"
import * as questionsService from "../../services/questionsService.js"
import { validasaur } from "../../deps.js";
import { topicValidationRules } from "../../utils/validationRules.js";

const getTopicData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        name: params.get("name"),
    };
};

const addTopic = async ({ request, response, user, render }) => {
    const topicData = await getTopicData(request);

    const [passes, errors] = await validasaur.validate(
        topicData,
        topicValidationRules,
    );

    if (!passes) {
        topicData.validationErrors = errors;
        render("topics.eta", topicData);
    } else {
        await topicsService.addTopic(
            user.id,
            topicData.name,
        );

        response.redirect("/topics");
    }
};

const listTopics = async ({ render }) => {
    render("topics.eta", {
        topics: await topicsService.listTopics(),
    });
};


const deleteTopic = async ({ params, response }) => {
    await topicsService.deleteTopic(params.id);
    response.redirect("/topics");
};

const viewTopic = async ({params, render}) =>{
    render("topic.eta", {
        topic: await topicsService.findTopicById(params.topic_id),
        questions: await questionsService.listQuestions(params.topic_id),
    });
};

export { listTopics, addTopic, deleteTopic, viewTopic }