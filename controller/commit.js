const github = require('../model/githubAPI');

exports.retrieve = async(req, res) => {
    try{
        //pagination e.g. /commits/?per_page=99&page=2
        const per_page = parseInt(req.query.per_page);
        const page = parseInt(req.query.page);

        // filtering e.g. /commits/?sha=d655b308e48e7c80452124197e4454e6a738e5b1
        const sha = req.query.sha;
       
        //get commits from repo
        const commits = await github.getInformation(per_page, page, sha);
        res.status(200).send(commits);
    }catch(err){
        console.log(err);
        res.status(500).json({error: err});
    }
}
