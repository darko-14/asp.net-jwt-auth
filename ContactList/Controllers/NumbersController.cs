using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ContactList.Controllers
{
    public class NumbersController : ApiController
    {
        // GET api/<controller>
        public List<object> Get()
        {
            ContactListEntities DB = new ContactListEntities(); 
            DB.Configuration.LazyLoadingEnabled = false;

            //var result = DB.Numbers.ToList().Select(c => (object)c).ToList();
            var result = DB.Numbers.ToList().Select(c => (object)c).ToList();

            return result;
        }

        // GET api/<controller>/5
        public object Get(int id)
        {
            ContactListEntities DB = new ContactListEntities();

            var number = DB.Numbers.Where(c => c.ID == id).FirstOrDefault();

            if(number == null)
            {
                return new ArgumentException("Number doesnt exist.");
            }
            else
            {
                return (object)new
                {
                    Description = number.Description,
                    Number = number.Number1,
                };
            }
        }

        // POST api/<controller>
        public void Post([FromBody] NumbersApiModel model)
        {
            ContactListEntities DB = new ContactListEntities();
            Number neWNumber = new Number();

            var number = DB.Numbers.Where(c => c.ContactID == 1 && c.Number1 == model.Number1).FirstOrDefault();

            if(number == null)
            {
                neWNumber.Description = model.Description;
                neWNumber.Number1 = model.Number1;
                neWNumber.ContactID = 1;

                DB.Numbers.Add(neWNumber);
                DB.SaveChanges();
                DB.Dispose();
                DB = null;
            }
            else
            {
                throw new ArgumentException("This Number Already Exists");
            }
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] NumbersApiModel model)
        {
            ContactListEntities DB = new ContactListEntities();

            var number = DB.Numbers.Where(c => c.ID == id).FirstOrDefault();

            if(number == null)
            {
                throw new ArgumentException("Number does not exist.");
            }
            else
            {
                number.Description = model.Description;
                number.Number1 = model.Number1;
                DB.SaveChanges();
                DB.Dispose();
                DB = null;
            }
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            ContactListEntities DB = new ContactListEntities();

            var number = DB.Numbers.Where(c => c.ID == id).FirstOrDefault();

            if(number == null)
            {
                throw new ArgumentException("Number doesn't Exist");
            }
            else
            {
                DB.Numbers.Remove(number);
                DB.SaveChanges();
                DB.Dispose();
                DB = null;
            }
        }
    }

    public class NumbersApiModel
    {
        public string Description { get; set; } 
        public string Number1 { get; set; }    
    }
}