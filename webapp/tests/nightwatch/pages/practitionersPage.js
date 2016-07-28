module.exports = {
  url: 'http://localhost:3000/practitioners',
  commands: [{

    verifyElements() {
      return this
        .verify.elementPresent('#practitionersPage')
        .verify.elementPresent('#practitionersTable');
    },
    verifyListRow(index) {
      this
        .verify.elementPresent('#practitionersTable');

      if (index > 0) {
        this
          .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(' + index + ')')
          .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(' + index + ') .name')
          .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(' + index + ') .avatar');
      }

      return this;
    },
    verifyNewPractitionerCard() {
      return this
        .verify.elementPresent('#practitionersPage .practitionerDetail')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="name"]')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="gender"]')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="photo"]')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="active"]');
    },
    verifyDetails(name, avatar) {
      return this
        .verify.attributeEquals('#practitionersPage .practitionerDetail input[name="name"]', 'value', name)
        .verify.attributeEquals('#practitionersPage .practitionerDetail input[name="photo"]', 'value', avatar)
        .verify.elementPresent('#deletePractitionerButton')
        .verify.elementPresent('#savePractitionerButton');
    },
    listContains (index, name, avatar) {
      return this
        .verify.elementPresent('#practitionersTable')
        .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(' + index + ')')
        .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(' + index + ') .name', name)
        .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(' + index + ') .avatar', avatar);
    },
    displayListCard(){
      return this.click('#practitionersPage .practitionerListTab');
    },
    displayNewPractitionerCard(){
      return this.click('#practitionersPage .newPractitionerTab');
    },
    displayPractitionerDetails(){
      return this.click('#practitionersPage .practitionerDetailsTab');
    },
    selectPractitioner(index){
      return this.click('#practitionersTable .practitionerRow:nth-child(' + index + ')');
    },
    create(name, gender, photo) {
      var self = this;

      this
        .verify.elementPresent('#practitionersPage .practitionerDetail')
        .verify.elementPresent('#practitionersPage .practitionerDetail input[name="name"]')
        .clearValue('#practitionersPage .practitionerDetail input[name="name"]');

      if (name) {
        var nameArray = name.split('');
        nameArray.forEach(function(letter){
          self.setValue('#practitionersPage .practitionerDetail input[name="name"]', letter);
        });
      }

      if (photo) {
        var photoArray = photo.split('');
        photoArray.forEach(function(letter){
          self.setValue('#practitionersPage .practitionerDetail input[name="photo"]', letter);
        });
      }

      return this
        .verify.elementPresent('#savePractitionerButton')
        .click('#savePractitionerButton');
    },
    clickEditButton(){
      return this
        .verify.elementPresent('#practitionersPage');
    },
    edit(oldName, newName){
      this
        .verify.elementPresent('#practitionersPage')
        .clearValue('#practitionersPage .practitionerDetail input[name="name"]');

      if (name) {
        var nameArray = name.split('');
        nameArray.forEach(function(letter){
          self.setValue('#practitionersPage .practitionerDetail input[name="name"]', letter);
        });
      }

      return this.click('#savePractitionerButton');
    },
    select(index, name){
      return this
        .verify.elementPresent('#practitionersPage')
        .verify.elementPresent('#practitionersTable .practitionerRow:nth-child(' + index + ')')
        .verify.containsText('#practitionersTable .practitionerRow:nth-child(' + index + ') .name', name)
        .click('#practitionersTable .practitionerRow:nth-child(' + index + ')');
    },
    delete(){
      return this
        .verify.elementPresent('#practitionersPage')
    },
    listDoesNotContain(name){
      return this
        .verify.elementPresent('#practitionersPage')
    },
    pause: function(time, client) {
      client.pause(time);
      return this;
    },
    saveScreenshot: function(path, client){
      client.saveScreenshot(path);
      return this;
    }
  }],
  elements: {}
};
