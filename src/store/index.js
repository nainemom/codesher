import VueCookie from 'vue-cookie'
import { serialize, deserialize, getConfig } from "../utils/index.js";
import axios from "axios";
import parse from 'parse-link-header';

export const state = () => {
  return {
    accessToken: undefined,
    gitxios: axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        'Content-Type': 'application/json',
        Authorization: undefined,
        Accept: 'application/vnd.github.squirrel-girl-preview'
      }
    })
  }
}

export const mutations = {
  SET(state, { key, value }) {
    state[key] = value
  },
  SET_GITXIOS_TOKEN(state, token) {
    state.gitxios.defaults.headers.Authorization = `${token}`
  }
}

export const actions = {
  setAccessTokenIfNeeded({ commit, dispatch }) {
    const cookie = VueCookie.get('github_token')
    if (cookie) {
      const parsed = deserialize(cookie);
      dispatch('setAccessToken', `token ${parsed.access_token}`)
    }
  },
  setAccessToken({ commit }, accessToken) {
    commit('SET', {
      key: 'accessToken',
      value: accessToken
    })
    commit('SET_GITXIOS_TOKEN', accessToken)
  },
  clearAccessToken({ commit }) {
    VueCookie.delete('github_token')
    commit('SET_GITXIOS_TOKEN', undefined)
    commit('SET', {
      key: 'accessToken',
      value: undefined
    })
  },
  async gitGetAll({ state }, { user, page }) {
    const config = {
      per_page: getConfig().perPage,
      page: page || 1,
      state: 'all',
      // labels: 'codesher',
      sort: 'updated'
    }
    if (user) {
      config.creator = user
    }

    const response = await state.gitxios.get(`repos/${getConfig().repoOwner}/${getConfig().repoName}/issues?${serialize(config)}`)
    const parsedLink = parse(response.headers.link)

    return {
      result: response.data,
      hasNext: parsedLink && parsedLink.next ? true : false,
      hasPrev: parsedLink && parsedLink.prev ? true : false
    }
  },
  async gitGet({ state }, { number }) {
    const response = await state.gitxios.get(`repos/${getConfig().repoOwner}/${getConfig().repoName}/issues/${number}`)
    return response.data
  },
  async gitAddHeart({ state }, { number }) {
    const response = await state.gitxios.post(`repos/${getConfig().repoOwner}/${getConfig().repoName}/issues/${number}/reactions`, {
      content: 'heart'
    })
    return response.data
  },
  async gitGetComments({ state }, { number }) {
    const config = {
      per_page: 999,
      page: 1
    }
    const response = await state.gitxios.get(`repos/${getConfig().repoOwner}/${getConfig().repoName}/issues/${number}/comments?${serialize(config)}`)
    const parsedLink = parse(response.headers.link)
    return {
      result: response.data,
      hasNext: parsedLink && parsedLink.next ? true : false,
      hasPrev: parsedLink && parsedLink.prev ? true : false
    }
  },
  async gitCreate({ state }, { title, body }) {
    const response = await state.gitxios.post(`repos/${getConfig().repoOwner}/${getConfig().repoName}/issues`, {
      title,
      body
    })
    return response.data
  }
}
