using ContactList.Managers;
using ContactList.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Http;

namespace ContactList.Controllers
{
    public class AuthenticateController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public object Post(string username, string password)
        {
            ContactListEntities DB = new ContactListEntities();

            var user = DB.Users.Where(c=> c.Username == username).FirstOrDefault();
            
            if (user != null)
            {
                var salt = Encoding.UTF8.GetBytes("salt");
                var hashed = HashService.ComputeHMAC_SHA256(Encoding.UTF8.GetBytes(password), salt);

                if (user.Password == Convert.ToBase64String(hashed))
                {
                    string UserUsername = user.Username;
                    int ID = user.ID;
                    IAuthContainerModel model = JWTService.GetJWTContainerModel(UserUsername, ID.ToString());
                    IAuthService authService = new JWTService(model.SecretKey);

                    string token = authService.GenerateToken(model);
                    if (!authService.IsTokenValid(token))
                        throw new UnauthorizedAccessException();
                    else
                    {
                        return (object)new
                        {
                            AccessToken = token,
                            Expire = DateTime.UtcNow.AddMinutes(1440).ToString()
                        };
                    }
                }
                else
                {
                    //throw new ArgumentException("Wrong password");
                    return (object)new
                    {
                        Error = "Wrong Credentials"
                    };
                }
            }
            else
            {
                throw new ArgumentException("Invalid credentials");
            }
        }

        // POST api/<controller>
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}