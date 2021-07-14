
import { Injectable } from "../loc/inject";

@Injectable()export interface KeepConfig {
  pageVersion: string,
  bananaName: string
}

@Injectable()
export default class KeepService {
  getInfo(): KeepConfig {
    return {
      pageVersion: "1.0.1",
      bananaName: "banana-name"
    }
  }
}