require('babel-register')();
require('babel-polyfill');

var model = require('../src/model')
model.sequelize.sync().then(function(){
 model.Map.create({
    name: "Demo Map",
    url: "",
    x: 80,
    y: 80,
    z: 2,
    anchors: [
      {name:"Alpha",
      hardwareVersion: 12,
      firmwareVersion: 11,
      x: 40,
      y: 40,
      z: 2},
      {name:"Beta",
      hardwareVersion: 12,
      firmwareVersion: 11,
      x: 20,
      y: 20,
      z: 2},
      {name:"Gamma",
      hardwareVersion: 12,
      firmwareVersion: 11,
      x: 40,
      y: 20,
      z: 2},
      {name:"Delta",
      hardwareVersion: 12,
      firmwareVersion: 11,
      x: 20,
      y: 40,
      z: 2}
    ],
  tags: [
    {
    name:"Maximus",
    hardwareVersion: 12,
    firmwareVersion: 11,
    battery: 0.5,
    updateRate: 1.2,
    iconNumber: 1,
    iconColor: "ff0000",
    labels: [{
      name:"cart"}],
    positions:[{
      x: 40,
      y: 40,
      z: 2}]
    }
    ,{
    name:"Julius",
    hardwareVersion: 12,
    firmwareVersion: 11,
    battery: 0.5,
    updateRate: 1.2,
    iconNumber: 1,
    iconColor: "ff0000",
    labels: [{
      name:"cart"}],
    positions:[{
      x: 40,
      y: 40,
      z: 2}]
    },{
    name:"Claudius",
    hardwareVersion: 12,
    firmwareVersion: 11,
    battery: 0.5,
    updateRate: 1.2,
    iconNumber: 1,
    iconColor: "33cc33",
    labels: [{
      name:"Warehouse"}],
    positions:[{
      x: 40,
      y: 40,
      z: 2}]
    },{
    name:"Vinius",
    hardwareVersion: 12,
    firmwareVersion: 11,
    battery: 0.5,
    updateRate: 1.2,
    iconNumber: 1,
    iconColor: "0066ff",
    labels: [{
      name:"cart"},{
      name:"Warehouse"}],
    positions:[{
      x: 40,
      y: 40,
      z: 2}]
    }

]}
, {
  include: [{
    model : model.Anchor,
    as : "anchors"
  },{
    model : model.Tag,
    as : "tags",
    include: [{
  model : model.Label,
  as : "labels"
},{
  model : model.Position,
  as : "positions"
}]
  }]
})

})
model.sequelize.sync().then(function(){
model.Map.create({
   name: "Demo Map 2",
   url: "",
   x: 225,
   y: 150,
   z: 2,
   anchors: [
     {name:"Alpha",
     hardwareVersion: 12,
     firmwareVersion: 11,
     x: 225,
     y: 110,
     z: 2},
     {name:"Beta",
     hardwareVersion: 12,
     firmwareVersion: 11,
     x: 225,
     y: 30,
     z: 2},
     {name:"Gamma",
     hardwareVersion: 12,
     firmwareVersion: 11,
     x: 40,
     y: 110,
     z: 2},
     {name:"Delta",
     hardwareVersion: 12,
     firmwareVersion: 11,
     x: 40,
     y: 30,
     z: 2}
   ],
 tags: [
   {
   name:"Maximus",
   hardwareVersion: 12,
   firmwareVersion: 11,
   battery: 0.5,
   updateRate: 1.2,
   iconNumber: 1,
   iconColor: "ff0000",
   labels: [{
     name:"student"}],
   positions:[{
     x: 60,
     y: 40,
     z: 2}]
   }
   ,{
   name:"Julius",
   hardwareVersion: 12,
   firmwareVersion: 11,
   battery: 0.5,
   updateRate: 1.2,
   iconNumber: 1,
   iconColor: "ff0000",
   labels: [{
     name:"student"}],
   positions:[{
     x: 70,
     y: 90,
     z: 2}]
   },{
   name:"Claudius",
   hardwareVersion: 12,
   firmwareVersion: 11,
   battery: 0.5,
   updateRate: 1.2,
   iconNumber: 1,
   iconColor: "33cc33",
   labels: [{
     name:"teacher"}],
   positions:[{
     x: 67,
     y: 45,
     z: 2}]
   },{
   name:"Vinius",
   hardwareVersion: 12,
   firmwareVersion: 11,
   battery: 0.5,
   updateRate: 1.2,
   iconNumber: 1,
   iconColor: "0066ff",
   labels: [{
     name:"teacher"},{
     name:"assistent"}],
   positions:[{
     x: 115,
     y: 100,
     z: 2}]
   }

]}
, {
 include: [{
   model : model.Anchor,
   as : "anchors"
 },{
   model : model.Tag,
   as : "tags",
   include: [{
 model : model.Label,
 as : "labels"
},{
 model : model.Position,
 as : "positions"
}]
 }]
})
})
