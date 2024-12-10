export default function DateDisplay({ date }) {
    if (!date) return <div className="date">none</div>

    const dateObj = date.toDate();

    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    const formattedDateStr = `${month}/${day}/${year}`;

    return <div className="date">{formattedDateStr}</div>;
}