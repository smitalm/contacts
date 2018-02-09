import reframe from './reframe-hack'

const rootMiddleware = reframe.compMiddleware([
    reframe.when(() => window.debug, reframe.debug)
])

const commonMiddleware = [rootMiddleware, reframe.trimv]

export default commonMiddleware
