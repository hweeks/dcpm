import * as UserApi from './user'
import * as BlobApi from './blob'

export class BaseApi {
  token: string
  constructor(token?: string) {
    this.token = token || '';
  }
  async user (type: UserApi.TUserApiChoices, {username, password}: UserApi.UserApiPayload) {
    const methodToCall = (UserApi as UserApi.UserApiInterface)[type]
    const builtResponse = await methodToCall(username, password)
    if (builtResponse) {
      this.token = builtResponse
    }
    return builtResponse
  }
  async blob (method: BlobApi.TBlobApiMethods, inputArgs: BlobApi.PossibleBlobArgs) {
    const methodToCall = BlobApi[method]
    return await methodToCall(inputArgs as any, this.token)
  }
}
