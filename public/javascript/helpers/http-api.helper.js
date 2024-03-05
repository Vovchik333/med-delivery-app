const load = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    return fetch(url, options)
        .then((response) => response.json())
        .catch((err) => {
            throw err;
        });
}

export { load };