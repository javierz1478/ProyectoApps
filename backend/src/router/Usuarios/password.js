const bcrypt = require('bcrypt');

// Función para hashear una contraseña
async function hashPassword(password) {
    try {
        const saltRounds = 10; // Número de rondas de sal para generar el hash
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
        throw error;
    }
}
module.exports = {
    hashPassword
};
