//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));
// https://api.covid19india.org/data.json


let topHeadings=[];
let businessNews=[];
let technologyNews=[];
let sportsNews=[];
let bollywoodNews=[];
let coronaNews=[];
let searchNews=[];
let searchString="";
let headings="";
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

app.get("/",function(req,res){
  headings="Top-Headlines";
  res.render("home",{headings:headings,news:topHeadings});
});


app.get("/business",function(req,res){
  headings="Business";
  res.render("business",{headings:headings,news:businessNews});
});


app.get("/technology",function(req,res){
  headings="Technology";
  res.render("technology",{headings:headings,news:technologyNews});
});
app.get("/sports",function(req,res){
  headings="Sports";
  res.render("sports",{headings:headings,news:sportsNews});
});
app.get("/bollywood",function(req,res){
  headings="Bollywood";
  res.render("bollywood",{headings:headings,news:bollywoodNews});
});
app.get("/corona",function(req,res){
  headings="COVID-19";
  res.render("corona",{headings:headings,news:coronaNews});
});
app.get("/startup",function(req,res){
  headings="Business : Startup";
  res.render("startup",{headings:headings,news:startupNews});
});

function callingYou(string){
  newsapi.v2.everything({
    q:string,
    sources: '',
    domains: '',
    from: '',
    to: '',
    language: 'en',
    sortBy: 'relevancy',
    page: 2
  }).then(response => {
    searchNews=response.articles;
  });
}
app.post("/",function(req,res){
  searchString=req.body.fromSearch;
  callingYou(searchString);
  res.render("posts",{headings:searchString,news:searchNews});
});

app.listen(process.env.PORT || 3000,function(req,res){
  console.log("Server is active at port 3000.");
});
