import { body } from "express-validator"

export const registerValidation = [
    body("username", "имя должно быть минмум 3 символа").isLength({ min: 3 }),
    body("password", "пароль должен быть минмум 5 символов").isLength({ min: 5 }),
]

export const loginValidation = [
    body("username", "имя должно быть минмум 3 символа").isLength({ min: 3 }),
    body("password", "пароль должен быть минмум 5 символов").isLength({ min: 5 }),
]


export const routeCreateValidation = [
    body('title', 'Введите название опроса').isLength({min:3}).isString(),
    body('logo', 'Поставьте логотип').isString(),
    body('description', 'Введите описание опроса').isLength({min:5}).isString(),
    body('route', 'Введите вопросы').isArray(),
    body('list', 'Введите вопросы').isArray(),

]
export const reviewCreateValidation = [
    body('textReview', 'Введите отзыв').isLength({min:3}).isString(),
    body('dataForReview', 'Введите отзыв').isArray(),
]
