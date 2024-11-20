export default function If({ condition, children }) {
    if (condition === undefined) throw new Error(`condition in <If> is undefined`);

    return <>{condition ? children : null}</>;
}