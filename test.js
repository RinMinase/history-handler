const { assert, expect, should } = require('chai');
const historyHandler = require('./dist/history-handler').default;

describe('HistoryHandler', () => {
	describe('#undo()', () => {
		it('should return invalid when undo buffer is empty', () => {
			const history = historyHandler();
			const invalid = history.undo().invalid;

			assert.equal(invalid, true);
		});

		require('./tests/undo-objects');
	});
})
