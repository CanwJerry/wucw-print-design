// 基础控件
export const basicsList = [
  {
    type: 'text',
    label: '文字',
    icon: 'icon-??',
    fields: '',
    value: '',
    key: '',
    options: {
      textAlign: 'left',
      hidden: false, // 是否隐藏，false显示，true隐藏
      color: '#000',
      fontFamily: 'SimHei',
      fontSize: 16,
      fontWeight: 'normal',
      letterSpacing: 0,
      marginTop: '',
      marginRight: '',
      marginBottom: '',
      marginLeft: '',
    },
  },
  {
    type: 'button',
    label: '按钮',
    icon: 'icon-??',
    key: '',
    options: {
      type: 'primary',
      size: 'default',
      hidden: false, // 是否隐藏，false显示，true隐藏
      dynamicFun: '',
      marginTop: '',
      marginRight: '',
      marginBottom: '',
      marginLeft: '',
    },
  },
  {
    type: "batchTable",
    label: "动态表格",
    icon: "icon-??",
    fields: '',
    headList: [],
    tableData: [],
    key: "",
    options: {
      showLabel: false,
      showSequence: false,
      marginTop: '',
      marginRight: '',
      marginBottom: '',
      marginLeft: '',
    },
  }  
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
      showLabel: false,
      marginTop: '',
      marginRight: '',
      marginBottom: '',
      marginLeft: '',
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
      gutter: 0,
      showLabel: false,
      marginTop: '',
      marginRight: '',
      marginBottom: '',
      marginLeft: '',
    },
    key: "",
    model: ""
  },
];