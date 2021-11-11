const Sequelize = require('sequelize')
const db = require('../db')


const Instrument = db.define('instrument', {

    itemType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    },
    model: {
        type: Sequelize.STRING
    },
    imageurl: {
        type: Sequelize.STRING,
        defaultValue: 'default.png',
        validate: {
            isUrl: true
        }
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 5
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
    }
})

/* Instance Methods */
Instrument.prototype.getRating = async function () {
    const item = await Instrument.findByPk(this.id)
    return item.rating
}

/* CLASS METHODS */
Instrument.getAllInstrument = async function () {
    return await Instrument.findAll();
}


module.exports = Instrument