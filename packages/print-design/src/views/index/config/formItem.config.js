// 基础控件
export const basicsList = [
  {
    type: 'text',
    label: '文字',
    icon: 'icon-??',
    options: {
      textAlign: 'left',
      hidden: false, // 是否隐藏，false显示，true隐藏
      color: '#000',
      fontFamily: 'SimHei',
      fontSize: 16,
    },
    key: '',
  },
];

// 布局控件
export const layoutList = [
  {
    type: 'table',
    label: '表格布局',
    icon: 'icon-??',
    trs: [
      {
        tds: [
          {
            colspan: 1,
            rowspan: 1,
            list: [],
          },
          {
            colspan: 1,
            rowspan: 1,
            list: [],
          },
        ],
      },
      {
        tds: [
          {
            colspan: 1,
            rowspan: 1,
            list: [],
          },
          {
            colspan: 1,
            rowspan: 1,
            list: [],
          },
        ],
      },
    ],
    options: {
      width: '100%',
      bordered: true,
      bright: false,
      small: true,
      customStyle: '',
    },
    key: '',
    model: '',
  },
  {
    type: "grid",
    label: "栅格布局",
    icon: "icon-??",
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0
    },
    key: "",
    model: ""
  },
];