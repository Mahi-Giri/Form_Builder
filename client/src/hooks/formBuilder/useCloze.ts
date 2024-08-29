import { useRef, useState } from "react";

import {
    addField,
    addQuestion,
    removeQuestion,
    removeField,
    handleInput,
} from "../../utils/functions";
import { clozeObj } from "../../utils/formBuilderUtils";

export default function useCloze() {
    const [clozeQues, setClozeQues] = useState([
        {
            id: 0,
            question: "",
            options: [
                {
                    name: "",
                    underlined: false,
                },
            ],
        },
    ]);

    const clozeRef = useRef({});

    function addClozeQuestions() {
        setClozeQues((prev) => addQuestion(prev, clozeObj.question));
    }

    function removeClozeQuestion(id) {
        const index = parseInt(id);
        setClozeQues((prev) => removeQuestion(prev, index));
    }

    function addOption(id) {
        const quesId = parseInt(id);
        setClozeQues((prev) => addField(prev, quesId, "options", clozeObj.options));
    }

    function removeOption(quesIndex, optionIndex) {
        const quesId = parseInt(quesIndex);
        const optionId = parseInt(optionIndex);

        setClozeQues((prev) => removeField(prev, quesId, "options", optionId));
    }

    function handleInputChange(e, qId, field, fId, fKey) {
        const { value } = e.target;
        setClozeQues((prev) => handleInput(prev, qId, field, fId, fKey, value));
    }

    function makeSelection(qId) {
        const str = window.getSelection();
        const rng = str.getRangeAt(0);

        const span = document.createElement("span");
        span.style.textDecoration = "underline";

        rng.surroundContents(span);
        const text = str.toString();

        setClozeQues((prev) =>
            prev.map((ques, id) => {
                return id === qId
                    ? { ...ques, options: [...ques.options, { name: text, underlined: true }] }
                    : ques;
            })
        );
    }

    return {
        clozeQues,
        clozeRef,
        addClozeQuestions,
        removeClozeQuestion,
        addOption,
        removeOption,
        handleInputChange,
        makeSelection,
    };
}
