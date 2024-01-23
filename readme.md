# Binary Search Tree (BST) Implementation

This JavaScript code provides an implementation of a Binary Search Tree (BST) with functionalities such as construction from a sorted array, insertion, deletion, search, traversal, balancing check, and rebalancing.

## Features

1. **BST Construction**: Construct a BST from a sorted array.

2. **Insertion**: Insert new elements into the BST.

3. **Deletion**: Remove elements from the BST while preserving properties.

4. **Search**: Find elements in the BST.

5. **Traversal**: Traverse the BST using in-order, pre-order, and post-order methods.

6. **Level Order Traversal**: Traverse the BST level by level using the `levelOrder` method.

7. **Level Order Recursive Traversal**: Traverse the BST level by level recursively using the `levelOrderRecursive` method.

8. **Depth**: Calculate the depth of a specified value in the BST using the `depth` method.

9. **Height**: Calculate the height of the BST or the height of a specified value using the `height` and `heightRecursive` methods.

10. **Balancing Check**: Check if the BST is balanced.

11. **Rebalancing**: Rebuild the BST for optimal performance if unbalanced.

## Usage

```javascript
// Example Usage

// Create a sorted array
let array = [2, 100, 4, 34, 63, 34, 2, 93, 102, 103, 104, 3];

// Initialize a BST
let bst = new Tree(array);

// Insert a new element
bst.insert(16);

// Print the BST in a visually appealing way
bst.prettyPrint();

// Check if the BST is balanced
bst.isBalanced();

// Rebalance the BST if needed
bst.rebalance();

// Print the rebalanced BST
bst.prettyPrint();

// Perform level order traversal
let levelOrderResult = bst.levelOrder();
console.log("Level Order Traversal:", levelOrderResult);

// Perform level order recursive traversal
let levelOrderRecursiveResult = bst.levelOrderRecursive();
console.log("Level Order Recursive Traversal:", levelOrderRecursiveResult);

// Calculate depth of a specified value
let depthValue = 34;
let depthResult = bst.depth(depthValue);
console.log(`Depth of ${depthValue}:`, depthResult);

// Calculate height of the BST
let heightResult = bst.height();
console.log("Height of BST:", heightResult);

// Calculate height of a specified value recursively
let heightRecursiveValue = 100;
let heightRecursiveResult = bst.heightRecursive(heightRecursiveValue);
console.log(`Height of ${heightRecursiveValue} (Recursive):`, heightRecursiveResult);
