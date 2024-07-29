module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    verificationToken: {
      type: Sequelize.STRING,
      allowNull: true, // Token can be null after verification
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false, // Default value for new users
    },
  });

  return User;
};
