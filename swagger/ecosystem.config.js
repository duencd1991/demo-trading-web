module.exports = {
  apps : [{
    name: "FiinTrade-Swagger",
    script: "./index.js",
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '128M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      //'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      //host: "gitlab.com",
      host: "10.91.1.84",
      user: "banggia",
      ref: 'origin/master', // (use 'origin/master' for your master branch,
      repo: "git@gitlab.com:phuongdvk47/ft24demo.git", // your repo url
      path: "/home/banggia/smqserver/productions/Fiintrade/swagger",
      ssh_options": ["StrictHostKeyChecking=no", "PasswordAuthentication=no"],
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production && pm2 save"
    }
  }
};
