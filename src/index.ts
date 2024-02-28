import * as fs from 'fs';

const translationKeys = ['name', 'lastName'] as const;

type translationKeysType = {
    [K in typeof translationKeys[number]]: string;
};

let jsonData: any = JSON.parse(fs.readFileSync('out/nl-NL.json', 'utf-8'));

// Function to ensure all keys exist, add keys with empty strings, and remove keys not in translation keys
function updateEmptyStrings(obj: any): any {
    for (const key in obj) {
        if (!translationKeys.includes(key as keyof translationKeysType)) {
            delete obj[key];
        } else if (typeof obj[key] === 'object') {
            updateEmptyStrings(obj[key]);
        }
    }

    for (const key of translationKeys) {
        if (!obj.hasOwnProperty(key)) {
            obj[key] = '';
        }
    }

    return obj;
}

jsonData = updateEmptyStrings(jsonData);

fs.writeFileSync('out/nl-NL.json', JSON.stringify(jsonData, null, 2));