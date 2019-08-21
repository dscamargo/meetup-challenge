"use strict";
module.exports = (sequelize, DataTypes) => {
  const Register = sequelize.define(
    "Register",
    {
      user_id: DataTypes.INTEGER,
      meetup_id: DataTypes.INTEGER
    },
    {}
  );
  Register.associate = function(models) {
    Register.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    Register.belongsTo(models.Meetup, {
      foreignKey: "meetup_id",
      as: "meetup"
    });
  };
  return Register;
};
