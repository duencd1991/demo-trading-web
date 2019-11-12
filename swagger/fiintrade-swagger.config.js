module.exports = {
  apps: [
    {
      name: "FiinTrade-API Simulator",
      script: "./index.js",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],
  deploy: {
    production: {
      //host: "gitlab.com",
      host: "nkt-uat-banggia-app01",
      user: "banggia",
      ref: 'origin/master', // (use 'origin/master' for your master branch,
      repo: "git@gitlab.com:phuongdvk47/ft24demo.git", // your repo url
      path: "/home/banggia/smqserver/productions/Fiintrade/swagger/repositories",
      ssh_options": ["StrictHostKeyChecking=no", "PasswordAuthentication=no"],
      "post-deploy":
        "npm install && pm2 reload fiintrade-swagger.config.js --env production && pm2 save"
    }
  }
};
