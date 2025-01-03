"use client";
import { collection, getDocs, doc, setDoc, where, query, getFirestore } from "firebase/firestore";
import { initializeFirebase } from "../services/firebase";
import createRandomID from "./createRandomID";

initializeFirebase();
export const db = getFirestore();


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
    CHILD_CARE: "Child Care",
    MISCELLANEOUS: "Miscellaneous",
    // INCOME: "Income",
    forEach(callback) {
        let i = 0;
        for (const type of Object.values(this)) {
            if (typeof type === "function") break;
            callback(type, i++);
        }
    },
    map(callback) {
        const returnArr = [];

        let i = 0;
        for (const type of Object.values(this)) {
            if (typeof type === "function") break;
            returnArr.push(callback(type, i++));
        }

        return returnArr;
    }
}

export class TxnCollection {
    constructor(txnArr, goalGroup) {
        const allTxns = new TxnGroup(txnArr);
        
        this.totals = [];
        this.txnGroups = TXN_TYPES.map((type) => {
            const filteredTxns = allTxns.filterByType(type);

            filteredTxns.type = type;
            filteredTxns.goal = goalGroup?.getGoal(type) ?? "none";

            this.totals.push(filteredTxns.total);

            return filteredTxns;
        });
    }

    getTxnGroup(type) {
        return this.txnGroups.find((txnGroup) => txnGroup.type === type) ?? null;
    }
    addGoalsToTxnGroups(goalGroup) {
        this.forEach((txnGroup) => {
            txnGroup.goal = goalGroup.getGoal(txnGroup.type)?.amount;
        });
    }
    forEach(callback) {
        let i = 0;
        for (const txnGroup of this.txnGroups) {
            callback(txnGroup, i++, this);
        }
    }
    map(callback) {
        return this.txnGroups.map(callback);
    }
}

const fixNum = (num) => Number(num.toFixed(5));

export class TxnGroup {
    constructor(txnArr) {
        this.txns = txnArr.map((txn) => new Txn(txn));
        this.type = null;
        this.goal = null;
        this.length = this.txns.length;
        this.total = fixNum(this.txns.reduce((accumulator, currentTxn) => accumulator + currentTxn.amount, 0));
    }

    filterByType(type) {
        return new TxnGroup(this.txns.filter((txn) => txn.type === type));
    }
    map(callback) {
        return this.txns.map(callback);
    }
}

export class Txn {
    constructor(txnData) {
        this.name = txnData.name;
        this.type = txnData.type;
        this.amount = txnData.amount;
        this.date = txnData.date;
        this.docID = txnData.docID ?? createRandomID();
    }

    async pushToDB(user) {
        await setDoc(doc(db, "transactions", this.docID), {
            name: this.name,
            type: this.type,
            amount: this.amount,
            date: this.date,
            uid: user.uid,
            docID: this.docID,
        });
    }
}


export class GoalGroup {
    constructor(goalArr) {
        this.goals = goalArr.map((goal) => new Goal(goal));
    }

    getGoal(type) {
        return this.goals.find((goal) => goal.type === type)
            ?? new Goal({
                type,
                amount: null,
                date: null,
                docID: null,
            });
    }
}

export class Goal {
    constructor(goalData) {
        this.type = goalData.type;
        this.amount = goalData.amount;
        this.date = goalData.date;
        this.docID = goalData.docID ?? createRandomID();
    }

    async pushToDB(user) {
        await setDoc(doc(db, "goals", this.docID), {
            type: this.type,
            amount: this.amount,
            date: this.date,
            uid: user.uid,
            docID: this.docID,
        });
    }
}