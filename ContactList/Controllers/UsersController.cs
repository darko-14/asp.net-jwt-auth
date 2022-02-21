using ContactList.Managers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace ContactList.Controllers
{
    public class UsersController : ApiController
    {
        private ContactListEntities DB = new ContactListEntities();

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
                var password = model.Password;

                //var salt = HashService.GenerateSalt();
                var salt = Encoding.UTF8.GetBytes("salt");
                var hashed = HashService.ComputeHMAC_SHA256(Encoding.UTF8.GetBytes(password), salt);
                newUser.Password = Convert.ToBase64String(hashed);

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
            
            var user = this.DB.Users.Where(c => c.ID == id).FirstOrDefault();

            if(user == null)
            {
                throw new ArgumentException("User doesn't exist in the database");
            }
            else
            {
                this.DB.Users.Remove(user);
                this.DB.SaveChanges();
                this.DB.Dispose();
                this.DB = null;
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