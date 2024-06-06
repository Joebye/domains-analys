const validate = (schema: any) => {
    return (req:any, res:any, next:any) => {
        if (!schema) {
            schema = req.schema
        } 
        if (schema && req.originalUrl) {
            const origUrl = req.originalUrl.split('/')[1];
            const {error} = schema.validate({domain: origUrl});  
            req.validated = true;   
            if (error) {
            req.joiError = error.details[0].message; 
            }
         
       }
      next();

    }
}

export default validate;