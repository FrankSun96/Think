# Think (Final Year Project)

## Technology Stack 
* Front-end: React Redux
* Back-end: Flask
* Neural Network: Deep Convolution Generative Adversarial Networks

## Functionality
* Generate pictures with genre of Abstract and Portrait
* User login and save reference 

## Front-end
* UI component development helps for component re-use
* localStorage stores the user token for authorization in front-end 
* jwt encoded
* using redux-thunk as asynchronous middleware

## Back-end
* using flask-restful to return json file for each end-point request
* using flask-cors to solve Cross Origin Resource Sharing issue
* using flask_sqlachemy as ORM

## DCGAN
### Generator
![generater](https://github.com/FrankSun96/Think/blob/master/src/generator.png)

### Discriminator
![generater](https://github.com/FrankSun96/Think/blob/master/src/discriminator.png)

## Picture Generated 
### Abstract
![abstract](https://github.com/FrankSun96/Think/blob/master/src/abstract.png)
### Portrait
![generater](https://github.com/FrankSun96/Think/blob/master/src/portrait.png)

## Website
![home_1](https://github.com/FrankSun96/Think/blob/master/src/home_1.png)
![home_2](https://github.com/FrankSun96/Think/blob/master/src/arts_generate.png)
![home_2](https://github.com/FrankSun96/Think/blob/master/src/myarts.png)
