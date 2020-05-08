/*eslint-disable */
export default {
  regularDetail: [
    // 商户基本信息
    {
      children: [
        {
          children: [],
          id: 2,
          parent: {
            $ref: '$.children[0]',
          },
          value: {
            content: '第一家商户',
            extDatas: {},
            extParam: {},
            keyDesc: '商户名称',
            keyName: 'mName',
            level: 101,
            showType: 'basic',
            valueType: 'string',
          },
        },
        {
          children: [],
          id: 9,
          parent: {
            $ref: '$.children[0]',
          },
          value: {
            content: '对应的MID编号',
            extDatas: {},
            extParam: {},
            keyDesc: '商户编号',
            keyName: 'mNum',
            level: 102,
            showType: 'basic',
            valueType: 'string',
          },
        },
        {
          children: [],
          id: 9,
          parent: {
            $ref: '$.children[0]',
          },
          value: {
            content: '生活百货-小超市',
            extDatas: {},
            extParam: {},
            keyDesc: 'MCC分类',
            keyName: 'mNum',
            level: 102,
            showType: 'basic',
            valueType: 'string',
          },
        },
        {
          children: [],
          id: 9,
          parent: {
            $ref: '$.children[0]',
          },
          value: {
            content: '上海市，普陀区哈哈哈哈 哈哈哈',
            extDatas: {},
            extParam: {},
            keyDesc: '地址',
            keyName: 'mNum',
            level: 102,
            showType: 'basic',
            valueType: 'string',
          },
        },
        {
          children: [],
          id: 9,
          parent: {
            $ref: '$.children[0]',
          },
          value: {
            content: 1213213213213,
            extDatas: {},
            extParam: {},
            keyDesc: '商户签约时间',
            keyName: 'mNum',
            level: 102,
            showType: 'basic',
            valueType: 'datetime',
          },
        },
        {
          children: [],
          id: 9,
          parent: {
            $ref: '$.children[0]',
          },
          value: {
            content: 'www.baidu.com',
            extDatas: {},
            extParam: {},
            keyDesc: '商户签约网站',
            keyName: 'mNum',
            level: 102,
            showType: 'basic',
            valueType: 'string',
          },
        },
      ],
      id: 1,
      parent: {
        $ref: '$',
      },
      value: {
        content: '',
        extDatas: {},
        extParam: {},
        keyDesc: '商户基本信息',
        keyName: 'mBaseInfo',
        icon: 'plus',
        level: 100,
        showType: 'noEditable',
        valueType: 'string',
      },
    },
    // 身份认证信息
    {
      children: [
        {
          children: [],
          id: 2,
          parent: {
            $ref: '$.children[0]',
          },
          value: {
            content: '310000000000000000',
            extDatas: {},
            extParam: {},
            keyDesc: '法人身份证号码',
            keyName: 'mName',
            level: 101,
            showType: 'basic',
            valueType: 'string',
          },
        },
        {
          children: [],
          id: 2,
          parent: {
            $ref: '$.children[0]',
          },
          value: {
            content: ' 310000000000000000',
            extDatas: {},
            extParam: {},
            keyDesc: '营业执照号/开户许可证号',
            keyName: 'mName',
            level: 101,
            showType: 'basic',
            valueType: 'string',
          },
        },
        {
          children: [],
          id: 2,
          parent: {
            $ref: '$.children[0]',
          },
          value: {
            content: '310000000000000000',
            extDatas: {},
            extParam: {},
            keyDesc: '法人身份证原始图',
            keyName: 'mName',
            level: 101,
            showType: 'basic',
            valueType: 'img',
          },
        },
        {
          children: [
            {
              children: [],
              id: 2,
              parent: {
                $ref: '$.children[0]',
              },
              value: {
                content: 132132132132,
                extDatas: {},
                extParam: {},
                keyDesc: '申请时间',
                keyName: 'mName',
                level: 101,
                showType: 'basic',
                valueType: 'datetime',
              },
            },
            {
              children: [],
              id: 9,
              parent: {
                $ref: '$.children[0]',
              },
              value: {
                content: 'success',
                extDatas: {},
                extParam: {},
                keyDesc: '操作',
                keyName: 'mNum',
                level: 102,
                showType: 'basic',
                valueType: 'enum',
                extParam: {
                  annexCategory: {
                    enums: [
                      { value: { success: '成功', err: '失败' }, desc: '操作' },
                      { value: 'other', desc: '其他来源' },
                    ],
                  },
                },
              },
            },
          ],
          id: 2,
          parent: {
            $ref: '$.children[0]',
          },
          value: {
            // "content": " 310000000000000000",
            extDatas: {},
            extParam: {},
            keyDesc: '打款认证信息',
            keyName: 'mName',
            level: 101,
            showType: 'list',
            valueType: 'string',
          },
        },
      ],

      id: 1,
      parent: {
        $ref: '$',
      },
      value: {
        content: '',
        extDatas: {},
        extParam: {},
        keyDesc: '身份认证信息',
        icon: 'plus',
        keyName: 'mZhunruInfo',
        level: 300,
        showType: 'noEditable',
        valueType: 'string',
      },
    },
    // 商户准入信息 ---
    {
      children: [
        // 附件信息
        {
          children: [],
          id: 6,
          parent: {
            $ref: '$.children[1]',
          },
          value: {
            content: [
              {
                annexName: 'url / xxx.jpg',
                annexCategory: 'other',
                annexAddTime: 232414133132243,
                annexLastModifyTime: 341344355322222222,
              },
              {
                annexName: 'url / xxx.jpg',
                annexCategory: 'other',
                annexAddTime: 232414133132243,
                annexLastModifyTime: 341344355322222222,
              },
              {
                annexName: 'url / xxx.jpg',
                annexCategory: 'other',
                annexAddTime: 232414133132243,
                annexLastModifyTime: 341344355322222222,
              },
            ],
            extDatas: {
              schema: [
                { name: 'annexName', desc: '附件名称', valueType: 'img' },
                { name: 'annexCategory', desc: '类目', valueType: 'enum' },
                { name: 'annexAddTime', desc: '添加时间', valueType: 'datetime' },
                { name: 'annexLastModifyTime', desc: '最后修改时间', valueType: 'datetime' },
              ],
            },
            extParam: {
              annexCategory: {
                enums: [
                  { value: { other: '网站截图' }, desc: '类目' },
                  { value: '', desc: '其他来源' },
                ],
              },
            },
            keyDesc: '附件信息',
            keyName: 'mFujian',
            level: 301,
            showType: 'table',
            liType: 'dot',
            valueType: 'jsonArr',
          },
        },
        // icp 备案
        {
          children: [],
          id: 6,
          parent: {
            $ref: '$.children[1]',
          },
          value: {
            content: [
              {
                address: 'www.baidu.com',
                name: '蚂蚁金服',
                beianhao: 2332243,
                interName: '蚂蚁金服',
              },
              {
                address: 'www.baidu.com',
                name: '蚂蚁金服',
                beianhao: 2332243,
                interName: '蚂蚁金服',
              },
              {
                address: 'www.baidu.com',
                name: '蚂蚁金服',
                beianhao: 2332243,
                interName: '蚂蚁金服',
              },
            ],
            extDatas: {
              schema: [
                { name: 'address', desc: '网站地址', valueType: 'string' },
                { name: 'name', desc: '主办单位名称', valueType: 'string' },
                { name: 'beianhao', desc: '网站备案号', valueType: 'string' },
                { name: 'interName', desc: '网站名称', valueType: 'string' },
              ],
            },
            extParam: {
              annexCategory: {
                enums: [
                  { value: { other: '网站截图' }, desc: '类目' },
                  { value: '', desc: '其他来源' },
                ],
              },
            },
            keyDesc: 'ICP备案信息',
            keyName: 'mFujian',
            level: 301,
            showType: 'table',
            liType: 'dot',
            valueType: 'jsonArr',
          },
        },
        // 企业工商信息
        {
          children: [
            {
              children: [],
              id: 9,
              parent: {
                $ref: '$.children[0]',
              },
              value: {
                content: '企业名称',
                extDatas: {},
                extParam: {},
                keyDesc: '企业名称',
                keyName: 'mNum',
                level: 102,
                showType: 'basic',
                valueType: 'string',
              },
            },
            {
              children: [],
              id: 9,
              parent: {
                $ref: '$.children[0]',
              },
              value: {
                content: '11122-小超市',
                extDatas: {},
                extParam: {},
                keyDesc: '注册号',
                keyName: 'mNum',
                level: 102,
                showType: 'basic',
                valueType: 'string',
              },
            },
            {
              children: [],
              id: 9,
              parent: {
                $ref: '$.children[0]',
              },
              value: {
                content: '256654',
                extDatas: {},
                extParam: {},
                keyDesc: '注册资本（万元）',
                keyName: 'mNum',
                level: 102,
                showType: 'basic',
                valueType: 'string',
              },
            },
            {
              children: [],
              id: 9,
              parent: {
                $ref: '$.children[0]',
              },
              value: {
                content: 'a',
                extDatas: {},
                extParam: {},
                keyDesc: '币种',
                keyName: 'mNum',
                level: 102,
                showType: 'basic',
                valueType: 'enum',
                extParam: {
                  annexCategory: {
                    enums: [{ value: { a: '人民币', b: '美元' }, desc: '币种' }],
                  },
                },
              },
            },
            {
              children: [],
              id: 9,
              parent: {
                $ref: '$.children[0]',
              },
              value: {
                content: 'a',
                extDatas: {},
                extParam: {},
                keyDesc: '企业（机构）类型',
                keyName: 'mNum',
                level: 102,
                showType: 'basic',
                valueType: 'enum',
                extParam: {
                  annexCategory: {
                    enums: [{ value: { a: '有限公司', b: '金融机构' }, desc: '企业（机构）类型' }],
                  },
                },
              },
            },
            {
              children: [],
              id: 9,
              parent: {
                $ref: '$.children[0]',
              },
              value: {
                content: 12345675678,
                extDatas: {},
                extParam: {},
                keyDesc: '开业日期',
                keyName: 'mNum',
                level: 102,
                showType: 'basic',
                valueType: 'data',
              },
            },
            {
              children: [],
              id: 9,
              parent: {
                $ref: '$.children[0]',
              },
              value: {
                content: '杭州市西湖区',
                extDatas: {},
                extParam: {},
                keyDesc: '地址',
                keyName: 'mNum',
                level: 102,
                showType: 'basic',
                valueType: 'string',
              },
            },
          ],
          id: 1,
          parent: {
            $ref: '$',
          },
          value: {
            content: '',
            extDatas: {},
            extParam: {},
            keyDesc: '企业工商信息',
            liType: 'dot',
            keyName: 'mBaseInfo',
            icon: 'icon-jibenxinxi',
            level: 100,
            showType: 'noEditable',
            valueType: 'string',
          },
        },
      ],
      id: 1,
      parent: {
        $ref: '$',
      },
      value: {
        content: '',
        extDatas: {},
        extParam: {},
        keyDesc: '商户准入信息',
        icon: 'plus',
        keyName: 'mZhunruInfo',
        level: 300,
        showType: 'noEditable',
        valueType: 'string',
      },
    },
    // 风险交易信息
    {
      children: [
        // 风险稽查信息
        {
          children: [],
          id: 6,
          parent: {
            $ref: '$.children[1]',
          },
          value: {
            content: [
              {
                type: 'a',
                jueCeName: '商户赌博-交易拦截-生成任务',
                ceLuoName: '商户赌博-交易拦截-生成任务',
                jichaTime: 341344355322222222,
                description: '规则备注',
                dingxin: '结案定性',
              },
            ],
            extDatas: {
              schema: [
                { name: 'type', desc: '任务类型', valueType: 'enum' },
                { name: 'jueCeName', desc: '决策名称', valueType: 'string' },
                { name: 'ceLuoName', desc: '策略名称', valueType: 'string' },
                { name: 'jichaTime', desc: '稽查时间', valueType: 'datetime' },
                { name: 'description', desc: '规则备注', valueType: 'string' },
                { name: 'dingxin', desc: '结案定性', valueType: 'string' },
              ],
            },
            extParam: {
              annexCategory: {
                enums: [
                  { value: { a: '商户赌博' }, desc: '任务类型' },
                  { value: '', desc: '其他来源' },
                ],
              },
            },
            keyDesc: '风险稽查信息',
            keyName: 'mFujian',
            level: 301,
            showType: 'table',
            liType: 'dot',
            valueType: 'jsonArr',
          },
        },
        // 投诉处理信息
        {
          children: [
            {
              children: [],
              id: 9,
              parent: {
                $ref: '$.children[0]',
              },
              value: {
                content: 123355764765,
                extDatas: {},
                extParam: {},
                keyDesc: '投诉时间',
                keyName: 'mNum',
                level: 102,
                showType: 'basic',
                valueType: 'datatime',
              },
            },
            {
              children: [],
              id: 9,
              parent: {
                $ref: '$.children[0]',
              },
              value: {
                content: 'a',
                extDatas: {},
                extParam: {},
                keyDesc: '投诉场景',
                keyName: 'mNum',
                level: 102,
                showType: 'basic',
                valueType: 'enum',
                extParam: {
                  annexCategory: {
                    enums: [
                      { value: { a: '账单入口' }, desc: '投诉场景' },
                      { value: '', desc: '其他来源' },
                    ],
                  },
                },
              },
            },
            {
              children: [],
              id: 6,
              parent: {
                $ref: '$.children[1]',
              },
              value: {
                content: [
                  {
                    status: 'a',
                    money: '-交易金额',
                    ceLuoName: '商户赌博-交易拦截-生成任务',
                    jichaTime: 341344355322222222,
                    description: '规则备注',
                    dingxin: '结案定性',
                    jiaoyiType: 'a',
                  },
                ],
                extDatas: {
                  schema: [
                    { name: 'status', desc: '状态', valueType: 'enum' },
                    { name: 'money', desc: '交易金额', valueType: 'string' },
                    { name: 'ceLuoName', desc: '策略名称', valueType: 'string' },
                    { name: 'jichaTime', desc: '稽查时间', valueType: 'datetime' },
                    { name: 'description', desc: '规则备注', valueType: 'string' },
                    { name: 'dingxin', desc: '结案定性', valueType: 'string' },
                    { name: 'jiaoyiType', desc: '交易类型', valueType: 'enum' },
                  ],
                },
                extParam: {
                  annexCategory: {
                    enums: [
                      { value: { a: '交易成功', b: '交易失败' }, desc: '状态' },
                      { value: { a: '及时到账' }, desc: '交易类型' },
                    ],
                  },
                },
                keyDesc: '交易明细',
                keyName: 'mFujian',
                level: 301,
                showType: 'table',
                valueType: 'jsonArr',
              },
            },
          ],
          id: 6,
          parent: {
            $ref: '$.children[1]',
          },
          value: {
            keyDesc: '投诉处理信息',
            keyName: 'mFujian',
            level: 301,
            showType: 'noEditable',
            liType: 'dot',
          },
        },
      ],
      id: 1,
      parent: {
        $ref: '$',
      },
      value: {
        content: '',
        extDatas: {},
        extParam: {},
        keyDesc: '风险交易信息',
        icon: 'plus',
        keyName: 'mZhunruInfo',
        level: 300,
        showType: 'noEditable',
        valueType: 'string',
      },
    },
    // 商户风险管理信息
    {
      children: [
        // 商户管控记录
        {
          children: [],
          id: 6,
          parent: {
            $ref: '$.children[1]',
          },
          value: {
            content: [
              {
                type: 'a',
                jueCeName: '商户赌博-交易拦截-生成任务',
                ceLuoName: '商户赌博-交易拦截-生成任务',
                jichaTime: 341344355322222222,
                description: '规则备注',
                dingxin: '结案定性',
              },
            ],
            extDatas: {
              schema: [
                { name: 'type', desc: '任务类型', valueType: 'enum' },
                { name: 'jueCeName', desc: '决策名称', valueType: 'string' },
                { name: 'ceLuoName', desc: '策略名称', valueType: 'string' },
                { name: 'jichaTime', desc: '稽查时间', valueType: 'datetime' },
                { name: 'description', desc: '规则备注', valueType: 'string' },
                { name: 'dingxin', desc: '结案定性', valueType: 'string' },
              ],
            },
            extParam: {
              annexCategory: {
                enums: [
                  { value: { a: '商户赌博' }, desc: '任务类型' },
                  { value: '', desc: '其他来源' },
                ],
              },
            },
            keyDesc: '商户管控记录',
            keyName: 'mFujian',
            level: 301,
            showType: 'table',
            liType: 'dot',
            valueType: 'jsonArr',
          },
        },

        // 商户巡检记录
        {
          children: [
            // 微客巡检记录
            {
              children: [],
              id: 11,
              parent: {
                $ref: '$.children[2]',
              },
              value: {
                content: [
                  {
                    aid: 456789,
                    taskDrawTime: 123453431432,
                    taskCompleteTime: 321413423432,
                    businessHours: 32441324123,
                    storeAddress: 'XXXXXX',
                    contactPhone: '137xxxxxxxx',
                    taskExtInfo: 'jnjnjo', //_________________________
                    answers: {
                      isMerchantExist: true,
                      merchantExistPicture: ['urlxxx.jpg', 'url/xxx1.jpg'],
                    },
                  },
                  {
                    aid: 567890,
                    taskDrawTime: 23445246545,
                    taskCompleteTime: 543254534234,
                    businessHours: 4523531314324,
                    storeAddress: 'XXXXXX1',
                    contactPhone: '137xxxxxxxx',
                    taskExtInfo: '',
                    answers: {
                      isMerchantExist: false,
                      merchantExistPicture: ['url / xxx.jpg', 'url / xxx1.jpg'],
                    },
                  },
                ],
                extDatas: {
                  schema: [
                    {
                      name: 'taskDrawTime',
                      desc: '任务领取时间',
                      dataType: 'date',
                      showType: 'basic',
                    },
                    {
                      name: 'taskCompleteTime',
                      desc: '任务完成时间',
                      dataType: 'date',
                      showType: 'basic',
                    },
                    {
                      name: 'businessHours',
                      desc: '营业时间',
                      dataType: 'date',
                      showType: 'basic',
                    },
                    {
                      name: 'storeAddress',
                      desc: '店铺地址',
                      dataType: 'string',
                      showType: 'basic',
                    },
                    {
                      name: 'contactPhone',
                      desc: '联系方式',
                      dataType: 'string',
                      showType: 'basic',
                    },
                    {
                      name: 'taskExtInfo',
                      desc: '任务扩展信息',
                      dataType: 'jsonObject',
                      showType: 'basic',
                    },
                    {
                      name: 'answers',
                      desc: '答题结果',
                      dataType: 'jsonObject',
                      showType: 'noEditable',
                      children: [
                        {
                          name: 'isMerchantExist',
                          desc: '商家是否存在',
                          dataType: 'boolean',
                          showType: 'block',
                        },
                        {
                          name: 'merchantExistPicture',
                          desc: '商家是否存在的图片举证',
                          dataType: 'jsonArr',
                          showType: 'block',
                        },
                      ],
                    },
                  ],
                },
                extParam: {},
                keyDesc: '微客巡检记录',
                keyName: 'mWeikeXunjian',
                level: 601,
                showType: 'collapse',
                valueType: 'jsonArr',
              },
            },

            // 问卷巡检记录————————————————————————————————————————————
            {
              children: [],
              id: 11,
              parent: {
                $ref: '$.children[2]',
              },
              value: {
                content: [
                  {
                    taskDrawTime: 123453431432,
                    taskCompleteTime: 321413423432,
                    answers: {
                      isMerchantExist: true,
                      merchantExistPicture: ['urlxxx.jpg', 'url/xxx1.jpg'],
                    },
                  },
                ],
                extDatas: {
                  schema: [
                    {
                      name: 'taskDrawTime',
                      desc: '问卷开始时间',
                      showType: 'basic',
                      dataType: 'datetime',
                    },
                    {
                      name: 'taskCompleteTime',
                      desc: '问卷完成时间',
                      showType: 'basic',
                      dataType: 'datetime',
                    },
                    {
                      name: 'answers',
                      desc: '问卷问题',
                      dataType: 'jsonObject',
                      showType: 'noEditable',
                      children: [
                        {
                          name: 'isMerchantExist',
                          desc: '商家是否存在',
                          dataType: 'boolean',
                          showType: 'block',
                        },
                        {
                          name: 'merchantExistPicture',
                          desc: '商家是否存在的图片举证',
                          dataType: 'jsonArr',
                          showType: 'block',
                        },
                      ],
                    },
                  ],
                },
                extParam: {},
                keyDesc: '问卷巡检记录',
                keyName: 'mWeikeXunjian',
                level: 601,
                showType: 'collapse',
                valueType: 'jsonArr',
              },
            },
          ],
          id: 6,
          parent: {
            $ref: '$.children[1]',
          },
          value: {
            content: '',
            keyDesc: '商户巡检记录',
            keyName: 'mFujian',
            level: 301,
            showType: 'noEditable',
            liType: 'dot',
          },
        },

        // 商户风险评级
        {
          children: [
            {
              children: [],
              id: 2,
              parent: {
                $ref: '$.children[0]',
              },
              value: {
                content: 4,
                extDatas: {},
                extParam: {},
                keyDesc: '商户风险等级',
                keyName: 'mName',
                level: 101,
                showType: 'basic',
                valueType: 'string',
              },
            },
            {
              children: [],
              id: 9,
              parent: {
                $ref: '$.children[0]',
              },
              value: {
                content: '商户风险等级描述',
                extDatas: {},
                extParam: {},
                keyDesc: '商户风险等级描述',
                keyName: 'mNum',
                level: 102,
                showType: 'basic',
                valueType: 'string',
              },
            },
          ],

          id: 6,
          parent: {
            $ref: '$.children[1]',
          },
          value: {
            content: '',
            keyDesc: '商户风险评级',
            showType: 'noEditable',
            liType: 'dot',
            valueType: 'jsonArr',
          },
        },
      ],
      id: 10,
      parent: {
        $ref: '$',
      },
      value: {
        content: '',
        extDatas: {},
        extParam: {},
        keyDesc: '商户风险管理信息',
        keyName: 'mXunjianInfo',
        icon: 'plus',
        level: 600,
        showType: 'noEditable',
        valueType: 'string',
      },
    },
  ],
  id: 0,
};
