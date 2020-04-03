import requestUrl from 'request/requestUrl';
import axios from 'request/';

const home = {
  index(data) {
    return axios({
      // url: `${requestUrl.baseUrl}/getRoles`,
      url: `https://www.fastmock.site/mock/bd760dd8ed7013045d3016137fe3801f/api/homeIndex`,
      method: 'post',
      source: 'qiniuUrl'
    });
  }
}

export default home;