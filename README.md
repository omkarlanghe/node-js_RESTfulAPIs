
# node-js_RESTfulAPIs

This Repository Contains the REST APIs created by me.

# 01_RestApi_mongoCRUD 
This is The REST API which is used to Perform CRUD operations on MongoDB.
 
# 02_dotNetCore.zip
This is the simple DotNet MVC project which helps to perform CRUD operations through webpage.RESTAPI is integrated with this project.

# 03_passportOAuth/passport
This API is created for OAuth2.0 implementation. This API generates the token for API authentication. It uses passport library and Basic Strategy.

# 04_UserCredendialUsingPassport 
This API implements ClientCredential Flow using passport library. It uses Basic Strategy

# 05_tokenAuthorization
It uses Client Credential flow using Basic Strategy.For token based authentication, JWT i.e json web token library is used to generate the token for token based authentication. Using this jwt token, we are authenticating CRUD API.

# 06_ClientCredentialTokenGeneration 
Implementation of Client Credential Flow using ClientPassword Strategy to generate the JWT token.

# 07_clientPasswordStrategy
Implementation of Client Credential Flow using ClientPassword Strategy to generate the JWT token. It uses client password strategy and 'Bearer' as an Authrorization header to authenticate CRUD API.

# 08_OauthProj.zip
This is the simple DotNet MVC project which helps to perform CRUD Operation through webpage. It is more secure as compare to previous DotNet MVC project as OAuth2.0 with client credential flow is implemented in this. Now Authorized Client can only Authenticate the CRUD API by its client credential. It contains a login page through which client has to enter his/her credentials. Once successfully Authorized, Token is generated and now all further operations are accessed using that verified token. Just pass 'Bearer [ejy4hdhy5...]' as an authorization header.

