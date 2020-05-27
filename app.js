//jshint esversion:6
// my name is piddhu
const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const covid=require("covid19-api");

const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs');
app.use(express.static("public"));
// stock data
const stockAlert = require("stock-alert");



let topHeadings=[];
let businessNews=[];
let technologyNews=[];
let sportsNews=[];
let bollywoodNews=[];
let coronaNews=[];
let searchNews=[];
let searchString="";
let headings="";
let test=0;
let covidData;
var nifty;
var sensex;
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('ab86007ea68245f19e45b73148c78882');
const urlCovid="https://api.covid19india.org/data.json";
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
sources: '',
q: '',
category: '',
language: 'en',
country: 'in'
}).then(response => {
    topHeadings=response.articles;
});
newsapi.v2.topHeadlines({
sources: '',
q: '',
category: 'business',
language: 'en',
country: 'in'
}).then(response => {
    businessNews=response.articles;
});
newsapi.v2.topHeadlines({
sources: '',
q: '',
category: 'technology',
language: 'en',
country: 'in'
}).then(response => {
    technologyNews=response.articles;
});
newsapi.v2.topHeadlines({
sources: '',
q: '',
category: 'sport',
language: 'en',
country: 'in'
}).then(response => {
    sportsNews=response.articles;
});
newsapi.v2.everything({
  q: 'bollywood',
  sources: '',
  domains: '',
  from: '',
  to: '',
  language: 'en',
  sortBy: 'relevancy',
  page: 2
}).then(response => {
  bollywoodNews=response.articles;
});

newsapi.v2.everything({
  q: 'corona india',
  sources: '',
  domains: '',
  from: '',
  to: '',
  language: 'en',
  sortBy: 'relevancy',
  page: 2
}).then(response => {
  coronaNews=response.articles;
});
newsapi.v2.everything({
  q: 'startup india',
  sources: '',
  domains: '',
  from: '',
  to: '',
  language: 'en',
  sortBy: 'relevancy',
  page: 2
}).then(response => {
  startupNews=response.articles;
});
// covid data
covid.getReportsByCountries('India')
  .then(function(result){
    covidData=result[0][0];
});
// stock data
  stockAlert("SENSEX")
  .then(function(response){
    sensex=response.data;
  });
  stockAlert("NIFTY")
  .then(function(response){
    nifty=response.data;
  });
app.get("/",function(req,res){
    headings="Top-Headlines";
    res.render("home",{headings:headings,news:topHeadings,data:covidData,nifty:nifty,sensex:sensex});
});


app.get("/business",function(req,res){
  headings="Business";
  res.render("business",{headings:headings,news:businessNews,data:covidData,nifty:nifty,sensex:sensex});
});


app.get("/technology",function(req,res){
  headings="Technology";
  res.render("technology",{headings:headings,news:technologyNews,data:covidData,nifty:nifty,sensex:sensex});
});
app.get("/sports",function(req,res){
  headings="Sports";
  res.render("sports",{headings:headings,news:sportsNews,data:covidData,nifty:nifty,sensex:sensex});
});
app.get("/bollywood",function(req,res){
  headings="Bollywood";
  res.render("bollywood",{headings:headings,news:bollywoodNews,data:covidData,nifty:nifty,sensex:sensex});
});
app.get("/corona",function(req,res){
  headings="COVID-19";
  res.render("corona",{headings:headings,news:coronaNews,data:covidData,nifty:nifty,sensex:sensex});
});
app.get("/startup",function(req,res){
  headings="Business : Startup";
  res.render("startup",{headings:headings,news:startupNews,data:covidData,nifty:nifty,sensex:sensex});
});
app.get("/posts",function(req,res){
  headings=searchString;
  newsapi.v2.everything({
    q:searchString,
    sources: '',
    domains: '',
    from: '',
    to: '',
    language: 'en',
    sortBy: 'relevancy',
    page: 2
  }).then(response => {
    searchNews=response.articles;
    res.render("posts",{
      headings:searchString,
      news:searchNews,
      data:covidData
    });
  });

});
// function callingYou(string){
//
// }
app.post("/",function(req,res){
  searchString=req.body.fromSearch;
  res.redirect("/posts");
});

app.listen(process.env.PORT || 3000,function(req,res){
  console.log("Server is active at port 3000.");
});
