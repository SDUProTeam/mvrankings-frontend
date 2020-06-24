import request from './fetch_helper'
import md5 from 'md5'
import { movieSourcesC2E, movieCountryC2E } from './data'

export function search(data, order, offset, mode, callback) {
    const reqData = {...data}
    reqData['source'] = movieSourcesC2E[(data ?? {source: '任意'}).source]
    reqData["country"] = movieCountryC2E[(data ?? { country: "任意" }).country];

    if (reqData.rate_min === 0) {
        delete reqData.rate_min
    }

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

export function movieDetail(id, callback) {
    request({
        url: '/api/movie/' + id,
        method: 'get',
    }).then(res => {
        callback(res)
    })
}

export function movieComments(id, callback) {
    request({
        url: '/api/comments',
        method: 'get',
        data: {
            sourceId: id
        }
    }).then(res => {
        callback(res)
    })
}

export function recommendMovies() {

}

export function userLogin(un, pwd, callback) {
    if (un && un !== '') {

        if (pwd && pwd !== '') {
            request({
                url: '/api/signin',
                method: 'post',
                data: {
                    name: un,
                    pwd: md5(pwd)
                }
            }).then(res => {
                if (callback) {
                    callback(res)
                }
            })
        } else {
            alert('密码不能为空')
        }

    } else {
        alert('用户名/手机号不能为空')
    }
}

export function userReg(un, phone, pwd, callback) {
    if (un && un !== '') {

        if (pwd && pwd !== '') {
            var data = {
                name: un,
                pwd: md5(pwd)
            }
            if (phone && phone !== '') {
                data.phone = phone
            }

            request({
                url: '/api/signup',
                method: 'post',
                data: data
            }).then(res => {
                if (callback) {
                    callback(res)
                }
            })
        } else {
            alert('密码不能为空')
        }

    } else {
        alert('用户名/手机号不能为空')
    }
}