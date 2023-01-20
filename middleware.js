// we use middleware to ensure that the user had signin when he wants to like or comment a post.

import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; // is the token is our own token (not from googleAuth)
        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.exp;

        } else { // token is from googleAtuh
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next(); // go to the next step
    } catch (error) {
        console.log('ffffffffffffffffff', error)
    }
}
export default auth;