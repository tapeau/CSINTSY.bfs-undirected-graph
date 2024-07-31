/*
Undirected Graph with Breadth-First Search (BFS)

A simple simulator and visualizer for a breadth-first search (BFS) algorithm on an undirected graph. Developed as Major Course Output #1 for DLSU CSINTSY course (T3 2022-2023).

Members:
- Gianela Kim Agsalon
- Sarah Jumilla
- Brent Jan Soan
- John Lorenzo Tapia

GitHub Repository:
https://github.com/tapeau/CSINTSY.bfs-undirected-graph
*/
// Graph class
class Graph {
  constructor() {
    this.nodes = new Map();
  }

  // Add a node to the graph
  addNode(nodeId) {
    if (!this.nodes.has(nodeId)) {
      this.nodes.set(nodeId, []);
    }
  }

  // Add an undirected edge between two nodes
  addEdge(fromNode, toNode) {
    if (this.nodes.has(fromNode) && this.nodes.has(toNode)) {
      const edgesFrom = this.nodes.get(fromNode);
      const edgesTo = this.nodes.get(toNode);

      if (!edgesFrom.includes(toNode)) {
        edgesFrom.push(toNode);
      }

      if (!edgesTo.includes(fromNode)) {
        edgesTo.push(fromNode);
      }
    }
  }

  // Get the neighbors of a node
  getNeighbors(nodeId) {
    return this.nodes.get(nodeId) || [];
  }

  // Perform Breadth-First Search in the graph
  breadthFirstSearch(startNode, targetNode) {
    const visited = new Set();
    const queue = [];
  
    visited.add(startNode);
    queue.push(startNode);
  
    const delay = 1000; // 1 second delay
  
    const intervalId = setInterval(() => {
      if (queue.length === 0) {
        window.alert(`Target node ${targetNode} not found!`);
        clearInterval(intervalId);
        return;
      }
  
      const currentNode = queue.shift();
  
      if (currentNode === targetNode) {
        window.alert(`Target node ${targetNode} found!`);
        clearInterval(intervalId);
        const targetElem = document.getElementById(targetNode);
        targetElem.style.backgroundColor = "green";
        setTimeout(() => {
          targetElem.style.backgroundColor = "red";
        }, 3000);
        return;
      }
  
      const nodeElem = document.getElementById(currentNode);
      nodeElem.style.backgroundColor = "blue";
  
      setTimeout(() => {
        nodeElem.style.backgroundColor = "red";
      }, delay - 200);
  
      const neighbors = this.getNeighbors(currentNode).sort((a, b) => a - b);
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          visited.add(neighbor); // Move inside the if condition
        }
      }
    }, delay);
  }
}

// Create a graph
const graph = new Graph();

// Add nodes to the graph
graph.addNode(1);
graph.addNode(2);
graph.addNode(3);
graph.addNode(4);
graph.addNode(5);

// Add edges to the graph
graph.addEdge(1, 2);
graph.addEdge(2, 3);
graph.addEdge(3, 4);
graph.addEdge(4, 1);
graph.addEdge(1, 5);

