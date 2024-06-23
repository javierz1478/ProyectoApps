const { DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Asegúrate de importar la instancia de Sequelize
const { hashPassword, validatePassword } = require('./password');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuarios', // Nombre de la tabla en la base de datos
    timestamps: true // Opcional: incluye createdAt y updatedAt
});

// Sincroniza el modelo con la base de datos (crea la tabla si no existe)
Usuario.sync({ force: false })
    .then(() => {
        console.log('Tabla usuarios creada o ya existente');
    })
    .catch(err => {
        console.error('Error al sincronizar modelo:', err);
    });

async function createUsuario(data) {
    try {
        data.contraseña = await hashPassword(data.contraseña)
        const usuario = await Usuario.create(data);
        console.log('Usuario creado:', usuario);
        return usuario;
    } catch (error) {
        console.error('Error al crear usuario:', error);
    }
}

// Read - Obtener un usuario por ID
async function getUsuarioById(id) {
    try {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            console.log('Usuario encontrado:', usuario);
            return usuario;
        } else {
            console.log('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al obtener usuario:', error);
    }
}

// Read - Obtener todos los usuarios
async function getAllUsuarios() {
    try {
        const usuarios = await Usuario.findAll();
        console.log('Usuarios encontrados:', usuarios);
        return usuarios;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}

// Update - Actualizar un usuario por ID
async function updateUsuario(id, data) {
    try {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            const updatedUsuario = await usuario.update(data);
            console.log('Usuario actualizado:', updatedUsuario);
            return updatedUsuario;
        } else {
            console.log('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
    }
}

// Delete - Eliminar un usuario por ID
async function deleteUsuario(id) {
    try {
        const usuario = await Usuario.findByPk(id);
        if (usuario) {
            await usuario.destroy();
            console.log('Usuario eliminado');
        } else {
            console.log('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }
}

async function verificarContraseña(email, password) {
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (usuario) {
            const isMatch = await validatePassword(password, usuario.contraseña);
            if (isMatch) {
                console.log('Contraseña válida');
                return true;
            } else {
                console.log('Contraseña incorrecta');
                return false;
            }
        } else {
            console.log('Usuario no encontrado');
            return false;
        }
    } catch (error) {
        console.error('Error al verificar la contraseña:', error);
        throw error;
    }
}

// Exporta las funciones CRUD
module.exports = {
    Usuario,
    createUsuario,
    getUsuarioById,
    getAllUsuarios,
    updateUsuario,
    deleteUsuario,
    verificarContraseña
};

