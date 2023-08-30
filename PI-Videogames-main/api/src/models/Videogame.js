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
      type: DataTypes.STRING,
      allowNull: false
    },
    platforms:{
      type: DataTypes.STRING,
      allowNull: false
      
      //ENUM('PC', 'PlayStation 5', 'Xbox One', 'PlayStation 4', 'Xbox Series S/X', 'Nintendo Switch', 'iOS', 'Android', 'Nintendo 3DS', 'Nintendo DS', 'Nintendo DSi', 'macOS', 'Linux', 'Xbox 360', 'Xbox', 'PlayStation 3', 'PlayStation 2', 'PlayStation', 'PS Vita', 'PSP', 'Wii U', 'Wii', 'GameCube', 'Nintendo 64', 'Game Boy AdvanceGame Boy Advance', 'Game Boy Color', 'Game Boy', 'SNES', 'NES', 'Classic Macintosh', 'Apple II', 'Commodore / Amiga', 'Atari 7800', 'Atari 5200', 'Atari 2600', 'Atari Flashback', 'Atari 8-bit', 'Atari ST', 'Atari Lynx', 'Atari XEGS', 'Genesis', 'SEGA Saturn','SEGA CD', 'SEGA 32X', 'SEGA Master System', 'Dreamcast', '3DO', 'Jaguar', 'Game Gear', 'Neo Geo'),

    },
    background_image:{
      type: DataTypes.STRING,
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
