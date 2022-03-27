const app = require('./app');

try{
    const PORT = process.env.SERVER_PORT || process.env.BACKUP_PORT;
    app.listen(PORT, () => {
        console.log('Listening on port ' + PORT + '...');
    });
}catch(e){
    console.log(e);
}
