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
            console.log("RESET_VALUES inputValues:", inputValues);

            return Array.from({ length: inputValues.length }).map(() => "");
        }
        case ACTION_TYPES.UPDATE_VALUE: {
            console.log("UPDATE_VALUE action.newValue:", action.newValue);
            console.log("UPDATE_VALUE action.index:", action.index);

            const newInputValues = [...inputValues]

            newInputValues[action.index] = action.newValue;

            console.log("UPDATE_VALUE newInputValues:", newInputValues);

            return newInputValues;
        }
        default: {
            return inputValues;
        }
    }
}

export default function FormModal({ heading, submitLabel, isOpen, closeModalFn, textFieldData }) {
    const inputRefs = useRef([]);
    const [inputValues, dispatch] = useReducer(reducerFn, Array.from({ length: textFieldData.length }).map(() => ""));

    console.log("inputRefs:", inputRefs);
    console.log("0 inputValues:", inputValues);

    useEffect(() => {
        dispatch({ type: ACTION_TYPES.RESET_VALUES });
    }, [isOpen]);

    const updateInputValue = (newValue, index) => {
        console.log("newValue:", newValue);
        console.log("index:", index);

        dispatch({
            type: ACTION_TYPES.UPDATE_VALUE,
            newValue,
            index,
        });
    };

    const textFieldKeys = useMemo(() => {
        return Array.from({ length: inputValues.length }).map(() => createRandomID());
    }, []);

    const renderTextFields = () => {
        return textFieldData.map((data, i) => {
            console.log("inputValues[i]:", inputValues[i]);

            const elm = (
                <TextField
                    type="text"
                    {...data}
                    id={textFieldKeys[i]}
                    key={textFieldKeys[i]}
                    ref={(input) => inputRefs.current[i] = input}
                    onChange={(event) => updateInputValue(event.target.value, i)}
                    value={inputValues[i]}
                />
            );

            console.log("elm:", elm);

            return elm;
        });
    }

    const handleSubmit = () => {

    }

    console.log("1 inputValues:", inputValues);

    return isOpen ? (
        <Modal
            open
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

                <div
                    className="text-field-container"
                    key={createRandomID()}
                >
                    {renderTextFields()}
                </div>

                inputValues: {inputValues.join(", ")}

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