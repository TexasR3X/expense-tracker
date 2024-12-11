"use client";
import { useContext, useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, TxnGroup } from "@/util/database";
import { FirebaseAuthContext } from "@/contexts/FirebaseAuthContext";

export default function useDBData(collectionID, classType, otherData = "NONE") {
    const user = useContext(FirebaseAuthContext);

    const [data, setData] = useState(null);

    let dataArr = [];

    useEffect(() => {
        if (!!user) {
            const q = query(collection(db, collectionID), where("uid", "==", user.uid));
            const unsub = onSnapshot(q, (querySnapshot) => {
                dataArr = [];
                querySnapshot.forEach((doc) => dataArr.push(doc.data()));
                setData(new classType(dataArr, otherData));
            });
    
            return unsub;
        }
    }, [user, otherData]);

    if (!user) return null;
    else return data;
}