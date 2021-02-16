const logger = require('../utils/logger')

const tokenExtractor = (request, response, next) => {
    
    const authorization = request.get('authorization')
    // console.log(authorization)
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
        request.token = authorization.substring(7)
    }
        
    next()
}

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    return response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {

    console.log(`Error: ${error.message} ends`)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token'})
    }

    else if (error.name === 'TypeError' && error.message === "Cannot read property 'user' of null") {
        return response.status(500).json({ error: 'blog not present'})
    }

    next(error)
  
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}