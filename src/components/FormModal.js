"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useEffect, useMemo, useReducer, useRef } from "react";
import createRandomID from "@/services/createRandomID";

const ACTION_TYPES = {
    RESET_VALUES: "RESET_VALUES",
    UPDATE_VALUE: "UPDATE_VALUE",
}

const reducerFn = (inputValues, action) => {
    switch (action.type) {
        case ACTION_TYPES.RESET_VALUES: {
            return Array.from({ length: inputValues.length }).map(() => "");
        }
        case ACTION_TYPES.UPDATE_VALUE: {
            const newInputValues = [...inputValues]

            newInputValues[action.index] = action.newValue;

            return newInputValues;
        }
        default: {
            return inputValues;
        }
    }
}

export default function FormModal({ heading, submitLabel, isOpen, closeModalFn, textFieldData, verifyFn }) {
    const inputRefs = useRef([]);
    const [inputValues, dispatch] = useReducer(reducerFn, Array.from({ length: textFieldData.length }).map(() => ""));


    useEffect(() => {
        dispatch({ type: ACTION_TYPES.RESET_VALUES });
    }, [isOpen]);

    const updateInputValue = (newValue, index) => dispatch({
        type: ACTION_TYPES.UPDATE_VALUE,
        newValue,
        index,
    });

    const textFieldKeys = useMemo(() => {
        return Array.from({ length: inputValues.length }).map(() => createRandomID());
    }, []);

    const onEnterKey = (event) => {
        if (event.key === "Enter") event.target.blur();
    }

    // const renderTextFields = () => {
    //     return textFieldData.map((data, i) => {

    //         const elm = (
    //             <TextField
    //                 type="text"
    //                 {...data}
    //                 id={textFieldKeys[i]}
    //                 key={textFieldKeys[i]}
    //                 ref={(input) => inputRefs.current[i] = input}
    //                 onBlur={(event) => updateInputValue(event.target.value, i)}
    //                 onKeyDown={onEnterKey}
    //                 defaultValue={inputValues[i]}
    //             />
    //         );

    //         return elm;
    //     });
    // }

    const handleSubmit = () => {
        verifyFn(inputValues);
    }

    return isOpen ? (
        <Modal
            open
            disableAutoFocus
            onClose={closeModalFn}
        >
            <Box className="modal-box">
                <div key={createRandomID()}>
                    <h3 onClick={() => console.log("test inputValues:", inputValues)}>{heading}</h3>
                    
                    <IconButton
                        aria-label="close"
                        onClick={closeModalFn}
                    >
                        <CloseIcon/>
                    </IconButton>
                </div>

                <form
                    className="text-field-container"
                    key={createRandomID()}
                >
                    {textFieldData.map((data, i) => (
                        <TextField
                            type="text"
                            {...data}
                            id={textFieldKeys[i]}
                            key={textFieldKeys[i]}
                            ref={(input) => inputRefs.current[i] = input}
                            onBlur={(event) => updateInputValue(event.target.value, i)}
                            onKeyDown={onEnterKey}
                            defaultValue={inputValues[i]}
                        />
                    ))}
                </form>

                <br/>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    {submitLabel}
                </Button>
            </Box>
        </Modal>
    ) : <></>;
}