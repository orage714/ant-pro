const DATA_SOURCE={
    a: [
      {
        conditionName: 'a-1',
        variableId: '1840', // 特征ID
        returnType: 'String', // 特征类型
        conditionDefineName: 'variableCommonPropertyString',
        compareValue: 'asasas', // 比较值
        compartorName: 'strEquals',
        variableDesc: '四代风控集成测试用户ID',
	  },
	  {
        conditionName: 'a-2',
        variableId: '180', // 特征ID
        returnType: 'String', // 特征类型
        conditionDefineName: 'variableCommonPropertyString',
        compareValue: 'asasas', // 比较值
        compartorName: 'strEquals',
        variableDesc: '四代风控集成测试用户ID',
      },
	],
	b: [
		{
		  conditionName: 'b-1',
		  variableId: '140', // 特征ID
		  returnType: 'Number', // 特征类型
		  conditionDefineName: 'variableCommonPropertyString',
		  compareValue: 'asasas', // 比较值
		  compartorName: 'strEquals',
		  variableDesc: '四代风控集成测试用户ID',
		},
	  ],
}

const VARI_CONFIG= [
	{
	"id":  "281021",
	"uniqueId":  "281021",
	"name":  "abcd",
	"desc":  "字符串",
	"returnType":  "String",
	"categoryId":  "21"
	},
	{
		"id":  "281091",
		"uniqueId":  "281091",
		"name":  "adas",
		"desc":  "數字",
		"returnType":  "Number",
		"categoryId":  "22"
		},
	];

const COMPART_CON = { 
	Number: [
		{
			operatorName: 'numberGt',
			operatorDesc: '>'
		}, {
			operatorName: 'numberLt',
			operatorDesc: '<'
		}, {
			operatorName: 'numberGe',
			operatorDesc: '>='
		}, {
			operatorName: 'numberLe',
			operatorDesc: '<='
		}, {
			operatorName: 'numberEquals',
			operatorDesc: '='
		}
	],
	String:[
		{
			operatorName: 'equals',
			operatorDesc: 'equals'
		},
		{
			operatorName: 'notEquals',
			operatorDesc: 'notEquals'
		},
	]

}
	
export { DATA_SOURCE, VARI_CONFIG,COMPART_CON};