import request from './fetch_helper'

const movieSourcesC2E = {
    '任意': '',
    '豆瓣': 'douban',
    '猫眼': 'maoyan',
    '时光网': 'mtime'
}
export function search(data, order, offset, mode, callback) {
    const reqData = {...data}
    reqData['source'] = movieSourcesC2E[(data ?? {source: '任意'}).source]
    reqData["country"] = movieSourcesC2E[(data ?? { country: "任意" }).country];
    request({
        url: '/api/' + mode,
        method: 'get',
        data: {
            ...reqData,
            order: order,
            limit: 20,
            offset: offset
        }
    }).then(res => {
        callback(res)
    })
}

export function movieDetail(id) {
    request({
        url: '/api/movie/movie_id',
        method: 'get',
        data: {
            id: id
        }
    }).then(res => {
        console.log(res)
    })
}

export function recommendMovies() {

}