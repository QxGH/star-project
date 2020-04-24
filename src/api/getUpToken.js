import axios from 'axios'

export default function getUpToken(key) {
    let data = new FormData();
    data.append('key', key);
    return axios.get( 'https://api.ledianyun.com/api/get/qiniuUploadToken', data).then(res => res.data)
}
