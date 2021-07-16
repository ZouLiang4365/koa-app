
const page = async (ctx,next)=>{
  await ctx.render('index',{
    title: 'index'
  })
}

module.exports= page