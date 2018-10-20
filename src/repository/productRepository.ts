import { get } from 'request';
import { PRODUCT_URL } from '../utils/secrets';
import { BadRequest } from '../utils/exceptions';

export function findCorridorId(token: string, id: number): any {
    const url = `${PRODUCT_URL}/product/${id}`;
    return new Promise((resolve, reject) => {
        get(url, { headers: { 'Authorization': token }, json: true }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                console.log(body);
                reject(new BadRequest('Unable to request to product service'));
            }
        });
    });
}