const { assert, expect, should } = require('chai');
const historyHandler = require('../dist/history-handler').default;

describe('Objects', () => {
    it('should return the top stack of the undo buffer', () => {
        const history = historyHandler();

        history.action({value: 1});
        /**
         * Buffers should now be:
         *   Undo: [],
         *   Buffer: {value: 1}
         */

         history.action({value: 2});
        /**
         * Buffers should now be:
         *   Undo: [{value: 1}],
         *   Buffer: {value: 2}
         */

        history.action({value: 3});
        /**
         * Buffers should now be:
         *   Undo: [{value: 1}, {value: 2}],
         *   Buffer: {value: 3}
         */

        const value = history.undo().value;

        assert.equal(value, 2);
    });
});