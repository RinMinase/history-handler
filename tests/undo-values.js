const { assert, expect, should } = require('chai');
const historyHandler = require('../dist/history-handler').default;

describe('Values', () => {
	it('should return the top stack of the undo buffer', () => {
		const history = historyHandler();

		history.action(1);
		/**
		 * Buffers should now be:
		 *   Undo: []
		 *   Buffer: 1
		 */

		 history.action(2);
		/**
		 * Buffers should now be:
		 *   Undo: [2]
		 *   Buffer: 2
		 */

		history.action(3);
		/**
		 * Buffers should now be:
		 *   Undo: [1, 2]
		 *   Buffer: 3
		 */

		const undo = history.undo();
		/**
		 * Buffers should now be:
		 *   Undo: [1]
		 *   Buffer: 3
		 *   Redo: [3]
		 */

		assert.equal(undo, 2);
	});
});
