export interface Addtag {
  name: string;
  bgColor?: string;
  color?: string;
}

export interface EditTag extends Addtag {
  id?: number | null;
}
