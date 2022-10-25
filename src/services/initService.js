
let models = require("../models");
let sequelize = models.sequelize

async function assertDatabaseConnectionOk() {
	console.log(process.env.USERDB)

	sequelize.sync({focus:true})
	console.log(`Checking database connection...`);
	try {
        console.log('authenticate');
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}
module.exports = async () => {
    await assertDatabaseConnectionOk();
}