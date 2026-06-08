// ✅ CORRECT VERSION
export const errorHandler = (err, req, res, next) => {  // ← next parameter HONA CHAHIYE even if not used
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  console.error('Error:', err.message); // Debug ke liye
  
  res.status(statusCode);
  res.json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// 404 handler
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);  // ← next ko call karo with error
};