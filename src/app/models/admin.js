const { Mongoose } = require('../database')
const bcrypt = require('bcrypt')

const adminSchema = new Mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

adminSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

const Admin = Mongoose.model('Admin', adminSchema)

module.exports = Admin