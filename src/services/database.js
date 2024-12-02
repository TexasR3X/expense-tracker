"use client";
import { collection, addDoc, getDocs, doc, getDoc, setDoc, where, query } from "firebase/firestore";
import { db, user } from "@/services/firebase";

/*
export async function getExpData(categoryID) {
    const uid = user?.uid
    if (!uid) throw new Error(`Invalid type for user\n\tuser = ${user}\n`);

    const docRef = doc(db, categoryID, uid);
    const docSnap = await getDoc(docRef);

    console.log("docSnap:", docSnap);

    // console.log("D:", (await getDoc(doc(docRef, "txns", "KO8xUus8DV7SA8gYwYjm"))).data());
    // getTxnsFromExp(collection(docRef, "txns"));
    
    if (docSnap.exists()) return docSnap; //.data()
    else {
        console.error("docSnap.exists() === false")
        return null;
    }
}
export async function getTxnsFromExp(txnsRef) {
    // const q = query(collection(db, "cities"), where("capital", "==", true));

    const txnsSnap = await getDocs(txnsRef);
    txnsSnap.forEach((doc) => {
        console.log("");
        console.log("doc.id", doc.id);
        console.log("doc.data()", doc.data());
    });
}
*/



export class Exp {
    constructor(expID) {
        (async () => {
            [this.expRef, this.expData] = await getExpData(expID);
            this.txns = await getTxns(this.expRef);
        })();
    }
}

const getTxns = async (expRef) => {
    const txnsRef = collection(expRef, "txns");
    const txnsSnap = await getDocs(txnsRef);

    const txnsArr = [];

    txnsSnap.forEach((doc) => {
        const docObj = doc.data();
        docObj.id = doc.id;

        txnsArr.push(docObj);
    });

    return txnsArr;
}
const getExpData = async (expID) => {
    const uid = user?.uid
    if (!uid) throw new Error(`Invalid type for user\n\tuser = ${user}\n`);

    const expRef = doc(db, expID, uid);
    const expSnap = await getDoc(expRef);

    // console.log("expSnap:", expSnap);

    // console.log("D:", (await getDoc(doc(docRef, "txns", "KO8xUus8DV7SA8gYwYjm"))).data());
    // getTxnsFromExp(collection(docRef, "txns"));
    
    if (expSnap.exists()) return [
        expRef,
        expSnap.data(),
    ];
    else {
        console.error("expSnap.exists() === false")
        return null;
    }
}


// class Exps {
//     constructor() {

//     }
// }

// class Exp {
//     constructor() {
        
//     }
// }