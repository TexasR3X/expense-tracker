"use client";
import { collection, addDoc, getDocs, doc, getDoc, setDoc, where, query, getFirestore } from "firebase/firestore";
import { initializeFirebase } from "./firebase";

initializeFirebase();
export const db = getFirestore();

// "transactions"

export const fetchCollection = async (user, collectionID) => {
    const queryRef = query(collection(db, collectionID), where("uid", "==", user.uid));
    const querySnap = await getDocs(queryRef);

    const dataArr = [];
    querySnap.forEach((doc) => dataArr.push(doc.data()));

    return dataArr;
}


export const TXN_TYPES = {
    HOUSING: "Housing",
    GAS: "Gas",
    FOOD: "Food",
    DEBT_PAYMENTS: "Debt Payments",
    SAVINGS: "Savings",
    HEALTHCARE: "Healthcare",
    ENTERTAINMENT: "Entertainment",
    PERSONAL: "Personal",
    EDUCATION: "Education",
    GIFTS_AND_DONATIONS: "Gifts and Donations",
    CHILDREN: "Children",
    MISCELLANEOUS: "Miscellaneous",
    INCOME: "Income",
    // BALANCE: "Balance",
    forEach(callback) {
        let i = 0;
        for (const type of Object.values(this)) {
            if (type === TXN_TYPES.BALANCE || typeof type === "function") continue;
            callback(type, i++);
        }
    }
}

export class TxnGroup {
    constructor(txnArr) {
        this.txns = txnArr.map((txn) => new Txn(txn));
        // this.txns = txnArr;
        this.length = this.txns.length;
        this.balance = this.txns.reduce((accumulator, currentTxn) => accumulator + currentTxn.amount, 0);
    }

    push(newTxn) {
        newTxn = new Txn(newTxn);

        const addedAmount = newTxn.amount;

        this.txns.push(newTxn);

        this.length++;
        this.balance += addedAmount;
    }
    filter(callback) {
        return new TxnGroup(this.txns.filter(callback));
    }
    map(callback) {
        return this.txns.map(callback);
    }

    // createBalanceTxn() {
    //     const balanceAmount = this.txns.reduce((accumulator, currentTxn) => accumulator + currentTxn.amount, 0);

    //     return new Txn({
    //         name: "Balance",
    //         type: "Balance",
    //         amount: balanceAmount,
    //         date: null,
    //     });
    // }
}

export class Txn {
    constructor(txnData) {
        this.name = txnData.name;
        this.type = txnData.type;
        this.amount = txnData.amount;
        this.date = txnData.date;
    }
}

// export const getTxnCollection = async (user) => {
//     const txnsQueryRef = query(collection(db, "transactions"), where("uid", "==", user.uid));
//     const txnsQuerySnap = await getDocs(txnsQueryRef);
    
//     const txnsDataArr = [];

//     txnsQuerySnap.forEach((doc) => txnsDataArr.push(new Txn(doc.data())));

//     console.log("txnsDataArr:", txnsDataArr);
//     return new TxnGroup(txnsDataArr);
// }

export class GoalGroup {
    constructor(goalArr) {
        this.goals = goalArr.map((goal) => new Goal(goal));
    }

    getGoal(type) {
        return this.goals.find((goal) => goal.type === type) ?? null;
    }
}

export class Goal {
    constructor(goalData) {
        this.amount = goalData.amount;
        this.type = goalData.type;
    }
}