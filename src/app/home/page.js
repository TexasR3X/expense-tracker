"use client";
import { useContext } from "react";
import TxnCard from "@/components/TxnCards/TxnCard";
import OverViewCard from "@/components/TxnCards/TxnOverviewCard";
import { DBCollectionsContext } from "@/contexts/DBCollectionsContext";

export default function Home() {
    const txnCollection = useContext(DBCollectionsContext);

    return (
        <div>
            <br/>

            <OverViewCard
                txnCollection={txnCollection}
            />

            {txnCollection.map((txnGroup) => {
                const type = txnGroup.type;

                return txnGroup.goal.amount !== null ? (
                    <TxnCard
                        type={type}
                        key={`TxnCard key: ${type}`}
                        txns={txnGroup}
                    />
                ) : null;
            })}
        </div>
    );
}