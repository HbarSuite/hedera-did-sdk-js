import { PrivateKey } from "@hashgraph/sdk";
import { DidError, Hashing, HcsDidCreateServiceEvent, HcsDidEventTargetName } from "../../../../dist";

describe("HcsDidCreateServiceEvent", () => {
    const privateKey = PrivateKey.fromString(
        "302e020100300506032b6570042204209044d8f201e4b0aa7ba8ed577b0334b8cb6e38aad6c596171b5b1246737f5079"
    );
    const identifier = `did:hedera:testnet:${Hashing.multibase.encode(privateKey.publicKey.toBytes())}_0.0.29613327`;
    const event = new HcsDidCreateServiceEvent(
        identifier + "#service-1",
        "DIDCommMessaging",
        "https://vc.test.service.com"
    );

    describe("#constructor", () => {
        it("targets Service", () => {
            expect(event.targetName).toEqual(HcsDidEventTargetName.SERVICE);
        });

        it("throws error if id is null", () => {
            let error;
            try {
                new HcsDidCreateServiceEvent(<any>null, "DIDCommMessaging", "https://vc.test.service.com");
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(DidError);
            expect(error.message).toEqual("Validation failed. Services args are missing");
        });

        it("throws error if type is null", () => {
            let error;
            try {
                new HcsDidCreateServiceEvent(identifier + "#service-1", <any>null, "https://vc.test.service.com");
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(DidError);
            expect(error.message).toEqual("Validation failed. Services args are missing");
        });

        it("throws error if serviceEndpoint is null", () => {
            let error;
            try {
                new HcsDidCreateServiceEvent(identifier + "#service-1", "DIDCommMessaging", <any>null);
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(DidError);
            expect(error.message).toEqual("Validation failed. Services args are missing");
        });

        it("throws error if id is not valid", () => {
            let error;
            try {
                new HcsDidCreateServiceEvent(identifier, "DIDCommMessaging", "https://vc.test.service.com");
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(DidError);
            expect(error.message).toEqual("Event ID is invalid. Expected format: {did}#service-{integer}");
        });
    });

    describe("#getId", () => {
        it("returns id passed via constructor", () => {
            expect(event.getId()).toEqual(
                "did:hedera:testnet:zAEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC_0.0.29613327#service-1"
            );
        });
    });

    describe("#getType", () => {
        it("returns type passed via constructor", () => {
            expect(event.getType()).toEqual("DIDCommMessaging");
        });
    });

    describe("#getServiceEndpoint", () => {
        it("returns endpoint passed via constructor", () => {
            expect(event.getServiceEndpoint()).toEqual("https://vc.test.service.com");
        });
    });

    describe("#getBase64", () => {
        it("returns event data encoded in base64", () => {
            expect(event.getBase64()).toEqual(
                "eyJTZXJ2aWNlIjp7ImlkIjoiZGlkOmhlZGVyYTp0ZXN0bmV0OnpBRUV4RDIzdjl3ckVVVkhLdmI3dGlKbUFNR0NxSG94Vzh5cVdOeUZ3M1NYQ18wLjAuMjk2MTMzMjcjc2VydmljZS0xIiwidHlwZSI6IkRJRENvbW1NZXNzYWdpbmciLCJzZXJ2aWNlRW5kcG9pbnQiOiJodHRwczovL3ZjLnRlc3Quc2VydmljZS5jb20ifX0="
            );
        });
    });

    describe("#toJsonTree", () => {
        it("returns event JSON structure", () => {
            expect(event.toJsonTree()).toEqual({
                Service: {
                    id: "did:hedera:testnet:zAEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC_0.0.29613327#service-1",
                    serviceEndpoint: "https://vc.test.service.com",
                    type: "DIDCommMessaging",
                },
            });
        });
    });

    describe("#toJSON", () => {
        it("returns stringified JSON structure version", () => {
            expect(event.toJSON()).toEqual(
                '{"Service":{"id":"did:hedera:testnet:zAEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC_0.0.29613327#service-1","type":"DIDCommMessaging","serviceEndpoint":"https://vc.test.service.com"}}'
            );
        });
    });

    describe("#fromJsonTree", () => {
        it("rebuilds HcsDidCreateServiceEvent object", () => {
            const eventFromJson = HcsDidCreateServiceEvent.fromJsonTree({
                id: "did:hedera:testnet:zAEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC_0.0.29613327#service-1",
                serviceEndpoint: "https://vc.test.service.com",
                type: "DIDCommMessaging",
            });

            expect(eventFromJson).toBeInstanceOf(HcsDidCreateServiceEvent);
            expect(eventFromJson.toJsonTree()).toEqual({
                Service: {
                    id: "did:hedera:testnet:zAEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC_0.0.29613327#service-1",
                    serviceEndpoint: "https://vc.test.service.com",
                    type: "DIDCommMessaging",
                },
            });
        });
    });
});
