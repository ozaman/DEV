var DB_OPTIONS = {};
// DB_OPTIONS.host = "192.168.0.12";
// DB_OPTIONS.port = 3050;
// DB_OPTIONS.database = 'C:/Users/Arm/Desktop/New folder (4)/Admin-Kiosk/KIOSK.FDB';
// DB_OPTIONS.user = 'SYSDBA';
// DB_OPTIONS.password = 'masterkey';
var ROLE = {
	
	SYSTEM_SUPER_ADMIN : 0,
	SYSTEM_ADMIN : 1 ,	
	
};
var ttp= 'localhost:8080'
module.exports = {
	DB_OPTIONS	:	DB_OPTIONS,
	cashMachine	:	{
		port	:	1234,
		ip		:	'127.0.0.1',
	}, 
	app	:	{
		port 	:	8080
	},
	path : __dirname,
	path2:ttp,
	ROLE : ROLE
}
// module.exports = {
// 	DB_OPTIONS	:	DB_OPTIONS,
// 	cashMachine	:	{
// 		port	:	1234,
// 		ip		:	'127.0.0.1',
// 	}, 
// 	app	:	{
// 		port 	:	80
// 	}, 
// 	payment_method	:	{
// 		cash	:	1,
// 		credit	:	2
// 	},
// 	path : __dirname,
// 	ROLE : ROLE
// }