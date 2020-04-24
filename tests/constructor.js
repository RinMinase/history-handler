const { assert } = require('chai');
const historyHandler = require('../dist/history-handler').default;

it('should increase the buffer size', () => {
	const history = historyHandler(15);

	history.action({value: 1});
	history.action({value: 2});
	history.action({value: 3});
	history.action({value: 4});
	history.action({value: 5});
	history.action({value: 6});
	history.action({value: 7});
	history.action({value: 8});
	history.action({value: 9});
	history.action({value: 10});
	history.action({value: 11});
	/**
	 * Buffers should now be:
	 *   Undo: [{value: 1}...{value: 10}]
	 *   Buffer: {value: 11}
	 */

	history.action({value: 12});
	history.action({value: 13});
	history.action({value: 14});
	history.action({value: 15});
	history.action({value: 16});
	/**
	 * Buffers should now be:
	 *   Undo: [{value: 1}...{value: 15}]
	 *   Buffer: {value: 16}
	 */

	const buffer = history.getUndoBuffer();

	assert.deepEqual(buffer[0], {value: 1});
});
