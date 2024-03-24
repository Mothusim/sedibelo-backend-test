const fs = require('fs');

/**
 * Task 1: Read data from 'usersBackEnd.json', remove duplicates, and write unique data to 'uniqueUsers.json'.
 */
const usersData = JSON.parse(fs.readFileSync('usersBackEnd.json', 'utf8'));
const uniqueUsers = [...new Set(usersData.map(user => JSON.stringify(user)))].map(str => JSON.parse(str));
fs.writeFileSync('uniqueUsers.json', JSON.stringify(uniqueUsers, null, 2));

/**
 * Task 2: Count the number of times each name and surname pair appears in 'usersBackEnd.json'
 * and write the counts to 'duplicatedNames.csv'.
 */
const nameSurnameCounts = {};
usersData.forEach(user => {
  const key = `${user.name} ${user.surname}`;
  nameSurnameCounts[key] = (nameSurnameCounts[key] || 0) + 1;
});

const csvData = Object.entries(nameSurnameCounts).map(([nameSurname, count]) => {
  const [name, surname] = nameSurname.split(' ');
  return `${name},${surname},${count}`;
}).join('\n');
fs.writeFileSync('duplicatedNames.csv', 'Name,Surname,Number of times duplicated\n' + csvData);

/**
 * Task 3: Sort the unique users by name and write them to 'orderedUsers.json'.
 */
const orderedUsers = uniqueUsers.sort((a, b) => a.name.localeCompare(b.name));
fs.writeFileSync('orderedUsers.json', JSON.stringify(orderedUsers, null, 2));

/**
 * Task 4: Filter unique users to find those in the ENGINEERING department
 * where the role is Mechanics or Mechanic Assistants and the manager is Michael Phalane.
 * Calculate the total number of users that meet these criteria.
 */
const engineeringUsers = uniqueUsers.filter(user => user.department === 'ENGINEERING' && (user.role === 'Mechanics' || user.role === 'Mechanic Assistants') && user.manager === 'Michael Phalane');
const totalReportingToMichaelPhalane = engineeringUsers.length;
console.log(`Total number of people who report to Michael Phalane: ${totalReportingToMichaelPhalane}`);
