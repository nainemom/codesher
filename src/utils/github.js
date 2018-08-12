import { getConfig } from './index.js'
import axios from "axios";

const gitxios = axios.create({
  baseURL: 'https://api.github.com/repos/codesher-blog/src',
  headers: {
    'Content-Type': 'application/json',
    Authorization: undefined
  }
})

function hasNextPage(response) {
  return response.headers.link && response.headers.link.indexOf('next') > -1
}

export function login({ token_type, access_token }) {
  gitxios.defaults.headers.Authorization = `${token_type} ${access_token}`
  return true
}

export async function getAll({ user, page }) {
  const config = {
    labels: "codesher",
    per_page: getConfig().perPage,
  }
  if (page) {
    config.page = page
  }
  if (user) {
    config.creator = user
  }

  const response = await gitxios.get(`issues`, config)

  return {
    result: response.data,
    hasNext: hasNextPage(response),
    hasPrev: page > 1
  }
}

export async function getComments({ number }) {
  const config = {
    per_page: 999,
  }
  const response = await gitxios.get(`issues/${number}/comments`, config)

  return {
    result: response.data,
    hasNext: hasNextPage(response),
    hasPrev: page > 1
  }
}

export async function get({ number }) {
  const response = await gitxios.get(`issues/${number}`)

  return response.data
}