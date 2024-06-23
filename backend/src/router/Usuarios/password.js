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

// Función para comparar una contraseña con su hash
async function validatePassword(password, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error al validar la contraseña:', error);
        throw error;
    }
}

module.exports = {
    hashPassword,
    validatePassword
};
