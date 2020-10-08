import {request} from '@/plugins/request';

// 获取公共文章列表
export const getArticles = (data) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params: data,
  });
};

export const getYourFeedArticles = (data) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params: data,
  });
};

// 获取tags
export const getTags = (data) => {
  return request({
    method: 'GET',
    url: '/api/tags',
    params: data,
  });
};

// 添加点赞
export const addFavorite = (slug) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  });
};

// 取消点赞
export const deleteFavorite = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  });
};

// 获取文章详情
export const getArticle = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  });
};

// 获取文章评论
export const getComments = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  });
};
//Add Comments to an Article
// "comment": {
//   "body": "His name was my name too."
// }
export const submitComments = ({slug, comment}) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data: {comment},
  });
};
