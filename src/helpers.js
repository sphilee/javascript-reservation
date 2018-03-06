/**
 * AJAX request.
 *
 * @param {String} url
 * @return {Object}
 */
function request(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.onload = () => (xhr.status >= 200 && xhr.status < 400) ?
            resolve(JSON.parse(xhr.response)) : reject(xhr.status);
        xhr.ontimeout = () => reject('timeout');
        xhr.send();
    });
}
/**
 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
 *
 * @param {Function} func Function to wrap.
 * @param {Number} limit Number of milliseconds that must elapse between `func` invocations.
 * @return {Function} A new function that wraps the `func` function passed in.
 */

export function throttle(func, limit) {
    let wait = false;
    return function () {
        if (!wait) {
            func.apply(null, arguments);
            wait = true;
            setTimeout(() => {
                wait = false;
            }, limit);
        }
    };
}

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return value.data;
}

function isValid(receivedTime, thresholdHour) {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - receivedTime) / 1000 / 60 / 60;
    return elapsedTime < thresholdHour;
}

const fetchJSONP = (unique => url =>
    new Promise(resolve => {
        const script = document.createElement('script');
        const name = `_jsonp_${unique++}`;
        url += url.match(/\?/) ? `&callback=${name}` : `?callback=${name}`;
        script.src = url;
        window[name] = json => {
            resolve(json);
            script.remove();
            delete window[name];
        };
        document.body.appendChild(script);
    })
)(0);

export async function checkLocalStorage(key, isJSONP) {
    const cache = getLocalStorage(key);
    if (cache && isValid(cache.time, 6)) return cache.data;
    const value = {
        data: isJSONP ? (await fetchJSONP(key))[1] : await request(key),
        time: Date.now()
    };
    return value.data.hasOwnProperty('error') ? false : setLocalStorage(key, value);
}