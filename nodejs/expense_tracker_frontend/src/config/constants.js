const getConstants = () => {
    if (process.env.NODE_ENV === 'production') {
        return {
            backendBaseUrl: process.env.REACT_APP_EXPENSE_BACKEND_PROD_BASEURL
        };
    } else {
        return {
            backendBaseUrl: process.env.REACT_APP_EXPENSE_BACKEND_DEV_BASEURL
        };
    }
};

export const constants = getConstants();
