import RouteModel from '../models/Route.js'

export const create = async (req, res) => {

    try {
        const doc = new RouteModel({
            title: req.body.title,
            description: req.body.description,
            list: req.body.list,
            user: req.userId,
            logo: req.body.logo,
        })

        const route = await doc.save()
        res.json(route)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось создать опрос"
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const routes = await RouteModel.find().populate('user').exec();
        res.json(routes)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить опросы"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const routeId = req.params.id;

        RouteModel.findByIdAndUpdate({
            _id: routeId,

        }, {
            $inc: { viewsCount: 1 },
        }, {
            returnDocument: 'after',
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: "Не удалось вернуть опрос"
                })
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'Опрос не найден',
                })
            }
            res.json(doc)
        }).populate('user')
    } catch (error) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось получить опрос"
        })
    }
}
export const remove = async (req, res) => {
    try {
        const routeId = req.params.id;

        RouteModel.findByIdAndDelete({
            _id: routeId,
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
export const update = async (req, res) => {
    try {
        const routeId = req.params.id;
        await RouteModel.updateOne({
            _id: routeId,
        }, {
            reviews: req.body.reviews
        })

        res.json({
            success: true,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось обновить опрос"
        })
    }
}
