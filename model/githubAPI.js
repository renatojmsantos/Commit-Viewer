require('dotenv/config');
const fetch = require('cross-fetch');


function filterCommits(commits, filters){
    const filteredCommits = commits.filter(commit => {
        let isValid = true;
        for (key in filters) {
            isValid = isValid && commit[key] == filters[key];
        }
        return isValid;
      });
      return filteredCommits;
}

exports.getInformation = async (per_page, page, sha) => {

    try{
        // define the url to fetch
        const api_github = 'https://api.github.com'
        let commits = api_github+'/repos/'
                        + process.env.OWNER
                        + '/'+process.env.REPOSITORY+'/commits';

        // pagination from github api e.g. ?per_page=1&page=1706
        if(isNaN(per_page) === false && isNaN(page) === false){
            commits += '?per_page='+per_page +'&page='+page;
        }
        else if(isNaN(per_page) === false){
            commits += '?per_page='+per_page;
        }
        else if(isNaN(page) === false){
            commits += '?page='+page;
        }
        
        // fetch commits info from github
        let info = await fetch(commits, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Accept': 'application/json' },
        }).then(res => {
            return res.json()
        }).catch(err =>{
            console.error(err);
        });

        // extract only SHA, message, date, author
        if(info.length > 0){
            // filter by sha
            if(typeof sha !== 'undefined'){
                filter = {sha: sha};
                info = filterCommits(info, filter);
            }
            const result = info.map(function(v){
                return{
                    SHA: v.sha,
                    Message: v.commit.message,
                    Date: v.commit.author.date,
                    Author: v.commit.author.name,
                };
            });
            return result;
        }else{
            return info;
        }
    }catch(err){
        console.log(err);
    }
}
