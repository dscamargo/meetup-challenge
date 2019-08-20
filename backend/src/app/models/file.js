"use strict";
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define(
    "File",
    {
      title: DataTypes.STRING,
      path: DataTypes.STRING
    },
    {}
  );
  File.associate = function(models) {
    File.belongsTo(models.Meetup, { foreignKey: "file_id" });
  };
  return File;
};
