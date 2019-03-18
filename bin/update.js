const { exec } = require("child_process");
const stamp = new Date().toLocaleDateString();
const command = `git add . && git commit -m '快速提交=>${stamp}' && git push -u origin master`;

exec(command, function(err) {
    err && console.log(err);
});
