export default function history(): {
    clear(): void,
    buffer(): void,
    action(obj: object | number | string): void,
    undo(): object | number | string,
    redo(): object | number | string,
};

