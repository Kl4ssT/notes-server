export default (sequelize, DataTypes) => {
    const Notes = sequelize.define('Notes', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        favourites: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: 'notes'
    });

    Notes.associate = (models) => {
        Notes.belongsTo(models.Users, {
            foreignKey: 'id_user',
            as: 'User'
        });
    };

    return Notes;
}