worker.onMessage(e => {
    // console.log(e)
    worker.postMessage(e)
})

// console.dir(worker)