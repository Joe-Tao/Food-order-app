import {model, models, Schema} from "mongoose"

import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {
        type: String, 
        required: true, 
        validate: pass => {
            if (!pass?.length || pass.length < 5){
                new Error('password must be at least 5 characters');
                return false;
            }
        }},
}, {timestamps: true});

// UserSchema.pre('save', (next, ...rest) => {
//     console.log(rest);
//     next();
// })
UserSchema.post('validate', function (user) {
    const notHasedPasword = user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(notHasedPasword, salt);
})

export const User = models?.User || model('User', UserSchema);