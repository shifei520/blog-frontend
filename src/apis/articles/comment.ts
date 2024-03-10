import request from '@/utils/request';
import type { NormalResponse, PageResponse } from '../types/common';
import type { CommentItem, CommentListGetParams, PublishComment } from '../types/article-comment';

/** 发表评论 */
export const publishComment = (data: PublishComment): Promise<NormalResponse> => {
  return request({
    url: '/v1/comment',
    method: 'POST',
    data,
    headers: {
      requireToken: true,
    },
  });
};

/** 根据文章id分页获取评论列表 */
export const commentListGet = (
  params: CommentListGetParams,
): Promise<PageResponse<CommentItem>> => {
  return request({
    url: '/v1/comment/list',
    method: 'GET',
    params,
  });
};

/** 文章点赞和取消点赞 */
export const likeAndUnlike = (articleId: number): Promise<NormalResponse> => {
  return request({
    url: '/v1/article/like',
    method: 'GET',
    params: {
      articleId,
    },
    headers: {
      requireToken: true,
    },
  });
};
