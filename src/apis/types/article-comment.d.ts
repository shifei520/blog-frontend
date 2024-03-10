/** 发布评论参数 */
interface PublishComment {
  articleId: number;
  content: string;
}

/** 获取评论列表的参数类型 */
export interface CommentListGetParams {
  pageNo: number;
  pageSize: number;
  articleId: number;
}

/** 单条评论类型 */
export interface CommentItem {
  id: number;
  content: string;
  createTime: string;
  userId: number;
  username: string;
}
