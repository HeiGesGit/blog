import { RECEIVE_ARTICLE, RECEIVE_ARTBYTAG, RECEIVE_ARTBYCGY } from './mutation-types'
import http from '../http'
import Vue from 'vue'

export default {
  // 浏览器打开一个新窗口
  openNewWindow (state, path) {
    window.open(path)
  },
  deleteByTagId (state, tagNameById) {
    // console.log(tagNameById)
    http.get('/users/api/tags/delete', {
      params: {
        id: tagNameById
      }
    }).then(function (res) {
      if (res.status === 200) {
        state.tagsList = res.data
        Vue.prototype.$message({
          type: 'success',
          message: '删除成功'
        })
      }
    })
  },
  updateLogin (state, bool) {
    state.isLogin = bool
  },
  deleteByCgyId (state, cgyNameById) {
    // console.log(cgyNameById)
    http.get('/users/api/cgies/delete', {
      params: {
        id: cgyNameById
      }
    }).then(function (res) {
      if (res.status === 200) {
        state.tagsList = res.data
        Vue.prototype.$message({
          type: 'success',
          message: '删除成功'
        })
      }
    })
  },

  // 更新文章状态
  [RECEIVE_ARTICLE] (state, { ArticleList }) {
    state.ArticleList = ArticleList
  },
  [RECEIVE_ARTBYTAG] (state, { artlistByTag }) {
    state.artlistByTag = artlistByTag
  },
  [RECEIVE_ARTBYCGY] (state, { artlistByCgy }) {
    state.artlistByCgy = artlistByCgy
  },

  // 修改当前适配端
  updateIsMobile (state, isMobile) {
    state.isMobile = isMobile
  }

}
