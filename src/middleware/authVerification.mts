const authVerification = (...roles: any) => {
    return (req: any, res: any, next: any) => {
     if (!req.user) {
         res.status(401);
         throw 'not authenticated';
     }
 
     const userRoles = req.user.roles;
     if (!userRoles.some((ur: any) => roles.includes(ur))) {
         res.status(403);
         throw 'access denied';
     }
     next();
 }
 }
 
 export default authVerification;