import axios from 'axios';

export function getPage(page) {
    return axios({
        method: 'GET',
        url: `https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/feed/page_${page}.json`,
        crossDomain: true
    })
}