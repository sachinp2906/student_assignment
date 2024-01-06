module.exports.apiKeyAuth = (req, res, next) => {
    const providedApiKey = req.headers['apikey'];
    if (!providedApiKey || providedApiKey != process.env.API_KEY) {
      return res.status(401).json({
        message: 'Invalid API key',
      });
    }
    next();
};