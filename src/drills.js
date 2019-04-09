require('dotenv').config();

const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

console.log('connection successful');

function searchByProduceName(searchTerm) {
    knexInstance
        .select('product_id', 'name')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
};

// searchByProduceName('an');

function paginateProducts(pageNumber) {
    const productsPerPage = 6
    const offset = productsPerPage * (pageNumber - 1)
    knexInstance
        .select('product_id', 'name', 'price', 'category')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
};

// paginateProducts(2);

function mostPopularVideosForDays(daysAgo) {
    knexInstance
        .select('*')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .from('shopping_list')
        .then(result => {
            console.log(result)
        })
};
  
// mostPopularVideosForDays(3);

function totalPricePerCate() {
    knexInstance
        .select('category')
        .from('shopping_list')
        .sum('price as total')
        .groupBy('category')
        .then(result => {
            console.log(result)
        })
};

totalPricePerCate();
