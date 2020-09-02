const getHash = (hashStr) => {
  let json = {}
  let params = hashStr.split('&&')
  params.forEach((item) => {
    json[item.split('=')[0]] = item.split('=')[1]
  })
  return json
}
const downloadExcel = (data, titles, orderInfo, excelName) => {
  let orderElement = ''
  if (orderInfo) {
    let orderInfoType = Object.prototype.toString.call(orderInfo).split(' ')[1].split(']')[0]
    orderInfo = orderInfoType === 'Object' ? [orderInfo] : orderInfo
    orderElement = orderInfo.map(itemOrder => {
      return `<table>
                <tr>
                  <td style="text-align:left">订单号：</td>
                  <td style="text-align:left">${itemOrder.order_code}</td>
                </tr>
                <tr>
                  <td style="text-align:left">订单公司：</td>
                  <td style="text-align:left">${itemOrder.client_name}</td>
                </tr>
                <tr>
                  <td style="text-align:left">负责小组：</td>
                  <td style="text-align:left">${itemOrder.group_name}</td>
                </tr>
                <tr>
                  <td style="text-align:left">下单日期：</td>
                  <td style="text-align:left">${itemOrder.order_time}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </table>`
    }).join('')
  }
  let aLink = document.createElement('a')
  let excelHeader = '<tr>' + titles.map(item => '<td style="text-align:left">' + item.title + '</td>').join('') + '</tr>'
  let excelContent = data.map(itemData => {
    return '<tr>' + titles.map(itemTitle => '<td style="text-align:left">' + ((itemData[itemTitle.key] !== 0 && !itemData[itemTitle.key]) ? '' : itemData[itemTitle.key]) + '</td>').join('') + '</tr>'
  })
  let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
                    xmlns:x="urn:schemas-microsoft-com:office:excel" 
                    xmlns="http://www.w3.org/TR/REC-html40">
              <meta http-equiv="content-type" content="application/vnd.ms-excel; charset="UTF-8">
              <head>
                <!--[if gte mso 9]>
                <xml>
                <x:ExcelWorkbook>
                  <x:ExcelWorksheets>
                    <x:ExcelWorksheet>
                      <x:Name>${excelName || 'worksheet1'}</x:Name>
                      <x:WorksheetOptions>
                        <x:DisplayGridlines/>
                      </x:WorksheetOptions>
                    </x:ExcelWorksheet>
                  </x:ExcelWorksheets>
                </x:ExcelWorkbook>
                </xml>
                <![endif]-->
              </head>
              <body>
                ${orderElement}
                <table>${excelHeader}${excelContent.join('')}</table>
              </body>
            </html>`
  let url = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(html)
  aLink.href = url
  aLink.download = (excelName ? excelName + '-' : '') + new Date().getTime() + '.xls'
  aLink.click()
}
export {
  getHash,
  downloadExcel
}