// HTML and CSS code
const htmlCode = `
<!DOCTYPE html>
<html>
<head>
  <title>Undirected Graph with Breadth-First Search (BFS)</title>
  <style>
    html, body {
      height: 100%;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: Trebuchet MS, Arial, sans-serif;
    }

    p {
      text-align: center;
    }

    button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #4CAF50;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    button:hover {
      background-color: #45a049;
    }

    input[type="number"] {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      transition: border-color 0.3s ease;
    }
    
    input[type="number"]:focus {
      border-color: #4CAF50;
    }
    
    #graph-container {
      width: 400px;
      height: 300px;
      border: 1px solid #ccc;
      position: relative;
      margin: 20px;
    }

    .node {
      width: 40px;
      height: 40px;
      background-color: #f00;
      border: 1px solid #000;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: #fff;
      position: absolute;
    }

    .edge {
      position: absolute;
      border: 1px solid #000;
      transform-origin: top left;
      background-color: transparent;
      z-index: -1;
    }

    .add-node,
    .delete-node,
    .add-edge,
    .delete-edge {
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <h1>CSINTSY Group 1 - Major Course Output 1</h1>
  <p>Undirected Graph with Breadth-First Search (BFS)<br><i>For proper viewing, set the website zoom level to 100%</i></p>

  <div id="graph-container"></div>

  <label for="target-node">Target Node:</label>
  <input type="number" id="target-node">

  <label for="start-node">Start Node:</label>
  <input type="number" id="start-node">

  <br>
  <button onclick="performBFS()">Perform BFS</button>
  <br>

  <div class="add-node">
    <label for="add-node-input">Add Node:</label>
    <input type="number" id="add-node-input">
    <button onclick="addNode()">Add</button>
  </div>

  <div class="delete-node">
    <label for="delete-node-input">Delete Node:</label>
    <input type="number" id="delete-node-input">
    <button onclick="deleteNode()">Delete</button>
  </div>

  <div class="add-edge">
    <label for="add-edge-from">Add Edge (From):</label>
    <input type="number" id="add-edge-from">
    <label for="add-edge-to">Add Edge (To):</label>
    <input type="number" id="add-edge-to">
    <button onclick="addEdge()">Add</button>
  </div>

  <div class="delete-edge">
    <label for="delete-edge-from">Delete Edge (From):</label>
    <input type="number" id="delete-edge-from">
    <label for="delete-edge-to">Delete Edge (To):</label>
    <input type="number" id="delete-edge-to">
    <button onclick="deleteEdge()">Delete</button>
  </div>

  <script src="script.js"></script>
  <script>

    // Function to create a node element
    function createNodeElement(nodeId, x, y) {
      const nodeElem = document.createElement("div");
      nodeElem.className = "node";
      nodeElem.id = nodeId;
      nodeElem.innerText = nodeId;
      nodeElem.style.left = x + "px";
      nodeElem.style.top = y + "px";
      return nodeElem;
    }

    // Function to create an edge element
    function createEdgeElement(x1, y1, x2, y2) {
      const edgeElem = document.createElement("div");
      edgeElem.className = "edge";
      edgeElem.style.left = x1 + "px";
      edgeElem.style.top = y1 + "px";
      edgeElem.style.width = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) + "px";
      edgeElem.style.transform = "rotate(" + Math.atan2(y2 - y1, x2 - x1) + "rad)";
      return edgeElem;
    }

    // Add a node to the graph
    function addNode() {
      const newNode = parseInt(document.getElementById("add-node-input").value);
      graph.addNode(newNode);
      document.getElementById("add-node-input").value = "";
      displayGraph(graph);
    }

    // Delete a node from the graph
    function deleteNode() {
      const nodeToDelete = parseInt(document.getElementById("delete-node-input").value);
      graph.nodes.delete(nodeToDelete);
      for (const [, edges] of graph.nodes) {
        const index = edges.indexOf(nodeToDelete);
        if (index > -1) {
          edges.splice(index, 1);
        }
      }
      document.getElementById("delete-node-input").value = "";
      displayGraph(graph);
    }

    // Add an edge to the graph
    function addEdge() {
      const fromNode = parseInt(document.getElementById("add-edge-from").value);
      const toNode = parseInt(document.getElementById("add-edge-to").value);
      graph.addEdge(fromNode, toNode);
      document.getElementById("add-edge-from").value = "";
      document.getElementById("add-edge-to").value = "";
      displayGraph(graph);
    }

    // Delete an edge from the graph
    function deleteEdge() {
      const fromNode = parseInt(document.getElementById("delete-edge-from").value);
      const toNode = parseInt(document.getElementById("delete-edge-to").value);
      const edgesFrom = graph.nodes.get(fromNode);
      const edgesTo = graph.nodes.get(toNode);
      const indexFrom = edgesFrom.indexOf(toNode);
      const indexTo = edgesTo.indexOf(fromNode);
      if (indexFrom > -1 && indexTo > -1) {
        edgesFrom.splice(indexFrom, 1);
        edgesTo.splice(indexTo, 1);
      }
      document.getElementById("delete-edge-from").value = "";
      document.getElementById("delete-edge-to").value = "";
      displayGraph(graph);
    }

    // Display the graph visually
    function displayGraph(graph) {
      const container = document.getElementById("graph-container");

      // Clear the container
      container.innerHTML = "";

      // Create nodes
      const nodePositions = new Map();
      const radius = 100;
      const centerX = container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;
      const totalNodes = graph.nodes.size;
      let nodeIndex = 0;

      for (const nodeId of graph.nodes.keys()) {
        const angle = (2 * Math.PI * nodeIndex) / totalNodes;
        const x = centerX + radius * Math.cos(angle) - 20;
        const y = centerY + radius * Math.sin(angle) - 20;
        const nodeElem = createNodeElement(nodeId, x, y);
        container.appendChild(nodeElem);
        nodePositions.set(nodeId, { x: x + 20, y: y + 20 });
        nodeIndex++;
      }

      // Create edges
      for (const [fromNode, toNodes] of graph.nodes.entries()) {
        const fromPosition = nodePositions.get(fromNode);
        const fromX = fromPosition.x;
        const fromY = fromPosition.y;

        for (const toNode of toNodes) {
          const toPosition = nodePositions.get(toNode);
          const toX = toPosition.x;
          const toY = toPosition.y;
          const edgeElem = createEdgeElement(fromX, fromY, toX, toY);
          container.appendChild(edgeElem);
        }
      }
    }

    // Perform Breadth-First Search
    function performBFS() {
      const startNode = parseInt(document.getElementById("start-node").value);
      const targetNode = parseInt(document.getElementById("target-node").value);
      graph.breadthFirstSearch(startNode, targetNode);
    }

    // Initial graph display
    displayGraph(graph);
  </script>
</body>
</html>
`;

// Output the HTML code
document.write(htmlCode);
