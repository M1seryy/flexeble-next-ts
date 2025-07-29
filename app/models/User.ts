import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  image: String,
});

// 👇 тут models?.User без помилки, навіть якщо models буде undefined
const UserModel = models?.User || model("User", UserSchema);

export default UserModel;
