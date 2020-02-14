const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipeApp';

//const Recipe = mongoose.model('Recipe', recipeSchema);

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(`Connected to the database: "${x.connections[0].name}"`);
    return Recipe.create({
      title: 'Receita',
      level: 'Easy Peasy',
      ingredients: ['nothing'],
      cuisine: 'every cuisine',
      dishType: 'Other',
      duration: 0,
      creator: 'me'
    });
  })
  .then(recipe => {
    console.log(recipe.title);
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
