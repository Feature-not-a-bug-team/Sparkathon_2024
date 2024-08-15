"use client";
import { useHistoryStore } from "@/store/zustand";
import { History, HistoryType } from "@/types";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface GroupedHistory {
    [date: string]: History[];
}
const groupByDate = (historyList: History[]): GroupedHistory => {
    return historyList.reduce((group: GroupedHistory, historyItem: History) => {
        if (historyItem.createdAt) {
            const date = historyItem.createdAt.split("T")[0];
            if (!group[date]) {
                group[date] = [];
            }
            group[date].push(historyItem);
        } else {
            // Handle undefined createdAt. Options:
            // Skip it: Do nothing
            // Or group them under a specific key
            const undefinedKey = "undefined"; // or 'unknown', etc.
            if (!group[undefinedKey]) {
                group[undefinedKey] = [];
            }
            group[undefinedKey].push(historyItem);
        }
        return group;
    }, {}); // Initialize with an empty object
};
export default function Historys() {
    const { historys } = useHistoryStore();
    const [groupedHistories, setGroupedHistories] = useState<GroupedHistory>({});

    useEffect(() => {
        const grouped = groupByDate(historys);
        console.log(grouped);
        setGroupedHistories(grouped);
    }, [historys]); // Rerun when historyList changes
    return (
        <div className="px-5 ">
            <Accordion variant="shadow" className="px-5 ">
                {Object.keys(groupedHistories).map((date, index) => {
                    if (date !== undefined) {
                        return (
                            <AccordionItem key={index} title={date}>
                                {groupedHistories[date].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col border-b-1 border-gray-500 pb-4  gap-2 mt-4 "
                                    >
                                        {item.type == HistoryType.Edited ? (
                                            <>
                                                {item.data.oldPricec != item.data.newPrice && (
                                                    <div className="flex ">
                                                        <div className="text-bold ">Price</div>
                                                        <div className="ml-auto flex gap-2 ">
                                                            <div className="text-red-400 flex gap-1 items-center">
                                                                {item.data.oldPricec}
                                                                <div className="text-white">{"👉"}</div>
                                                            </div>
                                                            <div className="text-green-400">
                                                                {item.data.newPrice}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}{" "}
                                                {item.data.oldQUantity != item.data.newQuantity && (
                                                    <div className="flex ">
                                                        <div className="text-bold ">Quantity</div>
                                                        <div className="ml-auto flex gap-2 ">
                                                            <div className="text-red-400 flex gap-1 items-center">
                                                                {item.data.oldQUantity}
                                                                <div className="text-white">{"👉"}</div>
                                                            </div>
                                                            <div className="text-green-400">
                                                                {item.data.newQuantity}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}{" "}
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex ">
                                                    <div className="text-bold ">Price</div>
                                                    <div className="ml-auto flex gap-2 ">
                                                        <div className="text-green-400">
                                                            {item.data.newPrice}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex ">
                                                    <div className="text-bold ">Quantity</div>
                                                    <div className="ml-auto flex gap-2 ">
                                                        <div className="text-green-400">
                                                            {item.data.newQuantity}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        <div className="flex gap-3 text-sm ">
                                            <div
                                                className={`hover:underline ${item.type == HistoryType.Edited
                                                        ? "text-blue-500"
                                                        : "text-green-500"
                                                    }`}
                                            >
                                                {item.type.toLowerCase()}
                                            </div>
                                            <div className="hover:underline ">{item.productName}</div>
                                        </div>
                                    </div>
                                ))}
                            </AccordionItem>
                        );
                    }
                    return <></>;
                })}
            </Accordion>
        </div>
    );
}
