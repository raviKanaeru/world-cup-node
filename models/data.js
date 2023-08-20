const fileSystem = require("fs");
const db = __dirname + "/../store/db.json";
const http = require("axios");

// function refreshData will get data from server to save on store/db.json

const refreshData = () => {
  http
    .get(
      "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json"
    )
    .then((res) => {
      fileSystem.writeFileSync(db, JSON.stringify(res.data), "utf8");
      console.log("");
      console.log("score is refreshed");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// function getData will return full data from store/db.json.
const getData = () => {
  return JSON.parse(fileSystem.readFileSync(db, "utf8"));
};

// function getTeamById will return object contains a team detail
const getTeamById = (id) => {
  const data = getData().teams;
  return data.find((item) => item.id == id);
};

// function getTeamName will return a string team name code.
const getTeamName = (id) => {
  const team = getTeamById(id);
  if (team) {
    return team.fifaCode;
  } else {
    return null;
  }
};

// function getChannelById will return object contains a channel detail.
const getChannelById = (id) => {
  const data = getData().tvchannels;
  return data.find((item) => item.id == id);
};

// function getStadiumById will return object contains a stadium detail.
const getStadiumById = (id) => {
  const data = getData().stadiums;
  return data.find((item) => item.id == id);
};

// function getStadiumName will return string name of a stadium
const getStadiumName = (id) => {
  const stadium = getStadiumById(id);
  if (stadium) {
    return stadium.name;
  } else {
    return null;
  }
};

// function getGroupDataByName will return object of a group
const getGroupDataByName = (name) => {
  const groups = Object.entries(getData().groups);
  return groups.find(([key, value]) => key == name);
};

module.exports = {
  refreshData,
  getData,
  getTeamById,
  getTeamName,
  getChannelById,
  getStadiumById,
  getStadiumName,
  getGroupDataByName,
};
