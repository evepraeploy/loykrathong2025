const { Sequelize } = require("sequelize");
const config = require("./config");

let sequelize;

const buildSequelizeInstance = () => {
  const baseOptions = {
    dialect: config.db.dialect,
    pool: config.db.pool,
    logging: config.app.env === "dev" ? console.log : false,
    timezone: "+07:00",
    define: {
      underscored: true,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };

  if (process.env.DB_SSL_REJECT_UNAUTHORIZED === "true") {
    baseOptions.dialectOptions.ssl.rejectUnauthorized = true;
  }

  if (config.db.url) {
    return new Sequelize(config.db.url, baseOptions);
  }

  return new Sequelize(config.db.database, config.db.user, config.db.password, {
    ...baseOptions,
    host: config.db.host,
    port: config.db.port,
  });
};

const connectDatabase = async () => {
  try {
    sequelize = buildSequelizeInstance();
    await sequelize.authenticate();
    console.log("Database connection established successfully");
    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

module.exports = {
  connectDatabase,
  getSequelize: () => sequelize,
};
