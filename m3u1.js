'use strict'

async function iPlayerMain(number, index) {
    if (number == 1) {
        getPage1()
    }
}

async function getPage1() {
    let options = {
        url : "http://adultiptv.net/lists/all.m3u",
        timeout : 16
    }
    iNetwork.get(options, function(err, res, body){
        
        let arr1 = body.split(`\n`)
        let names = arr1.filter((item)=> {
            return item.match(/EXTINF/)
        })

        let nameArr = []
        for (let i = 0; i < names.length; i++) {
            let element = names[i]
            let name = 'iPlayer JS'
            let arr = []
            if (element.indexOf('EXTINF:0') != -1) {
                arr = element.split(' ')  
            }else {
                name = element.match(/AdultIPTV.net.*?(?=" tvg-language)/gi)[0]
                arr = name.split(' ')
            }
            arr.splice(0, 1)
            name = arr.join(' ')
            nameArr.push(name)
        }

        let urlArr = arr1.filter((item)=> {
            return item.match(/\.m3u8$/)
        })
        let datas = []
        for (let i = 0; i<nameArr.length && i<urlArr.length; i++) {
            let item = {"name": nameArr[i], "address": urlArr[i], "image": "https://s3.bmp.ovh/imgs/2022/06/03/b00eeb1ee998105e.png"}
            datas.push(item)
        }
        let data = {"title":'国外', "canPlay": true, "data":datas}
        //console.log(JSON.stringify(data))
        iUI.reloadData(data)
    })
}

