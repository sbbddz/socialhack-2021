let mongoose = require('mongoose')
let Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const saltRounds = 10;

let UserSchema = Schema (
    {
        _id: {type: Schema.ObjectId, auto: true},
        name: { type: Schema.Types.String, required: true},
        email: { type: Schema.Types.String, required: true, unique:true},
        password: { type: Schema.Types.String, required: true},
        address: String,
        rol: { type: String, enum: ['public', 'admin', '3sector'], default: 'public'},
        imageUrl: String,
        createdAt: {type: Schema.Types.Date, default: Date.now },
    }
)

UserSchema.pre('save', function(next) {
    if(this.isModified('password') === false){
        next();
    } else {
        this.password = bcrypt.hashSync(this.password, saltRounds);
        next();
    }
});

module.exports = mongoose.model('User', UserSchema)

