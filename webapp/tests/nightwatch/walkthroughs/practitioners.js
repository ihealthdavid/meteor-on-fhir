
// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api


module.exports = {
  tags: ['practitioners'],
  'Sign in.': function (client) {
    client.resizeWindow(1200, 1024);

    const loginPage = client.page.loginPage();
    const indexPage = client.page.indexPage();

    loginPage
      .navigate()
      .login('janedoe@test.org', 'janedoe')
      .pause(1000, client);

    indexPage.expect.element('#indexPage').to.be.present;
    indexPage.expect.element('#authenticatedUsername').text.to.contain('Jane Doe');

    indexPage.selectPractitionersTile();
  },
  'list practitioners': function (client) {
    const practitionersPage = client.page.practitionersPage();
    practitionersPage
      .verifyElements()
      .verifyListRow(0);
  },
  'create new practioner': function (client) {
    const practitionersPage = client.page.practitionersPage();
    practitionersPage
      .displayNewPractitionerCard()
      .verifyNewPractitionerCard()
      .create('Dr. Spock', 'johndoe.jpg'); // create
  },
  'list should contain recently created practitioner': function (client) {
    const practitionersPage = client.page.practitionersPage();
    practitionersPage
      .displayListCard()
      .verifyListRow(1)
      .listContains(1, 'Dr. Spock');
  },

  //------------------------------------------------------------------------------------------------


  'practitioner detail': function (client) {
    const practitionersPage = client.page.practitionersPage();
    practitionersPage
      .select(1, 'Dr. Spock')
      //.pause(1000, client)
      //.verifyDetails('Dr. Spock', 'johndoe.jpg');
  },
  // 'edit practitioner': function (client) {
  //   const practitionersPage = client.page.practitionersPage();
  //   practitionersPage
  //     .clickEditButton()
  //     .edit('Dr. Spock', 'Dr. Vock');
  // },
  // 'list edited practitioners': function (client) {
  //   const practitionersPage = client.page.practitionersPage();
  //   practitionersPage
  //     .listContains(1, 'Dr. Vock');
  // },
  // 'view edited practioner details': function (client) {
  //   const practitionersPage = client.page.practitionersPage();
  //   practitionersPage
  //     .select(1, 'Dr. Vock')
  //     .pause(1000, client)
  //     .verifyDetails('Dr. Vock', 'johndoe.jpg');
  // },
  //
  // 'delete practitioner': function (client) {
  //   const practitionersPage = client.page.practitionersPage();
  //   practitionersPage
  //     .delete();
  // },
  // 'list non-deleted Practitioners': function (client) {
  //   const practitionersPage = client.page.practitionersPage();
  //   practitionersPage
  //     .listDoesNotContain('Dr. Vock')
  //     .end();
  // }
};
