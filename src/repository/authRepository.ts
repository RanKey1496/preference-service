import { post } from 'request';
import { AUTH_URL } from '../utils/secrets';
import { Unauthorize } from '../utils/exceptions';

export function requestAuth(token: string): any {
    return new Promise((resolve, reject) => {
        post(AUTH_URL, { headers: { 'Authorization': token }}, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                reject(new Unauthorize('Invalid token'));
            }
        });
    });
}