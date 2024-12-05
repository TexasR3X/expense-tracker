"use client";
import { collection, addDoc, getDocs, doc, getDoc, setDoc, where, query, getFirestore } from "firebase/firestore";
import { initializeFirebase } from "./firebase";

initializeFirebase();
export const db = getFirestore();

export const TXN_TYPES = {
    HOUSING: "Housing",
    CLOTHES: "Clothes",
    TRANSPORTATION: "Transportation",
    FOOD: "Food",
    INSURANCE: "Insurance",
    DEBT_PAYMENTS: "Debt Payments",
    SAVINGS_INVESTMENTS: "Savings Investments",
    HEALTHCARE: "Healthcare",
    ENTERTAINMENT: "Entertainment",
    PERSONAL: "Personal",
    EDUCATION: "Education",
    GIFTS_DONATIONS: "Gifts Donations",
    CHILDREN: "Children",
    MISCELLANEOUS: "Miscellaneous",
    forEach(callback) {
        let i = 0;
        for (const type of Object.values(this)) {
            if (typeof type === "function") continue;
            callback(type, i++);
        }
    }
}

export class Txn {
    constructor(txnData) {
        this.name = txnData.name;
        this.type = txnData.type;
        this.amount = txnData.amount;
        this.timestamp = txnData.timestamp;
    }
}

export const getTxnCollection = async (user) => {
    const txnsQueryRef = query(collection(db, "transactions"), where("UID", "==", user.uid));
    const txnsQuerySnap = await getDocs(txnsQueryRef);
    
    const txnsDataArr = [];

    txnsQuerySnap.forEach((doc) => {
        console.log("doc.data():", doc.data());
        txnsDataArr.push(new Txn(doc.data()));
    });

    console.log("txnsDataArr:", txnsDataArr);
    return txnsDataArr;
}

export class TxnGroup {
    constructor(txnArr) {
        this.txns = txnArr;
    }
}