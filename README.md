heroku apps:create my-app


heroku config:set MONGODB_URL="mongodb+srv://amazona:amazona@cluster0.ydi07.mongodb.net/amazona?retryWrites=true&w=majority"



heroku config:set SKIP_PREFLIGHT_CHECK=true
git push heroku
heroku login -i
git add .
git commit -am "update"
git push heroku master
git push heroku HEAD:master