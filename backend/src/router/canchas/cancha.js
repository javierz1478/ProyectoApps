const sequelize = require('../../database');
const { DataTypes } = require('sequelize');

const DisponibilidadCancha = sequelize.define('DisponibilidadCancha', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    numero_cancha: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dia_semana: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    Bloque_1: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    Bloque_2: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    Bloque_3: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    Bloque_4: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    Bloque_5: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    Bloque_6: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    Bloque_7: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    Bloque_8: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    Bloque_9: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    Bloque_10: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'disponibilidad_canchas',
    timestamps: false,
});

DisponibilidadCancha.sync({ force: false })
    .then(() => {
        console.log('Tabla canchas creada o ya existente');
    })
    .catch(err => {
        console.error('Error al sincronizar modelo:', err);
    });

async function obtenerDisponibilidadCanchas() {
    try {
        const result = await DisponibilidadCancha.findAll({
            attributes: [
                'dia_semana',
                [sequelize.fn('SUM', sequelize.cast(sequelize.col('Bloque_1'), 'int')), 'bloque_1'],
                [sequelize.fn('SUM', sequelize.cast(sequelize.col('Bloque_2'), 'int')), 'bloque_2'],
                [sequelize.fn('SUM', sequelize.cast(sequelize.col('Bloque_3'), 'int')), 'bloque_3'],
                [sequelize.fn('SUM', sequelize.cast(sequelize.col('Bloque_4'), 'int')), 'bloque_4'],
                [sequelize.fn('SUM', sequelize.cast(sequelize.col('Bloque_5'), 'int')), 'bloque_5'],
                [sequelize.fn('SUM', sequelize.cast(sequelize.col('Bloque_6'), 'int')), 'bloque_6'],
                [sequelize.fn('SUM', sequelize.cast(sequelize.col('Bloque_7'), 'int')), 'bloque_7'],
                [sequelize.fn('SUM', sequelize.cast(sequelize.col('Bloque_8'), 'int')), 'bloque_8'],
                [sequelize.fn('SUM', sequelize.cast(sequelize.col('Bloque_9'), 'int')), 'bloque_9'],
                [sequelize.fn('SUM', sequelize.cast(sequelize.col('Bloque_10'), 'int')), 'bloque_10']
            ],
            group: ['dia_semana']
        });

        return result;
    } catch (error) {
        console.error("Error al obtener disponibilidad de canchas:", error);
        throw new Error('Error interno del servidor');
    }
}



async function actualizarDisponibilidadCancha(dia, bloque) {
    const bloqueHorario = `Bloque_${bloque}`;
    const transaction = await sequelize.transaction();

    try {
        // Encontrar una cancha disponible
        const canchaDisponible = await DisponibilidadCancha.findOne({
            where: {
                dia_semana: dia,
                [bloqueHorario]: true,
            },
            lock: true,
            skipLocked: true,
            transaction
        });

        if (!canchaDisponible) {
            throw new Error('No hay disponibilidad para este bloque y día');
        }

        // Actualizar la disponibilidad de la cancha
        canchaDisponible[bloqueHorario] = false;
        await canchaDisponible.save({ transaction });

        await transaction.commit();

        return { success: true, message: 'Reserva confirmada', id: canchaDisponible.id };
    } catch (error) {
        await transaction.rollback();
        console.error("Error al actualizar disponibilidad de cancha:", error);
        throw new Error('Error interno del servidor');
    }
}

const datos = [
    { numero_cancha: 1, dia_semana: 'LUNES', Bloque_1: true, Bloque_2: true, Bloque_3: true, Bloque_4: true, Bloque_5: true, Bloque_6: true, Bloque_7: true, Bloque_8: true, Bloque_9: true, Bloque_10: true },
    { numero_cancha: 1, dia_semana: 'MARTES', Bloque_1: true, Bloque_2: true, Bloque_3: true, Bloque_4: true, Bloque_5: true, Bloque_6: true, Bloque_7: true, Bloque_8: true, Bloque_9: true, Bloque_10: true },
    { numero_cancha: 1, dia_semana: 'MIERCOLES', Bloque_1: true, Bloque_2: true, Bloque_3: true, Bloque_4: true, Bloque_5: true, Bloque_6: true, Bloque_7: true, Bloque_8: true, Bloque_9: true, Bloque_10: true },
    { numero_cancha: 1, dia_semana: 'JUEVES', Bloque_1: true, Bloque_2: true, Bloque_3: true, Bloque_4: true, Bloque_5: true, Bloque_6: true, Bloque_7: true, Bloque_8: true, Bloque_9: true, Bloque_10: true },
    { numero_cancha: 1, dia_semana: 'VIERNES', Bloque_1: true, Bloque_2: true, Bloque_3: true, Bloque_4: true, Bloque_5: true, Bloque_6: true, Bloque_7: true, Bloque_8: true, Bloque_9: true, Bloque_10: true },
    { numero_cancha: 1, dia_semana: 'SABADO', Bloque_1: true, Bloque_2: true, Bloque_3: true, Bloque_4: true, Bloque_5: true, Bloque_6: true, Bloque_7: true, Bloque_8: true, Bloque_9: true, Bloque_10: true },
    { numero_cancha: 1, dia_semana: 'DOMINGO', Bloque_1: true, Bloque_2: true, Bloque_3: true, Bloque_4: true, Bloque_5: true, Bloque_6: true, Bloque_7: true, Bloque_8: true, Bloque_9: true, Bloque_10: true }
];

DisponibilidadCancha.bulkCreate(datos)
    .then(() => {
        console.log('Datos insertados correctamente');
    })
    .catch(error => {
        console.error('Error al insertar datos:', error);
    });

module.exports = {DisponibilidadCancha,actualizarDisponibilidadCancha, obtenerDisponibilidadCanchas}