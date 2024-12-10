"use client";
import { useCallback, useContext, useMemo, useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Money from "./Money";
import FormModal from "./FormModal";
import { sanitizeNum } from "@/services/sanitizeData";
import { Goal } from "@/services/database";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";

export default function AddGoalButton({ goal }) {
    const [openModal, setOpenModal] = useState(false);

    console.log("A goal:", goal);

    const { amount, type } = goal;

    if (amount === null) {
        const handleAddIconClick = (event) => {
            setOpenModal(true);
        }

        return (
            <>
                <IconButton
                    aria-label="add goal"
                    onClick={handleAddIconClick}
                >
                    <AddIcon/>
                </IconButton>

                <AddGoalModal
                    isOpen={openModal}
                    closeModalFn={() => setOpenModal(false)}
                    type={type}
                />
            </>
        );
    }
    else return <Money amount={amount}/>;
}

function AddGoalModal({ isOpen, closeModalFn, type, newOrChange = "NEW" }) {
    const user = useContext(FirebaseAuthContext);

    return (
        <FormModal
            heading={`Add New Goal`}
            submitLabel="Add Goal"
            isOpen={isOpen}
            closeModalFn={closeModalFn}
            textFieldData={[
                { label: "Goal" },
                {
                    label: "Date Spent",
                    type: "date",
                    // Force the label to stay above the text field
                    slotProps: { inputLabel: { shrink: true } },
                }
            ]}
            submitFn={(inputValues) => {
                const sanitizedGoal = sanitizeNum(inputValues[0]);
                const sanitizedDate = sanitizeNum(inputValues[1]);

                if (sanitizedGoal.valid && sanitizedDate.valid) {
                    if (newOrChange === "NEW") {
                        const newGoal = new Goal({
                            type,
                            amount: sanitizedGoal.result,
                            date: sanitizedDate.result,
                        });
                        newGoal.pushToDB(user);
                    }
                }

                return [
                    sanitizedGoal.valid,
                    sanitizedDate.valid,
                ];
            }}
        />
    );
}