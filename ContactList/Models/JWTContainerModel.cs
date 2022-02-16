using System;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace ContactList.Models
{
    public class JWTContainerModel : IAuthContainerModel
    {
        public int ExpiresMinutes { get; set; } = 1440;

        public string SecretKey { get; set; } = "TW9zaGVFcmVGUHJpdmF0ZUtleq==";

        public string SecurityAlgorithm { get; set; } = SecurityAlgorithms.HmacSha256Signature;

        public Claim[] Claims { get; set; }
    }
}