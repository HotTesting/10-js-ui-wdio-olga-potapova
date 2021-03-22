const _fetch = require('node-fetch')

export class ApiClient {
    registerNewUser(data: {
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string,
        newsletter: string,
        agree: string
    }) {
        return browser.call(async () => {
            return await _fetch("http://93.126.97.71:10082/index.php?route=account/register", {
                "headers": {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "accept-language": "en-US,en-GB;q=0.9,en;q=0.8,en-CA;q=0.7,de-AT;q=0.6,de;q=0.5,it;q=0.4,ko;q=0.3",
                    "cache-control": "max-age=0",
                    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary9cTguViKjNXHraCK",
                    "upgrade-insecure-requests": "1"
                },
                "referrer": "http://93.126.97.71:10082/index.php?route=account/register",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": `------WebKitFormBoundary9cTguViKjNXHraCK\r\nContent-Disposition: form-data; name=\"customer_group_id\"\r\n\r\n1\r\n------WebKitFormBoundary9cTguViKjNXHraCK\r\nContent-Disposition: form-data; name=\"firstname\"\r\n\r\n${data.firstName}\r\n------WebKitFormBoundary9cTguViKjNXHraCK\r\nContent-Disposition: form-data; name=\"lastname\"\r\n\r\n${data.lastName}\r\n------WebKitFormBoundary9cTguViKjNXHraCK\r\nContent-Disposition: form-data; name=\"email\"\r\n\r\n${data.email}\r\n------WebKitFormBoundary9cTguViKjNXHraCK\r\nContent-Disposition: form-data; name=\"telephone\"\r\n\r\n${data.telephone}\r\n------WebKitFormBoundary9cTguViKjNXHraCK\r\nContent-Disposition: form-data; name=\"password\"\r\n\r\n${data.password}\r\n------WebKitFormBoundary9cTguViKjNXHraCK\r\nContent-Disposition: form-data; name=\"confirm\"\r\n\r\n${data.password}\r\n------WebKitFormBoundary9cTguViKjNXHraCK\r\nContent-Disposition: form-data; name=\"newsletter\"\r\n\r\n${data.newsletter}\r\n------WebKitFormBoundary9cTguViKjNXHraCK\r\nContent-Disposition: form-data; name=\"agree\"\r\n\r\n${data.agree}\r\n------WebKitFormBoundary9cTguViKjNXHraCK--\r\n`,
                "method": "POST",
                "credentials": "include"
            });
        })
    }
}

