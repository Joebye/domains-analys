import jwt from 'jsonwebtoken';
import config from 'config';
const BEARER = 'Bearer ';

const auth = (req: any, res: any, next: any) => {

const jwtSecret = config.get('jwt.jwt_secret') as string;


    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.startsWith(BEARER)) {
        const accessToken = authHeader.substring(BEARER.length)
        try {
            const payload: any = jwt.verify(accessToken, jwtSecret);
            req.user = {username: payload.sub, roles: payload.roles}
            
        } catch (error) {
        
        }
    }
    next();
}

export default auth;

