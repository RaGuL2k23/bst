
class Node {
    constructor(value) {
      this.data = value;
      this.left = null;
      this.right = null;
    }
  }
  class Tree {
    constructor(arr) {
      arr = arr.sort((a, b) => a - b).filter((e, i, arr) => arr.indexOf(e) == i);
      this.root = this.buildTree(arr);
    }
  
    buildTree(array, start = 0, end = array.length - 1) {
      if (start > end) {
        return null;
      }
      const mid = Math.floor((start + end) / 2);
      const node = new Node(array[mid]);
      node.left = this.buildTree(array, start, mid - 1);
      node.right = this.buildTree(array, mid + 1, end);
      return node;
    }
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
      if (node.data == null) {
        return;
      }
      if (node.right !== null) {
        this.prettyPrint(
          node.right,
          `${prefix}${isLeft ? "│   " : "    "}`,
          false,
        );
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    }
    insert(data) {
      //only at leaf nodes
      if (data == null || data === undefined) return "enter data of node ";
      let leafNode,
        node = this.root;
      let newNode = new Node(data);
      while (node && node.data) {
        //traverse and find data
        leafNode = node; // o(log n)
        if (node.data > data) {
          //shifts to next level immediately
          node = node.left;
        } else {
          node = node.right;
        }
      }
      leafNode.data < data
        ? (leafNode.right = newNode)
        : (leafNode.left = newNode);
    }
  
    delete(data,  ) {
      let parentNode,
        node = this.root;
  
      while (node.data) {
        //traverse and find data
        if (node.data == data) {
          console.log(node);
          break;
        }
        parentNode = node; // o(log n)
        if (node.data > data) {
          //shifts to next level immediately
          node = node.left;
        } else {
          node = node.right;
        }
        if (node == null) {
          console.log("null", node);
          return;
        }
      }
  
      if (node.right == null && node.left == null) {
        node.data = null;
      } else if (node.right == null && node.left != null) {
        alert("df");
        parentNode.left = node.left;
        node.data = null;
      } else if (node.right != null && node.left == null) {
        parentNode.right = node.right;
        node.data = null;
      } else {
        if (node.right != null && node.left != null) {
          console.log(node);
          let targetNode = node;
          let succedingNode = node.right; // the farthest left is the succeding node
          while (succedingNode && succedingNode.data) {
            // replace the node to be deleted with succeding node;
            targetNode = succedingNode; // farthest left found(succeding node after delete element)
            succedingNode = succedingNode.left;
          }
          console.log("trgt", targetNode);
          if (targetNode.right == null) {
            // check if it doesn't contain any right childere
            node.data = targetNode.data; //if it contains left childeren , while will take care
            targetNode.data = null;
          }
          if (targetNode.right !== null) {
            // if right child exists , append it to the shiftig
           // console.log("d", targetNode.right); //elements rigt
            node.data = targetNode.data;
            node.right = targetNode.right;
            targetNode.data = null;
            //targetNode = null; delete traces
          }
        }
      }
    }
    find(value) {    
        
      {
        let node = this.root;
        while (node.data != null) {
          if (value == node.data) return node;
          if (value > node.data) {
            node = node.right;
          } else {
            // console.log(node.data);
            node = node.left;
          }
          if (node == null) {
            // console.log("cul", node);
            break;
          }
        }
      }
      if(value != null) console.log(`value ${value} not found`);
      return null;
    }
    levelOrder(cb) {
      // BFS
      let root = this.root,
        arr = [];
  
      let q = [[root]];
      while (q.length != 0) {
        const [node] = q[0];
        q.splice(0, 1);
        arr.push(node.data);
        if (cb != undefined) cb(node);
        if (node.left != null) q.push([node.left]);
        if (node.right != null) q.push([node.right]);
      }
      if (cb == undefined) {
        return arr;
      }
    }
    levelOrderRecursive(cb, root = this.root) {
       let result =[]; /// idea is to create new array for each level == index
  
       function lot(node,l){      //l -> level 
        if(node==null || node.data == null) return ;
  
        if(result[l]){
          result[l].push(node.data); 
        }
  
        else{  
          result[l] = [node.data];//new array for new level discovered;
        }
        
        lot(node.left,l+1)//l+1 beacause children in another level
        lot (node.right,l+1);//right also in same level as root'sleft
       }
       lot(  root,0);
       if(cb){                     //if callback exists
        for(let i=0;i<result.length;i++){
          result[i].forEach(element => {
           cb(element)
          });
        }
       }
       
       
       if(cb == undefined) {
        let tempArray = [];result.forEach( (subArr)=> subArr.forEach(e => tempArray.push(e)));
        console.log('may be if u like to see here u go',result)
        return tempArray;}
    }
    inOrder(cb, node = this.root) {
      // left root right
      let arr = [];
      if (node.data == null || node == null) return [];
  
      if (node.left != null) {
        this.inOrder(cb, node.left);
        if (cb == undefined) arr = arr.concat(this.inOrder(cb, node.left));
      }
      arr.push(node.data); // just one elmnt will exist and left or right
      if (cb != undefined) cb(node); // if call back exist call it
      if (node.right != null) {
        this.inOrder(cb, node.right);
        if (cb == undefined) arr = arr.concat(this.inOrder(cb, node.right));
      }
  
      // just one elmnt will exist and left or right
      if (cb == undefined) return arr;
    }
  
    preOrder(cb, node = this.root) {
      // root left right
      let arr = [];
      if (node.data == null || node == null) return [];
  
      arr.push(node.data); // just one elmnt will exist and left or right
      if (cb != undefined) cb(node); // if call back exist call it
  
      if (node.left != null) {
        this.preOrder(cb, node.left);
        if (cb == undefined) arr = arr.concat(this.preOrder(cb, node.left));
      }
  
      if (node.right != null) {
        this.preOrder(cb, node.right);
        if (cb == undefined) arr = arr.concat(this.preOrder(cb, node.right));
      }
  
      // just one elmnt will exist and left or right
      if (cb == undefined) return arr;
    }
  
    postOrder(cb, node = this.root) {
      //  left right root
      let arr = [];
      if (node.data == null || node == null) return [];
  
      if (node.left != null) {
        this.postOrder(cb, node.left);
        if (cb == undefined) arr = arr.concat(this.postOrder(cb, node.left));
      }
  
      if (node.right != null) {
        this.postOrder(cb, node.right);
        if (cb == undefined) arr = arr.concat(this.postOrder(cb, node.right));
      }
  
      arr.push(node.data); // just one elmnt will exist and left or right
      if (cb != undefined) cb(node); // if call back exist call it
  
      // just one elmnt will exist and left or right
      if (cb == undefined) return arr;
    }
  
    depth(value) {
      let node = this.find(value);
      if (node == null) {
        console.log("no node with value ", value);
        return;
      }
      let root = this.root;
      let count = 0;
      while (root != null && root.data != null) {
        if (root.data == node.data) return count;
        if (value > root.data) {
          count++;
          root = root.right;
        } else {
          count++;
          root = root.left;
        }
      }
      return count;
    }
    height(value) {
      // height from leaf to node
      let node = this.find(value);
      if (node == null) {
        console.log("no node with value ", value);
        return;
      }
      let depth = 0,
        depth2 = 0;
      while (node && node.data != null) {
        // enter till leaf node of **left sub tree*** and increment  depth values
        if (node.left != null) {
          node = node.left;
          depth++;
        } else {
          node = node.right;
          depth++;
        } // go somewhere left or right
        if (node == null) break; // if one leaf node hit's then
        //                         // reset to actual node
      }
      while (node != null && node.data != null) {
        // enter till leaf node on right sub tree and increment dpth 2  values
        if (node.right != null) {
          node = node.right;
          depth2++;
        } else {
          node = node.left;
          depth2++;
        }
        if (node == null) break;
      }
  
      return Math.max(depth2, depth);
    }
    static #heightRecursiveUtil = (node) => {
      // finding through recursive method
      if (node == undefined || node.data == null) return 0;
      let left, right;
      left = Tree.#heightRecursiveUtil(node.left);
      right = Tree.#heightRecursiveUtil(node.right);
      return Math.max(left, right) + 1;
    };
    heightRecursive(value) {
      let node = this.find(value);
      if (value == undefined || node == null) {
        console.log("no node with value ", value);
        return;
      }
  
      return Tree.#heightRecursiveUtil(node);
    }
  
    isBalanced() {
      let arr = [];
      this.preOrder((e) => arr.push(Tree.#isBalance(e, this))); // passing cb to preorder fn
       arr = arr.filter((e) => {
        if (e > 1 || e < -1) return e; // deleting 0,1,-1 ;
      });
      // console.log(arr);
      let verdict =
        arr.length > 0
          ? (() => {
              console.log("Tree is not Balanced");
              return false;
            })()
          : (() => {
              console.log("Every Node in Tree is Balanced");
              return true;
            })();
  
      return verdict
    }
    static #isBalance(node, instance) {
      // pass it as a cb to any traversal method
      if (node == null || node.data == null) return 0;
      let root = node;
      if (root.left == null) return 0;
      let lsth = instance.heightRecursive(root.left.data);
      if (root.right == null) return 0;
      let rsth = instance.heightRecursive(root.right.data);
      return lsth - rsth;
    }
  
    rebalance() {
      if (this.isBalanced) {
        let newTreeArray = this.inOrder();
        this.root = new Tree(newTreeArray).root;
        this.prettyPrint();
      }
    }
  
  }
  
  let a = [2, 100, 4, 34, 63, 34, 2, 93, 102, 103, 104, 3];
  let t = new Tree(a); 
  t.insert(16);
  t.prettyPrint();
  t.isBalanced();
  t.prettyPrint();
  