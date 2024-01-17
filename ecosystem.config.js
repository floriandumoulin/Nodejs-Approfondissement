module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
      },
      instances: 3, 
      exec_mode: 'cluster',
      max_memory_restart: '200M',
      error_file: './logs/err.log',
      out_file: './logs/out.log', 
      merge_logs: true,
    },
  ],
};
