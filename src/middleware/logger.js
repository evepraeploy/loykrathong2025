const logger = (req, res, next) => {
  const start = Date.now();
  
  console.log(`Request: ${req.method} ${req.url}`);
  
  // Log response after it's sent
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`Response: ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

module.exports = logger;
