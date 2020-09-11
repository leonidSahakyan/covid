module.exports = (sequelize, Sequelize) => {
  const Covid_Instance = sequelize.define("covid_instance", {
    date_symptoms_started: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    date_tested_positive: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    date_tested_negative: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Covid_Instance;
};
