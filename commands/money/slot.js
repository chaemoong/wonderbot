const num=15
module.exports.execute = async (client, message, locale, embed, tools, knex, props, data) => {
   if(!message.data.args || isNaN(message.data.arg[0])) return message.reply(locale.error.usage(props.name));
   if(!message.guild.me.hasPermission('ADD_REACTIONS')){
    message.reply(locale.error.botperm.bind({perms : locale.perm['ADD_REACTIONS']}))    
}
   const m = (await knex.select('*').from('users').where({id : message.author.id}))[0].money    
   if(data.slot[message.author.id] && (data.slot[message.author.id] + 60000) > Number(new Date())) return message.reply(locale.commands.slot.cooldown.bind({time : new Date(Number(new Date(data.slot[message.author.id])) + 600000).fromNow(message.data.locale)}))
   if(Number(message.data.arg[0]) < 500) return message.reply(locale.commands.slot.morethan)
   if(m < Number(message.data.arg[0])) return message.reply(locale.commands.slot.nomoney)
   s = slot()
   console.log(s)
    var msg = message.reply(locale.commands.slot.ready.bind({money : message.data.arg[0]}));
    const filter = (reaction, user) => reaction.emoji.name == '🎰'&&user.id == message.author.id
    data.action.push(message.author.id)
    msg.then(async ms=> {ms.react('🎰'); ms.awaitReactions(filter, { max: 1, time : 10000, error : ['time']})
    .then(async collected => {
        if(collected.size == 0)  {        
            data.action.splice(data.action.indexOf(message.data.id), 1)
             return message.reply(locale.commands.allin.not)}
             data.slot[message.author.id] = Number(new Date())

        console.log( Number(message.data.arg[0]))
        data.action.splice(data.action.indexOf(message.data.id), 1)
       await message.reply(locale.commands.slot.payed.bind({money: message.data.arg[0]}))
       var mm =  message.channel.send(emoji[s.slot[0]]+emoji[s.slot[1]]+emoji[s.slot[2]])
       mm.then(async gg => {
        reward = (s.multi*Number(message.data.arg[0]) - Number(message.data.arg[0])).toFixed(0)
        await setTimeout(function(){
 
            embed.addField('손익', locale.commands.slot.res.bind({plus : (s.multi*Number(message.data.arg[0])).toFixed(0), bet:message.data.arg[0], money: reward<0? reward* -1 +tools.lib.emojis.coin+' 손해' : reward+' '+tools.lib.emojis.coin+' 이득'  }) )
            embed.addField('잔고', (m+Number(reward)) +tools.lib.emojis.coin)
            
            message.reply(embed)
            gg.edit(gg.content.replace(emoji[s.slot[0]], static[s.slot[0]]).replace(emoji[s.slot[1]], static[s.slot[1]]).replace(emoji[s.slot[2]], static[s.slot[2]]))
        }, 6000) 
        
        await knex.update({money : (m+Number(reward)).toFixed(0)}).from('users').where({id : message.author.id})
       })

    
    })
    })
    .catch(error=>message.reply(locale.commands.allin.not))
 
       
   function slot(){
    a = tools.weighted(percent)
    b = tools.weighted(percent)
    c = tools.weighted(percent)
    if(a==b && b==c) multi = (1/(num*((percent[a]/1000)**3)));
    else if(a==b) multi = (1/(num*((percent[a]/1000)**2))); 
    else if(b==c) multi = (1/(num*((percent[b]/1000)**2))); 
    else if(c==a) multi = (1/(num*((percent[c]/1000)**2)));

    else{ multi = 0; g = 0}
    return {slot : [a, b, c], multi : multi}
}
    
}
module.exports.props = {
    name : 'slot',
    perms : 'general',
    alias : ['슬롯머신'],
    args : [{
        name : 'money',
        type : 'number',
        required : true,
    }]
}


const percent = {
    wonder : 13,
    seven : 30,
    gem : 77,
    star : 135,
    money : 175,
    melon  : 261,
    pear : 309,
    
    }

const emoji = {
    wonderbot : '<a:slot:666617809849155608>',
    seven : '<a:slot:666617811061178388>',
    melon : '<a:slot:666617811883393024>',
    money : '<a:slot:666617810704793611>',
    star : '<a:slot:666617810792742930>',
    gem : '<a:slot:666619127611523083>' ,
    pear : '<a:slot:666617810033573888>',
    
    

}

const static = {
    wonderbot : '\<:wonder:666837741329448960>',
    seven : '\<:seven:666837898645209098>',
    melon : '\<:melon:666837649536843776>',
    money : '\<:money:666838282956570635>',
    star : '\<:star:666837819423064085>',
    gem : '\<:gem:666837459052658690>' ,
    pear : '\<:pear:666838052081238036>',
}