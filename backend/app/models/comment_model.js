const mongoose = require('mongoose');


const comment_schema = new mongoose.Schema({
    msg: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
}, { timestamps: true });

comment_schema.methods.toJSONFor = function (user) {
    return {
        id: this._id,
        msg: this.msg,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        owner: this.owner.toProfileCommentJSON()
    };
};

mongoose.model('Comment', comment_schema);
