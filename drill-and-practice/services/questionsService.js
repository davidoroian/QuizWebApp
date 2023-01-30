import { executeQuery } from "../database/database.js"

const addQuestion = async (user_id, topic_id, question_text) => {
    await executeQuery(
        "INSERT INTO questions (user_id, topic_id, question_text) VALUES ($user_id, $topic_id, $question_text);", {
        user_id: user_id,
        topic_id: topic_id,
        question_text: question_text,
    });
};

const listQuestions = async (topic_id) => {
    const result = await executeQuery(
        "SELECT * FROM questions WHERE topic_id=$topic_id;",
        { topic_id: topic_id, }
    );

    return result.rows;
};

const findQuestionById = async (id) => {
    const result = await executeQuery(
        "SELECT * FROM questions WHERE id=$id;", {
        id: id,
    });

    return result.rows[0];
};

const deleteQuestion = async (id) => {
    await executeQuery(
        "DELETE FROM questions WHERE id=$id;",
        {
            id: id,
        }
    );
}

const findRandomQuestion = async (topic_id) => {
    const result = await executeQuery(
        "SELECT * FROM questions WHERE topic_id=$topic_id ORDER BY RANDOM() LIMIT 1;", 
        {
            topic_id: topic_id,
        }
    );

    return result.rows[0];
}

const findRandomQuestionNoId = async () => {
    const result = await executeQuery(
        "SELECT * FROM questions ORDER BY RANDOM() LIMIT 1;", 
    );

    return result.rows[0];
}

export { addQuestion, listQuestions, findQuestionById, deleteQuestion, findRandomQuestion, findRandomQuestionNoId }