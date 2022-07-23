'use strict'

let page1Data = []

async function iPlayerMain(number, index) {
    if (number == 1) {
        getPage1()
    }else if (number == 2) {
        getPage2(index)
    }
}

async function getPage1() {
    let options = {
        url : "http://api.hclyz.com:81/mf/jiekou.php",
        timeout : 16
    }
    iNetwork.get(options, function(err, res, body){
        if (version >= '1.5.0') {
            let obj = JSON.parse(body)
            page1Data = obj.data
        }else {
            page1Data = body.data
        }
        
        let data = {
            title: '平台列表',
            canPlay: false,
            config:{       
                key: {
                    name: 'name',
                    plat: 'name',
                    image:'img',
                    address: 'dz',
                    online: 'sl',
                    time: '',
                    totalTime: ''
                }

            },
            data: page1Data
        }

        iUI.reloadData(data)
    })
}

async function getPage2(index) {

    let subData = page1Data[index]
    let param = {name: subData['dz']};
    let options = {
        url : "http://api.hclyz.com:81/mf/jiekou.php",
        body : param,
        timeout : 16
    }
    iNetwork.get(options, function(err, res, body){
        let obj = []
        if (version >= '1.5.0') {
            obj = JSON.parse(body)
        }else {
            obj = body.data
        }
        let data = {
            title: subData['name'],
            canPlay: true,
            config:{       
                key: {
                    name: 'title',
                    image:'img',
                    address: 'address'
                }
            },
            data: obj
        }

        iUI.reloadData(data)
    })
}

//版本号
function version() {
    try {
        return iUI.appVersion()
    }catch(e){}
    return '1.0.0'
}

