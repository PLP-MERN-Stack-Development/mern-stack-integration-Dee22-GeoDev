const express=require('express');
const app=express();
const port=3000



let products=[
{'name':'samsung',
    'price':2000
},
{'name':'oppo',
    'price':3000
},{
    'name':'techno',
    'price':1500
}
]



app.use('./routes')





app.post('/api/products',(req,res)=>{

})

app.put('/api/products/:1d',(req,res)=>{

})


app.listen(port,()=>{
    console.log('server running on port $port');
})