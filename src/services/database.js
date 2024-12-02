"use client";
import { collection, addDoc, getDocs, doc, getDoc, setDoc, where, query } from "firebase/firestore";
import { db, user } from "@/services/firebase";

export async function getExpCategoryData(categoryID) {
    const uid = user?.uid
    if (!uid) throw new Error(`Invalid type for user\n\tuser = ${user}\n`);

    const docRef = doc(db, categoryID, uid);
    const docSnap = await getDoc(docRef);

    console.log("docSnap:", docSnap);

    // console.error():
    !docSnap.exists() ? console.error("docSnap.exists() === false") : null;



    console.log("D:", (await getDoc(doc(docRef, "txns", "KO8xUus8DV7SA8gYwYjm"))).data());
    getTxnsFromExp(collection(docRef, "txns"));
    
    if (docSnap.exists()) return docSnap.data();
    else return null;
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




class ExpCategory {
    constructor() {

    }

    async getCollection () {
        // const 

        // const docRef = doc(db, "<collectionID>", "<docID>");
        // const docSnap = await getDoc(docRef);
        // console.log("Data you want:", docSnap.data());
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