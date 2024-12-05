export default function Money({ amount, display, isBalance = false }) {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    let formattedAmount = formatter.format(amount);

    // if (isBalance && number < 0) formattedNumber = `\u2014 ${formattedNumber}`

    if (display === "block") return <div className="money money-block">{formattedAmount}</div>;
    else if (display === "inline") return <span className="money money-inline">{formattedAmount}</span>;
}