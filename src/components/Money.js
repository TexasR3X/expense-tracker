"use client"

export default function Money({ number, isBalance = false }) {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    let formattedNumber = formatter.format(number);

    // if (isBalance && number < 0) formattedNumber = `\u2014 ${formattedNumber}`

    return <span className="">{formattedNumber}</span>;
}