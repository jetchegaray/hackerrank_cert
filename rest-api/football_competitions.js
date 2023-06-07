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

const fetchTeam = async (team, competition, year, page, isVisitor) =>{
    
    try {
        let teamparameter = "team1"
        if (isVisitor)
            teamparameter = "team2"
        
        const response = await axios.get(`https://jsonmock.hackerrank.com/api/football_matches?competition=${competition}&year=${year}&${teamparameter}=${team}&page=${page}`)
        
        console.log(response.data)
      
        if (response.status !== 200){
            throw new Error("API error")
        }
        
        return response.data
    }catch(err){
        console.log(err)
    }
}




const fetchCompetition = async (competition, year) =>{
    
    try {
        const response = await axios.get(`https://jsonmock.hackerrank.com/api/football_competitions?name=${competition}&year=${year}`)
        if (response.status !== 200){
            throw new Error("API error")
        }
        return response.data
    }catch(err){
        console.log(err)
    }
}

const countGoals = async (team, competition, year, isVisitor) => {
    
    let total_pages = 0
    let i = 1
    let totalGoals = 0
    let field = "team1goals"
    do{
        if (isVisitor)
            field = "team2goals"
        
        const data = await fetchTeam(team, competition, year, i, isVisitor)
        total_pages = data.total_pages
        
        for (const key in data.data){
            console.log(data.data[key])
            totalGoals += +data.data[key][field]
        }
        
    }while(++i <= total_pages);
    
    return +totalGoals
}


/*
 * Complete the 'getWinnerTotalGoals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING competition
 *  2. INTEGER year
 */

async function getWinnerTotalGoals(competition, year) {
    const competitionData = await fetchCompetition(competition, year)
    
    const team = competitionData?.data[0]?.winner
    console.log(team)
    
    return (await countGoals(team, competition, year, true)) + (await countGoals(team, competition, year, false))
        
}

async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const competition = readLine();

    const year = parseInt(readLine().trim(), 10);

    const result = await getWinnerTotalGoals(competition, year);

    ws.write(result + '\n');

    ws.end();
}

