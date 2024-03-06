const { program } = require('commander');
const {
  allContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await allContacts();
      return console.table(contacts);

    case 'get':
      const contact = await getContactById(id);
      return console.log(contact);

    case 'add':
      const newContact = await addContact({ name, email, phone });
      return console.log(newContact);

    case 'remove':
      const deletedContact = await removeContact(id);
      return console.log(deletedContact);

    case 'update':
      const updatedContact = await updateContact(id, { name, email, phone });
      return console.log(updatedContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);
