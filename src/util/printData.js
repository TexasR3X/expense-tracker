export function printMoney(amount) {
    if (amount === null) return "none";

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    let formattedAmount = formatter.format(amount);

    return formattedAmount;
}

export function printDate(timestamp) {
    if (!timestamp) return "none";

    const dateObj = timestamp.toDate();

    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    const formattedDateStr = `${month}/${day}/${year}`;

    return formattedDateStr;
}