const load = async (url, options = {}) => {
    const {
        method = 'GET',
        payload = null,
        contentType = 'application/json'
    } = options;

    const headers = {
        'Content-Type': contentType
    };

    return fetch(url, {
        method,
        headers,
        body: payload
    })
        .then((response) => response.json())
        .catch((err) => {
            throw err;
        });
}

export { load };