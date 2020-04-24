/**
 * 
 * @param {Number} bufferLength Length of the undo and redo buffers
 */
export default function history(bufferLength = 10) {
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
				if (typeof obj == 'object') {
					undoBuffer.push(Object.assign({}, currentBuffer));
				} else {
					undoBuffer.push(currentBuffer)
				}

				if (undoBuffer.length > bufferLength) {
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
				
				if (typeof currentBuffer == 'object') {
					redoBuffer.push(Object.assign({}, currentBuffer));
				} else {
					redoBuffer.push(currentBuffer);
				}

				currentBuffer = buffer;

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

				if (typeof currentBuffer == 'object') {
					undoBuffer.push(Object.assign({}, currentBuffer));
				} else {
					undoBuffer.push(currentBuffer);
				}
				
				currentBuffer = buffer;

				return buffer;
			}

			return { invalid: true }
		}
	}
}
