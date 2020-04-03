import requestUrl from 'request/requestUrl';
import axios from 'request/';

const qiniu = {
  upload(data) {
    return axios({
      url: `${requestUrl.baseUrl}/getRoles`,
      data,
      method: 'post',
      source: 'qiniuUrl'
    });
  }
}

export default qiniu;