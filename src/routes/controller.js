const autoBind = require('auto-bind');
const { validationResult } = require('express-validator');
const User = require('../models/user');
module.exports = class {
    constructor() {
        this.User = User;
        autoBind(this);
    }

    validationBody(req, res) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const errors = result.array();
            const messages = [];
            errors.forEach(err => messages.push(err.msg));
            res.status(400).json({
                message: 'Validation Errors',
                data: messages,
            });
            return false;
        }
        return true;
    }

    validate(req, res, next) {
        if (!this.validationBody(req, res)) return;
        next();
    }

    response({ res, message, code = 200, data = {}, errors = null }) {
        res.status(code).json({
            data,
            message,
            errors,
            status: code,
        });
    }
};
