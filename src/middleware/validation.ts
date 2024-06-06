const validate = (schema: any) => {
    return (req:any, res:any, next:any) => {
        if (!schema) {
            schema = req.schema
        } 
        if (schema && req.originalUrl) {
            const origUrl = req.originalUrl.split('/')[1];
            const {error} = schema.validate({domain: origUrl});  // req.body validated; validation errors store in const error
            req.validated = true;   //check has been done
            if (error) {
            req.joiError = error.details[0].message;  //if validation is error -> first message store to req.joiError
            }
         
       }
      next();

    }
}

export default validate;