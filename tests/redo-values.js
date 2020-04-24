const { assert, expect, should } = require('chai');
const historyHandler = require('../dist/history-handler').default;

describe('Values', () => {
	it('should return the top stack of the redo buffer', () => {
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
		 *   Undo: [1]
		 *   Buffer: 2
		 */

		history.action(3);
		/**
		 * Buffers should now be:
		 *   Undo: [1, 2]
		 *   Buffer: 3
		 */

		history.undo();
		/**
		 * Buffers should now be:
		 *   Undo: [1]
		 *   Buffer: 2
		 *   Redo: [3]
		 */

		const redo = history.redo();
		/**
		 * Buffers should now be:
		 *   Undo: [1, 2]
		 *   Buffer: 3
		 *   Redo: []
		 */

		assert.equal(redo, 3);
	});
});
