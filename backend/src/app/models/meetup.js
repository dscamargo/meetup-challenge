"use strict";
module.exports = (sequelize, DataTypes) => {
  const Meetup = sequelize.define(
    "Meetup",
    {
      user_id: DataTypes.INTEGER,
      file_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      place: DataTypes.STRING,
      date: DataTypes.DATE
    },
    {}
  );
  Meetup.associate = function(models) {
    Meetup.hasOne(models.File, { foreignKey: "file_id" });
    Meetup.belongsTo(models.User, { foreignKey: "user_id" });
  };
  return Meetup;
};
