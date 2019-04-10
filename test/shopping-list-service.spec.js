const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe(`ShoppingList service object`, function() {
    let db;
    let testList = [
        {
            product_id: 1,
            name: 'Donuts',
            price: "3.99",
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            checked: false,
            category: 'Snack'
        },
        {
            product_id: 2,
            name: 'Pasta',
            price: "6.99",
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            checked: true,
            category: 'Main'
        },
        {
            product_id: 3,
            name: 'Pancakes',
            price: "4.99",
            date_added: new Date('2029-01-22T16:28:32.615Z'),
            checked: true,
            category: 'Breakfast'
        },
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
    });

    before(() => db('shopping_list').truncate());

    afterEach(() => db('shopping_list').truncate());

    after(() => db.destroy());
    
    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testList)
        });

        it(`getList() resolves all items from 'shopping_list' table`, () => {
            //test that ShoppingListService.getAllArticles gets data from table
            return ShoppingListService.getList(db)
                .then(actual => {
                    // expect(actual).to.eql(testList)
                    expect(actual).to.eql(testList.map(item => ({
                        ...item,
                        // date_published: new Date(item.date_added),
                    })))
                })
        });

        it(`getById() resolves an item by id from 'shopping_list' table`, () => {
            const thirdId = 3
            const thirdTestList = testList[thirdId - 1]
            return ShoppingListService.getById(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        product_id: thirdId,
                        name: thirdTestList.name,
                        checked: thirdTestList.checked,
                        price: thirdTestList.price,
                        date_added: thirdTestList.date_added,
                        category: thirdTestList.category
                    })
                })
        });

        it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
            const itemId = 3
            return ShoppingListService.deleteItem(db, itemId)
                .then(() => ShoppingListService.getList(db))
                    .then(List => {
                    // copy the test list array without the "deleted" item
                    const expected = testList.filter(item => item.product_id !== itemId)
                    expect(List).to.eql(expected)
                })
        });

        it(`updateItem() updates an item from the 'shopping_list' table`, () => {
            const idOfItemToUpdate = 3
            const newItemData = {
                product_id: idOfItemToUpdate,
                name: 'updated title',
                price: "5.99",
                date_added: new Date(),
                checked: false,
                category: 'Lunch',
            }
            return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
                .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
                .then(item => {
                    expect(item).to.eql({
                        ...newItemData,
                        product_id: idOfItemToUpdate,
                    })
                })
        })
    })

    context(`Given 'shopping_list' has no data`, () => {
        it(`getList() resolves an empty array`, () => {
            return ShoppingListService.getList(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        });

        it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
            const newItem = {
                name: 'updated title',
                price: "5.99",
                date_added: new Date(),
                checked: false,
                category: 'Lunch',
            }

            return ShoppingListService.insertItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        product_id: 1,
                        name: newItem.name,
                        checked: newItem.checked,
                        price: newItem.price,
                        date_added: newItem.date_added,
                        category: newItem.category

                        // or // date_published: new Date(newArticle.date_published),
                        // ^^^^^^^
                        // there may be issues with
                        // daylight savings times and timezones between your machine and PostgreSQL.
                        // To fix them,
                        // run the dates from your databse through
                        // new Date constructor to force it into your current timezone.
                    })
                })

        });
    })

});