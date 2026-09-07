module.exports = {
  apps: [
    {
      name: 'portfolio-server',
      script: './src/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      }
    }
  ]
};
