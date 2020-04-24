<h1 align="center"> History Handler </h1>

<p align="center">
    <a href="https://circleci.com/gh/RinMinase/history-handler">
        <img alt="Circle-CI" src="https://img.shields.io/circleci/build/github/RinMinase/history-handler/master.svg?logo=circleci&style=for-the-badge">
    </a>&nbsp;
    <a href="https://semantic-release.gitbook.io/semantic-release/">
        <img alt="Semantic-Release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=for-the-badge">
    </a>
</p>
<p align="center">
    <a href="https://bundlephobia.com/result?p=history-handler">
        <img alt="Bundle-Phobia" src="https://img.shields.io/bundlephobia/minzip/history-handler?logo=webpack&logoColor=white&style=for-the-badge">
    </a>&nbsp;
    <a href="https://www.npmjs.com/package/history-handler">
        <img alt="NPM-DM" src="https://img.shields.io/npm/dw/history-handler?logo=npm&style=for-the-badge">
    </a>
    <a href="https://coveralls.io/github/RinMinase/history-handler">
        <img alt="Coverage" src="https://img.shields.io/coveralls/github/RinMinase/history-handler?logo=coveralls&style=for-the-badge" />
    </a>
</p>

## Introduction

Handles your undo and redo, customizable to your liking

## Usage & Demo

### GitHub Release

1. Place this line on your template file:

    ```html
    <script src="https://github.com/RinMinase/history-handler/releases/latest/downloa/history-handler.min.js"></script>
    ```

### NPM

1. You can install ***history-handler*** using npm

    ```bash
    npm install history-handler
    ```

2. Add it on your module, like so

    ```javascript
    /** For JavaScript */
    const history = require("history-handler");
    ```

    ```typescript
    /** For TypeScript */
    import history from "history-handler";
    ```

3. Use it in your code, like so

    ```javascript
    // Initialize the history
    history();

    // Add some actions to the buffer
    history.action("action");
    history.action("another action");

    const buffer = history.buffer();
    // variable would be "another action"

    const action = history.undo();
    // variable would be "another action"
    buffer = history.getBuffer();
    // variable would be "action"

    const redo = history.redo();
    // variable would be "another action"
    ```

## How it works

This library contains 1 buffer and 2 array buffers to hold your objects for managing history.

- `buffer` - contains the current action being done
- `undo array buffer` - contains the previous actions being done
- `redo array buffer` - contains the actions after using undo

### What each method does:

#### Action(object | string | number)
- Pushes the current buffer to the undo stack
- Pushes the `object | string | number` to the buffer

#### Undo
- Pushes the current buffer to the redo stack
- Pops out the last element of the undo stack
- Places the last element in the current buffer
- Returns the buffer

#### Redo
- Pushes the current buffer to the undo stack
- Pops out the last element of the redo stack
- Places the last element in the current buffer
- Returns the buffer

#### Clear
- Clears all the buffers

#### GetBuffer
- Returns the current buffer

#### GetUndoBuffer
- Returns the undo array buffer

#### GetRedoBuffer
- Returns the redo array buffer


## Built with
* <img width=20 height=20 src="https://nodejs.org/static/images/favicons/favicon-32x32.png"> [NodeJS](https://nodejs.org/) - Library setup
* <img width=20 height=20 src="https://dmmj3mmt94rvw.cloudfront.net/favicon-undefined.ico"> [Circle CI](https://circleci.com/) - Continuous Integration (CI) service
* <img width=20 height=20 src="https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-LGsE7zdvzHI5cG-XV6p%2Favatar.png?alt=media"> [Semantic Release📦🚀](https://semantic-release.gitbook.io/) - Releasing strategy