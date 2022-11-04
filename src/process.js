import 'dotenv/config';

import Queue from 'bee-queue';
import userService from "@babel-services/userServices"
import mediaService from "@babel-services/mediaService"

const avatarQueue = new Queue('avatar-queue');

avatarQueue.process(async ({ data }) => {
    const media = await mediaService.createAvatar(data.file,data.user_id)
    let options = {
        id: data.user_id,
        avatar: media.id
    }
    const user = await userService.updateUser(options)
    return user
});
