import { AbstractStorageService } from "@bitwarden/common/platform/abstractions/storage.service";

export class ElectronRendererStorageService implements AbstractStorageService {
  get<T>(key: string): Promise<T> {
    return ipc.platform.storageService("get", key);
  }

  has(key: string): Promise<boolean> {
    return ipc.platform.storageService("has", key);
  }

  save(key: string, obj: any): Promise<any> {
    return ipc.platform.storageService("save", key, obj);
  }

  remove(key: string): Promise<any> {
    return ipc.platform.storageService("remove", key);
  }
}
