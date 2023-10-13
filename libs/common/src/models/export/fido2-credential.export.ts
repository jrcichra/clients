import { EncString } from "../../platform/models/domain/enc-string";
import { Fido2Credential } from "../../vault/models/domain/fido2-credential";
import { Fido2CredentialView } from "../../vault/models/view/fido2-credential.view";

export class Fido2CredentialExport {
  static template(): Fido2CredentialExport {
    const req = new Fido2CredentialExport();
    req.credentialId = "keyId";
    req.keyType = "keyType";
    req.keyAlgorithm = "keyAlgorithm";
    req.keyCurve = "keyCurve";
    req.keyValue = "keyValue";
    req.rpId = "rpId";
    req.userHandle = "userHandle";
    req.counter = "counter";
    req.rpName = "rpName";
    req.userDisplayName = "userDisplayName";
    req.discoverable = "false";
    req.creationDate = null;
    return req;
  }

  static toView(req: Fido2CredentialExport, view = new Fido2CredentialView()) {
    view.credentialId = req.credentialId;
    view.keyType = req.keyType as "public-key";
    view.keyAlgorithm = req.keyAlgorithm as "ECDSA";
    view.keyCurve = req.keyCurve as "P-256";
    view.keyValue = req.keyValue;
    view.rpId = req.rpId;
    view.userHandle = req.userHandle;
    view.counter = parseInt(req.counter);
    view.rpName = req.rpName;
    view.userDisplayName = req.userDisplayName;
    view.discoverable = req.discoverable === "true";
    view.creationDate = new Date(req.creationDate);
    return view;
  }

  static toDomain(req: Fido2CredentialExport, domain = new Fido2Credential()) {
    domain.credentialId = EncString.fromNullable(req.credentialId);
    domain.keyType = EncString.fromNullable(req.keyType);
    domain.keyAlgorithm = EncString.fromNullable(req.keyAlgorithm);
    domain.keyCurve = EncString.fromNullable(req.keyCurve);
    domain.keyValue = EncString.fromNullable(req.keyValue);
    domain.rpId = EncString.fromNullable(req.rpId);
    domain.userHandle = EncString.fromNullable(req.userHandle);
    domain.counter = EncString.fromNullable(req.counter);
    domain.rpName = EncString.fromNullable(req.rpName);
    domain.userDisplayName = EncString.fromNullable(req.userDisplayName);
    domain.discoverable = EncString.fromNullable(req.discoverable);
    domain.creationDate = req.creationDate;
    return domain;
  }

  credentialId: string;
  keyType: string;
  keyAlgorithm: string;
  keyCurve: string;
  keyValue: string;
  rpId: string;
  userHandle: string;
  counter: string;
  rpName: string;
  userDisplayName: string;
  discoverable: string;
  creationDate: Date;

  constructor(o?: Fido2CredentialView | Fido2Credential) {
    if (o == null) {
      return;
    }

    if (o instanceof Fido2CredentialView) {
      this.credentialId = o.credentialId;
      this.keyType = o.keyType;
      this.keyAlgorithm = o.keyAlgorithm;
      this.keyCurve = o.keyCurve;
      this.keyValue = o.keyValue;
      this.rpId = o.rpId;
      this.userHandle = o.userHandle;
      this.counter = String(o.counter);
      this.rpName = o.rpName;
      this.userDisplayName = o.userDisplayName;
      this.discoverable = String(o.discoverable);
    } else {
      this.credentialId = o.credentialId?.encryptedString;
      this.keyType = o.keyType?.encryptedString;
      this.keyAlgorithm = o.keyAlgorithm?.encryptedString;
      this.keyCurve = o.keyCurve?.encryptedString;
      this.keyValue = o.keyValue?.encryptedString;
      this.rpId = o.rpId?.encryptedString;
      this.userHandle = o.userHandle?.encryptedString;
      this.counter = o.counter?.encryptedString;
      this.rpName = o.rpName?.encryptedString;
      this.userDisplayName = o.userDisplayName?.encryptedString;
      this.discoverable = o.discoverable?.encryptedString;
    }
    this.creationDate = o.creationDate;
  }
}
