"use client";
import { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import FormModal from "./Modals/FormModal";
import { sanitizeDate, sanitizeNum } from "@/util/sanitizeData";
import { Goal } from "@/util/database";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";
import { printMoney } from "@/util/printData";

export default function AddGoalButton({ goal }) {
    const [openModal, setOpenModal] = useState(false);

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
    else return printMoney(amount);
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
                const sanitizedDate = sanitizeDate(inputValues[1]);

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