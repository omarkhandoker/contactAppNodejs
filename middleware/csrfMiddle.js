import csrf from 'csurf'

export const csrfProtcetion = csrf({ cookie: true });