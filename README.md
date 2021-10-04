heroku apps:create my-app


heroku config:set MONGODB_URL="mongodb+srv://amazona:amazona@cluster0.ydi07.mongodb.net/amazona?retryWrites=true&w=majority"



heroku config:set SKIP_PREFLIGHT_CHECK=true
git push heroku