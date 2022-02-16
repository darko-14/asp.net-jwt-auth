using ContactList.Models;
using IdentityServer4.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Claims;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using Claim = System.Security.Claims.Claim;
using ClaimTypes = System.Security.Claims.ClaimTypes;
using SecurityKey = Microsoft.IdentityModel.Tokens.SecurityKey;
using SecurityToken = Microsoft.IdentityModel.Tokens.SecurityToken;
using SigningCredentials = Microsoft.IdentityModel.Tokens.SigningCredentials;
using SymmetricSecurityKey = Microsoft.IdentityModel.Tokens.SymmetricSecurityKey;

namespace ContactList.Managers
{
    public class JWTService : IAuthService
    {
        public string SecretKey { get; set; }

        #region Constructor
        public JWTService(string secretKey)
        {
            SecretKey = secretKey;
        }



        #endregion

        public bool IsTokenValid(string token)
        {
            if (string.IsNullOrEmpty(token))
                throw new ArgumentException("Given token is null or empty");

            TokenValidationParameters tokenValidationParameters = GetTokenValidationParameters();

            JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            try
            {
                ClaimsPrincipal tokenValid = jwtSecurityTokenHandler.ValidateToken(token, tokenValidationParameters, out Microsoft.IdentityModel.Tokens.SecurityToken validatedToken);
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }
        public string GenerateToken(IAuthContainerModel model)
        {
            if (model == null || model.Claims == null || model.Claims.Length == 0)
                throw new ArgumentException("Arguments to create token are not valid.");

            Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor securityTokenDescriptor = new Microsoft.IdentityModel.Tokens.SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(model.Claims),
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(model.ExpiresMinutes)),
                SigningCredentials = new SigningCredentials(GetSymmetricSecurityKey(), model.SecurityAlgorithm)
            };

            JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
            string token = jwtSecurityTokenHandler.WriteToken(securityToken);

            return token;
        }

       

        public IEnumerable<System.Security.Claims.Claim> GetTokenClaims(string token)
        {

            if (string.IsNullOrEmpty(token))
                throw new ArgumentException("Given token is null or empty");

            TokenValidationParameters tokenValidationParameters = GetTokenValidationParameters();

            JwtSecurityTokenHandler jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            try
            {
                ClaimsPrincipal tokenValid = jwtSecurityTokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken validatedToken);
                return tokenValid.Claims;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<Claim> authenticateUser(HttpRequestMessage request)
        {

            JWTService service = new JWTService("TW9zaGVFcmVGUHJpdmF0ZUtleq==");



            if (request.Headers.Authorization != null)
            {
                var token = request.Headers.Authorization.Parameter;
                if (!service.IsTokenValid(token))
                    throw new UnauthorizedAccessException();
                else
                {
                    List<Claim> claims = service.GetTokenClaims(token).ToList();
                    return claims;
                }
            }
            else
                throw new UnauthorizedAccessException();
        }

        private SecurityKey GetSymmetricSecurityKey()
        {
            byte[] symmetricKey = Convert.FromBase64String(SecretKey);
            return new SymmetricSecurityKey(symmetricKey);
        }

        private TokenValidationParameters GetTokenValidationParameters()
        {
            return new TokenValidationParameters()
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                IssuerSigningKey = GetSymmetricSecurityKey()
            };
        }

        public static JWTContainerModel GetJWTContainerModel(string CompanyName, string ID)
        {
            return new JWTContainerModel()
            {
                Claims = new Claim[]
                {
                    new Claim(ClaimTypes.Name, CompanyName),
                    new Claim(ClaimTypes.Sid, ID)
                }
            };
        }

        IEnumerable<System.IdentityModel.Claims.Claim> IAuthService.GetTokenClaims(string token)
        {
            throw new NotImplementedException();
        }
    }
}