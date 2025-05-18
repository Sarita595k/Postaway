
export const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toLocaleString()

    console.log(`[the time when request made: ${time}, on url :${url} and method is: ${method} ]`)
    next()
}

export default logger