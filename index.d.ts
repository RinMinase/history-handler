export default function history(bufferLength: number): {
    clear(): void,

    getBuffer(): object | number | string,
    getUndoBuffer(): Array<object | number | string>,
    getRedoBuffer(): Array<object | number | string>,

    action(obj: object | number | string): void,
    undo(): object | number | string,
    redo(): object | number | string,
};

