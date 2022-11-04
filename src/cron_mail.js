var CronJob = require('cron').CronJob;

const getMailforOtp = (email, otp) =>{
	return {
		from: '"🍺 Edu Center 🍺 👻" <nguyenchilapk18@gnmail.com>', // sender address
		to: email, // list of receivers
		subject: "Verify password with OTP ✔", // Subject line
		text: "Use this OTP to create new password", // plain text body
		html: "<h3>Your OTP:</h3>" + 
		`<div style="display: flex;">
			<div> ༼ つ ◕_◕ ༽つ </div>
			<h1 style="font-weight: bold; color: red; margin-left: 100px;">${otp}</h1>
		</div>`, // html body
	}
}

const sendOtp = (email) => {
	const otp = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
	const transporter = getTransporterForOtp('nguyenchilapk18@gmail.com', 'Lapboy20');
	const mailOption = getMailforOtp(email, otp);
	transporter.sendMail(mailOption, function (err, info) {
		if (err) next(err);
		else res.json({ otp: otp });
	})
}

var job = new CronJob(
	'*/30 * * * * *',
	function() {
		console.log('You will see this message every second');
	},
	null,
	true,
	'America/Los_Angeles'
);
// Use this if the 4th param is default value(false)
job.start()

