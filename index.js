// PSEUDOCODE
//  rootNode = vertices[0]
//  queue = []
//  addVertexToQueue(rootNode)
//      // queue = [rootNode]
//  while(!queue.length == 0) {
//      let firstNode = queue.shift()
//  adjacentVertices = findAdjacent(firstNode)
//      for vertex in adjacentVertices {
//          markDistanceAndPredecessor(vertex)
//          addToQueue(vertex)
//      }
//  }

// should return an array of nodes in the order they were visited
function bfs(rootNode, vertices, edges) {
  rootNode.distance = 0;
  let queue = [rootNode]
  let visitOrder = [rootNode]
  while (queue.length != 0) {
    let currentNode = queue.shift()
    let adjacentVertices = findAdjacent(currentNode.name, vertices, edges)

    // merge 2 arrays - return new array
    visitOrder = visitOrder.concat(adjacentVertices)
    markDistanceAndPredecessor(currentNode, adjacentVertices)

    // add to queue
    queue = queue.concat(adjacentVertices)
  }

  return visitOrder;
}

// should return an array of adjacent nodes
// excludes discovered nodes
function findAdjacent(nodeName, vertices, edges) {
  // let adjacentNodes = [];
  // let adjacentVertices = [];

  let visitedEdges = edges.filter(edge => edge.includes(nodeName))
  // for (const edge of visitedEdges) {
  //   adjacentNodes.push(edge.filter(node => node != nodeName))
  // }
  let adjacentNodes = visitedEdges.map(edge => edge.filter(node => node != nodeName))

  // find vertex in vertices
  let adjacentVertices = adjacentNodes.map(node => {
    return findNode(node, vertices)
  })

  // excludes discovered nodes
  return adjacentVertices.filter(vertex => vertex.distance == null)
}

function findNode(nodeName, vertices) {
  return vertices.find(vertex => vertex.name == nodeName)
}

// should return an array of adjacent nodes
function markDistanceAndPredecessor(predecessor, adjacentNodes) {
  const markedNodes = adjacentNodes.map(node => {
    node.distance = predecessor.distance + 1;
    node.predecessor = predecessor;
  })

  return markedNodes
}
