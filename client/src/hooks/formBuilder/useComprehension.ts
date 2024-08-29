import { useRef, useState } from "react";

import {
    addField,
    addQuestion,
    removeQuestion,
    removeField,
    handleInput,
} from "../../utils/functions";
import { comprehensionObj } from "../../utils/formBuilderUtils";

export default function useComprehension() {
    const [comprehensionQues, setComprehensionQues] = useState([
        {
            id: 0,
            text: "",
            ques: [
                {
                    text: "",
                    a: "",
                    b: "",
                    c: "",
                    d: "",
                },
            ],
        },
    ]);

    const passageRef = useRef({});

    function addComprehensionQuestions() {
        setComprehensionQues((prev) => addQuestion(prev, comprehensionObj.question));
    }

    function removeComprehensionQuestion(id) {
        const index = parseInt(id);
        setComprehensionQues((prev) => removeQuestion(prev, index));
    }

    function addMcq(id) {
        const quesId = parseInt(id);
        setComprehensionQues((prev) => addField(prev, quesId, "ques", comprehensionObj.ques));
    }

    function removeMcq(quesIndex, mcqIndex) {
        const quesId = parseInt(quesIndex);
        const mcqId = parseInt(mcqIndex);

        setComprehensionQues((prev) => removeField(prev, quesId, "ques", mcqId));
    }

    function handleInputChange(e, qId, field, fId, fKey) {
        const { value } = e.target;
        setComprehensionQues((prev) => handleInput(prev, qId, field, fId, fKey, value));
    }

    return {
        comprehensionQues,
        passageRef,
        addComprehensionQuestions,
        removeComprehensionQuestion,
        addMcq,
        removeMcq,
        handleInputChange,
    };
}
