export default function history() {
	let currentBuffer = null;
	let undoBuffer = [];
	let redoBuffer = [];

	return {

		/**
		 * 
		 */
		clear: function() {
			currentBuffer = null;
			undoBuffer = [];
			redoBuffer = [];
		},

		/**
		 * 
		 */
		getBuffer: function() {
			if (currentBuffer) {
				return currentBuffer;
			}
		},
		
		/**
		 * 
		 */
		getUndoBuffer: function() {
			return undoBuffer;
		},
		
		/**
		 * 
		 */
		getRedoBuffer: function() {
			return redoBuffer;
		},

		/**
		 * 
		 * @param {object | number |string} obj 
		 */
		action: function(obj) {
			if (currentBuffer) {
				undoBuffer.push(Object.assign({}, currentBuffer));

				if (undoBuffer.length > 10) {
					undoBuffer.splice(0, 1);
				}
			}

			currentBuffer = obj;
			redoBuffer = [];
		},

		/**
		 * 
		 */
		undo: function() {
			if (undoBuffer.length) {
				const buffer = undoBuffer.pop();
				redoBuffer.push(Object.assign({}, currentBuffer));
				currentBuffer = buffer;

				if (redoBuffer.length > 10) {
					redoBuffer.splice(1, 1);
				}

				return buffer;
			}

			return { invalid: true }
		},

		/**
		 * 
		 */
		redo: function() {
			if (redoBuffer.length) {
				const buffer = redoBuffer.pop();
				undoBuffer.push(Object.assign({}, currentBuffer));
				currentBuffer = buffer;

				if (undoBuffer.length > 10) {
					undoBuffer.splice(1, 1);
				}

				return buffer;
			}

			return { invalid: true }
		}
	}
}
