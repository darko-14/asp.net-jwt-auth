using ContactList.Managers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ContactList.Controllers
{
    public class ContactsController : ApiController
    {
        // GET api/<controller>
        public List<object> Get()
        {
            var claims = JWTService.authenticateUser(this.Request);

            ContactListEntities DB = new ContactListEntities();
            DB.Configuration.LazyLoadingEnabled = false;

            var result = DB.Contacts.ToList().Select(c => (object)c).ToList();

            return result;

        }

        // GET api/<controller>/5
        public object Get(int id)
        {

            JWTService.authenticateUser(this.Request);

            ContactListEntities DB = new ContactListEntities();

            var contact = DB.Contacts.Where(c => c.ID == id).FirstOrDefault();

            if(contact == null)
            {
                return new ArgumentException("Contact does not exist in database");
            }
            else
            {
                return (object)new
                {
                    ID = contact.ID,
                    Name = contact.Name,
                    Phone = contact.Phone,
                };
            }
        }

        // POST api/<controller>
        public object Post([FromBody] ContactsApiModel model)
        {
            ContactListEntities DB = new ContactListEntities();

            Contact newContact = new Contact();

            var contact = DB.Contacts.Where(c => c.UserId == 1 && c.Phone == model.Phone).FirstOrDefault();

            if (contact == null)
            {
                newContact.Name = model.Name;
                newContact.Phone = model.Phone;
                newContact.UserId = 1;

                DB.Contacts.Add(newContact);
                DB.SaveChanges();
                DB.Dispose();
                DB = null;

                return (object)new
                {
                    ID = newContact.ID,
                    Name = newContact.Name,
                    Phone = newContact.Phone,
                    UserId = newContact.UserId,
                };
            }
            else
            {
                throw new ArgumentException("contact already exist in database");
            }
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] ContactsApiModel model)
        {
            ContactListEntities DB = new ContactListEntities();

            var contact = DB.Contacts.Where(c => c.ID == id).FirstOrDefault();

            if(contact == null)
            {
                throw new ArgumentException("Contact does not exist in database");
            }
            else
            {
                contact.Phone = model.Phone;
                contact.Name = model.Name;
                DB.SaveChanges();
                DB.Dispose();
                DB = null;
            }


        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            ContactListEntities DB = new ContactListEntities();

            var contact = DB.Contacts.Where(c => c.ID == id).FirstOrDefault();

            if( contact == null)
            {
                throw new ArgumentException("Contact does not exist in database");
            }
            else
            {
                DB.Contacts.Remove(contact);
                DB.SaveChanges();
                DB.Dispose();
                DB = null;
            }

        }
    }

    public class ContactsApiModel
    {
        public string Name { get; set; }
        public string Phone { get; set; }
    }
}