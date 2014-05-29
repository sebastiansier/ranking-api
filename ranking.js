exports.builder = function(matches) {

  this.initializeTeamRanking = function(id) {
    return { teamId: id, played: 0, winned: 0, drawed: 0, loosed: 0, gf: 0, ga: 0, pts: 0 }
  }

  this.initializeMatchData = function() {
    return { points: 0, winner: 0, draw: 0, loose: 0, gf: 0, ga: 0, local_goals:0, visitor_goals:0 };
  }

  this.table = {}

  this.updateRanking = function(team, matchData) {
    this.table[team].played = this.table[team].played + 1;
    this.table[team].winned = this.table[team].winned + matchData.winner;
    this.table[team].drawed = this.table[team].drawed + matchData.draw;
    this.table[team].loosed = this.table[team].loosed + matchData.loose;
    this.table[team].gf     = this.table[team].gf     + matchData.goals_scored;
    this.table[team].ga     = this.table[team].ga     + matchData.goals_received;
    this.table[team].pts    = this.table[team].pts    + matchData.points;
  }

  this.sortedTable = function() {
    var points = []
    for(var team in this.table) {
      points.push(this.table[team])
    }
    return points.sort(function(a,b) { return b.pts - a.pts });
  }


  for(var i = 0; i<matches.length; i++) {

    if(this.table[matches[i].local_team] === undefined) {
      this.table[matches[i].local_team] = this.initializeTeamRanking(matches[i].local_team);
    }
    if(this.table[matches[i].visitor_team] === undefined) {
      this.table[matches[i].visitor_team] = this.initializeTeamRanking(matches[i].visitor_team);
    }

    var local   = this.initializeMatchData();
    var visitor = this.initializeMatchData();

    local.goals_scored   = visitor.goals_received = matches[i].local_goals;
    local.goals_received = visitor.goals_scored   = matches[i].visitor_goals;

    if(matches[i].local_goals > matches[i].visitor_goals) {
      local.points  = 3;
      local.winner  = visitor.loose = 1;
    }
    else if(matches[i].local_goals < matches[i].visitor_goals) {
      visitor.points  = 3;
      visitor.winner  = local.loose = 1;
    }
    else {
      local.points = visitor.points = 1;
      local.draw   = visitor.draw   = 1;
    }

    this.updateRanking(matches[i].local_team, local);
    this.updateRanking(matches[i].visitor_team, visitor);
  }
}

