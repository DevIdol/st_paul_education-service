export const createError = (status, message) => {
    let err = new Error();
    err.status = status;
    err.message = message;
    return err;
};