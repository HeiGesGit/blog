import Vue from 'vue'
import http from '../http'
import { RECEIVE_ARTICLE, RECEIVE_ARTBYTAG, RECEIVE_ARTBYCGY } from './mutation-types'

Vue.prototype.$http = http

export default {
  getArticleList ({ commit }, callback) {
    // aUpdateName (context) {
    //   console.log(context)
    //   setTimeout(() => {
    //     context.commit('updateuserinfo', '张三 李四 王五')
    //   }, 1000)
    // }
    http.get('/api/getArticleList').then((res) => {
      // 更新state仓库
      const ArticleList = res.data
      commit(RECEIVE_ARTICLE, { ArticleList })
      callback && callback()
    })
    // .catch((err) => {
    //   console.log(err)
    // })
  },
  getArtByTag ({ commit }, payload) {
    http.get('/api/getArtByTag', {
      params: {
        tagName: payload.tagName
      }
    }).then((res) => {
      if (res.status === 200) {
        const artlistByTag = res.data
        commit(RECEIVE_ARTBYTAG, { artlistByTag })
      }
    })
    // .catch((err) => {
    //   console.log(err)
    // })
  },
  getArtByCgy ({ commit }, payload) {
    http.get('/api/getArtByCgy', {
      params: {
        cgyName: payload.cgyName
      }
    }).then((res) => {
      if (res.status === 200) {
        const artlistByCgy = res.data
        commit(RECEIVE_ARTBYCGY, { artlistByCgy })
      }
    })
    // .catch((err) => {
    //   console.log(err)
    // })
  }
}
