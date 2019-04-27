let Mongo = require("mongodb-curd");
let db = "1701";
let c = "title";
module.exports = {
    getData(req, res, next) {
        Mongo.find(db, c, {}, function(rs) {
            if (!rs) {
                return res.send({ code: 0 })
            }
            res.send({ code: 1, data: rs })

        })
    },
    addData(req, res, next) {
        let { title, content, _id } = req.body;
        if (_id) {
            delete req.body._id;
            Mongo.update(db, c, [{ "_id": _id }, req.body], function(rs) {
                if (!rs) {
                    return res.send({ code: 0 })
                }
                res.send({ code: 1 })

            })
        } else {
            Mongo.insert(db, c, req.body, function(rs) {
                if (!rs) {
                    return res.send({ code: 0 })
                }
                res.send({ code: 1 })

            })
        }

    }
}