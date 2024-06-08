const valid = (req: any, res: any, next: any) => {
   
    if (!req.body) {
        throw `no body exists`;
    }
    if (!req.validated) {
        throw `must be validated`
    }
    if (req.joiError) {
        res.status(500)
        throw req.joiError;
    }
   
    next();

}
export default valid;