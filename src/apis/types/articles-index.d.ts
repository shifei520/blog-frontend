/** 获取文章列表的参数类型 */
export interface ArticleListGetParams {
  pageNo: number;
  pageSize: number;
  keywords?: string;
  categoryId?: number;
}

/** 添加文章的参数类型 */
export interface ArticleAddParams {
  categoryId: number;
  tagIds: number[];
  abstract: string;
  coverImage?: string;
  content: string;
  title: string;
}

/** 文章标签 */
export interface TagItem {
  id: number;
  name: string;
  bgColor: string;
  color: string;
  createTime: string;
  updateTime: string;
}

/** 单条文章返回值类型 */
export interface ArticleItem {
  id: number;
  title: string;
  abstract: string;
  content: string;
  likesCount: number;
  views: number;
  coverImage: string;
  createTime: string;
  updateTime: string;
  tags: TagItem[];
  category: CategoryItem;
}

/**  文章分类 */
export interface CategoryItem {
  id: number;
  name: string;
  createTime?: string;
  updateTime?: string;
}

/** 文章统计 */
export interface ArticleStatisticsItem {
  yearMonth: string;
  articleCount: number;
}

/** 获取文章搜索列表的参数类型 */
export interface ArticleListSearchParams {
  pageNo: number;
  pageSize: number;
  keyword: string;
}

/** 搜索的单条文章返回值类型 */
export interface ArticleSearchItem {
  id: number;
  title: string;
  abstract: string;
  createTime: string;
}
