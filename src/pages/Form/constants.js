export const option={a:'名1',b:'名2',C:'名3'};

export const data=[{
    id:1,
    uuid:566,
    name:'a',
    type:'类型1',
    srcType:true,
  },{
    id:2,
    name:'b',
    uuid:5660,
    type:'类型2',
    srcType:false,
  }]

export const schema={
    nameSpace:'node',
    properties:{
      name:{
        title:'名字',
        type:'select',
        cascade:{
          cascadeObj:option,
          target:'type',
        },
        options:Object.keys(option).map(key=> ({text:key, value:key}))
      },
      type:{
        title:'类型',
        defaultValue:' ',
      },
      srcType:{
        title:'是否主类型',
        type:'checkbox',
      },
    },
    required:['name','type','srcType'],
    disabled:['type'],
    unique:['name','type'],
    hiddenArr:['id','uuid']
  }

