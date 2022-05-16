module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    from_airport: DataTypes.STRING,
    from_country: DataTypes.STRING,
    to_airport: DataTypes.STRING,
    to_country: DataTypes.STRING,
    total: DataTypes.FLOAT,
    stripe_id: DataTypes.STRING,
    status: DataTypes.STRING,
  });

  return Order;
};
