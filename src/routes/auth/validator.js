const expressValidator = require('express-validator');
const check = expressValidator.check;

class Validator {
    registerValidator() {
        return [
            check('email').isEmail().withMessage('email is Invalid'),
            check('name').not().isEmpty().withMessage('can not be empty'),
            check('password').not().isEmpty().withMessage('password not be empty'),
        ];
    }

    loginValidator() {
        return [
            check('email').isEmail().withMessage('email is Invalid'),
            check('password').not().isEmpty().withMessage('password not be empty'),
        ];
    }
}

module.exports = new Validator();
