const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors());

// Data
const data = [
  { "name": "A", "description": "This is a description of A", "parent": "" },
  { "name": "B", "description": "This is a description of B", "parent": "A" },
  { "name": "C", "description": "This is a description of C", "parent": "A" },
  { "name": "D", "description": "This is a description of D", "parent": "A" },
  { "name": "B-1", "description": "This is a description of B-1", "parent": "B" },
  { "name": "B-2", "description": "This is a description of B-2", "parent": "B" },
  { "name": "B-3", "description": "This is a description of B-3", "parent": "B" }
];

// Function to build hierarchical structure
const buildHierarchy = (data) => {
  const map = new Map();

  // Initialize nodes
  data.forEach(item => {
    map.set(item.name, { ...item, children: [] });
  });

  // Build hierarchy
  const result = [];
  data.forEach(item => {
    if (item.parent) {
      const parent = map.get(item.parent);
      if (parent) {
        parent.children.push(map.get(item.name));
      }
    } else {
      result.push(map.get(item.name));
    }
  });

  return result;
};

// Default route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// API route for hierarchical data
app.get('/api/data', (req, res) => {
  const hierarchicalData = buildHierarchy(data);
  res.json(hierarchicalData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
