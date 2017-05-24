function genData(ending) {
  var i;
  var data = [];

  faker.locale = 'zh_TW';
  for(i=0; i<ending; i++) {
    data.push({
      category: (Math.floor(Math.random()*100) % 18) + 1,
      bookType: (Math.floor(Math.random()*10) % 4) + 1,
      author: faker.name.firstName() + faker.name.lastName(),
      publicationDate: faker.date.past(),
      title: faker.lorem.sentence(),
      bookName: faker.lorem.word(),
      editor: faker.name.firstName() + faker.name.lastName(),
      publishingLocation: faker.address.city(),
      publisher: faker.company.companyName(),
      period: Math.floor(Math.random()*100) % 58 + 14,
      chapter: Math.floor(Math.random()*100) % 30 + 1,
      page: Math.floor(Math.random()*100) % 58 + 1,
      department: faker.commerce.department(),
      thesis: faker.lorem.word(),
      ISBN: faker.phone.phoneNumberFormat(),
      ISSN: faker.phone.phoneNumberFormat()
    });
  }

  console.log(data);
  return data;
}


