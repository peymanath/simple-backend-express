const controller = require('../controller');
const { hash } = require('bcryptjs');
const _ = require('lodash');

module.exports = new (class extends controller {
    async register({ body }, res) {
        let user = new this.User(_.pick(body, ['name', 'email', 'password']));
        user.password = await hash(user.password, 16);
        try {
            await user.save();
            this.response({
                res,
                message: 'the user successfully registered',
                data: _.pick(user, ['_id', 'name', 'email']),
            });
        } catch (err) {
            const errors = Object.entries(err.keyValue);
            const isDup = err.code === 11000;
            this.response({
                res,
                message: isDup ? `User already exist!` : 'Error',
                errors: isDup ? err.keyValue : errors,
                code: 422,
            });
        }
    }

    async login(req, res) {
        res.send('login');
    }
})();
