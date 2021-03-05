



// Get the Host from Environment or use default
const host = 'remotemysql.com';

// Get the User for DB from Environment or use default
const user = 'W9jGKSIVO9';

// Get the Password for DB from Environment or use default
const password = 'Oy0t3OtVFu';

// Get the Database from Environment or use default
const database = 'W9jGKSIVO9';

const queueLimit = 0; // unlimited queueing
const connectionLimit = 0; // unlimited connections 

module.exports = { host, user, password, database, queueLimit, connectionLimit };