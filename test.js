const { assert, expect, should } = require('chai');
const historyHandler = require('./dist/history-handler').default;

describe('HistoryHandler', () => {
	describe('#clear()', () => {
		require('./tests/clear');
	});
	
	describe('#getBuffer()', () => {
		it('should return the buffer', () => {
			const history = historyHandler();
		
			history.action({value: 1});
		
			const buffer = history.getBuffer();
		
			assert.equal(buffer.value, 1);
		});
	});
	
	describe('#getUndoBuffer()', () => {
		it('should return the undo buffer', () => {
			const history = historyHandler();

			history.action({value: 1});
			history.action({value: 2});
			history.action({value: 3});
		
			const buffer = history.getUndoBuffer();
		
			assert.deepEqual(buffer, [{value: 1}, {value: 2}]);
		});
	});

	describe('#undo()', () => {
		it('should return invalid when undo buffer is empty', () => {
			const history = historyHandler();
			const invalid = history.undo().invalid;

			assert.equal(invalid, true);
		});

		require('./tests/undo-objects');
	});

	describe('#redo()', () => {
		it('should return invalid when redo buffer is empty', () => {
			const history = historyHandler();
			const invalid = history.redo().invalid;

			assert.equal(invalid, true);
		});

		require('./tests/redo-objects');
	});
})
