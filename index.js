export default function history() {
    let historyBuffer = null;
    let historyUndo = [];
    let historyRedo = [];

    return {
        /**
         * 
         */
        clear: function() {
            historyBuffer = null;
            historyUndo = [];
            historyRedo = [];
        },

        /**
         * 
         */
        buffer: function() {
            if (historyBuffer) {
                return historyBuffer;
            }
        },

        /**
         * 
         * @param {object | number |string} obj 
         */
        action: function(obj) {
            if (historyBuffer) {
                historyUndo.push(Object.assign({}, historyBuffer));

                if (historyUndo.length > 10) {
                    historyUndo.splice(1, 1);
                }
            }

            historyBuffer = obj;
            historyRedo = [];
        },

        /**
         * 
         */
        undo: function() {
            if (historyUndo.length) {
                const buffer = historyUndo.pop();
                historyRedo.push(Object.assign({}, historyBuffer));
                historyBuffer = buffer;

                if (historyRedo.length > 10) {
                    historyRedo.splice(1, 1);
                }

                return buffer;
            }

            return { invalid: true }
        },

        /**
         * 
         */
        redo: function() {
            if (historyRedo.length) {
                const buffer = historyRedo.pop();
                historyUndo.push(Object.assign({}, historyBuffer));
                historyBuffer = buffer;

                if (historyUndo.length > 10) {
                    historyUndo.splice(1, 1);
                }

                return buffer;
            }

            return { invalid: true }
        }
    }
}
