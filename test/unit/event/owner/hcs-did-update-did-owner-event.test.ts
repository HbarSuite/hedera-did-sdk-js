import { PrivateKey } from "@hashgraph/sdk";
import { DidError, Hashing, HcsDidEventTargetName, HcsDidUpdateDidOwnerEvent } from "../../../../dist";

describe("HcsDidUpdateDidOwnerEvent", () => {
    const privateKey = PrivateKey.fromString(
        "302e020100300506032b6570042204209044d8f201e4b0aa7ba8ed577b0334b8cb6e38aad6c596171b5b1246737f5079"
    );
    const identifier = `did:hedera:testnet:${Hashing.multibase.encode(privateKey.publicKey.toBytes())}_0.0.29613327`;
    const event = new HcsDidUpdateDidOwnerEvent(identifier + "#did-root-key", identifier, privateKey.publicKey);

    describe("#constructor", () => {
        it("targets DIDOwner", () => {
            expect(event.targetName).toEqual(HcsDidEventTargetName.DID_OWNER);
        });

        it("throws error if id is null", () => {
            let error;
            try {
                new HcsDidUpdateDidOwnerEvent(<any>null, identifier, privateKey.publicKey);
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(DidError);
            expect(error.message).toEqual("Validation failed. DID Owner args are missing");
        });

        it("throws error if controller is null", () => {
            let error;
            try {
                new HcsDidUpdateDidOwnerEvent(identifier + "#did-root-key", <any>null, privateKey.publicKey);
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(DidError);
            expect(error.message).toEqual("Validation failed. DID Owner args are missing");
        });

        it("throws error if publicKey is null", () => {
            let error;
            try {
                new HcsDidUpdateDidOwnerEvent(identifier + "#did-root-key", identifier, <any>null);
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(DidError);
            expect(error.message).toEqual("Validation failed. DID Owner args are missing");
        });

        it("throws error if id is not valid", () => {
            let error;
            try {
                new HcsDidUpdateDidOwnerEvent(identifier, identifier, privateKey.publicKey);
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(DidError);
            expect(error.message).toEqual("Event ID is invalid. Expected format: {did}#did-root-key");
        });
    });

    describe("#getId", () => {
        it("returns id that was passed via constructor", () => {
            expect(event.getId()).toEqual(identifier + "#did-root-key");
        });
    });

    describe("#getType", () => {
        it("returns Ed25519VerificationKey2018", () => {
            expect(event.getType()).toEqual("Ed25519VerificationKey2018");
        });
    });

    describe("#getController", () => {
        it("returns identifier passed via constructor", () => {
            expect(event.getController()).toEqual(identifier);
        });
    });

    describe("#getPublicKey", () => {
        it("returns public key instance passed via constructor", () => {
            expect(event.getPublicKey()).toEqual(privateKey.publicKey);
        });
    });

    describe("#getPublicKeyBase58", () => {
        it("returns base58 encoded publicKey", () => {
            expect(event.getPublicKeyBase58()).toEqual("AEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC");
        });
    });

    describe("#getBase64", () => {
        it("returns event encoded in base64", () => {
            expect(event.getBase64()).toEqual(
                "eyJESURPd25lciI6eyJpZCI6ImRpZDpoZWRlcmE6dGVzdG5ldDp6QUVFeEQyM3Y5d3JFVVZIS3ZiN3RpSm1BTUdDcUhveFc4eXFXTnlGdzNTWENfMC4wLjI5NjEzMzI3I2RpZC1yb290LWtleSIsInR5cGUiOiJFZDI1NTE5VmVyaWZpY2F0aW9uS2V5MjAxOCIsImNvbnRyb2xsZXIiOiJkaWQ6aGVkZXJhOnRlc3RuZXQ6ekFFRXhEMjN2OXdyRVVWSEt2Yjd0aUptQU1HQ3FIb3hXOHlxV055RnczU1hDXzAuMC4yOTYxMzMyNyIsInB1YmxpY0tleUJhc2U1OCI6IkFFRXhEMjN2OXdyRVVWSEt2Yjd0aUptQU1HQ3FIb3hXOHlxV055RnczU1hDIn19"
            );
        });
    });

    describe("#toJsonTree", () => {
        it("returns event JSON tree", () => {
            expect(event.toJsonTree()).toEqual({
                DIDOwner: {
                    controller: "did:hedera:testnet:zAEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC_0.0.29613327",
                    id: "did:hedera:testnet:zAEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC_0.0.29613327#did-root-key",
                    publicKeyBase58: "AEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC",
                    type: "Ed25519VerificationKey2018",
                },
            });
        });
    });

    describe("#toJSON", () => {
        it("returns stringified version of JSON tree", () => {
            expect(event.toJSON()).toEqual(
                '{"DIDOwner":{"id":"did:hedera:testnet:zAEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC_0.0.29613327#did-root-key","type":"Ed25519VerificationKey2018","controller":"did:hedera:testnet:zAEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC_0.0.29613327","publicKeyBase58":"AEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC"}}'
            );
        });
    });

    describe("#fromJsonTree", () => {
        it("rebuilds HcsDidUpdateDidOwnerEvent object", () => {
            const eventFromJson = HcsDidUpdateDidOwnerEvent.fromJsonTree({
                controller: "did:hedera:testnet:zAEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC_0.0.29613327",
                id: "did:hedera:testnet:zAEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC_0.0.29613327#did-root-key",
                publicKeyBase58: "AEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC",
                type: "Ed25519VerificationKey2018",
            });

            expect(eventFromJson).toBeInstanceOf(HcsDidUpdateDidOwnerEvent);
            expect(eventFromJson.toJsonTree()).toEqual({
                DIDOwner: {
                    controller: "did:hedera:testnet:zAEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC_0.0.29613327",
                    id: "did:hedera:testnet:zAEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC_0.0.29613327#did-root-key",
                    publicKeyBase58: "AEExD23v9wrEUVHKvb7tiJmAMGCqHoxW8yqWNyFw3SXC",
                    type: "Ed25519VerificationKey2018",
                },
            });
        });
    });
});
