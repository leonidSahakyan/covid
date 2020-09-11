module.exports = (sequelize, Sequelize) => {
  const Connection = sequelize.define("connection", {
    isAccepted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    }
  });

  return Connection;
};
