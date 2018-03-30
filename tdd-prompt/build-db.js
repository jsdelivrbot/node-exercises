'use strict';
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("training.sqlite");
const { readFileSync } = require("fs");
const { trainingPrograms } = JSON.parse(readFileSync('./training-programs.json'));

module.exports.buildDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      db.run(`DROP TABLE IF EXISTS training_programs`);
      db.run(
        `CREATE TABLE IF NOT EXISTS training_programs (
        program_id INTEGER PRIMARY KEY,
        title TEXT,
        start_date TEXT,
        end_date TEXT,
        max_attendees INTEGER)`
      );

      trainingPrograms.forEach(({ program_name, start_date, end_date, max_attendees }) => {
        db.run(`INSERT INTO training_programs VALUES (
            ${null},
            "${program_name}",
            "${start_date}",
            "${end_date}",
            ${max_attendees})`
        );
      })
    });
  });
};

// call the function in this module
module.exports.buildDatabase()
.then(data => {
  resolve(data);
})