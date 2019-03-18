const { exec } = require("child_process");

exec(
    "git add . && git commit -m '快速提交' && git push -u origin master",
    function(err) {
        err && console.log(err);
    }
);
