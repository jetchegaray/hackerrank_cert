'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



const axios = require("axios")

const fetchTeam = async (team, year, page, isVisitor) =>{
    
    try {
        let teamparameter = "team1"
        if (isVisitor)
            teamparameter = "team2"
        
        const response = await axios.get(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}&${teamparameter}=${team}&page=${page}`)
        
            
        if (response.status !== 200){
            throw new Error("API error")
        }
        
        return response.data
    }catch(err){
        console.log(err)
    }
}

/*
 * Complete the 'getTotalGoals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING team
 *  2. INTEGER year
 */

async function getTotalGoals(team, year) {
    let total_pages = 0
    let i = 1,j= 1
    let totalGoals = 0
    
    
    do{
        //as visitor
        const data = await fetchTeam(team, year, i, true)
        total_pages = data.total_pages
        
        for (const key in data.data){
            totalGoals += +data.data[key].team2goals
        }
        
    }while(++i <= total_pages);
        

    do{
        //as home
        const data = await fetchTeam(team, year, j, false)
        total_pages = data.total_pages
        
        for (const key in data.data){
            totalGoals += +data.data[key].team1goals
        }
        
    }while(++j <= total_pages);
        
    return totalGoals
}
async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const team = readLine();

    const year = parseInt(readLine().trim(), 10);

    const result = await getTotalGoals(team, year);

    ws.write(result + '\n');

    ws.end();
}

