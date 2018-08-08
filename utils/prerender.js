export function hasAccess() {
  return !!window.__PRERENDER_INJECTED
}

export function done() {
  return document.dispatchEvent(new Event("render-done"));
}

export function getPostByName(name) {
  return window.__PRERENDER_INJECTED.posts.find(
    post => post.name === name
  )
}

export function getConfig() {
  return window.__PRERENDER_INJECTED.config
}

export function getPostsByCategory() {
  const categoryName = arguments.length >= 2 ? arguments[0] : null
  const categoryValue = arguments.length >= 2 ? arguments[1] : null
  const page = arguments.length >= 3 && arguments[2] ? parseInt(arguments[2]) : 1
  const perPage = window.__PRERENDER_INJECTED.config.perPage
  const startIndex = (page - 1) * perPage;
  const lastIndex = startIndex + perPage - 1;
  const ret = {
    result: [],
    pagination: {
      page,
      perPage,
      nextPage: null,
      prevPage: null,
      totalCount: null
    }
  }

  let filteredPosts = window.__PRERENDER_INJECTED.posts
  if (categoryName && categoryValue) {
    filteredPosts = filteredPosts.filter(
      post => post.data[categoryName].indexOf(categoryValue) > -1
    );
  }
  ret.pagination.totalCount = filteredPosts.length
  ret.result = filteredPosts.filter(
    (post, index) => index >= startIndex && index <= lastIndex
  )

  const baseUrl = categoryName && categoryValue ? `/${categoryName}/${categoryValue}` : '/posts'
  if (lastIndex < ret.pagination.totalCount - 1) {
    ret.pagination.nextPage = `${baseUrl}/page/${page + 1}`
  }
  if (page > 1) {
    ret.pagination.prevPage = page - 1 === 1 ? baseUrl : `${baseUrl}/page/${page - 1}`
  }
  return ret
}
