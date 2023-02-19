'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('expenses', [
            { name: 'Rryma', description: "Fatura e paguar nga Fatoni", date: "12.01.2023", total: 123 },
            { name: 'Pastruese', description: "3 pastruese", date: "12.01.2023", total: 123 },
            { name: 'Rryma', description: "Fatura e paguar nga Fatoni", date: "12.01.2023", total: 123 },
        ]);

        await queryInterface.bulkInsert('users', [
            { full_name: 'Shkelqim Bilalli', age: 30, phone: "071223123", email: "shkelqimbilalli98@gmail.com", role: 1, password: "kimi123" },
            { full_name: 'Kimi Bilalli', age: 30, phone: "071223123", email: "kimi@gmail.com", role: 2, password: "kimi123" },
        ]);

        await queryInterface.bulkInsert('clients', [
            { full_name: 'Filan Filani', email: "filan@gmail.com", phone: "071884992" },
            { full_name: 'Hamdi Hamdushi', email: "hamdi@gmail.com", phone: "07222222" },
        ]);

        await queryInterface.bulkInsert('villas', [
            { name: 'Villa 1', price: 350, guests: 5 },
            { name: 'Villa 2', price: 300, guests: 5 },
        ]);

        await queryInterface.bulkInsert('roll_payments', [
            { amount: 300, guests: 5, checkin: "12.12.2022", checkout: "12.12.2022", client_id: 4, villa_id: 7 },
            { amount: 200, guests: 6, checkin: "15.12.2022", checkout: "20.12.2022", client_id: 5, villa_id: 8 },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('expenses', null, {});
    }
};
