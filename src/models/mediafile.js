const MediaFileModel = (sequelize, DataTypes) => {
    const MediaFile = sequelize.define("mediafile", {
        originalname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        encoding: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mimetype: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        },
        destination: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        path: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        size: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        createBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        tableName: 'mediafiles',
    })
    MediaFile.associate = (models) => {
        MediaFile.belongsTo(models.Task, { foreignKey: { name: "task_id", allowNull: true }, onDelete: "RESTRICT" });
        MediaFile.hasOne(models.User, { foreignKey: { name: "avatar", allowNull: true }, onDelete: "RESTRICT" });
    }
    return MediaFile
}

export default MediaFileModel