import jwt from 'jsonwebtoken';
import config from 'config';
const BEARER = 'Bearer ';

const auth = (req: any, res: any, next: any) => {

    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.startsWith(BEARER)) {
        const accessToken = authHeader.substring(BEARER.length)
        try {
            const payload: any = jwt.verify(accessToken, (config.get('jwt.jwt_secret')));
            req.user = {username: payload.sub, roles: payload.roles}
            
        } catch (error) {
        
        }
    }
    next();
}

export default auth;

