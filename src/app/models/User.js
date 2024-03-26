import {model, models, Schema} from "mongoose"

import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {
        type: String, 
        },
}, {timestamps: true});

// UserSchema.pre('save', (next, ...rest) => {
//     console.log(rest);
//     next();
// })
// UserSchema.post('validate', function (user) {
//     const notHasedPasword = user.password;
//     const salt = bcrypt.genSaltSync(10);
//     user.password = bcrypt.hashSync(notHasedPasword, salt);
// })

export const User = models?.User || model('User', UserSchema);