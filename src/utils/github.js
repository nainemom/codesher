import { getConfig } from './index.js'
import Octokit from "@octokit/rest";

const octokit = new Octokit();

export async function login({ username, password }) {
  const config = {
    type: 'basic',
    username,
    password
  }
  const response = await octokit.authenticate(config)
  return response
}

export async function getAll({ user, page }) {
  const config = {
    owner: "codesher-blog",
    repo: "src",
    labels: "codesher",
    per_page: getConfig().perPage,
  }
  if (page) {
    config.page = page
  }
  if (user) {
    config.creator = user
  }
  const response = await octokit.issues.getForRepo(config  /*, milestone, state, assignee, creator, mentioned, labels, sort, direction, since, per_page, page*/)
  return {
    result: response.data,
    hasNext: octokit.hasNextPage(response) ? true : false,
    hasPrev: page > 1
  }
}

export async function getComments({ number }) {
  const page = 1
  const config = {
    owner: "codesher-blog",
    repo: "src",
    per_page: 100,
    page,
    number
  }
  const response = await octokit.issues.getComments(config)
  return {
    result: response.data,
    hasNext: octokit.hasNextPage(response) ? true : false,
    hasPrev: page > 1
  }
}

export async function get({ number }) {
  const response = await octokit.issues.get({
    owner: "codesher-blog",
    repo: "src",
    number
  })
  console.log(response.data)
  return response.data
}