const http = require('http');
const path = require('path');
const fs= require('fs');
// var cors = require('cors')


// app.use(cors())

const server = http.createServer((req, res)=>{
    if (req.url==='/api'){
        //https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database 
const {MongoClient} = require('mongodb');

 
async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri ="mongodb+srv://backend:Susmitha@atlascluster.nsxwnvt.mongodb.net/?retryWrites=true&w=majority";
 
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        //await  listDatabases(client);
        await findsomedata(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);


async function findsomedata(client ){
    const cursor = client.db("ResumeBuilder").collection("places").find({});
    const results = await cursor.toArray();
    const js= (JSON.stringify(results));
    console.log(js);

    res.setHeader("Access-Control-Allow-Origin", '*')
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(js);

};
    }
    else{
    let filePath= path.join(__dirname, 'public', req.url==='/' ? 'index1.html':req.url );
    let extname = path.extname(filePath)
    switch(extname){
        case '.css':
            contentType= 'text/css';
            break;
        case '.js':
            contentType= 'text/javascript';
            break;
        case '.json':
            contentType= 'application/json';
            break;
        case '.html':
                contentType= 'text/html';
                break
        
    }
    fs.readFile(filePath, (err, content)=>{
            if(err) {
                        if(err.code = 'ENONET'){ // file dont exist 
                            // display the 404 page here
                            fs.readFile(path.join(__dirname,'public','404.html'),(err,content)=>{
                                res.setHeader("Access-Control-Allow-Origin", '*')
                                res.writeHead(200, {"Content-Type": 'text/html'});
                                res.end(content, 'utf-8')
                            });
                                    
                        }
                        else{
                            res.writeHead(500);
                            res.end(`server error ${err.code}` );
                        }
            }else{
                res.setHeader("Access-Control-Allow-Origin", '*')
                res.writeHead(200, {'Content-Type':contentType})
                res.end(content, 'utf-8')
            }
    });
}
});

const PORT = process.env.PORT || 5001
server.listen(PORT,()=>console.log(`Server is running successfully and the port number is ${PORT}`))