import ReviewModel from '../models/Review.js'

export const create = async (req, res) => {

    try {
        const doc = new ReviewModel({
            textReview: req.body.textReview,
            user: req.userId,
            dataForReview: req.body.dataForReview,
        })

        const review = await doc.save()
        res.json(review)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать опрос"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const reviews = await ReviewModel.find().populate('user').exec();
        res.json(reviews)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить опросы"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const reviewId = req.params.id;

        ReviewModel.findByIdAndDelete({
            _id: reviewId,
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Не удалось удалить опрос"
                });
            }
            if (!doc) {
                return res.status(404).json({
                    message: "Опрос не найден",
                })
            }
            res.json({
                success: true,
            })
        },)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить опрос"
        })
    }
}

