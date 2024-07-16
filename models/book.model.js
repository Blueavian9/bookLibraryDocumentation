module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    published: {
      type: DataTypes.DATE,
    },
    url: {
      type: DataTypes.STRING,
    },
  });

  return Book;
};
