export interface MenuItem {
  id: number;
  name: string;
  parentId: number | null;
  icon?: string;
  children?: MenuItem[];
}

export interface TagParamsGet {
  pageNo: number;
  pageSize: number;
  name?: string;
}

export interface TagItem {
  id: number;
  name: string;
  updateTime: string;
  createTime: string;
}

export interface ProjectAddparams {
  name: string;
  description: string;
  categoryId: null | number;
  tagIds: null | number[];
  remark: string;
  projecUrl: string;
  email: string;
}

export interface ProjectParamsGet {
  pageNo: number;
  pageSize: number;
  name: string;
  description: string;
  categoryId: null | number;
  tagIds: null | number[];
}

export interface ProjectItem {
  id: number;
  name: string;
  description: string;
  projecUrl: string;
  coverImage: string;
  createTime: string;
  updateTime: string;
  category: MenuItem | null;
  tags: TagItem[];
}
