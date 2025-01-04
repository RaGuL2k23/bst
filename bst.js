console.log("Hello, World!");

function Node(value=null){
  let data = value 
  let left = null, right = null;
  return { data,left , right} 
}

class Tree{
  constructor(arr){
    arr = arr.sort((a,b)=>a-b).filter((e,i,a)=>a.indexOf(e) == i);
    this.root = this.buildTree(arr);
  }
  
  buildTree(arr, start = 0, end = arr.length-1 ){
    if(start>end) return null;
    let mid =  Math.floor((start+end)/2);
    const node = new Node(arr[mid]);
    node.left = this.buildTree(arr,start,mid-1)
    node.right = this.buildTree(arr,mid+1,end);
    return node
  }
  
  insert(value){
    let newNode = new Node(value);
    let root = this.root;
    while(root.left || root.right ){
      let data = root.data
      if(value < data ){
        root = root.left
      }
      else {
        root = root.right 
      }
    }
    if( value < root.data ){
      root.left = newNode;
    }else{
      root.right = newNode;
    }
  }
  
  find(value){
    let root = this.root ; 
    while(root && root.data ) {
      let data = root.data ; 
      if (data == value){
        console.log('exists');
        return root
      }
    
      else if(value > data) root = root.right 
      else if(value < data) root = root.left 
      
    }
    
    return root 
    
    
  }
   
   #depthrec(node, value, depth=0) {
  // Base case: If the node is null, return -1 (indicating the node wasn't found)
  if (!node) return -1;

  // If the node's value matches the target value, return the current depth
  if (node.data === value) return depth;

  // Recur for left or right subtree
  if (value < node.data) {
    return this.#depthrec(node.left, value, depth + 1);
  } else {
    return this.#depthrec(node.right, value, depth + 1);
  }
}
  
  depthrec(value){
    let node= this.find(value)
    if (!node) return null ; 
    
    return this.#depthrec(this.root,value)
  }
  
  depth(value){
     let node = this.find(value);
    if (!node) return null ; 
    let root = this.root ,depth = 0; 
    
    while(root && root.data ) {
      let data = root.data ; 
      if (value == data)  return depth
      else if ( value < data ){
        root = root.left ;depth ++ 
      } else{  
        root = root.right ; depth ++ 
      }
    }
    
    return null
  
  }
  
  #heightREc(node,hi = 0 ){
    if(!node || !node.data) return -1 ;
    
    let l,r;
    l = this.#heightREc(node.left);
    r = this.#heightREc(node.right);
    return Math.max(l,r) + 1 
  }
  height(value){
    let node = this.find(value);
    if (!node) return null ; 
    
    return this.#heightREc(node)
    
  }
  
  levelOrder(cb){
    let arr = [];
    let root = this.root
    let q = [root];
    
    while(q.length != 0 ){
      let node = q.shift();
      let data = node.data;
      arr.push(data);
      cb(data)
      if(node.left)   q.push(node.left);
      if(node.right)  q.push(node.right);
      
    }
    
    return arr
      
  }
  
  inOrder(cb ,node=this.root ){ 
    let arr = []
    if (!( node && node.data)) return arr
   
    let one_arr =  this.inOrder(cb,node.left) 
   
     let data = node.data ; 
     arr.push(data)
     cb(data) 
    
    let two_arr = this.inOrder(cb,node.right)
    arr = arr.concat(one_arr, two_arr)
    
    return arr
    
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
    
}


t = new Tree([1,2,3,4,5,6,8]);
ans = t;
a = t.insert(93);
console.log(t.inOrder(console.log))
console.log("height",t.height(4) ,"depth", t.depthrec(4) )
t.prettyPrint()
// console.log(t.root)
