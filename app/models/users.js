import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'users'
    });

    Users.beforeCreate((user) => {
        user.password = bcrypt.hashSync(user.password, 10);
    });

    Users.associate = (models) => {
        Users.hasMany(models.Notes, {
            foreignKey: 'id_user',
            as: 'Notes'
        });
    };

    return Users;
}