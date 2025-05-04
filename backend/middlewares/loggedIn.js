import jwt from 'jsonwebtoken'

export function loggedIn(req, res, next) {
    const { token } = req.headers
    if (token) {
        let user = jwt.verify(token, 'secret')
        req.user = user
        next()
    } else {
        res.status(500).json({ success: false, message: "Something went wrong!" })
    }
}
