import nodemailer from 'nodemailer';

const getTransporterForOtp = (email, password) => {
    return nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: email, // generated ethereal user
            pass: password, // generated ethereal password
        },
    });
}

const getMessage = (email, todos) => {
    let message = ""

    todos.forEach(element => {
        message += `<p>${element.name}<p>`
    });

    return {
        from: '"🍺 Edu Center 🍺 👻" <trungokkt99@gnmail.com>', // sender address
        to: email, // list of receivers
        subject: "cron", // Subject line
        text: "cron", // plain text body
        html: "<h3>notification</h3>" +
            `<div>
			<div>Các công hiệc đã hoàn thành của ngày hôm qua</div>
			<div> 
                ${message}
            </div>
		</div>`, // html body
    }
}

const sendMail = (email, todos) => {
    const transporter = getTransporterForOtp('trungokkt1999@gmail.com', 'ljrydquxsvzbrxil');
    const mailOption = getMessage(email, todos);
    transporter.sendMail(mailOption, function (err, info) {
        if (err) console.log(err);
        else console.log(todos)
    })
}
export {
    sendMail
};