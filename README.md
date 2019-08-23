# Find A Node in 2 Identical DOM Trees

## Instructions

```
$ npm install
$ npm start

# Navigate your browser to localhost:1234
# Or open index.html as a file in the browser.
```

## Overview

### Problem

Given two trees (A, B) which are a deep clone of each other in a structured manner,
Find the identical given node (A' and B') in one tree at the second one.

### Solution

Our approach uses a bottom->up search to build a map of steps:

Starting from the given node (A') at tree A - For each level we go up,

Find the index of the current element relative to his siblings, and add it to an array.

The array length determinate how many steps we need to go down.

Then we'll traverse through the B tree with the map we've created from top->down, expecting to find B'.
