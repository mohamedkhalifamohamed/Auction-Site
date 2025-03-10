import express from 'express';
import cors from 'cors';

// Importing router modules
import userRouter from './routes/user-router.js';
import watchRouter from './routes/watch-router.js';
import bidRouter from './routes/bid-router.js';

const app = express();
const port = process.env.PORT || 3000;
// Applying middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS for all requests

// Route handlers
app.use('/users', userRouter);
app.use('/watches', watchRouter);
app.use('/', bidRouter);

// Root route for basic API check
app.get('/', (req, res) => {
  // This will log the entire request which could be verbose, consider logging specific parts if needed
  console.log(req);
  res.json({ msg: "Welcome to the API" }); // Send a JSON response
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});