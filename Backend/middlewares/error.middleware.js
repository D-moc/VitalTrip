export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // ❌ Don't log 404 as big error
  if (statusCode !== 404) {
    console.error("🔥 ERROR:", err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};