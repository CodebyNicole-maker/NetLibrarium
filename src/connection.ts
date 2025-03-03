import mongoose  from 'mongoose';
const connectionString = 'mongodb://127.0.0.1:27017/NetLibrarium';

mongoose.connect(connectionString);

const db = mongoose.connection;
// Error handling
db.on('error', console.error.bind(console,' MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB successfully!'));
export default db;
