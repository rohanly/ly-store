import { connect } from "mongoose";

const connectDatabase = () => {
  connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`🟢 Mongodb connected with server: ${data.connection.host}`);
    });
};

export default connectDatabase;