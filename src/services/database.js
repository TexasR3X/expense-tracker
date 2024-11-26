"use client";
import { collection, addDoc, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

export async function getCategoryData(categoryName, user) {
    if (!user.uid) throw new Error("Invalid type for user");

    const docRef = doc(db, categoryName, user?.uid);
    const docSnap = await getDoc(docRef);

    // console.error():
    !docSnap.exists() ? console.error("docSnap.exists() === false") : null;
    
    if (docSnap.exists()) return docSnap.data();
    else return null;
}




class Collections {
    constructor() {

    }

    async getCollection () {
        // const 

        // const docRef = doc(db, "<collectionID>", "<docID>");
        // const docSnap = await getDoc(docRef);
        // console.log("Data you want:", docSnap.data());
    }
}




class Expenses {
    constructor() {

    }
}

class Expense {
    constructor() {
        
    }
}