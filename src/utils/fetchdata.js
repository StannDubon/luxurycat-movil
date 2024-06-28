// fetchData.js
import * as Constantes from '../utils/constantes'

const fetchData = async (filename, action, form = null) => {
    const OPTIONS = {};
    if (form) {
        OPTIONS.method = 'POST';
        OPTIONS.body = form;
    } else {
        OPTIONS.method = 'GET';
    }
    try {
        const PATH = new URL(`${Constantes.IP}/luxurycat/api/services/public/${filename}.php`);
        PATH.searchParams.append('action', action);

        console.log('Fetching:', PATH.href, OPTIONS);
        const RESPONSE = await fetch(PATH.href, OPTIONS);
        if (!RESPONSE.ok) {
            throw new Error(`HTTP error! status: ${RESPONSE.status}`);
        }
        return await RESPONSE.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: true, message: error.message };
    }
};


export default fetchData;
