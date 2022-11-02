import models from '@babel-models';
let MediaFile = models.MediaFile;

let service = {};

service.createAvatar = async (file, user_id) => {
    try {
        file.createBy = user_id
        const media = await MediaFile.create(file);
        return media;
    } catch (error) {
        console.log(error)
    }
};

service.createMediaFiles = async (files) => {
    try {
        const medias = await MediaFile.bulkCreate(files);
        return medias;
    } catch (error) {
        console.log(error)
    }
};
export default service