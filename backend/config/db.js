import mongoose from 'mongoose';

const connectDC = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONG_URI);

		console.log(`mongodb connected : ${connect.connection.host}`);
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDC;
