const { assert, expect, should } = require('chai');
const historyHandler = require('../dist/history-handler').default;

it('should clear the buffer', () => {
	const history = historyHandler();

	history.action({value: 1});
	history.clear();

	const buffer = history.getBuffer();

	assert.equal(buffer, null);
});

it('should clear the undo buffer', () => {
	const history = historyHandler();

	history.action({value: 1});
	history.action({value: 2});
	history.action({value: 3});
	history.clear();

	const buffer = history.getUndoBuffer();

	assert.deepEqual(buffer, []);
});

it('should clear the redo buffer', () => {
	const history = historyHandler();

	history.action({value: 1});
	history.action({value: 2});
	history.action({value: 3});
	history.action({value: 4});
	history.undo();
	history.undo();
	history.redo();
	history.clear();

	const buffer = history.getRedoBuffer();

	assert.deepEqual(buffer, []);
});
