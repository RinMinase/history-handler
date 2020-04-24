const { assert } = require('chai');
const historyHandler = require('./dist/history-handler').default;

describe('HistoryHandler', () => {
	describe('__constructor(length)', () => {
		require('./tests/constructor');
	});

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
			/**
			 * Buffers should now be:
			 *   Undo: [{value: 1}, {value: 2}]
			 *   Buffer: {value: 3}
			 */
			
			const buffer = history.getUndoBuffer();
		
			assert.deepEqual(buffer, [{value: 1}, {value: 2}]);
		});
	});
	
	describe('#getRedoBuffer()', () => {
		it('should return the redo buffer', () => {
			const history = historyHandler();

			history.action({value: 1});
			history.action({value: 2});
			history.action({value: 3});
			history.action({value: 4});
			/**
			 * Buffers should now be:
			 *   Undo: [{value: 1}, {value: 2}, {value: 3}]
			 *   Buffer: {value: 4}
			 */
			
			history.undo();
			/**
			 * Buffers should now be:
			 *   Undo: [{value: 1}, {value: 2}]
			 *   Buffer: {value: 3}
			 *   Redo: [{value: 4}]
			 */
		
			const buffer = history.getRedoBuffer();

			assert.deepEqual(buffer, [{value: 4}]);
		});
	});

	describe('#action()', () => {
		require('./tests/action');
	});

	describe('#undo()', () => {
		it('should return invalid when undo buffer is empty', () => {
			const history = historyHandler();
			const buffer = history.undo();

			assert.deepEqual(buffer, {invalid: true});
		});

		require('./tests/undo-values');
		require('./tests/undo-objects');
	});

	describe('#redo()', () => {
		it('should return invalid when redo buffer is empty', () => {
			const history = historyHandler();
			const buffer = history.redo();

			assert.deepEqual(buffer, {invalid: true});
		});

		require('./tests/redo-values');
		require('./tests/redo-objects');
	});
})
