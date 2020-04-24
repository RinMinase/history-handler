const { assert } = require('chai');
const historyHandler = require('../dist/history-handler').default;

it('should return invalid when undo buffer is empty', () => {
	const history = historyHandler();

	history.action({value: 1});
	/**
	 * Buffers should now be:
	 *   Buffer: {value: 1}
	 */

	const buffer = history.getBuffer();

	assert.deepEqual(buffer, {value: 1});
});

it('should remove the earliest entry when buffer is full', () => {
	const history = historyHandler();

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
	/**
	 * Buffers should now be:
	 *   Undo: [{value: 2}...{value: 11}]
	 *   Buffer: {value: 12}
	 */

	const buffer = history.getUndoBuffer();

	assert.deepEqual(buffer[0], {value: 2});
});
