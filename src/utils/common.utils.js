export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

export const removeTextArtefactsV2 = (entry) => {
    const PATTERN_TO_REMOVE = /&[A-Za-z&_!#*?+=$%^()/\\0-9]+;/g;
    const JSON_STRING = JSON.stringify(entry);
    const JSON_STRING_WITHOUT_ARTIFACTS = JSON_STRING.replaceAll(PATTERN_TO_REMOVE, ' ');
    return JSON.parse(JSON_STRING_WITHOUT_ARTIFACTS);
};

export const extractQuestions = (questions) => {
    const questionWithoutArtefacts = removeTextArtefactsV2(questions);
    return questionWithoutArtefacts.map((question) => ({
        question: question.question,
        answers: shuffleArray([question.correct_answer, ...question.incorrect_answers]),
        correctAnswer: question.correct_answer,
    }));
};
