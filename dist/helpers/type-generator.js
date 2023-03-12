"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const sequelize_1 = require("sequelize");
/**
 * @description Data types definitions for sequelize
 * This file will hold all the common data type definitions for sequelize models and will prevent
 * unnecessarily bloating the models with a lot of code.
 * Specific data types can be defined directly in the sequelize model but if the same definition is to be used
 * for more columns its better for it to be added to the type generator, new data type definitions can be added as needed
 * ******************************************************
 * How to add a data type definition - DTD
 * ******************************************************
 * In the exported Type object add a property declared as a function returning a DTD object
 * which can have predefined values or get values as parameters passed to the function
 * Refer to the sequelize documentation (https://sequelize.org/v5/manual/) on how DTDs are defined
 * ******************************************************
 * How to use the type generator
 * ******************************************************
 * Import it in the sequelize model file where you want to use it and in the columns definition in the model
 * assign the corresponding property of the type generator object which will return the wanted DTD
 * NOTE - Don't change the defined data types because they are used by more than one models/columns
 * If there is a data type function you want to use but it doesn't return a DTD with all needed properties, since
 * the DTD is an object we can use destructuring (to add/remove needed properties) to the column definition without
 * mutating the predefined DTD in the type generator
 */
const { STRING, TEXT, INTEGER, DATE, NOW, BOOLEAN, DECIMAL, ENUM, VIRTUAL, FLOAT, JSON } = sequelize_1.DataTypes;
exports.Type = ({
    string: STRING,
    text: TEXT,
    int: INTEGER,
    decimal: DECIMAL,
    FLOAT,
    DATE,
    ENUM,
    json: JSON,
    str: (len, allowNull = true) => ({ type: STRING(len), allowNull }),
    intRange: (...range) => ({ type: INTEGER, validate: { isIn: [range] } }),
    uniqInt: () => ({ type: INTEGER, allowNull: false, unique: true }),
    isoCode: (len, cb) => ({ type: STRING(len), set: cb }),
    enum: (...values) => ({ type: ENUM, values }),
    bool: (def) => ({ type: BOOLEAN, allowNull: true, defaultValue: def || false }),
    date: () => ({ type: DATE, allowNull: true }),
    autoDate: () => ({ type: DATE, allowNull: false, defaultValue: NOW }),
    virtual: (get = () => { }) => ({ type: VIRTUAL(exports.Type.int), get }),
    primaryKey: () => ({ type: INTEGER({ length: 11, unsigned: true }), primaryKey: true, allowNull: false, autoIncrement: true }),
    refId: () => ({ type: INTEGER({ length: 11, unsigned: true }), allowNull: false, defaultValue: 0 }),
    uniqRefId: () => ({ type: INTEGER({ length: 11, unsigned: true }), unique: true, allowNull: false, defaultValue: 0 }),
    nullRefId: () => ({ type: INTEGER({ length: 11, unsigned: true }), allowNull: true }),
    /** subtype - setter function - to be passed to isoCode type as callback for set */
    toUpperCase: (column) => function (val) {
        // @ts-ignore
        this.setDataValue(column, val && val.toUpperCase().trim());
    }
});
