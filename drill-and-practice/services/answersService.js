import { executeQuery } from "../database/database.js"

const addAnswerOption = async (question_id, option_text, is_correct) => {
    await executeQuery(
        "INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($question_id, $option_text, $is_correct);",
        {
            question_id: question_id,
            option_text: option_text,
            is_correct: is_correct,
        }
    );
}

const listAnswerOptions = async (question_id) => {
    const result = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id=$question_id;",
        {
            question_id: question_id,
        }
    );

    return result.rows;
}

const deleteAnswerOption = async (id) => {
    await executeQuery(
        "DELETE FROM question_answers WHERE question_answer_option_id=$id;",
        {
            id: id,
        }
    );

    await executeQuery(
        "DELETE FROM question_answer_options WHERE id=$id;",
        {
            id: id,
        }
    );
}

const findAnswerOptionById = async (id) =>{
    const result = await executeQuery(
        "SELECT * FROM question_answer_options WHERE id=$id;",
        {
            id: id,
        }
    );

    return result.rows[0];
}

const findCorrectAnswerOptions = async (question_id) =>{
    const result = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id=$question_id AND is_correct=TRUE;",
        {
            question_id: question_id,
        }
    );

    return result.rows;
}

export { addAnswerOption, listAnswerOptions, deleteAnswerOption, findAnswerOptionById, findCorrectAnswerOptions }