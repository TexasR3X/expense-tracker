export default function Money({ amount }) {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    let formattedAmount = formatter.format(amount);

    return <div className="money">{formattedAmount}</div>;
}