export interface TreeNode {
  name: string;
  value: string | number;
  children?: TreeNode[];
  _children?: TreeNode[];
  _collapsed?: boolean;
  proportion?: number;
  growth?: number;
  categoryList?: any;
}

export const treeNodeData: TreeNode = {
  name: 'James',
  value: 800,
  proportion: 0.8,
  growth: 0.3,
  categoryList: [
    {
      value: '1',
      label: '111',
      data: [
        {
          name: '222',
          value: 400,
          proportion: 0.34,
          growth: 0.34,
        },
      ],
    },
    {
      value: '2',
      label: '2222',
      data: [
        {
          name: '9999',
          value: 400,
          proportion: 0.34,
          growth: 0.34,
        },
        {
          name: '0000',
          value: 400,
          proportion: 0.34,
          growth: 0.34,
        },
      ],
    },
  ],
};
