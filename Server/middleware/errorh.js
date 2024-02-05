class ErrorHandler extends Error{
    constructor(message,statusCode)
    {
        super(message);
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor);
    }
}

export const errorMiddleWare=(error,req,res,next)=>
{
error.message=error.message || "Internal server error";
error.statusCode=error.statusCode || 500;

return res.status(error.statusCode).json({
    success:false,
    message:error.message,
})
};

export default ErrorHandler;