'use strict'
// ipfsd-ctl is used to control a go-ipfs daemon from js
// (js-ipfs isn't mature enough do to certain things like IPNS yet)
// This requires that you have go-ipfs-dep installed so that you have
// an executable to run.
const factory = require('ipfsd-ctl').create()

factory.spawn((err, ipfsd) => {
    if (err) { throw err }
    const ipfs = ipfsd.api

    ipfs.id().then(id => {
        console.log("id:", id)
    }).catch(console.error)

    ipfs.files.add([{
        path: '/test-file.txt',
        content: Buffer.from('This is my test file', 'utf-8')
    }]).then(res => {
        const fileHash = res[0].hash
        console.log('Added file with hash:', fileHash)

        return ipfs.files.cat(fileHash)
    }).then(text => {
        console.log('File contents:', text.toString())
    }).catch(console.error)
})
