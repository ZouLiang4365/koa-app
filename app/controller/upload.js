const fs = require('fs')

const upload = async ctx => {
  const file = ctx.request.files.file
  try {
    const reader = fs.createReadStream(file.path)
    const upStream = fs.createWriteStream(`${ctx.config.tempFilePath}/${file.name}`)
    reader.pipe(upStream)   
    console.log(`上传${file.name}成功........`)
    // 不用带public
    return ctx.body = `${ctx.origin}/temp/${file.name}`
  } catch (error) {
    throw new ctx.err.HttpException({
      msg: 'upload failed!'
    })
  }

}

module.exports = upload 