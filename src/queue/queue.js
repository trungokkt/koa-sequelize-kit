
import Queue from 'bee-queue';
const avatarQueue = new Queue('avatar-queue');


const queueUploadAvatar =async (file, user_id) => {
    const job = await avatarQueue.createJob({ file, user_id })
        .retries(3)      
        .save();
    return job.data.file
}

export {
    queueUploadAvatar
}

