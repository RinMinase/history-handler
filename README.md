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
</p>

## Introduction

Handles your undo and redo, customizable to your liking

## Usage & Demo

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
    // or
    import * as history from "history-handler";
    // or
    import { undo, redo, clear, action buffer } from "history-handler"
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
    buffer = history.buffer();
    // variable would be "action"

    const redo = history.redo();
    // variable would be "another action"
    ```

## Built with
* <img width=20 height=20 src="https://nodejs.org/static/images/favicons/favicon-32x32.png"> [NodeJS](https://nodejs.org/) - Library setup
* <img width=20 height=20 src="https://dmmj3mmt94rvw.cloudfront.net/favicon-undefined.ico"> [Circle CI](https://circleci.com/) - Continuous Integration (CI) service
* <img width=20 height=20 src="https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-LGsE7zdvzHI5cG-XV6p%2Favatar.png?alt=media"> [Semantic Release📦🚀](https://semantic-release.gitbook.io/) - Releasing strategy