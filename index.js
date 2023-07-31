"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const awscred = require('awscred');
const loadAwsCred = util_1.promisify(awscred.load);
const loadRegion = util_1.promisify(awscred.loadCredentialsAndRegion);
var CredentialAttribute;
(function (CredentialAttribute) {
    CredentialAttribute["accessKeyId"] = "accessKeyId";
    CredentialAttribute["secretAccessKey"] = "secretAccessKey";
    CredentialAttribute["sessionToken"] = "sessionToken";
    CredentialAttribute["region"] = "region";
})(CredentialAttribute || (CredentialAttribute = {}));
exports.templateTags = [
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
        async run(context, attribute) {
            if (attribute == CredentialAttribute.region) {
                return awscred.loadRegionSync();
            }
            const loadedCredentialObject = await loadAwsCred();
            return loadedCredentialObject.credentials[attribute];
        },
    }
];
