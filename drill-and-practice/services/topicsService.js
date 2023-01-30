import { executeQuery } from "../database/database.js"

const listTopics = async () => {
    const topics = await executeQuery(
        "SELECT * FROM topics ORDER BY name;"
    );

    return topics.rows;
};

const findTopicById = async (id) => {
    const result = await executeQuery(
        "SELECT * FROM topics WHERE id=$id;",{
        id: id,
    });

    return result.rows[0];
};

const addTopic = async (user_id, name) => {
    await executeQuery(
        "INSERT INTO topics (user_id, name) VALUES ($user_id, $name);", {
        user_id: user_id,
        name: name,
    });
};

const deleteTopic = async (id) => {
    await executeQuery(
        `DELETE FROM question_answers 
            WHERE question_id IN (
                SELECT id FROM questions
                 WHERE topic_id=$topic_id
            )
        `, {
        topic_id: id,
    });

    await executeQuery(
        `DELETE FROM question_answer_options 
            WHERE question_id IN (
                SELECT id FROM questions
                 WHERE topic_id=$topic_id
            )
        `, {
        topic_id: id,
    });

    await executeQuery(
        "DELETE FROM questions WHERE topic_id=$topic_id;", {
        topic_id: id,
    });

    await executeQuery(
        "DELETE FROM topics WHERE id=$id;", {
        id: id,
    });
};

export { listTopics, addTopic, deleteTopic, findTopicById }