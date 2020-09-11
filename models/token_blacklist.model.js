module.exports = (sequelize, Sequelize) => {
  const TokenBlacklist = sequelize.define("token_blacklist", {
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    expires: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  return TokenBlacklist;
};
