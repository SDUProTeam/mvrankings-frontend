import request from './fetch_helper'
import md5 from 'md5'
import { movieSourcesC2E, movieSourcesE2C, movieCountryC2E } from './data'

function setMovieCover(item) {
    if (item.source.douban?.cover ?? false) {
        item.cover = item.source.douban.cover
    } else {
        item.cover = Object.keys(item.source)[0].cover
    }
}

function setMovieSource(item) {
    var src = []
    if (item.source) {
        Object.keys(item.source).forEach(k => src.push(movieSourcesE2C[k]))
    }
    item.src = src.join(', ')
}

function setMovieRating(item) {
    const ratings = []
    const weights = []
    var totalW = 0
    
    if (item.source) {
        Object.keys(item.source).forEach(k => {
            if (!item.source[k].rating || item.source[k].rating.trim().length === 0 || item.source[k].rating === '0' || item.source[k].rating === '0.0') {
                item.source[k].rating = undefined
            }
            if (item.source[k].rating) {
                var rating = parseFloat(item.source[k].rating)
                if (isNaN(rating)) {
                    return
                }
                ratings.push(rating)
                if (item.source[k].rateNum) {
                    weights.push(item.source[k].rateNum)
                } else {
                    weights.push(1)
                }
            }
        })
    }

    weights.forEach(v => totalW += v)
    // 防止被0除
    if (totalW === 0) {
        totalW = 1
    }

    // 计算加权平均分
    var total = 0.0
    
    ratings.forEach((v, i) => {
        total += v * ( weights[i] / totalW )
    })
    item.rating = total.toFixed(1)
}

export function search(data, order, offset, mode, callback) {
    const reqData = {...data}
    reqData['source'] = movieSourcesC2E[(data ?? {source: '任意'}).source]
    reqData["country"] = movieCountryC2E[(data ?? { country: "任意" }).country]

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
        if (res.data) {
            res.data.forEach(item => {
                setMovieCover(item)
                setMovieSource(item)
                setMovieRating(item)
            })
        }
        callback(res)
    })
}

export function movieDetail(id, callback) {
    request({
        url: '/api/movie/' + id + '/',
        method: 'get',
    }).then(res => {
        if (res.data) {
            setMovieCover(res.data)
            setMovieSource(res.data)
            setMovieRating(res.data)
        }
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

export function recommendMovies(callback) {
    request({
        url: '/api/recommend',
        method: 'get'
    }).then(res => {
        if (res.rec) {
            res.rec.forEach(item => {
                if (item) {
                    setMovieCover(item)
                    setMovieSource(item)
                    setMovieRating(item)
                }
            })
        }
        callback(res)
    })
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

export function userHistory(callback) {
    request({
        url: '/api/history',
        method: 'get'
    }).then(res => {
        if (res.success && res.history) {
            res.history.forEach(item => {
                if (item) {
                    setMovieCover(item)
                    setMovieSource(item)
                    setMovieRating(item)
                }
            })
        }
        callback(res)
    })
}

export function personalize(callback) {
    request({
        url: '/api/question',
        method: 'get'
    }).then(res => {
        if (res.result && res.result[0] && res.result[0].source) {
            res.result.forEach(item => {
                if (item) {
                    setMovieCover(item)
                }
            })
        }
        callback(res)
    })
}