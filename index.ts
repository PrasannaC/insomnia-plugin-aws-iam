import { promisify } from 'util';
const awscred = require('awscred');

const loadAwsCred = promisify(awscred.load);

enum Attribute {
    accessKeyId = 'accessKeyId',
    secretAccessKey = 'secretAccessKey',
    sessionToken = 'sessionToken',
}

export const templateTags = [
    {
        name: 'awscreds',
        displayName: 'awscreds',
        description: 'Insomnia plugin - AWS IAM credential loader',
        args: [{
            displayName: 'Attribute',
            type: 'enum',
            options: [
                {
                    displayName: Attribute.accessKeyId,
                    value: Attribute.accessKeyId,
                },
                {
                    displayName: Attribute.secretAccessKey,
                    value: Attribute.secretAccessKey,
                },
                {
                    displayName: Attribute.sessionToken,
                    value: Attribute.sessionToken,
                }
            ]
        }],
        async run(context: object, attribute: Attribute) {
            const loadedCredentialObject = await loadAwsCred();
            return loadedCredentialObject.credentials[attribute];
        },
    }
];
