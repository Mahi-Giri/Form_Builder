import { useState } from "react";
import {
    addField,
    addQuestion,
    handleInput,
    removeField,
    removeQuestion,
} from "../../utils/functions";
import { categorizeObj } from "../../utils/formBuilderUtils";

export default function useBuilder() {
    const [categorizeQues, setCategorizeQues] = useState([
        {
            id: 0,
            question: "",
            categories: [{ name: "" }],
            items: [{ name: "", belongsTo: "" }],
        },
    ]);

    function addCategorizeQues() {
        setCategorizeQues((prev) => addQuestion(prev, categorizeObj.question));
    }

    function removeCategorizeQues(id) {
        let index = parseInt(id);
        setCategorizeQues((prev) => removeQuestion(prev, index));
    }

    function addCategory(id) {
        const quesId = parseInt(id);
        setCategorizeQues((prev) => addField(prev, quesId, "categories", categorizeObj.categories));
    }

    //remove a categorize category
    function removeCategory(quesIndex, categoryIndex) {
        const quesId = parseInt(quesIndex);
        const categoryId = parseInt(categoryIndex);

        setCategorizeQues((prev) => removeField(prev, quesId, "categories", categoryId));
    }

    function addItem(id) {
        const quesId = parseInt(id);
        setCategorizeQues((prev) => addField(prev, quesId, "items", categorizeObj.categories));
    }

    function removeItem(quesIndex, categoryIndex) {
        const quesId = parseInt(quesIndex);
        const itemId = parseInt(categoryIndex);

        setCategorizeQues((prev) => removeField(prev, quesId, "items", itemId));
    }

    function handleInputChange(e, qId, field, fId, fKey) {
        const value = e.target.value;
        setCategorizeQues((prev) => handleInput(prev, qId, field, fId, fKey, value));
    }

    return {
        categorizeQues,
        addCategorizeQues,
        removeCategorizeQues,
        addCategory,
        removeCategory,
        addItem,
        removeItem,
        handleInputChange,
    };
}
