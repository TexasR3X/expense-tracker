import { Timestamp } from "firebase/firestore";

export function sanitizeNum(numStr) {
    numStr = numStr.replace(/\$|,|\s/g, "");

    const valid = /^-?\d+(\.\d+)?$/g.test(numStr);
    const result = valid ? Number(numStr) : null;

    return {
        valid,
        result,
    }
}

export function sanitizeStr(str) {
    const valid = !/^\s*$/.test(str);
    const result = valid ? str : null;

    return {
        valid,
        result,
    }
}

export function sanitizeDate(dateStr) {
    const valid = !!dateStr.length;

    return {
        valid,
        result: valid ? Timestamp.fromDate(new Date(`${dateStr}T00:00:00`)) : null,
    }
}