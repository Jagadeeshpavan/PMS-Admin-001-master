const cron =  require('node-cron');

cron.schedule("* * * * * *",function(){
    console.log("node.js script is running");
}

)