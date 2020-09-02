import Message from 'element-ui'
const plugin = {
  /************************************
   *str:url地址
   ***********************************/
  openUrl: (str) => {
    window.open(str)
  },
  /************************************
   *data:需要处理的时间戳数据
   *type:type=>Date
   *return:yyyy-MM-dd
   ***********************************/
  getTime: (date) => {
    if (date && !new Date(date)) {
      throw new TypeError('The correct format was not obtained for function "getTime"')
    }
    let nowDate = date ? new Date(date) : new Date()
    const year = nowDate.getFullYear()
    const month = nowDate.getMonth() + 1
    const data = nowDate.getDate()
    return [year, month.toString()[1] ? month : '0' + month, data.toString()[1] ? data : '0' + data].join('-')
  },
  /************************************
   *data:需要深度克隆的数据
   *type:all
   *return:data
   ***********************************/
  cloneData: (data) => {
    let _this = plugin
    let type = _this.getDataType(data)
    let newData = null
    if (type === 'Array') {
      newData = []
      data.forEach((item, index) => {
        newData[index] = _this.cloneData(item)
      })
    } else if (type === 'Object') {
      newData = {}
      for (let index in data) {
        let item = data[index]
        newData[index] = _this.cloneData(item)
      }
    } else {
      newData = data ? JSON.parse(JSON.stringify(data)) : data
    }
    return newData
  },
  /************************************
   *data:需要判断类型的数据
   *type:all
   *return:String|Number|Null|Undefined|Object|Array|Function
   ***********************************/
  getDataType: (data) => {
    if (data === null) {
      return 'Null'
    } else if (data === undefined) {
      return 'Undefined'
    }
    return Object.prototype.toString.call(data).split(' ')[1].split(']')[0]
  },
  /************************************
   *data:需要扁平化的数据
   *type:Object|Array
   *return:Array|Object
   ***********************************/
  flatten: (data) => {
    let _this = plugin
    let oldData = _this.cloneData(data)
    let type = _this.getDataType(oldData)
    if (type === 'Object') {
      for (let index in oldData) {
        let item = oldData[index]
        let itemType = _this.getDataType(item)
        if (itemType === 'Object') {
          let deleteProp = _this.cloneData(item) // 保存一份需要处理的数据
          delete oldData[index]
          for (let hasKey in oldData) {
            if (deleteProp.hasOwnProperty(hasKey)) {
              throw new TypeError('存在相同的key值，无法执行')
            }
          }
          return _this.flatten({ ...oldData, ...deleteProp })
        } else if (itemType === 'Array') {
          let newData = []
          let deleteProp = _this.cloneData(item) // 保存一份需要处理的数据
          delete oldData[index]
          if (deleteProp.length < 1) {
            newData.push({ ...oldData })
          } else {
            deleteProp.forEach(itemDel => {
              newData.push({ ...oldData, [index]: itemDel })
            })
          }
          return _this.flatten(newData)
        }
      }
      return oldData
    } else if (type === 'Array') {
      for (let index in oldData) {
        let item = oldData[index]
        let itemType = _this.getDataType(item)
        if (itemType === 'Object') {
          oldData[index] = _this.flatten(item)
        } else if (itemType === 'Array') {
          let newArr = []
          oldData.forEach(itemOld => {
            newArr.push(...itemOld)
          })
          return _this.flatten(newArr)
        }
      }
      return oldData
    } else {
      return oldData
    }
  },

  /************************************
   *data:需要合并的数据
   *rule:合并规则
   *type:Array
   *return:Array
   ***********************************/

  /************************************
   *rule示例
   *{mainRule:'product_id/id',otherRule:[{name:'image/img'},{name:'product_code'},{name:'number',type:'add'}],childrenName:'other_info',childrenRule:{mainRule:['size/size_name','color']}}
   *输出：[
     {
       id:value,
       img:value,
       product_code:value,
       number:value(add),
       other_info:[{
         size_name:value,
         color:value,
         childrenMergeInfo:[{},{}]
       }]
     }
   ]
   *rule参数说明
   *mainRule:主要合并项（根据该项进行合并），当主要合并项为多个是可以为数组；格式：['size','color'] 。“/”在需要改变其key值时添加，“/”前为处理数据中的key,“/”后为处理后输出数据你为其命名的key
   *otherRule:其他处理项，name为处理项的key值,type为特殊处理，当前取值仅可为'add'，是在合并时累加该项，当type不存在时  name项会保留在mainRule同一个数据层级，“/”用法参考mainRule
   *childrenName:命名子合并项key值，默认值childrenMergeInfo，
   *childrenRule:多层级合并时传入，具体规则参考上方
   ***********************************/
  mergeData: (datas, rule) => {
    let _this = plugin
    let data = _this.cloneData(datas)
    let newData = []
    if (_this.getDataType(data) === 'Array') {
      data.forEach(item => {
        let ruleType = _this.getDataType(rule.mainRule)
        let flag = newData.find(value => {
          if (ruleType === 'Array') { // 处理根据多个key合并的情况
            let itemStr = []
            let valueStr = []
            rule.mainRule.forEach(itemMain => {
              let mainName = itemMain.split('/')
              itemStr.push(item[mainName[0]])
              valueStr.push(value[mainName[1] || mainName[0]])
            })
            return itemStr.join('/') === valueStr.join('/')
          } else if (ruleType === 'String') {
            let mainName = rule.mainRule.split('/')
            return value[mainName[1] || mainName[0]] === item[mainName[0]]
          }
        })
        let cloneItem = _this.cloneData(item) // clone其他项数据以方便保留
        if (!flag) {
          let obj = {}
          if (ruleType === 'Array') {
            rule.mainRule.forEach(itemRule => {
              let mainName = itemRule.split('/')
              obj[mainName[1] || mainName[0]] = item[mainName[0]]
              delete cloneItem[mainName[0]]
            })
          } else if (ruleType === 'String') {
            let mainName = rule.mainRule.split('/')
            obj[mainName[1] || mainName[0]] = item[mainName[0]]
            delete cloneItem[mainName[0]]
          }
          if (_this.getDataType(rule.otherRule) === 'Array' && rule.otherRule.length > 0) {
            rule.otherRule.forEach(itemRule => {
              let otherName = itemRule.name.split('/')
              obj[otherName[1] || otherName[0]] = item[otherName[0]]
              delete cloneItem[otherName[0]]
            })
          }
          if (rule.childrenName) {
            obj[rule.childrenName] = [cloneItem]
          } else {
            obj.childrenMergeInfo = [cloneItem]
          }
          newData.push(obj)
        } else {
          if (ruleType === 'Array') {
            rule.mainRule.forEach(itemMain => {
              let mainName = itemMain.split('/')
              delete cloneItem[mainName[0]]
            })
          } else if (ruleType === 'String') {
            let mainName = rule.mainRule.split('/')
            delete cloneItem[mainName[0]]
          }
          if (_this.getDataType(rule.otherRule) === 'Array' && rule.otherRule.length > 0) {
            rule.otherRule.forEach(itemRule => {
              let otherName = itemRule.name.split('/')
              delete cloneItem[otherName[0]]
              if (itemRule.type === 'add') {
                flag[otherName[1] || otherName[0]] = (Number(flag[otherName[1] || otherName[0]]) || 0) + (Number(item[otherName[0]]) || 0)
              } else if (itemRule.type === 'concat') {
                flag[otherName[1] || otherName[0]] = flag[otherName[1] || otherName[0]].concat(item[otherName[0]])
              }
            })
          }
          if (rule.childrenName) {
            flag[rule.childrenName].push(cloneItem)
          } else {
            flag.childrenMergeInfo.push(cloneItem)
          }
        }
      })
      if (rule.childrenRule) {
        newData.forEach(item => {
          item[rule.childrenName || 'childrenMergeInfo'] = _this.mergeData(item[rule.childrenName || 'childrenMergeInfo'], rule.childrenRule)
        })
      }
    } else {
      let type = _this.getDataType(data)
      throw new TypeError('An unknown error occurred from the mergeData function, and the parameter "data" expects to get an "array" but gets an "' + type + '"')
    }
    return newData
  },
  /************************************
   *data:需要处理的数据
   *type:Number|String
   *return:Number
   ***********************************/
  toFixedAuto: (number) => {
    if (isNaN(Number(number))) {
      return NaN
    }
    if (!Number(number) && Number(number) !== 0) {
      throw new TypeError('Expect to get a number')
    }
    if (number % 1 === 0) {
      return parseInt(number)
    } else if (number % 0.1 === 0) {
      return Number(Number(number).toFixed(1))
    } else if (number % 0.01 === 0 || number % 0.01 !== 0) {
      return Number(Number(number).toFixed(2))
    }
  },
  /************************************
   *data:需要处理的数据
   *index:切割数值
   *arr:处理好的数据保留在这个参数
   *type:Array|----|Number|----|Array
   *return:Array
   ***********************************/
  newSplice: (data, index, arr) => {
    if (data.length === 0 || !data) {
      return []
    }
    let _this = plugin
    if (!arr) {
      arr = []
    }
    index = index || 5
    arr.push(data.splice(0, index))
    if (data.length > 0) {
      _this.newSplice(data, index, arr)
    }
    return arr
  },
  /************************************
   *el:到达其视图的id
   *type:String
   ***********************************/
  goElView: (el) => {
    if (!el) {
      throw new TypeError('请传入element的"id"')
    }
    let ele = document.getElementById(el)
    if (ele) {
      ele.scrollIntoView(true)
    } else {
      return false
    }
  },
  winReload () {
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  },
  // 123456转123，456
  formatNum (num) {
    var str = num.toString()
    var reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
    return str.replace(reg, '$1,')
  },
  strToAscII (string, flag, specialStr) {
    let strSpecialCharacters = specialStr || ['%', '/', '&', '?'] // 转化特殊字符'['与']'不可使用
    if (!flag) {
      let strArr = string.split('')
      string = strArr.map(itemStr => {
        if (strSpecialCharacters.indexOf(itemStr) !== -1) {
          itemStr = '<--' + itemStr.charCodeAt() + '-->'
        }
        return itemStr
      }).join('')
    } else {
      let stringArr = string.split('<--').map(item => {
        if (item.indexOf('-->') === -1) {
          return item
        } else {
          let innetItem = item.split('-->')
          innetItem[0] = String.fromCharCode(innetItem[0])
          return innetItem.join('')
        }
      })
      string = stringArr.join('')
    }
    return string
  },
  // 修复el-select readonly样式导致移动端不能弹出软键盘的bug
  fuckSelect () {
    Array.from(document.getElementsByClassName('el-select')).forEach((item) => {
      item.children[0].children[0].removeAttribute('readOnly')
      item.children[0].children[0].onblur = function () {
        let _this = this
        setTimeout(() => {
          _this.removeAttribute('readOnly')
        }, 200)
      }
    })
  },
  // 数组去重(仅用数组内子项为数字或字符串的数据结构)
  unique (arr, key) {
    if (key) {
      let newArr = []
      arr.forEach(itemF => {
        if (!newArr.find(itemFI => itemFI[key] === itemF[key])) {
          newArr.push(itemF)
        }
      })
      return newArr
    } else {
      return [...new Set(arr)]
    }
  }
}
const submitLock = () => {
  let lock = true
  return function (messageStr) { // 采用闭包保存lock状态
    if (!lock) {
      let str = messageStr || '请勿频繁点击'
      Message.Message.warning(str)
      return true
    }
    lock = false
    setTimeout(() => {
      lock = true
    }, 1000)
  }
}
export default {
  install (Vue) {
    Vue.prototype.$getDataType = plugin.getDataType
    Vue.prototype.$winReload = plugin.winReload
    Vue.prototype.$openUrl = plugin.openUrl
    Vue.prototype.$getTime = plugin.getTime
    Vue.prototype.$clone = plugin.cloneData
    Vue.prototype.$flatten = (data) => { return plugin.flatten(plugin.flatten(data)) }
    Vue.prototype.$mergeData = plugin.mergeData
    Vue.prototype.$toFixed = plugin.toFixedAuto
    Vue.prototype.$newSplice = plugin.newSplice
    Vue.prototype.$goElView = plugin.goElView
    Vue.prototype.$formatNum = plugin.formatNum
    Vue.prototype.$strToAscII = plugin.strToAscII
    Vue.prototype.$fuckSelect = plugin.fuckSelect
    Vue.prototype.$submitLock = submitLock()
    Vue.prototype.$unique = plugin.unique
  }
}
