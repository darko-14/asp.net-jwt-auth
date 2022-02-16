using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ContactList.Controllers
{
    public class UsersController : ApiController
    {

        // GET api/<controller>
        public List<object> Get()
        {
            ContactListEntities DB = new ContactListEntities();
            DB.Configuration.LazyLoadingEnabled = false;

            var result = DB.Users.ToList().Select(c => (object)c).ToList();

            return result;
        }

        // GET api/<controller>/5
        public object Get(string username)
        {
            ContactListEntities DB = new ContactListEntities();

            var user = DB.Users.Where( c => c.Username == username).FirstOrDefault();

            if(user == null)
            {
                return new ArgumentException("User does not exist in databaes");
            }
            else
            {
                return (object)new
                {
                    ID = user.ID,
                    Username = user.Username,
                    Email = user.Email,
                };
            }
        }

        // POST api/<controller>
        public void Post([FromBody] UsersApiModel model)
        {
            ContactListEntities DB = new ContactListEntities();

            User newUser = new User();

            var user = DB.Users.Where(c => c.Username == model.Username).FirstOrDefault();

            if(user == null)
            {
                newUser.Username = model.Username;
                newUser.Email = model.Email;
                newUser.Password = model.Password;

                DB.Users.Add(newUser);
                DB.SaveChanges();
                DB = null;

            }
            else
            {
                throw new ArgumentException("User already exist in database");
            }
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] UsersApiModel model)
        {
            ContactListEntities DB= new ContactListEntities(); 
        
            var user = DB.Users.Where(c => c.ID == id).FirstOrDefault();

            if(user == null)
            {
                throw new ArgumentException("User doesn't exist in the database");
            }
            else
            {
                user.Username = model.Username;
                user.Email = model.Email;   
                user.Password = model.Password;
                DB.SaveChanges();
                DB.Dispose();
                DB = null;
            }
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            ContactListEntities DB = new ContactListEntities();

            var user = DB.Users.Where(c => c.ID == id).FirstOrDefault();

            if(user == null)
            {
                throw new ArgumentException("User doesn't exist in the database");
            }
            else
            {
                DB.Users.Remove(user);
                DB.SaveChanges();
                DB.Dispose();
                DB = null;
            }
        }
    }


    public class UsersApiModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}