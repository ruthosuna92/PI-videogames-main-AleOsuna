const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    platforms:{
      type: DataTypes.STRING,
      allowNull: false
    },
    background_image:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2), // Precisión total de 3 (incluyendo 2 decimales)
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      }
    }
  },
  {timestamps: false});
};
