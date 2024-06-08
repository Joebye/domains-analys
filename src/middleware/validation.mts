const validate = (schema: any) => {
    return (req:any, res:any, next:any) => {
        if (!schema) {
            schema = req.schema
        } 
        if (schema && Object.keys(req.query).length > 0) {
            const query = req.query.domainName;
            const {error} = schema.validate({domain: query});  
            req.validated = true;   
            if (error) {
            req.joiError = error.details[0].message; 
            }
        }
        if (schema && req.originalUrl && Object.keys(req.query).length == 0) {
            const origUrl = req.originalUrl.split('/')[req.originalUrl.split('/').length-1];
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