"use client";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, TxnGroup } from "@/services/database";

export default function useDBData(user, collectionID, classType) {
    const [data, setData] = useState(null);

    let dataArr = [];

    useEffect(() => {
        const q = query(collection(db, collectionID), where("uid", "==", user.uid));
        const unsub = onSnapshot(q, (querySnapshot) => {
            dataArr = [];
            querySnapshot.forEach((doc) => dataArr.push(doc.data()));
            setData(new classType(dataArr));
        });

        return unsub;
    }, []);

    return data;
}