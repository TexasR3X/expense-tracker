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
    const valid = !!str.length;
    const result = valid ? str : null;

    return {
        valid,
        result,
    }
}