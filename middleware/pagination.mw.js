module.exports.pagination = async (req, res, next) => {
    try {
        const {query} = req;
        const pg = Number(query.page);
        const pagination = {
            limit: 5,
        }
        pagination.offset = pg ? pagination.limit * (pg - 1) : 0;
        req.pagination = pagination;
        next();
    } catch (err) {
        next(err);
    }

}