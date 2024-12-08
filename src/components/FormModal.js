"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useEffect, useReducer, useRef } from "react";
import { createRandomID } from "@/services/randomIDs";

const ACTION_TYPES = {
    RESET_VALUES: "RESET_VALUES",
    UPDATE_VALUE: "UPDATE_VALUE",
}

const reducerFn = (inputValues, action) => {
    switch (action.type) {
        case ACTION_TYPES.RESET_VALUES: {
            return Array.from({ length: action.length }).map(() => "");
        }
        case ACTION_TYPES.UPDATE_VALUE: {
            inputValues[action.index] = action.newValue;
            return inputValues;
        }
    }
}

export default function FormModal({ heading, isOpen, closeModalFn, textFieldData }) {
    const inputRefs = useRef([]);
    const [inputValues, dispatch] = useReducer(reducerFn, Array.from({ length: textFieldData.length }).map(() => ""));

    console.log("inputRefs:", inputRefs);
    console.log("inputValues:", inputValues);

    useEffect(() => {
        if (isOpen) dispatch({
            type: ACTION_TYPES.RESET_VALUES,
            length: inputRefs.length,
        });
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
                    {textFieldData.map((data, i) => (
                        <TextField
                            type="text"
                            {...data}
                            id={createRandomID()}
                            key={createRandomID()}
                            ref={(input) => inputRefs.current[i] = input}
                            value={inputValues[i]}
                            onChange={(event) => updateInputValue(event.target.value, i)}
                        />
                    ))}
                </div>

                <Button></Button>
            </Box>
        </Modal>
    ) : <></>;
}