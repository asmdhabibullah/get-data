module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
  images: {
    domains: ['s3.amazonaws.com']
  },
  env: {
    BACKEND_API: process.env.BACKEND_API
  }
};
