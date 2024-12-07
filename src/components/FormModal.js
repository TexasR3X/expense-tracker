"use client";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { useEffect, useMemo, useReducer } from "react";
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

export default function FormModal({ heading, isOpen, closeModalFn, children }) {
    const [inputValues, dispatch] = useReducer(reducerFn, []);

    const textFields = useMemo(() => {
        children = Array.isArray(children) ? children : [children];

        return children.map((child, i) => {
            console.log("");
            console.log("child.props:", child.props);

            const elm = (
                <TextField
                    {...child.props}
                    value={inputValues[i]}
                    onChange={(e) => updateInputValue(e.target.value)}
                />
            );

            console.log("elm.props:", elm.props);

            return elm; 
        });
    }, []);

    // useEffect(() => {
    //     children = Array.isArray(children) ? children : [children];

    //     // children = children.map((child, i) => {
    //     //     console.log("");
    //     //     console.log("child.props:", child.props);

    //     //     const elm = (
    //     //         <TextField
    //     //             // value={inputValues[i]}
    //     //             {...child.props}
    //     //             variant="filled"
    //     //             value="Apple"
    //     //         />
    //     //     );

    //     //     console.log("elm:", elm);

    //     //     return elm;
    //     // });

    //     // console.log("children:", children);
    // }, [isOpen, [inputValues]]);

    useEffect(() => {
        if (isOpen) dispatch({
            type: ACTION_TYPES.RESET_VALUES,
            length: children.length,
        });
    }, [isOpen]);

    const updateInputValue = (newValue) => {
        console.log("newValue:", newValue);

        dispatch({
            type: ACTION_TYPES.UPDATE_VALUE,
            newValue,
        })
    };

    // children[0].props = "123";

    // console.log("T:", <TextField {...children[0].props}/>);

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
                    {textFields}
                </div>
            </Box>
        </Modal>
    ) : <div>Modal</div>;
}