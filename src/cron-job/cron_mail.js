import 'dotenv/config';

import { CronJob } from 'cron';
import { sendMail } from '../mail/nodemailer'
import todoService from '../services/todosService'

let job = new CronJob(
	'0 8 * * *',
	async function () {
		const todos = await todoService.getAll({ completed: true, yesterday: true })
		sendMail("trungokkt99@gmail.com", todos)
	},
	null,
	true,
	'Asia/Ho_Chi_Minh'
);
// Use this if the 4th param is default value(false)
job.start()

