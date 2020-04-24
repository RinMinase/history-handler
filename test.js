const { assert, expect, should } = require('chai');
const historyHandler = require('./dist/history-handler').default;

describe('HistoryHandler', () => {
	describe('__constructor(length)', () => {
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
