import { promisify } from 'util';
const awscred = require('awscred');



const loadAwsCred = promisify(awscred.load);
const loadRegion = promisify(awscred.loadCredentialsAndRegion);

enum CredentialAttribute {
    accessKeyId = 'accessKeyId',
    secretAccessKey = 'secretAccessKey',
    sessionToken = 'sessionToken',
    region = 'region',
}

export const templateTags = [
    {
        name: 'awscreds',
        displayName: 'awscreds',
        description: 'Plugin: AWS IAM credential loader',
        args: [{
            displayName: 'Attribute',
            type: 'enum',
            options: [
                {
                    displayName: CredentialAttribute.accessKeyId,
                    value: CredentialAttribute.accessKeyId,
                },
                {
                    displayName: CredentialAttribute.secretAccessKey,
                    value: CredentialAttribute.secretAccessKey,
                },
                {
                    displayName: CredentialAttribute.sessionToken,
                    value: CredentialAttribute.sessionToken,
                },
                {
                    displayName: CredentialAttribute.region,
                    value: CredentialAttribute.region,
                }
            ]
        }],
        async run(context: object, attribute: CredentialAttribute) {
            if (attribute == CredentialAttribute.region){
                return awscred.loadRegionSync();
            }
            const loadedCredentialObject = await loadAwsCred();
            return loadedCredentialObject.credentials[attribute];
        },
    }
];
